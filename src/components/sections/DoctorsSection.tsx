"use client";

import { useState } from "react";
import { Award, GraduationCap, Shield, Check } from "lucide-react";
import { messages } from "@/i18n";

type Doctor = {
  name: string;
  title: string;
  education: string;
  highlights: string[];
  image: string;
  position: string;
};

const DoctorsSection = () => {
  const doctorImages = [
    { src: "/images/doctors/doctor1.jpg", position: "50% 72%" },
    { src: "/images/doctors/doctor3.jpg", position: "50% 65%" },
    { src: "/images/doctors/doctor2.jpg", position: "50% 65%" },
  ];
  const doctors: Doctor[] = messages.doctors.profiles.map((profile, index) => ({
    ...profile,
    image: doctorImages[index]?.src ?? "",
    position: doctorImages[index]?.position ?? "center",
  }));

  const [expanded, setExpanded] = useState<number | null>(null);
  const toggle = (i: number) => setExpanded((cur) => (cur === i ? null : i));
  const scrollToBooking = () =>
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="doctors" className="relative overflow-hidden bg-white">
      {/* ===== Styles cho animation (không dùng gradient) ===== */}
      <style>{`
        @keyframes dashMove { to { stroke-dashoffset: -1200; } }
        @keyframes slowRotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        svg .dash { stroke-dasharray: 8 10; animation: dashMove 30s linear infinite; }
        svg .dash2 { stroke-dasharray: 10 12; animation: dashMove 38s linear infinite reverse; }
        svg .rotor { transform-box: fill-box; transform-origin: 50% 50%; animation: slowRotate 60s linear infinite; }
      `}</style>

      {/* ===== BACKGROUND (không gradient) ===== */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 700"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Lưới chấm bằng pattern, không gradient */}
            <pattern
              id="dotGrid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1.5" fill="#E6F9F1" />
            </pattern>
          </defs>

          {/* Lớp lưới chấm rất nhẹ */}
          <rect
            x="0"
            y="0"
            width="1200"
            height="700"
            fill="url(#dotGrid)"
            opacity="0.25"
          />

          {/* Một vài đường wave đơn sắc */}
          <path
            className="dash"
            d="M0,160 C200,200 300,100 520,140 C740,180 860,260 1060,220 C1130,206 1170,196 1200,200"
            fill="none"
            stroke="#A7F3D0" /* emerald-200 */
            strokeWidth="2"
            opacity="0.8"
          />
          <path
            className="dash2"
            d="M0,420 C220,380 340,480 560,440 C780,400 900,320 1100,360 C1150,372 1180,382 1200,380"
            fill="none"
            stroke="#BFDBFE" /* blue-200 */
            strokeWidth="2"
            opacity="0.8"
          />

          {/* Vòng quỹ đạo quay chậm (stroke đơn sắc) */}
          <g className="rotor" style={{ opacity: 0.22 }}>
            <circle
              cx="180"
              cy="160"
              r="60"
              fill="none"
              stroke="#86EFAC"
              strokeWidth="2"
            />
            <circle
              cx="180"
              cy="160"
              r="95"
              fill="none"
              stroke="#93C5FD"
              strokeWidth="2"
            />
            <circle
              cx="180"
              cy="160"
              r="130"
              fill="none"
              stroke="#FDE68A"
              strokeWidth="2"
            />
          </g>
          <g
            className="rotor"
            style={{ opacity: 0.22, animationDuration: "90s" }}
          >
            <circle
              cx="1020"
              cy="520"
              r="60"
              fill="none"
              stroke="#86EFAC"
              strokeWidth="2"
            />
            <circle
              cx="1020"
              cy="520"
              r="95"
              fill="none"
              stroke="#93C5FD"
              strokeWidth="2"
            />
            <circle
              cx="1020"
              cy="520"
              r="130"
              fill="none"
              stroke="#FDE68A"
              strokeWidth="2"
            />
          </g>
        </svg>
      </div>

      {/* ===== CONTENT WRAPPER (thu nhỏ để vừa vặn 1 màn hình) ===== */}
      <div
        data-scroll-reveal
        className="container relative z-10 mx-auto px-2.5 sm:px-6 lg:px-8 py-8 md:py-10"
      >
        <div className="text-center mb-5 md:mb-6">
          <h2 className="font-space-grotesk text-2xl md:text-3xl lg:text-[30px] font-extrabold text-gray-900 uppercase">
            {messages.doctors.sectionTitle}
          </h2>
        </div>

        {/* ===== MOBILE ===== */}
        <div className="md:hidden -mx-2.5 px-2.5">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {doctors.map((d, idx) => {
              const open = expanded === idx;
              const bullets = open ? d.highlights : d.highlights.slice(0, 2);
              return (
                <article
                  key={idx}
                  className="snap-start basis-[86%] shrink-0 rounded-xl border border-gray-100 bg-white/90 backdrop-blur-sm shadow-sm flex flex-col"
                >
                  <div className="pt-4 px-4 flex justify-center">
                    <div className="w-36 h-44 overflow-hidden rounded-xl bg-gray-50 shadow-sm">
                      <img
                        src={d.image || "/placeholder.svg"}
                        alt={d.name}
                        className="w-full h-full object-cover"
                        style={{ objectPosition: d.position }}
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                    <div className="space-y-2.5">
                      <header>
                        <h3 className="font-space-grotesk text-[16px] font-bold text-gray-900">
                          {d.name}
                        </h3>
                        <p className="text-emerald-700 text-[13px] font-medium mt-0.5">
                          {d.title}
                        </p>
                      </header>

                      <div className="flex items-start gap-2">
                        <GraduationCap className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
                        <p className="text-[12.5px] text-gray-700 leading-snug">
                          {d.education}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <Award className="w-4 h-4 text-gray-500 shrink-0" />
                          <span className="text-[13px] font-semibold text-gray-900">
                            {messages.doctors.experienceTitle}
                          </span>
                        </div>
                        <ul className="space-y-1.5 ml-5">
                          {bullets.map((h, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                              <span className="text-[12.5px] text-gray-700 leading-snug">
                                {h}
                              </span>
                            </li>
                          ))}
                        </ul>

                        {d.highlights.length > 2 && (
                          <button
                            onClick={() => toggle(idx)}
                            className="mt-1.5 text-[12.5px] font-semibold text-emerald-700"
                          >
                            {open ? messages.doctors.collapse : messages.doctors.expand}
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-2">
                      <div className="flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                        <span className="text-[11.5px] text-gray-600">
                          {messages.doctors.commitmentShort}
                        </span>
                      </div>
                      <button
                        onClick={scrollToBooking}
                        className="px-3 py-1 rounded-full text-[11.5px] font-semibold text-white bg-emerald-600 hover:bg-emerald-700"
                      >
                        {messages.doctors.book}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* ===== DESKTOP (thu nhỏ ảnh để vừa 1 viewport) ===== */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {doctors.map((d, idx) => (
            <article
              key={idx}
              className="relative rounded-xl border border-gray-100 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
            >
              <div className="pt-5 px-5 flex justify-center">
                <div className="w-40 h-48 lg:w-44 lg:h-52 overflow-hidden rounded-xl bg-gray-50 shadow-sm">
                  <img
                    src={d.image || "/placeholder.svg"}
                    alt={d.name}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: d.position }}
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="p-4 lg:p-5 space-y-2.5 flex-1 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <header>
                    <h3 className="font-space-grotesk text-base lg:text-[17px] font-bold text-gray-900 leading-snug">
                      {d.name}
                    </h3>
                    <p className="text-emerald-700 font-medium mt-0.5 text-[13px]">
                      {d.title}
                    </p>
                  </header>

                  <div className="flex items-start gap-2">
                    <GraduationCap className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
                    <p className="text-[12.5px] lg:text-[13px] text-gray-700 leading-snug">
                      {d.education}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <Award className="w-4 h-4 text-gray-500 shrink-0" />
                      <span className="text-[13px] font-semibold text-gray-900">
                        {messages.doctors.experienceTitle}
                      </span>
                    </div>
                    <ul className="space-y-1.5 ml-5">
                      {d.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                          <span className="text-[12.5px] lg:text-[13px] text-gray-700 leading-snug">
                            {h}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                  <Shield className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                  <span className="text-[11.5px] text-gray-600">
                    {messages.doctors.commitmentFull}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;
