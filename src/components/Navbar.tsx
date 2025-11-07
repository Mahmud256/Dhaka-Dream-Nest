'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`absolute left-0 w-full z-[1001] transition-all duration-500 ${isScrolled
          ? 'bg-[#eaf8f8] backdrop-blur-md shadow-md top-0 fixed'
          : 'bg-transparent top-0'
        }`}
    >
      <div className="w-[1177px] mx-auto my-4 bg-[#eaf8f8] rounded-xl px-6 py-3 flex justify-between items-center transition-all duration-300">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={120}
            height={40}
            className="transition-transform duration-300 hover:scale-105"
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6  font-medium">
          <div className="relative group">
            <Link href="/" className="hover:text-gray-300">Home</Link>
          </div>
          <Link href="apartment" className="hover:text-gray-300">Apartment</Link>
          <Link href="gallery" className="hover:text-gray-300">Gallery</Link>
          <Link href="floorplan" className="hover:text-gray-300">Floorplan</Link>
          <Link href="contact" className="hover:text-gray-300">Contact</Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          <Link
            href="contact"
            className="bg-white text-[#103c3b] font-semibold px-4 py-2 rounded-lg hover:bg-gray-200 transition"
          >
            Schedule a Visit
          </Link>

          {/* Mobile menu */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col justify-between w-6 h-5"
          >
            <span className="w-full h-[2px] bg-white"></span>
            <span className="w-full h-[2px] bg-white"></span>
            <span className="w-full h-[2px] bg-white"></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#0a2625] shadow-lg py-3">
          <ul className="flex flex-col space-y-2 px-4 ">
            <li><Link href="/">Home</Link></li>
            <li><Link href="apartment">Apartment</Link></li>
            <li><Link href="gallery">Gallery</Link></li>
            <li><Link href="floorplan">Floorplan</Link></li>
            <li><Link href="contact">Contact</Link></li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
