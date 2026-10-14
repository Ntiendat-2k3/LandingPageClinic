# Kế hoạch đối chiếu và hoàn thiện landing page — Lần 2

## 1. Mục tiêu, nguồn và nguyên tắc

Nguồn yêu cầu chính là `Nội dung cần chỉnh sửa.docx` trong cùng thư mục, gồm 77 đoạn chữ và 18 ảnh minh họa. Ảnh, video và ảnh nhân sự/khách hàng gốc nằm ở thư mục `chỉnh sửa landingpage/`. Trạng thái dưới đây được đối chiếu với mã hiện tại tại thời điểm lập kế hoạch, **không đồng nghĩa đã nghiệm thu production**. Tài liệu `Lần 1 - 2.1.2026/plan.md` và `trace.md` là lịch sử triển khai, không thay thế DOCX Lần 2.

Mục tiêu là hoàn thiện đúng nội dung, hình ảnh, liên kết và hai luồng gửi form mà khách yêu cầu; tái sử dụng phần đã có thay vì dựng lại. Chỉ sửa code sau khi plan này và các task trong [`tasks/`](tasks/README.md) đã được lập. Khi hoàn thành task phải cập nhật trạng thái ở bảng đối chiếu và ghi bằng chứng kiểm tra.

### Cách đọc mã yêu cầu

- `H`: section 1 và liên hệ đầu/cuối trang; `G`: section 2; `A`: section 3; `P`: section 4; `M`: section 5; `D`: section 6; `T`: đánh giá; `F`: FAQ; `B`: đặt lịch; `S`: khảo sát; `X`: nghiệm thu chung.
- **Đã có, cần xác minh**: mã hiện có đáp ứng về cấu trúc/nội dung nhưng chưa đủ bằng chứng ở bản build và production.
- **Cần sửa**: chênh lệch cụ thể giữa DOCX và mã. **Cần xác nhận ngoài mã**: quyền, cấu hình hoặc vận hành mà repository không chứng minh được.
- Số section trong DOCX bị lặp `VII` và `SECTION 7`; ở đây dùng tên chức năng để không nhầm form đặt lịch với đánh giá khách hàng.

## 2. Luồng code và ranh giới dữ liệu hiện tại

`src/App.tsx` dựng trang chính theo thứ tự Hero → Goals → ProgressionAssessment → Process → Pricing → Doctors → Testimonials → FAQ → Booking. `Header` và `Footer` dùng chung trên các route React. Copy hiển thị của React nằm trong `src/locales/vi.json`; link liên hệ tập trung ở `src/config/site.ts`; ba link xã hội dùng `SocialLinks.tsx`.

**Đặt lịch:** `BookingSection.tsx` kiểm tra form → `POST /api/booking` → `api/_validation.js` kiểm tra lại → `api/_googleSheets.js` ghi `RAW` vào Sheet có ID từ `BOOKING_SHEET_ID` → giao diện mới gọi EmailJS phụ và điều hướng `/cam-on-dang-ky` (`BookingSuccess.tsx`). Nếu Sheet lỗi, khách ở lại form và thấy lỗi. Email hiện là thông báo phụ; không được dùng trạng thái email để giả định dữ liệu đã lưu.

**Khảo sát:** `public/danh-gia-nguy-co-can-thi/index.html` có 9 câu và consent → `survey.mjs` gửi `POST /api/screening` → `api/_validation.js` kiểm tra → server tính lại nguy cơ bằng `classify.mjs` → ghi Sheet có ID từ `SCREENING_SHEET_ID` → tùy cấu hình gửi EmailJS → lưu tạm mức nguy cơ trong session → điều hướng `/cam-on-khao-sat` (`ScreeningSuccess.tsx`). `vercel.json` rewrite hai URL cảm ơn tới React; `vite.config.ts` phục vụ route khảo sát và hai API khi chạy local. Không đổi 9 lựa chọn, thang điểm hay phân loại nếu không có yêu cầu mới được duyệt.

Hai ID trong `.env.example` trùng URL Sheet trong DOCX: đặt lịch `1JP0s-PgN1Gvq2Kfundlz5issEp3NK6SquoR1mg25FyU`, khảo sát `12XmUB-K9yNuz26LE0-kbIWHK5JSj_EqB9U_Ii265OWc`. **ID trong file ví dụ chưa chứng minh biến môi trường trên Vercel, quyền service account hoặc thông báo email đang hoạt động.** Không ghi dữ liệu thật vào Sheet chỉ để kiểm tra tĩnh.

## 3. Đối chiếu từng yêu cầu và việc cần làm

Bảng này ghi **hiện trạng trước khi sửa Lần 2** để giữ rõ lý do của từng task. Kết quả sau sửa và các điều kiện còn mở nằm ở mục 6.

| ID | Yêu cầu từ DOCX/ảnh | Mã hiện tại và trạng thái | Hành động/tiêu chí hoàn thành | Task |
|---|---|---|---|---|
| H01 | Bỏ ba ô số liệu `10K+ / 97.8% / 10+` | Hero không còn ô này — đã có | Kiểm tra bản build không tái xuất hiện | T01 |
| H02 | Thay đúng hai câu về đội ngũ và trải nghiệm Ortho-K | `vi.json` đã có câu mới — đã có | Đối chiếu nguyên văn, giữ dấu `*` và chú thích điều kiện | T01 |
| H03 | Hai CTA đúng chữ, lớn, ngang hàng, **căn giữa toàn trang** | Chữ/chiều cao đã có; nhóm CTA vẫn nằm trong cột trái — **cần sửa** | Đưa nhóm CTA vào vùng rộng toàn Hero ở desktop, giữ bố cục dễ dùng trên mobile; cả hai vẫn đi đúng form | T01 |
| H04 | Dùng `Ảnh 1.jpg`, căn ảnh và click tới Maps | `clinic-sign.webp` là bản tối ưu của đúng ảnh (sai khác nén trung bình khoảng 2,9/255), link Maps đã có — đã có | Kiểm tra crop, alt, link và tải ảnh tại breakpoint chính | T01 |
| H05 | Tên trung tâm/phòng khám không viết tắt, H1 đúng ba dòng | Hero đang dùng một H1 ba `span`, nhưng dòng 2/3 là “PHÒNG KHÁM CHUYÊN KHOA” / “MẮT DR TRẦN TUẤN”; ảnh DOCX chỉ định nội dung tên đầy đủ — **cần đối chiếu hiển thị** | Chốt ngắt dòng ba dòng rõ ràng, không cắt chữ hoặc tràn ở 320–1440 px; giữ H1 là một tiêu đề | T01 |
| H06 | H2 “Kiểm soát cận thị cho trẻ với phác đồ cá nhân hóa” | Đã có đúng chữ và thẻ H2 | Kiểm tra DOM/bản build | T01 |
| H07 | Zalo, Facebook, TikTok bằng icon nhận diện thật; link đúng; hotline `03.878.12321`, địa chỉ/Maps | URL, hotline, Maps đã có ở Header/Footer; Zalo hiện là chữ, TikTok là `Music2` — **cần sửa icon** | Dùng cùng một bộ icon ở Header/Footer qua `SocialLinks`; icon có tên truy cập, focus và mở link thật; hotline gọi được | T01 |
| G01 | Hai dòng đầu section 2 là H1 | Dòng đầu là H1; dòng “ĐANG ĐƯỢC COI…” còn là `p` — **cần sửa** | Đặt cả hai dòng trong cùng H1 và giữ thứ bậc thị giác | T02 |
| G02 | Bên trái: 2050, ảnh nhỏ hơn, thêm nguồn số liệu | Đã có ảnh cao tối đa 160 px và nguồn tại `goals.sources`; dấu câu nguồn đã được chuẩn hóa — đã có | Đối chiếu đủ tác giả/tạp chí/năm/DOI trong DOCX, tránh cắt nguồn trên mobile | T02 |
| G03 | Bên phải bỏ khung trắng; hai nửa đồng đều, cùng tông | Hiện dùng nền section chung và grid hai cột, không có card trắng bao cột phải — đã có | Đánh giá cân bằng trên desktop, không tạo khung lệch màu | T02 |
| G04 | Câu nguy cơ `-6.00D`, CTA mới lớn/căn giữa, vừa một màn hình | Copy và CTA đã có; chiều cao viewport chưa được đo — **cần xác minh** | Ở desktop 1280×800/1440×900 nội dung chính và CTA nhìn thấy trong một lượt cuộn hợp lý; màn hình thấp/mobile được cuộn tự nhiên, không che nguồn | T02, T07 |
| A01 | Hai tiêu đề “Con đang tăng độ?” và “Kiểm tra nguy cơ…” viết hoa, H1 | `ProgressionAssessmentSection.tsx` có hai H1 và `uppercase` — đã có | Kiểm tra CSS/DOM và thứ tự đọc | T02 |
| A02 | CTA “Test đánh giá nguy cơ cận thị” lớn, căn giữa | Copy đúng; nút phủ chiều rộng card bên phải — **cần đánh giá căn giữa theo bố cục** | Nút nổi bật, cân xứng trong card/section, đi tới route khảo sát | T02 |
| P01 | Nội dung sáu bước bên phải theo ảnh | `ProcessSection` dùng sáu bước từ `vi.json` — đã có | Đối chiếu từng bước và dấu câu với ảnh mẫu, không thay đổi nội dung y khoa tùy ý | T03 |
| P02 | Bên trái thêm tiêu đề, YouTube `xdi4Gp9bE-Q`, tự phát khi cuộn tới | Có iframe tạo khi vào khung nhìn, phát tắt tiếng, dừng khi rời/ẩn tab và nút phát tay — đã có | Kiểm tra quyền nhúng, thao tác tay, reduced motion và tránh tải trước khi cần | T03 |
| P03 | CTA mới lớn đặt bên phải | Đã ở cuối cột phải, copy đúng | Kiểm tra click và bố cục | T03 |
| M01 | Bốn tab đúng nội dung/ảnh như video quay mẫu | `PricingSection` có bốn tab và ảnh tương ứng; đã hỗ trợ phím mũi tên/Home/End — đã có | So video mẫu từng tab, ảnh và tỷ lệ; kiểm tra cả click lẫn bàn phím | T03 |
| M02 | Thay đoạn tư vấn và ghi chú hiệu quả | `vi.json` đã có copy mới; bản hiện tại bỏ lỗi lặp “phụ thuộc vào” trong DOCX — đã có | Giữ bản đúng chính tả, đối chiếu không mất nghĩa | T03 |
| D01 | Ba hồ sơ và ảnh đội ngũ theo ảnh mẫu | Ba profile và ảnh đã gắn; tiêu đề section H1, tên H2 — đã có | Đối chiếu ảnh đúng người, chữ từng profile và quyền dùng ảnh | T04 |
| T01 | Hiển thị đủ tám đánh giá theo ảnh mẫu | `TestimonialsSection` có 8 mục; desktop grid 4×2, mobile cuộn ngang — đã có | Kiểm tra đủ 8 lời/ảnh/tên, không cắt chữ; quyền dùng đánh giá cần chủ sở hữu xác nhận | T04 |
| F01 | FAQ sau đánh giá trước form; đúng bốn Q&A; dòng “FAQ…” H1 | Vị trí/nội dung/ảnh đã có, tiêu đề đang là H2 — **cần sửa H1** | Đổi heading; so nguyên văn 4 đáp án, giữ hai ảnh và đọc được trên mobile | T04 |
| B01 | Form chính ghi **Sheet đặt lịch riêng** và có thông báo | `/api/booking` ghi Sheet riêng; EmailJS được gọi sau lưu — đã có về mã, **cần xác minh vận hành** | Kiểm tra ID/env/quyền, test giả lập lỗi/thành công; test thật trên preview chỉ khi có quyền và tránh lead giả trong dữ liệu thật | T05, T07 |
| B02 | Trang `/cam-on-dang-ky` sau khi gửi thành công | Route, trang cảm ơn và rewrite đã có | Kiểm tra submit thành công, tải trực tiếp và refresh; không hiện “đã lưu” khi API lỗi | T05 |
| L01 | Ba icon ở footer giống đầu trang | Footer dùng lại `SocialLinks`; chịu cùng lỗi icon H07 — **cần sửa chung** | Một nguồn icon/link cho cả hai vị trí | T01 |
| S01 | Form phụ ghi **Sheet khảo sát riêng** và có thông báo | `/api/screening` ghi Sheet riêng, email thông báo phụ — đã có về mã, **cần xác minh vận hành** | Test 9 đáp án, consent, ID/env, lỗi ghi và thông báo sau lưu; không đẩy câu trả lời nhạy cảm vào email | T05, T07 |
| S02 | Checkbox đồng ý dưới câu 9, link chính sách; bỏ link footer cũ | Checkbox + link đúng vị trí; fine print không còn link — đã có | Gửi khi chưa tick phải bị chặn cả client và server; chính sách mở được | T05 |
| S03 | `/cam-on-khao-sat` hiển thị kết quả sau gửi; bỏ “Tư vấn qua điện thoại” | Route riêng và kết quả theo session đã có; chỉ còn Messenger — đã có | Kiểm tra các mức high/medium/low, refresh, truy cập trực tiếp và không có nút điện thoại | T05 |
| X01 | Các section cân đối, tối ưu theo một màn hình hiển thị | Một số section đã tối ưu, chưa đo toàn trang hiện tại — **cần xác minh** | Desktop ưu tiên vừa viewport khi có thể; mobile/zoom/chữ lớn được cuộn tự nhiên để giữ đủ nội dung, không khóa chiều cao gây mất chữ | T06, T07 |

## 4. Quyết định triển khai và giới hạn

1. **Giữ cấu trúc có sẵn.** Sửa trực tiếp các section, `vi.json`, `SocialLinks`, không tạo landing page thứ hai hay viết lại khảo sát bằng React. Dùng chung `SITE_CONTACT`/`SITE_LINKS`, `Button` và các UI primitive hiện hữu khi phù hợp.
2. **Tiêu đề:** DOCX yêu cầu nhiều H1 ở các section. Thực hiện đúng yêu cầu đó, mỗi cụm được yêu cầu là một heading có thể truy cập. Hai dòng section 2 nằm trong **một** H1; FAQ đổi H2 → H1. Kiểm tra thứ tự đọc bằng DOM, không chỉ nhìn CSS.
3. **Icon thương hiệu:** tìm asset nhận diện phù hợp có sẵn trước. Nếu cần thêm SVG, chỉ dùng SVG/logo được phép sử dụng; không lấy biểu tượng âm nhạc chung thay TikTok. Giữ tên truy cập `aria-label` và vùng click đủ lớn.
4. **Một màn hình:** không thể đưa tám lời đánh giá, bốn FAQ và form dài vào một viewport điện thoại mà vẫn đọc được. Diễn giải hợp lý là tối ưu khoảng trắng và bố cục trên desktop, cho phép mobile cuộn; không cắt nội dung, không giảm chữ tới mức khó đọc, không dùng `overflow:hidden` để giấu phần dư. Lấy 1280×800 và 1440×900 làm mốc desktop, 375×667 và 320×568 làm mốc mobile; thêm 768×768/1024×768 để phát hiện lệch cột.
5. **Dữ liệu và thông báo:** Sheet là nguồn xác nhận lưu. Thông báo email là phụ và có thể thất bại; UI phải nói đúng trạng thái. Không đưa private key vào client. Không thay đổi schema Sheet, câu hỏi, thuật toán nguy cơ hay chính sách bảo mật ngoài phần DOCX yêu cầu.
6. **Nội dung nhạy cảm:** số liệu nguy cơ, hiệu quả phương pháp, tiểu sử chuyên môn, lời/ảnh khách hàng lấy từ tài liệu khách; trước phát hành cần chủ sở hữu duyệt tính chính xác và quyền sử dụng. Không tự xác nhận y khoa từ mã nguồn.

## 5. Thứ tự thực hiện, kiểm tra và điều kiện xong

| Phase | Task | Kết quả bắt buộc |
|---|---|---|
| 0 | [T01](tasks/task-01-hero-lien-he.md) đến [T07](tasks/task-07-nghiem-thu.md) | Đọc nguồn, đối chiếu hiện trạng, chốt checklist theo ID trong bảng trên trước khi sửa code |
| 1 | [T01](tasks/task-01-hero-lien-he.md), [T02](tasks/task-02-bien-chung-danh-gia.md) | Hero, mạng xã hội, section 2–3 đúng chữ/heading/CTA |
| 2 | [T03](tasks/task-03-quy-trinh-phuong-phap.md), [T04](tasks/task-04-doi-ngu-danh-gia-faq.md) | Video, tab, đội ngũ, tám đánh giá, FAQ đúng nguồn |
| 3 | [T05](tasks/task-05-hai-luong-form.md) | Hai Sheet, thông báo, consent, hai route cảm ơn có hồi quy |
| 4 | [T06](tasks/task-06-bo-cuc-responsive.md) | Toàn trang cân đối ở các mốc màn hình, không tràn/cắt chữ |
| 5 | [T07](tasks/task-07-nghiem-thu.md) | `npm run check:i18n`, `npm run lint`, `node --test tests/lead-api.test.mjs`, `npm run build`; kiểm tra trực quan/browser và diff; đối chiếu production khi có deployment/quyền |

Plan chỉ được coi là hoàn tất khi **mọi ID** có bằng chứng trong task tương ứng hoặc được ghi rõ là điều kiện vận hành chưa thể xác minh. Bản build/local không thay cho kiểm tra Vercel Preview và hai Sheet thật. Không triển khai production nếu chưa có quyền triển khai hoặc phê duyệt nội dung/ảnh cần thiết.

## 6. Kết quả triển khai và dấu vết nghiệm thu trong workspace

Ngày đối chiếu: 12/10/2026. Đây là kết quả tại mã local/bản build; mục “chưa xác minh” là cổng vận hành, không được đánh dấu đạt production.

| ID | Kết quả và bằng chứng | Trạng thái |
|---|---|---|
| H01–H02, H04, H06 | Giữ phần đã đúng; `clinic-sign.webp` được đối chiếu với `Ảnh 1.jpg`; copy lợi ích và H2 từ `vi.json`. | Đạt ở mã |
| H03, H05 | `HeroSection.tsx` đưa hai CTA ra toàn chiều rộng grid; H1 ba dòng rõ ràng ở desktop, dòng cuối `DR TRẦN TUẤN`; mobile ưu tiên tiêu đề và CTA trước ảnh, không che mất đầu H1. | Đạt ở bản build |
| H07, L01 | `SocialLinks.tsx` dùng ba icon riêng do chủ dự án đặt trong `public` cho Header/Footer. TikTok được sao chép thành `.avif` vì file gốc mang đuôi `.webp` nhưng dữ liệu là AVIF; file gốc vẫn được giữ. Chrome local giải mã đủ ba icon và hiển thị mỗi ảnh 40 px; URL, hotline và Maps giữ nguyên. | Đạt ở mã; link ngoài cần thử trên thiết bị thật |
| G01–G03 | Hai dòng section 2 cùng một H1; nguồn, ảnh 2050 và hai cột giữ đúng nội dung. | Đạt ở bản build |
| G04 | Section 2 được rút gọn spacing/ảnh; đo lại bản build cuối: cao 733 px tại 1280×800 (vừa phần nhìn dưới Header 64 px). Ở 1024×768 nội dung cao khoảng 799 px, phải cuộn để giữ chữ/nguồn. | Đạt có giới hạn màn hình thấp |
| A01–A02 | Hai H1 viết hoa, CTA đúng chữ/link; card tiếp tục hiển thị đầy đủ. | Đạt ở mã |
| P01, P03 | Sáu bước và CTA ở cột phải; sau tối ưu section cao 729 px tại 1280×800, CTA vẫn nằm trong section. | Đạt ở bản build |
| P02 | Iframe YouTube chỉ tạo khi cuộn vào vùng video và phát tắt tiếng; dừng khi rời/ẩn tab, có nút phát tay. Chrome local xác nhận chế độ reduced motion giữ nút phát thủ công, chế độ thường tạo iframe đúng ID và tham số. Chưa xác nhận YouTube cho nhúng/phát thực tế trên trình duyệt người dùng. | Mã đạt, vận hành chưa xác minh |
| M01–M02 | Đã xem mẫu `record quay màn hình.mp4` ở các mốc 1, 5, 9, 13, 17 giây để đối chiếu đủ bốn phương pháp. Cả bốn tab được click trên bản build: mỗi tab đổi đúng tên và ảnh tương ứng; ArrowRight/Home/End đổi tab và chuyển focus. Copy mô tả/ghi chú giữ đúng bản sửa chính tả. | Đạt ở bản build |
| D01, T01, F01 | H1/H2 đội ngũ giữ nguyên; tám đánh giá và bốn FAQ được đếm trên DOM; tiêu đề FAQ đổi thành H1. Lỗi CSS gốc ở `reset.css` được sửa bằng `@layer base`, làm ảnh FAQ cao đúng 220 px; section FAQ còn 691 px tại 1280×800. | Đạt ở mã; quyền dùng ảnh/lời đánh giá chưa được xác nhận |
| B01–B02, S01–S03 | Hai luồng API/Sheet, consent và hai route cảm ơn đã có; 8/8 bài kiểm tra API đạt. `.env` có đúng hai ID từ DOCX; Google OAuth trả 200, hai Sheet trả 200 và đều có tab `Trang tính1` khi kiểm tra chỉ đọc. Chrome local với API giả lập xác nhận validation, lỗi ghi không chuyển route, thành công chuyển route; khảo sát kiểm tra thiếu câu trả lời/consent và đủ ba mức kết quả, không còn nút tư vấn điện thoại. Chưa ghi thử hai Sheet thật hoặc nhận email thật. | Mã và quyền đọc đạt, vận hành ghi/gửi chưa xác minh |
| X01 | Đo 320×568, 375×667, 768×768, 1024×768, 1280×800, 1440×900: không có tràn ngang. Sửa Footer để iframe Facebook không làm rộng trang ở 768 px; thu gọn Goals/Process/Doctors/FAQ trên desktop. Chrome local kiểm tra thêm focus tab, CSS zoom 200% tại viewport 375 px không tràn ngang và reduced motion. Mobile và một số màn hình thấp vẫn cuộn tự nhiên để không mất nội dung; CSS zoom chỉ là phép mô phỏng, cần kiểm tra zoom trình duyệt thật. | Đạt theo diễn giải responsive ở mục 4 |

**Kiểm tra đã chạy:** `npm run check:i18n` (qua build), `npm run lint` (0 lỗi, 1 warning có sẵn ở `src/components/ui/button.tsx`), `node --test tests/lead-api.test.mjs` (8/8), `npm run build` và `git diff --check` đạt. Kiểm tra DOM/bố cục thực hiện qua Chrome CDP trên Vite preview; tương tác form/tab/reduced motion/zoom CSS qua Vite local, dùng API giả lập để không ghi dữ liệu thử vào Sheet thật. Đo lại G04 sau build cuối. Iframe video được xác nhận tạo với đúng YouTube ID và tham số autoplay/mute khi section vào viewport; quyền nhúng/phát thực tế còn cần trình duyệt người dùng.

**Cổng còn mở:** Vercel CLI chưa có phiên đăng nhập (`vercel whoami` báo không có credentials), nên chưa tạo Preview/deploy. Dù hai Sheet đọc được, quyền ghi, bản ghi thật và email đến nơi nhận vẫn cần thử trên Preview với dữ liệu kiểm thử được cho phép. Cần xác nhận YouTube trên trình duyệt người dùng, zoom trình duyệt thật và chủ sở hữu duyệt số liệu y khoa, hồ sơ, quyền ảnh/lời đánh giá. Không deploy trong lượt này.
