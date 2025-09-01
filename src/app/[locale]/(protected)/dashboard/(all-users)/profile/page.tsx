import { cookies } from "next/headers";
import axios from "axios";
import ProfileCard from "./ProfileCard";

export default async function ProfilePage() {
  const baseURL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const cookieStore = cookies();

  const res = await axios.get("/api/profile", {
    baseURL,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  const { profile } = res.data;

  return (
    <div className="p-6 flex flex-col gap-6 max-w-5xl mx-auto">
      <ProfileCard profile={profile} />
    </div>
  );
}
