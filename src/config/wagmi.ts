import { http, createConfig } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';

import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  coinbaseWallet,
} from '@rainbow-me/rainbowkit/wallets';

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [coinbaseWallet],
    },
  ],
  {
    appName: 'Color Punks',
    projectId: '1fac7d8ed191481eb6bf0625a2b9a556',
  }
);

export const config = createConfig({
  chains: [base, baseSepolia],
  connectors,
  transports: {
    [baseSepolia.id]: http(),
    [base.id]: http(),
  },
});