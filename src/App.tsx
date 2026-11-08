import { useEffect, useRef } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import BookingSection from "./components/sections/BookingSection";
import DoctorsSection from "./components/sections/DoctorsSection";
// import EquipmentSection from "./components/sections/EquipmentSection";
import FAQSection from "./components/sections/FaqSection";
import GoalsSection from "./components/sections/GoalsSection";
import HeroSection from "./components/sections/HeroSection";
import PricingSection from "./components/sections/PricingSection";
import ProcessSection from "./components/sections/ProcessSection";
// import ServicesSection from "./components/sections/ServicesSection";
import TestimonialsSection from "./components/sections/TestimonialsSection";
// import VideoSection from "./components/sections/VideoSection";
import StickyCTA from "./components/common/StickyCTA";
import ScrollRevealObserver from "./components/common/ScrollRevealObserver";
import ProgressionAssessmentSection from "./components/sections/ProgressionAssessmentSection";
import BookingSuccess from "./pages/BookingSuccess";
import ScreeningSuccess from "./pages/ScreeningSuccess";
import TreatmentGuidePage from "./pages/TreatmentGuidePage";
import { messages } from "./i18n";

function HomePage() {
  return (
    <>
      <HeroSection />
      <GoalsSection />
      <ProgressionAssessmentSection />
      <ProcessSection />
      <PricingSection />
      <DoctorsSection />
      {/* <EquipmentSection /> */}
      <TestimonialsSection />
      <FAQSection />
      <BookingSection />
    </>
  );
}

/** Tự động gửi sự kiện page_view tới Google Tag (gtag) mỗi khi chuyển trang nội bộ trong React. */
function PageViewTracker() {
  const location = useLocation();
  const isFirstMount = useRef(true);

  useEffect(() => {
    // Bỏ qua lượt đầu tiên vì mã gtag trong <head> của HTML đã tự động kích hoạt khi tải trang
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    const windowWithGtag = window as unknown as { gtag?: (...args: unknown[]) => void };
    if (typeof windowWithGtag.gtag === "function") {
      const pagePath = location.pathname + location.search;
      windowWithGtag.gtag("event", "page_view", {
        page_path: pagePath,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [location]);

  return null;
}

function App() {
  return (
    <div className="min-h-screen bg-background">
      <PageViewTracker />
      <a
        href="#main-content"
        className="sr-only fixed left-4 top-4 z-50 rounded-lg bg-background px-4 py-2 text-foreground shadow-lg focus:not-sr-only"
      >
        {messages.app.skipToContent}
      </a>
      <Header />
      <ScrollRevealObserver />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cam-on-dang-ky" element={<BookingSuccess />} />
          <Route path="/booking-success" element={<Navigate to="/cam-on-dang-ky" replace />} />
          <Route path="/cam-on-khao-sat" element={<ScreeningSuccess />} />
          {messages.methodGuides.pages.map((guide) => (
            <Route key={guide.path} path={guide.path} element={<TreatmentGuidePage guide={guide} />} />
          ))}
        </Routes>
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
}

export default App;
