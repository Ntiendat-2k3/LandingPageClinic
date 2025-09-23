"use client";

import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  User,
  Phone,
  MessageSquare,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { sendBookingNotification, type BookingData } from "../../lib/emailjs";
import {
  validateBookingForm,
  getFieldError,
  formatPhoneNumber,
  sanitizeInput,
  type ValidationError,
  type BookingFormData,
} from "../../utils/validation";

const BookingSection = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    phone: "",
    date: "",
    time: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );
  const [showErrors, setShowErrors] = useState(false);

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

    let sanitizedValue = value;

    // Sanitize input based on field type
    if (name === "name") {
      sanitizedValue = sanitizeInput(value);
    } else if (name === "phone") {
      // Allow only numbers, spaces, and common phone formatting characters
      sanitizedValue = value.replace(/[^\d\s\-$$$$.]/g, "");
    } else if (name === "message") {
      sanitizedValue = sanitizeInput(value);
    }

    setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));

    // Clear validation errors when user starts typing
    if (showErrors) {
      setValidationErrors((prev) =>
        prev.filter((error) => error.field !== name)
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowErrors(true);

    const validation = validateBookingForm(formData);

    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      // Scroll to first error
      const firstErrorField = validation.errors[0]?.field;
      if (firstErrorField) {
        const element = document.querySelector(`[name="${firstErrorField}"]`);
        element?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setValidationErrors([]);
    setIsLoading(true);

    console.log("Form submitted:", formData);

    try {
      const formattedData = {
        ...formData,
        phone: formatPhoneNumber(formData.phone),
      };

      // Send email notification
      const emailResult = await sendBookingNotification(
        formattedData as BookingData
      );

      navigate("/booking-success", {
        state: {
          bookingData: formattedData,
          emailStatus: emailResult.success ? "success" : "error",
        },
        replace: true,
      });
    } catch (error) {
      console.error("Error sending booking notification:", error);

      // Navigate to success page even if email fails
      navigate("/booking-success", {
        state: {
          bookingData: {
            ...formData,
            phone: formatPhoneNumber(formData.phone),
          },
          emailStatus: "error",
        },
        replace: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderFieldError = (fieldName: string) => {
    const error = getFieldError(validationErrors, fieldName);
    if (!error || !showErrors) return null;

    return (
      <div className="flex items-center mt-1 text-red-600 text-sm">
        <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
        <span>{error}</span>
      </div>
    );
  };

  const getFieldBorderClass = (fieldName: string) => {
    const hasError = getFieldError(validationErrors, fieldName) && showErrors;
    return hasError
      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
      : "border-gray-300 focus:ring-cyan-500 focus:border-transparent";
  };

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
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 transition-all disabled:opacity-50 ${getFieldBorderClass(
                        "name"
                      )}`}
                      placeholder="Nhập họ và tên của bạn"
                    />
                    {renderFieldError("name")}
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
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 transition-all disabled:opacity-50 ${getFieldBorderClass(
                        "phone"
                      )}`}
                      placeholder="0387 812 321"
                    />
                    {renderFieldError("phone")}
                  </div>
                </div>

                {/* Thông tin đặt lịch */}
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
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 transition-all disabled:opacity-50 ${getFieldBorderClass(
                          "date"
                        )}`}
                      />
                      {renderFieldError("date")}
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
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 transition-all disabled:opacity-50 ${getFieldBorderClass(
                          "time"
                        )}`}
                      >
                        <option value="">Chọn giờ</option>
                        {timeSlots.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      {renderFieldError("time")}
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
                      maxLength={500}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 transition-all resize-none disabled:opacity-50 ${getFieldBorderClass(
                        "message"
                      )}`}
                      placeholder="Mô tả triệu chứng hoặc yêu cầu đặc biệt..."
                    />
                    <div className="flex justify-between items-center mt-1">
                      <div>{renderFieldError("message")}</div>
                      <span className="text-xs text-gray-500">
                        {formData.message.length}/500
                      </span>
                    </div>
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
