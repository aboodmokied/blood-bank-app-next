
import { auth } from "@/auth";
import DonationForm from "@/components/dashboard/doctor/DonationForm";
import { redirect } from "next/navigation";
import { getAuthorizedAxios } from "@/lib/axios-auth";
import axios from "axios";

export default async function AddDonationPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await auth();
  const user = session?.user;
  const params = await searchParams;
  const authAxios = await getAuthorizedAxios();

  if (!user || user.role !== "doctor") {
    return <div>Access Denied</div>;
  }

  const defaults = {
    donorId: params.donorId ? Number(params.donorId) : undefined,
    hospitalId: params.hospitalId ? Number(params.hospitalId) : undefined,
    appointmentId: params.appointmentId ? Number(params.appointmentId) : undefined,
    donorName: "",
    hospitalName: "",
  };

  if (defaults.donorId) {
    try {
      const res = await authAxios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/donors/${defaults.donorId}`);
      if (res.data) defaults.donorName = res.data.name;
    } catch (e) { console.error("Failed to fetch donor", e); }
  }

  if (defaults.hospitalId) {
    try {
      const res = await authAxios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/hospitals/${defaults.hospitalId}`);
      if (res.data) defaults.hospitalName = res.data.name;
    } catch (e) { console.error("Failed to fetch hospital", e); }
  }

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
