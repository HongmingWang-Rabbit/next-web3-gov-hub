'use client';

import Link from 'next/link';
import { siteConfig } from '@/config/site';

export function Footer() {
  return (
    <footer className="border-t border-[rgb(var(--border))] bg-[rgb(var(--card))] mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left side - Branding */}
          <div className="text-center md:text-left">
            <p className="font-bold text-lg text-[rgb(var(--primary))]">
              {siteConfig.name}
            </p>
            <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">
              {siteConfig.footer.tagline}
            </p>
            <p className="text-xs text-[rgb(var(--muted-foreground))] mt-2">
              {siteConfig.footer.copyright}
            </p>
          </div>

          {/* Right side - Links */}
          <div className="flex flex-wrap justify-center md:justify-end gap-6">
            {siteConfig.footer.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-[rgb(var(--primary))] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mt-6 pt-6 border-t border-[rgb(var(--border))]">
          <a
            href={siteConfig.urls.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:text-[rgb(var(--primary))] transition-colors"
          >
            Twitter
          </a>
          <a
            href={siteConfig.urls.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:text-[rgb(var(--primary))] transition-colors"
          >
            Discord
          </a>
          <a
            href={siteConfig.urls.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:text-[rgb(var(--primary))] transition-colors"
          >
            Telegram
          </a>
          <a
            href={siteConfig.urls.medium}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:text-[rgb(var(--primary))] transition-colors"
          >
            Medium
          </a>
          <a
            href={siteConfig.urls.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:text-[rgb(var(--primary))] transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
