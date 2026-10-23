import { useId, useState } from "react";
import { MessagesSquare, Phone, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { WhatsAppIcon } from "@/components/brand/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { office, whatsappUrl } from "@/config/office";
import { localContactNumber } from "@/config/contact";
import "./contact-actions.css";

export function ContactActions() {
  const { pathname } = useLocation();
  if (pathname.startsWith("/design-lab") || (!office.phone && !office.whatsapp))
    return null;
  return (
    <>
      <div className="contact-actions-space" aria-hidden="true" />
      <nav className="contact-actions" aria-label="تواصل مباشر مع المكتب">
        <ContactMenu key={pathname} />
      </nav>
    </>
  );
}

function ContactMenu() {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          size="icon-lg"
          className="contact-toggle"
          aria-label={open ? "إغلاق خيارات التواصل" : "فتح خيارات التواصل"}
          title="تواصل معنا"
        >
          {open ? (
            <X aria-hidden="true" />
          ) : (
            <MessagesSquare aria-hidden="true" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="contact-options"
        side="top"
        align="end"
        sideOffset={12}
        collisionPadding={16}
        aria-labelledby={titleId}
        dir="rtl"
      >
        <PopoverHeader>
          <PopoverTitle id={titleId}>تواصل مع المكتب</PopoverTitle>
        </PopoverHeader>
        <nav aria-label="وسائل التواصل">
          {office.phone && (
            <a
              className="contact-option"
              href={`tel:${office.phone}`}
              onClick={() => setOpen(false)}
            >
              <Phone aria-hidden="true" />
              <span>
                اتصل بنا<bdi>{localContactNumber(office.phone)}</bdi>
              </span>
            </a>
          )}
          {office.whatsapp && (
            <a
              className="contact-option"
              href={whatsappUrl(
                "مرحبًا، أرغب في الاستفسار عن خدمات مكتب عبد الله الشهري.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              <WhatsAppIcon />
              <span>
                راسلنا عبر واتساب
                <bdi>{localContactNumber(office.whatsapp)}</bdi>
              </span>
              <span className="sr-only"> (يفتح في نافذة جديدة)</span>
            </a>
          )}
        </nav>
      </PopoverContent>
    </Popover>
  );
}
