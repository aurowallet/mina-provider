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