"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Phẫu thuật Lasik có đau không?",
      answer:
        "Phẫu thuật Lasik hoàn toàn không đau. Chúng tôi sử dụng thuốc tê nhỏ mắt trước khi thực hiện. Bạn chỉ cảm thấy hơi khó chịu nhẹ trong vài giờ đầu sau phẫu thuật. Hầu hết bệnh nhân đều cảm thấy thoải mái và có thể sinh hoạt bình thường ngay từ ngày hôm sau.",
    },
    {
      question: "Thời gian hồi phục sau phẫu thuật Lasik là bao lâu?",
      answer:
        "Thời gian hồi phục rất nhanh. Thị lực sẽ cải thiện ngay trong ngày đầu tiên, và ổn định hoàn toàn sau 1-2 tuần. Bạn có thể trở lại làm việc sau 2-3 ngày. Tuy nhiên, cần tránh các hoạt động thể thao mạnh và bơi lội trong 2 tuần đầu.",
    },
    {
      question: "Chi phí khám mắt tổng quát là bao nhiêu?",
      answer:
        "Chi phí khám mắt tổng quát cơ bản là 200.000đ, bao gồm đo thị lực, kiểm tra khúc xạ, đo nhãn áp và tư vấn. Gói khám toàn diện với OCT và các xét nghiệm chuyên sâu là 500.000đ. Chúng tôi cam kết giá cả minh bạch, không phát sinh chi phí ẩn.",
    },
    {
      question: "Trẻ em bao nhiêu tuổi có thể khám mắt?",
      answer:
        "Trẻ em có thể khám mắt từ 6 tháng tuổi. Chúng tôi khuyến nghị khám mắt định kỳ cho trẻ từ 3 tuổi để phát hiện sớm các vấn đề về thị lực như cận thị, viễn thị, loạn thị. Đội ngũ bác sĩ có kinh nghiệm khám cho trẻ em với phương pháp thân thiện, không gây sợ hãi.",
    },
    {
      question: "Có cần đặt lịch trước khi đến khám không?",
      answer:
        "Chúng tôi khuyến nghị đặt lịch trước để đảm bảo được phục vụ đúng giờ và tránh chờ đợi. Bạn có thể đặt lịch qua điện thoại, website hoặc trực tiếp tại phòng khám. Trong trường hợp cấp cứu, chúng tôi sẽ ưu tiên tiếp nhận ngay lập tức.",
    },
    {
      question: "Phòng khám có bảo hành cho các dịch vụ không?",
      answer:
        "Có, chúng tôi cam kết bảo hành cho tất cả dịch vụ. Phẫu thuật Lasik được bảo hành 10 năm, phẫu thuật đục thủy tinh thể bảo hành 5 năm. Các dịch vụ khám và điều trị khác được theo dõi miễn phí trong thời gian quy định. Nếu không hài lòng, chúng tôi hoàn tiền 100%.",
    },
    {
      question: "Tôi có thể thanh toán bằng thẻ không?",
      answer:
        "Chúng tôi chấp nhận nhiều hình thức thanh toán: tiền mặt, thẻ ATM, thẻ tín dụng (Visa, Mastercard), chuyển khoản ngân hàng và ví điện tử (Momo, ZaloPay). Đối với các dịch vụ có giá trị cao, chúng tôi hỗ trợ trả góp 0% lãi suất qua thẻ tín dụng.",
    },
    {
      question: "Làm thế nào để chuẩn bị trước khi khám mắt?",
      answer:
        "Trước khi khám, bạn nên: ngừng đeo kính áp tròng ít nhất 24h (kính mềm) hoặc 1 tuần (kính cứng), mang theo kính mắt hiện tại, danh sách thuốc đang sử dụng, và hồ sơ bệnh án cũ (nếu có). Không cần nhịn ăn hay chuẩn bị gì đặc biệt khác.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section-padding bg-white">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Câu hỏi thường gặp
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Tìm câu trả lời cho những thắc mắc phổ biến về dịch vụ chăm sóc mắt
            của chúng tôi. Nếu bạn có câu hỏi khác, đừng ngần ngại liên hệ với
            chúng tôi.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <HelpCircle className="w-5 h-5 text-cyan-600" />
                    </div>
                    <h3 className="font-space-grotesk text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </button>

                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <div className="pl-14">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Additional Help */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-secondary rounded-2xl p-8 md:p-12">
            <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-8 h-8 text-cyan-600" />
            </div>
            <h3 className="font-space-grotesk text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Vẫn còn thắc mắc?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Đội ngũ tư vấn viên chuyên nghiệp của chúng tôi sẵn sàng giải đáp
              mọi thắc mắc của bạn. Liên hệ ngay để được hỗ trợ tốt nhất.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">Gọi ngay: 0123 456 789</button>
              <button className="btn-secondary">Chat trực tuyến</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
