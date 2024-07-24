import { useCallback, useEffect, useMemo, useState, type FC } from "react";
import { createThirdwebClient, getContract } from "thirdweb";
import { getOwnedTokenIds } from "thirdweb/extensions/erc721";
import { useAccount } from "wagmi";
import { COLOR_PUNKS } from "~/constants/addresses";
import { CHAIN } from "~/constants/chains";
import { env } from "~/env";

export const Instructions: FC = () => {
  const account = useAccount();
  const [ownedPunkIds, setOwnedPunkIds] = useState<bigint[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const client = useMemo(() => createThirdwebClient({
    clientId: env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
  }), []);

  const contract = useMemo(() => getContract({
    client,
    chain: CHAIN.thirdweb,
    address: COLOR_PUNKS,
  }), [client]);

  const fetchOwnedNftIds = useCallback(async () => {
    if (!account?.address) return;
    setIsLoading(true);
    try {
      const ownedNftIds = await getOwnedTokenIds({
        contract,
        owner: account.address,
      });
      setOwnedPunkIds(ownedNftIds);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [account?.address, contract]);

  useEffect(() => {
    if (account?.address) {
      void fetchOwnedNftIds();
    } else {
      setOwnedPunkIds([]);
    }
  }, [account?.address, fetchOwnedNftIds]);

  if (isLoading) return (
    <div className="flex flex-col gap-2 mt-4 animate-pulse">
      <div className="h-8 w-32 bg-slate-300 rounded-lg mx-auto" />
      <div className="flex flex-col gap-1">
        <div className="h-5 w-52 bg-slate-300 rounded-lg" />
        <div className="h-5 w-56 bg-slate-300 rounded-lg" />
        <div className="h-5 w-40 bg-slate-300 rounded-lg" />
        <div className="h-5 w-48 bg-slate-300 rounded-lg" />
      </div>
    </div>
  )

  if (!ownedPunkIds.length) return (
    <div className="flex flex-col mt-4">
      <h3 className="font-bold text-xl text-center">Instructions</h3>
      <ol className="list-decimal list-inside">
        <li>Mint a Punk below</li>
        <li>Mint a Base Color</li>
        <li>Select a punk to color in</li>
        <li>Click any part of your punk to color it in</li>
        <li>{`Click "Save" to update your NFT`}</li>
      </ol>
    </div>
  )

  return (
    <div className="flex flex-col mt-4">
      <h3 className="font-bold text-xl text-center">Instructions</h3>
      <ol className="list-decimal list-inside">
        <li>Select one of your punks by clicking on it</li>
        <li>Select one of your colors by clicking on it</li>
        <li>Click any part of your punk to color it in</li>
        <li>{`Click "Save" to update your NFT`}</li>
      </ol>
    </div>
  )
}

export default Instructions;