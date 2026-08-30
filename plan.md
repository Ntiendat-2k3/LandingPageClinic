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

### Trạng thái triển khai

- [x] Đã sao chép ba tệp public của form vào đúng thư mục con; nội dung và thuật toán khảo sát được giữ nguyên.
- [x] Đã đặt CTA khảo sát thành một dải riêng ngay sau phần “Cận thị và biến chứng”, dẫn tới `/danh-gia-nguy-co-can-thi/`.
- [x] Đã chuẩn hóa đường dẫn logo và chính sách thành đường dẫn tuyệt đối trong thư mục khảo sát để không phụ thuộc dấu `/` cuối URL.
- [x] Đã thêm redirect Vercel cho URL khảo sát không có dấu `/` cuối và URL `/privacy.html` cũ.
- [x] Đã giữ nguyên luồng Google Form → Google Sheets được khách xác nhận đang hoạt động.
- [x] Đã loại `.gs` và `.md` khỏi output public.
- [x] Đã đối chiếu bản nguồn sau chuẩn hóa đường dẫn, hash `privacy.html`/logo, lint, build và production preview qua HTTP.
- [x] Đã xác nhận bản Vercel trước khi sửa: form và trang chính sách trong thư mục con trả 200, riêng `/privacy.html` ở root trả 404 đúng như ảnh khách gửi.
- [ ] Chưa deploy bản sửa lỗi đường dẫn mới nhất lên hosting production.
- [ ] Chưa kiểm tra trực quan đa breakpoint do phiên triển khai không có trình duyệt điều khiển khả dụng.

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

Không đổi tên `Logo PK.png`. Trong bản tích hợp, `index.html` dùng đường dẫn `/danh-gia-nguy-co-can-thi/Logo%20PK.png` và `/danh-gia-nguy-co-can-thi/privacy.html` để tài nguyên luôn nằm đúng thư mục con, kể cả khi hosting mở form từ URL không có dấu `/` cuối.

### Luồng gửi Sheet được bảo toàn

Qua kiểm tra mã nguồn, `index.html` hiện không gọi `fetch`, không có `form action` tới Apps Script và không chứa URL Web App `/exec`. Nút **Tư vấn qua điện thoại** mở Google Form công khai; Google Form đang là lớp nhận dữ liệu và đồng bộ phản hồi vào Google Sheets theo cấu hình của khách hàng.

Vì khách đã xác nhận luồng này ghi Sheet thành công khi chạy local, lần tích hợp này giữ nguyên liên kết Google Form và không kích hoạt `google-apps-script.gs` song song. Việc bật thêm Apps Script khi chưa thay giao diện và chưa thống nhất một nguồn ghi duy nhất có thể tạo hai luồng dữ liệu, khó đối soát hoặc ghi trùng lead.

Nếu sau này khách yêu cầu bỏ hoàn toàn Google Forms, đó là một hạng mục riêng: triển khai `.gs` trong Google Apps Script, bổ sung các trường lead còn thiếu vào giao diện, kiểm tra dữ liệu/chống spam và thay liên kết hiện tại bằng luồng gửi mới.

## 4. Cơ chế giữ nội dung đầy đủ và chính xác

Form được sao chép như tài sản tĩnh, không viết lại bằng JSX và không tách nội dung sang cấu hình khác.

Quy tắc:

1. Bản trong thư mục nguồn khách hàng là nguồn chân lý cho từng đợt cập nhật.
2. Không chỉnh thủ công câu hỏi, lựa chọn, giá trị radio, thuật toán `classify()` hoặc nội dung kết quả trong lúc tích hợp.
3. Sau khi sao chép, đối chiếu nội dung và chỉ cho phép hai thay đổi tích hợp: đường dẫn logo và đường dẫn `privacy.html` được chuẩn hóa về thư mục khảo sát.
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
├─ vercel.json
├─ src/
│  ├─ App.tsx
│  └─ components/common/CTASection.tsx
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

`vercel.json` khai báo hai redirect 308 có phạm vi chính xác:

- `/danh-gia-nguy-co-can-thi` → `/danh-gia-nguy-co-can-thi/` để cả hai cách nhập URL đều mở đúng form.
- `/privacy.html` → `/danh-gia-nguy-co-can-thi/privacy.html` để liên kết cũ hoặc HTML còn cache không trả 404.

Yêu cầu với hosting:

- Tệp tĩnh có thật phải được phục vụ trước quy tắc fallback về SPA `index.html` ở root.
- `/danh-gia-nguy-co-can-thi/` phải trả trang form, không trả landing page React.
- `/danh-gia-nguy-co-can-thi/privacy.html` phải trả đúng trang chính sách.
- Không rewrite mọi request con về `/index.html` khi tệp/thư mục tương ứng tồn tại.
- Nếu CDN cache HTML, cần purge cache hoặc dùng thời gian cache ngắn cho `index.html` và `privacy.html` vì form được cập nhật thường xuyên.

Không thêm route này vào `src/App.tsx`; đây là đường dẫn tệp tĩnh, không phải route React Router.

## 7. CTA trên landing page

Vị trí áp dụng: một dải CTA riêng ngay sau `GoalsSection` (phần “Cận thị và biến chứng”) và trước nội dung video. Đây là điểm người dùng vừa hiểu vấn đề, phù hợp để mời làm khảo sát mà không cạnh tranh với CTA đặt lịch chính trong Hero.

Nhãn đề xuất:

**Làm bài đánh giá nguy cơ**

Hành vi:

- Dùng liên kết HTML thật (`<a href="/danh-gia-nguy-co-can-thi/">`).
- Mặc định mở cùng tab vì đây là trang con cùng website; nút Back của trình duyệt đưa người dùng về landing page.
- CTA đặt lịch trong Hero vẫn là hành động chính và giữ nguyên hành vi.
- CTA khảo sát có tiêu đề, mô tả thời gian hoàn thành khoảng 2 phút và một nút liên kết thật.
- Dải CTA responsive độc lập, không làm tăng nội dung bên trong `GoalsSection` vốn đang giới hạn đúng một viewport trên desktop.
- Tái sử dụng `CTASection` và `Button` hiện có; không thêm dependency.

Không thêm cùng CTA vào Header, Footer hoặc Sticky CTA trong phạm vi mặc định để tránh lặp và làm giao diện quá tải. Nếu khách duyệt thêm vị trí sau, URL sẽ được đưa về một constant dùng chung.

## 8. Quy trình cập nhật form về sau

Khi khách gửi phiên bản mới của form:

1. Nhận đủ `index.html`, `privacy.html` và các asset được HTML tham chiếu.
2. Đối chiếu danh sách tệp và kiểm tra không có URL/asset bị thiếu.
3. Thay bản tương ứng trong `public/danh-gia-nguy-co-can-thi/`.
4. Chuẩn hóa lại hai tham chiếu trong `index.html` thành `/danh-gia-nguy-co-can-thi/Logo%20PK.png` và `/danh-gia-nguy-co-can-thi/privacy.html` nếu bản nguồn mới dùng đường dẫn tương đối.
5. Không sửa CTA landing page nếu đường dẫn vẫn là `/danh-gia-nguy-co-can-thi/`.
6. Chạy build và test bản `dist`.
7. Deploy và purge cache HTML nếu hosting/CDN có cache.
8. Smoke test URL production.

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
- Mở rộng `CTASection` hiện có để hỗ trợ liên kết HTML thật.
- Đặt dải CTA khảo sát ngay sau `GoalsSection`, dẫn tới `/danh-gia-nguy-co-can-thi/`.

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
- URL không có dấu `/` cuối được Vercel redirect 308 sang URL canonical có dấu `/`.
- Refresh trực tiếp tại URL form không quay về landing page.
- SPA fallback không nuốt đường dẫn form.
- Bản HTML mới xuất hiện sau deploy/purge cache.

## 11. Tiêu chí nghiệm thu

- `https://pkmatdrtrantuan.vn/` tiếp tục hoạt động như trước và có CTA form mới.
- `https://pkmatdrtrantuan.vn/danh-gia-nguy-co-can-thi/` phục vụ form độc lập.
- Form production giống đầy đủ bản nguồn khách hàng tại thời điểm tích hợp.
- Không có JSX/React component chứa 9 câu hỏi hoặc thuật toán form.
- Không có React Router route mới cho form.
- `privacy.html` và `Logo PK.png` hoạt động bằng đường dẫn tuyệt đối trong thư mục khảo sát, không bị trỏ nhầm về root.
- `google-apps-script.gs` và tài liệu `.md` không bị xuất bản công khai.
- Có quy trình rõ ràng để thay phiên bản form sau này mà không sửa CTA.
- `npm run lint` và `npm run build` đạt.

## 12. Các mục đã duyệt và áp dụng

- [x] URL chính thức có dấu `/` cuối: `https://pkmatdrtrantuan.vn/danh-gia-nguy-co-can-thi/`.
- [x] Đưa form tĩnh vào `public/danh-gia-nguy-co-can-thi/` và build cùng landing page.
- [x] Chỉ xuất bản `index.html`, `privacy.html`, `Logo PK.png`.
- [x] Đặt dải CTA khảo sát ngay sau phần “Cận thị và biến chứng”.
- [x] Dùng tiêu đề “Kiểm tra nguy cơ tiến triển cận thị cho bé” và nhãn nút “Làm bài đánh giá nguy cơ”.
- [x] Mở cùng tab.
- [x] Các phiên bản form mới sẽ thay tệp trong `public` rồi build/deploy lại, miễn URL không đổi.

## 13. Chuẩn hóa nội dung React sang locale JSON

Toàn bộ nội dung hiển thị của ứng dụng React được quản lý tại `src/locales/vi.json`, gồm:

- Nội dung các section, Header, Footer, CTA và trang xác nhận đặt lịch.
- Dữ liệu danh sách bác sĩ, dịch vụ, phương pháp, quy trình, đánh giá khách hàng, FAQ và thiết bị.
- Nhãn hỗ trợ truy cập như `aria-label`, `alt`, placeholder và thông báo validation.
- Nội dung gửi trong email đặt lịch.

Các giá trị vận hành không phải bản dịch như URL, số điện thoại và định danh tài khoản được gom tại `src/config/site.ts`, không lặp trong component.

`src/i18n.ts` tự nhận mọi file `src/locales/<ma-ngon-ngu>.json` khi build. Ngôn ngữ mặc định lấy từ thuộc tính `lang` của trang; có thể kiểm tra một locale đã thêm bằng query string, ví dụ `?lang=en`. Nếu locale yêu cầu không tồn tại, ứng dụng quay về tiếng Việt.

Quy trình thêm tiếng Anh:

1. Sao chép `src/locales/vi.json` thành `src/locales/en.json`.
2. Chỉ dịch giá trị; giữ nguyên toàn bộ key, biến `{name}`, `{phone}`, `{address}`, `{number}` và cấu trúc mảng.
3. Chạy `npm run check:i18n` để kiểm tra cấu trúc và phát hiện text hiển thị bị hard-code lại trong `src`.
4. Chạy lint/build rồi kiểm tra `?lang=en`.

Hai quyết định giao diện từng phụ thuộc câu tiếng Việt đã được tách khỏi nội dung:

- Nhóm thẻ dịch vụ desktop không còn tìm cụm “gói khám”.
- Icon từng bước quy trình không còn suy luận từ từ khóa tiếng Việt.

Điều này giúp thay nội dung sang tiếng Anh mà không đổi thứ tự thẻ hoặc icon.
