"use client";

import {
  Eye,
  Glasses,
  Zap,
  Baby,
  Stethoscope,
  Shield,
  Activity,
  Target,
} from "lucide-react";
import { useScrollToSection } from "../../hooks/useScrollToSection";

const ServicesSection = () => {
  const scrollToSection = useScrollToSection();

  const servicePackages = [
    {
      icon: Eye,
      title: "Gói khám tổng quan",
      position: "top-left",
      delay: "0s",
    },
    {
      icon: Target,
      title: "Atropine nồng độ thấp 0.01%, 0.025% và 0.05%",
      position: "top-right",
      delay: "0.5s",
    },
    {
      icon: Activity,
      title: "Gói khám kiểm soát tật khúc xạ",
      position: "middle-left",
      delay: "1s",
    },
    {
      icon: Glasses,
      title: "Tròng kính kiểm soát cận thị Myopcare, Stellest",
      position: "middle-right",
      delay: "1.5s",
    },
    {
      icon: Shield,
      title: "Gói khám kính áp tròng ban đêm Ortho-K",
      position: "bottom-left",
      delay: "2s",
    },
    {
      icon: Zap,
      title: "Kính áp tròng ban đêm Ortho-K",
      position: "bottom-right",
      delay: "2.5s",
    },
    {
      icon: Stethoscope,
      title: "Đo trục nhãn cầu",
      position: "top-center-left",
      delay: "3s",
    },
    {
      icon: Baby,
      title: "Lăng kính & tập luyện điều chỉnh lác/phục hồi TL",
      position: "top-center-right",
      delay: "3.5s",
    },
  ];

  const irisPalette = [
    "from-emerald-200 via-teal-200 to-sky-200",
    "from-cyan-200 via-sky-200 to-indigo-200",
    "from-teal-200 via-emerald-200 to-lime-200",
    "from-sky-200 via-cyan-200 to-emerald-200",
  ];

  return (
    <section
      id="services"
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "rgb(236, 252, 247)" }}
    >
      {/* BG decor desktop */}
      <div className="absolute inset-0 opacity-5 hidden md:block">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full border-2 border-emerald-300" />
        <div className="absolute top-20 right-20 w-24 h-24 rounded-full border-2 border-emerald-300" />
        <div className="absolute bottom-20 left-20 w-28 h-28 rounded-full border-2 border-emerald-300" />
        <div className="absolute bottom-10 right-10 w-20 h-20 rounded-full border-2 border-emerald-300" />
      </div>

      <div className="container mx-auto container-padding relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20 relative z-30">
          <div className="mb-8 md:mb-10">
            <h2 className="font-space-grotesk text-2xl md:text-4xl font-bold text-black mb-3 md:mb-5">
              CHƯƠNG TRÌNH ĐỘC QUYỀN, DUY NHẤT TẠI HÀ NỘI
            </h2>
            <p className="text-md lg:text-lg md:text-2xl text-black font-semibold">
              “ĐẢM BẢO KIỂM SOÁT TIẾN TRIỂN CẬN THỊ”
            </p>
            <p className="text-md lg:text-base md:text-xl text-black mt-2 md:mt-3">
              XOÁ TAN NỖI LO TĂNG ĐỘ CẬN
            </p>
          </div>
        </div>

        {/* ============== MOBILE ============== */}
        <div className="md:hidden relative">
          <div className="pointer-events-none absolute -top-10 -left-12 w-40 h-40 bg-emerald-200/50 blur-3xl rounded-full" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 w-44 h-44 bg-sky-200/50 blur-3xl rounded-full" />

          <div className="mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/85 backdrop-blur border border-white/70 shadow-sm">
              <span className="text-[13px]">👁️</span>
              <span className="text-[12px] font-semibold text-emerald-700">
                Eye-care Services
              </span>
              <span className="text-[13px]">💧</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {servicePackages.map((pkg, i) => {
              const Icon = pkg.icon;
              const iris = irisPalette[i % irisPalette.length];
              return (
                <button
                  key={i}
                  onClick={() => scrollToSection("booking")}
                  aria-label={pkg.title}
                  className="group relative active:scale-[0.98] transition"
                >
                  <div className="rounded-3xl p-[2px] bg-gradient-to-br from-emerald-200 via-sky-200 to-teal-200 shadow-[0_10px_24px_rgba(16,185,129,0.08)]">
                    <div className="relative rounded-3xl bg-white/95 backdrop-blur-xl ring-1 ring-white/70 p-3 overflow-hidden">
                      {/* icon */}
                      <div className="mb-2">
                        <div className="relative w-12 h-12 mx-auto">
                          <div
                            className={`absolute inset-0 rounded-full bg-gradient-to-br ${iris}`}
                          />
                          <div className="absolute inset-2 grid place-items-center">
                            <div className="w-9 h-9 rounded-full bg-white shadow-inner grid place-items-center">
                              <Icon className="w-4 h-4 text-emerald-700" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* title */}
                      <p className="text-[13px] font-bold text-gray-900 leading-snug tracking-tight text-center line-clamp-3">
                        {pkg.title}
                      </p>

                      <div className="mx-auto mt-2 h-1.5 w-16 rounded-full bg-gradient-to-r from-emerald-200 via-teal-200 to-sky-200" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => scrollToSection("booking")}
              className="relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-base text-white bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-lg active:scale-[0.98]"
            >
              Đăng kí miễn phí nhận ưu đãi 50%
              <span className="absolute inset-0 rounded-full ring-4 ring-white/20 pointer-events-none" />
            </button>
          </div>
        </div>

        {/* ============== DESKTOP ============== */}
        <div className="hidden md:block">
          {/* Tăng padding-top để tạo khoảng cách an toàn với tiêu đề */}
          <div className="relative max-w-6xl mx-auto pt-64 lg:pt-72 pb-24 mt-4">
            {/* Packages quanh viền */}
            <div className="absolute inset-0 z-10">
              {servicePackages.map((pkg, index) => {
                const Icon = pkg.icon;
                let positionClasses = "";
                switch (pkg.position) {
                  case "top-left":
                    positionClasses =
                      "top-16 left-0 -translate-x-1/2 -translate-y-1/2";
                    break;
                  case "top-right":
                    positionClasses =
                      "top-16 right-0 translate-x-1/2 -translate-y-1/2";
                    break;
                  case "top-center-left":
                    positionClasses =
                      "top-16 left-1/3 -translate-x-1/2 -translate-y-1/2";
                    break;
                  case "top-center-right":
                    positionClasses =
                      "top-16 right-1/3 translate-x-1/2 -translate-y-1/2";
                    break;
                  case "middle-left":
                    positionClasses =
                      "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2";
                    break;
                  case "middle-right":
                    positionClasses =
                      "top-1/2 right-0 translate-x-1/2 -translate-y-1/2";
                    break;
                  case "bottom-left":
                    positionClasses =
                      "bottom-0 left-0 -translate-x-1/2 translate-y-1/2";
                    break;
                  case "bottom-right":
                    positionClasses =
                      "bottom-0 right-0 translate-x-1/2 translate-y-1/2";
                    break;
                }

                return (
                  <div
                    key={index}
                    className={`absolute ${positionClasses} w-56 h-56 bg-white/95 backdrop-blur rounded-full shadow-xl ring-1 ring-black/5 border-3 border-emerald-100 flex flex-col items-center justify-center px-5 text-center hover:scale-[1.04] transition-transform duration-300 cursor-pointer`}
                    style={{ animationDelay: pkg.delay }}
                    onClick={() => scrollToSection("booking")}
                  >
                    <div className="w-9 h-9 bg-gradient-to-br from-emerald-300 to-emerald-400 rounded-full flex items-center justify-center mb-2">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-base font-bold text-gray-900 leading-snug max-w-[180px]">
                      {pkg.title}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Ảnh trung tâm */}
            <div className="relative z-20 flex items-center justify-center">
              <button
                onClick={() => scrollToSection("booking")}
                className="group relative"
                aria-label="Đặt lịch ngay"
              >
                <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-emerald-300/40 via-cyan-300/40 to-sky-300/40 blur-2xl opacity-70 group-hover:opacity-90 transition" />
                <div className="absolute -inset-3 rounded-full border-2 border-dashed border-emerald-300/60" />
                <div className="relative w-[360px] lg:w-[420px] xl:w-[480px] aspect-square rounded-full overflow-hidden ring-8 ring-white shadow-[0_30px_80px_rgba(16,185,129,0.25)] rotate-2 group-hover:rotate-0 transition duration-500">
                  <img
                    src="/images/eye-examination.png"
                    alt="Eye clinic lens"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/10 mix-blend-overlay" />
                </div>
                <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-sm font-semibold text-emerald-700 bg-white/90 px-3 py-1 rounded-full shadow">
                  Nhấn để đặt lịch
                </span>
              </button>
            </div>
          </div>

          <div className="text-center mt-2">
            <div className="text-center mt-10">
              <a
                href="#booking"
                className="inline-flex items-center gap-3 bg-emerald-500 text-white px-10 py-4 rounded-full font-extrabold text-lg shadow-lg hover:shadow-xl hover:scale-105 hover:bg-emerald-600 transition"
              >
                Đăng kí miễn phí nhận ưu đãi{" "}
                <span className="px-3 py-1 rounded-full bg-white text-emerald-600 font-black">
                  50%
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
