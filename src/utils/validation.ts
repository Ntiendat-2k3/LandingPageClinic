import { messages } from "@/i18n";

// Kiểm tra dữ liệu biểu mẫu đặt lịch.
export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface BookingFormData {
  name: string;
  phone: string;
  date: string;
  time: string;
  message: string;
}

// Chấp nhận họ tên có dấu tiếng Việt.
const validateName = (name: string): ValidationError | null => {
  if (!name.trim()) {
    return { field: "name", message: messages.validation.nameRequired };
  }

  if (name.trim().length < 2) {
    return { field: "name", message: messages.validation.nameTooShort };
  }

  if (name.trim().length > 50) {
    return { field: "name", message: messages.validation.nameTooLong };
  }

  // Chấp nhận chữ cái tiếng Việt và khoảng trắng.
  const nameRegex = /^[\p{L}\s]+$/u;

  if (!nameRegex.test(name.trim())) {
    return {
      field: "name",
      message: messages.validation.nameInvalidCharacters,
    };
  }

  // Tránh nhiều khoảng trắng liên tiếp.
  if (name.includes("  ")) {
    return {
      field: "name",
      message: messages.validation.nameRepeatedSpaces,
    };
  }

  return null;
};

// Kiểm tra số điện thoại Việt Nam.
const validatePhone = (phone: string): ValidationError | null => {
  if (!phone.trim()) {
    return { field: "phone", message: messages.validation.phoneRequired };
  }

  // Bỏ dấu phân cách trước khi kiểm tra.
  const cleanPhone = phone.replace(/[\s().-]/g, "");

  // Chỉ nhận đầu số di động Việt Nam.
  const phoneRegex =
    /^(0|\+84)(3[2-9]|5[689]|7[06-9]|8[1-689]|9[0-46-9])[0-9]{7}$/;

  if (!phoneRegex.test(cleanPhone)) {
    return {
      field: "phone",
      message: messages.validation.phoneInvalid,
    };
  }

  return null;
};

// Kiểm tra ngày hẹn.
const validateDate = (date: string): ValidationError | null => {
  if (!date.trim()) {
    return { field: "date", message: messages.validation.dateRequired };
  }

  const [year, month, day] = date.split("-").map(Number);
  const selectedDate = new Date(Date.UTC(year, month - 1, day));
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || selectedDate.getUTCFullYear() !== year || selectedDate.getUTCMonth() !== month - 1 || selectedDate.getUTCDate() !== day) {
    return { field: "date", message: messages.validation.dateInvalid };
  }

  if (date < today.toLocaleDateString("sv-SE", { timeZone: "Asia/Bangkok" })) {
    return {
      field: "date",
      message: messages.validation.datePast,
    };
  }

  // Chỉ nhận lịch trong vòng sáu tháng.
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 6);

  if (date > maxDate.toLocaleDateString("sv-SE", { timeZone: "Asia/Bangkok" })) {
    return {
      field: "date",
      message: messages.validation.dateTooFar,
    };
  }

  return null;
};

// Kiểm tra giờ hẹn.
const validateTime = (time: string): ValidationError | null => {
  if (!time.trim()) {
    return { field: "time", message: messages.validation.timeRequired };
  }

  const validTimeSlots = [
    "08:00 - 09:00",
    "09:00 - 10:00",
    "10:00 - 11:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00",
    "17:00 - 18:00",
    "18:00 - 19:00",
  ];

  if (!validTimeSlots.includes(time)) {
    return { field: "time", message: messages.validation.timeInvalid };
  }

  return null;
};

// Kiểm tra ghi chú tùy chọn.
const validateMessage = (message: string): ValidationError | null => {
  if (message.length > 500) {
    return { field: "message", message: messages.validation.messageTooLong };
  }

  // Loại bỏ một số mẫu spam thường gặp.
  const suspiciousPatterns = [
    /https?:\/\//i, // Liên kết
    /www\./i, // Tên miền
    /@[a-zA-Z0-9]/i, // Địa chỉ email
    /\b(viagra|casino|loan|money|win|prize)\b/i, // Từ khóa spam
  ];

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(message)) {
      return {
        field: "message",
        message: messages.validation.messageInappropriate,
      };
    }
  }

  return null;
};

// Kiểm tra toàn bộ biểu mẫu.
export const validateBookingForm = (
  formData: BookingFormData
): ValidationResult => {
  const errors: ValidationError[] = [];

  // Kiểm tra từng trường.
  const nameError = validateName(formData.name);
  if (nameError) errors.push(nameError);

  const phoneError = validatePhone(formData.phone);
  if (phoneError) errors.push(phoneError);

  const dateError = validateDate(formData.date);
  if (dateError) errors.push(dateError);

  const timeError = validateTime(formData.time);
  if (timeError) errors.push(timeError);

  const messageError = validateMessage(formData.message);
  if (messageError) errors.push(messageError);

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Lấy lỗi của trường cụ thể.
export const getFieldError = (
  errors: ValidationError[],
  fieldName: string
): string | null => {
  const error = errors.find((err) => err.field === fieldName);
  return error ? error.message : null;
};

// Chuẩn hóa số điện thoại để hiển thị.
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.length === 10 && cleaned.startsWith("0")) {
    return cleaned.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
  }

  return phone;
};
