import type { Metadata } from "next";
import localFont from "next/font/local";

import SidebarLayout from "@/components/SidebarLayout";
import { SidebarProvider } from "@/components/SidebarProvider";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 200 300 400 500 600 700 800 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 200 300 400 500 600 700 800 900",
});

export const metadata: Metadata = {
  title: "Simple Blog",
  description:
    "Welcome to Simple Blog, your go-to place for insightful articles and engaging stories. Dive in to explore a variety of topics and join our community of passionate readers and writers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.className} ${geistSans.className}  flex flex-col min-h-screen font antialiased overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <SidebarLayout>{children}</SidebarLayout>
            <Toaster />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
