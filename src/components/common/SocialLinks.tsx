import { SITE_CONTACT, SITE_LINKS } from "@/config/site";
import { messages } from "@/i18n";

type SocialLinksProps = {
  className?: string;
};

export default function SocialLinks({ className = "" }: SocialLinksProps) {
  const linkClass = "grid size-10 shrink-0 place-items-center rounded-full bg-white transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500";
  const imageClass = "block size-10 rounded-full object-contain";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <a href={SITE_LINKS.zalo} target="_blank" rel="noopener noreferrer" aria-label={messages.footer.zaloLabel} className={linkClass}>
        <img src="/Icon_of_Zalo.webp" alt="" width="40" height="40" className={imageClass} />
      </a>
      <a href={SITE_CONTACT.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label={messages.footer.facebookLabel} className={linkClass}>
        <img src="/Icon_of_FB.webp" alt="" width="40" height="40" className={imageClass} />
      </a>
      <a href={SITE_LINKS.tiktok} target="_blank" rel="noopener noreferrer" aria-label={messages.footer.tiktokLabel} className={linkClass}>
        <img src="/Icon_of_Tiktok.png" alt="" width="40" height="40" className={imageClass} />
      </a>
    </div>
  );
}
