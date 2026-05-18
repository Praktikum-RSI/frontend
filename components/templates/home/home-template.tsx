import { Header } from "@/components/organisms/layout/header";
import { HeroSection } from "@/components/organisms/home/hero-section";
import { FeaturedEventsSection } from "@/components/organisms/home/featured-events-section";
import { FeaturesSection } from "@/components/organisms/home/features-section";
import { FooterSection } from "@/components/organisms/home/footer-section";

export function HomeTemplate() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-6">
        <HeroSection />
        <FeaturedEventsSection />
        <FeaturesSection />
        <FooterSection />
      </main>
    </div>
  );
}
