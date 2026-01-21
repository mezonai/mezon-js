import { MezonClientCore } from "./MezonClientCore";
import {
  AddClanUserEvent,
  ChannelCreatedEvent,
  ChannelDeletedEvent,
  ChannelMessage,
  ChannelUpdatedEvent,
  DropdownBoxSelected,
  GiveCoffeeEvent,
  StreamingJoinedEvent,
  StreamingLeavedEvent,
  TokenSentEvent,
  UserChannelAddedEvent,
  UserChannelRemoved,
  UserClanRemovedEvent,
  VoiceEndedEvent,
  VoiceJoinedEvent,
  VoiceLeavedEvent,
  VoiceStartedEvent,
} from "../../interfaces";
import { ChannelType, Events, TypeMessage } from "../../constants";
import {
  MessageButtonClicked,
  Notifications,
  RoleAssignedEvent,
  RoleEvent,
  WebrtcSignalingFwd,
} from "../../rtapi/realtime";
import { CreateEventRequest } from "../../api/api";
import { User, UserInitData } from "../structures/User";
import { Clan } from "../structures/Clan";

export class MezonClient extends MezonClientCore {
  private _internalListenersBound = false;

  constructor(config: any) {
    super(config);
  }

  public override initManager(basePath: string, sessionApi?: any) {
    super.initManager(basePath, sessionApi);
    this._setupInternalListeners();
  }

  private _setupInternalListeners() {
    if (this._internalListenersBound) return;
    this._internalListenersBound = true;

    this.on(
      Events.ChannelMessage.toString(),
      this._onChannelMessageInternal.bind(this),
    );
    this.on(
      Events.ChannelCreated.toString(),
      this._onChannelCreatedInternal.bind(this),
    );
    this.on(
      Events.ChannelUpdated.toString(),
      this._onChannelUpdatedInternal.bind(this),
    );
    this.on(
      Events.ChannelDeleted.toString(),
      this._onChannelDeletedInternal.bind(this),
    );
    this.on(
      Events.UserClanRemoved.toString(),
      this._onUserClanRemovedInternal.bind(this),
    );
    this.on(
      Events.AddClanUser.toString(),
      this._onAddClanUserInternal.bind(this),
    );
    this.on(
      Events.UserChannelAdded.toString(),
      this._onUserChannelAddedInternal.bind(this),
    );
    this.on(Events.TokenSend.toString(), this._onTokenSendInternal.bind(this));
  }

  public onChannelMessage(listener: (e: ChannelMessage) => void): this {
    this.on(Events.ChannelMessage.toString(), listener);
    return this;
  }

  public onChannelCreated(listener: (e: ChannelCreatedEvent) => void): this {
    this.on(Events.ChannelCreated.toString(), listener);
    return this;
  }

  public onChannelUpdated(listener: (e: ChannelUpdatedEvent) => void): this {
    this.on(Events.ChannelUpdated.toString(), listener);
    return this;
  }

  public onChannelDeleted(listener: (e: ChannelDeletedEvent) => void): this {
    this.on(Events.ChannelDeleted.toString(), listener);
    return this;
  }

  public onTokenSend(listener: (e: TokenSentEvent) => void): this {
    this.on(Events.TokenSend.toString(), listener);
    return this;
  }

  public onMessageReaction(listener: (e: any) => void): this {
    this.on(Events.MessageReaction.toString(), listener);
    return this;
  }

  public onUserChannelRemoved(listener: (e: UserChannelRemoved) => void): this {
    this.on(Events.UserChannelRemoved.toString(), listener);
    return this;
  }

  public onUserClanRemoved(listener: (e: UserClanRemovedEvent) => void): this {
    this.on(Events.UserClanRemoved.toString(), listener);
    return this;
  }

  public onUserChannelAdded(
    listener: (e: UserChannelAddedEvent) => void,
  ): this {
    this.on(Events.UserChannelAdded.toString(), listener);
    return this;
  }

  public onGiveCoffee(listener: (e: GiveCoffeeEvent) => void): this {
    this.on(Events.GiveCoffee.toString(), listener);
    return this;
  }

  public onRoleEvent(listener: (e: RoleEvent) => void): this {
    this.on(Events.RoleEvent.toString(), listener);
    return this;
  }

  public onRoleAssign(listener: (e: RoleAssignedEvent) => void): this {
    this.on(Events.RoleAssign.toString(), listener);
    return this;
  }

  public onNotification(listener: (e: Notifications) => void): this {
    this.on(Events.Notifications.toString(), listener);
    return this;
  }

  public onAddClanUser(listener: (e: AddClanUserEvent) => void): this {
    this.on(Events.AddClanUser.toString(), listener);
    return this;
  }

  public onClanEventCreated(listener: (e: CreateEventRequest) => void): this {
    this.on(Events.ClanEventCreated.toString(), listener);
    return this;
  }

  public onMessageButtonClicked(
    listener: (e: MessageButtonClicked) => void,
  ): this {
    this.on(Events.MessageButtonClicked.toString(), listener);
    return this;
  }

  public onStreamingJoinedEvent(
    listener: (e: StreamingJoinedEvent) => void,
  ): this {
    this.on(Events.StreamingJoinedEvent.toString(), listener);
    return this;
  }

  public onStreamingLeavedEvent(
    listener: (e: StreamingLeavedEvent) => void,
  ): this {
    this.on(Events.StreamingLeavedEvent.toString(), listener);
    return this;
  }

  public onDropdownBoxSelected(
    listener: (e: DropdownBoxSelected) => void,
  ): this {
    this.on(Events.DropdownBoxSelected.toString(), listener);
    return this;
  }

  public onWebrtcSignalingFwd(listener: (e: WebrtcSignalingFwd) => void): this {
    this.on(Events.WebrtcSignalingFwd.toString(), listener);
    return this;
  }

  public onVoiceStartedEvent(listener: (e: VoiceStartedEvent) => void): this {
    this.on(Events.VoiceStartedEvent.toString(), listener);
    return this;
  }

  public onVoiceEndedEvent(listener: (e: VoiceEndedEvent) => void): this {
    this.on(Events.VoiceEndedEvent.toString(), listener);
    return this;
  }

  public onVoiceJoinedEvent(listener: (e: VoiceJoinedEvent) => void): this {
    this.on(Events.VoiceJoinedEvent.toString(), listener);
    return this;
  }

  public onVoiceLeavedEvent(listener: (e: VoiceLeavedEvent) => void): this {
    this.on(Events.VoiceLeavedEvent.toString(), listener);
    return this;
  }

  public onQuickMenuEvent(listener: (e: any) => void): this {
    this.on(Events.QuickMenu.toString(), listener);
    return this;
  }

  private async _onChannelMessageInternal(e: ChannelMessage) {
    await this._initChannelMessageCache(e);
    await this._initUserClanCache(e);
  }

  private async _onChannelCreatedInternal(e: ChannelCreatedEvent) {
    this._updateCacheChannel(e);
  }

  private async _onChannelUpdatedInternal(e: ChannelUpdatedEvent) {
    if (e.channel_type === ChannelType.CHANNEL_TYPE_THREAD && e.status === 1) {
      const socket = this.socketManager.getSocket();
      await socket.joinChat(e.clan_id, e.channel_id, e.channel_type, false);
    }
    this._updateCacheChannel(e);
  }

  private async _onChannelDeletedInternal(e: ChannelDeletedEvent) {
    const clan = this.clans.get(e.clan_id);
    if (!clan) return;
    this.channels.delete(e.channel_id!);
    clan.channels.delete(e.channel_id!);
  }

  private async _onUserClanRemovedInternal(e: UserClanRemovedEvent) {
    e.user_ids.forEach((user_id: string) => {
      this.users.delete(user_id);
    });
  }

  private async _onAddClanUserInternal(e: AddClanUserEvent) {
    if (e.user.user_id === this.clientId) {
      this.socketManager.getSocket().joinClanChat(e.clan_id);
      const clan = this.clans.get(e.clan_id);

      if (!clan) {
        const clanObj = new Clan(
          {
            id: e.clan_id!,
            name: "unknown",
            welcome_channel_id: "",
            clan_name: "",
          },
          this,
          this.apiClient,
          this.socketManager,
          this.sessionManager.getSession()?.token!,
          this.messageQueue,
          this.messageDB,
        );
        await clanObj.loadChannels();
        this.clans.set(e.clan_id, clanObj);
      }
    } else {
      const userRaw: UserInitData = {
        id: e.user.user_id!,
        username: e.user.username!,
        clan_nick: "",
        clan_avatar: "",
        avartar: e.user.avatar!,
        display_name: e.user.display_name,
        dmChannelId: "",
      };

      let user = this.users.get(e.user.user_id!);

      if (!user) {
        user = new User(userRaw, {
          socketManager: this.socketManager,
          messageQueue: this.messageQueue,
          channelManager: this.channelManager,
        });
        this.users.set(e.user.user_id!, user);
      } else {
        user.username = userRaw.username ?? user.username;
        user.clan_nick = userRaw.clan_nick ?? user.clan_nick;
        user.clan_avatar = userRaw.clan_avatar ?? user.clan_avatar;
        user.display_name = userRaw.display_name ?? user.display_name;
        user.avartar = userRaw.avartar ?? user.avartar;
        if (userRaw.dmChannelId) {
          user.dmChannelId = userRaw.dmChannelId;
        }
      }
    }
  }

  private async _onUserChannelAddedInternal(e: UserChannelAddedEvent) {
    const socket = this.socketManager.getSocket();
    if (e?.users?.some((user) => user.user_id == this.clientId)) {
      await socket.joinChat(
        e.clan_id,
        e.channel_desc.channel_id!,
        e.channel_desc.type!,
        !e.channel_desc.channel_private,
      );
    }
  }

  private async _onTokenSendInternal(e: TokenSentEvent) {
    if (e.sender_id === this.clientId) {
      const receiver = await this.users.fetch(e.receiver_id);
      await receiver?.sendDM(
        {
          t: `Funds Transferred: ${(+e.amount).toLocaleString()}₫ | ${
            e.note || "Transfer funds"
          }`,
        },
        TypeMessage.SendToken,
      );
    }
  }
}
