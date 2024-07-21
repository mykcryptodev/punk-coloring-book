import "ts-node/register";
import "tsconfig-paths/register";
import "@typechain/hardhat";
import "@nomicfoundation/hardhat-toolbox";
import { type HardhatUserConfig } from "hardhat/types";

const config: HardhatUserConfig = {
  paths: {
    artifacts: "./artifacts-zk",
    cache: "./cache-zk",
    sources: "./contracts",
    tests: "./test",
  },
  typechain: {
    outDir: "typechain-types",
    target: "ethers-v6"
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};

export default config;

