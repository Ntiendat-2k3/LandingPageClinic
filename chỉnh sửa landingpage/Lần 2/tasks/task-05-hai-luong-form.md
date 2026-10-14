# T05 — Đặt lịch và khảo sát ghi hai Sheet riêng

**Trace plan:** [B01–B02, S01–S03](../plan.md#3-đối-chiếu-từng-yêu-cầu-và-việc-cần-làm). **Nguồn DOCX:** Phần 1/VIII và Phần 2/1–4; ảnh Word 15, 17–18.

## Phase 1 — Trace luồng

- [x] Đặt lịch: `BookingSection` → `/api/booking` → validation → `appendLead` → Sheet đặt lịch → EmailJS phụ → `BookingSuccess`.
- [x] Khảo sát: `index.html`/`survey.mjs` → `/api/screening` → validation/classify → Sheet khảo sát → EmailJS phụ → `ScreeningSuccess`.
- [x] So hai ID Sheet trong `.env.example` với DOCX; không in ra hoặc commit khóa bí mật từ `.env`.

## Phase 2 — Thực hiện

- [x] Chỉ sửa lỗi luồng tìm thấy sau khi trace; không gộp hai Sheet hoặc đổi thuật toán 9 câu.
- [x] Bảo đảm consent phía client/server, link policy dưới câu 9, footer khảo sát không lặp link, route cảm ơn và kết quả chỉ hiện sau lưu thành công; không có nút tư vấn điện thoại.

## Phase 3 — Kiểm tra và cập nhật plan

- [x] Chạy `node --test tests/lead-api.test.mjs` để kiểm tra phân luồng Sheet, dữ liệu sai, lỗi ghi và consent; thử các URL/refresh trên bản build.
- [x] Đối chiếu hai ID trong `.env` với DOCX; OAuth service account trả 200, hai Sheet trả 200 và đều có tab `Trang tính1` (chỉ đọc, không in khóa/dữ liệu).
- [x] Dùng browser với API giả lập để kiểm tra hai form: validation, lỗi ghi không chuyển route, lưu thành công mới chuyển route; khảo sát kiểm tra cả thiếu câu trả lời/consent và ba mức kết quả.
- [ ] Kiểm tra ghi Sheet và email thật trên Vercel Preview khi có phiên triển khai; không tự tạo lead giả trên production. **Chưa nghiệm thu vận hành.**
- [x] Ghi trạng thái/bằng chứng B01–B02, S01–S03 trong plan.

## Trạng thái 12/10/2026

Trace code và 8 bài kiểm tra API đã đạt. Quyền đọc hai Sheet và tab đích đã xác minh; browser xác nhận hai luồng với API giả lập. Chưa ghi thử hai Sheet hoặc nhận email thật ở Vercel Preview. Xem [plan.md](../plan.md), mục 6.
