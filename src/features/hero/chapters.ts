export const chapters = [
  {
    id: "balance",
    word: "اتزان.",
    title: "كل قرار يستحق رؤية متوازنة.",
    text: "نفهم المسألة، ونضع الخيارات في سياقها.",
    label: "فهم المسألة",
  },
  {
    id: "clarity",
    word: "وضوح.",
    title: "تفاصيل أوضح. خطوة أهدأ.",
    text: "نرتّب المعلومات ونشرح نطاق العمل.",
    label: "تنظيم الخيارات",
  },
  {
    id: "care",
    word: "عناية.",
    title: "علاقة تبدأ بالاستماع.",
    text: "تواصل قريب وعناية بتفاصيل موضوعك.",
    label: "تحديد الخطوة",
  },
] as const;
export type ChapterId = (typeof chapters)[number]["id"];
