import {
  LocalizedLink as Link,
  LocalizedNavLink as NavLink,
} from "@/i18n/links";
import { useTranslate } from "@/i18n/useTranslate";
import { Logo } from "@/components/brand/Logo";
import { MobileBrandLogo } from "@/components/brand/MobileBrandLogo";
import { CTA } from "@/components/shared/ConsultationCTA";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { useHeaderTheme } from "@/features/header/useHeaderTheme";
import { useHeaderScroll } from "@/features/header/useHeaderScroll";
import { navigation } from "@/features/header/navigation";
import { ServicesDropdown } from "@/features/header/ServicesDropdown";
import { MobileNavigation } from "@/features/header/MobileNavigation";
import { LanguageSwitch } from "@/i18n/links";
export function Header() {
  const { tx } = useTranslate();

  const theme = useHeaderTheme();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const reduced = useReducedMotion();
  const { scrolled, hidden } = useHeaderScroll(location.pathname);
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);
  return (
    <motion.header
      initial={false}
      animate={{ boxShadow: scrolled ? "0 8px 30px #0b241b0d" : "0 0 0 #0000" }}
      transition={{ duration: reduced ? 0 : 0.3 }}
      className={`site-header premium-header header-theme-${theme} ${scrolled ? "header-scrolled" : ""} ${hidden ? "header-mobile-hidden" : ""} ${open ? "header-menu-open" : ""}`}
    >
      <div className="site-container header-main">
        <Link to="/" aria-label={tx("الرئيسية")} className="header-identity">
          <span className="hidden lg:block">
            <Logo inverse={theme === "forest"} />
          </span>
          <span className="block lg:hidden">
            <MobileBrandLogo inverse={theme === "forest"} />
          </span>
        </Link>
        <nav aria-label={tx("القائمة الرئيسية")} className="desktop-nav">
          {navigation.map(([to, text]) =>
            to === "/services" ? (
              <ServicesDropdown key={to} />
            ) : (
              <NavLink key={to} to={to} end={to === "/"}>
                {({ isActive }) => (
                  <>
                    <span>{tx(text)}</span>
                    {isActive && (
                      <motion.i
                        className="nav-active-line"
                        layoutId="main-nav-indicator"
                        transition={{
                          duration: reduced ? 0 : 0.3,
                          ease: "easeOut",
                        }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ),
          )}
        </nav>

        <div className="header-utilities hidden lg:flex">
          <LanguageSwitch />
          <CTA
            light={theme === "forest"}
            className="header-cta h-13 px-5 text-sm"
          />
        </div>
        <CTA
          light={theme === "forest"}
          className="mobile-header-cta h-11 w-full justify-center gap-0 px-2 text-[clamp(10px,2.8vw,12px)] [&_svg]:hidden lg:hidden"
        />
        <div className="mobile-header-tools lg:hidden">
          <MobileNavigation
            open={open}
            onOpenChange={setOpen}
            inverse={theme === "forest"}
          />
          <LanguageSwitch />
        </div>
      </div>
    </motion.header>
  );
}
