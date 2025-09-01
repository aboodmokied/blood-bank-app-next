import { getAuthorizedAxios, getUserFromCookies } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const data = await req.json();
    const authAxios = await getAuthorizedAxios();
    const { id, ...profileData } = data;
    const res = await authAxios.patch(
      `http://localhost:5000/profile/${id}`,
      profileData
    );
    return NextResponse.json({
      message: "profile updated sucessfully",
      profile: res.data.profile,
    });
  } catch (error: any) {
    const message = error?.response?.data || error.message;
    console.error("Request failed:", message);
    return NextResponse.json(
      { error: message || "Something Went Wrong" },
      { status: error?.response?.data || 500 }
    );
  }
}
export async function GET() {
  try {
    const authAxios = await getAuthorizedAxios();
    const user = await getUserFromCookies();
    if (!user) {
      throw new Error("Unauthorized");
    }
    const { id, role } = user;
    const res = await authAxios.get(
      `http://localhost:5000/profile/${role}/${id}`
    );
    const { profile } = res.data;
    return NextResponse.json({ profile });
  } catch (error: any) {
    const message = error?.response?.data || error.message;
    console.error("Request failed:", message);
    return NextResponse.json(
      { error: message || "Something Went Wrong" },
      { status: error?.response?.data || 500 }
    );
  }
}
