import { useState, type FC } from "react";
import { claimTo } from "thirdweb/extensions/erc721";
import { createThirdwebClient, encode, getContract, toWei } from "thirdweb";
import { base, baseSepolia } from "thirdweb/chains";
import { env } from "~/env";
import { useAccount, useSendTransaction } from "wagmi";

type Props = {
  onMinted: () => void;
}

export const MintPunk: FC<Props> = ({ onMinted }) => {
  const account = useAccount();
  const [quantity, setQuantity] = useState<number>(1);
  const { sendTransaction } = useSendTransaction()
  const client = createThirdwebClient({
    clientId: env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
  });
  const contract = getContract({
    client,
    // chain: base,
    chain: baseSepolia,
    address: "0x588ad1D7f0583f06b5E424Fc44475D9ad29767Df",
  })
  const transaction = claimTo({
    contract,
    to: account?.address ?? '',
    quantity: 1n,
  });
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
            const encodedTransaction = await encode(transaction);
            sendTransaction({
              to: contract.address,
              data: encodedTransaction,
              value: BigInt(quantity) * toWei('0.00'),
            }, {
              onSuccess: onMinted,
            });
          }}
          className="btn-primary"
        >
          Mint Punk
        </button>
      </div>
    </div>
  )
};