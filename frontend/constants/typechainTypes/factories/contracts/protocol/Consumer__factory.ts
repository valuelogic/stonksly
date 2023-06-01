/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  Consumer,
  ConsumerInterface,
} from "../../../contracts/protocol/Consumer";

const _abi = [
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
        name: "_requestId",
        type: "bytes32",
      },
    ],
    name: "getRequest",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getStonskly",
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
    name: "getSubscriptionId",
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

export class Consumer__factory {
  static readonly abi = _abi;
  static createInterface(): ConsumerInterface {
    return new utils.Interface(_abi) as ConsumerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Consumer {
    return new Contract(address, _abi, signerOrProvider) as Consumer;
  }
}
