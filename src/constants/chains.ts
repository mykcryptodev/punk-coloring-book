/* eslint-disable @typescript-eslint/no-unused-vars */
import { 
  base as baseThirdweb,
  baseSepolia as baseSepoliaThirdweb 
} from "thirdweb/chains";
import { 
  base as baseViem,
  baseSepolia as baseSepoliaViem 
} from "viem/chains";
import { 
  base as baseWagmi, 
  baseSepolia as baseSepoliaWagmi,
} from 'wagmi/chains';

export const CHAIN = {
  name: 'base-sepolia',
  thirdweb: baseSepoliaThirdweb,
  viem: baseSepoliaViem,
  wagmmi: baseSepoliaWagmi,
};

// export const CHAIN = {
//   name: 'base',
//   thirdweb: baseThirdweb,
//   viem: baseViem,
//   wagmi: baseWagmi,
// };