import { ConsultationBand } from "@/components/Brand";
import { PracticeCardGrid } from "@/features/services/PracticeCardGrid";
import { services } from "@/data/site";
import { useRef } from "react";
import { useDirectoryParams } from "@/features/services/useDirectoryParams";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { serviceGroups } from "@/data/serviceGroups";
import { matchesQuery } from "@/features/services/serviceSearch";
import type { Service } from "@/data/services";

const audiences = [
  { id: "all", title: "الجميع" },
  { id: "business", title: "الشركات والمستثمرون" },
  { id: "individual", title: "الأفراد" },
];

const forAudience = (service: Service, audience: string) =>
  audience === "all" ||
  service.audience === audience ||
  service.audience === "both";

export function Services() {
  const { params, initialParams, setParams } = useDirectoryParams();
  const audience = ["business", "individual"].includes(
    initialParams.get("audience") || "",
  )
    ? initialParams.get("audience")!
    : "all";
  const query = initialParams.get("q") || "";
  const group = serviceGroups.find(
    (item) => item.id === initialParams.get("group"),
  );
  const search = useRef<HTMLInputElement>(null);
  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value && value !== "all") next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };
  const inGroup = (service: Service, id = group?.id) =>
    !id || serviceGroups.find((g) => g.id === id)!.slugs.includes(service.slug);
  const items = services.filter(
    (s) => forAudience(s, audience) && inGroup(s) && matchesQuery(s, query),
  );
  const groupCount = (id?: string) =>
    services.filter(
      (s) =>
        forAudience(s, audience) && inGroup(s, id) && matchesQuery(s, query),
    ).length;
  const audienceCount = (id: string) =>
    services.filter(
      (s) => forAudience(s, id) && inGroup(s) && matchesQuery(s, query),
    ).length;
  const filtered = Boolean(group || audience !== "all" || query);
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
        <div className="service-filter" role="search">
          <div className="service-filter-search">
            <Search aria-hidden="true" />
            <label htmlFor="service-search" className="sr-only">
              ابحث عن خدمة
            </label>
            <Input
              id="service-search"
              ref={search}
              type="search"
              placeholder="ابحث عن خدمة، مثل: عقد أو تركة…"
              value={query}
              onChange={(e) => update("q", e.target.value)}
            />
            {query ? (
              <button
                type="button"
                aria-label="مسح البحث"
                onClick={() => {
                  update("q", "");
                  search.current?.focus();
                }}
              >
                <X />
              </button>
            ) : null}
          </div>
          <div className="service-filter-row">
            <span className="service-filter-label" id="filter-group">
              المجال
            </span>
            <div
              className="service-filter-chips"
              role="group"
              aria-labelledby="filter-group"
            >
              {[{ id: "all", title: "كل المجالات" }, ...serviceGroups].map(
                (item) => {
                  const active = (group?.id ?? "all") === item.id;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      className="service-chip"
                      aria-pressed={active}
                      onClick={() => update("group", item.id)}
                    >
                      {item.title}
                      <span>
                        {groupCount(item.id === "all" ? undefined : item.id)}
                      </span>
                    </button>
                  );
                },
              )}
            </div>
          </div>
          <div className="service-filter-row">
            <span className="service-filter-label" id="filter-audience">
              الخدمة لـ
            </span>
            <div
              className="service-filter-chips"
              role="group"
              aria-labelledby="filter-audience"
            >
              {audiences.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className="service-chip"
                  aria-pressed={audience === item.id}
                  onClick={() => update("audience", item.id)}
                >
                  {item.title}
                  <span>{audienceCount(item.id)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="service-filter-summary">
          <p className="result-count" aria-live="polite">
            {items.length} من {services.length} خدمة
          </p>
          {filtered ? (
            <button
              type="button"
              className="service-filter-reset"
              onClick={() => setParams({}, { replace: true })}
            >
              <X aria-hidden="true" />
              مسح الفلاتر
            </button>
          ) : null}
        </div>
        {items.length ? (
          <PracticeCardGrid items={items} />
        ) : (
          <div className="empty-state">
            <h2>لم نجد خدمة مطابقة.</h2>
            <p>جرّب كلمة أخرى، أو اشرح احتياجك عند طلب الاستشارة.</p>
            <Button
              variant="outline"
              className="h-12"
              onClick={() => setParams({}, { replace: true })}
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
