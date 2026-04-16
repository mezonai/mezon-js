import { buildFetchOptions } from "./utils";
import { encode } from "js-base64";
import * as tsproto from "mezon-js-protobuf";
import {
  MultipartUploadAttachment,
  MultipartUploadAttachmentFinishRequest,
  WebSocketAdapter,
  TransportAdapter,
  AbridgedTcpAdapter,
} from "mezon-js-protobuf";
import {
  ApiAccount,
  ApiAccountEmail,
  ApiAccountMezon,
  ApiAddAppRequest,
  ApiAddFavoriteChannelRequest,
  ApiAddFriendsResponse,
  ApiAddRoleChannelDescRequest,
  ApiAllUserClans,
  ApiAllUsersAddChannelResponse,
  ApiApp,
  ApiAppList,
  ApiAuthenticateEmailRequest,
  ApiAuthenticateSMSRequest,
  ApiBannedUserList,
  ApiCategoryDesc,
  ApiCategoryDescList,
  ApiChanEncryptionMethod,
  ApiChangeChannelPrivateRequest,
  ApiChannelAttachmentList,
  ApiChannelCanvasDetailResponse,
  ApiChannelCanvasListResponse,
  ApiChannelDescList,
  ApiChannelDescription,
  ApiChannelMessageHeader,
  ApiChannelMessageList,
  ApiChannelSettingListResponse,
  ApiChannelUserList,
  ApiCheckDuplicateNameRequest,
  ApiCheckDuplicateNameResponse,
  ApiClanDesc,
  ApiClanDescList,
  ApiClanDiscoverRequest,
  ApiClanEmojiCreateRequest,
  ApiClanProfile,
  ApiClanStickerAddRequest,
  ApiClanUserList,
  ApiClanUserStatusList,
  ApiClosePollRequest,
  ApiConfirmLoginRequest,
  ApiCreateActivityRequest,
  ApiCreateCategoryDescRequest,
  ApiCreateChannelDescRequest,
  ApiCreateChannelTimelineRequest,
  ApiCreateChannelTimelineResponse,
  ApiCreateClanDescRequest,
  ApiCreateEventRequest,
  ApiCreateHashChannelAppsResponse,
  ApiCreateOnboardingRequest,
  ApiCreatePollRequest,
  ApiCreatePollResponse,
  ApiCreateRoleRequest,
  ApiDeleteChannelDescRequest,
  ApiDeleteEventRequest,
  ApiDeleteRoleRequest,
  ApiDetailChannelTimelineRequest,
  ApiDetailChannelTimelineResponse,
  ApiEditChannelCanvasRequest,
  ApiEditChannelCanvasResponse,
  ApiEmojiListedResponse,
  ApiEmojiRecentList,
  ApiEvent,
  ApiEventList,
  ApiEventManagement,
  ApiForSaleItemList,
  ApiFriendList,
  ApiGenerateClanWebhookRequest,
  ApiGenerateClanWebhookResponse,
  ApiGenerateMeetTokenExternalResponse,
  ApiGenerateMeetTokenRequest,
  ApiGenerateMeetTokenResponse,
  ApiGenerateMezonMeetResponse,
  ApiGetKeyServerResp,
  ApiGetPollRequest,
  ApiGetPollResponse,
  ApiGetPubKeysResponse,
  ApiGiveCoffeeEvent,
  ApiInviteUserRes,
  ApiIsBannedResponse,
  ApiIsFollowerRequest,
  ApiIsFollowerResponse,
  ApiLinkAccountConfirmRequest,
  ApiLinkAccountMezon,
  ApiLinkInviteUser,
  ApiLinkInviteUserRequest,
  ApiListChannelAppsResponse,
  ApiListChannelBadgeCountResponse,
  ApiListChannelTimelineRequest,
  ApiListChannelTimelineResponse,
  ApiListClanDiscover,
  ApiListClanWebhookResponse,
  ApiListFavoriteChannelResponse,
  ApiListOnboardingResponse,
  ApiListOnboardingStepResponse,
  ApiListUserActivity,
  ApiListUserOnlineResponse,
  ApiLoginIDResponse,
  ApiLoginRequest,
  ApiMarkAsReadRequest,
  ApiMeetParticipantRequest,
  ApiMessage2InboxRequest,
  ApiMessageAttachment,
  ApiMessageMention,
  ApiMessageReaction,
  ApiMessageRef,
  ApiMezonOauthClient,
  ApiMezonOauthClientList,
  ApiMutedChannelList,
  ApiNotificationChannel,
  ApiNotificationChannelCategorySettingList,
  ApiNotificationList,
  ApiNotificationSetting,
  ApiNotificationUserChannel,
  ApiNotifiReactMessage,
  ApiOnboardingItem,
  ApiPermissionList,
  ApiPermissionRoleChannelListEventResponse,
  ApiPinMessageRequest,
  ApiPushPubKeyRequest,
  ApiQuickMenuAccessList,
  ApiQuickMenuAccessRequest,
  ApiRegisterStreamingChannelRequest,
  ApiRegisterStreamingChannelResponse,
  ApiRegistFcmDeviceTokenResponse,
  ApiRegistrationEmailRequest,
  ApiRole,
  ApiRoleList,
  ApiRoleListEventResponse,
  ApiRoleUserList,
  ApiSdTopic,
  ApiSdTopicList,
  ApiSdTopicRequest,
  ApiSearchMessageRequest,
  ApiSearchMessageResponse,
  ApiSession,
  ApiSessionLogoutRequest,
  ApiSessionRefreshRequest,
  ApiSetDefaultNotificationRequest,
  ApiSetMuteRequest,
  ApiSetNotificationRequest,
  ApiStickerListedResponse,
  ApiStreamingChannelUserList,
  ApiSystemMessage,
  ApiSystemMessageRequest,
  ApiSystemMessagesList,
  ApiTokenSentEvent,
  ApiTransferOwnershipRequest,
  ApiUpdateAccountRequest,
  ApiUpdateCategoryOrderRequest,
  ApiUpdateChannelDescRequest,
  ApiUpdateChannelTimelineRequest,
  ApiUpdateChannelTimelineResponse,
  ApiUpdateClanOrderRequest,
  ApiUpdateRoleChannelRequest,
  ApiUpdateRoleOrderRequest,
  ApiUpdateUsernameRequest,
  ApiUpdateUsersRequest,
  ApiUploadAttachment,
  ApiUploadAttachmentRequest,
  ApiUserActivity,
  ApiUserEventRequest,
  ApiUserPermissionInChannelListResponse,
  ApiUserStatus,
  ApiUserStatusUpdate,
  ApiVoiceChannelUserList,
  ApiVotePollRequest,
  ApiVotePollResponse,
  ApiWebhookCreateRequest,
  ApiWebhookListResponse,
  Channel,
  ChannelAppEvent,
  ClanJoin,
  CustomStatusEvent,
  IncomingCallPush,
  LastPinMessageEvent,
  LastSeenMessageEvent,
  ListDataSocket,
  MessageTypingEvent,
  MezonapiCreateRoomChannelApps,
  MezonapiListAuditLog,
  MezonChangeChannelCategoryBody,
  MezonDeleteWebhookByIdBody,
  MezonSetChanEncryptionMethodBody,
  MezonUpdateAppBody,
  MezonUpdateCategoryBody,
  MezonUpdateClanEmojiByIdBody,
  MezonUpdateClanStickerByIdBody,
  MezonUpdateClanWebhookByIdBody,
  MezonUpdateEventBody,
  MezonUpdateOnboardingBody,
  MezonUpdateOnboardingStepByClanIdBody,
  MezonUpdateRoleBody,
  MezonUpdateRoleDeleteBody,
  MezonUpdateSystemMessageBody,
  MezonUpdateUserProfileByClanBody,
  MezonUpdateWebhookByIdBody,
  PromiseExecutor,
  QuickMenuEvent,
  Status,
  VoiceReactionSend,
  WebrtcSignalingFwd,
} from "./types";

import { Session } from "./session";

export class MezonTransport {
  public static readonly DefaultSendTimeoutMs = 10000;

  private readonly cIds: { [key: number]: PromiseExecutor };
  private nextCid: number;

  adapter: TransportAdapter;
  private basePath: string;

  constructor(
    readonly serverKey: string,
    readonly timeoutMs: number,
    readonly platform: string = "web",
    basePath: string,
  ) {
    this.cIds = {};
    this.nextCid = 1;

    this.basePath = basePath;
    if (platform == "desktop") {
      this.adapter = new AbridgedTcpAdapter();
    } else {
      this.adapter = new WebSocketAdapter();
    }
  }

  setOnOpen(onopen: (evt: Event) => void) {
    this.adapter.onOpen = onopen;
  }

  setOnError(onerror: (evt: Event) => void) {
    this.adapter.onError = onerror;
  }

  close() {
    this.adapter.close();
  }

  generatecid(): number {
    const cid = this.nextCid;
    ++this.nextCid;
    return cid;
  }

  setTransportAdapter(transportAdapter: TransportAdapter) {
    this.adapter = transportAdapter;
  }

  connect(
    session: Session,
    createStatus = false,
    verbose = false,
    onMessage: tsproto.SocketMessageHandler,
    onDisconnected: tsproto.SocketCloseHandler,
    signal?: AbortSignal,
  ): void {
    const [host, port] = session.ws_url.split(":");
    this.adapter.connect(host, port, createStatus, session.token, signal);

    this.adapter.onClose = onDisconnected;
    this.adapter.onMessage = async (
      cid: number,
      code: number,
      message: any,
    ) => {
      if (verbose && window && window.console) {
        console.log(
          "incomming message witch cid %o and message %o",
          cid,
          message,
        );
      }
      if (cid) {
        const executor = this.cIds[cid];
        if (!executor) {
          console.error("No promise executor for message: %o", message);
          return;
        }
        delete this.cIds[cid];
        if (message.error) {
          executor.reject(message.error);
        } else {
          executor.resolve({ code, message });
        }
      } else {
        await onMessage(0, 0, message);
      }
    };
  }

  send(
    data: any,
    sendTimeout = MezonTransport.DefaultSendTimeoutMs,
  ): Promise<any> {
    const { urlPath, fetchOptions } = data;
    let untypedMessage = fetchOptions as any;
    if (urlPath?.includes("/mezon.api.Mezon/")) {
      untypedMessage = {
        api_request_event: {
          full_url: urlPath,
          body: fetchOptions.body,
        },
      };
    }

    return new Promise<void>((resolve, reject) => {
      if (!this.adapter.isOpen()) {
        reject("Socket connection has not been established yet.");
      } else {
        if (untypedMessage.channel_message_send) {
          untypedMessage.channel_message_send.content = JSON.stringify(
            untypedMessage.channel_message_send.content,
          );
        } else if (untypedMessage.channel_message_update) {
          untypedMessage.channel_message_update.content = JSON.stringify(
            untypedMessage.channel_message_update.content,
          );
        } else if (untypedMessage.ephemeral_message_send) {
          untypedMessage.ephemeral_message_send.message.content =
            JSON.stringify(
              untypedMessage.ephemeral_message_send.message?.content,
            );
        } else if (untypedMessage.quick_menu_event) {
          untypedMessage.quick_menu_event.message.content = JSON.stringify(
            untypedMessage.quick_menu_event.message?.content,
          );
        }

        const cid = this.generatecid();
        this.cIds[cid] = { resolve, reject };
        if (sendTimeout !== Infinity && sendTimeout > 0) {
          setTimeout(() => {
            reject("The socket timed out while waiting for a response.");
          }, sendTimeout);
        }

        untypedMessage.cid = cid.toString();
        this.adapter.send(untypedMessage);
      }
    });
  }

  setBasePath(basePath: string) {
    this.basePath = basePath;
  }

  /** Delete the current user's account. */
  deleteAccount(bearerToken: string, options = {}): Promise<any> {
    const urlPath = "/mezon.api.Mezon/DeleteAccount";
    const bodyJson = "";
    const fetchOptions = buildFetchOptions("POST", options, bodyJson);
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** Fetch the current user's account. */
  getAccount(bearerToken: string, options = {}): Promise<ApiAccount> {
    const urlPath = "/mezon.api.Mezon/GetAccount";
    const bodyJson = "";
    const fetchOptions = buildFetchOptions("POST", options, bodyJson);
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiAccount;
        }
        return tsproto.Account.decode(response.message) as ApiAccount;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Update fields in the current user's account. */
  updateAccount(
    bearerToken: string,
    body: ApiUpdateAccountRequest,
    options = {},
  ): Promise<any> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/UpdateAccount";
    const bodyWriter = tsproto.UpdateAccountRequest.encode(
      tsproto.UpdateAccountRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  checkLoginRequest(
    basicAuthUsername: string,
    basicAuthPassword: string,
    body: ApiConfirmLoginRequest,
    options = {},
  ): Promise<ApiSession> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/v2/account/authenticate/checklogin";
    const queryParams = new Map<string, any>();

    let bodyJson = "";
    bodyJson = JSON.stringify(body || {});

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, bodyJson);
    if (basicAuthUsername) {
      fetchOptions.headers["Authorization"] =
        "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);
    }
    fetchOptions.headers["Accept"] = "application/x-protobuf";
    fetchOptions.headers["Content-Type"] = "application/json";

    return Promise.race([
      fetch(fullUrl, fetchOptions).then(async (response) => {
        const buffer = await response.arrayBuffer();
        return tsproto.Session.decode(new Uint8Array(buffer)) as ApiSession;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /**  */
  confirmLogin(
    bearerToken: string,
    basePath: string,
    body: ApiConfirmLoginRequest,
    options = {},
  ): Promise<any> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/v2/account/authenticate/confirmlogin";
    const queryParams = new Map<string, any>();

    let bodyJson = "";
    bodyJson = JSON.stringify(body || {});

    const fullUrl = this.buildFullUrl(basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, bodyJson);
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }
    fetchOptions.headers["Accept"] = "application/x-protobuf";
    fetchOptions.headers["Content-Type"] = "application/json";

    return Promise.race([
      fetch(fullUrl, fetchOptions).then((response) => {
        return response;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /**  */
  createQRLogin(
    basicAuthUsername: string,
    basicAuthPassword: string,
    body: ApiLoginRequest,
    options = {},
  ): Promise<ApiLoginIDResponse> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/v2/account/authenticate/createqrlogin";
    const queryParams = new Map<string, any>();

    let bodyJson = "";
    bodyJson = JSON.stringify(body || {});

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, bodyJson);
    if (basicAuthUsername) {
      fetchOptions.headers["Authorization"] =
        "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);
    }
    fetchOptions.headers["Accept"] = "application/x-protobuf";
    fetchOptions.headers["Content-Type"] = "application/json";

    return Promise.race([
      fetch(fullUrl, fetchOptions).then(async (response) => {
        const buffer = await response.arrayBuffer();
        return tsproto.LoginIDResponse.decode(
          new Uint8Array(buffer),
        ) as ApiLoginIDResponse;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Authenticate a user with an SMS against the server. */
  AuthenticateSMSOTPRequest(
    basicAuthUsername: string,
    basicAuthPassword: string,
    body: ApiAuthenticateSMSRequest,
    options = {},
  ): Promise<ApiLinkAccountConfirmRequest> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/v2/account/authenticate/smsotp";
    const queryParams = new Map<string, any>();

    let bodyJson = "";
    bodyJson = JSON.stringify(body || {});

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, bodyJson);
    if (basicAuthUsername) {
      fetchOptions.headers["Authorization"] =
        "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);
    }
    fetchOptions.headers["Accept"] = "application/x-protobuf";
    fetchOptions.headers["Content-Type"] = "application/json";

    return Promise.race([
      fetch(fullUrl, fetchOptions).then(async (response) => {
        const buffer = await response.arrayBuffer();
        return tsproto.LinkAccountConfirmRequest.decode(
          new Uint8Array(buffer),
        ) as ApiLinkAccountConfirmRequest;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Authenticate a user with an email+password against the server. */
  AuthenticateEmailOTPRequest(
    basicAuthUsername: string,
    basicAuthPassword: string,
    body: ApiAuthenticateEmailRequest,
    options = {},
  ): Promise<ApiLinkAccountConfirmRequest> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/v2/account/authenticate/emailotp";
    const queryParams = new Map<string, any>();

    let bodyJson = "";
    bodyJson = JSON.stringify(body || {});

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, bodyJson);
    if (basicAuthUsername) {
      fetchOptions.headers["Authorization"] =
        "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);
    }
    fetchOptions.headers["Accept"] = "application/x-protobuf";
    fetchOptions.headers["Content-Type"] = "application/json";

    return Promise.race([
      fetch(fullUrl, fetchOptions).then(async (response) => {
        const buffer = await response.arrayBuffer();
        return tsproto.LinkAccountConfirmRequest.decode(
          new Uint8Array(buffer),
        ) as ApiLinkAccountConfirmRequest;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Authenticate a user with an email+password against the server. */
  authenticateEmail(
    basicAuthUsername: string,
    basicAuthPassword: string,
    body: ApiAuthenticateEmailRequest,
    options = {},
  ): Promise<ApiSession> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/v2/account/authenticate/email";
    const queryParams = new Map<string, any>();

    let bodyJson = "";
    bodyJson = JSON.stringify(body || {});

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, bodyJson);
    if (basicAuthUsername) {
      fetchOptions.headers["Authorization"] =
        "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);
    }
    fetchOptions.headers["Accept"] = "application/x-protobuf";
    fetchOptions.headers["Content-Type"] = "application/json";

    return Promise.race([
      fetch(fullUrl, fetchOptions).then(async (response) => {
        const buffer = await response.arrayBuffer();
        return tsproto.Session.decode(new Uint8Array(buffer)) as ApiSession;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Authenticate a user with Mezon against the server. */
  authenticateMezon(
    basicAuthUsername: string,
    basicAuthPassword: string,
    account: ApiAccountMezon,
    create?: boolean,
    username?: string,
    isRemember?: boolean,
    options = {},
  ): Promise<ApiSession> {
    if (account === null || account === undefined) {
      throw new Error(
        "'account' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/v2/account/authenticate/mezon";
    const queryParams = new Map<string, any>();
    queryParams.set("create", create);
    queryParams.set("username", username);
    queryParams.set("is_remember", isRemember);

    let bodyJson = "";
    bodyJson = JSON.stringify(account || {});

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, bodyJson);
    if (basicAuthUsername) {
      fetchOptions.headers["Authorization"] =
        "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);
    }
    fetchOptions.headers["Accept"] = "application/x-protobuf";

    return Promise.race([
      fetch(fullUrl, fetchOptions).then(async (response) => {
        const buffer = await response.arrayBuffer();
        return tsproto.Session.decode(new Uint8Array(buffer)) as ApiSession;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Add an email+password to the social profiles on the current user's account. */
  linkEmail(
    bearerToken: string,
    body: ApiAccountEmail,
    options = {},
  ): Promise<ApiLinkAccountConfirmRequest> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/LinkEmail";
    const bodyWriter = tsproto.AccountEmail.encode(
      tsproto.AccountEmail.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiLinkAccountConfirmRequest;
        }
        return tsproto.LinkAccountConfirmRequest.decode(
          response.message,
        ) as ApiLinkAccountConfirmRequest;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Add a mezon ID to the social profiles on the current user's account. */
  linkSMS(
    bearerToken: string,
    body: ApiLinkAccountMezon,
    options = {},
  ): Promise<ApiLinkAccountConfirmRequest> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/LinkSMS";
    const bodyWriter = tsproto.AccountMezon.encode(
      tsproto.AccountMezon.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiLinkAccountConfirmRequest;
        }
        return tsproto.LinkAccountConfirmRequest.decode(
          response.message,
        ) as ApiLinkAccountConfirmRequest;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /**  */
  confirmLinkMezonOTP(
    bearerToken: string,
    body: ApiLinkAccountConfirmRequest,
    options = {},
  ): Promise<ApiSession> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/ConfirmLinkMezonOTP";
    const bodyWriter = tsproto.LinkAccountConfirmRequest.encode(
      tsproto.LinkAccountConfirmRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }
    fetchOptions.headers["Accept"] = "application/x-protobuf";

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiSession;
        }
        return tsproto.Session.decode(response.message) as ApiSession;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /**  */
  confirmAuthenticateOTP(
    basicAuthUsername: string,
    basicAuthPassword: string,
    body: ApiLinkAccountConfirmRequest,
    options = {},
  ): Promise<ApiSession> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/v2/account/authenticate/confirmotp";
    const queryParams = new Map<string, any>();

    let bodyJson = "";
    bodyJson = JSON.stringify(body || {});

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, bodyJson);
    if (basicAuthUsername) {
      fetchOptions.headers["Authorization"] =
        "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);
    }
    fetchOptions.headers["Accept"] = "application/x-protobuf";
    fetchOptions.headers["Content-Type"] = "application/json";

    return Promise.race([
      fetch(fullUrl, fetchOptions).then(async (response) => {
        const buffer = await response.arrayBuffer();
        return tsproto.Session.decode(new Uint8Array(buffer)) as ApiSession;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Authenticate a user with an email+password against the server. */
  registrationEmail(
    bearerToken: string,
    body: ApiRegistrationEmailRequest,
    options = {},
  ): Promise<ApiSession> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/RegistrationEmail";
    const bodyWriter = tsproto.RegistrationEmailRequest.encode(
      tsproto.RegistrationEmailRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiSession;
        }
        return tsproto.Session.decode(response.message) as ApiSession;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Refresh a user's session using a refresh token retrieved from a previous authentication request. */
  sessionRefresh(
    basicAuthUsername: string,
    basicAuthPassword: string,
    body: ApiSessionRefreshRequest,
    options = {},
  ): Promise<ApiSession> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/SessionRefresh";
    const bodyWriter = tsproto.SessionRefreshRequest.encode(
      tsproto.SessionRefreshRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (basicAuthUsername) {
      fetchOptions.headers["Authorization"] =
        "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiSession;
        }
        return tsproto.Session.decode(response.message) as ApiSession;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Remove the email+password from the social profiles on the current user's account. */
  unlinkEmail(
    bearerToken: string,
    body: ApiAccountEmail,
    options = {},
  ): Promise<any> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/UnlinkEmail";
    const bodyWriter = tsproto.AccountEmail.encode(
      tsproto.AccountEmail.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** List activity */
  listActivity(
    bearerToken: string,
    options = {},
  ): Promise<ApiListUserActivity> {
    const urlPath = "/mezon.api.Mezon/ListActivity";

    const fetchOptions = buildFetchOptions("POST", options, "");
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiListUserActivity;
        }
        return tsproto.ListUserActivity.decode(
          response.message,
        ) as ApiListUserActivity;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Create user activity */
  createActiviy(
    bearerToken: string,
    body: ApiCreateActivityRequest,
    options = {},
  ): Promise<ApiUserActivity> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/CreateActiviy";
    const bodyWriter = tsproto.CreateActivityRequest.encode(
      tsproto.CreateActivityRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiUserActivity;
        }
        return tsproto.UserActivity.decode(response.message) as ApiUserActivity;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Add a new apps. */
  addApp(
    bearerToken: string,
    body: ApiAddAppRequest,
    options = {},
  ): Promise<ApiApp> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/AddApp";
    const bodyWriter = tsproto.AddAppRequest.encode(
      tsproto.AddAppRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiApp;
        }
        return tsproto.App.decode(response.message) as ApiApp;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** List (and optionally filter) accounts. */
  listApps(
    bearerToken: string,
    filter?: string,
    tombstones?: boolean,
    cursor?: string,
    options = {},
  ): Promise<ApiAppList> {
    const urlPath = "/mezon.api.Mezon/ListApps";

    const bodyWriter = tsproto.ListAppsRequest.encode(
      tsproto.ListAppsRequest.fromPartial({
        filter: filter,
        tombstones: tombstones,
        cursor: cursor,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiAppList;
        }
        return tsproto.AppList.decode(response.message) as ApiAppList;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Add an app to clan. */
  addAppToClan(
    bearerToken: string,
    appId: string,
    clanId: string,
    options = {},
  ): Promise<any> {
    if (appId === null || appId === undefined) {
      throw new Error(
        "'appId' is a required parameter but is null or undefined.",
      );
    }
    if (clanId === null || clanId === undefined) {
      throw new Error(
        "'clanId' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/AddAppToClan";

    const bodyWriter = tsproto.AppClan.encode(
      tsproto.AppClan.fromPartial({
        app_id: appId,
        clan_id: clanId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** Delete all information stored for an app. */
  deleteApp(bearerToken: string, id: string, options = {}): Promise<any> {
    if (id === null || id === undefined) {
      throw new Error("'id' is a required parameter but is null or undefined.");
    }
    const urlPath = "/mezon.api.Mezon/DeleteApp";

    const bodyWriter = tsproto.App.encode(
      tsproto.App.fromPartial({
        id: id,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** Get detailed app information. */
  getApp(bearerToken: string, id: string, options = {}): Promise<ApiApp> {
    if (id === null || id === undefined) {
      throw new Error("'id' is a required parameter but is null or undefined.");
    }
    const urlPath = "/mezon.api.Mezon/GetApp";

    const bodyWriter = tsproto.App.encode(
      tsproto.App.fromPartial({
        id: id,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiApp;
        }
        return tsproto.App.decode(response.message) as ApiApp;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Update one or more fields on a app. */
  updateApp(
    bearerToken: string,
    id: string,
    body: MezonUpdateAppBody,
    options = {},
  ): Promise<ApiApp> {
    if (id === null || id === undefined) {
      throw new Error("'id' is a required parameter but is null or undefined.");
    }
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/UpdateApp";

    const bodyWriter = tsproto.UpdateAppRequest.encode(
      tsproto.UpdateAppRequest.fromPartial({ ...body, id: id }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiApp;
        }
        return tsproto.App.decode(response.message) as ApiApp;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /**  */
  listAuditLog(
    bearerToken: string,
    actionLog?: string,
    userId?: string,
    clanId?: string,
    dateLog?: string,
    options = {},
  ): Promise<MezonapiListAuditLog> {
    const urlPath = "/mezon.api.Mezon/ListAuditLog";

    const bodyWriter = tsproto.ListAuditLogRequest.encode(
      tsproto.ListAuditLogRequest.fromPartial({
        clan_id: clanId,
        user_id: userId,
        action_log: actionLog,
        date_log: dateLog,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        return tsproto.ListAuditLog.decode(
          response,
        ) as unknown as MezonapiListAuditLog;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }
  /**  */
  updateCategoryOrder(
    bearerToken: string,
    body: ApiUpdateCategoryOrderRequest,
    options = {},
  ): Promise<any> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/UpdateCategoryOrder";
    const bodyWriter = tsproto.UpdateCategoryOrderRequest.encode(
      tsproto.UpdateCategoryOrderRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /**  */
  listCategoryDescs(
    bearerToken: string,
    clanId: string,
    creatorId?: string,
    categoryName?: string,
    categoryId?: string,
    categoryOrder?: number,
    options = {},
  ): Promise<ApiCategoryDescList> {
    if (clanId === null || clanId === undefined) {
      throw new Error(
        "'clanId' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/ListCategoryDescs";

    const bodyWriter = tsproto.CategoryDesc.encode(
      tsproto.CategoryDesc.fromPartial({
        clan_id: clanId,
        creator_id: creatorId,
        category_name: categoryName,
        category_id: categoryId,
        category_order: categoryOrder,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiCategoryDescList;
        }
        return tsproto.CategoryDescList.decode(
          response.message,
        ) as ApiCategoryDescList;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** List channel apps. */
  listChannelApps(
    bearerToken: string,
    clanId?: string,
    options = {},
  ): Promise<ApiListChannelAppsResponse> {
    const urlPath = "/mezon.api.Mezon/ListChannelApps";

    const bodyWriter = tsproto.ListChannelAppsRequest.encode(
      tsproto.ListChannelAppsRequest.fromPartial({
        clan_id: clanId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiListChannelAppsResponse;
        }
        return tsproto.ListChannelAppsResponse.decode(
          response.message,
        ) as ApiListChannelAppsResponse;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /**  */
  getChannelCanvasList(
    bearerToken: string,
    channelId: string,
    clanId?: string,
    limit?: number,
    page?: number,
    options = {},
  ): Promise<ApiChannelCanvasListResponse> {
    if (channelId === null || channelId === undefined) {
      throw new Error(
        "'channelId' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/GetChannelCanvasList";

    const bodyWriter = tsproto.ChannelCanvasListRequest.encode(
      tsproto.ChannelCanvasListRequest.fromPartial({
        channel_id: channelId,
        clan_id: clanId,
        limit: limit,
        page: page,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiChannelCanvasListResponse;
        }
        return tsproto.ChannelCanvasListResponse.decode(
          response.message,
        ) as ApiChannelCanvasListResponse;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /**  */
  addChannelFavorite(
    bearerToken: string,
    body: ApiAddFavoriteChannelRequest,
    options = {},
  ): Promise<any> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/AddChannelFavorite";
    const bodyWriter = tsproto.AddFavoriteChannelRequest.encode(
      tsproto.AddFavoriteChannelRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        return tsproto.AddFavoriteChannelResponse.decode(response);
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /**  */
  removeChannelFavorite(
    bearerToken: string,
    channelId: string,
    clanId?: string,
    options = {},
  ): Promise<any> {
    if (channelId === null || channelId === undefined) {
      throw new Error(
        "'channelId' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/RemoveChannelFavorite";

    const bodyWriter = tsproto.RemoveFavoriteChannelRequest.encode(
      tsproto.RemoveFavoriteChannelRequest.fromPartial({
        channel_id: channelId,
        clan_id: clanId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /**  */
  getListFavoriteChannel(
    bearerToken: string,
    clanId: string,
    options = {},
  ): Promise<ApiListFavoriteChannelResponse> {
    if (clanId === null || clanId === undefined) {
      throw new Error(
        "'clanId' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/GetListFavoriteChannel";

    const bodyWriter = tsproto.ListFavoriteChannelRequest.encode(
      tsproto.ListFavoriteChannelRequest.fromPartial({
        clan_id: clanId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiListFavoriteChannelResponse;
        }
        return tsproto.ListFavoriteChannelResponse.decode(
          response.message,
        ) as ApiListFavoriteChannelResponse;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** List a channel's message history. */
  listChannelMessages(
    bearerToken: string,
    clanId: string,
    channelId: string,
    messageId?: string,
    direction?: number,
    limit?: number,
    topicId?: string,
    options = {},
  ): Promise<ApiChannelMessageList> {
    if (channelId === null || channelId === undefined) {
      throw new Error(
        "'channelId' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/ListChannelMessages";

    const bodyWriter = tsproto.ListChannelMessagesRequest.encode(
      tsproto.ListChannelMessagesRequest.fromPartial({
        clan_id: clanId,
        channel_id: channelId,
        message_id: messageId,
        direction,
        limit,
        topic_id: topicId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        return tsproto.ChannelMessageList.decode(
          response,
        ) as unknown as ApiChannelMessageList;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Add users to a channel. */
  addChannelUsers(
    bearerToken: string,
    channelId: string,
    userIds?: Array<string>,
    options = {},
  ): Promise<any> {
    if (channelId === null || channelId === undefined) {
      throw new Error(
        "'channelId' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/AddChannelUsers";

    const bodyWriter = tsproto.AddChannelUsersRequest.encode(
      tsproto.AddChannelUsersRequest.fromPartial({
        channel_id: channelId,
        user_ids: userIds,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** List all attachment that are part of a channel. */
  listChannelAttachment(
    bearerToken: string,
    channelId: string,
    clanId?: string,
    fileType?: string,
    limit?: number,
    state?: number,
    before?: number,
    after?: number,
    around?: number,
    options = {},
  ): Promise<ApiChannelAttachmentList> {
    if (channelId === null || channelId === undefined) {
      throw new Error(
        "'channelId' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/ListChannelAttachment";

    const bodyWriter = tsproto.ListChannelAttachmentRequest.encode(
      tsproto.ListChannelAttachmentRequest.fromPartial({
        channel_id: channelId,
        clan_id: clanId,
        file_type: fileType,
        limit: limit,
        state: state,
        before: before,
        after: after,
        around: around,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiChannelAttachmentList;
        }
        return tsproto.ChannelAttachmentList.decode(
          response.message,
        ) as ApiChannelAttachmentList;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** get channel encryption method */
  getChanEncryptionMethod(
    bearerToken: string,
    channelId: string,
    method?: string,
    options = {},
  ): Promise<ApiChanEncryptionMethod> {
    if (channelId === null || channelId === undefined) {
      throw new Error(
        "'channelId' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/GetChanEncryptionMethod";

    const bodyWriter = tsproto.ChanEncryptionMethod.encode(
      tsproto.ChanEncryptionMethod.fromPartial({
        channel_id: channelId,
        method: method,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiChanEncryptionMethod;
        }
        return tsproto.ChanEncryptionMethod.decode(
          response.message,
        ) as ApiChanEncryptionMethod;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** store channel encryption method */
  setChanEncryptionMethod(
    bearerToken: string,
    channelId: string,
    body: MezonSetChanEncryptionMethodBody,
    options = {},
  ): Promise<any> {
    if (channelId === null || channelId === undefined) {
      throw new Error(
        "'channelId' is a required parameter but is null or undefined.",
      );
    }
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/SetChanEncryptionMethod";

    const bodyWriter = tsproto.ChanEncryptionMethod.encode(
      tsproto.ChanEncryptionMethod.fromPartial({
        ...body,
        channel_id: channelId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** Leave a channel the user is a member of. */
  leaveThread(
    bearerToken: string,
    clanId: string,
    channelId: string,
    options = {},
  ): Promise<any> {
    if (channelId === null || channelId === undefined) {
      throw new Error(
        "'channelId' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/LeaveThread";

    const bodyWriter = tsproto.LeaveThreadRequest.encode(
      tsproto.LeaveThreadRequest.fromPartial({
        channel_id: channelId,
        clan_id: clanId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** Archive a single channel/thread (active = 0). */
  archiveChannel(
    bearerToken: string,
    clanId: string,
    channelId: string,
    options = {},
  ): Promise<any> {
    if (clanId === null || clanId === undefined) {
      throw new Error(
        "'clanId' is a required parameter but is null or undefined.",
      );
    }
    if (channelId === null || channelId === undefined) {
      throw new Error(
        "'channelId' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/ArchiveChannel";

    const bodyWriter = tsproto.ArchiveChannelRequest.encode(
      tsproto.ArchiveChannelRequest.fromPartial({
        clan_id: clanId,
        channel_id: channelId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** List archived top-level channels in a clan. */
  listArchivedChannelDescs(
    bearerToken: string,
    clanId: string,
    options = {},
  ): Promise<ApiChannelDescList> {
    if (clanId === null || clanId === undefined) {
      throw new Error(
        "'clanId' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/ListArchivedChannelDescs";

    const bodyWriter = tsproto.ListArchivedChannelDescsRequest.encode(
      tsproto.ListArchivedChannelDescsRequest.fromPartial({
        clan_id: clanId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiChannelDescList;
        }
        return tsproto.ListArchivedChannelDescsResponse.decode(
          response.message,
        ) as ApiChannelDescList;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Kick a set of users from a channel. */
  removeChannelUsers(
    bearerToken: string,
    channelId: string,
    userIds?: Array<string>,
    options = {},
  ): Promise<any> {
    if (channelId === null || channelId === undefined) {
      throw new Error(
        "'channelId' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/RemoveChannelUsers";

    const bodyWriter = tsproto.RemoveChannelUsersRequest.encode(
      tsproto.RemoveChannelUsersRequest.fromPartial({
        channel_id: channelId,
        user_ids: userIds,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** List all users that are part of a channel. */
  listChannelUsers(
    bearerToken: string,
    clanId: string,
    channelId: string,
    channelType?: number,
    limit?: number,
    state?: number,
    cursor?: string,
    options = {},
  ): Promise<ApiChannelUserList> {
    if (channelId === null || channelId === undefined) {
      throw new Error(
        "'channelId' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/ListChannelUsers";

    const bodyWriter = tsproto.ListChannelUsersRequest.encode(
      tsproto.ListChannelUsersRequest.fromPartial({
        clan_id: clanId,
        channel_id: channelId,
        channel_type: channelType,
        limit: limit,
        state: state,
        cursor: cursor,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiChannelUserList;
        }
        return tsproto.ChannelUserList.decode(
          response.message,
        ) as ApiChannelUserList;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** List user channels */
  listChannelDescs(
    bearerToken: string,
    limit?: number,
    state?: number,
    page?: number,
    clanId?: string,
    channelType?: number,
    isMobile?: boolean,
    options = {},
  ): Promise<ApiChannelDescList> {
    const urlPath = "/mezon.api.Mezon/ListChannelDescs";

    const bodyWriter = tsproto.ListChannelDescsRequest.encode(
      tsproto.ListChannelDescsRequest.fromPartial({
        limit,
        state,
        page,
        clan_id: clanId,
        channel_type: channelType,
        is_mobile: isMobile,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiChannelDescList;
        }
        return tsproto.ChannelDescList.decode(
          response.message,
        ) as ApiChannelDescList;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Create a new channel with the current user as the owner. */
  createChannelDesc(
    bearerToken: string,
    body: ApiCreateChannelDescRequest,
    options = {},
  ): Promise<ApiChannelDescription> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/CreateChannelDesc";
    const bodyWriter = tsproto.CreateChannelDescRequest.encode(
      tsproto.CreateChannelDescRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiChannelDescription;
        }
        return tsproto.ChannelDescription.decode(
          response.message,
        ) as ApiChannelDescription;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** list user add channel by channel ids */
  listChannelUsersUC(
    bearerToken: string,
    channelId?: string,
    limit?: number,
    options = {},
  ): Promise<ApiAllUsersAddChannelResponse> {
    const urlPath = "/mezon.api.Mezon/ListChannelUsersUC";

    const bodyWriter = tsproto.AllUsersAddChannelRequest.encode(
      tsproto.AllUsersAddChannelRequest.fromPartial({
        channel_id: channelId,
        limit: limit,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiAllUsersAddChannelResponse;
        }
        return tsproto.AllUsersAddChannelResponse.decode(
          response.message,
        ) as ApiAllUsersAddChannelResponse;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Delete a channel by ID. */
  deleteChannelDesc(
    bearerToken: string,
    clanId: string,
    channelId: string,
    options = {},
  ): Promise<any> {
    if (channelId === null || channelId === undefined) {
      throw new Error(
        "'channelId' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/DeleteChannelDesc";

    const bodyWriter = tsproto.DeleteChannelDescRequest.encode(
      tsproto.DeleteChannelDescRequest.fromPartial({
        clan_id: clanId,
        channel_id: channelId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** Update fields in a given channel. */
  updateChannelDesc(
    bearerToken: string,
    channelId: string,
    body: ApiUpdateChannelDescRequest,
    options = {},
  ): Promise<any> {
    if (channelId === null || channelId === undefined) {
      throw new Error(
        "'channelId' is a required parameter but is null or undefined.",
      );
    }
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/UpdateChannelDesc";

    const bodyWriter = tsproto.UpdateChannelDescRequest.encode(
      tsproto.UpdateChannelDescRequest.fromPartial({
        ...body,
        channel_id: channelId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** List channel setting */
  listChannelSetting(
    bearerToken: string,
    clanId: string,
    parentId?: string,
    categoryId?: string,
    privateChannel?: number,
    active?: number,
    status?: number,
    type?: number,
    limit?: number,
    page?: number,
    channelLabel?: string,
    options = {},
  ): Promise<ApiChannelSettingListResponse> {
    if (clanId === null || clanId === undefined) {
      throw new Error(
        "'clanId' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/ListChannelSetting";

    const bodyWriter = tsproto.ChannelSettingListRequest.encode(
      tsproto.ChannelSettingListRequest.fromPartial({
        clan_id: clanId,
        parent_id: parentId,
        category_id: categoryId,
        active: active,
        private_channel: privateChannel,
        status: status,
        type: type,
        limit: limit,
        page: page,
        channel_label: channelLabel,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiChannelSettingListResponse;
        }
        return tsproto.ChannelSettingListResponse.decode(
          response.message,
        ) as ApiChannelSettingListResponse;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** List all users that are part of a channel. */
  listChannelVoiceUsers(
    bearerToken: string,
    clanId?: string,
    limit?: number,
    options = {},
  ): Promise<ApiVoiceChannelUserList> {
    const urlPath = "/mezon.api.Mezon/ListChannelVoiceUsers";

    const bodyWriter = tsproto.ListChannelUsersRequest.encode(
      tsproto.ListChannelUsersRequest.fromPartial({
        clan_id: clanId,
        limit: limit,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiVoiceChannelUserList;
        }
        return tsproto.VoiceChannelUserList.decode(
          response.message,
        ) as ApiVoiceChannelUserList;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** List clans */
  listClanDescs(
    bearerToken: string,
    limit?: number,
    state?: number,
    cursor?: string,
    options = {},
  ): Promise<ApiClanDescList> {
    const urlPath = "/mezon.api.Mezon/ListClanDescs";

    const bodyWriter = tsproto.ListClanDescRequest.encode(
      tsproto.ListClanDescRequest.fromPartial({ limit, state, cursor }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiClanDescList;
        }
        return tsproto.ClanDescList.decode(response.message) as ApiClanDescList;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Paged list of channel unread/badge metadata (HTTP counterpart to socket ListChannelBadgeCount). */
  listChannelBadgeCount(
    bearerToken: string,
    clanId: string,
    limit?: number,
    page?: number,
    options = {},
  ): Promise<ApiListChannelBadgeCountResponse> {
    const urlPath = "/mezon.api.Mezon/ListChannelBadgeCount";

    const bodyWriter = tsproto.ListChannelBadgeCountRequest.encode(
      tsproto.ListChannelBadgeCountRequest.fromPartial({
        clan_id: clanId,
        limit: limit ?? 0,
        page: page ?? 0,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }
    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiListChannelBadgeCountResponse;
        }
        return tsproto.ListChannelBadgeCountResponse.decode(
          response.message,
        ) as ApiListChannelBadgeCountResponse;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Paged list of online users in a clan (HTTP counterpart to socket ListUserOnline). */
  listUserOnline(
    bearerToken: string,
    clanId: string,
    limit?: number,
    page?: number,
    options = {},
  ): Promise<ApiListUserOnlineResponse> {
    const urlPath = "/mezon.api.Mezon/ListUserOnline";

    const bodyWriter = tsproto.ListUserOnlineRequest.encode(
      tsproto.ListUserOnlineRequest.fromPartial({
        clan_id: clanId,
        limit: limit ?? 0,
        page: page ?? 0,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }
    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiListUserOnlineResponse;
        }
        return tsproto.ListUserOnlineResponse.decode(
          response.message,
        ) as ApiListUserOnlineResponse;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Create a clan */
  createClanDesc(
    bearerToken: string,
    body: ApiCreateClanDescRequest,
    options = {},
  ): Promise<ApiClanDesc> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/CreateClanDesc";

    const bodyWriter = tsproto.CreateClanDescRequest.encode(
      tsproto.CreateClanDescRequest.fromPartial({
        clan_name: body.clan_name,
        logo: body.logo,
        banner: body.banner,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiClanDesc;
        }
        return tsproto.ClanDesc.decode(response.message) as ApiClanDesc;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Delete a clan desc by ID. */
  deleteClanDesc(
    bearerToken: string,
    clanDescId: string,
    options = {},
  ): Promise<any> {
    if (clanDescId === null || clanDescId === undefined) {
      throw new Error(
        "'clanDescId' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/DeleteClanDesc";

    const bodyWriter = tsproto.DeleteClanDescRequest.encode(
      tsproto.DeleteClanDescRequest.fromPartial({ clan_desc_id: clanDescId }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** Update fields in a given clan. */
  updateClanDesc(
    bearerToken: string,
    clanId: string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    body: {},
    options = {},
  ): Promise<any> {
    if (clanId === null || clanId === undefined) {
      throw new Error(
        "'clanId' is a required parameter but is null or undefined.",
      );
    }
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/UpdateClanDesc";

    const bodyWriter = tsproto.UpdateClanDescRequest.encode(
      tsproto.UpdateClanDescRequest.fromPartial({ clan_id: clanId, ...body }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** Kick a set of users from a clan. */
  removeClanUsers(
    bearerToken: string,
    clanId: string,
    userIds?: Array<string>,
    options = {},
  ): Promise<any> {
    if (clanId === null || clanId === undefined) {
      throw new Error(
        "'clanId' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/RemoveClanUsers";

    const bodyWriter = tsproto.RemoveClanUsersRequest.encode(
      tsproto.RemoveClanUsersRequest.fromPartial({
        clan_id: clanId,
        user_ids: userIds,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {};
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** List banned user */
  listBannedUsers(
    bearerToken: string,
    clanId?: string,
    channelId?: string,
    options = {},
  ): Promise<ApiBannedUserList> {
    const urlPath = "/mezon.api.Mezon/ListBannedUsers";

    const bodyWriter = tsproto.BannedUserListRequest.encode(
      tsproto.BannedUserListRequest.fromPartial({
        clan_id: clanId,
        channel_id: channelId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiBannedUserList;
        }
        return tsproto.BannedUserList.decode(
          response.message,
        ) as ApiBannedUserList;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Ban a set of users from a channel. */
  unbanClanUsers(
    bearerToken: string,
    clanId: string,
    channelId?: string,
    userIds?: Array<string>,
    banTime?: number,
    options = {},
  ): Promise<any> {
    if (clanId === null || clanId === undefined) {
      throw new Error(
        "'clanId' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/UnbanClanUsers";

    const bodyWriter = tsproto.BanClanUsersRequest.encode(
      tsproto.BanClanUsersRequest.fromPartial({
        clan_id: clanId,
        channel_id: channelId,
        user_ids: userIds,
        ban_time: banTime,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {};
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Ban a set of users from a channel. */
  banClanUsers(
    bearerToken: string,
    clanId: string,
    channelId?: string,
    userIds?: Array<string>,
    banTime?: number,
    options = {},
  ): Promise<any> {
    if (clanId === null || clanId === undefined) {
      throw new Error(
        "'clanId' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/BanClanUsers";

    const bodyWriter = tsproto.BanClanUsersRequest.encode(
      tsproto.BanClanUsersRequest.fromPartial({
        clan_id: clanId,
        channel_id: channelId,
        user_ids: userIds,
        ban_time: banTime,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {};
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** List all users that are part of a clan. */
  listClanUsers(
    bearerToken: string,
    clanId: string,
    options = {},
  ): Promise<ApiClanUserList> {
    if (clanId === null || clanId === undefined) {
      throw new Error(
        "'clanId' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/ListClanUsers";

    const bodyWriter = tsproto.ListClanUsersRequest.encode(
      tsproto.ListClanUsersRequest.fromPartial({ clan_id: clanId }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiClanUserList;
        }
        return tsproto.ClanUserList.decode(response.message) as ApiClanUserList;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** List clan members' custom status strings (user_status). */
  listClanUsersStatus(
    bearerToken: string,
    clanId: string,
    options = {},
  ): Promise<ApiClanUserStatusList> {
    if (clanId === null || clanId === undefined) {
      throw new Error(
        "'clanId' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/ListClanUsersStatus";

    const bodyWriter = tsproto.ListClanUsersStatusRequest.encode(
      tsproto.ListClanUsersStatusRequest.fromPartial({ clan_id: clanId }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiClanUserStatusList;
        }
        return tsproto.ClanUserStatusList.decode(
          response.message,
        ) as ApiClanUserStatusList;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /**  */
  createCategoryDesc(
    bearerToken: string,
    body: ApiCreateCategoryDescRequest,
    options = {},
  ): Promise<ApiCategoryDesc> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/CreateCategoryDesc";
    const bodyWriter = tsproto.CreateCategoryDescRequest.encode(
      tsproto.CreateCategoryDescRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiCategoryDesc;
        }
        return tsproto.CategoryDesc.decode(response.message) as ApiCategoryDesc;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Check whether a clan/category/channel/thread/nickname/username already exists. */
  checkDuplicateName(
    bearerToken: string,
    body: ApiCheckDuplicateNameRequest,
    options = {},
  ): Promise<ApiCheckDuplicateNameResponse> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/CheckDuplicateName";
    const bodyWriter = tsproto.CheckDuplicateNameRequest.encode(
      tsproto.CheckDuplicateNameRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.status >= 200 && response.status < 300) {
          return tsproto.CheckDuplicateNameResponse.decode(
            response,
          ) as ApiCheckDuplicateNameResponse;
        } else {
          throw response;
        }
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /**  */
  deleteCategoryDesc(
    bearerToken: string,
    categoryId: string,
    clanId: string,
    categoryLabel?: string,
    options = {},
  ): Promise<any> {
    if (categoryId === null || categoryId === undefined) {
      throw new Error(
        "'categoryId' is a required parameter but is null or undefined.",
      );
    }
    if (clanId === null || clanId === undefined) {
      throw new Error(
        "'clanId' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/DeleteCategoryDesc";

    const bodyWriter = tsproto.DeleteCategoryDescRequest.encode(
      tsproto.DeleteCategoryDescRequest.fromPartial({
        category_id: categoryId,
        clan_id: clanId,
        category_label: categoryLabel,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {};
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** regist fcm device token */
  registFCMDeviceToken(
    bearerToken: string,
    token?: string,
    deviceId?: string,
    platform?: string,
    voipToken?: string,
    options = {},
  ): Promise<ApiRegistFcmDeviceTokenResponse> {
    const urlPath = "/mezon.api.Mezon/RegistFCMDeviceToken";

    const bodyWriter = tsproto.RegistFcmDeviceTokenRequest.encode(
      tsproto.RegistFcmDeviceTokenRequest.fromPartial({
        token,
        device_id: deviceId,
        platform,
        voip_token: voipToken,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiRegistFcmDeviceTokenResponse;
        }
        return tsproto.RegistFcmDeviceTokenResponse.decode(
          response.message,
        ) as ApiRegistFcmDeviceTokenResponse;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** close direct message. */
  closeDirectMess(
    bearerToken: string,
    body: ApiDeleteChannelDescRequest,
    options = {},
  ): Promise<any> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/CloseDMByChannelId";
    const bodyWriter = tsproto.DeleteChannelDescRequest.encode(
      tsproto.DeleteChannelDescRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {};
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** open direct message. */
  openDirectMess(
    bearerToken: string,
    body: ApiDeleteChannelDescRequest,
    options = {},
  ): Promise<any> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/OpenDMByChannelId";
    const bodyWriter = tsproto.DeleteChannelDescRequest.encode(
      tsproto.DeleteChannelDescRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {};
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Post clan Emoji  /v2/emoji/create */
  createClanEmoji(
    bearerToken: string,
    body: ApiClanEmojiCreateRequest,
    options = {},
  ): Promise<any> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/CreateClanEmoji";
    const bodyWriter = tsproto.ClanEmojiCreateRequest.encode(
      tsproto.ClanEmojiCreateRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {};
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Delete a emoji by ID. */
  deleteClanEmojiById(
    bearerToken: string,
    id: string,
    clanId?: string,
    emojiLabel?: string,
    options = {},
  ): Promise<any> {
    if (id === null || id === undefined) {
      throw new Error("'id' is a required parameter but is null or undefined.");
    }
    const urlPath = "/mezon.api.Mezon/DeleteByIdClanEmoji";

    const bodyWriter = tsproto.ClanEmojiDeleteRequest.encode(
      tsproto.ClanEmojiDeleteRequest.fromPartial({
        id,
        clan_id: clanId,
        emoji_label: emojiLabel,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {};
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Update ClanEmoj By id */
  updateClanEmojiById(
    bearerToken: string,
    id: string,
    body: MezonUpdateClanEmojiByIdBody,
    options = {},
  ): Promise<any> {
    if (id === null || id === undefined) {
      throw new Error("'id' is a required parameter but is null or undefined.");
    }
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/UpdateClanEmojiById";

    const bodyWriter = tsproto.ClanEmojiUpdateRequest.encode(
      tsproto.ClanEmojiUpdateRequest.fromPartial({
        id: body.id,
        shortname: body.shortname,
        clan_id: body.clan_id,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {};
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** get list emoji recent by user id */
  emojiRecentList(
    bearerToken: string,
    options = {},
  ): Promise<ApiEmojiRecentList> {
    const urlPath = "/mezon.api.Mezon/EmojiRecentList";
    const bodyJson = "";
    const fetchOptions = buildFetchOptions("POST", options, bodyJson);
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiEmojiRecentList;
        }
        return tsproto.EmojiRecentList.decode(
          response.message,
        ) as ApiEmojiRecentList;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** get list emoji by user id */
  getListEmojisByUserId(
    bearerToken: string,
    options = {},
  ): Promise<ApiEmojiListedResponse> {
    const urlPath = "/mezon.api.Mezon/GetListEmojisByUserId";
    const bodyJson = "";
    const fetchOptions = buildFetchOptions("POST", options, bodyJson);
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiEmojiListedResponse;
        }
        return tsproto.EmojiListedResponse.decode(
          response.message,
        ) as ApiEmojiListedResponse;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Search message from elasticsearch service. */
  searchMessage(
    bearerToken: string,
    body: ApiSearchMessageRequest,
    options = {},
  ): Promise<ApiSearchMessageResponse> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/SearchMessage";
    const bodyWriter = tsproto.SearchMessageRequest.encode(
      tsproto.SearchMessageRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiSearchMessageResponse;
        }
        return tsproto.SearchMessageResponse.decode(
          response.message,
        ) as ApiSearchMessageResponse;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Submit an event for processing in the server's registered runtime custom events handler. */
  event(bearerToken: string, body: ApiEvent, options = {}): Promise<any> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/CreateEvent";

    const bodyWriter = tsproto.Event.encode(
      tsproto.Event.fromPartial({
        external: body.external,
        name: body.name,
        properties: body.properties,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** List user events */
  listEvents(
    bearerToken: string,
    clanId?: string,
    options = {},
  ): Promise<ApiEventList> {
    const urlPath = "/mezon.api.Mezon/ListEvents";

    const bodyWriter = tsproto.ListEventsRequest.encode(
      tsproto.ListEventsRequest.fromPartial({ clan_id: clanId }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiEventList;
        }
        return tsproto.EventList.decode(response.message) as ApiEventList;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Create a new event for clan. */
  createEvent(
    bearerToken: string,
    body: ApiCreateEventRequest,
    options = {},
  ): Promise<ApiEventManagement> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/CreateEvent";
    const bodyWriter = tsproto.CreateEventRequest.encode(
      tsproto.CreateEventRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiEventManagement;
        }
        return tsproto.EventManagement.decode(
          response.message,
        ) as ApiEventManagement;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Update fields in a given event. */
  updateEventUser(
    bearerToken: string,
    body: ApiDeleteEventRequest,
    options = {},
  ): Promise<any> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/UpdateEventUser";
    const bodyWriter = tsproto.DeleteEventRequest.encode(
      tsproto.DeleteEventRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {} as any;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Delete a event by ID. */
  deleteEvent(
    bearerToken: string,
    eventId: string,
    clanId?: string,
    creatorId?: string,
    eventLabel?: string,
    channelId?: string,
    options = {},
  ): Promise<any> {
    if (eventId === null || eventId === undefined) {
      throw new Error(
        "'eventId' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/DeleteEvent";

    const bodyWriter = tsproto.DeleteEventRequest.encode(
      tsproto.DeleteEventRequest.fromPartial({
        event_id: eventId,
        clan_id: clanId,
        creator_id: creatorId,
        event_label: eventLabel,
        channel_id: channelId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {} as any;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Update fields in a given event. */
  updateEvent(
    bearerToken: string,
    eventId: string,
    body: MezonUpdateEventBody,
    options = {},
  ): Promise<any> {
    if (eventId === null || eventId === undefined) {
      throw new Error(
        "'eventId' is a required parameter but is null or undefined.",
      );
    }
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/UpdateEvent";
    const bodyWriter = tsproto.UpdateEventRequest.encode(
      tsproto.UpdateEventRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {} as any;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Delete one or more users by ID or username. */
  deleteFriends(
    bearerToken: string,
    ids?: Array<string>,
    usernames?: Array<string>,
    options = {},
  ): Promise<any> {
    const urlPath = "/mezon.api.Mezon/DeleteFriends";

    const bodyWriter = tsproto.DeleteFriendsRequest.encode(
      tsproto.DeleteFriendsRequest.fromPartial({ ids, usernames }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** List all friends for the current user. */
  listFriends(
    bearerToken: string,
    limit?: number,
    state?: number,
    cursor?: string,
    options = {},
  ): Promise<ApiFriendList> {
    const urlPath = "/mezon.api.Mezon/ListFriends";

    const bodyWriter = tsproto.ListFriendsRequest.encode(
      tsproto.ListFriendsRequest.fromPartial({ limit, state, cursor }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiFriendList;
        }
        return tsproto.FriendList.decode(response.message) as ApiFriendList;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Add friends by ID or username to a user's account. */
  addFriends(
    bearerToken: string,
    ids?: Array<string>,
    usernames?: Array<string>,
    options = {},
  ): Promise<ApiAddFriendsResponse> {
    const urlPath = "/mezon.api.Mezon/AddFriends";

    const bodyWriter = tsproto.AddFriendsRequest.encode(
      tsproto.AddFriendsRequest.fromPartial({ ids, usernames }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiAddFriendsResponse;
        }
        return tsproto.AddFriendsResponse.decode(
          response.message,
        ) as ApiAddFriendsResponse;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Block one or more users by ID or username. */
  blockFriends(
    bearerToken: string,
    ids?: Array<string>,
    usernames?: Array<string>,
    options = {},
  ): Promise<any> {
    const urlPath = "/mezon.api.Mezon/BlockFriends";

    const bodyWriter = tsproto.BlockFriendsRequest.encode(
      tsproto.BlockFriendsRequest.fromPartial({ ids, usernames }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** Block one or more users by ID or username. */
  unblockFriends(
    bearerToken: string,
    ids?: Array<string>,
    usernames?: Array<string>,
    options = {},
  ): Promise<any> {
    const urlPath = "/mezon.api.Mezon/UnblockFriends";

    const bodyWriter = tsproto.BlockFriendsRequest.encode(
      tsproto.BlockFriendsRequest.fromPartial({ ids, usernames }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** List GetChannelCategoryNotiSettingsList */
  getChannelCategoryNotiSettingsList(
    bearerToken: string,
    clanId?: string,
    options = {},
  ): Promise<ApiNotificationChannelCategorySettingList> {
    const urlPath = "/mezon.api.Mezon/GetChannelCategoryNotiSettingsList";

    const bodyWriter = tsproto.NotificationClan.encode(
      tsproto.NotificationClan.fromPartial({ clan_id: clanId }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiNotificationChannelCategorySettingList;
        }
        return tsproto.NotificationChannelCategorySettingList.decode(
          response.message,
        ) as ApiNotificationChannelCategorySettingList;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /**  */
  getUserProfileOnClan(
    bearerToken: string,
    clanId: string,
    options = {},
  ): Promise<ApiClanProfile> {
    if (clanId === null || clanId === undefined) {
      throw new Error(
        "'clanId' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/GetUserProfileOnClan";

    const bodyWriter = tsproto.ClanProfileRequest.encode(
      tsproto.ClanProfileRequest.fromPartial({ clan_id: clanId }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiClanProfile;
        }
        return tsproto.ClanProfile.decode(response.message) as ApiClanProfile;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** List GetNotificationChannel */
  getNotificationCategory(
    bearerToken: string,
    categoryId?: string,
    options = {},
  ): Promise<ApiNotificationUserChannel> {
    const urlPath = "/mezon.api.Mezon/GetNotificationCategory";

    const bodyWriter = tsproto.DefaultNotificationCategory.encode(
      tsproto.DefaultNotificationCategory.fromPartial({
        category_id: categoryId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiNotificationUserChannel;
        }
        return tsproto.NotificationUserChannel.decode(
          response.message,
        ) as ApiNotificationUserChannel;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** List GetNotificationChannel */
  getNotificationChannel(
    bearerToken: string,
    channelId?: string,
    options = {},
  ): Promise<ApiNotificationUserChannel> {
    const urlPath = "/mezon.api.Mezon/GetNotificationChannel";

    const bodyWriter = tsproto.NotificationChannel.encode(
      tsproto.NotificationChannel.fromPartial({ channel_id: channelId }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiNotificationUserChannel;
        }
        return tsproto.NotificationUserChannel.decode(
          response.message,
        ) as ApiNotificationUserChannel;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** List GetNotificationClan */
  getNotificationClan(
    bearerToken: string,
    clanId?: string,
    options = {},
  ): Promise<ApiNotificationSetting> {
    const urlPath = "/mezon.api.Mezon/GetNotificationClan";

    const bodyWriter = tsproto.NotificationClan.encode(
      tsproto.NotificationClan.fromPartial({ clan_id: clanId }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiNotificationSetting;
        }
        return tsproto.NotificationSetting.decode(
          response.message,
        ) as ApiNotificationSetting;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** List GetNotificationReactMessage */
  getNotificationReactMessage(
    bearerToken: string,
    channelId?: string,
    options = {},
  ): Promise<ApiNotifiReactMessage> {
    const urlPath = "/mezon.api.Mezon/GetNotificationReactMessage";

    const bodyWriter = tsproto.NotifiReactMessage.encode(
      tsproto.NotifiReactMessage.fromPartial({ channel_id: channelId }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiNotifiReactMessage;
        }
        return tsproto.NotifiReactMessage.decode(
          response.message,
        ) as ApiNotifiReactMessage;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Give a coffee */
  giveMeACoffee(
    bearerToken: string,
    body: ApiGiveCoffeeEvent,
    options = {},
  ): Promise<any> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/GiveMeACoffee";
    const bodyWriter = tsproto.GiveCoffeeEvent.encode(
      tsproto.GiveCoffeeEvent.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {} as any;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** get key server */
  getKeyServer(
    bearerToken: string,
    options = {},
  ): Promise<ApiGetKeyServerResp> {
    const urlPath = "/mezon.api.Mezon/GetKeyServer";

    const fetchOptions = buildFetchOptions("POST", options, "");
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiGetKeyServerResp;
        }
        return tsproto.GetKeyServerResp.decode(
          response.message,
        ) as ApiGetKeyServerResp;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Add users to a channel. */
  createLinkInviteUser(
    bearerToken: string,
    body: ApiLinkInviteUserRequest,
    options = {},
  ): Promise<ApiLinkInviteUser> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/CreateLinkInviteUser";
    const bodyWriter = tsproto.LinkInviteUserRequest.encode(
      tsproto.LinkInviteUserRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiLinkInviteUser;
        }
        return tsproto.LinkInviteUser.decode(
          response.message,
        ) as ApiLinkInviteUser;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Add users to a channel. */
  inviteUser(
    bearerToken: string,
    inviteId: string,
    options = {},
  ): Promise<ApiInviteUserRes> {
    if (inviteId === null || inviteId === undefined) {
      throw new Error(
        "'inviteId' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/InviteUser";

    const bodyWriter = tsproto.InviteUserRequest.encode(
      tsproto.InviteUserRequest.fromPartial({ invite_id: inviteId }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiInviteUserRes;
        }
        return tsproto.InviteUserRes.decode(
          response.message,
        ) as ApiInviteUserRes;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Add users to a channel. */
  getLinkInvite(
    basicAuthUsername: string,
    basicAuthPassword: string,
    inviteId: string,
    options = {},
  ): Promise<ApiInviteUserRes> {
    if (inviteId === null || inviteId === undefined) {
      throw new Error(
        "'inviteId' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/v2/invite/{inviteId}".replace(
      "{inviteId}",
      encodeURIComponent(String(inviteId)),
    );
    const queryParams = new Map<string, any>();

    const bodyJson = "";

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("GET", options, bodyJson);
    if (basicAuthUsername) {
      fetchOptions.headers["Authorization"] =
        "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);
    }
    fetchOptions.headers["Accept"] = "application/x-protobuf";
    fetchOptions.headers["Content-Type"] = "application/json";

    return Promise.race([
      fetch(fullUrl, fetchOptions).then(async (response) => {
        const buffer = await response.arrayBuffer();
        return tsproto.InviteUserRes.decode(
          new Uint8Array(buffer),
        ) as ApiInviteUserRes;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** List HashtagDMList */
  listChannelByUserId(
    bearerToken: string,
    options = {},
  ): Promise<ApiChannelDescList> {
    const urlPath = "/mezon.api.Mezon/ListChannelByUserId";

    const fetchOptions = buildFetchOptions("POST", options, "");
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiChannelDescList;
        }
        return tsproto.ChannelDescList.decode(
          response.message,
        ) as ApiChannelDescList;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Mark as read */
  markAsRead(
    bearerToken: string,
    body: ApiMarkAsReadRequest,
    options = {},
  ): Promise<any> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/MarkAsRead";
    const bodyWriter = tsproto.MarkAsReadRequest.encode(
      tsproto.MarkAsReadRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {} as any;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** List mezon OAuth client */
  listMezonOauthClient(
    bearerToken: string,
    options = {},
  ): Promise<ApiMezonOauthClientList> {
    const urlPath = "/mezon.api.Mezon/ListMezonOauthClient";

    const fetchOptions = buildFetchOptions("POST", options, "");
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiMezonOauthClientList;
        }
        return tsproto.MezonOauthClientList.decode(
          response.message,
        ) as ApiMezonOauthClientList;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** set mute notification user channel. */
  setMuteCategory(
    bearerToken: string,
    body: ApiSetMuteRequest,
    options = {},
  ): Promise<any> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/SetMuteCategory";
    const bodyWriter = tsproto.SetMuteRequest.encode(
      tsproto.SetMuteRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {} as any;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** set mute notification user channel. */
  setMuteChannel(
    bearerToken: string,
    body: ApiSetMuteRequest,
    options = {},
  ): Promise<any> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/SetMuteChannel";
    const bodyWriter = tsproto.SetMuteRequest.encode(
      tsproto.SetMuteRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {} as any;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Delete one or more notifications for the current user. */
  deleteNotifications(
    bearerToken: string,
    ids?: Array<string>,
    category?: number,
    options = {},
  ): Promise<any> {
    const urlPath = "/mezon.api.Mezon/DeleteNotifications";

    const bodyWriter = tsproto.DeleteNotificationsRequest.encode(
      tsproto.DeleteNotificationsRequest.fromPartial({
        ids: ids || [],
        category: category,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** Fetch list of notifications. */
  listNotifications(
    bearerToken: string,
    limit?: number,
    clanId?: string,
    notificationId?: string,
    category?: number,
    direction?: number,
    options = {},
  ): Promise<ApiNotificationList> {
    const urlPath = "/mezon.api.Mezon/ListNotifications";

    const bodyWriter = tsproto.ListNotificationsRequest.encode(
      tsproto.ListNotificationsRequest.fromPartial({
        limit: limit,
        clan_id: clanId,
        notification_id: notificationId,
        category: category,
        direction: direction,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        return tsproto.NotificationList.decode(
          response,
        ) as unknown as ApiNotificationList;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** set notification user channel. */
  setNotificationChannelSetting(
    bearerToken: string,
    body: ApiSetNotificationRequest,
    options = {},
  ): Promise<any> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/SetNotificationChannelSetting";
    const bodyWriter = tsproto.SetNotificationRequest.encode(
      tsproto.SetNotificationRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** set notification user channel. */
  setNotificationClanSetting(
    bearerToken: string,
    body: ApiSetDefaultNotificationRequest,
    options = {},
  ): Promise<any> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/SetNotificationClanSetting";
    const bodyWriter = tsproto.SetDefaultNotificationRequest.encode(
      tsproto.SetDefaultNotificationRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** set notification user channel. */
  setNotificationCategorySetting(
    bearerToken: string,
    body: ApiSetNotificationRequest,
    options = {},
  ): Promise<any> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/SetNotificationCategorySetting";
    const bodyWriter = tsproto.SetNotificationRequest.encode(
      tsproto.SetNotificationRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /**  */
  deleteNotificationCategorySetting(
    bearerToken: string,
    categoryId?: string,
    options = {},
  ): Promise<any> {
    const urlPath = "/mezon.api.Mezon/DeleteNotificationCategorySetting";

    const bodyWriter = tsproto.DefaultNotificationCategory.encode(
      tsproto.DefaultNotificationCategory.fromPartial({
        category_id: categoryId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /**  */
  deleteNotificationChannel(
    bearerToken: string,
    channelId?: string,
    options = {},
  ): Promise<any> {
    const urlPath = "/mezon.api.Mezon/DeleteNotificationChannel";

    const bodyWriter = tsproto.NotificationChannel.encode(
      tsproto.NotificationChannel.fromPartial({ channel_id: channelId }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /**  */
  deleteNotiReactMessage(
    bearerToken: string,
    channelId?: string,
    options = {},
  ): Promise<any> {
    const urlPath = "/mezon.api.Mezon/DeleteNotiReactMessage";

    const bodyWriter = tsproto.NotificationChannel.encode(
      tsproto.NotificationChannel.fromPartial({ channel_id: channelId }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /**  */
  setNotificationReactMessage(
    bearerToken: string,
    body: ApiNotificationChannel,
    options = {},
  ): Promise<any> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/SetNotificationReactMessage";
    const bodyWriter = tsproto.NotificationChannel.encode(
      tsproto.NotificationChannel.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** set permission role channel. */
  setRoleChannelPermission(
    bearerToken: string,
    body: ApiUpdateRoleChannelRequest,
    options = {},
  ): Promise<any> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/SetRoleChannelPermission";
    const bodyWriter = tsproto.UpdateRoleChannelRequest.encode(
      tsproto.UpdateRoleChannelRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** Get permission list */
  getListPermission(
    bearerToken: string,
    options = {},
  ): Promise<ApiPermissionList> {
    const urlPath = "/mezon.api.Mezon/GetListPermission";

    const fetchOptions = buildFetchOptions("POST", options, "");
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiPermissionList;
        }
        return tsproto.PermissionList.decode(
          response.message,
        ) as ApiPermissionList;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** GetPermissionByRoleIdChannelId */
  getPermissionByRoleIdChannelId(
    bearerToken: string,
    roleId?: string,
    channelId?: string,
    userId?: string,
    options = {},
  ): Promise<ApiPermissionRoleChannelListEventResponse> {
    const urlPath = "/mezon.api.Mezon/GetPermissionByRoleIdChannelId";

    const bodyWriter = tsproto.PermissionRoleChannelListEventRequest.encode(
      tsproto.PermissionRoleChannelListEventRequest.fromPartial({
        role_id: roleId,
        channel_id: channelId,
        user_id: userId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiPermissionRoleChannelListEventResponse;
        }
        return tsproto.PermissionRoleChannelListEventResponse.decode(
          response.message,
        ) as ApiPermissionRoleChannelListEventResponse;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /**  */
  deletePinMessage(
    bearerToken: string,
    id?: string,
    messageId?: string,
    channelId?: string,
    clanId?: string,
    options = {},
  ): Promise<any> {
    const urlPath = "/mezon.api.Mezon/DeletePinMessage";

    const bodyWriter = tsproto.DeletePinMessage.encode(
      tsproto.DeletePinMessage.fromPartial({
        id: id,
        message_id: messageId,
        channel_id: channelId,
        clan_id: clanId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /**  */
  getPinMessagesList(
    bearerToken: string,
    messageId?: string,
    channelId?: string,
    clanId?: string,
    options = {},
  ): Promise<tsproto.PinMessagesList> {
    const urlPath = "/mezon.api.Mezon/GetPinMessagesList";

    const bodyWriter = tsproto.PinMessageRequest.encode(
      tsproto.PinMessageRequest.fromPartial({
        message_id: messageId,
        channel_id: channelId,
        clan_id: clanId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        return tsproto.PinMessagesList.decode(
          response,
        ) as unknown as tsproto.PinMessagesList;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** create message to inbox. */
  createMessage2Inbox(
    bearerToken: string,
    body: ApiMessage2InboxRequest,
    options = {},
  ): Promise<ApiChannelMessageHeader> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/CreateMessage2Inbox";
    const bodyWriter = tsproto.Message2InboxRequest.encode(
      tsproto.Message2InboxRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiChannelMessageHeader;
        }
        return tsproto.ChannelMessageHeader.decode(
          response.message,
        ) as ApiChannelMessageHeader;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** set notification user channel. */
  createPinMessage(
    bearerToken: string,
    body: ApiPinMessageRequest,
    options = {},
  ): Promise<ApiChannelMessageHeader> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/CreatePinMessage";
    const bodyWriter = tsproto.PinMessageRequest.encode(
      tsproto.PinMessageRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiChannelMessageHeader;
        }
        return tsproto.ChannelMessageHeader.decode(
          response.message,
        ) as ApiChannelMessageHeader;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** get pubkey */
  getPubKeys(
    bearerToken: string,
    userIds?: Array<string>,
    options = {},
  ): Promise<ApiGetPubKeysResponse> {
    const urlPath = "/mezon.api.Mezon/GetPubKeys";

    const bodyWriter = tsproto.GetPubKeysRequest.encode(
      tsproto.GetPubKeysRequest.fromPartial({ user_ids: userIds || [] }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiGetPubKeysResponse;
        }
        return tsproto.GetPubKeysResponse.decode(
          response.message,
        ) as ApiGetPubKeysResponse;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** store pubkey for e2ee */
  pushPubKey(
    bearerToken: string,
    body: ApiPushPubKeyRequest,
    options = {},
  ): Promise<any> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/PushPubKey";
    const bodyWriter = tsproto.PushPubKeyRequest.encode(
      tsproto.PushPubKeyRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /**  */
  addRolesChannelDesc(
    bearerToken: string,
    body: ApiAddRoleChannelDescRequest,
    options = {},
  ): Promise<any> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/AddRolesChannelDesc";
    const bodyWriter = tsproto.AddRoleChannelDescRequest.encode(
      tsproto.AddRoleChannelDescRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** update the category of a channel */
  changeChannelCategory(
    bearerToken: string,
    newCategoryId: string,
    body: MezonChangeChannelCategoryBody,
    options = {},
  ): Promise<any> {
    if (newCategoryId === null || newCategoryId === undefined) {
      throw new Error(
        "'newCategoryId' is a required parameter but is null or undefined.",
      );
    }
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/ChangeChannelCategory";

    const bodyWriter = tsproto.ChangeChannelCategoryRequest.encode(
      tsproto.ChangeChannelCategoryRequest.fromPartial({
        ...body,
        new_category_id: newCategoryId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** Update a role when Delete a role by ID. */
  deleteRoleChannelDesc(
    bearerToken: string,
    body: ApiDeleteRoleRequest,
    options = {},
  ): Promise<any> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/DeleteRoleChannelDesc";
    const bodyWriter = tsproto.DeleteRoleRequest.encode(
      tsproto.DeleteRoleRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** ListRoles */
  listRoles(
    bearerToken: string,
    clanId?: string,
    limit?: number,
    state?: number,
    cursor?: string,
    options = {},
  ): Promise<ApiRoleListEventResponse> {
    const urlPath = "/mezon.api.Mezon/ListRoles";

    const bodyWriter = tsproto.RoleListEventRequest.encode(
      tsproto.RoleListEventRequest.fromPartial({
        clan_id: clanId,
        limit: limit,
        state: state,
        cursor: cursor,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiRoleListEventResponse;
        }
        return tsproto.RoleListEventResponse.decode(
          response.message,
        ) as ApiRoleListEventResponse;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Create a new role for clan. */
  createRole(
    bearerToken: string,
    body: ApiCreateRoleRequest,
    options = {},
  ): Promise<ApiRole> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/CreateRole";
    const bodyWriter = tsproto.CreateRoleRequest.encode(
      tsproto.CreateRoleRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiRole;
        }
        return tsproto.Role.decode(response.message) as ApiRole;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Update a role when Delete a role by ID. */
  updateRoleDelete(
    bearerToken: string,
    roleId: string,
    body: MezonUpdateRoleDeleteBody,
    options = {},
  ): Promise<any> {
    if (roleId === null || roleId === undefined) {
      throw new Error(
        "'roleId' is a required parameter but is null or undefined.",
      );
    }
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/DeleteRole";

    const bodyWriter = tsproto.DeleteRoleRequest.encode(
      tsproto.DeleteRoleRequest.fromPartial({ ...body, role_id: roleId }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** Delete a role by ID. */
  deleteRole(
    bearerToken: string,
    roleId: string,
    channelId?: string,
    clanId?: string,
    roleLabel?: string,
    options = {},
  ): Promise<any> {
    if (roleId === null || roleId === undefined) {
      throw new Error(
        "'roleId' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/DeleteRole";

    const bodyWriter = tsproto.DeleteRoleRequest.encode(
      tsproto.DeleteRoleRequest.fromPartial({
        role_id: roleId,
        channel_id: channelId,
        clan_id: clanId,
        role_label: roleLabel,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** Update fields in a given role. */
  updateRole(
    bearerToken: string,
    roleId: string,
    body: MezonUpdateRoleBody,
    options = {},
  ): Promise<any> {
    if (roleId === null || roleId === undefined) {
      throw new Error(
        "'roleId' is a required parameter but is null or undefined.",
      );
    }
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/UpdateRole";

    const bodyWriter = tsproto.UpdateRoleRequest.encode(
      tsproto.UpdateRoleRequest.fromPartial({ ...body, role_id: roleId }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** List role permissions */
  listRolePermissions(
    bearerToken: string,
    roleId: string,
    options = {},
  ): Promise<ApiPermissionList> {
    if (roleId === null || roleId === undefined) {
      throw new Error(
        "'roleId' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/ListRolePermissions";

    const bodyWriter = tsproto.ListPermissionsRequest.encode(
      tsproto.ListPermissionsRequest.fromPartial({ role_id: roleId }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiPermissionList;
        }
        return tsproto.PermissionList.decode(
          response.message,
        ) as ApiPermissionList;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** List role permissions */
  listRoleUsers(
    bearerToken: string,
    roleId: string,
    limit?: number,
    cursor?: string,
    options = {},
  ): Promise<ApiRoleUserList> {
    if (roleId === null || roleId === undefined) {
      throw new Error(
        "'roleId' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/ListRoleUsers";

    const bodyWriter = tsproto.ListRoleUsersRequest.encode(
      tsproto.ListRoleUsersRequest.fromPartial({
        role_id: roleId,
        limit: limit,
        cursor: cursor,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiRoleUserList;
        }
        return tsproto.RoleUserList.decode(response.message) as ApiRoleUserList;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /**  */
  getRoleOfUserInTheClan(
    bearerToken: string,
    clanId: string,
    channelId?: string,
    options = {},
  ): Promise<ApiRoleList> {
    if (clanId === null || clanId === undefined) {
      throw new Error(
        "'clanId' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/GetRoleOfUserInTheClan";

    const bodyWriter = tsproto.ListPermissionOfUsersRequest.encode(
      tsproto.ListPermissionOfUsersRequest.fromPartial({
        clan_id: clanId,
        channel_id: channelId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiRoleList;
        }
        return tsproto.RoleList.decode(response.message) as ApiRoleList;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /**  */
  searchThread(
    bearerToken: string,
    clanId?: string,
    channelId?: string,
    label?: string,
    options = {},
  ): Promise<ApiChannelDescList> {
    const urlPath = "/mezon.api.Mezon/SearchThread";

    const bodyWriter = tsproto.SearchThreadRequest.encode(
      tsproto.SearchThreadRequest.fromPartial({
        clan_id: clanId,
        channel_id: channelId,
        label: label,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiChannelDescList;
        }
        return tsproto.ChannelDescList.decode(
          response.message,
        ) as ApiChannelDescList;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** UpdateWallets */
  sendToken(
    bearerToken: string,
    body: ApiTokenSentEvent,
    options = {},
  ): Promise<any> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/SendToken";
    const bodyWriter = tsproto.TokenSentEvent.encode(
      tsproto.TokenSentEvent.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {};
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Log out a session, invalidate a refresh token, or log out all sessions/refresh tokens for a user. */
  sessionLogout(
    bearerToken: string,
    body: ApiSessionLogoutRequest,
    options = {},
  ): Promise<any> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/SessionLogout";
    const bodyWriter = tsproto.SessionLogoutRequest.encode(
      tsproto.SessionLogoutRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** Add a new sticker */
  addClanSticker(
    bearerToken: string,
    body: ApiClanStickerAddRequest,
    options = {},
  ): Promise<any> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/AddClanSticker";
    const bodyWriter = tsproto.ClanStickerAddRequest.encode(
      tsproto.ClanStickerAddRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {};
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Delete a sticker by ID */
  deleteClanStickerById(
    bearerToken: string,
    id: string,
    clanId?: string,
    stickerLabel?: string,
    options = {},
  ): Promise<any> {
    if (id === null || id === undefined) {
      throw new Error("'id' is a required parameter but is null or undefined.");
    }
    const urlPath = "/mezon.api.Mezon/DeleteClanStickerById";

    const bodyWriter = tsproto.ClanStickerDeleteRequest.encode(
      tsproto.ClanStickerDeleteRequest.fromPartial({
        id: id,
        clan_id: clanId,
        sticker_label: stickerLabel,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {};
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Update a sticker by ID */
  updateClanStickerById(
    bearerToken: string,
    id: string,
    body: MezonUpdateClanStickerByIdBody,
    options = {},
  ): Promise<any> {
    if (id === null || id === undefined) {
      throw new Error("'id' is a required parameter but is null or undefined.");
    }
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/UpdateClanStickerById";

    const bodyWriter = tsproto.ClanStickerUpdateByIdRequest.encode(
      tsproto.ClanStickerUpdateByIdRequest.fromPartial({ ...body, id: id }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {};
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** get list sticker by user id */
  getListStickersByUserId(
    bearerToken: string,
    options = {},
  ): Promise<ApiStickerListedResponse> {
    const urlPath = "/mezon.api.Mezon/GetListStickersByUserId";

    const fetchOptions = buildFetchOptions("POST", options, "");
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiStickerListedResponse;
        }
        return tsproto.StickerListedResponse.decode(
          response.message,
        ) as ApiStickerListedResponse;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Register streaming in channel ( for bot - get streaming key) */
  registerStreamingChannel(
    bearerToken: string,
    body: ApiRegisterStreamingChannelRequest,
    options = {},
  ): Promise<ApiRegisterStreamingChannelResponse> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/RegisterStreamingChannel";
    const bodyWriter = tsproto.RegisterStreamingChannelRequest.encode(
      tsproto.RegisterStreamingChannelRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiRegisterStreamingChannelResponse;
        }
        return tsproto.RegisterStreamingChannelResponse.decode(
          response.message,
        ) as ApiRegisterStreamingChannelResponse;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** List all users that are part of a channel. */
  listStreamingChannelUsers(
    bearerToken: string,
    clanId?: string,
    channelId?: string,
    channelType?: number,
    limit?: number,
    state?: number,
    cursor?: string,
    options = {},
  ): Promise<ApiStreamingChannelUserList> {
    const urlPath = "/mezon.api.Mezon/ListStreamingChannelUsers";

    const bodyWriter = tsproto.ListChannelUsersRequest.encode(
      tsproto.ListChannelUsersRequest.fromPartial({
        clan_id: clanId,
        channel_id: channelId,
        channel_type: channelType,
        limit: limit,
        state: state,
        cursor: cursor,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiStreamingChannelUserList;
        }
        return tsproto.StreamingChannelUserList.decode(
          response.message,
        ) as ApiStreamingChannelUserList;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Get the list of system messages. */
  getSystemMessagesList(
    bearerToken: string,
    options = {},
  ): Promise<ApiSystemMessagesList> {
    const urlPath = "/mezon.api.Mezon/GetSystemMessagesList";

    const fetchOptions = buildFetchOptions("POST", options, "");
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiSystemMessagesList;
        }
        return tsproto.SystemMessagesList.decode(
          response.message,
        ) as ApiSystemMessagesList;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Create a system messages. */
  createSystemMessage(
    bearerToken: string,
    body: ApiSystemMessageRequest,
    options = {},
  ): Promise<any> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/CreateSystemMessage";
    const bodyWriter = tsproto.SystemMessageRequest.encode(
      tsproto.SystemMessageRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {};
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** List Sd Topic */
  listSdTopic(
    bearerToken: string,
    clanId?: string,
    limit?: number,
    options = {},
  ): Promise<ApiSdTopicList> {
    const urlPath = "/mezon.api.Mezon/ListSdTopic";

    const bodyWriter = tsproto.ListSdTopicRequest.encode(
      tsproto.ListSdTopicRequest.fromPartial({
        clan_id: clanId,
        limit: limit,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiSdTopicList;
        }
        return tsproto.SdTopicList.decode(response.message) as ApiSdTopicList;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Create Sd Topic */
  createSdTopic(
    bearerToken: string,
    body: ApiSdTopicRequest,
    options = {},
  ): Promise<ApiSdTopic> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/CreateSdTopic";
    const bodyWriter = tsproto.SdTopicRequest.encode(
      tsproto.SdTopicRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiSdTopic;
        }
        return tsproto.SdTopic.decode(response.message) as ApiSdTopic;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Delete a specific system messages. */
  deleteSystemMessage(
    bearerToken: string,
    clanId: string,
    options = {},
  ): Promise<any> {
    if (clanId === null || clanId === undefined) {
      throw new Error(
        "'clanId' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/DeleteSystemMessage";

    const bodyWriter = tsproto.DeleteSystemMessage.encode(
      tsproto.DeleteSystemMessage.fromPartial({ clan_id: clanId }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {};
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Get details of a specific system messages. */
  getSystemMessageByClanId(
    bearerToken: string,
    clanId: string,
    options = {},
  ): Promise<ApiSystemMessage> {
    if (clanId === null || clanId === undefined) {
      throw new Error(
        "'clanId' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/GetSystemMessageByClanId";

    const bodyWriter = tsproto.GetSystemMessage.encode(
      tsproto.GetSystemMessage.fromPartial({ clan_id: clanId }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiSystemMessage;
        }
        return tsproto.SystemMessage.decode(
          response.message,
        ) as ApiSystemMessage;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Update a system messages. */
  updateSystemMessage(
    bearerToken: string,
    clanId: string,
    body: MezonUpdateSystemMessageBody,
    options = {},
  ): Promise<any> {
    if (clanId === null || clanId === undefined) {
      throw new Error(
        "'clanId' is a required parameter but is null or undefined.",
      );
    }
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/UpdateSystemMessage";

    const bodyWriter = tsproto.SystemMessageRequest.encode(
      tsproto.SystemMessageRequest.fromPartial({ ...body, clan_id: clanId }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {};
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** List user channels */
  listThreadDescs(
    bearerToken: string,
    channelId: string,
    limit?: number,
    state?: number,
    clanId?: string,
    threadId?: string,
    page?: number,
    options = {},
  ): Promise<ApiChannelDescList> {
    if (channelId === null || channelId === undefined) {
      throw new Error(
        "'channelId' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/ListThreadDescs";

    const bodyWriter = tsproto.ListThreadRequest.encode(
      tsproto.ListThreadRequest.fromPartial({
        channel_id: channelId,
        limit: limit,
        state: state,
        clan_id: clanId,
        thread_id: threadId,
        page: page,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiChannelDescList;
        }
        return tsproto.ChannelDescListNoPool.decode(
          response.message,
        ) as ApiChannelDescList;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }
  /** Update fields in a given category. */
  updateCategory(
    bearerToken: string,
    clanId: string,
    body: MezonUpdateCategoryBody,
    options = {},
  ): Promise<any> {
    if (clanId === null || clanId === undefined) {
      throw new Error(
        "'clanId' is a required parameter but is null or undefined.",
      );
    }
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/UpdateCategory";

    const bodyWriter = tsproto.UpdateCategoryDescRequest.encode(
      tsproto.UpdateCategoryDescRequest.fromPartial({
        ...body,
        clan_id: clanId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {};
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Update channel private. */
  updateChannelPrivate(
    bearerToken: string,
    body: ApiChangeChannelPrivateRequest,
    options = {},
  ): Promise<any> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/UpdateChannelPrivate";
    const bodyWriter = tsproto.ChangeChannelPrivateRequest.encode(
      tsproto.ChangeChannelPrivateRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {};
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /**  */
  updateUserProfileByClan(
    bearerToken: string,
    clanId: string,
    body: MezonUpdateUserProfileByClanBody,
    options = {},
  ): Promise<any> {
    if (clanId === null || clanId === undefined) {
      throw new Error(
        "'clanId' is a required parameter but is null or undefined.",
      );
    }
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/UpdateUserProfileByClan";

    const bodyWriter = tsproto.UpdateClanProfileRequest.encode(
      tsproto.UpdateClanProfileRequest.fromPartial({
        ...body,
        clan_id: clanId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {};
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Upload attachment */
  uploadOauthFile(
    bearerToken: string,
    body: ApiUploadAttachmentRequest,
    options = {},
  ): Promise<ApiUploadAttachment> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/UploadOauthFile";
    const bodyWriter = tsproto.UploadAttachmentRequest.encode(
      tsproto.UploadAttachmentRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiUploadAttachment;
        }
        return tsproto.UploadAttachment.decode(
          response.message,
        ) as ApiUploadAttachment;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Upload attachment */
  uploadAttachmentFile(
    bearerToken: string,
    body: ApiUploadAttachmentRequest,
    options = {},
  ): Promise<ApiUploadAttachment> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/UploadAttachmentFile";
    const bodyWriter = tsproto.UploadAttachmentRequest.encode(
      tsproto.UploadAttachmentRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiUploadAttachment;
        }
        return tsproto.UploadAttachment.decode(
          response.message,
        ) as ApiUploadAttachment;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  multipartUploadAttachmentFile(
    bearerToken: string,
    body: ApiUploadAttachmentRequest,
    options = {},
  ): Promise<MultipartUploadAttachment> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/MultipartUploadAttachmentFileStart";
    const bodyWriter = tsproto.UploadAttachmentRequest.encode(
      tsproto.UploadAttachmentRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as MultipartUploadAttachment;
        }
        return tsproto.MultipartUploadAttachment.decode(
          response.message,
        ) as MultipartUploadAttachment;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  multipartUploadAttachmentFileFinsih(
    bearerToken: string,
    body: MultipartUploadAttachmentFinishRequest,
    options = {},
  ): Promise<any> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/MultipartUploadAttachmentFileStart";
    const bodyWriter = tsproto.MultipartUploadAttachmentFinishRequest.encode(
      tsproto.MultipartUploadAttachmentFinishRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        return response;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /**  */
  updateUser(
    bearerToken: string,
    body: ApiUpdateUsersRequest,
    options = {},
  ): Promise<any> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/UpdateUser";
    const bodyWriter = tsproto.UpdateUsersRequest.encode(
      tsproto.UpdateUsersRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** ListUserClansByUserId */
  listUserClansByUserId(
    bearerToken: string,
    options = {},
  ): Promise<ApiAllUserClans> {
    const urlPath = "/mezon.api.Mezon/ListUserClansByUserId";

    const fetchOptions = buildFetchOptions("POST", options, "");
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiAllUserClans;
        }
        return tsproto.AllUserClans.decode(response.message) as ApiAllUserClans;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** ListUserPermissionInChannel */
  listUserPermissionInChannel(
    bearerToken: string,
    clanId?: string,
    channelId?: string,
    options = {},
  ): Promise<ApiUserPermissionInChannelListResponse> {
    const urlPath = "/mezon.api.Mezon/ListUserPermissionInChannel";

    const bodyWriter = tsproto.UserPermissionInChannelListRequest.encode(
      tsproto.UserPermissionInChannelListRequest.fromPartial({
        clan_id: clanId,
        channel_id: channelId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiUserPermissionInChannelListResponse;
        }
        return tsproto.UserPermissionInChannelListResponse.decode(
          response.message,
        ) as ApiUserPermissionInChannelListResponse;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Get user status */
  getUserStatus(bearerToken: string, options = {}): Promise<ApiUserStatus> {
    const urlPath = "/mezon.api.Mezon/GetUserStatus";

    const fetchOptions = buildFetchOptions("POST", options, "");
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiUserStatus;
        }
        return tsproto.UserStatus.decode(response.message) as ApiUserStatus;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Update user status */
  updateUserStatus(
    bearerToken: string,
    body: ApiUserStatusUpdate,
    options = {},
  ): Promise<any> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/UpdateUserStatus";
    const bodyWriter = tsproto.UserStatusUpdate.encode(
      tsproto.UserStatusUpdate.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** Update user custom status (user_status). */
  updateUserCustomStatus(
    bearerToken: string,
    body: ApiUserStatusUpdate,
    options = {},
  ): Promise<any> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/UpdateUserCustomStatus";
    const bodyWriter = tsproto.UserStatusUpdate.encode(
      tsproto.UserStatusUpdate.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** create webhook */
  generateWebhook(
    bearerToken: string,
    body: ApiWebhookCreateRequest,
    options = {},
  ): Promise<any> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/GenerateWebhook";
    const bodyWriter = tsproto.WebhookCreateRequest.encode(
      tsproto.WebhookCreateRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        return tsproto.WebhookGenerateResponse.decode(response);
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** update webhook name by id */
  updateWebhookById(
    bearerToken: string,
    id: string,
    body: MezonUpdateWebhookByIdBody,
    options = {},
  ): Promise<any> {
    if (id === null || id === undefined) {
      throw new Error("'id' is a required parameter but is null or undefined.");
    }
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/UpdateWebhookById";

    const bodyWriter = tsproto.WebhookUpdateRequestById.encode(
      tsproto.WebhookUpdateRequestById.fromPartial({
        ...body,
        id: id,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** list webhook belong to the channel */
  listWebhookByChannelId(
    bearerToken: string,
    channelId: string,
    clanId?: string,
    options = {},
  ): Promise<ApiWebhookListResponse> {
    if (channelId === null || channelId === undefined) {
      throw new Error(
        "'channelId' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/ListWebhookByChannelId";

    const bodyWriter = tsproto.WebhookListRequest.encode(
      tsproto.WebhookListRequest.fromPartial({
        channel_id: channelId,
        clan_id: clanId || "",
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiWebhookListResponse;
        }
        return tsproto.WebhookListResponse.decode(
          response.message,
        ) as ApiWebhookListResponse;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** disabled webhook */
  deleteWebhookById(
    bearerToken: string,
    id: string,
    body: MezonDeleteWebhookByIdBody,
    options = {},
  ): Promise<any> {
    if (id === null || id === undefined) {
      throw new Error("'id' is a required parameter but is null or undefined.");
    }
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/DeleteWebhookById";

    const bodyWriter = tsproto.WebhookDeleteRequestById.encode(
      tsproto.WebhookDeleteRequestById.fromPartial({
        ...body,
        id: id,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  buildFullUrl(
    basePath: string,
    fragment: string,
    queryParams: Map<string, any>,
  ) {
    let fullPath = basePath + fragment + "?";

    for (const [k, v] of queryParams) {
      if (v instanceof Array) {
        fullPath += v.reduce((prev: any, curr: any) => {
          return (
            prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&"
          );
        }, "");
      } else {
        if (v != null) {
          fullPath += encodeURIComponent(k) + "=" + encodeURIComponent(v) + "&";
        }
      }
    }

    return fullPath;
  }

  /** Channel canvas editor */
  editChannelCanvases(
    bearerToken: string,
    body: ApiEditChannelCanvasRequest,
    options = {},
  ): Promise<ApiEditChannelCanvasResponse> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/EditChannelCanvases";
    const bodyWriter = tsproto.EditChannelCanvasRequest.encode(
      tsproto.EditChannelCanvasRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiEditChannelCanvasResponse;
        }
        return tsproto.EditChannelCanvasResponse.decode(
          response.message,
        ) as ApiEditChannelCanvasResponse;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /**  */
  getChannelCanvasDetail(
    bearerToken: string,
    id: string,
    clanId?: string,
    channelId?: string,
    options = {},
  ): Promise<ApiChannelCanvasDetailResponse> {
    if (id === null || id === undefined) {
      throw new Error("'id' is a required parameter but is null or undefined.");
    }
    const urlPath = "/mezon.api.Mezon/GetChannelCanvasDetail";

    const bodyWriter = tsproto.ChannelCanvasDetailRequest.encode(
      tsproto.ChannelCanvasDetailRequest.fromPartial({
        id: id,
        clan_id: clanId || "",
        channel_id: channelId || "",
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiChannelCanvasDetailResponse;
        }
        return tsproto.ChannelCanvasDetailResponse.decode(
          response.message,
        ) as ApiChannelCanvasDetailResponse;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /**  */
  deleteChannelCanvas(
    bearerToken: string,
    canvasId: string,
    clanId?: string,
    channelId?: string,
    options = {},
  ): Promise<any> {
    if (canvasId === null || canvasId === undefined) {
      throw new Error(
        "'canvasId' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/DeleteChannelCanvas";

    const bodyWriter = tsproto.DeleteChannelCanvasRequest.encode(
      tsproto.DeleteChannelCanvasRequest.fromPartial({
        canvas_id: canvasId,
        clan_id: clanId || "",
        channel_id: channelId || "",
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** list onboarding. */
  listOnboarding(
    bearerToken: string,
    clanId?: string,
    guideType?: number,
    limit?: number,
    page?: number,
    options = {},
  ): Promise<ApiListOnboardingResponse> {
    const urlPath = "/mezon.api.Mezon/ListOnboarding";

    const bodyWriter = tsproto.ListOnboardingRequest.encode(
      tsproto.ListOnboardingRequest.fromPartial({
        clan_id: clanId,
        guide_type: guideType,
        limit: limit,
        page: page,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiListOnboardingResponse;
        }
        return tsproto.ListOnboardingResponse.decode(
          response.message,
        ) as ApiListOnboardingResponse;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** create onboarding. */
  createOnboarding(
    bearerToken: string,
    body: ApiCreateOnboardingRequest,
    options = {},
  ): Promise<ApiListOnboardingResponse> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/CreateOnboarding";
    const bodyWriter = tsproto.CreateOnboardingRequest.encode(
      tsproto.CreateOnboardingRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiListOnboardingResponse;
        }
        return tsproto.ListOnboardingResponse.decode(
          response.message,
        ) as ApiListOnboardingResponse;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** delete onboarding. */
  deleteOnboarding(
    bearerToken: string,
    id: string,
    clanId?: string,
    options = {},
  ): Promise<any> {
    if (id === null || id === undefined) {
      throw new Error("'id' is a required parameter but is null or undefined.");
    }
    const urlPath = "/mezon.api.Mezon/DeleteOnboarding";

    const bodyWriter = tsproto.OnboardingRequest.encode(
      tsproto.OnboardingRequest.fromPartial({
        id: id,
        clan_id: clanId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** get detailed onboarding information. */
  getOnboardingDetail(
    bearerToken: string,
    id: string,
    clanId?: string,
    options = {},
  ): Promise<ApiOnboardingItem> {
    if (id === null || id === undefined) {
      throw new Error("'id' is a required parameter but is null or undefined.");
    }
    const urlPath = "/mezon.api.Mezon/GetOnboardingDetail";

    const bodyWriter = tsproto.OnboardingRequest.encode(
      tsproto.OnboardingRequest.fromPartial({
        id: id,
        clan_id: clanId || "",
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiOnboardingItem;
        }
        return tsproto.OnboardingItem.decode(
          response.message,
        ) as ApiOnboardingItem;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** update onboarding. */
  updateOnboarding(
    bearerToken: string,
    id: string,
    body: MezonUpdateOnboardingBody,
    options = {},
  ): Promise<any> {
    if (id === null || id === undefined) {
      throw new Error("'id' is a required parameter but is null or undefined.");
    }
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/UpdateOnboarding";

    const bodyWriter = tsproto.UpdateOnboardingRequest.encode(
      tsproto.UpdateOnboardingRequest.fromPartial({
        ...body,
        id: id,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** Generate clan webhook. */
  generateClanWebhook(
    bearerToken: string,
    body: ApiGenerateClanWebhookRequest,
    options = {},
  ): Promise<ApiGenerateClanWebhookResponse> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/GenerateClanWebhook";
    const bodyWriter = tsproto.GenerateClanWebhookRequest.encode(
      tsproto.GenerateClanWebhookRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiGenerateClanWebhookResponse;
        }
        return tsproto.GenerateClanWebhookResponse.decode(
          response.message,
        ) as ApiGenerateClanWebhookResponse;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** List clan webhook. */
  listClanWebhook(
    bearerToken: string,
    clanId: string,
    options = {},
  ): Promise<ApiListClanWebhookResponse> {
    if (clanId === null || clanId === undefined) {
      throw new Error(
        "'clanId' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/ListClanWebhook";

    const bodyWriter = tsproto.ListClanWebhookRequest.encode(
      tsproto.ListClanWebhookRequest.fromPartial({
        clan_id: clanId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiListClanWebhookResponse;
        }
        return tsproto.ListClanWebhookResponse.decode(
          response.message,
        ) as ApiListClanWebhookResponse;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Disabled clan webhook. */
  deleteClanWebhookById(
    bearerToken: string,
    id: string,
    clanId?: string,
    options = {},
  ): Promise<any> {
    if (id === null || id === undefined) {
      throw new Error("'id' is a required parameter but is null or undefined.");
    }
    const urlPath = "/mezon.api.Mezon/DeleteClanWebhookById";

    const body = {
      id: id,
      clan_id: clanId,
    };

    const bodyWriter = tsproto.ClanWebhookRequest.encode(
      tsproto.ClanWebhookRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** Update clan webhook by id. */
  updateClanWebhookById(
    bearerToken: string,
    id: string,
    body: MezonUpdateClanWebhookByIdBody,
    options = {},
  ): Promise<any> {
    if (id === null || id === undefined) {
      throw new Error("'id' is a required parameter but is null or undefined.");
    }
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/UpdateClanWebhookById";

    const bodyData = {
      ...body,
      id: id,
    };

    const bodyWriter = tsproto.UpdateClanWebhookRequest.encode(
      tsproto.UpdateClanWebhookRequest.fromPartial(bodyData),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** Sd Topic */
  getTopicDetail(
    bearerToken: string,
    topicId?: string,
    options = {},
  ): Promise<ApiSdTopic> {
    const urlPath = "/mezon.api.Mezon/GetTopicDetail";

    const body = {
      topic_id: topicId,
    };

    const bodyWriter = tsproto.SdTopicDetailRequest.encode(
      tsproto.SdTopicDetailRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiSdTopic;
        }
        return tsproto.SdTopic.decode(response.message) as ApiSdTopic;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** List onboarding step. */
  listOnboardingStep(
    bearerToken: string,
    clanId?: string,
    limit?: number,
    page?: number,
    options = {},
  ): Promise<ApiListOnboardingStepResponse> {
    const urlPath = "/mezon.api.Mezon/ListOnboardingStep";

    const body = {
      clan_id: clanId,
      limit: limit,
      page: page,
    };

    const bodyWriter = tsproto.ListOnboardingStepRequest.encode(
      tsproto.ListOnboardingStepRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiListOnboardingStepResponse;
        }
        return tsproto.ListOnboardingStepResponse.decode(
          response.message,
        ) as ApiListOnboardingStepResponse;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Update onboarding step. */
  updateOnboardingStepByClanId(
    bearerToken: string,
    clanId: string,
    body: MezonUpdateOnboardingStepByClanIdBody,
    options = {},
  ): Promise<any> {
    if (clanId === null || clanId === undefined) {
      throw new Error(
        "'clanId' is a required parameter but is null or undefined.",
      );
    }
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/UpdateOnboardingStep";

    const bodyData = {
      ...body,
      clan_id: clanId,
    };

    const bodyWriter = tsproto.UpdateOnboardingStepRequest.encode(
      tsproto.UpdateOnboardingStepRequest.fromPartial(bodyData),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** create meeting room */
  createRoomChannelApps(
    bearerToken: string,
    body: MezonapiCreateRoomChannelApps,
    options = {},
  ): Promise<MezonapiCreateRoomChannelApps> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/CreateRoomChannelApps";
    const bodyWriter = tsproto.CreateRoomChannelApps.encode(
      tsproto.CreateRoomChannelApps.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        return tsproto.CreateRoomChannelApps.decode(
          response,
        ) as unknown as MezonapiCreateRoomChannelApps;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Generate Meet Token */
  generateMeetToken(
    bearerToken: string,
    body: ApiGenerateMeetTokenRequest,
    options = {},
  ): Promise<ApiGenerateMeetTokenResponse> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/GenerateMeetToken";
    const bodyWriter = tsproto.GenerateMeetTokenRequest.encode(
      tsproto.GenerateMeetTokenRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiGenerateMeetTokenResponse;
        }
        return tsproto.GenerateMeetTokenResponse.decode(
          response.message,
        ) as ApiGenerateMeetTokenResponse;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Create mezon OAuth client */
  getMezonOauthClient(
    bearerToken: string,
    clientId?: string,
    clientName?: string,
    options = {},
  ): Promise<ApiMezonOauthClient> {
    const urlPath = "/mezon.api.Mezon/GetMezonOauthClient";

    const body = {
      client_id: clientId,
      client_name: clientName,
    };

    const bodyWriter = tsproto.GetMezonOauthClientRequest.encode(
      tsproto.GetMezonOauthClientRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiMezonOauthClient;
        }
        return tsproto.MezonOauthClient.decode(
          response.message,
        ) as ApiMezonOauthClient;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** update mezon OAuth */
  updateMezonOauthClient(
    bearerToken: string,
    body: ApiMezonOauthClient,
    options = {},
  ): Promise<ApiMezonOauthClient> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/UpdateMezonOauthClient";
    const bodyWriter = tsproto.MezonOauthClient.encode(
      tsproto.MezonOauthClient.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiMezonOauthClient;
        }
        return tsproto.MezonOauthClient.decode(
          response.message,
        ) as ApiMezonOauthClient;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }
  /**  */
  generateHashChannelApps(
    bearerToken: string,
    appId?: string,
    options = {},
  ): Promise<ApiCreateHashChannelAppsResponse> {
    const urlPath = "/mezon.api.Mezon/GenerateHashChannelApps";

    const body = {
      app_id: appId,
    };

    const bodyWriter = tsproto.GenerateHashChannelAppsRequest.encode(
      tsproto.GenerateHashChannelAppsRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiCreateHashChannelAppsResponse;
        }
        return tsproto.GenerateHashChannelAppsResponse.decode(
          response.message,
        ) as ApiCreateHashChannelAppsResponse;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Add user event */
  addUserEvent(
    bearerToken: string,
    body: ApiUserEventRequest,
    options = {},
  ): Promise<any> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/AddUserEvent";
    const bodyWriter = tsproto.UserEventRequest.encode(
      tsproto.UserEventRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** Delete user event */
  deleteUserEvent(
    bearerToken: string,
    clanId?: string,
    eventId?: string,
    options = {},
  ): Promise<any> {
    const urlPath = "/mezon.api.Mezon/DeleteUserEvent";

    const body = {
      clan_id: clanId,
      event_id: eventId,
    };

    const bodyWriter = tsproto.UserEventRequest.encode(
      tsproto.UserEventRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /**  */
  updateRoleOrder(
    bearerToken: string,
    body: ApiUpdateRoleOrderRequest,
    options = {},
  ): Promise<any> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/UpdateRoleOrder";
    const bodyWriter = tsproto.UpdateRoleOrderRequest.encode(
      tsproto.UpdateRoleOrderRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** Create external Mezon meet */
  createExternalMezonMeet(
    bearerToken: string,
    options = {},
  ): Promise<ApiGenerateMezonMeetResponse> {
    const urlPath = "/mezon.api.Mezon/CreateExternalMezonMeet";

    const fetchOptions = buildFetchOptions("POST", options, "");
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiGenerateMezonMeetResponse;
        }
        return tsproto.GenerateMezonMeetResponse.decode(
          response.message,
        ) as ApiGenerateMezonMeetResponse;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** handler external mezon meet */
  generateMeetTokenExternal(
    bearerToken: string,
    basePath: string,
    token: string,
    username?: string,
    metadata?: string,
    isGuest?: boolean,
    options = {},
  ): Promise<ApiGenerateMeetTokenExternalResponse> {
    if (token === null || token === undefined) {
      throw new Error(
        "'token' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/v2/meet/external/{token}".replace(
      "{token}",
      encodeURIComponent(String(token)),
    );
    const queryParams = new Map<string, any>();
    queryParams.set("username", username);
    queryParams.set("metadata", metadata);
    queryParams.set("is_guest", isGuest);

    const bodyJson = "";

    const fullUrl = this.buildFullUrl(basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, bodyJson);
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }
    fetchOptions.headers["Accept"] = "application/x-protobuf";
    fetchOptions.headers["Content-Type"] = "application/json";

    return Promise.race([
      fetch(fullUrl, fetchOptions).then(async (response) => {
        const buffer = await response.arrayBuffer();
        return tsproto.GenerateMeetTokenExternalResponse.decode(
          new Uint8Array(buffer),
        ) as ApiGenerateMeetTokenExternalResponse;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** mute participant in the room */
  muteParticipantMezonMeet(
    bearerToken: string,
    body: ApiMeetParticipantRequest,
    options = {},
  ): Promise<any> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/MuteParticipantMezonMeet";
    const bodyWriter = tsproto.MeetParticipantRequest.encode(
      tsproto.MeetParticipantRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** Remove participant out the room */
  removeParticipantMezonMeet(
    bearerToken: string,
    body: ApiMeetParticipantRequest,
    options = {},
  ): Promise<any> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/RemoveParticipantMezonMeet";
    const bodyWriter = tsproto.MeetParticipantRequest.encode(
      tsproto.MeetParticipantRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** List channels detail */
  listChannelDetail(
    bearerToken: string,
    channelId: string,
    options = {},
  ): Promise<ApiChannelDescription> {
    if (channelId === null || channelId === undefined) {
      throw new Error(
        "'channelId' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/ListChannelDetail";

    const body = {
      channel_id: channelId,
    };

    const bodyWriter = tsproto.ListChannelDetailRequest.encode(
      tsproto.ListChannelDetailRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiChannelDescription;
        }
        return tsproto.ChannelDescription.decode(
          response.message,
        ) as ApiChannelDescription;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** List channel events */
  listChannelTimeline(
    bearerToken: string,
    request: ApiListChannelTimelineRequest,
    options = {},
  ): Promise<ApiListChannelTimelineResponse> {
    if (!request) {
      throw new Error(
        "'request' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/ListChannelTimeline";
    const bodyWriter = tsproto.ListChannelTimelineRequest.encode(
      tsproto.ListChannelTimelineRequest.fromPartial(request),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        return tsproto.ListChannelTimelineResponse.decode(
          response,
        ) as unknown as ApiListChannelTimelineResponse;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Create channel event */
  createChannelTimeline(
    bearerToken: string,
    request: ApiCreateChannelTimelineRequest,
    options = {},
  ): Promise<ApiCreateChannelTimelineResponse> {
    if (!request) {
      throw new Error(
        "'request' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/CreateChannelTimeline";
    const bodyWriter = tsproto.CreateChannelTimelineRequest.encode(
      tsproto.CreateChannelTimelineRequest.fromPartial(request),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        return tsproto.CreateChannelTimelineResponse.decode(
          response,
        ) as unknown as ApiCreateChannelTimelineResponse;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Update channel event */
  updateChannelTimeline(
    bearerToken: string,
    request: ApiUpdateChannelTimelineRequest,
    options = {},
  ): Promise<ApiUpdateChannelTimelineResponse> {
    if (!request) {
      throw new Error(
        "'request' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/UpdateChannelTimeline";
    const bodyWriter = tsproto.UpdateChannelTimelineRequest.encode(
      tsproto.UpdateChannelTimelineRequest.fromPartial(request),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        return tsproto.UpdateChannelTimelineResponse.decode(
          response,
        ) as unknown as ApiUpdateChannelTimelineResponse;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** List channel events */
  detailChannelTimeline(
    bearerToken: string,
    request: ApiDetailChannelTimelineRequest,
    options = {},
  ): Promise<ApiDetailChannelTimelineResponse> {
    if (!request) {
      throw new Error(
        "'request' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/DetailChannelTimeline";
    const bodyWriter = tsproto.ChannelTimelineDetailRequest.encode(
      tsproto.ChannelTimelineDetailRequest.fromPartial(request),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        return tsproto.ChannelTimelineDetailResponse.decode(
          response,
        ) as unknown as ApiDetailChannelTimelineResponse;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /**  */
  updateClanOrder(
    bearerToken: string,
    body: ApiUpdateClanOrderRequest,
    options = {},
  ): Promise<any> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/UpdateClanOrder";
    const bodyWriter = tsproto.UpdateClanOrderRequest.encode(
      tsproto.UpdateClanOrderRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** Discover mezon clan. */
  clanDiscover(
    basicAuthUsername: string,
    basicAuthPassword: string,
    basePath: string,
    body: ApiClanDiscoverRequest,
    options = {},
  ): Promise<ApiListClanDiscover> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/v2/clan/discover";
    const queryParams = new Map<string, any>();

    let bodyJson = "";
    bodyJson = JSON.stringify(body || {});

    const fullUrl = this.buildFullUrl(basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, bodyJson);
    if (basicAuthUsername) {
      fetchOptions.headers["Authorization"] =
        "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);
    }
    fetchOptions.headers["Accept"] = "application/x-protobuf";
    fetchOptions.headers["Content-Type"] = "application/json";

    return Promise.race([
      fetch(fullUrl, fetchOptions).then(async (response) => {
        const buffer = await response.arrayBuffer();
        return tsproto.ListClanDiscover.decode(
          new Uint8Array(buffer),
        ) as ApiListClanDiscover;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }
  /**  */
  deleteQuickMenuAccess(
    bearerToken: string,
    id?: string,
    clanId?: string,
    botId?: string,
    menuName?: string,
    background?: string,
    actionMsg?: string,
    options = {},
  ): Promise<any> {
    const urlPath = "/mezon.api.Mezon/DeleteQuickMenuAccess";

    const body = {
      id: id,
      clan_id: clanId,
      bot_id: botId,
      menu_name: menuName,
      background: background,
      action_msg: actionMsg,
    };

    const bodyWriter = tsproto.QuickMenuAccess.encode(
      tsproto.QuickMenuAccess.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /**  */
  listQuickMenuAccess(
    bearerToken: string,
    botId?: string,
    channelId?: string,
    menuType?: number,
    options = {},
  ): Promise<ApiQuickMenuAccessList> {
    const urlPath = "/mezon.api.Mezon/ListQuickMenuAccess";

    const body = {
      bot_id: botId,
      channel_id: channelId,
      menu_type: menuType,
    };

    const bodyWriter = tsproto.ListQuickMenuAccessRequest.encode(
      tsproto.ListQuickMenuAccessRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiQuickMenuAccessList;
        }
        return tsproto.QuickMenuAccessList.decode(
          response.message,
        ) as ApiQuickMenuAccessList;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /**  */
  addQuickMenuAccess(
    bearerToken: string,
    body: ApiQuickMenuAccessRequest,
    options = {},
  ): Promise<any> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/AddQuickMenuAccess";
    const bodyWriter = tsproto.QuickMenuAccess.encode(
      tsproto.QuickMenuAccess.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /**  */
  updateQuickMenuAccess(
    bearerToken: string,
    body: ApiQuickMenuAccessRequest,
    options = {},
  ): Promise<any> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/UpdateQuickMenuAccess";
    const bodyWriter = tsproto.QuickMenuAccess.encode(
      tsproto.QuickMenuAccess.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** For sale items */
  listForSaleItems(
    bearerToken: string,
    page?: number,
    options = {},
  ): Promise<ApiForSaleItemList> {
    const urlPath = "/mezon.api.Mezon/ListForSaleItems";

    const body = {
      page: page,
    };

    const bodyWriter = tsproto.ListForSaleItemsRequest.encode(
      tsproto.ListForSaleItemsRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiForSaleItemList;
        }
        return tsproto.ForSaleItemList.decode(
          response.message,
        ) as ApiForSaleItemList;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /**  */
  isFollower(
    bearerToken: string,
    body: ApiIsFollowerRequest,
    options = {},
  ): Promise<ApiIsFollowerResponse> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/IsFollower";
    const bodyWriter = tsproto.IsFollowerRequest.encode(
      tsproto.IsFollowerRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiIsFollowerResponse;
        }
        return tsproto.IsFollowerResponse.decode(
          response.message,
        ) as ApiIsFollowerResponse;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /**  */
  transferOwnership(
    bearerToken: string,
    body: ApiTransferOwnershipRequest,
    options = {},
  ): Promise<any> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/TransferOwnership";
    const bodyWriter = tsproto.TransferOwnershipRequest.encode(
      tsproto.TransferOwnershipRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** Update username */
  updateUsername(
    bearerToken: string,
    body: ApiUpdateUsernameRequest,
    options = {},
  ): Promise<ApiSession> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/UpdateUsername";
    const bodyWriter = tsproto.UpdateUsernameRequest.encode(
      tsproto.UpdateUsernameRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiSession;
        }
        return tsproto.Session.decode(response.message) as ApiSession;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Ban a set of users from a channel. */
  isBanned(
    bearerToken: string,
    channelId: string,
    options = {},
  ): Promise<ApiIsBannedResponse> {
    if (channelId === null || channelId === undefined) {
      throw new Error(
        "'channelId' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/IsBanned";

    const body = {
      channel_id: channelId,
    };

    const bodyWriter = tsproto.IsBannedRequest.encode(
      tsproto.IsBannedRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as ApiIsBannedResponse;
        }
        return tsproto.IsBannedResponse.decode(
          response.message,
        ) as ApiIsBannedResponse;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /**  */
  reportMessageAbuse(
    bearerToken: string,
    messageId?: string,
    abuseType?: string,
    options = {},
  ): Promise<any> {
    const urlPath = "/mezon.api.Mezon/ReportMessageAbuse";

    const body = {
      message_id: messageId,
      abuse_type: abuseType,
    };

    const bodyWriter = tsproto.ReportMessageAbuseReqest.encode(
      tsproto.ReportMessageAbuseReqest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /**  */
  sendChannelMessage(
    bearerToken: string,
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    content: any,
    mentions?: Array<ApiMessageMention>,
    attachments?: Array<ApiMessageAttachment>,
    references?: Array<ApiMessageRef>,
    anonymous_message?: boolean,
    mention_everyone?: boolean,
    avatar?: string,
    code?: number,
    topic_id?: string,
  ): Promise<tsproto.ChannelMessageAck> {
    const urlPath = "/mezon.api.Mezon/SendChannelMessage";

    const bodyWriter = tsproto.ChannelMessageSend.encode(
      tsproto.ChannelMessageSend.fromPartial({
        clan_id: clan_id,
        channel_id: channel_id,
        mode: mode,
        is_public: is_public,
        content: content,
        mentions: mentions,
        attachments: attachments,
        references: references,
        anonymous_message: anonymous_message,
        mention_everyone: mention_everyone as boolean,
        avatar: avatar,
        code: code,
        topic_id: topic_id,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", {}, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        return tsproto.ChannelMessageAck.decode(
          response,
        ) as unknown as tsproto.ChannelMessageAck;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /**  */
  updateChannelMessage(
    bearerToken: string,
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    message_id: string,
    content: any,
    mentions?: Array<ApiMessageMention>,
    attachments?: Array<ApiMessageAttachment>,
    hideEditted?: boolean,
    topic_id?: string,
    is_update_msg_topic?: boolean,
  ): Promise<any> {
    const urlPath = "/mezon.api.Mezon/UpdateChannelMessage";

    const bodyWriter = tsproto.ChannelMessageUpdate.encode(
      tsproto.ChannelMessageUpdate.fromPartial({
        clan_id: clan_id,
        channel_id: channel_id,
        message_id: message_id,
        mode: mode,
        is_public: is_public,
        content: content,
        mentions: mentions,
        attachments: attachments,
        hide_editted: hideEditted,
        topic_id: topic_id,
        is_update_msg_topic: is_update_msg_topic,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", {}, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as any;
        }
        return tsproto.ChannelMessageUpdate.decode(response.message) as any;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /**  */
  deleteChannelMessage(
    bearerToken: string,
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    message_id: string,
    has_attachment?: boolean,
    topic_id?: string,
    mentions?: Uint8Array,
    references?: Uint8Array,
  ): Promise<any> {
    const urlPath = "/mezon.api.Mezon/DeleteChannelMessage";

    const bodyWriter = tsproto.ChannelMessageRemove.encode(
      tsproto.ChannelMessageRemove.fromPartial({
        clan_id: clan_id,
        channel_id: channel_id,
        message_id: message_id,
        mode: mode,
        is_public: is_public,
        has_attachment: has_attachment,
        mentions: mentions,
        references: references,
        topic_id: topic_id,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", {}, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        if (response.code != 0) {
          return {} as any;
        }
        return tsproto.ChannelMessageRemove.decode(response.message) as any;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /**  */
  updateMezonVoiceState(
    bearerToken: string,
    clanId?: string,
    channelId?: string,
    displayName?: string,
    roomName?: string,
    state?: number,
    options = {},
  ): Promise<any> {
    const urlPath = "/mezon.api.Mezon/UpdateMezonVoiceState";

    const body = {
      clan_id: clanId,
      channel_id: channelId,
      display_name: displayName,
      room_name: roomName,
      state: state,
    };

    const bodyWriter = tsproto.HandleParticipantMeetStateEvent.encode(
      tsproto.HandleParticipantMeetStateEvent.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /**  */
  messageButtonClick(
    bearerToken: string,
    messageId?: string,
    channelId?: string,
    buttonId?: string,
    senderId?: string,
    userId?: string,
    extraData?: string,
    options = {},
  ): Promise<any> {
    const urlPath = "/mezon.api.Mezon/MessageButtonClick";

    const body = {
      message_id: messageId,
      channel_id: channelId,
      button_id: buttonId,
      sender_id: senderId,
      user_id: userId,
      extra_data: extraData,
    };

    const bodyWriter = tsproto.MessageButtonClicked.encode(
      tsproto.MessageButtonClicked.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /**  */
  dropdownBoxSelected(
    bearerToken: string,
    messageId?: string,
    channelId?: string,
    selectboxId?: string,
    senderId?: string,
    userId?: string,
    values?: string[],
    options = {},
  ): Promise<any> {
    const urlPath = "/mezon.api.Mezon/DropdownBoxSelected";

    const body = {
      message_id: messageId,
      channel_id: channelId,
      selectbox_id: selectboxId,
      sender_id: senderId,
      user_id: userId,
      values: values,
    };

    const bodyWriter = tsproto.DropdownBoxSelected.encode(
      tsproto.DropdownBoxSelected.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  activeArchivedThread(
    bearerToken: string,
    clanId?: string,
    channelId?: string,
    options = {},
  ): Promise<any> {
    const urlPath = "/mezon.api.Mezon/ActiveArchivedThread";

    const body = {
      clan_id: clanId,
      channel_id: channelId,
    };

    const bodyWriter = tsproto.ActiveArchivedThread.encode(
      tsproto.ActiveArchivedThread.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  addAgentToChannel(
    bearerToken: string,
    roomName?: string,
    channelId?: string,
    options = {},
  ): Promise<any> {
    const urlPath = "/mezon.api.Mezon/AddAgentToChannel";

    const body = {
      room_name: roomName,
      channel_id: channelId,
    };

    const bodyWriter = tsproto.UpdateAIAgentRequest.encode(
      tsproto.UpdateAIAgentRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  disconnectAgent(
    bearerToken: string,
    roomName?: string,
    channelId?: string,
    options = {},
  ): Promise<any> {
    const urlPath = "/mezon.api.Mezon/DisconnectAgent";

    const body = {
      room_name: roomName,
      channel_id: channelId,
    };

    const bodyWriter = tsproto.UpdateAIAgentRequest.encode(
      tsproto.UpdateAIAgentRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        return response;
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  listMutedChannel(
    bearerToken: string,
    clanId: string,
    options = {},
  ): Promise<ApiMutedChannelList> {
    if (clanId === null || clanId === undefined) {
      throw new Error(
        "'clanId' is a required parameter but is null or undefined.",
      );
    }

    const urlPath = "/mezon.api.Mezon/ListMutedChannel";

    const bodyWriter = tsproto.ListMutedChannelRequest.encode(
      tsproto.ListMutedChannelRequest.fromPartial({ clan_id: clanId }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        return tsproto.MutedChannelList.decode(
          response,
        ) as unknown as ApiMutedChannelList;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  channelMessageReact(
    bearerToken: string,
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    message_id: string,
    emoji_id: string,
    emoji: string,
    count: number,
    message_sender_id: string,
    action_delete: boolean,
    topic_id?: string,
    emoji_recent_id?: string,
    sender_name?: string,
  ): Promise<tsproto.ChannelMessageAck> {
    const urlPath = "/mezon.api.Mezon/ReactChannelMessage";

    const bodyWriter = tsproto.MessageReaction.encode(
      tsproto.MessageReaction.fromPartial({
        clan_id: clan_id,
        channel_id: channel_id,
        mode: mode,
        is_public: is_public,
        message_id: message_id,
        emoji_id: emoji_id,
        emoji: emoji,
        count: count,
        message_sender_id: message_sender_id,
        action: action_delete,
        emoji_recent_id: emoji_recent_id,
        sender_name: sender_name,
        topic_id: topic_id,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", {}, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        return tsproto.ChannelMessageSend.decode(
          response,
        ) as unknown as tsproto.ChannelMessageAck;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Create a poll in a channel. */
  createPoll(
    bearerToken: string,
    body: ApiCreatePollRequest,
    options = {},
  ): Promise<ApiCreatePollResponse> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/CreatePoll";

    const bodyWriter = tsproto.CreatePollRequest.encode(
      tsproto.CreatePollRequest.fromPartial({
        channel_id: body.channel_id ?? "0",
        clan_id: body.clan_id ?? "0",
        question: body.question ?? "",
        answers: body.answers ?? [],
        expire_hours: body.expire_hours ?? 0,
        type: (body.type ?? 0) as tsproto.PollType,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        const decoded = tsproto.CreatePollResponse.decode(response);
        return {
          poll_id: decoded.poll_id,
          message_id: decoded.message_id,
          question: decoded.question,
          answers: decoded.answers.map((a) => ({
            index: a.index,
            label: a.label,
          })),
          answer_counts: decoded.answer_counts,
          exp: decoded.exp,
          is_closed: decoded.is_closed,
          creator_id: decoded.creator_id,
          type: decoded.type,
          total_votes: decoded.total_votes,
        } as ApiCreatePollResponse;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Vote on a poll. */
  votePoll(
    bearerToken: string,
    body: ApiVotePollRequest,
    options = {},
  ): Promise<ApiVotePollResponse> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/VotePoll";

    const bodyWriter = tsproto.VotePollRequest.encode(
      tsproto.VotePollRequest.fromPartial({
        poll_id: body.poll_id ?? "0",
        message_id: body.message_id ?? "0",
        channel_id: body.channel_id ?? "0",
        answer_indices: body.answer_indices ?? [],
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        const decoded =
          response.length > 0
            ? tsproto.VotePollResponse.decode(response)
            : { my_answer_indices: [] };
        return {
          my_answer_indices: Array.from(decoded.my_answer_indices ?? []),
        } as ApiVotePollResponse;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Close a poll (creator only). */
  closePoll(
    bearerToken: string,
    body: ApiClosePollRequest,
    options = {},
  ): Promise<any> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/ClosePoll";

    const bodyWriter = tsproto.ClosePollRequest.encode(
      tsproto.ClosePollRequest.fromPartial({
        poll_id: body.poll_id ?? "0",
        message_id: body.message_id ?? "0",
        channel_id: body.channel_id ?? "0",
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then((response) => {
        if (
          response.status == 204 ||
          (response.status >= 200 && response.status < 300)
        ) {
          return {};
        } else {
          throw response;
        }
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  /** Get poll details. */
  getPoll(
    bearerToken: string,
    body: ApiGetPollRequest,
    options = {},
  ): Promise<ApiGetPollResponse> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/GetPoll";

    const bodyWriter = tsproto.GetPollRequest.encode(
      tsproto.GetPollRequest.fromPartial({
        poll_id: body.poll_id ?? "0",
        message_id: body.message_id ?? "0",
        channel_id: body.channel_id ?? "0",
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (response) => {
        const decoded = tsproto.GetPollResponse.decode(response);
        return {
          poll_id: decoded.poll_id,
          message_id: decoded.message_id,
          question: decoded.question,
          answers: decoded.answers.map((a) => ({
            index: a.index,
            label: a.label,
          })),
          answer_counts: decoded.answer_counts,
          exp: decoded.exp,
          is_closed: decoded.is_closed,
          creator_id: decoded.creator_id,
          type: decoded.type,
          total_votes: decoded.total_votes,
          voter_details: decoded.voter_details.map((v) => ({
            answer_index: v.answer_index,
            user_ids: v.user_ids,
          })),
        } as ApiGetPollResponse;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  async followUsers(userIds: string[]): Promise<Status> {
    const urlPath = "";
    const fetchOptions = { status_follow: { user_ids: userIds } } as any;
    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {} as Status;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  async joinClanChat(clan_id: string): Promise<ClanJoin> {
    const urlPath = "";
    const fetchOptions = {
      clan_join: {
        clan_id: clan_id,
      },
    } as any;
    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {} as ClanJoin;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  async follower(): Promise<void> {
    const urlPath = "";
    const fetchOptions = {
      follow_event: {},
    } as any;
    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {} as unknown as void;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  async joinChat(
    clan_id: string,
    channel_id: string,
    channel_type: number,
    is_public: boolean,
  ): Promise<Channel> {
    const urlPath = "";
    const fetchOptions = {
      channel_join: {
        clan_id: clan_id,
        channel_id: channel_id,
        channel_type: channel_type,
        is_public: is_public,
      },
    } as any;
    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {} as Channel;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  leaveChat(
    clan_id: string,
    channel_id: string,
    channel_type: number,
    is_public: boolean,
  ): Promise<void> {
    const urlPath = "";
    const fetchOptions = {
      channel_leave: {
        clan_id: clan_id,
        channel_id: channel_id,
        channel_type: channel_type,
        is_public: is_public,
      },
    } as any;
    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {} as unknown as void;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  async removeChatMessage(
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    message_id: string,
    has_attachment?: boolean,
    topic_id?: string,
    mentions?: string,
    references?: string,
  ): Promise<tsproto.ChannelMessageAck> {
    const urlPath = "";
    const fetchOptions = {
      channel_message_remove: {
        clan_id: clan_id,
        channel_id: channel_id,
        mode: mode,
        message_id: message_id,
        is_public: is_public,
        has_attachment: has_attachment,
        topic_id: topic_id,
        mentions: mentions,
        references: references,
      },
    } as any;
    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {} as tsproto.ChannelMessageAck;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  unfollowUsers(user_ids: string[]): Promise<void> {
    const urlPath = "";
    const fetchOptions = { status_unfollow: { user_ids: user_ids } } as any;
    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {} as unknown as void;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  async updateChatMessage(
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    message_id: string,
    content: any,
    mentions?: Array<ApiMessageMention>,
    attachments?: Array<ApiMessageAttachment>,
    hideEditted?: boolean,
    topic_id?: string,
    is_update_msg_topic?: boolean,
  ): Promise<tsproto.ChannelMessageAck> {
    const urlPath = "";
    const fetchOptions = {
      channel_message_update: {
        clan_id: clan_id,
        channel_id: channel_id,
        message_id: message_id,
        content: content,
        mentions: mentions,
        attachments: attachments,
        mode: mode,
        is_public: is_public,
        hide_editted: hideEditted,
        topic_id: topic_id,
        is_update_msg_topic: is_update_msg_topic,
      },
    } as any;
    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {} as tsproto.ChannelMessageAck;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  updateStatus(status?: string): Promise<void> {
    const urlPath = "";
    const fetchOptions = { status_update: { status: status } } as any;
    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {} as unknown as void;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  async writeQuickMenuEvent(
    menu_name: string,
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    content: any,
    mentions?: Array<ApiMessageMention>,
    attachments?: Array<ApiMessageAttachment>,
    references?: Array<ApiMessageRef>,
    anonymous_message?: boolean,
    mention_everyone?: boolean,
    avatar?: string,
    code?: number,
    topic_id?: string,
  ): Promise<QuickMenuEvent> {
    const urlPath = "";
    const fetchOptions = {
      quick_menu_event: {
        menu_name: menu_name,
        message: {
          clan_id: clan_id,
          channel_id: channel_id,
          mode: mode,
          is_public: is_public,
          content: content,
          mentions: mentions,
          attachments: attachments,
          references: references,
          anonymous_message: anonymous_message,
          mention_everyone: mention_everyone,
          avatar: avatar,
          code: code,
          topic_id: topic_id,
        },
      },
    } as any;
    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {} as QuickMenuEvent;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  async writeEphemeralMessage(
    receiver_ids: string[],
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    content: any,
    mentions?: Array<ApiMessageMention>,
    attachments?: Array<ApiMessageAttachment>,
    references?: Array<ApiMessageRef>,
    anonymous_message?: boolean,
    mention_everyone?: boolean,
    avatar?: string,
    code?: number,
    topic_id?: string,
    id?: string,
  ): Promise<tsproto.ChannelMessageAck> {
    const urlPath = "";
    const fetchOptions = {
      ephemeral_message_send: {
        receiver_ids: receiver_ids,
        message: {
          clan_id: clan_id,
          channel_id: channel_id,
          mode: mode,
          is_public: is_public,
          content: content,
          mentions: mentions,
          attachments: attachments,
          references: references,
          anonymous_message: anonymous_message,
          mention_everyone: mention_everyone,
          avatar: avatar,
          code: code,
          topic_id: topic_id,
          id: id,
        },
      },
    } as any;
    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {} as tsproto.ChannelMessageAck;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  async writeChatMessage(
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    content: any,
    mentions?: Array<ApiMessageMention>,
    attachments?: Array<ApiMessageAttachment>,
    references?: Array<ApiMessageRef>,
    anonymous_message?: boolean,
    mention_everyone?: boolean,
    avatar?: string,
    code?: number,
    topic_id?: string,
  ): Promise<tsproto.ChannelMessageAck> {
    const urlPath = "";
    const fetchOptions = {
      channel_message_send: {
        clan_id: clan_id,
        channel_id: channel_id,
        mode: mode,
        is_public: is_public,
        content: content,
        mentions: mentions,
        attachments: attachments,
        references: references,
        anonymous_message: anonymous_message,
        mention_everyone: mention_everyone,
        avatar: avatar,
        code: code,
        topic_id: topic_id,
      },
    } as any;
    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {} as tsproto.ChannelMessageAck;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  async writeMessageReaction(
    id: string,
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    message_id: string,
    emoji_id: string,
    emoji: string,
    count: number,
    message_sender_id: string,
    action_delete: boolean,
    topic_id?: string,
    emoji_recent_id?: string,
    sender_name?: string,
  ): Promise<ApiMessageReaction> {
    const urlPath = "";
    const fetchOptions = {
      message_reaction_event: {
        id: id,
        clan_id: clan_id,
        channel_id: channel_id,
        mode: mode,
        is_public: is_public,
        message_id: message_id,
        emoji_id: emoji_id,
        emoji: emoji,
        count: count,
        message_sender_id: message_sender_id,
        action: action_delete,
        topic_id: topic_id,
        emoji_recent_id: emoji_recent_id,
        sender_name: sender_name,
      },
    } as any;
    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {} as ApiMessageReaction;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  async writeMessageTyping(
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    sender_display_name: string,
    topic_id?: string,
  ): Promise<MessageTypingEvent> {
    const urlPath = "";
    const fetchOptions = {
      message_typing_event: {
        clan_id: clan_id,
        channel_id: channel_id,
        mode: mode,
        is_public: is_public,
        sender_display_name: sender_display_name,
        topic_id: topic_id,
      },
    } as any;
    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {} as MessageTypingEvent;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  async writeLastSeenMessage(
    clan_id: string,
    channel_id: string,
    mode: number,
    message_id: string,
    timestamp_seconds: number,
    badge_count: number,
  ): Promise<LastSeenMessageEvent> {
    const urlPath = "";
    const fetchOptions = {
      last_seen_message_event: {
        clan_id: clan_id,
        channel_id: channel_id,
        mode: mode,
        message_id: message_id,
        timestamp_seconds: timestamp_seconds,
        badge_count: badge_count,
      },
    } as any;
    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {} as LastSeenMessageEvent;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  async writeLastPinMessage(
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    message_id: string,
    timestamp_seconds: number,
    operation: number,
    message_sender_avatar: string,
    message_sender_id: string,
    message_sender_username: string,
    message_content: string,
    message_attachment: string,
    message_created_time: string,
  ): Promise<LastPinMessageEvent> {
    const urlPath = "";
    const fetchOptions = {
      last_pin_message_event: {
        clan_id: clan_id,
        channel_id: channel_id,
        mode: mode,
        is_public: is_public,
        message_id: message_id,
        timestamp_seconds: timestamp_seconds,
        operation: operation,
        message_sender_avatar: message_sender_avatar,
        message_sender_id: message_sender_id,
        message_sender_username: message_sender_username,
        message_content: message_content,
        message_attachment: message_attachment,
        message_created_time: message_created_time,
      },
    } as any;
    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {} as LastPinMessageEvent;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  async writeCustomStatus(
    clan_id: string,
    status: string,
    time_reset: number,
    no_clear: boolean,
  ): Promise<CustomStatusEvent> {
    const urlPath = "";
    const fetchOptions = {
      custom_status_event: {
        clan_id: clan_id,
        status: status,
        time_reset: time_reset,
        no_clear: no_clear,
      },
    } as any;
    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {} as CustomStatusEvent;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  async writeVoiceReaction(
    emojis: Array<string>,
    channel_id: string,
  ): Promise<VoiceReactionSend> {
    const urlPath = "";
    const fetchOptions = {
      voice_reaction_send: {
        emojis: emojis,
        channel_id: channel_id,
      },
    } as any;
    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {} as VoiceReactionSend;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  async forwardWebrtcSignaling(
    receiver_id: string,
    data_type: number,
    json_data: string,
    channel_id: string,
    caller_id: string,
  ): Promise<WebrtcSignalingFwd> {
    const urlPath = "";
    const fetchOptions = {
      webrtc_signaling_fwd: {
        receiver_id: receiver_id,
        data_type: data_type,
        json_data: json_data,
        channel_id: channel_id,
        caller_id: caller_id,
      },
    } as any;
    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {} as WebrtcSignalingFwd;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  async makeCallPush(
    receiver_id: string,
    json_data: string,
    channel_id: string,
    caller_id: string,
  ): Promise<IncomingCallPush> {
    const urlPath = "";
    const fetchOptions = {
      incoming_call_push: {
        receiver_id: receiver_id,
        json_data: json_data,
        channel_id: channel_id,
        caller_id: caller_id,
      },
    } as any;
    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {} as IncomingCallPush;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  async writeChannelAppEvent(
    clan_id: string,
    channel_id: string,
    action: number,
  ): Promise<ChannelAppEvent> {
    const urlPath = "";
    const fetchOptions = {
      channel_app_event: {
        clan_id: clan_id,
        channel_id: channel_id,
        action: action,
      },
    } as any;
    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {} as ChannelAppEvent;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }

  async listDataSocket(request: ListDataSocket): Promise<any> {
    const urlPath = "";
    const fetchOptions = {
      list_data_socket: request,
    } as any;
    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => {
        return {} as any;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs,
        ),
      ),
    ]);
  }
}
