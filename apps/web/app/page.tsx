import { CtaSection } from "@/components/landing/CTASection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <FeaturesSection />
      <CtaSection />
      <Footer />
    </>
  );
}
