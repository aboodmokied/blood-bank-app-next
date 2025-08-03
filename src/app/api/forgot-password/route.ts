import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, role } = await req.json();

  try {
    const res = await axios.post("http://localhost:5000/auth/reset-password", {
      email,
      role,
    });
    const { message } = res.data;
    return NextResponse.json({ message });
  } catch (error: any) {
    console.error(
      "Forgot password request failed:",
      error?.response?.data || error.message
    );
    if (error.status == 404) {
      return NextResponse.json(
        { error: error.response?.data?.message || "User Not Found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Forgot password request failed" },
      { status: 401 }
    );
  }
}
