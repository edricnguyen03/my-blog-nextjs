import type { Metadata } from "next";
import "../styles/globals.css";
import { Inter } from "next/font/google";
import Header from "../components/page/header";
import Footer from "../components/page/footer";
import Container from '../components/container';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "My Blog - Next.js",
  description: "Blog created with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} flex flex-col h-[100dvh]`}
      >
        <Header />
        <main className="flex-1">
          <Container>{children}</Container>
        </main>
        <Footer />
      </body>
    </html>
  );
}
