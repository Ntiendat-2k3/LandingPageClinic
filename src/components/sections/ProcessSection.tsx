"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Eye,
  Activity,
  Ruler,
  Flashlight,
  Crosshair,
  Syringe,
  Camera,
  MessageSquare,
  ClipboardCheck,
  CheckCircle2,
} from "lucide-react";
import { useScrollToSection } from "../../hooks/useScrollToSection";

/* ================= DATA ================= */
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
    details: ["Test cân bằng 2 mắt", "Đeo thử & tinh chỉnh thông số"],
  },
  {
    number: "6",
    title: "BƯỚC 6: khám sàng lọc",
    details: ["Test lác, đánh giá 2 mắt", "Soi đáy mắt & giải thích sơ bộ"],
  },
  {
    number: "7",
    title: "BƯỚC 7: thực hiện chỉ định",
    details: [
      "Cận lâm sàng theo BS",
      "VD: chụp chiếu, tra thuốc liệt điều tiết…",
    ],
  },
  {
    number: "8",
    title: "BƯỚC 8: tư vấn hướng xử trí",
    details: ["Giải thích chi tiết tình trạng", "Tư vấn phác đồ phù hợp"],
  },
];

/* ================= ICON PICKER ================= */
function pickIcon(detail: string): LucideIcon {
  const t = detail.toLowerCase();
  if (t.includes("thị lực") || t.includes("mắt") || t.includes("đồng tử"))
    return Eye;
  if (t.includes("khúc xạ") || t.includes("đo")) return Ruler;
  if (t.includes("kiểm soát") || t.includes("điều tiết")) return Activity;
  if (t.includes("soi đáy") || t.includes("đèn")) return Flashlight;
  if (t.includes("lác") || t.includes("hai mắt") || t.includes("2 mắt"))
    return Crosshair;
  if (t.includes("tra thuốc") || t.includes("liệt")) return Syringe;
  if (t.includes("chụp") || t.includes("chiếu") || t.includes("cận"))
    return Camera;
  if (t.includes("tư vấn") || t.includes("giải thích")) return MessageSquare;
  if (t.includes("test") || t.includes("thử")) return ClipboardCheck;
  return CheckCircle2;
}

const MOBILE_MAX = 768;

/* =========================================================================
   EXPORT WRAPPER
   ========================================================================= */
export default function ProcessClinicSVG_NoFixedHeights() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const update = () =>
      setIsMobile(
        typeof window !== "undefined" && window.innerWidth < MOBILE_MAX
      );
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return isMobile ? <ProcessMobile /> : <ProcessDesktopDynamic />;
}

/* =========================================================================
   MOBILE VERSION (bố cục dọc)
   ========================================================================= */
function ProcessMobile() {
  return (
    <section id="process" className="relative w-full md:hidden bg-white">
      <div className="relative z-10 px-4 pt-6 pb-10 max-w-[520px] mx-auto">
        <header className="text-center mb-5">
          <div className="text-center">
            <h2 className="text-4xl md:text-4xl font-extrabold tracking-wide text-emerald-600">
              Quy trình
            </h2>
            <h3 className="mt-1 font-bold text-lg md:text-2xl text-gray-800">
              ĐO TẬT KHÚC XẠ VÀ KIỂM TRA MẮT
            </h3>
            <div className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 ring-1 ring-emerald-100 shadow-sm">
              <span className="text-emerald-600 text-lg font-semibold">
                Hạn chế tối đa sai số
              </span>
            </div>
          </div>
        </header>

        <ul className="relative space-y-3">
          {steps.map((s) => (
            <li key={s.number} className="relative">
              <div className="rounded-xl border border-emerald-200 bg-white shadow-[0_8px_22px_rgba(16,185,129,.08)] p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 grid place-items-center rounded-full border-2 border-emerald-500 text-emerald-700 bg-white font-bold shrink-0">
                    {s.number}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-gray-900 text-[15px] leading-5">
                      {s.title}
                    </div>
                    <ul className="mt-2 space-y-1.5">
                      {s.details.map((d, k) => {
                        const Icon = pickIcon(d);
                        return (
                          <li key={k} className="flex items-start gap-2">
                            <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 shrink-0">
                              <Icon size={14} strokeWidth={2.2} />
                            </span>
                            <span className="text-[13.5px] text-gray-700 leading-5">
                              {d}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* =========================================================================
   DESKTOP VERSION — Tự đo layout để vẽ line, không fix height
   ========================================================================= */
function ProcessDesktopDynamic() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  // refs của 8 card để đo toạ độ
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  if (cardRefs.current.length !== 8) cardRefs.current = Array(8).fill(null);

  // container + nodes
  const [dims, setDims] = useState({ width: 0, height: 0 });
  const [nodes, setNodes] = useState<{ x: number; y: number }[]>([]);
  const [yBus, setYBus] = useState<number>(0);
  const [imgCenter, setImgCenter] = useState({ x: 0, y: 0 });
  const scrollToSection = useScrollToSection();

  // đo thêm chiều cao mỗi hàng để gia tăng safety khi lệch hàng
  const [rowHeights, setRowHeights] = useState({ top: 0, bot: 0 });

  useEffect(() => {
    if (!stageRef.current) return;
    const el = stageRef.current;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const width = rect.width;
      const height = el.scrollHeight;

      const newNodes = cardRefs.current.map((r) => {
        const rr = r?.getBoundingClientRect();
        if (!rr) return { x: 0, y: 0 };
        return {
          x: rr.left - rect.left + rr.width / 2,
          y: rr.top - rect.top + rr.height / 2,
        };
      });

      // chiều cao lớn nhất mỗi hàng
      const heights = cardRefs.current.map(
        (r) => r?.getBoundingClientRect()?.height ?? 0
      );
      const topH = Math.max(...heights.slice(0, 4), 0);
      const botH = Math.max(...heights.slice(4, 8), 0);
      setRowHeights({ top: topH, bot: botH });

      // tâm 2 hàng
      const topRow = newNodes.slice(0, 4);
      const botRow = newNodes.slice(4, 8);
      const avgY = (arr: { x: number; y: number }[]) =>
        arr.reduce((s, p) => s + p.y, 0) / (arr.length || 1);
      const yTopCenter = avgY(topRow);
      const yBotCenter = avgY(botRow);
      const yBetween = (yTopCenter + yBotCenter) / 2;

      setDims({ width, height });
      setNodes(newNodes);
      setYBus(yBetween);
      setImgCenter({ x: width / 2, y: yBetween });
    };

    const ro = new ResizeObserver(() => measure());
    ro.observe(el);

    const rAF = requestAnimationFrame(measure);

    const io = new IntersectionObserver(
      (ents) => {
        if (!revealed && ents[0]?.isIntersecting) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(rAF);
      io.disconnect();
    };
  }, [revealed]);

  // Kích thước ảnh trung tâm (match clamp(120px, 14vw, 220px))
  const centerSize = useMemo(
    () => Math.min(220, Math.max(120, (dims.width || 0) * 0.14)),
    [dims.width]
  );

  // khoảng trống muốn chừa thêm hai bên ảnh
  const CLEARANCE_PX = 48;

  // base gap theo width (cảm giác tự nhiên theo màn hình)
  const baseGap = useMemo(
    () => Math.min(180, Math.max(72, (dims.width || 0) * 0.09 || 96)),
    [dims.width]
  );

  // nếu 2 hàng lệch chiều cao, cộng thêm nửa độ lệch để an toàn
  const deltaH = Math.abs(rowHeights.top - rowHeights.bot);

  // rowGap tối thiểu
  const rowGapPx = useMemo(() => {
    const need = centerSize + CLEARANCE_PX * 2 + deltaH / 2;
    return Math.max(baseGap, need);
  }, [centerSize, CLEARANCE_PX, baseGap, deltaH]);

  // Path: 1→2→3→4 → xuống yBus → ngang qua ảnh → tới 5 → xuống 5 → 6 → 7 → 8
  const pathD = useMemo(() => {
    if (nodes.length < 8 || !dims.width) return "";
    const [n1, n2, n3, n4, n5, n6, n7, n8] = nodes;
    const imgCx = imgCenter.x;
    return [
      `M ${n1.x} ${n1.y}`,
      `L ${n2.x} ${n2.y}`,
      `L ${n3.x} ${n3.y}`,
      `L ${n4.x} ${n4.y}`,
      `L ${n4.x} ${yBus}`,
      `L ${imgCx} ${yBus}`,
      `L ${n5.x} ${yBus}`,
      `L ${n5.x} ${n5.y}`,
      `L ${n6.x} ${n6.y}`,
      `L ${n7.x} ${n7.y}`,
      `L ${n8.x} ${n8.y}`,
    ].join(" ");
  }, [nodes, imgCenter, yBus, dims.width]);

  return (
    <section id="process" className="relative hidden md:block bg-transparent">
      <style>{`
        @keyframes pulse { 0%{opacity:.4; r:5} 50%{opacity:1; r:7.5} 100%{opacity:.4; r:5} }
      `}</style>

      <div className="relative z-10 max-w-[1680px] mx-auto px-6 md:px-10 py-8">
        {/* Header */}
        <div className="relative z-20 flex items-center justify-center mb-6">
          <div className="text-center">
            <h2 className="text-4xl md:text-4xl font-extrabold tracking-wide text-emerald-600">
              Quy trình
            </h2>
            <h3 className="mt-1 font-bold text-lg md:text-2xl text-gray-800">
              ĐO TẬT KHÚC XẠ VÀ KIỂM TRA MẮT
            </h3>
            <div className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 ring-1 ring-emerald-100 shadow-sm">
              <span className="text-emerald-600 text-lg font-semibold">
                Hạn chế tối đa sai số
              </span>
            </div>
          </div>
        </div>

        {/* STAGE */}
        <div ref={stageRef} className="relative isolate">
          {/* GRID 2 hàng x 4 cột - rowGap tính động để né ảnh */}
          <div
            className="grid grid-cols-4 gap-x-6"
            style={{ rowGap: `${rowGapPx}px` }}
          >
            {steps.map((s, i) => (
              <div
                key={s.number}
                ref={(el) => (cardRefs.current[i] = el)}
                className="relative z-10"
              >
                <CardAuto data={s} />
              </div>
            ))}
          </div>

          {/* ẢNH TRUNG TÂM */}
          <div
            className="absolute z-10 pointer-events-none rounded-full overflow-hidden ring-1 ring-emerald-100 shadow-2xl bg-white"
            style={{
              left: imgCenter.x ? imgCenter.x : 0,
              top: yBus ? yBus : 0,
              transform: "translate(-50%, -50%)",
              width: `${centerSize}px`,
              height: `${centerSize}px`,
            }}
          >
            <img
              src="/images/section4.jpg"
              alt="Ảnh trung tâm"
              className="w-full h-full object-cover"
            />
          </div>

          {/* LINE (dưới card) + COMET */}
          {dims.width > 0 && (
            <svg
              className={`absolute inset-0 z-[1] pointer-events-none ${
                revealed ? "[--dash:0]" : "[--dash:1]"
              }`}
              width="100%"
              height={dims.height}
              viewBox={`0 0 ${dims.width} ${dims.height}`}
              preserveAspectRatio="none"
              aria-hidden
              strokeLinejoin="round"
              strokeMiterlimit={1}
            >
              <defs>
                <linearGradient
                  id="tubeRainbow"
                  gradientUnits="userSpaceOnUse"
                  x1={0}
                  y1={0}
                  x2={dims.width}
                  y2={0}
                >
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="20%" stopColor="#f59e0b" />
                  <stop offset="40%" stopColor="#10b981" />
                  <stop offset="60%" stopColor="#3b82f6" />
                  <stop offset="80%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
                <linearGradient id="tubeHL" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#fff" stopOpacity=".9" />
                  <stop offset="100%" stopColor="#fff" stopOpacity=".1" />
                </linearGradient>

                {/* Glow mạnh cho "vật thể sáng" */}
                <filter
                  id="cometGlow"
                  x="-100%"
                  y="-100%"
                  width="300%"
                  height="300%"
                >
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Track vô hình để animateMotion bám theo */}
                <path
                  id="motionTrack"
                  d={pathD}
                  fill="none"
                  stroke="transparent"
                />
              </defs>

              {/* base white underlay */}
              <path
                d={pathD}
                pathLength={1}
                fill="none"
                stroke="#fff"
                strokeOpacity=".7"
                strokeWidth={16}
                strokeLinecap="round"
              />

              {/* main rainbow tube */}
              <path
                d={pathD}
                pathLength={1}
                fill="none"
                stroke="url(#tubeRainbow)"
                strokeWidth={10}
                strokeLinecap="round"
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: "var(--dash)",
                  transition:
                    "stroke-dashoffset 3.6s cubic-bezier(.22,.9,.28,1)",
                }}
              />

              {/* shiny highlight */}
              <path
                d={pathD}
                pathLength={1}
                fill="none"
                stroke="url(#tubeHL)"
                strokeWidth={3}
                strokeLinecap="round"
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: "var(--dash)",
                  transition:
                    "stroke-dashoffset 3.6s cubic-bezier(.22,.9,.28,1) .1s",
                }}
              />

              {/* VẬT THỂ SÁNG CHẠY LIÊN TỤC */}
              <g key={pathD} filter="url(#cometGlow)">
                {/* thân comet */}
                <circle r="7" fill="#ffffff" />
                {/* chuyển động dọc theo path; rotate theo tiếp tuyến */}
                <animateMotion dur="10s" rotate="auto" repeatCount="indefinite">
                  {/* React hỗ trợ xlinkHref trong SVG */}
                  <mpath xlinkHref="#motionTrack" />
                </animateMotion>
              </g>

              {/* nodes */}
              {nodes.map((n, i) => (
                <g key={i}>
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={7}
                    fill="#fff"
                    stroke="url(#tubeRainbow)"
                    strokeWidth={3}
                  />
                  {revealed && (
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r={7.5}
                      fill="none"
                      stroke="url(#tubeRainbow)"
                      strokeWidth={3}
                      style={{
                        animation: "pulse 1.6s ease-in-out infinite",
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  )}
                </g>
              ))}
            </svg>
          )}
        </div>

        {/* CTA căn GIỮA tuyệt đối */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => scrollToSection("booking")}
            className="relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-base text-white bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-lg active:scale-[0.98] cursor-pointer"
          >
            Đăng kí miễn phí ưu đãi
            <span className="ml-1 inline-flex items-center rounded-xl bg-white/90 px-2 py-0.5 text-2xl text-emerald-700 font-extrabold">
              50%
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

/* ================= CARD – auto height (desktop) ================= */
function CardAuto({ data }: { data: Step }) {
  return (
    <div className="h-full w-full rounded-2xl border border-emerald-200/70 bg-white/95 backdrop-blur-sm shadow-[0_10px_30px_rgba(16,185,129,.08)] flex flex-col">
      <div className="px-5 pt-4 pb-2 flex items-center gap-3">
        <div className="w-9 h-9 grid place-items-center rounded-full border-2 border-emerald-500 text-emerald-700 bg-white font-bold">
          {data.number}
        </div>
        <div className="font-semibold text-gray-900 tracking-wide">
          {data.title}
        </div>
      </div>
      <ul className="px-5 pb-4 pt-1 grid gap-1.5">
        {data.details.map((d, k) => {
          const Icon = pickIcon(d);
          return (
            <li key={k} className="flex items-start gap-2">
              <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600">
                <Icon size={14} strokeWidth={2.2} />
              </span>
              <span className="text-sm text-gray-700 leading-5">{d}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
