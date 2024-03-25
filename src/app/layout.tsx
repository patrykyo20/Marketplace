'use client'

import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import CartContext from "./_context/CartContext";
import { useState } from "react";
import GlobalApi from "./_utils/GlobalApi";

const outfit = Outfit({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Marketplace",
//   description: "My marketplace project",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [ cart, setCart ] = useState<any>([])

  return (
    <ClerkProvider>
      <CartContext.Provider value={{cart, setCart}}>
        <html lang="en">
          <body className={outfit.className}>
            <Header />
              {children}
            <Footer />
          </body>
        </html>
      </CartContext.Provider>
    </ClerkProvider>
  );
}
