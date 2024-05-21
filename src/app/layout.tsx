import Navbar from '../component/Navbar'; // Adjust the path based on your project structure
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import {getServerSession} from "next-auth";
import  SessionProvider from "@/utils/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
        <div className="mx-auto max-w-5xl text-2xl gap-2 mb-10">
          <Navbar />
        {children}
        </div>
        </SessionProvider>
        
       </body>
    </html>
  );
}
