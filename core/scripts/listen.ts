import { ethers } from "hardhat"

const listen = async () => {

    const stonksly =  await ethers.getContract("Stonksly");

    stonksly.on("RequestCreated", ( id,
         requestType,
         accout,
         sToken,
         payment) => {
            console.log("Request: ", id, requestType, accout, sToken, payment)

    });


    stonksly.on("RequestCompleted", ( id,
         requestType,
         account,
         sToken,
         amount) => {
 console.log("Purchase: ", id, requestType, account, sToken, amount);
    });

      stonksly.on(
        "Test",
        (
            amount
        ) => {
          console.log(
            "Test: ",
            
            amount.toString()
          );
        }
      );

}

listen().then().catch(e =>{
    console.log(e)
    process.exit(1)
})