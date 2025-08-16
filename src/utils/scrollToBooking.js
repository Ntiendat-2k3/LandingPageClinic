export const scrollToBooking = () => {
  const element = document.getElementById("booking");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
