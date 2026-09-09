import mongoose from "mongoose";
import { config } from "./env";

async function connectdb(): Promise<void> {
  try {
    await mongoose.connect(`mongodb://0.0.0.0:27017/NextTask`);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export { connectdb };
