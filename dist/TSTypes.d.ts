/**
 * code 1001 User disconnect, need connect first
 * code 1002 The request was rejected by the user
 * code 20001 No wallet found
 * code 20002 Verify failed
 * code 20003 The parameters were invalid
 * code 20004 Not support chain
 * code 20005 Have Pending chain action
 * code 20006 Method not supported.
 * code 21001 Internal error
 * code 22001 Unspecified error message
 * code 23001 Origin dismatch
 */
export interface ProviderError extends Error {
    message: string;
    code: number;
    data?: unknown;
}
export declare type ConnectListener = (connectInfo: ConnectInfo) => void;
export declare type ChainChangedListener = (chainInfo: ChainInfoArgs) => void;
export declare type AccountsChangedListener = (accounts: string[]) => void;
export declare type ConnectInfo = {
    chainId: string;
};
export declare type RequestArguments = {
    method: string;
    params?: unknown[] | object;
};
export interface SendPaymentArgs {
    readonly to: string;
    readonly amount: number;
    readonly fee?: number;
    readonly memo?: string;
}
export interface SendTransactionArgs {
    readonly transaction: string | object;
    readonly feePayer?: {
        readonly fee?: number;
        readonly memo?: string;
    };
}
export declare type SendStakeDelegationArgs = {
    readonly to: string;
    readonly fee?: number;
    readonly memo?: string;
};
export interface SignedData {
    publicKey: string;
    data: string;
    signature: {
        field: string;
        scalar: string;
    };
}
export declare type SignMessageArgs = {
    readonly message: string;
};
export interface VerifyMessageArgs extends SignedData {
}
export declare type SendTransactionResult = {
    hash: string;
};
export declare type SignedFieldsData = {
    data: (string | number)[];
    signature: string;
};
export declare type SignFieldsArguments = {
    readonly message: (string | number)[];
};
export interface VerifyFieldsArguments {
    publicKey: string;
    data: (string | number)[];
    signature: string;
}
declare type JsonMessageData = {
    label: string;
    value: string;
};
export declare type SignJsonMessageArgs = {
    readonly message: Array<JsonMessageData>;
};
export interface VerifyJsonMessageArgs extends VerifyMessageArgs {
}
export declare type SwitchChainArgs = {
    readonly chainId: string;
};
export declare type CreateNullifierArgs = {
    readonly message: (string | number)[];
};
export declare type Group = {
    x: bigint;
    y: bigint;
};
export declare type Nullifier = {
    publicKey: Group;
    public: {
        nullifier: Group;
        s: bigint;
    };
    private: {
        c: bigint;
        g_r: Group;
        h_m_pk_r: Group;
    };
};
export declare type AddChainArgs = {
    readonly url: string;
    readonly name: string;
};
export declare type ChainInfoArgs = {
    chainId: string;
    name: string;
};
export declare type FetchAccountArgs = {
    publicKey: string;
    tokenId?: string;
};
export declare type FetchError = Omit<ProviderError, 'data'>;
declare type Field = string | number | bigint;
declare type PublicKey = string;
declare type UInt64 = number;
declare type UInt32 = number;
declare type Bool = boolean;
declare type AuthRequired = {
    constant: Bool;
    signatureNecessary: Bool;
    signatureSufficient: Bool;
};
declare type TokenId = Field;
export declare type Account = {
    publicKey: PublicKey;
    tokenId: TokenId;
    tokenSymbol: string;
    balance: UInt64;
    nonce: UInt32;
    receiptChainHash: Field;
    delegate?: PublicKey;
    votingFor: Field;
    timing: {
        isTimed: Bool;
        initialMinimumBalance: UInt64;
        cliffTime: UInt32;
        cliffAmount: UInt64;
        vestingPeriod: UInt32;
        vestingIncrement: UInt64;
    };
    permissions: {
        editState: AuthRequired;
        access: AuthRequired;
        send: AuthRequired;
        receive: AuthRequired;
        setDelegate: AuthRequired;
        setPermissions: AuthRequired;
        setVerificationKey: AuthRequired;
        setZkappUri: AuthRequired;
        editActionState: AuthRequired;
        setTokenSymbol: AuthRequired;
        incrementNonce: AuthRequired;
        setVotingFor: AuthRequired;
        setTiming: AuthRequired;
    };
    zkapp?: {
        appState: Field[];
        verificationKey?: {
            data: string;
            hash: Field;
        };
        zkappVersion: UInt32;
        actionState: Field[];
        lastActionSlot: UInt32;
        provedState: Bool;
        zkappUri: string;
    };
};
export {};
