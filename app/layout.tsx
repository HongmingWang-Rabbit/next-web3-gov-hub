import type { Metadata } from 'next';
import './globals.css';
import { Web3Provider } from '@/providers/web3-provider';
import { AuthProvider } from '@/providers/auth-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `${siteConfig.name} - ${siteConfig.description}`,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col" suppressHydrationWarning>
        <Web3Provider>
          <AuthProvider>
            <Header />
            <main className="container mx-auto px-4 py-8 flex-1">
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </Web3Provider>
      </body>
    </html>
  );
}
