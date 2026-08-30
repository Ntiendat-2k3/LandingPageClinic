import { cn } from "@/lib/utils";

interface FeatureListProps {
  features?: string[];
  iconColor?: "cyan" | "emerald";
}

const FeatureList = ({
  features = [],
  iconColor = "cyan",
}: FeatureListProps) => {
  const iconColorClass =
    iconColor === "cyan" ? "bg-brand-cyan" : "bg-brand-emerald";

  if (!features || features.length === 0) {
    return null;
  }

  return (
    <ul className="flex flex-col gap-2">
      {features.map((feature, index) => (
        <li
          key={index}
          className="flex items-center gap-2 text-sm text-muted-foreground"
        >
          <span className={cn("size-1.5 rounded-full", iconColorClass)} />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
};

export default FeatureList;
