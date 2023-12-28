import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./context/SessionProvider";
import ToasterContext from "./context/ToasterContext";
import { getServerSession } from "next-auth";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { logDbConnections } from "@/utils/logDbConnections";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MyApp",
  description: "Application template",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  // detect current route

  logDbConnections();
  return (
    <html lang="en">
      <Provider session={session}>
        <body className={inter.className}>
          <ToasterContext />

          {children}
        </body>
      </Provider>
    </html>
  );
}
