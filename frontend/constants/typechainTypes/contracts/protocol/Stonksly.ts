/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export declare namespace IStonksly {
  export type RequestStruct = {
    requestType: PromiseOrValue<BigNumberish>;
    status: PromiseOrValue<BigNumberish>;
    account: PromiseOrValue<string>;
    sToken: PromiseOrValue<string>;
    amount: PromiseOrValue<BigNumberish>;
    id: PromiseOrValue<BigNumberish>;
  };

  export type RequestStructOutput = [
    number,
    number,
    string,
    string,
    BigNumber,
    BigNumber
  ] & {
    requestType: number;
    status: number;
    account: string;
    sToken: string;
    amount: BigNumber;
    id: BigNumber;
  };
}

export interface StonkslyInterface extends utils.Interface {
  functions: {
    "addLiquidity()": FunctionFragment;
    "createSToken(string,string,string)": FunctionFragment;
    "emergencyRefund(uint256)": FunctionFragment;
    "finalizePurchase(uint256,uint256)": FunctionFragment;
    "finalizeSale(uint256,uint256)": FunctionFragment;
    "getCollectedFees()": FunctionFragment;
    "getLiquidity(address)": FunctionFragment;
    "getPurchaseConsumer()": FunctionFragment;
    "getRequest(uint256)": FunctionFragment;
    "getSaleConsumer()": FunctionFragment;
    "initPurchase(address)": FunctionFragment;
    "initSale(address,uint256)": FunctionFragment;
    "isPurchasable(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "removeLiquidity(uint256)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setPurchaseConsumer(address)": FunctionFragment;
    "setSaleConsumer(address)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "undoPurchase(uint256)": FunctionFragment;
    "undoSale(uint256)": FunctionFragment;
    "withdrawFees()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "addLiquidity"
      | "createSToken"
      | "emergencyRefund"
      | "finalizePurchase"
      | "finalizeSale"
      | "getCollectedFees"
      | "getLiquidity"
      | "getPurchaseConsumer"
      | "getRequest"
      | "getSaleConsumer"
      | "initPurchase"
      | "initSale"
      | "isPurchasable"
      | "owner"
      | "removeLiquidity"
      | "renounceOwnership"
      | "setPurchaseConsumer"
      | "setSaleConsumer"
      | "transferOwnership"
      | "undoPurchase"
      | "undoSale"
      | "withdrawFees"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "addLiquidity",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "createSToken",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "emergencyRefund",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "finalizePurchase",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "finalizeSale",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getCollectedFees",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getLiquidity",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getPurchaseConsumer",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getRequest",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getSaleConsumer",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "initPurchase",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "initSale",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "isPurchasable",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "removeLiquidity",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setPurchaseConsumer",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setSaleConsumer",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "undoPurchase",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "undoSale",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawFees",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "addLiquidity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createSToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "emergencyRefund",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "finalizePurchase",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "finalizeSale",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCollectedFees",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getLiquidity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPurchaseConsumer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getRequest", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getSaleConsumer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "initPurchase",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initSale", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isPurchasable",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "removeLiquidity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setPurchaseConsumer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setSaleConsumer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "undoPurchase",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "undoSale", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawFees",
    data: BytesLike
  ): Result;

  events: {
    "FeesCollected(uint256)": EventFragment;
    "LiquidityProvided(address,uint256)": EventFragment;
    "LiquidityRemoved(address,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "RequestCompleted(uint256,uint8,address,address,uint256,uint256)": EventFragment;
    "RequestCreated(uint256,uint8,address,address,uint256)": EventFragment;
    "RequestRefunded(uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "FeesCollected"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LiquidityProvided"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LiquidityRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RequestCompleted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RequestCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RequestRefunded"): EventFragment;
}

export interface FeesCollectedEventObject {
  amount: BigNumber;
}
export type FeesCollectedEvent = TypedEvent<
  [BigNumber],
  FeesCollectedEventObject
>;

export type FeesCollectedEventFilter = TypedEventFilter<FeesCollectedEvent>;

export interface LiquidityProvidedEventObject {
  who: string;
  amount: BigNumber;
}
export type LiquidityProvidedEvent = TypedEvent<
  [string, BigNumber],
  LiquidityProvidedEventObject
>;

export type LiquidityProvidedEventFilter =
  TypedEventFilter<LiquidityProvidedEvent>;

export interface LiquidityRemovedEventObject {
  who: string;
  amount: BigNumber;
}
export type LiquidityRemovedEvent = TypedEvent<
  [string, BigNumber],
  LiquidityRemovedEventObject
>;

export type LiquidityRemovedEventFilter =
  TypedEventFilter<LiquidityRemovedEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface RequestCompletedEventObject {
  id: BigNumber;
  requestType: number;
  account: string;
  sToken: string;
  sTokenAmount: BigNumber;
  maticAmount: BigNumber;
}
export type RequestCompletedEvent = TypedEvent<
  [BigNumber, number, string, string, BigNumber, BigNumber],
  RequestCompletedEventObject
>;

export type RequestCompletedEventFilter =
  TypedEventFilter<RequestCompletedEvent>;

export interface RequestCreatedEventObject {
  id: BigNumber;
  requestType: number;
  accout: string;
  sToken: string;
  payment: BigNumber;
}
export type RequestCreatedEvent = TypedEvent<
  [BigNumber, number, string, string, BigNumber],
  RequestCreatedEventObject
>;

export type RequestCreatedEventFilter = TypedEventFilter<RequestCreatedEvent>;

export interface RequestRefundedEventObject {
  id: BigNumber;
}
export type RequestRefundedEvent = TypedEvent<
  [BigNumber],
  RequestRefundedEventObject
>;

export type RequestRefundedEventFilter = TypedEventFilter<RequestRefundedEvent>;

export interface Stonksly extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: StonkslyInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    addLiquidity(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    createSToken(
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      _assetSymbol: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    emergencyRefund(
      _requestId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    finalizePurchase(
      _requestId: PromiseOrValue<BigNumberish>,
      _assetPrice: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    finalizeSale(
      _requestId: PromiseOrValue<BigNumberish>,
      _assetPrice: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getCollectedFees(overrides?: CallOverrides): Promise<[BigNumber]>;

    getLiquidity(
      _provider: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getPurchaseConsumer(overrides?: CallOverrides): Promise<[string]>;

    getRequest(
      _id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[IStonksly.RequestStructOutput]>;

    getSaleConsumer(overrides?: CallOverrides): Promise<[string]>;

    initPurchase(
      _sToken: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    initSale(
      _sToken: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    isPurchasable(
      _sToken: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    removeLiquidity(
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setPurchaseConsumer(
      _purchaseConsumer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setSaleConsumer(
      _saleConsumer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    undoPurchase(
      _requestId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    undoSale(
      _requestId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdrawFees(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  addLiquidity(
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  createSToken(
    _name: PromiseOrValue<string>,
    _symbol: PromiseOrValue<string>,
    _assetSymbol: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  emergencyRefund(
    _requestId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  finalizePurchase(
    _requestId: PromiseOrValue<BigNumberish>,
    _assetPrice: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  finalizeSale(
    _requestId: PromiseOrValue<BigNumberish>,
    _assetPrice: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getCollectedFees(overrides?: CallOverrides): Promise<BigNumber>;

  getLiquidity(
    _provider: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getPurchaseConsumer(overrides?: CallOverrides): Promise<string>;

  getRequest(
    _id: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<IStonksly.RequestStructOutput>;

  getSaleConsumer(overrides?: CallOverrides): Promise<string>;

  initPurchase(
    _sToken: PromiseOrValue<string>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  initSale(
    _sToken: PromiseOrValue<string>,
    _amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  isPurchasable(
    _sToken: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  owner(overrides?: CallOverrides): Promise<string>;

  removeLiquidity(
    _amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setPurchaseConsumer(
    _purchaseConsumer: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setSaleConsumer(
    _saleConsumer: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  undoPurchase(
    _requestId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  undoSale(
    _requestId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdrawFees(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addLiquidity(overrides?: CallOverrides): Promise<void>;

    createSToken(
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      _assetSymbol: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    emergencyRefund(
      _requestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    finalizePurchase(
      _requestId: PromiseOrValue<BigNumberish>,
      _assetPrice: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    finalizeSale(
      _requestId: PromiseOrValue<BigNumberish>,
      _assetPrice: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    getCollectedFees(overrides?: CallOverrides): Promise<BigNumber>;

    getLiquidity(
      _provider: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPurchaseConsumer(overrides?: CallOverrides): Promise<string>;

    getRequest(
      _id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<IStonksly.RequestStructOutput>;

    getSaleConsumer(overrides?: CallOverrides): Promise<string>;

    initPurchase(
      _sToken: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    initSale(
      _sToken: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    isPurchasable(
      _sToken: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    owner(overrides?: CallOverrides): Promise<string>;

    removeLiquidity(
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setPurchaseConsumer(
      _purchaseConsumer: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setSaleConsumer(
      _saleConsumer: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    undoPurchase(
      _requestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    undoSale(
      _requestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawFees(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "FeesCollected(uint256)"(amount?: null): FeesCollectedEventFilter;
    FeesCollected(amount?: null): FeesCollectedEventFilter;

    "LiquidityProvided(address,uint256)"(
      who?: null,
      amount?: null
    ): LiquidityProvidedEventFilter;
    LiquidityProvided(who?: null, amount?: null): LiquidityProvidedEventFilter;

    "LiquidityRemoved(address,uint256)"(
      who?: null,
      amount?: null
    ): LiquidityRemovedEventFilter;
    LiquidityRemoved(who?: null, amount?: null): LiquidityRemovedEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;

    "RequestCompleted(uint256,uint8,address,address,uint256,uint256)"(
      id?: null,
      requestType?: null,
      account?: null,
      sToken?: null,
      sTokenAmount?: null,
      maticAmount?: null
    ): RequestCompletedEventFilter;
    RequestCompleted(
      id?: null,
      requestType?: null,
      account?: null,
      sToken?: null,
      sTokenAmount?: null,
      maticAmount?: null
    ): RequestCompletedEventFilter;

    "RequestCreated(uint256,uint8,address,address,uint256)"(
      id?: null,
      requestType?: null,
      accout?: null,
      sToken?: null,
      payment?: null
    ): RequestCreatedEventFilter;
    RequestCreated(
      id?: null,
      requestType?: null,
      accout?: null,
      sToken?: null,
      payment?: null
    ): RequestCreatedEventFilter;

    "RequestRefunded(uint256)"(id?: null): RequestRefundedEventFilter;
    RequestRefunded(id?: null): RequestRefundedEventFilter;
  };

  estimateGas: {
    addLiquidity(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    createSToken(
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      _assetSymbol: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    emergencyRefund(
      _requestId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    finalizePurchase(
      _requestId: PromiseOrValue<BigNumberish>,
      _assetPrice: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    finalizeSale(
      _requestId: PromiseOrValue<BigNumberish>,
      _assetPrice: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getCollectedFees(overrides?: CallOverrides): Promise<BigNumber>;

    getLiquidity(
      _provider: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPurchaseConsumer(overrides?: CallOverrides): Promise<BigNumber>;

    getRequest(
      _id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSaleConsumer(overrides?: CallOverrides): Promise<BigNumber>;

    initPurchase(
      _sToken: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    initSale(
      _sToken: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    isPurchasable(
      _sToken: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    removeLiquidity(
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setPurchaseConsumer(
      _purchaseConsumer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setSaleConsumer(
      _saleConsumer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    undoPurchase(
      _requestId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    undoSale(
      _requestId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdrawFees(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addLiquidity(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    createSToken(
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      _assetSymbol: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    emergencyRefund(
      _requestId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    finalizePurchase(
      _requestId: PromiseOrValue<BigNumberish>,
      _assetPrice: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    finalizeSale(
      _requestId: PromiseOrValue<BigNumberish>,
      _assetPrice: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getCollectedFees(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getLiquidity(
      _provider: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPurchaseConsumer(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRequest(
      _id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSaleConsumer(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    initPurchase(
      _sToken: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    initSale(
      _sToken: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    isPurchasable(
      _sToken: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    removeLiquidity(
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setPurchaseConsumer(
      _purchaseConsumer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setSaleConsumer(
      _saleConsumer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    undoPurchase(
      _requestId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    undoSale(
      _requestId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdrawFees(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
