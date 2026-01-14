import { getAuthorizedAxios } from "@/lib/axios-auth";
import { auth } from "@/auth";
import AppointmentForm from "./AppointmentForm";
import AppointmentList from "./AppointmentList";

type AppointmentPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ hospitalId?: string }>;
};

export default async function AppointmentPage({ searchParams }: AppointmentPageProps) {
  const awaitedSearchParams = await searchParams;
  const authAxios = await getAuthorizedAxios();
  const session = await auth();
  const user = session?.user;
  if (!user) throw new Error("User not found");
  
  let appointments = [];
  let pagination = { page: 1, limit: 5, totalPages: 0 };

  try {
     const res = await authAxios.get(`/appointments/donor/${user.id}`);
     appointments = res.data?.appointments || [];
     pagination = res.data?.pagination || pagination;
  } catch (error) {
     console.error(error);
  }

  const preselectedHospitalId = awaitedSearchParams.hospitalId 
    ? Number(awaitedSearchParams.hospitalId) 
    : undefined;

  return (
    <div className="p-6 grid gap-6">
      <AppointmentForm donorId={user.id} preselectedHospitalId={preselectedHospitalId} />
      <AppointmentList initialData={{ appointments, pagination }} />
    </div>
  );
}
