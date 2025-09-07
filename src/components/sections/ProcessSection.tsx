"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
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

/* ============= DATA ============= */
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

/* ============= ICON PICKER ============= */
function pickIcon(detail: string) {
  const t = detail.toLowerCase();
  if (t.includes("thị lực") || t.includes("mắt") || t.includes("đồng tử"))
    return Eye;
  if (t.includes("khúc xạ") || t.includes("đo")) return Ruler;
  if (t.includes("kiểm soát") || t.includes("điều tiết")) return Activity;
  if (t.includes("soi đáy")) return Flashlight;
  if (t.includes("lác") || t.includes("hai mắt")) return Crosshair;
  if (t.includes("tra thuốc") || t.includes("liệt")) return Syringe;
  if (t.includes("chụp") || t.includes("chiếu") || t.includes("cận"))
    return Camera;
  if (t.includes("tư vấn") || t.includes("giải thích")) return MessageSquare;
  if (t.includes("test") || t.includes("thử")) return ClipboardCheck;
  return CheckCircle2;
}

/* ============= HELPERS ============= */
const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));
const easeInOut = (x: number) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 1, 3) / 2;

const MOBILE_MAX = 768;

/* =========================================================================
   EXPORT WRAPPER: Auto chọn mobile/desktop
   ========================================================================= */
export default function ProcessClinicBeads() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    const check = () =>
      setIsMobile(
        typeof window !== "undefined" && window.innerWidth < MOBILE_MAX
      );
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile ? <ProcessMobile /> : <ProcessDesktop />;
}

/* =========================================================================
   MOBILE VERSION (stack dọc, KHÔNG có line)
   ========================================================================= */
function ProcessMobile() {
  return (
    <section
      className="relative w-full md:hidden"
      style={{
        background:
          "linear-gradient(180deg,#f8fffb 0%, #ffffff 40%, #f1fdf7 100%)",
      }}
    >
      {/* nền họa tiết nhẹ */}
      <div
        className="absolute inset-0 opacity-[.04] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 8px 8px, #10b981 2px, transparent 2px) 0 0/26px 26px",
        }}
      />

      <div className="relative z-10 px-4 pt-6 pb-10 max-w-[520px] mx-auto">
        <header className="text-center mb-5">
          <h2 className="text-2xl font-extrabold tracking-wide text-emerald-600">
            Quy trình khám khúc xạ
          </h2>
          <p className="text-gray-700/80 text-xs">
            Bố cục dọc • Không có đường line
          </p>
        </header>

        {/* LIST STEPS */}
        <ul className="relative space-y-3">
          {steps.map((s) => (
            <li key={s.number} className="relative">
              {/* CARD */}
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
   DESKTOP VERSION (nguyên bản + tinh chỉnh nhẹ, chỉ hiển thị >= md)
   ========================================================================= */
function ProcessDesktop() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  // responsive (desktop giữ min 1024)
  const [cw, setCw] = useState(1280);
  const [vh, setVh] = useState<number>(
    typeof window !== "undefined" ? window.innerHeight : 900
  );

  useEffect(() => {
    const ro = new ResizeObserver((entries) => {
      const el = entries[0]?.contentRect;
      if (el?.width) setCw(Math.max(1024, el.width));
    });
    if (stageRef.current) ro.observe(stageRef.current);
    const onResize = () => setVh(window.innerHeight);
    window.addEventListener("resize", onResize);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /* ---- layout ---- */
  const headerH = 88;
  const stageH = Math.round(clamp(vh - headerH, 520, 820));
  const cardW = Math.round(clamp(cw * 0.205, 260, 360));
  const gutter = Math.round(clamp(cw * 0.02, 18, 56));
  const gridW = 4 * cardW + 3 * gutter;
  const startX = Math.round((cw - gridW) / 2);
  const cardH = Math.round(clamp(stageH * 0.24, 130, 170));
  const yTopCenter = Math.round(stageH * 0.34);
  const yBotCenter = Math.round(stageH * 0.7);
  const yTop = yTopCenter - Math.round(cardH / 2);
  const yBot = yBotCenter - Math.round(cardH / 2);
  const colLeft = (col: number) => startX + col * (cardW + gutter);
  const colCenter = (col: number) => colLeft(col) + Math.round(cardW / 2);
  const colByIndex = (i: number) => (i <= 3 ? i : 7 - i);

  const cards = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => {
        const col = colByIndex(i);
        const isTop = i <= 3;
        return {
          left: colLeft(col),
          top: isTop ? yTop : yBot,
          width: cardW,
          height: cardH,
        };
      }),
    [cw, stageH]
  );

  // PATH 1→…→8 (qua tâm card)
  const nodes = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => {
        const col = colByIndex(i);
        const y = i <= 3 ? yTopCenter : yBotCenter;
        return { x: colCenter(col), y };
      }),
    [cw, stageH]
  );

  const pathD = useMemo(() => {
    const segs: string[] = [`M ${nodes[0].x} ${nodes[0].y}`];
    for (let i = 1; i < nodes.length; i++)
      segs.push(`L ${nodes[i].x} ${nodes[i].y}`);
    return segs.join(" ");
  }, [nodes]);

  const [totalLen, setTotalLen] = useState(1);
  useEffect(() => {
    if (!pathRef.current) return;
    setTotalLen(pathRef.current.getTotalLength());
  }, [pathD]);

  // reveal once
  const [progress, setProgress] = useState(0);
  const [played, setPlayed] = useState(false);
  useEffect(() => {
    const el = stageRef.current;
    if (!el || played) return;
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e.isIntersecting && e.intersectionRatio > 0.35) {
          const t0 = performance.now();
          const dur = 4200;
          const tick = (t: number) => {
            const p = Math.min(1, (t - t0) / dur);
            setProgress(easeInOut(p));
            if (p < 1) requestAnimationFrame(tick);
            else setPlayed(true);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: [0.35] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [played]);

  const revealLen = Math.max(0.001, progress * totalLen);

  const [beads, setBeads] = useState<{ x: number; y: number }[]>([]);
  useEffect(() => {
    if (!pathRef.current || totalLen < 2) return;
    const P = pathRef.current;
    const step = 90;
    const arr: { x: number; y: number }[] = [];
    for (let L = 16; L < totalLen - 16; L += step) {
      const pt = P.getPointAtLength(L);
      arr.push({ x: pt.x, y: pt.y });
    }
    setBeads(arr);
  }, [totalLen, cw, stageH]);

  return (
    <section
      className="relative hidden md:block h-screen overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg,#f8fffb 0%, #ffffff 40%, #f1fdf7 100%)",
      }}
    >
      <style>{`
        @keyframes beadPulse {
          0% { r: 4; opacity: .45; }
          50% { r: 6.5; opacity: 1; }
          100% { r: 4; opacity: .45; }
        }
      `}</style>

      <div
        className="absolute inset-0 opacity-[.035] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 8px 8px, #10b981 2px, transparent 2px) 0 0/28px 28px",
        }}
      />

      <div className="relative z-10 h-full max-w-[1680px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="h-[88px] flex items-end justify-center">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide text-emerald-600">
              Quy trình khám khúc xạ
            </h2>
            <p className="text-gray-700/80 text-sm md:text-base">
              Line “glass” dưới card • Beads nhịp nhẹ, rõ nét
            </p>
          </div>
        </div>

        {/* STAGE */}
        <div
          ref={stageRef}
          className="relative select-none isolate"
          style={{ height: stageH }}
        >
          {/* LINE & BEADS */}
          <svg
            className="absolute inset-0 z-0 pointer-events-none"
            width="100%"
            height={stageH}
            viewBox={`0 0 ${cw} ${stageH}`}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="glassTube" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#67e8f9" />
                <stop offset="50%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
              <linearGradient id="glassHighlight" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ffffff" stopOpacity=".85" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity=".2" />
              </linearGradient>
              <filter
                id="tubeGlow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="4" result="g" />
                <feMerge>
                  <feMergeNode in="g" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <mask id="revealMask">
                <path
                  d={pathD}
                  fill="none"
                  stroke="white"
                  strokeWidth={14}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={`${revealLen} ${Math.max(
                    totalLen - revealLen,
                    0.1
                  )}`}
                />
              </mask>
            </defs>

            <path
              d={pathD}
              fill="none"
              stroke="#ffffff"
              strokeOpacity=".6"
              strokeWidth={16}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              ref={pathRef}
              d={pathD}
              fill="none"
              stroke="url(#glassTube)"
              strokeWidth={10}
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#tubeGlow)"
              strokeDasharray={`${revealLen} ${Math.max(
                totalLen - revealLen,
                0.1
              )}`}
            />
            <path
              d={pathD}
              fill="none"
              stroke="url(#glassHighlight)"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity=".75"
              mask="url(#revealMask)"
            />

            {/* BEADS */}
            <g mask="url(#revealMask)">
              {beads.map((b, i) => (
                <g key={i}>
                  <circle
                    cx={b.x}
                    cy={b.y}
                    r={4}
                    fill="#fff"
                    stroke="url(#glassTube)"
                    strokeWidth="3"
                    style={{
                      animation: `beadPulse 1.2s ${
                        i * 0.12
                      }s infinite ease-in-out`,
                    }}
                  />
                </g>
              ))}
            </g>

            {/* NODES */}
            {nodes.map((n, i) => {
              const reached = revealLen >= (i / 7) * totalLen - 1;
              return (
                <g key={i}>
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r="7"
                    fill="#fff"
                    stroke="url(#glassTube)"
                    strokeWidth="3"
                  />
                  {reached && (
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r="14"
                      fill="none"
                      stroke="url(#glassTube)"
                      strokeWidth="4"
                      opacity=".35"
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* CARDS */}
          {cards.map((c, i) => (
            <CardEqual
              key={i}
              data={steps[i]}
              left={c.left}
              top={c.top}
              width={c.width}
              height={c.height}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============= CARD – equal height (desktop) ============= */
function CardEqual({
  data,
  left,
  top,
  width,
  height,
}: {
  data: Step;
  left: number;
  top: number;
  width: number;
  height: number;
}) {
  return (
    <div className="absolute z-10" style={{ left, top, width, height }}>
      <div className="h-full w-full rounded-2xl border border-emerald-200 bg-white shadow-[0_10px_30px_rgba(16,185,129,.08)] flex flex-col">
        <div className="px-5 pt-4 pb-2 flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 grid place-items-center rounded-full border-2 border-emerald-500 text-emerald-700 bg-white font-bold">
            {data.number}
          </div>
          <div className="font-semibold text-gray-900 tracking-wide">
            {data.title}
          </div>
        </div>
        <ul className="px-5 pb-4 pt-1 grid gap-1.5 overflow-hidden">
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
    </div>
  );
}
