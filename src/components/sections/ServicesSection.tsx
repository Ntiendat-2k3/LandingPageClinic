import { Eye, Glasses, Zap, Baby, Stethoscope, Shield } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: Eye,
      title: "Khám tổng quát mắt",
      description:
        "Kiểm tra toàn diện tình trạng mắt, phát hiện sớm các vấn đề về thị lực",
      features: [
        "Đo thị lực",
        "Kiểm tra đáy mắt",
        "Đo nhãn áp",
        "Tư vấn chuyên sâu",
      ],
      price: "200.000đ",
      duration: "45 phút",
      color: "cyan",
    },
    {
      icon: Glasses,
      title: "Điều trị cận thị",
      description:
        "Phương pháp điều trị hiện đại giúp kiểm soát và cải thiện tình trạng cận thị",
      features: [
        "Ortho-K",
        "Kính đặc biệt",
        "Liệu pháp thị giác",
        "Theo dõi định kỳ",
      ],
      price: "500.000đ",
      duration: "60 phút",
      color: "emerald",
    },
    {
      icon: Zap,
      title: "Phẫu thuật Lasik",
      description:
        "Công nghệ laser tiên tiến giúp loại bỏ kính mắt, phục hồi thị lực tự nhiên",
      features: [
        "Femto Lasik",
        "Smile Pro",
        "Tư vấn chi tiết",
        "Bảo hành 10 năm",
      ],
      price: "25.000.000đ",
      duration: "2 giờ",
      color: "blue",
    },
    {
      icon: Shield,
      title: "Điều trị đục thủy tinh thể",
      description:
        "Phẫu thuật thay thủy tinh thể hiện đại, phục hồi thị lực cho người cao tuổi",
      features: [
        "IOL cao cấp",
        "Phẫu thuật không đau",
        "Hồi phục nhanh",
        "Theo dõi lâu dài",
      ],
      price: "15.000.000đ",
      duration: "90 phút",
      color: "purple",
    },
    {
      icon: Baby,
      title: "Khám mắt trẻ em",
      description:
        "Chương trình khám chuyên biệt cho trẻ em, phát hiện sớm các vấn đề thị lực",
      features: [
        "Khám không đau",
        "Phát hiện sớm",
        "Tư vấn phụ huynh",
        "Theo dõi phát triển",
      ],
      price: "300.000đ",
      duration: "30 phút",
      color: "pink",
    },
    {
      icon: Stethoscope,
      title: "Tư vấn kính áp tròng",
      description:
        "Hướng dẫn lựa chọn và sử dụng kính áp tròng phù hợp, an toàn",
      features: [
        "Đo độ chính xác",
        "Hướng dẫn sử dụng",
        "Theo dõi thích ứng",
        "Chăm sóc mắt",
      ],
      price: "150.000đ",
      duration: "30 phút",
      color: "orange",
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      cyan: "bg-cyan-100 text-cyan-600 group-hover:bg-cyan-500 group-hover:text-white",
      emerald:
        "bg-emerald-100 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white",
      blue: "bg-blue-100 text-blue-600 group-hover:bg-blue-500 group-hover:text-white",
      purple:
        "bg-purple-100 text-purple-600 group-hover:bg-purple-500 group-hover:text-white",
      pink: "bg-pink-100 text-pink-600 group-hover:bg-pink-500 group-hover:text-white",
      orange:
        "bg-orange-100 text-orange-600 group-hover:bg-orange-500 group-hover:text-white",
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.cyan;
  };

  return (
    <section id="services" className="section-padding bg-gradient-secondary">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Dịch vụ chăm sóc mắt toàn diện
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Từ khám tổng quát đến các phẫu thuật phức tạp, chúng tôi cung cấp
            đầy đủ các dịch vụ chăm sóc mắt với công nghệ hiện đại nhất.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${getColorClasses(
                  service.color
                )}`}
              >
                <service.icon className="w-8 h-8" />
              </div>

              <h3 className="font-space-grotesk text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>

              <p className="text-gray-600 mb-4 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center space-x-2 text-sm text-gray-600"
                  >
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="border-t border-gray-100 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="font-space-grotesk text-2xl font-bold text-gray-900">
                      {service.price}
                    </div>
                    <div className="text-sm text-gray-500">
                      Thời gian: {service.duration}
                    </div>
                  </div>
                </div>

                <button className="w-full btn-primary">Đặt lịch ngay</button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="font-space-grotesk text-2xl font-bold text-gray-900 mb-4">
              Cam kết chất lượng dịch vụ
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">
                    Bảo hành dịch vụ
                  </div>
                  <div className="text-sm text-gray-600">
                    Cam kết chất lượng
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">
                    Bác sĩ chuyên khoa
                  </div>
                  <div className="text-sm text-gray-600">
                    Kinh nghiệm 10+ năm
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">
                    Công nghệ hiện đại
                  </div>
                  <div className="text-sm text-gray-600">
                    Thiết bị nhập khẩu
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
