import MessageChannel from "./lib/messageChannel"
import Messenger from "./messager"
import EventEmitter from 'eventemitter3'
import {DAppActions} from "./constant"
import {
  BroadcastTransactionResult,
  ConnectInfo,
  ProviderError,
  RequestArguments,
  SendLegacyStakeDelegationArgs,
  SendLegacyPaymentArgs,
  SendTransactionArgs,
  SendTransactionResult,
  SignedData,
  SignMessageArgs,
  VerifyMessageArgs,
  SignFieldsArguments,
  SignedFieldsData,
  VerifyFieldsArguments,
} from "./TSTypes"
import {IMinaProvider} from "./IProvider"

export default class MinaProvider extends EventEmitter implements IMinaProvider{
  private readonly channel: MessageChannel
  private readonly messenger: Messenger
  public readonly isAuro: boolean = true
  
  constructor() {
    super()
    this.channel = new MessageChannel('webhook')
    this.messenger = new Messenger(this.channel)
  }

  public request({method, params}: RequestArguments): Promise<any> {
    return this.messenger.send(method, params)
  }

  public async sendTransaction(args: SendTransactionArgs): Promise<SendTransactionResult>  {
    return this.request({method: DAppActions.mina_sendTransaction, params: args})
  }

  public async signMessage(args: SignMessageArgs): Promise<SignedData> {
    return this.request({method: DAppActions.mina_signMessage, params: args})
  }

  public async verifyMessage(args: VerifyMessageArgs): Promise<boolean>{
    return this.request({method: DAppActions.mina_verifyMessage, params: args})
  }

  public async requestAccounts(): Promise<string[]> {
    return this.request({method: DAppActions.mina_requestAccounts})
  }

  public async getAccounts(): Promise<string[]> {
    return this.request({method: DAppActions.mina_accounts})
  }

  public async requestNetwork(): Promise<'Mainnet' | 'Devnet' | "Berkeley-QA" |'Unhnown'> {
    return this.request({method: DAppActions.mina_requestNetwork})
  }

  public async sendLegacyPayment(args: SendLegacyPaymentArgs): Promise<BroadcastTransactionResult>  {
    return this.request({method: DAppActions.mina_sendPayment, params: args})
  }

  public async sendLegacyStakeDelegation(args: SendLegacyStakeDelegationArgs): Promise<BroadcastTransactionResult> {
    return this.request({method: DAppActions.mina_sendStakeDelegation, params: args})
  }

  public async signFields(args: SignFieldsArguments): Promise<SignedFieldsData> {
    return this.request({method: DAppActions.mina_signFields, params: args})
  }

  public async verifyFields(args: VerifyFieldsArguments): Promise<boolean> {
    return this.request({method: DAppActions.mina_verifyFields, params: args})
  }
}

