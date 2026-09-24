import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Ruler,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { messages } from "@/i18n";

/**
 * Section cảnh báo tiến triển cận thị kết hợp thẻ đánh giá nguy cơ trực tuyến.
 * Thiết kế phong cách phòng khám chuyên khoa mắt hiện đại, bố cục Bento cân xứng, êm dịu cho thị giác.
 */
const ProgressionAssessmentSection = () => {
  return (
    <section
      id="when-to-visit"
      aria-label={messages.app.riskAssessment.ariaLabel}
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-teal-50/20 to-white py-10 sm:py-14 lg:py-16"
    >
      {/* Background họa tiết sóng khúc xạ quang học tinh tế */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="150"
            cy="300"
            r="220"
            stroke="#10B981"
            strokeWidth="1"
            strokeDasharray="4 6"
            opacity="0.25"
          />
          <circle
            cx="150"
            cy="300"
            r="320"
            stroke="#06B6D4"
            strokeWidth="1"
            strokeDasharray="6 8"
            opacity="0.18"
          />
          <circle
            cx="1050"
            cy="150"
            r="260"
            stroke="#059669"
            strokeWidth="1"
            strokeDasharray="4 8"
            opacity="0.2"
          />
        </svg>
      </div>

      <div className="container relative z-10 mx-auto px-2.5 sm:px-6 lg:px-8" id="risk-assessment">
        {/* Unified Clinical Bento Card */}
        <div className="rounded-xl sm:rounded-3xl bg-white/90 backdrop-blur-md border border-emerald-100/90 shadow-xl shadow-emerald-950/5 p-3.5 sm:p-6 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">
            {/* Cột trái: Cảnh báo y khoa & Phân tích chuyên môn (7 cols) */}
            <div className="lg:col-span-7 space-y-3.5 sm:space-y-5">
              {/* Badge nhận diện chuyên khoa có hiệu ứng radar pulse nhẹ */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/70">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
                </span>
                <span>{messages.app.progressionWarning.badge}</span>
              </div>

              {/* Tiêu đề cảnh báo */}
              <h2 className="font-space-grotesk text-xl sm:text-3xl lg:text-[34px] font-extrabold leading-tight tracking-tight">
                <span className="block text-slate-900">
                  {messages.app.progressionWarning.titleLine1}
                </span>
                <span className="block text-emerald-600 mt-1">
                  {messages.app.progressionWarning.titleLine2}
                </span>
              </h2>

              {/* Đoạn mô tả */}
              <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
                {messages.app.progressionWarning.description}
              </p>

              {/* 3 tiêu chí theo dõi y khoa */}
              <div className="pt-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg sm:rounded-xl bg-slate-50/90 border border-slate-100 text-slate-700 text-xs font-medium">
                  <Ruler className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
                  <span>{messages.app.progressionWarning.feature1}</span>
                </div>
                <div className="flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg sm:rounded-xl bg-slate-50/90 border border-slate-100 text-slate-700 text-xs font-medium">
                  <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
                  <span>{messages.app.progressionWarning.feature2}</span>
                </div>
                <div className="flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg sm:rounded-xl bg-slate-50/90 border border-slate-100 text-slate-700 text-xs font-medium">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
                  <span>{messages.app.progressionWarning.feature3}</span>
                </div>
              </div>
            </div>

            {/* Cột phải: Thẻ hành động làm bài đánh giá (5 cols) */}
            <div className="lg:col-span-5">
              <div className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-50/80 via-teal-50/40 to-slate-50/80 border border-emerald-200/80 p-3.5 sm:p-5 lg:p-7 shadow-sm flex flex-col justify-between relative overflow-hidden">
                {/* Ánh sáng trang trí mờ ở góc */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-200/30 rounded-full blur-2xl pointer-events-none" />

                <div className="space-y-2.5 sm:space-y-3 relative z-10">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-md text-[11px] sm:text-[11.5px] font-bold tracking-wide uppercase bg-emerald-600/10 text-emerald-700">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{messages.app.riskAssessment.badge}</span>
                  </div>

                  <h3 className="font-space-grotesk text-base sm:text-xl font-bold text-slate-900 leading-snug">
                    {messages.app.riskAssessment.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed">
                    {messages.app.riskAssessment.description}
                  </p>

                  {/* Các nhãn cam kết tiện ích */}
                  <div className="pt-1 flex flex-wrap gap-1.5 text-[11px] sm:text-[11.5px] text-slate-600">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-emerald-100 shadow-2xs font-medium">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      {messages.app.riskAssessment.timePill}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-emerald-100 shadow-2xs font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      {messages.app.riskAssessment.freePill}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-emerald-100 shadow-2xs font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      {messages.app.riskAssessment.instantPill}
                    </span>
                  </div>
                </div>

                {/* Nút hành động CTA */}
                <div className="pt-4 sm:pt-6 relative z-10">
                  <a
                    href="/danh-gia-nguy-co-can-thi/"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-full font-bold text-sm sm:text-base text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 bg-[length:200%_auto] hover:bg-right transition-all duration-300 shadow-md shadow-emerald-600/25 hover:shadow-lg hover:shadow-emerald-600/35 hover:-translate-y-0.5 active:translate-y-0 group"
                  >
                    <span>{messages.app.riskAssessment.button}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgressionAssessmentSection;
