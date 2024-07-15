import { type NextPage } from "next";

export const Mint: NextPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <iframe
        src="https://embed.ipfscdn.io/ipfs/bafybeicd3qfzelz4su7ng6n523virdsgobrc5pcbarhwqv3dj3drh645pi/?contract=0x588ad1D7f0583f06b5E424Fc44475D9ad29767Df&chain=%7B%22name%22%3A%22Base%22%2C%22chain%22%3A%22ETH%22%2C%22rpc%22%3A%5B%22https%3A%2F%2F8453.rpc.thirdweb.com%2F%24%7BTHIRDWEB_API_KEY%7D%22%5D%2C%22nativeCurrency%22%3A%7B%22name%22%3A%22Ether%22%2C%22symbol%22%3A%22ETH%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22base%22%2C%22chainId%22%3A8453%2C%22testnet%22%3Afalse%2C%22slug%22%3A%22base%22%2C%22icon%22%3A%7B%22url%22%3A%22ipfs%3A%2F%2FQmW5Vn15HeRkScMfPcW12ZdZcC2yUASpu6eCsECRdEmjjj%2Fbase-512.png%22%2C%22width%22%3A512%2C%22height%22%3A512%2C%22format%22%3A%22png%22%7D%7D&clientId=18d6623c62b878a46383727cc7d262ae&theme=light&primaryColor=purple"
        width="600px"
        height="600px"
        style={{ maxWidth:"100%" }}
      ></iframe>
    </div>
  )
}

export default Mint;
