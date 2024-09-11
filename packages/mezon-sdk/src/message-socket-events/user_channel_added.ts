import {
  InternalEventsSocket,
} from "../constants";
import { BaseSocketEvent } from "./base_event";

export class UserChannelAdded extends BaseSocketEvent {
  public handleFunctions: ((...args: any[]) => void)[] = [this.joinChannel];
  public event: string = InternalEventsSocket.UserChannelAddedEvent;

  async joinChannel(input: any) {
    console.log(input);
    // await this.socket.joinChat(
    //   input.clan_id,
    //   input.parent_id,
    //   input.channel_id,
    //   input.channel_type,
    //   input.is_public,
    //   input.is_parent_public
    // );
  }
}
