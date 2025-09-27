import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" } // "admin" or "user"
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
