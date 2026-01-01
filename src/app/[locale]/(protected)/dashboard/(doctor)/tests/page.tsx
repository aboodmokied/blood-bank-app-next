import MedicalTestList from "@/components/dashboard/doctor/MedicalTestList";
import { auth } from "@/auth";

export default async function MedicalTestsPage() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Medical Tests</h2>
      </div>
      <div className="bg-card p-6 rounded-lg border">
        <MedicalTestList accessToken={user?.accessToken} />
      </div>
    </div>
  );
}
