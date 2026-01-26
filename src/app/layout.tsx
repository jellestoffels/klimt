import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Klimt Studio",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-paper text-ink antialiased">
        <Header />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}