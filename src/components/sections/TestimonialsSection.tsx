import { Quote } from "lucide-react";
import { messages } from "@/i18n";

const customerImages = [
  "hai-linh.webp",
  "cus3.webp",
  "cus1.webp",
  "cus4.webp",
  "cus5.webp",
  "yen-nhi.webp",
  "van-phuc.webp",
  "cus6.webp",
] as const;

const TestimonialsSection = () => (
  <section id="testimonials" className="bg-cyan-50 py-12 lg:py-6">
    <div data-scroll-reveal className="container mx-auto px-2.5 sm:px-6 lg:px-8">
      <div className="mb-7 text-center lg:mb-5">
        <h2 className="font-space-grotesk text-2xl font-extrabold uppercase text-gray-900 sm:text-3xl lg:text-[32px]">
          {messages.testimonials.title}
        </h2>
        <p className="mt-1 text-base leading-normal text-slate-700 lg:text-sm">{messages.testimonials.description}</p>
        <div aria-hidden="true" className="mx-auto mt-2 h-px w-40 bg-emerald-700" />
      </div>

      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-4 lg:overflow-visible">
        {messages.testimonials.items.map((testimonial, index) => (
          <article key={testimonial.name} className="flex w-[88%] shrink-0 snap-start flex-col bg-slate-100 p-3 sm:w-[70%] lg:w-auto lg:p-2">
            <div className="relative flex-1 bg-white px-4 pb-10 pt-3 lg:px-3 lg:pb-7 lg:pt-2">
              <p className="text-base leading-normal text-slate-800 lg:text-sm">{testimonial.content}</p>
              <Quote aria-hidden="true" className="absolute bottom-2 right-3 size-7 fill-slate-500 text-slate-500 lg:size-6" />
            </div>
            <div className="mt-4 flex items-center gap-3 px-1 pb-1 lg:mt-2 lg:gap-2">
              <img
                src={`/images/customer/${customerImages[index]}`}
                alt=""
                width="56"
                height="56"
                loading="lazy"
                decoding="async"
                className="size-14 shrink-0 rounded-full object-cover lg:size-12"
              />
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-gray-900">{testimonial.name}</h3>
                <p className="text-xs text-slate-500">{testimonial.location}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-slate-600 lg:mt-4 lg:text-sm">{messages.testimonials.disclaimer}</p>
    </div>
  </section>
);

export default TestimonialsSection;
