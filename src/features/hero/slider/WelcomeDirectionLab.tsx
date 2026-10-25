import { useSearchParams } from "react-router-dom";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/features/services/ServiceFilters";
import { useClientReady } from "@/lib/useClientReady";
import { HeroPreviewContext } from "../HeroCopy";
import { ServiceHeroSlider } from "./ServiceHeroSlider";
import { getWelcomeDirection, welcomeDirections } from "./welcome-directions";

export function WelcomeDirectionLab() {
  const [params, setParams] = useSearchParams();
  const ready = useClientReady();
  const choice = getWelcomeDirection(ready ? params.get("welcome") : null);
  return (
    <>
      <div className="site-container flex flex-col gap-5 pb-8">
        <h2 className="text-2xl">أربع طرق للترحيب بهوية المكتب.</h2>
        <ToggleGroup
          aria-label="اتجاه شريحة الترحيب"
          value={choice.id}
          onValueChange={(value) => {
            setParams(
              (previous) => {
                const next = new URLSearchParams(previous);
                next.set("tab", "welcome");
                next.set("welcome", value);
                return next;
              },
              { replace: true },
            );
          }}
        >
          {welcomeDirections.map((direction) => (
            <ToggleGroupItem
              key={direction.id}
              value={direction.id}
              className="scroll-mt-40"
            >
              {direction.name}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <p className="text-sm text-muted-foreground" role="status">
          {choice.note}
        </p>
        <p className="text-xs text-muted-foreground">
          البدائل للمعاينة. «التوقيع الهادئ» هو التصميم الحالي على الرئيسية.
          جرّب أيضًا التنقّل إلى شرائح الخدمات الثلاثة.
        </p>
      </div>
      <div className="lab-hero-preview" data-testid="welcome-comparison">
        <HeroPreviewContext.Provider value={true}>
          <ServiceHeroSlider key={choice.id} welcomeDirection={choice.id} />
        </HeroPreviewContext.Provider>
      </div>
    </>
  );
}
