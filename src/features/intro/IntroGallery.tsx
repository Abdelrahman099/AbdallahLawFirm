import { useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { introVariants, type IntroId } from "./variants";
import { logoIntroVariants } from "./logo/variants";
import { IntroArtwork } from "./IntroArtwork";

export function IntroGallery({
  onPreview,
}: {
  onPreview: (id: IntroId, trigger: HTMLButtonElement) => void;
}) {
  const [archive, setArchive] = useState(false);
  const previous = introVariants.filter(
    (item) => !item.id.startsWith("logo-") && item.id !== "balance-onyx",
  );
  function card(item: (typeof introVariants)[number], still: boolean) {
    return (
      <article
        key={item.id}
        className="border border-border"
        data-intro-choice={item.id}
      >
        <div className="intro-preview-tile h-[290px]">
          <IntroArtwork variant={item.id} still={still} />
        </div>
        <div className="flex flex-col items-start gap-3 p-5">
          <h3 className="text-2xl">{item.name}</h3>
          <p className="min-h-14 text-sm leading-7 text-muted-foreground">
            {item.story}
          </p>
          <Button
            variant="outline"
            onClick={(event) => onPreview(item.id, event.currentTarget)}
            className="mt-2 min-h-11"
          >
            <Play />
            شاهد الحركة بالحجم الكامل
          </Button>
        </div>
      </article>
    );
  }
  return (
    <div className="flex flex-col gap-8">
      <div className="max-w-3xl">
        <h2 className="mb-3 text-3xl">الشعار هو الحركة.</h2>
        <p className="text-sm leading-8 text-muted-foreground">
          ٥ حركات لفكرة واحدة: كفّة ترتفع وأخرى تنخفض، ثم تنزل الريشة إلى موضعها
          ويتوقف الميزان. لكل اتجاه إيقاع ودخول مختلفان، والنهاية هي الشعار
          المعتمد بتفاصيله الأصلية.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {logoIntroVariants.map((item) => card(item, true))}
      </div>
      <div className="border-t border-border pt-8">
        <Button
          variant="outline"
          aria-expanded={archive}
          aria-controls="intro-archive"
          onClick={() => setArchive((value) => !value)}
        >
          {archive ? "إخفاء التصميمات السابقة" : "قارن بالتصميمات السابقة"}
        </Button>
        <div
          id="intro-archive"
          hidden={!archive}
          className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {archive && previous.map((item) => card(item, false))}
        </div>
      </div>
    </div>
  );
}
