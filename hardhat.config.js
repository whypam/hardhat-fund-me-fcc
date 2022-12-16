require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config() // yarn add --dev dotenv
require("hardhat-gas-reporter")
require("solidity-coverage")
require("hardhat-deploy") // yarn add --dev hardhat-deploy

/** @type import('hardhat/config').HardhatUserConfig */

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || "http://localhost"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key"
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "key"

module.exports = {
    //solidity: "0.8.17",
    solidity: {
        compilers: [{ version: "0.8.17" }, { version: "0.6.6" }]
    },
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337
        },
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY], // accounts: [PRIVATE_KEY_0, PRIVATE_KEY_1, PRIVATE_KEY_2]
            chainId: 5,
            blockConfirmationsAAA: 6
        }
    },
    gasReporter: {
        enabled: true,
        //enabled: false,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API_KEY,
        token: "ETH"
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY
    },
    namedAccounts: {
        // deployer is the name referenced in 01-deploy-fund-me.js - const { deployer } = await getNamedAccounts()
        deployer: {
            default: 0 // refer to index 0 in the accounts: [] - default networks session above
            // 5: 2,   // refer to index 2 in the accounts: [PRIVATE_KEY_1, PRIVATE_KEY_2, PRIVATE_KEY_3] - goerli networks session above
        }
    }
}
