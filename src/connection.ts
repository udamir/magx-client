import * as notepack from "notepack.io"

import { IMessagePack, IConnection, ICTParams, IMessage } from "."

export class WSConnection implements IConnection {
  public ws: WebSocket
  public messagePack: IMessagePack

  public readonly protocol: string | string[] | undefined
  public readonly url: string

  constructor(params: ICTParams) {
    this.url = params.url
    this.protocol = params.protocol
    this.ws = new WebSocket(params.url, params.protocol)
    this.messagePack = params.messagePack || notepack
  }

  public onClose(handler: (code: number, reason: string) => void) {
    this.ws.onclose = (event: CloseEvent) => handler(event.code, event.reason)
  }

  public onError(handler: (event: Event) => void) {
    this.ws.onerror = (e) => handler(e)
  }

  public onOpen(handler: (event: Event) => void) {
    this.ws.onopen = (e) => handler(e)
  }

  public onMessage(handler: (message: IMessage) => any) {
    this.ws.onmessage = (event: MessageEvent) => {
      if (event.data.arrayBuffer) {
        // event data - Buffer
        event.data.arrayBuffer().then((buffer: Buffer) => {
          handler(this.messagePack.decode<IMessage>(buffer))
        })
      } else {
        // event data - BufferArray
        handler(this.messagePack.decode<IMessage>(event.data))
      }
    }
  }

  public send(message: IMessage): void {
    this.ws.send(this.messagePack.encode(message))
  }

  public close() {
    this.ws.close()
  }
}
