import { createFileRoute } from "@tanstack/react-router";
import { KineticNav } from "@/components/ui/sterling-gate-kinetic-navigation";
import { ASSETS, NAV_LINKS } from "@/sections/assets";
import { Hero } from "@/sections/Hero";
import { Philosophy } from "@/sections/Philosophy";
import { Services } from "@/sections/Services";
import { SelectedWork } from "@/sections/SelectedWork";
import { ContactSection } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#f5f3ee]">
      <KineticNav brand={ASSETS.brand.name} links={NAV_LINKS} />
      <Hero />
      <Philosophy />
      <Services />
      <SelectedWork />
      <ContactSection />
      <Footer />
    </main>
  );
}
