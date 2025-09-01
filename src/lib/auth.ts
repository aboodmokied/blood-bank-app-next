// server components only
import { User } from "@/types/auth.types";
import axios, { AxiosInstance } from "axios";
import jwt from "jsonwebtoken";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
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

export async function getUserFromCookies(): Promise<User | null> {
  const cookieStore = await cookies();
  const user = cookieStore.get("user")?.value;
  if (!user) return null;
  return JSON.parse(user);
}

// get the token from cookies used only in server side
export async function getAuthorizedAxios() {
  const store = await cookies();
  const token = store.get("token")?.value;
  console.log({ cookieToken: store.get("token") });
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

function handleAxiosError(error: unknown): never {
  console.error(error);
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    if (status === 401) throw new Error("Unauthorized");
    if (status === 403) throw new Error("Forbidden");
    if (status === 404) throw new Error("Not Found");
    throw new Error(error.response?.data?.message || "Request failed");
  }
  throw new Error("Unexpected error");
}

// for external endpoints calls
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
