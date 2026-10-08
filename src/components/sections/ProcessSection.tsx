import { useEffect, useRef, useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { messages } from "@/i18n";

/**
 * Section Quy trình khám: Gia đình sẽ nhận được gì sau buổi khám?
 * Hiển thị thông điệp cam kết cùng 6 bước/quyền lợi rõ ràng cho phụ huynh.
 */
export default function ProcessSection() {
  const scrollToSection = useScrollToSection();
  const videoContainer = useRef<HTMLDivElement>(null);
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    const container = videoContainer.current;
    if (!container) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || document.hidden) {
        setPlayVideo(false);
      } else if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setPlayVideo(true);
      }
    }, { threshold: 0.35 });
    const stopWhenHidden = () => {
      if (document.hidden) setPlayVideo(false);
    };

    observer.observe(container);
    document.addEventListener("visibilitychange", stopWhenHidden);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", stopWhenHidden);
    };
  }, []);

  return (
    <section
      id="process"
      className="relative py-14 sm:py-18 lg:py-24 bg-gradient-to-b from-white via-emerald-50/20 to-white overflow-hidden"
    >
      <div className="container mx-auto px-2.5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5">
            <div className="inline-block text-xs sm:text-sm font-bold tracking-wider text-emerald-700 uppercase mb-2">
              {messages.process.badge}
            </div>

            <h2 className="font-space-grotesk text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold leading-tight text-slate-900">
              {messages.process.title}
            </h2>

            <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-md">
              {messages.process.description}
            </p>

            <div className="mt-8">
              <h3 className="mb-4 text-xl font-extrabold text-slate-900 sm:text-2xl">
                {messages.video.title}<span className="block text-emerald-700">{messages.video.badge}</span>
              </h3>
              <div ref={videoContainer} className="relative aspect-video overflow-hidden rounded-2xl bg-slate-900 shadow-lg">
                {playVideo ? (
                  <iframe
                    src="https://www.youtube.com/embed/xdi4Gp9bE-Q?autoplay=1&mute=1&playsinline=1&rel=0"
                    title={messages.video.title}
                    className="absolute inset-0 size-full"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <button type="button" onClick={() => setPlayVideo(true)} className="grid size-full place-items-center text-white hover:bg-slate-800" aria-label={messages.video.play}>
                    <Play className="size-14 fill-current" aria-hidden="true" />
                  </button>
                )}
              </div>
              <a href="https://youtu.be/xdi4Gp9bE-Q" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold text-emerald-800 underline underline-offset-4">{messages.video.watchOnYoutube}</a>
            </div>
          </div>

          <div className="lg:col-span-7 rounded-xl bg-white/90 p-3.5 shadow-sm ring-1 ring-black/5 sm:rounded-3xl sm:p-8 lg:p-10">
            <div className="divide-y divide-gray-100">{messages.process.steps.map((step, index) => (
              <div
                key={index}
                className="py-5 sm:py-6 first:pt-0 last:pb-0 flex items-start gap-4 sm:gap-6"
              >
                <span className="font-mono text-base sm:text-lg font-extrabold text-emerald-700 shrink-0 mt-0.5">
                  {step.number}
                </span>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm sm:text-base text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}</div>
            <div className="mt-7 flex justify-center">
              <Button type="button" size="lg" onClick={() => scrollToSection("booking")} className="min-h-14 rounded-xl bg-emerald-600 px-7 font-bold text-white hover:bg-emerald-700">
                {messages.process.cta}
                <ArrowRight className="size-5" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
