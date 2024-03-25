var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// ../../node_modules/whatwg-fetch/fetch.js
var global = typeof globalThis !== "undefined" && globalThis || typeof self !== "undefined" && self || typeof global !== "undefined" && global;
var support = {
  searchParams: "URLSearchParams" in global,
  iterable: "Symbol" in global && "iterator" in Symbol,
  blob: "FileReader" in global && "Blob" in global && function() {
    try {
      new Blob();
      return true;
    } catch (e) {
      return false;
    }
  }(),
  formData: "FormData" in global,
  arrayBuffer: "ArrayBuffer" in global
};
function isDataView(obj) {
  return obj && DataView.prototype.isPrototypeOf(obj);
}
if (support.arrayBuffer) {
  viewClasses = [
    "[object Int8Array]",
    "[object Uint8Array]",
    "[object Uint8ClampedArray]",
    "[object Int16Array]",
    "[object Uint16Array]",
    "[object Int32Array]",
    "[object Uint32Array]",
    "[object Float32Array]",
    "[object Float64Array]"
  ];
  isArrayBufferView = ArrayBuffer.isView || function(obj) {
    return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
  };
}
var viewClasses;
var isArrayBufferView;
function normalizeName(name) {
  if (typeof name !== "string") {
    name = String(name);
  }
  if (/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(name) || name === "") {
    throw new TypeError('Invalid character in header field name: "' + name + '"');
  }
  return name.toLowerCase();
}
function normalizeValue(value) {
  if (typeof value !== "string") {
    value = String(value);
  }
  return value;
}
function iteratorFor(items) {
  var iterator = {
    next: function() {
      var value = items.shift();
      return { done: value === void 0, value };
    }
  };
  if (support.iterable) {
    iterator[Symbol.iterator] = function() {
      return iterator;
    };
  }
  return iterator;
}
function Headers(headers) {
  this.map = {};
  if (headers instanceof Headers) {
    headers.forEach(function(value, name) {
      this.append(name, value);
    }, this);
  } else if (Array.isArray(headers)) {
    headers.forEach(function(header) {
      this.append(header[0], header[1]);
    }, this);
  } else if (headers) {
    Object.getOwnPropertyNames(headers).forEach(function(name) {
      this.append(name, headers[name]);
    }, this);
  }
}
Headers.prototype.append = function(name, value) {
  name = normalizeName(name);
  value = normalizeValue(value);
  var oldValue = this.map[name];
  this.map[name] = oldValue ? oldValue + ", " + value : value;
};
Headers.prototype["delete"] = function(name) {
  delete this.map[normalizeName(name)];
};
Headers.prototype.get = function(name) {
  name = normalizeName(name);
  return this.has(name) ? this.map[name] : null;
};
Headers.prototype.has = function(name) {
  return this.map.hasOwnProperty(normalizeName(name));
};
Headers.prototype.set = function(name, value) {
  this.map[normalizeName(name)] = normalizeValue(value);
};
Headers.prototype.forEach = function(callback, thisArg) {
  for (var name in this.map) {
    if (this.map.hasOwnProperty(name)) {
      callback.call(thisArg, this.map[name], name, this);
    }
  }
};
Headers.prototype.keys = function() {
  var items = [];
  this.forEach(function(value, name) {
    items.push(name);
  });
  return iteratorFor(items);
};
Headers.prototype.values = function() {
  var items = [];
  this.forEach(function(value) {
    items.push(value);
  });
  return iteratorFor(items);
};
Headers.prototype.entries = function() {
  var items = [];
  this.forEach(function(value, name) {
    items.push([name, value]);
  });
  return iteratorFor(items);
};
if (support.iterable) {
  Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
}
function consumed(body) {
  if (body.bodyUsed) {
    return Promise.reject(new TypeError("Already read"));
  }
  body.bodyUsed = true;
}
function fileReaderReady(reader) {
  return new Promise(function(resolve, reject) {
    reader.onload = function() {
      resolve(reader.result);
    };
    reader.onerror = function() {
      reject(reader.error);
    };
  });
}
function readBlobAsArrayBuffer(blob) {
  var reader = new FileReader();
  var promise = fileReaderReady(reader);
  reader.readAsArrayBuffer(blob);
  return promise;
}
function readBlobAsText(blob) {
  var reader = new FileReader();
  var promise = fileReaderReady(reader);
  reader.readAsText(blob);
  return promise;
}
function readArrayBufferAsText(buf) {
  var view = new Uint8Array(buf);
  var chars2 = new Array(view.length);
  for (var i = 0; i < view.length; i++) {
    chars2[i] = String.fromCharCode(view[i]);
  }
  return chars2.join("");
}
function bufferClone(buf) {
  if (buf.slice) {
    return buf.slice(0);
  } else {
    var view = new Uint8Array(buf.byteLength);
    view.set(new Uint8Array(buf));
    return view.buffer;
  }
}
function Body() {
  this.bodyUsed = false;
  this._initBody = function(body) {
    this.bodyUsed = this.bodyUsed;
    this._bodyInit = body;
    if (!body) {
      this._bodyText = "";
    } else if (typeof body === "string") {
      this._bodyText = body;
    } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
      this._bodyBlob = body;
    } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
      this._bodyFormData = body;
    } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
      this._bodyText = body.toString();
    } else if (support.arrayBuffer && support.blob && isDataView(body)) {
      this._bodyArrayBuffer = bufferClone(body.buffer);
      this._bodyInit = new Blob([this._bodyArrayBuffer]);
    } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
      this._bodyArrayBuffer = bufferClone(body);
    } else {
      this._bodyText = body = Object.prototype.toString.call(body);
    }
    if (!this.headers.get("content-type")) {
      if (typeof body === "string") {
        this.headers.set("content-type", "text/plain;charset=UTF-8");
      } else if (this._bodyBlob && this._bodyBlob.type) {
        this.headers.set("content-type", this._bodyBlob.type);
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
      }
    }
  };
  if (support.blob) {
    this.blob = function() {
      var rejected = consumed(this);
      if (rejected) {
        return rejected;
      }
      if (this._bodyBlob) {
        return Promise.resolve(this._bodyBlob);
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(new Blob([this._bodyArrayBuffer]));
      } else if (this._bodyFormData) {
        throw new Error("could not read FormData body as blob");
      } else {
        return Promise.resolve(new Blob([this._bodyText]));
      }
    };
    this.arrayBuffer = function() {
      if (this._bodyArrayBuffer) {
        var isConsumed = consumed(this);
        if (isConsumed) {
          return isConsumed;
        }
        if (ArrayBuffer.isView(this._bodyArrayBuffer)) {
          return Promise.resolve(
            this._bodyArrayBuffer.buffer.slice(
              this._bodyArrayBuffer.byteOffset,
              this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
            )
          );
        } else {
          return Promise.resolve(this._bodyArrayBuffer);
        }
      } else {
        return this.blob().then(readBlobAsArrayBuffer);
      }
    };
  }
  this.text = function() {
    var rejected = consumed(this);
    if (rejected) {
      return rejected;
    }
    if (this._bodyBlob) {
      return readBlobAsText(this._bodyBlob);
    } else if (this._bodyArrayBuffer) {
      return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
    } else if (this._bodyFormData) {
      throw new Error("could not read FormData body as text");
    } else {
      return Promise.resolve(this._bodyText);
    }
  };
  if (support.formData) {
    this.formData = function() {
      return this.text().then(decode);
    };
  }
  this.json = function() {
    return this.text().then(JSON.parse);
  };
  return this;
}
var methods = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
function normalizeMethod(method) {
  var upcased = method.toUpperCase();
  return methods.indexOf(upcased) > -1 ? upcased : method;
}
function Request(input, options) {
  if (!(this instanceof Request)) {
    throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
  }
  options = options || {};
  var body = options.body;
  if (input instanceof Request) {
    if (input.bodyUsed) {
      throw new TypeError("Already read");
    }
    this.url = input.url;
    this.credentials = input.credentials;
    if (!options.headers) {
      this.headers = new Headers(input.headers);
    }
    this.method = input.method;
    this.mode = input.mode;
    this.signal = input.signal;
    if (!body && input._bodyInit != null) {
      body = input._bodyInit;
      input.bodyUsed = true;
    }
  } else {
    this.url = String(input);
  }
  this.credentials = options.credentials || this.credentials || "same-origin";
  if (options.headers || !this.headers) {
    this.headers = new Headers(options.headers);
  }
  this.method = normalizeMethod(options.method || this.method || "GET");
  this.mode = options.mode || this.mode || null;
  this.signal = options.signal || this.signal;
  this.referrer = null;
  if ((this.method === "GET" || this.method === "HEAD") && body) {
    throw new TypeError("Body not allowed for GET or HEAD requests");
  }
  this._initBody(body);
  if (this.method === "GET" || this.method === "HEAD") {
    if (options.cache === "no-store" || options.cache === "no-cache") {
      var reParamSearch = /([?&])_=[^&]*/;
      if (reParamSearch.test(this.url)) {
        this.url = this.url.replace(reParamSearch, "$1_=" + (/* @__PURE__ */ new Date()).getTime());
      } else {
        var reQueryString = /\?/;
        this.url += (reQueryString.test(this.url) ? "&" : "?") + "_=" + (/* @__PURE__ */ new Date()).getTime();
      }
    }
  }
}
Request.prototype.clone = function() {
  return new Request(this, { body: this._bodyInit });
};
function decode(body) {
  var form = new FormData();
  body.trim().split("&").forEach(function(bytes) {
    if (bytes) {
      var split = bytes.split("=");
      var name = split.shift().replace(/\+/g, " ");
      var value = split.join("=").replace(/\+/g, " ");
      form.append(decodeURIComponent(name), decodeURIComponent(value));
    }
  });
  return form;
}
function parseHeaders(rawHeaders) {
  var headers = new Headers();
  var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, " ");
  preProcessedHeaders.split("\r").map(function(header) {
    return header.indexOf("\n") === 0 ? header.substr(1, header.length) : header;
  }).forEach(function(line) {
    var parts = line.split(":");
    var key = parts.shift().trim();
    if (key) {
      var value = parts.join(":").trim();
      headers.append(key, value);
    }
  });
  return headers;
}
Body.call(Request.prototype);
function Response(bodyInit, options) {
  if (!(this instanceof Response)) {
    throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
  }
  if (!options) {
    options = {};
  }
  this.type = "default";
  this.status = options.status === void 0 ? 200 : options.status;
  this.ok = this.status >= 200 && this.status < 300;
  this.statusText = options.statusText === void 0 ? "" : "" + options.statusText;
  this.headers = new Headers(options.headers);
  this.url = options.url || "";
  this._initBody(bodyInit);
}
Body.call(Response.prototype);
Response.prototype.clone = function() {
  return new Response(this._bodyInit, {
    status: this.status,
    statusText: this.statusText,
    headers: new Headers(this.headers),
    url: this.url
  });
};
Response.error = function() {
  var response = new Response(null, { status: 0, statusText: "" });
  response.type = "error";
  return response;
};
var redirectStatuses = [301, 302, 303, 307, 308];
Response.redirect = function(url, status) {
  if (redirectStatuses.indexOf(status) === -1) {
    throw new RangeError("Invalid status code");
  }
  return new Response(null, { status, headers: { location: url } });
};
var DOMException = global.DOMException;
try {
  new DOMException();
} catch (err) {
  DOMException = function(message, name) {
    this.message = message;
    this.name = name;
    var error = Error(message);
    this.stack = error.stack;
  };
  DOMException.prototype = Object.create(Error.prototype);
  DOMException.prototype.constructor = DOMException;
}
function fetch2(input, init) {
  return new Promise(function(resolve, reject) {
    var request = new Request(input, init);
    if (request.signal && request.signal.aborted) {
      return reject(new DOMException("Aborted", "AbortError"));
    }
    var xhr = new XMLHttpRequest();
    function abortXhr() {
      xhr.abort();
    }
    xhr.onload = function() {
      var options = {
        status: xhr.status,
        statusText: xhr.statusText,
        headers: parseHeaders(xhr.getAllResponseHeaders() || "")
      };
      options.url = "responseURL" in xhr ? xhr.responseURL : options.headers.get("X-Request-URL");
      var body = "response" in xhr ? xhr.response : xhr.responseText;
      setTimeout(function() {
        resolve(new Response(body, options));
      }, 0);
    };
    xhr.onerror = function() {
      setTimeout(function() {
        reject(new TypeError("Network request failed"));
      }, 0);
    };
    xhr.ontimeout = function() {
      setTimeout(function() {
        reject(new TypeError("Network request failed"));
      }, 0);
    };
    xhr.onabort = function() {
      setTimeout(function() {
        reject(new DOMException("Aborted", "AbortError"));
      }, 0);
    };
    function fixUrl(url) {
      try {
        return url === "" && global.location.href ? global.location.href : url;
      } catch (e) {
        return url;
      }
    }
    xhr.open(request.method, fixUrl(request.url), true);
    if (request.credentials === "include") {
      xhr.withCredentials = true;
    } else if (request.credentials === "omit") {
      xhr.withCredentials = false;
    }
    if ("responseType" in xhr) {
      if (support.blob) {
        xhr.responseType = "blob";
      } else if (support.arrayBuffer && request.headers.get("Content-Type") && request.headers.get("Content-Type").indexOf("application/octet-stream") !== -1) {
        xhr.responseType = "arraybuffer";
      }
    }
    if (init && typeof init.headers === "object" && !(init.headers instanceof Headers)) {
      Object.getOwnPropertyNames(init.headers).forEach(function(name) {
        xhr.setRequestHeader(name, normalizeValue(init.headers[name]));
      });
    } else {
      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value);
      });
    }
    if (request.signal) {
      request.signal.addEventListener("abort", abortXhr);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          request.signal.removeEventListener("abort", abortXhr);
        }
      };
    }
    xhr.send(typeof request._bodyInit === "undefined" ? null : request._bodyInit);
  });
}
fetch2.polyfill = true;
if (!global.fetch) {
  global.fetch = fetch2;
  global.Headers = Headers;
  global.Request = Request;
  global.Response = Response;
}

// ../../node_modules/js-base64/base64.mjs
var _hasatob = typeof atob === "function";
var _hasbtoa = typeof btoa === "function";
var _hasBuffer = typeof Buffer === "function";
var _TD = typeof TextDecoder === "function" ? new TextDecoder() : void 0;
var _TE = typeof TextEncoder === "function" ? new TextEncoder() : void 0;
var b64ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var b64chs = Array.prototype.slice.call(b64ch);
var b64tab = ((a) => {
  let tab = {};
  a.forEach((c, i) => tab[c] = i);
  return tab;
})(b64chs);
var b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
var _fromCC = String.fromCharCode.bind(String);
var _U8Afrom = typeof Uint8Array.from === "function" ? Uint8Array.from.bind(Uint8Array) : (it, fn = (x) => x) => new Uint8Array(Array.prototype.slice.call(it, 0).map(fn));
var _mkUriSafe = (src) => src.replace(/=/g, "").replace(/[+\/]/g, (m0) => m0 == "+" ? "-" : "_");
var _tidyB64 = (s) => s.replace(/[^A-Za-z0-9\+\/]/g, "");
var btoaPolyfill = (bin) => {
  let u32, c0, c1, c2, asc = "";
  const pad = bin.length % 3;
  for (let i = 0; i < bin.length; ) {
    if ((c0 = bin.charCodeAt(i++)) > 255 || (c1 = bin.charCodeAt(i++)) > 255 || (c2 = bin.charCodeAt(i++)) > 255)
      throw new TypeError("invalid character found");
    u32 = c0 << 16 | c1 << 8 | c2;
    asc += b64chs[u32 >> 18 & 63] + b64chs[u32 >> 12 & 63] + b64chs[u32 >> 6 & 63] + b64chs[u32 & 63];
  }
  return pad ? asc.slice(0, pad - 3) + "===".substring(pad) : asc;
};
var _btoa = _hasbtoa ? (bin) => btoa(bin) : _hasBuffer ? (bin) => Buffer.from(bin, "binary").toString("base64") : btoaPolyfill;
var _fromUint8Array = _hasBuffer ? (u8a) => Buffer.from(u8a).toString("base64") : (u8a) => {
  const maxargs = 4096;
  let strs = [];
  for (let i = 0, l = u8a.length; i < l; i += maxargs) {
    strs.push(_fromCC.apply(null, u8a.subarray(i, i + maxargs)));
  }
  return _btoa(strs.join(""));
};
var cb_utob = (c) => {
  if (c.length < 2) {
    var cc = c.charCodeAt(0);
    return cc < 128 ? c : cc < 2048 ? _fromCC(192 | cc >>> 6) + _fromCC(128 | cc & 63) : _fromCC(224 | cc >>> 12 & 15) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
  } else {
    var cc = 65536 + (c.charCodeAt(0) - 55296) * 1024 + (c.charCodeAt(1) - 56320);
    return _fromCC(240 | cc >>> 18 & 7) + _fromCC(128 | cc >>> 12 & 63) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
  }
};
var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
var utob = (u) => u.replace(re_utob, cb_utob);
var _encode = _hasBuffer ? (s) => Buffer.from(s, "utf8").toString("base64") : _TE ? (s) => _fromUint8Array(_TE.encode(s)) : (s) => _btoa(utob(s));
var encode = (src, urlsafe = false) => urlsafe ? _mkUriSafe(_encode(src)) : _encode(src);
var re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;
var cb_btou = (cccc) => {
  switch (cccc.length) {
    case 4:
      var cp = (7 & cccc.charCodeAt(0)) << 18 | (63 & cccc.charCodeAt(1)) << 12 | (63 & cccc.charCodeAt(2)) << 6 | 63 & cccc.charCodeAt(3), offset = cp - 65536;
      return _fromCC((offset >>> 10) + 55296) + _fromCC((offset & 1023) + 56320);
    case 3:
      return _fromCC((15 & cccc.charCodeAt(0)) << 12 | (63 & cccc.charCodeAt(1)) << 6 | 63 & cccc.charCodeAt(2));
    default:
      return _fromCC((31 & cccc.charCodeAt(0)) << 6 | 63 & cccc.charCodeAt(1));
  }
};
var btou = (b) => b.replace(re_btou, cb_btou);
var atobPolyfill = (asc) => {
  asc = asc.replace(/\s+/g, "");
  if (!b64re.test(asc))
    throw new TypeError("malformed base64.");
  asc += "==".slice(2 - (asc.length & 3));
  let u24, bin = "", r1, r2;
  for (let i = 0; i < asc.length; ) {
    u24 = b64tab[asc.charAt(i++)] << 18 | b64tab[asc.charAt(i++)] << 12 | (r1 = b64tab[asc.charAt(i++)]) << 6 | (r2 = b64tab[asc.charAt(i++)]);
    bin += r1 === 64 ? _fromCC(u24 >> 16 & 255) : r2 === 64 ? _fromCC(u24 >> 16 & 255, u24 >> 8 & 255) : _fromCC(u24 >> 16 & 255, u24 >> 8 & 255, u24 & 255);
  }
  return bin;
};
var _atob = _hasatob ? (asc) => atob(_tidyB64(asc)) : _hasBuffer ? (asc) => Buffer.from(asc, "base64").toString("binary") : atobPolyfill;
var _toUint8Array = _hasBuffer ? (a) => _U8Afrom(Buffer.from(a, "base64")) : (a) => _U8Afrom(_atob(a), (c) => c.charCodeAt(0));
var _decode = _hasBuffer ? (a) => Buffer.from(a, "base64").toString("utf8") : _TD ? (a) => _TD.decode(_toUint8Array(a)) : (a) => btou(_atob(a));
var _unURI = (a) => _tidyB64(a.replace(/[-_]/g, (m0) => m0 == "-" ? "+" : "/"));
var decode2 = (src) => _decode(_unURI(src));

// utils.ts
function buildFetchOptions(method, options, bodyJson) {
  const fetchOptions = __spreadValues(__spreadValues({}, { method }), options);
  fetchOptions.headers = __spreadValues({}, options.headers);
  if (typeof XMLHttpRequest !== "undefined") {
    const descriptor = Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, "withCredentials");
    if (!(descriptor == null ? void 0 : descriptor.set)) {
      fetchOptions.credentials = "cocos-ignore";
    }
  }
  if (!Object.keys(fetchOptions.headers).includes("Accept")) {
    fetchOptions.headers["Accept"] = "application/json";
  }
  if (!Object.keys(fetchOptions.headers).includes("Content-Type")) {
    fetchOptions.headers["Content-Type"] = "application/json";
  }
  Object.keys(fetchOptions.headers).forEach((key) => {
    if (!fetchOptions.headers[key]) {
      delete fetchOptions.headers[key];
    }
  });
  if (bodyJson) {
    fetchOptions.body = bodyJson;
  }
  return fetchOptions;
}

// api.gen.ts
var MezonApi = class {
  constructor(serverKey, basePath, timeoutMs) {
    this.serverKey = serverKey;
    this.basePath = basePath;
    this.timeoutMs = timeoutMs;
  }
  /** A healthcheck which load balancers can use to check the service. */
  healthcheck(bearerToken, options = {}) {
    const urlPath = "/healthcheck";
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Delete the current user's account. */
  deleteAccount(bearerToken, options = {}) {
    const urlPath = "/v2/account";
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("DELETE", options, bodyJson);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Fetch the current user's account. */
  getAccount(bearerToken, options = {}) {
    const urlPath = "/v2/account";
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Update fields in the current user's account. */
  updateAccount(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account";
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    bodyJson = JSON.stringify(body || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("PUT", options, bodyJson);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Authenticate a user with an Apple ID against the server. */
  authenticateApple(basicAuthUsername, basicAuthPassword, account, create, username, options = {}) {
    if (account === null || account === void 0) {
      throw new Error("'account' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/authenticate/apple";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("create", create);
    queryParams.set("username", username);
    let bodyJson = "";
    bodyJson = JSON.stringify(account || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, bodyJson);
    if (basicAuthUsername) {
      fetchOptions.headers["Authorization"] = "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Authenticate a user with a custom id against the server. */
  authenticateCustom(basicAuthUsername, basicAuthPassword, account, create, username, options = {}) {
    if (account === null || account === void 0) {
      throw new Error("'account' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/authenticate/custom";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("create", create);
    queryParams.set("username", username);
    let bodyJson = "";
    bodyJson = JSON.stringify(account || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, bodyJson);
    if (basicAuthUsername) {
      fetchOptions.headers["Authorization"] = "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Authenticate a user with a device id against the server. */
  authenticateDevice(basicAuthUsername, basicAuthPassword, account, create, username, options = {}) {
    if (account === null || account === void 0) {
      throw new Error("'account' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/authenticate/device";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("create", create);
    queryParams.set("username", username);
    let bodyJson = "";
    bodyJson = JSON.stringify(account || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, bodyJson);
    if (basicAuthUsername) {
      fetchOptions.headers["Authorization"] = "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Authenticate a user with an email+password against the server. */
  authenticateEmail(basicAuthUsername, basicAuthPassword, account, create, username, options = {}) {
    if (account === null || account === void 0) {
      throw new Error("'account' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/authenticate/email";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("create", create);
    queryParams.set("username", username);
    let bodyJson = "";
    bodyJson = JSON.stringify(account || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, bodyJson);
    if (basicAuthUsername) {
      fetchOptions.headers["Authorization"] = "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Authenticate a user with a Facebook OAuth token against the server. */
  authenticateFacebook(basicAuthUsername, basicAuthPassword, account, create, username, sync, options = {}) {
    if (account === null || account === void 0) {
      throw new Error("'account' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/authenticate/facebook";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("create", create);
    queryParams.set("username", username);
    queryParams.set("sync", sync);
    let bodyJson = "";
    bodyJson = JSON.stringify(account || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, bodyJson);
    if (basicAuthUsername) {
      fetchOptions.headers["Authorization"] = "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Authenticate a user with a Facebook Instant Game token against the server. */
  authenticateFacebookInstantGame(basicAuthUsername, basicAuthPassword, account, create, username, options = {}) {
    if (account === null || account === void 0) {
      throw new Error("'account' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/authenticate/facebookinstantgame";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("create", create);
    queryParams.set("username", username);
    let bodyJson = "";
    bodyJson = JSON.stringify(account || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, bodyJson);
    if (basicAuthUsername) {
      fetchOptions.headers["Authorization"] = "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Authenticate a user with Apple's GameCenter against the server. */
  authenticateGameCenter(basicAuthUsername, basicAuthPassword, account, create, username, options = {}) {
    if (account === null || account === void 0) {
      throw new Error("'account' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/authenticate/gamecenter";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("create", create);
    queryParams.set("username", username);
    let bodyJson = "";
    bodyJson = JSON.stringify(account || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, bodyJson);
    if (basicAuthUsername) {
      fetchOptions.headers["Authorization"] = "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Authenticate a user with Google against the server. */
  authenticateGoogle(basicAuthUsername, basicAuthPassword, account, create, username, options = {}) {
    if (account === null || account === void 0) {
      throw new Error("'account' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/authenticate/google";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("create", create);
    queryParams.set("username", username);
    let bodyJson = "";
    bodyJson = JSON.stringify(account || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, bodyJson);
    if (basicAuthUsername) {
      fetchOptions.headers["Authorization"] = "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Authenticate a user with Steam against the server. */
  authenticateSteam(basicAuthUsername, basicAuthPassword, account, create, username, sync, options = {}) {
    if (account === null || account === void 0) {
      throw new Error("'account' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/authenticate/steam";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("create", create);
    queryParams.set("username", username);
    queryParams.set("sync", sync);
    let bodyJson = "";
    bodyJson = JSON.stringify(account || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, bodyJson);
    if (basicAuthUsername) {
      fetchOptions.headers["Authorization"] = "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Add an Apple ID to the social profiles on the current user's account. */
  linkApple(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/link/apple";
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    bodyJson = JSON.stringify(body || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Add a custom ID to the social profiles on the current user's account. */
  linkCustom(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/link/custom";
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    bodyJson = JSON.stringify(body || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Add a device ID to the social profiles on the current user's account. */
  linkDevice(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/link/device";
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    bodyJson = JSON.stringify(body || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Add an email+password to the social profiles on the current user's account. */
  linkEmail(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/link/email";
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    bodyJson = JSON.stringify(body || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Add Facebook to the social profiles on the current user's account. */
  linkFacebook(bearerToken, account, sync, options = {}) {
    if (account === null || account === void 0) {
      throw new Error("'account' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/link/facebook";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("sync", sync);
    let bodyJson = "";
    bodyJson = JSON.stringify(account || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Add Facebook Instant Game to the social profiles on the current user's account. */
  linkFacebookInstantGame(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/link/facebookinstantgame";
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    bodyJson = JSON.stringify(body || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Add Apple's GameCenter to the social profiles on the current user's account. */
  linkGameCenter(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/link/gamecenter";
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    bodyJson = JSON.stringify(body || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Add Google to the social profiles on the current user's account. */
  linkGoogle(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/link/google";
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    bodyJson = JSON.stringify(body || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Add Steam to the social profiles on the current user's account. */
  linkSteam(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/link/steam";
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    bodyJson = JSON.stringify(body || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Refresh a user's session using a refresh token retrieved from a previous authentication request. */
  sessionRefresh(basicAuthUsername, basicAuthPassword, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/session/refresh";
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    bodyJson = JSON.stringify(body || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, bodyJson);
    if (basicAuthUsername) {
      fetchOptions.headers["Authorization"] = "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Remove the Apple ID from the social profiles on the current user's account. */
  unlinkApple(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/unlink/apple";
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    bodyJson = JSON.stringify(body || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Remove the custom ID from the social profiles on the current user's account. */
  unlinkCustom(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/unlink/custom";
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    bodyJson = JSON.stringify(body || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Remove the device ID from the social profiles on the current user's account. */
  unlinkDevice(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/unlink/device";
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    bodyJson = JSON.stringify(body || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Remove the email+password from the social profiles on the current user's account. */
  unlinkEmail(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/unlink/email";
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    bodyJson = JSON.stringify(body || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Remove Facebook from the social profiles on the current user's account. */
  unlinkFacebook(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/unlink/facebook";
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    bodyJson = JSON.stringify(body || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Remove Facebook Instant Game profile from the social profiles on the current user's account. */
  unlinkFacebookInstantGame(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/unlink/facebookinstantgame";
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    bodyJson = JSON.stringify(body || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Remove Apple's GameCenter from the social profiles on the current user's account. */
  unlinkGameCenter(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/unlink/gamecenter";
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    bodyJson = JSON.stringify(body || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Remove Google from the social profiles on the current user's account. */
  unlinkGoogle(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/unlink/google";
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    bodyJson = JSON.stringify(body || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Remove Steam from the social profiles on the current user's account. */
  unlinkSteam(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/unlink/steam";
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    bodyJson = JSON.stringify(body || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /**  */
  listCategoryDescs(bearerToken, clanId, creatorId, categoryName, categoryId, options = {}) {
    if (clanId === null || clanId === void 0) {
      throw new Error("'clanId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/categorydesc/{clanId}".replace("{clanId}", encodeURIComponent(String(clanId)));
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("creator_id", creatorId);
    queryParams.set("category_name", categoryName);
    queryParams.set("category_id", categoryId);
    let bodyJson = "";
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** List a channel's message history. */
  listChannelMessages(bearerToken, channelId, messageId, direction, limit, options = {}) {
    if (channelId === null || channelId === void 0) {
      throw new Error("'channelId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/channel/{channelId}".replace("{channelId}", encodeURIComponent(String(channelId)));
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("message_id", messageId);
    queryParams.set("limit", limit);
    queryParams.set("direction", direction);
    let bodyJson = "";
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** List user channels */
  listChannelDescs(bearerToken, limit, state, cursor, clanId, channelType, options = {}) {
    const urlPath = "/v2/channeldesc";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("limit", limit);
    queryParams.set("state", state);
    queryParams.set("cursor", cursor);
    queryParams.set("clan_id", clanId);
    queryParams.set("channel_type", channelType);
    let bodyJson = "";
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Create a new channel with the current user as the owner. */
  createChannelDesc(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/channeldesc";
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    bodyJson = JSON.stringify(body || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Delete a channel by ID. */
  deleteChannelDesc(bearerToken, channelId, options = {}) {
    if (channelId === null || channelId === void 0) {
      throw new Error("'channelId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/channeldesc/{channelId}".replace("{channelId}", encodeURIComponent(String(channelId)));
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("DELETE", options, bodyJson);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Update fields in a given channel. */
  updateChannelDesc(bearerToken, channelId, body, options = {}) {
    if (channelId === null || channelId === void 0) {
      throw new Error("'channelId' is a required parameter but is null or undefined.");
    }
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/channeldesc/{channelId}".replace("{channelId}", encodeURIComponent(String(channelId)));
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    bodyJson = JSON.stringify(body || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("PUT", options, bodyJson);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Add users to a channel. */
  addChannelUsers(bearerToken, channelId, userIds, options = {}) {
    if (channelId === null || channelId === void 0) {
      throw new Error("'channelId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/channeldesc/{channelId}/add".replace("{channelId}", encodeURIComponent(String(channelId)));
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("user_ids", userIds);
    let bodyJson = "";
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Leave a channel the user is a member of. */
  leaveChannel(bearerToken, channelId, options = {}) {
    if (channelId === null || channelId === void 0) {
      throw new Error("'channelId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/channeldesc/{channelId}/leave".replace("{channelId}", encodeURIComponent(String(channelId)));
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Kick a set of users from a channel. */
  removeChannelUsers(bearerToken, channelId, userIds, options = {}) {
    if (channelId === null || channelId === void 0) {
      throw new Error("'channelId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/channeldesc/{channelId}/remove".replace("{channelId}", encodeURIComponent(String(channelId)));
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("user_ids", userIds);
    let bodyJson = "";
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** List all users that are part of a channel. */
  listChannelUsers(bearerToken, channelId, channelType, limit, state, cursor, options = {}) {
    if (channelId === null || channelId === void 0) {
      throw new Error("'channelId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/channeldesc/{channelId}/user".replace("{channelId}", encodeURIComponent(String(channelId)));
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("channelType", channelType);
    queryParams.set("limit", limit);
    queryParams.set("state", state);
    queryParams.set("cursor", cursor);
    let bodyJson = "";
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** List clans */
  listClanDescs(bearerToken, limit, state, cursor, options = {}) {
    const urlPath = "/v2/clandesc";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("limit", limit);
    queryParams.set("state", state);
    queryParams.set("cursor", cursor);
    let bodyJson = "";
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Create a clan */
  createClanDesc(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/clandesc";
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    bodyJson = JSON.stringify(body || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Delete a clan desc by ID. */
  deleteClanDesc(bearerToken, clanDescId, options = {}) {
    if (clanDescId === null || clanDescId === void 0) {
      throw new Error("'clanDescId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/clandesc/{clanDescId}".replace("{clanDescId}", encodeURIComponent(String(clanDescId)));
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("DELETE", options, bodyJson);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Update fields in a given clan. */
  updateClanDesc(bearerToken, clanId, creatorId, clanName, logo, banner, options = {}) {
    if (clanId === null || clanId === void 0) {
      throw new Error("'clanId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/clandesc/{clanId}".replace("{clanId}", encodeURIComponent(String(clanId)));
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("creator_id", creatorId);
    queryParams.set("clan_name", clanName);
    queryParams.set("logo", logo);
    queryParams.set("banner", banner);
    let bodyJson = "";
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("PUT", options, bodyJson);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** List all users that are part of a clan. */
  listClanUsers(bearerToken, clanId, options = {}) {
    if (clanId === null || clanId === void 0) {
      throw new Error("'clanId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/clandesc/{clanId}/user".replace("{clanId}", encodeURIComponent(String(clanId)));
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Get a clan desc profile */
  getClanDescProfile(bearerToken, clanId, options = {}) {
    if (clanId === null || clanId === void 0) {
      throw new Error("'clanId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/clandescprofile/{clanId}".replace("{clanId}", encodeURIComponent(String(clanId)));
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Update fields in a given clan profile. */
  updateClanDescProfile(bearerToken, clanId, body, options = {}) {
    if (clanId === null || clanId === void 0) {
      throw new Error("'clanId' is a required parameter but is null or undefined.");
    }
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/clandescprofile/{clanId}".replace("{clanId}", encodeURIComponent(String(clanId)));
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    bodyJson = JSON.stringify(body || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("PUT", options, bodyJson);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /**  */
  createCategoryDesc(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/createcategory";
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    bodyJson = JSON.stringify(body || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /**  */
  deleteCategoryDesc(bearerToken, creatorId, options = {}) {
    if (creatorId === null || creatorId === void 0) {
      throw new Error("'creatorId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/deletecategory/{creatorId}".replace("{creatorId}", encodeURIComponent(String(creatorId)));
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("DELETE", options, bodyJson);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Immediately join an open group, or request to join a closed one. */
  registFCMDeviceToken(bearerToken, token, options = {}) {
    const urlPath = "/v2/devicetoken";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("token", token);
    let bodyJson = "";
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Submit an event for processing in the server's registered runtime custom events handler. */
  event(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/event";
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    bodyJson = JSON.stringify(body || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Delete one or more users by ID or username. */
  deleteFriends(bearerToken, ids, usernames, options = {}) {
    const urlPath = "/v2/friend";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("ids", ids);
    queryParams.set("usernames", usernames);
    let bodyJson = "";
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("DELETE", options, bodyJson);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** List all friends for the current user. */
  listFriends(bearerToken, limit, state, cursor, options = {}) {
    const urlPath = "/v2/friend";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("limit", limit);
    queryParams.set("state", state);
    queryParams.set("cursor", cursor);
    let bodyJson = "";
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Add friends by ID or username to a user's account. */
  addFriends(bearerToken, ids, usernames, options = {}) {
    const urlPath = "/v2/friend";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("ids", ids);
    queryParams.set("usernames", usernames);
    let bodyJson = "";
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Block one or more users by ID or username. */
  blockFriends(bearerToken, ids, usernames, options = {}) {
    const urlPath = "/v2/friend/block";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("ids", ids);
    queryParams.set("usernames", usernames);
    let bodyJson = "";
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Import Facebook friends and add them to a user's account. */
  importFacebookFriends(bearerToken, account, reset, options = {}) {
    if (account === null || account === void 0) {
      throw new Error("'account' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/friend/facebook";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("reset", reset);
    let bodyJson = "";
    bodyJson = JSON.stringify(account || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Import Steam friends and add them to a user's account. */
  importSteamFriends(bearerToken, account, reset, options = {}) {
    if (account === null || account === void 0) {
      throw new Error("'account' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/friend/steam";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("reset", reset);
    let bodyJson = "";
    bodyJson = JSON.stringify(account || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /**  */
  getUserProfileOnClan(bearerToken, clanId, options = {}) {
    if (clanId === null || clanId === void 0) {
      throw new Error("'clanId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/getclanprofile/{clanId}".replace("{clanId}", encodeURIComponent(String(clanId)));
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Add users to a channel. */
  createLinkInviteUser(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/invite";
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    bodyJson = JSON.stringify(body || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Add users to a channel. */
  getLinkInvite(bearerToken, inviteId, options = {}) {
    if (inviteId === null || inviteId === void 0) {
      throw new Error("'inviteId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/invite/{inviteId}".replace("{inviteId}", encodeURIComponent(String(inviteId)));
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Add users to a channel. */
  inviteUser(bearerToken, inviteId, options = {}) {
    if (inviteId === null || inviteId === void 0) {
      throw new Error("'inviteId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/invite/{inviteId}".replace("{inviteId}", encodeURIComponent(String(inviteId)));
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /**  */
  getListPermission(bearerToken, options = {}) {
    const urlPath = "/v2/listpermission";
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Delete one or more notifications for the current user. */
  deleteNotifications(bearerToken, ids, options = {}) {
    const urlPath = "/v2/notification";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("ids", ids);
    let bodyJson = "";
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("DELETE", options, bodyJson);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Fetch list of notifications. */
  listNotifications(bearerToken, limit, cacheableCursor, options = {}) {
    const urlPath = "/v2/notification";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("limit", limit);
    queryParams.set("cacheable_cursor", cacheableCursor);
    let bodyJson = "";
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /**  */
  GetPermissionOfUserInTheClan(bearerToken, clanId, options = {}) {
    if (clanId === null || clanId === void 0) {
      throw new Error("'clanId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/permissionuserinclan/{clanId}".replace("{clanId}", encodeURIComponent(String(clanId)));
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** List user roles */
  listRoles(bearerToken, limit, state, cursor, clanId, options = {}) {
    const urlPath = "/v2/roles";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("limit", limit);
    queryParams.set("state", state);
    queryParams.set("cursor", cursor);
    queryParams.set("clan_id", clanId);
    let bodyJson = "";
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Create a new role for clan. */
  createRole(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/roles";
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    bodyJson = JSON.stringify(body || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Update a role when Delete a role by ID. */
  updateRoleDelete(bearerToken, roleId, body, options = {}) {
    if (roleId === null || roleId === void 0) {
      throw new Error("'roleId' is a required parameter but is null or undefined.");
    }
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/roles/delete/{roleId}".replace("{roleId}", encodeURIComponent(String(roleId)));
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    bodyJson = JSON.stringify(body || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("PUT", options, bodyJson);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Delete a role by ID. */
  deleteRole(bearerToken, roleId, options = {}) {
    if (roleId === null || roleId === void 0) {
      throw new Error("'roleId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/roles/{roleId}".replace("{roleId}", encodeURIComponent(String(roleId)));
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("DELETE", options, bodyJson);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Update fields in a given role. */
  updateRole(bearerToken, roleId, body, options = {}) {
    if (roleId === null || roleId === void 0) {
      throw new Error("'roleId' is a required parameter but is null or undefined.");
    }
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/roles/{roleId}".replace("{roleId}", encodeURIComponent(String(roleId)));
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    bodyJson = JSON.stringify(body || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("PUT", options, bodyJson);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** List role permissions */
  listRolePermissions(bearerToken, roleId, options = {}) {
    if (roleId === null || roleId === void 0) {
      throw new Error("'roleId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/roles/{roleId}/permissions".replace("{roleId}", encodeURIComponent(String(roleId)));
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** List role permissions */
  listRoleUsers(bearerToken, roleId, limit, cursor, options = {}) {
    if (roleId === null || roleId === void 0) {
      throw new Error("'roleId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/roles/{roleId}/users".replace("{roleId}", encodeURIComponent(String(roleId)));
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("limit", limit);
    queryParams.set("cursor", cursor);
    let bodyJson = "";
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Execute a Lua function on the server. */
  rpcFunc2(bearerToken, basicAuthUsername, basicAuthPassword, id, payload, httpKey, options = {}) {
    if (id === null || id === void 0) {
      throw new Error("'id' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/rpc/{id}".replace("{id}", encodeURIComponent(String(id)));
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("payload", payload);
    queryParams.set("http_key", httpKey);
    let bodyJson = "";
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("GET", options, bodyJson);
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }
    if (basicAuthUsername) {
      fetchOptions.headers["Authorization"] = "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Execute a Lua function on the server. */
  rpcFunc(bearerToken, basicAuthUsername, basicAuthPassword, id, payload, httpKey, options = {}) {
    if (id === null || id === void 0) {
      throw new Error("'id' is a required parameter but is null or undefined.");
    }
    if (payload === null || payload === void 0) {
      throw new Error("'payload' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/rpc/{id}".replace("{id}", encodeURIComponent(String(id)));
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("http_key", httpKey);
    let bodyJson = "";
    bodyJson = JSON.stringify(payload || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, bodyJson);
    if (bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }
    if (basicAuthUsername) {
      fetchOptions.headers["Authorization"] = "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Log out a session, invalidate a refresh token, or log out all sessions/refresh tokens for a user. */
  sessionLogout(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/session/logout";
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    bodyJson = JSON.stringify(body || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Get storage objects. */
  readStorageObjects(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/storage";
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    bodyJson = JSON.stringify(body || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Write objects into the storage engine. */
  writeStorageObjects(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/storage";
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    bodyJson = JSON.stringify(body || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("PUT", options, bodyJson);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Delete one or more objects by ID or username. */
  deleteStorageObjects(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/storage/delete";
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    bodyJson = JSON.stringify(body || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("PUT", options, bodyJson);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** List publicly readable storage objects in a given collection. */
  listStorageObjects(bearerToken, collection, userId, limit, cursor, options = {}) {
    if (collection === null || collection === void 0) {
      throw new Error("'collection' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/storage/{collection}".replace("{collection}", encodeURIComponent(String(collection)));
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("user_id", userId);
    queryParams.set("limit", limit);
    queryParams.set("cursor", cursor);
    let bodyJson = "";
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** List publicly readable storage objects in a given collection. */
  listStorageObjects2(bearerToken, collection, userId, limit, cursor, options = {}) {
    if (collection === null || collection === void 0) {
      throw new Error("'collection' is a required parameter but is null or undefined.");
    }
    if (userId === null || userId === void 0) {
      throw new Error("'userId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/storage/{collection}/{userId}".replace("{collection}", encodeURIComponent(String(collection))).replace("{userId}", encodeURIComponent(String(userId)));
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("limit", limit);
    queryParams.set("cursor", cursor);
    let bodyJson = "";
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Update fields in a given category. */
  updateCategory(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/updatecategory";
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    bodyJson = JSON.stringify(body || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("PUT", options, bodyJson);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /**  */
  updateUserProfileByClan(bearerToken, clanId, body, options = {}) {
    if (clanId === null || clanId === void 0) {
      throw new Error("'clanId' is a required parameter but is null or undefined.");
    }
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/updateclanprofile/{clanId}".replace("{clanId}", encodeURIComponent(String(clanId)));
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    bodyJson = JSON.stringify(body || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("PUT", options, bodyJson);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Create a new group with the current user as the owner. */
  uploadAttachmentFile(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/uploadattachmentfile";
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    bodyJson = JSON.stringify(body || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /** Fetch zero or more users by ID and/or username. */
  getUsers(bearerToken, ids, usernames, facebookIds, options = {}) {
    const urlPath = "/v2/user";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("ids", ids);
    queryParams.set("usernames", usernames);
    queryParams.set("facebook_ids", facebookIds);
    let bodyJson = "";
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  /**  */
  updateUser(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/user/update";
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    bodyJson = JSON.stringify(body || {});
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("PUT", options, bodyJson);
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
      new Promise(
        (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
      )
    ]);
  }
  buildFullUrl(basePath, fragment, queryParams) {
    let fullPath = basePath + fragment + "?";
    for (let [k, v] of queryParams) {
      if (v instanceof Array) {
        fullPath += v.reduce((prev, curr) => {
          return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
        }, "");
      } else {
        if (v != null) {
          fullPath += encodeURIComponent(k) + "=" + encodeURIComponent(v) + "&";
        }
      }
    }
    return fullPath;
  }
};

// session.ts
var Session = class _Session {
  constructor(token, refresh_token, created) {
    this.created = created;
    this.token = token;
    this.refresh_token = refresh_token;
    this.created_at = Math.floor((/* @__PURE__ */ new Date()).getTime() / 1e3);
    this.update(token, refresh_token);
  }
  isexpired(currenttime) {
    return this.expires_at - currenttime < 0;
  }
  isrefreshexpired(currenttime) {
    return this.refresh_expires_at - currenttime < 0;
  }
  update(token, refreshToken) {
    const tokenParts = token.split(".");
    if (tokenParts.length != 3) {
      throw "jwt is not valid.";
    }
    const tokenDecoded = JSON.parse(_atob(tokenParts[1]));
    const tokenExpiresAt = Math.floor(parseInt(tokenDecoded["exp"]));
    if (refreshToken) {
      const refreshTokenParts = refreshToken.split(".");
      if (refreshTokenParts.length != 3) {
        throw "refresh jwt is not valid.";
      }
      const refreshTokenDecoded = JSON.parse(_atob(refreshTokenParts[1]));
      const refreshTokenExpiresAt = Math.floor(parseInt(refreshTokenDecoded["exp"]));
      this.refresh_expires_at = refreshTokenExpiresAt;
      this.refresh_token = refreshToken;
    }
    this.token = token;
    this.expires_at = tokenExpiresAt;
    this.username = tokenDecoded["usn"];
    this.user_id = tokenDecoded["uid"];
    this.vars = tokenDecoded["vrs"];
  }
  static restore(token, refreshToken) {
    return new _Session(token, refreshToken, false);
  }
};

// ../../node_modules/base64-arraybuffer/dist/base64-arraybuffer.es5.js
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var lookup = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
for (i = 0; i < chars.length; i++) {
  lookup[chars.charCodeAt(i)] = i;
}
var i;
var encode2 = function(arraybuffer) {
  var bytes = new Uint8Array(arraybuffer), i, len = bytes.length, base64 = "";
  for (i = 0; i < len; i += 3) {
    base64 += chars[bytes[i] >> 2];
    base64 += chars[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
    base64 += chars[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
    base64 += chars[bytes[i + 2] & 63];
  }
  if (len % 3 === 2) {
    base64 = base64.substring(0, base64.length - 1) + "=";
  } else if (len % 3 === 1) {
    base64 = base64.substring(0, base64.length - 2) + "==";
  }
  return base64;
};
var decode3 = function(base64) {
  var bufferLength = base64.length * 0.75, len = base64.length, i, p = 0, encoded1, encoded2, encoded3, encoded4;
  if (base64[base64.length - 1] === "=") {
    bufferLength--;
    if (base64[base64.length - 2] === "=") {
      bufferLength--;
    }
  }
  var arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
  for (i = 0; i < len; i += 4) {
    encoded1 = lookup[base64.charCodeAt(i)];
    encoded2 = lookup[base64.charCodeAt(i + 1)];
    encoded3 = lookup[base64.charCodeAt(i + 2)];
    encoded4 = lookup[base64.charCodeAt(i + 3)];
    bytes[p++] = encoded1 << 2 | encoded2 >> 4;
    bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
    bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
  }
  return arraybuffer;
};

// web_socket_adapter.ts
var WebSocketAdapterText = class {
  get onClose() {
    return this._socket.onclose;
  }
  set onClose(value) {
    this._socket.onclose = value;
  }
  get onError() {
    return this._socket.onerror;
  }
  set onError(value) {
    this._socket.onerror = value;
  }
  get onMessage() {
    return this._socket.onmessage;
  }
  set onMessage(value) {
    if (value) {
      this._socket.onmessage = (evt) => {
        const message = JSON.parse(evt.data);
        if (message.party_data && message.party_data.data) {
          message.party_data.data = new Uint8Array(decode3(message.party_data.data));
        }
        value(message);
      };
    } else {
      value = null;
    }
  }
  get onOpen() {
    return this._socket.onopen;
  }
  set onOpen(value) {
    this._socket.onopen = value;
  }
  isOpen() {
    var _a;
    return ((_a = this._socket) == null ? void 0 : _a.readyState) == WebSocket.OPEN;
  }
  connect(scheme, host, port, createStatus, token) {
    const url = `${scheme}${host}:${port}/ws?lang=en&status=${encodeURIComponent(createStatus.toString())}&token=${encodeURIComponent(token)}`;
    this._socket = new WebSocket(url);
  }
  close() {
    this._socket.close();
    this._socket = void 0;
  }
  send(msg) {
    if (msg.party_data_send) {
      msg.party_data_send.op_code = msg.party_data_send.op_code.toString();
      let payload = msg.party_data_send.data;
      if (payload && payload instanceof Uint8Array) {
        msg.party_data_send.data = encode2(payload.buffer);
      } else if (payload) {
        msg.party_data_send.data = _btoa(payload);
      }
    }
    this._socket.send(JSON.stringify(msg));
  }
};

// socket.ts
var _DefaultSocket = class _DefaultSocket {
  constructor(host, port, useSSL = false, verbose = false, adapter = new WebSocketAdapterText(), sendTimeoutMs = _DefaultSocket.DefaultSendTimeoutMs) {
    this.host = host;
    this.port = port;
    this.useSSL = useSSL;
    this.verbose = verbose;
    this.adapter = adapter;
    this.sendTimeoutMs = sendTimeoutMs;
    this.cIds = {};
    this.nextCid = 1;
    this._heartbeatTimeoutMs = _DefaultSocket.DefaultHeartbeatTimeoutMs;
  }
  generatecid() {
    const cid = this.nextCid.toString();
    ++this.nextCid;
    return cid;
  }
  connect(session, createStatus = false, connectTimeoutMs = _DefaultSocket.DefaultConnectTimeoutMs) {
    if (this.adapter.isOpen()) {
      return Promise.resolve(session);
    }
    const scheme = this.useSSL ? "wss://" : "ws://";
    this.adapter.connect(scheme, this.host, this.port, createStatus, session.token);
    this.adapter.onClose = (evt) => {
      this.ondisconnect(evt);
    };
    this.adapter.onError = (evt) => {
      this.onerror(evt);
    };
    this.adapter.onMessage = (message) => {
      if (this.verbose && window && window.console) {
        console.log("Response: %o", JSON.stringify(message));
      }
      if (!message.cid) {
        if (message.notifications) {
          message.notifications.notifications.forEach((n) => {
            n.content = n.content ? JSON.parse(n.content) : void 0;
            this.onnotification(n);
          });
        } else if (message.voice_joined_event) {
          this.onvoicejoined(message.voice_joined_event);
        } else if (message.voice_leaved_event) {
          this.onvoicejoined(message.voice_leaved_event);
        } else if (message.status_presence_event) {
          this.onstatuspresence(message.status_presence_event);
        } else if (message.stream_presence_event) {
          this.onstreampresence(message.stream_presence_event);
        } else if (message.stream_data) {
          this.onstreamdata(message.stream_data);
        } else if (message.channel_message) {
          try {
            var e = {
              avatar: message.channel_message.avatar,
              channel_id: message.channel_message.channel_id,
              mode: message.channel_message.mode,
              channel_label: message.channel_message.channel_label,
              clan_id: message.channel_message.clan_id,
              code: message.channel_message.code,
              content: JSON.parse(message.channel_message.content),
              create_time: message.channel_message.create_time,
              id: message.channel_message.message_id,
              sender_id: message.channel_message.sender_id,
              update_time: message.channel_message.update_time,
              user_id_one: message.channel_message.user_id_one,
              user_id_two: message.channel_message.user_id_two,
              username: message.channel_message.username,
              reactions: JSON.parse(message.channel_message.reactions),
              mentions: JSON.parse(message.channel_message.mentions),
              attachments: JSON.parse(message.channel_message.attachments),
              references: JSON.parse(message.channel_message.references)
            };
            this.onchannelmessage(e);
          } catch (e2) {
          }
        } else if (message.message_typing_event) {
          this.onmessagetyping(message.message_typing_event);
        } else if (message.message_reaction_event) {
          this.onmessagereaction(message.message_reaction_event);
        } else if (message.message_deleted_event) {
          this.onmessagedeleted(message.message_deleted_event);
        } else if (message.channel_presence_event) {
          this.onchannelpresence(message.channel_presence_event);
        } else if (message.party_data) {
          message.party_data.op_code = parseInt(message.party_data.op_code);
          this.onpartydata(message.party_data);
        } else if (message.party_close) {
          this.onpartyclose(message.party_close);
        } else if (message.party_join_request) {
          this.onpartyjoinrequest(message.party_join_request);
        } else if (message.party_leader) {
          this.onpartyleader(message.party_leader);
        } else if (message.party_presence_event) {
          this.onpartypresence(message.party_presence_event);
        } else if (message.party) {
          this.onparty(message.party);
        } else {
          if (this.verbose && window && window.console) {
            console.log("Unrecognized message received: %o", message);
          }
        }
      } else {
        const executor = this.cIds[message.cid];
        if (!executor) {
          if (this.verbose && window && window.console) {
            console.error("No promise executor for message: %o", message);
          }
          return;
        }
        delete this.cIds[message.cid];
        if (message.error) {
          executor.reject(message.error);
        } else {
          executor.resolve(message);
        }
      }
    };
    return new Promise((resolve, reject) => {
      this.adapter.onOpen = (evt) => {
        if (this.verbose && window && window.console) {
          console.log(evt);
        }
        this.pingPong();
        resolve(session);
      };
      this.adapter.onError = (evt) => {
        reject(evt);
        this.adapter.close();
      };
      setTimeout(() => {
        reject("The socket timed out when trying to connect.");
      }, connectTimeoutMs);
    });
  }
  disconnect(fireDisconnectEvent = true) {
    if (this.adapter.isOpen()) {
      this.adapter.close();
    }
    if (fireDisconnectEvent) {
      this.ondisconnect({});
    }
  }
  setHeartbeatTimeoutMs(ms) {
    this._heartbeatTimeoutMs = ms;
  }
  getHeartbeatTimeoutMs() {
    return this._heartbeatTimeoutMs;
  }
  ondisconnect(evt) {
    if (this.verbose && window && window.console) {
      console.log(evt);
    }
  }
  onerror(evt) {
    if (this.verbose && window && window.console) {
      console.log(evt);
    }
  }
  onmessagetyping(messagetyping) {
    if (this.verbose && window && window.console) {
      console.log(messagetyping);
    }
  }
  onmessagereaction(messagereaction) {
    if (this.verbose && window && window.console) {
      console.log(messagereaction);
    }
  }
  onmessagedeleted(messagedeleted) {
    if (this.verbose && window && window.console) {
      console.log(messagedeleted);
    }
  }
  onchannelmessage(channelMessage) {
    if (this.verbose && window && window.console) {
      console.log(channelMessage);
    }
  }
  onchannelpresence(channelPresence) {
    if (this.verbose && window && window.console) {
      console.log(channelPresence);
    }
  }
  onnotification(notification) {
    if (this.verbose && window && window.console) {
      console.log(notification);
    }
  }
  onparty(party) {
    if (this.verbose && window && window.console) {
      console.log(party);
    }
  }
  onpartyclose(close) {
    if (this.verbose && window && window.console) {
      console.log("Party closed: " + close);
    }
  }
  onpartyjoinrequest(partyJoinRequest) {
    if (this.verbose && window && window.console) {
      console.log(partyJoinRequest);
    }
  }
  onpartydata(partyData) {
    if (this.verbose && window && window.console) {
      console.log(partyData);
    }
  }
  onpartyleader(partyLeader) {
    if (this.verbose && window && window.console) {
      console.log(partyLeader);
    }
  }
  onpartymatchmakerticket(partyMatched) {
    if (this.verbose && window && window.console) {
      console.log(partyMatched);
    }
  }
  onpartypresence(partyPresence) {
    if (this.verbose && window && window.console) {
      console.log(partyPresence);
    }
  }
  onstatuspresence(statusPresence) {
    if (this.verbose && window && window.console) {
      console.log(statusPresence);
    }
  }
  onvoicejoined(voiceParticipant) {
    if (this.verbose && window && window.console) {
      console.log(voiceParticipant);
    }
  }
  onvoiceleaved(voiceParticipant) {
    if (this.verbose && window && window.console) {
      console.log(voiceParticipant);
    }
  }
  onstreampresence(streamPresence) {
    if (this.verbose && window && window.console) {
      console.log(streamPresence);
    }
  }
  onstreamdata(streamData) {
    if (this.verbose && window && window.console) {
      console.log(streamData);
    }
  }
  onheartbeattimeout() {
    if (this.verbose && window && window.console) {
      console.log("Heartbeat timeout.");
    }
  }
  send(message, sendTimeout = _DefaultSocket.DefaultSendTimeoutMs) {
    const untypedMessage = message;
    return new Promise((resolve, reject) => {
      if (!this.adapter.isOpen()) {
        reject("Socket connection has not been established yet.");
      } else {
        if (untypedMessage.party_data_send) {
          this.adapter.send(untypedMessage);
          resolve();
        } else {
          if (untypedMessage.channel_message_send) {
            untypedMessage.channel_message_send.content = JSON.stringify(untypedMessage.channel_message_send.content);
          } else if (untypedMessage.channel_message_update) {
            untypedMessage.channel_message_update.content = JSON.stringify(untypedMessage.channel_message_update.content);
          }
          const cid = this.generatecid();
          this.cIds[cid] = { resolve, reject };
          setTimeout(() => {
            reject("The socket timed out while waiting for a response.");
          }, sendTimeout);
          untypedMessage.cid = cid;
          this.adapter.send(untypedMessage);
        }
      }
      if (this.verbose && window && window.console) {
        const loggedMessage = __spreadValues({}, untypedMessage);
        if (loggedMessage.match_data_send && loggedMessage.match_data_send.data) {
          loggedMessage.match_data_send.data = decode2(loggedMessage.match_data_send.data);
        } else if (loggedMessage.party_data_send && loggedMessage.party_data_send.data) {
          loggedMessage.party_data_send.data = decode2(loggedMessage.party_data_send.data);
        }
        console.log("Sent message: %o", JSON.stringify(loggedMessage));
      }
    });
  }
  acceptPartyMember(party_id, presence) {
    return this.send({ party_accept: { party_id, presence } });
  }
  closeParty(party_id) {
    return __async(this, null, function* () {
      return yield this.send({ party_close: { party_id } });
    });
  }
  createParty(open, max_size) {
    return __async(this, null, function* () {
      const response = yield this.send({ party_create: { open, max_size } });
      return response.party;
    });
  }
  followUsers(userIds) {
    return __async(this, null, function* () {
      const response = yield this.send({ status_follow: { user_ids: userIds } });
      return response.status;
    });
  }
  joinChat(channel_id, channel_label, mode, type, persistence, hidden) {
    return __async(this, null, function* () {
      const response = yield this.send(
        {
          channel_join: {
            channel_id,
            channel_label,
            mode,
            type,
            persistence,
            hidden
          }
        }
      );
      return response.channel;
    });
  }
  joinParty(party_id) {
    return __async(this, null, function* () {
      return yield this.send({ party_join: { party_id } });
    });
  }
  leaveChat(channel_id, channel_label, mode) {
    return this.send({ channel_leave: { channel_id, channel_label, mode } });
  }
  leaveMatch(matchId) {
    return this.send({ match_leave: { match_id: matchId } });
  }
  leaveParty(party_id) {
    return this.send({ party_leave: { party_id } });
  }
  listPartyJoinRequests(party_id) {
    return __async(this, null, function* () {
      const response = yield this.send({ party_join_request_list: { party_id } });
      return response.party_join_request;
    });
  }
  promotePartyMember(party_id, party_member) {
    return __async(this, null, function* () {
      const response = yield this.send({ party_promote: { party_id, presence: party_member } });
      return response.party_leader;
    });
  }
  removeChatMessage(channel_id, channel_label, mode, message_id) {
    return __async(this, null, function* () {
      const response = yield this.send(
        {
          channel_message_remove: {
            channel_id,
            channel_label,
            mode,
            message_id
          }
        }
      );
      return response.channel_message_ack;
    });
  }
  removePartyMember(party_id, member) {
    return __async(this, null, function* () {
      return this.send({ party_remove: {
        party_id,
        presence: member
      } });
    });
  }
  rpc(id, payload, http_key) {
    return __async(this, null, function* () {
      const response = yield this.send(
        {
          rpc: {
            id,
            payload,
            http_key
          }
        }
      );
      return response.rpc;
    });
  }
  sendPartyData(party_id, op_code, data) {
    return this.send({ party_data_send: { party_id, op_code, data } });
  }
  unfollowUsers(user_ids) {
    return this.send({ status_unfollow: { user_ids } });
  }
  updateChatMessage(channel_id, channel_label, mode, message_id, content) {
    return __async(this, null, function* () {
      const response = yield this.send({ channel_message_update: { channel_id, channel_label, message_id, content, mode } });
      return response.channel_message_ack;
    });
  }
  updateStatus(status) {
    return this.send({ status_update: { status } });
  }
  writeChatMessage(clan_id, channel_id, channel_label, mode, content, mentions, attachments, references) {
    return __async(this, null, function* () {
      const response = yield this.send({ channel_message_send: { clan_id, channel_id, channel_label, mode, content, mentions, attachments, references } });
      return response.channel_message_ack;
    });
  }
  writeMessageReaction(id, channel_id, channel_label, mode, message_id, emoji, count, message_sender_id, action_delete) {
    return __async(this, null, function* () {
      const response = yield this.send({ message_reaction_event: { id, channel_id, channel_label, mode, message_id, emoji, count, message_sender_id, action: action_delete } });
      return response.message_reaction_event;
    });
  }
  writeMessageDeleted(channel_id, channel_label, mode, message_id) {
    return __async(this, null, function* () {
      const response = yield this.send({ message_deleted_event: { channel_id, channel_label, mode, message_id } });
      return response.message_deleted_event;
    });
  }
  writeMessageTyping(channel_id, channel_label, mode) {
    return __async(this, null, function* () {
      const response = yield this.send({ message_typing_event: { channel_id, channel_label, mode } });
      return response.message_typing_event;
    });
  }
  writeLastSeenMessage(channel_id, channel_label, mode, message_id) {
    return __async(this, null, function* () {
      const response = yield this.send({ last_seen_message_event: { channel_id, channel_label, mode, message_id } });
      return response.last_seen_message_event;
    });
  }
  writeVoiceJoined(clanId, clanName, id, participant, roomName, lastScreenshot) {
    return __async(this, null, function* () {
      const response = yield this.send({ voice_joined_event: { clan_id: clanId, clan_name: clanName, id, participant, roomName, lastScreenshot } });
      return response.last_seen_message_event;
    });
  }
  writeVoiceLeaved(clanId, clanName, id, participant, roomName) {
    return __async(this, null, function* () {
      const response = yield this.send({ voice_leaved_event: { clan_id: clanId, clan_name: clanName, id, participant, roomName } });
      return response.last_seen_message_event;
    });
  }
  pingPong() {
    return __async(this, null, function* () {
      if (!this.adapter.isOpen()) {
        return;
      }
      try {
        yield this.send({ ping: {} }, this._heartbeatTimeoutMs);
      } catch (e) {
        if (this.adapter.isOpen()) {
          if (window && window.console) {
            console.error("Server unreachable from heartbeat.");
          }
          this.onheartbeattimeout();
          this.adapter.close();
        }
        return;
      }
      setTimeout(() => this.pingPong(), this._heartbeatTimeoutMs);
    });
  }
};
_DefaultSocket.DefaultHeartbeatTimeoutMs = 1e4;
_DefaultSocket.DefaultSendTimeoutMs = 1e4;
_DefaultSocket.DefaultConnectTimeoutMs = 3e4;
var DefaultSocket = _DefaultSocket;

// client.ts
var DEFAULT_HOST = "127.0.0.1";
var DEFAULT_PORT = "7350";
var DEFAULT_SERVER_KEY = "defaultkey";
var DEFAULT_TIMEOUT_MS = 7e3;
var DEFAULT_EXPIRED_TIMESPAN_MS = 5 * 60 * 1e3;
var ChannelType = /* @__PURE__ */ ((ChannelType2) => {
  ChannelType2[ChannelType2["CHANNEL_TYPE_TEXT"] = 1] = "CHANNEL_TYPE_TEXT";
  ChannelType2[ChannelType2["CHANNEL_TYPE_GROUP"] = 2] = "CHANNEL_TYPE_GROUP";
  ChannelType2[ChannelType2["CHANNEL_TYPE_DM"] = 3] = "CHANNEL_TYPE_DM";
  ChannelType2[ChannelType2["CHANNEL_TYPE_VOICE"] = 4] = "CHANNEL_TYPE_VOICE";
  ChannelType2[ChannelType2["CHANNEL_TYPE_FORUM"] = 5] = "CHANNEL_TYPE_FORUM";
  ChannelType2[ChannelType2["CHANNEL_TYPE_ANNOUNCEMENT"] = 6] = "CHANNEL_TYPE_ANNOUNCEMENT";
  return ChannelType2;
})(ChannelType || {});
var ChannelStreamMode = /* @__PURE__ */ ((ChannelStreamMode2) => {
  ChannelStreamMode2[ChannelStreamMode2["STREAM_MODE_CHANNEL"] = 2] = "STREAM_MODE_CHANNEL";
  ChannelStreamMode2[ChannelStreamMode2["STREAM_MODE_GROUP"] = 3] = "STREAM_MODE_GROUP";
  ChannelStreamMode2[ChannelStreamMode2["STREAM_MODE_DM"] = 4] = "STREAM_MODE_DM";
  return ChannelStreamMode2;
})(ChannelStreamMode || {});
var Client = class {
  constructor(serverkey = DEFAULT_SERVER_KEY, host = DEFAULT_HOST, port = DEFAULT_PORT, useSSL = false, timeout = DEFAULT_TIMEOUT_MS, autoRefreshSession = true) {
    this.serverkey = serverkey;
    this.host = host;
    this.port = port;
    this.useSSL = useSSL;
    this.timeout = timeout;
    this.autoRefreshSession = autoRefreshSession;
    /** The expired timespan used to check session lifetime. */
    this.expiredTimespanMs = DEFAULT_EXPIRED_TIMESPAN_MS;
    const scheme = useSSL ? "https://" : "http://";
    const basePath = `${scheme}${host}:${port}`;
    this.apiClient = new MezonApi(serverkey, basePath, timeout);
  }
  /** Add users to a channel, or accept their join requests. */
  addChannelUsers(session, channelId, ids) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.addChannelUsers(session.token, channelId, ids).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Add friends by ID or username to a user's account. */
  addFriends(session, ids, usernames) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.addFriends(session.token, ids, usernames).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Authenticate a user with an Apple ID against the server. */
  authenticateApple(_0, _1, _2) {
    return __async(this, arguments, function* (token, create, username, vars = {}, options = {}) {
      const request = {
        "token": token,
        "vars": vars
      };
      return this.apiClient.authenticateApple(this.serverkey, "", request, create, username, options).then((apiSession) => {
        return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
      });
    });
  }
  /** Authenticate a user with a custom id against the server. */
  authenticateCustom(id, create, username, vars = {}, options = {}) {
    const request = {
      "id": id,
      "vars": vars
    };
    return this.apiClient.authenticateCustom(this.serverkey, "", request, create, username, options).then((apiSession) => {
      return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
    });
  }
  /** Authenticate a user with a device id against the server. */
  authenticateDevice(id, create, username, vars) {
    const request = {
      "id": id,
      "vars": vars
    };
    return this.apiClient.authenticateDevice(this.serverkey, "", request, create, username).then((apiSession) => {
      return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
    });
  }
  /** Authenticate a user with an email+password against the server. */
  authenticateEmail(email, password, create, username, vars) {
    const request = {
      "email": email,
      "password": password,
      "vars": vars
    };
    return this.apiClient.authenticateEmail(this.serverkey, "", request, create, username).then((apiSession) => {
      return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
    });
  }
  /** Authenticate a user with a Facebook Instant Game token against the server. */
  authenticateFacebookInstantGame(signedPlayerInfo, create, username, vars, options = {}) {
    const request = {
      "signed_player_info": signedPlayerInfo,
      "vars": vars
    };
    return this.apiClient.authenticateFacebookInstantGame(
      this.serverkey,
      "",
      { signed_player_info: request.signed_player_info, vars: request.vars },
      create,
      username,
      options
    ).then((apiSession) => {
      return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
    });
  }
  /** Authenticate a user with a Facebook OAuth token against the server. */
  authenticateFacebook(token, create, username, sync, vars, options = {}) {
    const request = {
      "token": token,
      "vars": vars
    };
    return this.apiClient.authenticateFacebook(this.serverkey, "", request, create, username, sync, options).then((apiSession) => {
      return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
    });
  }
  /** Authenticate a user with Google against the server. */
  authenticateGoogle(_0, _1, _2, _3) {
    return __async(this, arguments, function* (token, create, username, vars, options = {}) {
      const request = {
        token,
        vars
      };
      const apiSession = yield this.apiClient.authenticateGoogle(
        this.serverkey,
        "",
        request,
        create,
        username,
        options
      );
      return new Session(
        apiSession.token || "",
        apiSession.refresh_token || "",
        apiSession.created || false
      );
    });
  }
  /** Authenticate a user with GameCenter against the server. */
  authenticateGameCenter(_0, _1, _2, _3, _4, _5, _6, _7, _8) {
    return __async(this, arguments, function* (bundleId, playerId, publicKeyUrl, salt, signature, timestamp, username, create, vars, options = {}) {
      const request = {
        bundle_id: bundleId,
        player_id: playerId,
        public_key_url: publicKeyUrl,
        salt,
        signature,
        timestamp_seconds: timestamp,
        vars
      };
      const apiSession = yield this.apiClient.authenticateGameCenter(
        this.serverkey,
        "",
        request,
        create,
        username,
        options
      );
      return new Session(
        apiSession.token || "",
        apiSession.refresh_token || "",
        apiSession.created || false
      );
    });
  }
  /** Authenticate a user with Steam against the server. */
  authenticateSteam(token, create, username, sync, vars) {
    return __async(this, null, function* () {
      const request = {
        "token": token,
        "vars": vars,
        "sync": sync
      };
      return this.apiClient.authenticateSteam(this.serverkey, "", request, create, username).then((apiSession) => {
        return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
      });
    });
  }
  /** Block one or more users by ID or username. */
  blockFriends(session, ids, usernames) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.blockFriends(session.token, ids, usernames).then((response) => {
        return Promise.resolve(response != void 0);
      });
    });
  }
  /** Create a new group with the current user as the creator and superadmin. */
  uploadAttachmentFile(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.uploadAttachmentFile(session.token, request);
    });
  }
  /** Create a channel within clan */
  createChannelDesc(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.createChannelDesc(session.token, request).then((response) => {
        return Promise.resolve(response);
      });
    });
  }
  /** Create a clan */
  createClanDesc(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.createClanDesc(session.token, request).then((response) => {
        return Promise.resolve(response);
      });
    });
  }
  /**  */
  createCategoryDesc(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.createCategoryDesc(session.token, request).then((response) => {
        return Promise.resolve(response);
      });
    });
  }
  /** Create a new role for clan. */
  createRole(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.createRole(session.token, request).then((response) => {
        return Promise.resolve(response);
      });
    });
  }
  /** A socket created with the client's configuration. */
  createSocket(useSSL = false, verbose = false, adapter = new WebSocketAdapterText(), sendTimeoutMs = DefaultSocket.DefaultSendTimeoutMs) {
    return new DefaultSocket(this.host, this.port, useSSL, verbose, adapter, sendTimeoutMs);
  }
  /** Delete one or more users by ID or username. */
  deleteFriends(session, ids, usernames) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.deleteFriends(session.token, ids, usernames).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Delete a channel by ID. */
  deleteChannelDesc(session, channelId) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.deleteChannelDesc(session.token, channelId).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Delete a clan desc by ID. */
  deleteClanDesc(session, clanDescId) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.deleteClanDesc(session.token, clanDescId).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Delete a category by ID. */
  deleteCategoryDesc(session, creatorId) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.deleteCategoryDesc(session.token, creatorId).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Delete one or more notifications */
  deleteNotifications(session, ids) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.deleteNotifications(session.token, ids).then((response) => {
        return Promise.resolve(response != void 0);
      });
    });
  }
  /** Delete one or more storage objects */
  deleteStorageObjects(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.deleteStorageObjects(session.token, request).then((response) => {
        return Promise.resolve(response != void 0);
      });
    });
  }
  /** Delete a role by ID. */
  deleteRole(session, roleId) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.deleteRole(session.token, roleId).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Submit an event for processing in the server's registered runtime custom events handler. */
  emitEvent(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.event(session.token, request).then((response) => {
        return Promise.resolve(response != void 0);
      });
    });
  }
  /** Fetch the current user's account. */
  getAccount(session) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.getAccount(session.token);
    });
  }
  /** Import Facebook friends and add them to a user's account. */
  importFacebookFriends(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.importFacebookFriends(session.token, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Import Steam friends and add them to a user's account. */
  importSteamFriends(session, request, reset) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.importSteamFriends(session.token, request, reset).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Fetch zero or more users by ID and/or username. */
  getUsers(session, ids, usernames, facebookIds) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.getUsers(session.token, ids, usernames, facebookIds).then((response) => {
        var result = {
          users: []
        };
        if (response.users == null) {
          return Promise.resolve(result);
        }
        response.users.forEach((u) => {
          result.users.push({
            avatar_url: u.avatar_url,
            create_time: u.create_time,
            display_name: u.display_name,
            edge_count: u.edge_count ? Number(u.edge_count) : 0,
            facebook_id: u.facebook_id,
            gamecenter_id: u.gamecenter_id,
            google_id: u.google_id,
            id: u.id,
            lang_tag: u.lang_tag,
            location: u.location,
            online: u.online,
            steam_id: u.steam_id,
            timezone: u.timezone,
            update_time: u.update_time,
            username: u.username,
            metadata: u.metadata ? JSON.parse(u.metadata) : void 0
          });
        });
        return Promise.resolve(result);
      });
    });
  }
  /** Kick users from a channel, or decline their join requests. */
  removeChannelUsers(session, channelId, ids) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.removeChannelUsers(session.token, channelId, ids).then((response) => {
        return Promise.resolve(response != void 0);
      });
    });
  }
  /** List a channel's message history. */
  listChannelMessages(session, channelId, messageId, direction, limit) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.listChannelMessages(session.token, channelId, messageId, direction, limit).then((response) => {
        var result = {
          messages: [],
          last_seen_message_id: response.last_seen_message_id
        };
        if (response.messages == null) {
          return Promise.resolve(result);
        }
        response.messages.forEach((m) => {
          result.messages.push({
            channel_id: m.channel_id,
            code: m.code ? Number(m.code) : 0,
            create_time: m.create_time || "",
            id: m.message_id,
            sender_id: m.sender_id,
            update_time: m.update_time,
            username: m.username,
            avatar: m.avatar,
            content: m.content ? JSON.parse(m.content) : void 0,
            channel_label: m.channel_label,
            user_id_one: m.user_id_one,
            user_id_two: m.user_id_two,
            attachments: m.attachments ? JSON.parse(m.attachments) : [],
            mentions: m.mentions ? JSON.parse(m.mentions) : [],
            reactions: m.reactions ? JSON.parse(m.reactions) : [],
            references: m.references ? JSON.parse(m.references) : []
          });
        });
        return Promise.resolve(result);
      });
    });
  }
  /** List a channel's users. */
  listChannelUsers(session, channelId, channelType, state, limit, cursor) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.listChannelUsers(session.token, channelId, channelType, limit, state, cursor).then((response) => {
        var result = {
          channel_users: [],
          cursor: response.cursor,
          channel_id: response.channel_id
        };
        if (response.channel_users == null) {
          return Promise.resolve(result);
        }
        response.channel_users.forEach((gu) => {
          result.channel_users.push({
            user: {
              avatar_url: gu.user.avatar_url,
              create_time: gu.user.create_time,
              display_name: gu.user.display_name,
              edge_count: gu.user.edge_count ? Number(gu.user.edge_count) : 0,
              facebook_id: gu.user.facebook_id,
              gamecenter_id: gu.user.gamecenter_id,
              google_id: gu.user.google_id,
              id: gu.user.id,
              lang_tag: gu.user.lang_tag,
              location: gu.user.location,
              online: gu.user.online,
              steam_id: gu.user.steam_id,
              timezone: gu.user.timezone,
              update_time: gu.user.update_time,
              username: gu.user.username,
              metadata: gu.user.metadata ? JSON.parse(gu.user.metadata) : void 0
            },
            role_id: gu.role_id
          });
        });
        return Promise.resolve(result);
      });
    });
  }
  /** List a channel's users. */
  listClanUsers(session, clanId) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.listClanUsers(session.token, clanId).then((response) => {
        var result = {
          clan_users: [],
          cursor: response.cursor,
          clan_id: response.clan_id
        };
        if (response.clan_users == null) {
          return Promise.resolve(result);
        }
        response.clan_users.forEach((gu) => {
          result.clan_users.push({
            user: {
              avatar_url: gu.user.avatar_url,
              create_time: gu.user.create_time,
              display_name: gu.user.display_name,
              edge_count: gu.user.edge_count ? Number(gu.user.edge_count) : 0,
              facebook_id: gu.user.facebook_id,
              gamecenter_id: gu.user.gamecenter_id,
              google_id: gu.user.google_id,
              id: gu.user.id,
              lang_tag: gu.user.lang_tag,
              location: gu.user.location,
              online: gu.user.online,
              steam_id: gu.user.steam_id,
              timezone: gu.user.timezone,
              update_time: gu.user.update_time,
              username: gu.user.username,
              metadata: gu.user.metadata ? JSON.parse(gu.user.metadata) : void 0
            },
            role_id: gu.role_id
          });
        });
        return Promise.resolve(result);
      });
    });
  }
  /** List channels. */
  listChannelDescs(session, limit, state, cursor, clanId, channelType) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.listChannelDescs(session.token, limit, state, cursor, clanId, channelType).then((response) => {
        var result = {
          channeldesc: [],
          next_cursor: response.next_cursor,
          prev_cursor: response.prev_cursor,
          cacheable_cursor: response.cacheable_cursor
        };
        if (response.channeldesc == null) {
          return Promise.resolve(result);
        }
        result.channeldesc = response.channeldesc;
        return Promise.resolve(result);
      });
    });
  }
  /** List clans */
  listClanDescs(session, limit, state, cursor) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.listClanDescs(session.token, limit, state, cursor).then((response) => {
        var result = {
          clandesc: []
        };
        if (response.clandesc == null) {
          return Promise.resolve(result);
        }
        result.clandesc = response.clandesc;
        return Promise.resolve(result);
      });
    });
  }
  /** List categories. */
  listCategoryDescs(session, clanId, creatorId, categoryName) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.listCategoryDescs(session.token, clanId, creatorId, categoryName).then((response) => {
        var result = {
          categorydesc: []
        };
        if (response.categorydesc == null) {
          return Promise.resolve(result);
        }
        result.categorydesc = response.categorydesc;
        return Promise.resolve(result);
      });
    });
  }
  /** List user roles */
  listRoles(session, limit, state, cursor, clanId) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.listRoles(session.token, limit, state, cursor, clanId).then((response) => {
        return Promise.resolve(response);
      });
    });
  }
  /** List permission */
  getListPermission(session) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.getListPermission(session.token).then((response) => {
        return Promise.resolve(response);
      });
    });
  }
  /** Update action role when delete role */
  updateRoleDelete(session, roleId, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.updateRoleDelete(session.token, roleId, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** List user roles */
  listRolePermissions(session, roleId) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.listRolePermissions(session.token, roleId).then((response) => {
        return Promise.resolve(response);
      });
    });
  }
  /** List user roles */
  listRoleUsers(session, roleId, limit, cursor) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.listRoleUsers(session.token, roleId, limit, cursor).then((response) => {
        return Promise.resolve(response);
      });
    });
  }
  registFCMDeviceToken(session, tokenId) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.registFCMDeviceToken(session.token, tokenId).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Get a clan desc profile */
  getClanDescProfile(session, clanId) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.getClanDescProfile(session.token, clanId).then((response) => {
        return Promise.resolve(response);
      });
    });
  }
  getUserProfileOnClan(session, clanId) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.getUserProfileOnClan(session.token, clanId).then((response) => {
        return Promise.resolve(response);
      });
    });
  }
  /** Add an Apple ID to the social profiles on the current user's account. */
  linkApple(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.linkApple(session.token, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Add a custom ID to the social profiles on the current user's account. */
  linkCustom(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.linkCustom(session.token, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Add a device ID to the social profiles on the current user's account. */
  linkDevice(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.linkDevice(session.token, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Add an email+password to the social profiles on the current user's account. */
  linkEmail(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.linkEmail(session.token, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Add Facebook to the social profiles on the current user's account. */
  linkFacebook(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.linkFacebook(session.token, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Add Facebook Instant to the social profiles on the current user's account. */
  linkFacebookInstantGame(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.linkFacebookInstantGame(session.token, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Add Google to the social profiles on the current user's account. */
  linkGoogle(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.linkGoogle(session.token, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Add GameCenter to the social profiles on the current user's account. */
  linkGameCenter(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.linkGameCenter(session.token, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Add Steam to the social profiles on the current user's account. */
  linkSteam(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.linkSteam(session.token, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** List all friends for the current user. */
  listFriends(session, state, limit, cursor) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.listFriends(session.token, limit, state, cursor).then((response) => {
        var result = {
          friends: [],
          cursor: response.cursor
        };
        if (response.friends == null) {
          return Promise.resolve(result);
        }
        response.friends.forEach((f) => {
          result.friends.push({
            user: {
              avatar_url: f.user.avatar_url,
              create_time: f.user.create_time,
              display_name: f.user.display_name,
              edge_count: f.user.edge_count ? Number(f.user.edge_count) : 0,
              facebook_id: f.user.facebook_id,
              gamecenter_id: f.user.gamecenter_id,
              google_id: f.user.google_id,
              id: f.user.id,
              lang_tag: f.user.lang_tag,
              location: f.user.location,
              online: f.user.online,
              steam_id: f.user.steam_id,
              timezone: f.user.timezone,
              update_time: f.user.update_time,
              username: f.user.username,
              metadata: f.user.metadata ? JSON.parse(f.user.metadata) : void 0
            },
            state: f.state
          });
        });
        return Promise.resolve(result);
      });
    });
  }
  /** Fetch list of notifications. */
  listNotifications(session, limit, cacheableCursor) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.listNotifications(session.token, limit, cacheableCursor).then((response) => {
        var result = {
          cacheable_cursor: response.cacheable_cursor,
          notifications: []
        };
        if (response.notifications == null) {
          return Promise.resolve(result);
        }
        response.notifications.forEach((n) => {
          result.notifications.push({
            code: n.code ? Number(n.code) : 0,
            create_time: n.create_time,
            id: n.id,
            persistent: n.persistent,
            sender_id: n.sender_id,
            subject: n.subject,
            content: n.content ? JSON.parse(n.content) : void 0
          });
        });
        return Promise.resolve(result);
      });
    });
  }
  /** List storage objects. */
  listStorageObjects(session, collection, userId, limit, cursor) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.listStorageObjects(session.token, collection, userId, limit, cursor).then((response) => {
        var result = {
          objects: [],
          cursor: response.cursor
        };
        if (response.objects == null) {
          return Promise.resolve(result);
        }
        response.objects.forEach((o) => {
          result.objects.push({
            collection: o.collection,
            key: o.key,
            permission_read: o.permission_read ? Number(o.permission_read) : 0,
            permission_write: o.permission_write ? Number(o.permission_write) : 0,
            value: o.value ? JSON.parse(o.value) : void 0,
            version: o.version,
            user_id: o.user_id,
            create_time: o.create_time,
            update_time: o.update_time
          });
        });
        return Promise.resolve(result);
      });
    });
  }
  /** Fetch storage objects. */
  readStorageObjects(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.readStorageObjects(session.token, request).then((response) => {
        var result = { objects: [] };
        if (response.objects == null) {
          return Promise.resolve(result);
        }
        response.objects.forEach((o) => {
          result.objects.push({
            collection: o.collection,
            key: o.key,
            permission_read: o.permission_read ? Number(o.permission_read) : 0,
            permission_write: o.permission_write ? Number(o.permission_write) : 0,
            value: o.value ? JSON.parse(o.value) : void 0,
            version: o.version,
            user_id: o.user_id,
            create_time: o.create_time,
            update_time: o.update_time
          });
        });
        return Promise.resolve(result);
      });
    });
  }
  /** Execute an RPC function on the server. */
  rpc(session, basicAuthUsername, basicAuthPassword, id, input) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.rpcFunc(session.token, basicAuthUsername, basicAuthPassword, id, JSON.stringify(input)).then((response) => {
        return Promise.resolve({
          id: response.id,
          payload: !response.payload ? void 0 : JSON.parse(response.payload)
        });
      });
    });
  }
  /** Execute an RPC function on the server. */
  rpcHttpKey(httpKey, id, input) {
    return __async(this, null, function* () {
      return this.apiClient.rpcFunc2("", id, input && JSON.stringify(input) || "", httpKey).then((response) => {
        return Promise.resolve({
          id: response.id,
          payload: !response.payload ? void 0 : JSON.parse(response.payload)
        });
      }).catch((err) => {
        throw err;
      });
    });
  }
  /** Log out a session, invalidate a refresh token, or log out all sessions/refresh tokens for a user. */
  sessionLogout(session, token, refreshToken) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.sessionLogout(session.token, { refresh_token: refreshToken, token }).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Refresh a user's session using a refresh token retrieved from a previous authentication request. */
  sessionRefresh(_0) {
    return __async(this, arguments, function* (session, vars = {}) {
      if (!session) {
        console.error("Cannot refresh a null session.");
        return session;
      }
      if (session.created && session.expires_at - session.created_at < 70) {
        console.warn("Session lifetime too short, please set '--session.token_expiry_sec' option. See the documentation for more info: https://heroiclabs.com/docs/mezon/getting-started/configuration/#session");
      }
      if (session.created && session.refresh_expires_at - session.created_at < 3700) {
        console.warn("Session refresh lifetime too short, please set '--session.refresh_token_expiry_sec' option. See the documentation for more info: https://heroiclabs.com/docs/mezon/getting-started/configuration/#session");
      }
      const apiSession = yield this.apiClient.sessionRefresh(this.serverkey, "", { token: session.refresh_token, vars });
      session.update(apiSession.token, apiSession.refresh_token);
      return session;
    });
  }
  /** Remove the Apple ID from the social profiles on the current user's account. */
  unlinkApple(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.unlinkApple(session.token, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Remove custom ID from the social profiles on the current user's account. */
  unlinkCustom(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.unlinkCustom(session.token, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Remove a device ID from the social profiles on the current user's account. */
  unlinkDevice(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.unlinkDevice(session.token, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Remove an email+password from the social profiles on the current user's account. */
  unlinkEmail(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.unlinkEmail(session.token, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Remove Facebook from the social profiles on the current user's account. */
  unlinkFacebook(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.unlinkFacebook(session.token, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Remove Facebook Instant social profiles from the current user's account. */
  unlinkFacebookInstantGame(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.unlinkFacebookInstantGame(session.token, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Remove Google from the social profiles on the current user's account. */
  unlinkGoogle(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.unlinkGoogle(session.token, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Remove GameCenter from the social profiles on the current user's account. */
  unlinkGameCenter(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.unlinkGameCenter(session.token, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Remove Steam from the social profiles on the current user's account. */
  unlinkSteam(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.unlinkSteam(session.token, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Update fields in the current user's account. */
  updateAccount(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.updateAccount(session.token, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Update fields in a given channel */
  updateChannelDesc(session, channelId, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.updateChannelDesc(session.token, channelId, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Update fields in a given clan. */
  updateClanDesc(session, clanId, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.updateClanDesc(session.token, clanId, request == null ? void 0 : request.creator_id, request == null ? void 0 : request.clan_name, request == null ? void 0 : request.logo, request == null ? void 0 : request.banner).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Update fields in a given category. */
  updateCategory(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.updateCategory(session.token, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Update fields in a given clan profile. */
  updateClanDescProfile(session, clanId, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.updateClanDescProfile(session.token, clanId, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  updateUserProfileByClan(session, clanId, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.updateUserProfileByClan(session.token, clanId, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Update fields in a given role. */
  updateRole(session, roleId, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.updateRole(session.token, roleId, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Update fields in a given clan profile. */
  createLinkInviteUser(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.createLinkInviteUser(session.token, request).then((response) => {
        return Promise.resolve(response);
      });
    });
  }
  /** Get link invite user */
  getLinkInvite(session, inviteId) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.getLinkInvite(session.token, inviteId).then((response) => {
        return Promise.resolve(response);
      });
    });
  }
  /** Get permission of user in the clan */
  GetPermissionOfUserInTheClan(session, clanId) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.GetPermissionOfUserInTheClan(session.token, clanId).then((response) => {
        return Promise.resolve(response);
      });
    });
  }
  /** invite user */
  inviteUser(session, inviteId) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.inviteUser(session.token, inviteId).then((response) => {
        return Promise.resolve(response);
      });
    });
  }
  /** Write storage objects. */
  writeStorageObjects(session, objects) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      var request = { objects: [] };
      objects.forEach((o) => {
        request.objects.push({
          collection: o.collection,
          key: o.key,
          permission_read: o.permission_read,
          permission_write: o.permission_write,
          value: JSON.stringify(o.value),
          version: o.version
        });
      });
      return this.apiClient.writeStorageObjects(session.token, request);
    });
  }
};
export {
  ChannelStreamMode,
  ChannelType,
  Client,
  DefaultSocket,
  Session,
  WebSocketAdapterText
};
