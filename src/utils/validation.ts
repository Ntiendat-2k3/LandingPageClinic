// Validation utilities for booking form
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

// Vietnamese name validation - allows Vietnamese characters
const validateName = (name: string): ValidationError | null => {
  if (!name.trim()) {
    return { field: "name", message: "Họ và tên không được để trống" };
  }

  if (name.trim().length < 2) {
    return { field: "name", message: "Họ và tên phải có ít nhất 2 ký tự" };
  }

  if (name.trim().length > 50) {
    return { field: "name", message: "Họ và tên không được quá 50 ký tự" };
  }

  // Allow Vietnamese characters, spaces, and common punctuation
  const nameRegex =
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵýỷỹ\s]+$/;

  if (!nameRegex.test(name.trim())) {
    return {
      field: "name",
      message: "Họ và tên chỉ được chứa chữ cái và khoảng trắng",
    };
  }

  // Check for excessive spaces
  if (name.includes("  ")) {
    return {
      field: "name",
      message: "Họ và tên không được chứa nhiều khoảng trắng liên tiếp",
    };
  }

  return null;
};

// Vietnamese phone number validation
const validatePhone = (phone: string): ValidationError | null => {
  if (!phone.trim()) {
    return { field: "phone", message: "Số điện thoại không được để trống" };
  }

  // Remove all spaces and special characters for validation
  const cleanPhone = phone.replace(/[\s\-$$$$.]/g, "");

  // Vietnamese phone number patterns
  const phoneRegex =
    /^(0|\+84)(3[2-9]|5[689]|7[06-9]|8[1-689]|9[0-46-9])[0-9]{7}$/;

  if (!phoneRegex.test(cleanPhone)) {
    return {
      field: "phone",
      message: "Số điện thoại không đúng định dạng Việt Nam",
    };
  }

  return null;
};

// Date validation
const validateDate = (date: string): ValidationError | null => {
  if (!date.trim()) {
    return { field: "date", message: "Ngày khám không được để trống" };
  }

  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (isNaN(selectedDate.getTime())) {
    return { field: "date", message: "Ngày khám không hợp lệ" };
  }

  if (selectedDate < today) {
    return {
      field: "date",
      message: "Ngày khám không được là ngày trong quá khứ",
    };
  }

  // Don't allow booking too far in advance (6 months)
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 6);

  if (selectedDate > maxDate) {
    return {
      field: "date",
      message: "Chỉ có thể đặt lịch trong vòng 6 tháng tới",
    };
  }

  // Check if it's Sunday (0 = Sunday)
  if (selectedDate.getDay() === 0) {
    return { field: "date", message: "Phòng khám không làm việc vào Chủ nhật" };
  }

  return null;
};

// Time validation
const validateTime = (time: string): ValidationError | null => {
  if (!time.trim()) {
    return { field: "time", message: "Giờ khám không được để trống" };
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
    return { field: "time", message: "Giờ khám không hợp lệ" };
  }

  return null;
};

// Message validation (optional field)
const validateMessage = (message: string): ValidationError | null => {
  if (message.length > 500) {
    return { field: "message", message: "Ghi chú không được quá 500 ký tự" };
  }

  // Check for suspicious patterns (basic spam detection)
  const suspiciousPatterns = [
    /https?:\/\//i, // URLs
    /www\./i, // Website references
    /@[a-zA-Z0-9]/i, // Email patterns
    /\b(viagra|casino|loan|money|win|prize)\b/i, // Common spam words
  ];

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(message)) {
      return {
        field: "message",
        message: "Ghi chú chứa nội dung không phù hợp",
      };
    }
  }

  return null;
};

// Main validation function
export const validateBookingForm = (
  formData: BookingFormData
): ValidationResult => {
  const errors: ValidationError[] = [];

  // Validate each field
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

// Helper function to get error message for a specific field
export const getFieldError = (
  errors: ValidationError[],
  fieldName: string
): string | null => {
  const error = errors.find((err) => err.field === fieldName);
  return error ? error.message : null;
};

// Helper function to format phone number for display
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.length === 10 && cleaned.startsWith("0")) {
    return cleaned.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
  }

  return phone;
};

// Helper function to sanitize input
export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/\s+/g, " ");
};
