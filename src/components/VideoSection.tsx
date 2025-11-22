'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Play, X } from 'lucide-react';
// Use AOS for on-scroll fades; hover fade is handled with CSS overlay
import 'aos/dist/aos.css';

const VideoSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const videoId = "C6rf51uHWJg"; // YouTube Video ID

  useEffect(() => {
    // Initialize AOS (fade on scroll)
    import("aos").then((module) => {
      module.default.init({ once: true, duration: 600 });
    });
  }, []);

  return (
    <section className="w-full overflow-hidden">
      <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'filter blur-sm' : ''}`}>
        {/* Video Banner: AOS fade on scroll + CSS-only hover fade overlay */}
        <div
          className="relative w-full cursor-pointer group overflow-hidden"
          onClick={() => setIsOpen(true)}
          data-aos="zoom-in"
        >
          <Image
            src="/images/background/2.webp"
            alt="Video Background"
            width={1920}
            height={1080}
            className="w-full h-[500px] md:h-[600px] object-cover transform-gpu transition-transform duration-500 ease-out group-hover:scale-105"
          />

          {/* Hover fade overlay (pure CSS) */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            {/* Static Play Button (no animation) */}
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white/20 pointer-events-none">
              <Play className="w-10 h-10 text-white" />
            </div>

            <span className="mt-3 text-white font-semibold text-lg">Watch Video</span>
          </div>
        </div>
      </div>

      {/* Video Modal (no animations) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl aspect-video rounded-lg overflow-hidden shadow-lg"
            onClick={(e: React.MouseEvent) => e.stopPropagation()} // Prevent modal close on iframe click
          >
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-white hover:text-gray-300"
            >
              <X size={28} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoSection;
