
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const client = new MongoClient(connectionString);

let dbConnection;

export const connectToServer = async (callback) => {
  try {
    await client.connect();
    dbConnection = client.db('cse341');
    console.log('Successfully connected to MongoDB.');
    return callback();
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    return callback(err);
  }
};

export const getDb = () => {
  return dbConnection;
};


export default {
  connectToServer,
  getDb
};