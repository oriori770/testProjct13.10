import mongoose from "mongoose";


async function connectToMongoDb(): Promise<void> {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("Missing MONGODB_URI environment variable");
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Failed to connect to MongoDB", err);

  }
}
export default connectToMongoDb;
