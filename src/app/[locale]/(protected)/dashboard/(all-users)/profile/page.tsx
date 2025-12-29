import { cookies } from "next/headers";
import axios from "axios";
import ProfileCard from "./ProfileCard";
import { getAuthorizedAxios } from "@/lib/axios-auth";
import { auth } from "@/auth";

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
  const session = await auth();
  const user = session?.user;

  if (!user) {
    throw new Error("Unauthorized");
  }
  const { id, role } = user;
  
  try {
     const res = await authAxios.get(`http://localhost:5000/profile/${role}/${id}`);
     var { profile } = res.data;
  } catch (error: any) {
    console.error(error);
  }

  return (
    <div className="p-6 flex flex-col gap-6 max-w-5xl mx-auto">
      <ProfileCard profile={profile} />
    </div>
  );
}
