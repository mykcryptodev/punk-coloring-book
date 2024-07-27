import { Avatar, Name } from "@coinbase/onchainkit/identity";
import Link from "next/link";
import { useEffect, useState, type FC } from "react";
import { createThirdwebClient, getContract, type NFT } from "thirdweb";
import { getNFT } from "thirdweb/extensions/erc721";
import { MediaRenderer } from "thirdweb/react";
import { COLOR_PUNKS } from "~/constants/addresses";
import { CHAIN } from "~/constants/chains";
import { env } from "~/env";
import { api } from "~/utils/api";

export const NewlyColored: FC = () => {
  const { data: updatedMetadataEvents } = api.nft.getUpdateMetadataEvents.useQuery({
    orderBy: "timestamp",
    orderDirection: "desc",
    limit: 50,
  });
  const client = createThirdwebClient({
    clientId: env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
  });
  const contract = getContract({
    address: COLOR_PUNKS,
    chain: CHAIN.thirdweb,
    client,
  });
  const UpdatedPunk: FC<{ tokenId: string }> = ({ tokenId }) => {
    const [nft, setNft] = useState<NFT | null>(null);
    useEffect(() => {
      const fetchNft = async () => {
        const nft = await getNFT({ contract, tokenId: BigInt(tokenId), includeOwner: true });
        setNft(nft);
      };
      void fetchNft();
    }, [tokenId]);

    return (
      <div key={tokenId} className="flex flex-col gap-2 w-56 h-56">
        <Link 
          href={`https://opensea.io/assets/${CHAIN.name}/${COLOR_PUNKS}/${tokenId}`}
          target="_blank"
          rel="noreferrer"
        >
          <MediaRenderer
            client={client}
            src={nft?.metadata.image}
            className="w-40 h-40"
            height={"160px"}
            width={"160px"}
          />
        </Link>
        <div className="flex flex-col gap-1">
          <h3 className="font-bold">{nft?.metadata?.name}</h3>
          {nft && (
            <div className="flex items-center gap-1">
              <Avatar address={nft.owner} className="w-4 h-4 rounded-full" />
              <Name address={nft.owner} className="text-xs" />
            </div>
          )}
        </div>
      </div>
    )
  }
  return (
    <div>
      <h2 className="text-xl text-center font-bold mb-1">Newly Colored</h2>
      <div className="text-center mb-2">Punks recently brought to life by the community</div>
      <div className="flex overflow-x-auto items-start gap-2 mx-auto md:max-w-md sm:max-w-sm max-w-xs">
        {updatedMetadataEvents?.map(e => (
          <div className="w-40 h-56" key={e.id}>
            <UpdatedPunk tokenId={e.tokenId} />
          </div>
        ))}
      </div>
    </div>
  )
};

export default NewlyColored;
