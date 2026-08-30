import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  description: string;
  className?: string;
}

const SectionHeader = ({
  title,
  description,
  className = "",
}: SectionHeaderProps) => {
  return (
    <header className={cn("mb-16 text-center", className)}>
      <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
        {description}
      </p>
    </header>
  );
};

export default SectionHeader;
