import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Typer 2024",
  description: "Application for Euro 2024",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main>
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            {children}
          </div>
        </main>
      </body>
    </html>
);
}
