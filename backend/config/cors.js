import { configDotenv } from "dotenv";

configDotenv();

export const corsOptions = {
  origin: [process.env.CLIENT_URL, "https://task-manager-ciphrix.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
