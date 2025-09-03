"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";

interface Hospital {
  id: number;
  name: string;
}

export default function AppointmentForm() {
  const [donorId, setDonorId] = useState("");
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(
    null
  );
  const [date, setDate] = useState("");
  const [search, setSearch] = useState("");

  // Fetch hospitals whenever search changes
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const res = await axios.get(`/api/user/hospital`, {
          params: { search },
          withCredentials: true,
        });
        setHospitals(res.data.users);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };

    // debounce (wait 400ms before calling API)
    const timer = setTimeout(() => {
      fetchHospitals();
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const handleCreate = async () => {
    try {
      if (!selectedHospital) {
        alert("Please select a hospital");
        return;
      }
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/appointments`, {
        donorId: Number(donorId),
        hospitalId: selectedHospital.id,
        date,
      });

      setDonorId("");
      setSelectedHospital(null);
      setDate("");
      window.location.reload(); // temporary refresh
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  return (
    <Card className="p-4 shadow-md">
      <h2 className="text-lg font-semibold mb-3">Book New Appointment</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Donor ID */}
        {/* <Input
          placeholder="Donor ID"
          value={donorId}
          onChange={(e) => setDonorId(e.target.value)}
        /> */}

        {/* Hospital Search */}
        <div>
          {/* <label className="text-sm font-medium">Select Hospital</label> */}
          <Command className="border rounded-md">
            <CommandInput
              placeholder="Search hospital..."
              value={search}
              onValueChange={setSearch}
            />
            <CommandList>
              <CommandEmpty>No hospitals found.</CommandEmpty>
              <CommandGroup>
                {hospitals.map((hospital) => (
                  <CommandItem
                    key={hospital.id}
                    onSelect={() => setSelectedHospital(hospital)}
                  >
                    {hospital.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          {selectedHospital && (
            <p className="text-sm text-muted-foreground mt-1">
              Selected: {selectedHospital.name}
            </p>
          )}
        </div>

        {/* Appointment Date */}
        <Input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <Button className="mt-4" variant="destructive" onClick={handleCreate}>
        Create Appointment
      </Button>
    </Card>
  );
}
