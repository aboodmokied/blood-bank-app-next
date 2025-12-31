import {
  Home,
  History,
  User2Icon,
  Users,
  ClipboardList,
  ShieldCheck,
  Hospital,
  Heart,
  Calendar,
  Droplet,
} from "lucide-react";

export const NAV_ITEMS: Record<
  "donor" | "hospital" | "doctor" | "admin",
  {
    label: string;
    icon: React.ElementType;
    path?: string;
  }[]
> = {
  donor: [
    { label: "Dashboard", icon: Home, path: "/dashboard" },
    {
      label: "Appointments",
      icon: Calendar,
      path: "/dashboard/appointments",
    },
    {
      label: "Donation History",
      icon: History,
      path: "/dashboard/donation-history",
    },
    {
      label: "Medical History",
      icon: Heart,
      path: "/dashboard/medical-history",
    },
    { label: "Profile", icon: User2Icon, path: "/dashboard/profile" },
  ],
  hospital: [
    { label: "Dashboard", icon: Home, path: "/dashboard" },
    { label: "Blood Stock", icon: Droplet, path: "/dashboard/stock" },
    { label: "Appointments", icon: ClipboardList, path: "/dashboard/appointments" },
    { label: "Donors", icon: Users, path: "/dashboard/donors" },
  ],
  doctor: [
    { label: "Dashboard", icon: Home, path: "/dashboard" },
    { label: "Today's Appointments", icon: Calendar, path: "/dashboard/appointments/today" },

    { label: "Patients", icon: Users, path: "/dashboard/patients" },
    { label: "Reports", icon: ClipboardList, path: "/dashboard/reports" },
  ],
  admin: [
    { label: "Dashboard", icon: Home },
    { label: "Manage Users", icon: Users },
    { label: "System Logs", icon: ClipboardList },
    { label: "Permissions", icon: ShieldCheck },
    { label: "Hospitals", icon: Hospital },
  ],
};
