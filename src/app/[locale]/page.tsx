import Hero from "@/components/landing/hero";
import LandingNavbar from "@/components/landing/landing-navbar";

export default function LandingPage() {
  return (
    <div className="container bg-gradient-to-br from-red-50 via-white to-red-50 mx-auto">
      <LandingNavbar />
      <main className="p-4">
        <Hero />
      </main>
      <footer>Footer</footer>
    </div>
  );
}
