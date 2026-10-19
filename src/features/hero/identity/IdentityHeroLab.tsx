import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/features/services/ServiceFilters";
import { useClientReady } from "@/lib/useClientReady";
import { defaultHeroId } from "../selection";
import { IdentityHero } from "./IdentityHero";
import { getIdentityConcept, identityConcepts } from "./concepts";
import "./identity-lab.css";

export function IdentityHeroLab() {
  const [params, setParams] = useSearchParams();
  const ready = useClientReady();
  const choice = getIdentityConcept(ready ? params.get("concept") : null);
  const view = ready && params.get("view") === "mobile" ? "mobile" : "desktop";
  const [notice, setNotice] = useState("");
  const number =
    identityConcepts.findIndex((concept) => concept.id === choice.id) + 1;
  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    next.set("tab", "identity");
    next.set(key, value);
    setParams(next, { preventScrollReset: true });
    setNotice("");
  };
  const apply = (id: string) => {
    try {
      localStorage.setItem("shehri-hero", id);
      window.dispatchEvent(new Event("hero-selection"));
      setNotice(
        id === defaultHeroId
          ? "تمت استعادة الهيرو الحالي في هذا المتصفح."
          : `يمكنك مشاهدة «${choice.name}» على الرئيسية الآن. اختيار تجريبي في هذا المتصفح فقط.`,
      );
    } catch {
      setNotice("تعذّر حفظ الاختيار؛ المعاينة والمقارنة ما زالتا متاحتين.");
    }
  };
  return (
    <div className="ih-lab">
      <div className="site-container ih-lab-controls">
        <div className="ih-lab-families">
          <div>
            <h2>الشعار جزء من المشهد.</h2>
            <p>
              ٥ تطويرات لنفس الهيرو، و٥ تكوينات جديدة. الصور تصوّر مجالات العمل،
              وليست صورًا للمكتب.
            </p>
          </div>
          <ToggleGroup
            value={choice.family}
            onValueChange={(family) =>
              update(
                "concept",
                family === "evolved" ? "identity-signature" : "identity-cover",
              )
            }
            aria-label="نوع التصميم"
          >
            <ToggleGroupItem value="evolved">نفس التكوين · ٥</ToggleGroupItem>
            <ToggleGroupItem value="creative">أفكار جديدة · ٥</ToggleGroupItem>
          </ToggleGroup>
        </div>
        <ToggleGroup
          value={choice.id}
          onValueChange={(id) => update("concept", id)}
          aria-label="اختيار تصميم الهيرو"
        >
          {identityConcepts
            .filter((concept) => concept.family === choice.family)
            .map((concept) => (
              <ToggleGroupItem
                key={concept.id}
                value={concept.id}
                data-concept={concept.id}
              >
                <span className="ih-lab-number">
                  {String(identityConcepts.indexOf(concept) + 1).padStart(
                    2,
                    "0",
                  )}
                </span>
                {concept.name}
              </ToggleGroupItem>
            ))}
        </ToggleGroup>
        <div className="ih-lab-details">
          <div>
            <h3>
              <span dir="ltr">{String(number).padStart(2, "0")}</span> ·{" "}
              {choice.name}
            </h3>
            <p>{choice.idea}</p>
            <p className="ih-lab-motion">الحركة: {choice.motion}</p>
          </div>
          <ToggleGroup
            value={view}
            onValueChange={(value) => update("view", value)}
            aria-label="حجم المعاينة"
          >
            <ToggleGroupItem value="desktop">لابتوب</ToggleGroupItem>
            <ToggleGroupItem value="mobile">موبايل 390</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
      <div className="ih-lab-workspace">
        <div
          className="ih-lab-frame"
          data-view={view}
          data-testid="identity-hero-preview"
        >
          <IdentityHero key={choice.id} conceptId={choice.id} preview />
        </div>
      </div>
      <div className="site-container ih-lab-actions">
        <Button onClick={() => apply(choice.id)}>جرّبه على الرئيسية</Button>
        <Button asChild variant="outline">
          <Link to="/">شاهد الرئيسية</Link>
        </Button>
        <Button variant="ghost" onClick={() => apply(defaultHeroId)}>
          استعادة الهيرو الحالي
        </Button>
        <p role="status">
          {notice ||
            "اختيارات المعرض لا تغيّر التصميم الأساسي للجميع. جرّب الخدمات باللمس أو الأزرار، والملف بالمؤشر."}
        </p>
      </div>
      <div className="site-container ih-lab-references">
        <span>مراجع الاتجاه:</span>
        <a
          href="https://reactbits.dev/components/tilted-card"
          target="_blank"
          rel="noreferrer"
        >
          React Bits · Tilted Card
        </a>
        <a
          href="https://reactbits.dev/components/flowing-menu"
          target="_blank"
          rel="noreferrer"
        >
          React Bits · Flowing Menu
        </a>
        <a
          href="https://www.jamesgood.co.uk/work/jcp-solicitors"
          target="_blank"
          rel="noreferrer"
        >
          JCP · الهوية داخل التجربة
        </a>
        <p>
          التنفيذ مخصص لهوية المكتب باستخدام Motion وGSAP؛ استلهام للحركة
          والتكوين، مع الحفاظ على الشعار المعتمد.
        </p>
      </div>
    </div>
  );
}
