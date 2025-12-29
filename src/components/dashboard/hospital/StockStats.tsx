
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplet } from "lucide-react";

type StockStats = Record<string, { total: number }>;

export default function StockStats({ stats }: { stats: StockStats }) {
  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {bloodTypes.map((type) => {
        const count = stats[type]?.total || 0;
        return (
          <Card key={type}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Type {type}
              </CardTitle>
              <Droplet className={`h-4 w-4 ${count < 5 ? 'text-red-500' : 'text-green-500'}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{count}</div>
              <p className="text-xs text-muted-foreground">
                Units available
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
