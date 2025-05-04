import fs from "fs";
import path from "path";

export async function setupDb(projectName) {
  const authMiddleware = `
import mongoose from "mongoose";
import dotenv from "dotenv";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

export default connectDB;
`;

  fs.writeFileSync(
    path.join(process.cwd(), "src", "config", "db.config.js"),
    authMiddleware.trim()
  );
}
