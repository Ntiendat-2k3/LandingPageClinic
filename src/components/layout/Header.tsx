import { useState } from "react";
import { MapPin, Menu, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SITE_CONTACT, SITE_LINKS } from "@/config/site";
import { formatMessage, messages } from "@/i18n";

const NAVIGATION_ITEMS = [
  { label: messages.header.navigation.services, sectionId: "services" },
  { label: messages.header.navigation.process, sectionId: "process" },
  { label: messages.header.navigation.myopiaControl, sectionId: "pricing" },
  { label: messages.header.navigation.team, sectionId: "doctors" },
] as const;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    document
      .getElementById(sectionId)
      ?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex shrink-0 items-center gap-2">
            <img
              src="/images/logo.png"
              alt={messages.header.logoAlt}
              className="size-12 shrink-0 sm:size-14"
            />
            <div className="font-heading text-xs font-bold leading-tight whitespace-nowrap text-foreground sm:text-sm lg:text-base xl:text-lg">
              <div>{messages.header.brandLineOne}</div>
              <div>{messages.header.brandLineTwo}</div>
            </div>
          </div>

          <nav className="hidden items-center gap-1 md:flex" aria-label={messages.header.mainNavigationLabel}>
            {NAVIGATION_ITEMS.map((item) => (
              <Button
                key={item.sectionId}
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection(item.sectionId)}
              >
                {item.label}
              </Button>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center gap-3 text-xs text-muted-foreground lg:flex xl:gap-4 xl:text-sm">
            <a
              href={SITE_LINKS.zalo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 transition-colors hover:text-primary"
              aria-label={formatMessage(messages.header.zaloLabel, {
                phone: SITE_CONTACT.phoneDisplay,
              })}
            >
              <Phone className="size-4" aria-hidden="true" />
              <span>{SITE_CONTACT.phoneDisplay}</span>
            </a>
            <a
              href={SITE_CONTACT.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 transition-colors hover:text-primary"
              aria-label={formatMessage(messages.header.mapsLabel, {
                address: SITE_CONTACT.address,
              })}
            >
              <MapPin className="size-4" aria-hidden="true" />
              <span>{SITE_CONTACT.address}</span>
            </a>
          </div>

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label={messages.header.openMenuLabel}
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>{messages.header.mobileTitle}</SheetTitle>
                <SheetDescription>
                  {messages.header.mobileDescription}
                </SheetDescription>
              </SheetHeader>

              <nav
                className="flex flex-col gap-1 px-4"
                aria-label={messages.header.mobileNavigationLabel}
              >
                {NAVIGATION_ITEMS.map((item) => (
                  <Button
                    key={item.sectionId}
                    type="button"
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => scrollToSection(item.sectionId)}
                  >
                    {item.label}
                  </Button>
                ))}
              </nav>

              <Separator />

              <div className="flex flex-col gap-3 px-4 text-sm text-muted-foreground">
                <a
                  href={SITE_LINKS.zalo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-primary"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  <span>{SITE_CONTACT.phoneDisplay}</span>
                </a>
                <a
                  href={SITE_CONTACT.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 transition-colors hover:text-primary"
                >
                  <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  <span>{SITE_CONTACT.address}</span>
                </a>
              </div>

              <div className="mt-auto p-4">
                <Button
                  type="button"
                  size="lg"
                  className="w-full"
                  onClick={() => scrollToSection("booking")}
                >
                  {messages.common.bookAppointment}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
