import { cookies } from "next/headers";
import axios from "axios";
import ProfileCard from "./ProfileCard";
import {
  axiosRequest,
  getAuthorizedAxios,
  getUserFromCookies,
} from "@/lib/auth";

export default async function ProfilePage() {
  const baseURL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  // const cookieStore = cookies();

  // const res = await axios.get("/api/profile", {
  //   baseURL,
  //   headers: {
  //     Cookie: cookieStore.toString(),
  //   },
  // });
  const authAxios = await getAuthorizedAxios();
  const user = await getUserFromCookies();
  if (!user) {
    throw new Error("Unauthorized");
  }
  const { id, role } = user;
  const res = await axiosRequest<{
    profile: any;
  }>(authAxios, {
    method: "GET",
    url: `http://localhost:5000/profile/${role}/${id}`,
  });

  const { profile } = res;

  return (
    <div className="p-6 flex flex-col gap-6 max-w-5xl mx-auto">
      <ProfileCard profile={profile} />
    </div>
  );
}
