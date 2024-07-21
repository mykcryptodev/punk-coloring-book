import { useState, type FC } from "react";
import { createThirdwebClient, encode, getContract, toWei } from "thirdweb";
import { viemAdapter } from "thirdweb/adapters/viem";
import { env } from "~/env";
import { useAccount, useSendTransaction, useWalletClient } from "wagmi";
import { COLOR_PUNK } from "~/constants/addresses";
import { mint } from "~/thirdweb/84532/0x9088bba410d204dc6837cc4f9ba23246dc5f58bf";
import { CHAIN } from "~/constants/chains";

type Props = {
  onMinted: () => void;
}

export const MintPunk: FC<Props> = ({ onMinted }) => {
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
    address: COLOR_PUNK,
  });
  const handleMint = async () => {
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
    const mintPrice = '0.001';
    sendTransaction({
      to: contract.address,
      data,
      value: toWei(mintPrice),
    }, {
      onSuccess: (hash: string) => {
        console.log('Minted', hash);
        onMinted();
      }
    });
  };
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-4 mx-auto">
        <button 
          onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
          className="px-2 py-1 bg-gray-200 rounded"
        >
          -
        </button>
        <span>{quantity}</span>
        <button 
          onClick={() => setQuantity((prev) => prev + 1)}
          className="px-2 py-1 bg-gray-200 rounded"
        >
          +
        </button>
      </div>
      <div className="mx-auto w-fit">
        <button 
          disabled={!account}
          onClick={async () => {
            await handleMint();
            onMinted();
          }}
          className="btn-primary"
        >
          Mint Punk
        </button>
      </div>
    </div>
  )
};