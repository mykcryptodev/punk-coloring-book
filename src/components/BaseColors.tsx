import { useState, type FC } from "react";
import { useAccount } from "wagmi";
import { api } from "~/utils/api";
import Image from "next/image";
import Link from "next/link";

type Props = {
  onColorSelected: (color: string) => void;
}

export const BaseColors: FC<Props> = ({ onColorSelected }) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const account = useAccount();
  const { data, isLoading } = api.nft.getOwnedBaseColors.useQuery({
    address: account?.address ?? '',
  }, {
    enabled: !!account,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return (
    <div className="flex flex-col gap-1 w-full justify-center">
      <div className="flex justify-center flex-wrap gap-2">
        {data?.nfts?.map((nft) => (
          <div 
            key={nft.nft_id} 
            className={`flex flex-col gap-2 cursor-pointer`}
            onClick={() => {
              setSelectedColor(nft.name);
              onColorSelected(nft.name)
            }}
          >
            <Image 
              src={nft.image_url}
              width={100}
              height={100}
              alt={nft.name}
              className={`${selectedColor === nft.name ? 'border-2 border-black' : ''}`}
            />
            <span className="text-center text-sm">{nft.name}</span>
          </div>
        ))}
        {isLoading && <div>Loading...</div>}
        {!isLoading && !data?.nfts?.length && <div>No base colors found</div>}
      </div>
      <Link className="mx-auto" href="https://www.basecolors.com/" rel="noreferrer" target="_blank">
        <button 
          className="mt-4 flex items-center gap-2 justify-center w-full px-4 py-2 bg-secondary rounded hover:bg-secondary-hover active:bg-secondary-active disabled:opacity-50" 
        >
          Mint a new color
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>

        </button>
      </Link>
    </div>
  )
};

export default BaseColors;