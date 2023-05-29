import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { SToken } from "../typechain-types/contracts/protocol/SToken";

describe("SToken tests", () => {
  const deploy = async () => {
    const S_TOKEN_NAME = "Apple token";
    const S_TOKEN_SYMBOL = "SAPPL";
    const ASSET_SYMBOL = "APPL";

    const [, hacker, receiver] = await ethers.getSigners();

    const args = [S_TOKEN_NAME, S_TOKEN_SYMBOL, ASSET_SYMBOL];

    const STokenFactory = await ethers.getContractFactory("SToken");
    const sToken = (await STokenFactory.deploy(...args)) as SToken;
    return {
      sToken,
      S_TOKEN_NAME,
      S_TOKEN_SYMBOL,
      ASSET_SYMBOL,
      hacker,
      receiver,
    };
  };

  it("Should deploy", async () => {
    const { sToken, S_TOKEN_NAME, S_TOKEN_SYMBOL, ASSET_SYMBOL } =
      await loadFixture(deploy);
    expect(await sToken.name()).to.be.equal(S_TOKEN_NAME);
    expect(await sToken.symbol()).to.be.equal(S_TOKEN_SYMBOL);
    expect(await sToken.getAssetSymbol()).to.be.equal(ASSET_SYMBOL);
    expect(await sToken.totalSupply()).to.be.equal(0);
    expect(await sToken.decimals()).to.be.equal(18);
  });

  it("Should mint new tokens", async () => {
    const { sToken, receiver } = await loadFixture(deploy);

    const amount = ethers.utils.parseEther("1");

    await expect(sToken.mint(receiver.address, amount))
      .to.emit(sToken, "Transfer")
      .withArgs(ethers.constants.AddressZero, receiver.address, amount);
    expect(await sToken.totalSupply()).to.be.equal(amount);
    expect(await sToken.balanceOf(receiver.address)).to.be.equal(amount);
  });

  it("Should revert when mint by not the owner", async () => {
    const { sToken, hacker, receiver } = await loadFixture(deploy);

    const amount = ethers.utils.parseEther("1");

    await expect(
      sToken.connect(hacker).mint(receiver.address, amount)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("Should burn tokens", async () => {
    const { sToken, receiver } = await loadFixture(deploy);

    const amount = ethers.utils.parseEther("1");
    await sToken.mint(receiver.address, amount);

    await expect(sToken.burn(receiver.address, amount))
      .to.emit(sToken, "Transfer")
      .withArgs(receiver.address, ethers.constants.AddressZero, amount);
    expect(await sToken.totalSupply()).to.be.equal(0);
    expect(await sToken.balanceOf(receiver.address)).to.be.equal(0);
  });

  it("Should revert when burn by not the owner", async () => {
    const { sToken, hacker, receiver } = await loadFixture(deploy);

    const amount = ethers.utils.parseEther("1");

    await expect(
      sToken.connect(hacker).burn(receiver.address, amount)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });
});
