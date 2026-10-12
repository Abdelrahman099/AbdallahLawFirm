# الأصول البصرية

## الصورة المعمارية

الملف: public/images/architectural-atrium.webp. توليد عبر أداة imagegen المدمجة، ثم حفظ داخل المشروع كـWebP. صورة تصورية غير مرتبطة بعنوان المكتب؛ لا أشخاص ولا شعارات أو لوحة موقع فعلي. تستخدم الاتجاهات المصورة اقتصاصات مختلفة من الأصل نفسه؛ يمكن استبدالها لاحقًا بصور المكتب المعتمدة.

الوصف النهائي المستخدم: "Photorealistic editorial architectural photograph, wide 16:9. Monumental contemporary atrium of warm beige travertine stone, slender columns, diagonal afternoon sunlight, deep forest green bronze doors, polished stone floor and walnut accents. Architectural magazine photography, straight verticals, strong depth, restrained greens and sandstone. No people, signage, writing, logo, scales, arches or interface."

## المجسّمات

ميزان بقاعدة وكفّتين وحبال، تكوين أعمدة وحلقة للوضوح، وحلقتان متداخلتان للعناية. نمذجة Three.js هندسية داخل src/features/hero/Sculptures.tsx، مع إضاءة غرفة محلية وانعكاسات دون خرائط بيئة خارجية. تتوقف التحديثات عند استقرار التفاعل، وتُعرض نسخة ثابتة للحركة المخففة أو غياب WebGL.

## مراجع العرض

- [React Bits Model Viewer](https://reactbits.dev/components/model-viewer): تكوين المجسّم مع الإضاءة والظل والتحريك بالمؤشر.
- [React Bits Carousel](https://reactbits.dev/components/carousel): فصل الشرائح والتحكم الصريح في الانتقال.
- [NN/G Animation Purpose](https://www.nngroup.com/articles/animation-purpose-ux/): حركة مرتبطة بالمعنى والتفاعل.

هذه مراجع للمنهج. لم تُنسخ واجهات مواقع محاماة أو صور معماريين من نتائج البحث إلى المشروع.

## Slider assets, 12 October 2026
Generated with the built-in image_gen tool; conceptual imagery, not photographs of the actual office.

Saved files: [legal-folio.webp](D:/Work/WebDev/مكتب-محامي/public/images/legal-folio.webp), [stone-entrance.webp](D:/Work/WebDev/مكتب-محامي/public/images/stone-entrance.webp).

Final prompt 1: Create a photorealistic premium editorial photograph for an Arabic Saudi law firm website, landscape 16:9 composition. A quiet meticulous legal desk still life: dark forest green leather desk blotter, closed warm beige legal folio with absolutely no text, elegant bronze pen, a single document showing only indistinct illegible lines, walnut tabletop, sun rays and soft shadows, background softly blurred architectural travertine interior. Sophisticated understated luxury, tactile real materials, restrained palette forest green warm ivory bronze. Shot on medium format, editorial architecture magazine realism. No people, no logos, no readable text, no watermark, no scales, no gavel, no UI. Entire image is the photograph.

Final prompt 2: Create a photorealistic premium architectural photograph for a Saudi law firm website. Landscape 16:9. Close view of monumental pale travertine rectangular columns and a wide stone staircase in warm afternoon sunlight, bronze doorway in distance, deep green restrained foliage at edge, beautiful geometric shadows, contemporary understated institutional architecture in Jeddah. Natural honest photographic realism, subtle ivory and forest green color palette, premium editorial magazine, calm authority. No arches, no people, no logos, no signs, no readable text, no watermark, no scales, no gavel, no UI. Entire image is the photograph.
- public/images/legal-folio.webp: Photorealistic landscape editorial still life, forest leather desk blotter, beige blank folio, bronze pen, walnut desk, afternoon light, travertine interior; no people, readable text or logos.
- public/images/stone-entrance.webp: Photorealistic landscape contemporary Saudi institutional architecture, travertine rectangular columns, broad staircase, bronze door, warm sunlight, restrained greenery; no people, signs or logos.


## صور الهوية — المرحلة الأولى، 12 أكتوبر 2026

توليد أربع صور أصلية بأداة image_gen المدمجة، بألوان الأخضر الداكن والعاجي والبرونزي: ميزان العدالة، مراجعة العقود، جلسة الاستشارة، وتجهيز المستندات. الصور مشاهد تصورية وليست تصويرًا للمقر أو ملفات عملاء. حلّت محل صور المباني والكتب العامة في الرئيسية ومعاينات الخدمات والمينو.

الأصول PNG محفوظة داخل `brand/visuals/brand-*-v1.png`. النسخ المستخدمة WebP داخل `public/images/brand-*-v1.webp`، مع نسخ `-mobile.webp` بعرض 720px. أوصاف التوليد النهائية كاملة محفوظة في `docs/brand-image-prompts.json`. معالجة الملفات اقتصرت على تصغير الحجم والترميز؛ لم يُعدّل محتوى الصور.

على الموبايل الصورة ممتدة بعرض الشاشة وفوق النص، واقتصاص الميزان يحفظ الرأس والكفتين والقاعدة. موقع التفاصيل في صورة الاستشارة محفوظ عند الاقتصاص في قسم المكتب. البدائل المعمارية السابقة تظل داخل معمل التصميم فقط.


## الصور المستخدمة حاليًا — تنوع الخدمات والإرشادات

أضيفت 11 صورة مستقلة بأداة image_gen المدمجة: 8 للخدمات، و3 للإرشادات. الأصول محفوظة داخل `brand/visuals/brand-*-v2.png`، نسخ WebP ونسخ الموبايل داخل `public/images`. أوصاف التوليد النهائية وربط كل موضوع بالملف محفوظة في `practice-image-prompts-v2.json`. معاينة المجموعة في `output/qa/practice-images-v2-sheet.png`. الصور الأربع الأولى لا تزال مخصصة للهوية ومحتوى المكتب والتحضير، وليست بدائل متكررة لكل الخدمات.
