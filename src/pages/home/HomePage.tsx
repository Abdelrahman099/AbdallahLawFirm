import { AboutSection } from "./sections/AboutSection";
import { FAQSection } from "./sections/FAQSection";
import { HeroSection } from "./sections/HeroSection";
import { PracticeAreasSection } from "./sections/PracticeAreasSection";
import { ContactSection } from "./sections/ContactSection";
import "./editorial.css";
import { useRef } from "react";
import { useHomeMotion } from "./useHomeMotion";
export function Home() {
  const root = useRef<HTMLDivElement>(null);
  useHomeMotion(root);
  return (
    <div className="home-page" ref={root}>
      <HeroSection />
      <PracticeAreasSection />
      <AboutSection />
      <FAQSection />
      <ContactSection />
    </div>
  );
}
