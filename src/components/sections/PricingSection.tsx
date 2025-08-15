import { Check, Star, Crown, Shield } from "lucide-react";

const PricingSection = () => {
  const packages = [
    {
      name: "Gói Cơ Bản",
      price: "200.000",
      originalPrice: "300.000",
      duration: "45 phút",
      description: "Phù hợp cho khám sức khỏe mắt định kỳ",
      features: [
        "Đo thị lực cơ bản",
        "Kiểm tra khúc xạ",
        "Đo nhãn áp",
        "Tư vấn cơ bản",
        "Hồ sơ bệnh án điện tử",
      ],
      popular: false,
      color: "gray",
      icon: Shield,
    },
    {
      name: "Gói Toàn Diện",
      price: "500.000",
      originalPrice: "700.000",
      duration: "90 phút",
      description: "Khám chi tiết, phát hiện sớm bệnh lý",
      features: [
        "Tất cả dịch vụ gói cơ bản",
        "Chụp đáy mắt OCT",
        "Đo độ dày giác mạc",
        "Kiểm tra thị trường",
        "Tư vấn chuyên sâu",
        "Theo dõi 6 tháng miễn phí",
      ],
      popular: true,
      color: "cyan",
      icon: Star,
    },
    {
      name: "Gói VIP",
      price: "1.000.000",
      originalPrice: "1.500.000",
      duration: "120 phút",
      description: "Dịch vụ cao cấp với bác sĩ chuyên khoa I",
      features: [
        "Tất cả dịch vụ gói toàn diện",
        "Khám với Giáo sư/PGS",
        "Chụp OCT-A mạch máu",
        "Phân tích AI chuyên sâu",
        "Tư vấn điều trị cá nhân hóa",
        "Theo dõi 1 năm miễn phí",
        "Ưu tiên đặt lịch",
        "Hỗ trợ 24/7",
      ],
      popular: false,
      color: "emerald",
      icon: Crown,
    },
  ];

  const getColorClasses = (color: string, popular: boolean) => {
    if (popular) {
      return {
        card: "bg-gradient-to-br from-cyan-50 to-emerald-50 border-2 border-cyan-200 shadow-xl",
        badge: "bg-gradient-to-r from-cyan-500 to-emerald-500 text-white",
        icon: "bg-gradient-to-r from-cyan-500 to-emerald-500 text-white",
        button: "btn-primary w-full",
        price: "text-cyan-600",
      };
    }

    const colorMap = {
      gray: {
        card: "bg-white border border-gray-200 shadow-lg hover:shadow-xl",
        badge: "bg-gray-100 text-gray-600",
        icon: "bg-gray-100 text-gray-600",
        button: "btn-secondary w-full",
        price: "text-gray-900",
      },
      emerald: {
        card: "bg-white border border-emerald-200 shadow-lg hover:shadow-xl",
        badge: "bg-emerald-100 text-emerald-600",
        icon: "bg-emerald-100 text-emerald-600",
        button:
          "bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 w-full",
        price: "text-emerald-600",
      },
    };

    return colorMap[color as keyof typeof colorMap] || colorMap.gray;
  };

  return (
    <section id="pricing" className="section-padding bg-gradient-secondary">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Bảng giá dịch vụ minh bạch
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Chúng tôi cam kết giá cả minh bạch, không phát sinh chi phí ẩn. Chọn
            gói dịch vụ phù hợp với nhu cầu và ngân sách của bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => {
            const colors = getColorClasses(pkg.color, pkg.popular);

            return (
              <div
                key={index}
                className={`relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 ${colors.card}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div
                      className={`px-6 py-2 rounded-full text-sm font-semibold ${colors.badge}`}
                    >
                      Phổ biến nhất
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${colors.icon}`}
                  >
                    <pkg.icon className="w-8 h-8" />
                  </div>

                  <h3 className="font-space-grotesk text-2xl font-bold text-gray-900 mb-2">
                    {pkg.name}
                  </h3>

                  <p className="text-gray-600 mb-4">{pkg.description}</p>

                  <div className="mb-2">
                    <span className={`text-4xl font-bold ${colors.price}`}>
                      {pkg.price}
                    </span>
                    <span className="text-gray-900">đ</span>
                  </div>

                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                    <span className="line-through">{pkg.originalPrice}đ</span>
                    <span className="text-red-500 font-medium">
                      Tiết kiệm{" "}
                      {Number.parseInt(pkg.originalPrice) -
                        Number.parseInt(pkg.price)}
                      k
                    </span>
                  </div>

                  <div className="text-sm text-gray-500 mt-2">
                    Thời gian: {pkg.duration}
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-gray-600 text-sm leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button className={colors.button}>Chọn gói này</button>

                {pkg.popular && (
                  <div className="mt-4 text-center">
                    <div className="text-xs text-gray-500">
                      ⭐ Được 85% khách hàng lựa chọn
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Additional Services */}
        <div className="mt-16">
          <h3 className="font-space-grotesk text-2xl font-bold text-gray-900 text-center mb-8">
            Dịch vụ bổ sung
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Phẫu thuật Lasik",
                price: "25.000.000đ",
                note: "Bảo hành 10 năm",
              },
              {
                name: "Điều trị đục thủy tinh thể",
                price: "15.000.000đ",
                note: "IOL cao cấp",
              },
              {
                name: "Điều trị cận thị trẻ em",
                price: "500.000đ/tháng",
                note: "Theo dõi định kỳ",
              },
              {
                name: "Tư vấn kính áp tròng",
                price: "150.000đ",
                note: "Hướng dẫn chi tiết",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg text-center"
              >
                <h4 className="font-space-grotesk font-semibold text-gray-900 mb-2">
                  {service.name}
                </h4>
                <div className="text-2xl font-bold text-cyan-600 mb-1">
                  {service.price}
                </div>
                <div className="text-xs text-gray-500">{service.note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantee */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Shield className="w-8 h-8 text-green-600" />
              <h3 className="font-space-grotesk text-2xl font-bold text-gray-900">
                Cam kết hoàn tiền 100%
              </h3>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nếu bạn không hài lòng với dịch vụ của chúng tôi trong vòng 7
              ngày, chúng tôi sẽ hoàn lại 100% chi phí khám.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
