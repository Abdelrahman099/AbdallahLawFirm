import { balanceVariants } from "./balance/variants";
export const introVariants = [
  ...balanceVariants,
  {
    id: "draw",
    name: "رسم الاتزان",
    story: "يتكوّن الميزان بخط واحد، ثم تظهر هوية المكتب.",
    duration: 2400,
    light: false,
  },
  {
    id: "points",
    name: "من النقطة إلى الاسم",
    story: "ثلاث نقاط تجتمع فوق الاسم؛ بداية مرتبطة بالشهري.",
    duration: 2400,
    light: true,
  },
  {
    id: "folio",
    name: "فتح الملف",
    story: "ورقتان تنفتحان كملف قانوني وتكشفان اسم المكتب.",
    duration: 2600,
    light: true,
  },
  {
    id: "seal",
    name: "بصمة المكتب",
    story: "دائرة تُرسم حول الرمز ثم تستقر كبصمة بصرية.",
    duration: 2400,
    light: false,
  },
  {
    id: "type",
    name: "الاسم أولًا",
    story: "كشف طباعي للاسم مع انتقال هادئ من العاجي للأخضر.",
    duration: 2400,
    light: false,
  },
] as const;
export type IntroId = (typeof introVariants)[number]["id"];
export function getIntro(id: string | null) {
  return introVariants.find((v) => v.id === id) || introVariants[0];
}
