const fs = require("node:fs");
let html = fs.readFileSync("brand/brand-book.html", "utf8");
html = html
  .replaceAll("هوية مقترحة · إصدار 01", "الشعار المعتمد v3 · دليل التطبيق 2026")
  .replaceAll("هوية مقترحة لمكتب المحامي", "الهوية البصرية لمكتب المحامي")
  .replaceAll("الإصدار المقترح 01", "الشعار المعتمد v3 · أكتوبر 2026")
  .replace(
    "مرسومة بكتل بسيطة من دون سلاسل أو زخارف دقيقة.",
    "مرسومة بخطوط محسوبة وكفّتين متوازنتين وقاعدة مستقرة؛ حضور واضح دون زخرفة مزدحمة.",
  )
  .replace(
    "مساحة الحماية حول الشعار تساوي عرض نقطة من الرمز على الأقل؛ تُزاد عند توفر المساحة.",
    "مساحة الحماية حول الشعار تساوي عرض نقطتين من الرمز على الأقل؛ تُزاد عند توفر المساحة.",
  )
  .replace(
    "البرونزي للتفاصيل؛ لا تستخدمه لفقرات صغيرة على العاجي.",
    "البرونزي #B48753 للتفاصيل؛ تباينه على العاجي 2.91:1. نصوص الموقع البرونزية تستخدم درجة أغمق #886239 للحفاظ على القراءة.",
  )
  .replace(
    "نموذج تفاعلي محلي مرفق؛ الربط والتواصل الفعلي خارج نطاق المعاينة.",
    "موقع متعدد الصفحات بمعاينة تفاعلية مرفقة؛ استقبال الطلبات يُفعّل بعد إضافة بيانات التواصل ووسيلة الاستقبال.",
  )
  .replace(
    "نموذج بتسميات والتحقق من الحقول، ورسالة صريحة عند انتهاء المعاينة.",
    "حجز في ثلاث خطوات، تحقق من الحقول، ومراجعة الطلب قبل إرساله. الحالة الحالية توضّح أن وسيلة الاستقبال لم تُفعّل.",
  )
  .replace(
    "اعتماد الرسم والعبارة، وبيانات الاتصال، وكتابة الاسم الإنجليزية، وصور المكتب.",
    "الرسم v3 معتمد. تُراجع العبارة والمحتوى وبيانات الاتصال وكتابة الاسم الإنجليزية وصور المكتب.",
  )
  .replace(
    "قرارات تصميم مقترحة للمكتب؛ الوكالات المذكورة لم تصمم أو تعتمد هذه الهوية.",
    "مراجع لمنهج تنظيم الهوية والتجربة؛ الوكالات المذكورة لم تصمم أو تعتمد هذه الهوية.",
  );
const page = (title, content) =>
  `<section class="page"><div class="book-head"><span>عبد الله الشهري · دليل الهوية</span><span class="dots" aria-hidden="true"><i></i><i></i><i></i></span></div><h1 class="page-title">${title}</h1>${content}<div class="book-footer"><span>الشعار المعتمد v3 · دليل التطبيق 2026</span><span dir="ltr"></span></div></section>`;
const motion = page(
  "حركة لها معنى: الوصول إلى الاتزان.",
  `<div class="grid2"><div class="green" style="height:350px;display:flex;align-items:center;justify-content:center;border-radius:160px 160px 0 0"><img src="logos/mark-reverse.svg" style="width:230px" alt="الميزان المعتمد"></div><div><h2 style="font-size:38px;margin-bottom:20px">حضور هادئ.<br>تفاصيل تستجيب.</h2><p style="font-size:22px">خمس معالجات للحركة: رسم الميزان واتزانه، تجمّع النقاط، فتح الملف، بصمة الختم، وكشف الاسم. الترشيح الأول رسم الاتزان مع ظهور اسم المكتب.</p><p class="tiny" style="margin-top:20px">الرسم الأساسي ثابت؛ الحركة معالجة رقمية مشتقة منه، وليست نسخة بديلة للشعار.</p></div></div><div class="grid3" style="margin-top:28px"><div class="card"><h3>افتتاحية قصيرة</h3><p>مرة واحدة في الجلسة، ٢٫٤–٢٫٦ ثانية، مع خيار التخطي.</p></div><div class="card"><h3>عمق خفيف</h3><p>مجسّم الميزان يستجيب للمؤشر والتمرير. في الرئيسية Slider للخدمات بكشف صور متتابع.</p></div><div class="card"><h3>راحة الاستخدام</h3><p>تُلغى الحركة غير الأساسية عند تفضيل الحركة المخففة. يبقى الرسم الثابت متاحًا.</p></div></div>`,
);
const site = page(
  "نظام صفحات، وليس صفحة واحدة طويلة.",
  `<div class="grid3"><div class="card"><h3>تعرّف على المكتب</h3><p>الرئيسية · عن المكتب · كيف نعمل معك · التواصل.</p></div><div class="card"><h3>اختر مجال العمل</h3><p>دليل خدمات قابل للتصفية والبحث، و٨ صفحات تخصص بمحتوى مستقل.</p></div><div class="card"><h3>ابدأ الاستشارة</h3><p>حجز بثلاث خطوات · أسئلة شائعة · إرشادات و٣ موضوعات للتحضير · خصوصية وشروط.</p></div></div><div class="rule"></div><div class="grid2"><div><h2 style="font-size:32px;margin-bottom:15px">٢١ صفحة + صفحة عدم العثور</h2><p style="font-size:21px">كل خدمة لها نطاق واضح وأسئلة مناسبة ودعوة لطلب الاستشارة. يظهر الاسم والرمز والألوان والخط نفسه عبر جميع الصفحات.</p></div><div><h2 style="font-size:32px;margin-bottom:15px">محتوى قابل للتحديث</h2><p style="font-size:21px">التأسيس عام ٢٠١٥ والعنوان من إجابات المكتب. بيانات الاتصال والصور غير المتاحة موضحة مؤقتًا؛ لا آراء عملاء أو إنجازات مختلقة.</p></div></div><p class="tiny" style="margin-top:28px">المرحلة الحالية معاينة محلية. قبل الإطلاق: مراجعة المحتوى، صور وبيانات التواصل المعتمدة، الدومين، وسياسة المعالجة ووسيلة استقبال تحفظ الطلب وتؤكد وصوله.</p>`,
);
if (!html.includes("حركة لها معنى: الوصول إلى الاتزان."))
  html = html.replace(
    '<section class="page " data-page="16">',
    motion + site + '<section class="page " data-page="16">',
  );
let count = 0;
html = html.replace(
  /<span dir="ltr">\d{2} \/ 17<\/span>|<span dir="ltr"><\/span>/g,
  () => `<span dir="ltr">${String(++count).padStart(2, "0")} / 19</span>`,
);
fs.writeFileSync("brand/brand-book.html", html);
const approval = JSON.parse(fs.readFileSync("brand/approval.json"));
approval.previousApplicationsUpdated = true;
approval.guideUpdated = "2026-10-12";
fs.writeFileSync("brand/approval.json", JSON.stringify(approval, null, 2));
for (const file of ["website-desktop.png", "website-mobile.png"])
  fs.copyFileSync("output/" + file, "brand/" + file);
console.log(
  "Brand guide updated to 19 pages with approved v3 and current website.",
);
