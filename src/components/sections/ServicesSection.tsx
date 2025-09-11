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
  type LucideIcon,
} from "lucide-react";
import { useScrollToSection } from "../../hooks/useScrollToSection";

/* ==== Badge icon luôn tròn, không bị méo ==== */
const IconBadge = ({
  Icon,
  gradient,
}: {
  Icon: LucideIcon;
  gradient: string;
}) => (
  <div
    className={`relative flex-none shrink-0 aspect-square w-12 h-12 min-w-12 min-h-12
                rounded-full p-[2px] bg-gradient-to-br ${gradient}`}
  >
    <div className="w-full h-full rounded-full bg-white grid place-items-center ring-1 ring-black/5">
      <div className="w-8 h-8 min-w-8 min-h-8 rounded-full bg-white shadow-inner grid place-items-center">
        <Icon className="w-4 h-4 text-emerald-700" strokeWidth={2.25} />
      </div>
    </div>
  </div>
);

const irisPalette = [
  "from-emerald-200 via-teal-200 to-sky-200",
  "from-cyan-200 via-sky-200 to-indigo-200",
  "from-teal-200 via-emerald-200 to-lime-200",
  "from-sky-200 via-cyan-200 to-emerald-200",
];

const ServicesSection = () => {
  const scrollToSection = useScrollToSection();

  const servicePackages = [
    { icon: Eye, title: "Gói khám tổng quan" },
    { icon: Target, title: "Atropine nồng độ thấp 0.01%, 0.025% và 0.05%" },
    { icon: Activity, title: "Gói khám kiểm soát tật khúc xạ" },
    { icon: Glasses, title: "Tròng kính kiểm soát cận thị Myopcare, Stellest" },
    { icon: Shield, title: "Gói khám kính áp tròng ban đêm Ortho-K" },
    { icon: Zap, title: "Kính áp tròng ban đêm Ortho-K" },
    { icon: Stethoscope, title: "Đo trục nhãn cầu" },
    { icon: Baby, title: "Lăng kính & tập luyện điều chỉnh lác/phục hồi TL" },
  ];

  // Hàng trên: 3 item có "Gói khám", Hàng dưới: 5 item còn lại
  const isGoiKham = (t: string) => /gói khám/i.test(t);
  const topPackages = servicePackages.filter((p) => isGoiKham(p.title));
  const bottomPackages = servicePackages.filter((p) => !isGoiKham(p.title));

  // Card UI dùng chung — ĐÃ BỎ NGHIÊNG
  const Card = ({
    Icon,
    title,
    iris,
  }: {
    Icon: LucideIcon;
    title: string;
    iris: string;
    i: number;
  }) => {
    return (
      <button
        onClick={() => scrollToSection("booking")}
        className={`group relative transform-gpu transition duration-300`}
      >
        <div className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 blur-md transition bg-gradient-to-tr from-emerald-300/45 via-cyan-300/35 to-sky-300/45" />
        <div className="relative rounded-3xl bg-white/90 backdrop-blur-md ring-1 ring-emerald-200/60 hover:ring-emerald-400 shadow-lg hover:shadow-xl px-5 py-6 text-left">
          <div className="flex items-center gap-4">
            <IconBadge Icon={Icon} gradient={iris} />
            <h3 className="font-semibold text-gray-900 text-[15px] leading-snug">
              {title}
            </h3>
          </div>
          <div className="mt-4 h-[6px] rounded-full bg-gradient-to-r from-emerald-200 via-teal-200 to-sky-200 overflow-hidden">
            <span className="block h-full w-1/3 bg-white/60 animate-[slide_2.8s_ease-in-out_infinite]" />
          </div>
          <div className="pointer-events-none absolute left-5 top-5 w-8 h-8 rounded-full bg-emerald-400/10 blur" />
          <div className="pointer-events-none absolute right-6 -bottom-3 w-16 h-16 rounded-full bg-sky-400/10 blur" />
        </div>
      </button>
    );
  };

  return (
    <section
      id="services"
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "rgb(236, 252, 247)" }}
    >
      {/* BG ảnh mờ (desktop) */}
      <div className="absolute inset-0 -z-10 hidden md:block">
        <img
          src="/images/section3.jpg"
          alt=""
          aria-hidden
          className="w-full h-full object-cover opacity-30 blur-xl scale-110"
        />
        <div className="absolute inset-0 bg-white/45" />
      </div>

      {/* decor nhẹ */}
      <div className="absolute inset-0 opacity-5 hidden md:block">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full border-2 border-emerald-300" />
        <div className="absolute top-20 right-20 w-24 h-24 rounded-full border-2 border-emerald-300" />
        <div className="absolute bottom-20 left-20 w-28 h-28 rounded-full border-2 border-emerald-300" />
        <div className="absolute bottom-10 right-10 w-20 h-20 rounded-full border-2 border-emerald-300" />
      </div>

      <div className="container mx-auto container-padding relative z-10">
        {/* Header */}
        <div className="text-center mb-8 md:mb-9">
          <h2 className="font-space-grotesk text-2xl md:text-4xl font-extrabold text-black mb-2">
            CHƯƠNG TRÌNH ĐỘC QUYỀN, DUY NHẤT TẠI HÀ NỘI
          </h2>
          <p className="inline-block rounded-xl px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold text-[15px] md:text-xl shadow">
            “ĐẢM BẢO KIỂM SOÁT TIẾN TRIỂN CẬN THỊ”
          </p>
          <p className="text-sm md:text-lg text-black mt-2 font-bold">
            XOÁ TAN NỖI LO TĂNG ĐỘ CẬN
          </p>
        </div>

        {/* MOBILE (2 cột) */}
        <div className="md:hidden relative">
          <div className="pointer-events-none absolute -top-10 -left-12 w-40 h-40 bg-emerald-200/50 blur-3xl rounded-full" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 w-44 h-44 bg-sky-200/50 blur-3xl rounded-full" />

          <div className="grid grid-cols-2 gap-3">
            {servicePackages.map((pkg, i) => {
              const Icon = pkg.icon;
              const iris = irisPalette[i % irisPalette.length];
              return (
                <button
                  key={pkg.title}
                  onClick={() => scrollToSection("booking")}
                  aria-label={pkg.title}
                  className="group relative active:scale-[0.98] transition"
                >
                  <div className="rounded-3xl p-[2px] bg-gradient-to-br from-emerald-200 via-sky-200 to-teal-200 shadow-[0_10px_24px_rgba(16,185,129,0.08)]">
                    <div className="relative rounded-3xl bg-white/95 backdrop-blur-xl ring-1 ring-white/70 p-3 overflow-hidden">
                      <div className="mb-2 flex justify-center">
                        <IconBadge Icon={Icon} gradient={iris} />
                      </div>
                      <p className="text-[13px] font-bold text-gray-900 text-center leading-snug line-clamp-3">
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
              Đăng kí miễn phí ưu đãi
              <span className="ml-1 inline-flex items-center rounded-xl bg-white/90 px-2 py-0.5 text-2xl text-emerald-700 font-extrabold">
                50%
              </span>
            </button>
          </div>
        </div>

        {/* DESKTOP: Hàng trên 3 ô "Gói khám", Hàng dưới 5 ô còn lại (ĐỨNG THẲNG) */}
        <div className="hidden md:block">
          <div className="max-w-7xl mx-auto p-2">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {topPackages.map((pkg, i) => {
                const Icon = pkg.icon;
                const iris = irisPalette[i % irisPalette.length];
                return (
                  <Card
                    key={pkg.title}
                    Icon={Icon}
                    title={pkg.title}
                    iris={iris}
                    i={i}
                  />
                );
              })}
            </div>

            <div className="grid md:grid-cols-5 gap-6">
              {bottomPackages.map((pkg, i) => {
                const Icon = pkg.icon;
                const iris = irisPalette[i % irisPalette.length];
                return (
                  <Card
                    key={pkg.title}
                    Icon={Icon}
                    title={pkg.title}
                    iris={iris}
                    i={i}
                  />
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-6">
            <a
              href="#booking"
              className="inline-flex items-center gap-3 bg-emerald-500 text-white px-8 py-3 rounded-full font-extrabold text-base shadow-lg hover:shadow-xl hover:scale-105 hover:bg-emerald-600 transition"
            >
              Đăng kí miễn phí ưu đãi{" "}
              <span className="ml-1 inline-flex items-center rounded-xl bg-white/90 px-1.5 py-0.5 text-xl text-emerald-700 font-extrabold">
                50%
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* keyframes shimmer */}
      <style>{`
        @keyframes slide {
          0% { transform: translateX(-40%); }
          50% { transform: translateX(120%); }
          100% { transform: translateX(-40%); }
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;
