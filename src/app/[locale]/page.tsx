import Stats from "@/components/landing/stats";
import Hero from "@/components/landing/hero";
import LandingNavbar from "@/components/landing/landing-navbar";
import Features from "@/components/landing/features";

export default function LandingPage() {
  return (
    <div className="bg-gradient-to-br from-red-50 via-white to-red-50 ">
      <LandingNavbar />
      <main className="p-4 container mx-auto">
        <Hero />
        <Stats />
        <Features />
      </main>
      <footer>Footer</footer>
    </div>
  );
}
