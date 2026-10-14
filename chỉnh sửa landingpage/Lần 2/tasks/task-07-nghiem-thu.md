# T07 — Nghiệm thu theo toàn bộ plan

**Trace plan:** [H01–H07, G01–G04, A01–A02, P01–P03, M01–M02, D01, T01, F01, B01–B02, L01, S01–S03, X01](../plan.md#3-đối-chiếu-từng-yêu-cầu-và-việc-cần-làm).

## Phase 1 — Kiểm tra mã và tài liệu

- [x] Đối chiếu lại từng ID với DOCX/ảnh/video và task phụ trách; không bỏ sót mục do số section trong DOCX trùng nhau.
- [x] Xem `git diff`, tránh thay đổi ngoài phạm vi, trùng copy/link, key bí mật, asset không dùng; ghi rõ các chỗ chưa thể xác minh.

## Phase 2 — Chạy kiểm tra nhỏ nhất có ý nghĩa

- [x] `npm run check:i18n`; `npm run lint`; `node --test tests/lead-api.test.mjs`; `npm run build`.
- [x] Kiểm tra bản build bằng browser: link xã hội/Maps trong DOM, heading/CTA, bốn tab, iframe video, tám đánh giá, FAQ và hai route cảm ơn. Trên Vite local, dùng API giả lập để kiểm tra hai form ở cả đường thành công/lỗi.

## Phase 3 — Cổng phát hành

- [ ] Nếu có Vercel Preview, thử hai form và kiểm tra đúng Sheet, email đến nơi nhận, refresh URL; ghi kết quả thực tế.
- [x] Đánh dấu các nội dung cần chủ sở hữu duyệt: số liệu y khoa, hiệu quả phương pháp, tiểu sử, quyền ảnh/lời đánh giá. Không tự đánh dấu đạt khi chưa có chứng cứ.
- [x] Cập nhật toàn bộ trạng thái trong plan/task và bàn giao: thay đổi, kiểm tra đã chạy, lỗi/giới hạn còn lại.

## Trạng thái 12/10/2026

Build, lint, i18n, API test và kiểm tra DOM/bố cục/tương tác local đã thực hiện. Google OAuth và quyền đọc hai Sheet đạt; ghi thật/email vẫn chưa được xác minh. Vercel CLI không có phiên đăng nhập, nên chưa tạo Preview/deploy. Các checkbox còn mở là cổng nghiệm thu bên ngoài; xem [plan.md](../plan.md), mục 6.
