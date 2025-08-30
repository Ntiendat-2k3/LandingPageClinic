"use client"

import { Eye, Glasses, Zap, Baby, Stethoscope, Shield, Activity, Target } from "lucide-react"
import { useScrollToSection } from "../../hooks/useScrollToSection"

const ServicesSection = () => {
  const scrollToSection = useScrollToSection()

  const servicePackages = [
    {
      icon: Eye,
      title: "Gói khám tổng quan",
      position: "top-left",
      delay: "0s",
    },
    {
      icon: Target,
      title: "Atropine nồng độ thấp 0.01%, 0.025% và 0.05%",
      position: "top-right",
      delay: "0.5s",
    },
    {
      icon: Activity,
      title: "Gói khám kiểm soát tật khúc xạ",
      position: "middle-left",
      delay: "1s",
    },
    {
      icon: Glasses,
      title: "Trong kính kiểm soát cận thị Myopcare, Stellest",
      position: "middle-right",
      delay: "1.5s",
    },
    {
      icon: Shield,
      title: "Gói khám kính áp tròng ban đêm Ortho-K",
      position: "bottom-left",
      delay: "2s",
    },
    {
      icon: Zap,
      title: "Kính áp tròng ban đêm Ortho-K",
      position: "bottom-right",
      delay: "2.5s",
    },
    {
      icon: Stethoscope,
      title: "Đo trục nhãn cầu",
      position: "top-center-left",
      delay: "3s",
    },
    {
      icon: Baby,
      title: "Lăng kính và tập luyện điều chỉnh lác/phục hồi thị lực",
      position: "top-center-right",
      delay: "3.5s",
    },
  ]

  const myahSteps = [
    {
      number: "1",
      title: "Khám, tầm soát cận thị trên máy MYAH, bác sĩ chỉ định điều trị",
      color: "from-cyan-300 to-blue-400",
    },
    {
      number: "2",
      title: "Lựa chọn phương pháp điều trị, với mục tiêu trẻ của máy MYAH",
      color: "from-blue-300 to-indigo-400",
    },
    {
      number: "3",
      title: "Theo dõi hiệu quả điều trị và tiến triển cận thị mỗi 3 tháng",
      color: "from-indigo-300 to-purple-400",
    },
    {
      number: "4",
      title: "Tiếp tục theo dõi định kỳ tối ưu ổn định hoặc điều chỉnh phương pháp khác",
      color: "from-purple-300 to-pink-400",
    },
  ]

  return (
    <section
      id="services"
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "rgb(236, 252, 247)" }}
    >
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .float-animation {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>

      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full border-2 border-emerald-300"></div>
        <div className="absolute top-20 right-20 w-24 h-24 rounded-full border-2 border-emerald-300"></div>
        <div className="absolute bottom-20 left-20 w-28 h-28 rounded-full border-2 border-emerald-300"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 rounded-full border-2 border-emerald-300"></div>
      </div>

      <div className="container mx-auto container-padding relative z-10">
        <div className="text-center mb-16">
          <div className="mb-8">
            <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold text-black mb-4">
              CHƯƠNG TRÌNH ĐỘC QUYỀN, DUY NHẤT TẠI HÀ NỘI
            </h2>
            <p className="text-xl md:text-2xl text-black font-semibold">"ĐẢM BẢO KIỂM SOÁT TIẾN TRIỂN CẬN THỊ"</p>
            <p className="text-lg md:text-xl text-black mt-2">XOÁ TAN NỖI LO TĂNG ĐỘ CẬN</p>
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Service packages positioned around the edges */}
          <div className="absolute inset-0 z-20">
            {servicePackages.map((pkg, index) => {
              const Icon = pkg.icon
              let positionClasses = ""

              switch (pkg.position) {
                case "top-left":
                  positionClasses = "top-0 left-0 -translate-x-1/2 -translate-y-1/2"
                  break
                case "top-right":
                  positionClasses = "top-0 right-0 translate-x-1/2 -translate-y-1/2"
                  break
                case "top-center-left":
                  positionClasses = "top-0 left-1/3 -translate-x-1/2 -translate-y-1/2"
                  break
                case "top-center-right":
                  positionClasses = "top-0 right-1/3 translate-x-1/2 -translate-y-1/2"
                  break
                case "middle-left":
                  positionClasses = "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2"
                  break
                case "middle-right":
                  positionClasses = "top-1/2 right-0 translate-x-1/2 -translate-y-1/2"
                  break
                case "bottom-left":
                  positionClasses = "bottom-0 left-0 -translate-x-1/2 translate-y-1/2"
                  break
                case "bottom-right":
                  positionClasses = "bottom-0 right-0 translate-x-1/2 translate-y-1/2"
                  break
              }

              return (
                <div
                  key={index}
                  className={`absolute ${positionClasses} w-48 h-48 bg-white rounded-full shadow-lg border-3 border-emerald-100 flex flex-col items-center justify-center p-4 hover:scale-105 transition-transform duration-300 cursor-pointer float-animation`}
                  style={{ animationDelay: pkg.delay }}
                  onClick={() => scrollToSection("booking")}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-300 to-emerald-400 rounded-full flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-black text-center leading-tight">{pkg.title}</p>
                </div>
              )
            })}
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8 mx-auto max-w-2xl relative z-10 mt-24 mb-24">
            {/* Medical equipment image placeholder */}
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-8 mb-8 text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Eye className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Phòng khám chuyên khoa Mắt & Khúc xạ</h3>
              <p className="text-black">Dr Trần Tuấn</p>
            </div>

            {/* MYAH Process Steps */}
            <div className="mb-6">
              <h4 className="text-lg font-bold text-center text-black mb-6">
                Quy trình khám và kiểm soát cận thị bằng máy MYAH
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {myahSteps.map((step, index) => (
                  <div key={index} className="text-center">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-md`}
                    >
                      <span className="text-2xl font-bold text-white">{step.number}</span>
                    </div>
                    <p className="text-xs text-black leading-tight">{step.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <button
            onClick={() => scrollToSection("booking")}
            className="bg-emerald-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 hover:bg-emerald-600 transition-all duration-300"
          >
            Đặt lịch khám ngay
          </button>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
