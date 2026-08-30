import { Zap, Eye, Monitor, Microscope, Camera, Shield } from "lucide-react";
import { messages } from "@/i18n";

const EquipmentSection = () => {
  const equipment = [
    {
      icon: Eye,
      ...messages.equipment.items[0],
      year: "2023",
      image: "/placeholder.svg?height=200&width=300",
      color: "cyan",
    },
    {
      icon: Zap,
      ...messages.equipment.items[1],
      year: "2023",
      image: "/placeholder.svg?height=200&width=300",
      color: "emerald",
    },
    {
      icon: Monitor,
      ...messages.equipment.items[2],
      year: "2022",
      image: "/placeholder.svg?height=200&width=300",
      color: "blue",
    },
    {
      icon: Microscope,
      ...messages.equipment.items[3],
      year: "2023",
      image: "/placeholder.svg?height=200&width=300",
      color: "purple",
    },
    {
      icon: Camera,
      ...messages.equipment.items[4],
      year: "2023",
      image: "/placeholder.svg?height=200&width=300",
      color: "orange",
    },
    {
      icon: Shield,
      ...messages.equipment.items[5],
      year: "2023",
      image: "/placeholder.svg?height=200&width=300",
      color: "green",
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      cyan: "bg-cyan-100 text-cyan-600 group-hover:bg-cyan-500 group-hover:text-white",
      emerald:
        "bg-emerald-100 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white",
      blue: "bg-blue-100 text-blue-600 group-hover:bg-blue-500 group-hover:text-white",
      purple:
        "bg-purple-100 text-purple-600 group-hover:bg-purple-500 group-hover:text-white",
      orange:
        "bg-orange-100 text-orange-600 group-hover:bg-orange-500 group-hover:text-white",
      green:
        "bg-green-100 text-green-600 group-hover:bg-green-500 group-hover:text-white",
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.cyan;
  };

  return (
    <section id="equipment" className="section-padding bg-gradient-secondary">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {messages.equipment.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {messages.equipment.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {equipment.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Equipment Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-lg">
                  <span className="text-xs font-semibold text-gray-900">
                    {item.year}
                  </span>
                </div>
                <div className="absolute top-4 left-4 bg-white rounded-full px-3 py-1 shadow-lg">
                  <span className="text-xs font-semibold text-gray-900">
                    {item.origin}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${getColorClasses(
                    item.color
                  )}`}
                >
                  <item.icon className="w-6 h-6" />
                </div>

                <h3 className="font-space-grotesk text-xl font-semibold text-gray-900 mb-3">
                  {item.name}
                </h3>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {item.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {item.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center space-x-2"
                    >
                      <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button className="w-full text-cyan-600 font-medium hover:text-cyan-700 transition-colors flex items-center justify-center space-x-2 py-2 border border-cyan-200 rounded-lg hover:bg-cyan-50">
                  <span>{messages.equipment.learnMore}</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Technology Stats */}
        <div className="mt-16">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="text-center mb-8">
              <h3 className="font-space-grotesk text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {messages.equipment.commitment}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-cyan-600" />
                </div>
                <div className="font-space-grotesk text-3xl font-bold text-gray-900 mb-2">
                  100%
                </div>
                <div className="text-gray-600">{messages.equipment.stats[0]}</div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-emerald-600" />
                </div>
                <div className="font-space-grotesk text-3xl font-bold text-gray-900 mb-2">
                  {messages.equipment.iso}
                </div>
                <div className="text-gray-600">{messages.equipment.stats[1]}</div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Monitor className="w-8 h-8 text-blue-600" />
                </div>
                <div className="font-space-grotesk text-3xl font-bold text-gray-900 mb-2">
                  24/7
                </div>
                <div className="text-gray-600">{messages.equipment.stats[2]}</div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-purple-600" />
                </div>
                <div className="font-space-grotesk text-3xl font-bold text-gray-900 mb-2">
                  99.9%
                </div>
                <div className="text-gray-600">{messages.equipment.stats[3]}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="font-space-grotesk text-2xl md:text-3xl font-bold mb-4">
              {messages.equipment.ctaTitle}
            </h3>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              {messages.equipment.ctaDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-cyan-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
                {messages.equipment.cta}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EquipmentSection;
