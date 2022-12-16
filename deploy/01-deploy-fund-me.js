// when without using hardhat-deploy plugin
// import
// main function
// calling of main function

// when using hardhat-deploy plugin
// hre - hardhat runtime environment
//async function deployFunc(hre) {
//  console.log("HI!")
//  hre.getNamedAccounts
//  hre.deployments
//}
//module.exports.default = deployFunc

//const helperConfig = require("../helper-hardhat-config")
//const networkConfig = helpConfig.networkConfig
// same as this 1 line
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { network } = require("hardhat")
const { verify } = require("../utils/verify")

//module.exports = async (hre) => {
//  const { getNamedAccounts, deployments } = hre
// same as this 1 line
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId // network.config.chainId is from hardhat.config.js

    // if chainId is X use address Y
    // if chainID is Z use address A

    // networkConfig[] is from helper-hardhat-config.js
    // const ethUsePriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    let ethUsdPriceFeedAddress
    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }

    // if the contract doesn't exist, we deploy a minimal version
    // for our local testing

    // well what happens when we want to change chains?
    // when going for localhost or hardhat network we wan to use a mock

    const args = [ethUsdPriceFeedAddress]
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args, // put price feed address. args is the constructor input parameter of FundMe.sol
        log: true, // same as console.log, set hardhat log to true
        waitConfirmations: network.config.blockConfirmationsAAA || 1
    })

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(fundMe.address, args)
    }
    log("-------------------------------------------------")
}

module.exports.tags = ["all", "fundme"]
