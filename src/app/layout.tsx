import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import Navigation from "@/components/navigation/navigation";
import { auth } from "@/lib/auth";

const inter = Inter({ subsets: ["latin"] });

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
      <body className="min-h-screen min-w-screen bg-gray-900">
        {session ? <Navigation /> : null}
        <main>{children}</main>
      </body>
    </html>
  );
}
