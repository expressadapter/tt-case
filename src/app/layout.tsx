import type { Metadata } from 'next';
import { ViewTransitions } from 'next-view-transitions';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { AppProvider } from '@/contexts/AppContext';
import Image from 'next/image';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'In-flight Menu Helper',
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang="en">
      <body className="flex h-screen justify-center">
        <div className="absolute left-0 top-0 h-6 w-full bg-branding-red"></div>
        <div className="w-full max-w-4xl border-0">
          <Link href="/">
            <div className="mt-6 flex flex-col items-center justify-between p-2">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center">
                  <Image src="/images/thy-logo.png" alt="THY Logo" width={180} height={20} />
                </div>
                <p className="text-md pt-1 font-semibold">In-flight Menu Helper</p>
              </div>
            </div>
          </Link>
          <div className="px-4">
            <AppProvider>
              <ViewTransitions>
                <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
              </ViewTransitions>
            </AppProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
