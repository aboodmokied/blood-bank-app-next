import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, role, newPassword } = await req.json();
  const cookieStore = await cookies();
  const resetToken = cookieStore.get("reset_token")?.value;
  console.log({ resetToken });
  if (!resetToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const res = await axios.post(
      "http://localhost:5000/auth/change-password",
      {
        email,
        role,
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${resetToken}`,
        },
      }
    );
    const { message } = res.data;

    return NextResponse.json({ message });
  } catch (error: any) {
    console.error(
      "Reset password request failed:",
      error?.response?.data || error.message
    );
    if (error.status == 401) {
      return NextResponse.json(
        { error: error.response?.data?.message || "Unauthorized" },
        { status: 401 }
      );
    } else if (error.status == 400) {
      return NextResponse.json(
        { error: error.response?.data?.message || "Invalid input" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Reset password request failed" },
      { status: 400 }
    );
  }
}
