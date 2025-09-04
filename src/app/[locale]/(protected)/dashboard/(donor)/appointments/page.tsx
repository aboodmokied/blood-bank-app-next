import {
  axiosRequest,
  getAuthorizedAxios,
  getUserFromCookies,
} from "@/lib/auth";
import AppointmentForm from "./AppointmentForm";
import AppointmentList from "./AppointmentList";

async function getAppointments(page: number = 1, limit: number = 5) {
  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/appointments?page=${page}&limit=${limit}`,
  //     { cache: "no-store" } // always fresh data
  //   );
  //   if (!res.ok) throw new Error("Failed to fetch appointments");
  //   return res.json();
  return {
    data: [
      {
        id: 1,
        donorId: 101,
        hospitalId: 201,
        date: "2025-09-05T10:00:00Z",
        status: "PENDING",
      },
      {
        id: 2,
        donorId: 102,
        hospitalId: 202,
        date: "2025-09-06T14:30:00Z",
        status: "CONFIRMED",
      },
      {
        id: 3,
        donorId: 103,
        hospitalId: 201,
        date: "2025-09-07T09:15:00Z",
        status: "CANCELLED",
      },
      {
        id: 4,
        donorId: 104,
        hospitalId: 203,
        date: "2025-09-08T16:45:00Z",
        status: "PENDING",
      },
      {
        id: 5,
        donorId: 105,
        hospitalId: 204,
        date: "2025-09-09T11:20:00Z",
        status: "CONFIRMED",
      },
    ],
    totalPages: 2,
  };
}

export default async function AppointmentPage() {
  const authAxios = await getAuthorizedAxios();
  const user = await getUserFromCookies();
  if (!user) throw new Error("User not found");
  const res = await axiosRequest<{
    appointments: any;
    pagination: { page: number; limit: number; totalPages: number };
  }>(authAxios, {
    method: "GET",
    withCredentials: true,
    url: `http://localhost:5000/appointments/donor/${user.id}`,
  });
  const { appointments, pagination } = res;
  return (
    <div className="p-6 grid gap-6">
      <AppointmentForm />
      <AppointmentList initialData={{ appointments, pagination }} />
    </div>
  );
}
