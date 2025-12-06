'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Wallet } from 'lucide-react';
import { useAuth } from '@/providers/auth-provider';
import { formatAddress } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import { UnifiedAuthButton } from './unified-auth-button';

export function Header() {
  const { isAuthenticated, userData } = useAuth();
  const pathname = usePathname();

  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-[rgb(var(--background))]">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left - Logo */}
          <a
            href={siteConfig.urls.main}
            className="flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            {siteConfig.logo.image && (
              <Image
                src={siteConfig.logo.image}
                alt={siteConfig.name}
                width={32}
                height={32}
                className="object-contain"
              />
            )}
          </a>

          {/* Center - Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {siteConfig.navigation.main.filter(item => item.name !== 'Docs').map((item) => {
              const isActive = !('external' in item && item.external) && isActiveLink(item.href);
              return 'external' in item && item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm text-[rgb(var(--muted-foreground))] hover:text-white transition-colors rounded-lg"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[rgb(var(--color-base-1))] text-white'
                      : 'text-[rgb(var(--muted-foreground))] hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            {userData?.isAdmin && siteConfig.navigation.admin.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                  isActiveLink(item.href)
                    ? 'bg-[rgb(var(--color-base-1))] text-white'
                    : 'text-[rgb(var(--muted-foreground))] hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right - Auth */}
          <div className="flex items-center gap-3">
            {isAuthenticated && userData && (
              <div className="text-sm flex items-center gap-2">
                <span className="text-[rgb(var(--muted-foreground))]">
                  {formatAddress(userData.walletAddress)}
                </span>
                {userData.isAdmin && (
                  <span className="text-xs bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] px-2 py-0.5 rounded">
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
