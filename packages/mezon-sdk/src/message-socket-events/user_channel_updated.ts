import { ChannelType, InternalEventsSocket } from "../constants";
import { ChannelUpdatedEvent } from "../interfaces";
import { BaseSocketEvent } from "./base_event";

export class UserChannelUpdated extends BaseSocketEvent {
  public handleFunctions: ((...args: any[]) => void)[] = [this.joinChannel];
  public event: string = InternalEventsSocket.ChannelUpdatedEvent;

  async joinChannel(input: ChannelUpdatedEvent) {
    const isChannelOrThread =
      input.channel_type === ChannelType.CHANNEL_TYPE_THREAD ||
      input.channel_type === ChannelType.CHANNEL_TYPE_CHANNEL;
    if (
      !isChannelOrThread ||
      input.status !== 1 ||
      !input.clan_id ||
      !input.channel_id
    ) {
      return;
    }

    const isPublic = !input.channel_private;
    const { active } = input;
    if (active === 1) {
      await this.socket.joinChat(
        input.clan_id,
        input.channel_id,
        input.channel_type!,
        isPublic,
      );
      return;
    }
    if (active === 0) {
      await this.socket.leaveChat(
        input.clan_id,
        input.channel_id,
        input.channel_type!,
        isPublic,
      );
    }
  }
}
