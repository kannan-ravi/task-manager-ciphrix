import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "task-manager-ciphrix",
    });
  } catch (error) {
    console.log(error);
  }
};
