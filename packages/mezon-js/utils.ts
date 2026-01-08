import { encode, decode } from "js-base64";

export function buildFetchOptions(
  method: string,
  options: any,
  bodyJson: string
) {
  const fetchOptions = { ...{ method: method }, ...options };
  fetchOptions.headers = { ...options.headers };

  if (typeof XMLHttpRequest !== "undefined") {
    const descriptor = Object.getOwnPropertyDescriptor(
      XMLHttpRequest.prototype,
      "withCredentials"
    );

    // in Cocos Creator, XMLHttpRequest.withCredentials is not writable, so make the fetch
    // polyfill avoid writing to it.
    if (!descriptor?.set) {
      fetchOptions.credentials = "cocos-ignore"; // string value is arbitrary, cannot be 'omit' or 'include
    }
  }

  if (!Object.keys(fetchOptions.headers).includes("Accept")) {
    fetchOptions.headers["Accept"] = "application/json";
  }

  if (!Object.keys(fetchOptions.headers).includes("Content-Type")) {
    fetchOptions.headers["Content-Type"] = "application/json";
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

export function b64EncodeUnicode(str: string) {
  return encode(
    encodeURIComponent(str).replace(
      /%([0-9A-F]{2})/g,
      function toSolidBytes(_match: string, p1) {
        return String.fromCharCode(Number("0x" + p1));
      }
    )
  );
}

export function b64DecodeUnicode(str: string) {
  return decodeURIComponent(
    decode(str)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
}

export function safeJSONParse(jsonStr: string) {
  try {
    return JSON.parse(jsonStr);
  } catch (error) {
    if (jsonStr !== "") {
      const fixedJsonStr = jsonStr.replace(/\n/g, "\\n");
      try {
        return JSON.parse(fixedJsonStr);
      } catch (e) {
        console.error("Error parsing JSON:", jsonStr, error);
      }
    }
    return { t: jsonStr }; // Handle the error gracefully or throw an exception if necessary
  }
}

export function mapToSnakeCase(obj: any): any {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(mapToSnakeCase);
  }

  const newObj: { [key: string]: any } = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = camelToSnakeCase(key);
      newObj[newKey] = mapToSnakeCase(obj[key]);
    }
  }
  return newObj;
}

export function mapToCamelCase(obj: any): any {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(mapToCamelCase);
  }

  const newObj: { [key: string]: any } = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = snakeToCamelCase(key);
      newObj[newKey] = mapToCamelCase(obj[key]);
    }
  }
  return newObj;
}

const camelToSnakeCase = (str: string): string =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

const snakeToCamelCase = (str: string): string =>
  str.replace(/_([a-z])/g, (_match, letter) => letter.toUpperCase());
