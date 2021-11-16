// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "openzeppelin-solidity/contracts/access/Ownable.sol";
import "openzeppelin-solidity/contracts/utils/Strings.sol";
import "./IFactoryERC721.sol";
import "./Member.sol";
//import "./CreatureLootBox.sol";

contract MemberFactory is FactoryERC721, Ownable {
    using Strings for string;

    event Transfer(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId
    );

    address public proxyRegistryAddress;
    address public nftAddress;
    address public lootBoxNftAddress;
    // string public baseURI = "https://gateway.pinata.cloud/ipfs/QmaXMX6QLcVESt7DvtKt3Cz4YnkoX2d5oG1ug54UFc58pS/";
    string public baseURI = "https://ipfs.io/ipfs/Qme6WczTaT9DXo7JZgtwUFuEk9ejbVqSAwDmzCL91pvRFp/";

    /*
     * Enforce the existence of only 100 OpenSea creatures.
     */
    //uint256 CREATURE_SUPPLY = 100;
	uint256 MEMBERS_SUPPLY = 9500;

    /*
     * Six different options for minting Creatures (general, ambassador, researcher, developer, advisor, moderator).
     */
    //uint256 NUM_OPTIONS = 3;
    //uint256 SINGLE_CREATURE_OPTION = 0;
    //uint256 MULTIPLE_CREATURE_OPTION = 1;
    //uint256 LOOTBOX_OPTION = 2;
    //uint256 NUM_CREATURES_IN_MULTIPLE_CREATURE_OPTION = 4;

    uint256 NUM_OPTIONS = 6;
    uint256 GENERAL_MEMBER_OPTION = 0;
    uint256 AMBASSADOR_OPTION = 1;
    uint256 RESEARCHER_OPTION = 2;
    uint256 DEVELOPER_OPTION = 3;
	uint256 ADVISOR_OPTION = 4;
	uint256 MODERATOR_OPTION = 5;

    constructor(address _proxyRegistryAddress, address _nftAddress) {
        proxyRegistryAddress = _proxyRegistryAddress;
        nftAddress = _nftAddress;
        //lootBoxNftAddress = address(
        //    new CreatureLootBox(_proxyRegistryAddress, address(this))
        //);

        fireTransferEvents(address(0), owner());
    }

    function name() override external pure returns (string memory) {
        return "OasisDAO Item Sale";
    }

    function symbol() override external pure returns (string memory) {
        return "OPF";
    }

    function supportsFactoryInterface() override public pure returns (bool) {
        return true;
    }

    function numOptions() override public view returns (uint256) {
        return NUM_OPTIONS;
    }

    function transferOwnership(address newOwner) override public onlyOwner {
        address _prevOwner = owner();
        super.transferOwnership(newOwner);
        fireTransferEvents(_prevOwner, newOwner);
    }

    function fireTransferEvents(address _from, address _to) private {
        for (uint256 i = 0; i < NUM_OPTIONS; i++) {
            emit Transfer(_from, _to, i);
        }
    }

    function mint(uint256 _optionId, address payable _toAddress) override public payable{
        // Must be sent from the owner proxy or owner.
        ProxyRegistry proxyRegistry = ProxyRegistry(proxyRegistryAddress);
        assert(
            address(proxyRegistry.proxies(owner())) == _msgSender() ||
                owner() == _msgSender() ||
                _msgSender() == lootBoxNftAddress
        );
        require(canMint(_optionId));

		//mint with 0.05ETH fee
		require(msg.value >= 0.05 ether, "Not enough ETH send; check price!");
		//_toAddress.balance -= 0.05 ether;
		//proxyRegistryAddress.balance += 0.05 ether;
		payable(address(this)).transfer(msg.value);


        Member oasisDaoMember = Member(nftAddress);
		oasisDaoMember.mintTo(_toAddress);
        /*if (_optionId == SINGLE_CREATURE_OPTION) {
            openSeaCreature.mintTo(_toAddress);
        } else if (_optionId == MULTIPLE_CREATURE_OPTION) {
            for (
                uint256 i = 0;
                i < NUM_CREATURES_IN_MULTIPLE_CREATURE_OPTION;
                i++
            ) {
                openSeaCreature.mintTo(_toAddress);
            }
        } else if (_optionId == LOOTBOX_OPTION) {
            CreatureLootBox openSeaCreatureLootBox = CreatureLootBox(
                lootBoxNftAddress
            );
            openSeaCreatureLootBox.mintTo(_toAddress);
        }*/
	  
    }

    function canMint(uint256 _optionId) override public view returns (bool) {
        if (_optionId >= NUM_OPTIONS) {
            return false;
        }

        Member oasisMemberDao = Member(nftAddress);
        uint256 memberSupply = oasisMemberDao.totalSupply();

        //uint256 numItemsAllocated = 0;
        /*if (_optionId == SINGLE_CREATURE_OPTION) {
            numItemsAllocated = 1;
        } else if (_optionId == MULTIPLE_CREATURE_OPTION) {
            numItemsAllocated = NUM_CREATURES_IN_MULTIPLE_CREATURE_OPTION;
        } else if (_optionId == LOOTBOX_OPTION) {
            CreatureLootBox openSeaCreatureLootBox = CreatureLootBox(
                lootBoxNftAddress
            );
            numItemsAllocated = openSeaCreatureLootBox.itemsPerLootbox();
        }*/
        return memberSupply < (MEMBERS_SUPPLY - 1);
    }

    function tokenURI(uint256 _optionId) override external view returns (string memory) {
        return string(abi.encodePacked(baseURI, Strings.toString(_optionId), ".json"));
    }

    /**
     * Hack to get things to work automatically on OpenSea.
     * Use transferFrom so the frontend doesn't have to worry about different method names.
     */
    function transferFrom(
        address _from,
        address payable _to,
        uint256 _tokenId
    ) public {
        mint(_tokenId, _to);
    }

    /**
     * Hack to get things to work automatically on OpenSea.
     * Use isApprovedForAll so the frontend doesn't have to worry about different method names.
     */
    function isApprovedForAll(address _owner, address _operator)
        public
        view
        returns (bool)
    {
        if (owner() == _owner && _owner == _operator) {
            return true;
        }

        ProxyRegistry proxyRegistry = ProxyRegistry(proxyRegistryAddress);
        if (
            owner() == _owner &&
            address(proxyRegistry.proxies(_owner)) == _operator
        ) {
            return true;
        }

        return false;
    }

    /**
     * Hack to get things to work automatically on OpenSea.
     * Use isApprovedForAll so the frontend doesn't have to worry about different method names.
     */
    function ownerOf(uint256 _tokenId) public view returns (address _owner) {
        return owner();
    }
}
