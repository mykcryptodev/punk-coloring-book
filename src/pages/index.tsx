import Head from "next/head";
import { useEffect, useState } from "react";
import { type NFT } from "thirdweb";
import BaseColors from "~/components/BaseColors";
import ColoringBook from "~/components/ColoringBook";
import Punks from "~/components/Punks";
import { Wallet } from "~/components/Wallet";
import { useAccount } from 'wagmi';
import Instructions from "~/components/Instructions";
import Share from "~/components/Share";

export default function Home() {
  const account = useAccount();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedPunk, setSelectedPunk] = useState<NFT | null>(null);
  const [updatedPunk, setUpdatedPunk] = useState<NFT | null>(null);
  const [lastMintedTimestamp, setLastMintedTimestamp] = useState<number | null>(null);

  useEffect(() => {
    if (!account?.address) {
      setSelectedPunk(null);
    }
  }, [account]);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  if (!isMounted) return null;

  const onPunkColored = (punk: NFT) => {
    setSelectedPunk(punk);
    setUpdatedPunk(punk);
  }

  return (
    <>
      <Head>
        <title>ColorPunks</title>
        <meta name="description" content="1,000 unique ColorPunks brought to life with Base Colors." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mb-40 sm:mt-20 mt-10 flex flex-col items-center justify-center">
        <h1 className="text-center mb-4 font-bold text-6xl sm:text-7xl text-primary">
          ColorPunks
        </h1>
        <Wallet />
        <Instructions key={lastMintedTimestamp} />
        <div className="my-4" />
        <div className="text-xl font-bold mb-2">Your Punks</div>
        <Punks 
          onPunkSelected={(punk) => setSelectedPunk(punk)}
          onPunkMinted={() => {
            setLastMintedTimestamp(Date.now());
          }}
          updatedPunk={updatedPunk}
        />
        <ColoringBook
          color={selectedColor}
          punk={selectedPunk}
          onPunkColored={(punk) => onPunkColored(punk)}
        />
        <div className="my-1" />
        <Share nft={selectedPunk} />
        <div className="my-4" />
        <div className="mb-2 text-xl font-bold">Your Base Colors</div>
        <BaseColors 
          onColorSelected={(color) => setSelectedColor(color)}
        />
        <div className="my-4" />
      </main>
    </>
  );
}
