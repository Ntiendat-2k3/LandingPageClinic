"use client";

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
  const baseClasses =
    variant === "gradient"
      ? "bg-gradient-secondary rounded-2xl p-8 md:p-12"
      : "bg-white rounded-2xl p-8 shadow-lg border border-gray-100";

  return (
    <div className={`mt-16 text-center ${className}`}>
      <div className={baseClasses}>
        <h3 className="font-space-grotesk text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          {title}
        </h3>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn-primary" onClick={onPrimaryClick}>
            {primaryButtonText}
          </button>
          {secondaryButtonText && (
            <button className="btn-secondary" onClick={onSecondaryClick}>
              {secondaryButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CTASection;
