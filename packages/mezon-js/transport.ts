import {
  buildFetchOptions,
} from "./utils";
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

  private readonly cIds: { [key: string]: PromiseExecutor };
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

  generatecid(): string {
    const cid = this.nextCid.toString();
    ++this.nextCid;
    return cid;
  }

  setTransportAdapter(transportAdapter: TransportAdapter) {
    this.adapter = transportAdapter;
  }

  connect(
    session: Session,
    createStatus = false,
    onMessage: tsproto.SocketMessageHandler,
    onDisconnected: tsproto.SocketCloseHandler,
    signal?: AbortSignal,
  ): void {
    const [host, port] = session.ws_url.split(':');
    this.adapter.connect(
      host,
      port,
      createStatus,
      session.token,
      signal
    );

    this.adapter.onClose = onDisconnected;
    this.adapter.onMessage = async (message: any) => {
      if (message.cid) {
        console.log("cid", message);
        const executor = this.cIds[message.cid];
        if (!executor) {
          console.error("No promise executor for message: %o", message);
          return;
        }
        delete this.cIds[message.cid];
        if (message.error) {
          executor.reject(message.error);
        } else {
          executor.resolve(message);
        }
      } else {
        await onMessage(message);
      }      
    };
  }

  send(
    data: any,
    sendTimeout = MezonTransport.DefaultSendTimeoutMs
  ): Promise<any> {
    const { fullUrl, fetchOptions } = data;

    let untypedMessage = fetchOptions as any;
    if (fullUrl !== "") {
      untypedMessage = {api_request_event: { full_url: fullUrl, body: fetchOptions.body }};
    }

    return new Promise<void>((resolve, reject) => {
      if (!this.adapter.isOpen()) {
        reject("Socket connection has not been established yet.");
      } else {
        if (untypedMessage.channel_message_send) {
          untypedMessage.channel_message_send.content = JSON.stringify(
            untypedMessage.channel_message_send.content
          );
        } else if (untypedMessage.channel_message_update) {
          untypedMessage.channel_message_update.content = JSON.stringify(
            untypedMessage.channel_message_update.content
          );
        } else if (untypedMessage.ephemeral_message_send) {
          untypedMessage.ephemeral_message_send.message.content = JSON.stringify(
            untypedMessage.ephemeral_message_send.message?.content
          ); 
        } else if (untypedMessage.quick_menu_event) {
          untypedMessage.quick_menu_event.message.content = JSON.stringify(
            untypedMessage.quick_menu_event.message?.content
          ); 
        }

        const cid = this.generatecid();
        this.cIds[cid] = { resolve, reject };
        if (sendTimeout !== Infinity && sendTimeout > 0) {
          setTimeout(() => {
            reject("The socket timed out while waiting for a response.");
          }, sendTimeout);
        }

        untypedMessage.cid = cid;
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
    const queryParams = new Map<string, any>();

    const bodyJson = "";

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, bodyJson);
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out."),
      ),
    ]);
  }

  /** Fetch the current user's account. */
  getAccount(bearerToken: string, options = {}): Promise<ApiAccount> {
    const urlPath = "/mezon.api.Mezon/GetAccount";
    const queryParams = new Map<string, any>();

    const bodyJson = "";

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, bodyJson);
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiAccount;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.Account.decode(new Uint8Array(buffer)) as ApiAccount;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.UpdateAccountRequest.encode(
      tsproto.UpdateAccountRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
        if (response.status == 204) {
          return {} as ApiSession;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.Session.decode(new Uint8Array(buffer)) as ApiSession;
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
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
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
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.LoginIDResponse.decode(
            new Uint8Array(buffer),
          ) as ApiLoginIDResponse;
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
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.LinkAccountConfirmRequest.decode(
            new Uint8Array(buffer),
          ) as ApiLinkAccountConfirmRequest;
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
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.LinkAccountConfirmRequest.decode(
            new Uint8Array(buffer),
          ) as ApiLinkAccountConfirmRequest;
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
        if (response.status == 204) {
          return {} as ApiSession;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.Session.decode(new Uint8Array(buffer)) as ApiSession;
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
        if (response.status == 204) {
          return {} as ApiSession;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.Session.decode(new Uint8Array(buffer)) as ApiSession;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.AccountEmail.encode(
      tsproto.AccountEmail.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.LinkAccountConfirmRequest.decode(
            new Uint8Array(buffer),
          ) as ApiLinkAccountConfirmRequest;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.AccountMezon.encode(
      tsproto.AccountMezon.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.LinkAccountConfirmRequest.decode(
            new Uint8Array(buffer),
          ) as ApiLinkAccountConfirmRequest;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.LinkAccountConfirmRequest.encode(
      tsproto.LinkAccountConfirmRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }
    fetchOptions.headers["Accept"] = "application/x-protobuf";

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiSession;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.Session.decode(new Uint8Array(buffer)) as ApiSession;
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
        if (response.status == 204) {
          return {} as ApiSession;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.Session.decode(new Uint8Array(buffer)) as ApiSession;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.RegistrationEmailRequest.encode(
      tsproto.RegistrationEmailRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiSession;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.Session.decode(new Uint8Array(buffer)) as ApiSession;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.SessionRefreshRequest.encode(
      tsproto.SessionRefreshRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (basicAuthUsername) {
      fetchOptions.headers["Authorization"] =
        "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiSession;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.Session.decode(new Uint8Array(buffer)) as ApiSession;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.AccountEmail.encode(
      tsproto.AccountEmail.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiListUserActivity;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.ListUserActivity.decode(
            new Uint8Array(buffer),
          ) as ApiListUserActivity;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.CreateActivityRequest.encode(
      tsproto.CreateActivityRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiUserActivity;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.UserActivity.decode(
            new Uint8Array(buffer),
          ) as ApiUserActivity;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.AddAppRequest.encode(
      tsproto.AddAppRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiApp;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.App.decode(new Uint8Array(buffer)) as ApiApp;
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

  /** List (and optionally filter) accounts. */
  listApps(
    bearerToken: string,
    filter?: string,
    tombstones?: boolean,
    cursor?: string,
    options = {},
  ): Promise<ApiAppList> {
    const urlPath = "/mezon.api.Mezon/ListApps";
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.ListAppsRequest.encode(
      tsproto.ListAppsRequest.fromPartial({
        filter: filter,
        tombstones: tombstones,
        cursor: cursor,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiAppList;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.AppList.decode(new Uint8Array(buffer)) as ApiAppList;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.AppClan.encode(
      tsproto.AppClan.fromPartial({
        app_id: appId,
        clan_id: clanId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {};
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.App.encode(
      tsproto.App.fromPartial({
        id: id,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {};
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.App.encode(
      tsproto.App.fromPartial({
        id: id,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiApp;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.App.decode(new Uint8Array(buffer)) as ApiApp;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.UpdateAppRequest.encode(
      tsproto.UpdateAppRequest.fromPartial({ ...body, id: id }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiApp;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.App.decode(new Uint8Array(buffer)) as ApiApp;
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
  listAuditLog(
    bearerToken: string,
    actionLog?: string,
    userId?: string,
    clanId?: string,
    dateLog?: string,
    options = {},
  ): Promise<MezonapiListAuditLog> {
    const urlPath = "/mezon.api.Mezon/ListAuditLog";
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.ListAuditLogRequest.encode(
      tsproto.ListAuditLogRequest.fromPartial({
        clan_id: clanId,
        user_id: userId,
        action_log: actionLog,
        date_log: dateLog,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as MezonapiListAuditLog;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.ListAuditLog.decode(
            new Uint8Array(buffer),
          ) as unknown as MezonapiListAuditLog;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.UpdateCategoryOrderRequest.encode(
      tsproto.UpdateCategoryOrderRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {};
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

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

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiCategoryDescList;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.CategoryDescList.decode(
            new Uint8Array(buffer),
          ) as ApiCategoryDescList;
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

  /** List channel apps. */
  listChannelApps(
    bearerToken: string,
    clanId?: string,
    options = {},
  ): Promise<ApiListChannelAppsResponse> {
    const urlPath = "/mezon.api.Mezon/ListChannelApps";
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.ListChannelAppsRequest.encode(
      tsproto.ListChannelAppsRequest.fromPartial({
        clan_id: clanId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiListChannelAppsResponse;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.ListChannelAppsResponse.decode(
            new Uint8Array(buffer),
          ) as ApiListChannelAppsResponse;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.ChannelCanvasListRequest.encode(
      tsproto.ChannelCanvasListRequest.fromPartial({
        channel_id: channelId,
        clan_id: clanId,
        limit: limit,
        page: page,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiChannelCanvasListResponse;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.ChannelCanvasListResponse.decode(
            new Uint8Array(buffer),
          ) as ApiChannelCanvasListResponse;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.AddFavoriteChannelRequest.encode(
      tsproto.AddFavoriteChannelRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {};
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.AddFavoriteChannelResponse.decode(
            new Uint8Array(buffer),
          );
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.RemoveFavoriteChannelRequest.encode(
      tsproto.RemoveFavoriteChannelRequest.fromPartial({
        channel_id: channelId,
        clan_id: clanId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {};
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.ListFavoriteChannelRequest.encode(
      tsproto.ListFavoriteChannelRequest.fromPartial({
        clan_id: clanId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiListFavoriteChannelResponse;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.ListFavoriteChannelResponse.decode(
            new Uint8Array(buffer),
          ) as ApiListFavoriteChannelResponse;
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
    const queryParams = new Map<string, any>();

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

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiChannelMessageList;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.ChannelMessageList.decode(
            new Uint8Array(buffer),
          ) as unknown as ApiChannelMessageList;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.AddChannelUsersRequest.encode(
      tsproto.AddChannelUsersRequest.fromPartial({
        channel_id: channelId,
        user_ids: userIds,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {};
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

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

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiChannelAttachmentList;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.ChannelAttachmentList.decode(
            new Uint8Array(buffer),
          ) as ApiChannelAttachmentList;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.ChanEncryptionMethod.encode(
      tsproto.ChanEncryptionMethod.fromPartial({
        channel_id: channelId,
        method: method,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiChanEncryptionMethod;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.ChanEncryptionMethod.decode(
            new Uint8Array(buffer),
          ) as ApiChanEncryptionMethod;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.ChanEncryptionMethod.encode(
      tsproto.ChanEncryptionMethod.fromPartial({
        ...body,
        channel_id: channelId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {};
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.LeaveThreadRequest.encode(
      tsproto.LeaveThreadRequest.fromPartial({
        channel_id: channelId,
        clan_id: clanId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {};
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    options = {}
  ): Promise<any> {
    if (clanId === null || clanId === undefined) {
      throw new Error("'clanId' is a required parameter but is null or undefined.");
    }
    if (channelId === null || channelId === undefined) {
      throw new Error("'channelId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/mezon.api.Mezon/ArchiveChannel";
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.ArchiveChannelRequest.encode(
      tsproto.ArchiveChannelRequest.fromPartial({
        clan_id: clanId,
        channel_id: channelId,
      })
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {};
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    options = {}
  ): Promise<ApiChannelDescList> {
    if (clanId === null || clanId === undefined) {
      throw new Error("'clanId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/mezon.api.Mezon/ListArchivedChannelDescs";
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.ListArchivedChannelDescsRequest.encode(
      tsproto.ListArchivedChannelDescsRequest.fromPartial({
        clan_id: clanId,
      })
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, '');
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({fullUrl, fetchOptions}).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiChannelDescList;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.ListArchivedChannelDescsResponse.decode(new Uint8Array(buffer)) as ApiChannelDescList;
        } else {
          throw response;
        }
      }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out.")), this.timeoutMs)
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.RemoveChannelUsersRequest.encode(
      tsproto.RemoveChannelUsersRequest.fromPartial({
        channel_id: channelId,
        user_ids: userIds,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {};
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

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

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiChannelUserList;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.ChannelUserList.decode(
            new Uint8Array(buffer),
          ) as ApiChannelUserList;
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
    const queryParams = new Map<string, any>();

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

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiChannelDescList;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.ChannelDescList.decode(
            new Uint8Array(buffer),
          ) as ApiChannelDescList;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.CreateChannelDescRequest.encode(
      tsproto.CreateChannelDescRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiChannelDescription;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.ChannelDescription.decode(
            new Uint8Array(buffer),
          ) as ApiChannelDescription;
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

  /** list user add channel by channel ids */
  listChannelUsersUC(
    bearerToken: string,
    channelId?: string,
    limit?: number,
    options = {},
  ): Promise<ApiAllUsersAddChannelResponse> {
    const urlPath = "/mezon.api.Mezon/ListChannelUsersUC";
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.AllUsersAddChannelRequest.encode(
      tsproto.AllUsersAddChannelRequest.fromPartial({
        channel_id: channelId,
        limit: limit,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiAllUsersAddChannelResponse;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.AllUsersAddChannelResponse.decode(
            new Uint8Array(buffer),
          ) as ApiAllUsersAddChannelResponse;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.DeleteChannelDescRequest.encode(
      tsproto.DeleteChannelDescRequest.fromPartial({
        clan_id: clanId,
        channel_id: channelId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.UpdateChannelDescRequest.encode(
      tsproto.UpdateChannelDescRequest.fromPartial({
        ...body,
        channel_id: channelId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

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

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiChannelSettingListResponse;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.ChannelSettingListResponse.decode(
            new Uint8Array(buffer),
          ) as ApiChannelSettingListResponse;
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

  /** List all users that are part of a channel. */
  listChannelVoiceUsers(
    bearerToken: string,
    clanId?: string,
    limit?: number,
    options = {},
  ): Promise<ApiVoiceChannelUserList> {
    const urlPath = "/mezon.api.Mezon/ListChannelVoiceUsers";
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.ListChannelUsersRequest.encode(
      tsproto.ListChannelUsersRequest.fromPartial({
        clan_id: clanId,
        limit: limit,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiVoiceChannelUserList;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.VoiceChannelUserList.decode(
            new Uint8Array(buffer),
          ) as ApiVoiceChannelUserList;
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

  /** List clans */
  listClanDescs(
    bearerToken: string,
    limit?: number,
    state?: number,
    cursor?: string,
    options = {},
  ): Promise<ApiClanDescList> {
    const urlPath = "/mezon.api.Mezon/ListClanDescs";
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.ListClanDescRequest.encode(
      tsproto.ListClanDescRequest.fromPartial({ limit, state, cursor }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiClanDescList;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.ClanDescList.decode(
            new Uint8Array(buffer),
          ) as ApiClanDescList;
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

  /** Paged list of channel unread/badge metadata (HTTP counterpart to socket ListChannelBadgeCount). */
  listChannelBadgeCount(
    bearerToken: string,
    clanId: string,
    limit?: number,
    page?: number,
    options = {},
  ): Promise<ApiListChannelBadgeCountResponse> {
    const urlPath = "/mezon.api.Mezon/ListChannelBadgeCount";
    const queryParams = new Map<string, any>();
    const bodyWriter = tsproto.ListChannelBadgeCountRequest.encode(
      tsproto.ListChannelBadgeCountRequest.fromPartial({
        clan_id: clanId,
        limit: limit ?? 0,
        page: page ?? 0,
      }),
    );
    const encodedBody = bodyWriter.finish();
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }
    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiListChannelBadgeCountResponse;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.ListChannelBadgeCountResponse.decode(
            new Uint8Array(buffer),
          ) as ApiListChannelBadgeCountResponse;
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

  /** Paged list of online users in a clan (HTTP counterpart to socket ListUserOnline). */
  listUserOnline(
    bearerToken: string,
    clanId: string,
    limit?: number,
    page?: number,
    options = {},
  ): Promise<ApiListUserOnlineResponse> {
    const urlPath = "/mezon.api.Mezon/ListUserOnline";
    const queryParams = new Map<string, any>();
    const bodyWriter = tsproto.ListUserOnlineRequest.encode(
      tsproto.ListUserOnlineRequest.fromPartial({
        clan_id: clanId,
        limit: limit ?? 0,
        page: page ?? 0,
      }),
    );
    const encodedBody = bodyWriter.finish();
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }
    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiListUserOnlineResponse;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.ListUserOnlineResponse.decode(
            new Uint8Array(buffer),
          ) as ApiListUserOnlineResponse;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.CreateClanDescRequest.encode(
      tsproto.CreateClanDescRequest.fromPartial({
        clan_name: body.clan_name,
        logo: body.logo,
        banner: body.banner,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiClanDesc;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.ClanDesc.decode(new Uint8Array(buffer)) as ApiClanDesc;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.DeleteClanDescRequest.encode(
      tsproto.DeleteClanDescRequest.fromPartial({ clan_desc_id: clanDescId }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.UpdateClanDescRequest.encode(
      tsproto.UpdateClanDescRequest.fromPartial({ clan_id: clanId, ...body }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.RemoveClanUsersRequest.encode(
      tsproto.RemoveClanUsersRequest.fromPartial({
        clan_id: clanId,
        user_ids: userIds,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {};
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return buffer.byteLength > 0 ? {} : {};
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

  /** List banned user */
  listBannedUsers(
    bearerToken: string,
    clanId?: string,
    channelId?: string,
    options = {},
  ): Promise<ApiBannedUserList> {
    const urlPath = "/mezon.api.Mezon/ListBannedUsers";
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.BannedUserListRequest.encode(
      tsproto.BannedUserListRequest.fromPartial({
        clan_id: clanId,
        channel_id: channelId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiBannedUserList;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.BannedUserList.decode(
            new Uint8Array(buffer),
          ) as ApiBannedUserList;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.BanClanUsersRequest.encode(
      tsproto.BanClanUsersRequest.fromPartial({
        clan_id: clanId,
        channel_id: channelId,
        user_ids: userIds,
        ban_time: banTime,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {};
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return buffer.byteLength > 0 ? {} : {};
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.BanClanUsersRequest.encode(
      tsproto.BanClanUsersRequest.fromPartial({
        clan_id: clanId,
        channel_id: channelId,
        user_ids: userIds,
        ban_time: banTime,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {};
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return buffer.byteLength > 0 ? {} : {};
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.ListClanUsersRequest.encode(
      tsproto.ListClanUsersRequest.fromPartial({ clan_id: clanId }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiClanUserList;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.ClanUserList.decode(
            new Uint8Array(buffer),
          ) as ApiClanUserList;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.ListClanUsersStatusRequest.encode(
      tsproto.ListClanUsersStatusRequest.fromPartial({ clan_id: clanId }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiClanUserStatusList;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          const u8 = new Uint8Array(buffer);
          return tsproto.ClanUserStatusList.decode(
            u8,
            u8.length,
          ) as ApiClanUserStatusList;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.CreateCategoryDescRequest.encode(
      tsproto.CreateCategoryDescRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiCategoryDesc;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.CategoryDesc.decode(
            new Uint8Array(buffer),
          ) as ApiCategoryDesc;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.CheckDuplicateNameRequest.encode(
      tsproto.CheckDuplicateNameRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.CheckDuplicateNameResponse.decode(
            new Uint8Array(buffer),
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.DeleteCategoryDescRequest.encode(
      tsproto.DeleteCategoryDescRequest.fromPartial({
        category_id: categoryId,
        clan_id: clanId,
        category_label: categoryLabel,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {};
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return buffer.byteLength > 0 ? {} : {};
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.RegistFcmDeviceTokenRequest.encode(
      tsproto.RegistFcmDeviceTokenRequest.fromPartial({
        token,
        device_id: deviceId,
        platform,
        voip_token: voipToken,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiRegistFcmDeviceTokenResponse;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.RegistFcmDeviceTokenResponse.decode(
            new Uint8Array(buffer),
          ) as ApiRegistFcmDeviceTokenResponse;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.DeleteChannelDescRequest.encode(
      tsproto.DeleteChannelDescRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {};
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return buffer.byteLength > 0 ? {} : {};
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.DeleteChannelDescRequest.encode(
      tsproto.DeleteChannelDescRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {};
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return buffer.byteLength > 0 ? {} : {};
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.ClanEmojiCreateRequest.encode(
      tsproto.ClanEmojiCreateRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {};
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return buffer.byteLength > 0 ? {} : {};
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.ClanEmojiDeleteRequest.encode(
      tsproto.ClanEmojiDeleteRequest.fromPartial({
        id,
        clan_id: clanId,
        emoji_label: emojiLabel,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {};
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return buffer.byteLength > 0 ? {} : {};
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.ClanEmojiUpdateRequest.encode(
      tsproto.ClanEmojiUpdateRequest.fromPartial({
        id: body.id,
        shortname: body.shortname,
        clan_id: body.clan_id,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {};
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return buffer.byteLength > 0 ? {} : {};
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

  /** get list emoji recent by user id */
  emojiRecentList(
    bearerToken: string,
    options = {},
  ): Promise<ApiEmojiRecentList> {
    const urlPath = "/mezon.api.Mezon/EmojiRecentList";
    const queryParams = new Map<string, any>();

    const bodyJson = "";

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, bodyJson);
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiEmojiRecentList;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.EmojiRecentList.decode(
            new Uint8Array(buffer),
          ) as ApiEmojiRecentList;
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

  /** get list emoji by user id */
  getListEmojisByUserId(
    bearerToken: string,
    options = {},
  ): Promise<ApiEmojiListedResponse> {
    const urlPath = "/mezon.api.Mezon/GetListEmojisByUserId";
    const queryParams = new Map<string, any>();

    const bodyJson = "";

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, bodyJson);
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiEmojiListedResponse;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.EmojiListedResponse.decode(
            new Uint8Array(buffer),
          ) as ApiEmojiListedResponse;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.SearchMessageRequest.encode(
      tsproto.SearchMessageRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiSearchMessageResponse;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.SearchMessageResponse.decode(
            new Uint8Array(buffer),
          ) as ApiSearchMessageResponse;
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

  /** Submit an event for processing in the server's registered runtime custom events handler. */
  event(bearerToken: string, body: ApiEvent, options = {}): Promise<any> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined.",
      );
    }
    const urlPath = "/mezon.api.Mezon/CreateEvent";
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.Event.encode(
      tsproto.Event.fromPartial({
        external: body.external,
        name: body.name,
        properties: body.properties,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.ListEventsRequest.encode(
      tsproto.ListEventsRequest.fromPartial({ clan_id: clanId }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiEventList;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.EventList.decode(
            new Uint8Array(buffer),
          ) as ApiEventList;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.CreateEventRequest.encode(
      tsproto.CreateEventRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiEventManagement;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.EventManagement.decode(
            new Uint8Array(buffer),
          ) as ApiEventManagement;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.DeleteEventRequest.encode(
      tsproto.DeleteEventRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as any;
        } else if (response.status >= 200 && response.status < 300) {
          return {} as any;
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
    const queryParams = new Map<string, any>();

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

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as any;
        } else if (response.status >= 200 && response.status < 300) {
          return {} as any;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.UpdateEventRequest.encode(
      tsproto.UpdateEventRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as any;
        } else if (response.status >= 200 && response.status < 300) {
          return {} as any;
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

  /** Delete one or more users by ID or username. */
  deleteFriends(
    bearerToken: string,
    ids?: Array<string>,
    usernames?: Array<string>,
    options = {},
  ): Promise<any> {
    const urlPath = "/mezon.api.Mezon/DeleteFriends";
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.DeleteFriendsRequest.encode(
      tsproto.DeleteFriendsRequest.fromPartial({ ids, usernames }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.ListFriendsRequest.encode(
      tsproto.ListFriendsRequest.fromPartial({ limit, state, cursor }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiFriendList;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.FriendList.decode(
            new Uint8Array(buffer),
          ) as ApiFriendList;
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

  /** Add friends by ID or username to a user's account. */
  addFriends(
    bearerToken: string,
    ids?: Array<string>,
    usernames?: Array<string>,
    options = {},
  ): Promise<ApiAddFriendsResponse> {
    const urlPath = "/mezon.api.Mezon/AddFriends";
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.AddFriendsRequest.encode(
      tsproto.AddFriendsRequest.fromPartial({ ids, usernames }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiAddFriendsResponse;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.AddFriendsResponse.decode(
            new Uint8Array(buffer),
          ) as ApiAddFriendsResponse;
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

  /** Block one or more users by ID or username. */
  blockFriends(
    bearerToken: string,
    ids?: Array<string>,
    usernames?: Array<string>,
    options = {},
  ): Promise<any> {
    const urlPath = "/mezon.api.Mezon/BlockFriends";
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.BlockFriendsRequest.encode(
      tsproto.BlockFriendsRequest.fromPartial({ ids, usernames }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.BlockFriendsRequest.encode(
      tsproto.BlockFriendsRequest.fromPartial({ ids, usernames }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.NotificationClan.encode(
      tsproto.NotificationClan.fromPartial({ clan_id: clanId }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiNotificationChannelCategorySettingList;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.NotificationChannelCategorySettingList.decode(
            new Uint8Array(buffer),
          ) as ApiNotificationChannelCategorySettingList;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.ClanProfileRequest.encode(
      tsproto.ClanProfileRequest.fromPartial({ clan_id: clanId }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiClanProfile;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.ClanProfile.decode(
            new Uint8Array(buffer),
          ) as ApiClanProfile;
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

  /** List GetNotificationChannel */
  getNotificationCategory(
    bearerToken: string,
    categoryId?: string,
    options = {},
  ): Promise<ApiNotificationUserChannel> {
    const urlPath = "/mezon.api.Mezon/GetNotificationCategory";
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.DefaultNotificationCategory.encode(
      tsproto.DefaultNotificationCategory.fromPartial({
        category_id: categoryId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiNotificationUserChannel;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.NotificationUserChannel.decode(
            new Uint8Array(buffer),
          ) as ApiNotificationUserChannel;
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

  /** List GetNotificationChannel */
  getNotificationChannel(
    bearerToken: string,
    channelId?: string,
    options = {},
  ): Promise<ApiNotificationUserChannel> {
    const urlPath = "/mezon.api.Mezon/GetNotificationChannel";
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.NotificationChannel.encode(
      tsproto.NotificationChannel.fromPartial({ channel_id: channelId }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiNotificationUserChannel;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.NotificationUserChannel.decode(
            new Uint8Array(buffer),
          ) as ApiNotificationUserChannel;
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

  /** List GetNotificationClan */
  getNotificationClan(
    bearerToken: string,
    clanId?: string,
    options = {},
  ): Promise<ApiNotificationSetting> {
    const urlPath = "/mezon.api.Mezon/GetNotificationClan";
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.NotificationClan.encode(
      tsproto.NotificationClan.fromPartial({ clan_id: clanId }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiNotificationSetting;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.NotificationSetting.decode(
            new Uint8Array(buffer),
          ) as ApiNotificationSetting;
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

  /** List GetNotificationReactMessage */
  getNotificationReactMessage(
    bearerToken: string,
    channelId?: string,
    options = {},
  ): Promise<ApiNotifiReactMessage> {
    const urlPath = "/mezon.api.Mezon/GetNotificationReactMessage";
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.NotifiReactMessage.encode(
      tsproto.NotifiReactMessage.fromPartial({ channel_id: channelId }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiNotifiReactMessage;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.NotifiReactMessage.decode(
            new Uint8Array(buffer),
          ) as ApiNotifiReactMessage;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.GiveCoffeeEvent.encode(
      tsproto.GiveCoffeeEvent.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as any;
        } else if (response.status >= 200 && response.status < 300) {
          return {} as any;
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

  /** get key server */
  getKeyServer(
    bearerToken: string,
    options = {},
  ): Promise<ApiGetKeyServerResp> {
    const urlPath = "/mezon.api.Mezon/GetKeyServer";
    const queryParams = new Map<string, any>();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiGetKeyServerResp;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.GetKeyServerResp.decode(
            new Uint8Array(buffer),
          ) as ApiGetKeyServerResp;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.LinkInviteUserRequest.encode(
      tsproto.LinkInviteUserRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiLinkInviteUser;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.LinkInviteUser.decode(
            new Uint8Array(buffer),
          ) as ApiLinkInviteUser;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.InviteUserRequest.encode(
      tsproto.InviteUserRequest.fromPartial({ invite_id: inviteId }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiInviteUserRes;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.InviteUserRes.decode(
            new Uint8Array(buffer),
          ) as ApiInviteUserRes;
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
        if (response.status == 204) {
          return {} as ApiInviteUserRes;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.InviteUserRes.decode(
            new Uint8Array(buffer),
          ) as ApiInviteUserRes;
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

  /** List HashtagDMList */
  listChannelByUserId(
    bearerToken: string,
    options = {},
  ): Promise<ApiChannelDescList> {
    const urlPath = "/mezon.api.Mezon/ListChannelByUserId";
    const queryParams = new Map<string, any>();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiChannelDescList;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.ChannelDescList.decode(
            new Uint8Array(buffer),
          ) as ApiChannelDescList;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.MarkAsReadRequest.encode(
      tsproto.MarkAsReadRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as any;
        } else if (response.status >= 200 && response.status < 300) {
          return {} as any;
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

  /** List mezon OAuth client */
  listMezonOauthClient(
    bearerToken: string,
    options = {},
  ): Promise<ApiMezonOauthClientList> {
    const urlPath = "/mezon.api.Mezon/ListMezonOauthClient";
    const queryParams = new Map<string, any>();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiMezonOauthClientList;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.MezonOauthClientList.decode(
            new Uint8Array(buffer),
          ) as ApiMezonOauthClientList;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.SetMuteRequest.encode(
      tsproto.SetMuteRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as any;
        } else if (response.status >= 200 && response.status < 300) {
          return {} as any;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.SetMuteRequest.encode(
      tsproto.SetMuteRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as any;
        } else if (response.status >= 200 && response.status < 300) {
          return {} as any;
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

  /** Delete one or more notifications for the current user. */
  deleteNotifications(
    bearerToken: string,
    ids?: Array<string>,
    category?: number,
    options = {},
  ): Promise<any> {
    const urlPath = "/mezon.api.Mezon/DeleteNotifications";
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.DeleteNotificationsRequest.encode(
      tsproto.DeleteNotificationsRequest.fromPartial({
        ids: ids || [],
        category: category,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

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

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiNotificationList;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.NotificationList.decode(
            new Uint8Array(buffer),
          ) as unknown as ApiNotificationList;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.SetNotificationRequest.encode(
      tsproto.SetNotificationRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.SetDefaultNotificationRequest.encode(
      tsproto.SetDefaultNotificationRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.SetNotificationRequest.encode(
      tsproto.SetNotificationRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.DefaultNotificationCategory.encode(
      tsproto.DefaultNotificationCategory.fromPartial({
        category_id: categoryId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.NotificationChannel.encode(
      tsproto.NotificationChannel.fromPartial({ channel_id: channelId }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.NotificationChannel.encode(
      tsproto.NotificationChannel.fromPartial({ channel_id: channelId }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.NotificationChannel.encode(
      tsproto.NotificationChannel.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.UpdateRoleChannelRequest.encode(
      tsproto.UpdateRoleChannelRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiPermissionList;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.PermissionList.decode(
            new Uint8Array(buffer),
          ) as ApiPermissionList;
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

  /** GetPermissionByRoleIdChannelId */
  getPermissionByRoleIdChannelId(
    bearerToken: string,
    roleId?: string,
    channelId?: string,
    userId?: string,
    options = {},
  ): Promise<ApiPermissionRoleChannelListEventResponse> {
    const urlPath = "/mezon.api.Mezon/GetPermissionByRoleIdChannelId";
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.PermissionRoleChannelListEventRequest.encode(
      tsproto.PermissionRoleChannelListEventRequest.fromPartial({
        role_id: roleId,
        channel_id: channelId,
        user_id: userId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiPermissionRoleChannelListEventResponse;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.PermissionRoleChannelListEventResponse.decode(
            new Uint8Array(buffer),
          ) as ApiPermissionRoleChannelListEventResponse;
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
  deletePinMessage(
    bearerToken: string,
    id?: string,
    messageId?: string,
    channelId?: string,
    clanId?: string,
    options = {},
  ): Promise<any> {
    const urlPath = "/mezon.api.Mezon/DeletePinMessage";
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.DeletePinMessage.encode(
      tsproto.DeletePinMessage.fromPartial({
        id: id,
        message_id: messageId,
        channel_id: channelId,
        clan_id: clanId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.PinMessageRequest.encode(
      tsproto.PinMessageRequest.fromPartial({
        message_id: messageId,
        channel_id: channelId,
        clan_id: clanId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as tsproto.PinMessagesList;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.PinMessagesList.decode(
            new Uint8Array(buffer),
          ) as unknown as tsproto.PinMessagesList;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.Message2InboxRequest.encode(
      tsproto.Message2InboxRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiChannelMessageHeader;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.ChannelMessageHeader.decode(
            new Uint8Array(buffer),
          ) as ApiChannelMessageHeader;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.PinMessageRequest.encode(
      tsproto.PinMessageRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiChannelMessageHeader;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.ChannelMessageHeader.decode(
            new Uint8Array(buffer),
          ) as ApiChannelMessageHeader;
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

  /** get pubkey */
  getPubKeys(
    bearerToken: string,
    userIds?: Array<string>,
    options = {},
  ): Promise<ApiGetPubKeysResponse> {
    const urlPath = "/mezon.api.Mezon/GetPubKeys";
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.GetPubKeysRequest.encode(
      tsproto.GetPubKeysRequest.fromPartial({ user_ids: userIds || [] }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiGetPubKeysResponse;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.GetPubKeysResponse.decode(
            new Uint8Array(buffer),
          ) as ApiGetPubKeysResponse;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.PushPubKeyRequest.encode(
      tsproto.PushPubKeyRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.AddRoleChannelDescRequest.encode(
      tsproto.AddRoleChannelDescRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.ChangeChannelCategoryRequest.encode(
      tsproto.ChangeChannelCategoryRequest.fromPartial({
        ...body,
        new_category_id: newCategoryId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.DeleteRoleRequest.encode(
      tsproto.DeleteRoleRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.RoleListEventRequest.encode(
      tsproto.RoleListEventRequest.fromPartial({
        clan_id: clanId,
        limit: limit,
        state: state,
        cursor: cursor,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiRoleListEventResponse;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.RoleListEventResponse.decode(
            new Uint8Array(buffer),
          ) as ApiRoleListEventResponse;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.CreateRoleRequest.encode(
      tsproto.CreateRoleRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiRole;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.Role.decode(new Uint8Array(buffer)) as ApiRole;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.DeleteRoleRequest.encode(
      tsproto.DeleteRoleRequest.fromPartial({ ...body, role_id: roleId }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.DeleteRoleRequest.encode(
      tsproto.DeleteRoleRequest.fromPartial({
        role_id: roleId,
        channel_id: channelId,
        clan_id: clanId,
        role_label: roleLabel,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.UpdateRoleRequest.encode(
      tsproto.UpdateRoleRequest.fromPartial({ ...body, role_id: roleId }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.ListPermissionsRequest.encode(
      tsproto.ListPermissionsRequest.fromPartial({ role_id: roleId }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiPermissionList;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.PermissionList.decode(
            new Uint8Array(buffer),
          ) as ApiPermissionList;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.ListRoleUsersRequest.encode(
      tsproto.ListRoleUsersRequest.fromPartial({
        role_id: roleId,
        limit: limit,
        cursor: cursor,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiRoleUserList;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.RoleUserList.decode(
            new Uint8Array(buffer),
          ) as ApiRoleUserList;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.ListPermissionOfUsersRequest.encode(
      tsproto.ListPermissionOfUsersRequest.fromPartial({
        clan_id: clanId,
        channel_id: channelId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiRoleList;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.RoleList.decode(new Uint8Array(buffer)) as ApiRoleList;
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
  searchThread(
    bearerToken: string,
    clanId?: string,
    channelId?: string,
    label?: string,
    options = {},
  ): Promise<ApiChannelDescList> {
    const urlPath = "/mezon.api.Mezon/SearchThread";
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.SearchThreadRequest.encode(
      tsproto.SearchThreadRequest.fromPartial({
        clan_id: clanId,
        channel_id: channelId,
        label: label,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiChannelDescList;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.ChannelDescList.decode(
            new Uint8Array(buffer),
          ) as ApiChannelDescList;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.TokenSentEvent.encode(
      tsproto.TokenSentEvent.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {};
        } else if (response.status >= 200 && response.status < 300) {
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.SessionLogoutRequest.encode(
      tsproto.SessionLogoutRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.ClanStickerAddRequest.encode(
      tsproto.ClanStickerAddRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {};
        } else if (response.status >= 200 && response.status < 300) {
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.ClanStickerDeleteRequest.encode(
      tsproto.ClanStickerDeleteRequest.fromPartial({
        id: id,
        clan_id: clanId,
        sticker_label: stickerLabel,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {};
        } else if (response.status >= 200 && response.status < 300) {
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.ClanStickerUpdateByIdRequest.encode(
      tsproto.ClanStickerUpdateByIdRequest.fromPartial({ ...body, id: id }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {};
        } else if (response.status >= 200 && response.status < 300) {
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

  /** get list sticker by user id */
  getListStickersByUserId(
    bearerToken: string,
    options = {},
  ): Promise<ApiStickerListedResponse> {
    const urlPath = "/mezon.api.Mezon/GetListStickersByUserId";
    const queryParams = new Map<string, any>();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiStickerListedResponse;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.StickerListedResponse.decode(
            new Uint8Array(buffer),
          ) as ApiStickerListedResponse;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.RegisterStreamingChannelRequest.encode(
      tsproto.RegisterStreamingChannelRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiRegisterStreamingChannelResponse;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.RegisterStreamingChannelResponse.decode(
            new Uint8Array(buffer),
          ) as ApiRegisterStreamingChannelResponse;
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
    const queryParams = new Map<string, any>();

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

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiStreamingChannelUserList;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.StreamingChannelUserList.decode(
            new Uint8Array(buffer),
          ) as ApiStreamingChannelUserList;
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

  /** Get the list of system messages. */
  getSystemMessagesList(
    bearerToken: string,
    options = {},
  ): Promise<ApiSystemMessagesList> {
    const urlPath = "/mezon.api.Mezon/GetSystemMessagesList";
    const queryParams = new Map<string, any>();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiSystemMessagesList;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.SystemMessagesList.decode(
            new Uint8Array(buffer),
          ) as ApiSystemMessagesList;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.SystemMessageRequest.encode(
      tsproto.SystemMessageRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {};
        } else if (response.status >= 200 && response.status < 300) {
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

  /** List Sd Topic */
  listSdTopic(
    bearerToken: string,
    clanId?: string,
    limit?: number,
    options = {},
  ): Promise<ApiSdTopicList> {
    const urlPath = "/mezon.api.Mezon/ListSdTopic";
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.ListSdTopicRequest.encode(
      tsproto.ListSdTopicRequest.fromPartial({
        clan_id: clanId,
        limit: limit,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiSdTopicList;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.SdTopicList.decode(
            new Uint8Array(buffer),
          ) as ApiSdTopicList;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.SdTopicRequest.encode(
      tsproto.SdTopicRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiSdTopic;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.SdTopic.decode(new Uint8Array(buffer)) as ApiSdTopic;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.DeleteSystemMessage.encode(
      tsproto.DeleteSystemMessage.fromPartial({ clan_id: clanId }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {};
        } else if (response.status >= 200 && response.status < 300) {
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.GetSystemMessage.encode(
      tsproto.GetSystemMessage.fromPartial({ clan_id: clanId }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiSystemMessage;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.SystemMessage.decode(
            new Uint8Array(buffer),
          ) as ApiSystemMessage;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.SystemMessageRequest.encode(
      tsproto.SystemMessageRequest.fromPartial({ ...body, clan_id: clanId }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {};
        } else if (response.status >= 200 && response.status < 300) {
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
    const queryParams = new Map<string, any>();

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

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiChannelDescList;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.ChannelDescListNoPool.decode(
            new Uint8Array(buffer),
          ) as ApiChannelDescList;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.UpdateCategoryDescRequest.encode(
      tsproto.UpdateCategoryDescRequest.fromPartial({
        ...body,
        clan_id: clanId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {};
        } else if (response.status >= 200 && response.status < 300) {
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.ChangeChannelPrivateRequest.encode(
      tsproto.ChangeChannelPrivateRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {};
        } else if (response.status >= 200 && response.status < 300) {
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.UpdateClanProfileRequest.encode(
      tsproto.UpdateClanProfileRequest.fromPartial({
        ...body,
        clan_id: clanId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {};
        } else if (response.status >= 200 && response.status < 300) {
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.UploadAttachmentRequest.encode(
      tsproto.UploadAttachmentRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiUploadAttachment;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.UploadAttachment.decode(
            new Uint8Array(buffer),
          ) as ApiUploadAttachment;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.UploadAttachmentRequest.encode(
      tsproto.UploadAttachmentRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiUploadAttachment;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.UploadAttachment.decode(
            new Uint8Array(buffer),
          ) as ApiUploadAttachment;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.UploadAttachmentRequest.encode(
      tsproto.UploadAttachmentRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as MultipartUploadAttachment;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.MultipartUploadAttachment.decode(
            new Uint8Array(buffer),
          ) as MultipartUploadAttachment;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.MultipartUploadAttachmentFinishRequest.encode(
      tsproto.MultipartUploadAttachmentFinishRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.UpdateUsersRequest.encode(
      tsproto.UpdateUsersRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiAllUserClans;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.AllUserClans.decode(
            new Uint8Array(buffer),
          ) as ApiAllUserClans;
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

  /** ListUserPermissionInChannel */
  listUserPermissionInChannel(
    bearerToken: string,
    clanId?: string,
    channelId?: string,
    options = {},
  ): Promise<ApiUserPermissionInChannelListResponse> {
    const urlPath = "/mezon.api.Mezon/ListUserPermissionInChannel";
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.UserPermissionInChannelListRequest.encode(
      tsproto.UserPermissionInChannelListRequest.fromPartial({
        clan_id: clanId,
        channel_id: channelId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiUserPermissionInChannelListResponse;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.UserPermissionInChannelListResponse.decode(
            new Uint8Array(buffer),
          ) as ApiUserPermissionInChannelListResponse;
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

  /** Get user status */
  getUserStatus(bearerToken: string, options = {}): Promise<ApiUserStatus> {
    const urlPath = "/mezon.api.Mezon/GetUserStatus";
    const queryParams = new Map<string, any>();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiUserStatus;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.UserStatus.decode(
            new Uint8Array(buffer),
          ) as ApiUserStatus;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.UserStatusUpdate.encode(
      tsproto.UserStatusUpdate.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.UserStatusUpdate.encode(
      tsproto.UserStatusUpdate.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.WebhookCreateRequest.encode(
      tsproto.WebhookCreateRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {};
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.WebhookGenerateResponse.decode(new Uint8Array(buffer));
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.WebhookUpdateRequestById.encode(
      tsproto.WebhookUpdateRequestById.fromPartial({
        ...body,
        id: id,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.WebhookListRequest.encode(
      tsproto.WebhookListRequest.fromPartial({
        channel_id: channelId,
        clan_id: clanId || "",
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiWebhookListResponse;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.WebhookListResponse.decode(
            new Uint8Array(buffer),
          ) as ApiWebhookListResponse;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.WebhookDeleteRequestById.encode(
      tsproto.WebhookDeleteRequestById.fromPartial({
        ...body,
        id: id,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.EditChannelCanvasRequest.encode(
      tsproto.EditChannelCanvasRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiEditChannelCanvasResponse;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.EditChannelCanvasResponse.decode(
            new Uint8Array(buffer),
          ) as ApiEditChannelCanvasResponse;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.ChannelCanvasDetailRequest.encode(
      tsproto.ChannelCanvasDetailRequest.fromPartial({
        id: id,
        clan_id: clanId || "",
        channel_id: channelId || "",
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiChannelCanvasDetailResponse;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.ChannelCanvasDetailResponse.decode(
            new Uint8Array(buffer),
          ) as ApiChannelCanvasDetailResponse;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.DeleteChannelCanvasRequest.encode(
      tsproto.DeleteChannelCanvasRequest.fromPartial({
        canvas_id: canvasId,
        clan_id: clanId || "",
        channel_id: channelId || "",
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.ListOnboardingRequest.encode(
      tsproto.ListOnboardingRequest.fromPartial({
        clan_id: clanId,
        guide_type: guideType,
        limit: limit,
        page: page,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiListOnboardingResponse;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.ListOnboardingResponse.decode(
            new Uint8Array(buffer),
          ) as ApiListOnboardingResponse;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.CreateOnboardingRequest.encode(
      tsproto.CreateOnboardingRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiListOnboardingResponse;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.ListOnboardingResponse.decode(
            new Uint8Array(buffer),
          ) as ApiListOnboardingResponse;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.OnboardingRequest.encode(
      tsproto.OnboardingRequest.fromPartial({
        id: id,
        clan_id: clanId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.OnboardingRequest.encode(
      tsproto.OnboardingRequest.fromPartial({
        id: id,
        clan_id: clanId || "",
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiOnboardingItem;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.OnboardingItem.decode(
            new Uint8Array(buffer),
          ) as ApiOnboardingItem;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.UpdateOnboardingRequest.encode(
      tsproto.UpdateOnboardingRequest.fromPartial({
        ...body,
        id: id,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.GenerateClanWebhookRequest.encode(
      tsproto.GenerateClanWebhookRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiGenerateClanWebhookResponse;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.GenerateClanWebhookResponse.decode(
            new Uint8Array(buffer),
          ) as ApiGenerateClanWebhookResponse;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.ListClanWebhookRequest.encode(
      tsproto.ListClanWebhookRequest.fromPartial({
        clan_id: clanId,
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiListClanWebhookResponse;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.ListClanWebhookResponse.decode(
            new Uint8Array(buffer),
          ) as ApiListClanWebhookResponse;
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
    const queryParams = new Map<string, any>();

    const body = {
      id: id,
      clan_id: clanId,
    };

    const bodyWriter = tsproto.ClanWebhookRequest.encode(
      tsproto.ClanWebhookRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const bodyData = {
      ...body,
      id: id,
    };

    const bodyWriter = tsproto.UpdateClanWebhookRequest.encode(
      tsproto.UpdateClanWebhookRequest.fromPartial(bodyData),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const body = {
      topic_id: topicId,
    };

    const bodyWriter = tsproto.SdTopicDetailRequest.encode(
      tsproto.SdTopicDetailRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiSdTopic;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.SdTopic.decode(new Uint8Array(buffer)) as ApiSdTopic;
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

  /** List onboarding step. */
  listOnboardingStep(
    bearerToken: string,
    clanId?: string,
    limit?: number,
    page?: number,
    options = {},
  ): Promise<ApiListOnboardingStepResponse> {
    const urlPath = "/mezon.api.Mezon/ListOnboardingStep";
    const queryParams = new Map<string, any>();

    const body = {
      clan_id: clanId,
      limit: limit,
      page: page,
    };

    const bodyWriter = tsproto.ListOnboardingStepRequest.encode(
      tsproto.ListOnboardingStepRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiListOnboardingStepResponse;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.ListOnboardingStepResponse.decode(
            new Uint8Array(buffer),
          ) as ApiListOnboardingStepResponse;
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
    const queryParams = new Map<string, any>();

    const bodyData = {
      ...body,
      clan_id: clanId,
    };

    const bodyWriter = tsproto.UpdateOnboardingStepRequest.encode(
      tsproto.UpdateOnboardingStepRequest.fromPartial(bodyData),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.CreateRoomChannelApps.encode(
      tsproto.CreateRoomChannelApps.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as MezonapiCreateRoomChannelApps;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.CreateRoomChannelApps.decode(
            new Uint8Array(buffer),
          ) as unknown as MezonapiCreateRoomChannelApps;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.GenerateMeetTokenRequest.encode(
      tsproto.GenerateMeetTokenRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiGenerateMeetTokenResponse;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.GenerateMeetTokenResponse.decode(
            new Uint8Array(buffer),
          ) as ApiGenerateMeetTokenResponse;
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

  /** Create mezon OAuth client */
  getMezonOauthClient(
    bearerToken: string,
    clientId?: string,
    clientName?: string,
    options = {},
  ): Promise<ApiMezonOauthClient> {
    const urlPath = "/mezon.api.Mezon/GetMezonOauthClient";
    const queryParams = new Map<string, any>();

    const body = {
      client_id: clientId,
      client_name: clientName,
    };

    const bodyWriter = tsproto.GetMezonOauthClientRequest.encode(
      tsproto.GetMezonOauthClientRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiMezonOauthClient;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.MezonOauthClient.decode(
            new Uint8Array(buffer),
          ) as ApiMezonOauthClient;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.MezonOauthClient.encode(
      tsproto.MezonOauthClient.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiMezonOauthClient;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.MezonOauthClient.decode(
            new Uint8Array(buffer),
          ) as ApiMezonOauthClient;
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
  generateHashChannelApps(
    bearerToken: string,
    appId?: string,
    options = {},
  ): Promise<ApiCreateHashChannelAppsResponse> {
    const urlPath = "/mezon.api.Mezon/GenerateHashChannelApps";
    const queryParams = new Map<string, any>();

    const body = {
      app_id: appId,
    };

    const bodyWriter = tsproto.GenerateHashChannelAppsRequest.encode(
      tsproto.GenerateHashChannelAppsRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiCreateHashChannelAppsResponse;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.GenerateHashChannelAppsResponse.decode(
            new Uint8Array(buffer),
          ) as ApiCreateHashChannelAppsResponse;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.UserEventRequest.encode(
      tsproto.UserEventRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const body = {
      clan_id: clanId,
      event_id: eventId,
    };

    const bodyWriter = tsproto.UserEventRequest.encode(
      tsproto.UserEventRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.UpdateRoleOrderRequest.encode(
      tsproto.UpdateRoleOrderRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiGenerateMezonMeetResponse;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.GenerateMezonMeetResponse.decode(
            new Uint8Array(buffer),
          ) as ApiGenerateMezonMeetResponse;
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
        if (response.status == 204) {
          return {} as ApiGenerateMeetTokenExternalResponse;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.GenerateMeetTokenExternalResponse.decode(
            new Uint8Array(buffer),
          ) as ApiGenerateMeetTokenExternalResponse;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.MeetParticipantRequest.encode(
      tsproto.MeetParticipantRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.MeetParticipantRequest.encode(
      tsproto.MeetParticipantRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const body = {
      channel_id: channelId,
    };

    const bodyWriter = tsproto.ListChannelDetailRequest.encode(
      tsproto.ListChannelDetailRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiChannelDescription;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.ChannelDescription.decode(
            new Uint8Array(buffer),
          ) as ApiChannelDescription;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.ListChannelTimelineRequest.encode(
      tsproto.ListChannelTimelineRequest.fromPartial(request),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiListChannelTimelineResponse;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.ListChannelTimelineResponse.decode(
            new Uint8Array(buffer),
          ) as unknown as ApiListChannelTimelineResponse;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.CreateChannelTimelineRequest.encode(
      tsproto.CreateChannelTimelineRequest.fromPartial(request),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiCreateChannelTimelineResponse;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.CreateChannelTimelineResponse.decode(
            new Uint8Array(buffer),
          ) as unknown as ApiCreateChannelTimelineResponse;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.UpdateChannelTimelineRequest.encode(
      tsproto.UpdateChannelTimelineRequest.fromPartial(request),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiUpdateChannelTimelineResponse;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.UpdateChannelTimelineResponse.decode(
            new Uint8Array(buffer),
          ) as unknown as ApiUpdateChannelTimelineResponse;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.ChannelTimelineDetailRequest.encode(
      tsproto.ChannelTimelineDetailRequest.fromPartial(request),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiDetailChannelTimelineResponse;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.ChannelTimelineDetailResponse.decode(
            new Uint8Array(buffer),
          ) as unknown as ApiDetailChannelTimelineResponse;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.UpdateClanOrderRequest.encode(
      tsproto.UpdateClanOrderRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
        if (response.status == 204) {
          return {} as ApiListClanDiscover;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.ListClanDiscover.decode(
            new Uint8Array(buffer),
          ) as ApiListClanDiscover;
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
    const queryParams = new Map<string, any>();

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

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const body = {
      bot_id: botId,
      channel_id: channelId,
      menu_type: menuType,
    };

    const bodyWriter = tsproto.ListQuickMenuAccessRequest.encode(
      tsproto.ListQuickMenuAccessRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiQuickMenuAccessList;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.QuickMenuAccessList.decode(
            new Uint8Array(buffer),
          ) as ApiQuickMenuAccessList;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.QuickMenuAccess.encode(
      tsproto.QuickMenuAccess.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.QuickMenuAccess.encode(
      tsproto.QuickMenuAccess.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const body = {
      page: page,
    };

    const bodyWriter = tsproto.ListForSaleItemsRequest.encode(
      tsproto.ListForSaleItemsRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiForSaleItemList;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.ForSaleItemList.decode(
            new Uint8Array(buffer),
          ) as ApiForSaleItemList;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.IsFollowerRequest.encode(
      tsproto.IsFollowerRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiIsFollowerResponse;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.IsFollowerResponse.decode(
            new Uint8Array(buffer),
          ) as ApiIsFollowerResponse;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.TransferOwnershipRequest.encode(
      tsproto.TransferOwnershipRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.UpdateUsernameRequest.encode(
      tsproto.UpdateUsernameRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiSession;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.Session.decode(new Uint8Array(buffer)) as ApiSession;
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
    const queryParams = new Map<string, any>();

    const body = {
      channel_id: channelId,
    };

    const bodyWriter = tsproto.IsBannedRequest.encode(
      tsproto.IsBannedRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiIsBannedResponse;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.IsBannedResponse.decode(
            new Uint8Array(buffer),
          ) as ApiIsBannedResponse;
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
  reportMessageAbuse(
    bearerToken: string,
    messageId?: string,
    abuseType?: string,
    options = {},
  ): Promise<any> {
    const urlPath = "/mezon.api.Mezon/ReportMessageAbuse";
    const queryParams = new Map<string, any>();

    const body = {
      message_id: messageId,
      abuse_type: abuseType,
    };

    const bodyWriter = tsproto.ReportMessageAbuseReqest.encode(
      tsproto.ReportMessageAbuseReqest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

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

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", {}, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as tsproto.ChannelMessageAck;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.ChannelMessageAck.decode(
            new Uint8Array(buffer),
          ) as unknown as tsproto.ChannelMessageAck;
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
    const queryParams = new Map<string, any>();

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

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", {}, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as any;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.ChannelMessageUpdate.decode(
            new Uint8Array(buffer),
          ) as any;
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
    const queryParams = new Map<string, any>();

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

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", {}, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as any;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.ChannelMessageRemove.decode(
            new Uint8Array(buffer),
          ) as any;
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
    const queryParams = new Map<string, any>();

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

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

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

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

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

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const body = {
      clan_id: clanId,
      channel_id: channelId,
    };

    const bodyWriter = tsproto.ActiveArchivedThread.encode(
      tsproto.ActiveArchivedThread.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const body = {
      room_name: roomName,
      channel_id: channelId,
    };

    const bodyWriter = tsproto.UpdateAIAgentRequest.encode(
      tsproto.UpdateAIAgentRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const body = {
      room_name: roomName,
      channel_id: channelId,
    };

    const bodyWriter = tsproto.UpdateAIAgentRequest.encode(
      tsproto.UpdateAIAgentRequest.fromPartial(body),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.ListMutedChannelRequest.encode(
      tsproto.ListMutedChannelRequest.fromPartial({ clan_id: clanId }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiMutedChannelList;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.MutedChannelList.decode(
            new Uint8Array(buffer),
          ) as unknown as ApiMutedChannelList;
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
    const queryParams = new Map<string, any>();

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

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", {}, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as tsproto.ChannelMessageAck;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          return tsproto.ChannelMessageSend.decode(
            new Uint8Array(buffer),
          ) as unknown as tsproto.ChannelMessageAck;
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
    const queryParams = new Map<string, any>();

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

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiCreatePollResponse;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          const decoded = tsproto.CreatePollResponse.decode(
            new Uint8Array(buffer),
          );
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.VotePollRequest.encode(
      tsproto.VotePollRequest.fromPartial({
        poll_id: body.poll_id ?? "0",
        message_id: body.message_id ?? "0",
        channel_id: body.channel_id ?? "0",
        answer_indices: body.answer_indices ?? [],
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return { my_answer_indices: [] } as ApiVotePollResponse;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          const bytes = new Uint8Array(buffer);
          const decoded =
            bytes.length > 0
              ? tsproto.VotePollResponse.decode(bytes)
              : { my_answer_indices: [] };
          return {
            my_answer_indices: Array.from(decoded.my_answer_indices ?? []),
          } as ApiVotePollResponse;
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.ClosePollRequest.encode(
      tsproto.ClosePollRequest.fromPartial({
        poll_id: body.poll_id ?? "0",
        message_id: body.message_id ?? "0",
        channel_id: body.channel_id ?? "0",
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then((response) => {
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
    const queryParams = new Map<string, any>();

    const bodyWriter = tsproto.GetPollRequest.encode(
      tsproto.GetPollRequest.fromPartial({
        poll_id: body.poll_id ?? "0",
        message_id: body.message_id ?? "0",
        channel_id: body.channel_id ?? "0",
      }),
    );
    const encodedBody = bodyWriter.finish();

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, "");
    fetchOptions.body = encodedBody;
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (response) => {
        if (response.status == 204) {
          return {} as ApiGetPollResponse;
        } else if (response.status >= 200 && response.status < 300) {
          const buffer = await response.arrayBuffer();
          const decoded = tsproto.GetPollResponse.decode(
            new Uint8Array(buffer),
          );
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

  async followUsers(userIds: string[]): Promise<Status> {
    const fullUrl = "";
    const fetchOptions = { status_follow: { user_ids: userIds } } as any;
    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (_response) => {
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
    const fullUrl = "";
    const fetchOptions = {
      clan_join: {
        clan_id: clan_id,
      },
    } as any;
    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (_response) => {
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
    const fullUrl = "";
    const fetchOptions = {
      follow_event: {},
    } as any;
    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (_response) => {
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
    const fullUrl = "";
    const fetchOptions = {
      channel_join: {
        clan_id: clan_id,
        channel_id: channel_id,
        channel_type: channel_type,
        is_public: is_public,
      },
    } as any;
    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (_response) => {
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
    const fullUrl = "";
    const fetchOptions = {
      channel_leave: {
        clan_id: clan_id,
        channel_id: channel_id,
        channel_type: channel_type,
        is_public: is_public,
      },
    } as any;
    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (_response) => {
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
    const fullUrl = "";
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
      this.send({ fullUrl, fetchOptions }).then(async (_response) => {
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
    const fullUrl = "";
    const fetchOptions = { status_unfollow: { user_ids: user_ids } } as any;
    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (_response) => {
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
    const fullUrl = "";
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
      this.send({ fullUrl, fetchOptions }).then(async (_response) => {
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
    const fullUrl = "";
    const fetchOptions = { status_update: { status: status } } as any;
    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (_response) => {
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
    const fullUrl = "";
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
      this.send({ fullUrl, fetchOptions }).then(async (_response) => {
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
    const fullUrl = "";
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
      this.send({ fullUrl, fetchOptions }).then(async (_response) => {
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
    const fullUrl = "";
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
      this.send({ fullUrl, fetchOptions }).then(async (_response) => {
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
    const fullUrl = "";
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
      this.send({ fullUrl, fetchOptions }).then(async (_response) => {
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
    const fullUrl = "";
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
      this.send({ fullUrl, fetchOptions }).then(async (_response) => {
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
    const fullUrl = "";
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
      this.send({ fullUrl, fetchOptions }).then(async (_response) => {
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
    const fullUrl = "";
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
      this.send({ fullUrl, fetchOptions }).then(async (_response) => {
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
    const fullUrl = "";
    const fetchOptions = {
      custom_status_event: {
        clan_id: clan_id,
        status: status,
        time_reset: time_reset,
        no_clear: no_clear,
      },
    } as any;
    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (_response) => {
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
    const fullUrl = "";
    const fetchOptions = {
      voice_reaction_send: {
        emojis: emojis,
        channel_id: channel_id,
      },
    } as any;
    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (_response) => {
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
    const fullUrl = "";
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
      this.send({ fullUrl, fetchOptions }).then(async (_response) => {
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
    const fullUrl = "";
    const fetchOptions = {
      incoming_call_push: {
        receiver_id: receiver_id,
        json_data: json_data,
        channel_id: channel_id,
        caller_id: caller_id,
      },
    } as any;
    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (_response) => {
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
    const fullUrl = "";
    const fetchOptions = {
      channel_app_event: {
        clan_id: clan_id,
        channel_id: channel_id,
        action: action,
      },
    } as any;
    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (_response) => {
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
    const fullUrl = "";
    const fetchOptions = {
      list_data_socket: request,
    } as any;
    return Promise.race([
      this.send({ fullUrl, fetchOptions }).then(async (_response) => {
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
