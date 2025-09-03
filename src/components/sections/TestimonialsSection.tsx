"use client";

import { useState } from "react";
import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  // Dịch vụ của bạn
  const clinicServices = [
    "Gói khám tổng quan",
    "Atropine nồng độ thấp 0.01%, 0.025% và 0.05%",
    "Gói khám kiểm soát tật khúc xạ",
    "Trong kính kiểm soát cận thị Myopcare, Stellest",
    "Gói khám kính áp tròng ban đêm Ortho-K",
    "Kính áp tròng ban đêm Ortho-K",
    "Đo trục nhãn cầu",
    "Lăng kính & tập luyện điều chỉnh lác/phục hồi thị lực",
  ];

  // Bỏ trường date
  const testimonials = [
    {
      name: "Chị Nguyễn Thị Lan",
      age: "35 tuổi",
      location: "Quận 1, TP.HCM",
      rating: 5,
      content:
        "Tôi đã cận thị nặng 8 độ trong suốt 15 năm. Sau khi điều trị ở đây, thị lực đã cải thiện rõ rệt. Quy trình chuyên nghiệp, bác sĩ tận tâm và thiết bị hiện đại.",
      image: "/images/customer/cus2.jpg",
    },
    {
      name: "Anh Trần Văn Minh",
      age: "42 tuổi",
      location: "Quận 7, TP.HCM",
      rating: 5,
      content:
        "Bố tôi 70 tuổi nhìn mờ nhiều năm. Sau điều trị, bố đã có thể nhìn rõ trở lại. Đội ngũ theo dõi sát sao, rất chu đáo.",
      image: "/images/customer/cus1.jpg",
    },
    {
      name: "Chị Lê Thị Hoa",
      age: "28 tuổi",
      location: "Quận 3, TP.HCM",
      rating: 5,
      content:
        "Làm việc máy tính nhiều, hay mỏi mắt. Khám định kỳ và được hướng dẫn rất kỹ cách bảo vệ mắt. Không gian sạch, nhân viên thân thiện.",
      image: "/images/customer/cus3.jpg",
    },
    {
      name: "Anh Phạm Đức Thành",
      age: "45 tuổi",
      location: "Quận 2, TP.HCM",
      rating: 5,
      content:
        "Con tôi 12 tuổi cận thị 4 độ. Sau 6 tháng theo phác đồ tại đây, độ tăng chậm rõ rệt. Bác sĩ theo dõi sát, hướng dẫn chăm sóc rất kỹ.",
      image: "/images/customer/cus4.jpg",
    },
    {
      name: "Bà Võ Thị Mai",
      age: "58 tuổi",
      location: "Quận 5, TP.HCM",
      rating: 5,
      content:
        "Khám phát hiện sớm và điều trị đúng. Sau 1 năm, tình trạng đã ổn định. Rất biết ơn đội ngũ tận tâm.",
      image: "/images/customer/cus5.jpg",
    },
    {
      name: "Chị Đặng Thị Linh",
      age: "31 tuổi",
      location: "Quận 10, TP.HCM",
      rating: 5,
      content:
        "Được hướng dẫn đeo – tháo – vệ sinh kính áp tròng rất chi tiết. Theo dõi thích ứng kỹ, giờ mình đeo hằng ngày rất tự tin.",
      image: "/images/customer/cus6.jpg",
    },
  ].map((t, i) => ({
    ...t,
    service: clinicServices[i % clinicServices.length],
  }));

  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));

  return (
    <section id="testimonials" className="section-padding bg-white">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="font-space-grotesk text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
            Khách hàng nói gì về chúng tôi
          </h2>
          <p className="text-sm md:text-lg text-gray-600 max-w-3xl mx-auto">
            Hơn 10,000 khách hàng đã tin tưởng và hài lòng với dịch vụ của chúng
            tôi.
          </p>
        </div>

        {/* MOBILE: carousel kéo trượt */}
        <div className="md:hidden -mx-4 px-4">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {testimonials.map((t, idx) => {
              const expanded = expandedIdx === idx;
              return (
                <article
                  key={idx}
                  className="snap-center basis-[88%] shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm"
                >
                  <div className="flex items-center gap-2 p-4 pb-2">
                    <div className="w-7 h-7 bg-cyan-500 rounded-full grid place-items-center shadow">
                      <Quote className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="flex items-center gap-1">
                      {renderStars(t.rating)}
                    </div>
                    <span className="text-xs text-gray-500">
                      ({t.rating}/5)
                    </span>
                  </div>

                  <div className="px-4 pb-4">
                    <p
                      className={`text-[13.5px] text-gray-700 leading-relaxed italic ${
                        expanded ? "" : "line-clamp-4"
                      }`}
                    >
                      “{t.content}”
                    </p>

                    <div className="flex items-center gap-3 mt-4">
                      <div className="relative">
                        <span className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-emerald-300 via-cyan-300 to-sky-300 blur-[6px]" />
                        <img
                          src={t.image || "/placeholder.svg"}
                          alt={t.name}
                          className="relative w-12 h-12 rounded-full object-cover ring-2 ring-white"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 text-[14px]">
                          {t.name}
                        </div>
                        <div className="text-xs text-gray-500">{t.age}</div>
                        <div className="inline-flex items-center gap-1 mt-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                          {t.service}
                        </div>
                      </div>
                      {/* ĐÃ BỎ DATE Ở ĐÂY */}
                    </div>

                    <button
                      onClick={() =>
                        setExpandedIdx((cur) => (cur === idx ? null : idx))
                      }
                      className="mt-3 text-[12px] font-semibold text-emerald-700"
                    >
                      {expanded ? "Thu gọn ▲" : "Đọc thêm ▼"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* DESKTOP: grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <article
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 relative"
            >
              <div className="absolute -top-4 left-6">
                <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center shadow">
                  <Quote className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="flex items-center gap-1 mb-4 pt-2">
                {renderStars(t.rating)}
                <span className="text-sm text-gray-500 ml-2">
                  ({t.rating}/5)
                </span>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6 italic">
                “{t.content}”
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={t.image || "/placeholder.svg"}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.age}</div>
                  <div className="inline-flex items-center gap-1 mt-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                    {t.service}
                  </div>
                </div>
                {/* ĐÃ BỎ DATE Ở ĐÂY */}
              </div>
            </article>
          ))}
        </div>

        {/* Stats – mobile một hàng */}
        <div className="mt-12 md:mt-16">
          <div className="bg-gradient-secondary rounded-2xl p-4 md:p-12">
            <div className="text-center mb-4 md:mb-8">
              <h3 className="font-space-grotesk text-lg md:text-3xl font-bold text-gray-900">
                Thống kê hài lòng khách hàng
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-2 md:gap-8 md:grid-cols-3">
              <div className="text-center bg-white/60 md:bg-transparent rounded-xl p-2 md:p-0">
                <div className="font-space-grotesk text-2xl md:text-4xl font-bold text-cyan-600 mb-1 md:mb-2">
                  4.9/5
                </div>
                <div className="text-[11px] md:text-base text-gray-600">
                  Đánh giá TB
                </div>
                <div className="hidden md:flex justify-center mt-2">
                  {renderStars(5)}
                </div>
              </div>

              <div className="text-center bg-white/60 md:bg-transparent rounded-xl p-2 md:p-0">
                <div className="font-space-grotesk text-2xl md:text-4xl font-bold text-emerald-600 mb-1 md:mb-2">
                  97.8%
                </div>
                <div className="text-[11px] md:text-base text-gray-600">
                  Hài lòng
                </div>
                <div className="hidden md:block text-sm text-gray-500 mt-1">
                  Trên 10,000 đánh giá
                </div>
              </div>

              <div className="text-center bg-white/60 md:bg-transparent rounded-xl p-2 md:p-0">
                <div className="font-space-grotesk text-2xl md:text-4xl font-bold text-blue-600 mb-1 md:mb-2">
                  95%
                </div>
                <div className="text-[11px] md:text-base text-gray-600">
                  Giới thiệu bạn bè
                </div>
                <div className="hidden md:block text-sm text-gray-500 mt-1">
                  Khách hàng quay lại
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 md:mt-16 text-center">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
            <h3 className="font-space-grotesk text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">
              Bạn cũng muốn có trải nghiệm tương tự?
            </h3>
            <p className="text-gray-600 mb-5 md:mb-6 max-w-2xl mx-auto text-sm md:text-base">
              Hãy để chúng tôi chăm sóc đôi mắt của bạn với sự tận tâm và chuyên
              nghiệp.
            </p>
            <div className="flex justify-center">
              <button className="btn-primary text-sm md:text-base">
                Đăng ký miễn phí ưu đãi 50%
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
