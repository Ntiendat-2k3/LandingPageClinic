# T06 — Bố cục và khả năng đọc trên nhiều màn hình

**Trace plan:** [X01, H03, G04, A02](../plan.md#3-đối-chiếu-từng-yêu-cầu-và-việc-cần-làm); kiểm tra chéo P01–P03, M01, D01, T01, F01. **Nguồn DOCX:** ghi chú cuối Phần 1 và yêu cầu “một màn hình” ở section 2.

## Phase 1 — Đo hiện trạng

- [x] Dùng browser kiểm tra 320×568, 375×667, 768×768, 1024×768, 1280×800, 1440×900; ghi chiều cao section, tràn ngang/dọc, điểm cắt chữ và CTA.
- [x] Ưu tiên Hero/section 2/section 3 và nội dung dài (bốn tab, tám đánh giá, FAQ, form).

## Phase 2 — Căn chỉnh

- [x] Sửa spacing, kích thước chữ/ảnh, grid và vùng cuộn tại nơi đo được lỗi; dùng cùng hệ kiểu đang có.
- [x] Desktop tối ưu gần một viewport khi có thể; mobile/zoom cho phép cuộn để không giấu nội dung hay làm chữ quá nhỏ.

## Phase 3 — Kiểm tra và cập nhật plan

- [x] Kiểm tra focus khi chuyển tab bằng ArrowRight/End, zoom CSS 200% ở viewport 375 px không tràn ngang, reduced motion giữ nút phát thủ công, CTA quy trình có chiều cao tối thiểu 56 px. Đây là mô phỏng zoom bằng CSS, chưa thay thế kiểm tra zoom trình duyệt/thiết bị thật.
- [x] Ghi kết quả/ngoại lệ đo được vào X01 và các ID liên quan trong plan.

## Trạng thái 12/10/2026

Đã đo sáu viewport và loại tràn ngang. Kiểm tra thêm focus, CSS zoom 200% và reduced motion trên Chrome local; zoom trình duyệt/thiết bị thật vẫn là cổng kiểm tra ngoài. Xem [plan.md](../plan.md), mục 6.
