"use client";

type DashboardHeaderProps = {
  user: {
    role: string;
  };
};

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <header className="p-6 md:p-8 border-b bg-white shadow-sm fixed top-0 left-0 right-0 z-10 mt-16 md:mt-0">
      <h1 className="text-3xl font-bold text-gray-900">
        Welcome, {user.role.charAt(0).toUpperCase() + user.role.slice(1)} 👋
      </h1>
      <p className="text-gray-600">Here’s your recent activity</p>
    </header>
  );
}
