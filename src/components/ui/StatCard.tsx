import type React from "react";

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  description?: string;
  color?: string;
}

const StatCard = ({
  icon: Icon,
  value,
  label,
  description,
  color = "cyan",
}: StatCardProps) => {
  const colorClasses = {
    cyan: "bg-cyan-100 text-cyan-600",
    emerald: "bg-emerald-100 text-emerald-600",
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    green: "bg-green-100 text-green-600",
    orange: "bg-orange-100 text-orange-600",
  };

  return (
    <div className="text-center">
      <div
        className={`w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-2xl flex items-center justify-center mx-auto mb-2 md:mb-4 ${
          colorClasses[color as keyof typeof colorClasses] || colorClasses.cyan
        }`}
      >
        <Icon className="w-6 h-6 md:w-8 md:h-8" />
      </div>
      <div className="font-space-grotesk text-2xl md:text-3xl font-bold text-gray-900 mb-2">
        {value}
      </div>
      <div className="text-gray-600 text-sm md:text-base">{label}</div>
      {description && (
        <div className="text-xs text-gray-500 mt-1">{description}</div>
      )}
    </div>
  );
};

export default StatCard;
export { StatCard };
