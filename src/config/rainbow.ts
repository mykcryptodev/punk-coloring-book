import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: '1fac7d8ed191481eb6bf0625a2b9a556',
  chains: [base],
});

export default config;