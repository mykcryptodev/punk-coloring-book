import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { WagmiProvider } from "wagmi";
import { config } from "~/config/wagmi";
import '@coinbase/onchainkit/tailwind.css';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { env } from '~/env';
import { base } from 'viem/chains';
import { ThirdwebProvider } from "thirdweb/react";

const MyApp: AppType = ({ Component, pageProps }) => {
  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider 
          apiKey={env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
          chain={base}
        >
          <ThirdwebProvider>
            <Component {...pageProps} />
          </ThirdwebProvider>
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default api.withTRPC(MyApp);
