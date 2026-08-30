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

const MESSENGER_USERNAME = "pkmatdrtrantuan";

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
      `https://m.me/${MESSENGER_USERNAME}`,
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
                  <CardTitle>Cần hỗ trợ?</CardTitle>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setIsExpanded(false)}
                  aria-label="Đóng nhóm liên hệ nhanh"
                >
                  <X />
                </Button>
              </div>
              <CardDescription>
                Chọn cách thức liên hệ phù hợp với bạn.
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-2">
              <Button
                type="button"
                className="h-auto w-full justify-start py-3"
                onClick={() => {
                  window.location.href = "tel:0387812321";
                }}
              >
                <Phone data-icon="inline-start" />
                <span className="flex flex-col items-start">
                  <span>Gọi ngay</span>
                  <span className="text-xs font-normal opacity-90">
                    0387 812 321
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
                  <span>Đặt lịch khám</span>
                  <span className="text-xs font-normal text-muted-foreground">
                    Nhanh chóng, tiện lợi
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
                  <span>Chat trực tuyến</span>
                  <span className="text-xs font-normal opacity-80">
                    Mở Messenger
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
            aria-label="Mở nhóm liên hệ nhanh"
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
            aria-label="Cuộn lên đầu trang"
          >
            <ChevronUp />
          </Button>
        </div>
      ) : null}
    </>
  );
};

export default StickyCTA;
