import {
  Calendar,
  UserCheck,
  Stethoscope,
  FileText,
  Heart,
  Phone,
} from "lucide-react";

const ProcessSection = () => {
  const steps = [
    {
      icon: Calendar,
      title: "Đặt lịch hẹn",
      description:
        "Gọi điện hoặc đặt lịch online, chọn thời gian phù hợp với lịch trình của bạn",
      details: ["Đặt lịch 24/7", "Xác nhận nhanh chóng", "Nhắc lịch tự động"],
      color: "cyan",
    },
    {
      icon: UserCheck,
      title: "Tiếp đón & đăng ký",
      description:
        "Đội ngũ lễ tân thân thiện sẽ hướng dẫn bạn hoàn tất thủ tục khám",
      details: [
        "Thủ tục nhanh gọn",
        "Hướng dẫn chi tiết",
        "Không gian thoải mái",
      ],
      color: "emerald",
    },
    {
      icon: Stethoscope,
      title: "Khám & chẩn đoán",
      description:
        "Bác sĩ chuyên khoa thực hiện khám chi tiết với thiết bị hiện đại",
      details: [
        "Khám toàn diện",
        "Thiết bị hiện đại",
        "Bác sĩ giàu kinh nghiệm",
      ],
      color: "blue",
    },
    {
      icon: FileText,
      title: "Tư vấn & kế hoạch",
      description:
        "Nhận kết quả chi tiết và kế hoạch điều trị phù hợp với tình trạng của bạn",
      details: [
        "Giải thích rõ ràng",
        "Kế hoạch cá nhân hóa",
        "Tư vấn chi tiết",
      ],
      color: "purple",
    },
    {
      icon: Heart,
      title: "Điều trị & chăm sóc",
      description:
        "Thực hiện điều trị theo kế hoạch với sự theo dõi sát sao của đội ngũ y tế",
      details: ["Điều trị an toàn", "Theo dõi sát sao", "Hỗ trợ 24/7"],
      color: "pink",
    },
    {
      icon: Phone,
      title: "Theo dõi sau điều trị",
      description:
        "Chăm sóc và theo dõi tình trạng sức khỏe mắt định kỳ sau điều trị",
      details: ["Tái khám định kỳ", "Tư vấn từ xa", "Hỗ trợ lâu dài"],
      color: "orange",
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      cyan: "bg-cyan-100 text-cyan-600 border-cyan-200",
      emerald: "bg-emerald-100 text-emerald-600 border-emerald-200",
      blue: "bg-blue-100 text-blue-600 border-blue-200",
      purple: "bg-purple-100 text-purple-600 border-purple-200",
      pink: "bg-pink-100 text-pink-600 border-pink-200",
      orange: "bg-orange-100 text-orange-600 border-orange-200",
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.cyan;
  };

  // const getLineColor = (color: string) => {
  //   const colorMap = {
  //     cyan: "bg-cyan-300",
  //     emerald: "bg-emerald-300",
  //     blue: "bg-blue-300",
  //     purple: "bg-purple-300",
  //     pink: "bg-pink-300",
  //     orange: "bg-orange-300",
  //   };
  //   return colorMap[color as keyof typeof colorMap] || colorMap.cyan;
  // };

  return (
    <section id="process" className="section-padding bg-white">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Quy trình khám chữa bệnh
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Quy trình khám chữa bệnh được thiết kế khoa học, đảm bảo chất lượng
            dịch vụ và sự hài lòng tối đa cho bệnh nhân.
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-24 left-0 right-0 h-1 bg-gray-200 rounded-full"></div>

            <div className="grid grid-cols-6 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Timeline Dot */}
                  <div
                    className={`absolute top-20 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full border-4 border-white shadow-lg ${getColorClasses(
                      step.color
                    )}`}
                  ></div>

                  {/* Content Card */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 mt-32">
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto ${getColorClasses(
                        step.color
                      )}`}
                    >
                      <step.icon className="w-8 h-8" />
                    </div>

                    <h3 className="font-space-grotesk text-lg font-semibold text-gray-900 mb-3 text-center">
                      {step.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 text-center leading-relaxed">
                      {step.description}
                    </p>

                    <ul className="space-y-1">
                      {step.details.map((detail, detailIndex) => (
                        <li
                          key={detailIndex}
                          className="flex items-center space-x-2 text-xs text-gray-500"
                        >
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-200 rounded-full"></div>

            <div className="space-y-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="relative flex items-start space-x-6"
                >
                  {/* Timeline Dot */}
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${getColorClasses(
                      step.color
                    )} border-4 border-white shadow-lg`}
                  >
                    <step.icon className="w-8 h-8" />
                  </div>

                  {/* Content */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex-1">
                    <h3 className="font-space-grotesk text-xl font-semibold text-gray-900 mb-3">
                      {step.title}
                    </h3>

                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {step.description}
                    </p>

                    <ul className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <li
                          key={detailIndex}
                          className="flex items-center space-x-2 text-sm text-gray-500"
                        >
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-secondary rounded-2xl p-8 md:p-12">
            <h3 className="font-space-grotesk text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Sẵn sàng bắt đầu hành trình chăm sóc mắt?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Quy trình khám chữa bệnh chuyên nghiệp, an toàn và hiệu quả. Hãy
              đặt lịch ngay để trải nghiệm dịch vụ tốt nhất.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">Đặt lịch khám ngay</button>
              <button className="btn-secondary">Tư vấn qua điện thoại</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
