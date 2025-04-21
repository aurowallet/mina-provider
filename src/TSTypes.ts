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

export type ConnectListener = (connectInfo: ChainInfoArgs) => void;

export type ChainChangedListener = (chainInfo: ChainInfoArgs) => void;

export type AccountsChangedListener = (accounts: string[]) => void;

export type RequestArguments = {
  method: string;
  params?: unknown[] | object;
};

export interface SendPaymentArgs {
  readonly to: string;
  readonly amount: number;
  readonly fee?: number;
  readonly memo?: string;
  readonly nonce?: number;
}

export interface SendTransactionArgs {
  readonly onlySign?: boolean;
  readonly nonce?: number;
  readonly transaction: string | object;
  readonly feePayer?: {
    readonly fee?: number;
    readonly memo?: string;
  };
}

export type SendStakeDelegationArgs = {
  readonly to: string;
  readonly fee?: number;
  readonly memo?: string;
  readonly nonce?: number;
};

export interface SignedData {
  publicKey: string;
  data: string;
  signature: {
    field: string;
    scalar: string;
  };
}

export type SignMessageArgs = {
  readonly message: string;
};

export interface VerifyMessageArgs extends SignedData {}

export type SendTransactionHash = {
  hash: string;
  paymentId?: string;
};
export type SignedZkappCommand = {
  signedData: string; // Results of JSON.stringify( signZkappCommand().data )
};

export type SendTransactionResult = SendTransactionHash;

export type SendZkTransactionResult =
  | SendTransactionResult
  | SignedZkappCommand;

export type SignedFieldsData = {
  data: (string | number)[];
  publicKey: string;
  signature: string;
};

export type SignFieldsArguments = {
  readonly message: (string | number)[];
};

export interface VerifyFieldsArguments {
  publicKey: string;
  data: (string | number)[];
  signature: string;
}

type JsonMessageData = {
  label: string;
  value: string;
};
export type SignJsonMessageArgs = {
  readonly message: Array<JsonMessageData>;
};

export interface VerifyJsonMessageArgs extends VerifyMessageArgs {}

export type SwitchChainArgs = {
  readonly networkID: string;
};

export type CreateNullifierArgs = {
  readonly message: (string | number)[];
};

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
  readonly url: string;
  readonly name: string;
};

export type ChainInfoArgs = {
  networkID: string;
};

export type IWalletInfo = {
  version: string;
  init: boolean;
};


type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };


type Credential<Data = unknown> = { owner: string; data: Data };
/**
 * Credential in stored form, including the witness and metadata.
 */
type StoredCredential<Data = unknown, Witness = unknown> = {
  version: 'v0';
  witness: Witness;
  metadata: JSONValue | undefined;
  credential: Credential<Data>;
};

export type StoredCredentialArgs = {
  credential:StoredCredential
}
export type IStoreCredentialData = {
  credential: string;
};


type PresentationRequestType = 'no-context' | 'zk-app' | 'https';
type PresentationRequest<
  RequestType extends PresentationRequestType = PresentationRequestType,
  InputContext = any,
> = {
  type: RequestType;
  spec: any;
  claims: any;
  inputContext: InputContext;
  program?: unknown;
  verificationKey?: unknown;
};

type IPresentationRequest = {
  presentationRequest:PresentationRequest
  zkAppAccount?:any // used for type zk-app
}

export type PresentationArgs = {
  presentation:IPresentationRequest
}

export type IRequestPresentation = {
  presentation: string;
};
