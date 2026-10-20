export const logoIntroVariants = [
  {
    id: "logo-balance",
    name: "ريشة الاتزان",
    story:
      "يميل إطار الميزان، ثم تنزل ريشة الشعار إلى موضعها ويستقر الرمز. تطوير لفكرة لحظة الحكم بالهوية المعتمدة.",
    duration: 3000,
    light: false,
  },
  {
    id: "logo-ink",
    name: "رسم الهوية",
    story:
      "تُرسم حدود الشعار على البيج، ثم تمتلئ بالأخضر ويظهر اسم المكتب كالتوقيع.",
    duration: 2900,
    light: true,
  },
  {
    id: "logo-assembly",
    name: "تجمّع الرمز",
    story:
      "الإطار والكتاب والريشة تتقارب من اتجاهات مختلفة، وتلتقي في شعار واحد متكامل.",
    duration: 2800,
    light: false,
  },
  {
    id: "logo-book",
    name: "من الكتاب إلى الشعار",
    story:
      "ينفتح الكتاب أولًا، وينمو الإطار من قاعدته، ثم ترتفع الريشة في مركز الهوية.",
    duration: 3000,
    light: true,
  },
  {
    id: "logo-seal",
    name: "ختم المكتب",
    story:
      "يستقر الشعار كطبعة ختم؛ يمتد أثره لحظة واحدة ثم يبقى الرمز والاسم بوضوح.",
    duration: 2600,
    light: false,
  },
] as const;

export type LogoIntroId = (typeof logoIntroVariants)[number]["id"];
export function isLogoIntro(id: string): id is LogoIntroId {
  return logoIntroVariants.some((variant) => variant.id === id);
}
