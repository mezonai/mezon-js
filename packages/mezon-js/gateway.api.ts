import { buildFetchOptions } from "./utils";
import { encode } from "js-base64";
import {
  ApiAccountMezon,
  ApiAuthenticateEmailRequest,
  ApiAuthenticateSMSRequest,
  ApiConfirmLoginRequest,
  ApiGenerateMeetTokenExternalResponse,
  ApiInviteUserRes,
  ApiLinkAccountConfirmRequest,
  ApiListClanDiscover,
  ApiLoginIDResponse,
  ApiLoginRequest,
  ApiSession,
  ApiClanDiscoverRequest,
  Session,
} from "./types/index";

export class GatewayMezonApi {
  basePath: string;
  constructor(
    readonly serverKey: string,
    readonly timeoutMs: number,
    basePath: string
  ) {
    this.basePath = basePath;
  }

  setBasePath(basePath: string) {
    this.basePath = basePath;
  }

  /** A healthcheck which load balancers can use to check the service. */
  healthcheck(bearerToken: string, options: any = {}): Promise<any> {
    const urlPath = "/healthcheck";
    const queryParams = new Map<string, any>();

    let bodyJson: string = "";

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("GET", options, bodyJson);
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      fetch(fullUrl, fetchOptions).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw response;
        }
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out.")
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
    options: any = {}
  ): Promise<ApiSession> {
    if (account === null || account === undefined) {
      throw new Error(
        "'account' is a required parameter but is null or undefined."
      );
    }
    const urlPath = "/v2/account/authenticate/mezon";
    const queryParams = new Map<string, any>();
    queryParams.set("create", create);
    queryParams.set("username", username);
    queryParams.set("isRemember", isRemember);

    let bodyJson: string = "";
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
          return Session.decode(
            new Uint8Array(buffer)
          ) as unknown as ApiSession;
        } else {
          throw response;
        }
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs
        )
      ),
    ]);
  }

  /** Authenticate a user with an SMS against the server. */
  AuthenticateSMSOTPRequest(
    basicAuthUsername: string,
    basicAuthPassword: string,
    body: ApiAuthenticateSMSRequest,
    options: any = {}
  ): Promise<ApiLinkAccountConfirmRequest> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined."
      );
    }
    const urlPath = "/v2/account/authenticate/smsotp";
    const queryParams = new Map<string, any>();

    let bodyJson: string = "";
    bodyJson = JSON.stringify(body || {});

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, bodyJson);
    if (basicAuthUsername) {
      fetchOptions.headers["Authorization"] =
        "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);
    }

    return Promise.race([
      fetch(fullUrl, fetchOptions).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw response;
        }
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out.")
      ),
    ]);
  }

  /** Authenticate a user with an email+password against the server. */
  AuthenticateEmailOTPRequest(
    basicAuthUsername: string,
    basicAuthPassword: string,
    body: ApiAuthenticateEmailRequest,
    options: any = {}
  ): Promise<ApiLinkAccountConfirmRequest> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined."
      );
    }
    const urlPath = "/v2/account/authenticate/emailotp";
    const queryParams = new Map<string, any>();

    let bodyJson: string = "";
    bodyJson = JSON.stringify(body || {});

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, bodyJson);
    if (basicAuthUsername) {
      fetchOptions.headers["Authorization"] =
        "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);
    }

    return Promise.race([
      fetch(fullUrl, fetchOptions).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw response;
        }
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out.")
      ),
    ]);
  }

  /**  */
  confirmAuthenticateOTP(
    basicAuthUsername: string,
    basicAuthPassword: string,
    body: ApiLinkAccountConfirmRequest,
    options: any = {}
  ): Promise<ApiSession> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined."
      );
    }
    const urlPath = "/v2/account/authenticate/confirmotp";
    const queryParams = new Map<string, any>();

    let bodyJson: string = "";
    bodyJson = JSON.stringify(body || {});

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
          return Session.decode(
            new Uint8Array(buffer)
          ) as unknown as ApiSession;
        } else {
          throw response;
        }
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs
        )
      ),
    ]);
  }

  /** Authenticate a user with an email+password against the server. */
  authenticateEmail(
    basicAuthUsername: string,
    basicAuthPassword: string,
    body: ApiAuthenticateEmailRequest,
    options: any = {}
  ): Promise<ApiSession> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined."
      );
    }
    const urlPath = "/v2/account/authenticate/email";
    const queryParams = new Map<string, any>();

    let bodyJson: string = "";
    bodyJson = JSON.stringify(body || {});

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
          return Session.decode(
            new Uint8Array(buffer)
          ) as unknown as ApiSession;
        } else {
          throw response;
        }
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs
        )
      ),
    ]);
  }

  /** Add users to a channel. */
  getLinkInvite(
    basicAuthUsername: string,
    basicAuthPassword: string,
    inviteId: string,
    options: any = {}
  ): Promise<ApiInviteUserRes> {
    if (inviteId === null || inviteId === undefined) {
      throw new Error(
        "'inviteId' is a required parameter but is null or undefined."
      );
    }
    const urlPath = "/v2/invite/{inviteId}".replace(
      "{inviteId}",
      encodeURIComponent(String(inviteId))
    );
    const queryParams = new Map<string, any>();

    let bodyJson: string = "";

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("GET", options, bodyJson);
    if (basicAuthUsername) {
      fetchOptions.headers["Authorization"] =
        "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);
    }

    return Promise.race([
      fetch(fullUrl, fetchOptions).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw response;
        }
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out.")
      ),
    ]);
  }

  /**  */
  createQRLogin(
    basicAuthUsername: string,
    basicAuthPassword: string,
    body: ApiLoginRequest,
    options: any = {}
  ): Promise<ApiLoginIDResponse> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined."
      );
    }
    const urlPath = "/v2/account/authenticate/createqrlogin";
    const queryParams = new Map<string, any>();

    let bodyJson: string = "";
    bodyJson = JSON.stringify(body || {});

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, bodyJson);
    if (basicAuthUsername) {
      fetchOptions.headers["Authorization"] =
        "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);
    }

    return Promise.race([
      fetch(fullUrl, fetchOptions).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw response;
        }
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out.")
      ),
    ]);
  }

  /**  */
  checkLoginRequest(
    basicAuthUsername: string,
    basicAuthPassword: string,
    body: ApiConfirmLoginRequest,
    options: any = {}
  ): Promise<ApiSession> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined."
      );
    }
    const urlPath = "/v2/account/authenticate/checklogin";
    const queryParams = new Map<string, any>();

    let bodyJson: string = "";
    bodyJson = JSON.stringify(body || {});

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
          return Session.decode(
            new Uint8Array(buffer)
          ) as unknown as ApiSession;
        } else {
          throw response;
        }
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.timeoutMs
        )
      ),
    ]);
  }

  /**  */
  confirmLogin(
    bearerToken: string,
    basePath: string,
    body: ApiConfirmLoginRequest,
    options: any = {}
  ): Promise<any> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined."
      );
    }
    const urlPath = "/v2/account/authenticate/confirmlogin";
    const queryParams = new Map<string, any>();

    let bodyJson: string = "";
    bodyJson = JSON.stringify(body || {});

    const fullUrl = this.buildFullUrl(basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, bodyJson);
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      fetch(fullUrl, fetchOptions).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw response;
        }
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out.")
      ),
    ]);
  }

  /** handler external mezon meet */
  generateMeetTokenExternal(
    bearerToken: string,
    basePath: string,
    token: string,
    displayName?: string,
    isGuest?: boolean,
    options: any = {}
  ): Promise<ApiGenerateMeetTokenExternalResponse> {
    if (token === null || token === undefined) {
      throw new Error(
        "'token' is a required parameter but is null or undefined."
      );
    }
    const urlPath = "/v2/meet/external/{token}".replace(
      "{token}",
      encodeURIComponent(String(token))
    );
    const queryParams = new Map<string, any>();
    queryParams.set("displayName", displayName);
    queryParams.set("is_guest", isGuest);

    let bodyJson: string = "";

    const fullUrl = this.buildFullUrl(basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, bodyJson);
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      fetch(fullUrl, fetchOptions).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw response;
        }
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out.")
      ),
    ]);
  }

  /** Discover mezon clan. */
  clanDiscover(
    basicAuthUsername: string,
    basicAuthPassword: string,
    basePath: string,
    body: ApiClanDiscoverRequest,
    options: any = {}
  ): Promise<ApiListClanDiscover> {
    if (body === null || body === undefined) {
      throw new Error(
        "'body' is a required parameter but is null or undefined."
      );
    }
    const urlPath = "/v2/clan/discover";
    const queryParams = new Map<string, any>();

    let bodyJson: string = "";
    bodyJson = JSON.stringify(body || {});

    const fullUrl = this.buildFullUrl(basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, bodyJson);
    if (basicAuthUsername) {
      fetchOptions.headers["Authorization"] =
        "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);
    }

    return Promise.race([
      fetch(fullUrl, fetchOptions).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw response;
        }
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out.")
      ),
    ]);
  }

  buildFullUrl(
    basePath: string,
    fragment: string,
    queryParams: Map<string, any>
  ) {
    let fullPath = basePath + fragment + "?";

    for (let [k, v] of queryParams) {
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
}
