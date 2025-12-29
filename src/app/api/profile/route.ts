// import { getAuthorizedAxios } from "@/lib/auth"; // Note: The previous file had this import, but auth.ts says it is deprecated. Checking if I should use axios-auth.
import { getAuthorizedAxios as getAuthAxios } from "@/lib/axios-auth";
import { NextResponse } from "next/server";
import { handleApiError } from "@/lib/api-error";

export async function PATCH(req: Request) {
  try {
    const data = await req.json();
    const authAxios = await getAuthAxios();
    const { id, ...profileData } = data;
    
    const res = await authAxios.patch(
      `/profile/${id}`, // BaseURL is already set in getAuthorizedAxios
      profileData
    );
    
    return NextResponse.json({
      message: "Profile updated successfully",
      profile: res.data.profile,
    });
  } catch (error: any) {
    const { message, errors } = handleApiError(error);
    const status = error.response?.status || 500;
    
    return NextResponse.json(
      { message, errors },
      { status }
    );
  }
}
