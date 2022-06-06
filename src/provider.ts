import MessageChannel from "./lib/messageChannel";
import Messenger from "./messager";
import EventEmitter from 'eventemitter3';
import {DAppActions} from "./constant";
import {
  ConnectInfo,
  ProviderError,
  RequestArguments,
  SendPartyArguments,
  SendPaymentArguments,
  SendStakeDelegationArguments,
  SendTransactionResult,
  SignableData,
  SignedData,
  SignTransactionResult
} from "./TSTypes";
import {isMessage, isParty, isPayment, isStakeDelegation} from "./utils";
export interface SignMessageArguments {
  message: string
}

export interface VerifyMessageArguments extends SignedData {

}

type ConnectListener = (connectInfo: ConnectInfo) => void
type ChainChangedListener = (chainId: string) => void
type AccountsChangedListener = (accounts: string[]) => void

export interface IMinaProvider {
  request(args: RequestArguments): Promise<unknown>
  isConnected(): boolean
  sendPayment(args: SendPaymentArguments): Promise<{ hash: string }>
  sendStakeDelegation(args: SendStakeDelegationArguments): Promise<{ hash: string }>
  signMessage(args: SignMessageArguments): Promise<SignedData>
  verifyMessage(args: VerifyMessageArguments): Promise<boolean>
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


export default class AuroWeb3Provider extends EventEmitter implements IMinaProvider{
  private readonly channel: MessageChannel;
  private readonly messenger: Messenger;
  public readonly isAuro: boolean = true;
  private connectedFlag: boolean
  constructor() {
    super();
    this.channel = new MessageChannel('webhook');
    this.messenger = new Messenger(this.channel);
    this.initEvents();
  }

  public request({method, params}: RequestArguments): Promise<any> {
    return this.messenger.send(method, params)
  }

  public isConnected(): boolean {
    return this.connectedFlag;
  }

  public async sendPayment(args: SendPaymentArguments): Promise<SendTransactionResult>  {
    return this.request({method: DAppActions.mina_sendPayment, params: args})
  }

  public async sendStakeDelegation(args: SendStakeDelegationArguments): Promise<SendTransactionResult> {
    return this.request({method: DAppActions.mina_sendStakeDelegation, params: args})
  }

  public async signMessage(args: SignMessageArguments): Promise<SignedData> {
    return this.request({method: DAppActions.mina_signMessage, params: args})
  }

  public async sendParty(args: SendPartyArguments): Promise<SendTransactionResult>  {
    return this.request({method: DAppActions.mina_sendParty, params: args})
  }

  public async verifyMessage(args: VerifyMessageArguments): Promise<boolean>{
    return this.request({method: DAppActions.mina_verifyMessage, params: args})
  }

  public async requestAccounts(): Promise<string[]> {
    return this.request({method: DAppActions.mina_requestAccounts})
  }

  public async requestNetwork(): Promise<'Mainnet' | 'Devnet' | "Berkeley-QA" |'Unhnown'> {
    return this.request({method: DAppActions.mina_requestNetwork})
  }

  public async signTransaction(payload: SignableData): Promise<SignTransactionResult> {
    if (isMessage(payload)) {
      return this.signMessage(payload)
    }
    if (isPayment(payload)) {
      return this.sendPayment(payload);
    }
    if (isStakeDelegation(payload)) {
      return this.sendStakeDelegation(payload);
    }
    if (isParty(payload)) {
      return this.sendParty(payload);
    } else {
      throw new Error(`Expected signable payload, got '${payload}'.`);
    }
  }

  private initEvents() {
    this.channel.on('connect', this.onConnect.bind(this))
    this.channel.on('disconnect', this.onDisconnect.bind(this))
    this.channel.on('chainChanged', this.onChainChanged.bind(this))
    this.channel.on('networkChanged', this.onNetworkChanged.bind(this))
    this.channel.on(
      'accountsChanged',
      this.emitAccountsChanged.bind(this)
    )
  }

  private onConnect(): void {
    this.connectedFlag = true
    this.emit('connect')
  }

  private onDisconnect(error: ProviderError): void {
    this.connectedFlag = false
    this.emit('disconnect', error)
  }

  private onChainChanged(chainId: string): void {
    this.emit('chainChanged', chainId)
  }

  private onNetworkChanged(network: string): void {
    this.emit('networkChanged', network)
  }

  private emitAccountsChanged(accounts: string[]): void {
    this.emit('accountsChanged', accounts)
  }
}

