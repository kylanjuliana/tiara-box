import type { Metadata } from "next";
import { Gamja_Flower } from "next/font/google";
import "./globals.css";

const gamja = Gamja_Flower({
  variable: "--font-gamja",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "boxie",
  description: "for tiara",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${gamja.variable} antialiased`}>{children}</body>
    </html>
  );
}
