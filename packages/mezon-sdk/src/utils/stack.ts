import { Client, MessagePayLoad, MessageUserPayLoad } from "../interfaces";

export class Stack {
  private items: any[] = [];
  private isProcessing;
  private intervalId = null;
  constructor(
    private messageProcessPerTime = 1,
    private interval = 1000,
    private client: Client,
    private callback: Function,
    private isToUser: boolean = false
  ) {
    this.isProcessing = false;
  }

  push(
    element:
      | MessagePayLoad
      | MessagePayLoad[]
      | MessageUserPayLoad
      | MessageUserPayLoad[]
  ) {
    if (Array.isArray(element)) {
      this.items.push(...element);
    } else {
      this.items.push(element);
    }

    if (this.intervalId == null) {
      setInterval(() => this.processQueue().catch(console.log), this.interval);
    }
  }

  private async processQueue() {
    if (this.isProcessing || this.items.length === 0) {
      clearInterval(this.intervalId!);
      return;
    }

    this.isProcessing = true;

    try {
      for (let i = 0; i < this.messageProcessPerTime; i++) {
        const mess = this.items[0];
        let msgACK;
        if (!this.isToUser) {
          msgACK = await this.client.sendMessage(
            mess.clan_id,
            mess.parent_id,
            mess.channel_id,
            mess.mode,
            mess.is_public,
            mess.is_parent_public,
            mess.msg,
            mess.mentions,
            mess.attachments,
            mess.ref
          );
        } else {
          msgACK = await this.client.sendDMChannelMessage(
            mess.channelDmId,
            mess.msg,
            mess.messOptions ? mess.messOptions : {},
            Array.isArray(mess.attachments) ? mess.attachments : [],
            Array.isArray(mess.refs) ? mess.refs : []
          );
        }

        await this.callback(msgACK);

        this.items.shift();
      }
    } catch (e) {
      this.isProcessing = false;
      return;
    }
    this.isProcessing = false;
  }
}
