// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CredentialNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;

    constructor() ERC721("Quizora Credential", "QZC") {
        tokenCounter = 0;
    }

    function mintCredential(address to, string memory tokenURI) public onlyOwner {
        _safeMint(to, tokenCounter);
        _setTokenURI(tokenCounter, tokenURI);
        tokenCounter++;
    }
}
