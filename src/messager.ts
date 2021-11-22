import { v4 as randomUUID } from "uuid";
import {getSiteIcon} from "./utils";
import MessageChannel from "./lib/messageChannel";

interface ProviderError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

interface response {
  error: Error,
  result: unknown
}

export default class Messenger {
  registeredMessage:{[key:string]: { resolve:(res: response)=>void, reject: (res: response)=>void }};
  channel: MessageChannel;
  constructor(channel:MessageChannel) {
    this.channel = channel
    this.registeredMessage = {}
    this.initListener()
  }

  initListener() {
    this.channel.on('messageFromWallet', ({ error, result, id }) => {
      if(!error)
        this.registeredMessage[ id ].resolve(result)
      else this.registeredMessage[ id ].reject(error)

      delete this.registeredMessage[ id ]
    });
  }

  send(action: string, params = {}):Promise<{ result: unknown, error: Error }> {
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