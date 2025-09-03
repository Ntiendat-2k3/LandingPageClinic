"use client";

import {
  ArrowRight,
  Star,
  Users,
  Award,
  Clock,
  Shield,
  Eye,
} from "lucide-react";

const HeroSection = () => {
  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const pills = [
    "Kiểm soát cận thị",
    "Ortho-K ban đêm",
    "Atropine liều thấp",
    "Tròng kiểm soát cận",
    "Điều chỉnh lác",
  ];

  return (
    <section className="relative min-h-[100svh] flex items-center bg-gradient-to-b from-emerald-50 to-cyan-50 overflow-hidden">
      {/* BG blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -left-24 w-72 h-72 rounded-full bg-emerald-300/30 blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-cyan-300/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-blue-300/20 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14 lg:py-20 relative overflow-x-clip">
        {/* overflow-x-clip để chặn mọi tràn ngang ngoài ý muốn */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left: Content */}
          <div className="order-2 lg:order-1">
            {/* chip */}
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/80 backdrop-blur supports-[backdrop-filter]:backdrop-blur-md shadow ring-1 ring-black/5 text-emerald-700 text-sm font-semibold">
              <Award className="w-4 h-4" />
              Chăm sóc đôi mắt toàn diện
            </div>

            {/* headline */}
            <h1 className="mt-4 font-space-grotesk text-[34px] leading-tight md:text-5xl font-extrabold text-gray-900">
              PHÒNG KHÁM CHUYÊN{" "}
              <span className="bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                KHOA MẮT
              </span>{" "}
              &{" "}
              <span className="bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                KHÚC XẠ
              </span>
              <br />
              DR TRẦN TUẤN
            </h1>

            {/* sub */}
            <p className="mt-3 text-[15px] md:text-lg text-gray-600">
              KIỂM SOÁT CẬN THỊ – ĐIỀU CHỈNH LÁC KHÔNG PHẪU THUẬT. Ứng dụng các
              phương pháp tiên tiến hàng đầu, đội ngũ chuyên gia giàu kinh
              nghiệm, chính sách bảo đảm hiệu quả độc quyền tại Hà Nội.
            </p>

            {/* pills — KHÔNG cuộn, cho xuống dòng */}
            <div className="mt-5 flex flex-wrap gap-2">
              {pills.map((p) => (
                <span
                  key={p}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white text-emerald-700 ring-1 ring-black/5 shadow-sm"
                >
                  {p}
                </span>
              ))}
            </div>

            {/* stats — KHÔNG cuộn, dùng grid trên mobile */}
            <div className="mt-6 lg:mt-8">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-6">
                {[
                  {
                    icon: <Users className="w-5 h-5 text-cyan-600" />,
                    val: "10K+",
                    txt: "Bệnh nhân điều trị",
                  },
                  {
                    icon: <Star className="w-5 h-5 text-emerald-600" />,
                    val: "97.8%",
                    txt: "Hài lòng",
                  },
                  {
                    icon: <Clock className="w-5 h-5 text-blue-600" />,
                    val: "10+",
                    txt: "Năm kinh nghiệm",
                  },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="bg-white/80 backdrop-blur rounded-2xl px-4 py-3 lg:p-5 ring-1 ring-black/5 shadow"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                        {s.icon}
                      </div>
                      <div>
                        <div className="font-space-grotesk text-2xl font-bold text-gray-900">
                          {s.val}
                        </div>
                        <div className="text-sm text-gray-600">{s.txt}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6 lg:mt-8">
              <button
                onClick={scrollToContact}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-white font-semibold bg-gradient-to-r from-cyan-600 to-emerald-600 shadow-[0_12px_30px_rgba(16,185,129,0.35)] active:scale-[.99]"
              >
                Đăng kí miễn phí nhận ưu đãi 50%
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right: Image */}
          <div className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-sm sm:max-w-md">
              <div className="absolute -inset-1 rounded-[28px] bg-gradient-to-br from-emerald-400/50 via-cyan-400/50 to-blue-400/40 blur-md" />
              <div className="relative rounded-[24px] overflow-hidden bg-white shadow-2xl rotate-2 lg:rotate-0">
                <img
                  src="/images/section1.jpg"
                  alt="Phòng khám mắt hiện đại"
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="absolute -left-3 -top-3 bg-white rounded-xl shadow p-2 flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-semibold text-gray-800">
                  Bảo đảm hiệu quả
                </span>
              </div>
              <div className="absolute -right-3 bottom-10 bg-white rounded-full shadow p-2">
                <Eye className="w-5 h-5 text-cyan-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
