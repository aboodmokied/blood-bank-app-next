"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

type Broadcast = {
  hospitalId: number;
  hospitalName: string;
  bloodType: string;
  donorsNotified: number;
  createdAt: Date | string;
};

type BroadcastListProps = {
  broadcasts: Broadcast[];
};

export default function BroadcastList({ broadcasts }: BroadcastListProps) {
  if (broadcasts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Broadcast History</CardTitle>
          <CardDescription>Your recent urgent blood need broadcasts</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            No broadcasts sent yet. Create your first broadcast above.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Broadcast History</CardTitle>
        <CardDescription>Your recent urgent blood need broadcasts</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Blood Type</TableHead>
              <TableHead>Donors Notified</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {broadcasts.map((broadcast, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Badge variant="outline" className="font-semibold">
                    {broadcast.bloodType}
                  </Badge>
                </TableCell>
                <TableCell>{broadcast.donorsNotified}</TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDistanceToNow(new Date(broadcast.createdAt), {
                    addSuffix: true,
                  })}
                </TableCell>
                <TableCell>
                  <Badge className="bg-green-500">Sent</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
