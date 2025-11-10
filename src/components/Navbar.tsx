'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { User, Menu, X } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react'; // ✅ for authentication

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: session } = useSession(); // ✅ get session data

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ Determine profile dashboard route based on role
  const profileLink = session?.user?.role
    ? `/dashboard/${session.user.role}`
    : '/login';

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[1001] transition-all duration-500 ${
        isScrolled ? 'bg-[#eaf8f8] shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1177px] mx-auto my-4 bg-[#eaf8f8] rounded-xl px-6 py-3 flex justify-between items-center transition-all duration-300">
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

        {/* Navigation (Desktop) */}
        <nav className="hidden md:flex items-center space-x-6 font-medium">
          <Link href="/" className="hover:text-[#4f46e5] font-bold text-gray-700">Home</Link>
          <Link href="/apartment" className="hover:text-[#4f46e5] font-bold text-gray-700">Apartment</Link>
          <Link href="/gallery" className="hover:text-[#4f46e5] font-bold text-gray-700">Gallery</Link>
          <Link href="/floorplan" className="hover:text-[#4f46e5] font-bold text-gray-700">Floorplan</Link>
          <Link href="/contact" className="hover:text-[#4f46e5] font-bold text-gray-700">Contact</Link>
        </nav>

        {/* Right Side - Profile */}
        <div className="flex items-center space-x-4 relative">
          {/* Profile Icon */}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="p-2 rounded-full cursor-pointer bg-white hover:bg-gray-200 transition"
          >
            <User className="w-5 h-5 text-[#103c3b]" />
          </button>

          {/* Profile Dropdown */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-10 bg-white shadow-lg rounded-md py-2 px-4 w-44 z-50">
              {session ? (
                <>
                  <p className="font-bold text-gray-700 mb-2">
                    Hello, {session.user?.name?.split(' ')[0]}
                  </p>
                  <Link
                    href={profileLink} // ✅ dynamic role-based dashboard link
                    onClick={() => setIsDropdownOpen(false)}
                    className="block font-bold text-gray-700 mb-2 hover:text-[#4f46e5]"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="text-left w-full text-red-500 hover:text-green-500 font-bold cursor-pointer"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block font-bold text-gray-700 hover:text-[#4f46e5]"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 bg-[#103c3b] rounded-lg text-white"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#103c3b] text-white shadow-lg py-3">
          <ul className="flex flex-col space-y-3 px-6">
            <li><Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
            <li><Link href="/apartment" onClick={() => setIsMenuOpen(false)}>Apartment</Link></li>
            <li><Link href="/gallery" onClick={() => setIsMenuOpen(false)}>Gallery</Link></li>
            <li><Link href="/floorplan" onClick={() => setIsMenuOpen(false)}>Floorplan</Link></li>
            <li><Link href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
