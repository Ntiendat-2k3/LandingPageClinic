const form = document.getElementById("screeningForm");
const names = ["age", "sex", "onset", "degree", "progression", "parents", "outdoor", "near", "concern"];
const questionError = document.getElementById("questionError");
const consentError = document.getElementById("consentError");
const submitError = document.getElementById("submitError");
const submitButton = document.getElementById("showResult");
let requestId = null;

form.addEventListener("change", () => {
  requestId = null;
  questionError.classList.add("hidden");
  consentError.classList.add("hidden");
  submitError.classList.add("hidden");
});

/** Lưu câu trả lời trước, rồi chuyển sang bước liên hệ với cùng mã lượt khảo sát. */
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const answers = {};
  for (const name of names) {
    const selected = form.querySelector(`input[name="${name}"]:checked`);
    if (!selected) {
      questionError.classList.remove("hidden");
      questionError.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    answers[name] = { value: selected.value, label: selected.closest("label").textContent.trim() };
  }
  if (!document.getElementById("consent").checked) {
    consentError.classList.remove("hidden");
    document.getElementById("consent").focus();
    return;
  }
  requestId ??= crypto.randomUUID();
  submitButton.disabled = true;
  submitButton.textContent = "Đang lưu câu trả lời...";
  submitError.classList.add("hidden");
  try {
    const response = await fetch("/api/screening", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requestId, answers, consent: true }),
    });
    if (!response.ok) throw new Error("SCREENING_NOT_SAVED");
    const result = await response.json();
    if (!result.saved || !["high", "medium", "low"].includes(result.risk)) throw new Error("INVALID_RESULT");
    try {
      sessionStorage.setItem("screening-result", result.risk);
      sessionStorage.setItem("screening-request-id", requestId);
      sessionStorage.removeItem("screening-notification");
      sessionStorage.removeItem("screening-contact-complete");
    } catch {
      throw new Error("SESSION_STORAGE_UNAVAILABLE");
    }
    location.assign("/danh-gia-nguy-co-can-thi/form-thong-tin/");
  } catch (error) {
    submitError.textContent = error?.message === "SESSION_STORAGE_UNAVAILABLE"
      ? "Câu trả lời đã được lưu nhưng trình duyệt không lưu được phiên. Vui lòng cho phép dữ liệu phiên rồi thử lại."
      : "Chưa lưu được câu trả lời. Vui lòng thử lại hoặc gọi 0387 812 321.";
    submitError.classList.remove("hidden");
    submitError.scrollIntoView({ behavior: "smooth", block: "center" });
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Tiếp tục đến thông tin liên hệ";
  }
});
