"use client";

import type React from "react";

import { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle,
} from "lucide-react";

const BookingSection = () => {
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

  const services = [
    "Khám mắt tổng quát",
    "Phẫu thuật Lasik",
    "Điều trị đục thủy tinh thể",
    "Điều trị glaucoma",
    "Khám mắt trẻ em",
    "Tư vấn kính áp tròng",
    "Điều trị võng mạc",
    "Khám định kỳ",
  ];

  const timeSlots = [
    "08:00 - 08:30",
    "08:30 - 09:00",
    "09:00 - 09:30",
    "09:30 - 10:00",
    "10:00 - 10:30",
    "10:30 - 11:00",
    "14:00 - 14:30",
    "14:30 - 15:00",
    "15:00 - 15:30",
    "15:30 - 16:00",
    "16:00 - 16:30",
    "16:30 - 17:00",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
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
                Cảm ơn bạn đã tin tưởng dịch vụ của chúng tôi. Chúng tôi sẽ liên
                hệ với bạn trong vòng 30 phút để xác nhận lịch hẹn.
              </p>
              <div className="bg-cyan-50 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Thông tin liên hệ khẩn cấp:
                </h3>
                <p className="text-gray-600">
                  Hotline:{" "}
                  <span className="font-semibold text-cyan-600">
                    0123 456 789
                  </span>
                </p>
                <p className="text-gray-600">
                  Email:{" "}
                  <span className="font-semibold text-cyan-600">
                    info@eyeclinic.vn
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
            Đặt lịch khám ngay
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Điền thông tin bên dưới để đặt lịch khám. Chúng tôi sẽ liên hệ xác
            nhận trong vòng 30 phút và tư vấn chi tiết về dịch vụ phù hợp.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Form */}
              <div className="p-8 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Info */}
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                        placeholder="0123 456 789"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  {/* Booking Info */}
                  <div className="space-y-4">
                    <h3 className="font-space-grotesk text-xl font-semibold text-gray-900 mb-4">
                      Thông tin đặt lịch
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dịch vụ cần khám *
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
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
                          <Calendar className="w-4 h-4 inline mr-2" />
                          Ngày khám *
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          required
                          min={new Date().toISOString().split("T")[0]}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                        >
                          <option value="">Chọn giờ</option>
                          {timeSlots.map((time, index) => (
                            <option key={index} value={time}>
                              {time}
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none"
                        placeholder="Mô tả triệu chứng hoặc yêu cầu đặc biệt..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary text-lg py-4"
                  >
                    Đặt lịch ngay
                  </button>
                </form>
              </div>

              {/* Info Panel */}
              <div className="bg-gradient-secondary p-8 md:p-12 flex flex-col justify-center">
                <div className="space-y-8">
                  <div>
                    <h3 className="font-space-grotesk text-2xl font-bold text-gray-900 mb-6">
                      Tại sao chọn chúng tôi?
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            Bác sĩ chuyên khoa
                          </h4>
                          <p className="text-gray-600 text-sm">
                            Đội ngũ bác sĩ giàu kinh nghiệm, được đào tạo chuyên
                            sâu
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            Thiết bị hiện đại
                          </h4>
                          <p className="text-gray-600 text-sm">
                            Công nghệ tiên tiến nhất từ Đức, Nhật Bản
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            Bảo hành dài hạn
                          </h4>
                          <p className="text-gray-600 text-sm">
                            Cam kết bảo hành và theo dõi sau điều trị
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            Giá cả minh bạch
                          </h4>
                          <p className="text-gray-600 text-sm">
                            Không phát sinh chi phí ẩn, tư vấn chi tiết
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6">
                    <h4 className="font-space-grotesk text-lg font-semibold text-gray-900 mb-4">
                      Liên hệ trực tiếp
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-cyan-600" />
                        <div>
                          <p className="font-semibold text-gray-900">
                            0387 812 321
                          </p>
                          <p className="text-sm text-gray-600">Hotline 24/7</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-emerald-600" />
                        <div>
                          <p className="font-semibold text-gray-900">
                            info@eyeclinic.vn
                          </p>
                          <p className="text-sm text-gray-600">Email hỗ trợ</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
