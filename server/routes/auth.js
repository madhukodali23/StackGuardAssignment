import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
dotenv.config();

const router = Router();

const makeToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email & password required" });
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email in use" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ firstName, lastName, email, passwordHash });
    const token = makeToken(user._id);
    res.json({
      token,
      user: {
        id: user._id,
        firstName,
        lastName,
        email,
        isConfigured: user.isConfigured
      }
    });
  } catch (e) {
    res.status(500).json({ message: "Signup failed" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    const token = makeToken(user._id);
    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isConfigured: user.isConfigured
      }
    });
  } catch {
    res.status(500).json({ message: "Signin failed" });
  }
});

router.get("/me", async (req, res) => {
  res.json({ ok: true });
});

export default router;
