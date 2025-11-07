"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

export default function GalleryPage() {
  const images = [
    "/images/gallery/l1.webp",
    "/images/gallery/l2.webp",
    "/images/gallery/l3.webp",
    "/images/gallery/l4.webp",
    "/images/gallery/l5.webp",
    "/images/gallery/l6.webp",
    "/images/gallery/l7.webp",
    "/images/gallery/l8.webp",
    "/images/gallery/l9.webp",
    "/images/gallery/l10.webp",
    "/images/gallery/l11.webp",
    "/images/gallery/l12.webp",
  ];

  // Track the selected image for the modal
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Initialize AOS on mount
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section className="bg-[#103c3b]">
      <div className="min-h-screen py-28 w-[1177px] mx-auto">
        <div className="container mx-auto text-center">
          <h2
            className="text-3xl font-bold text-[#eaf8f8] mb-10 flex items-center justify-center gap-2"
            data-aos="fade-down"
          >
            <span>🖼️</span> Image Gallery
          </h2>

          {/* Grid of Images */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            data-aos="fade-up"
          >
            {images.map((src, index) => (
              <div
                key={index}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
                className="relative group overflow-hidden rounded-2xl shadow-md bg-white cursor-pointer"
                onClick={() => setSelectedImage(src)}
              >
                <Image
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500 ease-in-out"
                  width={500}
                  height={400}
                />
                <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-40 transition duration-500 flex items-center justify-center">
                  <p className="text-white text-lg opacity-0 group-hover:opacity-100 transition">
                    View Image
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-[#00000075] flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
          data-aos="fade-in"
        >
          <div
            className="relative max-w-2xl w-full mx-3"
            data-aos="zoom-in"
            data-aos-duration="600"
          >
            <Image
              src={selectedImage}
              alt="Selected image"
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg mt-8"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-5 right-0 bg-white text-black px-3 py-1 rounded-full text-lg font-bold hover:bg-gray-200"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
