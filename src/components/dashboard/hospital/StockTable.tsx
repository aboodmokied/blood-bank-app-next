
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

type BloodUnit = {
  id: number;
  bloodType: string;
  status: string;
  expiryDate: string;
  createdAt: string;
};

export default function StockTable({ units }: { units: BloodUnit[] }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "passed":
        return "default"; // green/primary
      case "failed":
        return "destructive";
      case "pending":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Blood Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Expiry Date</TableHead>
            <TableHead>Added On</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {units.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center h-24">
                No blood units found.
              </TableCell>
            </TableRow>
          ) : (
            units.map((unit) => (
              <TableRow key={unit.id}>
                <TableCell className="font-medium">#{unit.id}</TableCell>
                <TableCell className="font-bold">{unit.bloodType}</TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(unit.status)}>
                    {unit.status.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>
                  {unit.expiryDate
                    ? format(new Date(unit.expiryDate), "PPP")
                    : "N/A"}
                </TableCell>
                <TableCell>
                  {format(new Date(unit.createdAt), "PPP")}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
