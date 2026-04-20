import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return;
    }

    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined");
    }

    await mongoose.connect(mongoUri);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connection error:", error);
    throw error;
  }
};

export default connectMongo;