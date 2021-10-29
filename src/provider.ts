import { DAppActions } from "./constant";
import MessageChannel from "./lib/messageChannel";
import Messenger from "./messager";
type SignTransferParams = {
  from: string,
  to: string,
  amount: number
}
type SignStakingParams = {
  from: string,
  to: string,
}
type SignMessageParams = {
  from: string,
  message: string,
}
type VerifyMessageParams = {
  from: string,
  message: string,
}
interface AccountChangeCallback  {
  (addresses: string[]): void
}
export default class AuroWeb3Provider {
  channel: MessageChannel;
  request: Messenger;
  constructor() {
    this.channel = new MessageChannel('webhook')
    this.request = new Messenger(this.channel)
  }

  async signTransfer(signParams: SignTransferParams) {
    return this.request.send(DAppActions.mina_signTransfer, signParams)
  }

  async signStaking(signParams: SignStakingParams) {
    return this.request.send(DAppActions.mina_signStaking, signParams)
  }

  async signMessage(signParams: SignMessageParams) {
    return this.request.send(DAppActions.mina_signMessage, signParams)
  }

  async verifyMessage(verifyParams: VerifyMessageParams) {
    return this.request.send(DAppActions.mina_verifyMessage, verifyParams)
  }

  async requestAccounts() {
    return this.request.send(DAppActions.mina_requestAccounts)
  }

  async onAccountChange(callback: AccountChangeCallback){
    this.channel.on('accountChange',(data)=>{
      let result: string[] = data?.result
      callback && callback(result)
    })
  }
}

