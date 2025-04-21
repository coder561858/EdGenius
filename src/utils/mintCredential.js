import { ethers } from 'ethers';
import CredentialNFT from '../../contracts/CredentialNFT.json'; // Fixed path
const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS"; // Replace with your deployed address

export const mintCredentialNFT = async (provider, userAddress) => {
  try {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, CredentialNFT.abi, signer);

    // Default tokenURI that points to metadata for the NFT
    const tokenURI = "https://example.com/metadata/quiz-credential.json";
    
    const tx = await contract.mintCredential(userAddress, tokenURI);
    await tx.wait();
    console.log("✅ NFT Minted Successfully");
    return true;
  } catch (error) {
    console.error("❌ Error minting NFT:", error);
    return false;
  }
};
