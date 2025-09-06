"use client";

import { Star } from "lucide-react";

type Testimonial = {
  name: string;
  age: string;
  rating: number;
  content: string;
  image: string;
};

const TestimonialsSection = () => {
  const testimonials: Testimonial[] = [
    {
      name: "Bạn Hải Linh",
      age: "10 tuổi",
      rating: 5,
      content:
        "Mẹ thấy mắt bạn ấy có dấu hiệu bị lệch, đi khám mấy nơi đều bảo không sao. Nghe nói bác sĩ Tuấn chuyên khám lác nên qua thử. Sau một thời gian điều trị cùng bác sĩ Tuấn, đến nay đã không còn thấy mắt con bị lệch nữa rồi. Con cũng tự tin hơn ở trường lớp.",
      image: "/images/customer/cus_hailinh.jpg",
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
    {
      name: "Anh Phạm Đức Thành",
      age: "45 tuổi",
      rating: 5,
      content:
        "Con tôi 12 tuổi cận 4 độ. Sau 6 tháng theo phác đồ tại đây, độ tăng chậm rõ rệt. Bác sĩ theo dõi sát và hướng dẫn chăm sóc rất kỹ.",
      image: "/images/customer/cus4.jpg",
    },
    {
      name: "Anh Trần Minh Tiến",
      age: "42 tuổi",
      rating: 5,
      content:
        "Gắn bó với chiếc kính cận 25 độ dày cộm hàng chục năm nay, được bạn bè giới thiệu đến khám tại phòng khám của BS Trần Tuấn và được tư vấn đổi sang loại tròng siêu mỏng dành riêng cho cận cao. Giờ tôi đeo kính cảm thấy rất thoải mái dễ chịu, không còn cảnh suốt ngày phải đẩy kính lên nữa, cải thiện thẩm mỹ và tự tin hơn rất nhiều trong công việc cũng như cuộc sống hàng ngày.",
      image: "/images/customer/cus5.jpg",
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

        {/* ===== Mobile: list kéo trượt ===== */}
        <div className="md:hidden -mx-4 px-4">
          {/* Quan trọng: cho phép tràn theo trục dọc để avatar không bị cắt */}
          <div className="flex gap-4 overflow-x-auto overflow-y-visible snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {testimonials.map((t, idx) => (
              <article
                key={idx}
                className="
                  snap-center basis-[88%] shrink-0
                  bg-white rounded-2xl border border-gray-100 shadow-sm
                  relative pt-14 overflow-visible
                "
              >
                {/* Avatar nổi (không bị cắt) */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-md"
                  />
                </div>

                {/* Nội dung */}
                <div className="px-4 pb-4 pt-2 text-center">
                  <div className="font-semibold text-gray-900 text-[14.5px]">
                    {t.name} — {t.age}
                  </div>
                  <div className="mt-1">
                    <Stars n={t.rating} />
                  </div>

                  {/* Luôn clamp + fade đáy */}
                  <div className="mt-3 relative">
                    <p className="text-[13.5px] text-gray-700 leading-relaxed italic line-clamp-5">
                      “{t.content}”
                    </p>
                    <div className="pointer-events-none absolute -bottom-1 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ===== Desktop: lưới 3 cột ===== */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <article
              key={idx}
              className="relative bg-white rounded-2xl p-6 pt-12 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center"
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                <img
                  src={t.image}
                  alt={t.name}
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

        {/* ===== CTA MOBILE: gộp text + 50% vào cùng 1 nút ===== */}
        <div className="mt-12 md:hidden">
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
            <h3
              className="text-base font-bold text-gray-900 mb-2"
              style={{ textWrap: "balance" }}
            >
              Bạn cũng muốn có trải nghiệm tương tự?
            </h3>
            <p className="text-[13px] text-gray-600 mb-4">
              Hãy để chúng tôi chăm sóc đôi mắt của bạn với sự tận tâm và chuyên
              nghiệp.
            </p>

            <a
              href="#booking"
              className="
                w-full grid grid-cols-[1fr_auto] items-center gap-3
                px-5 py-3 rounded-full text-white font-extrabold text-sm
                bg-emerald-500 shadow-lg active:scale-[0.98] hover:bg-emerald-600 transition
              "
            >
              <span className="leading-tight text-left">
                Đăng kí miễn phí nhận ưu đãi
              </span>
              <span className="px-3 py-1 rounded-full bg-white/95 text-emerald-600 font-black ring-1 ring-emerald-200">
                50%
              </span>
            </a>
          </div>
        </div>

        {/* ===== CTA DESKTOP ===== */}
        <div className="hidden md:block mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="font-space-grotesk text-2xl font-bold text-gray-900 mb-3">
              Bạn cũng muốn có trải nghiệm tương tự?
            </h3>
            <p className="text-gray-600 mb-5 max-w-2xl mx-auto">
              Hãy để chúng tôi chăm sóc đôi mắt của bạn với sự tận tâm và chuyên
              nghiệp.
            </p>
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
    </section>
  );
};

export default TestimonialsSection;
