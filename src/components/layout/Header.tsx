"use client";

import { useState } from "react";
import { Menu, X, Phone, MapPin } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-14 h-14">
              <img src="/images/logo.png" alt="logo" className="w-14 h-14" />
            </div>
            <div className="font-space-grotesk font-bold text-[15px] lg:text-xl text-gray-900">
              Phòng khám CK Mắt & Khúc xạ <br className="lg:hidden block"></br>{" "}
              Dr Trần Tuấn
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("services")}
              className="text-gray-600 hover:text-cyan-600 transition-colors font-medium"
            >
              Dịch vụ
            </button>
            <button
              onClick={() => scrollToSection("process")}
              className="text-gray-600 hover:text-cyan-600 transition-colors font-medium"
            >
              Quy trình
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-gray-600 hover:text-cyan-600 transition-colors font-medium"
            >
              Kiểm soát cận thị
            </button>
            <button
              onClick={() => scrollToSection("doctors")}
              className="text-gray-600 hover:text-cyan-600 transition-colors font-medium"
            >
              Đội ngũ chuyên môn
            </button>
            {/* <button
              onClick={() => scrollToSection("booking")}
              className="btn-primary"
            >
              Đăng ký miễn phí nhận ưu đãi 50%
            </button> */}
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Phone className="w-4 h-4" />
              <span>03.878.12321</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>122 Bà Triệu – phường Hai Bà Trưng– Hà Nội.</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("services")}
                className="text-left text-gray-600 hover:text-cyan-600 transition-colors font-medium"
              >
                Dịch vụ
              </button>
              <button
                onClick={() => scrollToSection("process")}
                className="text-left text-gray-600 hover:text-cyan-600 transition-colors font-medium"
              >
                Quy trình
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="text-left text-gray-600 hover:text-cyan-600 transition-colors font-medium"
              >
                Kiểm soát cận thị
              </button>
              <button
                onClick={() => scrollToSection("doctors")}
                className="text-left text-gray-600 hover:text-cyan-600 transition-colors font-medium"
              >
                Đội ngũ chuyên môn
              </button>
              <div className="pt-2 border-t border-gray-100">
                <div className="flex items-center space-x-1 text-sm text-gray-600 mb-2">
                  <Phone className="w-4 h-4" />
                  <span>03.878.12321</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-600 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>122 Bà Triệu – phường Hai Bà Trưng – Hà Nội.</span>
                </div>
                <button
                  onClick={() => scrollToSection("booking")}
                  className="btn-primary w-full"
                >
                  Đặt lịch khám
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
