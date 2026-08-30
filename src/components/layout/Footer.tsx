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
import { SITE_CONTACT, SITE_LINKS } from "@/config/site";
import { messages } from "@/i18n";

const PARTNER_IMAGES = ["zeiss.jpg", "seed.jpg", "tgvision.jpg", "101.jpg", "gomed.jpg", "santen.jpg"] as const;

const Footer = () => {
  const partners = PARTNER_IMAGES.map((image, index) => ({
    src: `/images/partners/${image}`,
    alt: messages.footer.partnerAlts[index],
  }));

  // === Responsive width cho Page Plugin (1 iframe duy nhất) ===
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [fbWidth, setFbWidth] = useState(340); // mặc định mobile

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    // Giới hạn tối đa 495 trên desktop, fit 100% trên mobile
    const update = () => {
      const w = Math.round(el.clientWidth);
      setFbWidth(Math.min(w, 495));
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
                <img src="/images/logo.png" alt={messages.footer.logoAlt} className="w-14 h-14" />
              </div>

              <div>
                <h3 className="font-space-grotesk text-[15px] lg:text-xl font-bold">
                  {messages.footer.brandLineOne}
                </h3>
                <p className="lg:text-xl text-emerald-300 font-bold uppercase">
                  {messages.footer.brandLineTwo}
                </p>
              </div>
            </div>

            {/* Thông tin */}
            <div className="space-y-3 text-sm text-gray-300">
              {/* Địa chỉ -> Google Maps (link cố định) */}
              <a
                href={SITE_CONTACT.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group"
                aria-label={messages.footer.openMaps}
                title={messages.footer.openMaps}
              >
                <MapPin className="w-4 h-4 mt-0.5 text-cyan-400 shrink-0 group-hover:text-cyan-300 transition-colors" />
                <span className="underline decoration-dotted underline-offset-2 group-hover:text-white">
                  {SITE_CONTACT.address}
                </span>
              </a>

              {/* SĐT -> Zalo */}
              <a
                href={SITE_LINKS.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
                aria-label={messages.footer.chatZalo}
                title={messages.footer.openZalo}
              >
                <Phone className="w-4 h-4 text-cyan-400 shrink-0 group-hover:text-cyan-300 transition-colors" />
                <span className="underline decoration-dotted underline-offset-2 group-hover:text-white">
                  {SITE_CONTACT.phoneDisplay}
                </span>
              </a>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 text-cyan-400 shrink-0" />
                <span>
                  {messages.footer.workingHours}
                </span>
              </div>
            </div>

            {/* CẦN HỖ TRỢ? */}
            <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-5">
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                <div className="flex-1">
                  <div className="text-lg font-bold">{messages.footer.supportTitle}</div>
                  <p className="text-gray-300 text-sm">
                    {messages.footer.supportDescription}
                  </p>
                </div>
                <a
                  href={SITE_LINKS.messenger}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-5 py-3 rounded-xl bg-emerald-500 text-white font-semibold whitespace-nowrap shrink-0 hover:bg-emerald-600 active:scale-[.99] transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  {messages.footer.chatNow}
                </a>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-4">
              <a
                href={SITE_CONTACT.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 rounded-full grid place-items-center hover:bg-cyan-600 transition-colors"
                aria-label={messages.footer.facebookLabel}
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 rounded-full grid place-items-center hover:bg-cyan-600 transition-colors"
                aria-label={messages.footer.instagramLabel}
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 rounded-full grid place-items-center hover:bg-cyan-600 transition-colors"
                aria-label={messages.footer.youtubeLabel}
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>

            {/* Đối tác */}
            <div>
              <div className="text-sm text-gray-300 mb-3 font-semibold">
                {messages.footer.partnersTitle}
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
                title={messages.footer.facebookPageTitle}
                src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
                  SITE_CONTACT.facebookUrl
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
              {messages.footer.followPage}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              {messages.footer.copyright}
            </p>
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-cyan-400 transition-colors">
                {messages.footer.privacy}
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors">
                {messages.footer.terms}
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors">
                {messages.footer.sitemap}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
