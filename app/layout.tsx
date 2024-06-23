import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import Header2 from "@/components/header2";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InfoWeaver",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-orange-50"}>
        <main className="p-0 m-0 max-h-screen overscroll-none">
        <Header2 />

        {children}
        </main>
      </body>
    </html>
  );
}
