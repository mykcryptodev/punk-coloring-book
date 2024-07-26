import { Avatar, Name } from "@coinbase/onchainkit/identity";
import { type NextPage } from "next";
import { type GetServerSideProps } from "next";
import Link from "next/link";
import { useMemo } from "react";
import { type NFT, createThirdwebClient, getContract } from "thirdweb";
import { getNFT } from "thirdweb/extensions/erc721";
import { MediaRenderer } from "thirdweb/react";
import { COLOR_PUNKS } from "~/constants/addresses";
import { CHAIN } from "~/constants/chains";
import { env } from "~/env";
import Head from "next/head";
import { FrameMetadata } from "@coinbase/onchainkit/frame";
import { resolveScheme } from "thirdweb/storage";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  
  const client = createThirdwebClient({
    clientId: env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
  });
  const contract = getContract({
    client,
    chain: CHAIN.thirdweb,
    address: COLOR_PUNKS,
  });
  const punk = await getNFT({ contract, tokenId: BigInt(id), includeOwner: true });

  return {
    props: {
      nft: {
        ...punk,
        id: punk.id.toString(),
      },
    },
  };
};

type Props = {
  nft: NFT,
};

export const Punk: NextPage<Props> = ({ nft }) => {
  const client = createThirdwebClient({
    clientId: env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
  });
  const attributes = useMemo(() => {
    if (!nft.metadata.attributes) return [];
    const attrs = nft.metadata.attributes as unknown as { trait_type: string, value: string }[];
    return attrs.map((attribute) => {
      return {
        trait_type: attribute.trait_type,
        value: attribute.value,
      };
    });
  }, [nft.metadata.attributes]);
  return (
    <>
      <Head>
        <title>ColorPunk #{nft.id.toString()}</title>
        <meta name="description" content="1,000 unique ColorPunks brought to life with Base Colors." />
        <link rel="icon" href="/favicon.ico" />
        <FrameMetadata
          buttons={[
            {
              action: 'link',
              label: `View #${nft.id.toString()}`,
              target: `https://colorpunks.com/punk/${nft.id.toString()}`,
            },
          ]}
          image={{
            src: nft.metadata.image ? resolveScheme({ client, uri: nft.metadata.image }) : 'https://colorpunks.com/og.jpg',
            aspectRatio: nft.metadata.image ? '1:1' : '1.91:1',
          }}
        />
      </Head>
      <div className="flex justify-center items-center mt-20">
        <div className="flex flex-col gap-1">
          <MediaRenderer
            client={client}
            src={nft.metadata.image}
            alt={nft.metadata.name}
            className="w-96 h-96 rounded"
          />
          <h1 className="font-bold text-xl">{nft.metadata.name}</h1>
          <div className="flex items-center gap-2">
            <Avatar address={nft.owner} className="w-6 h-6 rounded-full" />
            <Name className="text-sm" address={nft.owner} />
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {attributes?.map((attribute, index) => (
              <div key={index} className="flex flex-col items-center p-2 border rounded">
                <span className="font-bold">{attribute.trait_type}</span>
                <span>{attribute.value}</span>
              </div>
            ))}
          </div>
          <Link className="btn btn-primary" href="/">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Color your own punk!
          </Link>
        </div>
      </div>
    </>
  );
}

export default Punk;