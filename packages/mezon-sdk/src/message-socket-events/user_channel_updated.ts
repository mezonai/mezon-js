import { ChannelType, InternalEventsSocket } from "../constants";
import { ChannelUpdatedEvent } from "../interfaces";
import { BaseSocketEvent } from "./base_event";

export class UserChannelUpdated extends BaseSocketEvent {
  public handleFunctions: ((...args: any[]) => void)[] = [this.joinChannel];
  public event: string = InternalEventsSocket.ChannelUpdatedEvent;

  async joinChannel(input: ChannelUpdatedEvent) {
    if (
      input.channel_type === ChannelType.CHANNEL_TYPE_THREAD &&
      input.status === 1
    )
      await this.socket.joinChat(
        input.clan_id,
        input.channel_id,
        input.channel_type,
        false
      );
  }
}
