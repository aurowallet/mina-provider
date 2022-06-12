/**
 * code 4001 The request was rejected by the user
 * code -32602 The parameters were invalid
 * code -32603 Internal error
 */
export interface ProviderError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

export type ConnectListener = (connectInfo: ConnectInfo) => void

export type ChainChangedListener = (chainId: string) => void

export type AccountsChangedListener = (accounts: string[]) => void

export type ConnectInfo = {
  chainId: string;
}

export type RequestArguments = {
  method: string;
  params?: unknown[] | object;
}

export type BroadcastTransactionResult = {
  hash: string
}


export type SendLegacyPaymentArgs  = {
  readonly to: string,
  readonly amount: number,
  readonly fee?: number,
  readonly memo?:string
}

export type SendPartyArguments  = {
  readonly parties: any;
  readonly feePayer?: {
    readonly fee?: number;
    readonly memo?: string;
  };
}

export type SendLegacyStakeDelegationArgs  = {
  readonly to: string,
  readonly fee?: number,
  readonly memo?:string
}

export type SignedData  = {
  publicKey: string,
  payload: string,
  signature: {
    field: string,
    scalar: string
  }
}

export type SignMessageArgs = {
  readonly message: string
}

export interface VerifyMessageArgs extends SignedData {

}

export type SendTransactionArgs = SignMessageArgs | SendLegacyStakeDelegationArgs | SendLegacyPaymentArgs | SendPartyArguments;

export type SendTransactionResult = BroadcastTransactionResult | SignedData;

