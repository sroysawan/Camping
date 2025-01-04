import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Providers from "./Providers";
import { ClerkProvider } from "@clerk/nextjs";
import { Noto_Sans_Thai } from 'next/font/google'
import { Suspense } from "react";
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
            <Suspense>
              <Navbar />
              <main className="container">
                {children}
              </main>
            </Suspense>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
