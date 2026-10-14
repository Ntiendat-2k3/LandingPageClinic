import { useEffect, useRef, useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { messages } from "@/i18n";

/**
 * Section Quy trình khám: Gia đình sẽ nhận được gì sau buổi khám?
 * Hiển thị thông điệp cam kết cùng 6 bước/quyền lợi rõ ràng cho phụ huynh.
 */
export default function ProcessSection() {
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
      className="relative py-14 sm:py-18 lg:py-10 bg-gradient-to-b from-white via-emerald-50/20 to-white overflow-hidden"
    >
      <div className="container mx-auto px-2.5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="mb-2 inline-block text-xs font-bold uppercase tracking-wider text-emerald-700">
              {messages.process.badge}
            </div>

            <h2 className="font-space-grotesk text-2xl font-extrabold leading-tight text-slate-900 sm:text-3xl lg:text-[32px]">
              {messages.process.title}
            </h2>

            <p className="mt-3 max-w-md text-base leading-normal text-slate-600 lg:text-sm">
              {messages.process.description}
            </p>

            <div className="mt-6">
              <h3 className="mb-3 text-lg font-bold leading-snug text-slate-900">
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
              <a href="https://youtu.be/xdi4Gp9bE-Q" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-emerald-800 underline underline-offset-4">{messages.video.watchOnYoutube}</a>
            </div>
          </div>

          <div className="rounded-xl bg-white/90 p-4 shadow-sm ring-1 ring-black/5 sm:rounded-3xl sm:p-6 lg:col-span-7 lg:mt-3 lg:p-5">
            <div className="divide-y divide-gray-100">{messages.process.steps.map((step, index) => (
              <div
                key={index}
                className="flex items-start gap-3 py-4 first:pt-0 last:pb-0 sm:gap-4 lg:py-2.5"
              >
                <span className="mt-0.5 shrink-0 font-mono text-sm font-extrabold text-emerald-700">
                  {step.number}
                </span>

                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-0.5 text-base leading-normal text-slate-600 lg:text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}</div>
            <div className="mt-5 flex justify-center lg:mt-4">
              <Button asChild size="lg" className="min-h-14 rounded-xl bg-emerald-600 px-7 font-bold text-white hover:bg-emerald-700">
                <a href="/#booking">
                  {messages.process.cta}
                  <ArrowRight className="size-5" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
