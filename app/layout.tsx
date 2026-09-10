import type { Metadata } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "The Orchard Thieves | Pizza & Burgers, NZ",
  description:
    "Hand-tossed pizza and flame-grilled burgers, made fresh across 12 outlets in New Zealand.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className= {`${fraunces.variable} ${workSans.variable} font-body bg-gradient-to-br from-red-50 via-white to-orange-50`}>
        {children}
      </body>
    </html>
  );
}
