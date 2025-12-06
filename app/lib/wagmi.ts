import { http, createConfig, type Config } from 'wagmi';
import { getDefaultConfig } from 'connectkit';
import { chainsConfig } from '@/config/chains';

let cachedConfig: Config | null = null;

export function getConfig(): Config {
  if (cachedConfig) return cachedConfig;

  cachedConfig = createConfig(
    getDefaultConfig({
      chains: chainsConfig.chains,
      transports: {
        ...Object.fromEntries(
          chainsConfig.chains.map((chain) => [chain.id, http()])
        ),
      },

      // Required
      walletConnectProjectId: chainsConfig.walletConnect.projectId,

      // Required App Info
      appName: chainsConfig.appMetadata.name,

      // Optional App Info
      appDescription: chainsConfig.appMetadata.description,
      appUrl: chainsConfig.appMetadata.url,
      appIcon: chainsConfig.appMetadata.icon,
    })
  );

  return cachedConfig;
}

// For backwards compatibility - only use on client side
export const config = typeof window !== 'undefined' ? getConfig() : (null as unknown as Config);
