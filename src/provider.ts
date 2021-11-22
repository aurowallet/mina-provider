import MessageChannel from "./lib/messageChannel";
import Messenger from "./messager";
import EventEmitter from 'eventemitter3';
import {DAppActions} from "./constant";

/**
 * code 4001 The request was rejected by the user
 * code -32602 The parameters were invalid
 * code -32603 Internal error
 */
interface ProviderError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

interface ConnectInfo {
  chainId: string;
}

interface RequestArguments {
  method: string;
  params?: unknown[] | object;
}

export interface SendPaymentArguments {
  from: string,
  to: string,
  amount: number
}

export interface SendStakeDelegationArguments {
  from: string,
  to: string
}

interface SignedData {
  publicKey: string,
  payload: string,
  signature: {
    field: string,
    scalar: string
  }
}

export interface SignMessageArguments {
  from: string,
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

  public async sendPayment(args: SendPaymentArguments): Promise<{ hash: string }>  {
    return this.request({method: DAppActions.mina_sendPayment, params: args})
  }

  public async sendStakeDelegation(args: SendStakeDelegationArguments): Promise<{ hash: string }> {
    return this.request({method: DAppActions.mina_sendStakeDelegation, params: args})
  }

  public async signMessage(args: SignMessageArguments): Promise<SignedData> {
    return this.request({method: DAppActions.mina_signMessage, params: args})
  }

  public async verifyMessage(args: VerifyMessageArguments): Promise<boolean>{
    return this.request({method: DAppActions.mina_verifyMessage, params: args})
  }

  public async requestAccounts(): Promise<string[]> {
    return this.request({method: DAppActions.mina_requestAccounts})
  }

  private initEvents() {
    this.channel.on('connect', this.onConnect.bind(this))
    this.channel.on('disconnect', this.onDisconnect.bind(this))
    this.channel.on('chainChanged', this.onChainChanged.bind(this))
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

  private onNetworkChanged(networkId: string): void {
    this.emit('networkChanged', networkId)
  }

  private emitAccountsChanged(accounts: string[]): void {
    this.emit('accountsChanged', accounts)
  }
}

