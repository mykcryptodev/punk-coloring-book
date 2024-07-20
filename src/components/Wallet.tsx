import { 
  Wallet as WalletComponent, 
  WalletDropdown, 
  WalletDropdownLink, 
  WalletDropdownDisconnect, 
} from '@coinbase/onchainkit/wallet'; 
import {
  Address,
  Avatar,
  Name,
  Badge,
  Identity,
  EthBalance,
} from '@coinbase/onchainkit/identity';
import { color } from '@coinbase/onchainkit/theme';
import { ConnectButton } from '@rainbow-me/rainbowkit';
 
export function Wallet() {
  return (
    <div className="flex justify-end">
      <ConnectButton showBalance={false} />
      <WalletComponent>
        <WalletDropdown>
          <Identity 
            className="px-4 pt-3 pb-2" 
            hasCopyAddressOnClick
            schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9"
          >
            <Avatar />
            <Name>
              <Badge />
            </Name>
            <Address className={color.foregroundMuted} />
            <EthBalance />
          </Identity>
          <WalletDropdownLink icon="wallet" href="https://wallet.coinbase.com">
            Go to Wallet Dashboard
          </WalletDropdownLink>
          <WalletDropdownDisconnect />
        </WalletDropdown>
      </WalletComponent>
    </div>
  );
}