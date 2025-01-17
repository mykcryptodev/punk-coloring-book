import { useState, type FC } from "react";
import { createThirdwebClient, encode, getContract, toEther, toWei } from "thirdweb";
import { viemAdapter } from "thirdweb/adapters/viem";
import { env } from "~/env";
import { useAccount, useSendTransaction, useWalletClient } from "wagmi";
import { COLOR_PUNKS } from "~/constants/addresses";
import { mint } from "~/thirdweb/84532/0x9088bba410d204dc6837cc4f9ba23246dc5f58bf";
import { CHAIN } from "~/constants/chains";
import posthog from "posthog-js";

type Props = {
  onMinted: () => void;
  totalPunksMinted: number | undefined;
}

export const MintPunk: FC<Props> = ({ onMinted, totalPunksMinted }) => {
  const account = useAccount();
  const { data: walletClient } = useWalletClient();
  const [quantity, setQuantity] = useState<number>(1);
  const { sendTransaction } = useSendTransaction()
  const client = createThirdwebClient({
    clientId: env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
  });
  const contract = getContract({
    client,
    chain: CHAIN.thirdweb,
    address: COLOR_PUNKS,
  });
  const mintPrice = BigInt(toWei('0.001'));
  const handleMint = async () => {
    posthog.capture('mint_punk', { quantity });
    if (!account) return;
    const adaptedAccount = viemAdapter.walletClient.fromViem({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
      walletClient: walletClient as any, // accounts for wagmi/viem version mismatches
    });
    const transaction = mint({
      contract,
      to: adaptedAccount.address,
      quantity: BigInt(quantity),
    });
    const data = await encode(transaction);
    sendTransaction({
      to: contract.address,
      data,
      value: mintPrice * BigInt(quantity),
    }, {
      onSuccess: (hash: string) => {
        console.log('Minted', hash);
        // wait 5 seconds for the transaction to be indexed
        setTimeout(() => {
          onMinted();
        }, 500);
      }
    });
  };
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-col" id="mint-punks">
        <div className="flex items-center gap-4 mx-auto">
          <button 
            onClick={() => {
              posthog.capture('decrement_mint_quantity', { quantity: Math.max(1, quantity - 1) });
              setQuantity((prev) => Math.max(1, prev - 1))
            }}
            className="px-2 py-1 bg-gray-200 rounded"
          >
            -
          </button>
          <span>{quantity}</span>
          <button 
            onClick={() => {
              posthog.capture('increment_mint_quantity', { quantity: quantity + 1 });
              setQuantity((prev) => prev + 1);
            }}
            className="px-2 py-1 bg-gray-200 rounded"
          >
            +
          </button>
        </div>
        <div className="mx-auto w-fit">
          <button 
            disabled={!account?.address}
            onClick={async () => {
              await handleMint();
            }}
            className="btn-primary font-bold"
          >
            Mint {quantity.toString()} Punk{quantity > 1 ? 's' : ''} for {`${toEther(mintPrice * BigInt(quantity))} ETH`}
          </button>
        </div>
      </div>
      {totalPunksMinted !== undefined ? (
        <div className="text-xs mx-auto">{totalPunksMinted}/1000 punks minted</div>
      ) : (
        <div className="w-32 h-4 bg-slate-300 rounded mx-auto" />
      )}
    </div>
  )
};