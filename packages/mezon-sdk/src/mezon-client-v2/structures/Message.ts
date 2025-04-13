import { SocketManager } from "../manager/socket_manager";
import { TextChannel } from "./TextChannel";

export class Message {
  public id: string;
  public mode: number;
  public content: any;
  public ref: any[];
  public mentions: any[];
  public attachments: any[];
  public channel: TextChannel;
  public socketManager: SocketManager;

  constructor(public channelObj: any) {
    this.id = channelObj.id;
    this.mode = channelObj.mode;
    this.content = channelObj?.content;
    this.ref = channelObj?.ref;
    this.mentions = channelObj?.mentions;
    this.attachments = channelObj?.attachments;
    this.channel = channelObj.channel;
    this.socketManager = channelObj?.socketManager;
  }

  async reply(data: any) {
    // TODO: add logic reply
    if (!this.ref.length) throw "No ref for reply message!";
    return await this.socketManager.writeChatMessage(data);
  }

  async update(data: any) {
    // TODO: add logic update
    return await this.socketManager.updateChatMessage(data);
  }

  async react(data: any) {
    // TODO: add logic react
    return await this.socketManager.writeMessageReaction(data);
  }

  delete(data: any) {
    console.log("data", data);
    return null;
  }
}
