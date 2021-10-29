import { v4 as randomUUID } from "uuid";
import {getSiteIcon} from "./utils";
import MessageChannel from "./lib/messageChannel";
type res = {
  error: any,
  result: any
}

export default class Messenger {
  registeredMessage:{[key:string]: { resolve:(res: res)=>void, reject: (res: res)=>void }};
  channel: MessageChannel;
  constructor(channel:MessageChannel) {
    this.channel = channel
    this.registeredMessage = {}
    this.initListener()
  }
  initListener() {
    this.channel.on('messageFromWallet', ({ error, result, id }) => {
      if(!error)
        this.registeredMessage[ id ].resolve({ error, result })
      else this.registeredMessage[ id ].reject({ error, result })

      delete this.registeredMessage[ id ]
    });
  }
  send(action: string, params = {}) {
    const id = randomUUID()
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
}