"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Calendar, MapPin, AlertCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "@/i18n/navigation";

type Broadcast = {
  hospitalId: number;
  // hospitalName: string;
  hospital: {
    name: string;
  };
  bloodType: string;
  donorsNotified: number;
  createdAt: Date | string;
};

type ActiveBroadcastsProps = {
  broadcasts: Broadcast[];
  donorBloodType?: string;
};

export default function ActiveBroadcasts({ broadcasts, donorBloodType }: ActiveBroadcastsProps) {
  if (broadcasts.length === 0) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Active Broadcasts</AlertTitle>
        <AlertDescription>
          There are currently no urgent blood need broadcasts. Check back later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {broadcasts.map((broadcast, index) => {
        // const isMatch = donorBloodType === broadcast.bloodType;
        const isMatch = true;
        
        return (
          <Card 
            key={index} 
            className={isMatch ? "border-red-500 border-2 shadow-lg" : ""}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {isMatch && (
                      <Badge className="bg-red-600">Match!</Badge>
                    )}
                    {broadcast.hospital.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {broadcast.hospital.name}
                  </CardDescription>
                </div>
                <Badge 
                  variant="outline" 
                  className={`text-lg font-bold ${isMatch ? 'border-red-600 text-red-600' : ''}`}
                >
                  {broadcast.bloodType}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                {formatDistanceToNow(new Date(broadcast.createdAt), {
                  addSuffix: true,
                })}
              </div>
              
              {isMatch && (
                <Alert className="bg-red-50 border-red-200">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-900">
                    Your blood type matches! Consider donating.
                  </AlertDescription>
                </Alert>
              )}

              <Link href={`/dashboard/appointments?hospitalId=${broadcast.hospitalId}`}>
                <Button 
                  className="w-full" 
                  variant={isMatch ? "default" : "outline"}
                >
                  Book Appointment
                </Button>
              </Link>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
