"use client";

import React, { useEffect, useMemo, useState } from "react";

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
];

/* ---------- geometry helpers ---------- */
const deg2rad = (deg: number) => (deg * Math.PI) / 180;
const polar = (cx: number, cy: number, r: number, angleDeg: number) => {
  const a = deg2rad(angleDeg);
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
};

/* ---------- responsive circle sizes (desktop only) ---------- */
function useCircleLayout() {
  const [vw, setVw] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // presets theo breakpoint để lấp đầy màn hình rộng
  const layout = useMemo(() => {
    if (vw >= 1536) {
      return { size: 1100, arc: 360, card: 420, center: 240 };
    }
    if (vw >= 1280) {
      return { size: 960, arc: 320, card: 380, center: 220 };
    }
    if (vw >= 1024) {
      return { size: 880, arc: 290, card: 340, center: 200 };
    }
    // < md không dùng vòng tròn
    return { size: 820, arc: 270, card: 320, center: 180 };
  }, [vw]);

  // card width co giãn theo size (không vượt quá 320)
  const cardWidth = Math.max(
    240,
    Math.min(320, Math.round(layout.size * 0.27))
  );

  return {
    size: layout.size,
    radiusArc: layout.arc,
    radiusCard: layout.card,
    centerSize: layout.center,
    cardWidth,
  };
}

const ProcessSection: React.FC = () => {
  const { size, radiusArc, radiusCard, centerSize, cardWidth } =
    useCircleLayout();

  // thông số vòng
  const cx = size / 2;
  const cy = size / 2;
  const baseAngle = -90; // Bước 1 trên đỉnh
  const stepAngle = 360 / steps.length;
  const anglePad = 10; // tránh cung đè lên card

  // tính vị trí card & path cung mũi tên
  const positioned = steps.map((s, i) => {
    const angle = baseAngle + i * stepAngle;
    const nextAngle = baseAngle + ((i + 1) % steps.length) * stepAngle;

    const { x, y } = polar(cx, cy, radiusCard, angle);
    const start = polar(cx, cy, radiusArc, angle + anglePad);
    const end = polar(cx, cy, radiusArc, nextAngle - anglePad);

    const delta = ((nextAngle - angle + 360) % 360) - 2 * anglePad;
    const largeArc = delta > 180 ? 1 : 0;

    const path = `M ${start.x} ${start.y} A ${radiusArc} ${radiusArc} 0 ${largeArc} 1 ${end.x} ${end.y}`;

    return { ...s, angle, x, y, path };
  });

  return (
    <section
      id="process"
      className="section-padding relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #e8f5e8 0%, #f0f9f0 100%)",
        backgroundImage: `
          radial-gradient(circle at 20% 20%, rgba(34, 197, 94, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(34, 197, 94, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 40% 60%, rgba(34, 197, 94, 0.05) 0%, transparent 50%)
        `,
      }}
    >
      <div className="container mx-auto container-padding">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-space-grotesk text-3xl md:text-5xl font-bold text-emerald-500 mb-2 tracking-wider">
            QUY TRÌNH
          </h2>
          <h3 className="font-space-grotesk text-lg md:text-2xl font-bold text-gray-800">
            ĐO TẬT KHÚC XẠ VÀ KIỂM TRA MẮT
          </h3>
        </div>

        {/* ===== Mobile: hiển thị danh sách dọc ===== */}
        <div className="md:hidden space-y-4">
          {steps.map((step, idx) => (
            <div
              key={idx}
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
                  {step.number}
                </div>
                <div>
                  <h4 className="font-semibold text-emerald-600 mb-1">
                    {step.title}
                  </h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    {step.details.map((d, i) => (
                      <li key={i}>- {d}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ===== Desktop: vòng tròn lớn lấp màn ===== */}
        <div className="hidden md:block">
          {/* Wrapper chung hệ toạ độ cho SVG + Cards + Ảnh */}
          <div
            className="relative mx-auto"
            style={{ width: size, height: size }}
          >
            {/* SVG vòng & mũi tên (khớp kích thước wrapper) */}
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

              {/* vòng tròn nền nhạt giúp canh thị giác */}
              <circle
                cx={cx}
                cy={cy}
                r={radiusArc}
                fill="none"
                stroke="#10b981"
                strokeOpacity="0.22"
                strokeDasharray="6 8"
                strokeWidth="2"
              />

              {/* các cung mũi tên nối giữa các bước */}
              {positioned.map((p, i) => (
                <path
                  key={`arc-${i}`}
                  d={p.path}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  markerEnd="url(#arrowhead)"
                  opacity="0.95"
                />
              ))}
            </svg>

            {/* Ảnh trung tâm */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              style={{ width: centerSize, height: centerSize }}
            >
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl bg-white">
                <img
                  src="/images/section4.jpg"
                  alt="Eye examination"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Cards đặt theo điểm cực trên vòng */}
            {positioned.map((p, i) => (
              <div
                key={`card-${i}`}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                style={{ left: p.x, top: p.y, width: cardWidth }}
              >
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 border border-emerald-100 shadow-lg">
                  <div className="flex items-start gap-3 mb-2">
                    <div
                      className="text-6xl font-bold text-emerald-500 leading-none opacity-90"
                      style={{
                        WebkitTextStroke: "2px #10b981",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {p.number}
                    </div>
                    <h4 className="font-space-grotesk text-emerald-600 font-bold pt-2">
                      {p.title}
                    </h4>
                  </div>
                  <ul className="text-gray-700 text-sm space-y-1">
                    {p.details.map((d, idx) => (
                      <li key={idx}>- {d}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-10">
            <a
              href="#booking"
              className="inline-block bg-emerald-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 hover:bg-emerald-600 transition"
            >
              Đăng kí miễn phí nhận ưu đãi 50%
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
