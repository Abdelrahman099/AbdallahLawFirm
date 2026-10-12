import { ConsultationBand } from "@/components/shared/ConsultationBand";
import { PageIntro } from "@/components/shared/PageIntro";
import { process } from "@/data/process";

export default function ApproachPage() {
  return (
    <>
      <PageIntro
        tag="كيف نبدأ؟"
        title="نرتّب الخطوات. قبل أن نبدأ العمل."
        text="رحلة واضحة من فهم احتياجك إلى تحديد نطاق الخدمة والاتفاق على الخطوة التالية."
      />
      <section className="site-container py-14 md:py-20">
        <div className="grid gap-8 md:grid-cols-3">
          {process.map((p) => (
            <div key={p.n} className="border-t border-border pt-7" data-reveal>
              <span className="font-serif text-4xl text-[#886239]" dir="ltr">
                {p.n}
              </span>
              <h2 className="my-4 text-2xl">{p.title}</h2>
              <p className="text-base text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 grid gap-8 border-t border-border pt-10 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-3xl">نطاق واضح للخدمة.</h2>
            <p className="text-muted-foreground">
              بعد فهم الموضوع، يناقش المكتب معك طبيعة العمل وما يدخل ضمنه،
              والأتعاب وطريقة التواصل، قبل الاتفاق على التكليف.
            </p>
          </div>
          <div>
            <h2 className="mb-4 text-3xl">الاستشارة بداية للتقييم.</h2>
            <p className="text-muted-foreground">
              طلب الموعد لا يُعد توكيلًا أو قبولًا تلقائيًا للتمثيل. يتحدد نطاق
              التعامل بعد المراجعة والاتفاق، ولا يتضمن ضمان نتيجة.
            </p>
          </div>
        </div>
      </section>
      <ConsultationBand />
    </>
  );
}
