"use client";

import { useState } from "react";
import { Award, GraduationCap, Shield, Check } from "lucide-react";

const DoctorsSection = () => {
  const baseProfile = {
    name: "Ths. Bs Trần Anh Tuấn",
    title: "Chuyên gia Mắt – Tật khúc xạ, Ortho-K & Kiểm soát cận thị",
    education:
      "Tốt nghiệp Thạc sĩ loại xuất sắc chuyên ngành Mắt – Tật khúc xạ tại Fudan University, Shanghai.",
    highlights: [
      "Nhiều năm làm việc tại các BV lớn trong và ngoài nước: Shanghai Eye & ENT Hospital, BV Trung ương Huế, BV Mắt quốc tế DND.",
      "Từng đảm nhiệm chức vụ Phụ trách Trung tâm Kính – Khúc xạ, BV Mắt quốc tế DND.",
      "Đầy đủ chứng chỉ đào tạo chuyên sâu về khúc xạ, kính Ortho-K, kiểm soát cận thị…",
    ],
    image: "/images/doctor1.jpg", // thay bằng ảnh thật nếu có
  };

  // 2 & 3 giống 1
  const doctors = [baseProfile, baseProfile, baseProfile];

  // mở rộng bullet ở mobile cho card nào
  const [expanded, setExpanded] = useState<number | null>(null);
  const toggle = (i: number) => setExpanded((cur) => (cur === i ? null : i));

  const scrollToBooking = () =>
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="doctors" className="section-padding bg-white">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-space-grotesk text-2xl md:text-4xl font-bold text-gray-900">
            Giới thiệu chuyên gia
          </h2>
        </div>

        {/* ===== MOBILE: carousel ngang, thẻ gọn gàng ===== */}
        <div className="md:hidden -mx-4 px-4">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {doctors.map((d, idx) => {
              const open = expanded === idx;
              const bullets = open ? d.highlights : d.highlights.slice(0, 2);
              return (
                <article
                  key={idx}
                  className="snap-start basis-[86%] shrink-0 rounded-2xl border border-gray-100 bg-white shadow-sm"
                >
                  {/* Ảnh: 4:3, ưu tiên object-top để không khuyết mặt */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl bg-gray-50">
                    <img
                      src={d.image || "/placeholder.svg"}
                      alt={d.name}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                    {/* dải gradient nhẹ phía dưới để chữ rõ hơn nếu đặt caption trong ảnh */}
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/10 to-transparent" />
                  </div>

                  {/* Nội dung gọn */}
                  <div className="p-4 space-y-3">
                    <header>
                      <h3 className="font-space-grotesk text-lg font-bold text-gray-900">
                        {d.name}
                      </h3>
                      <p className="text-emerald-700 text-sm font-medium mt-0.5">
                        {d.title}
                      </p>
                    </header>

                    {/* Học vấn */}
                    <div className="flex items-start gap-2">
                      <GraduationCap className="w-4 h-4 text-gray-500 mt-0.5" />
                      <p className="text-[13px] text-gray-700 leading-relaxed">
                        {d.education}
                      </p>
                    </div>

                    {/* Highlights: rút gọn + mở rộng */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-semibold text-gray-900">
                          Kinh nghiệm & thành tựu
                        </span>
                      </div>
                      <ul className="space-y-2 ml-6">
                        {bullets.map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-emerald-600 mt-0.5" />
                            <span className="text-[13px] text-gray-700 leading-relaxed">
                              {h}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {d.highlights.length > 2 && (
                        <button
                          onClick={() => toggle(idx)}
                          className="mt-2 text-[13px] font-semibold text-emerald-700"
                        >
                          {open ? "Thu gọn ▲" : "Xem thêm ▼"}
                        </button>
                      )}
                    </div>

                    {/* Bảo chứng + CTA nhỏ gọn */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-gray-500" />
                        <span className="text-[12px] text-gray-600">
                          Cam kết chuyên môn
                        </span>
                      </div>
                      <button
                        onClick={scrollToBooking}
                        className="px-3 py-1.5 rounded-full text-[12px] font-semibold text-white bg-gradient-to-r from-emerald-500 to-cyan-500"
                      >
                        Đặt lịch
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* ===== DESKTOP: lưới 2–3 cột, giữ chi tiết ===== */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {doctors.map((d, idx) => (
            <article
              key={idx}
              className="relative rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="h-80 lg:h-[420px] w-full overflow-hidden rounded-t-2xl bg-gray-50">
                <img
                  src={d.image || "/placeholder.svg"}
                  alt={d.name}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>

              <div className="p-6 space-y-4">
                <header>
                  <h3 className="font-space-grotesk text-xl font-bold text-gray-900">
                    {d.name}
                  </h3>
                  <p className="text-emerald-700 font-medium mt-1">{d.title}</p>
                </header>

                <div className="flex items-start gap-2">
                  <GraduationCap className="w-4 h-4 text-gray-500 mt-0.5" />
                  <p className="text-sm text-gray-700">{d.education}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-semibold text-gray-900">
                      Kinh nghiệm & thành tựu
                    </span>
                  </div>
                  <ul className="space-y-2 ml-6">
                    {d.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 mt-0.5" />
                        <span className="text-sm text-gray-700 leading-relaxed">
                          {h}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <Shield className="w-4 h-4 text-gray-500" />
                  <span className="text-xs text-gray-600">
                    Cam kết chuyên môn & đạo đức nghề nghiệp
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;
