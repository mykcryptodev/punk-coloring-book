import {
  prepareEvent,
  prepareContractCall,
  readContract,
  type BaseTransactionOptions,
  type AbiParameterToPrimitiveType,
} from "thirdweb";

/**
* Contract events
*/

/**
 * Represents the filters for the "Approval" event.
 */
export type ApprovalEventFilters = Partial<{
  owner: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"owner","type":"address"}>
approved: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"approved","type":"address"}>
tokenId: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}>
}>;

/**
 * Creates an event object for the Approval event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { approvalEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  approvalEvent({
 *  owner: ...,
 *  approved: ...,
 *  tokenId: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function approvalEvent(filters: ApprovalEventFilters = {}) {
  return prepareEvent({
    signature: "event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)",
    filters,
  });
};
  

/**
 * Represents the filters for the "ApprovalForAll" event.
 */
export type ApprovalForAllEventFilters = Partial<{
  owner: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"owner","type":"address"}>
operator: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"operator","type":"address"}>
}>;

/**
 * Creates an event object for the ApprovalForAll event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { approvalForAllEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  approvalForAllEvent({
 *  owner: ...,
 *  operator: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function approvalForAllEvent(filters: ApprovalForAllEventFilters = {}) {
  return prepareEvent({
    signature: "event ApprovalForAll(address indexed owner, address indexed operator, bool approved)",
    filters,
  });
};
  



/**
 * Creates an event object for the BatchMetadataUpdate event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { batchMetadataUpdateEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  batchMetadataUpdateEvent()
 * ],
 * });
 * ```
 */ 
export function batchMetadataUpdateEvent() {
  return prepareEvent({
    signature: "event BatchMetadataUpdate(uint256 _fromTokenId, uint256 _toTokenId)",
  });
};
  



/**
 * Creates an event object for the ContractURIUpdated event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { contractURIUpdatedEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  contractURIUpdatedEvent()
 * ],
 * });
 * ```
 */ 
export function contractURIUpdatedEvent() {
  return prepareEvent({
    signature: "event ContractURIUpdated(string prevURI, string newURI)",
  });
};
  

/**
 * Represents the filters for the "DefaultRoyalty" event.
 */
export type DefaultRoyaltyEventFilters = Partial<{
  newRoyaltyRecipient: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"newRoyaltyRecipient","type":"address"}>
}>;

/**
 * Creates an event object for the DefaultRoyalty event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { defaultRoyaltyEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  defaultRoyaltyEvent({
 *  newRoyaltyRecipient: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function defaultRoyaltyEvent(filters: DefaultRoyaltyEventFilters = {}) {
  return prepareEvent({
    signature: "event DefaultRoyalty(address indexed newRoyaltyRecipient, uint256 newRoyaltyBps)",
    filters,
  });
};
  



/**
 * Creates an event object for the MetadataFrozen event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { metadataFrozenEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  metadataFrozenEvent()
 * ],
 * });
 * ```
 */ 
export function metadataFrozenEvent() {
  return prepareEvent({
    signature: "event MetadataFrozen()",
  });
};
  

/**
 * Represents the filters for the "OwnerUpdated" event.
 */
export type OwnerUpdatedEventFilters = Partial<{
  prevOwner: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"prevOwner","type":"address"}>
newOwner: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}>
}>;

/**
 * Creates an event object for the OwnerUpdated event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { ownerUpdatedEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  ownerUpdatedEvent({
 *  prevOwner: ...,
 *  newOwner: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function ownerUpdatedEvent(filters: OwnerUpdatedEventFilters = {}) {
  return prepareEvent({
    signature: "event OwnerUpdated(address indexed prevOwner, address indexed newOwner)",
    filters,
  });
};
  

/**
 * Represents the filters for the "PrimarySaleRecipientUpdated" event.
 */
export type PrimarySaleRecipientUpdatedEventFilters = Partial<{
  recipient: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"recipient","type":"address"}>
}>;

/**
 * Creates an event object for the PrimarySaleRecipientUpdated event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { primarySaleRecipientUpdatedEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  primarySaleRecipientUpdatedEvent({
 *  recipient: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function primarySaleRecipientUpdatedEvent(filters: PrimarySaleRecipientUpdatedEventFilters = {}) {
  return prepareEvent({
    signature: "event PrimarySaleRecipientUpdated(address indexed recipient)",
    filters,
  });
};
  

/**
 * Represents the filters for the "RoyaltyForToken" event.
 */
export type RoyaltyForTokenEventFilters = Partial<{
  tokenId: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}>
royaltyRecipient: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"royaltyRecipient","type":"address"}>
}>;

/**
 * Creates an event object for the RoyaltyForToken event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { royaltyForTokenEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  royaltyForTokenEvent({
 *  tokenId: ...,
 *  royaltyRecipient: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function royaltyForTokenEvent(filters: RoyaltyForTokenEventFilters = {}) {
  return prepareEvent({
    signature: "event RoyaltyForToken(uint256 indexed tokenId, address indexed royaltyRecipient, uint256 royaltyBps)",
    filters,
  });
};
  

/**
 * Represents the filters for the "Transfer" event.
 */
export type TransferEventFilters = Partial<{
  from: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"from","type":"address"}>
to: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"to","type":"address"}>
tokenId: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}>
}>;

/**
 * Creates an event object for the Transfer event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { transferEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  transferEvent({
 *  from: ...,
 *  to: ...,
 *  tokenId: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function transferEvent(filters: TransferEventFilters = {}) {
  return prepareEvent({
    signature: "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
    filters,
  });
};
  

/**
* Contract read functions
*/



/**
 * Calls the "MAX_SUPPLY" function on the contract.
 * @param options - The options for the MAX_SUPPLY function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { MAX_SUPPLY } from "TODO";
 * 
 * const result = await MAX_SUPPLY();
 * 
 * ```
 */
export async function MAX_SUPPLY(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x32cb6b0c",
  [],
  [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ]
],
    params: []
  });
};




/**
 * Calls the "MINT_PRICE" function on the contract.
 * @param options - The options for the MINT_PRICE function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { MINT_PRICE } from "TODO";
 * 
 * const result = await MINT_PRICE();
 * 
 * ```
 */
export async function MINT_PRICE(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xc002d23d",
  [],
  [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ]
],
    params: []
  });
};


/**
 * Represents the parameters for the "balanceOf" function.
 */
export type BalanceOfParams = {
  owner: AbiParameterToPrimitiveType<{"internalType":"address","name":"owner","type":"address"}>
};

/**
 * Calls the "balanceOf" function on the contract.
 * @param options - The options for the balanceOf function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { balanceOf } from "TODO";
 * 
 * const result = await balanceOf({
 *  owner: ...,
 * });
 * 
 * ```
 */
export async function balanceOf(
  options: BaseTransactionOptions<BalanceOfParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x70a08231",
  [
    {
      "internalType": "address",
      "name": "owner",
      "type": "address"
    }
  ],
  [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ]
],
    params: [options.owner]
  });
};


/**
 * Represents the parameters for the "batchFrozen" function.
 */
export type BatchFrozenParams = {
  arg_0: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"","type":"uint256"}>
};

/**
 * Calls the "batchFrozen" function on the contract.
 * @param options - The options for the batchFrozen function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { batchFrozen } from "TODO";
 * 
 * const result = await batchFrozen({
 *  arg_0: ...,
 * });
 * 
 * ```
 */
export async function batchFrozen(
  options: BaseTransactionOptions<BatchFrozenParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x83040532",
  [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ]
],
    params: [options.arg_0]
  });
};




/**
 * Calls the "contractURI" function on the contract.
 * @param options - The options for the contractURI function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { contractURI } from "TODO";
 * 
 * const result = await contractURI();
 * 
 * ```
 */
export async function contractURI(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xe8a3d485",
  [],
  [
    {
      "internalType": "string",
      "name": "",
      "type": "string"
    }
  ]
],
    params: []
  });
};


/**
 * Represents the parameters for the "explicitOwnershipOf" function.
 */
export type ExplicitOwnershipOfParams = {
  tokenId: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"tokenId","type":"uint256"}>
};

/**
 * Calls the "explicitOwnershipOf" function on the contract.
 * @param options - The options for the explicitOwnershipOf function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { explicitOwnershipOf } from "TODO";
 * 
 * const result = await explicitOwnershipOf({
 *  tokenId: ...,
 * });
 * 
 * ```
 */
export async function explicitOwnershipOf(
  options: BaseTransactionOptions<ExplicitOwnershipOfParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xc23dc68f",
  [
    {
      "internalType": "uint256",
      "name": "tokenId",
      "type": "uint256"
    }
  ],
  [
    {
      "components": [
        {
          "internalType": "address",
          "name": "addr",
          "type": "address"
        },
        {
          "internalType": "uint64",
          "name": "startTimestamp",
          "type": "uint64"
        },
        {
          "internalType": "bool",
          "name": "burned",
          "type": "bool"
        }
      ],
      "internalType": "struct IERC721A.TokenOwnership",
      "name": "",
      "type": "tuple"
    }
  ]
],
    params: [options.tokenId]
  });
};


/**
 * Represents the parameters for the "explicitOwnershipsOf" function.
 */
export type ExplicitOwnershipsOfParams = {
  tokenIds: AbiParameterToPrimitiveType<{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}>
};

/**
 * Calls the "explicitOwnershipsOf" function on the contract.
 * @param options - The options for the explicitOwnershipsOf function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { explicitOwnershipsOf } from "TODO";
 * 
 * const result = await explicitOwnershipsOf({
 *  tokenIds: ...,
 * });
 * 
 * ```
 */
export async function explicitOwnershipsOf(
  options: BaseTransactionOptions<ExplicitOwnershipsOfParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x5bbb2177",
  [
    {
      "internalType": "uint256[]",
      "name": "tokenIds",
      "type": "uint256[]"
    }
  ],
  [
    {
      "components": [
        {
          "internalType": "address",
          "name": "addr",
          "type": "address"
        },
        {
          "internalType": "uint64",
          "name": "startTimestamp",
          "type": "uint64"
        },
        {
          "internalType": "bool",
          "name": "burned",
          "type": "bool"
        }
      ],
      "internalType": "struct IERC721A.TokenOwnership[]",
      "name": "",
      "type": "tuple[]"
    }
  ]
],
    params: [options.tokenIds]
  });
};


/**
 * Represents the parameters for the "getApproved" function.
 */
export type GetApprovedParams = {
  tokenId: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"tokenId","type":"uint256"}>
};

/**
 * Calls the "getApproved" function on the contract.
 * @param options - The options for the getApproved function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getApproved } from "TODO";
 * 
 * const result = await getApproved({
 *  tokenId: ...,
 * });
 * 
 * ```
 */
export async function getApproved(
  options: BaseTransactionOptions<GetApprovedParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x081812fc",
  [
    {
      "internalType": "uint256",
      "name": "tokenId",
      "type": "uint256"
    }
  ],
  [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ]
],
    params: [options.tokenId]
  });
};




/**
 * Calls the "getBaseURICount" function on the contract.
 * @param options - The options for the getBaseURICount function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getBaseURICount } from "TODO";
 * 
 * const result = await getBaseURICount();
 * 
 * ```
 */
export async function getBaseURICount(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x63b45e2d",
  [],
  [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ]
],
    params: []
  });
};


/**
 * Represents the parameters for the "getBatchIdAtIndex" function.
 */
export type GetBatchIdAtIndexParams = {
  index: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"_index","type":"uint256"}>
};

/**
 * Calls the "getBatchIdAtIndex" function on the contract.
 * @param options - The options for the getBatchIdAtIndex function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getBatchIdAtIndex } from "TODO";
 * 
 * const result = await getBatchIdAtIndex({
 *  index: ...,
 * });
 * 
 * ```
 */
export async function getBatchIdAtIndex(
  options: BaseTransactionOptions<GetBatchIdAtIndexParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x2419f51b",
  [
    {
      "internalType": "uint256",
      "name": "_index",
      "type": "uint256"
    }
  ],
  [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ]
],
    params: [options.index]
  });
};




/**
 * Calls the "getDefaultRoyaltyInfo" function on the contract.
 * @param options - The options for the getDefaultRoyaltyInfo function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getDefaultRoyaltyInfo } from "TODO";
 * 
 * const result = await getDefaultRoyaltyInfo();
 * 
 * ```
 */
export async function getDefaultRoyaltyInfo(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xb24f2d39",
  [],
  [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    },
    {
      "internalType": "uint16",
      "name": "",
      "type": "uint16"
    }
  ]
],
    params: []
  });
};


/**
 * Represents the parameters for the "getRoyaltyInfoForToken" function.
 */
export type GetRoyaltyInfoForTokenParams = {
  tokenId: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"_tokenId","type":"uint256"}>
};

/**
 * Calls the "getRoyaltyInfoForToken" function on the contract.
 * @param options - The options for the getRoyaltyInfoForToken function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getRoyaltyInfoForToken } from "TODO";
 * 
 * const result = await getRoyaltyInfoForToken({
 *  tokenId: ...,
 * });
 * 
 * ```
 */
export async function getRoyaltyInfoForToken(
  options: BaseTransactionOptions<GetRoyaltyInfoForTokenParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x4cc157df",
  [
    {
      "internalType": "uint256",
      "name": "_tokenId",
      "type": "uint256"
    }
  ],
  [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    },
    {
      "internalType": "uint16",
      "name": "",
      "type": "uint16"
    }
  ]
],
    params: [options.tokenId]
  });
};


/**
 * Represents the parameters for the "isApprovedForAll" function.
 */
export type IsApprovedForAllParams = {
  owner: AbiParameterToPrimitiveType<{"internalType":"address","name":"owner","type":"address"}>
operator: AbiParameterToPrimitiveType<{"internalType":"address","name":"operator","type":"address"}>
};

/**
 * Calls the "isApprovedForAll" function on the contract.
 * @param options - The options for the isApprovedForAll function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { isApprovedForAll } from "TODO";
 * 
 * const result = await isApprovedForAll({
 *  owner: ...,
 *  operator: ...,
 * });
 * 
 * ```
 */
export async function isApprovedForAll(
  options: BaseTransactionOptions<IsApprovedForAllParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xe985e9c5",
  [
    {
      "internalType": "address",
      "name": "owner",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "operator",
      "type": "address"
    }
  ],
  [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ]
],
    params: [options.owner, options.operator]
  });
};


/**
 * Represents the parameters for the "isApprovedOrOwner" function.
 */
export type IsApprovedOrOwnerParams = {
  operator: AbiParameterToPrimitiveType<{"internalType":"address","name":"_operator","type":"address"}>
tokenId: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"_tokenId","type":"uint256"}>
};

/**
 * Calls the "isApprovedOrOwner" function on the contract.
 * @param options - The options for the isApprovedOrOwner function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { isApprovedOrOwner } from "TODO";
 * 
 * const result = await isApprovedOrOwner({
 *  operator: ...,
 *  tokenId: ...,
 * });
 * 
 * ```
 */
export async function isApprovedOrOwner(
  options: BaseTransactionOptions<IsApprovedOrOwnerParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x430c2081",
  [
    {
      "internalType": "address",
      "name": "_operator",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "_tokenId",
      "type": "uint256"
    }
  ],
  [
    {
      "internalType": "bool",
      "name": "isApprovedOrOwnerOf",
      "type": "bool"
    }
  ]
],
    params: [options.operator, options.tokenId]
  });
};




/**
 * Calls the "name" function on the contract.
 * @param options - The options for the name function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { name } from "TODO";
 * 
 * const result = await name();
 * 
 * ```
 */
export async function name(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x06fdde03",
  [],
  [
    {
      "internalType": "string",
      "name": "",
      "type": "string"
    }
  ]
],
    params: []
  });
};




/**
 * Calls the "nextTokenIdToMint" function on the contract.
 * @param options - The options for the nextTokenIdToMint function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { nextTokenIdToMint } from "TODO";
 * 
 * const result = await nextTokenIdToMint();
 * 
 * ```
 */
export async function nextTokenIdToMint(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x3b1475a7",
  [],
  [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ]
],
    params: []
  });
};




/**
 * Calls the "owner" function on the contract.
 * @param options - The options for the owner function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { owner } from "TODO";
 * 
 * const result = await owner();
 * 
 * ```
 */
export async function owner(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x8da5cb5b",
  [],
  [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ]
],
    params: []
  });
};


/**
 * Represents the parameters for the "ownerOf" function.
 */
export type OwnerOfParams = {
  tokenId: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"tokenId","type":"uint256"}>
};

/**
 * Calls the "ownerOf" function on the contract.
 * @param options - The options for the ownerOf function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { ownerOf } from "TODO";
 * 
 * const result = await ownerOf({
 *  tokenId: ...,
 * });
 * 
 * ```
 */
export async function ownerOf(
  options: BaseTransactionOptions<OwnerOfParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x6352211e",
  [
    {
      "internalType": "uint256",
      "name": "tokenId",
      "type": "uint256"
    }
  ],
  [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ]
],
    params: [options.tokenId]
  });
};




/**
 * Calls the "primarySaleRecipient" function on the contract.
 * @param options - The options for the primarySaleRecipient function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { primarySaleRecipient } from "TODO";
 * 
 * const result = await primarySaleRecipient();
 * 
 * ```
 */
export async function primarySaleRecipient(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x079fe40e",
  [],
  [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ]
],
    params: []
  });
};


/**
 * Represents the parameters for the "royaltyInfo" function.
 */
export type RoyaltyInfoParams = {
  tokenId: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"tokenId","type":"uint256"}>
salePrice: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"salePrice","type":"uint256"}>
};

/**
 * Calls the "royaltyInfo" function on the contract.
 * @param options - The options for the royaltyInfo function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { royaltyInfo } from "TODO";
 * 
 * const result = await royaltyInfo({
 *  tokenId: ...,
 *  salePrice: ...,
 * });
 * 
 * ```
 */
export async function royaltyInfo(
  options: BaseTransactionOptions<RoyaltyInfoParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x2a55205a",
  [
    {
      "internalType": "uint256",
      "name": "tokenId",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "salePrice",
      "type": "uint256"
    }
  ],
  [
    {
      "internalType": "address",
      "name": "receiver",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "royaltyAmount",
      "type": "uint256"
    }
  ]
],
    params: [options.tokenId, options.salePrice]
  });
};


/**
 * Represents the parameters for the "supportsInterface" function.
 */
export type SupportsInterfaceParams = {
  interfaceId: AbiParameterToPrimitiveType<{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}>
};

/**
 * Calls the "supportsInterface" function on the contract.
 * @param options - The options for the supportsInterface function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { supportsInterface } from "TODO";
 * 
 * const result = await supportsInterface({
 *  interfaceId: ...,
 * });
 * 
 * ```
 */
export async function supportsInterface(
  options: BaseTransactionOptions<SupportsInterfaceParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x01ffc9a7",
  [
    {
      "internalType": "bytes4",
      "name": "interfaceId",
      "type": "bytes4"
    }
  ],
  [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ]
],
    params: [options.interfaceId]
  });
};




/**
 * Calls the "symbol" function on the contract.
 * @param options - The options for the symbol function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { symbol } from "TODO";
 * 
 * const result = await symbol();
 * 
 * ```
 */
export async function symbol(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x95d89b41",
  [],
  [
    {
      "internalType": "string",
      "name": "",
      "type": "string"
    }
  ]
],
    params: []
  });
};


/**
 * Represents the parameters for the "tokenURI" function.
 */
export type TokenURIParams = {
  tokenId: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"_tokenId","type":"uint256"}>
};

/**
 * Calls the "tokenURI" function on the contract.
 * @param options - The options for the tokenURI function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { tokenURI } from "TODO";
 * 
 * const result = await tokenURI({
 *  tokenId: ...,
 * });
 * 
 * ```
 */
export async function tokenURI(
  options: BaseTransactionOptions<TokenURIParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xc87b56dd",
  [
    {
      "internalType": "uint256",
      "name": "_tokenId",
      "type": "uint256"
    }
  ],
  [
    {
      "internalType": "string",
      "name": "",
      "type": "string"
    }
  ]
],
    params: [options.tokenId]
  });
};


/**
 * Represents the parameters for the "tokensOfOwner" function.
 */
export type TokensOfOwnerParams = {
  owner: AbiParameterToPrimitiveType<{"internalType":"address","name":"owner","type":"address"}>
};

/**
 * Calls the "tokensOfOwner" function on the contract.
 * @param options - The options for the tokensOfOwner function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { tokensOfOwner } from "TODO";
 * 
 * const result = await tokensOfOwner({
 *  owner: ...,
 * });
 * 
 * ```
 */
export async function tokensOfOwner(
  options: BaseTransactionOptions<TokensOfOwnerParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x8462151c",
  [
    {
      "internalType": "address",
      "name": "owner",
      "type": "address"
    }
  ],
  [
    {
      "internalType": "uint256[]",
      "name": "",
      "type": "uint256[]"
    }
  ]
],
    params: [options.owner]
  });
};


/**
 * Represents the parameters for the "tokensOfOwnerIn" function.
 */
export type TokensOfOwnerInParams = {
  owner: AbiParameterToPrimitiveType<{"internalType":"address","name":"owner","type":"address"}>
start: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"start","type":"uint256"}>
stop: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"stop","type":"uint256"}>
};

/**
 * Calls the "tokensOfOwnerIn" function on the contract.
 * @param options - The options for the tokensOfOwnerIn function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { tokensOfOwnerIn } from "TODO";
 * 
 * const result = await tokensOfOwnerIn({
 *  owner: ...,
 *  start: ...,
 *  stop: ...,
 * });
 * 
 * ```
 */
export async function tokensOfOwnerIn(
  options: BaseTransactionOptions<TokensOfOwnerInParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x99a2557a",
  [
    {
      "internalType": "address",
      "name": "owner",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "start",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "stop",
      "type": "uint256"
    }
  ],
  [
    {
      "internalType": "uint256[]",
      "name": "",
      "type": "uint256[]"
    }
  ]
],
    params: [options.owner, options.start, options.stop]
  });
};




/**
 * Calls the "totalSupply" function on the contract.
 * @param options - The options for the totalSupply function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { totalSupply } from "TODO";
 * 
 * const result = await totalSupply();
 * 
 * ```
 */
export async function totalSupply(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x18160ddd",
  [],
  [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ]
],
    params: []
  });
};


/**
* Contract write functions
*/

/**
 * Represents the parameters for the "approve" function.
 */
export type ApproveParams = {
  to: AbiParameterToPrimitiveType<{"internalType":"address","name":"to","type":"address"}>
tokenId: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"tokenId","type":"uint256"}>
};

/**
 * Calls the "approve" function on the contract.
 * @param options - The options for the "approve" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { approve } from "TODO";
 * 
 * const transaction = approve({
 *  to: ...,
 *  tokenId: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function approve(
  options: BaseTransactionOptions<ApproveParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x095ea7b3",
  [
    {
      "internalType": "address",
      "name": "to",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "tokenId",
      "type": "uint256"
    }
  ],
  []
],
    params: [options.to, options.tokenId]
  });
};


/**
 * Represents the parameters for the "batchMintTo" function.
 */
export type BatchMintToParams = {
  to: AbiParameterToPrimitiveType<{"internalType":"address","name":"_to","type":"address"}>
quantity: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"_quantity","type":"uint256"}>
baseURI: AbiParameterToPrimitiveType<{"internalType":"string","name":"_baseURI","type":"string"}>
data: AbiParameterToPrimitiveType<{"internalType":"bytes","name":"_data","type":"bytes"}>
};

/**
 * Calls the "batchMintTo" function on the contract.
 * @param options - The options for the "batchMintTo" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { batchMintTo } from "TODO";
 * 
 * const transaction = batchMintTo({
 *  to: ...,
 *  quantity: ...,
 *  baseURI: ...,
 *  data: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function batchMintTo(
  options: BaseTransactionOptions<BatchMintToParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x754a81d9",
  [
    {
      "internalType": "address",
      "name": "_to",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "_quantity",
      "type": "uint256"
    },
    {
      "internalType": "string",
      "name": "_baseURI",
      "type": "string"
    },
    {
      "internalType": "bytes",
      "name": "_data",
      "type": "bytes"
    }
  ],
  []
],
    params: [options.to, options.quantity, options.baseURI, options.data]
  });
};


/**
 * Represents the parameters for the "burn" function.
 */
export type BurnParams = {
  tokenId: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"_tokenId","type":"uint256"}>
};

/**
 * Calls the "burn" function on the contract.
 * @param options - The options for the "burn" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { burn } from "TODO";
 * 
 * const transaction = burn({
 *  tokenId: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function burn(
  options: BaseTransactionOptions<BurnParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x42966c68",
  [
    {
      "internalType": "uint256",
      "name": "_tokenId",
      "type": "uint256"
    }
  ],
  []
],
    params: [options.tokenId]
  });
};


/**
 * Represents the parameters for the "mint" function.
 */
export type MintParams = {
  to: AbiParameterToPrimitiveType<{"internalType":"address","name":"_to","type":"address"}>
quantity: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"_quantity","type":"uint256"}>
};

/**
 * Calls the "mint" function on the contract.
 * @param options - The options for the "mint" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { mint } from "TODO";
 * 
 * const transaction = mint({
 *  to: ...,
 *  quantity: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function mint(
  options: BaseTransactionOptions<MintParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x40c10f19",
  [
    {
      "internalType": "address",
      "name": "_to",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "_quantity",
      "type": "uint256"
    }
  ],
  []
],
    params: [options.to, options.quantity]
  });
};


/**
 * Represents the parameters for the "mintTo" function.
 */
export type MintToParams = {
  to: AbiParameterToPrimitiveType<{"internalType":"address","name":"_to","type":"address"}>
tokenURI: AbiParameterToPrimitiveType<{"internalType":"string","name":"_tokenURI","type":"string"}>
};

/**
 * Calls the "mintTo" function on the contract.
 * @param options - The options for the "mintTo" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { mintTo } from "TODO";
 * 
 * const transaction = mintTo({
 *  to: ...,
 *  tokenURI: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function mintTo(
  options: BaseTransactionOptions<MintToParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x0075a317",
  [
    {
      "internalType": "address",
      "name": "_to",
      "type": "address"
    },
    {
      "internalType": "string",
      "name": "_tokenURI",
      "type": "string"
    }
  ],
  []
],
    params: [options.to, options.tokenURI]
  });
};


/**
 * Represents the parameters for the "multicall" function.
 */
export type MulticallParams = {
  data: AbiParameterToPrimitiveType<{"internalType":"bytes[]","name":"data","type":"bytes[]"}>
};

/**
 * Calls the "multicall" function on the contract.
 * @param options - The options for the "multicall" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { multicall } from "TODO";
 * 
 * const transaction = multicall({
 *  data: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function multicall(
  options: BaseTransactionOptions<MulticallParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xac9650d8",
  [
    {
      "internalType": "bytes[]",
      "name": "data",
      "type": "bytes[]"
    }
  ],
  [
    {
      "internalType": "bytes[]",
      "name": "results",
      "type": "bytes[]"
    }
  ]
],
    params: [options.data]
  });
};


/**
 * Represents the parameters for the "safeTransferFrom" function.
 */
export type SafeTransferFromParams = {
  from: AbiParameterToPrimitiveType<{"internalType":"address","name":"from","type":"address"}>
to: AbiParameterToPrimitiveType<{"internalType":"address","name":"to","type":"address"}>
tokenId: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"tokenId","type":"uint256"}>
};

/**
 * Calls the "safeTransferFrom" function on the contract.
 * @param options - The options for the "safeTransferFrom" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { safeTransferFrom } from "TODO";
 * 
 * const transaction = safeTransferFrom({
 *  from: ...,
 *  to: ...,
 *  tokenId: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function safeTransferFrom(
  options: BaseTransactionOptions<SafeTransferFromParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x42842e0e",
  [
    {
      "internalType": "address",
      "name": "from",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "to",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "tokenId",
      "type": "uint256"
    }
  ],
  []
],
    params: [options.from, options.to, options.tokenId]
  });
};


/**
 * Represents the parameters for the "setApprovalForAll" function.
 */
export type SetApprovalForAllParams = {
  operator: AbiParameterToPrimitiveType<{"internalType":"address","name":"operator","type":"address"}>
approved: AbiParameterToPrimitiveType<{"internalType":"bool","name":"approved","type":"bool"}>
};

/**
 * Calls the "setApprovalForAll" function on the contract.
 * @param options - The options for the "setApprovalForAll" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setApprovalForAll } from "TODO";
 * 
 * const transaction = setApprovalForAll({
 *  operator: ...,
 *  approved: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function setApprovalForAll(
  options: BaseTransactionOptions<SetApprovalForAllParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xa22cb465",
  [
    {
      "internalType": "address",
      "name": "operator",
      "type": "address"
    },
    {
      "internalType": "bool",
      "name": "approved",
      "type": "bool"
    }
  ],
  []
],
    params: [options.operator, options.approved]
  });
};


/**
 * Represents the parameters for the "setContractURI" function.
 */
export type SetContractURIParams = {
  uri: AbiParameterToPrimitiveType<{"internalType":"string","name":"_uri","type":"string"}>
};

/**
 * Calls the "setContractURI" function on the contract.
 * @param options - The options for the "setContractURI" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setContractURI } from "TODO";
 * 
 * const transaction = setContractURI({
 *  uri: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function setContractURI(
  options: BaseTransactionOptions<SetContractURIParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x938e3d7b",
  [
    {
      "internalType": "string",
      "name": "_uri",
      "type": "string"
    }
  ],
  []
],
    params: [options.uri]
  });
};


/**
 * Represents the parameters for the "setDefaultRoyaltyInfo" function.
 */
export type SetDefaultRoyaltyInfoParams = {
  royaltyRecipient: AbiParameterToPrimitiveType<{"internalType":"address","name":"_royaltyRecipient","type":"address"}>
royaltyBps: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"_royaltyBps","type":"uint256"}>
};

/**
 * Calls the "setDefaultRoyaltyInfo" function on the contract.
 * @param options - The options for the "setDefaultRoyaltyInfo" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setDefaultRoyaltyInfo } from "TODO";
 * 
 * const transaction = setDefaultRoyaltyInfo({
 *  royaltyRecipient: ...,
 *  royaltyBps: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function setDefaultRoyaltyInfo(
  options: BaseTransactionOptions<SetDefaultRoyaltyInfoParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x600dd5ea",
  [
    {
      "internalType": "address",
      "name": "_royaltyRecipient",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "_royaltyBps",
      "type": "uint256"
    }
  ],
  []
],
    params: [options.royaltyRecipient, options.royaltyBps]
  });
};


/**
 * Represents the parameters for the "setOwner" function.
 */
export type SetOwnerParams = {
  newOwner: AbiParameterToPrimitiveType<{"internalType":"address","name":"_newOwner","type":"address"}>
};

/**
 * Calls the "setOwner" function on the contract.
 * @param options - The options for the "setOwner" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setOwner } from "TODO";
 * 
 * const transaction = setOwner({
 *  newOwner: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function setOwner(
  options: BaseTransactionOptions<SetOwnerParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x13af4035",
  [
    {
      "internalType": "address",
      "name": "_newOwner",
      "type": "address"
    }
  ],
  []
],
    params: [options.newOwner]
  });
};


/**
 * Represents the parameters for the "setPrimarySaleRecipient" function.
 */
export type SetPrimarySaleRecipientParams = {
  saleRecipient: AbiParameterToPrimitiveType<{"internalType":"address","name":"_saleRecipient","type":"address"}>
};

/**
 * Calls the "setPrimarySaleRecipient" function on the contract.
 * @param options - The options for the "setPrimarySaleRecipient" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setPrimarySaleRecipient } from "TODO";
 * 
 * const transaction = setPrimarySaleRecipient({
 *  saleRecipient: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function setPrimarySaleRecipient(
  options: BaseTransactionOptions<SetPrimarySaleRecipientParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x6f4f2837",
  [
    {
      "internalType": "address",
      "name": "_saleRecipient",
      "type": "address"
    }
  ],
  []
],
    params: [options.saleRecipient]
  });
};


/**
 * Represents the parameters for the "setRoyaltyInfoForToken" function.
 */
export type SetRoyaltyInfoForTokenParams = {
  tokenId: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"_tokenId","type":"uint256"}>
recipient: AbiParameterToPrimitiveType<{"internalType":"address","name":"_recipient","type":"address"}>
bps: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"_bps","type":"uint256"}>
};

/**
 * Calls the "setRoyaltyInfoForToken" function on the contract.
 * @param options - The options for the "setRoyaltyInfoForToken" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setRoyaltyInfoForToken } from "TODO";
 * 
 * const transaction = setRoyaltyInfoForToken({
 *  tokenId: ...,
 *  recipient: ...,
 *  bps: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function setRoyaltyInfoForToken(
  options: BaseTransactionOptions<SetRoyaltyInfoForTokenParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x9bcf7a15",
  [
    {
      "internalType": "uint256",
      "name": "_tokenId",
      "type": "uint256"
    },
    {
      "internalType": "address",
      "name": "_recipient",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "_bps",
      "type": "uint256"
    }
  ],
  []
],
    params: [options.tokenId, options.recipient, options.bps]
  });
};


/**
 * Represents the parameters for the "transferFrom" function.
 */
export type TransferFromParams = {
  from: AbiParameterToPrimitiveType<{"internalType":"address","name":"from","type":"address"}>
to: AbiParameterToPrimitiveType<{"internalType":"address","name":"to","type":"address"}>
tokenId: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"tokenId","type":"uint256"}>
};

/**
 * Calls the "transferFrom" function on the contract.
 * @param options - The options for the "transferFrom" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { transferFrom } from "TODO";
 * 
 * const transaction = transferFrom({
 *  from: ...,
 *  to: ...,
 *  tokenId: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function transferFrom(
  options: BaseTransactionOptions<TransferFromParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x23b872dd",
  [
    {
      "internalType": "address",
      "name": "from",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "to",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "tokenId",
      "type": "uint256"
    }
  ],
  []
],
    params: [options.from, options.to, options.tokenId]
  });
};


/**
 * Represents the parameters for the "updateTokenURI" function.
 */
export type UpdateTokenURIParams = {
  tokenId: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"_tokenId","type":"uint256"}>
uri: AbiParameterToPrimitiveType<{"internalType":"string","name":"_uri","type":"string"}>
};

/**
 * Calls the "updateTokenURI" function on the contract.
 * @param options - The options for the "updateTokenURI" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { updateTokenURI } from "TODO";
 * 
 * const transaction = updateTokenURI({
 *  tokenId: ...,
 *  uri: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function updateTokenURI(
  options: BaseTransactionOptions<UpdateTokenURIParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x18e97fd1",
  [
    {
      "internalType": "uint256",
      "name": "_tokenId",
      "type": "uint256"
    },
    {
      "internalType": "string",
      "name": "_uri",
      "type": "string"
    }
  ],
  []
],
    params: [options.tokenId, options.uri]
  });
};


