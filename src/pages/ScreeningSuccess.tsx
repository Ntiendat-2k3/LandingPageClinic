import { CheckCircle, Mail, MessageCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SITE_LINKS } from "@/config/site";
import { messages } from "@/i18n";

const results = {
  high: {
    ...messages.screeningSuccess.high,
    tone: "bg-red-100 text-red-800",
  },
  medium: {
    ...messages.screeningSuccess.medium,
    tone: "bg-amber-100 text-amber-800",
  },
  low: {
    ...messages.screeningSuccess.low,
    tone: "bg-emerald-100 text-emerald-800",
  },
} as const;

type Risk = keyof typeof results;

const ScreeningSuccess = () => {
  let stored: string | null = null;
  let storedNotification: string | null = null;
  try {
    stored = sessionStorage.getItem("screening-result");
    storedNotification = sessionStorage.getItem("screening-notification");
  } catch {
    // Trang vẫn hiển thị trạng thái an toàn khi trình duyệt chặn lưu phiên.
  }
  const result = stored && Object.prototype.hasOwnProperty.call(results, stored) ? results[stored as Risk] : null;
  const notificationStatus = result ? storedNotification : null;

  return (
    <section className="section-padding flex min-h-screen items-center bg-gradient-primary">
      <div className="container mx-auto container-padding">
        <Card size="lg" className="mx-auto max-w-2xl">
          <CardHeader className="text-center">
            <CheckCircle className="mx-auto size-14 text-primary" aria-hidden="true" />
            <CardTitle><h1>{result ? messages.screeningSuccess.title : messages.screeningSuccess.genericTitle}</h1></CardTitle>
            <p>{result ? messages.screeningSuccess.disclaimer : messages.screeningSuccess.genericDescription}</p>
          </CardHeader>
          <CardContent className="space-y-5">
            {result ? (
              <div className={`rounded-xl p-5 ${result.tone}`}>
                <h2 className="text-xl font-bold">{result.title}</h2>
                <p className="mt-2">{result.detail}</p>
                <p className="mt-3 font-semibold">{result.recommendation}</p>
              </div>
            ) : (
              <p className="rounded-xl bg-muted p-5">{messages.screeningSuccess.missingResult}</p>
            )}
            {notificationStatus === "success" ? (
              <Alert>
                <Mail aria-hidden="true" />
                <AlertTitle>{messages.screeningSuccess.notificationSent}</AlertTitle>
                <AlertDescription>{messages.screeningSuccess.notificationSentDescription}</AlertDescription>
              </Alert>
            ) : null}
            {notificationStatus === "error" ? (
              <Alert variant="destructive">
                <Mail aria-hidden="true" />
                <AlertTitle>{messages.screeningSuccess.notificationFailed}</AlertTitle>
                <AlertDescription>{messages.screeningSuccess.notificationFailedDescription}</AlertDescription>
              </Alert>
            ) : null}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="flex-1"><a href={SITE_LINKS.messenger} target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden="true" /> {messages.screeningSuccess.messenger}</a></Button>
              <Button asChild variant="outline" className="flex-1"><a href="/danh-gia-nguy-co-can-thi/">{messages.screeningSuccess.retry}</a></Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ScreeningSuccess;
