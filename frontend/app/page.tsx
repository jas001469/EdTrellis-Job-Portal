import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection"; // optional preview

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* Optional: preview of how it works */}
      <AboutSection />
    </>
  );
}