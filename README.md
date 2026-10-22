# Landing page Phòng khám mắt Dr Trần Tuấn

Ứng dụng Vite/React gồm landing page, ba trang giới thiệu phương pháp kiểm soát cận thị, trang khảo sát nguy cơ cận thị và hai trang xác nhận. Các Vercel Functions trong `api/` ghi yêu cầu đặt lịch và khảo sát vào hai Google Sheets riêng, đồng thời lấy bài mới của fanpage khi được cấu hình.

## Chạy và kiểm tra

```powershell
npm install
npm run start
npm run lint
node --test tests/lead-api.test.mjs tests/google-sheets.test.mjs tests/facebook-posts.test.mjs
npm run build
npm run test:seo
```

`npm run start` chạy Vite cùng các route trong `api/` dành cho local; các route này gọi lại đúng handler production. Điền biến môi trường vào `.env` hoặc `.env.local` (đã được Git bỏ qua), rồi mở URL Vite in ra để thử. Cần mạng ra Google và quyền ghi Sheet thật khi thử biểu mẫu. Bản production vẫn dùng Vercel Functions. Bài kiểm tra API dùng dữ liệu giả lập, không ghi dữ liệu thật.

## Bài viết mới trên fanpage

Khung Facebook trong footer vẫn dùng Page Plugin. Mặc định khung chỉ hiển thị phần đầu fanpage để tránh khoảng trắng khi Facebook không trả Timeline; khách có thể mở thử Timeline ngay tại trang hoặc dùng nút **Xem bài viết trên Facebook**. Nếu đã cấu hình `FACEBOOK_PAGE_ID` và `FACEBOOK_PAGE_ACCESS_TOKEN` trong Environment Variables của Vercel Production, website lấy ba bài mới qua `/api/facebook-posts` và hiển thị dưới phần đầu khung. Lấy ID và **Page Access Token** của chính fanpage theo [hướng dẫn Pages API của Meta](https://www.postman.com/meta/facebook/documentation/r56bjfd/facebook-api); token cần quyền đọc bài viết (`pages_read_engagement`). Chỉ đặt token ở server, không dùng tiền tố `VITE_` và không đưa vào `src/` hoặc `public/`. API lưu cache 5 phút. Trang không thể đọc nội dung bên trong iframe của Facebook để tự xác định Timeline trống, nên nút mở Timeline không dựa trên thời gian chờ hoặc sự kiện iframe tải xong.

## SEO và GEO

Đặt `SITE_URL` trong Environment Variables của Vercel Production thành origin HTTPS của tên miền chính (ví dụ `https://ten-mien-cua-ban.vn`, không có đường dẫn), rồi redeploy. Đây là giá trị cần gán khi có tên miền; không phải sửa URL trong mã nguồn. Bước build sẽ tạo HTML trang chủ và ba trang phương pháp có nội dung sẵn, canonical, Open Graph, `sitemap.xml` và dòng Sitemap trong `robots.txt`. Sitemap gồm trang chủ, ba trang phương pháp, trang khảo sát và chính sách; form liên hệ và trang cảm ơn được loại khỏi sitemap và đặt `noindex`. Ảnh chia sẻ Open Graph/Twitter dùng `/images/clinic-sign.webp`; favicon dùng `/images/logo.png`. Khi chưa có `SITE_URL`, build vẫn chạy nhưng không tạo canonical, ảnh chia sẻ URL tuyệt đối hoặc sitemap để tránh khai báo nhầm một domain tạm. Chạy `npm run test:seo` sau `npm run build` để kiểm tra các trang đã sinh.

Nội dung ba trang phương pháp sử dụng tài liệu của International Myopia Institute và mô tả lợi ích, giới hạn, lưu ý an toàn ở mức tổng quan. Chưa ghi tên người thẩm định y khoa khi chưa có xác nhận thực tế; cần để bác sĩ phụ trách rà soát nội dung và hồ sơ Google Business Profile trước khi đưa website lên tên miền chính. Sau khi triển khai, kiểm tra Search Console, PageSpeed Insights trên mobile và desktop, cũng như URL `/robots.txt` và `/sitemap.xml` của tên miền thật.

Website hiện chỉ có nội dung tiếng Việt nên không tạo `hreflang` cho một phiên bản ngôn ngữ khác chưa tồn tại.

## Cấu hình Google Sheets

1. Bật Google Sheets API trong **chính Google Cloud project của service account** và tạo khóa JSON. Không đặt private key trong `public/`, `src/` hoặc biến `VITE_`.
2. Chia sẻ **hai** bảng tính đích cho email của service account với quyền Editor.
3. Khai báo các biến trong `.env.example` ở Vercel Project Settings. `GOOGLE_PRIVATE_KEY` nhận PEM nguyên bản hoặc chuỗi có `\n`. `BOOKING_SHEET_ID` và `SCREENING_SHEET_ID` phải trỏ tới hai bảng tính khác nhau; kiểm tra riêng cấu hình Production và redeploy sau khi đổi biến.
4. Cấu hình ba biến `VITE_EMAILJS_*` nếu muốn gửi email thông báo phụ cho phòng khám sau khi ghi đặt lịch thành công. Thiếu chúng, biểu mẫu vẫn ghi Sheet; trang cảm ơn sẽ báo email chưa được gửi.
5. Hai Sheet đích có đúng một tab tên `Trang tính1`. API ghi đích danh tab này bằng `RAW`, dùng cột A để đối soát mã lượt gửi và kiểm tra số cột của hàng tiêu đề trước khi ghi. Không chỉnh sửa hoặc xóa cột A trong lúc vận hành.

Nếu biểu mẫu trả `503`, xem log của Function `/api/booking` hoặc `/api/screening`: `GOOGLE_CREDENTIALS_MISSING`/`GOOGLE_AUTH_*` là lỗi xác thực; `SHEET_ID_MISSING`, `SHEET_IDS_MUST_BE_DISTINCT`, `SHEET_SCHEMA_MISMATCH` là lỗi cấu hình bảng; `GOOGLE_SHEETS_<mã HTTP>_*` là lỗi API Google Sheets. Đồng hồ máy chạy local cần đúng giờ để tạo JWT; mã nguồn chỉ thử lại theo thời gian Google khi Google báo riêng lỗi lệch `iat`/`exp`. Không gửi khóa riêng hoặc dữ liệu bệnh nhân khi chia sẻ log.

Thứ tự cột của Sheet đặt lịch (`A:H`): mã lượt gửi, thời điểm Việt Nam, nguồn, họ tên, số điện thoại, ngày khám, giờ khám, ghi chú.

### Email thông báo đặt lịch

Trong EmailJS, kết nối một email service và tạo template. Đặt **To Email** thành địa chỉ nhận của phòng khám ngay trong template, **Subject** là `{{notification_subject}}` và nội dung là `{{formatted_message}}`. Mã nguồn chỉ truyền dữ liệu đặt lịch vào template; địa chỉ nhận không lấy từ dữ liệu khách hàng. Sao chép Service ID, Template ID và Public Key mới vào ba biến `VITE_EMAILJS_*`, rồi khởi động lại Vite hoặc redeploy. Thử một lượt đặt lịch và xác nhận email thực sự đến hộp thư trước khi coi thông báo là hoạt động.

Có thể dùng [mẫu HTML thông báo đặt lịch](chỉnh%20sửa%20landingpage/Lần%201%20-%202.1.2026/emailjs-booking-template.html) trong Code Editor của EmailJS. Mẫu dùng đúng các biến `customer_name`, `customer_phone`, `booking_date_vn`, `booking_time`, `customer_message` và `booking_datetime` mà ứng dụng gửi.

### Email thông báo khảo sát

Tạo thêm **một template riêng** trong cùng tài khoản EmailJS. `EMAILJS_SCREENING_TEMPLATE_ID` phải khác `VITE_EMAILJS_TEMPLATE_ID`; API sẽ bỏ qua thông báo khảo sát nếu hai ID trùng nhau để tránh gửi nhầm mẫu đặt lịch. Đặt **To Email** là địa chỉ nhận của phòng khám, **Subject** là `{{notification_subject}}` và dán [mẫu HTML khảo sát](chỉnh%20sửa%20landingpage/Lần%201%20-%202.1.2026/emailjs-screening-template.html) vào Code Editor. Template dùng `submitted_at`, `parent_name`, `parent_phone`; chín câu trả lời và đường dẫn Sheet không được gửi qua EmailJS.

Điền Template ID mới vào `EMAILJS_SCREENING_TEMPLATE_ID` trong `.env` khi chạy local và Environment Variables trên Vercel. API khảo sát dùng lại `VITE_EMAILJS_SERVICE_ID` và `VITE_EMAILJS_PUBLIC_KEY` đang dùng cho đặt lịch. Nếu tài khoản bật Strict Mode, lấy Private Key trong EmailJS Dashboard → **Account → API Keys** và đặt vào `EMAILJS_PRIVATE_KEY` trong `.env` và Vercel Production Environment Variables. Đây là bí mật chỉ dùng ở server: không đặt trong biến `VITE_`, `src/` hoặc `public/`. Sau khi đổi biến, khởi động lại Vite hoặc tạo deployment mới. Thử cả khảo sát và form liên hệ tại `/danh-gia-nguy-co-can-thi/form-thong-tin/` để xác nhận Sheet có tên, số điện thoại ở cùng dòng, email đến hộp thư và trang cảm ơn báo trạng thái thông báo. Khi EmailJS lỗi hoặc chưa cấu hình, thông tin liên hệ vẫn được lưu và khách vẫn xem được kết quả.

Thông báo khảo sát được gửi từ `api/screening.js` trên Vercel Function hoặc Node của Vite khi chạy local. Trong EmailJS Dashboard → **Account → Security**, cần bật **API access from non-browser environments** cho tài khoản này. Nếu bật Strict Mode mà không có `EMAILJS_PRIVATE_KEY`, EmailJS cũng trả `403`. Khảo sát vẫn lưu vào Sheet nhưng trang cảm ơn báo chưa gửi được email. Xem dòng `Không thể gửi thông báo khảo sát:` trong log Function hoặc terminal chạy Vite để biết lỗi cụ thể.

Thứ tự cột của Sheet khảo sát (`A:Q`): mã lượt gửi, thời điểm Việt Nam, nguồn, 9 câu trả lời theo thứ tự trên trang, mức nguy cơ, đồng ý chính sách, họ tên phụ huynh, số điện thoại liên hệ, thời điểm đồng ý liên hệ. Sau khi lưu khảo sát, khách điền form liên hệ riêng; hệ thống cập nhật ba cột cuối trên cùng dòng rồi mới mở trang cảm ơn. Sheet cũ có đúng 14 tiêu đề `A:N` bên dưới và `O:Q` đang trống sẽ được bổ sung tiêu đề tự động. Tài khoản dịch vụ Google cần quyền chỉnh sửa Sheet.

Nếu cần tạo lại Sheet, hàng tiêu đề dưới đây có thể dán trực tiếp vào ô `A1` của từng bảng:

```text
Mã lượt gửi	Thời điểm (VN)	Nguồn	Họ tên	Số điện thoại	Ngày khám	Giờ khám	Ghi chú
```

```text
Mã lượt gửi	Thời điểm (VN)	Nguồn	Tuổi	Giới tính	Tuổi phát hiện cận	Độ cận gần nhất	Tăng độ 12 tháng	Cận thị ở bố/mẹ	Thời gian ngoài trời	Thời gian nhìn gần	Nhu cầu tư vấn	Mức nguy cơ	Đồng ý chính sách	Họ tên phụ huynh	Số điện thoại liên hệ	Đồng ý liên hệ lúc (VN)
```

Trước khi đưa lên production, thử một lượt ở mỗi biểu mẫu trên Vercel Preview, đối chiếu đúng Sheet và đúng thứ tự cột, rồi thử trường hợp Sheet từ chối quyền ghi. Nếu Sheet đã có cấu trúc cột khác, cần điều chỉnh tab/cột hoặc dùng Sheet riêng cho luồng mới trước khi phát hành.

## Giới hạn đã biết

- Kiểm tra mã trùng bằng cách đọc cột A trước khi thêm hàng. Cách này xử lý thử lại thông thường nhưng hai Function chạy đồng thời trên hai instance có thể cùng ghi một mã. Google Sheets không cung cấp giao dịch thêm hàng kèm điều kiện duy nhất; nếu cần bảo đảm tuyệt đối, cần kho lưu trữ có ràng buộc unique hoặc Apps Script có khóa.
- Nếu khách đóng tab sau khi lưu khảo sát nhưng trước khi gửi form liên hệ, dòng khảo sát vẫn tồn tại với ba cột liên hệ trống. Mã lượt gửi chỉ được giữ trong phiên của tab hiện tại; khách cần làm lại khảo sát nếu mất phiên.
- Lời đánh giá/ảnh khách hàng và các số liệu y khoa trong tài liệu nguồn cần chủ sở hữu xác nhận quyền sử dụng và độ chính xác trước khi công bố.
