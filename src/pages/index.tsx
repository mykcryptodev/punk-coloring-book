import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { type NFT } from "thirdweb";
import BaseColors from "~/components/BaseColors";
import ColoringBook from "~/components/ColoringBook";
import Punks from "~/components/Punks";
import { Wallet } from "~/components/Wallet";

export default function Home() {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedPunk, setSelectedPunk] = useState<NFT | null>(null);
  const [updatedPunk, setUpdatedPunk] = useState<NFT | null>(null);

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
        <title>Color Punks</title>
        <meta name="description" content="Use your Base Colors to decorate your Color Punks!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="my-40 flex flex-col items-center justify-center">
        <div className="mx-auto max-w-3xl mb-4">
          <Image
            src="/wordmark.png"
            alt="Color Punks"
            width={300}
            height={100}
            layout="responsive"
            priority
          />
        </div>
        <Wallet />
        <div className="my-4" />
        <div className="mb-2 text-xl font-bold">Your Punks</div>
        <Punks 
          onPunkSelected={(punk) => setSelectedPunk(punk)}
          updatedPunk={updatedPunk}
        />
        <div className="my-4" />
        <div className="mb-2 text-xl font-bold">Your Base Colors</div>
        <BaseColors 
          onColorSelected={(color) => setSelectedColor(color)}
        />
        <ColoringBook
          color={selectedColor}
          punk={selectedPunk}
          onPunkColored={(punk) => onPunkColored(punk)}
        />
      </main>
    </>
  );
}
