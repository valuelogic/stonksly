import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { StonkslyToken } from "../typechain-types/contracts/protocol/StonkslyToken";

describe("StonkslyToken tests", () => {
  const deploy = async () => {
    const StonkslyTokenFactory = await ethers.getContractFactory(
      "StonkslyToken"
    );
    const stonkslyToken =
      (await StonkslyTokenFactory.deploy()) as StonkslyToken;
    return {
      stonkslyToken,
    };
  };

  it("Should deploy", async () => {
    const { stonkslyToken } = await loadFixture(deploy);
    expect(await stonkslyToken.name()).to.be.equal("StonkslyToken");
    expect(await stonkslyToken.symbol()).to.be.equal("STK");
    expect(await stonkslyToken.totalSupply()).to.be.equal(ethers.utils.parseEther('100000'));
    expect(await stonkslyToken.decimals()).to.be.equal(18);
  });
});
