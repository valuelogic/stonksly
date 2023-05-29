import { FakeContract, smock } from "@defi-wonderland/smock";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect, use } from "chai";
import { ethers } from "hardhat";
import { PurchaseConsumer } from "../typechain-types/contracts/protocol/PurchaseConsumer";
import { Stonksly } from "../typechain-types/contracts/Stonksly";
import { FunctionsClientInterface } from "../typechain-types/contracts/functions/FunctionsClientInterface";

use(smock.matchers);

describe("PurchaseConsumer tests", () => {
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
    const args = [
      stonkslyMock.address,
      SUBSCRIPTION_ID,
      SOURCE_CODE,
      oracleMock.address,
    ];

    const PurchaseConsumerFactory = await ethers.getContractFactory(
      "PurchaseConsumer"
    );
    const purchaseConsumer =
      (await PurchaseConsumerFactory.deploy(...args)) as PurchaseConsumer;

    oracleMock.sendRequest.returns(ORACLE_REQUEST_ID);
    oracleMock.getRegistry.returns(sender.address);

    return {
      purchaseConsumer,
      stonkslyMock,
      SUBSCRIPTION_ID,
      ORACLE_REQUEST_ID,
      STONKSLY_REQUEST_ID,
      SOURCE_CODE_ARGS,
      ASSET_PRICE,
    };
  };

  it("Should deploy", async () => {
    const { purchaseConsumer, stonkslyMock, SUBSCRIPTION_ID } =
      await loadFixture(deploy);

    expect(await purchaseConsumer.getStonskly()).to.be.equal(
      stonkslyMock.address
    );
    expect(await purchaseConsumer.getSubscriptionId()).to.be.equal(
      SUBSCRIPTION_ID
    );
  });

  it("Should init a request", async () => {
    const {
      purchaseConsumer,
      STONKSLY_REQUEST_ID,
      ORACLE_REQUEST_ID,
      SOURCE_CODE_ARGS,
    } = await loadFixture(deploy);

    await expect(purchaseConsumer.init(STONKSLY_REQUEST_ID, SOURCE_CODE_ARGS))
      .to.emit(purchaseConsumer, "RequestSent")
      .withArgs(ORACLE_REQUEST_ID)
      .to.emit(purchaseConsumer, "OracleRequestSent")
      .withArgs(ORACLE_REQUEST_ID, 1);
    expect(await purchaseConsumer.getRequest(ORACLE_REQUEST_ID)).to.be.equal(
      STONKSLY_REQUEST_ID
    );
  });

  it("Should fullfill a request", async () => {
    const {
      purchaseConsumer,
      stonkslyMock,
      STONKSLY_REQUEST_ID,
      ORACLE_REQUEST_ID,
      SOURCE_CODE_ARGS,
      ASSET_PRICE,
    } = await loadFixture(deploy);

    await purchaseConsumer.init(STONKSLY_REQUEST_ID, SOURCE_CODE_ARGS);

    const response = ethers.utils.hexZeroPad(
      ethers.BigNumber.from(ASSET_PRICE).toHexString(),
      32
    );
    const error = "0x";

    await expect(
      await purchaseConsumer.handleOracleFulfillment(
        ORACLE_REQUEST_ID,
        response,
        error
      )
    )
      .to.emit(purchaseConsumer, "ResponseReceived")
      .withArgs(ORACLE_REQUEST_ID, STONKSLY_REQUEST_ID, ASSET_PRICE);
    expect(stonkslyMock.finalizePurchase).to.have.been.calledWith(
      STONKSLY_REQUEST_ID,
      ASSET_PRICE
    );
  });

  it("Should undo purchase when request failed", async () => {
    const {
      purchaseConsumer,
      stonkslyMock,
      STONKSLY_REQUEST_ID,
      ORACLE_REQUEST_ID,
      SOURCE_CODE_ARGS,
    } = await loadFixture(deploy);

    await purchaseConsumer.init(STONKSLY_REQUEST_ID, SOURCE_CODE_ARGS);

    const response = "0x";
    const error = ethers.utils.formatBytes32String("error");

    await expect(
      await purchaseConsumer.handleOracleFulfillment(
        ORACLE_REQUEST_ID,
        response,
        error
      )
    )
      .to.emit(purchaseConsumer, "RequestFailed")
      .withArgs(ORACLE_REQUEST_ID, error);
    expect(stonkslyMock.undoPurchase).to.have.been.calledWith(
      STONKSLY_REQUEST_ID
    );
  });
});
