/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  FunctionsOracleInterface,
  FunctionsOracleInterfaceInterface,
} from "../../../../contracts/dev/interfaces/FunctionsOracleInterface";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "node",
        type: "address",
      },
    ],
    name: "deleteNodePublicKey",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "subscriptionId",
        type: "uint64",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
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
    name: "getAllNodePublicKeys",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
      {
        internalType: "bytes[]",
        name: "",
        type: "bytes[]",
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
    inputs: [],
    name: "getRegistry",
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
    inputs: [
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        components: [
          {
            internalType: "uint64",
            name: "subscriptionId",
            type: "uint64",
          },
          {
            internalType: "address",
            name: "client",
            type: "address",
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
        internalType: "struct FunctionsBillingRegistryInterface.RequestBilling",
        name: "billing",
        type: "tuple",
      },
    ],
    name: "getRequiredFee",
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
    inputs: [
      {
        internalType: "uint64",
        name: "subscriptionId",
        type: "uint64",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "uint32",
        name: "gasLimit",
        type: "uint32",
      },
    ],
    name: "sendRequest",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "donPublicKey",
        type: "bytes",
      },
    ],
    name: "setDONPublicKey",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "node",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "publicKey",
        type: "bytes",
      },
    ],
    name: "setNodePublicKey",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "registryAddress",
        type: "address",
      },
    ],
    name: "setRegistry",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class FunctionsOracleInterface__factory {
  static readonly abi = _abi;
  static createInterface(): FunctionsOracleInterfaceInterface {
    return new utils.Interface(_abi) as FunctionsOracleInterfaceInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): FunctionsOracleInterface {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as FunctionsOracleInterface;
  }
}
