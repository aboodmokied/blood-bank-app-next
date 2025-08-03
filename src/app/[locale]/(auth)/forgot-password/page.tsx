import ForgotPasswordLinks from "@/app/[locale]/(auth)/forgot-password/ForgotPasswordLinks";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordLinks />;
}
