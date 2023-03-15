import {
  AccountsChangedListener,
  BroadcastTransactionResult, ChainChangedListener, ConnectListener,
  RequestArguments,
  SendLegacyPaymentArgs, SendLegacyStakeDelegationArgs,
  SendTransactionArgs,
  SendTransactionResult, SignedData, SignMessageArgs, VerifyMessageArgs
} from "./TSTypes";

export interface IMinaProvider {
  request(args: RequestArguments): Promise<unknown>
  isConnected(): boolean
  sendTransaction(args: SendTransactionArgs): Promise<SendTransactionResult>
  sendLegacyPayment(args: SendLegacyPaymentArgs): Promise<BroadcastTransactionResult>
  sendLegacyStakeDelegation(args: SendLegacyStakeDelegationArgs): Promise<BroadcastTransactionResult>
  signMessage(args: SignMessageArgs): Promise<SignedData>
  verifyMessage(args: VerifyMessageArgs): Promise<boolean>
  requestAccounts(): Promise<string[]>
  requestNetwork(): Promise<string>

  // Events
  on(eventName: 'connect', listener: ConnectListener): this
  on(eventName: 'disconnect', listener: ConnectListener): this
  on(eventName: 'chainChanged', listener: ChainChangedListener): this
  on(eventName: 'accountsChanged', listener: AccountsChangedListener): this

  removeListener(eventName: 'disconnect', listener: ConnectListener): this
  removeListener(eventName: 'connect', listener: ConnectListener): this
  removeListener(
    eventName: 'chainChanged',
    listener: ChainChangedListener
  ): this
  removeListener(
    eventName: 'accountsChanged',
    listener: AccountsChangedListener
  ): this
}