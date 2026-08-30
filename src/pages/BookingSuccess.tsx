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

  return (
    <section className="section-padding flex min-h-screen items-center bg-gradient-primary">
      <div className="container mx-auto container-padding">
        <Card size="lg" className="mx-auto max-w-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 flex size-20 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <CheckCircle className="size-10" aria-hidden="true" />
            </div>
            <CardTitle>
              <h1>Đặt lịch thành công!</h1>
            </CardTitle>
            <CardDescription>
              Cảm ơn <strong className="text-primary">{bookingData.name}</strong>{" "}
              đã tin tưởng. Chúng tôi sẽ liên hệ trong 30 phút để xác nhận lịch
              hẹn.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-5">
            <section className="rounded-xl bg-muted p-5" aria-labelledby="booking-details-title">
              <h2 id="booking-details-title" className="mb-3 font-semibold text-foreground">
                Thông tin đặt lịch
              </h2>
              <dl className="grid gap-2 text-muted-foreground">
                <div className="flex flex-wrap justify-between gap-2">
                  <dt className="font-medium text-foreground">Họ tên</dt>
                  <dd>{bookingData.name}</dd>
                </div>
                <div className="flex flex-wrap justify-between gap-2">
                  <dt className="font-medium text-foreground">Số điện thoại</dt>
                  <dd>{bookingData.phone}</dd>
                </div>
                <div className="flex flex-wrap justify-between gap-2">
                  <dt className="font-medium text-foreground">Ngày khám</dt>
                  <dd>
                    {new Date(bookingData.date).toLocaleDateString("vi-VN")}
                  </dd>
                </div>
                <div className="flex flex-wrap justify-between gap-2">
                  <dt className="font-medium text-foreground">Giờ khám</dt>
                  <dd>{bookingData.time}</dd>
                </div>
                {bookingData.message ? (
                  <div className="flex flex-col gap-1">
                    <dt className="font-medium text-foreground">Ghi chú</dt>
                    <dd>{bookingData.message}</dd>
                  </div>
                ) : null}
              </dl>
            </section>

            {emailStatus === "success" ? (
              <Alert>
                <Mail aria-hidden="true" />
                <AlertTitle>Đã gửi thông báo</AlertTitle>
                <AlertDescription>
                  Thông tin đặt lịch đã được chuyển đến phòng khám.
                </AlertDescription>
              </Alert>
            ) : null}

            {emailStatus === "error" ? (
              <Alert variant="destructive">
                <Mail aria-hidden="true" />
                <AlertTitle>Chưa gửi được thông báo</AlertTitle>
                <AlertDescription>
                  Vui lòng gọi trực tiếp để phòng khám xác nhận lịch hẹn.
                </AlertDescription>
              </Alert>
            ) : null}

            <Alert>
              <Phone aria-hidden="true" />
              <AlertTitle>Liên hệ trực tiếp</AlertTitle>
              <AlertDescription>
                <a
                  href="tel:0387812321"
                  className="font-semibold text-primary underline-offset-4 hover:underline"
                >
                  0387 812 321
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
              Quay về trang chủ
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default BookingSuccess;
