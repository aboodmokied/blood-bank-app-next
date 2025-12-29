import { getAuthorizedAxios } from "@/lib/axios-auth";
import { auth } from "@/auth";
import AppointmentForm from "./AppointmentForm";
import AppointmentList from "./AppointmentList";



export default async function AppointmentPage() {
  const authAxios = await getAuthorizedAxios();
  const session = await auth();
  const user = session?.user;
  if (!user) throw new Error("User not found");
  
  let appointments = [];
  let pagination = { page: 1, limit: 5, totalPages: 0 };

  try {
     const res = await authAxios.get(`http://localhost:5000/appointments/donor/${user.id}`);
     appointments = res.data?.appointments || [];
     pagination = res.data?.pagination || pagination;
  } catch (error) {
     console.error(error);
  }
  return (
    <div className="p-6 grid gap-6">
      <AppointmentForm />
      <AppointmentList initialData={{ appointments, pagination }} />
    </div>
  );
}
