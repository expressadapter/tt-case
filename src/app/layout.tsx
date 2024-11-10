import type { Metadata } from "next";
import { ViewTransitions } from 'next-view-transitions'
import Link from 'next/link'

import "./globals.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';

export const metadata: Metadata = {
  title: "In-flight Menu Helper",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-full justify-center flex flex-row">
        <div className="absolute top-0 left-0 w-full h-8 bg-branding-red"></div>
        <Card className="mt-4 w-full max-w-4xl min-h-screen border-0">
          <Link href="/">
            <CardHeader className="mt-4 flex flex-col items-center justify-between">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center">
                  <Image
                    src="/thy-logo.png"
                    alt="THY Logo"
                    width={220}
                    height={20}
                  />
                </div>
                <CardTitle className="pt-2 text-xl">In-flight Menu Helper</CardTitle>
              </div>
            </CardHeader>
          </Link>
          <CardContent>
            <ViewTransitions>
              {children}
            </ViewTransitions>
          </CardContent>

        </Card>
      </body>

    </html>


  );
}
