"use client";

import { useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function DonationPage() {
  const [form, setForm] = useState({
    donorId: "",
    hospitalId: "",
    doctorId: "",
    appointmentId: "",
    donationDate: new Date().toISOString().split("T")[0],
    bloodType: "",
    volume: "",
    status: "collected",
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/donations", form); // This will call your NestJS API
      toast.success("Donation created successfully!");
      setForm({
        donorId: "",
        hospitalId: "",
        doctorId: "",
        appointmentId: "",
        donationDate: new Date().toISOString().split("T")[0],
        bloodType: "",
        volume: "",
        status: "collected",
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create donation");
    }
  };

  return (
    <div className="flex justify-center p-8">
      <Card className="w-full max-w-xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Create Donation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Donor ID */}
            <div>
              <Label>Donor ID</Label>
              <Input
                type="number"
                value={form.donorId}
                onChange={(e) => handleChange("donorId", e.target.value)}
                required
              />
            </div>

            {/* Hospital ID */}
            <div>
              <Label>Hospital ID</Label>
              <Input
                type="number"
                value={form.hospitalId}
                onChange={(e) => handleChange("hospitalId", e.target.value)}
                required
              />
            </div>

            {/* Doctor ID */}
            <div>
              <Label>Doctor ID</Label>
              <Input
                type="number"
                value={form.doctorId}
                onChange={(e) => handleChange("doctorId", e.target.value)}
                required
              />
            </div>

            {/* Appointment ID (optional) */}
            <div>
              <Label>Appointment ID (optional)</Label>
              <Input
                type="number"
                value={form.appointmentId}
                onChange={(e) => handleChange("appointmentId", e.target.value)}
              />
            </div>

            {/* Donation Date */}
            <div>
              <Label>Donation Date</Label>
              <Input
                type="date"
                value={form.donationDate}
                onChange={(e) => handleChange("donationDate", e.target.value)}
                required
              />
            </div>

            {/* Blood Type */}
            <div>
              <Label>Blood Type</Label>
              <Select
                value={form.bloodType}
                onValueChange={(v) => handleChange("bloodType", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select blood type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Volume */}
            <div>
              <Label>Volume (ml)</Label>
              <Input
                type="number"
                value={form.volume}
                onChange={(e) => handleChange("volume", e.target.value)}
                required
              />
            </div>

            {/* Status */}
            <div>
              <Label>Status</Label>
              <Select
                value={form.status}
                onValueChange={(v) => handleChange("status", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="collected">Collected</SelectItem>
                  <SelectItem value="tested">Tested</SelectItem>
                  <SelectItem value="stored">Stored</SelectItem>
                  <SelectItem value="discarded">Discarded</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full">
              Create Donation
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
