"use client";
import { Inter } from "next/font/google";
import "./globals.css";

import { SessionProvider } from "next-auth/react";
import Background from "@/components/Elements/Background/Background";
import Navbar from "@/components/Fragments/Navbar";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "@/app/api/uploadthing/core";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark text-foreground bg-background">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <SessionProvider>
        <body className={inter.className}>
          <Background />
          <Navbar />
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
