import * as tsproto from "./proto/api";

export function buildFetchOptions(method: string, options: any, bodyJson: string) {
  const fetchOptions = { ...{ method: method }, ...options };
  fetchOptions.headers = { ...options.headers };

  if (typeof XMLHttpRequest !== "undefined") {
    const descriptor = Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, "withCredentials");

    // in Cocos Creator, XMLHttpRequest.withCredentials is not writable, so make the fetch
    // polyfill avoid writing to it.
    if (!descriptor?.set) {
      fetchOptions.credentials = "cocos-ignore"; // string value is arbitrary, cannot be 'omit' or 'include
    }
  }

  //fetchOptions.headers["connect-protocol-version"] = "1";

  if (!Object.keys(fetchOptions.headers).includes("Accept")) {
    fetchOptions.headers["Accept"] = "application/proto";
  }

  if (!Object.keys(fetchOptions.headers).includes("Content-Type")) {
    fetchOptions.headers["Content-Type"] = "application/proto";
  }

  Object.keys(fetchOptions.headers).forEach((key: string) => {
    if (!fetchOptions.headers[key]) {
      delete fetchOptions.headers[key];
    }
  });

  if (bodyJson) {
    fetchOptions.body = bodyJson;
  }

  return fetchOptions;
}

export function safeJSONParse(raw: any): any {
  if (raw === null || raw === undefined) return { t: raw };

  let jsonStr: string;

  if (raw instanceof Uint8Array) {
    jsonStr = new TextDecoder().decode(raw);
  } else if (typeof raw === "string") {
    jsonStr = raw;
  } else {
    return typeof raw === "object" ? raw : { t: raw };
  }

  if (!jsonStr || jsonStr === "" || jsonStr === "[]") {
    return { t: jsonStr };
  }

  try {
    return JSON.parse(jsonStr);
  } catch (error) {
    try {
      const fixedJsonStr = jsonStr.replace(/\n/g, "\\n").replace(/\r/g, "\\r");
      return JSON.parse(fixedJsonStr);
    } catch (e) {
      console.error("JSON Parse failed completely:", { original: jsonStr, error: e });
      return { t: jsonStr };
    }
  }
}

const isEmpty = (data: any) => {
  return !data || data === null || data === undefined || data === "" || data === "[]";
};

export function decodeAttachments(data: any) {
  if (isEmpty(data)) return;
  // 91 is '[' (JSON Array) | 123 is '{' (JSON Object)
  const firstByte = data[0];
  const isJson = firstByte === 91 || firstByte === 123;

  if (isJson) {
    return safeJSONParse(data);
  }

  try {
    const buffer: ArrayBuffer = data;
    const uintBuffer: Uint8Array = new Uint8Array(buffer);
    const attachments = tsproto.MessageAttachmentList.decode(uintBuffer);
    return attachments;
  } catch (error) {
    return safeJSONParse(data);
  }
}
