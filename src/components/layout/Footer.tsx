"use client";

import {
  Eye,
  Phone,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Youtube,
  MessageSquare,
} from "lucide-react";

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

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Col 1: Branding / Intro */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div className="font-space-grotesk font-bold text-xl">
                EyeCare Pro
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Phòng khám mắt với đội ngũ chuyên gia khúc xạ & Ortho-K, trang
              thiết bị hiện đại, cam kết dịch vụ an toàn và hiệu quả.
            </p>
            <div className="flex space-x-4">
              <a
                href={fanpageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Thông tin như ảnh (địa chỉ, hotline, giờ + đối tác) */}
          <div className="space-y-5">
            <h3 className="font-space-grotesk font-bold text-lg">
              PHÒNG KHÁM CHUYÊN KHOA MẮT &amp; KHÚC XẠ DR TRẦN TUẤN
            </h3>

            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-cyan-400 shrink-0" />
                <span>122 Bà Triệu, phường Hai Bà Trưng, Hà Nội</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>03.878.12321</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 text-cyan-400 shrink-0" />
                <span>08:00 – 19:00 (tất cả các ngày trong tuần)</span>
              </div>

              <div className="pt-2">
                <a
                  href="#chat"
                  className="inline-flex items-center gap-2 bg-amber-300/90 text-gray-900 font-semibold px-4 py-2 rounded-xl hover:bg-amber-300 transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  Chat me now
                </a>
              </div>
            </div>

            <div className="pt-2">
              <div className="text-sm text-gray-300 mb-3 font-semibold">
                ĐỐI TÁC CHIẾN LƯỢC
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 items-center">
                {partners.map((p, i) => (
                  <div
                    key={i}
                    className="h-10 sm:h-12 bg-white/5 rounded-md flex items-center justify-center"
                  >
                    <img
                      src={p.src}
                      alt={p.alt}
                      className="max-h-8 sm:max-h-10 object-contain"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Col 3: Facebook Page Plugin (giống ảnh mẫu) */}
          <div>
            <iframe
              title="Facebook Page"
              src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
                fanpageUrl
              )}&tabs=&width=380&height=200&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false`}
              width="380"
              height="120"
              style={{
                border: "none",
                overflow: "hidden",
                width: "100%",
                display: "block",
              }}
              scrolling="no"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <p className="mt-3 text-sm text-gray-300">
              Nhấn để theo dõi fanpage và nhận ưu đãi mới nhất.
            </p>
          </div>
        </div>

        {/* bottom bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2024 EyeCare Pro. Tất cả quyền được bảo lưu.
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
