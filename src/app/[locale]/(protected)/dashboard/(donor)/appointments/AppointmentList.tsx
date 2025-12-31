"use client";

import { useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

interface Appointment {
  id: number;
  donorId: number;
  hospitalId: number;
  date: string;
  status: string;
}

interface Props {
  initialData: {
    appointments: any;
    pagination: { page: number; limit: number; totalPages: number };
  };
}

export default function AppointmentList({ initialData }: Props) {
  const [appointments, setAppointments] = useState(
    initialData?.appointments || []
  );
  const [page, setPage] = useState(1);
  const [totalPages] = useState(initialData?.pagination?.totalPages || 0);

  const fetchAppointments = async (page: number) => {
    try {
      const res = await axios.get(`/api/appointments?page=${page}&limit=10`, {
        withCredentials: true,
      });
      setAppointments(res.data.appointments);
      setPage(page);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await axios.patch(`/api/appointments`, { status, id });
      fetchAppointments(page);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // const handleDelete = async (id: number) => {
  //   try {
  //     await axios.delete(
  //       `${process.env.NEXT_PUBLIC_API_URL}/appointments/${id}`
  //     );
  //     fetchAppointments(page);
  //   } catch (error) {
  //     console.error("Error deleting:", error);
  //   }
  // };

  return (
    <Card className="p-4 shadow-md">
      <h2 className="text-lg font-semibold mb-3">Appointments</h2>
      <div className="grid gap-3">
        {appointments.map((appt: any) => (
          <CardContent
            key={appt.id}
            className="flex justify-between items-center border p-3 rounded-lg shadow-sm"
          >
            <div>
              <p>
                <strong>ID:</strong> {appt.id}
              </p>
              <p>
                <strong>Date:</strong> {format(new Date(appt.date), "Pp")}
              </p>
              <p>
                <strong>Status:</strong> {appt.status}
              </p>
            </div>
            <div className="flex gap-2">
              {/* <Select
                onValueChange={(value) => handleStatusChange(appt.id, value)}
              >
                <SelectTrigger className="w-[120px]">
                  {appt.status}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select> */}
              {(appt.status.toLocaleLowerCase() == "pending" ||
                appt.status.toLocaleLowerCase() == "confirmed") && (
                <Button
                  variant="destructive"
                  onClick={() => handleStatusChange(appt.id, "cancelled")}
                >
                  Cancel
                </Button>
              )}
            </div>
          </CardContent>
        ))}
      </div>

      {/* Pagination */}
      <Pagination className="mt-4">
        <PaginationContent>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                onClick={() => fetchAppointments(i + 1)}
                isActive={page === i + 1}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
        </PaginationContent>
      </Pagination>
    </Card>
  );
}
