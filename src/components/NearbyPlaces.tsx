'use client';

import Image from 'next/image';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

interface Place {
  id: number;
  title: string;
  distance: string;
  image: string;
  delay: string;
}

const places: Place[] = [
  {
    id: 1,
    title: 'Airport',
    distance: '18 miles',
    image: '/images/facilities-nearby/1.webp',
    delay: '0',
  },
  {
    id: 2,
    title: 'University',
    distance: '10 miles',
    image: '/images/facilities-nearby/3.webp',
    delay: '100',
  },
  {
    id: 3,
    title: 'Shopping Mall',
    distance: '12 miles',
    image: '/images/facilities-nearby/4.webp',
    delay: '200',
  },
];

const NearbyPlaces: React.FC = () => {
  useEffect(() => {
    import("aos").then((module) => {
      module.default.init({ duration: 800, once: true });
    });
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="w-[1177px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p
            className="text-[#4f46e5] font-semibold mb-2 uppercase tracking-wider"
            data-aos="fade-up"
            data-aos-delay="0"
          >
            Near by Places
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-gray-900"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Highlights Nearby
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {places.map((place) => (
            <div
              key={place.id}
              className="relative rounded-xl overflow-hidden text-white text-center shadow-lg"
              data-aos="zoom-in"
              data-aos-delay={place.delay}
            >
              <div className="overflow-hidden">
                <Image
                  src={place.image}
                  alt={place.title}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover transform hover:scale-110 transition duration-700"
                />
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-5 flex justify-between items-center">
                <h3 className="text-lg font-semibold">{place.title}</h3>
                <span className="text-sm opacity-90">{place.distance}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NearbyPlaces;
