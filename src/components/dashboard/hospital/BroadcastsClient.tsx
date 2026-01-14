"use client";

import { useState } from "react";
import BroadcastForm from "@/components/dashboard/hospital/BroadcastForm";
import BroadcastList from "@/components/dashboard/hospital/BroadcastList";

type BroadcastsClientProps = {
  accessToken: string;
};

export default function BroadcastsClient({ accessToken }: BroadcastsClientProps) {
  const [broadcasts, setBroadcasts] = useState<any[]>([]);

  const handleBroadcastSuccess = (newBroadcast: any) => {
    setBroadcasts([newBroadcast, ...broadcasts]);
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Broadcasts</h2>
      </div>

      <div className="space-y-4">
        <BroadcastForm accessToken={accessToken} onSuccess={handleBroadcastSuccess} />
        <BroadcastList broadcasts={broadcasts} />
      </div>
    </div>
  );
}
