/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  PurchaseConsumer,
  PurchaseConsumerInterface,
} from "../../../contracts/protocol/PurchaseConsumer";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IStonksly",
        name: "_stonksly",
        type: "address",
      },
      {
        internalType: "uint64",
        name: "_subscriptionId",
        type: "uint64",
      },
      {
        internalType: "string",
        name: "_requestSource",
        type: "string",
      },
      {
        internalType: "address",
        name: "_oracle",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "EmptyArgs",
    type: "error",
  },
  {
    inputs: [],
    name: "EmptySource",
    type: "error",
  },
  {
    inputs: [],
    name: "NoInlineSecrets",
    type: "error",
  },
  {
    inputs: [],
    name: "RequestIsAlreadyPending",
    type: "error",
  },
  {
    inputs: [],
    name: "RequestIsNotPending",
    type: "error",
  },
  {
    inputs: [],
    name: "SenderIsNotRegistry",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "oracleRequestId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "stonkslyRequestId",
        type: "uint256",
      },
    ],
    name: "OracleRequestSent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "oracleRequestId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "error",
        type: "bytes",
      },
    ],
    name: "RequestFailed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "RequestFulfilled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "RequestSent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "oracleRequestId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "stonkslyRequestId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "ResponseReceived",
    type: "event",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "enum Functions.Location",
            name: "codeLocation",
            type: "uint8",
          },
          {
            internalType: "enum Functions.Location",
            name: "secretsLocation",
            type: "uint8",
          },
          {
            internalType: "enum Functions.CodeLanguage",
            name: "language",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "source",
            type: "string",
          },
          {
            internalType: "bytes",
            name: "secrets",
            type: "bytes",
          },
          {
            internalType: "string[]",
            name: "args",
            type: "string[]",
          },
        ],
        internalType: "struct Functions.Request",
        name: "req",
        type: "tuple",
      },
      {
        internalType: "uint64",
        name: "subscriptionId",
        type: "uint64",
      },
      {
        internalType: "uint32",
        name: "gasLimit",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "gasPrice",
        type: "uint256",
      },
    ],
    name: "estimateCost",
    outputs: [
      {
        internalType: "uint96",
        name: "",
        type: "uint96",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getDONPublicKey",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "response",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "err",
        type: "bytes",
      },
    ],
    name: "handleOracleFulfillment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "i_stonksly",
    outputs: [
      {
        internalType: "contract IStonksly",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "i_subscriptionId",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_stonkslyRequestId",
        type: "uint256",
      },
      {
        internalType: "string[]",
        name: "args",
        type: "string[]",
      },
    ],
    name: "init",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60c06040523480156200001157600080fd5b5060405162002a9d38038062002a9d833981810160405281019062000037919062000383565b83838383806200004d81620000be60201b60201c565b508373ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff16815250508267ffffffffffffffff1660a08167ffffffffffffffff16815250508160029081620000af91906200065f565b50505050505050505062000746565b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620001428262000115565b9050919050565b6000620001568262000135565b9050919050565b620001688162000149565b81146200017457600080fd5b50565b60008151905062000188816200015d565b92915050565b600067ffffffffffffffff82169050919050565b620001ad816200018e565b8114620001b957600080fd5b50565b600081519050620001cd81620001a2565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6200022882620001dd565b810181811067ffffffffffffffff821117156200024a5762000249620001ee565b5b80604052505050565b60006200025f62000101565b90506200026d82826200021d565b919050565b600067ffffffffffffffff82111562000290576200028f620001ee565b5b6200029b82620001dd565b9050602081019050919050565b60005b83811015620002c8578082015181840152602081019050620002ab565b60008484015250505050565b6000620002eb620002e58462000272565b62000253565b9050828152602081018484840111156200030a5762000309620001d8565b5b62000317848285620002a8565b509392505050565b600082601f830112620003375762000336620001d3565b5b815162000349848260208601620002d4565b91505092915050565b6200035d8162000135565b81146200036957600080fd5b50565b6000815190506200037d8162000352565b92915050565b60008060008060808587031215620003a0576200039f6200010b565b5b6000620003b08782880162000177565b9450506020620003c387828801620001bc565b935050604085015167ffffffffffffffff811115620003e757620003e662000110565b5b620003f5878288016200031f565b925050606062000408878288016200036c565b91505092959194509250565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200046757607f821691505b6020821081036200047d576200047c6200041f565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620004e77fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82620004a8565b620004f38683620004a8565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b6000620005406200053a62000534846200050b565b62000515565b6200050b565b9050919050565b6000819050919050565b6200055c836200051f565b620005746200056b8262000547565b848454620004b5565b825550505050565b600090565b6200058b6200057c565b6200059881848462000551565b505050565b5b81811015620005c057620005b460008262000581565b6001810190506200059e565b5050565b601f8211156200060f57620005d98162000483565b620005e48462000498565b81016020851015620005f4578190505b6200060c620006038562000498565b8301826200059d565b50505b505050565b600082821c905092915050565b6000620006346000198460080262000614565b1980831691505092915050565b60006200064f838362000621565b9150826002028217905092915050565b6200066a8262000414565b67ffffffffffffffff811115620006865762000685620001ee565b5b6200069282546200044e565b6200069f828285620005c4565b600060209050601f831160018114620006d75760008415620006c2578287015190505b620006ce858262000641565b8655506200073e565b601f198416620006e78662000483565b60005b828110156200071157848901518255600182019150602085019450602081019050620006ea565b868310156200073157848901516200072d601f89168262000621565b8355505b6001600288020188555050505b505050505050565b60805160a05161231c6200078160003960008181610238015261034f01526000818161025c0152818161052d0152610632015261231c6000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c80630ca7617514610067578063470cdf97146100835780636fa5c8c4146100a157806382eaeb4b146100bf578063d328a91e146100db578063d4b39175146100f9575b600080fd5b610081600480360381019061007c9190611440565b610129565b005b61008b610236565b60405161009891906114ee565b60405180910390f35b6100a961025a565b6040516100b69190611588565b60405180910390f35b6100d960048036038101906100d49190611639565b61027e565b005b6100e36103d1565b6040516100f09190611718565b60405180910390f35b610113600480360381019061010e9190611a6c565b61046c565b6040516101209190611b16565b60405180910390f35b826001600082815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146101c2576040517fa0c5ec6300000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6001600082815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055807f85e1543bf2f84fe80c6badbce3648c8539ad1df4d2b3d822938ca0538be727e660405160405180910390a2610230848484610521565b50505050565b7f000000000000000000000000000000000000000000000000000000000000000081565b7f000000000000000000000000000000000000000000000000000000000000000081565b61028661120b565b6103286000806002805461029990611b60565b80601f01602080910402602001604051908101604052809291908181526020018280546102c590611b60565b80156103125780601f106102e757610100808354040283529160200191610312565b820191906000526020600020905b8154815290600101906020018083116102f557829003601f168201915b505050505084610700909392919063ffffffff16565b6103478383906103389190611b91565b826107aa90919063ffffffff16565b6000610377827f0000000000000000000000000000000000000000000000000000000000000000620493e06107f2565b90508460036000838152602001908152602001600020819055507f389ceb2478884c31373e66589e2147abce7100e6e7dec9aec54ad4cf32ebd4df81866040516103c2929190611bc4565b60405180910390a15050505050565b606060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d328a91e6040518163ffffffff1660e01b8152600401600060405180830381865afa15801561043e573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f820116820180604052508101906104679190611c5d565b905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d227d245856104b5886109b7565b86866040518563ffffffff1660e01b81526004016104d69493929190611cb5565b602060405180830381865afa1580156104f3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105179190611d2d565b9050949350505050565b600081511115610607577f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166367c0b7df60036000868152602001908152602001600020546040518263ffffffff1660e01b81526004016105979190611d5a565b600060405180830381600087803b1580156105b157600080fd5b505af11580156105c5573d6000803e3d6000fd5b505050507f61982c98cbc49d11759a948f460b92bca26bdf12ceee12c310f117eb2ca9a9cb83826040516105fa929190611d75565b60405180910390a16106fb565b60008261061390611dd7565b60001c90506000600360008681526020019081526020016000205490507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16635acc769882846040518363ffffffff1660e01b815260040161068b929190611e3e565b600060405180830381600087803b1580156106a557600080fd5b505af11580156106b9573d6000803e3d6000fd5b505050507fa5828a1bfcc8c105896d59517dd8b2c405d2105e02ba23bea028543f2315df518582846040516106f093929190611e67565b60405180910390a150505b505050565b600081510361073b576040517f22ce3edd00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b828460000190600181111561075357610752611e9e565b5b9081600181111561076757610766611e9e565b5b81525050818460400190600081111561078357610782611e9e565b5b9081600081111561079757610796611e9e565b5b8152505080846060018190525050505050565b60008151036107e5576040517ffe936cb700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b808260a001819052505050565b60008060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166328242b048561083b886109b7565b866040518463ffffffff1660e01b815260040161085a93929190611ecd565b6020604051808303816000875af1158015610879573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061089d9190611f20565b905060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16635ab1bd536040518163ffffffff1660e01b8152600401602060405180830381865afa15801561090a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061092e9190611f8b565b6001600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550807f1131472297a800fee664d1d89cfa8f7676ff07189ecc53f80bbb5f4969099db860405160405180910390a2809150509392505050565b60606109c1611276565b6109d18160000151610100610cb7565b50610a11816040518060400160405280600c81526020017f636f64654c6f636174696f6e0000000000000000000000000000000000000000815250610d30565b610a318184600001516001811115610a2c57610a2b611e9e565b5b610d59565b610a70816040518060400160405280600881526020017f6c616e6775616765000000000000000000000000000000000000000000000000815250610d30565b610a908184604001516000811115610a8b57610a8a611e9e565b5b610d59565b610acf816040518060400160405280600681526020017f736f757263650000000000000000000000000000000000000000000000000000815250610d30565b610add818460600151610d30565b60008360a00151511115610b8957610b2a816040518060400160405280600481526020017f6172677300000000000000000000000000000000000000000000000000000000815250610d30565b610b3381610da9565b60005b8360a0015151811015610b7e57610b6b828560a001518381518110610b5e57610b5d611fb8565b5b6020026020010151610d30565b8080610b7690612016565b915050610b36565b50610b8881610dd1565b5b60008360800151511115610ca65760006001811115610bab57610baa611e9e565b5b83602001516001811115610bc257610bc1611e9e565b5b03610bf9576040517fa80d31f700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610c38816040518060400160405280600f81526020017f736563726574734c6f636174696f6e0000000000000000000000000000000000815250610d30565b610c588184602001516001811115610c5357610c52611e9e565b5b610d59565b610c97816040518060400160405280600781526020017f7365637265747300000000000000000000000000000000000000000000000000815250610d30565b610ca5818460800151610df9565b5b806000015160000151915050919050565b610cbf611296565b6000602083610cce919061208d565b14610cfa57602082610ce0919061208d565b6020610cec91906120be565b82610cf791906120f2565b91505b818360200181815250506040518084526000815282810160200181811015610d2157600080fd5b80604052505082905092915050565b610d3d8260038351610e22565b610d54818360000151610fcb90919063ffffffff16565b505050565b610d7b60026005600660ff16901b178360000151610fe790919063ffffffff16565b50610da58282604051602001610d919190611d5a565b604051602081830303815290604052610df9565b5050565b610db4816004611051565b600181602001818151610dc791906120f2565b9150818152505050565b610ddc816007611051565b600181602001818151610def91906120be565b9150818152505050565b610e068260028351610e22565b610e1d818360000151610fcb90919063ffffffff16565b505050565b60178167ffffffffffffffff1611610e5d57610e578160058460ff16901b60ff16178460000151610fe790919063ffffffff16565b50610fc6565b60ff8167ffffffffffffffff1611610ebb57610e90601860058460ff16901b178460000151610fe790919063ffffffff16565b50610eb58167ffffffffffffffff16600185600001516110779092919063ffffffff16565b50610fc5565b61ffff8167ffffffffffffffff1611610f1a57610eef601960058460ff16901b178460000151610fe790919063ffffffff16565b50610f148167ffffffffffffffff16600285600001516110779092919063ffffffff16565b50610fc4565b63ffffffff8167ffffffffffffffff1611610f7b57610f50601a60058460ff16901b178460000151610fe790919063ffffffff16565b50610f758167ffffffffffffffff16600485600001516110779092919063ffffffff16565b50610fc3565b610f9c601b60058460ff16901b178460000151610fe790919063ffffffff16565b50610fc18167ffffffffffffffff16600885600001516110779092919063ffffffff16565b505b5b5b5b505050565b610fd3611296565b610fdf83838451611104565b905092915050565b610fef611296565b60008360000151519050600060018261100891906120f2565b90508460200151821061102c5761102b856002836110269190612126565b6111e7565b5b84516020838201018581538151831115611044578282525b5050849250505092915050565b611072601f60058360ff16901b178360000151610fe790919063ffffffff16565b505050565b61107f611296565b600084600001515190506000818461109791906120f2565b905085602001518111156110bc576110bb866002836110b69190612126565b6111e7565b5b60006001856101006110ce919061229b565b6110d891906120be565b9050865182810187831982511617815281518411156110f5578382525b50508693505050509392505050565b61110c611296565b825182111561111a57600080fd5b600084600001515190506000838261113291906120f2565b9050856020015181111561115757611156866002836111519190612126565b6111e7565b5b60008087518051856020830101935080851115611172578482525b60208901925050505b602086106111b9578051825260208261119491906120f2565b91506020816111a391906120f2565b90506020866111b291906120be565b955061117b565b60006001876020036101000a0390508019825116818451168181178552505050879450505050509392505050565b6000826000015190506111fa8383610cb7565b506112058382610fcb565b50505050565b6040518060c001604052806000600181111561122a57611229611e9e565b5b81526020016000600181111561124357611242611e9e565b5b815260200160008081111561125b5761125a611e9e565b5b81526020016060815260200160608152602001606081525090565b6040518060400160405280611289611296565b8152602001600081525090565b604051806040016040528060608152602001600081525090565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b6112d7816112c4565b81146112e257600080fd5b50565b6000813590506112f4816112ce565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61134d82611304565b810181811067ffffffffffffffff8211171561136c5761136b611315565b5b80604052505050565b600061137f6112b0565b905061138b8282611344565b919050565b600067ffffffffffffffff8211156113ab576113aa611315565b5b6113b482611304565b9050602081019050919050565b82818337600083830152505050565b60006113e36113de84611390565b611375565b9050828152602081018484840111156113ff576113fe6112ff565b5b61140a8482856113c1565b509392505050565b600082601f830112611427576114266112fa565b5b81356114378482602086016113d0565b91505092915050565b600080600060608486031215611459576114586112ba565b5b6000611467868287016112e5565b935050602084013567ffffffffffffffff811115611488576114876112bf565b5b61149486828701611412565b925050604084013567ffffffffffffffff8111156114b5576114b46112bf565b5b6114c186828701611412565b9150509250925092565b600067ffffffffffffffff82169050919050565b6114e8816114cb565b82525050565b600060208201905061150360008301846114df565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600061154e61154961154484611509565b611529565b611509565b9050919050565b600061156082611533565b9050919050565b600061157282611555565b9050919050565b61158281611567565b82525050565b600060208201905061159d6000830184611579565b92915050565b6000819050919050565b6115b6816115a3565b81146115c157600080fd5b50565b6000813590506115d3816115ad565b92915050565b600080fd5b600080fd5b60008083601f8401126115f9576115f86112fa565b5b8235905067ffffffffffffffff811115611616576116156115d9565b5b602083019150836020820283011115611632576116316115de565b5b9250929050565b600080600060408486031215611652576116516112ba565b5b6000611660868287016115c4565b935050602084013567ffffffffffffffff811115611681576116806112bf565b5b61168d868287016115e3565b92509250509250925092565b600081519050919050565b600082825260208201905092915050565b60005b838110156116d35780820151818401526020810190506116b8565b60008484015250505050565b60006116ea82611699565b6116f481856116a4565b93506117048185602086016116b5565b61170d81611304565b840191505092915050565b6000602082019050818103600083015261173281846116df565b905092915050565b600080fd5b600080fd5b6002811061175157600080fd5b50565b60008135905061176381611744565b92915050565b6001811061177657600080fd5b50565b60008135905061178881611769565b92915050565b600067ffffffffffffffff8211156117a9576117a8611315565b5b6117b282611304565b9050602081019050919050565b60006117d26117cd8461178e565b611375565b9050828152602081018484840111156117ee576117ed6112ff565b5b6117f98482856113c1565b509392505050565b600082601f830112611816576118156112fa565b5b81356118268482602086016117bf565b91505092915050565b600067ffffffffffffffff82111561184a57611849611315565b5b602082029050602081019050919050565b600061186e6118698461182f565b611375565b90508083825260208201905060208402830185811115611891576118906115de565b5b835b818110156118d857803567ffffffffffffffff8111156118b6576118b56112fa565b5b8086016118c38982611801565b85526020850194505050602081019050611893565b5050509392505050565b600082601f8301126118f7576118f66112fa565b5b813561190784826020860161185b565b91505092915050565b600060c082840312156119265761192561173a565b5b61193060c0611375565b9050600061194084828501611754565b600083015250602061195484828501611754565b602083015250604061196884828501611779565b604083015250606082013567ffffffffffffffff81111561198c5761198b61173f565b5b61199884828501611801565b606083015250608082013567ffffffffffffffff8111156119bc576119bb61173f565b5b6119c884828501611412565b60808301525060a082013567ffffffffffffffff8111156119ec576119eb61173f565b5b6119f8848285016118e2565b60a08301525092915050565b611a0d816114cb565b8114611a1857600080fd5b50565b600081359050611a2a81611a04565b92915050565b600063ffffffff82169050919050565b611a4981611a30565b8114611a5457600080fd5b50565b600081359050611a6681611a40565b92915050565b60008060008060808587031215611a8657611a856112ba565b5b600085013567ffffffffffffffff811115611aa457611aa36112bf565b5b611ab087828801611910565b9450506020611ac187828801611a1b565b9350506040611ad287828801611a57565b9250506060611ae3878288016115c4565b91505092959194509250565b60006bffffffffffffffffffffffff82169050919050565b611b1081611aef565b82525050565b6000602082019050611b2b6000830184611b07565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680611b7857607f821691505b602082108103611b8b57611b8a611b31565b5b50919050565b6000611b9e36848461185b565b905092915050565b611baf816112c4565b82525050565b611bbe816115a3565b82525050565b6000604082019050611bd96000830185611ba6565b611be66020830184611bb5565b9392505050565b6000611c00611bfb84611390565b611375565b905082815260208101848484011115611c1c57611c1b6112ff565b5b611c278482856116b5565b509392505050565b600082601f830112611c4457611c436112fa565b5b8151611c54848260208601611bed565b91505092915050565b600060208284031215611c7357611c726112ba565b5b600082015167ffffffffffffffff811115611c9157611c906112bf565b5b611c9d84828501611c2f565b91505092915050565b611caf81611a30565b82525050565b6000608082019050611cca60008301876114df565b8181036020830152611cdc81866116df565b9050611ceb6040830185611ca6565b611cf86060830184611bb5565b95945050505050565b611d0a81611aef565b8114611d1557600080fd5b50565b600081519050611d2781611d01565b92915050565b600060208284031215611d4357611d426112ba565b5b6000611d5184828501611d18565b91505092915050565b6000602082019050611d6f6000830184611bb5565b92915050565b6000604082019050611d8a6000830185611ba6565b8181036020830152611d9c81846116df565b90509392505050565b6000819050602082019050919050565b6000611dc182516112c4565b80915050919050565b600082821b905092915050565b6000611de282611699565b82611dec84611da5565b9050611df781611db5565b92506020821015611e3757611e327fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff83602003600802611dca565b831692505b5050919050565b6000604082019050611e536000830185611bb5565b611e606020830184611bb5565b9392505050565b6000606082019050611e7c6000830186611ba6565b611e896020830185611bb5565b611e966040830184611bb5565b949350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b6000606082019050611ee260008301866114df565b8181036020830152611ef481856116df565b9050611f036040830184611ca6565b949350505050565b600081519050611f1a816112ce565b92915050565b600060208284031215611f3657611f356112ba565b5b6000611f4484828501611f0b565b91505092915050565b6000611f5882611509565b9050919050565b611f6881611f4d565b8114611f7357600080fd5b50565b600081519050611f8581611f5f565b92915050565b600060208284031215611fa157611fa06112ba565b5b6000611faf84828501611f76565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000612021826115a3565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361205357612052611fe7565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000612098826115a3565b91506120a3836115a3565b9250826120b3576120b261205e565b5b828206905092915050565b60006120c9826115a3565b91506120d4836115a3565b92508282039050818111156120ec576120eb611fe7565b5b92915050565b60006120fd826115a3565b9150612108836115a3565b92508282019050808211156121205761211f611fe7565b5b92915050565b6000612131826115a3565b915061213c836115a3565b925082820261214a816115a3565b9150828204841483151761216157612160611fe7565b5b5092915050565b60008160011c9050919050565b6000808291508390505b60018511156121bf5780860481111561219b5761219a611fe7565b5b60018516156121aa5780820291505b80810290506121b885612168565b945061217f565b94509492505050565b6000826121d85760019050612294565b816121e65760009050612294565b81600181146121fc576002811461220657612235565b6001915050612294565b60ff84111561221857612217611fe7565b5b8360020a91508482111561222f5761222e611fe7565b5b50612294565b5060208310610133831016604e8410600b841016171561226a5782820a90508381111561226557612264611fe7565b5b612294565b6122778484846001612175565b9250905081840481111561228e5761228d611fe7565b5b81810290505b9392505050565b60006122a6826115a3565b91506122b1836115a3565b92506122de7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff84846121c8565b90509291505056fea2646970667358221220f0e5128eccd020b462f0b3486092ce2af3828c269b75acfafbc25112269079ee64736f6c63430008120033";

type PurchaseConsumerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PurchaseConsumerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PurchaseConsumer__factory extends ContractFactory {
  constructor(...args: PurchaseConsumerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _stonksly: PromiseOrValue<string>,
    _subscriptionId: PromiseOrValue<BigNumberish>,
    _requestSource: PromiseOrValue<string>,
    _oracle: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<PurchaseConsumer> {
    return super.deploy(
      _stonksly,
      _subscriptionId,
      _requestSource,
      _oracle,
      overrides || {}
    ) as Promise<PurchaseConsumer>;
  }
  override getDeployTransaction(
    _stonksly: PromiseOrValue<string>,
    _subscriptionId: PromiseOrValue<BigNumberish>,
    _requestSource: PromiseOrValue<string>,
    _oracle: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _stonksly,
      _subscriptionId,
      _requestSource,
      _oracle,
      overrides || {}
    );
  }
  override attach(address: string): PurchaseConsumer {
    return super.attach(address) as PurchaseConsumer;
  }
  override connect(signer: Signer): PurchaseConsumer__factory {
    return super.connect(signer) as PurchaseConsumer__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PurchaseConsumerInterface {
    return new utils.Interface(_abi) as PurchaseConsumerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PurchaseConsumer {
    return new Contract(address, _abi, signerOrProvider) as PurchaseConsumer;
  }
}
