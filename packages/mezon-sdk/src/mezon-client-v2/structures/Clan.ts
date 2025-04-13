import { MezonClient } from "../client/MezonClient";
import { CacheManager } from "../utils/CacheManager";
import { TextChannel } from "./TextChannel";

export class Clan {
  public id: string;
  public name: string;
  public channels: CacheManager<string, TextChannel>;
  private client: MezonClient

  constructor(public clanObj: any, client: MezonClient) {
    this.id = clanObj.id;
    this.name = clanObj.name;
    this.client = client;
    this.channels = new CacheManager<string, TextChannel>(async (channelId) => {
      return this.client.channels.fetch(channelId); 
    });
  }
}
