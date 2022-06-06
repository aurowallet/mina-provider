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

export type ConnectInfo = {
  chainId: string;
}

export type RequestArguments = {
  method: string;
  params?: unknown[] | object;
}

export type SendTransactionResult = {
  hash: string
}


export type SendPaymentArguments  = {
  readonly to: string,
  readonly amount: number,
  readonly fee?: number,
  readonly memo?:string
}

export type SendPartyArguments  = {
  readonly parties: any;
  readonly feePayer?: {
    readonly fee?: number;
    readonly nonce?: number;
    readonly memo?: string;
  };
}

export type SendStakeDelegationArguments  = {
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

export type SignMessageArguments = {
  readonly message: string
}

export interface VerifyMessageArguments extends SignedData {

}

export type SignableData = SignMessageArguments | SendStakeDelegationArguments | SendPaymentArguments | SendPartyArguments;

export type SignTransactionResult = SendTransactionResult | SignedData

