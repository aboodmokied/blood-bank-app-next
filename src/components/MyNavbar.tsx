"use client";

import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { useLocale, useTranslations } from "next-intl";

const navItems = [
  { name: "home", href: "/" },
  { name: "features", href: "/features" },
  { name: "pricing", href: "/pricing" },
  { name: "about", href: "/about" },
  { name: "contact", href: "/contact" },
];

export function Navbar() {
  const locale = useLocale();
  const t = useTranslations("navigation");
  const isRTL = locale === "ar"; // Add your RTL languages here

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-2 py-1">
      <div className="container flex h-14 items-center">
        {/* Desktop Logo - using logical properties */}
        <div className={`hidden md:block me-4`}>
          <Link href="/" className={`flex items-center space-x-2 me-6`}>
            <span className="hidden font-bold sm:inline-block">Logo</span>
          </Link>
        </div>

        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className={`px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden me-2`}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">{t("toggleMenu")}</span>
            </Button>
          </SheetTrigger>
          <SheetContent side={isRTL ? "right" : "left"} className="pr-0">
            <div className="flex h-full flex-col">
              <div className="flex items-center pb-6 pt-3">
                <Link href="/" className="flex items-center space-x-2">
                  <span className="font-bold">{t("brand")}</span>
                </Link>
              </div>
              <div className="flex flex-1 flex-col space-y-3 overflow-y-auto">
                {navItems.map((item) => (
                  <MobileNavItem key={item.href} href={item.href}>
                    {t(item.name)}
                  </MobileNavItem>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Navigation - using logical spacing */}
        <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                "text-foreground/60"
              )}
            >
              {t(item.name)}
            </Link>
          ))}
        </nav>

        {/* Right side items - using logical properties */}
        <div className="flex flex-1 items-center justify-end gap-2">
          <LocaleSwitcher />
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">{t("login")}</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/signup">{t("signup")}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function MobileNavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="py-2 text-lg transition-colors hover:text-foreground/80"
    >
      {children}
    </Link>
  );
}
