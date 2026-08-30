import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, MessageSquare, Phone, User } from "lucide-react";

import SectionHeader from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { sendBookingNotification, type BookingData } from "@/lib/emailjs";
import { messages } from "@/i18n";
import {
  formatPhoneNumber,
  getFieldError,
  sanitizeInput,
  validateBookingForm,
  type BookingFormData,
  type ValidationError,
} from "@/utils/validation";

const TIME_SLOTS = [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
  "17:00 - 18:00",
  "18:00 - 19:00",
] as const;

/** Điều phối dữ liệu, kiểm tra hợp lệ và gửi yêu cầu đặt lịch khám. */
const BookingSection = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    phone: "",
    date: "",
    time: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );
  const [showErrors, setShowErrors] = useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    let sanitizedValue = value;

    if (name === "name" || name === "message") {
      sanitizedValue = sanitizeInput(value);
    } else if (name === "phone") {
      sanitizedValue = value.replace(/[^\d\s().+-]/g, "");
    }

    setFormData((current) => ({ ...current, [name]: sanitizedValue }));

    if (showErrors) {
      setValidationErrors((current) =>
        current.filter((error) => error.field !== name)
      );
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setShowErrors(true);

    const validation = validateBookingForm(formData);

    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      const firstErrorField = validation.errors[0]?.field;
      if (firstErrorField) {
        document
          .querySelector(`[name="${firstErrorField}"]`)
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setValidationErrors([]);
    setIsLoading(true);

    const formattedData = {
      ...formData,
      phone: formatPhoneNumber(formData.phone),
    };

    try {
      const emailResult = await sendBookingNotification(
        formattedData as BookingData
      );

      navigate("/booking-success", {
        state: {
          bookingData: formattedData,
          emailStatus: emailResult.success ? "success" : "error",
        },
        replace: true,
      });
    } catch (error) {
      console.error("Không thể gửi thông báo đặt lịch:", error);
      navigate("/booking-success", {
        state: { bookingData: formattedData, emailStatus: "error" },
        replace: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getError = (fieldName: string) =>
    showErrors ? getFieldError(validationErrors, fieldName) : undefined;

  const nameError = getError("name");
  const phoneError = getError("phone");
  const dateError = getError("date");
  const timeError = getError("time");
  const messageError = getError("message");

  return (
    <section id="booking" className="section-padding bg-gradient-primary">
      <div data-scroll-reveal className="container mx-auto container-padding">
        <SectionHeader
          title={messages.booking.title}
          description={messages.booking.description}
          className="mb-10 md:mb-12"
        />

        <Card className="mx-auto max-w-3xl">
          <CardHeader>
            <CardTitle>{messages.booking.cardTitle}</CardTitle>
            <CardDescription>
              {messages.booking.requiredNote}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} noValidate>
              <FieldGroup>
                <FieldSet>
                  <FieldLegend>{messages.booking.personalInfo}</FieldLegend>
                  <FieldGroup>
                    <Field
                      data-invalid={Boolean(nameError)}
                      data-disabled={isLoading}
                    >
                      <FieldLabel htmlFor="booking-name">
                        <User className="size-4" aria-hidden="true" />
                        {messages.booking.nameLabel}
                      </FieldLabel>
                      <Input
                        id="booking-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        disabled={isLoading}
                        autoComplete="name"
                        aria-invalid={Boolean(nameError)}
                        aria-describedby={nameError ? "booking-name-error" : undefined}
                        placeholder={messages.booking.namePlaceholder}
                      />
                      <FieldError id="booking-name-error">
                        {nameError}
                      </FieldError>
                    </Field>

                    <Field
                      data-invalid={Boolean(phoneError)}
                      data-disabled={isLoading}
                    >
                      <FieldLabel htmlFor="booking-phone">
                        <Phone className="size-4" aria-hidden="true" />
                        {messages.booking.phoneLabel}
                      </FieldLabel>
                      <Input
                        id="booking-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        disabled={isLoading}
                        autoComplete="tel"
                        inputMode="tel"
                        aria-invalid={Boolean(phoneError)}
                        aria-describedby={phoneError ? "booking-phone-error" : undefined}
                        placeholder={messages.booking.phonePlaceholder}
                      />
                      <FieldError id="booking-phone-error">
                        {phoneError}
                      </FieldError>
                    </Field>
                  </FieldGroup>
                </FieldSet>

                <FieldSet>
                  <FieldLegend>{messages.booking.appointmentInfo}</FieldLegend>
                  <FieldGroup className="grid md:grid-cols-2">
                    <Field
                      data-invalid={Boolean(dateError)}
                      data-disabled={isLoading}
                    >
                      <FieldLabel htmlFor="booking-date">
                        <Calendar className="size-4" aria-hidden="true" />
                        {messages.booking.dateLabel}
                      </FieldLabel>
                      <Input
                        id="booking-date"
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        disabled={isLoading}
                        min={new Date().toISOString().split("T")[0]}
                        aria-invalid={Boolean(dateError)}
                        aria-describedby={dateError ? "booking-date-error" : undefined}
                      />
                      <FieldError id="booking-date-error">
                        {dateError}
                      </FieldError>
                    </Field>

                    <Field
                      data-invalid={Boolean(timeError)}
                      data-disabled={isLoading}
                    >
                      <FieldLabel htmlFor="booking-time">
                        <Clock className="size-4" aria-hidden="true" />
                        {messages.booking.timeLabel}
                      </FieldLabel>
                      <NativeSelect
                        id="booking-time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        required
                        disabled={isLoading}
                        aria-invalid={Boolean(timeError)}
                        aria-describedby={timeError ? "booking-time-error" : undefined}
                      >
                        <NativeSelectOption value="">
                          {messages.booking.selectTime}
                        </NativeSelectOption>
                        {TIME_SLOTS.map((timeSlot) => (
                          <NativeSelectOption key={timeSlot} value={timeSlot}>
                            {timeSlot}
                          </NativeSelectOption>
                        ))}
                      </NativeSelect>
                      <FieldError id="booking-time-error">
                        {timeError}
                      </FieldError>
                    </Field>
                  </FieldGroup>
                </FieldSet>

                <Field
                  data-invalid={Boolean(messageError)}
                  data-disabled={isLoading}
                >
                  <FieldLabel htmlFor="booking-message">
                    <MessageSquare className="size-4" aria-hidden="true" />
                    {messages.booking.messageLabel}
                  </FieldLabel>
                  <Textarea
                    id="booking-message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    disabled={isLoading}
                    maxLength={500}
                    aria-invalid={Boolean(messageError)}
                    aria-describedby={
                      messageError
                        ? "booking-message-error booking-message-count"
                        : "booking-message-count"
                    }
                    placeholder={messages.booking.messagePlaceholder}
                  />
                  <div className="flex items-start justify-between gap-4">
                    <FieldError id="booking-message-error">
                      {messageError}
                    </FieldError>
                    <FieldDescription
                      id="booking-message-count"
                      className="ml-auto shrink-0"
                    >
                      {formData.message.length}/500
                    </FieldDescription>
                  </div>
                </Field>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Spinner data-icon="inline-start" />
                      {messages.booking.submitting}
                    </>
                  ) : (
                    messages.booking.submit
                  )}
                </Button>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BookingSection;
