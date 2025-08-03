import ResetPasswordForm from "@/app/[locale]/(auth)/forgot-password/[role]/reset/ResetPasswordForm";
import { validRoles } from "@/constants";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    locale: string;
    role: string;
  }>;
}

export function generateStaticParams() {
  return validRoles.flatMap((role) => [
    { role, locale: "en" },
    { role, locale: "ar" },
  ]);
}

export default async function ResetPasswordPage({ params }: PageProps) {
  const { role } = await params;

  if (!validRoles.includes(role)) {
    notFound();
  }

  return <ResetPasswordForm role={role} />;
}
