import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Chị Nguyễn Thị Lan",
      age: "35 tuổi",
      location: "Quận 1, TP.HCM",
      service: "Phẫu thuật Lasik",
      rating: 5,
      content:
        "Tôi đã cận thị nặng 8 độ trong suốt 15 năm. Sau khi phẫu thuật Lasik tại đây, thị lực của tôi đã hoàn toàn bình thường. Quy trình chuyên nghiệp, bác sĩ tận tâm và thiết bị hiện đại. Tôi rất hài lòng với kết quả.",
      image: "/placeholder.svg?height=80&width=80",
      date: "2 tháng trước",
    },
    {
      name: "Anh Trần Văn Minh",
      age: "42 tuổi",
      location: "Quận 7, TP.HCM",
      service: "Điều trị đục thủy tinh thể",
      rating: 5,
      content:
        "Bố tôi 70 tuổi bị đục thủy tinh thể, nhìn mờ nhiều năm. Sau phẫu thuật ở đây, bố đã có thể nhìn rõ trở lại. Đội ngũ y tế rất chu đáo, theo dõi sát sao từ trước đến sau phẫu thuật. Cảm ơn các bác sĩ rất nhiều!",
      image: "/placeholder.svg?height=80&width=80",
      date: "1 tháng trước",
    },
    {
      name: "Chị Lê Thị Hoa",
      age: "28 tuổi",
      location: "Quận 3, TP.HCM",
      service: "Khám tổng quát mắt",
      rating: 5,
      content:
        "Làm việc với máy tính nhiều nên thường xuyên mỏi mắt. Đến đây khám định kỳ, bác sĩ tư vấn rất chi tiết về cách bảo vệ mắt. Phòng khám sạch sẽ, hiện đại, nhân viên thân thiện. Sẽ giới thiệu cho bạn bè.",
      image: "/placeholder.svg?height=80&width=80",
      date: "3 tuần trước",
    },
    {
      name: "Anh Phạm Đức Thành",
      age: "45 tuổi",
      location: "Quận 2, TP.HCM",
      service: "Điều trị cận thị cho con",
      rating: 5,
      content:
        "Con tôi 12 tuổi bị cận thị 4 độ. Sau 6 tháng điều trị Ortho-K tại đây, độ cận thị đã giảm đáng kể. Bác sĩ theo dõi rất kỹ, hướng dẫn cách chăm sóc mắt cho trẻ. Tôi rất tin tưởng vào chuyên môn của phòng khám.",
      image: "/placeholder.svg?height=80&width=80",
      date: "2 tuần trước",
    },
    {
      name: "Bà Võ Thị Mai",
      age: "58 tuổi",
      location: "Quận 5, TP.HCM",
      service: "Khám và điều trị glaucoma",
      rating: 5,
      content:
        "Tôi được phát hiện glaucoma giai đoạn đầu nhờ khám định kỳ tại đây. Bác sĩ giải thích rất kỹ về bệnh và phương pháp điều trị. Sau 1 năm điều trị, tình trạng đã ổn định. Rất biết ơn đội ngũ y tế tận tâm.",
      image: "/placeholder.svg?height=80&width=80",
      date: "1 tuần trước",
    },
    {
      name: "Chị Đặng Thị Linh",
      age: "31 tuổi",
      location: "Quận 10, TP.HCM",
      service: "Tư vấn kính áp tròng",
      rating: 5,
      content:
        "Lần đầu đeo kính áp tròng nên rất lo lắng. Bác sĩ ở đây hướng dẫn rất chi tiết, từ cách đeo, tháo đến vệ sinh. Theo dõi thích ứng rất kỹ. Giờ tôi đã tự tin đeo kính áp tròng hàng ngày mà không lo ngại gì.",
      image: "/placeholder.svg?height=80&width=80",
      date: "4 ngày trước",
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section id="testimonials" className="section-padding bg-white">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Khách hàng nói gì về chúng tôi
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hơn 10,000 khách hàng đã tin tưởng và hài lòng với dịch vụ của chúng
            tôi. Đọc những chia sẻ chân thực từ những người đã trải nghiệm.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 relative"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-6">
                <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
                  <Quote className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4 pt-2">
                {renderStars(testimonial.rating)}
                <span className="text-sm text-gray-500 ml-2">
                  ({testimonial.rating}/5)
                </span>
              </div>

              {/* Content */}
              <p className="text-gray-600 leading-relaxed mb-6 italic">
                "{testimonial.content}"
              </p>

              {/* Patient Info */}
              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.age} • {testimonial.location}
                  </div>
                  <div className="text-xs text-cyan-600 font-medium">
                    {testimonial.service}
                  </div>
                </div>
              </div>

              {/* Date */}
              <div className="text-xs text-gray-400 mt-4 text-right">
                {testimonial.date}
              </div>
            </div>
          ))}
        </div>

        {/* Overall Stats */}
        <div className="mt-16">
          <div className="bg-gradient-secondary rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h3 className="font-space-grotesk text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Thống kê hài lòng khách hàng
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="font-space-grotesk text-4xl font-bold text-cyan-600 mb-2">
                  4.9/5
                </div>
                <div className="text-gray-600">Đánh giá trung bình</div>
                <div className="flex justify-center mt-2">{renderStars(5)}</div>
              </div>

              <div className="text-center">
                <div className="font-space-grotesk text-4xl font-bold text-emerald-600 mb-2">
                  98%
                </div>
                <div className="text-gray-600">Khách hàng hài lòng</div>
                <div className="text-sm text-gray-500 mt-1">
                  Trên 10,000 đánh giá
                </div>
              </div>

              <div className="text-center">
                <div className="font-space-grotesk text-4xl font-bold text-blue-600 mb-2">
                  95%
                </div>
                <div className="text-gray-600">Giới thiệu bạn bè</div>
                <div className="text-sm text-gray-500 mt-1">
                  Khách hàng quay lại
                </div>
              </div>

              {/* <div className="text-center">
                <div className="font-space-grotesk text-4xl font-bold text-purple-600 mb-2">
                  1,200+
                </div>
                <div className="text-gray-600">Đánh giá 5 sao</div>
                <div className="text-sm text-gray-500 mt-1">
                  Trong 6 tháng qua
                </div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="font-space-grotesk text-2xl font-bold text-gray-900 mb-4">
              Bạn cũng muốn có trải nghiệm tương tự?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Hãy để chúng tôi chăm sóc đôi mắt của bạn với sự tận tâm và chuyên
              nghiệp như những khách hàng trước đây.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Đăng ký miễn phí ưu đại 50%
              </button>
              {/* <button className="btn-secondary">Đọc thêm đánh giá</button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
