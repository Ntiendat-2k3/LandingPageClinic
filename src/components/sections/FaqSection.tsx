import { messages } from "@/i18n";

const FAQSection = () => {
  const faqs = messages.faq.items;

  return (
    <section id="faq" className="bg-white py-10 md:py-14">
      <div data-scroll-reveal className="container mx-auto px-2.5 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-center font-space-grotesk text-[26px] font-extrabold uppercase text-gray-900 sm:text-[28px]">
          {messages.faq.title}
        </h2>

        <div className="grid gap-6 md:grid-cols-2 md:gap-10">
          {[0, 1].map((columnIndex) => (
            <div key={columnIndex} className="contents md:flex md:flex-col">
              {columnIndex === 1 && (
                <img
                  src="/images/faq1.jpg"
                  alt=""
                  width="2560"
                  height="1707"
                  loading="lazy"
                  decoding="async"
                  className="order-2 aspect-[10/7] w-full rounded-2xl object-cover md:order-none md:mb-5"
                />
              )}

              <div className={columnIndex === 0 ? "order-1 space-y-5 md:order-none" : "order-3 space-y-5 md:order-none"}>
                {faqs.slice(columnIndex * 2, columnIndex * 2 + 2).map((faq, index) => (
                  <article key={faq.question} className="border-b border-slate-200 pb-5 last:border-b-0 last:pb-0">
                    <div className="flex items-start gap-3">
                      <span aria-hidden="true" className="shrink-0 font-space-grotesk text-4xl font-extrabold leading-none text-emerald-700 md:text-[40px]">
                        {String(columnIndex * 2 + index + 1).padStart(2, "0")}.
                      </span>
                      <h3 className="pt-1 text-base font-bold leading-snug text-emerald-700">
                        {faq.question}
                      </h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
                  </article>
                ))}
              </div>

              {columnIndex === 0 && (
                <img
                  src="/images/faq2.jpg"
                  alt=""
                  width="2560"
                  height="1707"
                  loading="lazy"
                  decoding="async"
                  className="order-4 aspect-[10/7] w-full rounded-2xl object-cover md:order-none md:mt-5"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
