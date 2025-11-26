import type { Metadata } from "next";
import { Inter, Gulzar } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const gulzar = Gulzar({
  weight: "400",
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-gulzar",
});

export const metadata: Metadata = {
  title: "Quranic Transformation",
  description: "Journey through divine wisdom",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${gulzar.variable} dark`}>
      <head>
        {/* Scripts for PDF Generation */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js" />
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-background min-h-screen font-sans antialiased text-foreground">
        {/* Solid background, no distracting patterns for minimalism */}
        <div className="flex min-h-screen flex-col md:flex-row">{children}</div>
      </body>
    </html>
  );
}
