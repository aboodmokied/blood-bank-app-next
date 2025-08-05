import { ReactNode } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { getUserFromCookies } from "@/lib/auth";
import { Link } from "@/i18n/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getUserFromCookies();

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-50 p-4 text-center">
        <div className="bg-white shadow-md rounded-xl p-8 border max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Session Ended
          </h2>
          <p className="text-gray-600 mb-6">
            Your session has expired or could not be verified. Please log in
            again.
          </p>
          <Link
            href="/login"
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-red-50 via-white to-red-50">
      <DashboardSidebar user={user} />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 md:p-8 mt-16 md:mt-0">{children}</main>
      </div>
    </div>
  );
}
