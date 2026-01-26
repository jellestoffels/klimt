import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition"; // Keep existing as per 8.1
import SmoothScroll from "@/components/SmoothScroll";
import { Analytics } from "@vercel/analytics/next";

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
    <html lang="en">
      <body className="antialiased">
        <SmoothScroll>
          <Header />
          <PageTransition>{children}</PageTransition>
        </SmoothScroll>
      </body>
    </html>
  );
}