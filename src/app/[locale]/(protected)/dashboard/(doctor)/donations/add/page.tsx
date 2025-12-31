
import { auth } from "@/auth";
import DonationForm from "@/components/dashboard/doctor/DonationForm";
import { redirect } from "next/navigation";

export default async function AddDonationPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await auth();
  const user = session?.user;
  const params = await searchParams;

  if (!user || user.role !== "doctor") {
    return <div>Access Denied</div>;
  }

  const defaults = {
    donorId: params.donorId ? Number(params.donorId) : undefined,
    hospitalId: params.hospitalId ? Number(params.hospitalId) : undefined,
    appointmentId: params.appointmentId ? Number(params.appointmentId) : undefined,
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Add New Donation</h2>
      </div>
      <div className="border p-6 rounded-lg bg-card">
         <DonationForm doctorId={user.id} defaults={defaults} accessToken={user.accessToken!} />
      </div>
    </div>
  );
}
