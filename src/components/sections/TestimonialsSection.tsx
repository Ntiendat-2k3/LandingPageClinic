"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { messages } from "@/i18n";

type Testimonial = {
  name: string;
  age: string;
  rating: number;
  content: string;
  image: string;
};

const Avatar = ({
  src,
  alt,
  size = "w-20 h-20",
}: {
  src: string;
  alt: string;
  size?: string;
}) => (
  <div
    className={`${size} rounded-full overflow-hidden ring-4 ring-white shadow-md shrink-0`}
  >
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="w-full h-full object-cover"
    />
  </div>
);

const Stars = ({ n = 5 }: { n?: number }) => (
  <div className="flex items-center justify-center gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < n ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ))}
  </div>
);

/** ReadMore chỉ dùng cho mobile */
const ReadMore = ({ text, lines = 5 }: { text: string; lines?: 3 | 4 | 5 }) => {
  const [open, setOpen] = useState(false);
  const clampClass =
    lines === 3
      ? "line-clamp-3"
      : lines === 4
      ? "line-clamp-4"
      : "line-clamp-5";

  return (
    <div className="mt-3 relative text-center">
      <p
        className={`text-[13.5px] text-gray-700 leading-relaxed italic ${
          open ? "" : clampClass
        }`}
      >
        “{text}”
      </p>

      {/* Fade đáy khi chưa mở */}
      {!open && (
        <div className="pointer-events-none absolute -bottom-1 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent" />
      )}

      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="mt-2 inline-flex items-center justify-center px-3 py-1.5 rounded-full
                   text-emerald-700 font-semibold text-xs bg-emerald-50 hover:bg-emerald-100
                   ring-1 ring-emerald-200 active:scale-[0.98] transition"
      >
        {open ? messages.common.collapse : messages.common.expand}
      </button>
    </div>
  );
};

const TestimonialsSection = () => {
  const customerImages = ["cus2.jpg", "cus3.jpg", "cus1.jpg", "cus4.jpg", "cus5.jpg", "cus6.jpg"];
  const testimonials: Testimonial[] = messages.testimonials.items.map(
    (testimonial, index) => ({
      ...testimonial,
      rating: 5,
      image: `/images/customer/${customerImages[index] ?? ""}`,
    })
  );

  return (
    <section id="testimonials" className="section-padding bg-white">
      <div data-scroll-reveal className="container mx-auto px-2.5 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="font-space-grotesk text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2 uppercase">
            {messages.testimonials.title}
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            {messages.testimonials.description}
          </p>
        </div>

        {/* ===== Mobile: list kéo trượt + ReadMore ===== */}
        <div className="md:hidden -mx-2.5 px-2.5">
          <div className="flex gap-4 overflow-x-auto overflow-y-visible snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {testimonials.map((t, idx) => (
              <article
                key={idx}
                className="snap-center basis-[88%] shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm relative pt-16"
              >
                {/* Avatar: mobile ở trong card; md+ nổi nửa ra ngoài */}
                <div className="absolute top-0 md:-top-8 left-1/2 -translate-x-1/2 z-20">
                  <Avatar src={t.image} alt={t.name} size="w-16 h-16" />
                </div>

                <div className="px-4 pb-4 pt-2 text-center">
                  <div className="font-semibold text-gray-900 text-[14.5px]">
                    {t.name}{t.age ? ` — ${t.age}` : ""}
                  </div>
                  <div className="mt-1">
                    <Stars n={t.rating} />
                  </div>

                  <ReadMore text={t.content} lines={5} />
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ===== Desktop: lưới 3 cột với khoảng cách hàng rộng thoáng và chiều ngang thu gọn ===== */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-x-6 lg:gap-x-7 gap-y-16 lg:gap-y-20 pt-4">
          {testimonials.map((t, idx) => (
            <article
              key={idx}
              className="relative bg-white rounded-2xl p-6 pt-12 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100/90 text-center flex flex-col"
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                <Avatar src={t.image} alt={t.name} size="w-20 h-20" />
              </div>

              <h3 className="font-semibold text-gray-900 text-[15.5px]">
                {t.name}{t.age ? ` — ${t.age}` : ""}
              </h3>
              <div className="mt-1.5 mb-3.5">
                <Stars n={t.rating} />
              </div>

              <p className="text-gray-600 leading-relaxed italic text-[13.5px] lg:text-[14px]">
                “{t.content}”
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
