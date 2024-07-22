// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@thirdweb-dev/contracts/base/ERC721Base.sol";
import "@thirdweb-dev/contracts/extension/PrimarySale.sol";

contract ColorPunks is ERC721Base, PrimarySale {
    uint256 public constant MAX_SUPPLY = 1000;
    uint256 public constant MINT_PRICE = 0.001 ether;

    mapping(uint256 => string) private fullURI;

    error IncorrectPayment();
    error MaxSupplyReached();
    error NotAuthorizedToMint();
    error NotAuthorizedToUpdateTokenURI();
    error PaymentFailed();

    event TokenURIUpdated(uint256 indexed tokenId, string uri, address indexed user);

    constructor(
        address _defaultAdmin,
        string memory _name,
        string memory _symbol,
        address _royaltyRecipient,
        uint128 _royaltyBps
    )
    ERC721Base(
        _defaultAdmin,
        _name,
        _symbol,
        _royaltyRecipient,
        _royaltyBps
    )
    {
        _setupPrimarySaleRecipient(_defaultAdmin);
    }

    /**
     * @notice Mints a specified quantity of tokens to a given address.
     * @dev This function checks for max supply and correct payment before minting.
     * @param _to The address to mint the tokens to.
     * @param _quantity The number of tokens to mint.
     * @custom:throws MaxSupplyReached if the total supply exceeds the maximum limit.
     * @custom:throws IncorrectPayment if the sent value does not match the required mint price.
     * @custom:throws PaymentFailed if the payment transfer to the primary sale recipient fails.
     */
    function mint(address _to, uint256 _quantity) external payable {
        if (totalSupply() + _quantity > MAX_SUPPLY) {
            revert MaxSupplyReached();
        }
        if (msg.value != MINT_PRICE * _quantity) {
            revert IncorrectPayment();
        }

        (bool success,) = primarySaleRecipient().call{value: msg.value}("");
        if (!success) {
            revert PaymentFailed();
        }
        
        // for loop and safe mint one at a time
        for (uint256 i = 0; i < _quantity; i++) {
            uint256 tokenId = nextTokenIdToMint();
            _safeMint(_to, 1);
            // set token uri for each token
             _setTokenURI(tokenId, string(abi.encodePacked(
                "ipfs://QmYXEYPpkQ7gdStrSzH5LyHo4tGxS6kba5NQzBt59oTxwi/", 
                Strings.toString(tokenId)
            )));
        }
    }

    /**
     * @notice Updates the metadata URI for a given tokenId.
     * @dev Only the owner or an approved operator can call this function.
     * @param _tokenId The tokenId of the NFT to update the URI for.
     * @param _uri The new URI to set for the given tokenId.
     * @custom:throws NotAuthorizedToUpdateTokenURI if the caller is not the owner or an approved operator.
     */
    function updateTokenURI(uint256 _tokenId, string memory _uri) external {
        if (!isApprovedOrOwner(_msgSender(), _tokenId)) {
            revert NotAuthorizedToUpdateTokenURI();
        }
        _setTokenURI(_tokenId, _uri);
        emit TokenURIUpdated(_tokenId, _uri, _msgSender());
    }

    /**
     * @notice Checks if the caller can set the primary sale recipient.
     * @dev This function overrides the internal view function from the base contract.
     * @return bool True if the caller is the owner, false otherwise.
     */
    function _canSetPrimarySaleRecipient() internal view override returns (bool) {
        return owner() == _msgSender();
    }

    /**
     * @notice Sets the metadata URI for a given tokenId.
     *
     * @param _tokenId  The tokenId of the NFT to set the URI for.
     * @param _tokenURI The URI to set for the given tokenId.
     */
    function _setTokenURI(uint256 _tokenId, string memory _tokenURI) internal virtual override {
        fullURI[_tokenId] = _tokenURI;
    }

    /**
     *  @notice         Returns the metadata URI for an NFT.
     *  @dev            See `BatchMintMetadata` for handling of metadata in this contract.
     *
     *  @param _tokenId The tokenId of an NFT.
     */
    function tokenURI(uint256 _tokenId) public view virtual override returns (string memory) {
        string memory fullUriForToken = fullURI[_tokenId];
        if (bytes(fullUriForToken).length > 0) {
            return fullUriForToken;
        }

        string memory batchUri = _getBaseURI(_tokenId);
        return string(abi.encodePacked(batchUri, Strings.toString(_tokenId)));
    }

}