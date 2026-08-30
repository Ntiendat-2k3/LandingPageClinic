import type React from "react";
import { cn } from "@/lib/utils";

type StatCardColor =
  | "cyan"
  | "emerald"
  | "blue"
  | "purple"
  | "green"
  | "orange";

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  description?: string;
  color?: StatCardColor;
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
        className={cn(
          "mx-auto mb-2 flex size-12 items-center justify-center rounded-lg md:mb-4 md:size-16 md:rounded-2xl",
          colorClasses[color]
        )}
      >
        <Icon className="size-6 md:size-8" />
      </div>
      <div className="mb-2 font-heading text-2xl font-bold text-foreground md:text-3xl">
        {value}
      </div>
      <div className="text-sm text-muted-foreground md:text-base">{label}</div>
      {description && (
        <div className="mt-1 text-xs text-muted-foreground">{description}</div>
      )}
    </div>
  );
};

export default StatCard;
export { StatCard };
