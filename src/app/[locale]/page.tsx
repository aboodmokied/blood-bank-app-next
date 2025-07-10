import Features from "@/components/landing/features";
import Hero from "@/components/landing/hero";
import LandingNavbar from "@/components/landing/landing-navbar";

export default function LandingPage() {
  return (
    <div className="bg-gradient-to-br from-red-50 via-white to-red-50 ">
      <LandingNavbar />
      <main className="p-4 container mx-auto">
        <Hero />
        <Features />
      </main>
      <footer>Footer</footer>
    </div>
  );
}
