require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");


const alchemyApiKey = "BMeXGU2oWvL6Ed78zBgCMXSoVI1mCpY4";
const mnemonic = "4d05e338c423134b612a0b504e33b87a5882cc197f25efe2f580de079f0e4d20";

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.0", // or the version of your Solidity compiler
  networks: {
    hardhat: {
      chainId: 1337,
    },
    sepolia: {
      url: `https://eth-sepolia.alchemyapi.io/v2/${alchemyApiKey}`,
      accounts: { mnemonic: mnemonic },
      chainId: 54321, // Sepolia testnet chain ID
      gas: 2100000, // Gas limit
      gasPrice: 8000000000, // Gas price (in wei)
      timeout: 1000000 // Timeout in milliseconds
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 20000
  },
};

//Sepolia api key : BMeXGU2oWvL6Ed78zBgCMXSoVI1mCpY4

//seoplia private key: 4d05e338c423134b612a0b504e33b87a5882cc197f25efe2f580de079f0e4d20