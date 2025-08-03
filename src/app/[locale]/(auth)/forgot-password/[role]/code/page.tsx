import { notFound } from "next/navigation";
import EnterCodeFrom from "./EnterCodeForm";
import { validRoles } from "@/constants";

interface PageProps {
  params: Promise<{ locale: string; role: string }>;
}

export function generateStaticParams() {
  return validRoles.flatMap((role) => [
    { role, locale: "en" },
    { role, locale: "ar" },
  ]);
}

export default async function EnterCodePage({ params }: PageProps) {
  const { role } = await params;

  if (!validRoles.includes(role)) {
    notFound();
  }

  return <EnterCodeFrom role={role} />;
}
