import { Facebook, Music2 } from "lucide-react";
import { SITE_CONTACT, SITE_LINKS } from "@/config/site";
import { messages } from "@/i18n";

type SocialLinksProps = {
  className?: string;
};

export default function SocialLinks({ className = "" }: SocialLinksProps) {
  const linkClass = "grid size-10 place-items-center rounded-full transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <a href={SITE_LINKS.zalo} target="_blank" rel="noopener noreferrer" aria-label={messages.footer.zaloLabel} className={`${linkClass} bg-[#0068ff] text-white`}>
        <span className="text-[11px] font-extrabold tracking-tight">{messages.footer.zaloLabel}</span>
      </a>
      <a href={SITE_CONTACT.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label={messages.footer.facebookLabel} className={`${linkClass} bg-[#1877f2] text-white`}>
        <Facebook aria-hidden="true" className="size-5 fill-current" />
      </a>
      <a href={SITE_LINKS.tiktok} target="_blank" rel="noopener noreferrer" aria-label={messages.footer.tiktokLabel} className={`${linkClass} bg-[#111111] text-white`}>
        <Music2 aria-hidden="true" className="size-5" />
      </a>
    </div>
  );
}
