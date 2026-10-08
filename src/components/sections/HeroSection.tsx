"use client";

import { ArrowRight, Shield, Users } from "lucide-react";
import { messages } from "@/i18n";
import { SITE_CONTACT } from "@/config/site";

const HeroSection = () => {
  const scrollToContact = () => {
    const el = document.getElementById("booking");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToRiskAssessment = () => {
    const el = document.getElementById("risk-assessment");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/danh-gia-nguy-co-can-thi/";
    }
  };

  return (
    <section className="relative min-h-[100svh] flex items-center bg-gradient-to-b from-emerald-50 to-cyan-50 overflow-hidden">
      {/* Nền trang trí */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -left-24 w-72 h-72 rounded-full bg-emerald-300/30 blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-cyan-300/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-blue-300/20 blur-3xl" />
      </div>

      <div className="container mx-auto px-2.5 sm:px-6 lg:px-8 pt-6 pb-12 lg:py-20 relative overflow-x-clip">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-10 lg:gap-12 items-center">
          {/* Nội dung chính */}
          <div className="order-2 lg:order-1">
            {/* Giữ tên trung tâm trên một dòng từ màn hình vừa; tên phòng khám chiếm hai dòng. */}
            <div className="space-y-1">
              <h1 className="font-space-grotesk text-[26px] sm:text-[30px] md:text-[32px] lg:text-[24px] xl:text-[30px] font-extrabold leading-tight tracking-[-0.025em] uppercase lg:text-center">
                <span className="block text-gray-900 md:whitespace-nowrap">
                  {messages.hero.centerTitle}
                </span>
                <span className="block bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                  <span className="block">{messages.hero.clinicTitleLine1}</span>
                  <span className="block">{messages.hero.clinicTitleLine2}</span>
                </span>
              </h1>
            </div>

            {/* Tagline -> tiêu đề H2 */}
            <h2 className="mt-3 text-base md:text-xl font-medium text-gray-700 lg:text-center">
              {messages.hero.tagline}
            </h2>

            <div className="w-full h-0.5 bg-gray-200 mt-4"></div>

            {/* Danh sách lợi ích */}
            <div className="mt-4">
              <ul className="mt-3 space-y-2.5">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex w-6 h-6 rounded-full bg-emerald-100 items-center justify-center shrink-0">
                    <Users className="w-3.5 h-3.5 text-emerald-600" />
                  </span>
                  <span className="text-[15px] md:text-base text-gray-700">
                    {messages.hero.benefits[0]}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex w-6 h-6 rounded-full bg-blue-100 items-center justify-center shrink-0">
                    <Shield className="w-3.5 h-3.5 text-blue-600" />
                  </span>
                  <span className="text-[15px] md:text-base text-gray-700">
                    {messages.hero.benefits[1]}
                  </span>
                </li>
              </ul>
              <p className="mt-2 text-xs md:text-sm text-gray-500 italic pl-9">
                {messages.hero.orthoKNote}
              </p>
            </div>

            <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <button
                type="button"
                onClick={scrollToContact}
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-white font-semibold bg-gradient-to-r from-cyan-600 to-emerald-600 shadow-[0_8px_20px_rgba(16,185,129,0.3)] hover:shadow-lg transition-all active:scale-[.99] cursor-pointer text-base"
              >
                <span>{messages.hero.ctaBook}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={scrollToRiskAssessment}
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-emerald-800 font-semibold bg-white ring-1 ring-emerald-600/30 hover:bg-emerald-50/80 shadow-sm transition-all active:scale-[.99] cursor-pointer text-base"
              >
                <span>{messages.hero.ctaAssess}</span>
              </button>
            </div>
          </div>

          {/* Ảnh biển hiệu */}
          <div className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-[560px]">
              <div className="absolute -inset-1 rounded-[28px] bg-gradient-to-br from-emerald-400/50 via-cyan-400/50 to-blue-400/40 blur-md" />
              <div className="relative rounded-[24px] overflow-hidden bg-white shadow-2xl rotate-0 lg:rotate-0">
                <a href={SITE_CONTACT.mapsUrl} target="_blank" rel="noopener noreferrer" aria-label={messages.footer.openMaps}>
                  <img
                    src="/images/clinic-sign.webp"
                    alt={messages.hero.imageAlt}
                    width="1200"
                    height="800"
                    fetchPriority="high"
                    className="w-full aspect-[3/2] object-cover object-center"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
