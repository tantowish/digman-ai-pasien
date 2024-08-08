import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: "DIGMAN AI",
  description: "Carigi Indonesia Ground Breaking Artificial Intelligence Patient Anamnesis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth bg-main">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={quicksand.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
