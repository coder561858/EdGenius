require('@nomiclabs/hardhat-ethers');
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",  // Solidity version, make sure it matches your contract
  networks: {
    sepolia: {
      url: `https://base-sepolia.g.alchemy.com/v2/your api key`, // Alchemy API URL
      accounts: [`${process.env.PRIVATE_KEY}`], // Your wallet's private key from .env
    },
  },
};
