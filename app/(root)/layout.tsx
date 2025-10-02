"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Script from "next/script";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col w-full h-full">
      <Navbar />
      {children}
      <Footer />
      <Script
        src="https://checkout.flutterwave.com/v3.js"
        strategy="afterInteractive"
      />
    </main>
  );
};

export default Layout;
