"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { messages } from "@/i18n";

/**
 * Section Quy trình khám: Gia đình sẽ nhận được gì sau buổi khám?
 * Hiển thị thông điệp cam kết cùng 6 bước/quyền lợi rõ ràng cho phụ huynh.
 */
export default function ProcessSection() {
  const scrollToSection = useScrollToSection();

  return (
    <section
      id="process"
      className="relative py-14 sm:py-18 lg:py-24 bg-gradient-to-b from-white via-emerald-50/20 to-white overflow-hidden"
    >
      <div className="container mx-auto px-2.5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Cột trái: Tiêu đề và nút kêu gọi hành động */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="inline-block text-xs sm:text-sm font-bold tracking-wider text-emerald-700 uppercase mb-2">
              {messages.process.badge}
            </div>

            <h2 className="font-space-grotesk text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold leading-tight text-slate-900">
              {messages.process.title}
            </h2>

            <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-md">
              {messages.process.description}
            </p>

            <div className="mt-8">
              <Button
                type="button"
                size="lg"
                onClick={() => scrollToSection("booking")}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl px-6 py-6 shadow-md hover:shadow-lg transition-all group cursor-pointer"
              >
                <span>{messages.process.cta}</span>
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* Cột phải: Danh sách 6 quyền lợi/bước quy trình */}
          <div className="lg:col-span-7 bg-white/90 rounded-xl sm:rounded-3xl p-3.5 sm:p-8 lg:p-10 shadow-sm ring-1 ring-black/5 divide-y divide-gray-100">
            {messages.process.steps.map((step, index) => (
              <div
                key={index}
                className="py-5 sm:py-6 first:pt-0 last:pb-0 flex items-start gap-4 sm:gap-6"
              >
                <span className="font-mono text-base sm:text-lg font-extrabold text-emerald-700 shrink-0 mt-0.5">
                  {step.number}
                </span>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm sm:text-base text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
