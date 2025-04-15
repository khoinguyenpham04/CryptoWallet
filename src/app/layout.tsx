import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import {Home, ListChecks, PiggyBank, Settings, Wallet2} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Firebase Studio App',
  description: 'Generated by Firebase Studio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased px-4`}>
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {children}
      </main>
      <footer className="sticky bottom-0 bg-secondary p-6 border-t">
        <div className="flex justify-around">
          <Link href="/">
            <Button variant="ghost">
              <Home className="h-8 w-8"/>
            </Button>
          </Link>
          <Button variant="ghost">
            <ListChecks className="h-8 w-8"/>
          </Button>
          <Button variant="ghost">
            <PiggyBank className="h-8 w-8"/>
          </Button>
          <Link href="/transactions">
            <Button variant="ghost">
              <Wallet2 className="h-8 w-8"/>
            </Button>
          </Link>
          <Button variant="ghost">
            <Settings className="h-8 w-8"/>
          </Button>
        </div>
      </footer>
    </div>
    </body>
    </html>
  );
}

