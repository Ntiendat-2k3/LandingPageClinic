export const getColorClasses = (
  color: string,
  variant: "icon" | "card" | "button" = "icon"
) => {
  const colorMap = {
    cyan: {
      icon: "bg-cyan-100 text-cyan-600 group-hover:bg-cyan-500 group-hover:text-white",
      card: "border-cyan-200 hover:border-cyan-300",
      button: "bg-cyan-500 hover:bg-cyan-600 text-white",
    },
    emerald: {
      icon: "bg-emerald-100 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white",
      card: "border-emerald-200 hover:border-emerald-300",
      button: "bg-emerald-500 hover:bg-emerald-600 text-white",
    },
    blue: {
      icon: "bg-blue-100 text-blue-600 group-hover:bg-blue-500 group-hover:text-white",
      card: "border-blue-200 hover:border-blue-300",
      button: "bg-blue-500 hover:bg-blue-600 text-white",
    },
    purple: {
      icon: "bg-purple-100 text-purple-600 group-hover:bg-purple-500 group-hover:text-white",
      card: "border-purple-200 hover:border-purple-300",
      button: "bg-purple-500 hover:bg-purple-600 text-white",
    },
    pink: {
      icon: "bg-pink-100 text-pink-600 group-hover:bg-pink-500 group-hover:text-white",
      card: "border-pink-200 hover:border-pink-300",
      button: "bg-pink-500 hover:bg-pink-600 text-white",
    },
    orange: {
      icon: "bg-orange-100 text-orange-600 group-hover:bg-orange-500 group-hover:text-white",
      card: "border-orange-200 hover:border-orange-300",
      button: "bg-orange-500 hover:bg-orange-600 text-white",
    },
    green: {
      icon: "bg-green-100 text-green-600 group-hover:bg-green-500 group-hover:text-white",
      card: "border-green-200 hover:border-green-300",
      button: "bg-green-500 hover:bg-green-600 text-white",
    },
    gray: {
      icon: "bg-gray-100 text-gray-600",
      card: "border-gray-200 hover:border-gray-300",
      button: "bg-gray-500 hover:bg-gray-600 text-white",
    },
  };

  return (
    colorMap[color as keyof typeof colorMap]?.[variant] ||
    colorMap.gray[variant]
  );
};

export const getPricingColorClasses = (color: string, popular: boolean) => {
  if (popular) {
    return {
      card: "bg-gradient-to-br from-cyan-50 to-emerald-50 border-2 border-cyan-200 shadow-xl",
      badge: "bg-gradient-to-r from-cyan-500 to-emerald-500 text-white",
      icon: "bg-gradient-to-r from-cyan-500 to-emerald-500 text-white",
      button: "btn-primary w-full",
      price: "text-cyan-600",
    };
  }

  const colorMap = {
    gray: {
      card: "bg-white border border-gray-200 shadow-lg hover:shadow-xl",
      badge: "bg-gray-100 text-gray-600",
      icon: "bg-gray-100 text-gray-600",
      button: "btn-secondary w-full",
      price: "text-gray-900",
    },
    emerald: {
      card: "bg-white border border-emerald-200 shadow-lg hover:shadow-xl",
      badge: "bg-emerald-100 text-emerald-600",
      icon: "bg-emerald-100 text-emerald-600",
      button:
        "bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 w-full",
      price: "text-emerald-600",
    },
  };

  return colorMap[color as keyof typeof colorMap] || colorMap.gray;
};
