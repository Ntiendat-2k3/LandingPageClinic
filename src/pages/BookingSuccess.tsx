import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, Home, Mail, Phone } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SITE_CONTACT } from "@/config/site";
import { locale, messages } from "@/i18n";

interface BookingData {
  name: string;
  phone: string;
  date: string;
  time: string;
  message: string;
}

interface LocationState {
  bookingData: BookingData;
  emailStatus: string;
}

const BookingSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const bookingData = state?.bookingData;
  const emailStatus = state?.emailStatus ?? "";

  useEffect(() => {
    if (
      !bookingData?.name ||
      !bookingData.phone ||
      !bookingData.date ||
      !bookingData.time
    ) {
      navigate("/", { replace: true });
    }
  }, [bookingData, navigate]);

  if (!bookingData) {
    return null;
  }

  const [thankYouPrefix, thankYouSuffix] =
    messages.bookingSuccess.thankYou.split("{name}");

  return (
    <section className="section-padding flex min-h-screen items-center bg-gradient-primary">
      <div className="container mx-auto container-padding">
        <Card size="lg" className="mx-auto max-w-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 flex size-20 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <CheckCircle className="size-10" aria-hidden="true" />
            </div>
            <CardTitle>
              <h1>{messages.bookingSuccess.title}</h1>
            </CardTitle>
            <CardDescription>
              {thankYouPrefix}
              <strong className="text-primary">{bookingData.name}</strong>
              {thankYouSuffix}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-5">
            <section className="rounded-xl bg-muted p-5" aria-labelledby="booking-details-title">
              <h2 id="booking-details-title" className="mb-3 font-semibold text-foreground">
                {messages.bookingSuccess.detailsTitle}
              </h2>
              <dl className="grid gap-2 text-muted-foreground">
                <div className="flex flex-wrap justify-between gap-2">
                  <dt className="font-medium text-foreground">{messages.bookingSuccess.name}</dt>
                  <dd>{bookingData.name}</dd>
                </div>
                <div className="flex flex-wrap justify-between gap-2">
                  <dt className="font-medium text-foreground">{messages.bookingSuccess.phone}</dt>
                  <dd>{bookingData.phone}</dd>
                </div>
                <div className="flex flex-wrap justify-between gap-2">
                  <dt className="font-medium text-foreground">{messages.bookingSuccess.date}</dt>
                  <dd>
                    {new Date(bookingData.date).toLocaleDateString(locale)}
                  </dd>
                </div>
                <div className="flex flex-wrap justify-between gap-2">
                  <dt className="font-medium text-foreground">{messages.bookingSuccess.time}</dt>
                  <dd>{bookingData.time}</dd>
                </div>
                {bookingData.message ? (
                  <div className="flex flex-col gap-1">
                    <dt className="font-medium text-foreground">{messages.bookingSuccess.message}</dt>
                    <dd>{bookingData.message}</dd>
                  </div>
                ) : null}
              </dl>
            </section>

            {emailStatus === "success" ? (
              <Alert>
                <Mail aria-hidden="true" />
                <AlertTitle>{messages.bookingSuccess.notificationSent}</AlertTitle>
                <AlertDescription>
                  {messages.bookingSuccess.notificationSentDescription}
                </AlertDescription>
              </Alert>
            ) : null}

            {emailStatus === "error" ? (
              <Alert variant="destructive">
                <Mail aria-hidden="true" />
                <AlertTitle>{messages.bookingSuccess.notificationFailed}</AlertTitle>
                <AlertDescription>
                  {messages.bookingSuccess.notificationFailedDescription}
                </AlertDescription>
              </Alert>
            ) : null}

            <Alert>
              <Phone aria-hidden="true" />
              <AlertTitle>{messages.bookingSuccess.directContact}</AlertTitle>
              <AlertDescription>
                <a
                  href={`tel:${SITE_CONTACT.phonePlain}`}
                  className="font-semibold text-primary underline-offset-4 hover:underline"
                >
                  {SITE_CONTACT.phonePlain.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3")}
                </a>
              </AlertDescription>
            </Alert>
          </CardContent>

          <CardFooter>
            <Button
              type="button"
              size="lg"
              className="w-full"
              onClick={() => navigate("/", { replace: true })}
            >
              <Home data-icon="inline-start" />
              {messages.bookingSuccess.backHome}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default BookingSuccess;
