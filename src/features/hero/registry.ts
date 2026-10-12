import { ScrollSculpture } from "./directions/ScrollSculpture";
import { CinematicPhoto } from "./directions/CinematicPhoto";
import { EditorialSplit } from "./directions/EditorialSplit";
import { TypePanorama } from "./directions/TypePanorama";
import { OffsetGallery } from "./directions/OffsetGallery";
import { ChapterSlider } from "./directions/ChapterSlider";
import { ForestStatement } from "./directions/ForestStatement";
import { PhotoCurtain } from "./directions/PhotoCurtain";
import { OrbitSculpture } from "./directions/OrbitSculpture";
import { QuietPractice } from "./directions/QuietPractice";
export const heroDirections = [
  {
    id: "scroll-3d",
    name: "منحوتة الاتزان",
    note: "مجسّم ميزان حقيقي يتحرك مع المؤشر والتمرير.",
    component: ScrollSculpture,
  },
  {
    id: "cinematic",
    name: "Slider الخدمات",
    note: "ثلاث صور مختلفة، كشف GSAP، نص متحرك وأسهم وتنقّل باللمس.",
    component: CinematicPhoto,
  },
  {
    id: "editorial",
    name: "مجلّة معمارية",
    note: "عنوان عمودي وصورة طويلة بتكوين تحريري.",
    component: EditorialSplit,
  },
  {
    id: "panorama",
    name: "كلمة وصورة",
    note: "عنوان واسع وصورة بانورامية أفقية.",
    component: TypePanorama,
  },
  {
    id: "offset",
    name: "تفاصيل متقاطعة",
    note: "صورتان متداخلتان ومساحات عاجية واسعة.",
    component: OffsetGallery,
  },
  {
    id: "chapters",
    name: "ثلاثة فصول",
    note: "Slider يدوي مع ثلاثة مجسّمات ومعانٍ مختلفة.",
    component: ChapterSlider,
  },
  {
    id: "statement",
    name: "الاسم والموقف",
    note: "اتجاه طباعي جريء على الأخضر، بدون صورة.",
    component: ForestStatement,
  },
  {
    id: "curtain",
    name: "كشف الضوء",
    note: "نصف صورة ونصف محتوى.",
    component: PhotoCurtain,
  },
  {
    id: "orbit",
    name: "العلاقة والعناية",
    note: "حلقتان ثلاثيتا الأبعاد تستجيبان للمؤشر.",
    component: OrbitSculpture,
  },
  {
    id: "practice",
    name: "دليل البداية",
    note: "صورة هادئة ومسارات الخدمات في أول الشاشة.",
    component: QuietPractice,
  },
] as const;
export function getHero(id: string | null) {
  return heroDirections.find((h) => h.id === id) || heroDirections[1];
}
