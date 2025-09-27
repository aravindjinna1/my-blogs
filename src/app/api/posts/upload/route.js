import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import fs from "fs/promises";
import path from "path";


export async function POST(req) {
  const cookie = req.headers.get("cookie") || "";
  const tokenMatch = cookie.split(";").map(s => s.trim()).find(s => s.startsWith("token="));
  if (!tokenMatch) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const token = tokenMatch.split("=")[1];
  const payload = verifyToken(token);
  if (!payload) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

  const body = await req.json();
  const { filename, data } = body || {};

  if (!filename || !data) return NextResponse.json({ error: "Missing file data" }, { status: 400 });

  const m = data.match(/^data:(.+);base64,(.+)$/);
  if (!m) return NextResponse.json({ error: "Invalid data" }, { status: 400 });

  const mime = m[1]; 
  const base64 = m[2];
  const buffer = Buffer.from(base64, "base64");

  const safeName = filename.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9.-_]/g, "");
  const uniqueName = `${Date.now()}-${Math.round(Math.random()*1e6)}-${safeName}`;

  try {
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });
    const filePath = path.join(uploadsDir, uniqueName);
    await fs.writeFile(filePath, buffer);

    const url = `/uploads/${uniqueName}`;
    return NextResponse.json({ url }, { status: 201 });
  } catch (err) {
    console.error("upload error", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
