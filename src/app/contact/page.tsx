"use client";

import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "10:00",
    message: "",
  });

  const [status, setStatus] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate success
    setTimeout(() => {
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        date: "",
        time: "10:00",
        message: "",
      });
    }, 1000);
  };

  return (
    <section className="py-20 w-[1177px] mx-auto">
      <div className="py-28">
        {/* Title Section */}
        <div className="text-center mb-10" data-aos="fade-up">
          <p className="text-[#4f46e5] text-sm uppercase tracking-widest mb-2">Contact Us</p>
          <h2 className="text-4xl font-bold text-gray-900">Schedule a Visit</h2>
        </div>

        <div className="grid md:grid-cols-2">
          {/* Agent Info */}
          <div className="flex justify-center" data-aos="fade-right">
            <div className="text-center">
              <Image
                src="/images/agents/1.webp"
                alt="Agent Emily Rodriguez"
                width={300}
                height={300}
                className="rounded-lg shadow-lg object-cover mx-auto"
              />
              <div className="mt-4">
                <h4 className="text-xl font-semibold text-gray-800 mb-1">
                  Emily Rodriguez
                </h4>
                <p className="text-[#4f46e5] font-medium">(555) 234-5678</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#f4f9f9] p-8 rounded-xl shadow-md" data-aos="fade-left">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4f46e5]"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4f46e5]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4f46e5]"
                />
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4f46e5]"
                >
                  {["10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00"].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <textarea
                name="message"
                placeholder="Submit Request"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-[#4f46e5]"
              ></textarea>

              <div className="text-left">
                <button
                  type="submit"
                  className="bg-[#4f46e5] hover:bg-[#4338ca] text-white px-6 py-2 rounded-lg shadow-md transition"
                >
                  Send Message
                </button>
              </div>
            </form>

            {/* Success/Error Messages */}
            {status === "success" && (
              <p className="mt-4 text-green-600 text-sm">
                ✅ Your message has been sent successfully!
              </p>
            )}
            {status === "error" && (
              <p className="mt-4 text-red-600 text-sm">
                ❌ Sorry, there was an error sending your form.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
