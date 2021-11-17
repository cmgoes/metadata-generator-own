// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC721Tradable.sol";

/**
 * @title Member
 * Member - a contract for my non-fungible creatures.
 */
contract Member is ERC721Tradable {
    constructor(address _proxyRegistryAddress, address _treasuryAddress)
        ERC721Tradable("Oasis Critters", "ODC", _proxyRegistryAddress, _treasuryAddress)
    {}

    function baseTokenURI() override public pure returns (string memory) {
        // return "https://gateway.pinata.cloud/ipfs/QmaXMX6QLcVESt7DvtKt3Cz4YnkoX2d5oG1ug54UFc58pS/";
        return "https://ipfs.io/ipfs/Qme6WczTaT9DXo7JZgtwUFuEk9ejbVqSAwDmzCL91pvRFp/";
    }

    function contractURI() public pure returns (string memory) {
        return "";
    }
}
