import emailjs from "@emailjs/browser";
import { formatMessage, locale, messages } from "@/i18n";

export const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
} as const;

// Khởi tạo EmailJS một lần với khóa công khai từ môi trường.
if (EMAILJS_CONFIG.PUBLIC_KEY) emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

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
  if (!EMAILJS_CONFIG.SERVICE_ID || !EMAILJS_CONFIG.TEMPLATE_ID || !EMAILJS_CONFIG.PUBLIC_KEY) {
    return { success: false };
  }
  try {
    const booking_date_vn = formatDateVN(bookingData.date);
    const nowVN = new Date().toLocaleString(locale);

    const templateParams = {
      to_name: messages.email.recipientName,
      from_name: messages.email.senderName,

      // Thông tin khách hàng đặt lịch
      customer_name: bookingData.name,
      customer_phone: bookingData.phone,
      booking_date_vn, // <<< dùng biến đã format dd-MM-yyyy
      booking_time: bookingData.time,
      customer_message: bookingData.message || messages.email.noNote,
      booking_datetime: nowVN,

      notification_subject: formatMessage(messages.email.subject, {
        name: bookingData.name,
      }),
      formatted_message: [
        `${messages.email.customerLabel}: ${bookingData.name}`,
        `${messages.email.phoneLabel}: ${bookingData.phone}`,
        `${messages.email.dateLabel}: ${booking_date_vn}`,
        `${messages.email.timeLabel}: ${bookingData.time}`,
        `${messages.email.noteLabel}: ${bookingData.message || messages.email.none}`,
        `${messages.email.createdAtLabel}: ${nowVN}`,
      ].join("\n"),

      // Tùy chọn: giữ thêm booking_date cũ nhưng đã format (phòng khi template cũ còn dùng)
      booking_date: booking_date_vn,
    };

    await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams
    );

    return { success: true };
  } catch {
    return { success: false };
  }
};
