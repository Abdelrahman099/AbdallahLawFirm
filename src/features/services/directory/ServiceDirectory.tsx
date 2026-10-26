import { useTranslate } from "@/i18n/useTranslate";
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
  const { tx } = useTranslate();

  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  return (
    <div className={className}>
      <Search aria-hidden="true" />
      <label htmlFor={id} className="sr-only">
        {tx("ابحث عن خدمة")}
      </label>
      <Input
        id={id}
        ref={input}
        type="search"
        placeholder={tx(placeholder)}
        value={dir.query}
        onChange={(e) => dir.set("q", e.target.value)}
      />
      {dir.query ? (
        <button
          type="button"
          aria-label={tx("مسح البحث")}
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
  const { tx } = useTranslate();

  return (
    <>
      {summary ? (
        <div className="sd-summary">
          <p className="result-count" aria-live="polite">
            {tx(dir.group ? `${dir.group.title} · ` : "")}
            {dir.items.length} {tx(" من ")}
            {tx("serviceCount", { count: dir.total })}
          </p>
          {dir.filtered ? (
            <button type="button" className="sd-reset" onClick={dir.reset}>
              <X aria-hidden="true" />
              {tx("مسح الفلاتر")}
            </button>
          ) : null}
        </div>
      ) : null}
      {dir.items.length ? (
        <PracticeCardGrid items={dir.items} />
      ) : (
        <div className="empty-state">
          <h2>{tx("لم نجد خدمة مطابقة.")}</h2>
          <p>{tx("جرّب كلمة أخرى، أو اشرح احتياجك عند طلب الاستشارة.")}</p>
          <Button variant="outline" className="h-12" onClick={dir.reset}>
            {tx("عرض كل الخدمات")}
          </Button>
        </div>
      )}
    </>
  );
}

function ClassicFilter({ dir }: Props) {
  const { tx } = useTranslate();

  return (
    <>
      <nav className="directory-group-nav" aria-label={tx("مجالات الخدمات")}>
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
            <span>{tx(item.title)}</span>
          </Button>
        ))}
      </nav>
      <div className="sd-classic-controls">
        <ToggleGroup
          value={dir.audience}
          onValueChange={(value) => dir.set("audience", value)}
          aria-label={tx("تصفية حسب نوع العميل")}
        >
          {[
            ["all", "جميع الخدمات"],
            ["business", "الشركات والمستثمرون"],
            ["individual", "الأفراد"],
          ].map(([value, title]) => (
            <ToggleGroupItem value={value} key={value}>
              {tx(title)}
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
  const { tx } = useTranslate();

  return (
    <>
      <div className="sd-tabs">
        <div className="sd-tabs-groups" role="group" aria-label={tx("المجال")}>
          {groupOptions.map((item) => (
            <button
              type="button"
              key={item.id}
              aria-pressed={(dir.group?.id ?? "all") === item.id}
              onClick={() => dir.set("group", item.id)}
            >
              {tx(item.title)}
            </button>
          ))}
        </div>
        <SearchField dir={dir} className="sd-search sd-search-line" />
      </div>
      <div className="sd-tabs-meta">
        <div
          className="sd-tabs-audience"
          role="group"
          aria-label={tx("لمن الخدمة")}
        >
          {audiences.map((item) => (
            <button
              type="button"
              key={item.id}
              aria-pressed={dir.audience === item.id}
              onClick={() => dir.set("audience", item.id)}
            >
              {tx(audienceTabLabels[item.id])}
            </button>
          ))}
        </div>
        <p className="result-count" aria-live="polite">
          {tx("serviceCount", { count: dir.items.length })}
          {dir.filtered ? (
            <button type="button" className="sd-reset" onClick={dir.reset}>
              {tx("مسح")}
            </button>
          ) : null}
        </p>
      </div>
      <Results dir={dir} summary={false} />
    </>
  );
}

function CardsFilter({ dir }: Props) {
  const { tx } = useTranslate();

  return (
    <>
      <nav className="sd-group-cards" aria-label={tx("مجالات الخدمات")}>
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
                <strong>{tx(item.title)}</strong>
                <span>{tx(item.summary)}</span>
                <small>
                  {tx("serviceCount", { count: dir.groupCount(item.id) })}
                </small>
              </span>
            </button>
          );
        })}
      </nav>
      <div className="sd-cards-bar">
        <SearchField dir={dir} className="sd-search sd-search-boxed" />
        <div
          className="sd-segmented"
          role="group"
          aria-label={tx("لمن الخدمة")}
        >
          {audiences.map((item) => (
            <button
              type="button"
              key={item.id}
              aria-pressed={dir.audience === item.id}
              onClick={() => dir.set("audience", item.id)}
            >
              {tx(item.id === "all" ? "الكل" : item.title)}
            </button>
          ))}
        </div>
      </div>
      <Results dir={dir} />
    </>
  );
}

function FilterLists({ dir }: Props) {
  const { tx } = useTranslate();

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
      <p id={labelId}>{tx(label)}</p>
      <div role="group" aria-labelledby={labelId}>
        {options.map((item) => (
          <button
            type="button"
            key={item.id}
            aria-pressed={current === item.id}
            onClick={() => dir.set(key, item.id)}
          >
            <span>{tx(item.title)}</span>
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
  const { tx, dir: localeDir } = useTranslate();

  const [open, setOpen] = useState(false);
  const active = Number(Boolean(dir.group)) + Number(dir.audience !== "all");
  return (
    <div className="sd-sidebar">
      <aside className="sd-side-panel" aria-label={tx("تصفية الخدمات")}>
        <SearchField dir={dir} className="sd-search sd-search-boxed" />
        <FilterLists dir={dir} />
        {dir.filtered ? (
          <button type="button" className="sd-reset" onClick={dir.reset}>
            <X aria-hidden="true" />
            {tx("مسح الفلاتر")}
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
            {tx("تصفية")}
            {active ? <span>{active}</span> : null}
          </Button>
        </div>
        <Results dir={dir} />
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="sd-side-sheet" dir={localeDir}>
          <SheetHeader>
            <SheetTitle>{tx("تصفية الخدمات")}</SheetTitle>
            <SheetDescription className="sr-only">
              {tx("اختر المجال ونوع العميل.")}
            </SheetDescription>
          </SheetHeader>
          <div className="sd-side-sheet-body">
            <FilterLists dir={dir} />
          </div>
          <div className="sd-side-sheet-actions">
            <Button variant="outline" onClick={dir.reset}>
              {tx("مسح")}
            </Button>
            <SheetClose asChild>
              <Button>
                {tx("عرض ")}
                {tx("serviceCount", { count: dir.items.length })}
              </Button>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function ChipsFilter({ dir }: Props) {
  const { tx } = useTranslate();

  const row = (
    label: string,
    options: { id: string; title: string }[],
    current: string,
    key: "group" | "audience",
    count: (id: string) => number,
  ) => (
    <div className="sd-chips-row">
      <span className="sd-chips-label">{tx(label)}</span>
      <div className="sd-chips" role="group" aria-label={tx(label)}>
        {options.map((item) => (
          <button
            type="button"
            key={item.id}
            className="sd-chip"
            aria-pressed={current === item.id}
            onClick={() => dir.set(key, item.id)}
          >
            {tx(item.title)}
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
          placeholder={tx("ابحث عن خدمة، مثل: عقد أو تركة…")}
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
