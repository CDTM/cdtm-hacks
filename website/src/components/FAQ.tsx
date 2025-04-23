import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/constants/faq";

const FAQ = () => {
  return (
    <section className="bg-springWhite py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-springBlue mb-12">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="px-6 text-lg font-semibold text-springBlue text-left hover:bg-springBlue/5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 text-springText">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
