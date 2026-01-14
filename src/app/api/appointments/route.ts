// import { getAuthorizedAxios, getUserFromCookies } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { handleApiError } from "@/lib/api-error";
import { getAuthorizedAxios } from "@/lib/axios-auth";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const queryString = searchParams.toString();

  try {
    // const authAxios = await getAuthorizedAxios();
    // const user = await getUserFromCookies();
    const authAxios=await getAuthorizedAxios();
    const session = await auth();
    const user = session?.user;
    if (!user) {
      throw new Error("Unauthorized");
    }
    const { id } = user;
    const res = await authAxios.get(
      `/appointments/donor/${id}?${queryString}`
    );
    const { appointments, pagination } = res.data;
    return NextResponse.json({ appointments, pagination });
  } catch (error: any) {
    return NextResponse.json(
      { error: handleApiError(error).message },
      { status: error?.response?.status || 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    const authAxios=await getAuthorizedAxios();
    const session = await auth();
    const user = session?.user;
    if (!user) {
      throw new Error("Unauthorized");
    }
    const { id } = user;
    data.donorId = id;
    const res = await authAxios.post(`/appointments`, data);
    const { appointment } = res.data;
    return NextResponse.json({
      message: "appointment created successfully",
      appointment,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: handleApiError(error).message },
      { status: error?.response?.status || 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const data = await req.json();
  const { status, id } = data;
  try {
    const authAxios=await getAuthorizedAxios();
    let url = `/appointments/${id}/status`;
    if (status == "cancelled") {
      url = `/appointments/${id}/cancle`;
    }
    const res = await authAxios.patch(url, data);
    const { appointment } = res.data;
    return NextResponse.json({
      message: "appointment updated successfully",
      appointment,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: handleApiError(error).message },
      { status: error?.response?.status || 500 }
    );
  }
}
