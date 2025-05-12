import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  throw new Error('Please add your email credentials to .env.local');
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, isBetaTester } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(process.env.MONGODB_URI as string);
    const db = client.db('wurana');

    // Save to database
    await db.collection('waitlist').insertOne({
      name,
      email,
      isBetaTester,
      createdAt: new Date(),
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to Wurana Waitlist!',
      html: `
        <h2>Welcome to Wurana, ${name}!</h2>
        <p>Thank you for joining our waitlist. We're excited to have you on board!</p>
        ${isBetaTester ? "<p>We've noted your interest in being a beta tester. We'll reach out with more details soon.</p>" : ''}
        <p>Stay tuned for updates about our launch!</p>
      `,
    });

    // Send notification to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Waitlist Signup',
      html: `
        <h3>New Waitlist Signup</h3>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Beta Tester: ${isBetaTester ? 'Yes' : 'No'}</p>
      `,
    });

    await client.close();
    res.status(200).json({ message: 'Successfully joined waitlist' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
