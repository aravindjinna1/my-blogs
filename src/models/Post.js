import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 200 },
  content: { type: String, required: true }, 
  images: [String],                          
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  authorName: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
