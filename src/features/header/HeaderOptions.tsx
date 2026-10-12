import { useState } from "react";
import {
  headerStorageKey,
  headerThemes,
  useHeaderTheme,
} from "./useHeaderTheme";
export function HeaderOptions() {
  const selected = useHeaderTheme(),
    [notice, setNotice] = useState("");
  return (
    <div className="site-container pb-12">
      <p className="mb-6 text-sm text-muted-foreground">
        اضغط على أي اختيار، وهتشوف الهيدر بيتغير فوق فورًا. الاختيار يتحفظ
        للمقارنة على نفس المتصفح.
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        {headerThemes.map((t) => (
          <button
            key={t.id}
            aria-pressed={selected === t.id}
            className="border border-border p-6 text-right aria-pressed:border-primary aria-pressed:bg-secondary"
            onClick={() => {
              try {
                localStorage.setItem(headerStorageKey, t.id);
                window.dispatchEvent(new Event("header-selection"));
                setNotice("تم تطبيق " + t.name);
              } catch {
                setNotice("تعذّر حفظ الاختيار.");
              }
            }}
          >
            <span
              className="mb-5 block h-2"
              style={{ background: t.id === "minimal" ? "#d9ddd3" : "#143e31" }}
            />
            <span className="block text-xl">{t.name}</span>
            <span className="mt-3 block text-xs text-muted-foreground">
              {t.note}
            </span>
          </button>
        ))}
      </div>
      <p className="mt-5 text-xs" role="status">
        {notice}
      </p>
    </div>
  );
}
