import { User } from "@/types/auth.types";
import axios, { AxiosInstance } from "axios";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getUserFromToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET || "abood") as User; // should match NestJS secret
  } catch (_) {
    return null;
  }
}

export async function getUserFromCookies() {
  const cookieStore = await cookies();
  const user = cookieStore.get("user")?.value;
  if (!user) return null;
  return JSON.parse(user);
}

export async function getAuthorizedAxios() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
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

// function handleAxiosError(error: unknown) {
//   console.log({ error });
//   if (axios.isAxiosError(error)) {
//     const status = error.response?.status;

//     if (status === 401) throw new Error("Unauthorized");
//     if (status === 403) throw new Error("Forbidden");
//     if (status === 404) throw new Error("Not Found");

//     throw new Error(error.response?.data?.message || "Request failed");
//   }

//   throw new Error("Unexpected error");
// }

function handleAxiosError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    if (status === 401) throw new Error("Unauthorized");
    if (status === 403) throw new Error("Forbidden");
    if (status === 404) throw new Error("Not Found");
    throw new Error(error.response?.data?.message || "Request failed");
  }
  throw new Error("Unexpected error");
}

export async function axiosRequest<T>(
  axiosInstance: AxiosInstance,
  config: Parameters<AxiosInstance["request"]>[0]
): Promise<T> {
  try {
    const res = await axiosInstance.request<T>(config);
    return res.data;
  } catch (error) {
    handleAxiosError(error);
  }
}
