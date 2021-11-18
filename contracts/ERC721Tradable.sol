// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";
import "openzeppelin-solidity/contracts/utils/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/utils/Strings.sol";

import "./common/meta-transactions/ContentMixin.sol";
import "./common/meta-transactions/NativeMetaTransaction.sol";

contract OwnableDelegateProxy {}

contract ProxyRegistry {
    mapping(address => OwnableDelegateProxy) public proxies;
}

/**
 * @title ERC721Tradable
 * ERC721Tradable - ERC721 contract that whitelists a trading address, and has minting functionality.
 */
abstract contract ERC721Tradable is
    ContextMixin,
    ERC721Enumerable,
    NativeMetaTransaction,
    Ownable
{
    using SafeMath for uint256;

    address proxyRegistryAddress;
    uint256 private _currentTokenId = 0;
    uint256 private NONCE;
    mapping(uint8 => uint256[]) private availableIds;
    // by default, all users' level is 0 (general members)
    // all levels: 0, 1, 2, 3, 4, 5
    mapping(address => uint8) public levelOf;
    mapping(address => bool) public isUserMinted;
    uint256 public priceOfGeneralMemberNFT = 0.05 ether;
    address payable public treasuryAddress;

    string private err_noNFTLeftAtLevel = "no NFT available for the level";
    constructor(
        string memory _name,
        string memory _symbol,
        address _proxyRegistryAddress,
        address _treasuryAddress
    ) ERC721(_name, _symbol) {
        proxyRegistryAddress = _proxyRegistryAddress;
        treasuryAddress = payable(_treasuryAddress);
        _initializeEIP712(_name);
    }

    /**
     *@dev add new available ids for a level
     */
    function addAvailableIdsForLevel(uint8 _nftLevel, uint256[] memory _ids)
        public
        onlyOwner
    {
        for (uint256 i = 0; i < _ids.length; i++) {
            availableIds[_nftLevel].push(_ids[i]);
        }
    }

    function setPriceOfGeneralMemberNFT(uint256 price) public onlyOwner {
        priceOfGeneralMemberNFT = price;
    }

    /**
     *@dev randomnize the token ID with the current time and nonce
     *@return uint256 for the random token ID
     */

    function _randomnizeTokenId(uint8 _nftLevel) internal returns (uint256) {
        // get a random index of the array availableIds
        uint256 _randomIndex = uint256(
            keccak256(abi.encodePacked(block.timestamp, msg.sender, NONCE))
        ) % availableIds[_nftLevel].length;
        NONCE++;
        // read the id at the index _randomIndex
        uint256 _randomId = availableIds[_nftLevel][_randomIndex];
        // remove the id from array availableIds
        availableIds[_nftLevel][_randomIndex] = availableIds[_nftLevel][
            availableIds[_nftLevel].length - 1
        ];
        availableIds[_nftLevel].pop();
        return _randomId;
    }

    /**
     *@dev upgrade level for a user by 1
     */
    function upgradeLevelForUser(address _user) public onlyOwner {
        require(levelOf[_user] < 5, "user is at highset level already");
        levelOf[_user]++;
        isUserMinted[_user] = false;
    }

    /**
     *@dev upgrade level for each user by 1
     */
    function upgradeLevelForBatchUsers(address[] memory _users)
        public
        onlyOwner
    {
        for (uint256 i = 0; i < _users.length; i++) {
            require(levelOf[_users[i]] < 5, "user is at highset level already");
            levelOf[_users[i]]++;
            isUserMinted[_users[i]] = false;
        }
    }

    // check if an address is contract address
    function isContract(address addr) internal view returns (bool) {
        uint256 size;
        assembly {
            size := extcodesize(addr)
        }
        return size > 0;
    }

    /**
     * @dev Mints a token to an address with a tokenURI.
     * @param _to address of the future owner of the token
     */
    function mintTo(address _to) public payable {
        // block those cross-contract calls
        require(
            !isContract(msgSender()),
            "cannot be invoked by a smart contract"
        );

        require(!isUserMinted[_to], "user can only have one NFT");

        if (levelOf[_to] > 0) {
            _mintRoleNFT(_to);
        } else {
            _mintGeneralMembersNFT(_to);
        }
        isUserMinted[_to] = true;
    }

    // For level 0 (general member), use incremental id
    function _mintGeneralMembersNFT(address _to) private {
        require(_currentTokenId < 9500, err_noNFTLeftAtLevel);

        // transfer required amount of ETH before minting
        require(
            msg.value >= priceOfGeneralMemberNFT,
            "not enough ETH send; check price!"
        );
        require(
            treasuryAddress.send(msg.value), // 100000000000000 = 0.001 eth
            "failed to transfer eth"
        );

        uint256 newTokenId = _getNextTokenId();

        _mint(_to, newTokenId);
        _incrementTokenId();
    }

    // For minting nft of level 1, 2, 3, 4, 5, use random id
    function _mintRoleNFT(address _to) private {
        require(availableIds[levelOf[_to]].length > 0, err_noNFTLeftAtLevel);
        // before mint higher level nft, burn the user's previous nft first
        uint256 oldTokenId = tokenOfOwnerByIndex(_to, 0);
        _burn(oldTokenId);
        // put the burned nft id back to availableIds for role nft(higher levels)
        if (levelOf[_to] >= 2) {
            (availableIds[levelOf[_to] - 1]).push(oldTokenId);
        }

        uint256 newTokenId = _randomnizeTokenId(levelOf[_to]);
        _mint(_to, newTokenId);
    }

    /**
     * @dev calculates the next token ID based on value of _currentTokenId
     * @return uint256 for the next token ID
     */
    function _getNextTokenId() private view returns (uint256) {
        return _currentTokenId.add(1);
    }

    /**
     * @dev increments the value of _currentTokenId
     */
    function _incrementTokenId() private {
        _currentTokenId++;
    }

    function baseTokenURI() public pure virtual returns (string memory);

    function tokenURI(uint256 _tokenId)
        public
        pure
        override
        returns (string memory)
    {
        return
            string(
                abi.encodePacked(
                    baseTokenURI(),
                    Strings.toString(_tokenId),
                    ".json"
                )
            );
    }

    /**
     * Override isApprovedForAll to whitelist user's OpenSea proxy accounts to enable gas-less listings.
     */
    function isApprovedForAll(address owner, address operator)
        public
        view
        override
        returns (bool)
    {
        // Whitelist OpenSea proxy contract for easy trading.
        ProxyRegistry proxyRegistry = ProxyRegistry(proxyRegistryAddress);
        if (address(proxyRegistry.proxies(owner)) == operator) {
            return true;
        }

        return super.isApprovedForAll(owner, operator);
    }

    /**
     * This is used instead of msg.sender as transactions won't be sent by the original token owner, but by OpenSea.
     */
    function _msgSender() internal view override returns (address sender) {
        return ContextMixin.msgSender();
    }

    receive() external payable {
    }
}
