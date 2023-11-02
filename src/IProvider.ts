import {
  AccountsChangedListener,
  BroadcastTransactionResult, ChainChangedListener, ConnectListener,
  RequestArguments,
  SendLegacyPaymentArgs, SendLegacyStakeDelegationArgs,
  SendTransactionArgs,
  SendTransactionResult, SignedData, SignedFieldsData, SignFieldsArguments, SignMessageArgs, VerifyMessageArgs, VerifyFieldsArguments, SignJsonMessageArgs, VerifyJsonMessageArgs, SwitchChainArgs, CreateNullifierArgs, Nullifier, AddChainArgs, ChainInfoArgs
} from "./TSTypes";

export interface IMinaProvider {
  request(args: RequestArguments): Promise<unknown>
  sendTransaction(args: SendTransactionArgs): Promise<SendTransactionResult>
  sendLegacyPayment(args: SendLegacyPaymentArgs): Promise<BroadcastTransactionResult>
  sendLegacyStakeDelegation(args: SendLegacyStakeDelegationArgs): Promise<BroadcastTransactionResult>
  signMessage(args: SignMessageArgs): Promise<SignedData>
  verifyMessage(args: VerifyMessageArgs): Promise<boolean>
  requestAccounts(): Promise<string[]>
  requestNetwork(): Promise<ChainInfoArgs>

  signFields(args: SignFieldsArguments): Promise<SignedFieldsData>
  verifyFields(args: VerifyFieldsArguments): Promise<boolean>

  signJsonMessage(args: SignJsonMessageArgs): Promise<SignedData>
  verifyJsonMessage(args: VerifyJsonMessageArgs): Promise<boolean>

  createNullifier(args: CreateNullifierArgs): Promise<Nullifier>

  addChain(args: AddChainArgs): Promise<ChainInfoArgs>
  switchChain(args:SwitchChainArgs):Promise<ChainInfoArgs>
  // Events
  on(eventName: 'chainChanged', listener: ChainChangedListener): this
  on(eventName: 'accountsChanged', listener: AccountsChangedListener): this

  removeListener(
    eventName: 'chainChanged',
    listener: ChainChangedListener
  ): this
  removeListener(
    eventName: 'accountsChanged',
    listener: AccountsChangedListener
  ): this
}