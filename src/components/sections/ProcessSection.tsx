"use client";

import React, { useEffect, useState } from "react";

type Step = { number: string; title: string; details: string[] };

const steps: Step[] = [
  {
    number: "1",
    title: "BƯỚC 1: đánh giá sơ bộ",
    details: ["Thử thị lực và đo khoảng cách đồng tử", "Đo khúc xạ máy"],
  },
  {
    number: "2",
    title: "BƯỚC 2: kiểm soát điều tiết",
    details: ["Làm nghiệm pháp nhà điều tiết", "Soi bóng đồng tử"],
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
      "Test cân bằng hai mắt, test lại kiểm soát điều tiết",
      "Đeo kính đi lại, tinh chỉnh lại thông số kính",
    ],
  },
  {
    number: "6",
    title: "BƯỚC 6: khám sàng lọc",
    details: [
      "Test lác, đánh giá thị giác hai mắt",
      "Soi đáy mắt, giải thích sơ bộ tình trạng",
    ],
  },
  {
    number: "7",
    title: "BƯỚC 7: thực hiện chỉ định",
    details: [
      "Các thăm dò lâm sàng & cận lâm sàng theo bác sĩ",
      "Ví dụ: chụp chiếu, tra thuốc liệt điều tiết…",
    ],
  },
  {
    number: "8",
    title: "BƯỚC 8: tư vấn hướng xử trí",
    details: [
      "Bác sĩ giải thích chi tiết tình trạng",
      "Tư vấn phác đồ xử trí/điều trị phù hợp",
    ],
  },
];

/* helpers */
const deg2rad = (d: number) => (d * Math.PI) / 180;
const polar = (cx: number, cy: number, r: number, ang: number) => {
  const a = deg2rad(ang);
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
};

function useCircleLayout() {
  const [vw, setVw] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // size: khổ sân khấu | arcR: bán kính đường tròn | center: đường kính avatar
  if (vw >= 1536) return { size: 1200, arcR: 380, center: 520, cardW: 310 };
  if (vw >= 1280) return { size: 1080, arcR: 350, center: 460, cardW: 300 };
  if (vw >= 1024) return { size: 980, arcR: 320, center: 420, cardW: 290 };
  // < md dùng layout mobile, nhưng cũng tăng nhẹ nếu cần
  return { size: 860, arcR: 290, center: 360, cardW: 270 };
}

/** Trả về transform + textAlign + vị trí notch cho 8 hướng. `gap` là khoảng cách sát line (px). */
function placementFor(angleDeg: number, gap = 6) {
  const a = ((angleDeg % 360) + 360) % 360;
  const idx = Math.round(a / 45) % 8;

  // default
  let transform = "translate(-50%, -50%)";
  let textAlign: "left" | "right" | "center" = "left";
  let notch: React.CSSProperties = {};

  switch (idx) {
    case 6: // top
      transform = `translate(-50%, calc(-100% - ${gap}px))`;
      textAlign = "center";
      notch = {
        bottom: -6,
        left: "50%",
        transform: "translateX(-50%) rotate(45deg)",
      };
      break;
    case 7: // top-right
      transform = `translate(${gap}px, calc(-100% + 8px))`;
      textAlign = "left";
      notch = { bottom: 8, left: -6, transform: "rotate(45deg)" };
      break;
    case 0: // right
      transform = `translate(${gap}px, -50%)`;
      textAlign = "left";
      notch = {
        top: "50%",
        left: -6,
        transform: "translateY(-50%) rotate(45deg)",
      };
      break;
    case 1: // bottom-right
      transform = `translate(${gap}px, -8%)`;
      textAlign = "left";
      notch = { top: 8, left: -6, transform: "rotate(45deg)" };
      break;
    case 2: // bottom
      transform = `translate(-50%, ${gap}px)`;
      textAlign = "center";
      notch = {
        top: -6,
        left: "50%",
        transform: "translateX(-50%) rotate(45deg)",
      };
      break;
    case 3: // bottom-left
      transform = `translate(calc(-100% - ${gap}px), -8%)`;
      textAlign = "right";
      notch = { top: 8, right: -6, transform: "rotate(45deg)" };
      break;
    case 4: // left
      transform = `translate(calc(-100% - ${gap}px), -50%)`;
      textAlign = "right";
      notch = {
        top: "50%",
        right: -6,
        transform: "translateY(-50%) rotate(45deg)",
      };
      break;
    case 5: // top-left
      transform = `translate(calc(-100% - ${gap}px), calc(-100% + 8px))`;
      textAlign = "right";
      notch = { bottom: 8, right: -6, transform: "rotate(45deg)" };
      break;
  }
  return { transform, textAlign, notch };
}

const ProcessSection: React.FC = () => {
  const { size, arcR, center, cardW } = useCircleLayout();

  const cx = size / 2;
  const cy = size / 2;
  const baseAngle = -90; // 12 giờ
  const stepAngle = 360 / steps.length;
  const anglePad = 8; // để mũi tên không đè card

  // neo card sát ngay trên arc (anchorR = arcR)
  const anchorR = arcR;

  const items = steps.map((s, i) => {
    const angle = baseAngle + i * stepAngle;
    const next = baseAngle + ((i + 1) % steps.length) * stepAngle;

    const { x, y } = polar(cx, cy, anchorR, angle);
    const start = polar(cx, cy, arcR, angle + anglePad);
    const end = polar(cx, cy, arcR, next - anglePad);

    const delta = ((next - angle + 360) % 360) - 2 * anglePad;
    const largeArc = delta > 180 ? 1 : 0;
    const path = `M ${start.x} ${start.y} A ${arcR} ${arcR} 0 ${largeArc} 1 ${end.x} ${end.y}`;

    return { ...s, angle, x, y, path };
  });

  return (
    <section
      id="process"
      className="section-padding relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #e8f5e8 0%, #f0f9f0 100%)",
        backgroundImage:
          "radial-gradient(circle at 20% 20%, rgba(34,197,94,.08) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(34,197,94,.08) 0%, transparent 50%), radial-gradient(circle at 40% 60%, rgba(34,197,94,.05) 0%, transparent 50%)",
      }}
    >
      <div className="container mx-auto container-padding">
        <div className="text-center mb-6 md:mb-10">
          <h2 className="font-space-grotesk text-3xl md:text-5xl font-bold text-emerald-500 mb-2 tracking-wider">
            QUY TRÌNH
          </h2>
          <h3 className="font-space-grotesk text-lg md:text-2xl font-bold text-gray-800">
            ĐO TẬT KHÚC XẠ VÀ KIỂM TRA MẮT
          </h3>
          <div className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 ring-1 ring-emerald-100 shadow-sm">
            <span className="text-emerald-600 text-sm font-semibold">
              Hạn chế tối đa sai số
            </span>
          </div>
        </div>

        {/* Mobile list giữ nguyên */}
        <div className="md:hidden space-y-4">
          {steps.map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 shadow-sm border border-emerald-100"
            >
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
                  <h4 className="font-semibold text-emerald-600 mb-1">
                    {s.title}
                  </h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    {s.details.map((d, k) => (
                      <li key={k}>- {d}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop vòng tròn */}
        <div className="hidden md:block">
          <div
            className="relative mx-auto"
            style={{ width: size, height: size }}
          >
            {/* Arc + arrows */}
            <svg
              className="absolute inset-0"
              width={size}
              height={size}
              viewBox={`0 0 ${size} ${size}`}
            >
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="12"
                  markerHeight="8"
                  refX="10"
                  refY="4"
                  orient="auto"
                >
                  <polygon points="0 0, 12 4, 0 8" fill="#10b981" />
                </marker>
              </defs>
              <circle
                cx={cx}
                cy={cy}
                r={arcR}
                fill="none"
                stroke="#10b981"
                strokeOpacity="0.28"
                strokeDasharray="6 8"
                strokeWidth="3"
              />
              {items.map((p, i) => (
                <path
                  key={i}
                  d={p.path}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  markerEnd="url(#arrowhead)"
                />
              ))}
            </svg>

            {/* Avatar trung tâm TO HƠN */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              style={{ width: center, height: center }}
            >
              <div className="w-full h-full rounded-full overflow-hidden border-6 border-white shadow-[0_30px_80px_rgba(16,185,129,.25)] bg-white">
                <img
                  src="/images/section4.jpg"
                  alt="Eye examination"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Cards – sát line + notch nối vào arc */}
            {items.map((p, i) => {
              const place = placementFor(((p.angle % 360) + 360) % 360, 6); // gap ~6px
              return (
                <div
                  key={i}
                  className="absolute z-20"
                  style={{
                    left: p.x,
                    top: p.y,
                    width: cardW,
                    transform: place.transform,
                  }}
                >
                  <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-5 border border-emerald-100 shadow-lg">
                    {/* notch nối arc */}
                    <span
                      className="absolute w-3.5 h-3.5 bg-white border border-emerald-100 shadow-sm"
                      style={{ ...place.notch }}
                    />
                    <div
                      className="flex items-start gap-3 mb-2"
                      style={{
                        justifyContent:
                          place.textAlign === "right"
                            ? "flex-end"
                            : "flex-start",
                      }}
                    >
                      <div
                        className="text-6xl font-bold text-emerald-500 leading-none opacity-90"
                        style={{
                          WebkitTextStroke: "2px #10b981",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {p.number}
                      </div>
                      <h4
                        className="font-space-grotesk text-emerald-600 font-bold pt-2"
                        style={{ textAlign: place.textAlign }}
                      >
                        {p.title}
                      </h4>
                    </div>
                    <ul
                      className="text-gray-700 text-sm space-y-1"
                      style={{ textAlign: place.textAlign }}
                    >
                      {p.details.map((d, k) => (
                        <li key={k}>- {d}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
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
    </section>
  );
};

export default ProcessSection;
