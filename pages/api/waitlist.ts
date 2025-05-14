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
      <img src="https://i.postimg.cc/hvGvYNgK/wurana4.png" alt="Wurana Logo" style="max-width: 180px; height: auto;"/>
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
          <img src="https://i.postimg.cc/JzTsNrWP/Twitter.jpg" alt="Twitter/X" width="32" height="32" style="vertical-align: middle;"/>
        </a>
        <a href="https://www.instagram.com/wurana_?igsh=MWFoZW01ZnZqeHBsMg==" style="display: inline-block; margin: 0 10px; text-decoration: none;">
          <img src="https://i.postimg.cc/7Y9h4Hbw/instagram-icon.jpg" alt="Instagram" width="32" height="32" style="vertical-align: middle;"/>
        </a>
        <a href="https://web.facebook.com/people/W%C3%B9r%C3%A0n%C3%A1/61576552340912/" style="display: inline-block; margin: 0 10px; text-decoration: none;">
          <img src="https://i.postimg.cc/59wjPqVH/Facebook-Logo.png" alt="Facebook" width="32" height="32" style="vertical-align: middle;"/>
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
            <img src="https://i.postimg.cc/W1myCjDg/whatsapp.png" alt="WhatsApp" width="24" height="24" style="vertical-align: middle;"/>
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
