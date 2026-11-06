import { Orbs, Navbar, Hero } from "./LandingParts";
import { Features, HowItWorks, UseCases, Pricing, Testimonials, FAQ, CTABanner, Footer } from "./LandingSections";

export default function Landing() {
  return (
    <div style={{ background: "var(--bg-base)", color: "var(--text-primary)", overflowX: "hidden" }}>
      <Orbs />
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <UseCases />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTABanner />
      <Footer />
    </div>
  );
}
