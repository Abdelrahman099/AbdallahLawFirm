export const welcomeDirections = [
  {
    id: "justice",
    name: "صورة العدالة",
    note: "صورة قانونية خلف ترحيب مختصر وشعار كبير في المنتصف، ثم اسم المكتب.",
  },
  {
    id: "silk",
    name: "التوقيع الهادئ",
    note: "أخضر متصل، إضاءة جانبية هادئة، وشعار بمساحة تنفّس. ترشيحي للموقع.",
  },
  {
    id: "letter",
    name: "ورق المراسلات",
    note: "غلاف بيج مستوحى من مراسلات المكتب، مع الشعار الأخضر على اليمين.",
  },
  {
    id: "seal",
    name: "ختم المكتب",
    note: "تكوين مركزي: الشعار فوق الاسم، وحضور مختصر وهادئ للهوية.",
  },
  {
    id: "gallery",
    name: "الضوء والصورة",
    note: "صورة قانونية تغمر الخلفية، وتوقيع صغير بجانب ترحيب واضح.",
  },
] as const;
export type WelcomeDirection = (typeof welcomeDirections)[number]["id"];
export function getWelcomeDirection(id: string | null) {
  return (
    welcomeDirections.find((direction) => direction.id === id) ||
    welcomeDirections[0]
  );
}
