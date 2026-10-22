const form = document.getElementById("contactForm");
const nameInput = document.getElementById("parentName");
const phoneInput = document.getElementById("phone");
const consentInput = document.getElementById("contactConsent");
const submitButton = document.getElementById("contactSubmit");
const formError = document.getElementById("formError");
const submitError = document.getElementById("submitError");
const sessionError = document.getElementById("sessionError");
let requestId;

try {
  requestId = sessionStorage.getItem("screening-request-id");
} catch {
  requestId = null;
}

if (!requestId) {
  form.hidden = true;
  sessionError.classList.remove("hidden");
}

function showFieldError(input, errorId, invalid) {
  input.setAttribute("aria-invalid", String(invalid));
  document.getElementById(errorId).classList.toggle("hidden", !invalid);
}

form.addEventListener("input", (event) => {
  formError.classList.add("hidden");
  submitError.classList.add("hidden");
  if (event.target === nameInput) showFieldError(nameInput, "nameError", false);
  if (event.target === phoneInput) showFieldError(phoneInput, "phoneError", false);
  if (event.target === consentInput) document.getElementById("consentError").classList.add("hidden");
});

/** Chỉ sang trang kết quả sau khi tên và số điện thoại đã được lưu cùng lượt khảo sát. */
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = nameInput.value.trim();
  const phone = phoneInput.value.replace(/[\s.()-]/g, "");
  const normalizedPhone = phone.startsWith("+84") ? `0${phone.slice(3)}` : phone;
  const invalidName = name.length < 2 || name.length > 50 || !/^[\p{L}\s]+$/u.test(name) || /\s{2,}/.test(name);
  const invalidPhone = !/^0(3[2-9]|5[689]|7[06-9]|8[1-689]|9[0-46-9])\d{7}$/.test(normalizedPhone);
  const invalidConsent = !consentInput.checked;
  showFieldError(nameInput, "nameError", invalidName);
  showFieldError(phoneInput, "phoneError", invalidPhone);
  document.getElementById("consentError").classList.toggle("hidden", !invalidConsent);
  if (invalidName || invalidPhone || invalidConsent) {
    formError.classList.remove("hidden");
    formError.focus();
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Đang lưu thông tin...";
  submitError.classList.add("hidden");
  try {
    const response = await fetch("/api/screening", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ step: "contact", requestId, name, phone: normalizedPhone, consent: true }),
    });
    if (response.status === 404) {
      form.hidden = true;
      sessionError.classList.remove("hidden");
      sessionError.focus();
      return;
    }
    if (response.status === 409) throw new Error("CONTACT_ALREADY_SAVED");
    if (!response.ok) throw new Error("CONTACT_NOT_SAVED");
    const result = await response.json();
    if (!result.saved) throw new Error("CONTACT_NOT_SAVED");
    try {
      sessionStorage.setItem("screening-contact-complete", "true");
      sessionStorage.removeItem("screening-request-id");
      if (typeof result.notificationSent === "boolean") {
        sessionStorage.setItem("screening-notification", result.notificationSent ? "success" : "error");
      }
    } catch {
      // Dữ liệu đã được lưu; trang kết quả vẫn mở được nếu trình duyệt chặn lưu phiên.
    }
    location.assign("/cam-on-khao-sat");
  } catch (error) {
    submitError.textContent = error?.message === "CONTACT_ALREADY_SAVED"
      ? "Lượt khảo sát này đã có thông tin liên hệ khác. Vui lòng làm lại khảo sát nếu cần thay đổi thông tin."
      : "Chưa lưu được thông tin. Vui lòng thử lại hoặc gọi 0387 812 321.";
    submitError.classList.remove("hidden");
    submitError.scrollIntoView({ behavior: "smooth", block: "center" });
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Gửi thông tin và xem kết quả";
  }
});
