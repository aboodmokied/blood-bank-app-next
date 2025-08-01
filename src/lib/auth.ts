import { User } from "@/types/auth.types";
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
