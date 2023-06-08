# Stonksly

## How to run it (step by step) - easy way

If you just want to use existing implementation you just need to make few steps. Also please remember that we use Polygon Mumbain testnet for our project, so you need to get some test Matic ([Chainlink faucet](https://faucets.chain.link/mumbai) or [Alchemy faucet](https://mumbaifaucet.com/)). You don't need to deploy any smart contract, because all required code is deployed on Mumbai network.

1. Go to **frontend** directory
2. Open your terminal and run the **npm install** command.
3. Create **.env** file in the **frontend** directory. You need to put there two values: 
    - RAPID_API_KEY -> api key to rapidapi service [Rapid API](https://rapidapi.com/hub)
    - NEXT_PUBLIC_WALLET_CONNECT_ID -> wallect connect id [Wallet connect](https://walletconnect.com/)

If you don't want to create your own keys, you can use those from **.env.example** file. They are just test api keys, so be your guest.

4. Run the **npm run dev** command in your terminal.
5. Open [localhost:3000](http://localhost:3000).
6. You can play with our app. Remember to switch your Metamask network to Polygon Mumbai. If you haven't configure it yet, you can do it easly with help of this [link](https://chainlist.org/?testnets=true&search=mumba).


## How to run it from the sratch  (not recommended)

If you want to run entire project from scratch you will need to deploy smart contracts first. This are steps in case you would like to do that:

1. Create Chainlink Functions subscriptions. Please use the (instruction)[https://docs.chain.link/chainlink-functions/resources/subscriptions] provided by Chainlink.
2. Change **subscriptionId** in **helper-hardhat-config.ts** file for the one you've generated.
3. Go to **core** directory
4. Open your terminal and run the **npm install** command.
5. Create **.env** file in the **core** directory. You need to put there four values which you have to get by yourself (example in **.env.example**): 
    - PRIVATE_KEY -> your account private key
    - MUMBAI_URL -> url to mumbai node (could generated on [Alchemy](https://www.alchemy.com/) )
    - POLYGONSCAN_API_KEY -> api key to polygon scan (Polygonscan)[https://polygonscan.com/]
    - UPDATE_FRONTEND -> update contracts info in frontend part (set it to true)
6. Run the **npx hardhat deploy --network mumbai** command (**hh deploy --network mumbai** if you've installed hardhat-shorthand)
7. Add **PurchaseConsumer** and **SaleConsumer** addresses to your Chainlink Functions subscription (instruction provieded by Chainlink). 
8. Make all steps from **How to run it (step by step) - easy way** part
