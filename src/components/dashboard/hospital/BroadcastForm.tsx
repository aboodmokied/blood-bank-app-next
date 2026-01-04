"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Radio } from "lucide-react";
import axios from "axios";

const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

type BroadcastFormProps = {
  accessToken: string;
  onSuccess?: (broadcast: any) => void;
};

export default function BroadcastForm({ accessToken, onSuccess }: BroadcastFormProps) {
  const [bloodType, setBloodType] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bloodType) {
      setError("Please select a blood type");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/broadcast/urgent-need`,
        { bloodType },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setSuccess(response.data.message);
      setBloodType("");
      
      if (onSuccess && response.data.broadcast) {
        onSuccess(response.data.broadcast);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send broadcast");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Radio className="h-5 w-5 text-red-600" />
          Create Urgent Blood Need Broadcast
        </CardTitle>
        <CardDescription>
          Notify eligible donors about urgent blood requirements
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="bloodType" className="text-sm font-medium">
              Blood Type Needed
            </label>
            <Select value={bloodType} onValueChange={setBloodType}>
              <SelectTrigger id="bloodType">
                <SelectValue placeholder="Select blood type" />
              </SelectTrigger>
              <SelectContent>
                {BLOOD_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-500 bg-green-50 text-green-900">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            disabled={loading || !bloodType}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending Broadcast...
              </>
            ) : (
              <>
                <Radio className="mr-2 h-4 w-4" />
                Send Broadcast
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
