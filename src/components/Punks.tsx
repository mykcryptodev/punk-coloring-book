import { useEffect, useRef, useState, type FC } from "react";
import { useAccount } from "wagmi";
import { api } from "~/utils/api";
import { type NFT } from "~/types/simplehash";
import { resolveScheme } from "thirdweb/storage";
import { createThirdwebClient } from "thirdweb";
import { env } from "~/env";
import Link from "next/link";
import { MintPunk } from "./MintPunk";

type Props = {
  onPunkSelected: (punk: NFT) => void;
  updatedPunk: NFT | null;
}

export const Punks: FC<Props> = ({ onPunkSelected, updatedPunk }) => {
  const [selectedPunk, setSelectedPunk] = useState<NFT | null>(null);
  const account = useAccount();
  const { data, isLoading, refetch } = api.nft.getOwnedPunks.useQuery({
    address: account?.address ?? '',
  }, {
    enabled: !!account,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const PunkPic: FC<{ punk: NFT }> = ({ punk }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [, setImage] = useState<HTMLImageElement | null>(null);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext('2d');
      if (!context) return;

      let imgUrl = punk?.image_url ?? '/select.png';
      if (punk?.image_url?.startsWith("ipfs://")) {
        const client = createThirdwebClient({
          clientId: env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
        });
        const url = resolveScheme({
          client,
          uri: punk.image_url,
        });
        imgUrl = url;
      }
  
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = imgUrl; // Replace with your image path
      img.onload = () => {
        setImage(img);
        context.imageSmoothingEnabled = false;
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
    }, [punk?.image_url]);
    
    return (
      <canvas
        ref={canvasRef}
        width={100}
        height={100}
        className={`${selectedPunk?.nft_id === punk.nft_id ? 'border border-black' : ''}`}
      />
    )
  };

  return (
    <div className="flex flex-col gap-1 w-full justify-center">
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {data?.nfts?.map((nft) => (
          <div 
            key={nft.nft_id} 
            className={`flex flex-col gap-2 cursor-pointer`}
            onClick={() => {
              setSelectedPunk(nft);
              onPunkSelected(nft)
            }}
          >
            <PunkPic 
              punk={nft.nft_id === updatedPunk?.nft_id ? updatedPunk : nft}
            />
            <span className="text-center text-sm">{nft.name}</span>
          </div>
        ))}
        {isLoading && <div>Loading...</div>}
        {!isLoading && !data?.nfts?.length && <div>No punks found</div>}
      </div>
      <MintPunk onMinted={refetch} />
      {/* <Link className="mx-auto" href="/mint" rel="noreferrer" target="_blank">
        <button 
          className="mt-4 flex items-center gap-2 justify-center w-full px-4 py-2 bg-secondary rounded hover:bg-secondary-hover active:bg-secondary-active disabled:opacity-50" 
        >
          Mint a new punk
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </button>
      </Link> */}
    </div>
  )
};

export default Punks;