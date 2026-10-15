import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { services } from "@/data/services";
import { serviceGroups } from "@/data/serviceGroups";
import { office } from "@/config/office";
import { MapPin, Menu, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { NavLink } from "react-router-dom";
import { navigation } from "./navigation";
import "./navigation.css";
import { BrandImage } from "@/components/brand/BrandImage";
import { cn } from "@/lib/utils";

export function MobileNavigation({
  open,
  onOpenChange,
  inverse = false,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inverse?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "header-menu-trigger h-11 w-11 bg-transparent text-forest hover:bg-forest/5 hover:text-forest lg:hidden",
            inverse &&
              "border-white/25 text-ivory hover:bg-white/5 hover:text-ivory",
          )}
          aria-label="فتح القائمة"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="mobile-navigation"
        showCloseButton={false}
        dir="rtl"
      >
        <SheetHeader className="mobile-navigation-heading">
          <div className="mobile-navigation-top">
            <Logo />
            <SheetClose asChild>
              <Button variant="outline" size="icon" aria-label="إغلاق القائمة">
                <X />
              </Button>
            </SheetClose>
          </div>
          <SheetTitle className="mobile-navigation-title">
            كيف نقدر نساعدك؟
          </SheetTitle>
          <SheetDescription>
            اختر الخدمة، أو تعرّف على المكتب قبل حجز استشارتك.
          </SheetDescription>
        </SheetHeader>
        <motion.figure
          className="mobile-navigation-photo"
          initial={false}
          animate={{ opacity: open ? 1 : 0 }}
          transition={{ duration: reduced ? 0 : 0.25 }}
        >
          <BrandImage asset="contracts" loading="eager" />
        </motion.figure>
        <nav aria-label="قائمة الموبايل" className="mobile-navigation-links">
          <Accordion type="single" collapsible className="mobile-services-menu">
            <AccordionItem value="services">
              <AccordionTrigger>الخدمات القانونية</AccordionTrigger>
              <AccordionContent>
                <div className="mobile-services-links">
                  {serviceGroups.map((group) => (
                    <div className="mobile-service-group" key={group.id}>
                      <h3>{group.title}</h3>
                      {group.slugs.map((slug) => (
                        <SheetClose asChild key={slug}>
                          <NavLink to={`/services/${slug}`}>
                            <span>
                              {
                                services.find(
                                  (service) => service.slug === slug,
                                )!.title
                              }
                            </span>
                          </NavLink>
                        </SheetClose>
                      ))}
                    </div>
                  ))}
                  <SheetClose asChild>
                    <NavLink to="/services" className="mobile-services-all">
                      دليل الخدمات بالكامل
                    </NavLink>
                  </SheetClose>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="mobile-navigation-pages">
            {[
              ...navigation.filter(([to]) => to !== "/services"),
              ["/faq", "الأسئلة الشائعة"],
            ].map(([to, text]) => (
              <SheetClose asChild key={to}>
                <NavLink to={to} end={to === "/"}>
                  <span>{text}</span>
                </NavLink>
              </SheetClose>
            ))}
          </div>
        </nav>
        <div className="mobile-navigation-action">
          <a className="text-link" href={`mailto:${office.email}`} dir="ltr">
            {office.email}
          </a>
          <p>
            <MapPin aria-hidden="true" />
            بالمكتب أو عن بُعد · الاستشارة الأولى مجانية
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
