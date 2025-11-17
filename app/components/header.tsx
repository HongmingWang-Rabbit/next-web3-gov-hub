'use client';

import Link from 'next/link';
import { ConnectKitButton } from 'connectkit';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { formatAddress } from '@/lib/utils';
import { siteConfig } from '@/config/site';

export function Header() {
  const { isConnected, isAuthenticated, userData, signIn, signOut } = useAuth();

  return (
    <header className="border-b border-[rgb(var(--border))] bg-[rgb(var(--card))]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold text-[rgb(var(--primary))]">
              {siteConfig.name}
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              {siteConfig.navigation.main.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm hover:text-[rgb(var(--primary))] transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              {userData?.isAdmin && siteConfig.navigation.admin.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm hover:text-[rgb(var(--primary))] transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {isConnected && isAuthenticated && userData && (
              <div className="text-sm">
                <span className="text-[rgb(var(--muted-foreground))]">
                  {formatAddress(userData.walletAddress)}
                </span>
                {userData.isAdmin && (
                  <span className="ml-2 text-xs bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] px-2 py-1 rounded">
                    Admin
                  </span>
                )}
              </div>
            )}

            <ConnectKitButton />

            {isConnected && !isAuthenticated && (
              <Button onClick={signIn} size="sm">
                Sign In
              </Button>
            )}

            {isAuthenticated && (
              <Button onClick={signOut} variant="outline" size="sm">
                Sign Out
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
