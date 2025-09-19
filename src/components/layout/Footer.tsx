"use client";

import {
  Phone,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Youtube,
  MessageSquare,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

/**
 * Helper tạo link Google Maps theo ưu tiên:
 * 1) placeId  -> chuẩn nhất
 * 2) cid      -> thực tế, dễ lấy từ nút Share
 * 3) lat/lng  -> fallback vị trí
 * 4) query    -> cuối cùng (ít “chính danh”)
 */
function buildMapsLink(opts: {
  placeId?: string;
  cid?: string;
  lat?: number;
  lng?: number;
  query?: string;
}) {
  const { placeId, cid, lat, lng, query } = opts || {};
  if (placeId)
    return `https://www.google.com/maps/search/?api=1&query_place_id=${encodeURIComponent(
      placeId
    )}`;
  if (cid) return `https://www.google.com/maps?cid=${encodeURIComponent(cid)}`;
  if (typeof lat === "number" && typeof lng === "number")
    return `https://www.google.com/maps?q=${lat},${lng}`;
  if (query)
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      query
    )}`;
  return "https://maps.google.com";
}

const Footer = () => {
  const partners = [
    { src: "/images/partners/zeiss.jpg", alt: "ZEISS" },
    { src: "/images/partners/seed.jpg", alt: "SEED" },
    { src: "/images/partners/tgvision.jpg", alt: "TG Vision" },
    { src: "/images/partners/101.jpg", alt: "101 Trading Co." },
    { src: "/images/partners/gomed.jpg", alt: "GoMed" },
    { src: "/images/partners/santen.jpg", alt: "Santen" },
  ];

  const fanpageUrl = "https://www.facebook.com/pkmatdrtrantuan";
  const messengerUrl = "https://m.me/pkmatdrtrantuan";

  // ====== Config cho địa chỉ / Zalo ======
  // HIỂN THỊ: vẫn là text như bạn muốn
  const ADDRESS_TEXT = "122 Bà Triệu, phường Hai Bà Trưng, Hà Nội";

  // >>> THAY THẾ Ở ĐÂY: placeId/cid/toạ độ của PHÒNG KHÁM B <<<
  // - Nếu bạn có placeId của B (lấy từ Autocomplete hoặc Place ID Finder) → điền vào đây
  const PLACE_ID_B = "PASTE_PLACE_ID_OF_CLINIC_B";
  // - (Tuỳ chọn) Nếu bạn có CID thay vì placeId:
  const CID_B = ""; // ví dụ: "12345678901234567890"
  // - (Tuỳ chọn) Nếu bạn muốn fallback toạ độ:
  const COORD_B = { lat: 21.027763, lng: 105.83416 }; // ví dụ Hà Nội

  // Link Maps ưu tiên: placeId -> cid -> lat/lng -> query theo ADDRESS_TEXT
  const MAPS_URL = buildMapsLink({
    placeId: PLACE_ID_B || undefined,
    cid: CID_B || undefined,
    lat: PLACE_ID_B || CID_B ? undefined : COORD_B.lat,
    lng: PLACE_ID_B || CID_B ? undefined : COORD_B.lng,
    query: PLACE_ID_B || CID_B ? undefined : ADDRESS_TEXT,
  });

  // Hiển thị vẫn như cũ, nhưng dùng số thuần để link Zalo
  const PHONE_DISPLAY = "03.878.12321";
  const PHONE_PLAIN = "0387812321";
  const ZALO_URL = `https://zalo.me/${PHONE_PLAIN}`;

  // === Responsive width cho Page Plugin (1 iframe duy nhất) ===
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [fbWidth, setFbWidth] = useState(340); // mặc định mobile

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const update = () => {
      const w = Math.round(el.clientWidth);
      setFbWidth(Math.min(w, 495)); // giới hạn tối đa 495
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Info (left) + Facebook (right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          {/* LEFT */}
          <div className="space-y-6">
            {/* Logo + tên */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl grid place-items-center bg-white shadow-sm">
                <img src="/images/logo.png" alt="logo" className="w-14 h-14" />
              </div>

              <div>
                <h3 className="font-space-grotesk text-[15px] lg:text-xl font-bold">
                  PHÒNG KHÁM CHUYÊN KHOA MẮT &amp; KHÚC XẠ
                </h3>
                <p className="lg:text-xl text-emerald-300 font-bold uppercase">
                  Dr Trần Tuấn
                </p>
              </div>
            </div>

            {/* Thông tin */}
            <div className="space-y-3 text-sm text-gray-300">
              {/* Địa chỉ -> Google Maps của PHÒNG KHÁM B theo placeId/cid/toạ độ */}
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group"
                aria-label="Mở Google Maps"
                title="Mở Google Maps"
              >
                <MapPin className="w-4 h-4 mt-0.5 text-cyan-400 shrink-0 group-hover:text-cyan-300 transition-colors" />
                <span className="underline decoration-dotted underline-offset-2 group-hover:text-white">
                  {ADDRESS_TEXT}
                </span>
              </a>

              {/* SĐT -> Zalo */}
              <a
                href={ZALO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
                aria-label="Chat Zalo"
                title="Mở Zalo chat"
              >
                <Phone className="w-4 h-4 text-cyan-400 shrink-0 group-hover:text-cyan-300 transition-colors" />
                <span className="underline decoration-dotted underline-offset-2 group-hover:text-white">
                  {PHONE_DISPLAY}
                </span>
              </a>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 text-cyan-400 shrink-0" />
                <span>
                  Thời gian làm việc: 08:00 – 19:00 (tất cả các ngày trong tuần)
                </span>
              </div>
            </div>

            {/* CẦN HỖ TRỢ? */}
            <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-5">
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                <div className="flex-1">
                  <div className="text-lg font-bold">CẦN HỖ TRỢ?</div>
                  <p className="text-gray-300 text-sm">
                    Nhấn “Chat me now” để tư vấn nhanh qua Messenger hoặc gọi
                    Hotline.
                  </p>
                </div>
                <a
                  href={messengerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-5 py-3 rounded-xl bg-emerald-500 text-white font-semibold whitespace-nowrap shrink-0 hover:bg-emerald-600 active:scale-[.99] transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  Chat me now
                </a>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-4">
              <a
                href={fanpageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 rounded-full grid place-items-center hover:bg-cyan-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 rounded-full grid place-items-center hover:bg-cyan-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 rounded-full grid place-items-center hover:bg-cyan-600 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>

            {/* Đối tác */}
            <div>
              <div className="text-sm text-gray-300 mb-3 font-semibold">
                ĐỐI TÁC CHIẾN LƯỢC
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 items-center">
                {partners.map((p, i) => (
                  <div
                    key={i}
                    className="h-12 bg-white/5 rounded-md flex items-center justify-center"
                  >
                    <img
                      src={p.src}
                      alt={p.alt}
                      className="max-h-9 object-contain"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Fanpage — 1 iframe, responsive theo wrapper */}
          <div>
            <div
              ref={wrapperRef}
              className="rounded-2xl overflow-hidden w-full md:w-[495px]"
            >
              <iframe
                key={fbWidth}
                title="Facebook Page"
                src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
                  fanpageUrl
                )}&tabs=timeline&width=${fbWidth}&height=360&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`}
                width="100%"
                height="360"
                style={{ border: "none", overflow: "hidden", display: "block" }}
                scrolling="no"
                frameBorder={0}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="mt-3 text-sm text-gray-300">
              Theo dõi fanpage để nhận ưu đãi & cập nhật mới nhất.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2024 Dr Trần Tuấn. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-cyan-400 transition-colors">
                Chính sách bảo mật
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors">
                Điều khoản sử dụng
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
