"use client";

import type { ServiceItem } from "../../types";
import { getColorClasses } from "../../utils/colorUtils";

interface ServiceCardProps {
  service: ServiceItem;
  showPrice?: boolean;
  onButtonClick?: () => void;
}

const ServiceCard = ({
  service,
  showPrice = false,
  onButtonClick,
}: ServiceCardProps) => {
  return (
    <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
      <div
        className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${getColorClasses(
          service.color,
          "icon"
        )}`}
      >
        <service.icon className="w-8 h-8" />
      </div>

      <h3 className="font-space-grotesk text-xl font-semibold text-gray-900 mb-3">
        {service.title}
      </h3>

      <p className="text-gray-600 mb-4 leading-relaxed">
        {service.description}
      </p>

      <ul className="space-y-2 mb-6">
        {service.features.map((feature, index) => (
          <li
            key={index}
            className="flex items-center space-x-2 text-sm text-gray-600"
          >
            <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {showPrice && service.price && (
        <div className="border-t border-gray-100 pt-4 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-space-grotesk text-2xl font-bold text-gray-900">
                {service.price}
              </div>
              {service.duration && (
                <div className="text-sm text-gray-500">
                  Thời gian: {service.duration}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <button className="w-full btn-primary" onClick={onButtonClick}>
        Đặt lịch ngay
      </button>
    </div>
  );
};

export default ServiceCard;
