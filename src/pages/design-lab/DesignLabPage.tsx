import { LocalizedLink as Link } from "@/i18n/links";
import { useTranslate } from "@/i18n/useTranslate";
import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Play, Check, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { getIntro } from "@/features/intro/variants";
import { IntroArtwork } from "@/features/intro/IntroArtwork";
import { IntroGallery } from "@/features/intro/IntroGallery";
import { heroDirections, getHero } from "@/features/hero/registry";
import { HeroPreviewContext } from "@/features/hero/HeroCopy";
import "@/features/hero/directions.css";
import { HeaderOptions } from "@/features/header/HeaderOptions";
import { HeroPresentationLab } from "@/features/hero/slider/HeroPresentationLab";
import { ServicesFilterLab } from "@/features/services/directory/ServicesFilterLab";
import { useClientReady } from "@/lib/useClientReady";
import { IdentityHeroLab } from "@/features/hero/identity/IdentityHeroLab";
import { WelcomeDirectionLab } from "@/features/hero/slider/WelcomeDirectionLab";

export default function DesignLabPage() {
  const { t: translateText, tx, dir } = useTranslate();

  const [params, setParams] = useSearchParams();
  const ready = useClientReady();
  const hero = getHero(ready ? params.get("hero") : null);
  const [tabOverride, setTabOverride] = useState<string | null>(null);
  const queryTab = ready ? params.get("tab") : null;
  const selectedTab =
    tabOverride ||
    ([
      "welcome",
      "identity",
      "heroes",
      "slider",
      "intro",
      "header",
      "filters",
    ].includes(queryTab || "")
      ? queryTab!
      : "identity");
  const Hero = hero.component;
  const introTrigger = useRef<HTMLButtonElement | null>(null);
  const [intro, setIntro] = useState(getIntro(null)),
    [open, setOpen] = useState(false),
    [run, setRun] = useState(0),
    [notice, setNotice] = useState("");
  function applyHero() {
    try {
      localStorage.setItem("shehri-hero", hero.id);
      window.dispatchEvent(new Event("hero-selection"));
      setNotice(
        translateText("تم تطبيق «{{name}}» على الرئيسية.", {
          name: tx(hero.name),
        }),
      );
    } catch {
      setNotice("تعذّر حفظ الاختيار في المتصفح.");
    }
  }
  function applyIntro() {
    try {
      localStorage.setItem("shehri-intro", intro.id);
      sessionStorage.removeItem("shehri-intro-v2");
      setNotice(
        translateText(
          "تم اختيار «{{name}}» للافتتاحية التالية في هذا المتصفح.",
          { name: tx(intro.name) },
        ),
      );
    } catch {
      setNotice("تعذّر حفظ الاختيار في المتصفح.");
    }
  }
  return (
    <>
      <div className="site-container py-10">
        <p className="mb-3 text-xs text-muted-foreground">
          {tx("مساحة مقارنة التصميم")}
        </p>
        <h1 className="text-3xl md:text-5xl" tabIndex={-1}>
          {tx("معرض تصميمات المكتب.")}
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
          {tx(
            "قارن التكوينات بالحجم الحقيقي على اللابتوب والموبايل، وجرّب التفاعل قبل اختيار التصميم.",
          )}
        </p>
      </div>
      <Tabs
        value={selectedTab}
        onValueChange={setTabOverride}
        dir={dir}
        className="gap-0"
      >
        <div className="site-container">
          <TabsList className="mb-5 h-auto min-h-12 max-w-full flex-wrap bg-secondary p-1 group-data-[orientation=horizontal]/tabs:h-auto">
            <TabsTrigger
              value="welcome"
              className="h-auto min-h-11 flex-none px-4"
            >
              {tx("شريحة الترحيب · ٤ اتجاهات")}
            </TabsTrigger>
            <TabsTrigger
              value="identity"
              className="h-auto min-h-11 flex-none px-4"
            >
              {tx("الشعار والهيرو · ١٠ جديدة")}
            </TabsTrigger>
            <TabsTrigger
              value="slider"
              className="h-auto min-h-11 flex-none px-4"
            >
              {tx("مقارنة السلايدر · 2")}
            </TabsTrigger>
            <TabsTrigger
              value="heroes"
              className="h-auto min-h-11 flex-none px-4"
            >
              Hero Sections · 10
            </TabsTrigger>
            <TabsTrigger
              value="intro"
              className="h-auto min-h-11 flex-none px-4"
            >
              {tx("بريلودر الشعار · ٥")}
            </TabsTrigger>
            <TabsTrigger
              value="header"
              className="h-auto min-h-11 flex-none px-4"
            >
              Header · 3
            </TabsTrigger>
            <TabsTrigger
              value="filters"
              className="h-auto min-h-11 flex-none px-4"
            >
              {tx("فلتر الخدمات · 5")}
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="welcome">
          <WelcomeDirectionLab />
        </TabsContent>
        <TabsContent value="identity">
          <IdentityHeroLab />
        </TabsContent>
        <TabsContent value="slider">
          <HeroPresentationLab />
        </TabsContent>
        <TabsContent value="heroes">
          <div className="site-container grid grid-cols-2 gap-2 pb-6 md:grid-cols-5">
            {heroDirections.map((h, i) => (
              <button
                key={h.id}
                aria-pressed={hero.id === h.id}
                onClick={() => {
                  setParams({ hero: h.id });
                  setNotice("");
                }}
                className="min-h-19 border border-border p-3 text-right transition-colors hover:bg-secondary aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-ivory"
              >
                <span className="mb-1 block text-[10px] opacity-80">
                  {tx(String(i + 1).padStart(2, "0"))}
                </span>
                <span className="text-sm">{tx(h.name)}</span>
              </button>
            ))}
          </div>
          <div className="border-y border-border bg-secondary">
            <div className="site-container flex flex-wrap items-center justify-between gap-4 py-5">
              <div>
                <h2 className="text-xl">{tx(hero.name)}</h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  {tx(hero.note)}
                </p>
              </div>
              <div className="flex gap-3">
                <Button onClick={applyHero}>
                  <Check />
                  {tx("استخدمه في الموقع")}
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/">
                    {tx("شاهد الرئيسية")}
                    <ArrowUpRight />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <div
            className="lab-hero-preview"
            data-testid="hero-preview"
            key={hero.id}
          >
            <HeroPreviewContext.Provider value={true}>
              <Hero />
            </HeroPreviewContext.Provider>
          </div>
          <p
            className="site-container py-5 text-xs text-muted-foreground"
            role="status"
          >
            {tx(
              notice ||
                "جرّب التمرير والمؤشر في الاتجاهات ثلاثية الأبعاد، أو أسهم التنقّل في الاتجاه السادس.",
            )}
          </p>
        </TabsContent>
        <TabsContent value="intro" className="site-container pb-12">
          <IntroGallery
            onPreview={(id, trigger) => {
              introTrigger.current = trigger;
              setIntro(getIntro(id));
              setRun((value) => value + 1);
              setNotice("");
              setOpen(true);
            }}
          />
        </TabsContent>
        <TabsContent value="header">
          <HeaderOptions />
        </TabsContent>
        <TabsContent value="filters" className="pb-12">
          <ServicesFilterLab />
        </TabsContent>
      </Tabs>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="bottom"
          showCloseButton={false}
          className="h-dvh gap-0 border-0 p-0"
          dir={dir}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            introTrigger.current?.focus();
          }}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>{tx(intro.name)}</SheetTitle>
            <SheetDescription>
              {tx("معاينة افتتاحية ")}
              {tx(intro.name)}
            </SheetDescription>
          </SheetHeader>
          <div className="relative min-h-0 flex-1">
            <IntroArtwork key={run} variant={intro.id} />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-ivory px-6 py-4">
            <span className="text-sm">{tx(intro.name)}</span>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                className="min-h-11"
                onClick={() => setRun((r) => r + 1)}
              >
                <Play />
                {tx("إعادة التشغيل")}
              </Button>
              <Button className="min-h-11" onClick={applyIntro}>
                <Check />
                {tx("جرّبه في هذا المتصفح")}
              </Button>
              <SheetClose asChild>
                <Button variant="outline" className="min-h-11">
                  {tx("إغلاق")}
                </Button>
              </SheetClose>
            </div>
            <p role="status" className="w-full text-xs text-muted-foreground">
              {tx(notice)}
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
