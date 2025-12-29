import { auth } from "@/auth";
import axios from "axios";

export async function getAuthorizedAxios() {
  const session = await auth();
  const token = session?.user?.accessToken;

  if (!token) {
    throw new Error("Unauthorized");
  }

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
