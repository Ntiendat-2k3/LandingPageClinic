import { ArrowRight, BookOpen, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatMessage, messages } from "@/i18n";

type TreatmentGuide = (typeof messages.methodGuides.pages)[number];

export default function TreatmentGuidePage({ guide }: { guide: TreatmentGuide }) {
  const content = messages.methodGuides;

  return (
    <article className="bg-gradient-to-b from-emerald-50 via-white to-cyan-50 pb-16 pt-24 text-slate-800 sm:pt-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label={content.breadcrumbLabel} className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-600">
          <a href="/" className="font-semibold text-emerald-800 underline-offset-4 hover:underline">{content.home}</a>
          <ChevronRight className="size-4" aria-hidden="true" />
          <span aria-current="page">{guide.heading}</span>
        </nav>

        <header className="grid items-center gap-8 rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:p-10">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">{content.badge}</p>
            <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">{guide.heading}</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">{guide.intro}</p>
            <Button asChild size="lg" className="mt-6 min-h-12 rounded-xl bg-emerald-700 px-6 text-white hover:bg-emerald-800">
              <a href="/#booking">{content.bookLink}<ArrowRight className="size-4" aria-hidden="true" /></a>
            </Button>
          </div>
          <div className="overflow-hidden rounded-2xl bg-slate-50">
            <img src={guide.image} alt={guide.imageAlt} className="aspect-[4/3] w-full object-contain" />
          </div>
        </header>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)]">
          <div className="space-y-6">
            {[
              [content.whatTitle, guide.what],
              [content.whenTitle, guide.when],
              [content.careTitle, guide.care],
              [content.followTitle, guide.follow],
            ].map(([title, body]) => (
              <section key={title} className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
                <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{title}</h2>
                <p className="mt-3 text-base leading-relaxed text-slate-700">{body}</p>
              </section>
            ))}
          </div>

          <aside className="rounded-2xl border border-cyan-100 bg-white p-6 sm:p-7">
            <BookOpen className="size-7 text-cyan-700" aria-hidden="true" />
            <h2 className="mt-3 text-xl font-bold text-slate-900">{content.sourcesTitle}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{content.sourceContext}</p>
            <ul className="mt-5 space-y-3">
              {content.sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-800 underline underline-offset-2 hover:text-emerald-950">{source.label}</a>
                </li>
              ))}
            </ul>
            <a href="/#doctors" className="mt-6 inline-block font-semibold text-cyan-800 underline underline-offset-2">{content.teamLink}</a>
          </aside>
        </div>

        <section className="mt-10" aria-labelledby="related-methods-title">
          <h2 id="related-methods-title" className="text-2xl font-bold text-slate-900">{content.otherTitle}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {content.pages.filter((item) => item.path !== guide.path).map((item) => (
              <a key={item.path} href={item.path} className="rounded-2xl border border-emerald-100 bg-white p-5 font-semibold text-emerald-800 shadow-sm transition-colors hover:bg-emerald-50">
                {formatMessage(content.readMore, { method: item.heading })}
              </a>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
