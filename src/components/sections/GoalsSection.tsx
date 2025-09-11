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
      className="
        relative overflow-hidden
        section-padding
        lg:h-[100svh] lg:min-h-[100svh] lg:max-h-[100svh] lg:py-0
      "
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

      {/* Container full-height ở LG+ */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative flex flex-col lg:h-full">
        {/* Header (tăng size chữ) */}
        <div className="text-center mb-4 lg:mb-4 shrink-0">
          <h2 className="mt-2 inline-flex items-center gap-3 text-[30px] leading-tight md:text-[42px] lg:text-[48px] font-extrabold text-gray-900">
            <span className="inline-flex w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-red-600" />
            </span>
            CẬN THỊ VÀ BIẾN CHỨNG CỦA CẬN THỊ
          </h2>

          <div className="block"></div>
          <div className="my-2 inline-block rounded-xl px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold text-base md:text-2xl lg:text-[22px] shadow">
            ĐANG ĐƯỢC COI LÀ VẤN NẠN TOÀN CẦU
          </div>
        </div>

        {/* Grid chiếm phần còn lại */}
        <div className="mt-3 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-6 items-stretch flex-1 min-h-0">
          {/* LEFT 50% */}
          <div className="space-y-4 lg:space-y-4 overflow-visible min-h-0">
            <div className="rounded-2xl p-4 lg:p-4 bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 shadow">
              <p className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900">
                2050
              </p>
              <p className="mt-1 text-base md:text-xl lg:text-[20px] font-medium text-gray-800">
                Ước tính có tới{" "}
                <span className="text-red-600 font-bold">
                  50% dân số thế giới
                </span>{" "}
                mắc cận thị
              </p>
            </div>

            <p className="text-base md:text-lg lg:text-[20px] font-semibold text-gray-800">
              Cận thị cao sẽ tăng nguy cơ:
            </p>

            <div className="flex flex-col gap-3 lg:gap-3 min-h-0">
              {myopiaStats.map((s, i) => {
                const Icon = s.icon;
                const last = i === myopiaStats.length - 1;
                return (
                  <div
                    key={i}
                    className="grid grid-cols-[48px_1fr] items-center gap-3"
                  >
                    {/* ICON + line */}
                    <div className="relative flex justify-center">
                      <div
                        className={`z-10 w-11 h-11 rounded-full bg-gradient-to-br ${s.color} shadow-md flex items-center justify-center text-white ring-4 ring-white`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span
                        className={`absolute left-1/2 -translate-x-1/2 top-11 w-[3px] ${
                          last ? "hidden" : "block"
                        } bg-gradient-to-b from-emerald-400 via-cyan-400 to-blue-400 lg:from-emerald-400/90 lg:via-cyan-400/90 lg:to-blue-400/90`}
                        style={{ height: "1.5rem" }}
                      />
                    </div>

                    <div className="bg-white/90 backdrop-blur rounded-xl ring-1 ring-black/5 shadow px-4 py-3 lg:px-5 lg:py-3.5">
                      <p className="text-base md:text-lg lg:text-[19px] text-gray-700 leading-relaxed">
                        {s.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT 50% – 2 ảnh xếp dọc */}
          <div className="grid lg:grid-rows-2 gap-4 lg:gap-4 h-full min-h-0">
            {/* Ảnh trên */}
            <div className="relative rounded-2xl overflow-hidden bg-white shadow-2xl ring-1 ring-black/5 min-h-[220px] sm:min-h-[260px] lg:min-h-0 h-full flex items-center justify-center">
              <img
                src="/images/essilor.jpg"
                alt="Control Myopia Today or Risk Poor Vision Tomorrow"
                className="block w-auto h-auto max-h-full
                           max-w-[95%] sm:max-w-[92%] lg:max-w-[80%] xl:max-w-[72%]
                           object-contain"
              />
              <div className="pointer-events-none absolute inset-0 rounded-[22px] bg-emerald-400/10 blur-md" />
            </div>

            {/* Ảnh dưới + caption bên dưới */}
            <div className="relative h-full min-h-[220px] sm:min-h-[260px] lg:min-h-0 flex flex-col">
              <div className="relative rounded-2xl overflow-hidden bg-black shadow-xl ring-1 ring-black/5 flex-1 flex items-center justify-center">
                <img
                  src="/images/retinalInsider.jpg"
                  alt="Hình ảnh võng mạc bị tổn thương"
                  className="block w-auto h-auto max-h-full
                             max-w-[95%] sm:max-w-[92%] lg:max-w-[80%] xl:max-w-[72%]
                             object-contain"
                />
              </div>
              <div className="mt-2 text-center">
                <span className="inline-block px-3 py-1 rounded-full bg-white/90 text-gray-900 text-sm sm:text-base lg:text-[16px] font-medium shadow">
                  Hình ảnh võng mạc bị tổn thương
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoalsSection;
