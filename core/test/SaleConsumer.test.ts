import { FakeContract, smock } from "@defi-wonderland/smock";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect, use } from "chai";
import { ethers } from "hardhat";
import { SaleConsumer } from "../typechain-types/contracts/protocol/SaleConsumer";
import { Stonksly } from "../typechain-types/contracts/Stonksly";
import { FunctionsClientInterface } from "../typechain-types/contracts/functions/FunctionsClientInterface";

use(smock.matchers);

describe("SaleConsumer tests", () => {
  const deploy = async () => {
    const SUBSCRIPTION_ID = 111;
    const SOURCE_CODE = "return Functions.encodeUint256(100)";
    const ORACLE_REQUEST_ID = ethers.utils.formatBytes32String("requestId");
    const STONKSLY_REQUEST_ID = 1;
    const SOURCE_CODE_ARGS = ["APPL"];
    const ASSET_PRICE = ethers.BigNumber.from(10000);

    const sender = (await ethers.getSigners())[0];

    const oracleMock: FakeContract<FunctionsClientInterface> = await smock.fake(
      "FunctionsOracleInterface"
    );
    const stonkslyMock: FakeContract<Stonksly> = await smock.fake("Stonksly");
    const args: any[] = [
      stonkslyMock.address,
      SUBSCRIPTION_ID,
      SOURCE_CODE,
      oracleMock.address,
    ];

    const SaleConsumerFactory = await ethers.getContractFactory("SaleConsumer");
    const saleConsumer = (await SaleConsumerFactory.deploy(
      ...args
    )) as SaleConsumer;

    oracleMock.sendRequest.returns(ORACLE_REQUEST_ID);
    oracleMock.getRegistry.returns(sender.address);

    return {
      saleConsumer,
      stonkslyMock,
      SUBSCRIPTION_ID,
      ORACLE_REQUEST_ID,
      STONKSLY_REQUEST_ID,
      SOURCE_CODE_ARGS,
      ASSET_PRICE,
    };
  };

  it("Should deploy", async () => {
    const { saleConsumer, stonkslyMock, SUBSCRIPTION_ID } = await loadFixture(
      deploy
    );

    expect(await saleConsumer.getStonskly()).to.be.equal(stonkslyMock.address);
    expect(await saleConsumer.getSubscriptionId()).to.be.equal(SUBSCRIPTION_ID);
  });

  it("Should init a request", async () => {
    const {
      saleConsumer,
      STONKSLY_REQUEST_ID,
      ORACLE_REQUEST_ID,
      SOURCE_CODE_ARGS,
    } = await loadFixture(deploy);

    await expect(saleConsumer.init(STONKSLY_REQUEST_ID, SOURCE_CODE_ARGS))
      .to.emit(saleConsumer, "RequestSent")
      .withArgs(ORACLE_REQUEST_ID)
      .to.emit(saleConsumer, "OracleRequestSent")
      .withArgs(ORACLE_REQUEST_ID, 1);
    expect(await saleConsumer.getRequest(ORACLE_REQUEST_ID)).to.be.equal(
      STONKSLY_REQUEST_ID
    );
  });

  it("Should fullfill a request", async () => {
    const {
      saleConsumer,
      stonkslyMock,
      STONKSLY_REQUEST_ID,
      ORACLE_REQUEST_ID,
      SOURCE_CODE_ARGS,
      ASSET_PRICE,
    } = await loadFixture(deploy);

    await saleConsumer.init(STONKSLY_REQUEST_ID, SOURCE_CODE_ARGS);

    const response = ethers.utils.hexZeroPad(
      ethers.BigNumber.from(ASSET_PRICE).toHexString(),
      32
    );
    const error = "0x";

    await expect(
      await saleConsumer.handleOracleFulfillment(
        ORACLE_REQUEST_ID,
        response,
        error
      )
    )
      .to.emit(saleConsumer, "ResponseReceived")
      .withArgs(ORACLE_REQUEST_ID, STONKSLY_REQUEST_ID, ASSET_PRICE);
    expect(stonkslyMock.finalizeSale).to.have.been.calledWith(
      STONKSLY_REQUEST_ID,
      ASSET_PRICE
    );
  });

  it("Should undo purchase when request failed", async () => {
    const {
      saleConsumer,
      stonkslyMock,
      STONKSLY_REQUEST_ID,
      ORACLE_REQUEST_ID,
      SOURCE_CODE_ARGS,
    } = await loadFixture(deploy);

    await saleConsumer.init(STONKSLY_REQUEST_ID, SOURCE_CODE_ARGS);

    const response = "0x";
    const error = ethers.utils.formatBytes32String("error");

    await expect(
      await saleConsumer.handleOracleFulfillment(
        ORACLE_REQUEST_ID,
        response,
        error
      )
    )
      .to.emit(saleConsumer, "RequestFailed")
      .withArgs(ORACLE_REQUEST_ID, error);
    expect(stonkslyMock.undoSale).to.have.been.calledWith(
      STONKSLY_REQUEST_ID
    );
  });
});
