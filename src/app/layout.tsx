import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "./navbar/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Szkoła Podstawowa nr 1 w Ożarowie Mazowieckim",
  description: "Szkoła Podstawowa nr 1, im. Janusza Kusocińskiego, w Ożarowie Mazowieckim.",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " " + "p-5 flex flex-col w-full items-center"}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
            <main className="flex flex-col gap-y-12">
              <Navbar />
              {children}
            </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

