/**
 * Configuration Index
 *
 * Central export point for all configuration modules
 */

export * from './site';
export * from './theme';
export * from './chains';
export * from './admin';

// You can also create a combined config object if needed
import { siteConfig } from './site';
import { themeConfig } from './theme';
import { chainsConfig } from './chains';
import { adminConfig } from './admin';

export const config = {
  site: siteConfig,
  theme: themeConfig,
  chains: chainsConfig,
  admin: adminConfig,
} as const;
