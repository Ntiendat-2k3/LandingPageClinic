"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CTASectionProps {
  title: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  variant?: "default" | "gradient";
  className?: string;
}

const CTASection = ({
  title,
  description,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
  variant = "default",
  className = "",
}: CTASectionProps) => {
  const baseClasses = cn(
    "rounded-xl p-5 md:rounded-2xl",
    variant === "gradient"
      ? "bg-gradient-secondary md:p-12"
      : "bg-card shadow-lg ring-1 ring-border md:p-8"
  );

  return (
    <div className={cn("mt-10 text-center md:mt-16", className)}>
      <div className={baseClasses}>
        <h3 className="mb-2 font-heading text-xl font-bold text-foreground md:mb-4 md:text-3xl">
          {title}
        </h3>

        <p className="mx-auto mb-5 max-w-xl text-sm leading-relaxed text-muted-foreground md:mb-8 md:max-w-2xl md:text-lg">
          {description}
        </p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
          <Button
            size="lg"
            onClick={onPrimaryClick}
          >
            {primaryButtonText}
          </Button>

          {secondaryButtonText && (
            <Button
              variant="outline"
              size="lg"
              onClick={onSecondaryClick}
            >
              {secondaryButtonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CTASection;
