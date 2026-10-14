"use client";

import { AlertTriangle, Eye, AlertCircle, Zap, Droplets, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { messages } from "@/i18n";

const GoalsSection = () => {
  const myopiaStats = [
    {
      text: messages.goals.stats[0],
      icon: Eye,
    },
    {
      text: messages.goals.stats[1],
      icon: AlertCircle,
    },
    {
      text: messages.goals.stats[2],
      icon: Zap,
    },
    {
      text: messages.goals.stats[3],
      icon: Droplets,
    },
  ];

  return (
    <section
      id="goals"
      className="relative overflow-hidden bg-[#f4faf9] py-10 lg:py-3"
    >
      <div
        data-scroll-reveal
        className="container mx-auto px-2.5 sm:px-6 lg:px-8 relative flex flex-col"
      >
        {/* Header - giữ nguyên 2 dòng đầu tiên */}
        <div className="mb-6 shrink-0 text-center lg:mb-2">
          <h2 className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-2xl font-extrabold leading-tight text-gray-900 sm:text-3xl lg:text-[32px]">
            <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 md:size-11 lg:size-10">
              <AlertTriangle className="size-5 text-emerald-700 md:size-7 lg:size-6" />
            </span>
            <span>{messages.goals.title}</span>
            <span className="basis-full text-sm font-bold uppercase tracking-wide text-emerald-700 md:text-base">{messages.goals.globalIssue}</span>
          </h2>
        </div>

        {/* Hai cột cân đối, ưu tiên thêm chiều ngang cho nguồn số liệu ở cột trái. */}
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-6">
          {/* Cột trái: nguy cơ, ảnh minh họa và nguồn số liệu. */}
          <div className="flex flex-col gap-3.5 lg:gap-2">
            {/* Thẻ năm 2050 - co nhỏ gọn gàng */}
            <div className="rounded-2xl border-l-4 border-cyan-600 bg-gradient-to-r from-cyan-50 to-emerald-50 p-3 shadow-sm sm:p-4 lg:p-3">
              <p className="text-2xl font-extrabold leading-none text-gray-900 sm:text-3xl">
                {messages.goals.year}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-800 sm:text-base lg:text-sm">
                {messages.goals.estimatePrefix}{" "}
                <span className="font-bold text-emerald-700">
                  {messages.goals.population}
                </span>{" "}
                {messages.goals.estimateSuffix}
              </p>
            </div>

            {/* Dòng cảnh báo nguy cơ */}
            <p className="text-base font-semibold text-gray-800 lg:text-sm">
              {messages.goals.riskLead}
            </p>

            {/* 4 dòng nguy cơ - thu nhỏ icon và padding */}
            <div className="flex flex-col gap-2 lg:gap-1.5">
              {myopiaStats.map((s, i) => {
                const Icon = s.icon;
                const last = i === myopiaStats.length - 1;
                return (
                  <div
                    key={i}
                    className="grid grid-cols-[36px_1fr] items-center gap-2.5"
                  >
                    {/* ICON + line */}
                    <div className="relative flex justify-center">
                      <div
                        className="z-10 flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-emerald-600 text-white shadow-sm ring-2 ring-white"
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span
                        className={`absolute left-1/2 -translate-x-1/2 top-8 w-[2px] ${last ? "hidden" : "block"
                          } bg-gradient-to-b from-emerald-400 via-cyan-400 to-blue-400`}
                        style={{ height: "1rem" }}
                      />
                    </div>

                    <div className="rounded-lg bg-white/90 px-3.5 py-2 shadow-sm ring-1 ring-emerald-100 lg:py-1.5">
                      <p className="text-base leading-normal text-gray-700 lg:text-sm">
                        {s.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Ảnh đeo kính chuyển xuống dưới nội dung */}
            <div className="relative mt-2 overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-emerald-100 lg:mt-1">
              <img
                src="/images/essilor.jpg"
                alt={messages.goals.campaignImageAlt}
                className="h-36 w-full object-cover object-center sm:h-40 lg:h-40"
              />
            </div>
            <p className="text-xs leading-snug text-slate-600">{messages.goals.sources}</p>
            <a href="https://doi.org/10.1167/iovs.62.5.2" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-emerald-800 underline underline-offset-2">
              {messages.goals.sourceLinkText}
            </a>
          </div>

          {/* Cột phải: thời điểm đi khám và bốn dấu hiệu cần chú ý. */}
          <div className="flex flex-col">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 sm:text-sm">
                {messages.goals.signs.badge}
              </div>
              <h3 className="mt-2 text-2xl font-extrabold leading-tight sm:text-3xl">
                <span className="block text-slate-900">
                  {messages.goals.signs.titleLine1}
                </span>
                <span className="block text-emerald-700">
                  {messages.goals.signs.titleLine2}
                </span>
              </h3>

              {/* Mô tả */}
              <p className="mt-2 text-base leading-normal text-slate-600 lg:text-sm">
                {messages.goals.signs.description}
              </p>

              {/* 4 dấu hiệu nhận biết */}
              <div className="mt-4 flex flex-col gap-2 lg:mt-3 lg:gap-3">
                {messages.goals.signs.items.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 rounded-lg bg-white/90 px-3.5 py-2 shadow-sm ring-1 ring-emerald-100 lg:py-1.5">
                    <span className="text-sm font-bold text-emerald-600 shrink-0 mt-0.5 font-mono">
                      {item.number}
                    </span>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">
                        {item.title}
                      </h4>
                      <p className="mt-0.5 text-base leading-normal text-slate-600 lg:text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
        <div className="mt-8 flex justify-center lg:mt-3">
          <Button asChild size="lg" className="h-auto min-h-14 whitespace-normal rounded-xl px-7 py-3 text-center text-base font-bold shadow-md">
            <a href="/#booking">
              <span>{messages.goals.signs.cta}</span>
              <ArrowRight className="size-5" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GoalsSection;
