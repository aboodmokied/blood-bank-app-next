
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { handleApiError } from "@/lib/api-error";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Building2 } from "lucide-react";

const formSchema = z.object({
  donorId: z.coerce.number().min(1, "Donor ID is required"),
  hospitalId: z.coerce.number().min(1, "Hospital ID is required"),
  bloodType: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
  volume: z.coerce.number().min(100, "Volume must be at least 100ml").max(600, "Volume limit exceeded"),
  appointmentId: z.number().optional(),
});

type DonationDefaults = {
  donorId?: number;
  hospitalId?: number;
  appointmentId?: number;
  donorName?: string;
  hospitalName?: string;
};

export default function DonationForm({ 
  doctorId, 
  defaults,
  accessToken
}: { 
  doctorId: number;
  defaults?: DonationDefaults;
  accessToken: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      donorId: defaults?.donorId,
      hospitalId: defaults?.hospitalId,
      appointmentId: defaults?.appointmentId, // Hidden field ideally, or just passed
      bloodType: "O+",
      volume: 450,
    },
  });

    async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/donations`, {
        ...values,
        doctorId: Number(doctorId),
        appointmentId: defaults?.appointmentId ? Number(defaults.appointmentId) : undefined,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      toast.success("Donation recorded successfully");
      form.reset();
      router.refresh();
    } catch (error: any) {
      const { message, errors } = handleApiError(error);
      toast.error(message || "Failed to record donation");
      // If backend sends structured errors for fields
      if (errors) {
        Object.entries(errors).forEach(([key, value]) => {
           form.setError(key as any, { type: "manual", message: value as string });
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Summary Card for Donor and Hospital */}
      {(defaults?.donorName || defaults?.hospitalName) && (
        <Card className="bg-muted/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">Donation Context</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {defaults.donorName && (
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <User className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Donor</p>
                  <p className="font-semibold">{defaults.donorName}</p>
                  <Badge variant="outline" className="text-xs">ID: {defaults.donorId}</Badge>
                </div>
              </div>
            )}
            
            {defaults.hospitalName && (
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 dark:bg-red-900 rounded-full">
                  <Building2 className="h-4 w-4 text-red-600 dark:text-red-300" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Hospital</p>
                  <p className="font-semibold">{defaults.hospitalName}</p>
                  <Badge variant="outline" className="text-xs">ID: {defaults.hospitalId}</Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-lg">
        <FormField
          control={form.control}
          name="donorId"
          render={({ field }) => (
            <FormItem className={defaults?.donorId ? "hidden" : "block"}>
              <FormLabel>Donor ID</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter Donor ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hospitalId"
          render={({ field }) => (
            <FormItem className={defaults?.hospitalId ? "hidden" : "block"}>
              <FormLabel>Hospital ID</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter Hospital ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bloodType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blood Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                    (type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="volume"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Volume (mL)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Recording..." : "Record Donation"}
        </Button>
      </form>
    </Form>
    </div>
  );
}
