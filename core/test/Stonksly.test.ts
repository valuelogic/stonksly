import { FakeContract, smock } from "@defi-wonderland/smock";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect, use } from "chai";
import { ethers } from "hardhat";
import { Consumer } from "../typechain-types/contracts/Consumer";
import { SToken } from "../typechain-types/contracts/protocol/SToken";
import { STokenManager } from "../typechain-types/contracts/protocol/STokenManager";
import { Stonksly } from "../typechain-types/contracts/protocol/Stonksly";

use(smock.matchers);

enum RequestType {
  PURCHASE,
  SALE,
}

enum RequestStatus {
  NONE,
  PENDING,
  COMPLETED,
  REFUNDED,
}

describe("Stonksly tests", () => {
  const deploy = async () => {
    const S_TOKEN_NAME = "Apple token";
    const S_TOKEN_SYMBOL = "SAPPL";
    const ASSET_SYMBOL = "APPL";

    const [deployer, investor, anotherInvestor, liquidityProvider] =
      await ethers.getSigners();

    const stonkslyWallet = ethers.Wallet.createRandom();

    const priceFeedMock: FakeContract = await smock.fake(
      "AggregatorV3Interface"
    );

    priceFeedMock.latestRoundData.returns([
      0,
      ethers.BigNumber.from("100000000"),
      0,
      0,
      0,
    ]);

    const sTokenManager: FakeContract<STokenManager> = await smock.fake(
      "STokenManager"
    );
    const sToken: FakeContract<SToken> = await smock.fake("SToken");

    sTokenManager.deploySToken.returns(sToken.address);
    sToken.getAssetSymbol.returns(ASSET_SYMBOL);

    const args = [
      stonkslyWallet.address,
      priceFeedMock.address,
      sTokenManager.address,
    ];

    const StonkslyFactory = await ethers.getContractFactory("Stonksly");
    const stonksly = (await StonkslyFactory.deploy(...args)) as Stonksly;

    const purchaseConsumer: FakeContract<Consumer> = await smock.fake(
      "PurchaseConsumer",
      { address: deployer.address }
    );

    const saleConsumer: FakeContract<Consumer> = await smock.fake(
      "SaleConsumer",
      { address: deployer.address }
    );

    return {
      stonksly,
      purchaseConsumer,
      saleConsumer,
      sTokenManager,
      sToken,
      deployer,
      investor,
      anotherInvestor,
      stonkslyWallet,
      liquidityProvider,
      S_TOKEN_NAME,
      S_TOKEN_SYMBOL,
      ASSET_SYMBOL,
    };
  };

  it("Should deploy", async () => {
    const { stonksly } = await loadFixture(deploy);

    expect(await stonksly.getPurchaseConsumer()).to.be.equal(
      ethers.constants.AddressZero
    );
    expect(await stonksly.getSaleConsumer()).to.be.equal(
      ethers.constants.AddressZero
    );
    expect(await stonksly.getCollectedFees()).to.be.equal(0);
  });

  describe("Stonksly consumers setup tests", () => {
    it("Should set the purchase consumer", async () => {
      const { stonksly, purchaseConsumer } = await loadFixture(deploy);

      await stonksly.setPurchaseConsumer(purchaseConsumer.address);

      expect(await stonksly.getPurchaseConsumer()).to.be.equal(
        purchaseConsumer.address
      );
    });

    it("Should revert when set the purchase consumer and the consumer is already set", async () => {
      const { stonksly, purchaseConsumer } = await loadFixture(deploy);
      await stonksly.setPurchaseConsumer(purchaseConsumer.address);

      await expect(
        stonksly.setPurchaseConsumer(purchaseConsumer.address)
      ).to.be.revertedWithCustomError(stonksly, "Stonksly_ConsumerAlreadySet");
    });

    it("Should set the sale consumer", async () => {
      const { stonksly, saleConsumer } = await loadFixture(deploy);

      await stonksly.setSaleConsumer(saleConsumer.address);

      expect(await stonksly.getSaleConsumer()).to.be.equal(
        saleConsumer.address
      );
    });

    it("Should revert when set the sale consumer and the consumer is already set", async () => {
      const { stonksly, saleConsumer } = await loadFixture(deploy);
      await stonksly.setSaleConsumer(saleConsumer.address);

      await expect(
        stonksly.setSaleConsumer(saleConsumer.address)
      ).to.be.revertedWithCustomError(stonksly, "Stonksly_ConsumerAlreadySet");
    });
  });

  describe("Stoken creation tests", () => {
    it("Should create a new sToken", async () => {
      const {
        stonksly,
        sToken,
        sTokenManager,
        S_TOKEN_NAME,
        S_TOKEN_SYMBOL,
        ASSET_SYMBOL,
      } = await loadFixture(deploy);

      await stonksly.createSToken(S_TOKEN_NAME, S_TOKEN_SYMBOL, ASSET_SYMBOL);

      expect(sTokenManager.deploySToken).to.have.been.calledWith(
        S_TOKEN_NAME,
        S_TOKEN_SYMBOL,
        ASSET_SYMBOL
      );
      expect(await stonksly.isPurchasable(sToken.address)).to.be.true;
    });
  });

  describe("Provide liquidity tests", () => {
    it("Should add liquidity", async () => {
      const { stonksly, liquidityProvider } = await loadFixture(deploy);
      const liquidity = ethers.utils.parseEther("1");

      await expect(
        stonksly.connect(liquidityProvider).addLiquidity({ value: liquidity })
      )
        .to.emit(stonksly, "LiquidityProvided")
        .withArgs(liquidityProvider.address, liquidity);
      expect(await ethers.provider.getBalance(stonksly.address)).to.be.equal(
        liquidity
      );
      expect(
        await stonksly.getLiquidity(liquidityProvider.address)
      ).to.be.equal(liquidity);
    });

    it("Should add liquidity when send matic to Stonksly", async () => {
      const { stonksly, liquidityProvider } = await loadFixture(deploy);
      const liquidity = ethers.utils.parseEther("1");

      await liquidityProvider.sendTransaction({
        to: stonksly.address,
        value: liquidity,
      });

      expect(await ethers.provider.getBalance(stonksly.address)).to.be.equal(
        liquidity
      );
      expect(
        await stonksly.getLiquidity(liquidityProvider.address)
      ).to.be.equal(liquidity);
    });

    it("Should remove liquidity", async () => {
      const { stonksly, liquidityProvider } = await loadFixture(deploy);
      const liquidity = ethers.utils.parseEther("1");
      await stonksly
        .connect(liquidityProvider)
        .addLiquidity({ value: liquidity });

      const balanceBefore = await ethers.provider.getBalance(
        liquidityProvider.address
      );

      const tx = await stonksly
        .connect(liquidityProvider)
        .removeLiquidity(liquidity);
      const receipt = await tx.wait();
      const liquidityRemovedEvent = receipt.events![0];
      const gasCost = receipt.gasUsed.mul(tx.gasPrice!);

      expect(liquidityRemovedEvent.args!.who).to.be.equal(
        liquidityProvider.address
      );
      expect(liquidityRemovedEvent.args!.amount).to.be.equal(liquidity);
      expect(await ethers.provider.getBalance(stonksly.address)).to.be.equal(0);
      expect(
        await stonksly.getLiquidity(liquidityProvider.address)
      ).to.be.equal(0);
      expect(
        await ethers.provider.getBalance(liquidityProvider.address)
      ).to.be.equal(balanceBefore.sub(gasCost).add(liquidity));
    });

    it("Should revert remove liquidity when requested more than provided", async () => {
      const { stonksly, liquidityProvider } = await loadFixture(deploy);
      const liquidity = ethers.utils.parseEther("1");
      await stonksly
        .connect(liquidityProvider)
        .addLiquidity({ value: liquidity });

      await expect(
        stonksly.connect(liquidityProvider).removeLiquidity(liquidity.add(1))
      ).to.be.revertedWithCustomError(
        stonksly,
        "Stonksly__NotEnoughtLiquidityProvided"
      );
    });
  });

  describe("Stonksly protocol investment tests", () => {
    const prepareInvestmant = async () => {
      const {
        stonksly,
        purchaseConsumer,
        saleConsumer,
        sToken,
        investor,
        anotherInvestor,
        stonkslyWallet,
        S_TOKEN_NAME,
        S_TOKEN_SYMBOL,
        ASSET_SYMBOL,
      } = await deploy();

      await stonksly.setPurchaseConsumer(purchaseConsumer.address);
      await stonksly.setSaleConsumer(saleConsumer.address);

      await stonksly.createSToken(S_TOKEN_NAME, S_TOKEN_SYMBOL, ASSET_SYMBOL);

      return {
        stonksly,
        purchaseConsumer,
        saleConsumer,
        investor,
        anotherInvestor,
        stonkslyWallet,
        sToken,
        ASSET_SYMBOL,
      };
    };

    describe("Purchase", () => {
      it("Should init a purchase", async () => {
        const { stonksly, sToken, investor, purchaseConsumer, ASSET_SYMBOL } =
          await loadFixture(prepareInvestmant);

        const requestId = 0;
        const investment = ethers.utils.parseEther("1");

        await expect(
          stonksly
            .connect(investor)
            .initPurchase(sToken.address, { value: investment })
        )
          .to.emit(stonksly, "RequestCreated")
          .withArgs(
            requestId,
            RequestType.PURCHASE,
            investor.address,
            sToken.address,
            investment
          );
        expect(await ethers.provider.getBalance(stonksly.address)).to.be.equal(
          investment
        );
        expect(purchaseConsumer.init).to.have.been.calledWith(requestId, [
          ASSET_SYMBOL,
        ]);

        const request = await stonksly.getRequest(requestId);
        expect(request.requestType).to.be.equal(RequestType.PURCHASE);
        expect(request.status).to.be.equal(RequestStatus.PENDING);
        expect(request.account).to.be.equal(investor.address);
        expect(request.sToken).to.be.equal(sToken.address);
        expect(request.amount).to.be.equal(investment);
        expect(request.id).to.be.equal(requestId);
      });

      it("Should revert when no investment", async () => {
        const { stonksly, sToken } = await loadFixture(prepareInvestmant);

        await expect(
          stonksly.initPurchase(sToken.address)
        ).to.be.revertedWithCustomError(
          stonksly,
          "Stonksly__InvestmentRequired"
        );
      });

      it("Should revert when sToken isn't registered", async () => {
        const { stonksly } = await loadFixture(prepareInvestmant);
        const nonExistingSToken = ethers.Wallet.createRandom().address;

        await expect(
          stonksly.initPurchase(nonExistingSToken, {
            value: ethers.utils.parseEther("1"),
          })
        )
          .to.be.revertedWithCustomError(
            stonksly,
            "Stonksly__STokenNotRegistered"
          )
          .withArgs(nonExistingSToken);
      });

      it("Should finalize a purchase", async () => {
        const { stonksly, investor, sToken } = await loadFixture(
          prepareInvestmant
        );
        const investment = ethers.utils.parseEther("1");

        await stonksly
          .connect(investor)
          .initPurchase(sToken.address, { value: investment });

        const expectedSTokenAmount =
          ethers.BigNumber.from("999000000000000000");
        const expectedFees = ethers.BigNumber.from("500000000000000");
        // Mock invocation by purchase consumer (the same addresses)
        await expect(stonksly.finalizePurchase(0, 100))
          .to.emit(stonksly, "RequestCompleted")
          .withArgs(
            0,
            RequestType.PURCHASE,
            investor.address,
            sToken.address,
            expectedSTokenAmount,
            investment
          );
        expect(await stonksly.getCollectedFees()).to.be.equal(expectedFees);

        expect((await stonksly.getRequest(0)).status).to.be.equal(
          RequestStatus.COMPLETED
        );
        expect(await ethers.provider.getBalance(stonksly.address)).to.be.equal(
          investment
        );
        expect(sToken.mint).to.have.been.calledWith(
          investor.address,
          expectedSTokenAmount
        );
      });

      it("Should revert purchase finalization when invoke not by purchase consumer", async () => {
        const { stonksly, investor } = await loadFixture(prepareInvestmant);

        await expect(stonksly.connect(investor).finalizePurchase(0, 100))
          .to.be.revertedWithCustomError(stonksly, "Stonksly__NotAllowedCall")
          .withArgs(investor.address);
      });

      it("Should revert purchase finalization when request is not peding", async () => {
        const { stonksly } = await loadFixture(prepareInvestmant);

        await expect(stonksly.finalizePurchase(0, 100))
          .to.be.revertedWithCustomError(
            stonksly,
            "Stonksly_RequestIsNotPending"
          )
          .withArgs(0);
      });

      it("Should undo purchase", async () => {
        const { stonksly, investor, sToken } = await loadFixture(
          prepareInvestmant
        );
        const investment = ethers.utils.parseEther("1");

        await stonksly
          .connect(investor)
          .initPurchase(sToken.address, { value: investment });
        const investorBalanceAfterPurchase = await ethers.provider.getBalance(
          investor.address
        );

        await expect(stonksly.undoPurchase(0))
          .to.emit(stonksly, "RequestRefunded")
          .withArgs(0);
        expect((await stonksly.getRequest(0)).status).to.be.equal(
          RequestStatus.REFUNDED
        );
        expect(await ethers.provider.getBalance(stonksly.address)).to.be.equal(
          0
        );
        expect(await ethers.provider.getBalance(investor.address)).to.be.equal(
          investorBalanceAfterPurchase.add(investment)
        );
      });
      it("Should revert undo purchase when invoke not by purchase consumer", async () => {
        const { stonksly, investor } = await loadFixture(prepareInvestmant);

        await expect(stonksly.connect(investor).undoPurchase(0))
          .to.be.revertedWithCustomError(stonksly, "Stonksly__NotAllowedCall")
          .withArgs(investor.address);
      });

      it("Should revert undo purchase when request is not peding", async () => {
        const { stonksly } = await loadFixture(prepareInvestmant);

        await expect(stonksly.undoPurchase(0))
          .to.be.revertedWithCustomError(
            stonksly,
            "Stonksly_RequestIsNotPending"
          )
          .withArgs(0);
      });
    });
    describe("Sale", () => {
      it("Should init a sale", async () => {
        const { stonksly, sToken, investor, saleConsumer, ASSET_SYMBOL } =
          await loadFixture(prepareInvestmant);

        const requestId = 0;
        const sTokenAmount = ethers.utils.parseEther("1");

        await expect(
          stonksly.connect(investor).initSale(sToken.address, sTokenAmount)
        )
          .to.emit(stonksly, "RequestCreated")
          .withArgs(
            requestId,
            RequestType.SALE,
            investor.address,
            sToken.address,
            sTokenAmount
          );

        expect(saleConsumer.init).to.have.been.calledWith(requestId, [
          ASSET_SYMBOL,
        ]);
        expect(sToken.transferFrom).to.have.been.calledWith(
          investor.address,
          stonksly.address,
          sTokenAmount
        );

        const request = await stonksly.getRequest(requestId);
        expect(request.requestType).to.be.equal(RequestType.SALE);
        expect(request.status).to.be.equal(RequestStatus.PENDING);
        expect(request.account).to.be.equal(investor.address);
        expect(request.sToken).to.be.equal(sToken.address);
        expect(request.amount).to.be.equal(sTokenAmount);
        expect(request.id).to.be.equal(requestId);
      });

      it("Should revert when no investment", async () => {
        const { stonksly, sToken } = await loadFixture(prepareInvestmant);

        await expect(
          stonksly.initSale(sToken.address, 0)
        ).to.be.revertedWithCustomError(
          stonksly,
          "Stonksly__InvestmentRequired"
        );
      });

      it("Should revert when sToken isn't registered", async () => {
        const { stonksly } = await loadFixture(prepareInvestmant);
        const nonExistingSToken = ethers.Wallet.createRandom().address;

        await expect(stonksly.initSale(nonExistingSToken, 1))
          .to.be.revertedWithCustomError(
            stonksly,
            "Stonksly__STokenNotRegistered"
          )
          .withArgs(nonExistingSToken);
      });

      it("Should finalize a sale", async () => {
        const { stonksly, investor, sToken } = await loadFixture(
          prepareInvestmant
        );

        await stonksly.addLiquidity({ value: ethers.utils.parseEther("1") });
        const sTokenAmount = ethers.utils.parseEther("1");

        await stonksly.connect(investor).initSale(sToken.address, sTokenAmount);

        const expectedMaticAmount = ethers.BigNumber.from("999000000000000000");
        const expectedFees = ethers.BigNumber.from("500000000000000");
        const investorBalanceAfterSaleInit = await ethers.provider.getBalance(
          investor.address
        );

        console.log(investorBalanceAfterSaleInit.toString());

        // Mock invocation by sale consumer (the same addresses)
        await expect(stonksly.finalizeSale(0, 100))
          .to.emit(stonksly, "RequestCompleted")
          .withArgs(
            0,
            RequestType.SALE,
            investor.address,
            sToken.address,
            sTokenAmount,
            expectedMaticAmount
          );
        expect(await stonksly.getCollectedFees()).to.be.equal(expectedFees);
        expect((await stonksly.getRequest(0)).status).to.be.equal(
          RequestStatus.COMPLETED
        );
        expect(await ethers.provider.getBalance(investor.address)).to.be.equal(
          investorBalanceAfterSaleInit.add(expectedMaticAmount)
        );
        expect(sToken.burn).to.have.been.calledWith(
          stonksly.address,
          sTokenAmount
        );
      });

      it("Should revert a sale finalization when invoke not by sale consumer", async () => {
        const { stonksly, investor } = await loadFixture(prepareInvestmant);

        await expect(stonksly.connect(investor).finalizeSale(0, 100))
          .to.be.revertedWithCustomError(stonksly, "Stonksly__NotAllowedCall")
          .withArgs(investor.address);
      });

      it("Should revert a sale finalization when request is not peding", async () => {
        const { stonksly } = await loadFixture(prepareInvestmant);

        await expect(stonksly.finalizeSale(0, 100))
          .to.be.revertedWithCustomError(
            stonksly,
            "Stonksly_RequestIsNotPending"
          )
          .withArgs(0);
      });

      it("Should undo sale", async () => {
        const { stonksly, investor, sToken } = await loadFixture(
          prepareInvestmant
        );
        const sTokenAmount = ethers.utils.parseEther("1");
        sToken.transfer.returns(true);

        await stonksly.connect(investor).initSale(sToken.address, sTokenAmount);

        await expect(stonksly.undoSale(0))
          .to.emit(stonksly, "RequestRefunded")
          .withArgs(0);
        expect((await stonksly.getRequest(0)).status).to.be.equal(
          RequestStatus.REFUNDED
        );
        expect(sToken.transfer).to.have.been.calledWith(
          investor.address,
          sTokenAmount
        );
      });

      it("Should revert undo sale when invoke not by sale consumer", async () => {
        const { stonksly, investor } = await loadFixture(prepareInvestmant);

        await expect(stonksly.connect(investor).undoSale(0))
          .to.be.revertedWithCustomError(stonksly, "Stonksly__NotAllowedCall")
          .withArgs(investor.address);
      });

      it("Should revert undo sale when request is not peding", async () => {
        const { stonksly } = await loadFixture(prepareInvestmant);

        await expect(stonksly.undoSale(0))
          .to.be.revertedWithCustomError(
            stonksly,
            "Stonksly_RequestIsNotPending"
          )
          .withArgs(0);
      });

      it("Should revert undo sale when sToken transfer failed", async () => {
        const { stonksly, investor, sToken } = await loadFixture(
          prepareInvestmant
        );
        const sTokenAmount = ethers.utils.parseEther("1");
        sToken.transfer.returns(false);
        await stonksly.connect(investor).initSale(sToken.address, sTokenAmount);

        await expect(stonksly.undoSale(0))
          .to.be.revertedWithCustomError(stonksly, "Stonksly__TransferFailed")
          .withArgs(investor.address, sTokenAmount);
      });
    });

    describe("Emergency refund", () => {
      it("Should refund until purchase finalized", async () => {
        const { stonksly, investor, sToken } = await loadFixture(
          prepareInvestmant
        );

        const requestId = 0;
        const investment = ethers.utils.parseEther("1");
        await stonksly
          .connect(investor)
          .initPurchase(sToken.address, { value: investment });

        const balanceBefore = await ethers.provider.getBalance(
          investor.address
        );
        const tx = await stonksly.connect(investor).emergencyRefund(requestId);
        const receipt = await tx.wait();

        const event = receipt.events![0];
        const transactionCost = receipt.gasUsed.mul(tx.gasPrice!);

        expect(event.args!.id).to.be.equal(0);
        expect((await stonksly.getRequest(requestId)).status).to.be.equal(
          RequestStatus.REFUNDED
        );
        expect(await ethers.provider.getBalance(investor.address)).to.be.equal(
          balanceBefore.sub(transactionCost).add(investment)
        );
      });

      it("Should refund until sale finalized", async () => {
        const { stonksly, investor, sToken } = await loadFixture(
          prepareInvestmant
        );

        const requestId = 0;
        const sTokenAmount = ethers.utils.parseEther("1");
        sToken.transfer.returns(true);
        await stonksly.connect(investor).initSale(sToken.address, sTokenAmount);

        await expect(stonksly.connect(investor).emergencyRefund(requestId))
          .to.emit(stonksly, "RequestRefunded")
          .withArgs(requestId);

        expect((await stonksly.getRequest(requestId)).status).to.be.equal(
          RequestStatus.REFUNDED
        );
        expect(sToken.transfer).to.have.been.calledWith(
          investor.address,
          sTokenAmount
        );
      });

      it("Should revert emergency refund when sender is not a request owner", async () => {
        const { stonksly, investor, sToken } = await loadFixture(
          prepareInvestmant
        );

        const requestId = 0;
        const investment = ethers.utils.parseEther("1");
        await stonksly
          .connect(investor)
          .initPurchase(sToken.address, { value: investment });
        await stonksly.finalizePurchase(0, 100);

        await expect(stonksly.connect(investor).emergencyRefund(requestId))
          .to.be.revertedWithCustomError(
            stonksly,
            "Stonksly_RequestIsNotPending"
          )
          .withArgs(requestId);
      });

      it("Should revert emergency refund when request not pending", async () => {
        const { stonksly, investor, anotherInvestor, sToken } =
          await loadFixture(prepareInvestmant);

        const requestId = 0;
        const investment = ethers.utils.parseEther("1");
        await stonksly
          .connect(investor)
          .initPurchase(sToken.address, { value: investment });

        await expect(
          stonksly.connect(anotherInvestor).emergencyRefund(requestId)
        )
          .to.be.revertedWithCustomError(
            stonksly,
            "Stonksly__NotTheRequestOwner"
          )
          .withArgs(anotherInvestor.address, investor.address);
      });
    });

    describe("Collect fees tests", () => {
      it("Should collect fees after purchase", async () => {
        const { stonksly, stonkslyWallet, investor, sToken } =
          await loadFixture(prepareInvestmant);

        const investment = ethers.utils.parseEther("1");
        await stonksly
          .connect(investor)
          .initPurchase(sToken.address, { value: investment });
        await stonksly.finalizePurchase(0, 100);
        const expectedFees = ethers.BigNumber.from("500000000000000");

        await expect(stonksly.withdrawFees())
          .to.emit(stonksly, "FeesCollected")
          .withArgs(expectedFees);
        expect(
          await ethers.provider.getBalance(stonkslyWallet.address)
        ).to.be.equal(expectedFees);
        expect(await stonksly.getCollectedFees()).to.be.equal(0);
        expect(await ethers.provider.getBalance(stonksly.address)).to.be.equal(
          investment.sub(expectedFees)
        );
      });

      it("Should collect fees after sale", async () => {
        const { stonksly, stonkslyWallet, investor, sToken } =
          await loadFixture(prepareInvestmant);

        await stonksly.addLiquidity({
          value: ethers.utils.parseEther("1"),
        });
        const sTokenAmount = ethers.utils.parseEther("1");
        await stonksly.connect(investor).initSale(sToken.address, sTokenAmount);
        await stonksly.finalizeSale(0, 100);
        const expectedFees = ethers.BigNumber.from("500000000000000");
        const expectedProtocolBalanceAfterFeesCollection =
          ethers.BigNumber.from("500000000000000");

        await expect(stonksly.withdrawFees())
          .to.emit(stonksly, "FeesCollected")
          .withArgs(expectedFees);
        expect(
          await ethers.provider.getBalance(stonkslyWallet.address)
        ).to.be.equal(expectedFees);
        expect(await stonksly.getCollectedFees()).to.be.equal(0);
        expect(await ethers.provider.getBalance(stonksly.address)).to.be.equal(
          expectedProtocolBalanceAfterFeesCollection
        );
      });
    });
  });
});
