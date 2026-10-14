# T03 — Quy trình, video và bốn phương pháp

**Trace plan:** [P01–P03, M01–M02](../plan.md#3-đối-chiếu-từng-yêu-cầu-và-việc-cần-làm). **Nguồn DOCX:** Phần 1/IV–V; ảnh Word 10–11; `record quay màn hình.mp4`; ảnh phương pháp 2–5.

## Phase 1 — Đối chiếu

- [x] So sáu bước, CTA, tiêu đề/video bên trái trong `ProcessSection.tsx` và `vi.json` với ảnh mẫu.
- [x] So từng tab, chữ và ảnh trong `PricingSection.tsx` với video nguồn; kiểm tra ảnh đã dùng đúng phương pháp.

## Phase 2 — Thực hiện

- [x] Chỉ sửa chênh lệch nội dung/ảnh thực sự tìm thấy; giữ logic autoplay khi vào viewport, dừng khi rời/ẩn tab, lựa chọn phát tay và reduced motion.
- [x] Giữ đoạn mô tả/ghi chú đã sửa chính tả trong M02; không tự đổi tỷ lệ hiệu quả y khoa.

## Phase 3 — Kiểm tra và cập nhật plan

- [x] Kiểm tra CTA bên phải, tab click/phím ArrowRight/Home/End; panel và ảnh cùng đổi. Iframe đúng ID, autoplay/mute; reduced motion giữ nút phát tay.
- [ ] Xác nhận link YouTube, quyền nhúng và phát thực tế trên trình duyệt người dùng có mạng.
- [x] Ghi bằng chứng/trạng thái P01–P03, M01–M02 trong plan.

## Trạng thái 12/10/2026

Mã và bốn tab đã kiểm tra trên preview local; phím ArrowRight, Home và End đổi đúng tab/focus. Reduced motion không tạo iframe tự động; chế độ thường tạo iframe đúng ID và tham số. Còn kiểm tra quyền nhúng/phát thực tế. Xem [plan.md](../plan.md), mục 6.
