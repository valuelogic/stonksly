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

export interface StonkslyInterface extends utils.Interface {
  functions: {
    "addLiquidity()": FunctionFragment;
    "createSToken(string,string,string)": FunctionFragment;
    "emergencyRefund(uint256)": FunctionFragment;
    "finalizePurchase(uint256,uint256)": FunctionFragment;
    "finalizeSale(uint256,uint256)": FunctionFragment;
    "getSTokens()": FunctionFragment;
    "initPurchase(address)": FunctionFragment;
    "initSale(address,uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "removeLiquidity(uint256)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "revertPurchase(uint256)": FunctionFragment;
    "revertSale(uint256)": FunctionFragment;
    "s_requests(uint256)": FunctionFragment;
    "setPurchaseConsumer(address)": FunctionFragment;
    "setSaleConsumer(address)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "withdrawFees()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "addLiquidity"
      | "createSToken"
      | "emergencyRefund"
      | "finalizePurchase"
      | "finalizeSale"
      | "getSTokens"
      | "initPurchase"
      | "initSale"
      | "owner"
      | "removeLiquidity"
      | "renounceOwnership"
      | "revertPurchase"
      | "revertSale"
      | "s_requests"
      | "setPurchaseConsumer"
      | "setSaleConsumer"
      | "transferOwnership"
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
    functionFragment: "getSTokens",
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
    functionFragment: "revertPurchase",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "revertSale",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "s_requests",
    values: [PromiseOrValue<BigNumberish>]
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
  decodeFunctionResult(functionFragment: "getSTokens", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "initPurchase",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initSale", data: BytesLike): Result;
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
    functionFragment: "revertPurchase",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "revertSale", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "s_requests", data: BytesLike): Result;
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
    functionFragment: "withdrawFees",
    data: BytesLike
  ): Result;

  events: {
    "LiquidityProvided(address,uint256)": EventFragment;
    "LiquidityWithdrawn(address,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "RequestCompleted(uint256,uint8,address,address,uint256,uint256)": EventFragment;
    "RequestCreated(uint256,uint8,address,address,uint256)": EventFragment;
    "RequestRefunded(uint256)": EventFragment;
    "STokenCreated(address,string,string,string)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "LiquidityProvided"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LiquidityWithdrawn"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RequestCompleted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RequestCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RequestRefunded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "STokenCreated"): EventFragment;
}

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

export interface LiquidityWithdrawnEventObject {
  who: string;
  amount: BigNumber;
}
export type LiquidityWithdrawnEvent = TypedEvent<
  [string, BigNumber],
  LiquidityWithdrawnEventObject
>;

export type LiquidityWithdrawnEventFilter =
  TypedEventFilter<LiquidityWithdrawnEvent>;

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

export interface STokenCreatedEventObject {
  token: string;
  name: string;
  symbol: string;
  assetSymol: string;
}
export type STokenCreatedEvent = TypedEvent<
  [string, string, string, string],
  STokenCreatedEventObject
>;

export type STokenCreatedEventFilter = TypedEventFilter<STokenCreatedEvent>;

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

    getSTokens(overrides?: CallOverrides): Promise<[string[]]>;

    initPurchase(
      _sToken: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    initSale(
      _sToken: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    removeLiquidity(
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    revertPurchase(
      _requestId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    revertSale(
      _requestId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    s_requests(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [number, number, string, string, BigNumber, BigNumber] & {
        requestType: number;
        status: number;
        account: string;
        sToken: string;
        amount: BigNumber;
        id: BigNumber;
      }
    >;

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

  getSTokens(overrides?: CallOverrides): Promise<string[]>;

  initPurchase(
    _sToken: PromiseOrValue<string>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  initSale(
    _sToken: PromiseOrValue<string>,
    _amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  removeLiquidity(
    _amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  revertPurchase(
    _requestId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  revertSale(
    _requestId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  s_requests(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [number, number, string, string, BigNumber, BigNumber] & {
      requestType: number;
      status: number;
      account: string;
      sToken: string;
      amount: BigNumber;
      id: BigNumber;
    }
  >;

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

    getSTokens(overrides?: CallOverrides): Promise<string[]>;

    initPurchase(
      _sToken: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    initSale(
      _sToken: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    owner(overrides?: CallOverrides): Promise<string>;

    removeLiquidity(
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    revertPurchase(
      _requestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    revertSale(
      _requestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    s_requests(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [number, number, string, string, BigNumber, BigNumber] & {
        requestType: number;
        status: number;
        account: string;
        sToken: string;
        amount: BigNumber;
        id: BigNumber;
      }
    >;

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

    withdrawFees(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "LiquidityProvided(address,uint256)"(
      who?: null,
      amount?: null
    ): LiquidityProvidedEventFilter;
    LiquidityProvided(who?: null, amount?: null): LiquidityProvidedEventFilter;

    "LiquidityWithdrawn(address,uint256)"(
      who?: null,
      amount?: null
    ): LiquidityWithdrawnEventFilter;
    LiquidityWithdrawn(
      who?: null,
      amount?: null
    ): LiquidityWithdrawnEventFilter;

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

    "STokenCreated(address,string,string,string)"(
      token?: null,
      name?: null,
      symbol?: null,
      assetSymol?: null
    ): STokenCreatedEventFilter;
    STokenCreated(
      token?: null,
      name?: null,
      symbol?: null,
      assetSymol?: null
    ): STokenCreatedEventFilter;
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

    getSTokens(overrides?: CallOverrides): Promise<BigNumber>;

    initPurchase(
      _sToken: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    initSale(
      _sToken: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    removeLiquidity(
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    revertPurchase(
      _requestId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    revertSale(
      _requestId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    s_requests(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
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

    getSTokens(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    initPurchase(
      _sToken: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    initSale(
      _sToken: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    removeLiquidity(
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    revertPurchase(
      _requestId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    revertSale(
      _requestId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    s_requests(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
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

    withdrawFees(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
