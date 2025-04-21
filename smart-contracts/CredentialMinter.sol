// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CredentialMinter {
    mapping(address => bool) public hasMintedCredential;

    event CredentialMinted(address indexed user, uint256 timestamp);

    function mintCredential() external {
        require(!hasMintedCredential[msg.sender], "Credential already minted!");
        
        // Add logic here to mint your credential
        // Example: mint a simple token or perform any action

        hasMintedCredential[msg.sender] = true;

        emit CredentialMinted(msg.sender, block.timestamp);
    }
}
