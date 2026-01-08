import { getAuthorizedAxios } from "@/lib/axios-auth";
import { auth } from "@/auth";
import { 
  Droplet, 
  Calendar, 
  Activity, 
  History, 
  Plus, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  ArrowRight,
  ClipboardList
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const authAxios = await getAuthorizedAxios();
  const session = await auth();
  const user = session?.user;

  if (!user) return null;

  let stats: any = {};
  try {
    const res = await authAxios.get(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/stats`);
    stats = res.data;
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
  }

  const renderDonorDashboard = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Donations" 
          value={stats.totalDonations} 
          icon={<History className="text-red-500" />} 
          description="Stored donations"
        />
        <StatCard 
          title="Eligibility" 
          value={stats.isEligible ? "Eligible" : "Ineligible"} 
          icon={<CheckCircle className={stats.isEligible ? "text-green-500" : "text-gray-400"} />} 
          description={stats.isEligible ? "Ready to donate" : "Medical clearance needed"}
        />
        <StatCard 
          title="Next Donation" 
          value={stats.nextEligibilityDate ? new Date(stats.nextEligibilityDate).toLocaleDateString() : "Anytime"} 
          icon={<Calendar className="text-blue-500" />} 
          description="Estimated date"
        />
        <StatCard 
          title="Urgent Alerts" 
          value={stats.activeBroadcastsCount} 
          icon={<AlertTriangle className="text-orange-500" />} 
          description={`Matching ${stats.bloodType || 'your type'}`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DashboardSection title="Upcoming Appointment">
          {stats.upcomingAppointment ? (
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">{new Date(stats.upcomingAppointment.date).toLocaleDateString()}</p>
                <p className="text-sm text-gray-600">Status: <span className="capitalize">{stats.upcomingAppointment.status}</span></p>
              </div>
              <Link href="/dashboard/appointments">
                <Button variant="outline" size="sm">Details</Button>
              </Link>
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500 border-2 border-dashed rounded-xl">
              No upcoming appointments.
            </div>
          )}
        </DashboardSection>

        <DashboardSection title="Quick Actions">
          <div className="grid grid-cols-2 gap-4">
            <QuickActionLink href="/dashboard/appointments" icon={<Plus />} label="Book Now" color="bg-red-500" />
            <QuickActionLink href="/dashboard/donation-history" icon={<History />} label="History" color="bg-blue-500" />
            <QuickActionLink href="/dashboard/donor-broadcasts" icon={<Activity />} label="Check Alerts" color="bg-orange-500" />
            <QuickActionLink href="/dashboard/medical-history" icon={<ClipboardList />} label="Medical Info" color="bg-green-500" />
          </div>
        </DashboardSection>
      </div>
    </div>
  );

  const renderHospitalDashboard = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Stock" 
          value={`${stats.totalStock} ml`} 
          icon={<Droplet className="text-red-500" />} 
          description="Available volume"
        />
        <StatCard 
          title="Pending Appointments" 
          value={stats.pendingAppointmentsCount} 
          icon={<Clock className="text-orange-500" />} 
          description="Action required"
        />
        <StatCard 
          title="Active Broadcasts" 
          value={stats.activeBroadcastsCount} 
          icon={<Activity className="text-blue-500" />} 
          description="Active alerts"
        />
        <StatCard 
          title="Recent Collections" 
          value={stats.recentCollections} 
          icon={<CheckCircle className="text-green-500" />} 
          description="Last 7 days"
        />
        <StatCard 
          title="Discarded Units" 
          value={stats.discardedUnitsCount} 
          icon={<AlertTriangle className="text-red-500" />} 
          description="Failed medical tests"
        />
      </div>

      <DashboardSection title="Quick Actions">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickActionLink href="/dashboard/broadcasts" icon={<Plus />} label="New Broadcast" color="bg-red-500" />
          <QuickActionLink href="/dashboard/stock" icon={<Droplet />} label="Manage Stock" color="bg-blue-500" />
          <QuickActionLink href="/dashboard/appointments" icon={<Calendar />} label="Schedule" color="bg-green-500" />
        </div>
      </DashboardSection>
    </div>
  );

  const renderDoctorDashboard = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Pending Tests" 
          value={stats.pendingTestsCount} 
          icon={<Clock className="text-orange-500" />} 
          description="Blood units to test"
        />
        <StatCard 
          title="Tests Done" 
          value={stats.conductedTestsCount} 
          icon={<CheckCircle className="text-green-500" />} 
          description="Total performance"
        />
        <StatCard 
          title="Today's Schedule" 
          value={stats.todayAppointmentsCount} 
          icon={<Calendar className="text-blue-500" />} 
          description="Appointments today"
        />
      </div>

      <DashboardSection title="Quick Actions">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickActionLink href="/dashboard/tests" icon={<Activity />} label="Run Tests" color="bg-orange-500" />
          <QuickActionLink href="/dashboard/donations/add" icon={<Plus />} label="Add Donation" color="bg-red-500" />
          <QuickActionLink href="/dashboard/appointments/today" icon={<ClipboardList />} label="Today's List" color="bg-blue-500" />
        </div>
      </DashboardSection>
    </div>
  );

  return (
    <div className="pb-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Welcome back, {user.name} 👋</h1>
        <p className="text-gray-600">Here’s what's happening today in the system.</p>
      </div>

      {user.role === 'donor' && renderDonorDashboard()}
      {user.role === 'hospital' && renderHospitalDashboard()}
      {user.role === 'doctor' && renderDoctorDashboard()}
    </div>
  );
}

function StatCard({ title, value, icon, description }: { title: string, value: any, icon: React.ReactNode, description: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <span className="text-sm font-medium text-gray-500">{title}</span>
        <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <p className="text-xs text-gray-400 mt-1">{description}</p>
      </div>
    </div>
  );
}

function DashboardSection({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      {children}
    </div>
  );
}

function QuickActionLink({ href, icon, label, color }: { href: string, icon: React.ReactNode, label: string, color: string }) {
  return (
    <Link href={href} className="group">
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center gap-4">
        <div className={`${color} text-white p-2 rounded-lg`}>
          {icon}
        </div>
        <div className="flex-grow">
          <p className="font-semibold text-gray-900 group-hover:text-red-500 transition-colors">{label}</p>
        </div>
        <ArrowRight size={16} className="text-gray-300 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
      </div>
    </Link>
  );
}
