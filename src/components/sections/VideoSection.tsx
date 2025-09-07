"use client";

import { useEffect, useRef } from "react";

const VideoSection = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    el.muted = true;
    el.playsInline = true;
    el.loop = true;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.6 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-6 md:mb-12">
          <h2
            className="
              font-bold text-emerald-600
              text-[18px] sm:text-xl md:text-3xl lg:text-4xl
              leading-snug md:leading-tight
              [&>br]:hidden md:[&>br]:block
            "
            style={{ textWrap: "balance" }}
          >
            <span className="text-gray-900 font-extrabold">
              ĐO CHIỀU DÀI TRỤC NHÃN CẦU
            </span>
            <br />
            <span className="mt-1 inline-block rounded-xl px-5 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold text-[15px] lg:text-[28px] md:text-2xl shadow">
              TIÊU CHUẨN VÀNG TRONG KIỂM SOÁT CẬN THỊ
            </span>
          </h2>
        </div>

        {/* Single <video> */}
        <div className="max-w-4xl mx-auto">
          <video
            ref={videoRef}
            className="w-full rounded-2xl shadow-xl ring-1 ring-black/5"
            controls
            muted
            playsInline
            loop
            preload="metadata"
            poster="/images/video-poster.jpg"
          >
            <source src="/video/myah.mp4" type="video/mp4" />
            <source src="/video/myah.webm" type="video/webm" />
            Trình duyệt của bạn không hỗ trợ phát video.
          </video>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
