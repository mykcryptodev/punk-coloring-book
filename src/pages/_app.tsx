import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { WagmiProvider } from "wagmi";
import { config } from "~/config/wagmi";
import '@coinbase/onchainkit/tailwind.css';
import '@rainbow-me/rainbowkit/styles.css';
import { type AvatarComponent, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { env } from '~/env';
import { base } from 'wagmi/chains';
import { ThirdwebProvider } from "thirdweb/react";
import { Avatar } from '@coinbase/onchainkit/identity';
import { customRainbowTheme } from '~/config/rainbow';
import posthog from "posthog-js"
import { PostHogProvider } from "posthog-js/react";

if (typeof window !== 'undefined') {
  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
    person_profiles: 'always',
    loaded: (posthog) => {
      if (env.NODE_ENV === 'development') posthog.debug() // debug mode in development
    },
  })
}

const MyApp: AppType = ({ Component, pageProps }) => {
  const queryClient = new QueryClient();

  const CustomAvatar: AvatarComponent = ({ address, size }) => {
    return (
      <Avatar address={address} className={`w-${size} h-${size}`} />
    )
  };

  return (
    <PostHogProvider client={posthog}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <OnchainKitProvider 
            apiKey={env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
            chain={base}
          >
            <RainbowKitProvider avatar={CustomAvatar} theme={customRainbowTheme}>
              <ThirdwebProvider>
                <Component {...pageProps} />
              </ThirdwebProvider>
            </RainbowKitProvider>
          </OnchainKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </PostHogProvider>
  );
};

export default api.withTRPC(MyApp);
