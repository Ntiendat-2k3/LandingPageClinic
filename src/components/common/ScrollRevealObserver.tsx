import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/** Kích hoạt hiệu ứng xuất hiện một lần cho các vùng nội dung được đánh dấu khi chúng đi vào khung nhìn. */
export default function ScrollRevealObserver() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const root = document.documentElement;
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scroll-reveal]"),
    );
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      targets.forEach((target) => {
        target.dataset.scrollReveal = "visible";
      });
      return;
    }

    root.classList.add("scroll-reveal-enabled");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const target = entry.target as HTMLElement;
          target.dataset.scrollReveal = "visible";
          observer.unobserve(target);
        });
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.08,
      },
    );

    targets.forEach((target) => observer.observe(target));

    return () => {
      observer.disconnect();
      root.classList.remove("scroll-reveal-enabled");
    };
  }, [pathname]);

  return null;
}
