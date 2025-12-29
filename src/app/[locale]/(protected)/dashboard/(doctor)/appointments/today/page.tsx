
import { auth } from "@/auth";
import { getAuthorizedAxios } from "@/lib/axios-auth";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default async function TodayAppointmentsPage() {
  const session = await auth();
  const user = session?.user;

  if (!user || user.role !== "doctor") {
    return <div>Access Denied</div>;
  }

  const authAxios = await getAuthorizedAxios();
  const today = format(new Date(), "yyyy-MM-dd");
  let appointments = [];

  try {
    const res = await authAxios.get(`${process.env.NEXT_PUBLIC_API_URL}/appointments/day/${today}`);
    appointments = res.data?.appointments || [];
  } catch (error) {
    console.error("Failed to fetch appointments", error);
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Today's Appointments ({today})</h2>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Donor ID</TableHead>
              <TableHead>Hospital ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24">
                  No appointments for today.
                </TableCell>
              </TableRow>
            ) : (
              appointments.map((apt: any) => (
                <TableRow key={apt.id}>
                  <TableCell>
                    {format(new Date(apt.date), "p")}
                  </TableCell>
                  <TableCell>#{apt.donorId}</TableCell>
                  <TableCell>#{apt.hospitalId}</TableCell>
                  <TableCell>
                    <Badge variant={apt.status === 'confirmed' ? 'default' : 'secondary'}>
                      {apt.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {apt.status === 'confirmed' || apt.status === 'pending' ? (
                       <Link 
                         href={`/dashboard/donations/add?donorId=${apt.donorId}&hospitalId=${apt.hospitalId}&appointmentId=${apt.id}`}
                       >
                         <Button size="sm">Record Donation</Button>
                       </Link>
                    ) : (
                        <span className="text-muted-foreground text-sm">No actions</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
