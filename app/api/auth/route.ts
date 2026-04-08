
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_EMAIL = "admin@recipe.app";
const ADMIN_PASS = "admin123";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
    const cookieStore = await cookies();
    cookieStore.set("chef_session", "active", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("chef_session");
  return NextResponse.json({ success: true });
}

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("chef_session");
  return NextResponse.json({ authenticated: !!session });
}
