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

/** Gửi đủ câu trả lời và chỉ mở kết quả khi máy chủ xác nhận đã lưu. */
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
    sessionStorage.setItem("screening-result", result.risk);
    location.assign("/cam-on-khao-sat");
  } catch {
    submitError.classList.remove("hidden");
    submitError.scrollIntoView({ behavior: "smooth", block: "center" });
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Gửi và xem kết quả đánh giá";
  }
});
