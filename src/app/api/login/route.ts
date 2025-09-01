import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password, role } = await req.json();

  try {
    const res = await axios.post("http://localhost:5000/auth/login", {
      email,
      password,
      role,
    });
    const { token, user } = res.data;
    const response = NextResponse.json({ user });

    // attach cookies to response
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
      path: "/",
    });

    response.cookies.set("user", JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
      path: "/",
    });

    return response;
    // const cookieStore = await cookies();
    // cookieStore.set("token", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   maxAge: 60 * 60,
    //   path: "/",
    // });

    // cookieStore.set("user", JSON.stringify(user), {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   maxAge: 60 * 60,
    //   path: "/",
    // });

    // return NextResponse.json({ user });
  } catch (error: any) {
    console.error("Login failed:", error?.response?.data || error.message);

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
}
