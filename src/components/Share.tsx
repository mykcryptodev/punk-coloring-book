import Image from "next/image";
import Link from "next/link";
import { type FC } from "react";
import { type NFT } from "thirdweb";

type Props = {
  nft: NFT | null,
}
export const Share: FC<Props> = ({ nft }) => {
  const postText = `I brought my ColorPunk to life with Base Colors!`;
  if (!nft) return null;
  return (
    <div className="flex items-center gap-2">
      <Link
        href={`https://x.com/intent/post?text=${encodeURIComponent(postText)}&url=${encodeURIComponent('https://colorpunks.com/punk/' + nft.id.toString())}`}
      >
        <Image
          src="/x.png"
          alt="Share on Twitter"
          width={24}
          height={24}
        />
      </Link>
      <Link
        href={`https://warpcast.com/~/compose?text=${encodeURIComponent(postText)}&embeds[]=https://colorpunks.com/punk/${nft.id.toString()}`}
      >
        <Image
          src="/farcaster.png"
          alt="Share on Twitter"
          width={24}
          height={24}
        />
      </Link>
    </div>
  )
};

export default Share;