import { type Theme, getDefaultConfig, lightTheme } from '@rainbow-me/rainbowkit';
import { base } from 'wagmi/chains';
import { env } from '~/env';

export const config = getDefaultConfig({
  appName: 'Color Punks',
  projectId: env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  chains: [base],
});

export const customRainbowTheme: Theme = {
  ...lightTheme(),
  colors: {
    ...lightTheme().colors,
    accentColor: '#0000FF', // Matching primary background color
  },
  radii: {
    ...lightTheme().radii,
    actionButton: '4px',
    connectButton: '4px',
  },
  shadows: {
    ...lightTheme().shadows,
    connectButton: '0', // No shadow
  },
}

export default config;