// import { NextResponse } from "next/server";
// // import { dbConnect } from "../../lib/mongodb";
// import { dbConnect } from '@/lib/mongodb'
// import Post from "@/models/Post";
// import User from "@/models/User";
// // import { verifyToken } from "../../lib/auth";
// import { verifyToken  } from "@/lib/auth";
// export async function GET() {
//   await dbConnect();
//   const posts = await Post.find({}).sort({ createdAt: -1 }).lean();
//   return NextResponse.json({ posts });
// }

// export async function POST(req) {
//   await dbConnect();

//   const cookie = req.headers.get("cookie") || "";
//   const tokenMatch = cookie.split(";").map(s => s.trim()).find(s => s.startsWith("token="));
//   if (!tokenMatch) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const token = tokenMatch.split("=")[1];
//   const payload = verifyToken(token);
//   if (!payload) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

//   const { title, content, images } = await req.json();
//   if (!title || !content) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

//   const user = await User.findById(payload.userId).lean();
//   const post = await Post.create({
//     title,
//     content,
//     images: images || [],
//     authorId: payload.userId,
//     authorName: user.name
//   });

//   return NextResponse.json({ message: "Post created", post }, { status: 201 });
// }













import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Post from "@/models/Post";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  await dbConnect();
  const posts = await Post.find({}).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ posts });
}

export async function POST(req) {
  await dbConnect();

  const cookie = req.headers.get("cookie") || "";
  const tokenMatch = cookie.split(";").map(s => s.trim()).find(s => s.startsWith("token="));
  if (!tokenMatch) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const token = tokenMatch.split("=")[1];
  const payload = verifyToken(token);
  if (!payload) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

  const { title, content, imageUrl } = await req.json();
  if (!title || !content) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const user = await User.findById(payload.userId).lean();
  const post = await Post.create({
    title,
    content,
    images: imageUrl || [],
    authorId: payload.userId,
    authorName: user?.name || payload.name || "Unknown"
  });

  return NextResponse.json({ message: "Post created", post }, { status: 201 });
}

export async function DELETE(req) {
  await dbConnect();

  const cookie = req.headers.get("cookie") || "";
  const tokenMatch = cookie.split(";").map(s => s.trim()).find(s => s.startsWith("token="));
  if (!tokenMatch) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const token = tokenMatch.split("=")[1];
  const payload = verifyToken(token);
  if (!payload) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const post = await Post.findById(id).lean();
  if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });

  if (String(post.authorId) !== String(payload.userId) && payload.role !== "admin") {
    return NextResponse.json({ error: "Not allowed" }, { status: 403 });
  }

  await Post.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" }, { status: 200 });
}
