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
var global2 = typeof globalThis !== "undefined" && globalThis || typeof self !== "undefined" && self || typeof global2 !== "undefined" && global2;
var support = {
  searchParams: "URLSearchParams" in global2,
  iterable: "Symbol" in global2 && "iterator" in Symbol,
  blob: "FileReader" in global2 && "Blob" in global2 && function() {
    try {
      new Blob();
      return true;
    } catch (e) {
      return false;
    }
  }(),
  formData: "FormData" in global2,
  arrayBuffer: "ArrayBuffer" in global2
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
var DOMException = global2.DOMException;
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
        return url === "" && global2.location.href ? global2.location.href : url;
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
if (!global2.fetch) {
  global2.fetch = fetch2;
  global2.Headers = Headers;
  global2.Request = Request;
  global2.Response = Response;
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
  listChannelMessages(bearerToken, channelId, limit, forward, cursor, options = {}) {
    if (channelId === null || channelId === void 0) {
      throw new Error("'channelId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/channel/{channelId}".replace("{channelId}", encodeURIComponent(String(channelId)));
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("limit", limit);
    queryParams.set("forward", forward);
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
  listChannelUsers(bearerToken, channelId, limit, state, cursor, options = {}) {
    if (channelId === null || channelId === void 0) {
      throw new Error("'channelId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/channeldesc/{channelId}/user".replace("{channelId}", encodeURIComponent(String(channelId)));
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
  /** List groups based on given filters. */
  listGroups(bearerToken, name, cursor, limit, langTag, members, open, options = {}) {
    const urlPath = "/v2/group";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("name", name);
    queryParams.set("cursor", cursor);
    queryParams.set("limit", limit);
    queryParams.set("lang_tag", langTag);
    queryParams.set("members", members);
    queryParams.set("open", open);
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
  /** Create a new group with the current user as the owner. */
  createGroup(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/group";
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
  /** Delete a group by ID. */
  deleteGroup(bearerToken, groupId, options = {}) {
    if (groupId === null || groupId === void 0) {
      throw new Error("'groupId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/group/{groupId}".replace("{groupId}", encodeURIComponent(String(groupId)));
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
  /** Update fields in a given group. */
  updateGroup(bearerToken, groupId, body, options = {}) {
    if (groupId === null || groupId === void 0) {
      throw new Error("'groupId' is a required parameter but is null or undefined.");
    }
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/group/{groupId}".replace("{groupId}", encodeURIComponent(String(groupId)));
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
  /** Add users to a group. */
  addGroupUsers(bearerToken, groupId, userIds, options = {}) {
    if (groupId === null || groupId === void 0) {
      throw new Error("'groupId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/group/{groupId}/add".replace("{groupId}", encodeURIComponent(String(groupId)));
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
  /** Ban a set of users from a group. */
  banGroupUsers(bearerToken, groupId, userIds, options = {}) {
    if (groupId === null || groupId === void 0) {
      throw new Error("'groupId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/group/{groupId}/ban".replace("{groupId}", encodeURIComponent(String(groupId)));
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
  /** Demote a set of users in a group to the next role down. */
  demoteGroupUsers(bearerToken, groupId, userIds, options = {}) {
    if (groupId === null || groupId === void 0) {
      throw new Error("'groupId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/group/{groupId}/demote".replace("{groupId}", encodeURIComponent(String(groupId)));
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
  /** Immediately join an open group, or request to join a closed one. */
  joinGroup(bearerToken, groupId, options = {}) {
    if (groupId === null || groupId === void 0) {
      throw new Error("'groupId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/group/{groupId}/join".replace("{groupId}", encodeURIComponent(String(groupId)));
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
  /** Leave a group the user is a member of. */
  leaveGroup(bearerToken, groupId, options = {}) {
    if (groupId === null || groupId === void 0) {
      throw new Error("'groupId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/group/{groupId}/leave".replace("{groupId}", encodeURIComponent(String(groupId)));
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
  /** Promote a set of users in a group to the next role up. */
  promoteGroupUsers(bearerToken, groupId, userIds, options = {}) {
    if (groupId === null || groupId === void 0) {
      throw new Error("'groupId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/group/{groupId}/promote".replace("{groupId}", encodeURIComponent(String(groupId)));
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
  /** Kick a set of users from a group. */
  kickGroupUsers(bearerToken, groupId, userIds, options = {}) {
    if (groupId === null || groupId === void 0) {
      throw new Error("'groupId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/group/{groupId}/remove".replace("{groupId}", encodeURIComponent(String(groupId)));
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
  /** List all users that are part of a group. */
  listGroupUsers(bearerToken, groupId, limit, state, cursor, options = {}) {
    if (groupId === null || groupId === void 0) {
      throw new Error("'groupId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/group/{groupId}/user".replace("{groupId}", encodeURIComponent(String(groupId)));
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
  /** List groups the current user belongs to. */
  listUserGroups(bearerToken, userId, limit, state, cursor, options = {}) {
    if (userId === null || userId === void 0) {
      throw new Error("'userId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/user/{userId}/group".replace("{userId}", encodeURIComponent(String(userId)));
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

// ../mezon-js-protobuf/dist/mezon-js-protobuf.esm.mjs
var __create = Object.create;
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod2) => function __require() {
  return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp2.call(to, key) && key !== except)
        __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod2 || !mod2.__esModule ? __defProp2(target, "default", { value: mod2, enumerable: true }) : target,
  mod2
));
var require_long = __commonJS({
  "../../node_modules/long/src/long.js"(exports2, module2) {
    module2.exports = Long5;
    var wasm = null;
    try {
      wasm = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([
        0,
        97,
        115,
        109,
        1,
        0,
        0,
        0,
        1,
        13,
        2,
        96,
        0,
        1,
        127,
        96,
        4,
        127,
        127,
        127,
        127,
        1,
        127,
        3,
        7,
        6,
        0,
        1,
        1,
        1,
        1,
        1,
        6,
        6,
        1,
        127,
        1,
        65,
        0,
        11,
        7,
        50,
        6,
        3,
        109,
        117,
        108,
        0,
        1,
        5,
        100,
        105,
        118,
        95,
        115,
        0,
        2,
        5,
        100,
        105,
        118,
        95,
        117,
        0,
        3,
        5,
        114,
        101,
        109,
        95,
        115,
        0,
        4,
        5,
        114,
        101,
        109,
        95,
        117,
        0,
        5,
        8,
        103,
        101,
        116,
        95,
        104,
        105,
        103,
        104,
        0,
        0,
        10,
        191,
        1,
        6,
        4,
        0,
        35,
        0,
        11,
        36,
        1,
        1,
        126,
        32,
        0,
        173,
        32,
        1,
        173,
        66,
        32,
        134,
        132,
        32,
        2,
        173,
        32,
        3,
        173,
        66,
        32,
        134,
        132,
        126,
        34,
        4,
        66,
        32,
        135,
        167,
        36,
        0,
        32,
        4,
        167,
        11,
        36,
        1,
        1,
        126,
        32,
        0,
        173,
        32,
        1,
        173,
        66,
        32,
        134,
        132,
        32,
        2,
        173,
        32,
        3,
        173,
        66,
        32,
        134,
        132,
        127,
        34,
        4,
        66,
        32,
        135,
        167,
        36,
        0,
        32,
        4,
        167,
        11,
        36,
        1,
        1,
        126,
        32,
        0,
        173,
        32,
        1,
        173,
        66,
        32,
        134,
        132,
        32,
        2,
        173,
        32,
        3,
        173,
        66,
        32,
        134,
        132,
        128,
        34,
        4,
        66,
        32,
        135,
        167,
        36,
        0,
        32,
        4,
        167,
        11,
        36,
        1,
        1,
        126,
        32,
        0,
        173,
        32,
        1,
        173,
        66,
        32,
        134,
        132,
        32,
        2,
        173,
        32,
        3,
        173,
        66,
        32,
        134,
        132,
        129,
        34,
        4,
        66,
        32,
        135,
        167,
        36,
        0,
        32,
        4,
        167,
        11,
        36,
        1,
        1,
        126,
        32,
        0,
        173,
        32,
        1,
        173,
        66,
        32,
        134,
        132,
        32,
        2,
        173,
        32,
        3,
        173,
        66,
        32,
        134,
        132,
        130,
        34,
        4,
        66,
        32,
        135,
        167,
        36,
        0,
        32,
        4,
        167,
        11
      ])), {}).exports;
    } catch (e) {
    }
    function Long5(low, high, unsigned) {
      this.low = low | 0;
      this.high = high | 0;
      this.unsigned = !!unsigned;
    }
    Long5.prototype.__isLong__;
    Object.defineProperty(Long5.prototype, "__isLong__", { value: true });
    function isLong(obj) {
      return (obj && obj["__isLong__"]) === true;
    }
    Long5.isLong = isLong;
    var INT_CACHE = {};
    var UINT_CACHE = {};
    function fromInt(value, unsigned) {
      var obj, cachedObj, cache;
      if (unsigned) {
        value >>>= 0;
        if (cache = 0 <= value && value < 256) {
          cachedObj = UINT_CACHE[value];
          if (cachedObj)
            return cachedObj;
        }
        obj = fromBits(value, (value | 0) < 0 ? -1 : 0, true);
        if (cache)
          UINT_CACHE[value] = obj;
        return obj;
      } else {
        value |= 0;
        if (cache = -128 <= value && value < 128) {
          cachedObj = INT_CACHE[value];
          if (cachedObj)
            return cachedObj;
        }
        obj = fromBits(value, value < 0 ? -1 : 0, false);
        if (cache)
          INT_CACHE[value] = obj;
        return obj;
      }
    }
    Long5.fromInt = fromInt;
    function fromNumber(value, unsigned) {
      if (isNaN(value))
        return unsigned ? UZERO : ZERO;
      if (unsigned) {
        if (value < 0)
          return UZERO;
        if (value >= TWO_PWR_64_DBL)
          return MAX_UNSIGNED_VALUE;
      } else {
        if (value <= -TWO_PWR_63_DBL)
          return MIN_VALUE;
        if (value + 1 >= TWO_PWR_63_DBL)
          return MAX_VALUE;
      }
      if (value < 0)
        return fromNumber(-value, unsigned).neg();
      return fromBits(value % TWO_PWR_32_DBL | 0, value / TWO_PWR_32_DBL | 0, unsigned);
    }
    Long5.fromNumber = fromNumber;
    function fromBits(lowBits, highBits, unsigned) {
      return new Long5(lowBits, highBits, unsigned);
    }
    Long5.fromBits = fromBits;
    var pow_dbl = Math.pow;
    function fromString(str, unsigned, radix) {
      if (str.length === 0)
        throw Error("empty string");
      if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
        return ZERO;
      if (typeof unsigned === "number") {
        radix = unsigned, unsigned = false;
      } else {
        unsigned = !!unsigned;
      }
      radix = radix || 10;
      if (radix < 2 || 36 < radix)
        throw RangeError("radix");
      var p;
      if ((p = str.indexOf("-")) > 0)
        throw Error("interior hyphen");
      else if (p === 0) {
        return fromString(str.substring(1), unsigned, radix).neg();
      }
      var radixToPower = fromNumber(pow_dbl(radix, 8));
      var result = ZERO;
      for (var i = 0; i < str.length; i += 8) {
        var size = Math.min(8, str.length - i), value = parseInt(str.substring(i, i + size), radix);
        if (size < 8) {
          var power = fromNumber(pow_dbl(radix, size));
          result = result.mul(power).add(fromNumber(value));
        } else {
          result = result.mul(radixToPower);
          result = result.add(fromNumber(value));
        }
      }
      result.unsigned = unsigned;
      return result;
    }
    Long5.fromString = fromString;
    function fromValue(val, unsigned) {
      if (typeof val === "number")
        return fromNumber(val, unsigned);
      if (typeof val === "string")
        return fromString(val, unsigned);
      return fromBits(val.low, val.high, typeof unsigned === "boolean" ? unsigned : val.unsigned);
    }
    Long5.fromValue = fromValue;
    var TWO_PWR_16_DBL = 1 << 16;
    var TWO_PWR_24_DBL = 1 << 24;
    var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;
    var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;
    var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;
    var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);
    var ZERO = fromInt(0);
    Long5.ZERO = ZERO;
    var UZERO = fromInt(0, true);
    Long5.UZERO = UZERO;
    var ONE = fromInt(1);
    Long5.ONE = ONE;
    var UONE = fromInt(1, true);
    Long5.UONE = UONE;
    var NEG_ONE = fromInt(-1);
    Long5.NEG_ONE = NEG_ONE;
    var MAX_VALUE = fromBits(4294967295 | 0, 2147483647 | 0, false);
    Long5.MAX_VALUE = MAX_VALUE;
    var MAX_UNSIGNED_VALUE = fromBits(4294967295 | 0, 4294967295 | 0, true);
    Long5.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;
    var MIN_VALUE = fromBits(0, 2147483648 | 0, false);
    Long5.MIN_VALUE = MIN_VALUE;
    var LongPrototype = Long5.prototype;
    LongPrototype.toInt = function toInt() {
      return this.unsigned ? this.low >>> 0 : this.low;
    };
    LongPrototype.toNumber = function toNumber() {
      if (this.unsigned)
        return (this.high >>> 0) * TWO_PWR_32_DBL + (this.low >>> 0);
      return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
    };
    LongPrototype.toString = function toString(radix) {
      radix = radix || 10;
      if (radix < 2 || 36 < radix)
        throw RangeError("radix");
      if (this.isZero())
        return "0";
      if (this.isNegative()) {
        if (this.eq(MIN_VALUE)) {
          var radixLong = fromNumber(radix), div = this.div(radixLong), rem1 = div.mul(radixLong).sub(this);
          return div.toString(radix) + rem1.toInt().toString(radix);
        } else
          return "-" + this.neg().toString(radix);
      }
      var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned), rem = this;
      var result = "";
      while (true) {
        var remDiv = rem.div(radixToPower), intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0, digits = intval.toString(radix);
        rem = remDiv;
        if (rem.isZero())
          return digits + result;
        else {
          while (digits.length < 6)
            digits = "0" + digits;
          result = "" + digits + result;
        }
      }
    };
    LongPrototype.getHighBits = function getHighBits() {
      return this.high;
    };
    LongPrototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
      return this.high >>> 0;
    };
    LongPrototype.getLowBits = function getLowBits() {
      return this.low;
    };
    LongPrototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
      return this.low >>> 0;
    };
    LongPrototype.getNumBitsAbs = function getNumBitsAbs() {
      if (this.isNegative())
        return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
      var val = this.high != 0 ? this.high : this.low;
      for (var bit = 31; bit > 0; bit--)
        if ((val & 1 << bit) != 0)
          break;
      return this.high != 0 ? bit + 33 : bit + 1;
    };
    LongPrototype.isZero = function isZero() {
      return this.high === 0 && this.low === 0;
    };
    LongPrototype.eqz = LongPrototype.isZero;
    LongPrototype.isNegative = function isNegative() {
      return !this.unsigned && this.high < 0;
    };
    LongPrototype.isPositive = function isPositive() {
      return this.unsigned || this.high >= 0;
    };
    LongPrototype.isOdd = function isOdd() {
      return (this.low & 1) === 1;
    };
    LongPrototype.isEven = function isEven() {
      return (this.low & 1) === 0;
    };
    LongPrototype.equals = function equals(other) {
      if (!isLong(other))
        other = fromValue(other);
      if (this.unsigned !== other.unsigned && this.high >>> 31 === 1 && other.high >>> 31 === 1)
        return false;
      return this.high === other.high && this.low === other.low;
    };
    LongPrototype.eq = LongPrototype.equals;
    LongPrototype.notEquals = function notEquals(other) {
      return !this.eq(
        /* validates */
        other
      );
    };
    LongPrototype.neq = LongPrototype.notEquals;
    LongPrototype.ne = LongPrototype.notEquals;
    LongPrototype.lessThan = function lessThan(other) {
      return this.comp(
        /* validates */
        other
      ) < 0;
    };
    LongPrototype.lt = LongPrototype.lessThan;
    LongPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
      return this.comp(
        /* validates */
        other
      ) <= 0;
    };
    LongPrototype.lte = LongPrototype.lessThanOrEqual;
    LongPrototype.le = LongPrototype.lessThanOrEqual;
    LongPrototype.greaterThan = function greaterThan(other) {
      return this.comp(
        /* validates */
        other
      ) > 0;
    };
    LongPrototype.gt = LongPrototype.greaterThan;
    LongPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
      return this.comp(
        /* validates */
        other
      ) >= 0;
    };
    LongPrototype.gte = LongPrototype.greaterThanOrEqual;
    LongPrototype.ge = LongPrototype.greaterThanOrEqual;
    LongPrototype.compare = function compare(other) {
      if (!isLong(other))
        other = fromValue(other);
      if (this.eq(other))
        return 0;
      var thisNeg = this.isNegative(), otherNeg = other.isNegative();
      if (thisNeg && !otherNeg)
        return -1;
      if (!thisNeg && otherNeg)
        return 1;
      if (!this.unsigned)
        return this.sub(other).isNegative() ? -1 : 1;
      return other.high >>> 0 > this.high >>> 0 || other.high === this.high && other.low >>> 0 > this.low >>> 0 ? -1 : 1;
    };
    LongPrototype.comp = LongPrototype.compare;
    LongPrototype.negate = function negate() {
      if (!this.unsigned && this.eq(MIN_VALUE))
        return MIN_VALUE;
      return this.not().add(ONE);
    };
    LongPrototype.neg = LongPrototype.negate;
    LongPrototype.add = function add(addend) {
      if (!isLong(addend))
        addend = fromValue(addend);
      var a48 = this.high >>> 16;
      var a32 = this.high & 65535;
      var a16 = this.low >>> 16;
      var a00 = this.low & 65535;
      var b48 = addend.high >>> 16;
      var b32 = addend.high & 65535;
      var b16 = addend.low >>> 16;
      var b00 = addend.low & 65535;
      var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
      c00 += a00 + b00;
      c16 += c00 >>> 16;
      c00 &= 65535;
      c16 += a16 + b16;
      c32 += c16 >>> 16;
      c16 &= 65535;
      c32 += a32 + b32;
      c48 += c32 >>> 16;
      c32 &= 65535;
      c48 += a48 + b48;
      c48 &= 65535;
      return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
    };
    LongPrototype.subtract = function subtract(subtrahend) {
      if (!isLong(subtrahend))
        subtrahend = fromValue(subtrahend);
      return this.add(subtrahend.neg());
    };
    LongPrototype.sub = LongPrototype.subtract;
    LongPrototype.multiply = function multiply(multiplier) {
      if (this.isZero())
        return ZERO;
      if (!isLong(multiplier))
        multiplier = fromValue(multiplier);
      if (wasm) {
        var low = wasm.mul(
          this.low,
          this.high,
          multiplier.low,
          multiplier.high
        );
        return fromBits(low, wasm.get_high(), this.unsigned);
      }
      if (multiplier.isZero())
        return ZERO;
      if (this.eq(MIN_VALUE))
        return multiplier.isOdd() ? MIN_VALUE : ZERO;
      if (multiplier.eq(MIN_VALUE))
        return this.isOdd() ? MIN_VALUE : ZERO;
      if (this.isNegative()) {
        if (multiplier.isNegative())
          return this.neg().mul(multiplier.neg());
        else
          return this.neg().mul(multiplier).neg();
      } else if (multiplier.isNegative())
        return this.mul(multiplier.neg()).neg();
      if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24))
        return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);
      var a48 = this.high >>> 16;
      var a32 = this.high & 65535;
      var a16 = this.low >>> 16;
      var a00 = this.low & 65535;
      var b48 = multiplier.high >>> 16;
      var b32 = multiplier.high & 65535;
      var b16 = multiplier.low >>> 16;
      var b00 = multiplier.low & 65535;
      var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
      c00 += a00 * b00;
      c16 += c00 >>> 16;
      c00 &= 65535;
      c16 += a16 * b00;
      c32 += c16 >>> 16;
      c16 &= 65535;
      c16 += a00 * b16;
      c32 += c16 >>> 16;
      c16 &= 65535;
      c32 += a32 * b00;
      c48 += c32 >>> 16;
      c32 &= 65535;
      c32 += a16 * b16;
      c48 += c32 >>> 16;
      c32 &= 65535;
      c32 += a00 * b32;
      c48 += c32 >>> 16;
      c32 &= 65535;
      c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
      c48 &= 65535;
      return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
    };
    LongPrototype.mul = LongPrototype.multiply;
    LongPrototype.divide = function divide(divisor) {
      if (!isLong(divisor))
        divisor = fromValue(divisor);
      if (divisor.isZero())
        throw Error("division by zero");
      if (wasm) {
        if (!this.unsigned && this.high === -2147483648 && divisor.low === -1 && divisor.high === -1) {
          return this;
        }
        var low = (this.unsigned ? wasm.div_u : wasm.div_s)(
          this.low,
          this.high,
          divisor.low,
          divisor.high
        );
        return fromBits(low, wasm.get_high(), this.unsigned);
      }
      if (this.isZero())
        return this.unsigned ? UZERO : ZERO;
      var approx, rem, res;
      if (!this.unsigned) {
        if (this.eq(MIN_VALUE)) {
          if (divisor.eq(ONE) || divisor.eq(NEG_ONE))
            return MIN_VALUE;
          else if (divisor.eq(MIN_VALUE))
            return ONE;
          else {
            var halfThis = this.shr(1);
            approx = halfThis.div(divisor).shl(1);
            if (approx.eq(ZERO)) {
              return divisor.isNegative() ? ONE : NEG_ONE;
            } else {
              rem = this.sub(divisor.mul(approx));
              res = approx.add(rem.div(divisor));
              return res;
            }
          }
        } else if (divisor.eq(MIN_VALUE))
          return this.unsigned ? UZERO : ZERO;
        if (this.isNegative()) {
          if (divisor.isNegative())
            return this.neg().div(divisor.neg());
          return this.neg().div(divisor).neg();
        } else if (divisor.isNegative())
          return this.div(divisor.neg()).neg();
        res = ZERO;
      } else {
        if (!divisor.unsigned)
          divisor = divisor.toUnsigned();
        if (divisor.gt(this))
          return UZERO;
        if (divisor.gt(this.shru(1)))
          return UONE;
        res = UZERO;
      }
      rem = this;
      while (rem.gte(divisor)) {
        approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));
        var log2 = Math.ceil(Math.log(approx) / Math.LN2), delta = log2 <= 48 ? 1 : pow_dbl(2, log2 - 48), approxRes = fromNumber(approx), approxRem = approxRes.mul(divisor);
        while (approxRem.isNegative() || approxRem.gt(rem)) {
          approx -= delta;
          approxRes = fromNumber(approx, this.unsigned);
          approxRem = approxRes.mul(divisor);
        }
        if (approxRes.isZero())
          approxRes = ONE;
        res = res.add(approxRes);
        rem = rem.sub(approxRem);
      }
      return res;
    };
    LongPrototype.div = LongPrototype.divide;
    LongPrototype.modulo = function modulo(divisor) {
      if (!isLong(divisor))
        divisor = fromValue(divisor);
      if (wasm) {
        var low = (this.unsigned ? wasm.rem_u : wasm.rem_s)(
          this.low,
          this.high,
          divisor.low,
          divisor.high
        );
        return fromBits(low, wasm.get_high(), this.unsigned);
      }
      return this.sub(this.div(divisor).mul(divisor));
    };
    LongPrototype.mod = LongPrototype.modulo;
    LongPrototype.rem = LongPrototype.modulo;
    LongPrototype.not = function not() {
      return fromBits(~this.low, ~this.high, this.unsigned);
    };
    LongPrototype.and = function and(other) {
      if (!isLong(other))
        other = fromValue(other);
      return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
    };
    LongPrototype.or = function or(other) {
      if (!isLong(other))
        other = fromValue(other);
      return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
    };
    LongPrototype.xor = function xor(other) {
      if (!isLong(other))
        other = fromValue(other);
      return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
    };
    LongPrototype.shiftLeft = function shiftLeft(numBits) {
      if (isLong(numBits))
        numBits = numBits.toInt();
      if ((numBits &= 63) === 0)
        return this;
      else if (numBits < 32)
        return fromBits(this.low << numBits, this.high << numBits | this.low >>> 32 - numBits, this.unsigned);
      else
        return fromBits(0, this.low << numBits - 32, this.unsigned);
    };
    LongPrototype.shl = LongPrototype.shiftLeft;
    LongPrototype.shiftRight = function shiftRight(numBits) {
      if (isLong(numBits))
        numBits = numBits.toInt();
      if ((numBits &= 63) === 0)
        return this;
      else if (numBits < 32)
        return fromBits(this.low >>> numBits | this.high << 32 - numBits, this.high >> numBits, this.unsigned);
      else
        return fromBits(this.high >> numBits - 32, this.high >= 0 ? 0 : -1, this.unsigned);
    };
    LongPrototype.shr = LongPrototype.shiftRight;
    LongPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
      if (isLong(numBits))
        numBits = numBits.toInt();
      numBits &= 63;
      if (numBits === 0)
        return this;
      else {
        var high = this.high;
        if (numBits < 32) {
          var low = this.low;
          return fromBits(low >>> numBits | high << 32 - numBits, high >>> numBits, this.unsigned);
        } else if (numBits === 32)
          return fromBits(high, 0, this.unsigned);
        else
          return fromBits(high >>> numBits - 32, 0, this.unsigned);
      }
    };
    LongPrototype.shru = LongPrototype.shiftRightUnsigned;
    LongPrototype.shr_u = LongPrototype.shiftRightUnsigned;
    LongPrototype.toSigned = function toSigned() {
      if (!this.unsigned)
        return this;
      return fromBits(this.low, this.high, false);
    };
    LongPrototype.toUnsigned = function toUnsigned() {
      if (this.unsigned)
        return this;
      return fromBits(this.low, this.high, true);
    };
    LongPrototype.toBytes = function toBytes(le) {
      return le ? this.toBytesLE() : this.toBytesBE();
    };
    LongPrototype.toBytesLE = function toBytesLE() {
      var hi = this.high, lo = this.low;
      return [
        lo & 255,
        lo >>> 8 & 255,
        lo >>> 16 & 255,
        lo >>> 24,
        hi & 255,
        hi >>> 8 & 255,
        hi >>> 16 & 255,
        hi >>> 24
      ];
    };
    LongPrototype.toBytesBE = function toBytesBE() {
      var hi = this.high, lo = this.low;
      return [
        hi >>> 24,
        hi >>> 16 & 255,
        hi >>> 8 & 255,
        hi & 255,
        lo >>> 24,
        lo >>> 16 & 255,
        lo >>> 8 & 255,
        lo & 255
      ];
    };
    Long5.fromBytes = function fromBytes(bytes, unsigned, le) {
      return le ? Long5.fromBytesLE(bytes, unsigned) : Long5.fromBytesBE(bytes, unsigned);
    };
    Long5.fromBytesLE = function fromBytesLE(bytes, unsigned) {
      return new Long5(
        bytes[0] | bytes[1] << 8 | bytes[2] << 16 | bytes[3] << 24,
        bytes[4] | bytes[5] << 8 | bytes[6] << 16 | bytes[7] << 24,
        unsigned
      );
    };
    Long5.fromBytesBE = function fromBytesBE(bytes, unsigned) {
      return new Long5(
        bytes[4] << 24 | bytes[5] << 16 | bytes[6] << 8 | bytes[7],
        bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3],
        unsigned
      );
    };
  }
});
var require_aspromise = __commonJS({
  "../../node_modules/@protobufjs/aspromise/index.js"(exports2, module2) {
    "use strict";
    module2.exports = asPromise;
    function asPromise(fn, ctx) {
      var params = new Array(arguments.length - 1), offset = 0, index = 2, pending = true;
      while (index < arguments.length)
        params[offset++] = arguments[index++];
      return new Promise(function executor(resolve, reject) {
        params[offset] = function callback(err) {
          if (pending) {
            pending = false;
            if (err)
              reject(err);
            else {
              var params2 = new Array(arguments.length - 1), offset2 = 0;
              while (offset2 < params2.length)
                params2[offset2++] = arguments[offset2];
              resolve.apply(null, params2);
            }
          }
        };
        try {
          fn.apply(ctx || null, params);
        } catch (err) {
          if (pending) {
            pending = false;
            reject(err);
          }
        }
      });
    }
  }
});
var require_base64 = __commonJS({
  "../../node_modules/@protobufjs/base64/index.js"(exports2) {
    "use strict";
    var base64 = exports2;
    base64.length = function length(string) {
      var p = string.length;
      if (!p)
        return 0;
      var n = 0;
      while (--p % 4 > 1 && string.charAt(p) === "=")
        ++n;
      return Math.ceil(string.length * 3) / 4 - n;
    };
    var b64 = new Array(64);
    var s64 = new Array(123);
    for (i = 0; i < 64; )
      s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;
    var i;
    base64.encode = function encode3(buffer, start, end) {
      var parts = null, chunk = [];
      var i2 = 0, j = 0, t;
      while (start < end) {
        var b = buffer[start++];
        switch (j) {
          case 0:
            chunk[i2++] = b64[b >> 2];
            t = (b & 3) << 4;
            j = 1;
            break;
          case 1:
            chunk[i2++] = b64[t | b >> 4];
            t = (b & 15) << 2;
            j = 2;
            break;
          case 2:
            chunk[i2++] = b64[t | b >> 6];
            chunk[i2++] = b64[b & 63];
            j = 0;
            break;
        }
        if (i2 > 8191) {
          (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
          i2 = 0;
        }
      }
      if (j) {
        chunk[i2++] = b64[t];
        chunk[i2++] = 61;
        if (j === 1)
          chunk[i2++] = 61;
      }
      if (parts) {
        if (i2)
          parts.push(String.fromCharCode.apply(String, chunk.slice(0, i2)));
        return parts.join("");
      }
      return String.fromCharCode.apply(String, chunk.slice(0, i2));
    };
    var invalidEncoding = "invalid encoding";
    base64.decode = function decode4(string, buffer, offset) {
      var start = offset;
      var j = 0, t;
      for (var i2 = 0; i2 < string.length; ) {
        var c = string.charCodeAt(i2++);
        if (c === 61 && j > 1)
          break;
        if ((c = s64[c]) === void 0)
          throw Error(invalidEncoding);
        switch (j) {
          case 0:
            t = c;
            j = 1;
            break;
          case 1:
            buffer[offset++] = t << 2 | (c & 48) >> 4;
            t = c;
            j = 2;
            break;
          case 2:
            buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
            t = c;
            j = 3;
            break;
          case 3:
            buffer[offset++] = (t & 3) << 6 | c;
            j = 0;
            break;
        }
      }
      if (j === 1)
        throw Error(invalidEncoding);
      return offset - start;
    };
    base64.test = function test(string) {
      return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string);
    };
  }
});
var require_eventemitter = __commonJS({
  "../../node_modules/@protobufjs/eventemitter/index.js"(exports2, module2) {
    "use strict";
    module2.exports = EventEmitter;
    function EventEmitter() {
      this._listeners = {};
    }
    EventEmitter.prototype.on = function on(evt, fn, ctx) {
      (this._listeners[evt] || (this._listeners[evt] = [])).push({
        fn,
        ctx: ctx || this
      });
      return this;
    };
    EventEmitter.prototype.off = function off(evt, fn) {
      if (evt === void 0)
        this._listeners = {};
      else {
        if (fn === void 0)
          this._listeners[evt] = [];
        else {
          var listeners = this._listeners[evt];
          for (var i = 0; i < listeners.length; )
            if (listeners[i].fn === fn)
              listeners.splice(i, 1);
            else
              ++i;
        }
      }
      return this;
    };
    EventEmitter.prototype.emit = function emit(evt) {
      var listeners = this._listeners[evt];
      if (listeners) {
        var args = [], i = 1;
        for (; i < arguments.length; )
          args.push(arguments[i++]);
        for (i = 0; i < listeners.length; )
          listeners[i].fn.apply(listeners[i++].ctx, args);
      }
      return this;
    };
  }
});
var require_float = __commonJS({
  "../../node_modules/@protobufjs/float/index.js"(exports2, module2) {
    "use strict";
    module2.exports = factory(factory);
    function factory(exports3) {
      if (typeof Float32Array !== "undefined")
        (function() {
          var f32 = new Float32Array([-0]), f8b = new Uint8Array(f32.buffer), le = f8b[3] === 128;
          function writeFloat_f32_cpy(val, buf, pos) {
            f32[0] = val;
            buf[pos] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
          }
          function writeFloat_f32_rev(val, buf, pos) {
            f32[0] = val;
            buf[pos] = f8b[3];
            buf[pos + 1] = f8b[2];
            buf[pos + 2] = f8b[1];
            buf[pos + 3] = f8b[0];
          }
          exports3.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
          exports3.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;
          function readFloat_f32_cpy(buf, pos) {
            f8b[0] = buf[pos];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            return f32[0];
          }
          function readFloat_f32_rev(buf, pos) {
            f8b[3] = buf[pos];
            f8b[2] = buf[pos + 1];
            f8b[1] = buf[pos + 2];
            f8b[0] = buf[pos + 3];
            return f32[0];
          }
          exports3.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
          exports3.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;
        })();
      else
        (function() {
          function writeFloat_ieee754(writeUint, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
              val = -val;
            if (val === 0)
              writeUint(1 / val > 0 ? (
                /* positive */
                0
              ) : (
                /* negative 0 */
                2147483648
              ), buf, pos);
            else if (isNaN(val))
              writeUint(2143289344, buf, pos);
            else if (val > 34028234663852886e22)
              writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);
            else if (val < 11754943508222875e-54)
              writeUint((sign << 31 | Math.round(val / 1401298464324817e-60)) >>> 0, buf, pos);
            else {
              var exponent = Math.floor(Math.log(val) / Math.LN2), mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
              writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
            }
          }
          exports3.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
          exports3.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);
          function readFloat_ieee754(readUint, buf, pos) {
            var uint = readUint(buf, pos), sign = (uint >> 31) * 2 + 1, exponent = uint >>> 23 & 255, mantissa = uint & 8388607;
            return exponent === 255 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 1401298464324817e-60 * mantissa : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
          }
          exports3.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
          exports3.readFloatBE = readFloat_ieee754.bind(null, readUintBE);
        })();
      if (typeof Float64Array !== "undefined")
        (function() {
          var f64 = new Float64Array([-0]), f8b = new Uint8Array(f64.buffer), le = f8b[7] === 128;
          function writeDouble_f64_cpy(val, buf, pos) {
            f64[0] = val;
            buf[pos] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
            buf[pos + 4] = f8b[4];
            buf[pos + 5] = f8b[5];
            buf[pos + 6] = f8b[6];
            buf[pos + 7] = f8b[7];
          }
          function writeDouble_f64_rev(val, buf, pos) {
            f64[0] = val;
            buf[pos] = f8b[7];
            buf[pos + 1] = f8b[6];
            buf[pos + 2] = f8b[5];
            buf[pos + 3] = f8b[4];
            buf[pos + 4] = f8b[3];
            buf[pos + 5] = f8b[2];
            buf[pos + 6] = f8b[1];
            buf[pos + 7] = f8b[0];
          }
          exports3.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
          exports3.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;
          function readDouble_f64_cpy(buf, pos) {
            f8b[0] = buf[pos];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            f8b[4] = buf[pos + 4];
            f8b[5] = buf[pos + 5];
            f8b[6] = buf[pos + 6];
            f8b[7] = buf[pos + 7];
            return f64[0];
          }
          function readDouble_f64_rev(buf, pos) {
            f8b[7] = buf[pos];
            f8b[6] = buf[pos + 1];
            f8b[5] = buf[pos + 2];
            f8b[4] = buf[pos + 3];
            f8b[3] = buf[pos + 4];
            f8b[2] = buf[pos + 5];
            f8b[1] = buf[pos + 6];
            f8b[0] = buf[pos + 7];
            return f64[0];
          }
          exports3.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
          exports3.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;
        })();
      else
        (function() {
          function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
              val = -val;
            if (val === 0) {
              writeUint(0, buf, pos + off0);
              writeUint(1 / val > 0 ? (
                /* positive */
                0
              ) : (
                /* negative 0 */
                2147483648
              ), buf, pos + off1);
            } else if (isNaN(val)) {
              writeUint(0, buf, pos + off0);
              writeUint(2146959360, buf, pos + off1);
            } else if (val > 17976931348623157e292) {
              writeUint(0, buf, pos + off0);
              writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
            } else {
              var mantissa;
              if (val < 22250738585072014e-324) {
                mantissa = val / 5e-324;
                writeUint(mantissa >>> 0, buf, pos + off0);
                writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
              } else {
                var exponent = Math.floor(Math.log(val) / Math.LN2);
                if (exponent === 1024)
                  exponent = 1023;
                mantissa = val * Math.pow(2, -exponent);
                writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
                writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
              }
            }
          }
          exports3.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
          exports3.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);
          function readDouble_ieee754(readUint, off0, off1, buf, pos) {
            var lo = readUint(buf, pos + off0), hi = readUint(buf, pos + off1);
            var sign = (hi >> 31) * 2 + 1, exponent = hi >>> 20 & 2047, mantissa = 4294967296 * (hi & 1048575) + lo;
            return exponent === 2047 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 5e-324 * mantissa : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
          }
          exports3.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
          exports3.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);
        })();
      return exports3;
    }
    function writeUintLE(val, buf, pos) {
      buf[pos] = val & 255;
      buf[pos + 1] = val >>> 8 & 255;
      buf[pos + 2] = val >>> 16 & 255;
      buf[pos + 3] = val >>> 24;
    }
    function writeUintBE(val, buf, pos) {
      buf[pos] = val >>> 24;
      buf[pos + 1] = val >>> 16 & 255;
      buf[pos + 2] = val >>> 8 & 255;
      buf[pos + 3] = val & 255;
    }
    function readUintLE(buf, pos) {
      return (buf[pos] | buf[pos + 1] << 8 | buf[pos + 2] << 16 | buf[pos + 3] << 24) >>> 0;
    }
    function readUintBE(buf, pos) {
      return (buf[pos] << 24 | buf[pos + 1] << 16 | buf[pos + 2] << 8 | buf[pos + 3]) >>> 0;
    }
  }
});
var require_inquire = __commonJS({
  "../../node_modules/@protobufjs/inquire/index.js"(exports, module) {
    "use strict";
    module.exports = inquire;
    function inquire(moduleName) {
      try {
        var mod = eval("quire".replace(/^/, "re"))(moduleName);
        if (mod && (mod.length || Object.keys(mod).length))
          return mod;
      } catch (e) {
      }
      return null;
    }
  }
});
var require_utf8 = __commonJS({
  "../../node_modules/@protobufjs/utf8/index.js"(exports2) {
    "use strict";
    var utf8 = exports2;
    utf8.length = function utf8_length(string) {
      var len = 0, c = 0;
      for (var i = 0; i < string.length; ++i) {
        c = string.charCodeAt(i);
        if (c < 128)
          len += 1;
        else if (c < 2048)
          len += 2;
        else if ((c & 64512) === 55296 && (string.charCodeAt(i + 1) & 64512) === 56320) {
          ++i;
          len += 4;
        } else
          len += 3;
      }
      return len;
    };
    utf8.read = function utf8_read(buffer, start, end) {
      var len = end - start;
      if (len < 1)
        return "";
      var parts = null, chunk = [], i = 0, t;
      while (start < end) {
        t = buffer[start++];
        if (t < 128)
          chunk[i++] = t;
        else if (t > 191 && t < 224)
          chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;
        else if (t > 239 && t < 365) {
          t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 65536;
          chunk[i++] = 55296 + (t >> 10);
          chunk[i++] = 56320 + (t & 1023);
        } else
          chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
        if (i > 8191) {
          (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
          i = 0;
        }
      }
      if (parts) {
        if (i)
          parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join("");
      }
      return String.fromCharCode.apply(String, chunk.slice(0, i));
    };
    utf8.write = function utf8_write(string, buffer, offset) {
      var start = offset, c1, c2;
      for (var i = 0; i < string.length; ++i) {
        c1 = string.charCodeAt(i);
        if (c1 < 128) {
          buffer[offset++] = c1;
        } else if (c1 < 2048) {
          buffer[offset++] = c1 >> 6 | 192;
          buffer[offset++] = c1 & 63 | 128;
        } else if ((c1 & 64512) === 55296 && ((c2 = string.charCodeAt(i + 1)) & 64512) === 56320) {
          c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
          ++i;
          buffer[offset++] = c1 >> 18 | 240;
          buffer[offset++] = c1 >> 12 & 63 | 128;
          buffer[offset++] = c1 >> 6 & 63 | 128;
          buffer[offset++] = c1 & 63 | 128;
        } else {
          buffer[offset++] = c1 >> 12 | 224;
          buffer[offset++] = c1 >> 6 & 63 | 128;
          buffer[offset++] = c1 & 63 | 128;
        }
      }
      return offset - start;
    };
  }
});
var require_pool = __commonJS({
  "../../node_modules/@protobufjs/pool/index.js"(exports2, module2) {
    "use strict";
    module2.exports = pool;
    function pool(alloc, slice, size) {
      var SIZE = size || 8192;
      var MAX = SIZE >>> 1;
      var slab = null;
      var offset = SIZE;
      return function pool_alloc(size2) {
        if (size2 < 1 || size2 > MAX)
          return alloc(size2);
        if (offset + size2 > SIZE) {
          slab = alloc(SIZE);
          offset = 0;
        }
        var buf = slice.call(slab, offset, offset += size2);
        if (offset & 7)
          offset = (offset | 7) + 1;
        return buf;
      };
    }
  }
});
var require_longbits = __commonJS({
  "../../node_modules/protobufjs/src/util/longbits.js"(exports2, module2) {
    "use strict";
    module2.exports = LongBits;
    var util = require_minimal();
    function LongBits(lo, hi) {
      this.lo = lo >>> 0;
      this.hi = hi >>> 0;
    }
    var zero = LongBits.zero = new LongBits(0, 0);
    zero.toNumber = function() {
      return 0;
    };
    zero.zzEncode = zero.zzDecode = function() {
      return this;
    };
    zero.length = function() {
      return 1;
    };
    var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";
    LongBits.fromNumber = function fromNumber(value) {
      if (value === 0)
        return zero;
      var sign = value < 0;
      if (sign)
        value = -value;
      var lo = value >>> 0, hi = (value - lo) / 4294967296 >>> 0;
      if (sign) {
        hi = ~hi >>> 0;
        lo = ~lo >>> 0;
        if (++lo > 4294967295) {
          lo = 0;
          if (++hi > 4294967295)
            hi = 0;
        }
      }
      return new LongBits(lo, hi);
    };
    LongBits.from = function from(value) {
      if (typeof value === "number")
        return LongBits.fromNumber(value);
      if (util.isString(value)) {
        if (util.Long)
          value = util.Long.fromString(value);
        else
          return LongBits.fromNumber(parseInt(value, 10));
      }
      return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
    };
    LongBits.prototype.toNumber = function toNumber(unsigned) {
      if (!unsigned && this.hi >>> 31) {
        var lo = ~this.lo + 1 >>> 0, hi = ~this.hi >>> 0;
        if (!lo)
          hi = hi + 1 >>> 0;
        return -(lo + hi * 4294967296);
      }
      return this.lo + this.hi * 4294967296;
    };
    LongBits.prototype.toLong = function toLong(unsigned) {
      return util.Long ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned)) : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
    };
    var charCodeAt = String.prototype.charCodeAt;
    LongBits.fromHash = function fromHash(hash) {
      if (hash === zeroHash)
        return zero;
      return new LongBits(
        (charCodeAt.call(hash, 0) | charCodeAt.call(hash, 1) << 8 | charCodeAt.call(hash, 2) << 16 | charCodeAt.call(hash, 3) << 24) >>> 0,
        (charCodeAt.call(hash, 4) | charCodeAt.call(hash, 5) << 8 | charCodeAt.call(hash, 6) << 16 | charCodeAt.call(hash, 7) << 24) >>> 0
      );
    };
    LongBits.prototype.toHash = function toHash() {
      return String.fromCharCode(
        this.lo & 255,
        this.lo >>> 8 & 255,
        this.lo >>> 16 & 255,
        this.lo >>> 24,
        this.hi & 255,
        this.hi >>> 8 & 255,
        this.hi >>> 16 & 255,
        this.hi >>> 24
      );
    };
    LongBits.prototype.zzEncode = function zzEncode() {
      var mask = this.hi >> 31;
      this.hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
      this.lo = (this.lo << 1 ^ mask) >>> 0;
      return this;
    };
    LongBits.prototype.zzDecode = function zzDecode() {
      var mask = -(this.lo & 1);
      this.lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
      this.hi = (this.hi >>> 1 ^ mask) >>> 0;
      return this;
    };
    LongBits.prototype.length = function length() {
      var part0 = this.lo, part1 = (this.lo >>> 28 | this.hi << 4) >>> 0, part2 = this.hi >>> 24;
      return part2 === 0 ? part1 === 0 ? part0 < 16384 ? part0 < 128 ? 1 : 2 : part0 < 2097152 ? 3 : 4 : part1 < 16384 ? part1 < 128 ? 5 : 6 : part1 < 2097152 ? 7 : 8 : part2 < 128 ? 9 : 10;
    };
  }
});
var require_minimal = __commonJS({
  "../../node_modules/protobufjs/src/util/minimal.js"(exports2) {
    "use strict";
    var util = exports2;
    util.asPromise = require_aspromise();
    util.base64 = require_base64();
    util.EventEmitter = require_eventemitter();
    util.float = require_float();
    util.inquire = require_inquire();
    util.utf8 = require_utf8();
    util.pool = require_pool();
    util.LongBits = require_longbits();
    util.isNode = Boolean(typeof global !== "undefined" && global && global.process && global.process.versions && global.process.versions.node);
    util.global = util.isNode && global || typeof window !== "undefined" && window || typeof self !== "undefined" && self || exports2;
    util.emptyArray = Object.freeze ? Object.freeze([]) : (
      /* istanbul ignore next */
      []
    );
    util.emptyObject = Object.freeze ? Object.freeze({}) : (
      /* istanbul ignore next */
      {}
    );
    util.isInteger = Number.isInteger || /* istanbul ignore next */
    function isInteger(value) {
      return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
    };
    util.isString = function isString(value) {
      return typeof value === "string" || value instanceof String;
    };
    util.isObject = function isObject2(value) {
      return value && typeof value === "object";
    };
    util.isset = /**
    * Checks if a property on a message is considered to be present.
    * @param {Object} obj Plain object or message instance
    * @param {string} prop Property name
    * @returns {boolean} `true` if considered to be present, otherwise `false`
    */
    util.isSet = function isSet5(obj, prop) {
      var value = obj[prop];
      if (value != null && obj.hasOwnProperty(prop))
        return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
      return false;
    };
    util.Buffer = function() {
      try {
        var Buffer2 = util.inquire("buffer").Buffer;
        return Buffer2.prototype.utf8Write ? Buffer2 : (
          /* istanbul ignore next */
          null
        );
      } catch (e) {
        return null;
      }
    }();
    util._Buffer_from = null;
    util._Buffer_allocUnsafe = null;
    util.newBuffer = function newBuffer(sizeOrArray) {
      return typeof sizeOrArray === "number" ? util.Buffer ? util._Buffer_allocUnsafe(sizeOrArray) : new util.Array(sizeOrArray) : util.Buffer ? util._Buffer_from(sizeOrArray) : typeof Uint8Array === "undefined" ? sizeOrArray : new Uint8Array(sizeOrArray);
    };
    util.Array = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    util.Long = /* istanbul ignore next */
    util.global.dcodeIO && /* istanbul ignore next */
    util.global.dcodeIO.Long || /* istanbul ignore next */
    util.global.Long || util.inquire("long");
    util.key2Re = /^true|false|0|1$/;
    util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
    util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
    util.longToHash = function longToHash(value) {
      return value ? util.LongBits.from(value).toHash() : util.LongBits.zeroHash;
    };
    util.longFromHash = function longFromHash(hash, unsigned) {
      var bits = util.LongBits.fromHash(hash);
      if (util.Long)
        return util.Long.fromBits(bits.lo, bits.hi, unsigned);
      return bits.toNumber(Boolean(unsigned));
    };
    function merge(dst, src, ifNotSet) {
      for (var keys = Object.keys(src), i = 0; i < keys.length; ++i)
        if (dst[keys[i]] === void 0 || !ifNotSet)
          dst[keys[i]] = src[keys[i]];
      return dst;
    }
    util.merge = merge;
    util.lcFirst = function lcFirst(str) {
      return str.charAt(0).toLowerCase() + str.substring(1);
    };
    function newError(name) {
      function CustomError(message, properties) {
        if (!(this instanceof CustomError))
          return new CustomError(message, properties);
        Object.defineProperty(this, "message", { get: function() {
          return message;
        } });
        if (Error.captureStackTrace)
          Error.captureStackTrace(this, CustomError);
        else
          Object.defineProperty(this, "stack", { value: new Error().stack || "" });
        if (properties)
          merge(this, properties);
      }
      (CustomError.prototype = Object.create(Error.prototype)).constructor = CustomError;
      Object.defineProperty(CustomError.prototype, "name", { get: function() {
        return name;
      } });
      CustomError.prototype.toString = function toString() {
        return this.name + ": " + this.message;
      };
      return CustomError;
    }
    util.newError = newError;
    util.ProtocolError = newError("ProtocolError");
    util.oneOfGetter = function getOneOf(fieldNames) {
      var fieldMap = {};
      for (var i = 0; i < fieldNames.length; ++i)
        fieldMap[fieldNames[i]] = 1;
      return function() {
        for (var keys = Object.keys(this), i2 = keys.length - 1; i2 > -1; --i2)
          if (fieldMap[keys[i2]] === 1 && this[keys[i2]] !== void 0 && this[keys[i2]] !== null)
            return keys[i2];
      };
    };
    util.oneOfSetter = function setOneOf(fieldNames) {
      return function(name) {
        for (var i = 0; i < fieldNames.length; ++i)
          if (fieldNames[i] !== name)
            delete this[fieldNames[i]];
      };
    };
    util.toJSONOptions = {
      longs: String,
      enums: String,
      bytes: String,
      json: true
    };
    util._configure = function() {
      var Buffer2 = util.Buffer;
      if (!Buffer2) {
        util._Buffer_from = util._Buffer_allocUnsafe = null;
        return;
      }
      util._Buffer_from = Buffer2.from !== Uint8Array.from && Buffer2.from || /* istanbul ignore next */
      function Buffer_from(value, encoding) {
        return new Buffer2(value, encoding);
      };
      util._Buffer_allocUnsafe = Buffer2.allocUnsafe || /* istanbul ignore next */
      function Buffer_allocUnsafe(size) {
        return new Buffer2(size);
      };
    };
  }
});
var require_writer = __commonJS({
  "../../node_modules/protobufjs/src/writer.js"(exports2, module2) {
    "use strict";
    module2.exports = Writer;
    var util = require_minimal();
    var BufferWriter;
    var LongBits = util.LongBits;
    var base64 = util.base64;
    var utf8 = util.utf8;
    function Op(fn, len, val) {
      this.fn = fn;
      this.len = len;
      this.next = void 0;
      this.val = val;
    }
    function noop() {
    }
    function State(writer) {
      this.head = writer.head;
      this.tail = writer.tail;
      this.len = writer.len;
      this.next = writer.states;
    }
    function Writer() {
      this.len = 0;
      this.head = new Op(noop, 0, 0);
      this.tail = this.head;
      this.states = null;
    }
    var create = function create2() {
      return util.Buffer ? function create_buffer_setup() {
        return (Writer.create = function create_buffer() {
          return new BufferWriter();
        })();
      } : function create_array() {
        return new Writer();
      };
    };
    Writer.create = create();
    Writer.alloc = function alloc(size) {
      return new util.Array(size);
    };
    if (util.Array !== Array)
      Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray);
    Writer.prototype._push = function push(fn, len, val) {
      this.tail = this.tail.next = new Op(fn, len, val);
      this.len += len;
      return this;
    };
    function writeByte(val, buf, pos) {
      buf[pos] = val & 255;
    }
    function writeVarint32(val, buf, pos) {
      while (val > 127) {
        buf[pos++] = val & 127 | 128;
        val >>>= 7;
      }
      buf[pos] = val;
    }
    function VarintOp(len, val) {
      this.len = len;
      this.next = void 0;
      this.val = val;
    }
    VarintOp.prototype = Object.create(Op.prototype);
    VarintOp.prototype.fn = writeVarint32;
    Writer.prototype.uint32 = function write_uint32(value) {
      this.len += (this.tail = this.tail.next = new VarintOp(
        (value = value >>> 0) < 128 ? 1 : value < 16384 ? 2 : value < 2097152 ? 3 : value < 268435456 ? 4 : 5,
        value
      )).len;
      return this;
    };
    Writer.prototype.int32 = function write_int32(value) {
      return value < 0 ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) : this.uint32(value);
    };
    Writer.prototype.sint32 = function write_sint32(value) {
      return this.uint32((value << 1 ^ value >> 31) >>> 0);
    };
    function writeVarint64(val, buf, pos) {
      while (val.hi) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
        val.hi >>>= 7;
      }
      while (val.lo > 127) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = val.lo >>> 7;
      }
      buf[pos++] = val.lo;
    }
    Writer.prototype.uint64 = function write_uint64(value) {
      var bits = LongBits.from(value);
      return this._push(writeVarint64, bits.length(), bits);
    };
    Writer.prototype.int64 = Writer.prototype.uint64;
    Writer.prototype.sint64 = function write_sint64(value) {
      var bits = LongBits.from(value).zzEncode();
      return this._push(writeVarint64, bits.length(), bits);
    };
    Writer.prototype.bool = function write_bool(value) {
      return this._push(writeByte, 1, value ? 1 : 0);
    };
    function writeFixed32(val, buf, pos) {
      buf[pos] = val & 255;
      buf[pos + 1] = val >>> 8 & 255;
      buf[pos + 2] = val >>> 16 & 255;
      buf[pos + 3] = val >>> 24;
    }
    Writer.prototype.fixed32 = function write_fixed32(value) {
      return this._push(writeFixed32, 4, value >>> 0);
    };
    Writer.prototype.sfixed32 = Writer.prototype.fixed32;
    Writer.prototype.fixed64 = function write_fixed64(value) {
      var bits = LongBits.from(value);
      return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
    };
    Writer.prototype.sfixed64 = Writer.prototype.fixed64;
    Writer.prototype.float = function write_float(value) {
      return this._push(util.float.writeFloatLE, 4, value);
    };
    Writer.prototype.double = function write_double(value) {
      return this._push(util.float.writeDoubleLE, 8, value);
    };
    var writeBytes = util.Array.prototype.set ? function writeBytes_set(val, buf, pos) {
      buf.set(val, pos);
    } : function writeBytes_for(val, buf, pos) {
      for (var i = 0; i < val.length; ++i)
        buf[pos + i] = val[i];
    };
    Writer.prototype.bytes = function write_bytes(value) {
      var len = value.length >>> 0;
      if (!len)
        return this._push(writeByte, 1, 0);
      if (util.isString(value)) {
        var buf = Writer.alloc(len = base64.length(value));
        base64.decode(value, buf, 0);
        value = buf;
      }
      return this.uint32(len)._push(writeBytes, len, value);
    };
    Writer.prototype.string = function write_string(value) {
      var len = utf8.length(value);
      return len ? this.uint32(len)._push(utf8.write, len, value) : this._push(writeByte, 1, 0);
    };
    Writer.prototype.fork = function fork() {
      this.states = new State(this);
      this.head = this.tail = new Op(noop, 0, 0);
      this.len = 0;
      return this;
    };
    Writer.prototype.reset = function reset() {
      if (this.states) {
        this.head = this.states.head;
        this.tail = this.states.tail;
        this.len = this.states.len;
        this.states = this.states.next;
      } else {
        this.head = this.tail = new Op(noop, 0, 0);
        this.len = 0;
      }
      return this;
    };
    Writer.prototype.ldelim = function ldelim() {
      var head = this.head, tail = this.tail, len = this.len;
      this.reset().uint32(len);
      if (len) {
        this.tail.next = head.next;
        this.tail = tail;
        this.len += len;
      }
      return this;
    };
    Writer.prototype.finish = function finish() {
      var head = this.head.next, buf = this.constructor.alloc(this.len), pos = 0;
      while (head) {
        head.fn(head.val, buf, pos);
        pos += head.len;
        head = head.next;
      }
      return buf;
    };
    Writer._configure = function(BufferWriter_) {
      BufferWriter = BufferWriter_;
      Writer.create = create();
      BufferWriter._configure();
    };
  }
});
var require_writer_buffer = __commonJS({
  "../../node_modules/protobufjs/src/writer_buffer.js"(exports2, module2) {
    "use strict";
    module2.exports = BufferWriter;
    var Writer = require_writer();
    (BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;
    var util = require_minimal();
    function BufferWriter() {
      Writer.call(this);
    }
    BufferWriter._configure = function() {
      BufferWriter.alloc = util._Buffer_allocUnsafe;
      BufferWriter.writeBytesBuffer = util.Buffer && util.Buffer.prototype instanceof Uint8Array && util.Buffer.prototype.set.name === "set" ? function writeBytesBuffer_set(val, buf, pos) {
        buf.set(val, pos);
      } : function writeBytesBuffer_copy(val, buf, pos) {
        if (val.copy)
          val.copy(buf, pos, 0, val.length);
        else
          for (var i = 0; i < val.length; )
            buf[pos++] = val[i++];
      };
    };
    BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
      if (util.isString(value))
        value = util._Buffer_from(value, "base64");
      var len = value.length >>> 0;
      this.uint32(len);
      if (len)
        this._push(BufferWriter.writeBytesBuffer, len, value);
      return this;
    };
    function writeStringBuffer(val, buf, pos) {
      if (val.length < 40)
        util.utf8.write(val, buf, pos);
      else if (buf.utf8Write)
        buf.utf8Write(val, pos);
      else
        buf.write(val, pos);
    }
    BufferWriter.prototype.string = function write_string_buffer(value) {
      var len = util.Buffer.byteLength(value);
      this.uint32(len);
      if (len)
        this._push(writeStringBuffer, len, value);
      return this;
    };
    BufferWriter._configure();
  }
});
var require_reader = __commonJS({
  "../../node_modules/protobufjs/src/reader.js"(exports2, module2) {
    "use strict";
    module2.exports = Reader;
    var util = require_minimal();
    var BufferReader;
    var LongBits = util.LongBits;
    var utf8 = util.utf8;
    function indexOutOfRange(reader, writeLength) {
      return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
    }
    function Reader(buffer) {
      this.buf = buffer;
      this.pos = 0;
      this.len = buffer.length;
    }
    var create_array = typeof Uint8Array !== "undefined" ? function create_typed_array(buffer) {
      if (buffer instanceof Uint8Array || Array.isArray(buffer))
        return new Reader(buffer);
      throw Error("illegal buffer");
    } : function create_array2(buffer) {
      if (Array.isArray(buffer))
        return new Reader(buffer);
      throw Error("illegal buffer");
    };
    var create = function create2() {
      return util.Buffer ? function create_buffer_setup(buffer) {
        return (Reader.create = function create_buffer(buffer2) {
          return util.Buffer.isBuffer(buffer2) ? new BufferReader(buffer2) : create_array(buffer2);
        })(buffer);
      } : create_array;
    };
    Reader.create = create();
    Reader.prototype._slice = util.Array.prototype.subarray || /* istanbul ignore next */
    util.Array.prototype.slice;
    Reader.prototype.uint32 = /* @__PURE__ */ function read_uint32_setup() {
      var value = 4294967295;
      return function read_uint32() {
        value = (this.buf[this.pos] & 127) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        value = (value | (this.buf[this.pos] & 127) << 7) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        value = (value | (this.buf[this.pos] & 127) << 14) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        value = (value | (this.buf[this.pos] & 127) << 21) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        value = (value | (this.buf[this.pos] & 15) << 28) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        if ((this.pos += 5) > this.len) {
          this.pos = this.len;
          throw indexOutOfRange(this, 10);
        }
        return value;
      };
    }();
    Reader.prototype.int32 = function read_int32() {
      return this.uint32() | 0;
    };
    Reader.prototype.sint32 = function read_sint32() {
      var value = this.uint32();
      return value >>> 1 ^ -(value & 1) | 0;
    };
    function readLongVarint() {
      var bits = new LongBits(0, 0);
      var i = 0;
      if (this.len - this.pos > 4) {
        for (; i < 4; ++i) {
          bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
        bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
        bits.hi = (bits.hi | (this.buf[this.pos] & 127) >> 4) >>> 0;
        if (this.buf[this.pos++] < 128)
          return bits;
        i = 0;
      } else {
        for (; i < 3; ++i) {
          if (this.pos >= this.len)
            throw indexOutOfRange(this);
          bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
        bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
        return bits;
      }
      if (this.len - this.pos > 4) {
        for (; i < 5; ++i) {
          bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
      } else {
        for (; i < 5; ++i) {
          if (this.pos >= this.len)
            throw indexOutOfRange(this);
          bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
      }
      throw Error("invalid varint encoding");
    }
    Reader.prototype.bool = function read_bool() {
      return this.uint32() !== 0;
    };
    function readFixed32_end(buf, end) {
      return (buf[end - 4] | buf[end - 3] << 8 | buf[end - 2] << 16 | buf[end - 1] << 24) >>> 0;
    }
    Reader.prototype.fixed32 = function read_fixed32() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      return readFixed32_end(this.buf, this.pos += 4);
    };
    Reader.prototype.sfixed32 = function read_sfixed32() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      return readFixed32_end(this.buf, this.pos += 4) | 0;
    };
    function readFixed64() {
      if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 8);
      return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
    }
    Reader.prototype.float = function read_float() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      var value = util.float.readFloatLE(this.buf, this.pos);
      this.pos += 4;
      return value;
    };
    Reader.prototype.double = function read_double() {
      if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 4);
      var value = util.float.readDoubleLE(this.buf, this.pos);
      this.pos += 8;
      return value;
    };
    Reader.prototype.bytes = function read_bytes() {
      var length = this.uint32(), start = this.pos, end = this.pos + length;
      if (end > this.len)
        throw indexOutOfRange(this, length);
      this.pos += length;
      if (Array.isArray(this.buf))
        return this.buf.slice(start, end);
      return start === end ? new this.buf.constructor(0) : this._slice.call(this.buf, start, end);
    };
    Reader.prototype.string = function read_string() {
      var bytes = this.bytes();
      return utf8.read(bytes, 0, bytes.length);
    };
    Reader.prototype.skip = function skip(length) {
      if (typeof length === "number") {
        if (this.pos + length > this.len)
          throw indexOutOfRange(this, length);
        this.pos += length;
      } else {
        do {
          if (this.pos >= this.len)
            throw indexOutOfRange(this);
        } while (this.buf[this.pos++] & 128);
      }
      return this;
    };
    Reader.prototype.skipType = function(wireType) {
      switch (wireType) {
        case 0:
          this.skip();
          break;
        case 1:
          this.skip(8);
          break;
        case 2:
          this.skip(this.uint32());
          break;
        case 3:
          while ((wireType = this.uint32() & 7) !== 4) {
            this.skipType(wireType);
          }
          break;
        case 5:
          this.skip(4);
          break;
        default:
          throw Error("invalid wire type " + wireType + " at offset " + this.pos);
      }
      return this;
    };
    Reader._configure = function(BufferReader_) {
      BufferReader = BufferReader_;
      Reader.create = create();
      BufferReader._configure();
      var fn = util.Long ? "toLong" : (
        /* istanbul ignore next */
        "toNumber"
      );
      util.merge(Reader.prototype, {
        int64: function read_int64() {
          return readLongVarint.call(this)[fn](false);
        },
        uint64: function read_uint64() {
          return readLongVarint.call(this)[fn](true);
        },
        sint64: function read_sint64() {
          return readLongVarint.call(this).zzDecode()[fn](false);
        },
        fixed64: function read_fixed64() {
          return readFixed64.call(this)[fn](true);
        },
        sfixed64: function read_sfixed64() {
          return readFixed64.call(this)[fn](false);
        }
      });
    };
  }
});
var require_reader_buffer = __commonJS({
  "../../node_modules/protobufjs/src/reader_buffer.js"(exports2, module2) {
    "use strict";
    module2.exports = BufferReader;
    var Reader = require_reader();
    (BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;
    var util = require_minimal();
    function BufferReader(buffer) {
      Reader.call(this, buffer);
    }
    BufferReader._configure = function() {
      if (util.Buffer)
        BufferReader.prototype._slice = util.Buffer.prototype.slice;
    };
    BufferReader.prototype.string = function read_string_buffer() {
      var len = this.uint32();
      return this.buf.utf8Slice ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len)) : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + len, this.len));
    };
    BufferReader._configure();
  }
});
var require_service = __commonJS({
  "../../node_modules/protobufjs/src/rpc/service.js"(exports2, module2) {
    "use strict";
    module2.exports = Service;
    var util = require_minimal();
    (Service.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service;
    function Service(rpcImpl, requestDelimited, responseDelimited) {
      if (typeof rpcImpl !== "function")
        throw TypeError("rpcImpl must be a function");
      util.EventEmitter.call(this);
      this.rpcImpl = rpcImpl;
      this.requestDelimited = Boolean(requestDelimited);
      this.responseDelimited = Boolean(responseDelimited);
    }
    Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {
      if (!request)
        throw TypeError("request must be specified");
      var self2 = this;
      if (!callback)
        return util.asPromise(rpcCall, self2, method, requestCtor, responseCtor, request);
      if (!self2.rpcImpl) {
        setTimeout(function() {
          callback(Error("already ended"));
        }, 0);
        return void 0;
      }
      try {
        return self2.rpcImpl(
          method,
          requestCtor[self2.requestDelimited ? "encodeDelimited" : "encode"](request).finish(),
          function rpcCallback(err, response) {
            if (err) {
              self2.emit("error", err, method);
              return callback(err);
            }
            if (response === null) {
              self2.end(
                /* endedByRPC */
                true
              );
              return void 0;
            }
            if (!(response instanceof responseCtor)) {
              try {
                response = responseCtor[self2.responseDelimited ? "decodeDelimited" : "decode"](response);
              } catch (err2) {
                self2.emit("error", err2, method);
                return callback(err2);
              }
            }
            self2.emit("data", response, method);
            return callback(null, response);
          }
        );
      } catch (err) {
        self2.emit("error", err, method);
        setTimeout(function() {
          callback(err);
        }, 0);
        return void 0;
      }
    };
    Service.prototype.end = function end(endedByRPC) {
      if (this.rpcImpl) {
        if (!endedByRPC)
          this.rpcImpl(null, null, null);
        this.rpcImpl = null;
        this.emit("end").off();
      }
      return this;
    };
  }
});
var require_rpc = __commonJS({
  "../../node_modules/protobufjs/src/rpc.js"(exports2) {
    "use strict";
    var rpc = exports2;
    rpc.Service = require_service();
  }
});
var require_roots = __commonJS({
  "../../node_modules/protobufjs/src/roots.js"(exports2, module2) {
    "use strict";
    module2.exports = {};
  }
});
var require_index_minimal = __commonJS({
  "../../node_modules/protobufjs/src/index-minimal.js"(exports2) {
    "use strict";
    var protobuf = exports2;
    protobuf.build = "minimal";
    protobuf.Writer = require_writer();
    protobuf.BufferWriter = require_writer_buffer();
    protobuf.Reader = require_reader();
    protobuf.BufferReader = require_reader_buffer();
    protobuf.util = require_minimal();
    protobuf.rpc = require_rpc();
    protobuf.roots = require_roots();
    protobuf.configure = configure;
    function configure() {
      protobuf.util._configure();
      protobuf.Writer._configure(protobuf.BufferWriter);
      protobuf.Reader._configure(protobuf.BufferReader);
    }
    configure();
  }
});
var require_minimal2 = __commonJS({
  "../../node_modules/protobufjs/minimal.js"(exports2, module2) {
    "use strict";
    module2.exports = require_index_minimal();
  }
});
var import_long4 = __toESM(require_long());
var import_minimal4 = __toESM(require_minimal2());
var import_long3 = __toESM(require_long());
var import_minimal3 = __toESM(require_minimal2());
var import_long = __toESM(require_long());
var import_minimal = __toESM(require_minimal2());
function createBaseTimestamp() {
  return { seconds: 0, nanos: 0 };
}
var Timestamp = {
  encode(message, writer = import_minimal.default.Writer.create()) {
    if (message.seconds !== 0) {
      writer.uint32(8).int64(message.seconds);
    }
    if (message.nanos !== 0) {
      writer.uint32(16).int32(message.nanos);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal.default.Reader ? input : new import_minimal.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseTimestamp();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.seconds = longToNumber(reader.int64());
          break;
        case 2:
          message.nanos = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      seconds: isSet(object.seconds) ? Number(object.seconds) : 0,
      nanos: isSet(object.nanos) ? Number(object.nanos) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.seconds !== void 0 && (obj.seconds = Math.round(message.seconds));
    message.nanos !== void 0 && (obj.nanos = Math.round(message.nanos));
    return obj;
  },
  create(base) {
    return Timestamp.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b;
    const message = createBaseTimestamp();
    message.seconds = (_a = object.seconds) != null ? _a : 0;
    message.nanos = (_b = object.nanos) != null ? _b : 0;
    return message;
  }
};
var tsProtoGlobalThis = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();
function longToNumber(long) {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}
if (import_minimal.default.util.Long !== import_long.default) {
  import_minimal.default.util.Long = import_long.default;
  import_minimal.default.configure();
}
function isSet(value) {
  return value !== null && value !== void 0;
}
var import_long2 = __toESM(require_long());
var import_minimal2 = __toESM(require_minimal2());
function createBaseInt32Value() {
  return { value: 0 };
}
var Int32Value = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (message.value !== 0) {
      writer.uint32(8).int32(message.value);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseInt32Value();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return { value: isSet2(object.value) ? Number(object.value) : 0 };
  },
  toJSON(message) {
    const obj = {};
    message.value !== void 0 && (obj.value = Math.round(message.value));
    return obj;
  },
  create(base) {
    return Int32Value.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a;
    const message = createBaseInt32Value();
    message.value = (_a = object.value) != null ? _a : 0;
    return message;
  }
};
function createBaseBoolValue() {
  return { value: false };
}
var BoolValue = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (message.value === true) {
      writer.uint32(8).bool(message.value);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseBoolValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return { value: isSet2(object.value) ? Boolean(object.value) : false };
  },
  toJSON(message) {
    const obj = {};
    message.value !== void 0 && (obj.value = message.value);
    return obj;
  },
  create(base) {
    return BoolValue.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a;
    const message = createBaseBoolValue();
    message.value = (_a = object.value) != null ? _a : false;
    return message;
  }
};
function createBaseStringValue() {
  return { value: "" };
}
var StringValue = {
  encode(message, writer = import_minimal2.default.Writer.create()) {
    if (message.value !== "") {
      writer.uint32(10).string(message.value);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal2.default.Reader ? input : new import_minimal2.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseStringValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return { value: isSet2(object.value) ? String(object.value) : "" };
  },
  toJSON(message) {
    const obj = {};
    message.value !== void 0 && (obj.value = message.value);
    return obj;
  },
  create(base) {
    return StringValue.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a;
    const message = createBaseStringValue();
    message.value = (_a = object.value) != null ? _a : "";
    return message;
  }
};
var tsProtoGlobalThis2 = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();
if (import_minimal2.default.util.Long !== import_long2.default) {
  import_minimal2.default.util.Long = import_long2.default;
  import_minimal2.default.configure();
}
function isSet2(value) {
  return value !== null && value !== void 0;
}
function createBaseChannelMessage() {
  return {
    clan_id: "",
    channel_id: "",
    message_id: "",
    code: void 0,
    sender_id: "",
    username: "",
    avatar: "",
    content: "",
    create_time: void 0,
    update_time: void 0,
    persistent: void 0,
    channel_name: "",
    user_id_one: "",
    user_id_two: "",
    last_seen: void 0
  };
}
var ChannelMessage = {
  encode(message, writer = import_minimal3.default.Writer.create()) {
    if (message.clan_id !== "") {
      writer.uint32(10).string(message.clan_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    if (message.message_id !== "") {
      writer.uint32(26).string(message.message_id);
    }
    if (message.code !== void 0) {
      Int32Value.encode({ value: message.code }, writer.uint32(34).fork()).ldelim();
    }
    if (message.sender_id !== "") {
      writer.uint32(42).string(message.sender_id);
    }
    if (message.username !== "") {
      writer.uint32(50).string(message.username);
    }
    if (message.avatar !== "") {
      writer.uint32(58).string(message.avatar);
    }
    if (message.content !== "") {
      writer.uint32(66).string(message.content);
    }
    if (message.create_time !== void 0) {
      Timestamp.encode(toTimestamp(message.create_time), writer.uint32(74).fork()).ldelim();
    }
    if (message.update_time !== void 0) {
      Timestamp.encode(toTimestamp(message.update_time), writer.uint32(82).fork()).ldelim();
    }
    if (message.persistent !== void 0) {
      BoolValue.encode({ value: message.persistent }, writer.uint32(90).fork()).ldelim();
    }
    if (message.channel_name !== "") {
      writer.uint32(98).string(message.channel_name);
    }
    if (message.user_id_one !== "") {
      writer.uint32(106).string(message.user_id_one);
    }
    if (message.user_id_two !== "") {
      writer.uint32(114).string(message.user_id_two);
    }
    if (message.last_seen !== void 0) {
      BoolValue.encode({ value: message.last_seen }, writer.uint32(122).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal3.default.Reader ? input : new import_minimal3.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseChannelMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clan_id = reader.string();
          break;
        case 2:
          message.channel_id = reader.string();
          break;
        case 3:
          message.message_id = reader.string();
          break;
        case 4:
          message.code = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 5:
          message.sender_id = reader.string();
          break;
        case 6:
          message.username = reader.string();
          break;
        case 7:
          message.avatar = reader.string();
          break;
        case 8:
          message.content = reader.string();
          break;
        case 9:
          message.create_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 10:
          message.update_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 11:
          message.persistent = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 12:
          message.channel_name = reader.string();
          break;
        case 13:
          message.user_id_one = reader.string();
          break;
        case 14:
          message.user_id_two = reader.string();
          break;
        case 15:
          message.last_seen = BoolValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      clan_id: isSet3(object.clan_id) ? String(object.clan_id) : "",
      channel_id: isSet3(object.channel_id) ? String(object.channel_id) : "",
      message_id: isSet3(object.message_id) ? String(object.message_id) : "",
      code: isSet3(object.code) ? Number(object.code) : void 0,
      sender_id: isSet3(object.sender_id) ? String(object.sender_id) : "",
      username: isSet3(object.username) ? String(object.username) : "",
      avatar: isSet3(object.avatar) ? String(object.avatar) : "",
      content: isSet3(object.content) ? String(object.content) : "",
      create_time: isSet3(object.create_time) ? fromJsonTimestamp(object.create_time) : void 0,
      update_time: isSet3(object.update_time) ? fromJsonTimestamp(object.update_time) : void 0,
      persistent: isSet3(object.persistent) ? Boolean(object.persistent) : void 0,
      channel_name: isSet3(object.channel_name) ? String(object.channel_name) : "",
      user_id_one: isSet3(object.user_id_one) ? String(object.user_id_one) : "",
      user_id_two: isSet3(object.user_id_two) ? String(object.user_id_two) : "",
      last_seen: isSet3(object.last_seen) ? Boolean(object.last_seen) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.clan_id !== void 0 && (obj.clan_id = message.clan_id);
    message.channel_id !== void 0 && (obj.channel_id = message.channel_id);
    message.message_id !== void 0 && (obj.message_id = message.message_id);
    message.code !== void 0 && (obj.code = message.code);
    message.sender_id !== void 0 && (obj.sender_id = message.sender_id);
    message.username !== void 0 && (obj.username = message.username);
    message.avatar !== void 0 && (obj.avatar = message.avatar);
    message.content !== void 0 && (obj.content = message.content);
    message.create_time !== void 0 && (obj.create_time = message.create_time.toISOString());
    message.update_time !== void 0 && (obj.update_time = message.update_time.toISOString());
    message.persistent !== void 0 && (obj.persistent = message.persistent);
    message.channel_name !== void 0 && (obj.channel_name = message.channel_name);
    message.user_id_one !== void 0 && (obj.user_id_one = message.user_id_one);
    message.user_id_two !== void 0 && (obj.user_id_two = message.user_id_two);
    message.last_seen !== void 0 && (obj.last_seen = message.last_seen);
    return obj;
  },
  create(base) {
    return ChannelMessage.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o;
    const message = createBaseChannelMessage();
    message.clan_id = (_a = object.clan_id) != null ? _a : "";
    message.channel_id = (_b = object.channel_id) != null ? _b : "";
    message.message_id = (_c = object.message_id) != null ? _c : "";
    message.code = (_d = object.code) != null ? _d : void 0;
    message.sender_id = (_e = object.sender_id) != null ? _e : "";
    message.username = (_f = object.username) != null ? _f : "";
    message.avatar = (_g = object.avatar) != null ? _g : "";
    message.content = (_h = object.content) != null ? _h : "";
    message.create_time = (_i = object.create_time) != null ? _i : void 0;
    message.update_time = (_j = object.update_time) != null ? _j : void 0;
    message.persistent = (_k = object.persistent) != null ? _k : void 0;
    message.channel_name = (_l = object.channel_name) != null ? _l : "";
    message.user_id_one = (_m = object.user_id_one) != null ? _m : "";
    message.user_id_two = (_n = object.user_id_two) != null ? _n : "";
    message.last_seen = (_o = object.last_seen) != null ? _o : void 0;
    return message;
  }
};
function createBaseNotification() {
  return { id: "", subject: "", content: "", code: 0, sender_id: "", create_time: void 0, persistent: false };
}
var Notification = {
  encode(message, writer = import_minimal3.default.Writer.create()) {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.subject !== "") {
      writer.uint32(18).string(message.subject);
    }
    if (message.content !== "") {
      writer.uint32(26).string(message.content);
    }
    if (message.code !== 0) {
      writer.uint32(32).int32(message.code);
    }
    if (message.sender_id !== "") {
      writer.uint32(42).string(message.sender_id);
    }
    if (message.create_time !== void 0) {
      Timestamp.encode(toTimestamp(message.create_time), writer.uint32(50).fork()).ldelim();
    }
    if (message.persistent === true) {
      writer.uint32(56).bool(message.persistent);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal3.default.Reader ? input : new import_minimal3.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseNotification();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.subject = reader.string();
          break;
        case 3:
          message.content = reader.string();
          break;
        case 4:
          message.code = reader.int32();
          break;
        case 5:
          message.sender_id = reader.string();
          break;
        case 6:
          message.create_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 7:
          message.persistent = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      id: isSet3(object.id) ? String(object.id) : "",
      subject: isSet3(object.subject) ? String(object.subject) : "",
      content: isSet3(object.content) ? String(object.content) : "",
      code: isSet3(object.code) ? Number(object.code) : 0,
      sender_id: isSet3(object.sender_id) ? String(object.sender_id) : "",
      create_time: isSet3(object.create_time) ? fromJsonTimestamp(object.create_time) : void 0,
      persistent: isSet3(object.persistent) ? Boolean(object.persistent) : false
    };
  },
  toJSON(message) {
    const obj = {};
    message.id !== void 0 && (obj.id = message.id);
    message.subject !== void 0 && (obj.subject = message.subject);
    message.content !== void 0 && (obj.content = message.content);
    message.code !== void 0 && (obj.code = Math.round(message.code));
    message.sender_id !== void 0 && (obj.sender_id = message.sender_id);
    message.create_time !== void 0 && (obj.create_time = message.create_time.toISOString());
    message.persistent !== void 0 && (obj.persistent = message.persistent);
    return obj;
  },
  create(base) {
    return Notification.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b, _c, _d, _e, _f, _g;
    const message = createBaseNotification();
    message.id = (_a = object.id) != null ? _a : "";
    message.subject = (_b = object.subject) != null ? _b : "";
    message.content = (_c = object.content) != null ? _c : "";
    message.code = (_d = object.code) != null ? _d : 0;
    message.sender_id = (_e = object.sender_id) != null ? _e : "";
    message.create_time = (_f = object.create_time) != null ? _f : void 0;
    message.persistent = (_g = object.persistent) != null ? _g : false;
    return message;
  }
};
function createBaseRpc() {
  return { id: "", payload: "", http_key: "" };
}
var Rpc = {
  encode(message, writer = import_minimal3.default.Writer.create()) {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.payload !== "") {
      writer.uint32(18).string(message.payload);
    }
    if (message.http_key !== "") {
      writer.uint32(26).string(message.http_key);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal3.default.Reader ? input : new import_minimal3.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseRpc();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.payload = reader.string();
          break;
        case 3:
          message.http_key = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      id: isSet3(object.id) ? String(object.id) : "",
      payload: isSet3(object.payload) ? String(object.payload) : "",
      http_key: isSet3(object.http_key) ? String(object.http_key) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.id !== void 0 && (obj.id = message.id);
    message.payload !== void 0 && (obj.payload = message.payload);
    message.http_key !== void 0 && (obj.http_key = message.http_key);
    return obj;
  },
  create(base) {
    return Rpc.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b, _c;
    const message = createBaseRpc();
    message.id = (_a = object.id) != null ? _a : "";
    message.payload = (_b = object.payload) != null ? _b : "";
    message.http_key = (_c = object.http_key) != null ? _c : "";
    return message;
  }
};
var tsProtoGlobalThis3 = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();
function toTimestamp(date) {
  const seconds = date.getTime() / 1e3;
  const nanos = date.getTime() % 1e3 * 1e6;
  return { seconds, nanos };
}
function fromTimestamp(t) {
  let millis = t.seconds * 1e3;
  millis += t.nanos / 1e6;
  return new Date(millis);
}
function fromJsonTimestamp(o) {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}
if (import_minimal3.default.util.Long !== import_long3.default) {
  import_minimal3.default.util.Long = import_long3.default;
  import_minimal3.default.configure();
}
function isSet3(value) {
  return value !== null && value !== void 0;
}
function createBaseEnvelope() {
  return {
    cid: "",
    channel: void 0,
    channel_join: void 0,
    channel_leave: void 0,
    channel_message: void 0,
    channel_message_ack: void 0,
    channel_message_send: void 0,
    channel_message_update: void 0,
    channel_message_remove: void 0,
    channel_presence_event: void 0,
    error: void 0,
    notifications: void 0,
    rpc: void 0,
    status: void 0,
    status_follow: void 0,
    status_presence_event: void 0,
    status_unfollow: void 0,
    status_update: void 0,
    stream_data: void 0,
    stream_presence_event: void 0,
    ping: void 0,
    pong: void 0,
    party: void 0,
    party_create: void 0,
    party_join: void 0,
    party_leave: void 0,
    party_promote: void 0,
    party_leader: void 0,
    party_accept: void 0,
    party_remove: void 0,
    party_close: void 0,
    party_join_request_list: void 0,
    party_join_request: void 0,
    party_data: void 0,
    party_data_send: void 0,
    party_presence_event: void 0,
    message_typing_event: void 0,
    last_seen_message_event: void 0
  };
}
var Envelope = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.cid !== "") {
      writer.uint32(10).string(message.cid);
    }
    if (message.channel !== void 0) {
      Channel.encode(message.channel, writer.uint32(18).fork()).ldelim();
    }
    if (message.channel_join !== void 0) {
      ChannelJoin.encode(message.channel_join, writer.uint32(26).fork()).ldelim();
    }
    if (message.channel_leave !== void 0) {
      ChannelLeave.encode(message.channel_leave, writer.uint32(34).fork()).ldelim();
    }
    if (message.channel_message !== void 0) {
      ChannelMessage.encode(message.channel_message, writer.uint32(42).fork()).ldelim();
    }
    if (message.channel_message_ack !== void 0) {
      ChannelMessageAck.encode(message.channel_message_ack, writer.uint32(50).fork()).ldelim();
    }
    if (message.channel_message_send !== void 0) {
      ChannelMessageSend.encode(message.channel_message_send, writer.uint32(58).fork()).ldelim();
    }
    if (message.channel_message_update !== void 0) {
      ChannelMessageUpdate.encode(message.channel_message_update, writer.uint32(66).fork()).ldelim();
    }
    if (message.channel_message_remove !== void 0) {
      ChannelMessageRemove.encode(message.channel_message_remove, writer.uint32(74).fork()).ldelim();
    }
    if (message.channel_presence_event !== void 0) {
      ChannelPresenceEvent.encode(message.channel_presence_event, writer.uint32(82).fork()).ldelim();
    }
    if (message.error !== void 0) {
      Error2.encode(message.error, writer.uint32(90).fork()).ldelim();
    }
    if (message.notifications !== void 0) {
      Notifications.encode(message.notifications, writer.uint32(98).fork()).ldelim();
    }
    if (message.rpc !== void 0) {
      Rpc.encode(message.rpc, writer.uint32(106).fork()).ldelim();
    }
    if (message.status !== void 0) {
      Status.encode(message.status, writer.uint32(114).fork()).ldelim();
    }
    if (message.status_follow !== void 0) {
      StatusFollow.encode(message.status_follow, writer.uint32(122).fork()).ldelim();
    }
    if (message.status_presence_event !== void 0) {
      StatusPresenceEvent.encode(message.status_presence_event, writer.uint32(130).fork()).ldelim();
    }
    if (message.status_unfollow !== void 0) {
      StatusUnfollow.encode(message.status_unfollow, writer.uint32(138).fork()).ldelim();
    }
    if (message.status_update !== void 0) {
      StatusUpdate.encode(message.status_update, writer.uint32(146).fork()).ldelim();
    }
    if (message.stream_data !== void 0) {
      StreamData.encode(message.stream_data, writer.uint32(154).fork()).ldelim();
    }
    if (message.stream_presence_event !== void 0) {
      StreamPresenceEvent.encode(message.stream_presence_event, writer.uint32(162).fork()).ldelim();
    }
    if (message.ping !== void 0) {
      Ping.encode(message.ping, writer.uint32(170).fork()).ldelim();
    }
    if (message.pong !== void 0) {
      Pong.encode(message.pong, writer.uint32(178).fork()).ldelim();
    }
    if (message.party !== void 0) {
      Party.encode(message.party, writer.uint32(186).fork()).ldelim();
    }
    if (message.party_create !== void 0) {
      PartyCreate.encode(message.party_create, writer.uint32(194).fork()).ldelim();
    }
    if (message.party_join !== void 0) {
      PartyJoin.encode(message.party_join, writer.uint32(202).fork()).ldelim();
    }
    if (message.party_leave !== void 0) {
      PartyLeave.encode(message.party_leave, writer.uint32(210).fork()).ldelim();
    }
    if (message.party_promote !== void 0) {
      PartyPromote.encode(message.party_promote, writer.uint32(218).fork()).ldelim();
    }
    if (message.party_leader !== void 0) {
      PartyLeader.encode(message.party_leader, writer.uint32(226).fork()).ldelim();
    }
    if (message.party_accept !== void 0) {
      PartyAccept.encode(message.party_accept, writer.uint32(234).fork()).ldelim();
    }
    if (message.party_remove !== void 0) {
      PartyRemove.encode(message.party_remove, writer.uint32(242).fork()).ldelim();
    }
    if (message.party_close !== void 0) {
      PartyClose.encode(message.party_close, writer.uint32(250).fork()).ldelim();
    }
    if (message.party_join_request_list !== void 0) {
      PartyJoinRequestList.encode(message.party_join_request_list, writer.uint32(258).fork()).ldelim();
    }
    if (message.party_join_request !== void 0) {
      PartyJoinRequest.encode(message.party_join_request, writer.uint32(266).fork()).ldelim();
    }
    if (message.party_data !== void 0) {
      PartyData.encode(message.party_data, writer.uint32(274).fork()).ldelim();
    }
    if (message.party_data_send !== void 0) {
      PartyDataSend.encode(message.party_data_send, writer.uint32(282).fork()).ldelim();
    }
    if (message.party_presence_event !== void 0) {
      PartyPresenceEvent.encode(message.party_presence_event, writer.uint32(290).fork()).ldelim();
    }
    if (message.message_typing_event !== void 0) {
      MessageTypingEvent.encode(message.message_typing_event, writer.uint32(298).fork()).ldelim();
    }
    if (message.last_seen_message_event !== void 0) {
      LastSeenMessageEvent.encode(message.last_seen_message_event, writer.uint32(306).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseEnvelope();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cid = reader.string();
          break;
        case 2:
          message.channel = Channel.decode(reader, reader.uint32());
          break;
        case 3:
          message.channel_join = ChannelJoin.decode(reader, reader.uint32());
          break;
        case 4:
          message.channel_leave = ChannelLeave.decode(reader, reader.uint32());
          break;
        case 5:
          message.channel_message = ChannelMessage.decode(reader, reader.uint32());
          break;
        case 6:
          message.channel_message_ack = ChannelMessageAck.decode(reader, reader.uint32());
          break;
        case 7:
          message.channel_message_send = ChannelMessageSend.decode(reader, reader.uint32());
          break;
        case 8:
          message.channel_message_update = ChannelMessageUpdate.decode(reader, reader.uint32());
          break;
        case 9:
          message.channel_message_remove = ChannelMessageRemove.decode(reader, reader.uint32());
          break;
        case 10:
          message.channel_presence_event = ChannelPresenceEvent.decode(reader, reader.uint32());
          break;
        case 11:
          message.error = Error2.decode(reader, reader.uint32());
          break;
        case 12:
          message.notifications = Notifications.decode(reader, reader.uint32());
          break;
        case 13:
          message.rpc = Rpc.decode(reader, reader.uint32());
          break;
        case 14:
          message.status = Status.decode(reader, reader.uint32());
          break;
        case 15:
          message.status_follow = StatusFollow.decode(reader, reader.uint32());
          break;
        case 16:
          message.status_presence_event = StatusPresenceEvent.decode(reader, reader.uint32());
          break;
        case 17:
          message.status_unfollow = StatusUnfollow.decode(reader, reader.uint32());
          break;
        case 18:
          message.status_update = StatusUpdate.decode(reader, reader.uint32());
          break;
        case 19:
          message.stream_data = StreamData.decode(reader, reader.uint32());
          break;
        case 20:
          message.stream_presence_event = StreamPresenceEvent.decode(reader, reader.uint32());
          break;
        case 21:
          message.ping = Ping.decode(reader, reader.uint32());
          break;
        case 22:
          message.pong = Pong.decode(reader, reader.uint32());
          break;
        case 23:
          message.party = Party.decode(reader, reader.uint32());
          break;
        case 24:
          message.party_create = PartyCreate.decode(reader, reader.uint32());
          break;
        case 25:
          message.party_join = PartyJoin.decode(reader, reader.uint32());
          break;
        case 26:
          message.party_leave = PartyLeave.decode(reader, reader.uint32());
          break;
        case 27:
          message.party_promote = PartyPromote.decode(reader, reader.uint32());
          break;
        case 28:
          message.party_leader = PartyLeader.decode(reader, reader.uint32());
          break;
        case 29:
          message.party_accept = PartyAccept.decode(reader, reader.uint32());
          break;
        case 30:
          message.party_remove = PartyRemove.decode(reader, reader.uint32());
          break;
        case 31:
          message.party_close = PartyClose.decode(reader, reader.uint32());
          break;
        case 32:
          message.party_join_request_list = PartyJoinRequestList.decode(reader, reader.uint32());
          break;
        case 33:
          message.party_join_request = PartyJoinRequest.decode(reader, reader.uint32());
          break;
        case 34:
          message.party_data = PartyData.decode(reader, reader.uint32());
          break;
        case 35:
          message.party_data_send = PartyDataSend.decode(reader, reader.uint32());
          break;
        case 36:
          message.party_presence_event = PartyPresenceEvent.decode(reader, reader.uint32());
          break;
        case 37:
          message.message_typing_event = MessageTypingEvent.decode(reader, reader.uint32());
          break;
        case 38:
          message.last_seen_message_event = LastSeenMessageEvent.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      cid: isSet4(object.cid) ? String(object.cid) : "",
      channel: isSet4(object.channel) ? Channel.fromJSON(object.channel) : void 0,
      channel_join: isSet4(object.channel_join) ? ChannelJoin.fromJSON(object.channel_join) : void 0,
      channel_leave: isSet4(object.channel_leave) ? ChannelLeave.fromJSON(object.channel_leave) : void 0,
      channel_message: isSet4(object.channel_message) ? ChannelMessage.fromJSON(object.channel_message) : void 0,
      channel_message_ack: isSet4(object.channel_message_ack) ? ChannelMessageAck.fromJSON(object.channel_message_ack) : void 0,
      channel_message_send: isSet4(object.channel_message_send) ? ChannelMessageSend.fromJSON(object.channel_message_send) : void 0,
      channel_message_update: isSet4(object.channel_message_update) ? ChannelMessageUpdate.fromJSON(object.channel_message_update) : void 0,
      channel_message_remove: isSet4(object.channel_message_remove) ? ChannelMessageRemove.fromJSON(object.channel_message_remove) : void 0,
      channel_presence_event: isSet4(object.channel_presence_event) ? ChannelPresenceEvent.fromJSON(object.channel_presence_event) : void 0,
      error: isSet4(object.error) ? Error2.fromJSON(object.error) : void 0,
      notifications: isSet4(object.notifications) ? Notifications.fromJSON(object.notifications) : void 0,
      rpc: isSet4(object.rpc) ? Rpc.fromJSON(object.rpc) : void 0,
      status: isSet4(object.status) ? Status.fromJSON(object.status) : void 0,
      status_follow: isSet4(object.status_follow) ? StatusFollow.fromJSON(object.status_follow) : void 0,
      status_presence_event: isSet4(object.status_presence_event) ? StatusPresenceEvent.fromJSON(object.status_presence_event) : void 0,
      status_unfollow: isSet4(object.status_unfollow) ? StatusUnfollow.fromJSON(object.status_unfollow) : void 0,
      status_update: isSet4(object.status_update) ? StatusUpdate.fromJSON(object.status_update) : void 0,
      stream_data: isSet4(object.stream_data) ? StreamData.fromJSON(object.stream_data) : void 0,
      stream_presence_event: isSet4(object.stream_presence_event) ? StreamPresenceEvent.fromJSON(object.stream_presence_event) : void 0,
      ping: isSet4(object.ping) ? Ping.fromJSON(object.ping) : void 0,
      pong: isSet4(object.pong) ? Pong.fromJSON(object.pong) : void 0,
      party: isSet4(object.party) ? Party.fromJSON(object.party) : void 0,
      party_create: isSet4(object.party_create) ? PartyCreate.fromJSON(object.party_create) : void 0,
      party_join: isSet4(object.party_join) ? PartyJoin.fromJSON(object.party_join) : void 0,
      party_leave: isSet4(object.party_leave) ? PartyLeave.fromJSON(object.party_leave) : void 0,
      party_promote: isSet4(object.party_promote) ? PartyPromote.fromJSON(object.party_promote) : void 0,
      party_leader: isSet4(object.party_leader) ? PartyLeader.fromJSON(object.party_leader) : void 0,
      party_accept: isSet4(object.party_accept) ? PartyAccept.fromJSON(object.party_accept) : void 0,
      party_remove: isSet4(object.party_remove) ? PartyRemove.fromJSON(object.party_remove) : void 0,
      party_close: isSet4(object.party_close) ? PartyClose.fromJSON(object.party_close) : void 0,
      party_join_request_list: isSet4(object.party_join_request_list) ? PartyJoinRequestList.fromJSON(object.party_join_request_list) : void 0,
      party_join_request: isSet4(object.party_join_request) ? PartyJoinRequest.fromJSON(object.party_join_request) : void 0,
      party_data: isSet4(object.party_data) ? PartyData.fromJSON(object.party_data) : void 0,
      party_data_send: isSet4(object.party_data_send) ? PartyDataSend.fromJSON(object.party_data_send) : void 0,
      party_presence_event: isSet4(object.party_presence_event) ? PartyPresenceEvent.fromJSON(object.party_presence_event) : void 0,
      message_typing_event: isSet4(object.message_typing_event) ? MessageTypingEvent.fromJSON(object.message_typing_event) : void 0,
      last_seen_message_event: isSet4(object.last_seen_message_event) ? LastSeenMessageEvent.fromJSON(object.last_seen_message_event) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.cid !== void 0 && (obj.cid = message.cid);
    message.channel !== void 0 && (obj.channel = message.channel ? Channel.toJSON(message.channel) : void 0);
    message.channel_join !== void 0 && (obj.channel_join = message.channel_join ? ChannelJoin.toJSON(message.channel_join) : void 0);
    message.channel_leave !== void 0 && (obj.channel_leave = message.channel_leave ? ChannelLeave.toJSON(message.channel_leave) : void 0);
    message.channel_message !== void 0 && (obj.channel_message = message.channel_message ? ChannelMessage.toJSON(message.channel_message) : void 0);
    message.channel_message_ack !== void 0 && (obj.channel_message_ack = message.channel_message_ack ? ChannelMessageAck.toJSON(message.channel_message_ack) : void 0);
    message.channel_message_send !== void 0 && (obj.channel_message_send = message.channel_message_send ? ChannelMessageSend.toJSON(message.channel_message_send) : void 0);
    message.channel_message_update !== void 0 && (obj.channel_message_update = message.channel_message_update ? ChannelMessageUpdate.toJSON(message.channel_message_update) : void 0);
    message.channel_message_remove !== void 0 && (obj.channel_message_remove = message.channel_message_remove ? ChannelMessageRemove.toJSON(message.channel_message_remove) : void 0);
    message.channel_presence_event !== void 0 && (obj.channel_presence_event = message.channel_presence_event ? ChannelPresenceEvent.toJSON(message.channel_presence_event) : void 0);
    message.error !== void 0 && (obj.error = message.error ? Error2.toJSON(message.error) : void 0);
    message.notifications !== void 0 && (obj.notifications = message.notifications ? Notifications.toJSON(message.notifications) : void 0);
    message.rpc !== void 0 && (obj.rpc = message.rpc ? Rpc.toJSON(message.rpc) : void 0);
    message.status !== void 0 && (obj.status = message.status ? Status.toJSON(message.status) : void 0);
    message.status_follow !== void 0 && (obj.status_follow = message.status_follow ? StatusFollow.toJSON(message.status_follow) : void 0);
    message.status_presence_event !== void 0 && (obj.status_presence_event = message.status_presence_event ? StatusPresenceEvent.toJSON(message.status_presence_event) : void 0);
    message.status_unfollow !== void 0 && (obj.status_unfollow = message.status_unfollow ? StatusUnfollow.toJSON(message.status_unfollow) : void 0);
    message.status_update !== void 0 && (obj.status_update = message.status_update ? StatusUpdate.toJSON(message.status_update) : void 0);
    message.stream_data !== void 0 && (obj.stream_data = message.stream_data ? StreamData.toJSON(message.stream_data) : void 0);
    message.stream_presence_event !== void 0 && (obj.stream_presence_event = message.stream_presence_event ? StreamPresenceEvent.toJSON(message.stream_presence_event) : void 0);
    message.ping !== void 0 && (obj.ping = message.ping ? Ping.toJSON(message.ping) : void 0);
    message.pong !== void 0 && (obj.pong = message.pong ? Pong.toJSON(message.pong) : void 0);
    message.party !== void 0 && (obj.party = message.party ? Party.toJSON(message.party) : void 0);
    message.party_create !== void 0 && (obj.party_create = message.party_create ? PartyCreate.toJSON(message.party_create) : void 0);
    message.party_join !== void 0 && (obj.party_join = message.party_join ? PartyJoin.toJSON(message.party_join) : void 0);
    message.party_leave !== void 0 && (obj.party_leave = message.party_leave ? PartyLeave.toJSON(message.party_leave) : void 0);
    message.party_promote !== void 0 && (obj.party_promote = message.party_promote ? PartyPromote.toJSON(message.party_promote) : void 0);
    message.party_leader !== void 0 && (obj.party_leader = message.party_leader ? PartyLeader.toJSON(message.party_leader) : void 0);
    message.party_accept !== void 0 && (obj.party_accept = message.party_accept ? PartyAccept.toJSON(message.party_accept) : void 0);
    message.party_remove !== void 0 && (obj.party_remove = message.party_remove ? PartyRemove.toJSON(message.party_remove) : void 0);
    message.party_close !== void 0 && (obj.party_close = message.party_close ? PartyClose.toJSON(message.party_close) : void 0);
    message.party_join_request_list !== void 0 && (obj.party_join_request_list = message.party_join_request_list ? PartyJoinRequestList.toJSON(message.party_join_request_list) : void 0);
    message.party_join_request !== void 0 && (obj.party_join_request = message.party_join_request ? PartyJoinRequest.toJSON(message.party_join_request) : void 0);
    message.party_data !== void 0 && (obj.party_data = message.party_data ? PartyData.toJSON(message.party_data) : void 0);
    message.party_data_send !== void 0 && (obj.party_data_send = message.party_data_send ? PartyDataSend.toJSON(message.party_data_send) : void 0);
    message.party_presence_event !== void 0 && (obj.party_presence_event = message.party_presence_event ? PartyPresenceEvent.toJSON(message.party_presence_event) : void 0);
    message.message_typing_event !== void 0 && (obj.message_typing_event = message.message_typing_event ? MessageTypingEvent.toJSON(message.message_typing_event) : void 0);
    message.last_seen_message_event !== void 0 && (obj.last_seen_message_event = message.last_seen_message_event ? LastSeenMessageEvent.toJSON(message.last_seen_message_event) : void 0);
    return obj;
  },
  create(base) {
    return Envelope.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a;
    const message = createBaseEnvelope();
    message.cid = (_a = object.cid) != null ? _a : "";
    message.channel = object.channel !== void 0 && object.channel !== null ? Channel.fromPartial(object.channel) : void 0;
    message.channel_join = object.channel_join !== void 0 && object.channel_join !== null ? ChannelJoin.fromPartial(object.channel_join) : void 0;
    message.channel_leave = object.channel_leave !== void 0 && object.channel_leave !== null ? ChannelLeave.fromPartial(object.channel_leave) : void 0;
    message.channel_message = object.channel_message !== void 0 && object.channel_message !== null ? ChannelMessage.fromPartial(object.channel_message) : void 0;
    message.channel_message_ack = object.channel_message_ack !== void 0 && object.channel_message_ack !== null ? ChannelMessageAck.fromPartial(object.channel_message_ack) : void 0;
    message.channel_message_send = object.channel_message_send !== void 0 && object.channel_message_send !== null ? ChannelMessageSend.fromPartial(object.channel_message_send) : void 0;
    message.channel_message_update = object.channel_message_update !== void 0 && object.channel_message_update !== null ? ChannelMessageUpdate.fromPartial(object.channel_message_update) : void 0;
    message.channel_message_remove = object.channel_message_remove !== void 0 && object.channel_message_remove !== null ? ChannelMessageRemove.fromPartial(object.channel_message_remove) : void 0;
    message.channel_presence_event = object.channel_presence_event !== void 0 && object.channel_presence_event !== null ? ChannelPresenceEvent.fromPartial(object.channel_presence_event) : void 0;
    message.error = object.error !== void 0 && object.error !== null ? Error2.fromPartial(object.error) : void 0;
    message.notifications = object.notifications !== void 0 && object.notifications !== null ? Notifications.fromPartial(object.notifications) : void 0;
    message.rpc = object.rpc !== void 0 && object.rpc !== null ? Rpc.fromPartial(object.rpc) : void 0;
    message.status = object.status !== void 0 && object.status !== null ? Status.fromPartial(object.status) : void 0;
    message.status_follow = object.status_follow !== void 0 && object.status_follow !== null ? StatusFollow.fromPartial(object.status_follow) : void 0;
    message.status_presence_event = object.status_presence_event !== void 0 && object.status_presence_event !== null ? StatusPresenceEvent.fromPartial(object.status_presence_event) : void 0;
    message.status_unfollow = object.status_unfollow !== void 0 && object.status_unfollow !== null ? StatusUnfollow.fromPartial(object.status_unfollow) : void 0;
    message.status_update = object.status_update !== void 0 && object.status_update !== null ? StatusUpdate.fromPartial(object.status_update) : void 0;
    message.stream_data = object.stream_data !== void 0 && object.stream_data !== null ? StreamData.fromPartial(object.stream_data) : void 0;
    message.stream_presence_event = object.stream_presence_event !== void 0 && object.stream_presence_event !== null ? StreamPresenceEvent.fromPartial(object.stream_presence_event) : void 0;
    message.ping = object.ping !== void 0 && object.ping !== null ? Ping.fromPartial(object.ping) : void 0;
    message.pong = object.pong !== void 0 && object.pong !== null ? Pong.fromPartial(object.pong) : void 0;
    message.party = object.party !== void 0 && object.party !== null ? Party.fromPartial(object.party) : void 0;
    message.party_create = object.party_create !== void 0 && object.party_create !== null ? PartyCreate.fromPartial(object.party_create) : void 0;
    message.party_join = object.party_join !== void 0 && object.party_join !== null ? PartyJoin.fromPartial(object.party_join) : void 0;
    message.party_leave = object.party_leave !== void 0 && object.party_leave !== null ? PartyLeave.fromPartial(object.party_leave) : void 0;
    message.party_promote = object.party_promote !== void 0 && object.party_promote !== null ? PartyPromote.fromPartial(object.party_promote) : void 0;
    message.party_leader = object.party_leader !== void 0 && object.party_leader !== null ? PartyLeader.fromPartial(object.party_leader) : void 0;
    message.party_accept = object.party_accept !== void 0 && object.party_accept !== null ? PartyAccept.fromPartial(object.party_accept) : void 0;
    message.party_remove = object.party_remove !== void 0 && object.party_remove !== null ? PartyRemove.fromPartial(object.party_remove) : void 0;
    message.party_close = object.party_close !== void 0 && object.party_close !== null ? PartyClose.fromPartial(object.party_close) : void 0;
    message.party_join_request_list = object.party_join_request_list !== void 0 && object.party_join_request_list !== null ? PartyJoinRequestList.fromPartial(object.party_join_request_list) : void 0;
    message.party_join_request = object.party_join_request !== void 0 && object.party_join_request !== null ? PartyJoinRequest.fromPartial(object.party_join_request) : void 0;
    message.party_data = object.party_data !== void 0 && object.party_data !== null ? PartyData.fromPartial(object.party_data) : void 0;
    message.party_data_send = object.party_data_send !== void 0 && object.party_data_send !== null ? PartyDataSend.fromPartial(object.party_data_send) : void 0;
    message.party_presence_event = object.party_presence_event !== void 0 && object.party_presence_event !== null ? PartyPresenceEvent.fromPartial(object.party_presence_event) : void 0;
    message.message_typing_event = object.message_typing_event !== void 0 && object.message_typing_event !== null ? MessageTypingEvent.fromPartial(object.message_typing_event) : void 0;
    message.last_seen_message_event = object.last_seen_message_event !== void 0 && object.last_seen_message_event !== null ? LastSeenMessageEvent.fromPartial(object.last_seen_message_event) : void 0;
    return message;
  }
};
function createBaseChannel() {
  return { id: "", presences: [], self: void 0, chanel_name: "", user_id_one: "", user_id_two: "" };
}
var Channel = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    for (const v of message.presences) {
      UserPresence.encode(v, writer.uint32(18).fork()).ldelim();
    }
    if (message.self !== void 0) {
      UserPresence.encode(message.self, writer.uint32(26).fork()).ldelim();
    }
    if (message.chanel_name !== "") {
      writer.uint32(34).string(message.chanel_name);
    }
    if (message.user_id_one !== "") {
      writer.uint32(42).string(message.user_id_one);
    }
    if (message.user_id_two !== "") {
      writer.uint32(50).string(message.user_id_two);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseChannel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.presences.push(UserPresence.decode(reader, reader.uint32()));
          break;
        case 3:
          message.self = UserPresence.decode(reader, reader.uint32());
          break;
        case 4:
          message.chanel_name = reader.string();
          break;
        case 5:
          message.user_id_one = reader.string();
          break;
        case 6:
          message.user_id_two = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      id: isSet4(object.id) ? String(object.id) : "",
      presences: Array.isArray(object == null ? void 0 : object.presences) ? object.presences.map((e) => UserPresence.fromJSON(e)) : [],
      self: isSet4(object.self) ? UserPresence.fromJSON(object.self) : void 0,
      chanel_name: isSet4(object.chanel_name) ? String(object.chanel_name) : "",
      user_id_one: isSet4(object.user_id_one) ? String(object.user_id_one) : "",
      user_id_two: isSet4(object.user_id_two) ? String(object.user_id_two) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.id !== void 0 && (obj.id = message.id);
    if (message.presences) {
      obj.presences = message.presences.map((e) => e ? UserPresence.toJSON(e) : void 0);
    } else {
      obj.presences = [];
    }
    message.self !== void 0 && (obj.self = message.self ? UserPresence.toJSON(message.self) : void 0);
    message.chanel_name !== void 0 && (obj.chanel_name = message.chanel_name);
    message.user_id_one !== void 0 && (obj.user_id_one = message.user_id_one);
    message.user_id_two !== void 0 && (obj.user_id_two = message.user_id_two);
    return obj;
  },
  create(base) {
    return Channel.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b, _c, _d, _e;
    const message = createBaseChannel();
    message.id = (_a = object.id) != null ? _a : "";
    message.presences = ((_b = object.presences) == null ? void 0 : _b.map((e) => UserPresence.fromPartial(e))) || [];
    message.self = object.self !== void 0 && object.self !== null ? UserPresence.fromPartial(object.self) : void 0;
    message.chanel_name = (_c = object.chanel_name) != null ? _c : "";
    message.user_id_one = (_d = object.user_id_one) != null ? _d : "";
    message.user_id_two = (_e = object.user_id_two) != null ? _e : "";
    return message;
  }
};
function createBaseChannelJoin() {
  return { target_id: "", target: "", type: 0, persistence: void 0, hidden: void 0 };
}
var ChannelJoin = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.target_id !== "") {
      writer.uint32(10).string(message.target_id);
    }
    if (message.target !== "") {
      writer.uint32(18).string(message.target);
    }
    if (message.type !== 0) {
      writer.uint32(24).int32(message.type);
    }
    if (message.persistence !== void 0) {
      BoolValue.encode({ value: message.persistence }, writer.uint32(34).fork()).ldelim();
    }
    if (message.hidden !== void 0) {
      BoolValue.encode({ value: message.hidden }, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseChannelJoin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.target_id = reader.string();
          break;
        case 2:
          message.target = reader.string();
          break;
        case 3:
          message.type = reader.int32();
          break;
        case 4:
          message.persistence = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 5:
          message.hidden = BoolValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      target_id: isSet4(object.target_id) ? String(object.target_id) : "",
      target: isSet4(object.target) ? String(object.target) : "",
      type: isSet4(object.type) ? Number(object.type) : 0,
      persistence: isSet4(object.persistence) ? Boolean(object.persistence) : void 0,
      hidden: isSet4(object.hidden) ? Boolean(object.hidden) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.target_id !== void 0 && (obj.target_id = message.target_id);
    message.target !== void 0 && (obj.target = message.target);
    message.type !== void 0 && (obj.type = Math.round(message.type));
    message.persistence !== void 0 && (obj.persistence = message.persistence);
    message.hidden !== void 0 && (obj.hidden = message.hidden);
    return obj;
  },
  create(base) {
    return ChannelJoin.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b, _c, _d, _e;
    const message = createBaseChannelJoin();
    message.target_id = (_a = object.target_id) != null ? _a : "";
    message.target = (_b = object.target) != null ? _b : "";
    message.type = (_c = object.type) != null ? _c : 0;
    message.persistence = (_d = object.persistence) != null ? _d : void 0;
    message.hidden = (_e = object.hidden) != null ? _e : void 0;
    return message;
  }
};
function createBaseChannelLeave() {
  return { channel_id: "" };
}
var ChannelLeave = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseChannelLeave();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channel_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return { channel_id: isSet4(object.channel_id) ? String(object.channel_id) : "" };
  },
  toJSON(message) {
    const obj = {};
    message.channel_id !== void 0 && (obj.channel_id = message.channel_id);
    return obj;
  },
  create(base) {
    return ChannelLeave.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a;
    const message = createBaseChannelLeave();
    message.channel_id = (_a = object.channel_id) != null ? _a : "";
    return message;
  }
};
function createBaseChannelMessageAck() {
  return {
    channel_id: "",
    message_id: "",
    code: void 0,
    username: "",
    create_time: void 0,
    update_time: void 0,
    persistent: void 0,
    channel_name: "",
    user_id_one: "",
    user_id_two: ""
  };
}
var ChannelMessageAck = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    if (message.message_id !== "") {
      writer.uint32(18).string(message.message_id);
    }
    if (message.code !== void 0) {
      Int32Value.encode({ value: message.code }, writer.uint32(26).fork()).ldelim();
    }
    if (message.username !== "") {
      writer.uint32(34).string(message.username);
    }
    if (message.create_time !== void 0) {
      Timestamp.encode(toTimestamp2(message.create_time), writer.uint32(42).fork()).ldelim();
    }
    if (message.update_time !== void 0) {
      Timestamp.encode(toTimestamp2(message.update_time), writer.uint32(50).fork()).ldelim();
    }
    if (message.persistent !== void 0) {
      BoolValue.encode({ value: message.persistent }, writer.uint32(58).fork()).ldelim();
    }
    if (message.channel_name !== "") {
      writer.uint32(66).string(message.channel_name);
    }
    if (message.user_id_one !== "") {
      writer.uint32(74).string(message.user_id_one);
    }
    if (message.user_id_two !== "") {
      writer.uint32(82).string(message.user_id_two);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseChannelMessageAck();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channel_id = reader.string();
          break;
        case 2:
          message.message_id = reader.string();
          break;
        case 3:
          message.code = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 4:
          message.username = reader.string();
          break;
        case 5:
          message.create_time = fromTimestamp2(Timestamp.decode(reader, reader.uint32()));
          break;
        case 6:
          message.update_time = fromTimestamp2(Timestamp.decode(reader, reader.uint32()));
          break;
        case 7:
          message.persistent = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 8:
          message.channel_name = reader.string();
          break;
        case 9:
          message.user_id_one = reader.string();
          break;
        case 10:
          message.user_id_two = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      channel_id: isSet4(object.channel_id) ? String(object.channel_id) : "",
      message_id: isSet4(object.message_id) ? String(object.message_id) : "",
      code: isSet4(object.code) ? Number(object.code) : void 0,
      username: isSet4(object.username) ? String(object.username) : "",
      create_time: isSet4(object.create_time) ? fromJsonTimestamp2(object.create_time) : void 0,
      update_time: isSet4(object.update_time) ? fromJsonTimestamp2(object.update_time) : void 0,
      persistent: isSet4(object.persistent) ? Boolean(object.persistent) : void 0,
      channel_name: isSet4(object.channel_name) ? String(object.channel_name) : "",
      user_id_one: isSet4(object.user_id_one) ? String(object.user_id_one) : "",
      user_id_two: isSet4(object.user_id_two) ? String(object.user_id_two) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.channel_id !== void 0 && (obj.channel_id = message.channel_id);
    message.message_id !== void 0 && (obj.message_id = message.message_id);
    message.code !== void 0 && (obj.code = message.code);
    message.username !== void 0 && (obj.username = message.username);
    message.create_time !== void 0 && (obj.create_time = message.create_time.toISOString());
    message.update_time !== void 0 && (obj.update_time = message.update_time.toISOString());
    message.persistent !== void 0 && (obj.persistent = message.persistent);
    message.channel_name !== void 0 && (obj.channel_name = message.channel_name);
    message.user_id_one !== void 0 && (obj.user_id_one = message.user_id_one);
    message.user_id_two !== void 0 && (obj.user_id_two = message.user_id_two);
    return obj;
  },
  create(base) {
    return ChannelMessageAck.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
    const message = createBaseChannelMessageAck();
    message.channel_id = (_a = object.channel_id) != null ? _a : "";
    message.message_id = (_b = object.message_id) != null ? _b : "";
    message.code = (_c = object.code) != null ? _c : void 0;
    message.username = (_d = object.username) != null ? _d : "";
    message.create_time = (_e = object.create_time) != null ? _e : void 0;
    message.update_time = (_f = object.update_time) != null ? _f : void 0;
    message.persistent = (_g = object.persistent) != null ? _g : void 0;
    message.channel_name = (_h = object.channel_name) != null ? _h : "";
    message.user_id_one = (_i = object.user_id_one) != null ? _i : "";
    message.user_id_two = (_j = object.user_id_two) != null ? _j : "";
    return message;
  }
};
function createBaseChannelMessageSend() {
  return { clan_id: "", channel_id: "", content: "" };
}
var ChannelMessageSend = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.clan_id !== "") {
      writer.uint32(10).string(message.clan_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    if (message.content !== "") {
      writer.uint32(26).string(message.content);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseChannelMessageSend();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clan_id = reader.string();
          break;
        case 2:
          message.channel_id = reader.string();
          break;
        case 3:
          message.content = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      clan_id: isSet4(object.clan_id) ? String(object.clan_id) : "",
      channel_id: isSet4(object.channel_id) ? String(object.channel_id) : "",
      content: isSet4(object.content) ? String(object.content) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.clan_id !== void 0 && (obj.clan_id = message.clan_id);
    message.channel_id !== void 0 && (obj.channel_id = message.channel_id);
    message.content !== void 0 && (obj.content = message.content);
    return obj;
  },
  create(base) {
    return ChannelMessageSend.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b, _c;
    const message = createBaseChannelMessageSend();
    message.clan_id = (_a = object.clan_id) != null ? _a : "";
    message.channel_id = (_b = object.channel_id) != null ? _b : "";
    message.content = (_c = object.content) != null ? _c : "";
    return message;
  }
};
function createBaseChannelMessageUpdate() {
  return { channel_id: "", message_id: "", content: "" };
}
var ChannelMessageUpdate = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    if (message.message_id !== "") {
      writer.uint32(18).string(message.message_id);
    }
    if (message.content !== "") {
      writer.uint32(26).string(message.content);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseChannelMessageUpdate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channel_id = reader.string();
          break;
        case 2:
          message.message_id = reader.string();
          break;
        case 3:
          message.content = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      channel_id: isSet4(object.channel_id) ? String(object.channel_id) : "",
      message_id: isSet4(object.message_id) ? String(object.message_id) : "",
      content: isSet4(object.content) ? String(object.content) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.channel_id !== void 0 && (obj.channel_id = message.channel_id);
    message.message_id !== void 0 && (obj.message_id = message.message_id);
    message.content !== void 0 && (obj.content = message.content);
    return obj;
  },
  create(base) {
    return ChannelMessageUpdate.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b, _c;
    const message = createBaseChannelMessageUpdate();
    message.channel_id = (_a = object.channel_id) != null ? _a : "";
    message.message_id = (_b = object.message_id) != null ? _b : "";
    message.content = (_c = object.content) != null ? _c : "";
    return message;
  }
};
function createBaseChannelMessageRemove() {
  return { channel_id: "", message_id: "" };
}
var ChannelMessageRemove = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    if (message.message_id !== "") {
      writer.uint32(18).string(message.message_id);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseChannelMessageRemove();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channel_id = reader.string();
          break;
        case 2:
          message.message_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      channel_id: isSet4(object.channel_id) ? String(object.channel_id) : "",
      message_id: isSet4(object.message_id) ? String(object.message_id) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.channel_id !== void 0 && (obj.channel_id = message.channel_id);
    message.message_id !== void 0 && (obj.message_id = message.message_id);
    return obj;
  },
  create(base) {
    return ChannelMessageRemove.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b;
    const message = createBaseChannelMessageRemove();
    message.channel_id = (_a = object.channel_id) != null ? _a : "";
    message.message_id = (_b = object.message_id) != null ? _b : "";
    return message;
  }
};
function createBaseChannelPresenceEvent() {
  return { channel_id: "", joins: [], leaves: [], channel_name: "", user_id_one: "", user_id_two: "" };
}
var ChannelPresenceEvent = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    for (const v of message.joins) {
      UserPresence.encode(v, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.leaves) {
      UserPresence.encode(v, writer.uint32(26).fork()).ldelim();
    }
    if (message.channel_name !== "") {
      writer.uint32(34).string(message.channel_name);
    }
    if (message.user_id_one !== "") {
      writer.uint32(42).string(message.user_id_one);
    }
    if (message.user_id_two !== "") {
      writer.uint32(50).string(message.user_id_two);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseChannelPresenceEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channel_id = reader.string();
          break;
        case 2:
          message.joins.push(UserPresence.decode(reader, reader.uint32()));
          break;
        case 3:
          message.leaves.push(UserPresence.decode(reader, reader.uint32()));
          break;
        case 4:
          message.channel_name = reader.string();
          break;
        case 5:
          message.user_id_one = reader.string();
          break;
        case 6:
          message.user_id_two = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      channel_id: isSet4(object.channel_id) ? String(object.channel_id) : "",
      joins: Array.isArray(object == null ? void 0 : object.joins) ? object.joins.map((e) => UserPresence.fromJSON(e)) : [],
      leaves: Array.isArray(object == null ? void 0 : object.leaves) ? object.leaves.map((e) => UserPresence.fromJSON(e)) : [],
      channel_name: isSet4(object.channel_name) ? String(object.channel_name) : "",
      user_id_one: isSet4(object.user_id_one) ? String(object.user_id_one) : "",
      user_id_two: isSet4(object.user_id_two) ? String(object.user_id_two) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.channel_id !== void 0 && (obj.channel_id = message.channel_id);
    if (message.joins) {
      obj.joins = message.joins.map((e) => e ? UserPresence.toJSON(e) : void 0);
    } else {
      obj.joins = [];
    }
    if (message.leaves) {
      obj.leaves = message.leaves.map((e) => e ? UserPresence.toJSON(e) : void 0);
    } else {
      obj.leaves = [];
    }
    message.channel_name !== void 0 && (obj.channel_name = message.channel_name);
    message.user_id_one !== void 0 && (obj.user_id_one = message.user_id_one);
    message.user_id_two !== void 0 && (obj.user_id_two = message.user_id_two);
    return obj;
  },
  create(base) {
    return ChannelPresenceEvent.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b, _c, _d, _e, _f;
    const message = createBaseChannelPresenceEvent();
    message.channel_id = (_a = object.channel_id) != null ? _a : "";
    message.joins = ((_b = object.joins) == null ? void 0 : _b.map((e) => UserPresence.fromPartial(e))) || [];
    message.leaves = ((_c = object.leaves) == null ? void 0 : _c.map((e) => UserPresence.fromPartial(e))) || [];
    message.channel_name = (_d = object.channel_name) != null ? _d : "";
    message.user_id_one = (_e = object.user_id_one) != null ? _e : "";
    message.user_id_two = (_f = object.user_id_two) != null ? _f : "";
    return message;
  }
};
function createBaseError() {
  return { code: 0, message: "", context: {} };
}
var Error2 = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    Object.entries(message.context).forEach(([key, value]) => {
      Error_ContextEntry.encode({ key, value }, writer.uint32(26).fork()).ldelim();
    });
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseError();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.code = reader.int32();
          break;
        case 2:
          message.message = reader.string();
          break;
        case 3:
          const entry3 = Error_ContextEntry.decode(reader, reader.uint32());
          if (entry3.value !== void 0) {
            message.context[entry3.key] = entry3.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      code: isSet4(object.code) ? Number(object.code) : 0,
      message: isSet4(object.message) ? String(object.message) : "",
      context: isObject(object.context) ? Object.entries(object.context).reduce((acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      }, {}) : {}
    };
  },
  toJSON(message) {
    const obj = {};
    message.code !== void 0 && (obj.code = Math.round(message.code));
    message.message !== void 0 && (obj.message = message.message);
    obj.context = {};
    if (message.context) {
      Object.entries(message.context).forEach(([k, v]) => {
        obj.context[k] = v;
      });
    }
    return obj;
  },
  create(base) {
    return Error2.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b, _c;
    const message = createBaseError();
    message.code = (_a = object.code) != null ? _a : 0;
    message.message = (_b = object.message) != null ? _b : "";
    message.context = Object.entries((_c = object.context) != null ? _c : {}).reduce((acc, [key, value]) => {
      if (value !== void 0) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    return message;
  }
};
function createBaseError_ContextEntry() {
  return { key: "", value: "" };
}
var Error_ContextEntry = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseError_ContextEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return { key: isSet4(object.key) ? String(object.key) : "", value: isSet4(object.value) ? String(object.value) : "" };
  },
  toJSON(message) {
    const obj = {};
    message.key !== void 0 && (obj.key = message.key);
    message.value !== void 0 && (obj.value = message.value);
    return obj;
  },
  create(base) {
    return Error_ContextEntry.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b;
    const message = createBaseError_ContextEntry();
    message.key = (_a = object.key) != null ? _a : "";
    message.value = (_b = object.value) != null ? _b : "";
    return message;
  }
};
function createBaseNotifications() {
  return { notifications: [] };
}
var Notifications = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    for (const v of message.notifications) {
      Notification.encode(v, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseNotifications();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.notifications.push(Notification.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      notifications: Array.isArray(object == null ? void 0 : object.notifications) ? object.notifications.map((e) => Notification.fromJSON(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.notifications) {
      obj.notifications = message.notifications.map((e) => e ? Notification.toJSON(e) : void 0);
    } else {
      obj.notifications = [];
    }
    return obj;
  },
  create(base) {
    return Notifications.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a;
    const message = createBaseNotifications();
    message.notifications = ((_a = object.notifications) == null ? void 0 : _a.map((e) => Notification.fromPartial(e))) || [];
    return message;
  }
};
function createBaseParty() {
  return { party_id: "", open: false, max_size: 0, self: void 0, leader: void 0, presences: [] };
}
var Party = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    if (message.open === true) {
      writer.uint32(16).bool(message.open);
    }
    if (message.max_size !== 0) {
      writer.uint32(24).int32(message.max_size);
    }
    if (message.self !== void 0) {
      UserPresence.encode(message.self, writer.uint32(34).fork()).ldelim();
    }
    if (message.leader !== void 0) {
      UserPresence.encode(message.leader, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.presences) {
      UserPresence.encode(v, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseParty();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        case 2:
          message.open = reader.bool();
          break;
        case 3:
          message.max_size = reader.int32();
          break;
        case 4:
          message.self = UserPresence.decode(reader, reader.uint32());
          break;
        case 5:
          message.leader = UserPresence.decode(reader, reader.uint32());
          break;
        case 6:
          message.presences.push(UserPresence.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      party_id: isSet4(object.party_id) ? String(object.party_id) : "",
      open: isSet4(object.open) ? Boolean(object.open) : false,
      max_size: isSet4(object.max_size) ? Number(object.max_size) : 0,
      self: isSet4(object.self) ? UserPresence.fromJSON(object.self) : void 0,
      leader: isSet4(object.leader) ? UserPresence.fromJSON(object.leader) : void 0,
      presences: Array.isArray(object == null ? void 0 : object.presences) ? object.presences.map((e) => UserPresence.fromJSON(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    message.party_id !== void 0 && (obj.party_id = message.party_id);
    message.open !== void 0 && (obj.open = message.open);
    message.max_size !== void 0 && (obj.max_size = Math.round(message.max_size));
    message.self !== void 0 && (obj.self = message.self ? UserPresence.toJSON(message.self) : void 0);
    message.leader !== void 0 && (obj.leader = message.leader ? UserPresence.toJSON(message.leader) : void 0);
    if (message.presences) {
      obj.presences = message.presences.map((e) => e ? UserPresence.toJSON(e) : void 0);
    } else {
      obj.presences = [];
    }
    return obj;
  },
  create(base) {
    return Party.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b, _c, _d;
    const message = createBaseParty();
    message.party_id = (_a = object.party_id) != null ? _a : "";
    message.open = (_b = object.open) != null ? _b : false;
    message.max_size = (_c = object.max_size) != null ? _c : 0;
    message.self = object.self !== void 0 && object.self !== null ? UserPresence.fromPartial(object.self) : void 0;
    message.leader = object.leader !== void 0 && object.leader !== null ? UserPresence.fromPartial(object.leader) : void 0;
    message.presences = ((_d = object.presences) == null ? void 0 : _d.map((e) => UserPresence.fromPartial(e))) || [];
    return message;
  }
};
function createBasePartyCreate() {
  return { open: false, max_size: 0 };
}
var PartyCreate = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.open === true) {
      writer.uint32(8).bool(message.open);
    }
    if (message.max_size !== 0) {
      writer.uint32(16).int32(message.max_size);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBasePartyCreate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.open = reader.bool();
          break;
        case 2:
          message.max_size = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      open: isSet4(object.open) ? Boolean(object.open) : false,
      max_size: isSet4(object.max_size) ? Number(object.max_size) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.open !== void 0 && (obj.open = message.open);
    message.max_size !== void 0 && (obj.max_size = Math.round(message.max_size));
    return obj;
  },
  create(base) {
    return PartyCreate.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b;
    const message = createBasePartyCreate();
    message.open = (_a = object.open) != null ? _a : false;
    message.max_size = (_b = object.max_size) != null ? _b : 0;
    return message;
  }
};
function createBasePartyJoin() {
  return { party_id: "" };
}
var PartyJoin = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBasePartyJoin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return { party_id: isSet4(object.party_id) ? String(object.party_id) : "" };
  },
  toJSON(message) {
    const obj = {};
    message.party_id !== void 0 && (obj.party_id = message.party_id);
    return obj;
  },
  create(base) {
    return PartyJoin.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a;
    const message = createBasePartyJoin();
    message.party_id = (_a = object.party_id) != null ? _a : "";
    return message;
  }
};
function createBasePartyLeave() {
  return { party_id: "" };
}
var PartyLeave = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBasePartyLeave();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return { party_id: isSet4(object.party_id) ? String(object.party_id) : "" };
  },
  toJSON(message) {
    const obj = {};
    message.party_id !== void 0 && (obj.party_id = message.party_id);
    return obj;
  },
  create(base) {
    return PartyLeave.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a;
    const message = createBasePartyLeave();
    message.party_id = (_a = object.party_id) != null ? _a : "";
    return message;
  }
};
function createBasePartyPromote() {
  return { party_id: "", presence: void 0 };
}
var PartyPromote = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    if (message.presence !== void 0) {
      UserPresence.encode(message.presence, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBasePartyPromote();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        case 2:
          message.presence = UserPresence.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      party_id: isSet4(object.party_id) ? String(object.party_id) : "",
      presence: isSet4(object.presence) ? UserPresence.fromJSON(object.presence) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.party_id !== void 0 && (obj.party_id = message.party_id);
    message.presence !== void 0 && (obj.presence = message.presence ? UserPresence.toJSON(message.presence) : void 0);
    return obj;
  },
  create(base) {
    return PartyPromote.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a;
    const message = createBasePartyPromote();
    message.party_id = (_a = object.party_id) != null ? _a : "";
    message.presence = object.presence !== void 0 && object.presence !== null ? UserPresence.fromPartial(object.presence) : void 0;
    return message;
  }
};
function createBasePartyLeader() {
  return { party_id: "", presence: void 0 };
}
var PartyLeader = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    if (message.presence !== void 0) {
      UserPresence.encode(message.presence, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBasePartyLeader();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        case 2:
          message.presence = UserPresence.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      party_id: isSet4(object.party_id) ? String(object.party_id) : "",
      presence: isSet4(object.presence) ? UserPresence.fromJSON(object.presence) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.party_id !== void 0 && (obj.party_id = message.party_id);
    message.presence !== void 0 && (obj.presence = message.presence ? UserPresence.toJSON(message.presence) : void 0);
    return obj;
  },
  create(base) {
    return PartyLeader.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a;
    const message = createBasePartyLeader();
    message.party_id = (_a = object.party_id) != null ? _a : "";
    message.presence = object.presence !== void 0 && object.presence !== null ? UserPresence.fromPartial(object.presence) : void 0;
    return message;
  }
};
function createBasePartyAccept() {
  return { party_id: "", presence: void 0 };
}
var PartyAccept = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    if (message.presence !== void 0) {
      UserPresence.encode(message.presence, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBasePartyAccept();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        case 2:
          message.presence = UserPresence.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      party_id: isSet4(object.party_id) ? String(object.party_id) : "",
      presence: isSet4(object.presence) ? UserPresence.fromJSON(object.presence) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.party_id !== void 0 && (obj.party_id = message.party_id);
    message.presence !== void 0 && (obj.presence = message.presence ? UserPresence.toJSON(message.presence) : void 0);
    return obj;
  },
  create(base) {
    return PartyAccept.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a;
    const message = createBasePartyAccept();
    message.party_id = (_a = object.party_id) != null ? _a : "";
    message.presence = object.presence !== void 0 && object.presence !== null ? UserPresence.fromPartial(object.presence) : void 0;
    return message;
  }
};
function createBasePartyRemove() {
  return { party_id: "", presence: void 0 };
}
var PartyRemove = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    if (message.presence !== void 0) {
      UserPresence.encode(message.presence, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBasePartyRemove();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        case 2:
          message.presence = UserPresence.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      party_id: isSet4(object.party_id) ? String(object.party_id) : "",
      presence: isSet4(object.presence) ? UserPresence.fromJSON(object.presence) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.party_id !== void 0 && (obj.party_id = message.party_id);
    message.presence !== void 0 && (obj.presence = message.presence ? UserPresence.toJSON(message.presence) : void 0);
    return obj;
  },
  create(base) {
    return PartyRemove.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a;
    const message = createBasePartyRemove();
    message.party_id = (_a = object.party_id) != null ? _a : "";
    message.presence = object.presence !== void 0 && object.presence !== null ? UserPresence.fromPartial(object.presence) : void 0;
    return message;
  }
};
function createBasePartyClose() {
  return { party_id: "" };
}
var PartyClose = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBasePartyClose();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return { party_id: isSet4(object.party_id) ? String(object.party_id) : "" };
  },
  toJSON(message) {
    const obj = {};
    message.party_id !== void 0 && (obj.party_id = message.party_id);
    return obj;
  },
  create(base) {
    return PartyClose.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a;
    const message = createBasePartyClose();
    message.party_id = (_a = object.party_id) != null ? _a : "";
    return message;
  }
};
function createBasePartyJoinRequestList() {
  return { party_id: "" };
}
var PartyJoinRequestList = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBasePartyJoinRequestList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return { party_id: isSet4(object.party_id) ? String(object.party_id) : "" };
  },
  toJSON(message) {
    const obj = {};
    message.party_id !== void 0 && (obj.party_id = message.party_id);
    return obj;
  },
  create(base) {
    return PartyJoinRequestList.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a;
    const message = createBasePartyJoinRequestList();
    message.party_id = (_a = object.party_id) != null ? _a : "";
    return message;
  }
};
function createBasePartyJoinRequest() {
  return { party_id: "", presences: [] };
}
var PartyJoinRequest = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    for (const v of message.presences) {
      UserPresence.encode(v, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBasePartyJoinRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        case 2:
          message.presences.push(UserPresence.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      party_id: isSet4(object.party_id) ? String(object.party_id) : "",
      presences: Array.isArray(object == null ? void 0 : object.presences) ? object.presences.map((e) => UserPresence.fromJSON(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    message.party_id !== void 0 && (obj.party_id = message.party_id);
    if (message.presences) {
      obj.presences = message.presences.map((e) => e ? UserPresence.toJSON(e) : void 0);
    } else {
      obj.presences = [];
    }
    return obj;
  },
  create(base) {
    return PartyJoinRequest.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b;
    const message = createBasePartyJoinRequest();
    message.party_id = (_a = object.party_id) != null ? _a : "";
    message.presences = ((_b = object.presences) == null ? void 0 : _b.map((e) => UserPresence.fromPartial(e))) || [];
    return message;
  }
};
function createBasePartyData() {
  return { party_id: "", presence: void 0, op_code: 0, data: new Uint8Array() };
}
var PartyData = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    if (message.presence !== void 0) {
      UserPresence.encode(message.presence, writer.uint32(18).fork()).ldelim();
    }
    if (message.op_code !== 0) {
      writer.uint32(24).int64(message.op_code);
    }
    if (message.data.length !== 0) {
      writer.uint32(34).bytes(message.data);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBasePartyData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        case 2:
          message.presence = UserPresence.decode(reader, reader.uint32());
          break;
        case 3:
          message.op_code = longToNumber2(reader.int64());
          break;
        case 4:
          message.data = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      party_id: isSet4(object.party_id) ? String(object.party_id) : "",
      presence: isSet4(object.presence) ? UserPresence.fromJSON(object.presence) : void 0,
      op_code: isSet4(object.op_code) ? Number(object.op_code) : 0,
      data: isSet4(object.data) ? bytesFromBase64(object.data) : new Uint8Array()
    };
  },
  toJSON(message) {
    const obj = {};
    message.party_id !== void 0 && (obj.party_id = message.party_id);
    message.presence !== void 0 && (obj.presence = message.presence ? UserPresence.toJSON(message.presence) : void 0);
    message.op_code !== void 0 && (obj.op_code = Math.round(message.op_code));
    message.data !== void 0 && (obj.data = base64FromBytes(message.data !== void 0 ? message.data : new Uint8Array()));
    return obj;
  },
  create(base) {
    return PartyData.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b, _c;
    const message = createBasePartyData();
    message.party_id = (_a = object.party_id) != null ? _a : "";
    message.presence = object.presence !== void 0 && object.presence !== null ? UserPresence.fromPartial(object.presence) : void 0;
    message.op_code = (_b = object.op_code) != null ? _b : 0;
    message.data = (_c = object.data) != null ? _c : new Uint8Array();
    return message;
  }
};
function createBasePartyDataSend() {
  return { party_id: "", op_code: 0, data: new Uint8Array() };
}
var PartyDataSend = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    if (message.op_code !== 0) {
      writer.uint32(16).int64(message.op_code);
    }
    if (message.data.length !== 0) {
      writer.uint32(26).bytes(message.data);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBasePartyDataSend();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        case 2:
          message.op_code = longToNumber2(reader.int64());
          break;
        case 3:
          message.data = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      party_id: isSet4(object.party_id) ? String(object.party_id) : "",
      op_code: isSet4(object.op_code) ? Number(object.op_code) : 0,
      data: isSet4(object.data) ? bytesFromBase64(object.data) : new Uint8Array()
    };
  },
  toJSON(message) {
    const obj = {};
    message.party_id !== void 0 && (obj.party_id = message.party_id);
    message.op_code !== void 0 && (obj.op_code = Math.round(message.op_code));
    message.data !== void 0 && (obj.data = base64FromBytes(message.data !== void 0 ? message.data : new Uint8Array()));
    return obj;
  },
  create(base) {
    return PartyDataSend.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b, _c;
    const message = createBasePartyDataSend();
    message.party_id = (_a = object.party_id) != null ? _a : "";
    message.op_code = (_b = object.op_code) != null ? _b : 0;
    message.data = (_c = object.data) != null ? _c : new Uint8Array();
    return message;
  }
};
function createBasePartyPresenceEvent() {
  return { party_id: "", joins: [], leaves: [] };
}
var PartyPresenceEvent = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    for (const v of message.joins) {
      UserPresence.encode(v, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.leaves) {
      UserPresence.encode(v, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBasePartyPresenceEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        case 2:
          message.joins.push(UserPresence.decode(reader, reader.uint32()));
          break;
        case 3:
          message.leaves.push(UserPresence.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      party_id: isSet4(object.party_id) ? String(object.party_id) : "",
      joins: Array.isArray(object == null ? void 0 : object.joins) ? object.joins.map((e) => UserPresence.fromJSON(e)) : [],
      leaves: Array.isArray(object == null ? void 0 : object.leaves) ? object.leaves.map((e) => UserPresence.fromJSON(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    message.party_id !== void 0 && (obj.party_id = message.party_id);
    if (message.joins) {
      obj.joins = message.joins.map((e) => e ? UserPresence.toJSON(e) : void 0);
    } else {
      obj.joins = [];
    }
    if (message.leaves) {
      obj.leaves = message.leaves.map((e) => e ? UserPresence.toJSON(e) : void 0);
    } else {
      obj.leaves = [];
    }
    return obj;
  },
  create(base) {
    return PartyPresenceEvent.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b, _c;
    const message = createBasePartyPresenceEvent();
    message.party_id = (_a = object.party_id) != null ? _a : "";
    message.joins = ((_b = object.joins) == null ? void 0 : _b.map((e) => UserPresence.fromPartial(e))) || [];
    message.leaves = ((_c = object.leaves) == null ? void 0 : _c.map((e) => UserPresence.fromPartial(e))) || [];
    return message;
  }
};
function createBasePing() {
  return {};
}
var Ping = {
  encode(_, writer = import_minimal4.default.Writer.create()) {
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBasePing();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_) {
    return {};
  },
  toJSON(_) {
    const obj = {};
    return obj;
  },
  create(base) {
    return Ping.fromPartial(base != null ? base : {});
  },
  fromPartial(_) {
    const message = createBasePing();
    return message;
  }
};
function createBasePong() {
  return {};
}
var Pong = {
  encode(_, writer = import_minimal4.default.Writer.create()) {
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBasePong();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_) {
    return {};
  },
  toJSON(_) {
    const obj = {};
    return obj;
  },
  create(base) {
    return Pong.fromPartial(base != null ? base : {});
  },
  fromPartial(_) {
    const message = createBasePong();
    return message;
  }
};
function createBaseStatus() {
  return { presences: [] };
}
var Status = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    for (const v of message.presences) {
      UserPresence.encode(v, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.presences.push(UserPresence.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      presences: Array.isArray(object == null ? void 0 : object.presences) ? object.presences.map((e) => UserPresence.fromJSON(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.presences) {
      obj.presences = message.presences.map((e) => e ? UserPresence.toJSON(e) : void 0);
    } else {
      obj.presences = [];
    }
    return obj;
  },
  create(base) {
    return Status.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a;
    const message = createBaseStatus();
    message.presences = ((_a = object.presences) == null ? void 0 : _a.map((e) => UserPresence.fromPartial(e))) || [];
    return message;
  }
};
function createBaseStatusFollow() {
  return { user_ids: [], usernames: [] };
}
var StatusFollow = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    for (const v of message.user_ids) {
      writer.uint32(10).string(v);
    }
    for (const v of message.usernames) {
      writer.uint32(18).string(v);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseStatusFollow();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user_ids.push(reader.string());
          break;
        case 2:
          message.usernames.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      user_ids: Array.isArray(object == null ? void 0 : object.user_ids) ? object.user_ids.map((e) => String(e)) : [],
      usernames: Array.isArray(object == null ? void 0 : object.usernames) ? object.usernames.map((e) => String(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.user_ids) {
      obj.user_ids = message.user_ids.map((e) => e);
    } else {
      obj.user_ids = [];
    }
    if (message.usernames) {
      obj.usernames = message.usernames.map((e) => e);
    } else {
      obj.usernames = [];
    }
    return obj;
  },
  create(base) {
    return StatusFollow.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b;
    const message = createBaseStatusFollow();
    message.user_ids = ((_a = object.user_ids) == null ? void 0 : _a.map((e) => e)) || [];
    message.usernames = ((_b = object.usernames) == null ? void 0 : _b.map((e) => e)) || [];
    return message;
  }
};
function createBaseStatusPresenceEvent() {
  return { joins: [], leaves: [] };
}
var StatusPresenceEvent = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    for (const v of message.joins) {
      UserPresence.encode(v, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.leaves) {
      UserPresence.encode(v, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseStatusPresenceEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.joins.push(UserPresence.decode(reader, reader.uint32()));
          break;
        case 3:
          message.leaves.push(UserPresence.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      joins: Array.isArray(object == null ? void 0 : object.joins) ? object.joins.map((e) => UserPresence.fromJSON(e)) : [],
      leaves: Array.isArray(object == null ? void 0 : object.leaves) ? object.leaves.map((e) => UserPresence.fromJSON(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.joins) {
      obj.joins = message.joins.map((e) => e ? UserPresence.toJSON(e) : void 0);
    } else {
      obj.joins = [];
    }
    if (message.leaves) {
      obj.leaves = message.leaves.map((e) => e ? UserPresence.toJSON(e) : void 0);
    } else {
      obj.leaves = [];
    }
    return obj;
  },
  create(base) {
    return StatusPresenceEvent.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b;
    const message = createBaseStatusPresenceEvent();
    message.joins = ((_a = object.joins) == null ? void 0 : _a.map((e) => UserPresence.fromPartial(e))) || [];
    message.leaves = ((_b = object.leaves) == null ? void 0 : _b.map((e) => UserPresence.fromPartial(e))) || [];
    return message;
  }
};
function createBaseLastSeenMessageEvent() {
  return { channel_id: "", message_id: "" };
}
var LastSeenMessageEvent = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    if (message.message_id !== "") {
      writer.uint32(18).string(message.message_id);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseLastSeenMessageEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channel_id = reader.string();
          break;
        case 2:
          message.message_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      channel_id: isSet4(object.channel_id) ? String(object.channel_id) : "",
      message_id: isSet4(object.message_id) ? String(object.message_id) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.channel_id !== void 0 && (obj.channel_id = message.channel_id);
    message.message_id !== void 0 && (obj.message_id = message.message_id);
    return obj;
  },
  create(base) {
    return LastSeenMessageEvent.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b;
    const message = createBaseLastSeenMessageEvent();
    message.channel_id = (_a = object.channel_id) != null ? _a : "";
    message.message_id = (_b = object.message_id) != null ? _b : "";
    return message;
  }
};
function createBaseMessageTypingEvent() {
  return { channel_id: "", sender_id: "" };
}
var MessageTypingEvent = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    if (message.sender_id !== "") {
      writer.uint32(18).string(message.sender_id);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseMessageTypingEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channel_id = reader.string();
          break;
        case 2:
          message.sender_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      channel_id: isSet4(object.channel_id) ? String(object.channel_id) : "",
      sender_id: isSet4(object.sender_id) ? String(object.sender_id) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.channel_id !== void 0 && (obj.channel_id = message.channel_id);
    message.sender_id !== void 0 && (obj.sender_id = message.sender_id);
    return obj;
  },
  create(base) {
    return MessageTypingEvent.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b;
    const message = createBaseMessageTypingEvent();
    message.channel_id = (_a = object.channel_id) != null ? _a : "";
    message.sender_id = (_b = object.sender_id) != null ? _b : "";
    return message;
  }
};
function createBaseStatusUnfollow() {
  return { user_ids: [] };
}
var StatusUnfollow = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    for (const v of message.user_ids) {
      writer.uint32(10).string(v);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseStatusUnfollow();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user_ids.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return { user_ids: Array.isArray(object == null ? void 0 : object.user_ids) ? object.user_ids.map((e) => String(e)) : [] };
  },
  toJSON(message) {
    const obj = {};
    if (message.user_ids) {
      obj.user_ids = message.user_ids.map((e) => e);
    } else {
      obj.user_ids = [];
    }
    return obj;
  },
  create(base) {
    return StatusUnfollow.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a;
    const message = createBaseStatusUnfollow();
    message.user_ids = ((_a = object.user_ids) == null ? void 0 : _a.map((e) => e)) || [];
    return message;
  }
};
function createBaseStatusUpdate() {
  return { status: void 0 };
}
var StatusUpdate = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.status !== void 0) {
      StringValue.encode({ value: message.status }, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseStatusUpdate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = StringValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return { status: isSet4(object.status) ? String(object.status) : void 0 };
  },
  toJSON(message) {
    const obj = {};
    message.status !== void 0 && (obj.status = message.status);
    return obj;
  },
  create(base) {
    return StatusUpdate.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a;
    const message = createBaseStatusUpdate();
    message.status = (_a = object.status) != null ? _a : void 0;
    return message;
  }
};
function createBaseStream() {
  return { mode: 0, subject: "", subcontext: "", label: "" };
}
var Stream = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.mode !== 0) {
      writer.uint32(8).int32(message.mode);
    }
    if (message.subject !== "") {
      writer.uint32(18).string(message.subject);
    }
    if (message.subcontext !== "") {
      writer.uint32(26).string(message.subcontext);
    }
    if (message.label !== "") {
      writer.uint32(34).string(message.label);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseStream();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.mode = reader.int32();
          break;
        case 2:
          message.subject = reader.string();
          break;
        case 3:
          message.subcontext = reader.string();
          break;
        case 4:
          message.label = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      mode: isSet4(object.mode) ? Number(object.mode) : 0,
      subject: isSet4(object.subject) ? String(object.subject) : "",
      subcontext: isSet4(object.subcontext) ? String(object.subcontext) : "",
      label: isSet4(object.label) ? String(object.label) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.mode !== void 0 && (obj.mode = Math.round(message.mode));
    message.subject !== void 0 && (obj.subject = message.subject);
    message.subcontext !== void 0 && (obj.subcontext = message.subcontext);
    message.label !== void 0 && (obj.label = message.label);
    return obj;
  },
  create(base) {
    return Stream.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b, _c, _d;
    const message = createBaseStream();
    message.mode = (_a = object.mode) != null ? _a : 0;
    message.subject = (_b = object.subject) != null ? _b : "";
    message.subcontext = (_c = object.subcontext) != null ? _c : "";
    message.label = (_d = object.label) != null ? _d : "";
    return message;
  }
};
function createBaseStreamData() {
  return { stream: void 0, sender: void 0, data: "", reliable: false };
}
var StreamData = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.stream !== void 0) {
      Stream.encode(message.stream, writer.uint32(10).fork()).ldelim();
    }
    if (message.sender !== void 0) {
      UserPresence.encode(message.sender, writer.uint32(18).fork()).ldelim();
    }
    if (message.data !== "") {
      writer.uint32(26).string(message.data);
    }
    if (message.reliable === true) {
      writer.uint32(32).bool(message.reliable);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseStreamData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stream = Stream.decode(reader, reader.uint32());
          break;
        case 2:
          message.sender = UserPresence.decode(reader, reader.uint32());
          break;
        case 3:
          message.data = reader.string();
          break;
        case 4:
          message.reliable = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      stream: isSet4(object.stream) ? Stream.fromJSON(object.stream) : void 0,
      sender: isSet4(object.sender) ? UserPresence.fromJSON(object.sender) : void 0,
      data: isSet4(object.data) ? String(object.data) : "",
      reliable: isSet4(object.reliable) ? Boolean(object.reliable) : false
    };
  },
  toJSON(message) {
    const obj = {};
    message.stream !== void 0 && (obj.stream = message.stream ? Stream.toJSON(message.stream) : void 0);
    message.sender !== void 0 && (obj.sender = message.sender ? UserPresence.toJSON(message.sender) : void 0);
    message.data !== void 0 && (obj.data = message.data);
    message.reliable !== void 0 && (obj.reliable = message.reliable);
    return obj;
  },
  create(base) {
    return StreamData.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b;
    const message = createBaseStreamData();
    message.stream = object.stream !== void 0 && object.stream !== null ? Stream.fromPartial(object.stream) : void 0;
    message.sender = object.sender !== void 0 && object.sender !== null ? UserPresence.fromPartial(object.sender) : void 0;
    message.data = (_a = object.data) != null ? _a : "";
    message.reliable = (_b = object.reliable) != null ? _b : false;
    return message;
  }
};
function createBaseStreamPresenceEvent() {
  return { stream: void 0, joins: [], leaves: [] };
}
var StreamPresenceEvent = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.stream !== void 0) {
      Stream.encode(message.stream, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.joins) {
      UserPresence.encode(v, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.leaves) {
      UserPresence.encode(v, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseStreamPresenceEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stream = Stream.decode(reader, reader.uint32());
          break;
        case 2:
          message.joins.push(UserPresence.decode(reader, reader.uint32()));
          break;
        case 3:
          message.leaves.push(UserPresence.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      stream: isSet4(object.stream) ? Stream.fromJSON(object.stream) : void 0,
      joins: Array.isArray(object == null ? void 0 : object.joins) ? object.joins.map((e) => UserPresence.fromJSON(e)) : [],
      leaves: Array.isArray(object == null ? void 0 : object.leaves) ? object.leaves.map((e) => UserPresence.fromJSON(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    message.stream !== void 0 && (obj.stream = message.stream ? Stream.toJSON(message.stream) : void 0);
    if (message.joins) {
      obj.joins = message.joins.map((e) => e ? UserPresence.toJSON(e) : void 0);
    } else {
      obj.joins = [];
    }
    if (message.leaves) {
      obj.leaves = message.leaves.map((e) => e ? UserPresence.toJSON(e) : void 0);
    } else {
      obj.leaves = [];
    }
    return obj;
  },
  create(base) {
    return StreamPresenceEvent.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b;
    const message = createBaseStreamPresenceEvent();
    message.stream = object.stream !== void 0 && object.stream !== null ? Stream.fromPartial(object.stream) : void 0;
    message.joins = ((_a = object.joins) == null ? void 0 : _a.map((e) => UserPresence.fromPartial(e))) || [];
    message.leaves = ((_b = object.leaves) == null ? void 0 : _b.map((e) => UserPresence.fromPartial(e))) || [];
    return message;
  }
};
function createBaseUserPresence() {
  return { user_id: "", session_id: "", username: "", persistence: false, status: void 0 };
}
var UserPresence = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.user_id !== "") {
      writer.uint32(10).string(message.user_id);
    }
    if (message.session_id !== "") {
      writer.uint32(18).string(message.session_id);
    }
    if (message.username !== "") {
      writer.uint32(26).string(message.username);
    }
    if (message.persistence === true) {
      writer.uint32(32).bool(message.persistence);
    }
    if (message.status !== void 0) {
      StringValue.encode({ value: message.status }, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseUserPresence();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user_id = reader.string();
          break;
        case 2:
          message.session_id = reader.string();
          break;
        case 3:
          message.username = reader.string();
          break;
        case 4:
          message.persistence = reader.bool();
          break;
        case 5:
          message.status = StringValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      user_id: isSet4(object.user_id) ? String(object.user_id) : "",
      session_id: isSet4(object.session_id) ? String(object.session_id) : "",
      username: isSet4(object.username) ? String(object.username) : "",
      persistence: isSet4(object.persistence) ? Boolean(object.persistence) : false,
      status: isSet4(object.status) ? String(object.status) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.user_id !== void 0 && (obj.user_id = message.user_id);
    message.session_id !== void 0 && (obj.session_id = message.session_id);
    message.username !== void 0 && (obj.username = message.username);
    message.persistence !== void 0 && (obj.persistence = message.persistence);
    message.status !== void 0 && (obj.status = message.status);
    return obj;
  },
  create(base) {
    return UserPresence.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b, _c, _d, _e;
    const message = createBaseUserPresence();
    message.user_id = (_a = object.user_id) != null ? _a : "";
    message.session_id = (_b = object.session_id) != null ? _b : "";
    message.username = (_c = object.username) != null ? _c : "";
    message.persistence = (_d = object.persistence) != null ? _d : false;
    message.status = (_e = object.status) != null ? _e : void 0;
    return message;
  }
};
var tsProtoGlobalThis4 = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();
function bytesFromBase64(b64) {
  if (tsProtoGlobalThis4.Buffer) {
    return Uint8Array.from(tsProtoGlobalThis4.Buffer.from(b64, "base64"));
  } else {
    const bin = tsProtoGlobalThis4.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}
function base64FromBytes(arr) {
  if (tsProtoGlobalThis4.Buffer) {
    return tsProtoGlobalThis4.Buffer.from(arr).toString("base64");
  } else {
    const bin = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return tsProtoGlobalThis4.btoa(bin.join(""));
  }
}
function toTimestamp2(date) {
  const seconds = date.getTime() / 1e3;
  const nanos = date.getTime() % 1e3 * 1e6;
  return { seconds, nanos };
}
function fromTimestamp2(t) {
  let millis = t.seconds * 1e3;
  millis += t.nanos / 1e6;
  return new Date(millis);
}
function fromJsonTimestamp2(o) {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp2(Timestamp.fromJSON(o));
  }
}
function longToNumber2(long) {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis4.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}
if (import_minimal4.default.util.Long !== import_long4.default) {
  import_minimal4.default.util.Long = import_long4.default;
  import_minimal4.default.configure();
}
function isObject(value) {
  return typeof value === "object" && value !== null;
}
function isSet4(value) {
  return value !== null && value !== void 0;
}
var WebSocketAdapterPb = class {
  constructor() {
  }
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
        const buffer = evt.data;
        const uintBuffer = new Uint8Array(buffer);
        const envelope = Envelope.decode(uintBuffer);
        if (envelope.channel_message) {
          if (envelope.channel_message.code == void 0) {
            envelope.channel_message.code = 0;
          }
          if (envelope.channel_message.persistent == void 0) {
            envelope.channel_message.persistent = false;
          }
        }
        value(envelope);
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
  close() {
    this._socket.close();
    this._socket = void 0;
  }
  connect(scheme, host, port, createStatus, token) {
    const url = `${scheme}${host}:${port}/ws?lang=en&status=${encodeURIComponent(createStatus.toString())}&token=${encodeURIComponent(token)}&format=protobuf`;
    this._socket = new WebSocket(url);
    this._socket.binaryType = "arraybuffer";
  }
  send(msg) {
    if (msg.match_data_send) {
      let payload = msg.match_data_send.data;
      if (typeof payload == "string") {
        msg.match_data_send.data = new TextEncoder().encode(payload);
      }
    } else if (msg.party_data_send) {
      let payload = msg.party_data_send.data;
      if (typeof payload == "string") {
        msg.party_data_send.data = new TextEncoder().encode(payload);
      }
    }
    const envelopeWriter = Envelope.encode(Envelope.fromPartial(msg));
    const encodedMsg = envelopeWriter.finish();
    this._socket.send(encodedMsg);
  }
};

// socket.ts
var _DefaultSocket = class _DefaultSocket {
  constructor(host, port, useSSL = false, verbose = false, adapter = new WebSocketAdapterPb(), sendTimeoutMs = _DefaultSocket.DefaultSendTimeoutMs) {
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
        } else if (message.status_presence_event) {
          this.onstatuspresence(message.status_presence_event);
        } else if (message.stream_presence_event) {
          this.onstreampresence(message.stream_presence_event);
        } else if (message.stream_data) {
          this.onstreamdata(message.stream_data);
        } else if (message.channel_message) {
          message.channel_message.content = JSON.parse(message.channel_message.content);
          this.onchannelmessage(message.channel_message);
        } else if (message.message_typing_event) {
          this.onmessagetyping(message);
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
  joinChat(target_id, target, type, persistence, hidden) {
    return __async(this, null, function* () {
      const response = yield this.send(
        {
          channel_join: {
            target_id,
            target,
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
  leaveChat(channel_id) {
    return this.send({ channel_leave: { channel_id } });
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
  removeChatMessage(channel_id, message_id) {
    return __async(this, null, function* () {
      const response = yield this.send(
        {
          channel_message_remove: {
            channel_id,
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
  updateChatMessage(channel_id, message_id, content) {
    return __async(this, null, function* () {
      const response = yield this.send({ channel_message_update: { channel_id, message_id, content } });
      return response.channel_message_ack;
    });
  }
  updateStatus(status) {
    return this.send({ status_update: { status } });
  }
  writeChatMessage(clan_id, channel_id, content) {
    return __async(this, null, function* () {
      const response = yield this.send({ channel_message_send: { clan_id, channel_id, content } });
      return response.channel_message_ack;
    });
  }
  writeMessageTyping(channel_id) {
    return __async(this, null, function* () {
      const response = yield this.send({ message_typing_event: { channel_id } });
      return response.message_typing_event;
    });
  }
  writeLastSeenMessage(channel_id, message_id) {
    return __async(this, null, function* () {
      const response = yield this.send({ last_seen_message_event: { channel_id, message_id } });
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
  /** Add users to a group, or accept their join requests. */
  addGroupUsers(session, groupId, ids) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.addGroupUsers(session.token, groupId, ids).then((response) => {
        return response !== void 0;
      });
    });
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
  /** Ban users from a group. */
  banGroupUsers(session, groupId, ids) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.banGroupUsers(session.token, groupId, ids).then((response) => {
        return response !== void 0;
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
  createGroup(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.createGroup(session.token, request).then((response) => {
        return Promise.resolve({
          avatar_url: response.avatar_url,
          create_time: response.create_time,
          creator_id: response.creator_id,
          description: response.description,
          edge_count: response.edge_count ? Number(response.edge_count) : 0,
          id: response.id,
          lang_tag: response.lang_tag,
          max_count: response.max_count ? Number(response.max_count) : 0,
          metadata: response.metadata ? JSON.parse(response.metadata) : void 0,
          name: response.name,
          open: response.open,
          update_time: response.update_time
        });
      });
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
  createSocket(useSSL = false, verbose = false, adapter = new WebSocketAdapterPb(), sendTimeoutMs = DefaultSocket.DefaultSendTimeoutMs) {
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
  /** Delete a group the user is part of and has permissions to delete. */
  deleteGroup(session, groupId) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.deleteGroup(session.token, groupId).then((response) => {
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
  /** Demote a set of users in a group to the next role down. */
  demoteGroupUsers(session, groupId, ids) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.demoteGroupUsers(session.token, groupId, ids).then((response) => {
        return Promise.resolve(response != void 0);
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
  /** Join a group that's open, or send a request to join a group that is closed. */
  joinGroup(session, groupId) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.joinGroup(session.token, groupId, {}).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Kick users from a group, or decline their join requests. */
  kickGroupUsers(session, groupId, ids) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.kickGroupUsers(session.token, groupId, ids).then((response) => {
        return Promise.resolve(response != void 0);
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
  /** Leave a group the user is part of. */
  leaveGroup(session, groupId) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.leaveGroup(session.token, groupId, {}).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** List a channel's message history. */
  listChannelMessages(session, channelId, limit, forward, cursor) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.listChannelMessages(session.token, channelId, limit, forward, cursor).then((response) => {
        var result = {
          messages: [],
          last_seen_message_id: response.last_seen_message_id,
          next_cursor: response.next_cursor,
          prev_cursor: response.prev_cursor,
          cacheable_cursor: response.cacheable_cursor
        };
        if (response.messages == null) {
          return Promise.resolve(result);
        }
        response.messages.forEach((m) => {
          result.messages.push({
            channel_id: m.channel_id,
            code: m.code ? Number(m.code) : 0,
            create_time: m.create_time,
            message_id: m.message_id,
            persistent: m.persistent,
            sender_id: m.sender_id,
            update_time: m.update_time,
            username: m.username,
            avatar: m.avatar,
            content: m.content ? JSON.parse(m.content) : void 0,
            channel_name: m.channel_name,
            user_id_one: m.user_id_one,
            user_id_two: m.user_id_two,
            last_seen: m.last_seen
          });
        });
        return Promise.resolve(result);
      });
    });
  }
  /** List a channel's users. */
  listChannelUsers(session, channelId, state, limit, cursor) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.listChannelUsers(session.token, channelId, limit, state, cursor).then((response) => {
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
  /** List a group's users. */
  listGroupUsers(session, groupId, state, limit, cursor) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.listGroupUsers(session.token, groupId, limit, state, cursor).then((response) => {
        var result = {
          group_users: [],
          cursor: response.cursor
        };
        if (response.group_users == null) {
          return Promise.resolve(result);
        }
        response.group_users.forEach((gu) => {
          result.group_users.push({
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
            state: gu.state ? Number(gu.state) : 0
          });
        });
        return Promise.resolve(result);
      });
    });
  }
  /** List a user's groups. */
  listUserGroups(session, userId, state, limit, cursor) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.listUserGroups(session.token, userId, state, limit, cursor).then((response) => {
        var result = {
          user_groups: [],
          cursor: response.cursor
        };
        if (response.user_groups == null) {
          return Promise.resolve(result);
        }
        response.user_groups.forEach((ug) => {
          result.user_groups.push({
            group: {
              avatar_url: ug.group.avatar_url,
              create_time: ug.group.create_time,
              creator_id: ug.group.creator_id,
              description: ug.group.description,
              edge_count: ug.group.edge_count ? Number(ug.group.edge_count) : 0,
              id: ug.group.id,
              lang_tag: ug.group.lang_tag,
              max_count: ug.group.max_count,
              metadata: ug.group.metadata ? JSON.parse(ug.group.metadata) : void 0,
              name: ug.group.name,
              open: ug.group.open,
              update_time: ug.group.update_time
            },
            state: ug.state ? Number(ug.state) : 0
          });
        });
        return Promise.resolve(result);
      });
    });
  }
  /** List groups based on given filters. */
  listGroups(session, name, cursor, limit) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.listGroups(session.token, name, cursor, limit).then((response) => {
        var result = {
          groups: []
        };
        if (response.groups == null) {
          return Promise.resolve(result);
        }
        result.cursor = response.cursor;
        response.groups.forEach((ug) => {
          result.groups.push({
            avatar_url: ug.avatar_url,
            create_time: ug.create_time,
            creator_id: ug.creator_id,
            description: ug.description,
            edge_count: ug.edge_count ? Number(ug.edge_count) : 0,
            id: ug.id,
            lang_tag: ug.lang_tag,
            max_count: ug.max_count,
            metadata: ug.metadata ? JSON.parse(ug.metadata) : void 0,
            name: ug.name,
            open: ug.open,
            update_time: ug.update_time
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
  /** Promote users in a group to the next role up. */
  promoteGroupUsers(session, groupId, ids) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.promoteGroupUsers(session.token, groupId, ids);
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
  /** Update a group the user is part of and has permissions to update. */
  updateGroup(session, groupId, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.updateGroup(session.token, groupId, request).then((response) => {
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
export {
  Client,
  DefaultSocket,
  Session,
  WebSocketAdapterText
};
