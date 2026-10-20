export const logoIntroVariants = [
  {
    id: "logo-balance",
    name: "ريشة الاتزان",
    story:
      "كفّة ترتفع وأخرى تنخفض في تأرجح متناقص؛ تنزل الريشة رأسيًا إلى موضعها وتثبّت الميزان.",
    duration: 3300,
    light: false,
  },
  {
    id: "logo-ink",
    name: "توقيع الاتزان",
    story:
      "تُرسم حدود الميزان المتأرجح على البيج؛ تهبط الريشة كآخر توقيع فينتهي التذبذب.",
    duration: 3300,
    light: true,
  },
  {
    id: "logo-assembly",
    name: "طرفان وقرار",
    story:
      "تدخل الكفّتان من طرفين متقابلين وتتأرجحان؛ تسلك الريشة مسارًا منحنيًا ثم تستقر في المركز وتوقفهما.",
    duration: 3400,
    light: false,
  },
  {
    id: "logo-book",
    name: "نقطة الارتكاز",
    story:
      "ينفتح الكتاب كقاعدة ثابتة تحت الميزان؛ تنزل الريشة ببطء، ومع ملامسة موضعها يستقر الطرفان.",
    duration: 3500,
    light: true,
  },
  {
    id: "logo-seal",
    name: "لحظة الحسم",
    story:
      "تأرجح أوسع يتبعه هبوط سريع للريشة؛ يتوقف الميزان بوضوح ويمتد أثر خفيف كالختم.",
    duration: 3400,
    light: false,
  },
] as const;

export type LogoIntroId = (typeof logoIntroVariants)[number]["id"];
export function isLogoIntro(id: string): id is LogoIntroId {
  return logoIntroVariants.some((variant) => variant.id === id);
}
