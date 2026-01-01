
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MedicalTestForm from "./MedicalTestForm";
import { format } from "date-fns";

interface Donation {
  id: number;
  donorId: number;
  bloodType: string;
  volume: number;
  createdAt: string;
  donor?: { name: string };
}

export default function MedicalTestList({ accessToken }: { accessToken?: string }) {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<number | null>(null);

  const fetchDonations = async () => {
    try {
      if (!accessToken) return;
      
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/donations?status=collected&limit=100`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // Filter client side as well just in case, but assume server handles it
      // Don't have donor name in basic list usually unless included. 
      // We might need to ask backend to include Donor.
      setDonations(res.data.donations || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) fetchDonations();
  }, [accessToken]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Blood Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Volume</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {donations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No pending donations found.
              </TableCell>
            </TableRow>
          ) : (
            donations.map((d) => (
              <TableRow key={d.id}>
                <TableCell>{d.id}</TableCell>
                <TableCell>{d.bloodType}</TableCell>
                <TableCell>{format(new Date(d.createdAt), "Pp")}</TableCell>
                <TableCell>{d.volume} ml</TableCell>
                <TableCell>
                  <Dialog open={openId === d.id} onOpenChange={(open) => setOpenId(open ? d.id : null)}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">Conduct Test</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Medical Test for Donation #{d.id}</DialogTitle>
                      </DialogHeader>
                      <MedicalTestForm 
                        donationId={d.id} 
                        accessToken={accessToken}
                        onSuccess={() => {
                          setOpenId(null);
                          fetchDonations();
                        }} 
                      />
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
