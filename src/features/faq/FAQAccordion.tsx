import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/data/faq";
export function FAQ({ limit = faqs.length }: { limit?: number }) {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="question-0"
      className="border-t border-border"
    >
      {faqs.slice(0, limit).map((faq, index) => (
        <AccordionItem
          key={faq.q}
          value={"question-" + index}
          className="border-border"
          data-reveal
        >
          <AccordionTrigger className="py-6 text-start text-base font-medium leading-7 hover:no-underline md:text-lg">
            {faq.q}
          </AccordionTrigger>
          <AccordionContent className="pb-6 text-sm leading-8 text-muted-foreground">
            {faq.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
