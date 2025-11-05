import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    configKey: { type: String, default: "" }
  },
  { timestamps: true }
);

userSchema.virtual("isConfigured").get(function () {
  return this.configKey && this.configKey.length >= 100;
});

export default mongoose.model("User", userSchema);
