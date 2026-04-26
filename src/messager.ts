import {createMessageId, getSiteIcon} from "./utils";
import MessageChannel from "./lib/messageChannel";

export default class Messenger {
  registeredMessage:{[key:string]: { resolve:(result: unknown)=>void, reject: (error: unknown)=>void }};
  channel: MessageChannel;
  _walletMessageListener: (payload: unknown) => void;
  constructor(channel:MessageChannel) {
    this.channel = channel
    this.registeredMessage = {}
    this._walletMessageListener = this._handleWalletMessage.bind(this)
    this.initListener()
  }

  initListener() {
    this.channel.on('messageFromWallet', this._walletMessageListener);
  }

  _handleWalletMessage(payload: unknown) {
    if (!payload || typeof payload !== 'object')
      return

    const response = payload as {
      error?: unknown,
      result?: unknown,
      id?: string
    }

    const { error, result, id } = response
    const hasError = Object.prototype.hasOwnProperty.call(response, 'error')

    if (!id)
      return

    const registeredMessage = this.registeredMessage[ id ]
    if (!registeredMessage)
      return

    if(!hasError)
      registeredMessage.resolve(result)
    else registeredMessage.reject(error)

    delete this.registeredMessage[ id ]
  }

  send(action: string, params = {}):Promise<unknown> {
    if (!action)
      return Promise.reject(new Error('Function requires action {string} parameter'))

    const id = createMessageId()
    this.channel.send('messageFromWeb', {
      action,
      payload: {
        params,
        id,
        site: {
          origin: window.location.origin,
          webIcon: getSiteIcon(window)
        }
      }
    })

    return new Promise((resolve, reject) => {
      this.registeredMessage[ id ] = {
        resolve,
        reject
      }
    })
  }

  destroy() {
    this.channel.removeListener('messageFromWallet', this._walletMessageListener)

    const error = new Error('Messenger destroyed')
    const messageIds = Object.keys(this.registeredMessage)

    for (const id of messageIds) {
      this.registeredMessage[id].reject(error)
      delete this.registeredMessage[id]
    }
  }
}