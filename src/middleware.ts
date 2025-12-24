import createMiddleware from "next-intl/middleware";
import { auth } from "@/auth";

const intlMiddleware = createMiddleware({
  locales: ["en", "ar"],
  defaultLocale: "en",
});

export default auth((req) => {
  const isAuth = !!req.auth;
  const isDashboard = req.nextUrl.pathname.includes("/dashboard");

  if (isDashboard && !isAuth) {
     return Response.redirect(new URL("/login", req.nextUrl));
  }

  return intlMiddleware(req);
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
