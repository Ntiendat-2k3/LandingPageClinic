"use client";

import { useState } from "react";
import { Award, GraduationCap, Shield, Check } from "lucide-react";

type Doctor = {
  name: string;
  title: string;
  education: string;
  highlights: string[];
  image: string;
};

const DoctorsSection = () => {
  const doctors: Doctor[] = [
    {
      name: "Ths. Bs Trần Anh Tuấn",
      title: "Chuyên gia Mắt – Tật khúc xạ, Ortho-K & Kiểm soát cận thị",
      education:
        "Tốt nghiệp Thạc sĩ loại xuất sắc chuyên ngành Mắt – Tật khúc xạ tại Fudan University, Shanghai.",
      highlights: [
        "Có nhiều nghiên cứu/báo cáo đăng trên các tạp chí quốc tế.",
        "10 năm kinh nghiệm tại Shanghai Eye & ENT Hospital, BV Trung ương Huế, BV Mắt quốc tế DND.",
        "Điều trị & kiểm soát hiệu quả cho hàng nghìn ca cận thị tiến triển, cận thị bệnh lý.",
        "Nguyên Phụ trách Trung tâm Khúc xạ – BV Mắt quốc tế DND.",
        "Đầy đủ chứng chỉ chuyên sâu: khúc xạ, kính Ortho-K, kiểm soát cận thị…",
      ],
      image: "/images/doctors/doctor1.jpg",
    },
    {
      name: "ĐD/KTV Đào Thị Thúy",
      title: "Điều dưỡng/Kỹ thuật viên khúc xạ – Ortho-K & Kiểm soát cận thị",
      education:
        "Được đào tạo chính quy về Chuyên khoa Mắt và Khúc xạ nhãn khoa.",
      highlights: [
        "Gần 15 năm kinh nghiệm trong chuyên ngành Mắt – Tật khúc xạ.",
        "Nguyên Điều dưỡng trưởng Trung tâm Khúc xạ – BV Mắt quốc tế DND.",
        "Sở hữu chứng chỉ khúc xạ nhãn khoa, kiểm soát cận thị.",
        "Chứng chỉ kính áp tròng ban đêm Ortho-K.",
      ],
      image: "/images/doctors/doctor3.jpg",
    },
    {
      name: "ĐD/KTV Phạm Thị Hương",
      title: "Điều dưỡng/Kỹ thuật viên khúc xạ – Ortho-K & Kiểm soát cận thị",
      education:
        "Được đào tạo chính quy về Chuyên khoa Mắt và Khúc xạ nhãn khoa.",
      highlights: [
        "Gần 15 năm kinh nghiệm trong chuyên ngành Mắt – Tật khúc xạ.",
        "Sở hữu chứng chỉ khúc xạ nhãn khoa, kiểm soát cận thị.",
        "Chứng chỉ kính áp tròng ban đêm Ortho-K.",
      ],
      image: "/images/doctors/doctor2.jpg",
    },
  ];

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

      {/* ===== CONTENT WRAPPER (thu nhỏ desktop) ===== */}
      <div className="relative z-10 mx-auto px-4 md:px-6 max-w-[1050px] lg:max-w-[1180px] py-10 md:py-12">
        <div className="text-center mb-7 md:mb-10">
          <h2 className="font-space-grotesk text-2xl md:text-3xl lg:text-[32px] font-extrabold text-gray-900 uppercase">
            Đội ngũ chuyên môn
          </h2>
        </div>

        {/* ===== MOBILE ===== */}
        <div className="md:hidden -mx-4 px-4">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {doctors.map((d, idx) => {
              const open = expanded === idx;
              const bullets = open ? d.highlights : d.highlights.slice(0, 2);
              return (
                <article
                  key={idx}
                  className="snap-start basis-[86%] shrink-0 rounded-xl border border-gray-100 bg-white/90 backdrop-blur-sm shadow-sm"
                >
                  <div className="relative aspect-[5/6] w-full overflow-hidden rounded-t-xl bg-gray-50">
                    <img
                      src={d.image || "/placeholder.svg"}
                      alt={d.name}
                      className="absolute inset-0 w-full h-full object-cover object-[50%_85%]"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-4 space-y-3">
                    <header>
                      <h3 className="font-space-grotesk text-[17px] font-bold text-gray-900">
                        {d.name}
                      </h3>
                      <p className="text-emerald-700 text-[13.5px] font-medium mt-0.5">
                        {d.title}
                      </p>
                    </header>

                    <div className="flex items-start gap-2">
                      <GraduationCap className="w-4 h-4 text-gray-500 mt-0.5" />
                      <p className="text-[13px] text-gray-700 leading-relaxed">
                        {d.education}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-semibold text-gray-900">
                          Kinh nghiệm & thành tựu
                        </span>
                      </div>
                      <ul className="space-y-2 ml-6">
                        {bullets.map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-emerald-600 mt-0.5" />
                            <span className="text-[13px] text-gray-700 leading-relaxed">
                              {h}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {d.highlights.length > 2 && (
                        <button
                          onClick={() => toggle(idx)}
                          className="mt-2 text-[13px] font-semibold text-emerald-700"
                        >
                          {open ? "Thu gọn ▲" : "Xem thêm ▼"}
                        </button>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-gray-500" />
                        <span className="text-[12px] text-gray-600">
                          Cam kết chuyên môn
                        </span>
                      </div>
                      <button
                        onClick={scrollToBooking}
                        className="px-3 py-1.5 rounded-full text-[12px] font-semibold text-white bg-emerald-600 hover:bg-emerald-700"
                      >
                        Đặt lịch
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* ===== DESKTOP (thu nhỏ) ===== */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-7">
          {doctors.map((d, idx) => (
            <article
              key={idx}
              className="relative rounded-xl border border-gray-100 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="w-full overflow-hidden rounded-t-xl bg-gray-50 aspect-[4/5]">
                <img
                  src={d.image || "/placeholder.svg"}
                  alt={d.name}
                  className="w-full h-full object-cover object-[50%_86%]"
                  loading="lazy"
                />
              </div>

              <div className="p-5 space-y-3.5">
                <header>
                  <h3 className="font-space-grotesk text-lg font-bold text-gray-900 leading-snug">
                    {d.name}
                  </h3>
                  <p className="text-emerald-700 font-medium mt-0.5 text-[13.5px]">
                    {d.title}
                  </p>
                </header>

                <div className="flex items-start gap-2">
                  <GraduationCap className="w-4 h-4 text-gray-500 mt-0.5" />
                  <p className="text-[13.5px] text-gray-700 leading-relaxed">
                    {d.education}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Award className="w-4 h-4 text-gray-500" />
                    <span className="text-[13.5px] font-semibold text-gray-900">
                      Kinh nghiệm & thành tựu
                    </span>
                  </div>
                  <ul className="space-y-1.5 ml-6">
                    {d.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 mt-0.5" />
                        <span className="text-[13.5px] text-gray-700 leading-relaxed">
                          {h}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <Shield className="w-4 h-4 text-gray-500" />
                  <span className="text-[12px] text-gray-600">
                    Cam kết chuyên môn & đạo đức nghề nghiệp
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
