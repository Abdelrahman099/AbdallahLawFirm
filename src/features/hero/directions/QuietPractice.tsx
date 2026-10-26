import { LocalizedLink as Link } from "@/i18n/links";
import { useTranslate } from "@/i18n/useTranslate";
import { HeroCopy, HeroPhoto } from "../HeroCopy";

import { ArrowUpLeft } from "lucide-react";
export function QuietPractice() {
  const { tx } = useTranslate();

  return (
    <section className="hero-direction direction-practice site-container">
      <div className="practice-main">
        <HeroCopy
          title={
            <>
              {tx("موضوعك واضح.")}
              <br />
              <em>{tx("وخطوتك مدروسة.")}</em>
            </>
          }
        />
        <HeroPhoto position="40% 50%" />
      </div>
      <div className="practice-bottom">
        <span>{tx("اختر نقطة البداية")}</span>
        {[
          ["company-formation", "تأسيس الشركات"],
          ["contracts", "العقود والاستشارات"],
          ["litigation", "التقاضي والمنازعات"],
        ].map(([id, title], i) => (
          <Link key={id} to={"/services/" + id}>
            <small>0{i + 1}</small>
            {tx(title)}
            <ArrowUpLeft size={18} />
          </Link>
        ))}
      </div>
    </section>
  );
}
