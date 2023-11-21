import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import { NextIntlClientProvider } from "next-intl";
import "./globals.css";
import { notFound } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wine Labels",
  description: "Digital wine labels",
};

const locales = ["en", "hr"];

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`../../dictionaries/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <ClerkProvider>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <html lang={locale}>
          <body className={inter.className}>{children}</body>
          <Toaster />
        </html>
      </NextIntlClientProvider>
    </ClerkProvider>
  );
}
