import { LocalizedLink as Link } from "@/i18n/links";
import { useTranslate } from "@/i18n/useTranslate";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
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
  const { t, tx } = useTranslate();

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
          : t(
              "يمكنك مشاهدة «{{v0}}» على الرئيسية الآن. اختيار تجريبي في هذا المتصفح فقط.",
              { v0: tx(choice.name) },
            ),
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
            <h2>{tx("الشعار جزء من المشهد.")}</h2>
            <p>
              {tx(
                "٥ تطويرات لنفس الهيرو، و٥ تكوينات جديدة. الصور تصوّر مجالات العمل، وليست صورًا للمكتب.",
              )}
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
            aria-label={tx("نوع التصميم")}
          >
            <ToggleGroupItem value="evolved">
              {tx("نفس التكوين · ٥")}
            </ToggleGroupItem>
            <ToggleGroupItem value="creative">
              {tx("أفكار جديدة · ٥")}
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <ToggleGroup
          value={choice.id}
          onValueChange={(id) => update("concept", id)}
          aria-label={tx("اختيار تصميم الهيرو")}
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
                    {tx(
                      String(identityConcepts.indexOf(concept) + 1).padStart(
                        2,
                        "0",
                      ),
                    )}
                  </span>
                  {tx(concept.name)}
                </ToggleGroupItem>
              ))}
        </ToggleGroup>
        <div className="ih-lab-details">
          <div>
            <h3>
              <span dir="ltr">{tx(String(number).padStart(2, "0"))}</span> ·
              {tx(" ")}
              {tx(choice.name)}
            </h3>
            <p>{tx(choice.idea)}</p>
            <p className="ih-lab-motion">
              {tx("الحركة: ")}
              {tx(choice.motion)}
            </p>
          </div>
          <ToggleGroup
            value={view}
            onValueChange={(value) => update("view", value)}
            aria-label={tx("حجم المعاينة")}
          >
            <ToggleGroupItem value="desktop">{tx("لابتوب")}</ToggleGroupItem>
            <ToggleGroupItem value="mobile">{tx("موبايل 390")}</ToggleGroupItem>
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
        <Button onClick={() => apply(choice.id)}>
          {tx("جرّبه على الرئيسية")}
        </Button>
        <Button asChild variant="outline">
          <Link to="/">{tx("شاهد الرئيسية")}</Link>
        </Button>
        <Button variant="ghost" onClick={() => apply(defaultHeroId)}>
          {tx("استعادة الهيرو الحالي")}
        </Button>
        <p role="status">
          {tx(
            notice ||
              "اختيارات المعرض لا تغيّر التصميم الأساسي للجميع. جرّب الخدمات باللمس أو الأزرار، والملف بالمؤشر.",
          )}
        </p>
      </div>
      <div className="site-container ih-lab-references">
        <span>{tx("مراجع الاتجاه:")}</span>
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
          {tx("JCP · الهوية داخل التجربة")}
        </a>
        <p>
          {tx(
            "التنفيذ مخصص لهوية المكتب باستخدام Motion وGSAP؛ استلهام للحركة والتكوين، مع الحفاظ على الشعار المعتمد.",
          )}
        </p>
      </div>
    </div>
  );
}
