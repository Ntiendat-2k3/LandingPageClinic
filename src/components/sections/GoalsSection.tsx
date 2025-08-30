import { AlertTriangle, Eye, AlertCircle, Zap, Droplets } from "lucide-react"
import { useScrollToSection } from "../../hooks/useScrollToSection"
import CTASection from "../ui/CTASection"

const GoalsSection = () => {
  const scrollToSection = useScrollToSection()

  const myopiaStats = [
    { text: "Tăng 4.06 lần nguy cơ bị thoái hóa vòng mạc cận thị", icon: Eye, color: "from-blue-500 to-blue-600" },
    { text: "Tăng 21.5 lần nguy cơ bị bong võng mạc", icon: AlertCircle, color: "from-red-500 to-red-600" },
    { text: "Tăng 5.4 lần nguy cơ bị đục thủy tinh thể", icon: Zap, color: "from-orange-500 to-orange-600" },
    {
      text: "Tăng 2.5 lần nguy cơ bị Glaucoma (cườm nước - glocom)",
      icon: Droplets,
      color: "from-green-500 to-emerald-600",
    },
  ]

  return (
    <section id="goals" className="section-padding bg-white relative">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="bg-red-100 p-3 rounded-full">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-balance">
              CẬN THỊ VÀ BIẾN CHỨNG CỦA CẬN THỊ
            </h2>
          </div>

          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl p-4 shadow-lg inline-block">
            <p className="text-xl font-semibold text-white">ĐANG ĐƯỢC COI LÀ VẤN NAN TOÀN THẾ GIỚI</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Statistics */}
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 border-l-4 border-red-500">
              <p className="text-2xl font-bold text-gray-900 mb-2">2050</p>
              <p className="text-lg font-medium text-gray-800">
                Ước tính có tới <span className="text-red-600 font-bold">50% dân số thế giới</span> mắc cận thị
              </p>
            </div>

            <p className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
              Cận thị cao sẽ tăng nguy cơ:
            </p>

            <div className="space-y-4">
              {myopiaStats.map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 flex items-center gap-4 hover:shadow-xl transition-shadow duration-300"
                  >
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center shadow-md`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-gray-700 leading-relaxed flex-1">{stat.text}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right side - Images */}
          <div className="space-y-8">
            {/* Control Myopia Image */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-4 shadow-lg">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/essilor-lead-632x445-UM9ZNhOw9He7giugufxmaMwyq3jscB.webp"
                alt="Control Myopia Today or Risk Poor Vision Tomorrow"
                className="w-full h-auto rounded-xl"
              />
            </div>

            {/* Retinal Images */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 shadow-xl">
              <div className="bg-black rounded-xl p-4">
                <div className="grid grid-cols-3 gap-2">
                  {["A", "B", "C", "D", "E", "F"].map((label, index) => (
                    <div key={label} className="relative group">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1121.4.RetinalInsider.jpg-sdccLFe63ffXUgcDaZJbVrfCIjPjjv.jpeg"
                        alt={`Retinal scan ${label}`}
                        className="w-full h-20 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                        style={{
                          objectPosition: `${(index % 3) * 33.33}% ${Math.floor(index / 3) * 50}%`,
                        }}
                      />
                      <div className="absolute -top-1 -left-1 bg-white text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-white text-sm text-center mt-3 font-medium">Hình ảnh võng mạc bị tổn thương</p>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <CTASection
            title="Bảo vệ thị lực của bạn ngay hôm nay"
            description="Đừng để cận thị phát triển thành những biến chứng nghiêm trọng. Hãy đến khám và tư vấn với các chuyên gia của chúng tôi."
            primaryButtonText="Đặt lịch khám ngay"
            secondaryButtonText="T��m hiểu thêm"
            variant="gradient"
            onPrimaryClick={() => scrollToSection("booking")}
            onSecondaryClick={() => scrollToSection("services")}
          />
        </div>
      </div>
    </section>
  )
}

export default GoalsSection
