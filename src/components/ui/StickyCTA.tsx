"use client";

import { useState, useEffect } from "react";
import { Phone, X, Calendar, MessageCircle, ChevronUp } from "lucide-react";

const StickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Show CTA after scrolling 50vh
      setIsVisible(scrollPosition > windowHeight * 0.5);
      // Show scroll to top after scrolling 100vh
      setShowScrollTop(scrollPosition > windowHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToBooking = () => {
    const element = document.getElementById("booking");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsExpanded(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCall = () => {
    window.location.href = "tel:0123456789";
  };

  const handleChat = () => {
    // Implement chat functionality
    console.log("Opening chat...");
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Main CTA Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {isExpanded ? (
          // Expanded Menu
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 w-72 animate-fade-in-up">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-gray-900">Cần hỗ trợ?</span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Chọn cách thức liên hệ phù hợp với bạn
            </p>

            <div className="space-y-2">
              <button
                onClick={handleCall}
                className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white rounded-xl hover:from-cyan-600 hover:to-emerald-600 transition-all"
              >
                <Phone className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">Gọi ngay</div>
                  <div className="text-xs opacity-90">0123 456 789</div>
                </div>
              </button>

              <button
                onClick={scrollToBooking}
                className="w-full flex items-center space-x-3 p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all"
              >
                <Calendar className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">Đặt lịch khám</div>
                  <div className="text-xs opacity-90">
                    Nhanh chóng, tiện lợi
                  </div>
                </div>
              </button>

              <button
                onClick={handleChat}
                className="w-full flex items-center space-x-3 p-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">Chat trực tuyến</div>
                  <div className="text-xs opacity-90">Tư vấn miễn phí</div>
                </div>
              </button>
            </div>
          </div>
        ) : (
          // Collapsed Button
          <button
            onClick={() => setIsExpanded(true)}
            className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center justify-center animate-pulse"
          >
            <Phone className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <div className="fixed bottom-6 left-6 z-50">
          <button
            onClick={scrollToTop}
            className="w-12 h-12 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 hover:scale-110 transition-all duration-300 flex items-center justify-center"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
        </div>
      )}
    </>
  );
};

export default StickyCTA;
