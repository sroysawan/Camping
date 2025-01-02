import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Providers from "./Providers";
import { ClerkProvider } from "@clerk/nextjs";
import { Noto_Sans_Thai } from 'next/font/google'
const noto = Noto_Sans_Thai({
  subsets: ['thai', 'latin'],
})

export const metadata: Metadata = {
  title: "Camping",
  icons: {
    icon: "/icon.png", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning>
        <body
          className={`${noto.className} antialiased`}
        >
          <Providers>
            <Navbar />
            <main className="container">
              {children}
            </main>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
