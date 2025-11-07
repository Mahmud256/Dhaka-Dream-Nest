'use client';

import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Banner: React.FC = () => {
  const images: string[] = [
    '/home/a1.jpg',
    '/home/a2.jpg',
    '/home/a3.jpg',
    '/home/a4.jpg',
    '/home/a5.jpg',
  ];

  return (
    <div className="w-[1177px] mx-auto mt-4 mb-4">
      <Carousel
        autoPlay
        interval={5000}
        infiniteLoop
        showThumbs={false}
        showArrows
        showStatus={false}
      >
        {images.map((src, index) => (
          <div key={index} className="relative bal w-full h-[130vh]">
            <Image
              src={src}
              alt={`Banner image ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
