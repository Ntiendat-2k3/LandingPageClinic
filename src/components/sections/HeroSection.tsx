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
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 text-md font-medium text-cyan-700">
                <Award className="w-4 h-4" />
                Chăm sóc đôi mắt một cách toàn diện
              </div>

              <h1 className="font-space-grotesk text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                PHÒNG KHÁM CHUYÊN
                <br></br>
                <span className="bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                  {" "}
                  KHOA MẮT
                </span>{" "}
                &
                <span className="bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                  {" "}
                  KHÚC XẠ
                </span>
                {" "}
                <br></br>
                DR TRẦN TUẤN
              </h1>

              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
                <span className="mb-2">KIỂM SOÁT CẬN THỊ - ĐIỀU CHỈNH LÁC KHÔNG PHẪU THUẬT</span> <br></br> Áp dụng các
                phương pháp tiên tiến và hiệu quả cao nhất trên thế giới Đội ngũ
                bác sĩ và nhân viên y tế giàu kinh nghiệm, được đào tạo chuyên
                sâu Chính sách bảo đảm kiểm soát hiệu quả cận thị độc quyền tại
                Hà Nội
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
                <div className="text-sm text-gray-600">
                  Bệnh nhân đã được điều trị
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-lg mb-2 mx-auto">
                  <Star className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="font-space-grotesk text-2xl font-bold text-gray-900">
                  97.8%
                </div>
                <div className="text-sm text-gray-600">Bệnh nhân hài lòng</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-2 mx-auto">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div className="font-space-grotesk text-2xl font-bold text-gray-900">
                  10+
                </div>
                <div className="text-sm text-gray-600">Năm kinh nghiệm</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div>
              <button
                onClick={scrollToContact}
                className="btn-primary flex items-center justify-center space-x-2"
              >
                <span>Đăng kí miễn phí ưu đãi 50%</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="/images/section1.jpg"
                alt="Phòng khám mắt hiện đại"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
