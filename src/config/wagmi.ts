import { http, createConfig } from 'wagmi';
import { 
  base, 
  // baseSepolia 
} from 'wagmi/chains';

import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  coinbaseWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { env } from '~/env';

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Suggested',
      wallets: [
        rainbowWallet,
        metaMaskWallet,
        coinbaseWallet,
        walletConnectWallet,
      ],
    },
  ],
  {
    appName: 'ColorPunks',
    projectId: env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  }
);

export const config = createConfig({
  chains: [base],// baseSepolia],
  connectors,
  transports: {
    // [baseSepolia.id]: http(),
    [base.id]: http(),
  },
});