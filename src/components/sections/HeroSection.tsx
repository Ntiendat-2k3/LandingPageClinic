"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, MapPin, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { messages } from "@/i18n";
import { SITE_CONTACT } from "@/config/site";

const HeroSection = () => {
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isCtaRevealed, setIsCtaRevealed] = useState(false);

  // Chỉ phát hiệu ứng khi người dùng cuộn đến vùng nút; bàn phím vẫn có thể mở nút qua focus.
  useEffect(() => {
    if (isCtaRevealed) return;

    const cta = ctaRef.current;
    if (!cta) return;

    const revealWhenInView = () => {
      const { top, bottom } = cta.getBoundingClientRect();
      if (top < window.innerHeight * 0.85 && bottom > window.innerHeight * 0.15) {
        setIsCtaRevealed(true);
      }
    };

    if (window.scrollY > 0) revealWhenInView();
    window.addEventListener("scroll", revealWhenInView, { passive: true });
    return () => window.removeEventListener("scroll", revealWhenInView);
  }, [isCtaRevealed]);

  return (
    <section className="relative flex min-h-[100svh] items-start overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-cyan-50 lg:items-center">
      {/* Nền trang trí */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -left-24 w-72 h-72 rounded-full bg-emerald-300/30 blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-cyan-300/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-blue-300/20 blur-3xl" />
      </div>

      <div className="container relative mx-auto overflow-x-clip px-4 pb-14 pt-24 sm:px-6 lg:px-8 lg:pb-16 lg:pt-28">
        <div className="grid grid-cols-1 items-center gap-x-12 gap-y-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-y-10">
          {/* Nội dung chính */}
          <div className="order-1 max-w-2xl">
            {/* Giữ tên phòng khám thành hai dòng riêng, dòng cuối chỉ có tên bác sĩ. */}
            <div>
              <h1 className="font-heading text-[25px] font-extrabold uppercase leading-[1.3] tracking-[-0.025em] sm:text-[30px] md:text-[34px] lg:text-[25px] xl:text-[31px] 2xl:text-[34px]">
                <span className="block text-gray-900 md:whitespace-nowrap">
                  {messages.hero.centerTitle}
                </span>
                <span className="block bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                  <span className="block">{messages.hero.clinicTitleLine1}</span>
                  <span className="block">{messages.hero.clinicTitleLine2}</span>
                </span>
              </h1>
            </div>

            <p className="mt-5 max-w-xl text-lg font-semibold leading-snug text-slate-800 sm:text-xl xl:text-2xl">
              {messages.hero.tagline}
            </p>
            <p className="mt-4 max-w-xl text-base leading-normal text-slate-700">
              {messages.hero.intro}
            </p>

            <div className="mt-6 h-px max-w-lg bg-gradient-to-r from-emerald-300 via-cyan-200 to-transparent" />

            {/* Danh sách lợi ích */}
            <div className="mt-5">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex w-6 h-6 rounded-full bg-emerald-100 items-center justify-center shrink-0">
                    <Users className="w-3.5 h-3.5 text-emerald-600" />
                  </span>
                  <span className="text-base leading-normal text-slate-700">
                    {messages.hero.benefits[0]}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex w-6 h-6 rounded-full bg-blue-100 items-center justify-center shrink-0">
                    <Shield className="w-3.5 h-3.5 text-blue-600" />
                  </span>
                  <span className="text-base leading-normal text-slate-700">
                    {messages.hero.benefits[1]}
                  </span>
                </li>
              </ul>
              <p className="mt-2 pl-9 text-xs italic text-slate-500 md:text-sm">
                {messages.hero.orthoKNote}
              </p>
            </div>
          </div>

          {/* Ảnh biển hiệu */}
          <div className="order-3 lg:order-2">
            <div className="relative mx-auto max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-[560px]">
              <div className="absolute -inset-1 rounded-[28px] bg-gradient-to-br from-emerald-400/50 via-cyan-400/50 to-blue-400/40 blur-md" />
              <div className="relative overflow-hidden rounded-[24px] bg-white shadow-xl shadow-emerald-950/10">
                <a href={SITE_CONTACT.mapsUrl} target="_blank" rel="noopener noreferrer" aria-label={messages.footer.openMaps} className="block focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-cyan-600">
                  <img
                    src="/images/clinic-sign.webp"
                    alt={messages.hero.imageAlt}
                    width="1200"
                    height="800"
                    className="aspect-[3/2] w-full object-cover object-center"
                  />
                </a>
                <a
                  href={SITE_CONTACT.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 px-4 py-4 text-sm font-bold leading-6 text-slate-800 transition-colors hover:text-cyan-700 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-cyan-600 sm:px-5 sm:text-base"
                >
                  <MapPin className="mt-0.5 size-5 shrink-0 text-cyan-600" aria-hidden="true" />
                  <span>{SITE_CONTACT.address}</span>
                </a>
              </div>
            </div>
          </div>
          <div
            ref={ctaRef}
            data-hero-cta={isCtaRevealed ? "visible" : "pending"}
            onFocusCapture={() => setIsCtaRevealed(true)}
            className="order-2 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:order-3 lg:col-span-2"
          >
            <Button
              asChild
              size="lg"
              className="hero-cta-attention h-auto min-h-14 whitespace-normal rounded-2xl px-7 py-3.5 text-center text-base font-semibold shadow-[0_8px_20px_rgba(16,185,129,0.3)] focus-visible:ring-4"
            >
              <a href="/#booking">
                <span>{messages.hero.ctaBook}</span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="hero-cta-attention hero-cta-attention-delayed h-auto min-h-14 whitespace-normal rounded-2xl border-emerald-600/30 bg-white px-7 py-3.5 text-center text-base font-semibold text-emerald-800 shadow-sm hover:bg-emerald-50"
            >
              <a href="/danh-gia-nguy-co-can-thi/">{messages.hero.ctaAssess}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
