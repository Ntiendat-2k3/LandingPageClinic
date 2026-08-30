import { useEffect, useState } from "react";
import {
  Calendar,
  ChevronUp,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SITE_CONTACT, SITE_LINKS } from "@/config/site";
import { messages } from "@/i18n";

/** Hiển thị nhóm hành động liên hệ nhanh theo vị trí cuộn của người dùng. */
const StickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      setIsVisible(window.scrollY > windowHeight * 0.5);
      setShowScrollTop(window.scrollY > windowHeight);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToBooking = () => {
    document
      .getElementById("booking")
      ?.scrollIntoView({ behavior: "smooth" });
    setIsExpanded(false);
  };

  const openMessenger = () => {
    window.open(
      SITE_LINKS.messenger,
      "_blank",
      "noopener,noreferrer"
    );
    setIsExpanded(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        {isExpanded ? (
          <Card className="w-72 animate-fade-in-up">
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex size-9 items-center justify-center rounded-full bg-gradient-primary text-white">
                    <Phone className="size-4" aria-hidden="true" />
                  </div>
                  <CardTitle>{messages.stickyCta.title}</CardTitle>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setIsExpanded(false)}
                  aria-label={messages.stickyCta.closeLabel}
                >
                  <X />
                </Button>
              </div>
              <CardDescription>
                {messages.stickyCta.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-2">
              <Button
                type="button"
                className="h-auto w-full justify-start py-3"
                onClick={() => {
                  window.location.href = `tel:${SITE_CONTACT.phonePlain}`;
                }}
              >
                <Phone data-icon="inline-start" />
                <span className="flex flex-col items-start">
                  <span>{messages.stickyCta.callNow}</span>
                  <span className="text-xs font-normal opacity-90">
                    {SITE_CONTACT.phonePlain.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3")}
                  </span>
                </span>
              </Button>

              <Button
                type="button"
                variant="outline"
                className="h-auto w-full justify-start py-3"
                onClick={scrollToBooking}
              >
                <Calendar data-icon="inline-start" />
                <span className="flex flex-col items-start">
                  <span>{messages.stickyCta.book}</span>
                  <span className="text-xs font-normal text-muted-foreground">
                    {messages.stickyCta.bookDescription}
                  </span>
                </span>
              </Button>

              <Button
                type="button"
                variant="secondary"
                className="h-auto w-full justify-start py-3"
                onClick={openMessenger}
              >
                <MessageCircle data-icon="inline-start" />
                <span className="flex flex-col items-start">
                  <span>{messages.stickyCta.chat}</span>
                  <span className="text-xs font-normal opacity-80">
                    {messages.stickyCta.messenger}
                  </span>
                </span>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Button
            type="button"
            size="icon-lg"
            className="rounded-full shadow-2xl motion-safe:animate-pulse"
            onClick={() => setIsExpanded(true)}
            aria-label={messages.stickyCta.openLabel}
          >
            <Phone />
          </Button>
        )}
      </div>

      {showScrollTop ? (
        <div className="fixed bottom-6 left-6 z-40">
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="rounded-full shadow-lg"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label={messages.stickyCta.scrollTopLabel}
          >
            <ChevronUp />
          </Button>
        </div>
      ) : null}
    </>
  );
};

export default StickyCTA;
