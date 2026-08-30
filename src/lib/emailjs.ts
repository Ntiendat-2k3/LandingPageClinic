import emailjs from "@emailjs/browser";

const required = (v: string | undefined, k: string) => {
  if (!v) throw new Error(`Missing env ${k}`);
  return v;
};

export const EMAILJS_CONFIG = {
  SERVICE_ID: required(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    "VITE_EMAILJS_SERVICE_ID"
  ),
  TEMPLATE_ID: required(
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    "VITE_EMAILJS_TEMPLATE_ID"
  ),
  PUBLIC_KEY: required(
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    "VITE_EMAILJS_PUBLIC_KEY"
  ),
} as const;

// Khởi tạo EmailJS một lần với khóa công khai từ môi trường.
emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

export interface BookingData {
  name: string;
  phone: string;
  date: string; // có thể là "2025-09-15" (input type=date) hoặc dạng khác
  time: string;
  message: string;
}

/** Chuẩn hoá ngày về dd-MM-yyyy (an toàn cho nhiều input khác nhau) */
const formatDateVN = (input: string): string => {
  if (!input) return "";
  // ISO yyyy-mm-dd (từ <input type="date">)
  const iso = input.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (iso) {
    const [, y, m, d] = iso;
    return `${d}-${m}-${y}`;
  }
  // dd/mm/yyyy hoặc dd-mm-yyyy -> chuyển sang dd-MM-yyyy
  const dmy = input.match(/^(\d{2})[/-](\d{2})[/-](\d{4})$/);
  if (dmy) {
    const [, d, m, y] = dmy;
    return `${d}-${m}-${y}`;
  }
  // Dùng trình phân tích ngày của JavaScript khi chuỗi không theo hai định dạng trên.
  const d = new Date(input);
  if (!isNaN(d.getTime())) {
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  }
  // Không parse được thì trả nguyên bản
  return input;
};

export const sendBookingNotification = async (bookingData: BookingData) => {
  try {
    const booking_date_vn = formatDateVN(bookingData.date);
    const nowVN = new Date().toLocaleString("vi-VN");

    const templateParams = {
      to_name: "Bác sĩ phòng khám mắt",
      to_email: "khách hàng",
      from_name: "Hệ thống đặt lịch phòng khám",

      // Thông tin khách hàng đặt lịch
      customer_name: bookingData.name,
      customer_phone: bookingData.phone,
      booking_date_vn, // <<< dùng biến đã format dd-MM-yyyy
      booking_time: bookingData.time,
      customer_message: bookingData.message || "Không có ghi chú",
      booking_datetime: nowVN,

      notification_subject: `🔔 Lịch hẹn mới từ ${bookingData.name}`,
      formatted_message: `
        Khách hàng: ${bookingData.name}
        Số điện thoại: ${bookingData.phone}
        Ngày khám: ${booking_date_vn}
        Giờ khám: ${bookingData.time}
        Ghi chú: ${bookingData.message || "Không có"}
        Thời gian đặt: ${nowVN}
      `.trim(),

      // Tùy chọn: giữ thêm booking_date cũ nhưng đã format (phòng khi template cũ còn dùng)
      booking_date: booking_date_vn,
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams
    );

    console.log(
      "Email notification sent to clinic owner successfully:",
      response
    );
    return { success: true, response };
  } catch (error) {
    console.error("Failed to send booking notification:", error);
    return { success: false, error };
  }
};
