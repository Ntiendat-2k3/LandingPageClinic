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
      <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl lg:text-[32px]">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-3xl text-base leading-normal text-muted-foreground md:text-sm">
        {description}
      </p>
    </header>
  );
};

export default SectionHeader;
