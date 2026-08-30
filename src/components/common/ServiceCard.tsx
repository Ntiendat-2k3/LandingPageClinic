"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ServiceItem } from "@/types";
import { getColorClasses } from "@/utils/colorUtils";
import { messages } from "@/i18n";

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
    <Card className="h-full transition-transform duration-300 md:hover:-translate-y-2">
      <CardHeader>
        <div
          className={cn(
            "mb-2 flex size-16 items-center justify-center rounded-2xl transition-all duration-300",
            getColorClasses(service.color, "icon")
          )}
        >
          <service.icon className="size-8" aria-hidden="true" />
        </div>
        <CardTitle>{service.title}</CardTitle>
        <CardDescription>{service.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4">
        <ul className="flex flex-col gap-2">
          {service.features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <span className="size-1.5 rounded-full bg-brand-cyan" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {showPrice && service.price ? (
          <div className="mt-auto border-t border-border pt-4">
            <div className="font-heading text-2xl font-bold text-foreground">
              {service.price}
            </div>
            {service.duration ? (
              <div className="text-sm text-muted-foreground">
                {messages.serviceCard.durationPrefix} {service.duration}
              </div>
            ) : null}
          </div>
        ) : null}
      </CardContent>

      <CardFooter>
        <Button className="w-full" onClick={onButtonClick}>
          {messages.common.bookNow}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
