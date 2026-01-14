import { auth } from "@/auth";
import BroadcastsClient from "@/components/dashboard/hospital/BroadcastsClient";

export default async function BroadcastsPage() {
  const session = await auth();
  const user = session?.user;

  if (!user || user.role !== "hospital") {
    return <div>Access Denied</div>;
  }

  return <BroadcastsClient accessToken={user.accessToken || ""} />;
}
