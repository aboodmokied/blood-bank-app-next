"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const t = useTranslations("forgotPassword");
  const tRoles = useTranslations("roles");
  const roles = ["donor", "hospital", "doctor", "admin"] as const;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-red-50 via-white to-red-50">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full space-y-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">{t("chooseRole")}</h1>
        <div className="grid grid-cols-2 gap-4">
          {roles.map((role) => (
            <Link key={role} href={`/forgot-password/${role}`}>
              <Button
                variant="outline"
                className="w-full capitalize text-gray-800 hover:bg-red-600"
              >
                {role === "donor" && "🧑‍💉 "}
                {role === "hospital" && "🏥 "}
                {role === "doctor" && "🩺 "}
                {role === "admin" && "🔐 "}
                {tRoles(role)}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
