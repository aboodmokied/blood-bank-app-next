import Stats from "@/components/landing/stats";
import Hero from "@/components/landing/hero";
import LandingNavbar from "@/components/landing/landing-navbar";
import Features from "@/components/landing/features";
import DonorRegister from "@/components/landing/donor-register";
import Emergency from "@/components/landing/emergency";
import LandingFooter from "@/components/landing/landing-footer";

export default function LandingPage() {
  return (
    <div className="bg-gradient-to-br from-red-50 via-white to-red-50">
      <LandingNavbar />
      <main className="">
        <Hero />
        <Stats />
        <Features />
        <DonorRegister />
        <Emergency />
      </main>
      <LandingFooter />
    </div>
  );
}
