"use client";

import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import AOS from "aos";
import "aos/dist/aos.css";

// Define the service type
interface Service {
  id: number;
  title: string;
  paragraph: string;
}

const BuildingDetails: React.FC = () => {
  // Example data
  const allservice: Service[] = [
    {
      id: 1,
      title: "🌟 Architectural Marvel",
      paragraph:
        "The architectural marvel of DHAKA DREAM NEST is a testament to the dedication to craft and innovation. From the moment you enter, you are enveloped in a world where every element is a work of art, showcasing a perfect fusion of contemporary sophistication.",
    },
    {
      id: 2,
      title: "🏰 Opulent Interiors",
      paragraph:
        "Step into a realm of opulence within the walls of DHAKA DREAM NEST. From the majestic foyer to the lavish living spaces, each corner exudes an air of refinement. Luxurious materials and bespoke finishes adorn the interiors, creating an ambiance that resonates with elegance.",
    },
    {
      id: 3,
      title: "🌿 Serene Surroundings",
      paragraph:
        "DHAKA DREAM NEST is not just a building; it's a sanctuary nestled in the heart of nature. The lush greenery surrounding the premises provides a tranquil backdrop, offering a perfect blend of urban living and natural serenity.",
    },
    {
      id: 4,
      title: "🌈 Amenities Beyond Compare",
      paragraph:
        "Indulge in a lifestyle of unparalleled luxury with the exclusive amenities at DHAKA DREAM NEST. Whether it's the state-of-the-art fitness center, the shimmering pool, or the meticulously landscaped gardens, every detail is designed to elevate your living experience.",
    },
    {
      id: 5,
      title: "🌐 Technological Innovation",
      paragraph:
        "Experience the future of living with the cutting-edge technological features integrated into DHAKA DREAM NEST. Smart home automation, energy-efficient systems, and advanced security ensure a seamless and secure living environment.",
    },
  ];

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000 // animation duration
    //once: true, // animate only once
    //   easing: "ease-in-out",
    });
  }, []);

  return (
    <main className="min-h-screen w-full bg-[#f3f4f6] flex items-center justify-center px-4">
      <section className="max-w-[1177px] py-16 px-6 text-center">
        {/* Heading */}
        <h2
          className="text-4xl font-extrabold text-[#4f46e5] mb-8"
          data-aos="fade-down"
        >
          About the Building
        </h2>

        {/* Paragraph */}
        <p
          className="text-gray-700 text-lg mb-10 max-w-3xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Welcome to <span className="font-semibold">DHAKA DREAM NEST</span>,
          where architectural elegance meets unparalleled luxury. Explore the
          charming details of this exquisite building that stands as a testament
          to innovation and sophistication, with state-of-the-art design and
          world-class facilities.
        </p>

        {/* Swiper Slider */}
        <div data-aos="zoom-in" data-aos-delay="400">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="max-w-3xl mx-auto"
          >
            {allservice.map((service, index) => (
              <SwiperSlide key={service.id}>
                <div
                  className="bg-white border border-gray-200 rounded-xl shadow-md p-8 hover:shadow-2xl transition-all duration-300"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <h3 className="text-xl font-semibold text-[#103c3b] mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {service.paragraph}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </main>
  );
};

export default BuildingDetails;
