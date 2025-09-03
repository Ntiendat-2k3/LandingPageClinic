"use client";

import { useState } from "react";
import { Star } from "lucide-react";

type Testimonial = {
  name: string;
  age: string;
  rating: number;
  content: string;
  image: string;
};

const TestimonialsSection = () => {
  // 3 ô đầu tiên theo ảnh “đánh giá”
  const testimonials: Testimonial[] = [
    {
      name: "Bạn Hải Linh",
      age: "10 tuổi",
      rating: 5,
      content:
        "Mẹ thấy mắt bạn ấy có dấu hiệu bị lệch, đi khám mấy nơi đều bảo không sao. Nghe nói bác sĩ Tuấn chuyên khám lác nên qua thử. Sau một thời gian điều trị cùng bác sĩ Tuấn, đến nay đã không còn thấy mắt con bị lệch nữa rồi. Con cũng tự tin hơn ở trường lớp.",
      image: "/images/customer/cus_hailinh.jpg", // thay bằng ảnh đúng từ folder
    },
    {
      name: "Bạn Trúc Anh",
      age: "9 tuổi",
      rating: 5,
      content:
        "Lần đầu bố mẹ cho bạn ấy đi khám cũng chỉ để kiểm tra xem có vấn đề gì không. Nào ngờ bé bị cận loạn cao bẩm sinh kèm nhược thị. May được bác sĩ Tuấn tư vấn tận tình, hướng tập luyện như bác sĩ dặn; đến nay mắt con đã hết nhược thị hoàn toàn rồi.",
      image: "/images/customer/cus_trucanh.jpg",
    },
    {
      name: "Bạn Gia Bảo",
      age: "14 tuổi",
      rating: 5,
      content:
        "Cháu theo khám bác sĩ Tuấn cũng được 5 năm rồi. Hiện độ cận loạn rất ổn định, 2 năm nay không tăng độ. Sắp tới bác sĩ Tuấn sẽ cho cháu đeo Ortho-K để không phải dùng kính gọng nữa.",
      image: "/images/customer/cus_giabao.jpg",
    },
    // Các ô tiếp theo – giữ nội dung tổng quát (sẽ thay avatar 2 ô theo ảnh bạn gửi sau)
    {
      name: "Anh Phạm Đức Thành",
      age: "45 tuổi",
      rating: 5,
      content:
        "Con tôi 12 tuổi cận 4 độ. Sau 6 tháng theo phác đồ tại đây, độ tăng chậm rõ rệt. Bác sĩ theo dõi sát và hướng dẫn chăm sóc rất kỹ.",
      image: "/images/customer/cus4.jpg", // TODO: bạn sẽ gửi ảnh khác
    },
    {
      name: "Bà Võ Thị Mai",
      age: "58 tuổi",
      rating: 5,
      content:
        "Được phát hiện sớm và điều trị đúng. Sau 1 năm, tình trạng đã ổn định. Gia đình rất biết ơn đội ngũ tận tâm.",
      image: "/images/customer/cus5.jpg", // TODO: bạn sẽ gửi ảnh khác
    },
    {
      name: "Chị Đặng Thị Linh",
      age: "31 tuổi",
      rating: 5,
      content:
        "Con và gia đình được bác sĩ hướng dẫn đeo – tháo – vệ sinh kính áp tròng rất cẩn thận và tỉ mỉ. Giờ bé có thể tự đeo và tháo kính một mình, hằng ngày học tập và sinh hoạt rất tự tin.",
      image: "/images/customer/cus6.jpg",
    },
  ];

  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const Stars = ({ n = 5 }: { n?: number }) => (
    <div className="flex items-center justify-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < n ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );

  return (
    <section id="testimonials" className="section-padding bg-white">
      <div className="container mx-auto container-padding">
        {/* Heading */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-space-grotesk text-2xl md:text-4xl font-bold text-gray-900 mb-2">
            Khách hàng nói gì về chúng tôi
          </h2>
          <p className="text-sm md:text-lg text-gray-600 max-w-3xl mx-auto">
            Hơn 10.000 khách hàng đã tin tưởng và hài lòng với dịch vụ của chúng
            tôi.
          </p>
        </div>

        {/* Mobile: kéo trượt */}
        <div className="md:hidden -mx-4 px-4">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {testimonials.map((t, idx) => {
              const expanded = expandedIdx === idx;
              return (
                <article
                  key={idx}
                  className="snap-center basis-[88%] shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm relative pt-10"
                >
                  {/* Avatar nổi ở giữa cạnh trên */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                    <img
                      src={t.image}
                      alt={`${t.name}`}
                      className="w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-md"
                    />
                  </div>

                  <div className="px-4 pb-4 pt-2 text-center">
                    <div className="font-semibold text-gray-900 text-[14.5px]">
                      {t.name} — {t.age}
                    </div>
                    <div className="mt-1">
                      <Stars n={t.rating} />
                    </div>

                    <p
                      className={`mt-3 text-[13.5px] text-gray-700 leading-relaxed italic ${
                        expanded ? "" : "line-clamp-5"
                      }`}
                    >
                      “{t.content}”
                    </p>

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

        {/* Desktop: 3 cột hàng đầu tiên */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <article
              key={idx}
              className="relative bg-white rounded-2xl p-6 pt-12 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center"
            >
              {/* Avatar nổi */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                <img
                  src={t.image}
                  alt={`${t.name}`}
                  className="w-20 h-20 rounded-full object-cover ring-4 ring-white shadow-md"
                />
              </div>

              <h3 className="font-semibold text-gray-900">
                {t.name} — {t.age}
              </h3>
              <div className="mt-1 mb-4">
                <Stars n={t.rating} />
              </div>

              <p className="text-gray-600 leading-relaxed italic">
                “{t.content}”
              </p>
            </article>
          ))}
        </div>

        {/* CTA nhỏ */}
        <div className="mt-12 md:mt-16 text-center">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
            <h3 className="font-space-grotesk text-xl md:text-2xl font-bold text-gray-900 mb-3">
              Bạn cũng muốn có trải nghiệm tương tự?
            </h3>
            <p className="text-gray-600 mb-5 max-w-2xl mx-auto text-sm md:text-base">
              Hãy để chúng tôi chăm sóc đôi mắt của bạn với sự tận tâm và chuyên
              nghiệp.
            </p>
            <div className="text-center mt-10">
              <a
                href="#booking"
                className="inline-flex items-center gap-3 bg-emerald-500 text-white px-10 py-4 rounded-full font-extrabold text-lg shadow-lg hover:shadow-xl hover:scale-105 hover:bg-emerald-600 transition"
              >
                Đăng kí miễn phí nhận ưu đãi{" "}
                <span className="px-3 py-1 rounded-full bg-white text-emerald-600 font-black">
                  50%
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
