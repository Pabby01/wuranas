/* eslint-disable @typescript-eslint/ban-types */
import Cors from 'cors';
import { MongoClient, MongoClientOptions } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

// Initialize the cors middleware
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
  origin: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000' 
    : 'https://wurana.com',
  credentials: true,
});

// Helper method to wait for a middleware to execute before continuing
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

const MONGODB_URI = process.env.MONGODB_URI!;
const EMAIL_USER = process.env.EMAIL_USER!;
const EMAIL_PASS = process.env.EMAIL_PASS!;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'wurana3@gmail.com';

// Email templates
const userEmailTemplate = (name: string) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    <div style="text-align: center; margin-bottom: 30px;">
      <img src="${process.env.NEXT_PUBLIC_API_URL}/wura/logo.jpg" alt="Wurana Logo" style="max-width: 180px; height: auto;"/>
    </div>
    
    <div style="background: linear-gradient(135deg,rgb(115, 10, 168),rgb(110, 9, 141)); padding: 25px; border-radius: 12px; margin-bottom: 30px;">
      <h1 style="color: #ffffff; margin: 0; font-size: 28px; text-align: center;">Welcome to Wurana! 🎉</h1>
    </div>

    <p style="color: #334155; font-size: 16px; line-height: 1.6;">Hi ${name},</p>
    <p style="color: #334155; font-size: 16px; line-height: 1.6;">Thank you for joining our early access waitlist. You're now among the first to experience the future of artisan services on Solana.</p>
    
    <h2 style="color: #1E40AF; font-size: 22px; margin-top: 30px;">What's Next? 🚀</h2>
    <div style="background-color: #f8fafc; padding: 20px; border-radius: 12px; margin: 20px 0;">
      <ul style="list-style-type: none; padding: 0; margin: 0;">
        <li style="margin: 15px 0; padding-left: 30px; position: relative; color: #334155;">
          <span style="position: absolute; left: 0; top: 50%; transform: translateY(-50%);">✨</span>
          Early access to our platform
        </li>
        <li style="margin: 15px 0; padding-left: 30px; position: relative; color: #334155;">
          <span style="position: absolute; left: 0; top: 50%; transform: translateY(-50%);">🎁</span>
          Exclusive NFT badge for early adopters
        </li>
        <li style="margin: 15px 0; padding-left: 30px; position: relative; color: #334155;">
          <span style="position: absolute; left: 0; top: 50%; transform: translateY(-50%);">💎</span>
          Zero platform fees during beta
        </li>
      </ul>
    </div>

    <div style="margin-top: 35px; text-align: center;">
      <p style="color: #334155; font-size: 16px; margin-bottom: 20px;">Follow us for updates:</p>
      <div style="display: inline-block;">
        <a href="https://x.com/Wurana01?t=YZWL4SvdCjLzEnY83uNw7A&s=09" style="display: inline-block; margin: 0 10px; text-decoration: none;">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="#1DA1F2">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>
        <a href="https://www.instagram.com/wurana_?igsh=MWFoZW01ZnZqeHBsMg==" style="display: inline-block; margin: 0 10px; text-decoration: none;">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="#E4405F">
            <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.897 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.897-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
          </svg>
        </a>
        <a href="https://discord.gg/wurana" style="display: inline-block; margin: 0 10px; text-decoration: none;">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="#5865F2">
            <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"/>
          </svg>
        </a>
      </div>

      <div style="margin-top: 30px;">
        <a href="https://chat.whatsapp.com/EjPQRMRAStlKR4JuWdS2Gz" 
           style="display: inline-block; 
                  background: #25D366; 
                  color: white; 
                  padding: 12px 24px; 
                  border-radius: 24px; 
                  text-decoration: none; 
                  font-weight: bold;
                  font-size: 16px;">
          <span style="display: inline-flex; align-items: center; gap: 8px;">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="#FFFFFF">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Join our Community
          </span>
        </a>
      </div>
    </div>

    <div style="margin-top: 40px; padding: 20px; background: linear-gradient(to right, #e0e7ff, #dbeafe); border-radius: 12px; text-align: center;">
      <p style="margin: 0; color: #1E40AF; font-weight: 500;">Have questions? We're here to help!</p>
      <a href="mailto:wurana3@gmail.com" style="color: #3B82F6; text-decoration: none; font-weight: 600;">wurana3@gmail.com</a>
    </div>

    <div style="margin-top: 30px; text-align: center; color: #64748b; font-size: 14px;">
      <p style="margin: 5px 0;">© 2025 Wurana. All rights reserved.</p>
      <p style="margin: 5px 0;">You're receiving this email because you joined our waitlist.</p>
    </div>
  </div>
`;

const adminEmailTemplate = (user: { name: string; email: string; isArtisan: boolean; skills?: string }) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
    <h2>New Waitlist Registration 🎉</h2>
    <div style="background: #f8fafc; padding: 20px; border-radius: 8px;">
      <p><strong>Name:</strong> ${user.name}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Type:</strong> ${user.isArtisan ? 'Artisan' : 'Client'}</p>
      ${user.skills ? `<p><strong>Skills:</strong> ${user.skills}</p>` : ''}
      <p><strong>Joined:</strong> ${new Date().toLocaleString()}</p>
    </div>
  </div>
`;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: EMAIL_USER, pass: EMAIL_PASS },
});

const options: MongoClientOptions = {
  maxPoolSize: 1,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
  ssl: true,
  family: 4,
  authSource: 'admin',
  replicaSet: 'atlas-gya1nj-shard-0'
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, name, isArtisan, skills } = req.body;

  if (!email || !name) {
    return res.status(400).json({ message: 'Email and name are required' });
  }

  let client;

  try {
    console.log('Connecting to MongoDB...');
    client = new MongoClient(MONGODB_URI, options);

    await client.connect();
    const db = client.db('Wurana'); // Note the capital W
    await db.command({ ping: 1 });
    console.log('MongoDB connection successful!');

    const waitlist = db.collection('waitlistUsers');

    console.log('Processing request:', { email, name, isArtisan });

    // Check if email already exists
    const existingUser = await waitlist.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // Add to waitlist
    const newUser = {
      email,
      name,
      isArtisan,
      skills,
      joinedAt: new Date(),
    };

    await waitlist.insertOne(newUser);

    // Send confirmation email to user
    try {
      await transporter.sendMail({
        from: `"Wurana Team" <${EMAIL_USER}>`,
        to: email,
        subject: 'Welcome to Wurana Early Access Waitlist! 🎉',
        html: userEmailTemplate(name),
      });
    } catch (emailError) {
      console.error('Error sending user email:', emailError);
      // Don't fail the registration if email fails
    }

    // Send notification to admin
    try {
      await transporter.sendMail({
        from: EMAIL_USER,
        to: ADMIN_EMAIL,
        subject: `New Waitlist Registration: ${name}`,
        html: adminEmailTemplate(newUser),
      });
    } catch (adminEmailError) {
      console.error('Error sending admin email:', adminEmailError);
      // Don't fail the registration if email fails
    }

    res.status(200).json({ message: 'Successfully joined waitlist' });
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    return res.status(500).json({ 
      message: 'Database connection failed. Please try again later.'
    });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
