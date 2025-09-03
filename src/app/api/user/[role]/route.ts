import { getAuthorizedAxios } from "@/lib/auth";
import { Role } from "@/types/auth.types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ role: Role }> }
) {
  const { searchParams } = new URL(req.url);
  const queryString = searchParams.toString();

  try {
    const authAxios = await getAuthorizedAxios();
    const { role } = await params;
    const res = await authAxios.get(
      `http://localhost:5000/user/${role}?${queryString}`
    );
    const { users, pagination } = res.data;
    return NextResponse.json({ users, pagination });
  } catch (error: any) {
    const message = error?.response?.data || error.message;
    console.error("Request failed:", message);
    return NextResponse.json(
      { error: message || "Something Went Wrong" },
      { status: error?.response?.data || 500 }
    );
  }
}
