# T02 — Biến chứng và CTA khảo sát

**Trace plan:** [G01–G04, A01–A02](../plan.md#3-đối-chiếu-từng-yêu-cầu-và-việc-cần-làm). **Nguồn DOCX:** Phần 1/II–III; ảnh Word 6–9.

## Phase 1 — Đối chiếu

- [x] So `GoalsSection.tsx`, `ProgressionAssessmentSection.tsx`, `vi.json` với câu nguy cơ, nguồn số liệu, hai tiêu đề và CTA trong DOCX.
- [x] Xác nhận ảnh bên trái thu nhỏ, hai cột cân đối và bên phải không có khung trắng độc lập.

## Phase 2 — Thực hiện

- [x] G01: đưa hai dòng section 2 vào một H1 có hai dòng thị giác.
- [x] G04/A02: chỉ điều chỉnh kích thước/căn CTA và spacing khi đo thực tế còn lệch; không lặp nội dung hay thêm section mới.

## Phase 3 — Kiểm tra và cập nhật plan

- [x] Kiểm tra DOM heading, CTA đến đúng đích, nguồn số liệu không bị cắt; đo chiều cao section 2 ở desktop và cách cuộn ở mobile.
- [x] Ghi bằng chứng/trạng thái cho G01–G04, A01–A02 trong plan.

## Trạng thái 12/10/2026

Các phase local đã thực hiện. Section 2 cao 733 px tại 1280×800; màn hình thấp hơn được cuộn tự nhiên. Xem [plan.md](../plan.md), mục 6.
