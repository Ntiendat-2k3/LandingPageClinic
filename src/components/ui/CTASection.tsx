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
      ? // Mobile gọn: bo tròn & padding nhỏ, desktop giữ rộng
        "bg-gradient-secondary rounded-xl p-5 md:rounded-2xl md:p-12"
      : "bg-white rounded-xl p-5 md:rounded-2xl md:p-8 shadow-lg border border-gray-100";

  return (
    <div className={`mt-10 md:mt-16 text-center ${className}`}>
      <div className={baseClasses}>
        <h3 className="font-space-grotesk text-xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4">
          {title}
        </h3>

        <p className="text-sm md:text-lg text-gray-600 mb-5 md:mb-8 max-w-xl md:max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button
            className="btn-primary !px-4 !py-3 !text-sm sm:!px-6 sm:!py-3.5 sm:!text-base"
            onClick={onPrimaryClick}
          >
            {primaryButtonText}
          </button>

          {secondaryButtonText && (
            <button
              className="btn-secondary !px-4 !py-3 !text-sm sm:!px-6 sm:!py-3.5 sm:!text-base"
              onClick={onSecondaryClick}
            >
              {secondaryButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CTASection;
