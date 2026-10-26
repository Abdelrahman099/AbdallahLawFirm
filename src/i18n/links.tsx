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
  const { language, t } = useTranslate();
  const location = useLocation();
  return (
    <div className="language-picker" role="group" aria-label={t("لغة الموقع")}>
      {(["ar", "en"] as const).map((choice) => {
        const label = choice === "en" ? "English" : "العربية";
        const flag = (
          <img
            src={choice === "ar" ? "/flags/sa.svg" : "/flags/gb.svg"}
            alt=""
            width={24}
            height={18}
          />
        );
        return choice === language ? (
          <span
            key={choice}
            className="language-current"
            lang={choice}
            title={label}
            aria-label={label}
            aria-current="true"
          >
            {flag}
            <span className="sr-only">{label}</span>
          </span>
        ) : (
          <Link
            key={choice}
            className="language-switch"
            lang={choice}
            hrefLang={choice}
            title={label}
            aria-label={
              choice === "en" ? "Switch to English" : "التبديل للعربية"
            }
            to={
              languagePath(stripLanguage(location.pathname), choice) +
              location.search +
              location.hash
            }
          >
            {flag}
            <span className="sr-only">{label}</span>
          </Link>
        );
      })}
    </div>
  );
}
