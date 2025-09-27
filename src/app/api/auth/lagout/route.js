import { NextResponse } from "next/server";

export async function POST() {
  const cookie = `token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict;`;
  return NextResponse.json({ message: "Logged out" }, { status: 200, headers: { "Set-Cookie": cookie } });
}
