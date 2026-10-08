import { useRef, useState, type KeyboardEvent } from "react";
import { Check } from "lucide-react";
import { messages } from "@/i18n";

const images = [
  { src: "/images/methods/atropine.webp", width: 900, height: 600 },
  { src: "/images/methods/spectacle-lens.jpg", width: 475, height: 699 },
  { src: "/images/methods/ortho-k.jpg", width: 887, height: 1048 },
  { src: "/images/methods/combination.webp", width: 900, height: 900 },
] as const;

/** Giữ ảnh và nội dung của từng phương pháp trong cùng một tab để tránh hiển thị sai cặp. */
export default function PricingSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const treatment = messages.pricing.treatments[activeIndex];

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % images.length;
    else if (event.key === "ArrowLeft") nextIndex = (index - 1 + images.length) % images.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = images.length - 1;
    else return;

    event.preventDefault();
    setActiveIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section id="myopia-control" className="scroll-mt-16 h-[calc(100dvh-4rem)] overflow-y-auto bg-gradient-to-br from-emerald-50 to-cyan-50">
      <div data-scroll-reveal className="container mx-auto flex min-h-full flex-col justify-center px-2.5 py-4 sm:px-6 lg:px-8">
        <div className="grid gap-3 lg:grid-cols-2 lg:gap-10">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">{messages.pricing.badge}</p>
            <h2 className="mt-2 text-2xl font-extrabold leading-tight text-slate-900 sm:text-3xl md:text-4xl">
              {messages.pricing.titleLineOne}{" "}
              {messages.pricing.titleLineTwoPrefix}
              <span className="text-emerald-700">{messages.pricing.titleLineTwoHighlight}</span>
            </h2>
          </div>
          <p className="self-center text-sm leading-snug text-slate-700 sm:text-base sm:leading-relaxed">{messages.pricing.description}</p>
        </div>

        <div role="tablist" aria-label={messages.pricing.badge} className="mt-4 flex gap-2 overflow-x-auto rounded-xl bg-white/75 p-1.5">
          {messages.pricing.treatments.map((item, index) => (
            <button
              key={item.name}
              ref={(node) => { tabRefs.current[index] = node; }}
              type="button"
              role="tab"
              id={`treatment-tab-${index}`}
              aria-controls="treatment-panel"
              aria-selected={activeIndex === index}
              tabIndex={activeIndex === index ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              className={`min-w-max flex-1 rounded-lg px-4 py-2 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 sm:py-3 ${activeIndex === index ? "bg-emerald-700 text-white" : "text-slate-700 hover:bg-emerald-50"}`}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div id="treatment-panel" role="tabpanel" aria-labelledby={`treatment-tab-${activeIndex}`} tabIndex={0} className="mt-4 grid items-center gap-5 rounded-2xl bg-white/70 p-3 shadow-sm sm:p-4 md:grid-cols-2 md:p-5">
          <div className="flex items-center justify-center overflow-hidden rounded-xl bg-white">
            <img
              src={images[activeIndex].src}
              alt={treatment.name}
              width={images[activeIndex].width}
              height={images[activeIndex].height}
              className="block h-auto w-auto max-h-[20dvh] max-w-full object-contain md:max-h-[min(29dvh,300px)]"
              loading="lazy"
            />
          </div>
          <div>
            <p className="font-bold text-emerald-700">{treatment.tag}</p>
            <h3 className="mt-2 text-2xl font-extrabold text-slate-900 md:text-3xl">{treatment.name}</h3>
            {treatment.description && <p className="mt-4 leading-relaxed text-slate-700">{treatment.description}</p>}
            <ul className="mt-5 space-y-3">
              {treatment.effectiveness.map((line) => (
                <li key={line} className="flex items-start gap-3 text-slate-700">
                  <Check className="mt-1 size-5 shrink-0 text-emerald-700" aria-hidden="true" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-3 text-center text-xs leading-relaxed text-slate-600 md:text-sm">{messages.pricing.footnote}</p>
      </div>
    </section>
  );
}
