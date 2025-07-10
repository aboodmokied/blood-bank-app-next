import { NAV_HEIGHT } from "@/constants";
import { Link } from "@/i18n/navigation";
import React from "react";
import { LocaleSwitcher } from "../locale-switcher";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";

const navLinks = [
  { name: "home", href: "/" },
  { name: "about", href: "#about" },
  { name: "services", href: "#services" },
  { name: "contact", href: "#contact" },
];

export default function LandingNavbar() {
  const t = useTranslations("header");
  return (
    <header
      style={{ height: `${NAV_HEIGHT}px` }}
      className="w-full sticky inset-0 flex items-center justify-between p-4 md:px-10 shadow-md"
    >
      {/* Logo */}
      <div className="flex items-center space-x-3 md:w-[25%]">
        <div className="bg-red-600 p-2 rounded-lg">
          <Heart className="h-4 w-4 md:h-6 md:w-6 text-white fill-current" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">LifeBank</h1>
          <p className="hidden md:block text-xs text-gray-500">
            Blood Bank System
          </p>
        </div>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center space-x-8 grow-1 justify-center">
        {navLinks.map((item) => (
          <div key={item.name} className="relative group">
            <a
              href={item.href}
              className={`flex items-center space-x-1 text-sm font-medium transition-colors ${
                // item.active
                //   ? "text-red-600"
                "text-gray-700 hover:text-red-600"
              }`}
            >
              <span>{t(item.name)}</span>
            </a>
          </div>
        ))}
      </nav>
      {/* Right side items - using logical properties */}
      <div className="flex flex-1 items-center justify-end gap-2 md:w-[25%]">
        <LocaleSwitcher />
        <Button variant="ghost" size="sm" asChild>
          <Link href="/login">{t("login")}</Link>
        </Button>
        <Button size="sm" className="bg-red-600 hover:bg-red-500" asChild>
          <Link href="/signup">{t("signup")}</Link>
        </Button>
      </div>
    </header>
  );
}
