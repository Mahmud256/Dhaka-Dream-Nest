"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '';
  // Hide Navbar/Footer for dashboard and its subroutes
  const hideShell = pathname.startsWith('/dashboard');

  return (
    <>
      {!hideShell && <Navbar />}
      <main>{children}</main>
      {!hideShell && <Footer />}
    </>
  );
}
