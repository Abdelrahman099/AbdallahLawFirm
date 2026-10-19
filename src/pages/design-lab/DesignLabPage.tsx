import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
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
import { introVariants, getIntro } from "@/features/intro/variants";
import { IntroArtwork } from "@/features/intro/IntroArtwork";
import { heroDirections, getHero } from "@/features/hero/registry";
import { HeroPreviewContext } from "@/features/hero/HeroCopy";
import "@/features/hero/directions.css";
import { HeaderOptions } from "@/features/header/HeaderOptions";
import { HeroPresentationLab } from "@/features/hero/slider/HeroPresentationLab";
import { ServicesFilterLab } from "@/features/services/directory/ServicesFilterLab";
import { useClientReady } from "@/lib/useClientReady";
import { IdentityHeroLab } from "@/features/hero/identity/IdentityHeroLab";

export default function DesignLabPage() {
  const [params, setParams] = useSearchParams();
  const ready = useClientReady();
  const hero = getHero(ready ? params.get("hero") : null);
  const [tabOverride, setTabOverride] = useState<string | null>(null);
  const queryTab = ready ? params.get("tab") : null;
  const selectedTab =
    tabOverride ||
    (["identity", "heroes", "slider", "intro", "header", "filters"].includes(
      queryTab || "",
    )
      ? queryTab!
      : "identity");
  const Hero = hero.component;
  const [intro, setIntro] = useState(getIntro("balance-onyx")),
    [open, setOpen] = useState(false),
    [run, setRun] = useState(0),
    [notice, setNotice] = useState("");
  function applyHero() {
    try {
      localStorage.setItem("shehri-hero", hero.id);
      window.dispatchEvent(new Event("hero-selection"));
      setNotice("تم تطبيق «" + hero.name + "» على الرئيسية.");
    } catch {
      setNotice("تعذّر حفظ الاختيار في المتصفح.");
    }
  }
  function applyIntro() {
    try {
      localStorage.setItem("shehri-intro", intro.id);
      sessionStorage.removeItem("shehri-intro-v2");
      setNotice("تم اختيار «" + intro.name + "» للافتتاحية التالية.");
    } catch {
      setNotice("تعذّر حفظ الاختيار في المتصفح.");
    }
  }
  return (
    <>
      <div className="site-container py-10">
        <p className="mb-3 text-xs text-muted-foreground">
          مساحة مقارنة التصميم
        </p>
        <h1 className="text-3xl md:text-5xl" tabIndex={-1}>
          معرض تصميمات المكتب.
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
          قارن التكوينات بالحجم الحقيقي على اللابتوب والموبايل، وجرّب التفاعل
          قبل اختيار التصميم.
        </p>
      </div>
      <Tabs
        value={selectedTab}
        onValueChange={setTabOverride}
        dir="rtl"
        className="gap-0"
      >
        <div className="site-container">
          <TabsList className="mb-5 h-auto min-h-12 max-w-full flex-wrap bg-secondary p-1">
            <TabsTrigger value="identity" className="px-6">
              الشعار والهيرو · ١٠ جديدة
            </TabsTrigger>
            <TabsTrigger value="slider" className="px-6">
              مقارنة السلايدر · 2
            </TabsTrigger>
            <TabsTrigger value="heroes" className="px-6">
              Hero Sections · 10
            </TabsTrigger>
            <TabsTrigger value="intro" className="px-6">
              Preloaders · 15
            </TabsTrigger>
            <TabsTrigger value="header" className="px-6">
              Header · 3
            </TabsTrigger>
            <TabsTrigger value="filters" className="px-6">
              فلتر الخدمات · 5
            </TabsTrigger>
          </TabsList>
        </div>
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
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm">{h.name}</span>
              </button>
            ))}
          </div>
          <div className="border-y border-border bg-secondary">
            <div className="site-container flex flex-wrap items-center justify-between gap-4 py-5">
              <div>
                <h2 className="text-xl">{hero.name}</h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  {hero.note}
                </p>
              </div>
              <div className="flex gap-3">
                <Button onClick={applyHero}>
                  <Check />
                  استخدمه في الموقع
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/">
                    شاهد الرئيسية <ArrowUpRight />
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
            {notice ||
              "جرّب التمرير والمؤشر في الاتجاهات ثلاثية الأبعاد، أو أسهم التنقّل في الاتجاه السادس."}
          </p>
        </TabsContent>
        <TabsContent value="intro" className="site-container pb-12">
          <p className="mb-6 text-sm text-muted-foreground">
            ١٠ افتتاحيات جديدة: ميزان مختل، نزول سيف العدالة، ثم اتزان الكفتين.
            يليها ٥ افتتاحيات سابقة للمقارنة.
          </p>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {introVariants.map((v, i) => (
              <article key={v.id} className="border border-border">
                <div className="intro-preview-tile h-[290px]">
                  <IntroArtwork variant={v.id} />
                </div>
                <div className="p-5">
                  <span className="text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-2 text-2xl">{v.name}</h2>
                  <p className="mt-3 min-h-12 text-xs text-muted-foreground">
                    {v.story}
                  </p>
                  <Button
                    variant="outline"
                    className="mt-5"
                    onClick={() => {
                      setIntro(v);
                      setRun((r) => r + 1);
                      setOpen(true);
                    }}
                  >
                    <Play />
                    تشغيل بالحجم الكامل
                  </Button>
                </div>
              </article>
            ))}
          </div>
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
          dir="rtl"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>{intro.name}</SheetTitle>
            <SheetDescription>معاينة افتتاحية {intro.name}</SheetDescription>
          </SheetHeader>
          <div className="relative min-h-0 flex-1">
            <IntroArtwork key={run} variant={intro.id} />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-ivory px-6 py-4">
            <span className="text-sm">{intro.name}</span>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setRun((r) => r + 1)}>
                <Play />
                إعادة التشغيل
              </Button>
              <Button onClick={applyIntro}>
                <Check />
                استخدمه في الموقع
              </Button>
              <SheetClose asChild>
                <Button variant="outline">إغلاق</Button>
              </SheetClose>
            </div>
            <p role="status" className="w-full text-xs text-muted-foreground">
              {notice}
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
