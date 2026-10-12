import { ConsultationBand } from "@/components/Brand";
import { PracticeCardGrid } from "@/features/services/PracticeCardGrid";
import { services } from "@/data/site";
import { useRef } from "react";
import { useDirectoryParams } from "@/features/services/useDirectoryParams";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/features/services/ServiceFilters";

export function Services() {
  const { params, initialParams, setParams } = useDirectoryParams();
  const filter = ["business", "individual"].includes(
    initialParams.get("audience") || "",
  )
    ? initialParams.get("audience")!
    : "all";
  const query = initialParams.get("q") || "";
  const search = useRef<HTMLInputElement>(null);
  const setFilter = (value: string) => {
    const next = new URLSearchParams(params);
    if (value === "all") next.delete("audience");
    else next.set("audience", value);
    setParams(next, { replace: true });
  };
  const setQuery = (value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set("q", value);
    else next.delete("q");
    setParams(next, { replace: true });
  };
  const items = services.filter(
    (s) =>
      (filter === "all" || s.audience === filter || s.audience === "both") &&
      (s.title + s.short).includes(query.trim()),
  );
  return (
    <>
      <section className="site-container practice-directory-heading">
        <div>
          <p className="eyebrow">مجالات العمل</p>
          <h1 tabIndex={-1}>الخدمات القانونية</h1>
          <p className="intro-text">
            اختر موضوعك لتعرف نطاق الخدمة والمعلومات التي تحتاجها قبل الاستشارة.
          </p>
        </div>
        <p>
          للشركات والمستثمرين والأفراد.
          <br />
          بالمكتب أو عن بُعد.
        </p>
      </section>
      <section className="site-container service-directory">
        <div className="directory-controls">
          <ToggleGroup
            value={filter}
            onValueChange={setFilter}
            aria-label="تصفية حسب نوع العميل"
          >
            {[
              ["all", "جميع الخدمات"],
              ["business", "الشركات والمستثمرون"],
              ["individual", "الأفراد"],
            ].map(([v, t]) => (
              <ToggleGroupItem value={v} key={v}>
                {t}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <div className="practice-search">
            <label htmlFor="service-search" className="sr-only">
              ابحث عن خدمة
            </label>
            <Input
              id="service-search"
              ref={search}
              className="h-12 rounded-xs bg-card"
              type="search"
              placeholder="ابحث عن خدمة…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query ? (
              <Button
                variant="outline"
                size="icon"
                className="size-12"
                aria-label="مسح البحث"
                onClick={() => {
                  setQuery("");
                  search.current?.focus();
                }}
              >
                <X />
              </Button>
            ) : null}
          </div>
        </div>
        <p className="result-count" aria-live="polite">
          {items.length} خدمات متاحة
        </p>
        {items.length ? (
          <PracticeCardGrid items={items} />
        ) : (
          <div className="empty-state">
            <h2>لم نجد خدمة بهذا الاسم.</h2>
            <p>جرّب كلمة أخرى، أو اشرح احتياجك عند طلب الاستشارة.</p>
            <Button
              variant="outline"
              className="h-12"
              onClick={() => {
                setParams({});
              }}
            >
              عرض كل الخدمات
            </Button>
          </div>
        )}
      </section>
      <ConsultationBand />
    </>
  );
}
