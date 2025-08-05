export default function DashboardPage() {
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome 👋</h1>
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
    </>
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
