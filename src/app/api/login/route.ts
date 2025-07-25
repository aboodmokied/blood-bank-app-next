import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password, role } = await req.json();

  try {
    const res = await axios.post("http://localhost:4001/auth/login", {
      email,
      password,
      role,
    });
    console.log({
      res: res.data,
    });
    const { token, user } = res.data;
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
      path: "/",
    });

    return NextResponse.json({ user });
  } catch (error: any) {
    console.error("Login failed:", error?.response?.data || error.message);

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
}
