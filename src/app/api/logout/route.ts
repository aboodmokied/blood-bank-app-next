import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  // if (!token) {
  //   return NextResponse.json({ message: "No token found" }, { status: 400 });
  // }

  try {
    // 📨 Send token to NestJS for invalidation
    await axios.get("http://localhost:5000/auth/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err: any) {
    console.error(
      "Error sending token to backend:",
      err?.response?.data || err.message
    );
  }

  cookieStore.delete("token");

  return NextResponse.json({ message: "Logged out" });
}
