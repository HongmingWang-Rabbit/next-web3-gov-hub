import { http, createConfig } from 'wagmi';
import { getDefaultConfig } from 'connectkit';
import { chainsConfig } from '@/config/chains';

export const config = createConfig(
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
