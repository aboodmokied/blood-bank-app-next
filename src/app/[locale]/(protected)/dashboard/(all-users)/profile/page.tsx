
import ProfileCard from "./ProfileCard";
import { getAuthorizedAxios } from "@/lib/axios-auth";
import { auth } from "@/auth";

export default async function ProfilePage() {

  const authAxios = await getAuthorizedAxios();
  const session = await auth();
  const user = session?.user;

  if (!user) {
    throw new Error("Unauthorized");
  }
  const { id, role } = user;
  
  let profile;
  try {
     const res = await authAxios.get(`/profile/${role}/${id}`);
     profile = res.data.profile;
  } catch (error: any) {
    console.error(error);
  }

  return (
    <div className="p-6 flex flex-col gap-6 max-w-5xl mx-auto">
      <ProfileCard profile={profile} />
    </div>
  );
}
