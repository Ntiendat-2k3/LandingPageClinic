import { Routes, Route } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import BookingSection from "./components/sections/BookingSection";
import DoctorsSection from "./components/sections/DoctorsSection";
// import EquipmentSection from "./components/sections/EquipmentSection";
// import FAQSection from "./components/sections/FaqSection";
import GoalsSection from "./components/sections/GoalsSection";
import HeroSection from "./components/sections/HeroSection";
import PricingSection from "./components/sections/PricingSection";
import ProcessSection from "./components/sections/ProcessSection";
import ServicesSection from "./components/sections/ServicesSection";
import TestimonialsSection from "./components/sections/TestimonialsSection";
import VideoSection from "./components/sections/VideoSection";
import StickyCTA from "./components/common/StickyCTA";
import ScrollRevealObserver from "./components/common/ScrollRevealObserver";
import BookingSuccess from "./pages/BookingSuccess";

function HomePage() {
  return (
    <>
      <HeroSection />
      <GoalsSection />
      <VideoSection />
      <ServicesSection />
      <ProcessSection />
      <PricingSection />
      <DoctorsSection />
      {/* <EquipmentSection /> */}
      <TestimonialsSection />
      {/* <FAQSection /> */}
      <BookingSection />
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main-content"
        className="sr-only fixed left-4 top-4 z-50 rounded-lg bg-background px-4 py-2 text-foreground shadow-lg focus:not-sr-only"
      >
        Chuyển đến nội dung chính
      </a>
      <Header />
      <ScrollRevealObserver />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
        </Routes>
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
}

export default App;
