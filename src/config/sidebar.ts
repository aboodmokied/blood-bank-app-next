import {
  Home,
  History,
  User2Icon,
  Users,
  ClipboardList,
  ShieldCheck,
  Hospital,
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
    { label: "Dashboard", icon: Home },
    { label: "Donation History", icon: History },
    { label: "Profile", icon: User2Icon },
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
