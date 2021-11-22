## Properties

### mina.isAuro

## Methods

### mina.isConnected

```typescript
mina.isConnected(): boolean;
```

### ethereum.request(args)
```typescript
interface RequestArguments {
  method: string;
  params?: unknown[] | object;
}

ethereum.request(args: RequestArguments): Promise<unknown>;
```

### mina.requestAccounts

```typescript

mina.requestAccounts(): Promise<string[]>;
```

### mina.sendPayment

```typescript
interface SendPaymentArguments {
  from: string,
  to: string,
  amount: number
}

mina.sendPayment(args: SendPaymentArguments): Promise<{ hash: string }>;
```

### mina.sendStakeDelegation

```typescript
interface SendStakeDelegationArguments {
  from: string,
  to: string,
}

mina.sendStakeDelegation(args: SendStakeDelegationArguments): Promise<{ hash: string }>;
```

### mina.signMessage

```typescript
interface SignMessageArguments {
  from: string,
  message: string
}
interface SignedData {
  publicKey: string,
  payload: string,
  signature: {
    field: string,
    scalar: string
  }
}
mina.signMessage(args: SignMessageArguments): Promise<boolean>;
```

### mina.verifyMessage

```typescript
interface VerifyMessageArguments {
  publicKey: string,
  payload: string,
  signature: {
    field: string,
    scalar: string
  }
}
mina.verifyMessage(args: VerifyMessageArguments): Promise<boolean>;
```

## Events

### connect

```typescript
interface ConnectInfo {
  chainId: string;
}

mina.on('connect', handler: (connectInfo: ConnectInfo) => void);
```

### disconnect

```typescript
mina.on('disconnect', handler: (error: ProviderError) => void);
```

### accountsChanged

```typescript
ethereum.on('accountsChanged', handler: (accounts: Array<string>) => void);
```