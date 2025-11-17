'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/providers/auth-provider';
import { formatAddress } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import { UnifiedAuthButton } from './unified-auth-button';

export function Header() {
  const { isAuthenticated, userData } = useAuth();

  return (
    <header className="border-b border-[rgb(var(--border))] bg-[rgb(var(--card))]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a
              href={siteConfig.url}
              className="flex items-center gap-3"
              target="_blank"
              rel="noopener noreferrer"
            >
              {siteConfig.logo.image && (
                <Image
                  src={siteConfig.logo.image}
                  alt={siteConfig.name}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              )}
              <span className="text-2xl font-bold text-[rgb(var(--primary))]">
                {siteConfig.name}
              </span>
            </a>
            <nav className="hidden md:flex items-center gap-6">
              {siteConfig.navigation.main.map((item) => (
                'external' in item && item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-[rgb(var(--primary))] transition-colors"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm hover:text-[rgb(var(--primary))] transition-colors"
                  >
                    {item.name}
                  </Link>
                )
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
            {isAuthenticated && userData && (
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

            <UnifiedAuthButton />
          </div>
        </div>
      </div>
    </header>
  );
}
