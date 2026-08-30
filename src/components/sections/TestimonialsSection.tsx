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
      <div data-scroll-reveal className="container mx-auto container-padding">
        {/* Heading */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-space-grotesk text-2xl md:text-4xl font-extrabold text-gray-900 mb-2 uppercase">
            {messages.testimonials.title}
          </h2>
          <p className="text-sm md:text-lg text-gray-600 max-w-3xl mx-auto">
            {messages.testimonials.description}
          </p>
        </div>

        {/* ===== Mobile: list kéo trượt + ReadMore ===== */}
        <div className="md:hidden -mx-4 px-4">
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
                    {t.name} — {t.age}
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

        {/* ===== Desktop: lưới 3 cột (hiển thị đầy đủ) ===== */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <article
              key={idx}
              className="relative bg-white rounded-2xl p-6 pt-12 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center"
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                <Avatar src={t.image} alt={t.name} size="w-20 h-20" />
              </div>

              <h3 className="font-semibold text-gray-900">
                {t.name} — {t.age}
              </h3>
              <div className="mt-1 mb-4">
                <Stars n={t.rating} />
              </div>

              <p className="text-gray-600 leading-relaxed italic">
                “{t.content}”
              </p>
            </article>
          ))}
        </div>

        {/* ===== CTA MOBILE ===== */}
        <div className="mt-12 md:hidden">
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
            <h3
              className="text-base font-bold text-gray-900 mb-2"
              style={{ textWrap: "balance" }}
            >
              {messages.testimonials.ctaTitle}
            </h3>
            <p className="text-[13px] text-gray-600 mb-4">
              {messages.testimonials.ctaDescription}
            </p>

            <a
              href="#booking"
              className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-full text-white font-extrabold text-sm bg-emerald-500 shadow-lg active:scale-[0.98] hover:bg-emerald-600 transition"
            >
              <span className="leading-tight text-left">
                {messages.testimonials.cta}
              </span>
              <span className="px-2 py-1 rounded-full bg-white/95 text-emerald-600 font-black ring-1 ring-emerald-200">
                {messages.common.offer}
              </span>
            </a>
          </div>
        </div>

        {/* ===== CTA DESKTOP ===== */}
        <div className="hidden md:block mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="font-space-grotesk text-2xl font-bold text-gray-900 mb-3">
              {messages.testimonials.ctaTitle}
            </h3>
            <p className="text-gray-600 mb-5 max-w-2xl mx-auto">
              {messages.testimonials.ctaDescription}
            </p>
            <a
              href="#booking"
              className="inline-flex items-center gap-3 bg-emerald-500 text-white px-10 py-4 rounded-full font-extrabold text-lg shadow-lg hover:shadow-xl hover:scale-105 hover:bg-emerald-600 transition"
            >
              {messages.testimonials.cta}{" "}
              <span className="px-3 py-1 rounded-full bg-white text-emerald-600 font-black">
                {messages.common.offer}
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
