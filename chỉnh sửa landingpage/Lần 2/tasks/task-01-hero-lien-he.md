# T01 — Hero và liên hệ đầu cuối trang

**Trace plan:** [H01–H07, L01](../plan.md#3-đối-chiếu-từng-yêu-cầu-và-việc-cần-làm). **Nguồn DOCX:** Phần 1/I, IX; ảnh Word 1–5, 16; `Ảnh 1.jpg` ở thư mục cha.

## Phase 1 — Đối chiếu

- [x] Kiểm tra `HeroSection.tsx`, `Header.tsx`, `Footer.tsx`, `SocialLinks.tsx`, `site.ts`, `vi.json`, ảnh `/images/clinic-sign.webp`; xác nhận H01/H02/H04/H06 đã đúng.
- [x] So ba link mạng xã hội và hotline trong DOCX với `SITE_LINKS`/`SITE_CONTACT`; so ảnh hiện tại với `Ảnh 1.jpg`.

## Phase 2 — Thực hiện

- [x] H03: căn cặp CTA giữa toàn Hero trên desktop; vẫn ngang hàng khi đủ chỗ và xếp gọn trên màn hình nhỏ.
- [x] H05: hoàn thiện H1 ba dòng, không viết tắt hoặc bị ngắt chữ sai.
- [x] H07/L01: dùng ba icon riêng trong `public` qua `SocialLinks` chung ở Header/Footer; file TikTok có bản `.avif` đúng định dạng. Giữ URL, `aria-label`, focus, hotline và Maps.

## Phase 3 — Kiểm tra và cập nhật plan

- [x] Kiểm tra DOM H1/H2, label CTA, link ảnh/Maps và ba icon ở Header, menu mobile, Footer.
- [x] Chụp/quan sát 320, 375, 768, 1024, 1280 và 1440 px; không tràn H1 hay lệch CTA; ghi kết quả vào plan H01–H07/L01.

## Trạng thái 12/10/2026

Các phase local đã thực hiện. Bằng chứng và giới hạn kiểm tra link ngoài nằm trong [plan.md](../plan.md), mục 6.
