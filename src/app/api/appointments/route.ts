import { getAuthorizedAxios, getUserFromCookies } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const queryString = searchParams.toString();

  try {
    const authAxios = await getAuthorizedAxios();
    const user = await getUserFromCookies();
    if (!user) {
      throw new Error("Unauthorized");
    }
    const { id } = user;
    const res = await authAxios.get(
      `http://localhost:5000/appointments/donor/${id}?${queryString}`
    );
    const { appointments, pagination } = res.data;
    return NextResponse.json({ appointments, pagination });
  } catch (error: any) {
    const message = error?.response?.data || error.message;
    console.error("Request failed:", message);
    return NextResponse.json(
      { error: message || "Something Went Wrong" },
      { status: error?.response?.data || 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    const authAxios = await getAuthorizedAxios();
    const user = await getUserFromCookies();
    if (!user) {
      throw new Error("Unauthorized");
    }
    const { id } = user;
    data.donorId = id;
    const res = await authAxios.post(
      `http://localhost:5000/appointments`,
      data
    );
    const { appointment } = res.data;
    return NextResponse.json({
      message: "appointment created successfully",
      appointment,
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

export async function PATCH(req: NextRequest) {
  const data = await req.json();
  const { status, id } = data;
  try {
    const authAxios = await getAuthorizedAxios();
    let url = `http://localhost:5000/appointments/${id}/status`;
    if (status == "cancelled") {
      url = `http://localhost:5000/appointments/${id}/cancle`;
    }
    const res = await authAxios.patch(url, data);
    const { appointment } = res.data;
    return NextResponse.json({
      message: "appointment updated successfully",
      appointment,
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
