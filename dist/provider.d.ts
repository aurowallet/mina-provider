import EventEmitter from "eventemitter3";
import { ProviderError, RequestArguments, SendStakeDelegationArgs, SendPaymentArgs, SendTransactionArgs, SendTransactionResult, SignedData, SignMessageArgs, VerifyMessageArgs, SignFieldsArguments, SignedFieldsData, VerifyFieldsArguments, SignJsonMessageArgs, VerifyJsonMessageArgs, SwitchChainArgs, CreateNullifierArgs, Nullifier, AddChainArgs, ChainInfoArgs, FetchAccountArgs, FetchError, Account } from "./TSTypes";
import { IMinaProvider } from "./IProvider";
export default class MinaProvider extends EventEmitter implements IMinaProvider {
    private readonly channel;
    private readonly messenger;
    readonly isAuro: boolean;
    private chainInfo;
    constructor();
    request({ method, params }: RequestArguments): Promise<any>;
    sendTransaction(args: SendTransactionArgs): Promise<SendTransactionResult | ProviderError>;
    signMessage(args: SignMessageArgs): Promise<SignedData | ProviderError>;
    verifyMessage(args: VerifyMessageArgs): Promise<boolean | ProviderError>;
    requestAccounts(): Promise<string[] | ProviderError>;
    getAccounts(): Promise<string[]>;
    requestNetwork(): Promise<ChainInfoArgs>;
    sendPayment(args: SendPaymentArgs): Promise<SendTransactionResult | ProviderError>;
    sendStakeDelegation(args: SendStakeDelegationArgs): Promise<SendTransactionResult | ProviderError>;
    signFields(args: SignFieldsArguments): Promise<SignedFieldsData | ProviderError>;
    verifyFields(args: VerifyFieldsArguments): Promise<boolean | ProviderError>;
    signJsonMessage(args: SignJsonMessageArgs): Promise<SignedData | ProviderError>;
    verifyJsonMessage(args: VerifyJsonMessageArgs): Promise<boolean | ProviderError>;
    switchChain(args: SwitchChainArgs): Promise<ChainInfoArgs | ProviderError>;
    addChain(args: AddChainArgs): Promise<ChainInfoArgs | ProviderError>;
    createNullifier(args: CreateNullifierArgs): Promise<Nullifier | ProviderError>;
    fetchAccount(args: FetchAccountArgs): Promise<{
        account: Account;
        error: undefined;
    } | {
        account: undefined;
        error: FetchError;
    }>;
    private initEvents;
    private onChainChanged;
    private onNetworkChanged;
    private emitAccountsChanged;
}
