import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "./navbar/server";
import Link from "next/link";

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
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

export const Footer = () => {
  return (
    <footer className="flex flex-col gap-5 border rounded-md bg-card px-5 py-2">
      <p className="text-muted-foreground">
        Nowa strona: <Link className="text-green-500" href="https://github.com/Maciek99">Maciej Fidler</Link>, Orginalna Strona: Krzysztof Markowsk, Logo szkoły: Marcel Szczepek
      </p>
    </footer>

  )
}