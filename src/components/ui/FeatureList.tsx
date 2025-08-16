interface FeatureListProps {
  features?: string[]; // Made features optional to prevent undefined errors
  iconColor?: string;
}

const FeatureList = ({
  features = [],
  iconColor = "cyan",
}: FeatureListProps) => {
  const iconColorClass =
    iconColor === "cyan" ? "bg-cyan-500" : `bg-${iconColor}-500`;

  if (!features || features.length === 0) {
    return null;
  }

  return (
    <ul className="space-y-2">
      {features.map((feature, index) => (
        <li
          key={index}
          className="flex items-center space-x-2 text-sm text-gray-600"
        >
          <div className={`w-1.5 h-1.5 ${iconColorClass} rounded-full`}></div>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
};

export default FeatureList;
