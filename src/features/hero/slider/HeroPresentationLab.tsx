import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/features/services/ServiceFilters";
import { HeroPreviewContext } from "../HeroCopy";
import { ServiceHeroSlider } from "./ServiceHeroSlider";
import {
  defaultPresentation,
  overlayOptions,
  saveHeroPresentation,
  type HeroPresentation,
} from "./presentation";
import "./presentation-lab.css";

export function HeroPresentationLab() {
  const [choice, setChoice] = useState<HeroPresentation>(defaultPresentation);
  const [notice, setNotice] = useState("");
  const change = (value: Partial<HeroPresentation>) => {
    setChoice((current) => ({ ...current, ...value }));
    setNotice("");
  };
  return (
    <>
      <div className="site-container slider-comparison-controls">
        <div>
          <h2>الصورة جزء من التكوين، أو خلفية كاملة.</h2>
          <p>نفس المحتوى والصور، بتوزيع مختلف على الموبايل واللابتوب.</p>
        </div>
        <ToggleGroup
          value={choice.layout}
          onValueChange={(layout) =>
            change({ layout: layout as HeroPresentation["layout"] })
          }
          aria-label="تكوين الهيرو"
        >
          <ToggleGroupItem value="split">صورة ونص منفصلان</ToggleGroupItem>
          <ToggleGroupItem value="immersive">صورة كاملة</ToggleGroupItem>
        </ToggleGroup>
        {choice.layout === "immersive" && (
          <ToggleGroup
            value={choice.overlay}
            onValueChange={(overlay) =>
              change({ overlay: overlay as HeroPresentation["overlay"] })
            }
            aria-label="تظليل الصورة"
          >
            {overlayOptions.map((option) => (
              <ToggleGroupItem key={option.id} value={option.id}>
                {option.name}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        )}
        <Button
          onClick={() => {
            try {
              saveHeroPresentation(choice);
              setNotice("تم تطبيق التكوين على الرئيسية في هذا المتصفح.");
            } catch {
              setNotice("تعذّر حفظ الاختيار؛ المعاينة ما زالت متاحة.");
            }
          }}
        >
          طبّق على الرئيسية
        </Button>
        <p role="status">
          {notice || "اختر التكوين وشاهد المعاينة بالحجم الحقيقي أدناه."}
        </p>
      </div>
      <div
        className="lab-hero-preview slider-comparison-stage"
        data-testid="slider-comparison"
      >
        <HeroPreviewContext.Provider value={true}>
          <ServiceHeroSlider presentation={choice} />
        </HeroPreviewContext.Provider>
      </div>
    </>
  );
}
