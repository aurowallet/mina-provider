import {
  AccountsChangedListener,
  ChainChangedListener,
  ConnectListener,
  RequestArguments,
  SendPaymentArgs,
  SendStakeDelegationArgs,
  SendTransactionArgs,
  SendTransactionResult,
  SignedData,
  SignedFieldsData,
  SignFieldsArguments,
  SignMessageArgs,
  VerifyMessageArgs,
  VerifyFieldsArguments,
  SignJsonMessageArgs,
  VerifyJsonMessageArgs,
  SwitchChainArgs,
  CreateNullifierArgs,
  Nullifier,
  AddChainArgs,
  ChainInfoArgs,
  ProviderError,
  SendZkTransactionResult,
  IWalletInfo,
  StoredCredentialArgs,
  PresentationArgs,
  IStoreCredentialData,
  IRequestPresentation,
} from "./TSTypes";

export interface IMinaProvider {
  request(args: RequestArguments): Promise<unknown>;
  sendTransaction(
    args: SendTransactionArgs
  ): Promise<SendZkTransactionResult | ProviderError>;
  sendPayment(
    args: SendPaymentArgs
  ): Promise<SendTransactionResult | ProviderError>;
  sendStakeDelegation(
    args: SendStakeDelegationArgs
  ): Promise<SendTransactionResult | ProviderError>;
  signMessage(args: SignMessageArgs): Promise<SignedData | ProviderError>;
  verifyMessage(args: VerifyMessageArgs): Promise<boolean | ProviderError>;
  requestAccounts(): Promise<string[] | ProviderError>;
  getAccounts(): Promise<string[]>;
  requestNetwork(): Promise<ChainInfoArgs>;

  signFields(
    args: SignFieldsArguments
  ): Promise<SignedFieldsData | ProviderError>;
  verifyFields(args: VerifyFieldsArguments): Promise<boolean | ProviderError>;

  signJsonMessage(
    args: SignJsonMessageArgs
  ): Promise<SignedData | ProviderError>;
  verifyJsonMessage(
    args: VerifyJsonMessageArgs
  ): Promise<boolean | ProviderError>;

  createNullifier(
    args: CreateNullifierArgs
  ): Promise<Nullifier | ProviderError>;

  storePrivateCredential(
    args: StoredCredentialArgs
  ): Promise<IStoreCredentialData | ProviderError>;
  
  requestPresentation(
    args: PresentationArgs
  ): Promise<IRequestPresentation | ProviderError>;

  revokePermissions(): Promise<Array<string>>;

  addChain(args: AddChainArgs): Promise<ChainInfoArgs | ProviderError>;
  switchChain(args: SwitchChainArgs): Promise<ChainInfoArgs | ProviderError>;
  // Events
  on(eventName: "chainChanged", listener: ChainChangedListener): this;
  on(eventName: "accountsChanged", listener: AccountsChangedListener): this;

  removeListener(
    eventName: "chainChanged",
    listener: ChainChangedListener
  ): this;
  removeListener(
    eventName: "accountsChanged",
    listener: AccountsChangedListener
  ): this;
  getWalletInfo():Promise<IWalletInfo>
}
