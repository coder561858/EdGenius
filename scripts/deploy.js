const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const CredentialNFT = await ethers.getContractFactory("CredentialNFT");
  const credentialNFT = await CredentialNFT.deploy();
  await credentialNFT.deployed();

  console.log(`✅ Contract deployed at: ${credentialNFT.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
  });
