import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceDirectory } from "./ServiceDirectory";
import {
  defaultFilterStyle,
  filterStyles,
  saveFilterStyle,
  type FilterStyle,
} from "./filterStyles";
import { useLocalFilters, useServiceDirectory } from "./useServiceDirectory";

export function ServicesFilterLab() {
  const [choice, setChoice] = useState<FilterStyle>(defaultFilterStyle);
  const [notice, setNotice] = useState("");
  const dir = useServiceDirectory(useLocalFilters());
  const current = filterStyles.find((style) => style.id === choice)!;
  return (
    <>
      <div className="site-container grid grid-cols-2 gap-2 pb-6 md:grid-cols-5">
        {filterStyles.map((style, i) => (
          <button
            key={style.id}
            aria-pressed={choice === style.id}
            onClick={() => {
              setChoice(style.id);
              setNotice("");
            }}
            className="min-h-19 border border-border p-3 text-right transition-colors hover:bg-secondary aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-ivory"
          >
            <span className="mb-1 block text-[10px] opacity-80">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-sm">{style.name}</span>
          </button>
        ))}
      </div>
      <div className="border-y border-border bg-secondary">
        <div className="site-container flex flex-wrap items-center justify-between gap-4 py-5">
          <div>
            <h2 className="text-xl">{current.name}</h2>
            <p className="mt-1 text-xs text-muted-foreground">{current.note}</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => {
                try {
                  saveFilterStyle(choice);
                  setNotice(
                    "تم تطبيق «" + current.name + "» على صفحة الخدمات.",
                  );
                } catch {
                  setNotice("تعذّر حفظ الاختيار في المتصفح.");
                }
              }}
            >
              <Check />
              استخدمه في الموقع
            </Button>
            <Button variant="outline" asChild>
              <Link to="/services">
                شاهد صفحة الخدمات <ArrowUpRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <p
        className="site-container pt-5 text-xs text-muted-foreground"
        role="status"
      >
        {notice ||
          "جرّب الفلاتر في المعاينة، وغيّر عرض الشاشة لترى شكل الموبايل."}
      </p>
      <div className="pt-6" data-testid="services-filter-preview">
        <ServiceDirectory dir={dir} variant={choice} />
      </div>
    </>
  );
}
