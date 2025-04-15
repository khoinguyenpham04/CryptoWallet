import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import {
  Coins,
  Home,
  Wallet2,
  BarChart3
} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'CryptoKeep',
  description: 'A web wallet app to manage your cryptocurrency',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={cn(inter.variable, "font-sans antialiased px-8 md:px-16")}>
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {children}
      </main>
      <footer className="sticky bottom-0 bg-secondary p-6 border-t">
        <div className="flex justify-around">
          <Link href="/transactions">
            <Button variant="ghost">
              <Wallet2 className="h-8 w-8"/>
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost">
              <Home className="h-10 w-10"/>
            </Button>
          </Link>
          <Link href="/performance">
            <Button variant="ghost">
              <BarChart3 className="h-8 w-8"/>
            </Button>
          </Link>
        </div>
      </footer>
    </div>
    </body>
    </html>
  );
}
