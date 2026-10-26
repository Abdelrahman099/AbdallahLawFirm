import {
  Link,
  NavLink,
  useLocation,
  type LinkProps,
  type NavLinkProps,
  type To,
} from "react-router-dom";
import { useTranslate } from "./useTranslate";
import { languagePath, stripLanguage } from "./config";
function target(to: To, path: (value: string) => string): To {
  return typeof to === "string"
    ? path(to)
    : { ...to, pathname: to.pathname ? path(to.pathname) : undefined };
}
export function LocalizedLink({ to, ...props }: LinkProps) {
  const { path } = useTranslate();
  return <Link {...props} to={target(to, path)} />;
}
export function LocalizedNavLink({ to, ...props }: NavLinkProps) {
  const { path } = useTranslate();
  return <NavLink {...props} to={target(to, path)} />;
}
export function LanguageSwitch() {
  const { language } = useTranslate();
  const location = useLocation();
  const next = language === "ar" ? "en" : "ar";
  const label = next === "en" ? "Switch to English" : "التبديل للعربية";
  return (
    <Link
      className="language-switch language-toggle"
      lang={next}
      hrefLang={next}
      title={label}
      aria-label={label}
      to={
        languagePath(stripLanguage(location.pathname), next) +
        location.search +
        location.hash
      }
    >
      <span className="language-toggle-code" aria-hidden="true">
        {next.toUpperCase()}
      </span>
    </Link>
  );
}
