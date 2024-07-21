import { type Theme, getDefaultConfig, lightTheme } from '@rainbow-me/rainbowkit';
import { base } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: '1fac7d8ed191481eb6bf0625a2b9a556',
  chains: [base],
});

export const customRainbowTheme: Theme = {
  ...lightTheme(),
  colors: {
    ...lightTheme().colors,
    accentColor: '#0600FF', // Matching primary background color
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