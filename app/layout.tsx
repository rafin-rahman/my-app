import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/app/context/SessionProvider";
import ToasterContext from "./context/ToasterContext";
import { getServerSession } from "next-auth/next";
import { getSession } from "next-auth/react";
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
  // const session = await getServerSession();
  const get_session = await getSession();

  await logDbConnections();
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterContext />
        <SessionProvider session={get_session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
