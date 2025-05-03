import MessageChannel from "./lib/messageChannel";
import Messenger from "./messager";
import EventEmitter from "eventemitter3";
import { DAppActions } from "./constant";
import {
  ProviderError,
  RequestArguments,
  SendStakeDelegationArgs,
  SendPaymentArgs,
  SendTransactionArgs,
  SendTransactionResult,
  SignedData,
  SignMessageArgs,
  VerifyMessageArgs,
  SignFieldsArguments,
  SignedFieldsData,
  VerifyFieldsArguments,
  SignJsonMessageArgs,
  VerifyJsonMessageArgs,
  SwitchChainArgs,
  CreateNullifierArgs,
  Nullifier,
  AddChainArgs,
  ChainInfoArgs,
  SendZkTransactionResult,
  IWalletInfo,
  StoredCredentialArgs,
  IStoreCredentialData,
  PresentationArgs,
  IRequestPresentation,
} from "./TSTypes";
import { IMinaProvider } from "./IProvider";

export default class MinaProvider
  extends EventEmitter
  implements IMinaProvider
{
  private readonly channel: MessageChannel;
  private readonly messenger: Messenger;
  public readonly isAuro: boolean = true;
  private chainInfo: ChainInfoArgs;

  constructor() {
    super();
    this.channel = new MessageChannel("webhook");
    this.messenger = new Messenger(this.channel);
    this.initEvents();
  }

  public request({ method, params }: RequestArguments): Promise<any> {
    return this.messenger.send(method, params);
  }

  public async sendTransaction(
    args: SendTransactionArgs
  ): Promise<SendZkTransactionResult | ProviderError> {
    return this.request({
      method: DAppActions.mina_sendTransaction,
      params: args,
    });
  }

  public async signMessage(
    args: SignMessageArgs
  ): Promise<SignedData | ProviderError> {
    return this.request({ method: DAppActions.mina_signMessage, params: args });
  }

  public async verifyMessage(
    args: VerifyMessageArgs
  ): Promise<boolean | ProviderError> {
    return this.request({
      method: DAppActions.mina_verifyMessage,
      params: args,
    });
  }

  public async requestAccounts(): Promise<string[] | ProviderError> {
    return this.request({ method: DAppActions.mina_requestAccounts });
  }

  public async getAccounts(): Promise<string[]> {
    return this.request({ method: DAppActions.mina_accounts });
  }

  public async requestNetwork(): Promise<ChainInfoArgs> {
    return this.request({ method: DAppActions.mina_requestNetwork });
  }

  public async sendPayment(
    args: SendPaymentArgs
  ): Promise<SendTransactionResult | ProviderError> {
    return this.request({ method: DAppActions.mina_sendPayment, params: args });
  }

  public async sendStakeDelegation(
    args: SendStakeDelegationArgs
  ): Promise<SendTransactionResult | ProviderError> {
    return this.request({
      method: DAppActions.mina_sendStakeDelegation,
      params: args,
    });
  }

  public async signFields(
    args: SignFieldsArguments
  ): Promise<SignedFieldsData | ProviderError> {
    return this.request({ method: DAppActions.mina_signFields, params: args });
  }

  public async verifyFields(
    args: VerifyFieldsArguments
  ): Promise<boolean | ProviderError> {
    return this.request({
      method: DAppActions.mina_verifyFields,
      params: args,
    });
  }

  public async signJsonMessage(
    args: SignJsonMessageArgs
  ): Promise<SignedData | ProviderError> {
    return this.request({
      method: DAppActions.mina_sign_JsonMessage,
      params: args,
    });
  }

  public async verifyJsonMessage(
    args: VerifyJsonMessageArgs
  ): Promise<boolean | ProviderError> {
    return this.request({
      method: DAppActions.mina_verify_JsonMessage,
      params: args,
    });
  }

  public async switchChain(
    args: SwitchChainArgs
  ): Promise<ChainInfoArgs | ProviderError> {
    return this.request({ method: DAppActions.mina_switchChain, params: args });
  }

  public async addChain(
    args: AddChainArgs
  ): Promise<ChainInfoArgs | ProviderError> {
    return this.request({ method: DAppActions.mina_addChain, params: args });
  }

  public async createNullifier(
    args: CreateNullifierArgs
  ): Promise<Nullifier | ProviderError> {
    return this.request({
      method: DAppActions.mina_createNullifier,
      params: args,
    });
  }
  public async getWalletInfo(): Promise<IWalletInfo> {
    return this.request({ method: DAppActions.wallet_info });
  }

  public async storePrivateCredential(
    args: StoredCredentialArgs
  ): Promise<IStoreCredentialData | ProviderError> {
    return this.request({
      method: DAppActions.mina_storePrivateCredential,
      params: args,
    });
  }

  public async requestPresentation(
    args: PresentationArgs
  ): Promise<IRequestPresentation | ProviderError> {
    return this.request({
      method: DAppActions.mina_requestPresentation,
      params: args,
    });
  }

  public revokePermissions(): Promise<Array<string>> {
    return this.request({
      method: DAppActions.wallet_revokePermissions,
    });
  }

  private initEvents() {
    this.channel.on("chainChanged", this.onChainChanged.bind(this));
    this.channel.on("networkChanged", this.onNetworkChanged.bind(this));
    this.channel.on("accountsChanged", this.emitAccountsChanged.bind(this));
  }

  private onChainChanged(chainInfo: ChainInfoArgs): void {
    if (chainInfo.networkID !== this.chainInfo?.networkID) {
      this.chainInfo = chainInfo;
      this.emit("chainChanged", chainInfo);
    }
  }

  private onNetworkChanged(network: string): void {
    this.emit("networkChanged", network);
  }

  private emitAccountsChanged(accounts: string[]): void {
    this.emit("accountsChanged", accounts);
  }
}
