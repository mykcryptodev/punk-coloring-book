import { expect, assert } from "chai";
import hre from "hardhat";
import { type SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { type ColorPunks } from "../typechain-types";

describe("Color Punks", function () {
  let deployerAccount: SignerWithAddress;
  let account2: SignerWithAddress;
  let colorPunks: ColorPunks;

  beforeEach(async function () {
    [deployerAccount, account2] = await hre.ethers.getSigners();
    colorPunks = await hre.ethers.deployContract(
      "ColorPunks",
      [
        deployerAccount.address,
        "Color Punks",
        "CP",
        deployerAccount.address,
        "500",
      ],
      deployerAccount,
    );
    await colorPunks.waitForDeployment();
  });

  it("Should return the right name", async function () {
    expect(await colorPunks.name()).to.equal("Color Punks");
  });

  it("Should not allow mints after max supply is reached", async function () {
    const mintPrice = await colorPunks.MINT_PRICE();
    const maxSupply = await colorPunks.MAX_SUPPLY();
    for (let i = 0; i < maxSupply; i++) {
      await colorPunks.mint(deployerAccount.address, 1, { value: mintPrice });
    }
    await expect(colorPunks.mint(deployerAccount.address, 1, { value: mintPrice })).to.be.revertedWithCustomError(
      colorPunks,
      "MaxSupplyReached"
    );
  });

  it("Should allow minting multiple nfts at once", async function () {
    const mintPrice = await colorPunks.MINT_PRICE();
    const quantity = 5;
    await colorPunks.connect(account2).mint(account2.address, quantity, { value: mintPrice * BigInt(quantity) });
    expect(await colorPunks.totalSupply()).to.equal(quantity);
  });
});
