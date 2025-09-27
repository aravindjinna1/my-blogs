import { NextResponse } from "next/server";
import { dbConnect } from "../../../../lib/mongodb";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { name, email, password } = await req.json();
  if (!name || !email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  await dbConnect();

  const exists = await User.findOne({ email });
  if (exists) {
    return NextResponse.json({ error: "Email already exists" }, { status: 409 });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });

  return NextResponse.json(
    { message: "User created", user: { _id: user._id, name, email } },
    { status: 201 }
  );
}
