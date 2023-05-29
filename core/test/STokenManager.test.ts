import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { SToken } from "../typechain-types/contracts/protocol/SToken";
import { STokenManager } from "../typechain-types/contracts/protocol/STokenManager";

describe("STokenManager tests", () => {
  const deploy = async () => {
    const S_TOKEN_NAME = "Apple token";
    const S_TOKEN_SYMBOL = "SAPPL";
    const ASSET_SYMBOL = "APPL";

    const deployer = (await ethers.getSigners())[0];

    const STokenManagerFactory = await ethers.getContractFactory(
      "STokenManager"
    );
    const sTokenManager =
      (await STokenManagerFactory.deploy()) as STokenManager;
    return {
      sTokenManager,
      deployer,
      S_TOKEN_NAME,
      S_TOKEN_SYMBOL,
      ASSET_SYMBOL,
    };
  };

  it("Should deploy", async () => {
    const { sTokenManager } = await loadFixture(deploy);
    expect(await sTokenManager.getSTokens()).to.have.lengthOf(0);
  });

  it("Should create new sToken", async () => {
    const {
      sTokenManager,
      deployer,
      S_TOKEN_NAME,
      S_TOKEN_SYMBOL,
      ASSET_SYMBOL,
    } = await loadFixture(deploy);

    const tx = await sTokenManager.deploySToken(
      S_TOKEN_NAME,
      S_TOKEN_SYMBOL,
      ASSET_SYMBOL
    );
    const receipt = await tx.wait();
    const event = receipt.events![2];
    const sTokenAddress = event.args!.token;
    const sTokens = await sTokenManager.getSTokens();

    const sToken = (await ethers.getContractAt(
      "SToken",
      sTokenAddress
    )) as SToken;

    expect(event.args!.name).to.be.equal(S_TOKEN_NAME);
    expect(event.args!.symbol).to.be.equal(S_TOKEN_SYMBOL);
    expect(event.args!.assetSymbol).to.be.equal(ASSET_SYMBOL);
    expect(sTokens).to.have.lengthOf(1);
    expect(sTokens[0].sToken).to.be.equal(sTokenAddress);
    expect(sTokens[0].symbol).to.be.equal(S_TOKEN_SYMBOL);
    expect(sTokens[0].assetSymbol).to.be.equal(ASSET_SYMBOL);
    expect(await sToken.name()).to.be.equal(S_TOKEN_NAME);
    expect(await sToken.symbol()).to.be.equal(S_TOKEN_SYMBOL);
    expect(await sToken.getAssetSymbol()).to.be.equal(ASSET_SYMBOL);
    expect(await sToken.owner()).to.be.equal(deployer.address);
  });
});
