// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC721Tradable.sol";

/**
 * @title Member
 * Member - a contract for my non-fungible creatures.
 */
contract Member is ERC721Tradable {
    constructor(address _proxyRegistryAddress)
        ERC721Tradable("Creature", "OSC", _proxyRegistryAddress)
    {}

    function baseTokenURI() override public pure returns (string memory) {
        return "https://gateway.pinata.cloud/ipfs/QmbWCJuiaSBQopoDGsEnPZgDx6tQNFABGY7JDg7RoCavzq/";
    }

    function tokenURI(uint256 _tokenId)
        public
        pure
        override
        returns (string memory)
    {
        return
            string(
                abi.encodePacked(
                    abi.encodePacked(
                        baseTokenURI(),
                        Strings.toString(_tokenId)
                    ),
                    ".json"
                )
            );
    }

    function contractURI() public pure returns (string memory) {
        return "https://creatures-api.opensea.io/contract/opensea-creatures";
    }
}
