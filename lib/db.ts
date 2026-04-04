import { env } from "@/validator/schemas/env";
import { MongoClient } from "mongodb";

if (!env.DATABASE_URL) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = env.DATABASE_URL;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (env.NODE_ENV === "development") {

  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}


export default clientPromise;