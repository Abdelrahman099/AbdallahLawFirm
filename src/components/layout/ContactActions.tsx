import { useLocation } from "react-router-dom";
import { WhatsAppIcon } from "@/components/brand/WhatsAppIcon";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { office, whatsappUrl } from "@/config/office";
import "./contact-actions.css";

export function ContactActions() {
  const { pathname } = useLocation();
  if (pathname.startsWith("/design-lab")) return null;
  return (
    <>
      <div className="contact-actions-space" aria-hidden="true" />
      <nav className="contact-actions" aria-label="تواصل مباشر مع المكتب">
        {office.whatsapp && (
          <div className="contact-whatsapp-wrap">
            <span className="contact-whatsapp-label" aria-hidden="true">
              راسلنا عبر واتساب
            </span>
            <a
              className={cn(
                buttonVariants({ size: "icon-lg" }),
                "contact-whatsapp",
              )}
              href={whatsappUrl(
                "مرحبًا، أرغب في الاستفسار عن خدمات مكتب عبد الله الشهري.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="راسل المكتب عبر واتساب (يفتح في نافذة جديدة)"
              title="راسلنا عبر واتساب"
            >
              <WhatsAppIcon />
            </a>
          </div>
        )}
      </nav>
    </>
  );
}
