import {
  InternalEventsSocket,
} from "../constants";
import { UserChannelAddedEvent } from "../interfaces";
import { BaseSocketEvent } from "./base_event";

export class UserChannelAdded extends BaseSocketEvent {
  public handleFunctions: ((...args: any[]) => void)[] = [this.joinChannel];
  public event: string = InternalEventsSocket.UserChannelAddedEvent;

  async joinChannel(input: UserChannelAddedEvent) {
    if (input.users.some(user => user.user_id == this.socket.session.user_id)){
      await this.socket.joinChat(
        input.clan_id,
        input.channel_desc.channel_id!,
        input.channel_desc.type!,
        !input.channel_desc.channel_private,
      );
    }
  }
}
