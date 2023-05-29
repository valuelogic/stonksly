/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  STokenManager,
  STokenManagerInterface,
} from "../../../contracts/protocol/STokenManager";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "assetSymbol",
        type: "string",
      },
    ],
    name: "STokenCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
      {
        internalType: "string",
        name: "_assetSymbol",
        type: "string",
      },
    ],
    name: "deploySToken",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getSTokens",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "sToken",
            type: "address",
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string",
          },
          {
            internalType: "string",
            name: "assetSymbol",
            type: "string",
          },
        ],
        internalType: "struct STokenManager.STokenWithData[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5061002d61002261003260201b60201c565b61003a60201b60201c565b6100fe565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6132bd8061010d6000396000f3fe60806040523480156200001157600080fd5b50600436106200005e5760003560e01c80633e509b58146200006357806341d961931462000085578063715018a614620000bb5780638da5cb5b14620000c7578063f2fde38b14620000e9575b600080fd5b6200006d62000109565b6040516200007c919062000961565b60405180910390f35b620000a360048036038101906200009d919062000aea565b62000385565b604051620000b2919062000bb4565b60405180910390f35b620000c5620004f4565b005b620000d16200050c565b604051620000e0919062000bb4565b60405180910390f35b62000107600480360381019062000101919062000c02565b62000535565b005b6060600060018054806020026020016040519081016040528092919081815260200182805480156200019157602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001906001019080831162000146575b505050505090506000815167ffffffffffffffff811115620001b857620001b7620009a3565b5b604051908082528060200260200182016040528015620001f557816020015b620001e162000710565b815260200190600190039081620001d75790505b50905060005b82518110156200037c5760008382815181106200021d576200021c62000c34565b5b6020026020010151905060405180606001604052808273ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff166395d89b416040518163ffffffff1660e01b8152600401600060405180830381865afa1580156200029a573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f82011682018060405250810190620002c5919062000ce1565b81526020018273ffffffffffffffffffffffffffffffffffffffff166356ca72fe6040518163ffffffff1660e01b8152600401600060405180830381865afa15801562000316573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f8201168201806040525081019062000341919062000ce1565b8152508383815181106200035a576200035962000c34565b5b6020026020010181905250508080620003739062000d6b565b915050620001fb565b50809250505090565b600062000391620005bf565b6000848484604051620003a49062000747565b620003b29392919062000e0a565b604051809103906000f080158015620003cf573d6000803e3d6000fd5b5090508073ffffffffffffffffffffffffffffffffffffffff1663f2fde38b336040518263ffffffff1660e01b81526004016200040d919062000bb4565b600060405180830381600087803b1580156200042857600080fd5b505af11580156200043d573d6000803e3d6000fd5b5050505060008190506001819080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f1f5dbee3bb88d9a3256e6e845571dbba2af9662d281f9d027d62a6a3ef58508b81878787604051620004e0949392919062000e5c565b60405180910390a180925050509392505050565b620004fe620005bf565b6200050a600062000644565b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6200053f620005bf565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603620005b1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620005a89062000f34565b60405180910390fd5b620005bc8162000644565b50565b620005c962000708565b73ffffffffffffffffffffffffffffffffffffffff16620005e96200050c565b73ffffffffffffffffffffffffffffffffffffffff161462000642576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620006399062000fa6565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600033905090565b6040518060600160405280600073ffffffffffffffffffffffffffffffffffffffff16815260200160608152602001606081525090565b6122bf8062000fc983390190565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620007ae8262000781565b9050919050565b620007c081620007a1565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b8381101562000802578082015181840152602081019050620007e5565b60008484015250505050565b6000601f19601f8301169050919050565b60006200082c82620007c6565b620008388185620007d1565b93506200084a818560208601620007e2565b62000855816200080e565b840191505092915050565b60006060830160008301516200087a6000860182620007b5565b50602083015184820360208601526200089482826200081f565b91505060408301518482036040860152620008b082826200081f565b9150508091505092915050565b6000620008cb838362000860565b905092915050565b6000602082019050919050565b6000620008ed8262000755565b620008f9818562000760565b9350836020820285016200090d8562000771565b8060005b858110156200094f57848403895281516200092d8582620008bd565b94506200093a83620008d3565b925060208a0199505060018101905062000911565b50829750879550505050505092915050565b600060208201905081810360008301526200097d8184620008e0565b905092915050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620009dd826200080e565b810181811067ffffffffffffffff82111715620009ff57620009fe620009a3565b5b80604052505050565b600062000a1462000985565b905062000a228282620009d2565b919050565b600067ffffffffffffffff82111562000a455762000a44620009a3565b5b62000a50826200080e565b9050602081019050919050565b82818337600083830152505050565b600062000a8362000a7d8462000a27565b62000a08565b90508281526020810184848401111562000aa25762000aa16200099e565b5b62000aaf84828562000a5d565b509392505050565b600082601f83011262000acf5762000ace62000999565b5b813562000ae184826020860162000a6c565b91505092915050565b60008060006060848603121562000b065762000b056200098f565b5b600084013567ffffffffffffffff81111562000b275762000b2662000994565b5b62000b358682870162000ab7565b935050602084013567ffffffffffffffff81111562000b595762000b5862000994565b5b62000b678682870162000ab7565b925050604084013567ffffffffffffffff81111562000b8b5762000b8a62000994565b5b62000b998682870162000ab7565b9150509250925092565b62000bae81620007a1565b82525050565b600060208201905062000bcb600083018462000ba3565b92915050565b62000bdc81620007a1565b811462000be857600080fd5b50565b60008135905062000bfc8162000bd1565b92915050565b60006020828403121562000c1b5762000c1a6200098f565b5b600062000c2b8482850162000beb565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600062000c7a62000c748462000a27565b62000a08565b90508281526020810184848401111562000c995762000c986200099e565b5b62000ca6848285620007e2565b509392505050565b600082601f83011262000cc65762000cc562000999565b5b815162000cd884826020860162000c63565b91505092915050565b60006020828403121562000cfa5762000cf96200098f565b5b600082015167ffffffffffffffff81111562000d1b5762000d1a62000994565b5b62000d298482850162000cae565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000819050919050565b600062000d788262000d61565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820362000dad5762000dac62000d32565b5b600182019050919050565b600082825260208201905092915050565b600062000dd682620007c6565b62000de2818562000db8565b935062000df4818560208601620007e2565b62000dff816200080e565b840191505092915050565b6000606082019050818103600083015262000e26818662000dc9565b9050818103602083015262000e3c818562000dc9565b9050818103604083015262000e52818462000dc9565b9050949350505050565b600060808201905062000e73600083018762000ba3565b818103602083015262000e87818662000dc9565b9050818103604083015262000e9d818562000dc9565b9050818103606083015262000eb3818462000dc9565b905095945050505050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b600062000f1c60268362000db8565b915062000f298262000ebe565b604082019050919050565b6000602082019050818103600083015262000f4f8162000f0d565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b600062000f8e60208362000db8565b915062000f9b8262000f56565b602082019050919050565b6000602082019050818103600083015262000fc18162000f7f565b905091905056fe60806040523480156200001157600080fd5b50604051620022bf380380620022bf8339818101604052810190620000379190620002fb565b828281600390816200004a9190620005ff565b5080600490816200005c9190620005ff565b5050506200007f620000736200009a60201b60201c565b620000a260201b60201c565b8060069081620000909190620005ff565b50505050620006e6565b600033905090565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620001d18262000186565b810181811067ffffffffffffffff82111715620001f357620001f262000197565b5b80604052505050565b60006200020862000168565b9050620002168282620001c6565b919050565b600067ffffffffffffffff82111562000239576200023862000197565b5b620002448262000186565b9050602081019050919050565b60005b838110156200027157808201518184015260208101905062000254565b60008484015250505050565b6000620002946200028e846200021b565b620001fc565b905082815260208101848484011115620002b357620002b262000181565b5b620002c084828562000251565b509392505050565b600082601f830112620002e057620002df6200017c565b5b8151620002f28482602086016200027d565b91505092915050565b60008060006060848603121562000317576200031662000172565b5b600084015167ffffffffffffffff81111562000338576200033762000177565b5b6200034686828701620002c8565b935050602084015167ffffffffffffffff8111156200036a576200036962000177565b5b6200037886828701620002c8565b925050604084015167ffffffffffffffff8111156200039c576200039b62000177565b5b620003aa86828701620002c8565b9150509250925092565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200040757607f821691505b6020821081036200041d576200041c620003bf565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620004877fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8262000448565b62000493868362000448565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b6000620004e0620004da620004d484620004ab565b620004b5565b620004ab565b9050919050565b6000819050919050565b620004fc83620004bf565b620005146200050b82620004e7565b84845462000455565b825550505050565b600090565b6200052b6200051c565b62000538818484620004f1565b505050565b5b8181101562000560576200055460008262000521565b6001810190506200053e565b5050565b601f821115620005af57620005798162000423565b620005848462000438565b8101602085101562000594578190505b620005ac620005a38562000438565b8301826200053d565b50505b505050565b600082821c905092915050565b6000620005d460001984600802620005b4565b1980831691505092915050565b6000620005ef8383620005c1565b9150826002028217905092915050565b6200060a82620003b4565b67ffffffffffffffff81111562000626576200062562000197565b5b620006328254620003ee565b6200063f82828562000564565b600060209050601f83116001811462000677576000841562000662578287015190505b6200066e8582620005e1565b865550620006de565b601f198416620006878662000423565b60005b82811015620006b1578489015182556001820191506020850194506020810190506200068a565b86831015620006d15784890151620006cd601f891682620005c1565b8355505b6001600288020188555050505b505050505050565b611bc980620006f66000396000f3fe608060405234801561001057600080fd5b506004361061010b5760003560e01c806370a08231116100a25780639dc29fac116100715780639dc29fac146102aa578063a457c2d7146102c6578063a9059cbb146102f6578063dd62ed3e14610326578063f2fde38b146103565761010b565b806370a0823114610234578063715018a6146102645780638da5cb5b1461026e57806395d89b411461028c5761010b565b8063313ce567116100de578063313ce567146101ac57806339509351146101ca57806340c10f19146101fa57806356ca72fe146102165761010b565b806306fdde0314610110578063095ea7b31461012e57806318160ddd1461015e57806323b872dd1461017c575b600080fd5b610118610372565b60405161012591906111ee565b60405180910390f35b610148600480360381019061014391906112a9565b610404565b6040516101559190611304565b60405180910390f35b610166610427565b604051610173919061132e565b60405180910390f35b61019660048036038101906101919190611349565b610431565b6040516101a39190611304565b60405180910390f35b6101b4610460565b6040516101c191906113b8565b60405180910390f35b6101e460048036038101906101df91906112a9565b610469565b6040516101f19190611304565b60405180910390f35b610214600480360381019061020f91906112a9565b6104a0565b005b61021e6104b6565b60405161022b91906111ee565b60405180910390f35b61024e600480360381019061024991906113d3565b610548565b60405161025b919061132e565b60405180910390f35b61026c610590565b005b6102766105a4565b604051610283919061140f565b60405180910390f35b6102946105ce565b6040516102a191906111ee565b60405180910390f35b6102c460048036038101906102bf91906112a9565b610660565b005b6102e060048036038101906102db91906112a9565b610676565b6040516102ed9190611304565b60405180910390f35b610310600480360381019061030b91906112a9565b6106ed565b60405161031d9190611304565b60405180910390f35b610340600480360381019061033b919061142a565b610710565b60405161034d919061132e565b60405180910390f35b610370600480360381019061036b91906113d3565b610797565b005b60606003805461038190611499565b80601f01602080910402602001604051908101604052809291908181526020018280546103ad90611499565b80156103fa5780601f106103cf576101008083540402835291602001916103fa565b820191906000526020600020905b8154815290600101906020018083116103dd57829003601f168201915b5050505050905090565b60008061040f61081a565b905061041c818585610822565b600191505092915050565b6000600254905090565b60008061043c61081a565b90506104498582856109eb565b610454858585610a77565b60019150509392505050565b60006012905090565b60008061047461081a565b90506104958185856104868589610710565b61049091906114f9565b610822565b600191505092915050565b6104a8610ced565b6104b28282610d6b565b5050565b6060600680546104c590611499565b80601f01602080910402602001604051908101604052809291908181526020018280546104f190611499565b801561053e5780601f106105135761010080835404028352916020019161053e565b820191906000526020600020905b81548152906001019060200180831161052157829003601f168201915b5050505050905090565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b610598610ced565b6105a26000610ec1565b565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6060600480546105dd90611499565b80601f016020809104026020016040519081016040528092919081815260200182805461060990611499565b80156106565780601f1061062b57610100808354040283529160200191610656565b820191906000526020600020905b81548152906001019060200180831161063957829003601f168201915b5050505050905090565b610668610ced565b6106728282610f87565b5050565b60008061068161081a565b9050600061068f8286610710565b9050838110156106d4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106cb9061159f565b60405180910390fd5b6106e18286868403610822565b60019250505092915050565b6000806106f861081a565b9050610705818585610a77565b600191505092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b61079f610ced565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361080e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161080590611631565b60405180910390fd5b61081781610ec1565b50565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610891576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610888906116c3565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610900576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108f790611755565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925836040516109de919061132e565b60405180910390a3505050565b60006109f78484610710565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8114610a715781811015610a63576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a5a906117c1565b60405180910390fd5b610a708484848403610822565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610ae6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610add90611853565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610b55576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b4c906118e5565b60405180910390fd5b610b60838383611154565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610be6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bdd90611977565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610cd4919061132e565b60405180910390a3610ce7848484611159565b50505050565b610cf561081a565b73ffffffffffffffffffffffffffffffffffffffff16610d136105a4565b73ffffffffffffffffffffffffffffffffffffffff1614610d69576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d60906119e3565b60405180910390fd5b565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610dda576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610dd190611a4f565b60405180910390fd5b610de660008383611154565b8060026000828254610df891906114f9565b92505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610ea9919061132e565b60405180910390a3610ebd60008383611159565b5050565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610ff6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610fed90611ae1565b60405180910390fd5b61100282600083611154565b60008060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015611088576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161107f90611b73565b60405180910390fd5b8181036000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555081600260008282540392505081905550600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161113b919061132e565b60405180910390a361114f83600084611159565b505050565b505050565b505050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561119857808201518184015260208101905061117d565b60008484015250505050565b6000601f19601f8301169050919050565b60006111c08261115e565b6111ca8185611169565b93506111da81856020860161117a565b6111e3816111a4565b840191505092915050565b6000602082019050818103600083015261120881846111b5565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061124082611215565b9050919050565b61125081611235565b811461125b57600080fd5b50565b60008135905061126d81611247565b92915050565b6000819050919050565b61128681611273565b811461129157600080fd5b50565b6000813590506112a38161127d565b92915050565b600080604083850312156112c0576112bf611210565b5b60006112ce8582860161125e565b92505060206112df85828601611294565b9150509250929050565b60008115159050919050565b6112fe816112e9565b82525050565b600060208201905061131960008301846112f5565b92915050565b61132881611273565b82525050565b6000602082019050611343600083018461131f565b92915050565b60008060006060848603121561136257611361611210565b5b60006113708682870161125e565b93505060206113818682870161125e565b925050604061139286828701611294565b9150509250925092565b600060ff82169050919050565b6113b28161139c565b82525050565b60006020820190506113cd60008301846113a9565b92915050565b6000602082840312156113e9576113e8611210565b5b60006113f78482850161125e565b91505092915050565b61140981611235565b82525050565b60006020820190506114246000830184611400565b92915050565b6000806040838503121561144157611440611210565b5b600061144f8582860161125e565b92505060206114608582860161125e565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806114b157607f821691505b6020821081036114c4576114c361146a565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061150482611273565b915061150f83611273565b9250828201905080821115611527576115266114ca565b5b92915050565b7f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760008201527f207a65726f000000000000000000000000000000000000000000000000000000602082015250565b6000611589602583611169565b91506115948261152d565b604082019050919050565b600060208201905081810360008301526115b88161157c565b9050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b600061161b602683611169565b9150611626826115bf565b604082019050919050565b6000602082019050818103600083015261164a8161160e565b9050919050565b7f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b60006116ad602483611169565b91506116b882611651565b604082019050919050565b600060208201905081810360008301526116dc816116a0565b9050919050565b7f45524332303a20617070726f766520746f20746865207a65726f20616464726560008201527f7373000000000000000000000000000000000000000000000000000000000000602082015250565b600061173f602283611169565b915061174a826116e3565b604082019050919050565b6000602082019050818103600083015261176e81611732565b9050919050565b7f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000600082015250565b60006117ab601d83611169565b91506117b682611775565b602082019050919050565b600060208201905081810360008301526117da8161179e565b9050919050565b7f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b600061183d602583611169565b9150611848826117e1565b604082019050919050565b6000602082019050818103600083015261186c81611830565b9050919050565b7f45524332303a207472616e7366657220746f20746865207a65726f206164647260008201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b60006118cf602383611169565b91506118da82611873565b604082019050919050565b600060208201905081810360008301526118fe816118c2565b9050919050565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206260008201527f616c616e63650000000000000000000000000000000000000000000000000000602082015250565b6000611961602683611169565b915061196c82611905565b604082019050919050565b6000602082019050818103600083015261199081611954565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b60006119cd602083611169565b91506119d882611997565b602082019050919050565b600060208201905081810360008301526119fc816119c0565b9050919050565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b6000611a39601f83611169565b9150611a4482611a03565b602082019050919050565b60006020820190508181036000830152611a6881611a2c565b9050919050565b7f45524332303a206275726e2066726f6d20746865207a65726f2061646472657360008201527f7300000000000000000000000000000000000000000000000000000000000000602082015250565b6000611acb602183611169565b9150611ad682611a6f565b604082019050919050565b60006020820190508181036000830152611afa81611abe565b9050919050565b7f45524332303a206275726e20616d6f756e7420657863656564732062616c616e60008201527f6365000000000000000000000000000000000000000000000000000000000000602082015250565b6000611b5d602283611169565b9150611b6882611b01565b604082019050919050565b60006020820190508181036000830152611b8c81611b50565b905091905056fea264697066735822122044b2f8ea90ecd792bc3e423f0f07b19383813abbbe06cb5e0cc3bff3b7a1f2f064736f6c63430008120033a2646970667358221220b51b98aed2f50a7eb7dfbb5a2d2ce46b49f704e002b1f2dd24194c0de5a80f5764736f6c63430008120033";

type STokenManagerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: STokenManagerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class STokenManager__factory extends ContractFactory {
  constructor(...args: STokenManagerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<STokenManager> {
    return super.deploy(overrides || {}) as Promise<STokenManager>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): STokenManager {
    return super.attach(address) as STokenManager;
  }
  override connect(signer: Signer): STokenManager__factory {
    return super.connect(signer) as STokenManager__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): STokenManagerInterface {
    return new utils.Interface(_abi) as STokenManagerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): STokenManager {
    return new Contract(address, _abi, signerOrProvider) as STokenManager;
  }
}
