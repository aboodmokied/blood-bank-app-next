"use client";

import { useTranslations } from "next-intl";
export default function Home() {
  const t = useTranslations();
  return <h1 className="text-2xl font-bold">{t("welcome")}</h1>;
}
