import { useCallback, useEffect, useMemo, useRef, useState, type FC } from "react";
import { useAccount } from "wagmi";
import { resolveScheme } from "thirdweb/storage";
import { type NFT, createThirdwebClient, getContract } from "thirdweb";
import { env } from "~/env";
import { MintPunk } from "./MintPunk";
import { getOwnedNFTs, nextTokenIdToMint } from "thirdweb/extensions/erc721";
import { CHAIN } from "~/constants/chains";
import { COLOR_PUNKS } from "~/constants/addresses";
import NextImage from "next/image";
import Link from "next/link";
import posthog from "posthog-js";

type Props = {
  onPunkSelected: (punk: NFT) => void;
  onPunkMinted: () => void;
  updatedPunk: NFT | null;
}

export const Punks: FC<Props> = ({ onPunkSelected, onPunkMinted, updatedPunk }) => {
  const [selectedPunk, setSelectedPunk] = useState<NFT | null>(null);
  const account = useAccount();
  const [ownedPunks, setOwnedPunks] = useState<NFT[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshingWallet, setIsRefreshingWallet] = useState<boolean>(false);
  const [totalPunksMinted, setTotalPunksMinted] = useState<number>();

  const client = useMemo(() => createThirdwebClient({
    clientId: env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
  }), []);

  const contract = useMemo(() => getContract({
    client,
    chain: CHAIN.thirdweb,
    address: COLOR_PUNKS,
  }), [client]);

  const fetchTotalPunksMinted = useCallback(async () => {
    try {
      const totalPunks = await nextTokenIdToMint({ contract });
      setTotalPunksMinted(Number(totalPunks) - 1);
    } catch (e) {
      console.error(e);
    }
  }, [contract]);

  useEffect(() => {
    void fetchTotalPunksMinted();
  }, [contract, fetchTotalPunksMinted]);

  const fetchOwnedNfts = useCallback(async () => {
    if (!account?.address) return;
    setIsLoading(true);
    try {
      const ownedNFTs = await getOwnedNFTs({
        contract,
        owner: account.address,
      });
      setOwnedPunks(ownedNFTs);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [account?.address, contract]);

  useEffect(() => {
    if (account?.address) {
      void fetchOwnedNfts();
    } else {
      setOwnedPunks([]);
    }
  }, [account?.address, fetchOwnedNfts]);

  useEffect(() => {
    void fetchOwnedNfts();
  }, [fetchOwnedNfts, updatedPunk?.metadata.image]);

  const handleOnMint = () => {
    void fetchOwnedNfts();
    // wait 5s for the blockchain to index
    setTimeout(() => {
      void onPunkMinted();
      void fetchTotalPunksMinted();
    }, 5000);
  };

  const handleRefresh = async () => {
    posthog.capture('refresh_punks');
    setIsRefreshingWallet(true);
    try {
      await fetchOwnedNfts();
    } catch (e) {
      console.error(e);
    } finally {
      setIsRefreshingWallet(false);
    }
  }

  const PunkPic: FC<{ punk: NFT }> = ({ punk }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [, setImage] = useState<HTMLImageElement | null>(null);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext('2d');
      if (!context) return;

      let imgUrl = punk?.metadata.image ?? '/select-alt.png';
      if (punk?.metadata.image?.startsWith("ipfs://")) {
        const client = createThirdwebClient({
          clientId: env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
        });
        const url = resolveScheme({
          client,
          uri: punk.metadata.image,
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
    }, [punk?.metadata.image]);
    
    return (
      <canvas
        ref={canvasRef}
        width={100}
        height={100}
        className={`${selectedPunk?.id === punk.id ? 'border border-black' : ''}`}
      />
    )
  };

  return (
    <div className="flex flex-col gap-1 w-full justify-center">
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {ownedPunks?.map((nft, index) => (
          <div 
            key={nft.id} 
            className={`flex flex-col gap-2 cursor-pointer`}
            onClick={() => {
              posthog.capture('select_punk', { punk: nft.id.toString(), index });
              setSelectedPunk(nft.id === updatedPunk?.id ? updatedPunk : nft);
              onPunkSelected(nft.id === updatedPunk?.id ? updatedPunk : nft);
            }}
          >
            <PunkPic 
              punk={nft.id === updatedPunk?.id ? updatedPunk : nft}
            />
            <span className="flex items-center gap-1 text-center text-xs">
              {nft.metadata.name}
              <Link 
                href={`https://${CHAIN.name === 'base-sepolia' ? 'testnets.' : ''}opensea.io/assets/${CHAIN.name}/${COLOR_PUNKS}/${nft.id.toString()}`} 
                rel="noreferrer" 
                target="_blank"
              >
                <NextImage
                  src="/opensea.svg"
                  width={14}
                  height={14}
                  alt="opensea"
                />
              </Link>
            </span>
          </div>
        ))}
        {isLoading && <div>Loading...</div>}
        {!isLoading && !ownedPunks?.length && <div>No punks found</div>}
      </div>
      <MintPunk onMinted={handleOnMint} totalPunksMinted={totalPunksMinted} />
      <button
        className="font-bold underline opacity-70 text-xs mt-2 mx-auto flex items-center gap-1"
        onClick={handleRefresh}
      >
        {isRefreshingWallet && (
          <div className="animate-spin w-fit">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </div>
        )}
        Missing a punk you just minted?
      </button>
    </div>
  )
};

export default Punks;