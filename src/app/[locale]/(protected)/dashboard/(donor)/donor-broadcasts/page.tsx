import { auth } from "@/auth";
import { getAuthorizedAxios } from "@/lib/axios-auth";
import ActiveBroadcasts from "@/components/dashboard/donor/ActiveBroadcasts";

export default async function DonorBroadcastsPage() {
  const session = await auth();
  const user = session?.user;

  if (!user || user.role !== "donor") {
    return <div>Access Denied</div>;
  }

  const authAxios = await getAuthorizedAxios();
  let broadcasts = [];

  try {
    const response = await authAxios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/broadcast`
    );
    broadcasts = response.data.broadcasts || [];
  } catch (error) {
    console.error("Failed to fetch broadcasts", error);
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Urgent Blood Needs</h2>
          <p className="text-muted-foreground">
            Active broadcasts from hospitals in need of blood donations
          </p>
        </div>
      </div>

      <ActiveBroadcasts 
        broadcasts={broadcasts} 
        donorBloodType={user.bloodType}
      />
    </div>
  );
}
