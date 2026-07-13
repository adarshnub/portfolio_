import type { Metadata } from "next";
import { Bowlby_One_SC, DM_Mono } from "next/font/google";
import "./globals.css";

const display = Bowlby_One_SC({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const mono = DM_Mono({
  variable: "--font-mono",
  weight: ["300", "400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "V Adarsh | AI Engineer",
  description:
    "AI engineer building agentic products, realtime creative tools, and scalable video systems.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}

