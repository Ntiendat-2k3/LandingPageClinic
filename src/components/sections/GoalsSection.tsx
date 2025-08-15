import { Target, Users, Heart, Shield } from "lucide-react";

const GoalsSection = () => {
  const goals = [
    {
      icon: Target,
      title: "Doanh nhân bận rộn",
      description:
        "Những người làm việc nhiều với máy tính, cần chăm sóc mắt định kỳ để duy trì hiệu suất công việc cao.",
      color: "cyan",
    },
    {
      icon: Users,
      title: "Gia đình có trẻ em",
      description:
        "Phụ huynh quan tâm đến sức khỏe mắt của con em, muốn phát hiện sớm các vấn đề về thị lực.",
      color: "emerald",
    },
    {
      icon: Heart,
      title: "Người cao tuổi",
      description:
        "Những người trên 40 tuổi cần kiểm tra mắt thường xuyên để phòng ngừa các bệnh lý về mắt.",
      color: "blue",
    },
    {
      icon: Shield,
      title: "Người có tiền sử gia đình",
      description:
        "Những người có người thân mắc các bệnh về mắt, cần theo dõi và chăm sóc đặc biệt.",
      color: "purple",
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
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.cyan;
  };

  return (
    <section id="goals" className="section-padding bg-white">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Chúng tôi phục vụ ai?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Dịch vụ chăm sóc mắt chuyên nghiệp dành cho mọi đối tượng, từ trẻ em
            đến người cao tuổi, với các gói khám phù hợp cho từng nhu cầu cụ
            thể.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {goals.map((goal, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${getColorClasses(
                  goal.color
                )}`}
              >
                <goal.icon className="w-8 h-8" />
              </div>

              <h3 className="font-space-grotesk text-xl font-semibold text-gray-900 mb-3">
                {goal.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {goal.description}
              </p>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <button className="text-cyan-600 font-medium hover:text-cyan-700 transition-colors flex items-center space-x-2">
                  <span>Tìm hiểu thêm</span>
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-secondary rounded-2xl p-8 md:p-12">
            <h3 className="font-space-grotesk text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Bạn thuộc nhóm nào?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Dù bạn thuộc nhóm đối tượng nào, chúng tôi đều có gói dịch vụ phù
              hợp. Hãy để chúng tôi tư vấn miễn phí cho bạn.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">Nhận tư vấn miễn phí</button>
              <button className="btn-secondary">Xem bảng giá chi tiết</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoalsSection;
