import { useId, useRef, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { BrandImage } from "@/components/brand/BrandImage";
import { serviceGroups } from "@/data/serviceGroups";
import { PracticeCardGrid } from "../PracticeCardGrid";
import { ToggleGroup, ToggleGroupItem } from "../ServiceFilters";
import { audiences, type ServiceDirectoryState } from "./useServiceDirectory";
import type { FilterStyle } from "./filterStyles";
import "./directory.css";

type Props = { dir: ServiceDirectoryState };

const audienceTabLabels: Record<string, string> = {
  all: "للجميع",
  business: "للشركات والمستثمرين",
  individual: "للأفراد",
};

const groupOptions = [{ id: "all", title: "كل المجالات" }, ...serviceGroups];

function SearchField({
  dir,
  className,
  placeholder = "ابحث عن خدمة…",
}: Props & { className: string; placeholder?: string }) {
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  return (
    <div className={className}>
      <Search aria-hidden="true" />
      <label htmlFor={id} className="sr-only">
        ابحث عن خدمة
      </label>
      <Input
        id={id}
        ref={input}
        type="search"
        placeholder={placeholder}
        value={dir.query}
        onChange={(e) => dir.set("q", e.target.value)}
      />
      {dir.query ? (
        <button
          type="button"
          aria-label="مسح البحث"
          onClick={() => {
            dir.set("q", "");
            input.current?.focus();
          }}
        >
          <X />
        </button>
      ) : null}
    </div>
  );
}

function Results({ dir, summary = true }: Props & { summary?: boolean }) {
  return (
    <>
      {summary ? (
        <div className="sd-summary">
          <p className="result-count" aria-live="polite">
            {dir.group ? `${dir.group.title} · ` : ""}
            {dir.items.length} من {dir.total} خدمة
          </p>
          {dir.filtered ? (
            <button type="button" className="sd-reset" onClick={dir.reset}>
              <X aria-hidden="true" />
              مسح الفلاتر
            </button>
          ) : null}
        </div>
      ) : null}
      {dir.items.length ? (
        <PracticeCardGrid items={dir.items} />
      ) : (
        <div className="empty-state">
          <h2>لم نجد خدمة مطابقة.</h2>
          <p>جرّب كلمة أخرى، أو اشرح احتياجك عند طلب الاستشارة.</p>
          <Button variant="outline" className="h-12" onClick={dir.reset}>
            عرض كل الخدمات
          </Button>
        </div>
      )}
    </>
  );
}

function ClassicFilter({ dir }: Props) {
  return (
    <>
      <nav className="directory-group-nav" aria-label="مجالات الخدمات">
        {serviceGroups.map((item) => (
          <Button
            key={item.id}
            variant={dir.group?.id === item.id ? "default" : "outline"}
            className="directory-group-choice"
            aria-pressed={dir.group?.id === item.id}
            onClick={() =>
              dir.set("group", dir.group?.id === item.id ? "" : item.id)
            }
          >
            <BrandImage asset={item.image} sizes="80px" alt="" />
            <span>{item.title}</span>
          </Button>
        ))}
      </nav>
      <div className="sd-classic-controls">
        <ToggleGroup
          value={dir.audience}
          onValueChange={(value) => dir.set("audience", value)}
          aria-label="تصفية حسب نوع العميل"
        >
          {[
            ["all", "جميع الخدمات"],
            ["business", "الشركات والمستثمرون"],
            ["individual", "الأفراد"],
          ].map(([value, title]) => (
            <ToggleGroupItem value={value} key={value}>
              {title}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <SearchField dir={dir} className="sd-search sd-search-boxed" />
      </div>
      <Results dir={dir} />
    </>
  );
}

function TabsFilter({ dir }: Props) {
  return (
    <>
      <div className="sd-tabs">
        <div className="sd-tabs-groups" role="group" aria-label="المجال">
          {groupOptions.map((item) => (
            <button
              type="button"
              key={item.id}
              aria-pressed={(dir.group?.id ?? "all") === item.id}
              onClick={() => dir.set("group", item.id)}
            >
              {item.title}
            </button>
          ))}
        </div>
        <SearchField dir={dir} className="sd-search sd-search-line" />
      </div>
      <div className="sd-tabs-meta">
        <div className="sd-tabs-audience" role="group" aria-label="لمن الخدمة">
          {audiences.map((item) => (
            <button
              type="button"
              key={item.id}
              aria-pressed={dir.audience === item.id}
              onClick={() => dir.set("audience", item.id)}
            >
              {audienceTabLabels[item.id]}
            </button>
          ))}
        </div>
        <p className="result-count" aria-live="polite">
          {dir.items.length} خدمة
          {dir.filtered ? (
            <button type="button" className="sd-reset" onClick={dir.reset}>
              مسح
            </button>
          ) : null}
        </p>
      </div>
      <Results dir={dir} summary={false} />
    </>
  );
}

function CardsFilter({ dir }: Props) {
  return (
    <>
      <nav className="sd-group-cards" aria-label="مجالات الخدمات">
        {serviceGroups.map((item) => {
          const active = dir.group?.id === item.id;
          return (
            <button
              type="button"
              key={item.id}
              className="sd-group-card"
              aria-pressed={active}
              onClick={() => dir.set("group", active ? "" : item.id)}
            >
              <BrandImage
                asset={item.image}
                sizes="(max-width: 760px) 80vw, 30vw"
                alt=""
              />
              <span className="sd-group-card-body">
                <strong>{item.title}</strong>
                <span>{item.summary}</span>
                <small>{dir.groupCount(item.id)} خدمات</small>
              </span>
            </button>
          );
        })}
      </nav>
      <div className="sd-cards-bar">
        <SearchField dir={dir} className="sd-search sd-search-boxed" />
        <div className="sd-segmented" role="group" aria-label="لمن الخدمة">
          {audiences.map((item) => (
            <button
              type="button"
              key={item.id}
              aria-pressed={dir.audience === item.id}
              onClick={() => dir.set("audience", item.id)}
            >
              {item.id === "all" ? "الكل" : item.title}
            </button>
          ))}
        </div>
      </div>
      <Results dir={dir} />
    </>
  );
}

function FilterLists({ dir }: Props) {
  const groupLabel = useId();
  const audienceLabel = useId();
  const list = (
    label: string,
    labelId: string,
    options: { id: string; title: string }[],
    current: string,
    key: "group" | "audience",
    count: (id: string) => number,
  ) => (
    <div className="sd-side-list">
      <p id={labelId}>{label}</p>
      <div role="group" aria-labelledby={labelId}>
        {options.map((item) => (
          <button
            type="button"
            key={item.id}
            aria-pressed={current === item.id}
            onClick={() => dir.set(key, item.id)}
          >
            <span>{item.title}</span>
            <small>{count(item.id)}</small>
          </button>
        ))}
      </div>
    </div>
  );
  return (
    <>
      {list(
        "المجال",
        groupLabel,
        groupOptions,
        dir.group?.id ?? "all",
        "group",
        dir.groupCount,
      )}
      {list(
        "لمن الخدمة",
        audienceLabel,
        audiences,
        dir.audience,
        "audience",
        dir.audienceCount,
      )}
    </>
  );
}

function SidebarFilter({ dir }: Props) {
  const [open, setOpen] = useState(false);
  const active = Number(Boolean(dir.group)) + Number(dir.audience !== "all");
  return (
    <div className="sd-sidebar">
      <aside className="sd-side-panel" aria-label="تصفية الخدمات">
        <SearchField dir={dir} className="sd-search sd-search-boxed" />
        <FilterLists dir={dir} />
        {dir.filtered ? (
          <button type="button" className="sd-reset" onClick={dir.reset}>
            <X aria-hidden="true" />
            مسح الفلاتر
          </button>
        ) : null}
      </aside>
      <div className="sd-side-results">
        <div className="sd-side-mobile">
          <SearchField dir={dir} className="sd-search sd-search-boxed" />
          <Button
            variant="outline"
            className="sd-side-trigger"
            onClick={() => setOpen(true)}
          >
            <SlidersHorizontal />
            تصفية
            {active ? <span>{active}</span> : null}
          </Button>
        </div>
        <Results dir={dir} />
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="sd-side-sheet" dir="rtl">
          <SheetHeader>
            <SheetTitle>تصفية الخدمات</SheetTitle>
            <SheetDescription className="sr-only">
              اختر المجال ونوع العميل.
            </SheetDescription>
          </SheetHeader>
          <div className="sd-side-sheet-body">
            <FilterLists dir={dir} />
          </div>
          <div className="sd-side-sheet-actions">
            <Button variant="outline" onClick={dir.reset}>
              مسح
            </Button>
            <SheetClose asChild>
              <Button>عرض {dir.items.length} خدمة</Button>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function ChipsFilter({ dir }: Props) {
  const row = (
    label: string,
    options: { id: string; title: string }[],
    current: string,
    key: "group" | "audience",
    count: (id: string) => number,
  ) => (
    <div className="sd-chips-row">
      <span className="sd-chips-label">{label}</span>
      <div className="sd-chips" role="group" aria-label={label}>
        {options.map((item) => (
          <button
            type="button"
            key={item.id}
            className="sd-chip"
            aria-pressed={current === item.id}
            onClick={() => dir.set(key, item.id)}
          >
            {item.title}
            <span>{count(item.id)}</span>
          </button>
        ))}
      </div>
    </div>
  );
  return (
    <>
      <div className="sd-chips-panel">
        <SearchField
          dir={dir}
          className="sd-search sd-search-large"
          placeholder="ابحث عن خدمة، مثل: عقد أو تركة…"
        />
        {row(
          "المجال",
          groupOptions,
          dir.group?.id ?? "all",
          "group",
          dir.groupCount,
        )}
        {row(
          "لمن الخدمة",
          audiences,
          dir.audience,
          "audience",
          dir.audienceCount,
        )}
      </div>
      <Results dir={dir} />
    </>
  );
}

const variants: Record<FilterStyle, (props: Props) => React.ReactNode> = {
  classic: ClassicFilter,
  tabs: TabsFilter,
  cards: CardsFilter,
  sidebar: SidebarFilter,
  chips: ChipsFilter,
};

export function ServiceDirectory({
  dir,
  variant,
}: Props & { variant: FilterStyle }) {
  const Variant = variants[variant];
  return (
    <section
      className={`site-container service-directory sd-${variant}-layout`}
    >
      <Variant dir={dir} />
    </section>
  );
}
