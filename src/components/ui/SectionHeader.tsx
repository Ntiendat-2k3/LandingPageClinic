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
    <div className={`text-center mb-16 ${className}`}>
      <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {title}
      </h2>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">{description}</p>
    </div>
  );
};

export default SectionHeader;
