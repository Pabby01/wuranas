import * as dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
dotenv.config({ path: '.env.local' });

async function testConnection() {
  const client = new MongoClient(process.env.MONGODB_URI!);
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('MongoDB connection successful!');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
  } finally {
    await client.close();
  }
}

testConnection();