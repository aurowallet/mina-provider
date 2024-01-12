import { AccountsChangedListener, ChainChangedListener, RequestArguments, SendPaymentArgs, SendStakeDelegationArgs, SendTransactionArgs, SendTransactionResult, SignedData, SignedFieldsData, SignFieldsArguments, SignMessageArgs, VerifyMessageArgs, VerifyFieldsArguments, SignJsonMessageArgs, VerifyJsonMessageArgs, SwitchChainArgs, CreateNullifierArgs, Nullifier, AddChainArgs, ChainInfoArgs, ProviderError, FetchAccountArgs, Account, FetchError } from "./TSTypes";
export interface IMinaProvider {
    request(args: RequestArguments): Promise<unknown>;
    sendTransaction(args: SendTransactionArgs): Promise<SendTransactionResult | ProviderError>;
    sendPayment(args: SendPaymentArgs): Promise<SendTransactionResult | ProviderError>;
    sendStakeDelegation(args: SendStakeDelegationArgs): Promise<SendTransactionResult | ProviderError>;
    signMessage(args: SignMessageArgs): Promise<SignedData | ProviderError>;
    verifyMessage(args: VerifyMessageArgs): Promise<boolean | ProviderError>;
    requestAccounts(): Promise<string[] | ProviderError>;
    requestNetwork(): Promise<ChainInfoArgs>;
    signFields(args: SignFieldsArguments): Promise<SignedFieldsData | ProviderError>;
    verifyFields(args: VerifyFieldsArguments): Promise<boolean | ProviderError>;
    signJsonMessage(args: SignJsonMessageArgs): Promise<SignedData | ProviderError>;
    verifyJsonMessage(args: VerifyJsonMessageArgs): Promise<boolean | ProviderError>;
    createNullifier(args: CreateNullifierArgs): Promise<Nullifier | ProviderError>;
    addChain(args: AddChainArgs): Promise<ChainInfoArgs | ProviderError>;
    switchChain(args: SwitchChainArgs): Promise<ChainInfoArgs | ProviderError>;
    fetchAccount(args: FetchAccountArgs): Promise<{
        account: Account;
        error: undefined;
    } | {
        account: undefined;
        error: FetchError;
    }>;
    on(eventName: "chainChanged", listener: ChainChangedListener): this;
    on(eventName: "accountsChanged", listener: AccountsChangedListener): this;
    removeListener(eventName: "chainChanged", listener: ChainChangedListener): this;
    removeListener(eventName: "accountsChanged", listener: AccountsChangedListener): this;
}
