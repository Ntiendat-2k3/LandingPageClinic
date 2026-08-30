"use client";

import type React from "react";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import { messages } from "@/i18n";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    time: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "",
        date: "",
        time: "",
        message: "",
      });
    }, 3000);
  };

  const services = messages.contact.services;

  const timeSlots = [
    "8:00 - 9:00",
    "9:00 - 10:00",
    "10:00 - 11:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00",
  ];

  return (
    <section id="contact" className="section-padding bg-gradient-secondary">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {messages.contact.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {messages.contact.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="font-space-grotesk text-2xl font-bold text-gray-900 mb-6">
                {messages.contact.contactInfo}
              </h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {messages.contact.addressTitle}
                    </h4>
                    <p className="text-gray-600">
                      {messages.contact.address}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {messages.contact.addressHint}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {messages.contact.phoneTitle}
                    </h4>
                    <p className="text-gray-600">{messages.contact.phone}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {messages.contact.phoneHint}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{messages.contact.emailTitle}</h4>
                    <p className="text-gray-600">{messages.contact.email}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {messages.contact.emailHint}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {messages.contact.hoursTitle}
                    </h4>
                    <div className="text-gray-600 space-y-1">
                      {messages.contact.hours.map((hours) => <p key={hours}>{hours}</p>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="font-space-grotesk text-lg font-semibold text-gray-900 mb-4">
                {messages.contact.mapTitle}
              </h4>
              <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=256&width=400"
                  alt={messages.contact.mapAlt}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <p className="text-sm text-gray-600 mt-3">
                {messages.contact.mapDescription}
              </p>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            {!isSubmitted ? (
              <>
                <h3 className="font-space-grotesk text-2xl font-bold text-gray-900 mb-6">
                  {messages.contact.formTitle}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {messages.contact.nameLabel}
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors"
                        placeholder={messages.contact.namePlaceholder}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {messages.contact.phoneLabel}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors"
                        placeholder={messages.contact.phonePlaceholder}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {messages.contact.emailLabel}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors"
                      placeholder={messages.contact.emailPlaceholder}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {messages.contact.serviceLabel}
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors"
                    >
                      <option value="">{messages.contact.selectService}</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {messages.contact.dateLabel}
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {messages.contact.timeLabel}
                      </label>
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors"
                      >
                        <option value="">{messages.contact.selectTime}</option>
                        {timeSlots.map((slot, index) => (
                          <option key={index} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {messages.contact.messageLabel}
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors resize-none"
                      placeholder={messages.contact.messagePlaceholder}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary flex items-center justify-center space-x-2"
                  >
                    <Send className="w-5 h-5" />
                    <span>{messages.contact.submit}</span>
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    {messages.contact.agreementPrefix}{" "}
                    <a href="#" className="text-cyan-600 hover:underline">
                      {messages.contact.terms}
                    </a>{" "}
                    {messages.contact.agreementJoin}{" "}
                    <a href="#" className="text-cyan-600 hover:underline">
                      {messages.contact.privacy}
                    </a>{" "}
                    {messages.contact.agreementSuffix}
                  </p>
                </form>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-space-grotesk text-2xl font-bold text-gray-900 mb-4">
                  {messages.contact.successTitle}
                </h3>
                <p className="text-gray-600 mb-6">
                  {messages.contact.successDescription}
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    {messages.contact.bookingCode}{" "}
                    <span className="font-semibold text-gray-900">
                      {messages.contact.bookingCodePrefix}{Date.now().toString().slice(-6)}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
