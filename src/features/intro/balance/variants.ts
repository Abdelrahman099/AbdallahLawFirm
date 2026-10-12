export const balanceVariants = [
  {
    id: "balance-onyx",
    name: "01 · لحظة الحكم",
    story: "مشهد أخضر داكن، تأرجح واضح ثم نزول السيف واستقرار خط الاتزان.",
    duration: 3000,
    light: false,
  },
  {
    id: "balance-ivory",
    name: "02 · خط العدالة",
    story:
      "رسم خفيف على العاجي؛ يدخل السيف في المحور ويتحوّل التردد إلى اتزان.",
    duration: 2900,
    light: true,
  },
  {
    id: "balance-seal",
    name: "03 · ختم الاتزان",
    story: "الميزان داخل ختم دائري؛ تتكامل حلقته بعد استقرار الكفتين بالسيف.",
    duration: 3100,
    light: false,
  },
  {
    id: "balance-split",
    name: "04 · طرفان وقرار",
    story: "مساحتان متقابلتان، السيف يجمعهما في محور واحد وتستوي الكفتان.",
    duration: 3000,
    light: false,
  },
  {
    id: "balance-blueprint",
    name: "05 · هندسة الإنصاف",
    story:
      "خطوط قياس تُظهر ميل الميزان؛ يتقاطع السيف مع المحور فتستقر الإحداثيات.",
    duration: 3100,
    light: false,
  },
  {
    id: "balance-monolith",
    name: "06 · منصة العدالة",
    story:
      "ميزان فوق قاعدة مجسمة بصريًا، نزول عمودي للسيف مع ضوء يهدأ بعد الاتزان.",
    duration: 3200,
    light: false,
  },
  {
    id: "balance-ink",
    name: "07 · من الرسم إلى الحكم",
    story:
      "خطوط الميزان تُرسم على الورق، ثم ينزل السيف وتختتم الحركة باتزان كامل.",
    duration: 3200,
    light: true,
  },
  {
    id: "balance-portal",
    name: "08 · بوابة الوضوح",
    story: "إطار حجري مستطيل ينفتح على ميزان مائل؛ يثبت السيف ويستقيم الميزان.",
    duration: 3100,
    light: true,
  },
  {
    id: "balance-orbit",
    name: "09 · محاور متوافقة",
    story: "حلقات في مستويات مختلفة تلتقي مع نزول السيف واستقرار الكفتين.",
    duration: 3200,
    light: false,
  },
  {
    id: "balance-curtain",
    name: "10 · انكشاف العدالة",
    story: "ستارتان تنفتحان بعد نزول السيف؛ يظهر الاسم تحت ميزان متزن.",
    duration: 3300,
    light: false,
  },
] as const;
export type BalanceIntroId = (typeof balanceVariants)[number]["id"];
export function isBalanceIntro(id: string): id is BalanceIntroId {
  return balanceVariants.some((variant) => variant.id === id);
}
