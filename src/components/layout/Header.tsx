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

const ADDRESS_TEXT = "122 Bà Triệu, phường Hai Bà Trưng, Hà Nội";
const MAPS_URL = "https://maps.app.goo.gl/8Ab7ZyQyaadiZZD46";
const PHONE_DISPLAY = "03.878.12321";
const PHONE_PLAIN = "0387812321";
const ZALO_URL = `https://zalo.me/${PHONE_PLAIN}`;

const NAVIGATION_ITEMS = [
  { label: "Dịch vụ", sectionId: "services" },
  { label: "Quy trình", sectionId: "process" },
  { label: "Kiểm soát cận thị", sectionId: "pricing" },
  { label: "Đội ngũ chuyên môn", sectionId: "doctors" },
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
              alt="Logo Phòng khám Mắt Dr Trần Tuấn"
              className="size-12 shrink-0 sm:size-14"
            />
            <div className="font-heading text-xs font-bold leading-tight whitespace-nowrap text-foreground sm:text-sm lg:text-base xl:text-lg">
              <div>Phòng khám CK Mắt &amp; Khúc xạ</div>
              <div>Dr Trần Tuấn</div>
            </div>
          </div>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Điều hướng chính">
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
              href={ZALO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 transition-colors hover:text-primary"
              aria-label={`Chat Zalo qua số ${PHONE_DISPLAY}`}
            >
              <Phone className="size-4" aria-hidden="true" />
              <span>{PHONE_DISPLAY}</span>
            </a>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 transition-colors hover:text-primary"
              aria-label={`Mở Google Maps đến ${ADDRESS_TEXT}`}
            >
              <MapPin className="size-4" aria-hidden="true" />
              <span>{ADDRESS_TEXT}</span>
            </a>
          </div>

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Mở menu điều hướng"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Phòng khám Mắt Dr Trần Tuấn</SheetTitle>
                <SheetDescription>
                  Chọn nội dung cần xem hoặc liên hệ với phòng khám.
                </SheetDescription>
              </SheetHeader>

              <nav
                className="flex flex-col gap-1 px-4"
                aria-label="Điều hướng trên thiết bị di động"
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
                  href={ZALO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-primary"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  <span>{PHONE_DISPLAY}</span>
                </a>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 transition-colors hover:text-primary"
                >
                  <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  <span>{ADDRESS_TEXT}</span>
                </a>
              </div>

              <div className="mt-auto p-4">
                <Button
                  type="button"
                  size="lg"
                  className="w-full"
                  onClick={() => scrollToSection("booking")}
                >
                  Đặt lịch khám
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
