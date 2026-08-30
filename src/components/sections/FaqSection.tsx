"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { messages } from "@/i18n";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = messages.faq.items;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section-padding bg-white">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {messages.faq.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {messages.faq.description}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <HelpCircle className="w-5 h-5 text-cyan-600" />
                    </div>
                    <h3 className="font-space-grotesk text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </button>

                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <div className="pl-14">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Additional Help */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-secondary rounded-2xl p-8 md:p-12">
            <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-8 h-8 text-cyan-600" />
            </div>
            <h3 className="font-space-grotesk text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {messages.faq.helpTitle}
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              {messages.faq.helpDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">{messages.faq.call}</button>
              <button className="btn-secondary">{messages.faq.chat}</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
