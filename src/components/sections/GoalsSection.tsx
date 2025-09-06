"use client";

import { AlertTriangle, Eye, AlertCircle, Zap, Droplets } from "lucide-react";

const GoalsSection = () => {
  const myopiaStats = [
    {
      text: "Tăng 4.06 lần nguy cơ bị thoái hóa võng mạc cận thị",
      icon: Eye,
      color: "from-blue-500 to-blue-600",
    },
    {
      text: "Tăng 21.5 lần nguy cơ bị bong võng mạc",
      icon: AlertCircle,
      color: "from-red-500 to-red-600",
    },
    {
      text: "Tăng 5.4 lần nguy cơ bị đục thủy tinh thể",
      icon: Zap,
      color: "from-orange-500 to-orange-600",
    },
    {
      text: "Tăng 2.5 lần nguy cơ bị Glaucoma (cườm nước - glocom)",
      icon: Droplets,
      color: "from-green-500 to-emerald-600",
    },
  ];

  return (
    <section
      id="goals"
      className="relative section-padding overflow-hidden"
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

      <div className="container mx-auto container-padding relative">
        {/* Header */}
        <div className="text-center mb-8 md:mb-14">
          <h2 className="mt-2 block items-center gap-3 text-[28px] leading-tight md:text-4xl font-extrabold text-gray-900">
            <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </span>
            CẬN THỊ VÀ BIẾN CHỨNG CỦA CẬN THỊ
          </h2>

          <div className="mt-4 inline-block rounded-xl px-5 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold text-[15px] lg:text-lg md:text-2xl shadow">
            ĐANG ĐƯỢC COI LÀ VẤN NẠN TOÀN CẦU
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left – Stats */}
          <div className="space-y-6">
            <div className="rounded-2xl p-5 bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 shadow">
              <p className="text-2xl font-extrabold text-gray-900">2050</p>
              <p className="mt-1 text-base md:text-lg font-medium text-gray-800">
                Ước tính có tới{" "}
                <span className="text-red-600 font-bold">
                  50% dân số thế giới
                </span>{" "}
                mắc cận thị
              </p>
            </div>

            <p className="text-sm md:text-base font-semibold text-gray-800">
              Cận thị cao sẽ tăng nguy cơ:
            </p>

            <div className="flex flex-col gap-4 lg:gap-8">
              {myopiaStats.map((s, i) => {
                const Icon = s.icon;
                const last = i === myopiaStats.length - 1;
                return (
                  <div
                    key={i}
                    className="grid grid-cols-[60px_1fr] items-center gap-3"
                  >
                    {/* ICON + line */}
                    <div className="relative flex justify-center">
                      <div
                        className={`z-10 w-12 h-12 rounded-full bg-gradient-to-br ${s.color} shadow-md flex items-center justify-center text-white ring-4 ring-white`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <span
                        className={`absolute left-1/2 -translate-x-1/2 top-12 w-[3px] ${
                          last ? "hidden" : "block"
                        } bg-gradient-to-b from-emerald-400 via-cyan-400 to-blue-400`}
                        style={{ height: "2.25rem" }}
                      />
                    </div>

                    {/* CARD */}
                    <div className="bg-white/90 backdrop-blur rounded-xl ring-1 ring-black/5 shadow px-4 py-3">
                      <p className="text-[16px] md:text-lg text-gray-700 leading-relaxed">
                        {s.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right – Images */}
          <div className="space-y-6">
            {/* Ảnh thông điệp Essilor */}
            <div className="relative max-w-xl md:max-w-2xl mx-auto lg:mx-0">
              <div className="absolute -inset-1 rounded-[22px] bg-gradient-to-br from-emerald-400/40 via-cyan-400/40 to-blue-400/30 blur-md" />
              <div className="relative rounded-2xl overflow-hidden bg-white shadow-2xl rotate-1 md:rotate-0">
                <img
                  src="/images/essilor.jpg"
                  alt="Control Myopia Today or Risk Poor Vision Tomorrow"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Ảnh võng mạc: CHỈ 1 ẢNH */}
            <div className="rounded-2xl p-5 bg-gradient-to-br from-gray-900 to-black shadow-xl">
              <div className="rounded-xl overflow-hidden bg-black">
                <img
                  src="/images/retinalInsider.jpg"
                  alt="Hình ảnh võng mạc bị tổn thương"
                  className="w-full h-auto object-contain md:object-cover"
                />
              </div>
              <p className="text-white/90 text-sm text-center mt-3 font-medium">
                Hình ảnh võng mạc bị tổn thương
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoalsSection;
