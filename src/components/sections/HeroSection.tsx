"use client";

import { ArrowRight, Star, Users, Award, Clock } from "lucide-react";

const HeroSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-secondary overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-cyan-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-emerald-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-blue-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-cyan-700">
                <Award className="w-4 h-4" />
                <span>Phòng khám mắt hàng đầu Việt Nam</span>
              </div>

              <h1 className="font-space-grotesk text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Chăm sóc đôi mắt
                <span className="bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                  {" "}
                  chuyên nghiệp
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
                Với đội ngũ bác sĩ giàu kinh nghiệm và công nghệ hiện đại nhất,
                chúng tôi cam kết mang đến dịch vụ chăm sóc mắt tốt nhất cho bạn
                và gia đình.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-cyan-100 rounded-lg mb-2 mx-auto">
                  <Users className="w-6 h-6 text-cyan-600" />
                </div>
                <div className="font-space-grotesk text-2xl font-bold text-gray-900">
                  10K+
                </div>
                <div className="text-sm text-gray-600">Bệnh nhân tin tưởng</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-lg mb-2 mx-auto">
                  <Star className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="font-space-grotesk text-2xl font-bold text-gray-900">
                  4.9/5
                </div>
                <div className="text-sm text-gray-600">Đánh giá trung bình</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-2 mx-auto">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div className="font-space-grotesk text-2xl font-bold text-gray-900">
                  15+
                </div>
                <div className="text-sm text-gray-600">Năm kinh nghiệm</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToContact}
                className="btn-primary flex items-center justify-center space-x-2"
              >
                <span>Đặt lịch khám ngay</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="btn-secondary">Tư vấn miễn phí</button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  <img
                    src="/placeholder.svg?height=32&width=32"
                    alt="Doctor"
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                  <img
                    src="/placeholder.svg?height=32&width=32"
                    alt="Doctor"
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                  <img
                    src="/placeholder.svg?height=32&width=32"
                    alt="Doctor"
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                </div>
                <div className="text-sm text-gray-600">
                  <div className="font-medium">
                    Đội ngũ bác sĩ chuyên nghiệp
                  </div>
                  <div className="text-xs">Kinh nghiệm 10+ năm</div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="/placeholder.svg?height=600&width=500"
                alt="Phòng khám mắt hiện đại"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />

              {/* Floating Cards */}
              <div className="absolute -top-6 -left-6 bg-white rounded-xl shadow-lg p-4 animate-bounce">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">4.9/5 ⭐</div>
                    <div className="text-xs text-gray-600">1,200+ đánh giá</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      Chứng nhận
                    </div>
                    <div className="text-xs text-gray-600">ISO 9001:2015</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-emerald-400/20 rounded-2xl transform rotate-3 scale-105 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
