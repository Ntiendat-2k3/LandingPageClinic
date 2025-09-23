"use client";

import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle, Mail, Phone, Home } from "lucide-react";

interface BookingData {
  name: string;
  phone: string;
  date: string;
  time: string;
  message: string;
}

interface LocationState {
  bookingData: BookingData;
  emailStatus: string;
}

const BookingSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as LocationState;
  const bookingData = state?.bookingData;
  const emailStatus = state?.emailStatus || "";

  // Redirect to home if no booking data
  useEffect(() => {
    if (
      !bookingData ||
      !bookingData.name ||
      !bookingData.phone ||
      !bookingData.date ||
      !bookingData.time
    ) {
      navigate("/", { replace: true });
    }
  }, [bookingData, navigate]);

  const handleBackToHome = () => {
    navigate("/", { replace: true });
  };

  // Show loading or redirect if no data
  if (!bookingData) {
    return null;
  }

  return (
    <section className="section-padding bg-gradient-primary min-h-screen flex items-center">
      <div className="container mx-auto container-padding">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-3xl p-12 shadow-2xl">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>

            <h1 className="font-space-grotesk text-3xl font-bold text-gray-900 mb-4">
              Đặt lịch thành công!
            </h1>

            <p className="text-lg text-gray-600 mb-8">
              Cảm ơn{" "}
              <span className="font-semibold text-cyan-600">
                {bookingData.name}
              </span>{" "}
              đã tin tưởng. Chúng tôi sẽ liên hệ trong 30 phút để xác nhận lịch
              hẹn.
            </p>

            {/* Booking Details */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-4">
                Thông tin đặt lịch:
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>
                  <span className="font-medium">Họ tên:</span>{" "}
                  {bookingData.name}
                </p>
                <p>
                  <span className="font-medium">Số điện thoại:</span>{" "}
                  {bookingData.phone}
                </p>
                <p>
                  <span className="font-medium">Ngày khám:</span>{" "}
                  {new Date(bookingData.date).toLocaleDateString("vi-VN")}
                </p>
                <p>
                  <span className="font-medium">Giờ khám:</span>{" "}
                  {bookingData.time}
                </p>
                {bookingData.message && (
                  <p>
                    <span className="font-medium">Ghi chú:</span>{" "}
                    {bookingData.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email Status */}
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

            {emailStatus === "error" && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
                <div className="flex items-center justify-center text-red-700">
                  <Mail className="w-5 h-5 mr-2" />
                  <span className="font-medium">
                    Có lỗi xảy ra khi gửi thông báo. Vui lòng gọi trực tiếp.
                  </span>
                </div>
              </div>
            )}

            {/* Emergency Contact */}
            <div className="bg-cyan-50 rounded-2xl p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-2">
                Thông tin liên hệ khẩn cấp:
              </h3>
              <div className="flex items-center justify-center text-cyan-600">
                <Phone className="w-5 h-5 mr-2" />
                <span className="font-semibold text-lg">0387 812 321</span>
              </div>
            </div>

            {/* Back to Home Button */}
            <button
              onClick={handleBackToHome}
              className="w-full btn-primary text-lg py-4 flex items-center justify-center"
            >
              <Home className="w-5 h-5 mr-2" />
              Quay về trang chủ
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSuccess;
