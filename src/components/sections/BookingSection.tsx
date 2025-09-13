"use client";

import type React from "react";
import { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Phone,
  MessageSquare,
  CheckCircle,
  Mail,
  Loader2,
} from "lucide-react";
import { sendBookingNotification, type BookingData } from "../../lib/emailjs";

const BookingSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailStatus, setEmailStatus] = useState<"success" | "error" | null>(
    null
  );

  // Khung giờ 1 tiếng
  const timeSlots = [
    "08:00 - 09:00",
    "09:00 - 10:00",
    "10:00 - 11:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00",
    "17:00 - 18:00",
    "18:00 - 19:00",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setEmailStatus(null);

    console.log("Form submitted:", formData);

    try {
      // Send email notification
      const emailResult = await sendBookingNotification(
        formData as BookingData
      );

      if (emailResult.success) {
        setEmailStatus("success");
        setIsSubmitted(true);

        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: "", phone: "", date: "", time: "", message: "" });
          setEmailStatus(null);
        }, 5000);
      } else {
        setEmailStatus("error");
      }
    } catch (error) {
      console.error("Error sending booking notification:", error);
      setEmailStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="booking" className="section-padding bg-gradient-primary">
        <div className="container mx-auto container-padding">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-3xl p-12 shadow-2xl">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="font-space-grotesk text-3xl font-bold text-gray-900 mb-4">
                Đặt lịch thành công!
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Cảm ơn bạn đã tin tưởng. Chúng tôi sẽ liên hệ trong 30 phút để
                xác nhận lịch hẹn.
              </p>
              {emailStatus === "success" && (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6">
                  <div className="flex items-center justify-center text-green-700">
                    <Mail className="w-5 h-5 mr-2" />
                    <span className="font-medium">
                      Thông báo đã được gửi đến phòng khám
                    </span>
                  </div>
                </div>
              )}
              <div className="bg-cyan-50 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Thông tin liên hệ khẩn cấp:
                </h3>
                <p className="text-gray-600">
                  Hotline:{" "}
                  <span className="font-semibold text-cyan-600">
                    0387 812 321
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="section-padding bg-gradient-primary">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Đăng kí miễn phí nhận ưu đãi 50%
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Điền thông tin bên dưới để đặt lịch. Chúng tôi sẽ liên hệ xác nhận
            trong 30 phút.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-8 md:p-12">
              {emailStatus === "error" && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
                  <div className="flex items-center text-red-700">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    <span className="font-medium">
                      Có lỗi xảy ra khi gửi thông báo. Vui lòng gọi trực tiếp:
                      0387 812 321
                    </span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Thông tin cá nhân */}
                <div className="space-y-4">
                  <h3 className="font-space-grotesk text-xl font-semibold text-gray-900 mb-4">
                    Thông tin cá nhân
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all disabled:opacity-50"
                      placeholder="Nhập họ và tên của bạn"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all disabled:opacity-50"
                      placeholder="0387 812 321"
                    />
                  </div>
                </div>

                {/* Thông tin đặt lịch (đã bỏ Chọn dịch vụ) */}
                <div className="space-y-4">
                  <h3 className="font-space-grotesk text-xl font-semibold text-gray-900 mb-4">
                    Thông tin đặt lịch
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Ngày khám *
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        disabled={isLoading}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Clock className="w-4 h-4 inline mr-2" />
                        Giờ khám *
                      </label>
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        required
                        disabled={isLoading}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all disabled:opacity-50"
                      >
                        <option value="">Chọn giờ</option>
                        {timeSlots.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MessageSquare className="w-4 h-4 inline mr-2" />
                      Ghi chú thêm
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none disabled:opacity-50"
                      placeholder="Mô tả triệu chứng hoặc yêu cầu đặc biệt..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Đang gửi thông báo...
                    </>
                  ) : (
                    "Đặt lịch ngay"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
