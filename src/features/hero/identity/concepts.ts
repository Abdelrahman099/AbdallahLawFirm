export const identityConcepts = [
  {
    id: "identity-signature",
    family: "evolved",
    name: "التوقيع الرسمي",
    idea: "نفس الصورة والنص، مع شعار واضح على يمين العنوان وتوقيع المكتب أعلى الرسالة.",
    motion: "ظهور متدرّج للشعار والنص، وانتقال هادئ بين الصور.",
  },
  {
    id: "identity-spine",
    family: "evolved",
    name: "هامش الهوية",
    idea: "شريط جانبي للشعار يفصل هوية المكتب عن رسالة كل خدمة، مثل هامش ملف قانوني.",
    motion: "دخول الصورة والتفاصيل في مسارين متتابعين.",
  },
  {
    id: "identity-frame",
    family: "evolved",
    name: "النافذة البرونزية",
    idea: "الصورة داخل إطار رفيع، والشعار يمين النص؛ مساحات أهدأ وتكوين أكثر ترتيبًا.",
    motion: "كشف الصورة ثم ظهور التوقيع والخط البرونزي.",
  },
  {
    id: "identity-seal",
    family: "evolved",
    name: "الشعار أولًا",
    idea: "شعار كبير مستقل على اليمين، يليه اسم المكتب؛ الصورة تساند الهوية بدل منافستها.",
    motion: "ظهور الشعار ثم الرسالة، مع تبادل الصور يدويًا.",
  },
  {
    id: "identity-chapters",
    family: "evolved",
    name: "فصول الممارسة",
    idea: "نفس التقسيم مع فهرس خدمات أسفل النص، يغيّر الرسالة والصورة معًا.",
    motion: "مؤشر اختيار متحرك وانتقال الصور والنصوص عند تغيير الفصل.",
  },
  {
    id: "identity-cover",
    family: "creative",
    name: "غلاف المكتب",
    idea: "غلاف تحريري بالبيج، شعار كبير يمينًا، وصورة أفقية كأنها افتتاحية مجلة.",
    motion: "كشف الصورة من أسفل وتتابع دخول اسم المكتب والوصف.",
  },
  {
    id: "identity-portals",
    family: "creative",
    name: "بوابات الخدمات",
    idea: "هوية على اليمين وثلاث نوافذ مصوّرة إلى مجالات العمل؛ كل صورة مدخل واضح.",
    motion: "دخول الصور بتتابع مختلف وارتفاع خفيف عند المرور أو التركيز.",
  },
  {
    id: "identity-dossier",
    family: "creative",
    name: "ملفّك بين أيدينا",
    idea: "ملف أخضر بطبقات ورقية يحمل صورة الخدمة، مع الشعار والتعريف في الجهة اليمنى.",
    motion: "الملف يميل مع المؤشر مثل Tilted Card، ويعود بسلاسة لوضعه الطبيعي.",
  },
  {
    id: "identity-panorama",
    family: "creative",
    name: "مشهد وتوقيع",
    idea: "صورة عريضة تحتل المشهد، وشريط بيج أسفلها يحمل الشعار واسم المكتب على اليمين.",
    motion: "الصورة تتحرك بخفة مع التمرير، مع بقاء التوقيع ثابتًا وواضحًا.",
  },
  {
    id: "identity-index",
    family: "creative",
    name: "فهرس حيّ",
    idea: "قائمة كبيرة للخدمات مع صورة تتبدّل حسب الاختيار، والشعار ثابت يمينًا.",
    motion: "صورة متغيرة وخط اختيار متحرك؛ يعمل باللمس ولوحة المفاتيح أيضًا.",
  },
] as const;

export type IdentityConcept = (typeof identityConcepts)[number];
export type IdentityConceptId = IdentityConcept["id"];
export function getIdentityConcept(id: string | null) {
  return (
    identityConcepts.find((concept) => concept.id === id) || identityConcepts[0]
  );
}
export function isIdentityConcept(id: string | null): id is IdentityConceptId {
  return identityConcepts.some((concept) => concept.id === id);
}
