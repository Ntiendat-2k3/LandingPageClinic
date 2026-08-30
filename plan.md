# Kế hoạch phát hành form tĩnh tại đường dẫn phụ của landing page

## 1. Kết luận kỹ thuật

Có thể triển khai form đang chạy local thành một trang phụ trên cùng website:

- Landing page hiện tại: `https://pkmatdrtrantuan.vn/`
- Form đánh giá: `https://pkmatdrtrantuan.vn/danh-gia-nguy-co-can-thi/`

Form **không được chuyển thành React**. Bộ HTML/CSS/JavaScript hiện có được phát hành như tài sản tĩnh độc lập trong output của Vite.

Luồng triển khai:

```text
C:\Users\ASUS\Downloads\Mã nguồn form\Mã nguồn form
  → chọn các tệp public cần thiết
  → public/danh-gia-nguy-co-can-thi/
  → npm run build
  → dist/danh-gia-nguy-co-can-thi/
  → deploy cùng landing page
  → https://pkmatdrtrantuan.vn/danh-gia-nguy-co-can-thi/
```

Vite phục vụ các tệp trong `public` từ đường dẫn gốc khi phát triển và sao chép nguyên trạng chúng vào `dist` khi build. Vì vậy form giữ nguyên HTML, CSS, JavaScript và nội dung khảo sát; React không xử lý hoặc bundle form này.

## 2. Phạm vi công việc

### Trong phạm vi

- Đưa bản form tĩnh hiện tại vào thư mục `public/danh-gia-nguy-co-can-thi/`.
- Bảo toàn nguyên văn nội dung khảo sát, lựa chọn, điểm số, thuật toán và nội dung kết quả từ nguồn khách hàng.
- Build form cùng landing page để tạo đúng đường dẫn phụ trên cùng domain.
- Thêm một CTA trên landing page dẫn tới `/danh-gia-nguy-co-can-thi/`.
- Kiểm tra form và landing page trên local, preview build và production.
- Ghi lại quy trình thay phiên bản form sau này.

### Ngoài phạm vi

- Chuyển form sang React/TypeScript.
- Tạo React Router route cho form.
- Nhúng form bằng `iframe`.
- Sửa nội dung y khoa hoặc thuật toán của form khi chưa được khách/bác sĩ duyệt.
- Thay đổi Google Forms, Apps Script hoặc Google Sheets trong lần tích hợp này.
- Thay đổi form đặt lịch/EmailJS hiện có của landing page.

## 3. Nguồn form và tệp được phát hành

Nguồn hiện tại:

`C:\Users\ASUS\Downloads\Mã nguồn form\Mã nguồn form`

### Tệp đưa vào website

| Tệp nguồn | Tệp đích trong repository | Vai trò |
|---|---|---|
| `index.html` | `public/danh-gia-nguy-co-can-thi/index.html` | Trang khảo sát, giao diện và thuật toán |
| `privacy.html` | `public/danh-gia-nguy-co-can-thi/privacy.html` | Chính sách quyền riêng tư |
| `Logo PK.png` | `public/danh-gia-nguy-co-can-thi/Logo PK.png` | Logo được `index.html` tham chiếu |

### Tệp không đưa vào web root

| Tệp | Lý do |
|---|---|
| `google-apps-script.gs` | Là mã backend/dự phòng; nếu sử dụng phải triển khai trong Google Apps Script, không công khai như tệp tải xuống |
| `HUONG-DAN-TRIEN-KHAI.md` | Là tài liệu bàn giao nội bộ, không cần phục vụ cho người dùng website |

Không đổi tên `Logo PK.png` trong lần tích hợp đầu tiên vì HTML nguồn đang dùng đường dẫn tương đối đúng tên này.

## 4. Cơ chế giữ nội dung đầy đủ và chính xác

Form được sao chép như tài sản tĩnh, không viết lại bằng JSX và không tách nội dung sang cấu hình khác.

Quy tắc:

1. Bản trong thư mục nguồn khách hàng là nguồn chân lý cho từng đợt cập nhật.
2. Không chỉnh thủ công câu hỏi, lựa chọn, giá trị radio, thuật toán `classify()` hoặc nội dung kết quả trong lúc tích hợp.
3. Sau khi sao chép, so sánh hash hoặc nội dung ba tệp nguồn/đích để xác nhận không bị thay đổi ngoài ý muốn.
4. Kiểm tra đủ 9 câu hỏi và các kết quả `high`, `medium`, `low` trên bản build.
5. Nếu cần sửa lỗi kỹ thuật trong form, sửa ở nguồn form được quản lý rồi đồng bộ lại; không tạo hai phiên bản logic khác nhau.

Phương án này bảo đảm bản production giống bản khách đang chạy local tại thời điểm bàn giao.

## 5. Cấu trúc sau khi tích hợp

```text
Clinic_landing_page/
├─ public/
│  ├─ images/
│  ├─ video/
│  └─ danh-gia-nguy-co-can-thi/
│     ├─ index.html
│     ├─ privacy.html
│     └─ Logo PK.png
├─ src/
│  └─ components/sections/HeroSection.tsx
└─ ...
```

Sau `npm run build`, phải có:

```text
dist/
├─ index.html
├─ assets/
└─ danh-gia-nguy-co-can-thi/
   ├─ index.html
   ├─ privacy.html
   └─ Logo PK.png
```

## 6. URL và routing

CTA của landing page dùng URL cùng origin:

`/danh-gia-nguy-co-can-thi/`

Dùng đường dẫn có dấu `/` cuối để web server tìm `index.html` trong thư mục rõ ràng và tránh phụ thuộc vào quy tắc redirect của hosting.

Yêu cầu với hosting:

- Tệp tĩnh có thật phải được phục vụ trước quy tắc fallback về SPA `index.html` ở root.
- `/danh-gia-nguy-co-can-thi/` phải trả trang form, không trả landing page React.
- `/danh-gia-nguy-co-can-thi/privacy.html` phải trả đúng trang chính sách.
- Không rewrite mọi request con về `/index.html` khi tệp/thư mục tương ứng tồn tại.
- Nếu CDN cache HTML, cần purge cache hoặc dùng thời gian cache ngắn cho `index.html` và `privacy.html` vì form được cập nhật thường xuyên.

Không thêm route này vào `src/App.tsx`; đây là đường dẫn tệp tĩnh, không phải route React Router.

## 7. CTA trên landing page

Vị trí đề xuất: trong `src/components/sections/HeroSection.tsx`, cạnh CTA hiện có “Đăng ký miễn phí ưu đãi 50%”.

Nhãn đề xuất:

**Đánh giá nguy cơ tiến triển cận thị**

Hành vi:

- Dùng liên kết HTML thật (`<a href="/danh-gia-nguy-co-can-thi/">`).
- Mặc định mở cùng tab vì đây là trang con cùng website; nút Back của trình duyệt đưa người dùng về landing page.
- CTA đặt lịch hiện tại vẫn là hành động chính.
- CTA đánh giá dùng kiểu phụ/outline.
- Desktop: hai CTA cạnh nhau và có thể wrap.
- Mobile: hai CTA xếp dọc, không tràn màn hình và có vùng chạm đủ lớn.
- Tái sử dụng icon từ `lucide-react`; không thêm dependency.

Không thêm cùng CTA vào Header, Footer hoặc Sticky CTA trong phạm vi mặc định để tránh lặp và làm giao diện quá tải. Nếu khách duyệt thêm vị trí sau, URL sẽ được đưa về một constant dùng chung.

## 8. Quy trình cập nhật form về sau

Khi khách gửi phiên bản mới của form:

1. Nhận đủ `index.html`, `privacy.html` và các asset được HTML tham chiếu.
2. Đối chiếu danh sách tệp và kiểm tra không có URL/asset bị thiếu.
3. Thay bản tương ứng trong `public/danh-gia-nguy-co-can-thi/`.
4. Không sửa CTA landing page nếu đường dẫn vẫn là `/danh-gia-nguy-co-can-thi/`.
5. Chạy build và test bản `dist`.
6. Deploy và purge cache HTML nếu hosting/CDN có cache.
7. Smoke test URL production.

Như vậy nội dung form có thể thay đổi thường xuyên mà không phải chuyển đổi lại sang React. Tuy nhiên, với cách form nằm trong `public` của repository, mỗi lần cập nhật form vẫn cần build/deploy website để đưa bản tĩnh mới lên production.

Nếu khách cần tự cập nhật form mà hoàn toàn không build lại landing page, cần một quy trình hosting độc lập cho riêng thư mục `/danh-gia-nguy-co-can-thi/`. Việc đó phụ thuộc hosting hiện tại và phải bảo đảm lần deploy landing page không xóa thư mục form.

## 9. Các bước triển khai

### Giai đoạn 1 — Đưa form vào public

- Tạo `public/danh-gia-nguy-co-can-thi/`.
- Sao chép đúng ba tệp public từ nguồn khách hàng.
- Kiểm tra hash/nội dung nguồn và đích.
- Xác nhận không đưa `.gs` và `.md` vào output public.

### Giai đoạn 2 — Thêm CTA

- Giữ nguyên CTA đặt lịch trong Hero.
- Thêm CTA phụ dẫn tới `/danh-gia-nguy-co-can-thi/`.
- Điều chỉnh layout CTA responsive tối thiểu.

### Giai đoạn 3 — Kiểm tra local

- Chạy server phát triển theo script hiện có.
- Mở `/danh-gia-nguy-co-can-thi/`.
- Kiểm tra logo, 9 câu hỏi, validation, ba kết quả, link privacy, Messenger và Google Form hiện có.
- Kiểm tra nút Back quay lại landing page.

### Giai đoạn 4 — Build và kiểm tra output

- Chạy `npm run lint`.
- Chạy `npm run build`.
- Xác nhận ba tệp nằm đúng trong `dist/danh-gia-nguy-co-can-thi/`.
- Chạy `npm run preview` và kiểm tra lại cả landing page lẫn form từ output production.
- Kiểm tra không có `.gs` hoặc `.md` trong `dist/danh-gia-nguy-co-can-thi/`.

### Giai đoạn 5 — Deploy và smoke test

- Deploy toàn bộ `dist` theo quy trình hiện tại.
- Mở `https://pkmatdrtrantuan.vn/` và kiểm tra CTA mới.
- Mở trực tiếp `https://pkmatdrtrantuan.vn/danh-gia-nguy-co-can-thi/` ở chế độ không đăng nhập.
- Kiểm tra `privacy.html`, logo và các CTA trong form.
- Kiểm tra trên ít nhất một thiết bị mobile và một desktop.

## 10. Kiểm thử bắt buộc

### Landing page

- CTA mới hiển thị đúng trên desktop/mobile.
- Dùng được bằng bàn phím và có focus visible.
- CTA đặt lịch cũ vẫn cuộn tới phần booking.
- Không phát sinh lỗi console hoặc layout shift đáng kể.

### Form tĩnh

- Hiển thị đúng UTF-8 và dấu tiếng Việt.
- Logo tải thành công, không lỗi 404.
- Có đúng 9 câu hỏi theo bản nguồn được khách giao.
- Không cho xem kết quả khi còn thiếu câu trả lời.
- Có thể tạo ra và hiển thị cả ba mức `high`, `medium`, `low` bằng các bộ câu trả lời kiểm thử.
- Link `privacy.html` hoạt động ở đúng thư mục con.
- Link Messenger và Google Form mở đúng đích hiện tại.
- Responsive ở chiều rộng mobile phổ biến.

### Hosting

- URL có dấu `/` cuối trả HTTP thành công và đúng nội dung form.
- Refresh trực tiếp tại URL form không quay về landing page.
- SPA fallback không nuốt đường dẫn form.
- Bản HTML mới xuất hiện sau deploy/purge cache.

## 11. Tiêu chí nghiệm thu

- `https://pkmatdrtrantuan.vn/` tiếp tục hoạt động như trước và có CTA form mới.
- `https://pkmatdrtrantuan.vn/danh-gia-nguy-co-can-thi/` phục vụ form độc lập.
- Form production giống đầy đủ bản nguồn khách hàng tại thời điểm tích hợp.
- Không có JSX/React component chứa 9 câu hỏi hoặc thuật toán form.
- Không có React Router route mới cho form.
- `privacy.html` và `Logo PK.png` hoạt động bằng đường dẫn tương đối.
- `google-apps-script.gs` và tài liệu `.md` không bị xuất bản công khai.
- Có quy trình rõ ràng để thay phiên bản form sau này mà không sửa CTA.
- `npm run lint` và `npm run build` đạt.

## 12. Các mục cần duyệt trước khi code

- [ ] Duyệt URL chính thức có dấu `/` cuối: `https://pkmatdrtrantuan.vn/danh-gia-nguy-co-can-thi/`.
- [ ] Duyệt việc đưa form tĩnh vào `public/danh-gia-nguy-co-can-thi/` và build cùng landing page.
- [ ] Duyệt chỉ xuất bản `index.html`, `privacy.html`, `Logo PK.png`.
- [ ] Duyệt vị trí CTA phụ trong Hero.
- [ ] Duyệt nhãn “Đánh giá nguy cơ tiến triển cận thị”.
- [ ] Duyệt mở cùng tab.
- [ ] Xác nhận mỗi lần cập nhật form sẽ build/deploy lại website; hoặc cung cấp thông tin hosting nếu muốn cập nhật thư mục form độc lập.
