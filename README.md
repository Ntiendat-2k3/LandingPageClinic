# Landing page Phòng khám mắt Dr Trần Tuấn

Ứng dụng Vite/React gồm landing page, trang khảo sát nguy cơ cận thị và hai trang xác nhận. Hai Vercel Functions trong `api/` ghi yêu cầu đặt lịch và khảo sát vào hai Google Sheets riêng.

## Chạy và kiểm tra

```powershell
npm install
npm run start
npm run lint
node --test tests/lead-api.test.mjs
npm run build
```

`npm run start` chạy Vite cùng hai route `/api/booking` và `/api/screening` chỉ dành cho local; các route này gọi lại đúng handler trong `api/`. Điền biến Google vào `.env` hoặc `.env.local` (đã được Git bỏ qua), rồi mở URL Vite in ra để thử gửi biểu mẫu. Cần mạng ra Google và quyền ghi Sheet thật. Bản production vẫn dùng Vercel Functions. Bài kiểm tra API dùng Google Sheets giả lập, không ghi dữ liệu thật.

## Cấu hình Google Sheets

1. Bật Google Sheets API trong **chính Google Cloud project của service account** và tạo khóa JSON. Không đặt private key trong `public/`, `src/` hoặc biến `VITE_`.
2. Chia sẻ **hai** bảng tính đích cho email của service account với quyền Editor.
3. Khai báo các biến trong `.env.example` ở Vercel Project Settings. `GOOGLE_PRIVATE_KEY` nhận PEM nguyên bản hoặc chuỗi có `\n`. Hai ID Sheet có thể giữ như ví dụ nếu đúng bảng tính đích.
4. Cấu hình ba biến `VITE_EMAILJS_*` nếu muốn gửi email thông báo phụ cho phòng khám sau khi ghi đặt lịch thành công. Thiếu chúng, biểu mẫu vẫn ghi Sheet; trang cảm ơn sẽ báo email chưa được gửi.
5. Hai Sheet đích có đúng một tab tên `Trang tính1`. Hàng tiêu đề đã được tạo ngày 07/10/2026; chưa có bản ghi khách hàng. API ghi đích danh tab này bằng `RAW` và dùng cột A để đối soát mã lượt gửi. Không chỉnh sửa hoặc xóa cột A trong lúc vận hành.

Thứ tự cột của Sheet đặt lịch (`A:H`): mã lượt gửi, thời điểm Việt Nam, nguồn, họ tên, số điện thoại, ngày khám, giờ khám, ghi chú.

### Email thông báo đặt lịch

Trong EmailJS, kết nối một email service và tạo template. Đặt **To Email** thành địa chỉ nhận của phòng khám ngay trong template, **Subject** là `{{notification_subject}}` và nội dung là `{{formatted_message}}`. Mã nguồn chỉ truyền dữ liệu đặt lịch vào template; địa chỉ nhận không lấy từ dữ liệu khách hàng. Sao chép Service ID, Template ID và Public Key mới vào ba biến `VITE_EMAILJS_*`, rồi khởi động lại Vite hoặc redeploy. Thử một lượt đặt lịch và xác nhận email thực sự đến hộp thư trước khi coi thông báo là hoạt động.

Có thể dùng [mẫu HTML thông báo đặt lịch](chỉnh%20sửa%20landingpage/Lần%201%20-%202.1.2026/emailjs-booking-template.html) trong Code Editor của EmailJS. Mẫu dùng đúng các biến `customer_name`, `customer_phone`, `booking_date_vn`, `booking_time`, `customer_message` và `booking_datetime` mà ứng dụng gửi.

Thứ tự cột của Sheet khảo sát (`A:N`): mã lượt gửi, thời điểm Việt Nam, nguồn, 9 câu trả lời theo thứ tự trên trang, mức nguy cơ, đồng ý chính sách.

Nếu cần tạo lại Sheet, hàng tiêu đề dưới đây có thể dán trực tiếp vào ô `A1` của từng bảng:

```text
Mã lượt gửi	Thời điểm (VN)	Nguồn	Họ tên	Số điện thoại	Ngày khám	Giờ khám	Ghi chú
```

```text
Mã lượt gửi	Thời điểm (VN)	Nguồn	Tuổi	Giới tính	Tuổi phát hiện cận	Độ cận gần nhất	Tăng độ 12 tháng	Cận thị ở bố/mẹ	Thời gian ngoài trời	Thời gian nhìn gần	Nhu cầu tư vấn	Mức nguy cơ	Đồng ý chính sách
```

Trước khi đưa lên production, thử một lượt ở mỗi biểu mẫu trên Vercel Preview, đối chiếu đúng Sheet và đúng thứ tự cột, rồi thử trường hợp Sheet từ chối quyền ghi. Nếu Sheet đã có cấu trúc cột khác, cần điều chỉnh tab/cột hoặc dùng Sheet riêng cho luồng mới trước khi phát hành.

## Giới hạn đã biết

- Kiểm tra mã trùng bằng cách đọc cột A trước khi thêm hàng. Cách này xử lý thử lại thông thường nhưng hai Function chạy đồng thời trên hai instance có thể cùng ghi một mã. Google Sheets không cung cấp giao dịch thêm hàng kèm điều kiện duy nhất; nếu cần bảo đảm tuyệt đối, cần kho lưu trữ có ràng buộc unique hoặc Apps Script có khóa.
- Khảo sát đang lưu lượt trả lời ẩn danh; không có tên hay số điện thoại để phòng khám gọi lại. Việc thu lead cần quyết định sản phẩm và cập nhật chính sách riêng tư.
- Lời đánh giá/ảnh khách hàng và các số liệu y khoa trong tài liệu nguồn cần chủ sở hữu xác nhận quyền sử dụng và độ chính xác trước khi công bố.
