import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import Navigation from "@/components/navigation/navigation";
import { auth } from "@/lib/auth";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata: Metadata = {
  title: "Typer 2026",
  description: "Application for World Cup 2026",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={inter.className + " min-w-screen min-h-screen bg-gray-900"}
      >
        <div className="">
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
