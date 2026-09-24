"use client";

import { AlertTriangle, Eye, AlertCircle, Zap, Droplets, ArrowRight } from "lucide-react";
import { messages } from "@/i18n";

const GoalsSection = () => {
  const scrollToBooking = () => {
    const el = document.getElementById("booking");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const myopiaStats = [
    {
      text: messages.goals.stats[0],
      icon: Eye,
      color: "from-blue-500 to-blue-600",
    },
    {
      text: messages.goals.stats[1],
      icon: AlertCircle,
      color: "from-red-500 to-red-600",
    },
    {
      text: messages.goals.stats[2],
      icon: Zap,
      color: "from-orange-500 to-orange-600",
    },
    {
      text: messages.goals.stats[3],
      icon: Droplets,
      color: "from-green-500 to-emerald-600",
    },
  ];

  return (
    <section
      id="goals"
      className="relative overflow-hidden py-12 lg:py-16"
      style={{
        background:
          "linear-gradient(180deg, rgba(236,252,247,0.55) 0%, rgba(240,249,255,0.55) 100%)",
      }}
    >
      {/* décor */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-emerald-300/30 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-blue-300/20 blur-3xl" />
      </div>

      <div
        data-scroll-reveal
        className="container mx-auto px-2.5 sm:px-6 lg:px-8 relative flex flex-col"
      >
        {/* Header - giữ nguyên 2 dòng đầu tiên */}
        <div className="text-center mb-6 lg:mb-8 shrink-0">
          <h2 className="mt-2 inline-flex items-center gap-3 text-[26px] leading-tight md:text-[36px] lg:text-[42px] font-extrabold text-gray-900">
            <span className="inline-flex w-9 h-9 md:w-11 md:h-11 lg:w-12 lg:h-12 items-center justify-center rounded-full bg-red-100 shrink-0">
              <AlertTriangle className="w-5 h-5 md:w-7 md:h-7 lg:w-8 lg:h-8 text-red-600" />
            </span>
            <span>{messages.goals.title}</span>
          </h2>

          <div className="block"></div>
          <div className="my-2 inline-block rounded-xl px-4 py-1.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold text-sm md:text-xl lg:text-[20px] shadow">
            {messages.goals.globalIssue}
          </div>
        </div>

        {/* Grid 2 cột: 1/2 bên trái và 1/2 bên phải */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* LEFT 50%: Nội dung cũ co nhỏ lại + ảnh đeo kính chuyển xuống dưới */}
          <div className="flex flex-col gap-3.5">
            {/* Thẻ năm 2050 - co nhỏ gọn gàng */}
            <div className="rounded-2xl p-3 sm:p-4 bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 shadow-sm">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-none">
                {messages.goals.year}
              </p>
              <p className="mt-1 text-sm sm:text-base lg:text-[17px] font-medium text-gray-800">
                {messages.goals.estimatePrefix}{" "}
                <span className="text-red-600 font-bold">
                  {messages.goals.population}
                </span>{" "}
                {messages.goals.estimateSuffix}
              </p>
            </div>

            {/* Dòng cảnh báo nguy cơ */}
            <p className="text-sm sm:text-base font-semibold text-gray-800">
              {messages.goals.riskLead}
            </p>

            {/* 4 dòng nguy cơ - thu nhỏ icon và padding */}
            <div className="flex flex-col gap-2">
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
                        className={`z-10 w-8 h-8 rounded-full bg-gradient-to-br ${s.color} shadow-sm flex items-center justify-center text-white ring-2 ring-white`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span
                        className={`absolute left-1/2 -translate-x-1/2 top-8 w-[2px] ${
                          last ? "hidden" : "block"
                        } bg-gradient-to-b from-emerald-400 via-cyan-400 to-blue-400`}
                        style={{ height: "1rem" }}
                      />
                    </div>

                    <div className="bg-white/90 backdrop-blur rounded-lg ring-1 ring-black/5 shadow-sm px-3.5 py-2">
                      <p className="text-xs sm:text-sm text-gray-700 leading-snug">
                        {s.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Ảnh đeo kính chuyển xuống dưới nội dung */}
            <div className="relative rounded-2xl overflow-hidden bg-white shadow-md ring-1 ring-black/5 mt-2 flex items-center justify-center">
              <img
                src="/images/essilor.jpg"
                alt={messages.goals.campaignImageAlt}
                className="w-full h-auto max-h-[220px] object-cover sm:object-contain"
              />
              <div className="pointer-events-none absolute inset-0 bg-emerald-400/5" />
            </div>
          </div>

          {/* RIGHT 50%: Khi nào nên đưa bé đi khám & 4 dấu hiệu */}
          <div className="flex flex-col justify-between rounded-xl sm:rounded-2xl bg-white/90 backdrop-blur-sm p-3.5 sm:p-6 lg:p-7 shadow-lg ring-1 ring-black/5">
            <div>
              {/* Overline badge */}
              <div className="text-xs sm:text-sm font-bold tracking-wider text-emerald-700 uppercase">
                {messages.goals.signs.badge}
              </div>

              {/* Tiêu đề chính 2 dòng */}
              <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold leading-tight">
                <span className="block text-slate-900">
                  {messages.goals.signs.titleLine1}
                </span>
                <span className="block text-emerald-600">
                  {messages.goals.signs.titleLine2}
                </span>
              </h3>

              {/* Mô tả */}
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {messages.goals.signs.description}
              </p>

              {/* 4 dấu hiệu nhận biết */}
              <div className="mt-4 divide-y divide-gray-100 border-t border-b border-gray-100">
                {messages.goals.signs.items.map((item, index) => (
                  <div key={index} className="py-3 flex items-start gap-3.5">
                    <span className="text-sm font-bold text-emerald-600 shrink-0 mt-0.5 font-mono">
                      {item.number}
                    </span>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900">
                        {item.title}
                      </h4>
                      <p className="mt-0.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Nút CTA chuyển xuống dưới theo mũi tên chỉ dẫn */}
            <div className="mt-5 pt-2">
              <button
                type="button"
                onClick={scrollToBooking}
                className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-emerald-700 hover:text-emerald-800 transition-colors group cursor-pointer border border-emerald-600/30 hover:border-emerald-600 bg-emerald-50/50 hover:bg-emerald-50 px-4 py-2.5 rounded-xl shadow-sm"
              >
                <span>{messages.goals.signs.cta}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoalsSection;
