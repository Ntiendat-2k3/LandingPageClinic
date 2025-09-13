# Hướng dẫn cài đặt EmailJS cho Phòng khám mắt

## Tổng quan
Hệ thống này sẽ **GỬI EMAIL THÔNG BÁO ĐẾN BẠN** mỗi khi có khách hàng đặt lịch khám qua website. Bạn sẽ nhận được email chứa đầy đủ thông tin khách hàng để liên hệ xác nhận.

## Bước 1: Tạo tài khoản EmailJS (Miễn phí)

1. Truy cập https://www.emailjs.com/
2. Đăng ký tài khoản miễn phí (200 email/tháng)
3. Xác nhận email và đăng nhập

## Bước 2: Tạo Email Service

1. Vào Dashboard > Email Services
2. Chọn "Add New Service"
3. Chọn Gmail (hoặc email provider của bạn)
4. Nhập thông tin email phòng khám của bạn (email mà bạn muốn nhận thông báo)
5. Lưu Service ID (ví dụ: service_clinic_booking)

## Bước 3: Tạo Email Template

1. Vào Email Templates > Create New Template
2. Sử dụng template sau:

\`\`\`
Tiêu đề: 🔔 [Phòng khám mắt] Lịch hẹn mới từ {{customer_name}}

Nội dung:
Xin chào Bác sĩ,

Có một lịch hẹn mới từ website phòng khám:

👤 Tên khách hàng: {{customer_name}}
📞 Số điện thoại: {{customer_phone}}
📅 Ngày khám: {{booking_date}}
🕐 Giờ khám: {{booking_time}}
💬 Ghi chú: {{customer_message}}

Thời gian đặt lịch: {{booking_datetime}}

⚠️ VUI LÒNG LIÊN HỆ KHÁCH HÀNG TRONG 30 PHÚT ĐỂ XÁC NHẬN LỊCH HẸN

Trân trọng,
Hệ thống đặt lịch tự động
\`\`\`

3. Lưu Template ID (ví dụ: template_booking_notification)

## Bước 4: Lấy Public Key

1. Vào Account > API Keys
2. Copy Public Key

## Bước 5: Cập nhật cấu hình

Mở file `src/lib/emailjs.ts` và cập nhật:

\`\`\`typescript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'your_service_id_here', // Từ bước 2
  TEMPLATE_ID: 'your_template_id_here', // Từ bước 3
  PUBLIC_KEY: 'your_public_key_here', // Từ bước 4
};
\`\`\`

**QUAN TRỌNG**: Cập nhật email nhận thông báo của bạn:
\`\`\`typescript
to_email: 'your-clinic-email@gmail.com', // ⚠️ THAY ĐỔI: Email của bạn để nhận thông báo đặt lịch
\`\`\`

## Bước 6: Test thử nghiệm

1. Chạy website: `npm run dev`
2. Điền form đặt lịch với thông tin test
3. **Kiểm tra email của bạn** - bạn sẽ nhận được thông báo có khách hàng đặt lịch
4. Kiểm tra cả hộp thư spam nếu không thấy email

## Lợi ích của hệ thống này

✅ **Nhận thông báo tức thời** khi có khách đặt lịch
✅ **Đầy đủ thông tin khách hàng** để liên hệ ngay
✅ **Miễn phí** 200 email/tháng (đủ cho phòng khám nhỏ)
✅ **Tự động hoàn toàn** - không cần can thiệp thủ công
✅ **An toàn** - chỉ gửi email, không đọc được email của bạn

## Nâng cấp (Tùy chọn)

- Gói miễn phí: 200 email/tháng
- Gói trả phí: Từ $15/tháng cho 10,000 email
- Có thể thêm nhiều email template khác nhau

## Troubleshooting

Nếu email không gửi được:
1. Kiểm tra Console trong Developer Tools
2. Đảm bảo Service ID, Template ID, Public Key đúng
3. **Kiểm tra email có trong spam không**
4. Thử gửi test email từ EmailJS dashboard
5. Đảm bảo đã cập nhật đúng email nhận thông báo trong code
