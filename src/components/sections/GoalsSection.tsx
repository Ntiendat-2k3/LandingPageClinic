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
      className="relative overflow-hidden section-padding lg:min-h-[100svh] lg:py-6"
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

      <div className="container mx-auto container-padding relative flex flex-col lg:min-h-[100svh] lg:py-0">
        {/* Header (không chiếm chỗ quá lớn) */}
        <div className="text-center mb-4 lg:mb-6 shrink-0">
          <h2 className="mt-2 block items-center gap-3 text-[26px] leading-tight md:text-4xl font-extrabold text-gray-900">
            <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </span>
            CẬN THỊ VÀ BIẾN CHỨNG CỦA CẬN THỊ
          </h2>

          <div className="mt-3 inline-block rounded-xl px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold text-[15px] md:text-xl shadow">
            ĐANG ĐƯỢC COI LÀ VẤN NẠN TOÀN CẦU
          </div>
        </div>

        {/* Grid chiếm phần còn lại để đủ full height */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch flex-1 min-h-0">
          {/* LEFT 50% */}
          <div className="space-y-5 overflow-visible">
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

            <div className="flex flex-col gap-4 lg:gap-5">
              {myopiaStats.map((s, i) => {
                const Icon = s.icon;
                const last = i === myopiaStats.length - 1;
                return (
                  <div
                    key={i}
                    className="grid grid-cols-[56px_1fr] items-center gap-3"
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
                        style={{ height: "1.75rem" }}
                      />
                    </div>

                    <div className="bg-white/90 backdrop-blur rounded-xl ring-1 ring-black/5 shadow px-4 py-3">
                      <p className="text-[15px] md:text-[16px] text-gray-700 leading-relaxed">
                        {s.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT 50% – 2 ảnh xếp dọc, FULL ảnh, lấp đầy chiều cao còn lại */}
          <div className="grid lg:grid-rows-2 gap-5 lg:gap-6 h-full min-h-0">
            {/* Ảnh trên */}
            <div className="relative rounded-2xl overflow-hidden bg-white shadow-2xl ring-1 ring-black/5 min-h-[220px] h-full">
              <img
                src="/images/essilor.jpg"
                alt="Control Myopia Today or Risk Poor Vision Tomorrow"
                className="absolute inset-0 w-full h-full object-contain"
              />
              <div className="pointer-events-none absolute -inset-1 rounded-[22px] bg-gradient-to-br from-emerald-400/25 via-cyan-400/20 to-blue-400/15 blur-md" />
            </div>

            {/* Ảnh dưới */}
            <div className="relative rounded-2xl overflow-hidden bg-black shadow-xl ring-1 ring-black/5 min-h-[220px] h-full">
              <img
                src="/images/retinalInsider.jpg"
                alt="Hình ảnh võng mạc bị tổn thương"
                className="absolute inset-0 w-full h-full object-contain"
              />
              <div className="absolute left-1/2 -translate-x-1/2 bottom-3 px-3 py-1 rounded-full bg-white/90 text-gray-900 text-xs sm:text-sm font-medium shadow">
                Hình ảnh võng mạc bị tổn thương
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoalsSection;
