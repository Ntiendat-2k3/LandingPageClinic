import { useLayoutEffect, useRef, useState } from "react";
import {
  domAnimation,
  LazyMotion,
  m,
  useReducedMotion,
} from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Crosshair,
  Eye,
  Flashlight,
  MessageSquare,
  Ruler,
  Syringe,
} from "lucide-react";

import SectionHeader from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useScrollToSection } from "@/hooks/useScrollToSection";

type ProcessStep = {
  number: number;
  title: string;
  details: string[];
};

type ProcessPoint = {
  x: number;
  y: number;
};

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: 1,
    title: "Đánh giá sơ bộ",
    details: ["Thử thị lực & đo khoảng cách đồng tử", "Đo khúc xạ máy"],
  },
  {
    number: 2,
    title: "Kiểm soát điều tiết",
    details: ["Nghiệm pháp nhả điều tiết", "Soi bóng đồng tử"],
  },
  {
    number: 3,
    title: "Đo khúc xạ sơ bộ",
    details: ["Thử kính cầu/kính trụ sơ bộ"],
  },
  {
    number: 4,
    title: "Đo khúc xạ tối ưu",
    details: ["Thử kính cầu/kính trụ tối ưu"],
  },
  {
    number: 5,
    title: "Cấp đơn kính",
    details: ["Test cân bằng 2 mắt", "Đeo thử & tinh chỉnh thông số"],
  },
  {
    number: 6,
    title: "Khám sàng lọc",
    details: ["Test lác, đánh giá 2 mắt", "Soi đáy mắt & giải thích sơ bộ"],
  },
  {
    number: 7,
    title: "Thực hiện chỉ định",
    details: [
      "Cận lâm sàng theo bác sĩ",
      "Chụp chiếu, tra thuốc liệt điều tiết…",
    ],
  },
  {
    number: 8,
    title: "Tư vấn hướng xử trí",
    details: ["Giải thích chi tiết tình trạng", "Tư vấn phác đồ phù hợp"],
  },
];

// Hàng dưới đảo chiều để đường đi liên tục từ phải sang trái sau bước 4.
const DESKTOP_VISUAL_ORDER = [0, 1, 2, 3, 7, 6, 5, 4] as const;

function pickIcon(detail: string): LucideIcon {
  const normalizedDetail = detail.toLowerCase();

  if (normalizedDetail.includes("thị lực")) return Eye;
  if (normalizedDetail.includes("đồng tử")) return Ruler;
  if (
    normalizedDetail.includes("khúc xạ") ||
    normalizedDetail.includes("điều tiết")
  ) {
    return Activity;
  }
  if (
    normalizedDetail.includes("soi đáy") ||
    normalizedDetail.includes("đèn")
  ) {
    return Flashlight;
  }
  if (
    normalizedDetail.includes("lác") ||
    normalizedDetail.includes("hai mắt") ||
    normalizedDetail.includes("2 mắt")
  ) {
    return Crosshair;
  }
  if (
    normalizedDetail.includes("tra thuốc") ||
    normalizedDetail.includes("liệt")
  ) {
    return Syringe;
  }
  if (
    normalizedDetail.includes("chụp") ||
    normalizedDetail.includes("chiếu") ||
    normalizedDetail.includes("cận")
  ) {
    return Camera;
  }
  if (
    normalizedDetail.includes("tư vấn") ||
    normalizedDetail.includes("giải thích")
  ) {
    return MessageSquare;
  }
  if (
    normalizedDetail.includes("test") ||
    normalizedDetail.includes("thử")
  ) {
    return ClipboardCheck;
  }

  return CheckCircle2;
}

/** Hiển thị quy trình khám theo một đường dẫn liên tục trên cả desktop và mobile. */
export default function ProcessSection() {
  const scrollToSection = useScrollToSection();
  const shouldReduceMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation} strict>
      <section id="process" className="bg-background py-14 md:py-20">
        <div
          data-scroll-reveal
          className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10"
        >
          <SectionHeader
          title="Quy trình đo tật khúc xạ & kiểm tra mắt"
          description="8 bước được sắp xếp liên tục, giúp theo dõi rõ từng giai đoạn và hạn chế tối đa sai số."
          className="mb-10 md:mb-12"
          />

          <MobileProcessTimeline shouldReduceMotion={shouldReduceMotion} />
          <DesktopProcessTimeline shouldReduceMotion={shouldReduceMotion} />

          <div className="mt-10 flex justify-center">
            <Button
              type="button"
              size="lg"
              onClick={() => scrollToSection("booking")}
            >
              Đăng ký miễn phí — ưu đãi 50%
            </Button>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}

function MobileProcessTimeline({
  shouldReduceMotion,
}: {
  shouldReduceMotion: boolean | null;
}) {
  return (
    <div className="relative mx-auto max-w-xl md:hidden">
      <svg
        className="pointer-events-none absolute inset-y-0 left-0 h-full w-8"
        viewBox="0 0 32 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line
          x1="16"
          y1="2"
          x2="16"
          y2="98"
          stroke="var(--border)"
          strokeWidth="3"
          vectorEffect="non-scaling-stroke"
        />
        <m.line
          x1="16"
          y1="2"
          x2="16"
          y2="98"
          stroke="var(--primary)"
          strokeWidth="3"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={shouldReduceMotion ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: shouldReduceMotion ? 0 : 1.2, ease: "easeOut" }}
        />
        {!shouldReduceMotion ? (
          <m.line
            x1="16"
            y1="2"
            x2="16"
            y2="98"
            stroke="var(--primary-foreground)"
            strokeWidth="1.5"
            strokeDasharray="5 12"
            vectorEffect="non-scaling-stroke"
            initial={{ opacity: 0 }}
            animate={{ strokeDashoffset: [0, -17] }}
            whileInView={{ opacity: 0.65 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              strokeDashoffset: {
                duration: 1.4,
                repeat: Infinity,
                ease: "linear",
              },
              opacity: { duration: 0.2, delay: 1.1 },
            }}
          />
        ) : null}
      </svg>

      <ol className="flex flex-col gap-4 pl-11">
        {PROCESS_STEPS.map((step) => (
          <li key={step.number} className="relative">
            <span className="absolute left-[-44px] top-4 z-10 grid size-8 place-items-center rounded-full border-2 border-primary bg-background text-sm font-bold text-primary shadow-sm">
              {step.number}
            </span>
            <ProcessStepCard step={step} />
          </li>
        ))}
      </ol>
    </div>
  );
}

function DesktopProcessTimeline({
  shouldReduceMotion,
}: {
  shouldReduceMotion: boolean | null;
}) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const markerRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [layout, setLayout] = useState<{
    width: number;
    height: number;
    points: ProcessPoint[];
  }>({ width: 0, height: 0, points: [] });

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let frameId = 0;

    const measure = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        const stageRect = stage.getBoundingClientRect();
        const points = PROCESS_STEPS.map((_, index) => {
          const markerRect = markerRefs.current[index]?.getBoundingClientRect();
          if (!markerRect) return null;

          return {
            x: markerRect.left - stageRect.left + markerRect.width / 2,
            y: markerRect.top - stageRect.top + markerRect.height / 2,
          };
        });

        if (points.some((point) => point === null)) return;

        setLayout({
          width: stageRect.width,
          height: stage.scrollHeight,
          points: points as ProcessPoint[],
        });
      });
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(stage);
    measure();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
    };
  }, []);

  const path = layout.points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  return (
    <div ref={stageRef} className="relative hidden md:block">
      {path ? (
        <svg
          className="pointer-events-none absolute inset-0 z-0"
          width="100%"
          height={layout.height}
          viewBox={`0 0 ${layout.width} ${layout.height}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <marker
              id="process-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="7"
              refY="4"
              orient="auto"
            >
              <path d="M 0 0 L 8 4 L 0 8 Z" fill="var(--primary)" />
            </marker>
          </defs>

          <path
            d={path}
            fill="none"
            stroke="var(--border)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          <m.path
            d={path}
            fill="none"
            stroke="var(--primary)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            markerEnd="url(#process-arrow)"
            vectorEffect="non-scaling-stroke"
            initial={shouldReduceMotion ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: shouldReduceMotion ? 0 : 1.6, ease: "easeOut" }}
          />
          {!shouldReduceMotion ? (
            <m.path
              d={path}
              fill="none"
              stroke="var(--primary-foreground)"
              strokeWidth="1.5"
              strokeDasharray="7 19"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              initial={{ opacity: 0 }}
              animate={{ strokeDashoffset: [0, -26] }}
              whileInView={{ opacity: 0.65 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                strokeDashoffset: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                },
                opacity: { duration: 0.2, delay: 1.5 },
              }}
            />
          ) : null}
        </svg>
      ) : null}

      <ol className="relative z-10 grid grid-cols-4 gap-x-6 gap-y-24">
        {DESKTOP_VISUAL_ORDER.map((stepIndex) => {
          const step = PROCESS_STEPS[stepIndex];

          return (
            <li key={step.number} className="relative flex min-w-0 flex-col pt-12">
              <m.span
                ref={(element) => {
                  markerRefs.current[stepIndex] = element;
                }}
                className="absolute left-1/2 top-0 grid size-10 -translate-x-1/2 place-items-center rounded-full border-4 border-background bg-primary text-sm font-bold text-primary-foreground shadow-sm"
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.75 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.35,
                  delay: shouldReduceMotion ? 0 : stepIndex * 0.08,
                }}
              >
                {step.number}
              </m.span>
              <ProcessStepCard step={step} />
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function ProcessStepCard({ step }: { step: ProcessStep }) {
  return (
    <Card size="sm" className="h-full shadow-sm">
      <CardHeader>
        <CardTitle>{step.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-2">
          {step.details.map((detail) => {
            const Icon = pickIcon(detail);

            return (
              <li
                key={detail}
                className="flex items-start gap-2 text-sm leading-5 text-muted-foreground"
              >
                <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-primary">
                  <Icon className="size-3.5" aria-hidden="true" />
                </span>
                <span>{detail}</span>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
