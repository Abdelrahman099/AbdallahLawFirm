# إعداد أدوات تصميم وتطوير الويب

تاريخ الإعداد: 12 أكتوبر 2026.

تم اختيار هذا الإعداد لمشروع الموقع العربي الحالي، الذي يستخدم React 19 وVite وTypeScript وTailwind 4. الأدوات تغطي التصميم والحركة والمكونات والأداء وفحص المتصفح. اختيارها مبني على توافقها مع المشروع ومصادرها الأصلية؛ لا يمثل ترتيبًا عامًا لكل أدوات السوق.

## المهارات المثبتة

تم تثبيت المهارات في `C:\Users\Foxyd\.agents\skills`، لتكون متاحة لمشاريع المستخدم المختلفة.

| المهارة | الاستخدام | المصدر |
| --- | --- | --- |
| UI/UX Pro Max | البحث في أنماط التصميم والألوان والخطوط وتجربة الاستخدام وGSAP | [المستودع الأصلي](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) |
| Motion | قواعد الحركة ومراجعة واجهات Motion والبحث عن أمثلة | [Motion AI Kit](https://motion.dev/docs/ai-kit-install) |
| shadcn | اختيار المكونات وتركيبها وتخصيصها حسب إعداد المشروع | [المهارة الرسمية](https://ui.shadcn.com/docs/skills) |
| Vercel React Best Practices | أداء React وحجم الملفات وإعادة التصيير | [Vercel Agent Skills](https://github.com/vercel-labs/agent-skills) |
| Vercel Composition Patterns | بناء مكونات قابلة لإعادة الاستخدام بواجهات واضحة | [Vercel Agent Skills](https://github.com/vercel-labs/agent-skills) |
| Web Design Guidelines | مراجعة الوصول والنماذج والتنقل والحركة | [Vercel Agent Skills](https://github.com/vercel-labs/agent-skills) |
| Playwright | تشغيل المتصفح وفحص التفاعل والتقاط صور الصفحات | [OpenAI Skills](https://github.com/openai/skills/tree/main/skills/.curated/playwright) |
| Security Best Practices | مراجعة أمن الكود عند طلبها | [OpenAI Skills](https://github.com/openai/skills/tree/main/skills/.curated/security-best-practices) |

مهارات Frontend Design وFrontend Design Premium وأدوات الصور والمتصفح كانت متاحة بالفعل في الجلسة.

## الأدوات المتصلة عبر MCP

تم تسجيل الأدوات التالية في إعداد Codex الشخصي، وتعمل عند تحميل الإعداد الجديد:

| الأداة | الوظيفة | الإعداد |
| --- | --- | --- |
| Motion | البحث في وثائق الحركة الرسمية | `https://mcp.motion.dev` |
| Context7 | جلب وثائق المكتبات والأمثلة حسب الإصدار | `@upstash/context7-mcp@4.3.0` |
| shadcn | استكشاف مكتبات المكونات ومكونات المشروع | `shadcn@4.21.4 mcp` |
| Playwright | فحص الموقع في متصفح منفصل | `@playwright/mcp@0.0.83 --headless --isolated` |

هذه أدوات MCP محلية/متصلة بـCodex، وليست إضافات تم تثبيتها من دليل إضافات الحساب. تم تثبيت إصدارات محددة للأدوات المحلية وضبط تشغيلها على Windows. أدوات CodeGraph الموجودة سابقًا محفوظة؛ المشروع الحالي ليس له فهرس `.codegraph`.

المصدر الرسمي للإعداد: [Codex MCP](https://learn.chatgpt.com/docs/extend/mcp?surface=cli)، [shadcn MCP](https://ui.shadcn.com/docs/mcp)، [Context7](https://github.com/upstash/context7)، [Playwright MCP](https://github.com/microsoft/playwright-mcp).

## المكتبات الموجودة بالفعل في المشروع

تم التأكد من تثبيت Motion 12.43.0 وGSAP 3.15.0 و`@gsap/react` 2.1.2 وTailwind 4.3.3 وRadix UI 1.7.0 وLucide React 0.468.0 وPlaywright 1.64.0. المشروع مجهز أيضًا بـReact Hook Form وZod وVitest وaxe-core وThree.js.

[Motion](https://motion.dev/docs/react-installation) هي المكتبة التي كانت تُعرف باسم Framer Motion، والاستيراد الحالي في React هو `motion/react`. تستخدم الحركة البسيطة CSS، وتناسب Motion تفاعلات React وانتقالات العناصر، وتناسب GSAP المشاهد ذات التوقيت المتسلسل والتحكم التفصيلي. يُختار المناسب لكل تأثير مع تجنب تشغيل مكتبتين على نفس خاصية العنصر.

## إضافات تحتاج خطوة من المستخدم

Figma متاح في دليل الإضافات، وتم اقتراحه لتبادل التصاميم وتنفيذها. لم يُؤكَّد تثبيته أو ربط الحساب أثناء إعداد هذه الأدوات. يلزم إكمال التثبيت والربط داخل التطبيق قبل استخدام ملفات Figma.

تم إعداد خادم Motion المجاني فقط. بعض قدرات Motion AI Kit تحتاج حسابًا أو اشتراك Motion+؛ وجود المهارة لا يفتح مصدر المكونات المدفوعة أو تدقيق MotionScore. [تفاصيل Motion الرسمية](https://motion.dev/docs/ai-kit-install).

Context7 يمكن أن يعمل دون مفتاح، ويوصي مزوده بمفتاح مجاني لزيادة حدود الاستخدام. [وثائق Context7](https://github.com/upstash/context7).

## استخدام الإعداد في هذا المشروع

1. ابدأ من `DESIGN.md` والهوية المعتمدة والخط العربي الحالي. تستخدم اقتراحات UI/UX Pro Max لتحسين التجربة ضمن هذه الهوية.
2. حافظ على RTL، ووضوح الخط، والتجاوب مع الهاتف، وحالات التركيز والأخطاء والتحميل.
3. استخدم المكونات الموجودة قبل إضافة مكونات جديدة. راجع وثائق shadcn وContext7 عند الحاجة إلى واجهات المكتبات.
4. صمّم الحركة لتوضيح التفاعل، واحترم إعداد تقليل الحركة وتكلفة الأداء.
5. افحص الصفحة في المتصفح، والتنقل بلوحة المفاتيح، والنماذج، وحدود الشاشة الصغيرة بعد تغييرات الواجهة.

مثال طلب:

> استخدم Frontend Design Premium وUI/UX Pro Max لتحسين الصفحة بتصميم Clean Creative مناسب لهوية مكتب المحاماة، مع Motion للحركة، وراجعها بـWeb Design Guidelines وPlaywright. حافظ على العربية وRTL والهوية المعتمدة.

## التفعيل والاسترجاع

نتيجة التحقق: نجح تحميل أدوات MCP الأربعة واستدعاء وظائفها. نجح البحث في وثائق Motion وReact عبر Context7، وقراءة مكتبة مكونات المشروع عبر shadcn، وفتح وإغلاق صفحة فارغة في متصفح Playwright منفصل. تم التأكد من وجود ملفات المهارات الثمانية ومراجعها المحلية، ونجح بحث تجريبي في قاعدة UI/UX Pro Max. هذه فحوص للإعداد نفسه، وليست مراجعة شاملة لصفحات الموقع.

المهارات ستكون متاحة من الرسالة التالية. أعد فتح Codex لتحميل أدوات MCP الجديدة إذا لم تظهر تلقائيًا.

نسخة احتياطية من الإعداد السابق: `C:\Users\Foxyd\.codex\config.toml.frontend-setup-20261012.bak`.

مصادر المهارات مثبتة على نسخ محددة: UI/UX Pro Max عند `67803eac81607188194aea9842a723b89326d90d`، وVercel عند `063bee94c3f4df8453406c830b0a7df0f2860278`، وMotion عند `d1c5c26f424adfd47c112d894e9d424b57338c7e`، وshadcn عند `02cad61166c4c20edbc8a3f71bd720eed4c1f49b`. مهارتا OpenAI جُلبتا من `main` أثناء الإعداد.

تحتوي بعض المهارات الأصلية على أمثلة لأوامر Bash أو مسارات خاصة بـClaude أو مجلد `.codex/skills`. على Windows تُكيّف الأوامر لـPowerShell وتُستخدم المسارات الفعلية داخل `C:\Users\Foxyd\.agents\skills`.
