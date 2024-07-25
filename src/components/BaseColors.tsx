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
  const { data, isLoading, refetch: refetchBaseColors } = api.nft.getOwnedBaseColors.useQuery({
    address: account?.address ?? '',
  }, {
    enabled: !!account,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const { mutateAsync: refreshWalletMetadata } = api.nft.refreshWallet.useMutation();
  const [isRefreshingWallet, setIsRefreshingWallet] = useState<boolean>(false);

  const handleRefreshWalletMetadata = async () => {
    setIsRefreshingWallet(true);
    try {
      await refreshWalletMetadata({ address: account?.address ?? '' });
      setTimeout(() => {
        void refetchBaseColors();
      }, 10000);
    } catch (e) {
      console.log({ e })
    } finally {
      setIsRefreshingWallet(false);
    }
  };
  return (
    <div className="flex flex-col gap-1 w-full justify-center">
      <div className="flex justify-center flex-wrap gap-2">
        {data?.nfts?.map((nft) => {
          const customName = nft.extra_metadata.attributes.find((attr) => attr.trait_type === 'Color Name')?.value;
          const originalName = nft.name;
          const colorName = () => {
            if (!customName) return originalName;
            if (`#${customName.toUpperCase()}` === originalName) return originalName;
            return customName;
          }
          return (
            <div 
              key={nft.nft_id} 
              className={`flex flex-col items-center gap-2 cursor-pointer`}
              onClick={() => {
                setSelectedColor(colorName());
                onColorSelected(originalName)
              }}
            >
              <Image 
                src={nft.image_url}
                width={100}
                height={100}
                alt={colorName()}
                className={`${selectedColor === colorName() ? 'border-2 border-black' : ''}`}
              />
              <span className="text-center text-xs truncate max-w-24">{colorName()}</span>
            </div>
          )
        })}
        {isLoading && <div>Loading...</div>}
        {!isLoading && !data?.nfts?.length && <div>No colors found</div>}
      </div>
      <Link className="mx-auto" href="https://www.basecolors.com/" rel="noreferrer" target="_blank">
        <button 
          className="btn-primary font-bold" 
        >
          Mint Colors
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </button>
      </Link>
      <button
        disabled={isRefreshingWallet}
        className="font-bold underline opacity-70 text-xs mt-2"
        onClick={handleRefreshWalletMetadata}
      >
        {isRefreshingWallet && (
          <div className="animate-spin w-fit">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </div>
        )}
        Missing a color you just minted?
      </button>
    </div>
  )
};

export default BaseColors;