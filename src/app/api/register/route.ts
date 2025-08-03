import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password, name, role } = await req.json();

  try {
    const res = await axios.post("http://localhost:5000/user/register", {
      email,
      password,
      name,
      role,
    });

    console.log({ registeredUser: res.data });

    return NextResponse.json({ user: res.data });
  } catch (error: any) {
    console.error("Login failed:", error?.response?.data || error.message);

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
}
