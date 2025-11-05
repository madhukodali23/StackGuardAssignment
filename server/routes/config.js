import { Router } from "express";
import User from "../models/User.js";
import { authRequired } from "../middleware/auth.js";

const router = Router();

router.post("/", authRequired, async (req, res) => {
  const { key } = req.body;
  if (typeof key !== "string")
    return res.status(400).json({ message: "Key required" });
  if (key.length < 100 || key.length > 1000)
    return res
      .status(400)
      .json({ message: "Key must be 100–1000 characters" });

  const user = await User.findByIdAndUpdate(
    req.userId,
    { configKey: key },
    { new: true }
  );
  res.json({ isConfigured: user.isConfigured });
});

router.get("/status", authRequired, async (req, res) => {
  const user = await User.findById(req.userId);
  res.json({ isConfigured: user?.isConfigured ?? false });
});

export default router;
