import { z } from "zod";
import { env } from "~/env";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { type NftsByWalletResponse } from "~/types/simplehash";
import { getNFT, updateMetadata } from "thirdweb/extensions/erc721";
import { createThirdwebClient, getContract, sendTransaction } from "thirdweb";
import { verifyMessage } from '@wagmi/core';
import { config } from "~/config/wagmi";
import { privateKeyToAccount } from "thirdweb/wallets";
import { BASE_COLORS, COLOR_PUNKS } from "~/constants/addresses";
import { CHAIN } from "~/constants/chains";

export const nftRouter = createTRPCRouter({
  getOwnedBaseColors: publicProcedure
    .input(z.object({ 
      address: z.string(),
    }))
    .query(async ({ input }) => {
      const { address } = input;
      const url = new URL(`https://api.simplehash.com/api/v0/nfts/owners`);
      url.searchParams.append('wallet_addresses', address);
      url.searchParams.append('contract_addresses', BASE_COLORS);
      url.searchParams.append('chains', 'base'); // always get real base colors
      url.searchParams.append('limit', '50');

      const data: NftsByWalletResponse = { nfts: [], next: null, next_cursor: null, previous: null };
      let nextUrl: string | null = url.toString();

      while (nextUrl) {
        const response = await fetch(nextUrl, {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            'X-API-KEY': env.SIMPLEHASH_API_KEY,
          },
        });
        const responseData = await response.json() as NftsByWalletResponse;
        data.nfts.push(...responseData.nfts);
        nextUrl = responseData.next ?? null;
      }

      return data;
    }),
  getOwnedPunks: publicProcedure
    .input(z.object({ 
      address: z.string(),
      cursor: z.string().optional(),
      limit: z.number().max(50).optional(),
    }))
    .query(async ({ input }) => {
      const { address, cursor, limit = 50 } = input;
      const url = new URL(`https://api.simplehash.com/api/v0/nfts/owners`);
      url.searchParams.append('wallet_addresses', address);
      url.searchParams.append('contract_addresses', COLOR_PUNKS);
      url.searchParams.append('chains', CHAIN.name);
      url.searchParams.append('limit', limit.toString());
      if (cursor) {
        url.searchParams.append('cursor', cursor);
      }

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'X-API-KEY': env.SIMPLEHASH_API_KEY,
        },
      });
      const data = await response.json() as NftsByWalletResponse;
      return data;
    }),
  refereshMetadata: publicProcedure
    .input(z.object({ 
      tokenId: z.string(),
    }))
    .mutation(async ({ input }) => {
      const chain = CHAIN.name;

      // Refresh metadata on opensea
      const osChainName = chain === 'base-sepolia' ? 'base_sepolia' : chain;
      const baseUri = `https://${osChainName === 'base_sepolia' ? 'testnets-' : ''}api.opensea.io/api/v2`;
      const openSeaUrl = new URL(`${baseUri}/chain/${osChainName}/contract/${COLOR_PUNKS}/nfts/${input.tokenId}/refresh`);

      // Refresh metadata on simplehash
      const simpleHashUrl = new URL(`https://api.simplehash.com/api/v0/nfts/refresh/${chain}/${COLOR_PUNKS}/${input.tokenId}`);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_openSeaResponse, simpleHashResponse] = await Promise.all([
        fetch(openSeaUrl.toString(), {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'X-API-KEY': env.OPENSEA_API_KEY,
          },
        }),
        fetch(simpleHashUrl.toString(), {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'X-API-KEY': env.SIMPLEHASH_API_KEY,
          },
        }),
      ]);
      console.log({ _openSeaResponse });

      const data = await simpleHashResponse.json() as NftsByWalletResponse;
      return data;
    }),
  refreshWallet: publicProcedure
    .input(z.object({ 
      address: z.string(),
    }))
    .mutation(async ({ input }) => {
      const chain = CHAIN.name;
      const url = new URL(`https://api.simplehash.com/api/v0/nfts/refresh/wallet/${input.address}`);
      // add the chain as a query parameter
      url.searchParams.append('chain', chain);
      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'X-API-KEY': env.SIMPLEHASH_API_KEY,
        },
      });
      type RefreshWalletResponse = {
        message: string;
      };
      const data = await response.json() as RefreshWalletResponse;
      return data;
    }),
  updateMetadata: publicProcedure
    .input(z.object({ 
      nftOwner: z.string(),
      imageUri: z.string(),
      tokenId: z.string(),
      signedMessage: z.string(),
    }))
    .mutation(async ({ input }) => {
      const message = `Update token id ${input.tokenId} image to ${input.imageUri}`;
      const client = createThirdwebClient({
        clientId: env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
      });
      const contract = getContract({
        client,
        chain: CHAIN.thirdweb,
        address: COLOR_PUNKS,
      })
      const nft = await getNFT({
        contract,
        tokenId: BigInt(input.tokenId),
        includeOwner: true,
      });
      if (!nft?.owner) {
        throw new Error('NFT not found');
      }
      const messageIsVerified = await verifyMessage(config, { 
        message, 
        signature: input.signedMessage as `0x${string}`,
        address: nft.owner,
      });
      if (!messageIsVerified) {
        throw new Error('Invalid signature');
      }
      const newMetadata = {
        ...nft.metadata,
        image: input.imageUri,
      }
      const transaction = updateMetadata({
        client,
        contract,
        targetTokenId: BigInt(input.tokenId),
        newMetadata,
      });
      const account = privateKeyToAccount({
        client,
        privateKey: env.ADMIN_PRIVATE_KEY,
      });
      await sendTransaction({
        account,
        transaction
      });
    }),
});
