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

export type ConnectListener = (connectInfo: ConnectInfo) => void

export type ChainChangedListener = (chainInfo: ChainInfoArgs) => void

export type AccountsChangedListener = (accounts: string[]) => void

export type ConnectInfo = {
  chainId: string;
}

export type RequestArguments = {
  method: string;
  params?: unknown[] | object;
}

export interface SendPaymentArgs  {
  readonly to: string,
  readonly amount: number,
  readonly fee?: number,
  readonly memo?:string
}

export interface SendTransactionArgs  {
  readonly transaction: any,
  readonly feePayer?: {
    readonly fee?: number;
    readonly memo?: string;
  };
}

export type SendStakeDelegationArgs  = {
  readonly to: string,
  readonly fee?: number,
  readonly memo?:string
}

export interface SignedData {
  publicKey: string;
  data: string;
  signature: {
    field: string;
    scalar: string;
  }
}

export type SignMessageArgs = {
  readonly message: string
}

export interface VerifyMessageArgs extends SignedData {

}

export type SendTransactionResult = {
  hash: string
}

export type SignedFieldsData  = {
  data: (string|number)[],
  signature:string
}

export type SignFieldsArguments = {
  readonly message: (string|number)[],
}

export interface VerifyFieldsArguments {
  publicKey: string,
  data: (string|number)[],
  signature:string
}

type JsonMessageData  = {
  label:string
  value:string
}
export type SignJsonMessageArgs = {
  readonly message: Array<JsonMessageData>
}

export interface VerifyJsonMessageArgs extends VerifyMessageArgs {

}

export type SwitchChainArgs = {
  readonly chainId: string
}

export type CreateNullifierArgs = {
  readonly message: bigint[]
}

export type Group = {
  x: bigint;
  y: bigint;
};

export type Nullifier = {
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

export type AddChainArgs = {
  readonly url: string
  readonly name: string
}

export type ChainInfoArgs ={
  chainId:string,
  name:string,
}
