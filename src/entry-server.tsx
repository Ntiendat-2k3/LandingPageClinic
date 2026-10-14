import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App";
import { SITE_CONTACT, SITE_LINKS } from "./config/site";
import { messages } from "./i18n";

/** Tạo HTML ban đầu của trang chủ để nội dung có thể được đọc trước khi JavaScript chạy. */
export const renderHome = () => renderToString(
  <StaticRouter location="/">
    <App />
  </StaticRouter>
);

/** Chỉ mô tả những thông tin phòng khám, nhân sự và câu hỏi đang hiển thị trên trang. */
export const getStructuredData = (siteUrl?: string) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalClinic",
      name: messages.seo.clinicName,
      description: messages.hero.intro,
      telephone: `+84${SITE_CONTACT.phonePlain.slice(1)}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE_CONTACT.address.split(",")[0],
        addressLocality: messages.seo.city,
        addressCountry: "VN",
      },
      openingHours: "Mo-Su 08:00-19:00",
      hasMap: SITE_CONTACT.mapsUrl,
      sameAs: [SITE_CONTACT.facebookUrl, SITE_LINKS.tiktok, SITE_LINKS.zalo],
      employee: messages.doctors.profiles.map((profile) => ({
        "@type": "Person",
        name: profile.name,
        jobTitle: profile.title,
      })),
      ...(siteUrl ? {
        url: `${siteUrl}/`,
        logo: `${siteUrl}/images/logo.png`,
        image: `${siteUrl}/images/clinic-sign.webp`,
      } : {}),
    },
    {
      "@type": "FAQPage",
      mainEntity: messages.faq.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
});
