"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Eye } from "lucide-react";

/* ========== DATA ========== */
type Step = { number: string; title: string; details: string[] };

const steps: Step[] = [
  {
    number: "1",
    title: "BƯỚC 1: đánh giá sơ bộ",
    details: ["Thử thị lực & đo khoảng cách đồng tử", "Đo khúc xạ máy"],
  },
  {
    number: "2",
    title: "BƯỚC 2: kiểm soát điều tiết",
    details: ["Nghiệm pháp nhà điều tiết", "Soi bóng đồng tử"],
  },
  {
    number: "3",
    title: "BƯỚC 3: đo khúc xạ sơ bộ",
    details: ["Thử kính cầu/kính trụ sơ bộ"],
  },
  {
    number: "4",
    title: "BƯỚC 4: đo khúc xạ tối ưu",
    details: ["Thử kính cầu/kính trụ tối ưu"],
  },
  {
    number: "5",
    title: "BƯỚC 5: cấp đơn kính",
    details: [
      "Cân bằng hai mắt, test lại điều tiết",
      "Tinh chỉnh thông số kính",
    ],
  },
  {
    number: "6",
    title: "BƯỚC 6: khám sàng lọc",
    details: ["Test lác, đánh giá thị giác hai mắt", "Soi đáy mắt"],
  },
  {
    number: "7",
    title: "BƯỚC 7: thực hiện chỉ định",
    details: [
      "Thăm dò lâm sàng & cận lâm sàng",
      "VD: chụp chiếu, liệt điều tiết…",
    ],
  },
  {
    number: "8",
    title: "BƯỚC 8: tư vấn hướng xử trí",
    details: ["Giải thích chi tiết tình trạng", "Tư vấn phác đồ phù hợp"],
  },
];

/* ========== COMPONENT ========== */
const ProcessProgressSection: React.FC = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);

  // autoplay desktop
  useEffect(() => {
    const isDesktop =
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) return;
    if (paused) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % steps.length),
      2200
    );
    return () => clearInterval(id);
  }, [paused]);

  // positions %
  const positions = useMemo(
    () => steps.map((_, i) => (i / (steps.length - 1)) * 100),
    []
  );

  const pct = (active / (steps.length - 1)) * 100;

  return (
    <section
      id="process"
      className="relative overflow-hidden lg:min-h-[100svh] bg-gradient-to-br from-emerald-50 to-cyan-50"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* décor */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-300/25 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-cyan-300/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-6 relative flex flex-col lg:min-h-[100svh]">
        {/* Header gọn */}
        <header className="text-center pt-6 lg:pt-8 pb-4 shrink-0">
          <h2 className="font-space-grotesk text-2xl lg:text-5xl font-extrabold tracking-wide text-emerald-600">
            QUY TRÌNH
          </h2>
          <p className="font-space-grotesk text-base lg:text-2xl font-bold text-gray-800 mt-1">
            ĐO TẬT KHÚC XẠ & KIỂM TRA MẮT
          </p>
          <div className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 ring-1 ring-emerald-100 shadow-sm">
            <span className="text-emerald-600 font-semibold">
              Hạn chế tối đa sai số
            </span>
          </div>
        </header>

        {/* ===== MOBILE: timeline dọc ===== */}
        <div className="md:hidden pb-8">
          <div className="relative pl-6">
            <div className="absolute left-3 top-0 bottom-0 w-[3px] bg-gradient-to-b from-emerald-300 via-cyan-300 to-sky-300 rounded-full" />
            <ul className="space-y-4">
              {steps.map((s, i) => (
                <li key={s.number} className="relative">
                  <span
                    className={`absolute -left-[6px] top-2 w-4 h-4 rounded-full border-2 ${
                      i <= active
                        ? "bg-emerald-500 border-emerald-600"
                        : "bg-white border-emerald-300"
                    }`}
                  />
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-emerald-100">
                    <div className="flex items-start gap-3">
                      <div
                        className="text-3xl font-extrabold text-emerald-500 leading-none"
                        style={{
                          WebkitTextStroke: "2px #10b981",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {s.number}
                      </div>
                      <div>
                        <h4 className="font-semibold text-emerald-600">
                          {s.title}
                        </h4>
                        <ul className="text-gray-700 text-sm space-y-1 mt-1">
                          {s.details.map((d, k) => (
                            <li key={k}>- {d}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ===== DESKTOP: progress bar full-viewport (flex-1) ===== */}
        <div className="hidden md:flex flex-1 min-h-0 items-center">
          <div className="w-full max-w-6xl mx-auto">
            {/* Track */}
            <div className="relative pt-14 pb-20">
              {/* line */}
              <div
                ref={trackRef}
                className="relative h-3 rounded-full bg-white ring-1 ring-emerald-200/50 shadow-inner overflow-hidden"
              >
                {/* filled */}
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-400"
                  style={{ width: `${pct}%` }}
                />
                {/* shimmer */}
                <div
                  className="absolute inset-y-0 left-0 w-1/3 pointer-events-none bg-white/30"
                  style={{ transform: `translateX(${Math.max(0, pct - 30)}%)` }}
                />
                {/* runner icon */}
                <div
                  className="absolute -top-3 size-9 rounded-full bg-white shadow-lg ring-2 ring-emerald-300 grid place-items-center transition-transform"
                  style={{ transform: `translateX(calc(${pct}% - 50%))` }}
                >
                  <Eye className="w-5 h-5 text-emerald-600" />
                </div>

                {/* ticks */}
                {positions.map((left, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Bước ${i + 1}`}
                    className="group focus:outline-none"
                    style={{
                      position: "absolute",
                      left: `${left}%`,
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <span
                      className={`block size-5 rounded-full border-2 transition ${
                        i <= active
                          ? "bg-emerald-500 border-emerald-600"
                          : "bg-white border-emerald-300"
                      }`}
                    />
                    {/* ripple */}
                    <span
                      className={`absolute inset-0 -z-10 rounded-full opacity-0 group-hover:opacity-40 transition`}
                      style={{
                        boxShadow: "0 0 0 10px rgba(16,185,129,.12)",
                      }}
                    />
                  </button>
                ))}
              </div>

              {/* Tooltips (cards) – xen kẽ trên/dưới để không chồng chéo */}
              {steps.map((s, i) => {
                const left = positions[i];
                const up = i % 2 === 0; // even: on top, odd: bottom
                const activeThis = i === active;
                return (
                  <div
                    key={s.number}
                    className={`absolute ${
                      up ? "bottom-[calc(50%+22px)]" : "top-[calc(50%+22px)]"
                    } transition-opacity duration-300`}
                    style={{
                      left: `${left}%`,
                      transform: "translateX(-50%)",
                      width: 320,
                      pointerEvents: activeThis ? "auto" : "none",
                      opacity: activeThis ? 1 : 0.18,
                    }}
                  >
                    <div
                      className={`relative bg-white/95 backdrop-blur rounded-2xl p-4 ring-1 ring-emerald-200 shadow-xl ${
                        up ? "" : ""
                      }`}
                    >
                      {/* notch */}
                      <span
                        className="absolute w-3.5 h-3.5 bg-white ring-1 ring-emerald-200"
                        style={
                          {
                            left: "50%",
                            transform: "translateX(-50%) rotate(45deg)",
                            [up ? "bottom" : "top"]: -7,
                          } as React.CSSProperties
                        }
                      />
                      <div className="flex items-start gap-3">
                        <div
                          className="text-4xl font-extrabold text-emerald-500 leading-none"
                          style={{
                            WebkitTextStroke: "2px #10b981",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          {s.number}
                        </div>
                        <div>
                          <h4 className="font-space-grotesk font-bold text-emerald-700">
                            {s.title}
                          </h4>
                          <ul className="text-gray-700 text-sm space-y-1 mt-1">
                            {s.details.map((d, k) => (
                              <li key={k}>- {d}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA trong cùng viewport */}
            <div className="text-center">
              <a
                href="#booking"
                className="inline-flex items-center gap-3 bg-emerald-500 text-white px-8 py-3 rounded-full font-extrabold text-base shadow-lg hover:shadow-xl hover:scale-105 hover:bg-emerald-600 transition"
              >
                Đăng kí miễn phí nhận ưu đãi{" "}
                <span className="ml-1 inline-flex items-center rounded-xl bg-white/90 px-1.5 py-0.5 text-xl text-emerald-700 font-extrabold">
                  50%
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* keyframes (nhẹ) */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .transition, .transition-transform { transition: none !important; }
        }
      `}</style>
    </section>
  );
};

export default ProcessProgressSection;
