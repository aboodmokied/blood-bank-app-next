
import { auth } from "@/auth";
import { getAuthorizedAxios } from "@/lib/axios-auth";
import StockStats from "@/components/dashboard/hospital/StockStats";
import StockTable from "@/components/dashboard/hospital/StockTable";
import { redirect } from "next/navigation";

export default async function StockPage() {
  const session = await auth();
  const user = session?.user;

  if (!user || user.role !== "hospital") {
    // Should be handled by middleware, but extra safety
    return <div>Access Denied</div>;
  }

  const authAxios = await getAuthorizedAxios();
  let stats = {};
  let units = [];

  try {
    // Parallel data fetching
    const [statsRes, unitsRes] = await Promise.all([
      authAxios.get(`${process.env.NEXT_PUBLIC_API_URL}/stock/hospitals/${user.id}/statistics`),
      authAxios.get(`${process.env.NEXT_PUBLIC_API_URL}/stock/hospitals/${user.id}`),
    ]);

    stats = statsRes.data;
    units = unitsRes.data;
  } catch (error) {
    console.error("Failed to fetch stock data", error);
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Blood Stock</h2>
      </div>
      
      <StockStats stats={stats} />
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Inventory List</h3>
        <StockTable units={units} />
      </div>
    </div>
  );
}
