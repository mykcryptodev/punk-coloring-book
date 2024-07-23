import { useCallback, useEffect, useMemo, useRef, useState, type FC } from "react";
import { useAccount } from "wagmi";
import { resolveScheme } from "thirdweb/storage";
import { type NFT, createThirdwebClient, getContract } from "thirdweb";
import { env } from "~/env";
import { MintPunk } from "./MintPunk";
import { getOwnedNFTs } from "thirdweb/extensions/erc721";
import { CHAIN } from "~/constants/chains";
import { COLOR_PUNKS } from "~/constants/addresses";

type Props = {
  onPunkSelected: (punk: NFT) => void;
  updatedPunk: NFT | null;
}

export const Punks: FC<Props> = ({ onPunkSelected, updatedPunk }) => {
  const [selectedPunk, setSelectedPunk] = useState<NFT | null>(null);
  const account = useAccount();
  const [ownedPunks, setOwnedPunks] = useState<NFT[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const client = useMemo(() => createThirdwebClient({
    clientId: env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
  }), []);

  const contract = useMemo(() => getContract({
    client,
    chain: CHAIN.thirdweb,
    address: COLOR_PUNKS,
  }), [client]);

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
        {ownedPunks?.map((nft) => (
          <div 
            key={nft.id} 
            className={`flex flex-col gap-2 cursor-pointer`}
            onClick={() => {
              setSelectedPunk(nft.id === updatedPunk?.id ? updatedPunk : nft);
              onPunkSelected(nft.id === updatedPunk?.id ? updatedPunk : nft);
            }}
          >
            <PunkPic 
              punk={nft.id === updatedPunk?.id ? updatedPunk : nft}
            />
            <span className="text-center text-sm">{nft.metadata.name}</span>
          </div>
        ))}
        {isLoading && <div>Loading...</div>}
        {!isLoading && !ownedPunks?.length && <div>No punks found</div>}
      </div>
      <MintPunk onMinted={fetchOwnedNfts} />
    </div>
  )
};

export default Punks;