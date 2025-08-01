import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import axios from "axios";
import { User } from "@/types/auth.types";
import { Link } from "@/i18n/navigation";
import { getUserFromCookies } from "@/lib/auth";

export default async function DashboardPage() {
  let user: User = await getUserFromCookies();
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
        <main className="flex-1 p-6 md:p-8 mt-16 md:mt-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome, {user.name.charAt(0).toUpperCase() + user.name.slice(1)} 👋
          </h1>
          <p className="text-gray-600 mb-8">Here’s your recent activity</p>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard title="Next Appointment">
              <p className="text-gray-600">No upcoming appointment.</p>
            </DashboardCard>

            <DashboardCard title="Total Donations">
              <p className="text-3xl font-bold text-red-600">0</p>
            </DashboardCard>

            <DashboardCard title="Eligibility Status">
              <p className="text-green-600 font-medium">Eligible</p>
            </DashboardCard>
          </section>
        </main>
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 border">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>
      {children}
    </div>
  );
}
