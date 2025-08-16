import { Target, Users, Heart, Shield } from "lucide-react";
import { useScrollToSection } from "../../hooks/useScrollToSection";
import type { ServiceItem } from "../../types";
import SectionHeader from "../ui/SectionHeader";
import ServiceCard from "../ui/ServiceCard";
import CTASection from "../ui/CTASection";

const GoalsSection = () => {
  const scrollToSection = useScrollToSection();

  const goals: ServiceItem[] = [
    {
      icon: Target,
      title: "Doanh nhân bận rộn",
      description:
        "Những người làm việc nhiều với máy tính, cần chăm sóc mắt định kỳ để duy trì hiệu suất công việc cao.",
      features: ["Khám nhanh chóng", "Tư vấn chuyên sâu", "Theo dõi định kỳ"],
      color: "cyan",
    },
    {
      icon: Users,
      title: "Gia đình có trẻ em",
      description:
        "Phụ huynh quan tâm đến sức khỏe mắt của con em, muốn phát hiện sớm các vấn đề về thị lực.",
      features: ["Khám thân thiện", "Phát hiện sớm", "Tư vấn phụ huynh"],
      color: "emerald",
    },
    {
      icon: Heart,
      title: "Người cao tuổi",
      description:
        "Những người trên 40 tuổi cần kiểm tra mắt thường xuyên để phòng ngừa các bệnh lý về mắt.",
      features: ["Khám toàn diện", "Phòng ngừa bệnh lý", "Chăm sóc đặc biệt"],
      color: "blue",
    },
    {
      icon: Shield,
      title: "Người có tiền sử gia đình",
      description:
        "Những người có người thân mắc các bệnh về mắt, cần theo dõi và chăm sóc đặc biệt.",
      features: [
        "Theo dõi di truyền",
        "Chăm sóc đặc biệt",
        "Tư vấn phòng ngừa",
      ],
      color: "purple",
    },
  ];

  return (
    <section id="goals" className="section-padding bg-white">
      <div className="container mx-auto container-padding">
        <SectionHeader
          title="Chúng tôi phục vụ ai?"
          description="Dịch vụ chăm sóc mắt chuyên nghiệp dành cho mọi đối tượng, từ trẻ em đến người cao tuổi, với các gói khám phù hợp cho từng nhu cầu cụ thể."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {goals.map((goal, index) => (
            <ServiceCard
              key={index}
              service={goal}
              onButtonClick={() => scrollToSection("booking")}
            />
          ))}
        </div>

        <CTASection
          title="Bạn thuộc nhóm nào?"
          description="Dù bạn thuộc nhóm đối tượng nào, chúng tôi đều có gói dịch vụ phù hợp. Hãy để chúng tôi tư vấn miễn phí cho bạn."
          primaryButtonText="Nhận tư vấn miễn phí"
          secondaryButtonText="Xem bảng giá chi tiết"
          variant="gradient"
          onPrimaryClick={() => scrollToSection("booking")}
          onSecondaryClick={() => scrollToSection("pricing")}
        />
      </div>
    </section>
  );
};

export default GoalsSection;
