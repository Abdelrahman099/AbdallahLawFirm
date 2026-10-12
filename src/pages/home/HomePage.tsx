import { ConsultationBand } from "@/components/shared/ConsultationBand";
import { AboutSection } from "./sections/AboutSection";
import { FAQSection } from "./sections/FAQSection";
import { HeroSection } from "./sections/HeroSection";
import { InsightsSection } from "./sections/InsightsSection";
import { PracticeAreasSection } from "./sections/PracticeAreasSection";
import { ProcessSection } from "./sections/ProcessSection";
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
      <ProcessSection />
      <FAQSection />
      <InsightsSection />
      <ConsultationBand />
    </div>
  );
}
