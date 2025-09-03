"use client";

import { useState, useEffect } from "react";
import { Phone, X, Calendar, MessageCircle, ChevronUp } from "lucide-react";

const MESSENGER_USERNAME = "pkmatdrtrantuan";
const MESSENGER_PAGE_ID = "61575903518251";

const StickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      setIsVisible(scrollPosition > windowHeight * 0.5);
      setShowScrollTop(scrollPosition > windowHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToBooking = () => {
    const el = document.getElementById("booking");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsExpanded(false);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleCall = () => {
    window.location.href = "tel:0387812321";
  };

  // NEW: mở Messenger
  const handleChat = () => {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile && MESSENGER_PAGE_ID !== "61575903518251") {
      // thử mở app Messenger
      window.location.href = `fb-messenger://user-thread/${MESSENGER_PAGE_ID}`;
      // fallback sang web nếu app không mở
      setTimeout(() => {
        window.location.href = `https://m.me/${MESSENGER_USERNAME}`;
      }, 800);
    } else {
      // desktop hoặc chưa có PAGE_ID: mở m.me
      window.open(
        `https://m.me/${MESSENGER_USERNAME}`,
        "_blank",
        "noopener,noreferrer"
      );
    }

    setIsExpanded(false);
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
                className="w-6 h-6 flex items-center justify-center text-gray-400 md:hover:text-gray-600 transition-colors md:cursor-pointer"
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
                className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white rounded-xl md:hover:from-cyan-600 md:hover:to-emerald-600 transition-all md:cursor-pointer"
              >
                <Phone className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">Gọi ngay</div>
                  <div className="text-xs opacity-90">0387 812 321</div>
                </div>
              </button>

              <button
                onClick={scrollToBooking}
                className="w-full flex items-center space-x-3 p-3 bg-blue-500 text-white rounded-xl md:hover:bg-blue-600 transition-all md:cursor-pointer"
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
                className="w-full flex items-center space-x-3 p-3 bg-purple-500 text-white rounded-xl md:hover:bg-purple-600 transition-all md:cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">Chat trực tuyến</div>
                  <div className="text-xs opacity-90">
                    Redirect sang Messenger
                  </div>
                </div>
              </button>
            </div>
          </div>
        ) : (
          // Collapsed Button
          <button
            onClick={() => setIsExpanded(true)}
            className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white rounded-full shadow-2xl md:hover:shadow-3xl md:hover:scale-110 transition-all duration-300 flex items-center justify-center animate-pulse md:cursor-pointer"
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
            className="w-12 h-12 bg-gray-800 text-white rounded-full shadow-lg md:hover:bg-gray-700 md:hover:scale-110 transition-all duration-300 flex items-center justify-center md:cursor-pointer"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
        </div>
      )}
    </>
  );
};

export default StickyCTA;
