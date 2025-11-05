import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRouter from "./routes/auth.js";
import configRouter from "./routes/config.js";

dotenv.config();
const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

app.get("/", (req, res) => res.send("Stackguard API running"));
app.use("/api/auth", authRouter);
app.use("/api/config", configRouter);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(process.env.PORT, () =>
      console.log(`API on http://localhost:${process.env.PORT}`)
    );
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

start();
