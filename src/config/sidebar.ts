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
    { label: "Dashboard", icon: Home },
    { label: "Appointments", icon: ClipboardList },
    { label: "Donors", icon: Users },
  ],
  doctor: [
    { label: "Dashboard", icon: Home },
    { label: "Patients", icon: Users },
    { label: "Reports", icon: ClipboardList },
  ],
  admin: [
    { label: "Dashboard", icon: Home },
    { label: "Manage Users", icon: Users },
    { label: "System Logs", icon: ClipboardList },
    { label: "Permissions", icon: ShieldCheck },
    { label: "Hospitals", icon: Hospital },
  ],
};
