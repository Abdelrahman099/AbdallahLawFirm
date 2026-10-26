import { LocalizedLink as Link } from "@/i18n/links";
import { useTranslate } from "@/i18n/useTranslate";
import { useRef } from "react";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { BrandImage } from "@/components/brand/BrandImage";
import { office } from "@/config/office";
import {
  IdentityLockup,
  IdentityMessage,
  IdentityPhoto,
  IdentitySlideControls,
  identitySlides,
  type IdentityLayoutProps,
} from "./IdentityHeroParts";

export function CoverHero({ slide, preview }: IdentityLayoutProps) {
  const { tx } = useTranslate();

  const Heading = preview ? "h2" : "h1";
  return (
    <div className="ih-cover">
      <div className="ih-cover-top">
        <IdentityLockup light={false} />
        <p data-entrance>
          {tx("مشورة واضحة.")}
          <br />
          {tx("وعناية بالتفاصيل.")}
        </p>
      </div>
      <div className="ih-cover-title" data-entrance>
        <Heading>
          {tx("خطوتك القادمة.")}
          <br />
          <span>{tx("برؤية قانونية.")}</span>
        </Heading>
        <Link to="/about" className="ih-link">
          {tx("تعرّف على المكتب")}
          <span className="ih-link-line" aria-hidden="true" />
        </Link>
      </div>
      <div className="ih-cover-image" data-entrance>
        <IdentityPhoto slide={slide} />
        <span>{tx(slide.label)}</span>
      </div>
    </div>
  );
}

export function PortalsHero({ preview }: IdentityLayoutProps) {
  const { tx } = useTranslate();

  const Heading = preview ? "h2" : "h1";
  return (
    <div className="ih-portals">
      <div className="ih-portals-copy">
        <IdentityLockup />
        <div data-entrance>
          <p className="ih-eyebrow">{tx("مجالات الممارسة")}</p>
          <Heading>
            {tx("لكل موضوع.")}
            <br />
            <span>{tx("بابه الصحيح.")}</span>
          </Heading>
          <p className="ih-description">
            {tx("ابدأ بالمجال الأقرب لاحتياجك.")}
          </p>
        </div>
      </div>
      <div className="ih-portal-grid">
        {identitySlides.map((slide, i) => (
          <Link
            key={slide.asset}
            to={`/services?group=${slide.group.id}`}
            className="ih-portal"
            data-entrance
          >
            <BrandImage asset={slide.asset} loading="eager" />
            <span className="ih-portal-copy">
              <span aria-hidden="true">0{i + 1}</span>
              <strong>{tx(slide.label)}</strong>
              <span className="ih-portal-action">{tx("استكشف المجال")}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function DossierHero({
  slide,
  index,
  onSelect,
  preview,
}: IdentityLayoutProps) {
  const { tx } = useTranslate();

  const reduced = useReducedMotion();
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 140, damping: 24 });
  const rotateY = useSpring(y, { stiffness: 140, damping: 24 });
  return (
    <div className="ih-dossier">
      <div className="ih-dossier-copy">
        <IdentityLockup />
        <IdentityMessage slide={slide} preview={preview} />
        <IdentitySlideControls index={index} onSelect={onSelect} />
      </div>
      <div
        className="ih-dossier-stage"
        data-entrance
        onPointerMove={(event) => {
          if (reduced || event.pointerType !== "mouse") return;
          const bounds = event.currentTarget.getBoundingClientRect();
          x.set(-((event.clientY - bounds.top) / bounds.height - 0.5) * 9);
          y.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 12);
        }}
        onPointerLeave={() => {
          x.set(0);
          y.set(0);
        }}
      >
        <motion.div
          className="ih-dossier-object"
          style={reduced ? undefined : { rotateX, rotateY }}
        >
          <span className="ih-dossier-paper ih-paper-back" aria-hidden="true" />
          <span
            className="ih-dossier-paper ih-paper-front"
            aria-hidden="true"
          />
          <div className="ih-dossier-file">
            <div className="ih-file-heading">
              <img
                src="/brand/v4/mark-beige.svg"
                alt=""
                width="58"
                height="50"
              />
              <span>
                {tx(office.name)}
                <small>{tx(office.descriptor)}</small>
              </span>
            </div>
            <IdentityPhoto slide={slide} />
            <p>
              {tx(slide.label)}
              <span>0{index + 1} — 03</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function PanoramaHero({
  slide,
  index,
  onSelect,
  preview,
}: IdentityLayoutProps) {
  const { tx } = useTranslate();

  const target = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  return (
    <div className="ih-panorama" ref={target}>
      <div className="ih-panorama-scene">
        <motion.div
          className="ih-panorama-parallax"
          style={reduced ? undefined : { y }}
        >
          <IdentityPhoto slide={slide} />
        </motion.div>
        <div className="ih-panorama-copy">
          <IdentityMessage slide={slide} preview={preview} />
        </div>
        <IdentitySlideControls index={index} onSelect={onSelect} />
      </div>
      <div className="ih-panorama-signature">
        <IdentityLockup light={false} />
        <p>
          {tx("فهمٌ للموضوع.")}
          <br />
          <span>{tx("ثم خطوة مدروسة.")}</span>
        </p>
      </div>
    </div>
  );
}

export function IndexHero({
  slide,
  index,
  onSelect,
  preview,
}: IdentityLayoutProps) {
  const { tx } = useTranslate();

  const Heading = preview ? "h2" : "h1";
  return (
    <div className="ih-index">
      <div className="ih-index-heading">
        <IdentityLockup />
        <div data-entrance>
          <Heading>{tx("ما موضوعك؟")}</Heading>
          <p>{tx("اختر مجالًا. نبدأ من هنا.")}</p>
        </div>
      </div>
      <div className="ih-index-grid">
        <div
          className="ih-index-rows"
          role="group"
          aria-label={tx("معاينة مجالات العمل")}
        >
          {identitySlides.map((item, i) => (
            <button
              key={item.asset}
              type="button"
              aria-pressed={i === index}
              onClick={() => onSelect(i)}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") onSelect(i);
              }}
              onFocus={() => onSelect(i)}
              data-entrance
            >
              <span className="ih-index-number" aria-hidden="true">
                0{i + 1}
              </span>
              <span>{tx(item.label)}</span>
              <span className="ih-index-indicator" aria-hidden="true">
                {tx(i === index ? "●" : "+")}
              </span>
            </button>
          ))}
          <Link
            to={`/services?group=${slide.group.id}`}
            className="ih-index-destination"
          >
            {tx("استعرض خدمات")}
            {tx(slide.label)}
            <span className="ih-link-line" aria-hidden="true" />
          </Link>
        </div>
        <div className="ih-index-photo" data-entrance>
          <IdentityPhoto slide={slide} />
          <span>{tx(slide.description)}</span>
        </div>
      </div>
    </div>
  );
}
