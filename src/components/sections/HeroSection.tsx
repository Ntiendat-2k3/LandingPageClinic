"use client";

import {
  ArrowRight,
  Clock,
  Shield,
  Star,
  Users,
} from "lucide-react";
import { messages } from "@/i18n";

const HeroSection = () => {
  const scrollToContact = () => {
    const el = document.getElementById("booking");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[100svh] flex items-center bg-gradient-to-b from-emerald-50 to-cyan-50 overflow-hidden">
      {/* BG blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -left-24 w-72 h-72 rounded-full bg-emerald-300/30 blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-cyan-300/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-blue-300/20 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14 lg:py-20 relative overflow-x-clip">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left: Content */}
          <div className="order-2 lg:order-1">
            {/* 3 dòng tiêu đề */}
            <div className="space-y-1">
              <h1 className="font-space-grotesk text-[28px] md:text-[40px] font-extrabold leading-tight text-gray-900 uppercase lg:text-center">
                {messages.hero.clinic}
              </h1>
              <h2 className="font-space-grotesk text-[28px] md:text-[40px] font-extrabold leading-tight uppercase lg:text-center">
                <span className="bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                  {messages.hero.specialty}
                </span>
              </h2>
              <div className="font-space-grotesk text-[28px] md:text-[40px] font-extrabold leading-tight text-gray-900 uppercase lg:text-center">
                {messages.hero.doctor}
              </div>
            </div>

            {/* Tagline */}
            <p className="mt-3 text-base md:text-lg text-gray-700 lg:text-center">
              {messages.hero.tagline}
            </p>

            <div className="w-full h-0.5 bg-gray-200 mt-4"></div>

            {/* Khẩu hiệu + danh sách */}
            <div className="mt-4">
              <div className="text-[15px] md:text-lg font-extrabold tracking-wide text-emerald-700">
                {messages.hero.headline}
              </div>

              <ul className="mt-3 space-y-2">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex w-6 h-6 rounded-full bg-cyan-100 items-center justify-center">
                    <Star className="w-3.5 h-3.5 text-cyan-600" />
                  </span>
                  <span className="text-[15px] md:text-base text-gray-700">
                    {messages.hero.benefits[0]}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex w-6 h-6 rounded-full bg-emerald-100 items-center justify-center">
                    <Users className="w-3.5 h-3.5 text-emerald-600" />
                  </span>
                  <span className="text-[15px] md:text-base text-gray-700">
                    {messages.hero.benefits[1]}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex w-6 h-6 rounded-full bg-blue-100 items-center justify-center">
                    <Shield className="w-3.5 h-3.5 text-blue-600" />
                  </span>
                  <span className="text-[15px] md:text-base text-gray-700">
                    {messages.hero.benefits[2]}
                  </span>
                </li>
              </ul>
            </div>

            {/* Stats — thu nhỏ trên mobile */}
            <div className="mt-6 lg:mt-8">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:gap-6">
                {[
                  {
                    icon: (
                      <Users className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600" />
                    ),
                    val: messages.hero.stats[0].value,
                    txt: messages.hero.stats[0].label,
                  },
                  {
                    icon: (
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                    ),
                    val: messages.hero.stats[1].value,
                    txt: messages.hero.stats[1].label,
                  },
                  {
                    icon: (
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    ),
                    val: messages.hero.stats[2].value,
                    txt: messages.hero.stats[2].label,
                  },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="bg-white/85 backdrop-blur rounded-xl px-3 py-2 sm:px-4 sm:py-3 lg:p-5 ring-1 ring-black/5 shadow"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
                        {s.icon}
                      </div>
                      <div>
                        <div className="font-space-grotesk text-xl sm:text-2xl font-bold text-gray-900">
                          {s.val}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600">
                          {s.txt}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6 text-center lg:mt-8">
              <button
                onClick={scrollToContact}
                className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-white font-semibold bg-gradient-to-r from-cyan-600 to-emerald-600 shadow-[0_12px_30px_rgba(16,185,129,0.35)] active:scale-[.99] lg:hover:cursor-pointer"
              >
                {messages.hero.cta}
                <span className="ml-1 inline-flex items-center rounded-xl bg-white/90 px-1 py-0.5 text-2xl text-emerald-700 font-extrabold">
                  {messages.common.offer}
                </span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right: Image */}
          <div className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-[560px]">
              <div className="absolute -inset-1 rounded-[28px] bg-gradient-to-br from-emerald-400/50 via-cyan-400/50 to-blue-400/40 blur-md" />
              {/* Mobile & Desktop: luôn thẳng */}
              <div className="relative rounded-[24px] overflow-hidden bg-white shadow-2xl rotate-0 lg:rotate-0">
                {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                    CHANGED: bỏ lg:rotate-2 -> lg:rotate-0 để ảnh không nghiêng
                */}
                <img
                  src="/images/section1.jpg"
                  alt={messages.hero.imageAlt}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -left-3 -top-3 bg-white rounded-xl shadow p-2 flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-semibold text-gray-800">
                  {messages.hero.assurance}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
