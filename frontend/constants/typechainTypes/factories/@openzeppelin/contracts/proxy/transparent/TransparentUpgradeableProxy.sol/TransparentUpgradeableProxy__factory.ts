/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  PayableOverrides,
  BytesLike,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../../common";
import type {
  TransparentUpgradeableProxy,
  TransparentUpgradeableProxyInterface,
} from "../../../../../../@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol/TransparentUpgradeableProxy";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_logic",
        type: "address",
      },
      {
        internalType: "address",
        name: "admin_",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beacon",
        type: "address",
      },
    ],
    name: "BeaconUpgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x608060405260405162001a5438038062001a5483398181016040528101906200002991906200072f565b82816200003f828260006200005b60201b60201c565b505062000052826200009960201b60201c565b50505062000a71565b6200006c83620000f760201b60201c565b6000825111806200007a5750805b1562000094576200009283836200014e60201b60201c565b505b505050565b7f7e644d79422f17c01e4894b5f4f588d331ebfa28653d42ae832dc59e38c9798f620000ca6200018460201b60201c565b82604051620000db929190620007bb565b60405180910390a1620000f481620001e360201b60201c565b50565b6200010881620002ce60201b60201c565b8073ffffffffffffffffffffffffffffffffffffffff167fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b60405160405180910390a250565b60606200017c838360405180606001604052806027815260200162001a2d602791396200039a60201b60201c565b905092915050565b6000620001ba7fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d610360001b6200042c60201b60201c565b60000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160362000255576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200024c906200086f565b60405180910390fd5b806200028a7fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d610360001b6200042c60201b60201c565b60000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b620002df816200043660201b60201c565b62000321576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620003189062000907565b60405180910390fd5b80620003567f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b6200042c60201b60201c565b60000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60606000808573ffffffffffffffffffffffffffffffffffffffff1685604051620003c6919062000976565b600060405180830381855af49150503d806000811462000403576040519150601f19603f3d011682016040523d82523d6000602084013e62000408565b606091505b509150915062000421868383876200045960201b60201c565b925050509392505050565b6000819050919050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b60608315620004c9576000835103620004c0576200047d856200043660201b60201c565b620004bf576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620004b690620009df565b60405180910390fd5b5b829050620004dc565b620004db8383620004e460201b60201c565b5b949350505050565b600082511115620004f85781518083602001fd5b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200052e919062000a4d565b60405180910390fd5b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600062000578826200054b565b9050919050565b6200058a816200056b565b81146200059657600080fd5b50565b600081519050620005aa816200057f565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6200060582620005ba565b810181811067ffffffffffffffff82111715620006275762000626620005cb565b5b80604052505050565b60006200063c62000537565b90506200064a8282620005fa565b919050565b600067ffffffffffffffff8211156200066d576200066c620005cb565b5b6200067882620005ba565b9050602081019050919050565b60005b83811015620006a557808201518184015260208101905062000688565b60008484015250505050565b6000620006c8620006c2846200064f565b62000630565b905082815260208101848484011115620006e757620006e6620005b5565b5b620006f484828562000685565b509392505050565b600082601f830112620007145762000713620005b0565b5b815162000726848260208601620006b1565b91505092915050565b6000806000606084860312156200074b576200074a62000541565b5b60006200075b8682870162000599565b93505060206200076e8682870162000599565b925050604084015167ffffffffffffffff81111562000792576200079162000546565b5b620007a086828701620006fc565b9150509250925092565b620007b5816200056b565b82525050565b6000604082019050620007d26000830185620007aa565b620007e16020830184620007aa565b9392505050565b600082825260208201905092915050565b7f455243313936373a206e65772061646d696e20697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b600062000857602683620007e8565b91506200086482620007f9565b604082019050919050565b600060208201905081810360008301526200088a8162000848565b9050919050565b7f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60008201527f6f74206120636f6e747261637400000000000000000000000000000000000000602082015250565b6000620008ef602d83620007e8565b9150620008fc8262000891565b604082019050919050565b600060208201905081810360008301526200092281620008e0565b9050919050565b600081519050919050565b600081905092915050565b60006200094c8262000929565b62000958818562000934565b93506200096a81856020860162000685565b80840191505092915050565b60006200098482846200093f565b915081905092915050565b7f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000600082015250565b6000620009c7601d83620007e8565b9150620009d4826200098f565b602082019050919050565b60006020820190508181036000830152620009fa81620009b8565b9050919050565b600081519050919050565b600062000a198262000a01565b62000a258185620007e8565b935062000a3781856020860162000685565b62000a4281620005ba565b840191505092915050565b6000602082019050818103600083015262000a69818462000a0c565b905092915050565b610fac8062000a816000396000f3fe6080604052366100135761001161001d565b005b61001b61001d565b005b610025610299565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff160361028f576060600080357fffffffff00000000000000000000000000000000000000000000000000000000169050633659cfe660e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916036100dc576100d56102f0565b9150610287565b634f1ef28660e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916036101375761013061034f565b9150610286565b638f28397060e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916036101925761018b61039c565b9150610285565b63f851a44060e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916036101ed576101e66103e9565b9150610284565b635c60da1b60e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19160361024857610241610425565b9150610283565b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161027a906109c6565b60405180910390fd5b5b5b5b5b815160208301f35b610297610461565b565b60006102c77fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d610360001b61047b565b60000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60606102fa610485565b60008036600490809261030f939291906109fa565b81019061031c9190610a9d565b905061033981604051806020016040528060008152506000610494565b6040518060200160405280600081525091505090565b60606000806000366004908092610368939291906109fa565b8101906103759190610c10565b9150915061038582826001610494565b604051806020016040528060008152509250505090565b60606103a6610485565b6000803660049080926103bb939291906109fa565b8101906103c89190610a9d565b90506103d3816104c0565b6040518060200160405280600081525091505090565b60606103f3610485565b60006103fd610299565b9050806040516020016104109190610c8d565b60405160208183030381529060405291505090565b606061042f610485565b600061043961050c565b90508060405160200161044c9190610c8d565b60405160208183030381529060405291505090565b61046961051b565b61047961047461050c565b61051d565b565b6000819050919050565b6000341461049257600080fd5b565b61049d83610543565b6000825111806104aa5750805b156104bb576104b98383610592565b505b505050565b7f7e644d79422f17c01e4894b5f4f588d331ebfa28653d42ae832dc59e38c9798f6104e9610299565b826040516104f8929190610ca8565b60405180910390a1610509816105bf565b50565b600061051661069f565b905090565b565b3660008037600080366000845af43d6000803e806000811461053e573d6000f35b3d6000fd5b61054c816106f6565b8073ffffffffffffffffffffffffffffffffffffffff167fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b60405160405180910390a250565b60606105b78383604051806060016040528060278152602001610f50602791396107af565b905092915050565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361062e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161062590610d43565b60405180910390fd5b8061065b7fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d610360001b61047b565b60000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60006106cd7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b61047b565b60000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6106ff81610835565b61073e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161073590610dd5565b60405180910390fd5b8061076b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b61047b565b60000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60606000808573ffffffffffffffffffffffffffffffffffffffff16856040516107d99190610e66565b600060405180830381855af49150503d8060008114610814576040519150601f19603f3d011682016040523d82523d6000602084013e610819565b606091505b509150915061082a86838387610858565b925050509392505050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b606083156108ba5760008351036108b25761087285610835565b6108b1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108a890610ec9565b60405180910390fd5b5b8290506108c5565b6108c483836108cd565b5b949350505050565b6000825111156108e05781518083602001fd5b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109149190610f2d565b60405180910390fd5b600082825260208201905092915050565b7f5472616e73706172656e745570677261646561626c6550726f78793a2061646d60008201527f696e2063616e6e6f742066616c6c6261636b20746f2070726f7879207461726760208201527f6574000000000000000000000000000000000000000000000000000000000000604082015250565b60006109b060428361091d565b91506109bb8261092e565b606082019050919050565b600060208201905081810360008301526109df816109a3565b9050919050565b6000604051905090565b600080fd5b600080fd5b60008085851115610a0e57610a0d6109f0565b5b83861115610a1f57610a1e6109f5565b5b6001850283019150848603905094509492505050565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610a6a82610a3f565b9050919050565b610a7a81610a5f565b8114610a8557600080fd5b50565b600081359050610a9781610a71565b92915050565b600060208284031215610ab357610ab2610a35565b5b6000610ac184828501610a88565b91505092915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610b1d82610ad4565b810181811067ffffffffffffffff82111715610b3c57610b3b610ae5565b5b80604052505050565b6000610b4f6109e6565b9050610b5b8282610b14565b919050565b600067ffffffffffffffff821115610b7b57610b7a610ae5565b5b610b8482610ad4565b9050602081019050919050565b82818337600083830152505050565b6000610bb3610bae84610b60565b610b45565b905082815260208101848484011115610bcf57610bce610acf565b5b610bda848285610b91565b509392505050565b600082601f830112610bf757610bf6610aca565b5b8135610c07848260208601610ba0565b91505092915050565b60008060408385031215610c2757610c26610a35565b5b6000610c3585828601610a88565b925050602083013567ffffffffffffffff811115610c5657610c55610a3a565b5b610c6285828601610be2565b9150509250929050565b6000610c7782610a3f565b9050919050565b610c8781610c6c565b82525050565b6000602082019050610ca26000830184610c7e565b92915050565b6000604082019050610cbd6000830185610c7e565b610cca6020830184610c7e565b9392505050565b7f455243313936373a206e65772061646d696e20697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b6000610d2d60268361091d565b9150610d3882610cd1565b604082019050919050565b60006020820190508181036000830152610d5c81610d20565b9050919050565b7f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60008201527f6f74206120636f6e747261637400000000000000000000000000000000000000602082015250565b6000610dbf602d8361091d565b9150610dca82610d63565b604082019050919050565b60006020820190508181036000830152610dee81610db2565b9050919050565b600081519050919050565b600081905092915050565b60005b83811015610e29578082015181840152602081019050610e0e565b60008484015250505050565b6000610e4082610df5565b610e4a8185610e00565b9350610e5a818560208601610e0b565b80840191505092915050565b6000610e728284610e35565b915081905092915050565b7f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000600082015250565b6000610eb3601d8361091d565b9150610ebe82610e7d565b602082019050919050565b60006020820190508181036000830152610ee281610ea6565b9050919050565b600081519050919050565b6000610eff82610ee9565b610f09818561091d565b9350610f19818560208601610e0b565b610f2281610ad4565b840191505092915050565b60006020820190508181036000830152610f478184610ef4565b90509291505056fe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a2646970667358221220148d0bb1366ee1c2f878ad97f7f4a1cd5c90f48b30a0b33b71a5da74d7904ee364736f6c63430008130033416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564";

type TransparentUpgradeableProxyConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TransparentUpgradeableProxyConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TransparentUpgradeableProxy__factory extends ContractFactory {
  constructor(...args: TransparentUpgradeableProxyConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _logic: PromiseOrValue<string>,
    admin_: PromiseOrValue<string>,
    _data: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<TransparentUpgradeableProxy> {
    return super.deploy(
      _logic,
      admin_,
      _data,
      overrides || {}
    ) as Promise<TransparentUpgradeableProxy>;
  }
  override getDeployTransaction(
    _logic: PromiseOrValue<string>,
    admin_: PromiseOrValue<string>,
    _data: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_logic, admin_, _data, overrides || {});
  }
  override attach(address: string): TransparentUpgradeableProxy {
    return super.attach(address) as TransparentUpgradeableProxy;
  }
  override connect(signer: Signer): TransparentUpgradeableProxy__factory {
    return super.connect(signer) as TransparentUpgradeableProxy__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TransparentUpgradeableProxyInterface {
    return new utils.Interface(_abi) as TransparentUpgradeableProxyInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TransparentUpgradeableProxy {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as TransparentUpgradeableProxy;
  }
}
