"use client";

import { Heart, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { User } from "@/types/auth.types";
import { NAV_ITEMS } from "@/config/sidebar";
import { Link, usePathname } from "@/i18n/navigation";

type DashboardSidebarProps = {
  user: User;
};

export default function DashboardSidebar({ user }: DashboardSidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = NAV_ITEMS[user.role];
  const pathname = usePathname();
  const logout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <>
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden flex justify-between items-center p-4 border-b bg-white shadow-sm z-20">
        <div className="flex items-center space-x-2">
          <div className="bg-red-600 p-2 rounded-md">
            <Heart className="text-white h-5 w-5 fill-current" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">LifeBank</h2>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "w-full md:w-64 bg-white border-r shadow-md flex flex-col z-10 md:translate-x-0 transition-transform duration-200",
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          "absolute md:relative top-0 left-0 h-screen md:h-auto"
        )}
      >
        <div className="px-6 py-6 flex items-center space-x-3">
          <div className="bg-red-600 p-2 rounded-md">
            <Heart className="text-white h-6 w-6 fill-current" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">LifeBank</h2>
            <p className="text-sm text-gray-500 capitalize">
              {user.role} Panel
            </p>
          </div>
        </div>
        <Separator />
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item, index) => (
            <NavItem
              key={index}
              icon={item.icon}
              label={item.label}
              path={item.path || "/"}
              active={item.path == pathname}
            />
          ))}
        </nav>
        <Separator className="mt-auto" />
        <div className="p-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-800"
            onClick={logout}
          >
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
}

function NavItem({
  icon: Icon,
  label,
  active = false,
  path,
}: {
  icon: React.ElementType;
  label: string;
  path: string;
  active?: boolean;
}) {
  return (
    <Link href={path}>
      <button
        className={cn(
          "flex items-center w-full px-4 py-2 rounded-lg text-left text-gray-700 hover:bg-red-100 hover:text-red-700 transition-colors",
          active && "bg-red-500 text-white hover:bg-red-600"
        )}
      >
        <Icon className="mr-3 h-5 w-5" />
        <span className="text-sm font-medium">{label}</span>
      </button>
    </Link>
  );
}
