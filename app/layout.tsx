import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/app/context/SessionProvider";
import ToasterContext from "./context/ToasterContext";
import { getServerSession } from "next-auth";
import { logDbConnections } from "@/utils/logDbConnections";
import { SEO } from "@/utils/company";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: SEO.companyName,
  description: SEO.description,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  await logDbConnections();
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body className={inter.className}>
          <ToasterContext />
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
