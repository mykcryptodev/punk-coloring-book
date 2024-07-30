import { type FC, useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { createThirdwebClient, encode, getContract, type NFT } from 'thirdweb';
import { env } from '~/env';
import { CHAIN } from '~/constants/chains';
import { COLOR_PUNKS } from '~/constants/addresses';
import { updateTokenURI } from '~/thirdweb/84532/0x9088bba410d204dc6837cc4f9ba23246dc5f58bf';
import { useAccount, useSendTransaction } from 'wagmi';
import { getNFT } from 'thirdweb/extensions/erc721';
import { download } from 'thirdweb/storage';
import { type NFTMetadata } from 'node_modules/thirdweb/dist/types/utils/nft/parseNft';

type Props = {
  punkId: string;
  onPunkReset: (punk: NFT) => void;
}
export const ResetToOriginal: FC<Props> = ({ punkId, onPunkReset }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { sendTransaction } = useSendTransaction();
  const account = useAccount();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const resetMetadata = async () => {
    if (!account.address) return;
    setIsLoading(true);
    const client = createThirdwebClient({
      clientId: env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
    });
    const contract = getContract({
      client,
      chain: CHAIN.thirdweb,
      address: COLOR_PUNKS,
    });
    const nft = await getNFT({
      contract,
      tokenId: BigInt(punkId),
    });
    const originalUri = `ipfs://QmZzBSaDAEwJhSUkhrcfVmZmbD1GwVLHd4GGoGGTWJWmSQ/${punkId}`;
    const newUriData = await download({
      client,
      uri: originalUri,
    });
    const json = await newUriData.json() as NFTMetadata;
    const updateTokenMetadataTx = updateTokenURI({
      contract,
      tokenId: BigInt(punkId),
      uri: originalUri,
    });
    const data = await encode(updateTokenMetadataTx);
    const transaction = {
      to: contract.address,
      data,
    };
    sendTransaction(transaction, {
      onSuccess: () => {
        onPunkReset({
          ...nft,
          metadata: json,
        });
      },
      onSettled: () => {
        setIsLoading(false);
        setOpen(false);
      }
    });
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="flex items-center gap-2 px-4 my-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
        Reset
      </button>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                    Reset to Original
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      This will reset the NFT to the black-and-white art that was originally minted.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => void resetMetadata()}
                  className="inline-flex items-center w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {isLoading && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 animate-spin mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                  )}
                  Confirm
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default ResetToOriginal;