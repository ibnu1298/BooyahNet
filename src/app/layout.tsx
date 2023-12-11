"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Background from "@/components/Elements/Background/Background";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <SessionProvider>
        <body className={inter.className}>
          <Background />
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
