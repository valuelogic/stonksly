import { ethers } from "hardhat";

async function main() {
  const account = (await ethers.getSigners())[1];

  const stonk = await ethers.getContract("Stonksly");

  // const createTokenTx = await stonk
  //   .connect(account)
  //   .createSToken("Final", "SFNA", "FNA");
  // const receipt1 = await createTokenTx.wait(1);

  // const sTokenAddress = receipt1.events[1].args.token;
  const sTokenAddress = "0xe722112bc1E0Ee85DA199532B76CFfeC40f521E5";
  // console.log(sTokenAddress);

  // const token = await ethers.getContractAt("SToken", sTokenAddress);
  // const t = await token
  //   .connect(account)
  //   .approve(stonk.address, "1000000000000000000000000");
  // await t.wait();

  // const tx = await stonk.connect(account).initPurchase(sTokenAddress, {
  //   gasLimit: 6000000,
  //   value: "100000000000000000",
  // });

  const tx = await stonk.connect(account).initSale(
    sTokenAddress,

    "87832800000000000",
    { gasLimit: 6000000 }
  );

  const receipt = await tx.wait(2);

  console.log(receipt);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
