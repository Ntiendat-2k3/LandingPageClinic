import { Eye, Glasses, Zap, Baby, Stethoscope, Shield } from "lucide-react";
import { useScrollToSection } from "../../hooks/useScrollToSection";
import type { ServiceItem } from "../../types";
import SectionHeader from "../ui/SectionHeader";
import ServiceCard from "../ui/ServiceCard";
import StatCard from "../ui/StatCard";

const ServicesSection = () => {
  const scrollToSection = useScrollToSection();

  const services: ServiceItem[] = [
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

  return (
    <section id="services" className="section-padding bg-gradient-secondary">
      <div className="container mx-auto container-padding">
        <SectionHeader
          title="CHƯƠNG TRÌNH ĐỘC QUYỀN, DUY NHẤT TẠI HÀ NỘI"
          description="ĐẢM BẢO KIỂM SOÁT TIẾN TRIỂN CẬN THỊ
XOÁ TAN NỖI LO TĂNG ĐỘ CẬN"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              showPrice={true}
              onButtonClick={() => scrollToSection("booking")}
            />
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="font-space-grotesk text-2xl font-bold text-gray-900 mb-4">
              Cam kết chất lượng dịch vụ
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard
                icon={Shield}
                value="Bảo hành"
                label="dịch vụ"
                description="Cam kết chất lượng"
                color="green"
              />
              <StatCard
                icon={Stethoscope}
                value="10+ năm"
                label="Kinh nghiệm"
                description="Bác sĩ chuyên khoa"
                color="blue"
              />
              <StatCard
                icon={Zap}
                value="Hiện đại"
                label="Công nghệ"
                description="Thiết bị nhập khẩu"
                color="purple"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
