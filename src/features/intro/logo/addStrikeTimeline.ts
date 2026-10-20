import gsap from "gsap";

export function addStrikeTimeline(
  timeline: gsap.core.Timeline,
  contact: number,
  start: number,
  from: number,
) {
  gsap.set(".logo-quill-trail", {
    attr: { transform: `translate(0 ${from - 110})` },
  });
  timeline
    .to(".logo-impact-point", { opacity: 1, duration: 0.2 }, 0.2)
    .to(
      ".logo-impact-point",
      {
        attr: { r: 17 },
        duration: 0.5,
        ease: "sine.inOut",
        repeat: 1,
        yoyo: true,
      },
      0.45,
    )
    .to(".logo-quill-trail", { opacity: 0.16, duration: 0.05 }, start + 0.1)
    .to(
      ".logo-quill-trail",
      {
        attr: { transform: "translate(0 -110)" },
        duration: contact - start - 0.1,
        ease: "power4.in",
      },
      start + 0.1,
    )
    .to(".logo-quill-trail", { opacity: 0, duration: 0.05 }, contact)
    .set(".logo-impact-point", { attr: { r: 21 } }, contact)
    .to(
      ".logo-impact-point",
      { attr: { r: 14 }, duration: 0.12, ease: "power2.out" },
      contact,
    )
    .to(".logo-impact-point", { opacity: 0, duration: 0.25 }, contact + 0.16)
    .fromTo(
      ".logo-impact-ring",
      { opacity: 0.8, attr: { r: 16 } },
      {
        opacity: 0,
        attr: { r: 100 },
        duration: 0.38,
        ease: "power2.out",
        immediateRender: false,
      },
      contact,
    )
    .fromTo(
      ".logo-impact-glow",
      { opacity: 1 },
      { opacity: 0, duration: 0.32, immediateRender: false },
      contact,
    )
    .set(".logo-shine", { opacity: 1 }, contact + 0.14)
    .fromTo(
      ".logo-shine-sweep",
      { attr: { transform: "translate(-350 0) skewX(-18)" } },
      {
        attr: { transform: "translate(1500 0) skewX(-18)" },
        duration: 0.68,
        ease: "power1.inOut",
      },
      contact + 0.14,
    )
    .set(".logo-shine", { opacity: 0 }, contact + 0.82);
}
