"use client";

import {
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { useEffect, useState } from "react";
import SocialLinks from "@/components/common/SocialLinks";
import { SITE_CONTACT, SITE_LINKS } from "@/config/site";
import { messages } from "@/i18n";

const PARTNER_IMAGES = ["zeiss.jpg", "seed.jpg", "tgvision.jpg", "101.jpg", "gomed.jpg", "santen.jpg"] as const;

interface FacebookPost {
  id: string;
  message: string;
  permalink: string;
  image: string | null;
  createdTime: string | null;
}

const Footer = () => {
  const partners = PARTNER_IMAGES.map((image, index) => ({
    src: `/images/partners/${image}`,
    alt: messages.footer.partnerAlts[index],
  }));

  const [facebookPosts, setFacebookPosts] = useState<FacebookPost[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/facebook-posts", { signal: controller.signal })
      .then((response) => response.ok ? response.json() : null)
      .then((result) => {
        if (Array.isArray(result?.posts) && result.posts.length > 0) {
          setFacebookPosts(result.posts);
        }
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  const displayPosts: FacebookPost[] = facebookPosts.length > 0
    ? facebookPosts
    : messages.footer.featuredPosts;

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-2.5 sm:px-6 lg:px-8 py-10 sm:py-12">
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
                <p className="font-space-grotesk text-[15px] lg:text-xl font-bold">
                  {messages.footer.brandLineOne}
                </p>
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
                <span className="font-semibold text-white underline decoration-dotted underline-offset-2 group-hover:text-cyan-200">
                  {SITE_CONTACT.address}
                </span>
              </a>

              {/* Hotline */}
              <a
                href={`tel:${SITE_CONTACT.phonePlain}`}
                className="flex items-center gap-3 group"
                aria-label={SITE_CONTACT.phoneDisplay}
              >
                <Phone className="w-4 h-4 text-cyan-400 shrink-0 group-hover:text-cyan-300 transition-colors" />
                <span className="font-semibold text-white underline decoration-dotted underline-offset-2 group-hover:text-cyan-200">
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

            <SocialLinks />

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

          {/* Fanpage & Bài viết trên Facebook */}
          <div className="min-w-0">
            <div className="w-full max-w-[495px] overflow-hidden rounded-2xl border border-white/10 bg-white text-slate-800 shadow-xl">
              {/* Fanpage Header */}
              <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 via-white to-blue-50/50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative size-12 shrink-0 rounded-full border border-slate-200 bg-white p-0.5 shadow-sm">
                      <img
                        src="/images/logo.png"
                        alt={messages.footer.facebookPageName}
                        className="size-full rounded-full object-contain"
                      />
                      <span className="absolute -bottom-0.5 -right-0.5 grid size-4 place-items-center rounded-full bg-blue-600 text-white shadow">
                        <CheckCircle2 className="size-3" />
                      </span>
                    </div>
                    <div className="min-w-0">
                      <a
                        href={SITE_CONTACT.facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block truncate text-sm font-bold text-slate-900 transition hover:text-blue-600 sm:text-base"
                      >
                        {messages.footer.facebookPageName}
                      </a>
                      <p className="truncate text-xs text-slate-500">
                        {messages.footer.facebookFollowers}
                      </p>
                    </div>
                  </div>
                  <a
                    href={SITE_CONTACT.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-[#1877F2] px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700"
                  >
                    <img src="/Icon_of_FB.webp" alt="" className="size-3.5 rounded-full" />
                    <span>{messages.footer.followPageBtn}</span>
                  </a>
                </div>
              </div>

              {/* Feed tiêu đề */}
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/90 px-4 py-2 text-xs font-medium text-slate-600">
                <span>{messages.footer.featuredPostsTitle}</span>
                <span className="flex items-center gap-1 text-slate-400">
                  <Clock className="size-3" />
                  <span>{messages.footer.facebookLabel} · {messages.footer.brandLineTwo}</span>
                </span>
              </div>

              {/* Danh sách bài viết */}
              <div className="max-h-[360px] divide-y divide-slate-100 overflow-y-auto">
                {displayPosts.map((post) => (
                  <article key={post.id} className="p-4 transition hover:bg-slate-50/80">
                    <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
                      <span className="font-medium text-slate-600">{messages.footer.facebookLabel} · {messages.footer.brandLineTwo}</span>
                      {post.createdTime && (
                        <time dateTime={post.createdTime}>
                          {new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium" }).format(new Date(post.createdTime))}
                        </time>
                      )}
                    </div>
                    <p className="line-clamp-3 whitespace-pre-line text-sm leading-relaxed text-slate-700">
                      {post.message}
                    </p>
                    {post.image && (
                      <div className="mt-3 overflow-hidden rounded-xl border border-slate-100">
                        <img
                          src={post.image}
                          alt=""
                          loading="lazy"
                          className="max-h-44 w-full object-cover transition duration-300 hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="mt-3 flex items-center justify-between">
                      <a
                        href={post.permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 transition hover:text-blue-800"
                      >
                        <span>{messages.footer.viewFacebookPost}</span>
                        <ExternalLink className="size-3" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>

              {/* Chân card */}
              <div className="border-t border-slate-100 bg-slate-50 p-3">
                <a
                  href={SITE_CONTACT.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-[.99]"
                >
                  <img src="/Icon_of_FB.webp" alt="" className="size-4 rounded-full" />
                  <span>{messages.footer.viewAllPostsBtn}</span>
                </a>
              </div>
            </div>

            <p className="mt-3 text-xs leading-normal text-gray-400">
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
              <a href="/danh-gia-nguy-co-can-thi/privacy.html" className="hover:text-cyan-400 transition-colors">
                {messages.footer.privacy}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
