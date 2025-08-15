"use client";

import type React from "react";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    time: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "",
        date: "",
        time: "",
        message: "",
      });
    }, 3000);
  };

  const services = [
    "Khám tổng quát mắt",
    "Phẫu thuật Lasik",
    "Điều trị cận thị",
    "Điều trị đục thủy tinh thể",
    "Khám mắt trẻ em",
    "Tư vấn kính áp tròng",
    "Khác",
  ];

  const timeSlots = [
    "8:00 - 9:00",
    "9:00 - 10:00",
    "10:00 - 11:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00",
  ];

  return (
    <section id="contact" className="section-padding bg-gradient-secondary">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Đặt lịch khám ngay
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Liên hệ với chúng tôi để đặt lịch khám hoặc tư vấn miễn phí. Đội ngũ
            chăm sóc khách hàng sẵn sàng hỗ trợ bạn 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="font-space-grotesk text-2xl font-bold text-gray-900 mb-6">
                Thông tin liên hệ
              </h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Địa chỉ
                    </h4>
                    <p className="text-gray-600">
                      123 Nguyễn Văn A, Phường 1, Quận 1, TP.HCM
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Gần ngã tư Bến Thành, dễ dàng di chuyển
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Điện thoại
                    </h4>
                    <p className="text-gray-600">0123 456 789</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Hotline 24/7 - Tư vấn miễn phí
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                    <p className="text-gray-600">info@eyecarepro.vn</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Phản hồi trong vòng 2 giờ
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Giờ làm việc
                    </h4>
                    <div className="text-gray-600 space-y-1">
                      <p>Thứ 2 - Thứ 6: 8:00 - 18:00</p>
                      <p>Thứ 7: 8:00 - 16:00</p>
                      <p>Chủ nhật: 8:00 - 12:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="font-space-grotesk text-lg font-semibold text-gray-900 mb-4">
                Vị trí phòng khám
              </h4>
              <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=256&width=400"
                  alt="Bản đồ vị trí phòng khám"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <p className="text-sm text-gray-600 mt-3">
                Phòng khám nằm tại vị trí thuận tiện, gần các tuyến xe bus và
                metro
              </p>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            {!isSubmitted ? (
              <>
                <h3 className="font-space-grotesk text-2xl font-bold text-gray-900 mb-6">
                  Đặt lịch khám
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Họ và tên *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors"
                        placeholder="Nhập họ và tên"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Số điện thoại *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors"
                        placeholder="Nhập số điện thoại"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors"
                      placeholder="Nhập địa chỉ email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dịch vụ cần khám *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Chọn dịch vụ</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ngày khám *
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Giờ khám *
                      </label>
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors"
                      >
                        <option value="">Chọn giờ</option>
                        {timeSlots.map((slot, index) => (
                          <option key={index} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ghi chú thêm
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors resize-none"
                      placeholder="Mô tả triệu chứng hoặc yêu cầu đặc biệt..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary flex items-center justify-center space-x-2"
                  >
                    <Send className="w-5 h-5" />
                    <span>Đặt lịch ngay</span>
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    Bằng cách đặt lịch, bạn đồng ý với{" "}
                    <a href="#" className="text-cyan-600 hover:underline">
                      điều khoản sử dụng
                    </a>{" "}
                    và{" "}
                    <a href="#" className="text-cyan-600 hover:underline">
                      chính sách bảo mật
                    </a>{" "}
                    của chúng tôi.
                  </p>
                </form>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-space-grotesk text-2xl font-bold text-gray-900 mb-4">
                  Đặt lịch thành công!
                </h3>
                <p className="text-gray-600 mb-6">
                  Cảm ơn bạn đã đặt lịch. Chúng tôi sẽ liên hệ xác nhận trong
                  vòng 30 phút.
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    Mã đặt lịch:{" "}
                    <span className="font-semibold text-gray-900">
                      #ECP{Date.now().toString().slice(-6)}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
