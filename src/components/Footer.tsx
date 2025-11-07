"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

const Footer: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12" data-aos="fade-up">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={200}
            height={60}
            className="mx-auto"
          />
          <div className="my-4 text-gray-300">
            712 Jefferson Ave, Brooklyn <br /> Dhaka 11221
          </div>
        </div>

        {/* Info Sections */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {/* Call Us */}
          <div className="flex flex-col items-center md:items-start md:flex-row gap-4">
            <div className="text-indigo-500 text-4xl">
              <i className="icon_phone"></i>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-1">Call Us</h4>
              <p className="text-gray-300">+1 123 456 789</p>
            </div>
          </div>

          {/* Opening Hours */}
          <div
            className="flex flex-col items-center md:items-start md:flex-row gap-4"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="text-indigo-500 text-4xl">
              <i className="icon_clock"></i>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-1">Opening Hours</h4>
              <p className="text-gray-300">Mon to Sat 08:00 - 20:00</p>
            </div>
          </div>

          {/* Email Us */}
          <div
            className="flex flex-col items-center md:items-start md:flex-row gap-4"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className="text-indigo-500 text-4xl">
              <i className="icon_mail"></i>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-1">Email Us</h4>
              <p className="text-gray-300">contact@residem.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subfooter */}
      <div
        className="bg-gray-800 py-6"
        data-aos="fade-up"
        data-aos-delay="500"
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <div>Copyright 2025 - Residem by Designesia</div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-indigo-500" data-aos="zoom-in" data-aos-delay="600">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-indigo-500" data-aos="zoom-in" data-aos-delay="700">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-indigo-500" data-aos="zoom-in" data-aos-delay="800">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-indigo-500" data-aos="zoom-in" data-aos-delay="900">
              <FaYoutube />
            </a>
            <a href="#" className="hover:text-indigo-500" data-aos="zoom-in" data-aos-delay="1000">
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
