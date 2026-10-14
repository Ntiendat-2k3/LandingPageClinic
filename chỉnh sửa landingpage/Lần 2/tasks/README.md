# Danh sách task — Lần 2

Nguồn duy nhất để xác định phạm vi là [plan.md](../plan.md), mục 3. Mỗi task có các phase **đối chiếu → thực hiện → kiểm tra → cập nhật dấu vết**; chỉ tích hoàn thành khi có bằng chứng. Tình trạng “đã có” trong plan vẫn cần kiểm chứng ở task, không phải yêu cầu viết lại.

| Task | Plan ID | Phụ thuộc |
|---|---|---|
| [T01 Hero và liên hệ](task-01-hero-lien-he.md) | H01–H07, L01 | Không |
| [T02 Biến chứng và đánh giá](task-02-bien-chung-danh-gia.md) | G01–G04, A01–A02 | Không |
| [T03 Quy trình và phương pháp](task-03-quy-trinh-phuong-phap.md) | P01–P03, M01–M02 | Không |
| [T04 Đội ngũ, đánh giá, FAQ](task-04-doi-ngu-danh-gia-faq.md) | D01, T01, F01 | Không |
| [T05 Hai luồng form](task-05-hai-luong-form.md) | B01–B02, S01–S03 | Không; kiểm tra thật phụ thuộc env/quyền |
| [T06 Bố cục responsive](task-06-bo-cuc-responsive.md) | X01 và H03/G04/A02 | T01–T04 |
| [T07 Nghiệm thu](task-07-nghiem-thu.md) | Toàn bộ ID | T01–T06 |

Sau mỗi task, cập nhật cột trạng thái tại plan hoặc ghi rõ giới hạn/bằng chứng ngay trong task. Không đánh dấu “đã nghiệm thu” chỉ dựa trên việc code tồn tại.

## Trạng thái 12/10/2026

T01, T02 và T04 đã hoàn thành phần kiểm tra local. T03 đã kiểm tra mã, bốn tab, phím ArrowRight/Home/End và reduced motion; còn quyền nhúng/phát YouTube thật. T05 có 8/8 kiểm tra API đạt, browser xác nhận hai form với API giả lập, quyền đọc hai Sheet đã đạt; còn ghi thử Sheet và nhận email trên Preview. T06 đã đo sáu viewport không tràn ngang và mô phỏng zoom CSS 200%/reduced motion; cần kiểm tra zoom trình duyệt thật. T07 đã kiểm tra tương tác local; Vercel CLI chưa đăng nhập nên chưa có Preview/deploy. Bảng bằng chứng theo từng ID ở [plan.md mục 6](../plan.md#6-kết-quả-triển-khai-và-dấu-vết-nghiệm-thu-trong-workspace).
