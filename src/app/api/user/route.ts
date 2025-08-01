import { User } from "@/types/auth.types";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  console.log({ token: cookieStore });
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const res = await axios.get("http://localhost:4001/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { user } = res.data as { user: User };
    return NextResponse.json({ user });
  } catch (error: any) {
    console.error("Login failed:", error?.response?.data || error.message);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
