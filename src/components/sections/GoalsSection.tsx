"use client";

import { AlertTriangle, Eye, AlertCircle, Zap, Droplets } from "lucide-react";
import { useScrollToSection } from "../../hooks/useScrollToSection";
import CTASection from "../ui/CTASection";

const GoalsSection = () => {
  const scrollToSection = useScrollToSection();

  const myopiaStats = [
    {
      text: "Tăng 4.06 lần nguy cơ bị thoái hóa vòng mạc cận thị",
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
      {/* décor blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-emerald-300/30 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-blue-300/20 blur-3xl" />
      </div>

      <div className="container mx-auto container-padding relative">
        {/* Header */}
        <div className="text-center mb-8 md:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white font-semibold shadow">
            <AlertTriangle className="w-4 h-4" />
            Cận thị & biến chứng
          </div>

          <h2 className="mt-4 text-[28px] leading-tight md:text-4xl font-extrabold text-gray-900">
            CẬN THỊ VÀ BIẾN CHỨNG CỦA CẬN THỊ
          </h2>

          <div className="mt-3 inline-block rounded-xl px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold shadow">
            ĐANG ĐƯỢC COI LÀ VẤN NẠN TOÀN CẦU
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left – Stats & Timeline */}
          <div className="space-y-6">
            {/* Year card */}
            <div className="rounded-2xl p-5 bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 shadow">
              <p className="text-2xl font-extrabold text-gray-900">2050</p>
              <p className="mt-1 text-[15px] md:text-lg font-medium text-gray-800">
                Ước tính có tới{" "}
                <span className="text-red-600 font-bold">
                  50% dân số thế giới
                </span>{" "}
                mắc cận thị
              </p>
            </div>

            <p className="text-sm md:text-base font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-red-500 rounded-full" />
              Cận thị cao sẽ tăng nguy cơ:
            </p>

            {/* === Vertical Process: icon trái – text phải, cân đối desktop === */}
            <div className="relative lg:min-h-[600px]">
              {/* LINE: chạy dưới icon, full chiều cao của block; desktop dài hơn nhờ min-h */}
              <div
                className="
      pointer-events-none absolute left-[28px] top-0 bottom-0
      w-[3px] rounded-full
      bg-gradient-to-b from-emerald-400 via-cyan-400 to-blue-400
      z-0
    "
              />

              {/* ITEMS: mobile xếp bình thường; desktop giãn đều theo chiều cao */}
              <div className="flex flex-col gap-4 lg:gap-12 lg:h-full lg:justify-between">
                {myopiaStats.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div
                      key={i}
                      className="grid grid-cols-[56px_1fr] gap-3 items-center"
                    >
                      {/* ICON: canh giữa đúng tâm line, nằm trên line */}
                      <div className="relative z-10 flex justify-center">
                        <div
                          className={`w-12 h-12 rounded-full bg-gradient-to-br ${s.color} shadow-md flex items-center justify-center text-white ring-4 ring-white`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                      </div>

                      {/* CARD: nội dung bên phải */}
                      <div className="bg-white/90 backdrop-blur rounded-xl ring-1 ring-black/5 shadow px-4 py-3">
                        <p className="text-gray-700 leading-relaxed">
                          {s.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right – Images */}
          <div className="space-y-6">
            {/* Top image card with gradient ring */}
            <div className="relative max-w-md mx-auto lg:mx-0">
              <div className="absolute -inset-1 rounded-[22px] bg-gradient-to-br from-emerald-400/40 via-cyan-400/40 to-blue-400/30 blur-md" />
              <div className="relative rounded-2xl overflow-hidden bg-white shadow-2xl rotate-1 md:rotate-0">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/essilor-lead-632x445-UM9ZNhOw9He7giugufxmaMwyq3jscB.webp"
                  alt="Control Myopia Today or Risk Poor Vision Tomorrow"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Retinal gallery */}
            <div className="rounded-2xl p-5 bg-gradient-to-br from-gray-900 to-black shadow-xl">
              <div className="rounded-xl p-3 bg-black">
                <div className="grid grid-cols-3 gap-2">
                  {["A", "B", "C", "D", "E", "F"].map((label, index) => (
                    <div key={label} className="relative group">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1121.4.RetinalInsider.jpg-sdccLFe63ffXUgcDaZJbVrfCIjPjjv.jpeg"
                        alt={`Retinal scan ${label}`}
                        className="w-full h-20 object-cover rounded-lg transition-transform duration-300 md:group-hover:scale-105"
                        style={{
                          objectPosition: `${(index % 3) * 33.33}% ${
                            Math.floor(index / 3) * 50
                          }%`,
                        }}
                      />
                      <div className="absolute -top-1 -left-1 bg-white text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-white/90 text-sm text-center mt-3 font-medium">
                Hình ảnh võng mạc bị tổn thương
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 md:mt-16">
          <CTASection
            title="Bảo vệ thị lực của bạn ngay hôm nay"
            description="Đừng để cận thị phát triển thành những biến chứng nghiêm trọng. Hãy đến khám và tư vấn với các chuyên gia của chúng tôi."
            primaryButtonText="Đăng kí miễn phí nhận ưu đãi 50%"
            secondaryButtonText="Tìm hiểu thêm"
            variant="gradient"
            onPrimaryClick={() => scrollToSection("booking")}
            onSecondaryClick={() => scrollToSection("services")}
          />
        </div>
      </div>
    </section>
  );
};

export default GoalsSection;
