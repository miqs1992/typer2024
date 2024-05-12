import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import Navigation from "@/components/navigation/navigation";
import { auth } from "@/lib/auth";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata: Metadata = {
  title: "Typer 2024",
  description: "Application for Euro 2024",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-w-screen min-h-screen bg-gray-900">
          {session ? <Navigation /> : null}
          <main
            className={`align-center relative flex w-full justify-center p-8 ${session ? "mt-[66px]" : ""}`}
          >
            <div className="w-full max-w-[1200px]">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
