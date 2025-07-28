import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, role, code } = await req.json();

  try {
    const res = await axios.post("http://localhost:5000/auth/verify-code", {
      email,
      role,
      code,
    });
    const { message, token } = res.data;
    const cookieStore = await cookies();
    cookieStore.set("reset_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
      path: "/",
    });
    return NextResponse.json({ message });
  } catch (error: any) {
    console.error(
      "Code Verification request failed:",
      error?.response?.data || error.message
    );
    if (error.status == 401) {
      return NextResponse.json(
        { error: error.response?.data?.message || "Invalid Code" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Code Verification request failed" },
      { status: 400 }
    );
  }
}
