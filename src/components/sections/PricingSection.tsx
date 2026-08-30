"use client";

import React from "react";
import { messages } from "@/i18n";

type Treatment = {
  name: string;
  image: string;
  effectiveness?: string[];
  description?: string;
  tag?: string;
  tone?: "emerald" | "teal" | "purple" | "lime";
};

const treatments: Treatment[] = [
  {
    ...messages.pricing.treatments[0],
    image: "/images/ksct1.jpg",
    tone: "emerald",
  },
  {
    ...messages.pricing.treatments[1],
    image: "/images/ksct2.jpg",
    tone: "teal",
  },
  {
    ...messages.pricing.treatments[2],
    image: "/images/ksct3.jpg",
    tone: "purple",
  },
  {
    ...messages.pricing.treatments[3],
    image: "/images/ksct4.jpg",
    tone: "lime",
  },
];

const tone = {
  emerald: { chip: "text-emerald-700 bg-emerald-50", dot: "bg-emerald-400" },
  teal: { chip: "text-teal-700 bg-teal-50", dot: "bg-teal-400" },
  purple: { chip: "text-purple-700 bg-purple-50", dot: "bg-purple-400" },
  lime: { chip: "text-lime-700 bg-lime-50", dot: "bg-lime-400" },
};

const Check = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M20 7L10 17l-6-6"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PricingSection: React.FC = () => {
  return (
    <section
      id="pricing"
      className="relative py-12 md:py-16 xl:py-20 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(236,253,245,1) 0%, rgba(240,249,255,1) 100%)",
      }}
    >
      {/* décor */}
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl bg-emerald-200/40" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full blur-3xl bg-purple-200/30" />
      </div>

      <div data-scroll-reveal className="container mx-auto px-4 relative">
        {/* Title + TAG */}
        <div className="text-center mb-8 md:mb-12">
          {/* tag “KIỂM SOÁT CẬN THỊ” – to hơn, cân đối */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 text-white text-base md:text-lg font-semibold tracking-wide shadow-md">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-white/90" />
            {messages.pricing.badge}
          </div>

          <h2 className="mt-4 text-2xl md:text-4xl xl:text-5xl font-extrabold leading-tight text-gray-900">
            {messages.pricing.titleLineOne}
            <br className="hidden sm:block" />
            {messages.pricing.titleLineTwo}
          </h2>

          <p className="mt-3 text-sm md:text-base text-gray-600 max-w-3xl mx-auto">
            {messages.pricing.description}
          </p>
        </div>

        {/* Grid responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-7 max-w-7xl mx-auto">
          {treatments.map((t, i) => {
            const theme = tone[t.tone || "emerald"];
            return (
              <div
                key={i}
                className={
                  "group relative rounded-3xl border border-white/70 bg-white/80 backdrop-blur-xl " +
                  "shadow-[0_10px_28px_rgba(16,185,129,0.10)] " +
                  "md:hover:shadow-[0_18px_40px_rgba(16,185,129,0.16)] md:transition-all md:duration-500 " +
                  (i % 2 !== 0 ? "md:translate-y-1.5" : "")
                }
              >
                {/* Tag nhỏ trên từng card (nếu có) */}
                {t.tag && (
                  <div
                    className={`absolute -top-3 left-4 px-3 py-1 rounded-full text-[11px] md:text-xs font-semibold ${theme.chip} shadow-sm border border-white/70`}
                  >
                    {t.tag}
                  </div>
                )}

                <div className="p-5 md:p-6">
                  {/* Ảnh – to hơn (giảm padding) */}
                  <div className="relative w-full rounded-2xl overflow-hidden border border-white/70 bg-gradient-to-br from-white to-emerald-50">
                    <div className="aspect-[4/3] md:aspect-[5/3] w-full flex items-center justify-center">
                      <img
                        src={t.image || "/placeholder.svg"}
                        alt={t.name}
                        className="max-h-full max-w-full object-contain p-2 md:p-3 md:transition-transform md:duration-500 md:group-hover:scale-[1.04]"
                        loading="lazy"
                      />
                    </div>
                    <span
                      className={`absolute bottom-3 right-3 h-2 w-2 rounded-full ${theme.dot} md:animate-pulse`}
                    />
                  </div>

                  {/* Tên – to hơn */}
                  <h3 className="mt-4 text-lg md:text-xl font-bold text-gray-900 leading-snug">
                    {t.name}
                  </h3>

                  {/* Nội dung – to hơn */}
                  <div className="mt-2 md:mt-3 space-y-2">
                    {t.effectiveness ? (
                      t.effectiveness.map((line, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-[14px] md:text-base text-gray-700"
                        >
                          <span className="mt-0.5 text-emerald-500">
                            <Check className="h-4 w-4" />
                          </span>
                          <span className="leading-6">{line}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-[14px] md:text-base text-gray-700">
                        {t.description}
                      </p>
                    )}
                  </div>

                  {/* BỎ dải phần trăm/ % dưới cùng */}
                </div>

                {/* ring hover */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-300 to-purple-400 opacity-0 md:group-hover:opacity-20 md:transition-opacity md:duration-500" />
              </div>
            );
          })}
        </div>

        {/* footnote – câu mới */}
        <p className="mt-8 text-center text-[11px] md:text-xs text-gray-500">
          {messages.pricing.footnote}
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
