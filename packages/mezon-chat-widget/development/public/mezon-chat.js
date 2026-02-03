"use strict";
var MezonLightChat = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn2, res) => function __init() {
    return fn2 && (res = (0, fn2[__getOwnPropNames(fn2)[0]])(fn2 = 0)), res;
  };
  var __commonJS = (cb, mod2) => function __require() {
    return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
    mod2
  ));
  var __toCommonJS = (mod2) => __copyProps(__defProp({}, "__esModule", { value: true }), mod2);

  // node_modules/js-base64/base64.mjs
  var _hasBuffer, _TD, _TE, b64ch, b64chs, b64tab, b64re, _fromCC, _U8Afrom, _mkUriSafe, _tidyB64, btoaPolyfill, _btoa, _fromUint8Array, cb_utob, re_utob, utob, _encode, encode, atobPolyfill, _atob;
  var init_base64 = __esm({
    "node_modules/js-base64/base64.mjs"() {
      _hasBuffer = typeof Buffer === "function";
      _TD = typeof TextDecoder === "function" ? new TextDecoder() : void 0;
      _TE = typeof TextEncoder === "function" ? new TextEncoder() : void 0;
      b64ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      b64chs = Array.prototype.slice.call(b64ch);
      b64tab = ((a) => {
        let tab = {};
        a.forEach((c, i) => tab[c] = i);
        return tab;
      })(b64chs);
      b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
      _fromCC = String.fromCharCode.bind(String);
      _U8Afrom = typeof Uint8Array.from === "function" ? Uint8Array.from.bind(Uint8Array) : (it) => new Uint8Array(Array.prototype.slice.call(it, 0));
      _mkUriSafe = (src) => src.replace(/=/g, "").replace(/[+\/]/g, (m0) => m0 == "+" ? "-" : "_");
      _tidyB64 = (s2) => s2.replace(/[^A-Za-z0-9\+\/]/g, "");
      btoaPolyfill = (bin) => {
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
      _btoa = typeof btoa === "function" ? (bin) => btoa(bin) : _hasBuffer ? (bin) => Buffer.from(bin, "binary").toString("base64") : btoaPolyfill;
      _fromUint8Array = _hasBuffer ? (u8a) => Buffer.from(u8a).toString("base64") : (u8a) => {
        const maxargs = 4096;
        let strs = [];
        for (let i = 0, l = u8a.length; i < l; i += maxargs) {
          strs.push(_fromCC.apply(null, u8a.subarray(i, i + maxargs)));
        }
        return _btoa(strs.join(""));
      };
      cb_utob = (c) => {
        if (c.length < 2) {
          var cc = c.charCodeAt(0);
          return cc < 128 ? c : cc < 2048 ? _fromCC(192 | cc >>> 6) + _fromCC(128 | cc & 63) : _fromCC(224 | cc >>> 12 & 15) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
        } else {
          var cc = 65536 + (c.charCodeAt(0) - 55296) * 1024 + (c.charCodeAt(1) - 56320);
          return _fromCC(240 | cc >>> 18 & 7) + _fromCC(128 | cc >>> 12 & 63) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
        }
      };
      re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
      utob = (u) => u.replace(re_utob, cb_utob);
      _encode = _hasBuffer ? (s2) => Buffer.from(s2, "utf8").toString("base64") : _TE ? (s2) => _fromUint8Array(_TE.encode(s2)) : (s2) => _btoa(utob(s2));
      encode = (src, urlsafe = false) => urlsafe ? _mkUriSafe(_encode(src)) : _encode(src);
      atobPolyfill = (asc) => {
        asc = asc.replace(/\s+/g, "");
        if (!b64re.test(asc))
          throw new TypeError("malformed base64.");
        asc += "==".slice(2 - (asc.length & 3));
        let u24, r1, r2;
        let binArray = [];
        for (let i = 0; i < asc.length; ) {
          u24 = b64tab[asc.charAt(i++)] << 18 | b64tab[asc.charAt(i++)] << 12 | (r1 = b64tab[asc.charAt(i++)]) << 6 | (r2 = b64tab[asc.charAt(i++)]);
          if (r1 === 64) {
            binArray.push(_fromCC(u24 >> 16 & 255));
          } else if (r2 === 64) {
            binArray.push(_fromCC(u24 >> 16 & 255, u24 >> 8 & 255));
          } else {
            binArray.push(_fromCC(u24 >> 16 & 255, u24 >> 8 & 255, u24 & 255));
          }
        }
        return binArray.join("");
      };
      _atob = typeof atob === "function" ? (asc) => atob(_tidyB64(asc)) : _hasBuffer ? (asc) => Buffer.from(asc, "base64").toString("binary") : atobPolyfill;
    }
  });

  // node_modules/long/index.js
  function Long(low, high, unsigned) {
    this.low = low | 0;
    this.high = high | 0;
    this.unsigned = !!unsigned;
  }
  function isLong(obj) {
    return (obj && obj["__isLong__"]) === true;
  }
  function ctz32(value) {
    var c = Math.clz32(value & -value);
    return value ? 31 - c : c;
  }
  function fromInt(value, unsigned) {
    var obj, cachedObj, cache;
    if (unsigned) {
      value >>>= 0;
      if (cache = 0 <= value && value < 256) {
        cachedObj = UINT_CACHE[value];
        if (cachedObj) return cachedObj;
      }
      obj = fromBits(value, 0, true);
      if (cache) UINT_CACHE[value] = obj;
      return obj;
    } else {
      value |= 0;
      if (cache = -128 <= value && value < 128) {
        cachedObj = INT_CACHE[value];
        if (cachedObj) return cachedObj;
      }
      obj = fromBits(value, value < 0 ? -1 : 0, false);
      if (cache) INT_CACHE[value] = obj;
      return obj;
    }
  }
  function fromNumber(value, unsigned) {
    if (isNaN(value)) return unsigned ? UZERO : ZERO;
    if (unsigned) {
      if (value < 0) return UZERO;
      if (value >= TWO_PWR_64_DBL) return MAX_UNSIGNED_VALUE;
    } else {
      if (value <= -TWO_PWR_63_DBL) return MIN_VALUE;
      if (value + 1 >= TWO_PWR_63_DBL) return MAX_VALUE;
    }
    if (value < 0) return fromNumber(-value, unsigned).neg();
    return fromBits(
      value % TWO_PWR_32_DBL | 0,
      value / TWO_PWR_32_DBL | 0,
      unsigned
    );
  }
  function fromBits(lowBits, highBits, unsigned) {
    return new Long(lowBits, highBits, unsigned);
  }
  function fromString(str, unsigned, radix) {
    if (str.length === 0) throw Error("empty string");
    if (typeof unsigned === "number") {
      radix = unsigned;
      unsigned = false;
    } else {
      unsigned = !!unsigned;
    }
    if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
      return unsigned ? UZERO : ZERO;
    radix = radix || 10;
    if (radix < 2 || 36 < radix) throw RangeError("radix");
    var p;
    if ((p = str.indexOf("-")) > 0) throw Error("interior hyphen");
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
  function fromValue(val, unsigned) {
    if (typeof val === "number") return fromNumber(val, unsigned);
    if (typeof val === "string") return fromString(val, unsigned);
    return fromBits(
      val.low,
      val.high,
      typeof unsigned === "boolean" ? unsigned : val.unsigned
    );
  }
  var wasm, INT_CACHE, UINT_CACHE, pow_dbl, TWO_PWR_16_DBL, TWO_PWR_24_DBL, TWO_PWR_32_DBL, TWO_PWR_64_DBL, TWO_PWR_63_DBL, TWO_PWR_24, ZERO, UZERO, ONE, UONE, NEG_ONE, MAX_VALUE, MAX_UNSIGNED_VALUE, MIN_VALUE, LongPrototype, long_default;
  var init_long = __esm({
    "node_modules/long/index.js"() {
      wasm = null;
      try {
        wasm = new WebAssembly.Instance(
          new WebAssembly.Module(
            new Uint8Array([
              // \0asm
              0,
              97,
              115,
              109,
              // version 1
              1,
              0,
              0,
              0,
              // section "type"
              1,
              13,
              2,
              // 0, () => i32
              96,
              0,
              1,
              127,
              // 1, (i32, i32, i32, i32) => i32
              96,
              4,
              127,
              127,
              127,
              127,
              1,
              127,
              // section "function"
              3,
              7,
              6,
              // 0, type 0
              0,
              // 1, type 1
              1,
              // 2, type 1
              1,
              // 3, type 1
              1,
              // 4, type 1
              1,
              // 5, type 1
              1,
              // section "global"
              6,
              6,
              1,
              // 0, "high", mutable i32
              127,
              1,
              65,
              0,
              11,
              // section "export"
              7,
              50,
              6,
              // 0, "mul"
              3,
              109,
              117,
              108,
              0,
              1,
              // 1, "div_s"
              5,
              100,
              105,
              118,
              95,
              115,
              0,
              2,
              // 2, "div_u"
              5,
              100,
              105,
              118,
              95,
              117,
              0,
              3,
              // 3, "rem_s"
              5,
              114,
              101,
              109,
              95,
              115,
              0,
              4,
              // 4, "rem_u"
              5,
              114,
              101,
              109,
              95,
              117,
              0,
              5,
              // 5, "get_high"
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
              // section "code"
              10,
              191,
              1,
              6,
              // 0, "get_high"
              4,
              0,
              35,
              0,
              11,
              // 1, "mul"
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
              // 2, "div_s"
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
              // 3, "div_u"
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
              // 4, "rem_s"
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
              // 5, "rem_u"
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
            ])
          ),
          {}
        ).exports;
      } catch {
      }
      Long.prototype.__isLong__;
      Object.defineProperty(Long.prototype, "__isLong__", { value: true });
      Long.isLong = isLong;
      INT_CACHE = {};
      UINT_CACHE = {};
      Long.fromInt = fromInt;
      Long.fromNumber = fromNumber;
      Long.fromBits = fromBits;
      pow_dbl = Math.pow;
      Long.fromString = fromString;
      Long.fromValue = fromValue;
      TWO_PWR_16_DBL = 1 << 16;
      TWO_PWR_24_DBL = 1 << 24;
      TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;
      TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;
      TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;
      TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);
      ZERO = fromInt(0);
      Long.ZERO = ZERO;
      UZERO = fromInt(0, true);
      Long.UZERO = UZERO;
      ONE = fromInt(1);
      Long.ONE = ONE;
      UONE = fromInt(1, true);
      Long.UONE = UONE;
      NEG_ONE = fromInt(-1);
      Long.NEG_ONE = NEG_ONE;
      MAX_VALUE = fromBits(4294967295 | 0, 2147483647 | 0, false);
      Long.MAX_VALUE = MAX_VALUE;
      MAX_UNSIGNED_VALUE = fromBits(4294967295 | 0, 4294967295 | 0, true);
      Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;
      MIN_VALUE = fromBits(0, 2147483648 | 0, false);
      Long.MIN_VALUE = MIN_VALUE;
      LongPrototype = Long.prototype;
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
        if (radix < 2 || 36 < radix) throw RangeError("radix");
        if (this.isZero()) return "0";
        if (this.isNegative()) {
          if (this.eq(MIN_VALUE)) {
            var radixLong = fromNumber(radix), div = this.div(radixLong), rem1 = div.mul(radixLong).sub(this);
            return div.toString(radix) + rem1.toInt().toString(radix);
          } else return "-" + this.neg().toString(radix);
        }
        var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned), rem = this;
        var result = "";
        while (true) {
          var remDiv = rem.div(radixToPower), intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0, digits = intval.toString(radix);
          rem = remDiv;
          if (rem.isZero()) return digits + result;
          else {
            while (digits.length < 6) digits = "0" + digits;
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
        for (var bit = 31; bit > 0; bit--) if ((val & 1 << bit) != 0) break;
        return this.high != 0 ? bit + 33 : bit + 1;
      };
      LongPrototype.isSafeInteger = function isSafeInteger() {
        var top11Bits = this.high >> 21;
        if (!top11Bits) return true;
        if (this.unsigned) return false;
        return top11Bits === -1 && !(this.low === 0 && this.high === -2097152);
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
        if (!isLong(other)) other = fromValue(other);
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
        if (!isLong(other)) other = fromValue(other);
        if (this.eq(other)) return 0;
        var thisNeg = this.isNegative(), otherNeg = other.isNegative();
        if (thisNeg && !otherNeg) return -1;
        if (!thisNeg && otherNeg) return 1;
        if (!this.unsigned) return this.sub(other).isNegative() ? -1 : 1;
        return other.high >>> 0 > this.high >>> 0 || other.high === this.high && other.low >>> 0 > this.low >>> 0 ? -1 : 1;
      };
      LongPrototype.comp = LongPrototype.compare;
      LongPrototype.negate = function negate() {
        if (!this.unsigned && this.eq(MIN_VALUE)) return MIN_VALUE;
        return this.not().add(ONE);
      };
      LongPrototype.neg = LongPrototype.negate;
      LongPrototype.add = function add(addend) {
        if (!isLong(addend)) addend = fromValue(addend);
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
        if (!isLong(subtrahend)) subtrahend = fromValue(subtrahend);
        return this.add(subtrahend.neg());
      };
      LongPrototype.sub = LongPrototype.subtract;
      LongPrototype.multiply = function multiply(multiplier) {
        if (this.isZero()) return this;
        if (!isLong(multiplier)) multiplier = fromValue(multiplier);
        if (wasm) {
          var low = wasm["mul"](this.low, this.high, multiplier.low, multiplier.high);
          return fromBits(low, wasm["get_high"](), this.unsigned);
        }
        if (multiplier.isZero()) return this.unsigned ? UZERO : ZERO;
        if (this.eq(MIN_VALUE)) return multiplier.isOdd() ? MIN_VALUE : ZERO;
        if (multiplier.eq(MIN_VALUE)) return this.isOdd() ? MIN_VALUE : ZERO;
        if (this.isNegative()) {
          if (multiplier.isNegative()) return this.neg().mul(multiplier.neg());
          else return this.neg().mul(multiplier).neg();
        } else if (multiplier.isNegative()) return this.mul(multiplier.neg()).neg();
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
        if (!isLong(divisor)) divisor = fromValue(divisor);
        if (divisor.isZero()) throw Error("division by zero");
        if (wasm) {
          if (!this.unsigned && this.high === -2147483648 && divisor.low === -1 && divisor.high === -1) {
            return this;
          }
          var low = (this.unsigned ? wasm["div_u"] : wasm["div_s"])(
            this.low,
            this.high,
            divisor.low,
            divisor.high
          );
          return fromBits(low, wasm["get_high"](), this.unsigned);
        }
        if (this.isZero()) return this.unsigned ? UZERO : ZERO;
        var approx, rem, res;
        if (!this.unsigned) {
          if (this.eq(MIN_VALUE)) {
            if (divisor.eq(ONE) || divisor.eq(NEG_ONE))
              return MIN_VALUE;
            else if (divisor.eq(MIN_VALUE)) return ONE;
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
          } else if (divisor.eq(MIN_VALUE)) return this.unsigned ? UZERO : ZERO;
          if (this.isNegative()) {
            if (divisor.isNegative()) return this.neg().div(divisor.neg());
            return this.neg().div(divisor).neg();
          } else if (divisor.isNegative()) return this.div(divisor.neg()).neg();
          res = ZERO;
        } else {
          if (!divisor.unsigned) divisor = divisor.toUnsigned();
          if (divisor.gt(this)) return UZERO;
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
          if (approxRes.isZero()) approxRes = ONE;
          res = res.add(approxRes);
          rem = rem.sub(approxRem);
        }
        return res;
      };
      LongPrototype.div = LongPrototype.divide;
      LongPrototype.modulo = function modulo(divisor) {
        if (!isLong(divisor)) divisor = fromValue(divisor);
        if (wasm) {
          var low = (this.unsigned ? wasm["rem_u"] : wasm["rem_s"])(
            this.low,
            this.high,
            divisor.low,
            divisor.high
          );
          return fromBits(low, wasm["get_high"](), this.unsigned);
        }
        return this.sub(this.div(divisor).mul(divisor));
      };
      LongPrototype.mod = LongPrototype.modulo;
      LongPrototype.rem = LongPrototype.modulo;
      LongPrototype.not = function not() {
        return fromBits(~this.low, ~this.high, this.unsigned);
      };
      LongPrototype.countLeadingZeros = function countLeadingZeros() {
        return this.high ? Math.clz32(this.high) : Math.clz32(this.low) + 32;
      };
      LongPrototype.clz = LongPrototype.countLeadingZeros;
      LongPrototype.countTrailingZeros = function countTrailingZeros() {
        return this.low ? ctz32(this.low) : ctz32(this.high) + 32;
      };
      LongPrototype.ctz = LongPrototype.countTrailingZeros;
      LongPrototype.and = function and(other) {
        if (!isLong(other)) other = fromValue(other);
        return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
      };
      LongPrototype.or = function or(other) {
        if (!isLong(other)) other = fromValue(other);
        return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
      };
      LongPrototype.xor = function xor(other) {
        if (!isLong(other)) other = fromValue(other);
        return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
      };
      LongPrototype.shiftLeft = function shiftLeft(numBits) {
        if (isLong(numBits)) numBits = numBits.toInt();
        if ((numBits &= 63) === 0) return this;
        else if (numBits < 32)
          return fromBits(
            this.low << numBits,
            this.high << numBits | this.low >>> 32 - numBits,
            this.unsigned
          );
        else return fromBits(0, this.low << numBits - 32, this.unsigned);
      };
      LongPrototype.shl = LongPrototype.shiftLeft;
      LongPrototype.shiftRight = function shiftRight(numBits) {
        if (isLong(numBits)) numBits = numBits.toInt();
        if ((numBits &= 63) === 0) return this;
        else if (numBits < 32)
          return fromBits(
            this.low >>> numBits | this.high << 32 - numBits,
            this.high >> numBits,
            this.unsigned
          );
        else
          return fromBits(
            this.high >> numBits - 32,
            this.high >= 0 ? 0 : -1,
            this.unsigned
          );
      };
      LongPrototype.shr = LongPrototype.shiftRight;
      LongPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
        if (isLong(numBits)) numBits = numBits.toInt();
        if ((numBits &= 63) === 0) return this;
        if (numBits < 32)
          return fromBits(
            this.low >>> numBits | this.high << 32 - numBits,
            this.high >>> numBits,
            this.unsigned
          );
        if (numBits === 32) return fromBits(this.high, 0, this.unsigned);
        return fromBits(this.high >>> numBits - 32, 0, this.unsigned);
      };
      LongPrototype.shru = LongPrototype.shiftRightUnsigned;
      LongPrototype.shr_u = LongPrototype.shiftRightUnsigned;
      LongPrototype.rotateLeft = function rotateLeft(numBits) {
        var b2;
        if (isLong(numBits)) numBits = numBits.toInt();
        if ((numBits &= 63) === 0) return this;
        if (numBits === 32) return fromBits(this.high, this.low, this.unsigned);
        if (numBits < 32) {
          b2 = 32 - numBits;
          return fromBits(
            this.low << numBits | this.high >>> b2,
            this.high << numBits | this.low >>> b2,
            this.unsigned
          );
        }
        numBits -= 32;
        b2 = 32 - numBits;
        return fromBits(
          this.high << numBits | this.low >>> b2,
          this.low << numBits | this.high >>> b2,
          this.unsigned
        );
      };
      LongPrototype.rotl = LongPrototype.rotateLeft;
      LongPrototype.rotateRight = function rotateRight(numBits) {
        var b2;
        if (isLong(numBits)) numBits = numBits.toInt();
        if ((numBits &= 63) === 0) return this;
        if (numBits === 32) return fromBits(this.high, this.low, this.unsigned);
        if (numBits < 32) {
          b2 = 32 - numBits;
          return fromBits(
            this.high << b2 | this.low >>> numBits,
            this.low << b2 | this.high >>> numBits,
            this.unsigned
          );
        }
        numBits -= 32;
        b2 = 32 - numBits;
        return fromBits(
          this.low << b2 | this.high >>> numBits,
          this.high << b2 | this.low >>> numBits,
          this.unsigned
        );
      };
      LongPrototype.rotr = LongPrototype.rotateRight;
      LongPrototype.toSigned = function toSigned() {
        if (!this.unsigned) return this;
        return fromBits(this.low, this.high, false);
      };
      LongPrototype.toUnsigned = function toUnsigned() {
        if (this.unsigned) return this;
        return fromBits(this.low, this.high, true);
      };
      LongPrototype.toBytes = function toBytes(le2) {
        return le2 ? this.toBytesLE() : this.toBytesBE();
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
      Long.fromBytes = function fromBytes(bytes, unsigned, le2) {
        return le2 ? Long.fromBytesLE(bytes, unsigned) : Long.fromBytesBE(bytes, unsigned);
      };
      Long.fromBytesLE = function fromBytesLE(bytes, unsigned) {
        return new Long(
          bytes[0] | bytes[1] << 8 | bytes[2] << 16 | bytes[3] << 24,
          bytes[4] | bytes[5] << 8 | bytes[6] << 16 | bytes[7] << 24,
          unsigned
        );
      };
      Long.fromBytesBE = function fromBytesBE(bytes, unsigned) {
        return new Long(
          bytes[4] << 24 | bytes[5] << 16 | bytes[6] << 8 | bytes[7],
          bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3],
          unsigned
        );
      };
      if (typeof BigInt === "function") {
        Long.fromBigInt = function fromBigInt(value, unsigned) {
          var lowBits = Number(BigInt.asIntN(32, value));
          var highBits = Number(BigInt.asIntN(32, value >> BigInt(32)));
          return fromBits(lowBits, highBits, unsigned);
        };
        Long.fromValue = function fromValueWithBigInt(value, unsigned) {
          if (typeof value === "bigint") return Long.fromBigInt(value, unsigned);
          return fromValue(value, unsigned);
        };
        LongPrototype.toBigInt = function toBigInt() {
          var lowBigInt = BigInt(this.low >>> 0);
          var highBigInt = BigInt(this.unsigned ? this.high >>> 0 : this.high);
          return highBigInt << BigInt(32) | lowBigInt;
        };
      }
      long_default = Long;
    }
  });

  // node_modules/@protobufjs/aspromise/index.js
  var require_aspromise = __commonJS({
    "node_modules/@protobufjs/aspromise/index.js"(exports2, module2) {
      "use strict";
      module2.exports = asPromise;
      function asPromise(fn2, ctx) {
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
            fn2.apply(ctx || null, params);
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

  // node_modules/@protobufjs/base64/index.js
  var require_base64 = __commonJS({
    "node_modules/@protobufjs/base64/index.js"(exports2) {
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
      base64.encode = function encode2(buffer, start, end) {
        var parts = null, chunk = [];
        var i2 = 0, j = 0, t2;
        while (start < end) {
          var b2 = buffer[start++];
          switch (j) {
            case 0:
              chunk[i2++] = b64[b2 >> 2];
              t2 = (b2 & 3) << 4;
              j = 1;
              break;
            case 1:
              chunk[i2++] = b64[t2 | b2 >> 4];
              t2 = (b2 & 15) << 2;
              j = 2;
              break;
            case 2:
              chunk[i2++] = b64[t2 | b2 >> 6];
              chunk[i2++] = b64[b2 & 63];
              j = 0;
              break;
          }
          if (i2 > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i2 = 0;
          }
        }
        if (j) {
          chunk[i2++] = b64[t2];
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
      base64.decode = function decode(string, buffer, offset) {
        var start = offset;
        var j = 0, t2;
        for (var i2 = 0; i2 < string.length; ) {
          var c = string.charCodeAt(i2++);
          if (c === 61 && j > 1)
            break;
          if ((c = s64[c]) === void 0)
            throw Error(invalidEncoding);
          switch (j) {
            case 0:
              t2 = c;
              j = 1;
              break;
            case 1:
              buffer[offset++] = t2 << 2 | (c & 48) >> 4;
              t2 = c;
              j = 2;
              break;
            case 2:
              buffer[offset++] = (t2 & 15) << 4 | (c & 60) >> 2;
              t2 = c;
              j = 3;
              break;
            case 3:
              buffer[offset++] = (t2 & 3) << 6 | c;
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

  // node_modules/@protobufjs/eventemitter/index.js
  var require_eventemitter = __commonJS({
    "node_modules/@protobufjs/eventemitter/index.js"(exports2, module2) {
      "use strict";
      module2.exports = EventEmitter;
      function EventEmitter() {
        this._listeners = {};
      }
      EventEmitter.prototype.on = function on2(evt, fn2, ctx) {
        (this._listeners[evt] || (this._listeners[evt] = [])).push({
          fn: fn2,
          ctx: ctx || this
        });
        return this;
      };
      EventEmitter.prototype.off = function off(evt, fn2) {
        if (evt === void 0)
          this._listeners = {};
        else {
          if (fn2 === void 0)
            this._listeners[evt] = [];
          else {
            var listeners = this._listeners[evt];
            for (var i = 0; i < listeners.length; )
              if (listeners[i].fn === fn2)
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

  // node_modules/@protobufjs/float/index.js
  var require_float = __commonJS({
    "node_modules/@protobufjs/float/index.js"(exports2, module2) {
      "use strict";
      module2.exports = factory(factory);
      function factory(exports3) {
        if (typeof Float32Array !== "undefined") (function() {
          var f32 = new Float32Array([-0]), f8b = new Uint8Array(f32.buffer), le2 = f8b[3] === 128;
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
          exports3.writeFloatLE = le2 ? writeFloat_f32_cpy : writeFloat_f32_rev;
          exports3.writeFloatBE = le2 ? writeFloat_f32_rev : writeFloat_f32_cpy;
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
          exports3.readFloatLE = le2 ? readFloat_f32_cpy : readFloat_f32_rev;
          exports3.readFloatBE = le2 ? readFloat_f32_rev : readFloat_f32_cpy;
        })();
        else (function() {
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
        if (typeof Float64Array !== "undefined") (function() {
          var f64 = new Float64Array([-0]), f8b = new Uint8Array(f64.buffer), le2 = f8b[7] === 128;
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
          exports3.writeDoubleLE = le2 ? writeDouble_f64_cpy : writeDouble_f64_rev;
          exports3.writeDoubleBE = le2 ? writeDouble_f64_rev : writeDouble_f64_cpy;
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
          exports3.readDoubleLE = le2 ? readDouble_f64_cpy : readDouble_f64_rev;
          exports3.readDoubleBE = le2 ? readDouble_f64_rev : readDouble_f64_cpy;
        })();
        else (function() {
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

  // node_modules/@protobufjs/inquire/index.js
  var require_inquire = __commonJS({
    "node_modules/@protobufjs/inquire/index.js"(exports, module) {
      "use strict";
      module.exports = inquire;
      function inquire(moduleName) {
        try {
          var mod = eval("quire".replace(/^/, "re"))(moduleName);
          if (mod && (mod.length || Object.keys(mod).length))
            return mod;
        } catch (e3) {
        }
        return null;
      }
    }
  });

  // node_modules/@protobufjs/utf8/index.js
  var require_utf8 = __commonJS({
    "node_modules/@protobufjs/utf8/index.js"(exports2) {
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
        var parts = null, chunk = [], i = 0, t2;
        while (start < end) {
          t2 = buffer[start++];
          if (t2 < 128)
            chunk[i++] = t2;
          else if (t2 > 191 && t2 < 224)
            chunk[i++] = (t2 & 31) << 6 | buffer[start++] & 63;
          else if (t2 > 239 && t2 < 365) {
            t2 = ((t2 & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 65536;
            chunk[i++] = 55296 + (t2 >> 10);
            chunk[i++] = 56320 + (t2 & 1023);
          } else
            chunk[i++] = (t2 & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
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

  // node_modules/@protobufjs/pool/index.js
  var require_pool = __commonJS({
    "node_modules/@protobufjs/pool/index.js"(exports2, module2) {
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

  // node_modules/protobufjs/src/util/longbits.js
  var require_longbits = __commonJS({
    "node_modules/protobufjs/src/util/longbits.js"(exports2, module2) {
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
      LongBits.fromNumber = function fromNumber2(value) {
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
      LongBits.prototype.toNumber = function toNumber2(unsigned) {
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

  // node_modules/protobufjs/src/util/minimal.js
  var require_minimal = __commonJS({
    "node_modules/protobufjs/src/util/minimal.js"(exports2) {
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
      util.isObject = function isObject(value) {
        return value && typeof value === "object";
      };
      util.isset = /**
       * Checks if a property on a message is considered to be present.
       * @param {Object} obj Plain object or message instance
       * @param {string} prop Property name
       * @returns {boolean} `true` if considered to be present, otherwise `false`
       */
      util.isSet = function isSet(obj, prop) {
        var value = obj[prop];
        if (value != null && obj.hasOwnProperty(prop))
          return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
        return false;
      };
      util.Buffer = (function() {
        try {
          var Buffer2 = util.inquire("buffer").Buffer;
          return Buffer2.prototype.utf8Write ? Buffer2 : (
            /* istanbul ignore next */
            null
          );
        } catch (e3) {
          return null;
        }
      })();
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
        CustomError.prototype = Object.create(Error.prototype, {
          constructor: {
            value: CustomError,
            writable: true,
            enumerable: false,
            configurable: true
          },
          name: {
            get: function get() {
              return name;
            },
            set: void 0,
            enumerable: false,
            // configurable: false would accurately preserve the behavior of
            // the original, but I'm guessing that was not intentional.
            // For an actual error subclass, this property would
            // be configurable.
            configurable: true
          },
          toString: {
            value: function value() {
              return this.name + ": " + this.message;
            },
            writable: true,
            enumerable: false,
            configurable: true
          }
        });
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

  // node_modules/protobufjs/src/writer.js
  var require_writer = __commonJS({
    "node_modules/protobufjs/src/writer.js"(exports2, module2) {
      "use strict";
      module2.exports = Writer;
      var util = require_minimal();
      var BufferWriter;
      var LongBits = util.LongBits;
      var base64 = util.base64;
      var utf8 = util.utf8;
      function Op(fn2, len, val) {
        this.fn = fn2;
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
      Writer.prototype._push = function push(fn2, len, val) {
        this.tail = this.tail.next = new Op(fn2, len, val);
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

  // node_modules/protobufjs/src/writer_buffer.js
  var require_writer_buffer = __commonJS({
    "node_modules/protobufjs/src/writer_buffer.js"(exports2, module2) {
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
          else for (var i = 0; i < val.length; )
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

  // node_modules/protobufjs/src/reader.js
  var require_reader = __commonJS({
    "node_modules/protobufjs/src/reader.js"(exports2, module2) {
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
      Reader.prototype.uint32 = /* @__PURE__ */ (function read_uint32_setup() {
        var value = 4294967295;
        return function read_uint32() {
          value = (this.buf[this.pos] & 127) >>> 0;
          if (this.buf[this.pos++] < 128) return value;
          value = (value | (this.buf[this.pos] & 127) << 7) >>> 0;
          if (this.buf[this.pos++] < 128) return value;
          value = (value | (this.buf[this.pos] & 127) << 14) >>> 0;
          if (this.buf[this.pos++] < 128) return value;
          value = (value | (this.buf[this.pos] & 127) << 21) >>> 0;
          if (this.buf[this.pos++] < 128) return value;
          value = (value | (this.buf[this.pos] & 15) << 28) >>> 0;
          if (this.buf[this.pos++] < 128) return value;
          if ((this.pos += 5) > this.len) {
            this.pos = this.len;
            throw indexOutOfRange(this, 10);
          }
          return value;
        };
      })();
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
        if (start === end) {
          var nativeBuffer = util.Buffer;
          return nativeBuffer ? nativeBuffer.alloc(0) : new this.buf.constructor(0);
        }
        return this._slice.call(this.buf, start, end);
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
          /* istanbul ignore next */
          default:
            throw Error("invalid wire type " + wireType + " at offset " + this.pos);
        }
        return this;
      };
      Reader._configure = function(BufferReader_) {
        BufferReader = BufferReader_;
        Reader.create = create();
        BufferReader._configure();
        var fn2 = util.Long ? "toLong" : (
          /* istanbul ignore next */
          "toNumber"
        );
        util.merge(Reader.prototype, {
          int64: function read_int64() {
            return readLongVarint.call(this)[fn2](false);
          },
          uint64: function read_uint64() {
            return readLongVarint.call(this)[fn2](true);
          },
          sint64: function read_sint64() {
            return readLongVarint.call(this).zzDecode()[fn2](false);
          },
          fixed64: function read_fixed64() {
            return readFixed64.call(this)[fn2](true);
          },
          sfixed64: function read_sfixed64() {
            return readFixed64.call(this)[fn2](false);
          }
        });
      };
    }
  });

  // node_modules/protobufjs/src/reader_buffer.js
  var require_reader_buffer = __commonJS({
    "node_modules/protobufjs/src/reader_buffer.js"(exports2, module2) {
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

  // node_modules/protobufjs/src/rpc/service.js
  var require_service = __commonJS({
    "node_modules/protobufjs/src/rpc/service.js"(exports2, module2) {
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

  // node_modules/protobufjs/src/rpc.js
  var require_rpc = __commonJS({
    "node_modules/protobufjs/src/rpc.js"(exports2) {
      "use strict";
      var rpc = exports2;
      rpc.Service = require_service();
    }
  });

  // node_modules/protobufjs/src/roots.js
  var require_roots = __commonJS({
    "node_modules/protobufjs/src/roots.js"(exports2, module2) {
      "use strict";
      module2.exports = {};
    }
  });

  // node_modules/protobufjs/src/index-minimal.js
  var require_index_minimal = __commonJS({
    "node_modules/protobufjs/src/index-minimal.js"(exports2) {
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

  // node_modules/protobufjs/minimal.js
  var require_minimal2 = __commonJS({
    "node_modules/protobufjs/minimal.js"(exports2, module2) {
      "use strict";
      module2.exports = require_index_minimal();
    }
  });

  // node_modules/mezon-light-sdk/dist/index.esm.mjs
  var index_esm_exports = {};
  __export(index_esm_exports, {
    AuthenticationError: () => de,
    CHANNEL_TYPE_DM: () => J,
    CHANNEL_TYPE_GROUP: () => W,
    CLAN_DM: () => I,
    DEFAULT_SERVER_KEY: () => H,
    LightClient: () => Ie,
    LightSocket: () => Re,
    MEZON_GW_URL: () => ke,
    SOCKET_READY_MAX_RETRY: () => Se,
    SOCKET_READY_RETRY_DELAY: () => ve,
    STREAM_MODE_DM: () => Te,
    STREAM_MODE_GROUP: () => Ce,
    SessionError: () => ye,
    SocketError: () => L
  });
  function Be() {
    return { created: false, token: "", refresh_token: "", user_id: "0", is_remember: false, api_url: "", id_token: "" };
  }
  function we() {
    return { token: "", vars: {}, is_remember: false };
  }
  function qe() {
    return { key: "", value: "" };
  }
  function Ve() {
    return { clan_id: "0", parent_id: "0", channel_id: "0", category_id: "0", type: 0, channel_label: "", channel_private: 0, user_ids: [], app_id: "0" };
  }
  function Fe() {
    return { clan_id: "0", parent_id: "0", channel_id: "0", category_id: "0", category_name: "", type: 0, creator_id: "0", channel_label: "", channel_private: 0, avatars: [], user_ids: [], last_sent_message: void 0, last_seen_message: void 0, onlines: [], meeting_code: "", count_mess_unread: 0, active: 0, last_pin_message: "", usernames: [], creator_name: "", create_time_seconds: 0, update_time_seconds: 0, display_names: [], channel_avatar: "", clan_name: "", app_id: "0", is_mute: false, age_restricted: 0, topic: "", e2ee: 0, member_count: 0 };
  }
  function m(e3) {
    return e3.toString();
  }
  function Tn(e3) {
    return typeof e3 == "object" && e3 !== null;
  }
  function s(e3) {
    return e3 != null;
  }
  function Ge() {
    return { clan_id: "0", channel_id: "0", message_id: "0", code: 0, sender_id: "0", username: "", avatar: "", content: "", channel_label: "", clan_logo: "", category_name: "", display_name: "", clan_nick: "", clan_avatar: "", reactions: new Uint8Array(0), mentions: new Uint8Array(0), attachments: new Uint8Array(0), references: new Uint8Array(0), referenced_message: new Uint8Array(0), create_time_seconds: 0, update_time_seconds: 0, mode: 0, hide_editted: false, is_public: false, topic_id: "0" };
  }
  function Ke() {
    return { id: "0", timestamp_seconds: 0, sender_id: "0", content: "" };
  }
  function Ye() {
    return { id: "0", user_id: "0", username: "", role_id: "0", rolename: "", create_time_seconds: 0, s: 0, e: 0 };
  }
  function ze() {
    return { filename: "", size: 0, url: "", filetype: "", width: 0, height: 0, thumbnail: "", duration: 0 };
  }
  function Xe() {
    return { message_id: "0", message_ref_id: "0", content: "", has_attachment: false, ref_type: 0, message_sender_id: "0", message_sender_username: "", mesages_sender_avatar: "", message_sender_clan_nick: "", message_sender_display_name: "" };
  }
  function Ze() {
    return { attachments: [] };
  }
  function re(e3) {
    if (globalThis.Buffer) return Uint8Array.from(globalThis.Buffer.from(e3, "base64"));
    {
      let n = globalThis.atob(e3), i = new Uint8Array(n.length);
      for (let r = 0; r < n.length; ++r) i[r] = n.charCodeAt(r);
      return i;
    }
  }
  function se(e3) {
    if (globalThis.Buffer) return globalThis.Buffer.from(e3).toString("base64");
    {
      let n = [];
      return e3.forEach((i) => {
        n.push(globalThis.String.fromCharCode(i));
      }), globalThis.btoa(n.join(""));
    }
  }
  function pe(e3, n, i) {
    let r = _e({ method: e3 }, n);
    if (r.headers = _e({}, n.headers), typeof XMLHttpRequest != "undefined") {
      let a = Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, "withCredentials");
      a != null && a.set || (r.credentials = "cocos-ignore");
    }
    return Object.keys(r.headers).includes("Accept") || (r.headers.Accept = "application/proto"), Object.keys(r.headers).includes("Content-Type") || (r.headers["Content-Type"] = "application/proto"), Object.keys(r.headers).forEach((a) => {
      r.headers[a] || delete r.headers[a];
    }), i && (r.body = i), r;
  }
  function he(e3) {
    if (e3 == null) return { t: e3 };
    let n;
    if (e3 instanceof Uint8Array) n = new TextDecoder().decode(e3);
    else if (typeof e3 == "string") n = e3;
    else return typeof e3 == "object" ? e3 : { t: e3 };
    if (!n || n === "" || n === "[]") return { t: n };
    try {
      return JSON.parse(n);
    } catch (i) {
      try {
        let r = n.replace(/\n/g, "\\n").replace(/\r/g, "\\r");
        return JSON.parse(r);
      } catch (r) {
        return console.error("JSON Parse failed completely:", { original: n, error: r }), { t: n };
      }
    }
  }
  function Qe(e3) {
    if (Cn(e3)) return;
    let n = e3[0];
    if (n === 91 || n === 123) return he(e3);
    try {
      let r = e3, a = new Uint8Array(r);
      return Ne.decode(a);
    } catch (r) {
      return he(e3);
    }
  }
  function nn() {
    return { value: false };
  }
  function tn() {
    return { value: "" };
  }
  function an(e3) {
    return e3 != null;
  }
  function sn() {
    return { cid: "", channel: void 0, channel_join: void 0, channel_leave: void 0, channel_message: void 0, channel_message_ack: void 0, channel_message_send: void 0, error: void 0, ping: void 0, pong: void 0 };
  }
  function on() {
    return { id: "0", presences: [], self: void 0, chanel_label: "", clan_logo: "", category_name: "" };
  }
  function ln() {
    return { clan_id: "0", channel_id: "0", channel_type: 0, is_public: false };
  }
  function cn() {
    return { clan_id: "0", channel_id: "0", channel_type: 0, is_public: false };
  }
  function dn() {
    return { channel_id: "0", message_id: "0", code: 0, username: "", create_time_seconds: 0, update_time_seconds: 0, persistent: void 0, clan_logo: "", category_name: "" };
  }
  function _n() {
    return { clan_id: "0", channel_id: "0", content: "", mentions: [], attachments: [], references: [], mode: 0, anonymous_message: false, mention_everyone: false, avatar: "", is_public: false, code: 0, topic_id: "0", id: "0" };
  }
  function un() {
    return { code: 0, message: "", context: {} };
  }
  function fn() {
    return { key: "", value: "" };
  }
  function hn() {
    return {};
  }
  function pn() {
    return {};
  }
  function mn() {
    return { user_id: "0", session_id: "", username: "", status: void 0, is_mobile: false, user_status: "" };
  }
  function T(e3) {
    return e3.toString();
  }
  function bn(e3) {
    return typeof e3 == "object" && e3 !== null;
  }
  function _(e3) {
    return e3 != null;
  }
  function Pn(e3) {
    var n, i;
    try {
      n = he(e3.channel_message.content);
    } catch (a) {
      console.log("content is invalid", a);
    }
    try {
      i = Qe(e3.channel_message.attachments);
    } catch (a) {
      console.log("attachments is invalid", a);
    }
    var r = { id: e3.id || e3.channel_message.message_id, avatar: e3.channel_message.avatar, channel_id: e3.channel_message.channel_id, mode: e3.channel_message.mode, channel_label: e3.channel_message.channel_label, clan_id: e3.channel_message.clan_id, code: e3.channel_message.code, message_id: e3.channel_message.message_id, sender_id: e3.channel_message.sender_id, update_time: e3.channel_message.update_time, clan_logo: e3.channel_message.clan_logo, category_name: e3.channel_message.category_name, username: e3.channel_message.username, clan_nick: e3.channel_message.clan_nick, clan_avatar: e3.channel_message.clan_avatar, display_name: e3.channel_message.display_name, content: n, attachments: i == null ? void 0 : i.attachments, hide_editted: e3.channel_message.hide_editted, is_public: e3.channel_message.is_public, create_time_seconds: e3.channel_message.create_time_seconds, update_time_seconds: e3.channel_message.update_time_seconds, topic_id: e3.channel_message.topic_id };
    return r;
  }
  function Ae(e3) {
    let n = new URL(e3);
    return `${n.protocol === "https:" ? "https://" : "http://"}${n.hostname}:${n.port}`;
  }
  function yn(r) {
    return g(this, arguments, function* (e3, n = 20, i = 100) {
      var l;
      let a = 0, t2 = i, o = e3;
      for (; a < n; ) {
        if ((l = o.adapter) != null && l.isOpen()) return;
        yield new Promise((c) => setTimeout(c, t2)), t2 *= 2, a++;
      }
      throw new L(`Socket failed to connect after ${n} attempts (total wait: ~${Math.pow(2, n) * i}ms)`);
    });
  }
  var import_minimal, import_minimal2, import_minimal3, kn, Je, Sn, vn, We, _e, g, ke, Se, ve, I, J, W, Te, Ce, H, ae, Pe, ue, Ee, fe, Me, O, S, D, v, U, Ne, Cn, oe, me, ge, le, B, w, q, V, F, G, xe, K, Y, b, R, gn, k, M, ce, de, ye, Ie, L, Re;
  var init_index_esm = __esm({
    "node_modules/mezon-light-sdk/dist/index.esm.mjs"() {
      init_base64();
      init_long();
      import_minimal = __toESM(require_minimal2(), 1);
      init_base64();
      init_long();
      import_minimal2 = __toESM(require_minimal2(), 1);
      init_long();
      import_minimal3 = __toESM(require_minimal2(), 1);
      kn = Object.defineProperty;
      Je = Object.getOwnPropertySymbols;
      Sn = Object.prototype.hasOwnProperty;
      vn = Object.prototype.propertyIsEnumerable;
      We = (e3, n, i) => n in e3 ? kn(e3, n, { enumerable: true, configurable: true, writable: true, value: i }) : e3[n] = i;
      _e = (e3, n) => {
        for (var i in n || (n = {})) Sn.call(n, i) && We(e3, i, n[i]);
        if (Je) for (var i of Je(n)) vn.call(n, i) && We(e3, i, n[i]);
        return e3;
      };
      g = (e3, n, i) => new Promise((r, a) => {
        var t2 = (c) => {
          try {
            l(i.next(c));
          } catch (d) {
            a(d);
          }
        }, o = (c) => {
          try {
            l(i.throw(c));
          } catch (d) {
            a(d);
          }
        }, l = (c) => c.done ? r(c.value) : Promise.resolve(c.value).then(t2, o);
        l((i = i.apply(e3, n)).next());
      });
      ke = "https://gw.mezon.ai";
      Se = 20;
      ve = 100;
      I = "0";
      J = 3;
      W = 2;
      Te = 4;
      Ce = 3;
      H = "DefaultServerKey";
      ae = class e {
        constructor(n, i, r, a, t2, o) {
          this.created = r;
          this.api_url = a;
          this.id_token = t2;
          this.token = n, this.refresh_token = i, this.id_token = t2, this.api_url = a, this.created_at = Math.floor((/* @__PURE__ */ new Date()).getTime() / 1e3), this.is_remember = o, this.update(n, i, o);
        }
        isexpired(n) {
          return this.expires_at - n <= 0;
        }
        isrefreshexpired(n) {
          return this.refresh_expires_at - n <= 0;
        }
        update(n, i, r) {
          let a = n.split(".");
          if (a.length != 3) throw "jwt is not valid.";
          let t2 = JSON.parse(_atob(a[1])), o = Math.floor(parseInt(t2.exp));
          if (i) {
            let l = i.split(".");
            if (l.length != 3) throw "refresh jwt is not valid.";
            let c = JSON.parse(_atob(l[1])), d = Math.floor(parseInt(c.exp));
            this.refresh_expires_at = d, this.refresh_token = i, this.is_remember = r;
          }
          this.token = n, this.expires_at = o, this.username = t2.usn, this.user_id = t2.uid, this.vars = t2.vrs;
        }
        static restore(n, i, r, a) {
          return new e(n, i, false, r, "", a);
        }
      };
      Pe = { encode(e3, n = import_minimal.default.Writer.create()) {
        return e3.created !== false && n.uint32(8).bool(e3.created), e3.token !== "" && n.uint32(18).string(e3.token), e3.refresh_token !== "" && n.uint32(26).string(e3.refresh_token), e3.user_id !== "0" && n.uint32(32).int64(e3.user_id), e3.is_remember !== false && n.uint32(40).bool(e3.is_remember), e3.api_url !== "" && n.uint32(50).string(e3.api_url), e3.id_token !== "" && n.uint32(58).string(e3.id_token), n;
      }, decode(e3, n) {
        let i = e3 instanceof import_minimal.default.Reader ? e3 : import_minimal.default.Reader.create(e3), r = n === void 0 ? i.len : i.pos + n, a = Be();
        for (; i.pos < r; ) {
          let t2 = i.uint32();
          switch (t2 >>> 3) {
            case 1:
              if (t2 !== 8) break;
              a.created = i.bool();
              continue;
            case 2:
              if (t2 !== 18) break;
              a.token = i.string();
              continue;
            case 3:
              if (t2 !== 26) break;
              a.refresh_token = i.string();
              continue;
            case 4:
              if (t2 !== 32) break;
              a.user_id = m(i.int64());
              continue;
            case 5:
              if (t2 !== 40) break;
              a.is_remember = i.bool();
              continue;
            case 6:
              if (t2 !== 50) break;
              a.api_url = i.string();
              continue;
            case 7:
              if (t2 !== 58) break;
              a.id_token = i.string();
              continue;
          }
          if ((t2 & 7) === 4 || t2 === 0) break;
          i.skipType(t2 & 7);
        }
        return a;
      }, fromJSON(e3) {
        return { created: s(e3.created) ? globalThis.Boolean(e3.created) : false, token: s(e3.token) ? globalThis.String(e3.token) : "", refresh_token: s(e3.refresh_token) ? globalThis.String(e3.refresh_token) : "", user_id: s(e3.user_id) ? globalThis.String(e3.user_id) : "0", is_remember: s(e3.is_remember) ? globalThis.Boolean(e3.is_remember) : false, api_url: s(e3.api_url) ? globalThis.String(e3.api_url) : "", id_token: s(e3.id_token) ? globalThis.String(e3.id_token) : "" };
      }, toJSON(e3) {
        let n = {};
        return e3.created !== false && (n.created = e3.created), e3.token !== "" && (n.token = e3.token), e3.refresh_token !== "" && (n.refresh_token = e3.refresh_token), e3.user_id !== "0" && (n.user_id = e3.user_id), e3.is_remember !== false && (n.is_remember = e3.is_remember), e3.api_url !== "" && (n.api_url = e3.api_url), e3.id_token !== "" && (n.id_token = e3.id_token), n;
      }, create(e3) {
        return Pe.fromPartial(e3 != null ? e3 : {});
      }, fromPartial(e3) {
        var i, r, a, t2, o, l, c;
        let n = Be();
        return n.created = (i = e3.created) != null ? i : false, n.token = (r = e3.token) != null ? r : "", n.refresh_token = (a = e3.refresh_token) != null ? a : "", n.user_id = (t2 = e3.user_id) != null ? t2 : "0", n.is_remember = (o = e3.is_remember) != null ? o : false, n.api_url = (l = e3.api_url) != null ? l : "", n.id_token = (c = e3.id_token) != null ? c : "", n;
      } };
      ue = { encode(e3, n = import_minimal.default.Writer.create()) {
        return e3.token !== "" && n.uint32(10).string(e3.token), Object.entries(e3.vars).forEach(([i, r]) => {
          Ee.encode({ key: i, value: r }, n.uint32(18).fork()).ldelim();
        }), e3.is_remember !== false && n.uint32(24).bool(e3.is_remember), n;
      }, decode(e3, n) {
        let i = e3 instanceof import_minimal.default.Reader ? e3 : import_minimal.default.Reader.create(e3), r = n === void 0 ? i.len : i.pos + n, a = we();
        for (; i.pos < r; ) {
          let t2 = i.uint32();
          switch (t2 >>> 3) {
            case 1:
              if (t2 !== 10) break;
              a.token = i.string();
              continue;
            case 2:
              if (t2 !== 18) break;
              let o = Ee.decode(i, i.uint32());
              o.value !== void 0 && (a.vars[o.key] = o.value);
              continue;
            case 3:
              if (t2 !== 24) break;
              a.is_remember = i.bool();
              continue;
          }
          if ((t2 & 7) === 4 || t2 === 0) break;
          i.skipType(t2 & 7);
        }
        return a;
      }, fromJSON(e3) {
        return { token: s(e3.token) ? globalThis.String(e3.token) : "", vars: Tn(e3.vars) ? Object.entries(e3.vars).reduce((n, [i, r]) => (n[i] = String(r), n), {}) : {}, is_remember: s(e3.is_remember) ? globalThis.Boolean(e3.is_remember) : false };
      }, toJSON(e3) {
        let n = {};
        if (e3.token !== "" && (n.token = e3.token), e3.vars) {
          let i = Object.entries(e3.vars);
          i.length > 0 && (n.vars = {}, i.forEach(([r, a]) => {
            n.vars[r] = a;
          }));
        }
        return e3.is_remember !== false && (n.is_remember = e3.is_remember), n;
      }, create(e3) {
        return ue.fromPartial(e3 != null ? e3 : {});
      }, fromPartial(e3) {
        var i, r, a;
        let n = we();
        return n.token = (i = e3.token) != null ? i : "", n.vars = Object.entries((r = e3.vars) != null ? r : {}).reduce((t2, [o, l]) => (l !== void 0 && (t2[o] = globalThis.String(l)), t2), {}), n.is_remember = (a = e3.is_remember) != null ? a : false, n;
      } };
      Ee = { encode(e3, n = import_minimal.default.Writer.create()) {
        return e3.key !== "" && n.uint32(10).string(e3.key), e3.value !== "" && n.uint32(18).string(e3.value), n;
      }, decode(e3, n) {
        let i = e3 instanceof import_minimal.default.Reader ? e3 : import_minimal.default.Reader.create(e3), r = n === void 0 ? i.len : i.pos + n, a = qe();
        for (; i.pos < r; ) {
          let t2 = i.uint32();
          switch (t2 >>> 3) {
            case 1:
              if (t2 !== 10) break;
              a.key = i.string();
              continue;
            case 2:
              if (t2 !== 18) break;
              a.value = i.string();
              continue;
          }
          if ((t2 & 7) === 4 || t2 === 0) break;
          i.skipType(t2 & 7);
        }
        return a;
      }, fromJSON(e3) {
        return { key: s(e3.key) ? globalThis.String(e3.key) : "", value: s(e3.value) ? globalThis.String(e3.value) : "" };
      }, toJSON(e3) {
        let n = {};
        return e3.key !== "" && (n.key = e3.key), e3.value !== "" && (n.value = e3.value), n;
      }, create(e3) {
        return Ee.fromPartial(e3 != null ? e3 : {});
      }, fromPartial(e3) {
        var i, r;
        let n = qe();
        return n.key = (i = e3.key) != null ? i : "", n.value = (r = e3.value) != null ? r : "", n;
      } };
      fe = { encode(e3, n = import_minimal.default.Writer.create()) {
        e3.clan_id !== "0" && n.uint32(8).int64(e3.clan_id), e3.parent_id !== "0" && n.uint32(16).int64(e3.parent_id), e3.channel_id !== "0" && n.uint32(24).int64(e3.channel_id), e3.category_id !== "0" && n.uint32(32).int64(e3.category_id), e3.type !== 0 && n.uint32(40).int32(e3.type), e3.channel_label !== "" && n.uint32(50).string(e3.channel_label), e3.channel_private !== 0 && n.uint32(56).int32(e3.channel_private), n.uint32(66).fork();
        for (let i of e3.user_ids) n.int64(i);
        return n.ldelim(), e3.app_id !== "0" && n.uint32(72).int64(e3.app_id), n;
      }, decode(e3, n) {
        let i = e3 instanceof import_minimal.default.Reader ? e3 : import_minimal.default.Reader.create(e3), r = n === void 0 ? i.len : i.pos + n, a = Ve();
        for (; i.pos < r; ) {
          let t2 = i.uint32();
          switch (t2 >>> 3) {
            case 1:
              if (t2 !== 8) break;
              a.clan_id = m(i.int64());
              continue;
            case 2:
              if (t2 !== 16) break;
              a.parent_id = m(i.int64());
              continue;
            case 3:
              if (t2 !== 24) break;
              a.channel_id = m(i.int64());
              continue;
            case 4:
              if (t2 !== 32) break;
              a.category_id = m(i.int64());
              continue;
            case 5:
              if (t2 !== 40) break;
              a.type = i.int32();
              continue;
            case 6:
              if (t2 !== 50) break;
              a.channel_label = i.string();
              continue;
            case 7:
              if (t2 !== 56) break;
              a.channel_private = i.int32();
              continue;
            case 8:
              if (t2 === 64) {
                a.user_ids.push(m(i.int64()));
                continue;
              }
              if (t2 === 66) {
                let o = i.uint32() + i.pos;
                for (; i.pos < o; ) a.user_ids.push(m(i.int64()));
                continue;
              }
              break;
            case 9:
              if (t2 !== 72) break;
              a.app_id = m(i.int64());
              continue;
          }
          if ((t2 & 7) === 4 || t2 === 0) break;
          i.skipType(t2 & 7);
        }
        return a;
      }, fromJSON(e3) {
        return { clan_id: s(e3.clan_id) ? globalThis.String(e3.clan_id) : "0", parent_id: s(e3.parent_id) ? globalThis.String(e3.parent_id) : "0", channel_id: s(e3.channel_id) ? globalThis.String(e3.channel_id) : "0", category_id: s(e3.category_id) ? globalThis.String(e3.category_id) : "0", type: s(e3.type) ? globalThis.Number(e3.type) : 0, channel_label: s(e3.channel_label) ? globalThis.String(e3.channel_label) : "", channel_private: s(e3.channel_private) ? globalThis.Number(e3.channel_private) : 0, user_ids: globalThis.Array.isArray(e3 == null ? void 0 : e3.user_ids) ? e3.user_ids.map((n) => globalThis.String(n)) : [], app_id: s(e3.app_id) ? globalThis.String(e3.app_id) : "0" };
      }, toJSON(e3) {
        var i;
        let n = {};
        return e3.clan_id !== "0" && (n.clan_id = e3.clan_id), e3.parent_id !== "0" && (n.parent_id = e3.parent_id), e3.channel_id !== "0" && (n.channel_id = e3.channel_id), e3.category_id !== "0" && (n.category_id = e3.category_id), e3.type !== 0 && (n.type = Math.round(e3.type)), e3.channel_label !== "" && (n.channel_label = e3.channel_label), e3.channel_private !== 0 && (n.channel_private = Math.round(e3.channel_private)), (i = e3.user_ids) != null && i.length && (n.user_ids = e3.user_ids), e3.app_id !== "0" && (n.app_id = e3.app_id), n;
      }, create(e3) {
        return fe.fromPartial(e3 != null ? e3 : {});
      }, fromPartial(e3) {
        var i, r, a, t2, o, l, c, d, u;
        let n = Ve();
        return n.clan_id = (i = e3.clan_id) != null ? i : "0", n.parent_id = (r = e3.parent_id) != null ? r : "0", n.channel_id = (a = e3.channel_id) != null ? a : "0", n.category_id = (t2 = e3.category_id) != null ? t2 : "0", n.type = (o = e3.type) != null ? o : 0, n.channel_label = (l = e3.channel_label) != null ? l : "", n.channel_private = (c = e3.channel_private) != null ? c : 0, n.user_ids = ((d = e3.user_ids) == null ? void 0 : d.map((p) => p)) || [], n.app_id = (u = e3.app_id) != null ? u : "0", n;
      } };
      Me = { encode(e3, n = import_minimal.default.Writer.create()) {
        e3.clan_id !== "0" && n.uint32(8).int64(e3.clan_id), e3.parent_id !== "0" && n.uint32(16).int64(e3.parent_id), e3.channel_id !== "0" && n.uint32(24).int64(e3.channel_id), e3.category_id !== "0" && n.uint32(32).int64(e3.category_id), e3.category_name !== "" && n.uint32(42).string(e3.category_name), e3.type !== 0 && n.uint32(48).int32(e3.type), e3.creator_id !== "0" && n.uint32(56).int64(e3.creator_id), e3.channel_label !== "" && n.uint32(66).string(e3.channel_label), e3.channel_private !== 0 && n.uint32(72).int32(e3.channel_private);
        for (let i of e3.avatars) n.uint32(82).string(i);
        n.uint32(90).fork();
        for (let i of e3.user_ids) n.int64(i);
        n.ldelim(), e3.last_sent_message !== void 0 && S.encode(e3.last_sent_message, n.uint32(98).fork()).ldelim(), e3.last_seen_message !== void 0 && S.encode(e3.last_seen_message, n.uint32(106).fork()).ldelim(), n.uint32(114).fork();
        for (let i of e3.onlines) n.bool(i);
        n.ldelim(), e3.meeting_code !== "" && n.uint32(122).string(e3.meeting_code), e3.count_mess_unread !== 0 && n.uint32(128).int32(e3.count_mess_unread), e3.active !== 0 && n.uint32(136).int32(e3.active), e3.last_pin_message !== "" && n.uint32(146).string(e3.last_pin_message);
        for (let i of e3.usernames) n.uint32(154).string(i);
        e3.creator_name !== "" && n.uint32(162).string(e3.creator_name), e3.create_time_seconds !== 0 && n.uint32(168).uint32(e3.create_time_seconds), e3.update_time_seconds !== 0 && n.uint32(176).uint32(e3.update_time_seconds);
        for (let i of e3.display_names) n.uint32(186).string(i);
        return e3.channel_avatar !== "" && n.uint32(194).string(e3.channel_avatar), e3.clan_name !== "" && n.uint32(202).string(e3.clan_name), e3.app_id !== "0" && n.uint32(208).int64(e3.app_id), e3.is_mute !== false && n.uint32(216).bool(e3.is_mute), e3.age_restricted !== 0 && n.uint32(224).int32(e3.age_restricted), e3.topic !== "" && n.uint32(234).string(e3.topic), e3.e2ee !== 0 && n.uint32(240).int32(e3.e2ee), e3.member_count !== 0 && n.uint32(248).int32(e3.member_count), n;
      }, decode(e3, n) {
        let i = e3 instanceof import_minimal.default.Reader ? e3 : import_minimal.default.Reader.create(e3), r = n === void 0 ? i.len : i.pos + n, a = Fe();
        for (; i.pos < r; ) {
          let t2 = i.uint32();
          switch (t2 >>> 3) {
            case 1:
              if (t2 !== 8) break;
              a.clan_id = m(i.int64());
              continue;
            case 2:
              if (t2 !== 16) break;
              a.parent_id = m(i.int64());
              continue;
            case 3:
              if (t2 !== 24) break;
              a.channel_id = m(i.int64());
              continue;
            case 4:
              if (t2 !== 32) break;
              a.category_id = m(i.int64());
              continue;
            case 5:
              if (t2 !== 42) break;
              a.category_name = i.string();
              continue;
            case 6:
              if (t2 !== 48) break;
              a.type = i.int32();
              continue;
            case 7:
              if (t2 !== 56) break;
              a.creator_id = m(i.int64());
              continue;
            case 8:
              if (t2 !== 66) break;
              a.channel_label = i.string();
              continue;
            case 9:
              if (t2 !== 72) break;
              a.channel_private = i.int32();
              continue;
            case 10:
              if (t2 !== 82) break;
              a.avatars.push(i.string());
              continue;
            case 11:
              if (t2 === 88) {
                a.user_ids.push(m(i.int64()));
                continue;
              }
              if (t2 === 90) {
                let o = i.uint32() + i.pos;
                for (; i.pos < o; ) a.user_ids.push(m(i.int64()));
                continue;
              }
              break;
            case 12:
              if (t2 !== 98) break;
              a.last_sent_message = S.decode(i, i.uint32());
              continue;
            case 13:
              if (t2 !== 106) break;
              a.last_seen_message = S.decode(i, i.uint32());
              continue;
            case 14:
              if (t2 === 112) {
                a.onlines.push(i.bool());
                continue;
              }
              if (t2 === 114) {
                let o = i.uint32() + i.pos;
                for (; i.pos < o; ) a.onlines.push(i.bool());
                continue;
              }
              break;
            case 15:
              if (t2 !== 122) break;
              a.meeting_code = i.string();
              continue;
            case 16:
              if (t2 !== 128) break;
              a.count_mess_unread = i.int32();
              continue;
            case 17:
              if (t2 !== 136) break;
              a.active = i.int32();
              continue;
            case 18:
              if (t2 !== 146) break;
              a.last_pin_message = i.string();
              continue;
            case 19:
              if (t2 !== 154) break;
              a.usernames.push(i.string());
              continue;
            case 20:
              if (t2 !== 162) break;
              a.creator_name = i.string();
              continue;
            case 21:
              if (t2 !== 168) break;
              a.create_time_seconds = i.uint32();
              continue;
            case 22:
              if (t2 !== 176) break;
              a.update_time_seconds = i.uint32();
              continue;
            case 23:
              if (t2 !== 186) break;
              a.display_names.push(i.string());
              continue;
            case 24:
              if (t2 !== 194) break;
              a.channel_avatar = i.string();
              continue;
            case 25:
              if (t2 !== 202) break;
              a.clan_name = i.string();
              continue;
            case 26:
              if (t2 !== 208) break;
              a.app_id = m(i.int64());
              continue;
            case 27:
              if (t2 !== 216) break;
              a.is_mute = i.bool();
              continue;
            case 28:
              if (t2 !== 224) break;
              a.age_restricted = i.int32();
              continue;
            case 29:
              if (t2 !== 234) break;
              a.topic = i.string();
              continue;
            case 30:
              if (t2 !== 240) break;
              a.e2ee = i.int32();
              continue;
            case 31:
              if (t2 !== 248) break;
              a.member_count = i.int32();
              continue;
          }
          if ((t2 & 7) === 4 || t2 === 0) break;
          i.skipType(t2 & 7);
        }
        return a;
      }, fromJSON(e3) {
        return { clan_id: s(e3.clan_id) ? globalThis.String(e3.clan_id) : "0", parent_id: s(e3.parent_id) ? globalThis.String(e3.parent_id) : "0", channel_id: s(e3.channel_id) ? globalThis.String(e3.channel_id) : "0", category_id: s(e3.category_id) ? globalThis.String(e3.category_id) : "0", category_name: s(e3.category_name) ? globalThis.String(e3.category_name) : "", type: s(e3.type) ? globalThis.Number(e3.type) : 0, creator_id: s(e3.creator_id) ? globalThis.String(e3.creator_id) : "0", channel_label: s(e3.channel_label) ? globalThis.String(e3.channel_label) : "", channel_private: s(e3.channel_private) ? globalThis.Number(e3.channel_private) : 0, avatars: globalThis.Array.isArray(e3 == null ? void 0 : e3.avatars) ? e3.avatars.map((n) => globalThis.String(n)) : [], user_ids: globalThis.Array.isArray(e3 == null ? void 0 : e3.user_ids) ? e3.user_ids.map((n) => globalThis.String(n)) : [], last_sent_message: s(e3.last_sent_message) ? S.fromJSON(e3.last_sent_message) : void 0, last_seen_message: s(e3.last_seen_message) ? S.fromJSON(e3.last_seen_message) : void 0, onlines: globalThis.Array.isArray(e3 == null ? void 0 : e3.onlines) ? e3.onlines.map((n) => globalThis.Boolean(n)) : [], meeting_code: s(e3.meeting_code) ? globalThis.String(e3.meeting_code) : "", count_mess_unread: s(e3.count_mess_unread) ? globalThis.Number(e3.count_mess_unread) : 0, active: s(e3.active) ? globalThis.Number(e3.active) : 0, last_pin_message: s(e3.last_pin_message) ? globalThis.String(e3.last_pin_message) : "", usernames: globalThis.Array.isArray(e3 == null ? void 0 : e3.usernames) ? e3.usernames.map((n) => globalThis.String(n)) : [], creator_name: s(e3.creator_name) ? globalThis.String(e3.creator_name) : "", create_time_seconds: s(e3.create_time_seconds) ? globalThis.Number(e3.create_time_seconds) : 0, update_time_seconds: s(e3.update_time_seconds) ? globalThis.Number(e3.update_time_seconds) : 0, display_names: globalThis.Array.isArray(e3 == null ? void 0 : e3.display_names) ? e3.display_names.map((n) => globalThis.String(n)) : [], channel_avatar: s(e3.channel_avatar) ? globalThis.String(e3.channel_avatar) : "", clan_name: s(e3.clan_name) ? globalThis.String(e3.clan_name) : "", app_id: s(e3.app_id) ? globalThis.String(e3.app_id) : "0", is_mute: s(e3.is_mute) ? globalThis.Boolean(e3.is_mute) : false, age_restricted: s(e3.age_restricted) ? globalThis.Number(e3.age_restricted) : 0, topic: s(e3.topic) ? globalThis.String(e3.topic) : "", e2ee: s(e3.e2ee) ? globalThis.Number(e3.e2ee) : 0, member_count: s(e3.member_count) ? globalThis.Number(e3.member_count) : 0 };
      }, toJSON(e3) {
        var i, r, a, t2, o;
        let n = {};
        return e3.clan_id !== "0" && (n.clan_id = e3.clan_id), e3.parent_id !== "0" && (n.parent_id = e3.parent_id), e3.channel_id !== "0" && (n.channel_id = e3.channel_id), e3.category_id !== "0" && (n.category_id = e3.category_id), e3.category_name !== "" && (n.category_name = e3.category_name), e3.type !== 0 && (n.type = Math.round(e3.type)), e3.creator_id !== "0" && (n.creator_id = e3.creator_id), e3.channel_label !== "" && (n.channel_label = e3.channel_label), e3.channel_private !== 0 && (n.channel_private = Math.round(e3.channel_private)), (i = e3.avatars) != null && i.length && (n.avatars = e3.avatars), (r = e3.user_ids) != null && r.length && (n.user_ids = e3.user_ids), e3.last_sent_message !== void 0 && (n.last_sent_message = S.toJSON(e3.last_sent_message)), e3.last_seen_message !== void 0 && (n.last_seen_message = S.toJSON(e3.last_seen_message)), (a = e3.onlines) != null && a.length && (n.onlines = e3.onlines), e3.meeting_code !== "" && (n.meeting_code = e3.meeting_code), e3.count_mess_unread !== 0 && (n.count_mess_unread = Math.round(e3.count_mess_unread)), e3.active !== 0 && (n.active = Math.round(e3.active)), e3.last_pin_message !== "" && (n.last_pin_message = e3.last_pin_message), (t2 = e3.usernames) != null && t2.length && (n.usernames = e3.usernames), e3.creator_name !== "" && (n.creator_name = e3.creator_name), e3.create_time_seconds !== 0 && (n.create_time_seconds = Math.round(e3.create_time_seconds)), e3.update_time_seconds !== 0 && (n.update_time_seconds = Math.round(e3.update_time_seconds)), (o = e3.display_names) != null && o.length && (n.display_names = e3.display_names), e3.channel_avatar !== "" && (n.channel_avatar = e3.channel_avatar), e3.clan_name !== "" && (n.clan_name = e3.clan_name), e3.app_id !== "0" && (n.app_id = e3.app_id), e3.is_mute !== false && (n.is_mute = e3.is_mute), e3.age_restricted !== 0 && (n.age_restricted = Math.round(e3.age_restricted)), e3.topic !== "" && (n.topic = e3.topic), e3.e2ee !== 0 && (n.e2ee = Math.round(e3.e2ee)), e3.member_count !== 0 && (n.member_count = Math.round(e3.member_count)), n;
      }, create(e3) {
        return Me.fromPartial(e3 != null ? e3 : {});
      }, fromPartial(e3) {
        var i, r, a, t2, o, l, c, d, u, p, y, N, x, A, C, z, X, Z, $, Q, j, ee, ne, ie, te, Oe, De, Ue, Le;
        let n = Fe();
        return n.clan_id = (i = e3.clan_id) != null ? i : "0", n.parent_id = (r = e3.parent_id) != null ? r : "0", n.channel_id = (a = e3.channel_id) != null ? a : "0", n.category_id = (t2 = e3.category_id) != null ? t2 : "0", n.category_name = (o = e3.category_name) != null ? o : "", n.type = (l = e3.type) != null ? l : 0, n.creator_id = (c = e3.creator_id) != null ? c : "0", n.channel_label = (d = e3.channel_label) != null ? d : "", n.channel_private = (u = e3.channel_private) != null ? u : 0, n.avatars = ((p = e3.avatars) == null ? void 0 : p.map((E) => E)) || [], n.user_ids = ((y = e3.user_ids) == null ? void 0 : y.map((E) => E)) || [], n.last_sent_message = e3.last_sent_message !== void 0 && e3.last_sent_message !== null ? S.fromPartial(e3.last_sent_message) : void 0, n.last_seen_message = e3.last_seen_message !== void 0 && e3.last_seen_message !== null ? S.fromPartial(e3.last_seen_message) : void 0, n.onlines = ((N = e3.onlines) == null ? void 0 : N.map((E) => E)) || [], n.meeting_code = (x = e3.meeting_code) != null ? x : "", n.count_mess_unread = (A = e3.count_mess_unread) != null ? A : 0, n.active = (C = e3.active) != null ? C : 0, n.last_pin_message = (z = e3.last_pin_message) != null ? z : "", n.usernames = ((X = e3.usernames) == null ? void 0 : X.map((E) => E)) || [], n.creator_name = (Z = e3.creator_name) != null ? Z : "", n.create_time_seconds = ($ = e3.create_time_seconds) != null ? $ : 0, n.update_time_seconds = (Q = e3.update_time_seconds) != null ? Q : 0, n.display_names = ((j = e3.display_names) == null ? void 0 : j.map((E) => E)) || [], n.channel_avatar = (ee = e3.channel_avatar) != null ? ee : "", n.clan_name = (ne = e3.clan_name) != null ? ne : "", n.app_id = (ie = e3.app_id) != null ? ie : "0", n.is_mute = (te = e3.is_mute) != null ? te : false, n.age_restricted = (Oe = e3.age_restricted) != null ? Oe : 0, n.topic = (De = e3.topic) != null ? De : "", n.e2ee = (Ue = e3.e2ee) != null ? Ue : 0, n.member_count = (Le = e3.member_count) != null ? Le : 0, n;
      } };
      import_minimal.default.util.Long !== long_default && (import_minimal.default.util.Long = long_default, import_minimal.default.configure());
      O = { encode(e3, n = import_minimal.default.Writer.create()) {
        return e3.clan_id !== "0" && n.uint32(8).int64(e3.clan_id), e3.channel_id !== "0" && n.uint32(16).int64(e3.channel_id), e3.message_id !== "0" && n.uint32(24).int64(e3.message_id), e3.code !== 0 && n.uint32(32).int32(e3.code), e3.sender_id !== "0" && n.uint32(40).int64(e3.sender_id), e3.username !== "" && n.uint32(50).string(e3.username), e3.avatar !== "" && n.uint32(58).string(e3.avatar), e3.content !== "" && n.uint32(66).string(e3.content), e3.channel_label !== "" && n.uint32(74).string(e3.channel_label), e3.clan_logo !== "" && n.uint32(82).string(e3.clan_logo), e3.category_name !== "" && n.uint32(90).string(e3.category_name), e3.display_name !== "" && n.uint32(98).string(e3.display_name), e3.clan_nick !== "" && n.uint32(106).string(e3.clan_nick), e3.clan_avatar !== "" && n.uint32(114).string(e3.clan_avatar), e3.reactions.length !== 0 && n.uint32(122).bytes(e3.reactions), e3.mentions.length !== 0 && n.uint32(130).bytes(e3.mentions), e3.attachments.length !== 0 && n.uint32(138).bytes(e3.attachments), e3.references.length !== 0 && n.uint32(146).bytes(e3.references), e3.referenced_message.length !== 0 && n.uint32(154).bytes(e3.referenced_message), e3.create_time_seconds !== 0 && n.uint32(160).uint32(e3.create_time_seconds), e3.update_time_seconds !== 0 && n.uint32(168).uint32(e3.update_time_seconds), e3.mode !== 0 && n.uint32(176).int32(e3.mode), e3.hide_editted !== false && n.uint32(184).bool(e3.hide_editted), e3.is_public !== false && n.uint32(192).bool(e3.is_public), e3.topic_id !== "0" && n.uint32(200).int64(e3.topic_id), n;
      }, decode(e3, n) {
        let i = e3 instanceof import_minimal.default.Reader ? e3 : import_minimal.default.Reader.create(e3), r = n === void 0 ? i.len : i.pos + n, a = Ge();
        for (; i.pos < r; ) {
          let t2 = i.uint32();
          switch (t2 >>> 3) {
            case 1:
              if (t2 !== 8) break;
              a.clan_id = m(i.int64());
              continue;
            case 2:
              if (t2 !== 16) break;
              a.channel_id = m(i.int64());
              continue;
            case 3:
              if (t2 !== 24) break;
              a.message_id = m(i.int64());
              continue;
            case 4:
              if (t2 !== 32) break;
              a.code = i.int32();
              continue;
            case 5:
              if (t2 !== 40) break;
              a.sender_id = m(i.int64());
              continue;
            case 6:
              if (t2 !== 50) break;
              a.username = i.string();
              continue;
            case 7:
              if (t2 !== 58) break;
              a.avatar = i.string();
              continue;
            case 8:
              if (t2 !== 66) break;
              a.content = i.string();
              continue;
            case 9:
              if (t2 !== 74) break;
              a.channel_label = i.string();
              continue;
            case 10:
              if (t2 !== 82) break;
              a.clan_logo = i.string();
              continue;
            case 11:
              if (t2 !== 90) break;
              a.category_name = i.string();
              continue;
            case 12:
              if (t2 !== 98) break;
              a.display_name = i.string();
              continue;
            case 13:
              if (t2 !== 106) break;
              a.clan_nick = i.string();
              continue;
            case 14:
              if (t2 !== 114) break;
              a.clan_avatar = i.string();
              continue;
            case 15:
              if (t2 !== 122) break;
              a.reactions = i.bytes();
              continue;
            case 16:
              if (t2 !== 130) break;
              a.mentions = i.bytes();
              continue;
            case 17:
              if (t2 !== 138) break;
              a.attachments = i.bytes();
              continue;
            case 18:
              if (t2 !== 146) break;
              a.references = i.bytes();
              continue;
            case 19:
              if (t2 !== 154) break;
              a.referenced_message = i.bytes();
              continue;
            case 20:
              if (t2 !== 160) break;
              a.create_time_seconds = i.uint32();
              continue;
            case 21:
              if (t2 !== 168) break;
              a.update_time_seconds = i.uint32();
              continue;
            case 22:
              if (t2 !== 176) break;
              a.mode = i.int32();
              continue;
            case 23:
              if (t2 !== 184) break;
              a.hide_editted = i.bool();
              continue;
            case 24:
              if (t2 !== 192) break;
              a.is_public = i.bool();
              continue;
            case 25:
              if (t2 !== 200) break;
              a.topic_id = m(i.int64());
              continue;
          }
          if ((t2 & 7) === 4 || t2 === 0) break;
          i.skipType(t2 & 7);
        }
        return a;
      }, fromJSON(e3) {
        return { clan_id: s(e3.clan_id) ? globalThis.String(e3.clan_id) : "0", channel_id: s(e3.channel_id) ? globalThis.String(e3.channel_id) : "0", message_id: s(e3.message_id) ? globalThis.String(e3.message_id) : "0", code: s(e3.code) ? globalThis.Number(e3.code) : 0, sender_id: s(e3.sender_id) ? globalThis.String(e3.sender_id) : "0", username: s(e3.username) ? globalThis.String(e3.username) : "", avatar: s(e3.avatar) ? globalThis.String(e3.avatar) : "", content: s(e3.content) ? globalThis.String(e3.content) : "", channel_label: s(e3.channel_label) ? globalThis.String(e3.channel_label) : "", clan_logo: s(e3.clan_logo) ? globalThis.String(e3.clan_logo) : "", category_name: s(e3.category_name) ? globalThis.String(e3.category_name) : "", display_name: s(e3.display_name) ? globalThis.String(e3.display_name) : "", clan_nick: s(e3.clan_nick) ? globalThis.String(e3.clan_nick) : "", clan_avatar: s(e3.clan_avatar) ? globalThis.String(e3.clan_avatar) : "", reactions: s(e3.reactions) ? re(e3.reactions) : new Uint8Array(0), mentions: s(e3.mentions) ? re(e3.mentions) : new Uint8Array(0), attachments: s(e3.attachments) ? re(e3.attachments) : new Uint8Array(0), references: s(e3.references) ? re(e3.references) : new Uint8Array(0), referenced_message: s(e3.referenced_message) ? re(e3.referenced_message) : new Uint8Array(0), create_time_seconds: s(e3.create_time_seconds) ? globalThis.Number(e3.create_time_seconds) : 0, update_time_seconds: s(e3.update_time_seconds) ? globalThis.Number(e3.update_time_seconds) : 0, mode: s(e3.mode) ? globalThis.Number(e3.mode) : 0, hide_editted: s(e3.hide_editted) ? globalThis.Boolean(e3.hide_editted) : false, is_public: s(e3.is_public) ? globalThis.Boolean(e3.is_public) : false, topic_id: s(e3.topic_id) ? globalThis.String(e3.topic_id) : "0" };
      }, toJSON(e3) {
        let n = {};
        return e3.clan_id !== "0" && (n.clan_id = e3.clan_id), e3.channel_id !== "0" && (n.channel_id = e3.channel_id), e3.message_id !== "0" && (n.message_id = e3.message_id), e3.code !== 0 && (n.code = Math.round(e3.code)), e3.sender_id !== "0" && (n.sender_id = e3.sender_id), e3.username !== "" && (n.username = e3.username), e3.avatar !== "" && (n.avatar = e3.avatar), e3.content !== "" && (n.content = e3.content), e3.channel_label !== "" && (n.channel_label = e3.channel_label), e3.clan_logo !== "" && (n.clan_logo = e3.clan_logo), e3.category_name !== "" && (n.category_name = e3.category_name), e3.display_name !== "" && (n.display_name = e3.display_name), e3.clan_nick !== "" && (n.clan_nick = e3.clan_nick), e3.clan_avatar !== "" && (n.clan_avatar = e3.clan_avatar), e3.reactions.length !== 0 && (n.reactions = se(e3.reactions)), e3.mentions.length !== 0 && (n.mentions = se(e3.mentions)), e3.attachments.length !== 0 && (n.attachments = se(e3.attachments)), e3.references.length !== 0 && (n.references = se(e3.references)), e3.referenced_message.length !== 0 && (n.referenced_message = se(e3.referenced_message)), e3.create_time_seconds !== 0 && (n.create_time_seconds = Math.round(e3.create_time_seconds)), e3.update_time_seconds !== 0 && (n.update_time_seconds = Math.round(e3.update_time_seconds)), e3.mode !== 0 && (n.mode = Math.round(e3.mode)), e3.hide_editted !== false && (n.hide_editted = e3.hide_editted), e3.is_public !== false && (n.is_public = e3.is_public), e3.topic_id !== "0" && (n.topic_id = e3.topic_id), n;
      }, create(e3) {
        return O.fromPartial(e3 != null ? e3 : {});
      }, fromPartial(e3) {
        var i, r, a, t2, o, l, c, d, u, p, y, N, x, A, C, z, X, Z, $, Q, j, ee, ne, ie, te;
        let n = Ge();
        return n.clan_id = (i = e3.clan_id) != null ? i : "0", n.channel_id = (r = e3.channel_id) != null ? r : "0", n.message_id = (a = e3.message_id) != null ? a : "0", n.code = (t2 = e3.code) != null ? t2 : 0, n.sender_id = (o = e3.sender_id) != null ? o : "0", n.username = (l = e3.username) != null ? l : "", n.avatar = (c = e3.avatar) != null ? c : "", n.content = (d = e3.content) != null ? d : "", n.channel_label = (u = e3.channel_label) != null ? u : "", n.clan_logo = (p = e3.clan_logo) != null ? p : "", n.category_name = (y = e3.category_name) != null ? y : "", n.display_name = (N = e3.display_name) != null ? N : "", n.clan_nick = (x = e3.clan_nick) != null ? x : "", n.clan_avatar = (A = e3.clan_avatar) != null ? A : "", n.reactions = (C = e3.reactions) != null ? C : new Uint8Array(0), n.mentions = (z = e3.mentions) != null ? z : new Uint8Array(0), n.attachments = (X = e3.attachments) != null ? X : new Uint8Array(0), n.references = (Z = e3.references) != null ? Z : new Uint8Array(0), n.referenced_message = ($ = e3.referenced_message) != null ? $ : new Uint8Array(0), n.create_time_seconds = (Q = e3.create_time_seconds) != null ? Q : 0, n.update_time_seconds = (j = e3.update_time_seconds) != null ? j : 0, n.mode = (ee = e3.mode) != null ? ee : 0, n.hide_editted = (ne = e3.hide_editted) != null ? ne : false, n.is_public = (ie = e3.is_public) != null ? ie : false, n.topic_id = (te = e3.topic_id) != null ? te : "0", n;
      } };
      S = { encode(e3, n = import_minimal.default.Writer.create()) {
        return e3.id !== "0" && n.uint32(8).int64(e3.id), e3.timestamp_seconds !== 0 && n.uint32(16).uint32(e3.timestamp_seconds), e3.sender_id !== "0" && n.uint32(24).int64(e3.sender_id), e3.content !== "" && n.uint32(34).string(e3.content), n;
      }, decode(e3, n) {
        let i = e3 instanceof import_minimal.default.Reader ? e3 : import_minimal.default.Reader.create(e3), r = n === void 0 ? i.len : i.pos + n, a = Ke();
        for (; i.pos < r; ) {
          let t2 = i.uint32();
          switch (t2 >>> 3) {
            case 1:
              if (t2 !== 8) break;
              a.id = m(i.int64());
              continue;
            case 2:
              if (t2 !== 16) break;
              a.timestamp_seconds = i.uint32();
              continue;
            case 3:
              if (t2 !== 24) break;
              a.sender_id = m(i.int64());
              continue;
            case 4:
              if (t2 !== 34) break;
              a.content = i.string();
              continue;
          }
          if ((t2 & 7) === 4 || t2 === 0) break;
          i.skipType(t2 & 7);
        }
        return a;
      }, fromJSON(e3) {
        return { id: s(e3.id) ? globalThis.String(e3.id) : "0", timestamp_seconds: s(e3.timestamp_seconds) ? globalThis.Number(e3.timestamp_seconds) : 0, sender_id: s(e3.sender_id) ? globalThis.String(e3.sender_id) : "0", content: s(e3.content) ? globalThis.String(e3.content) : "" };
      }, toJSON(e3) {
        let n = {};
        return e3.id !== "0" && (n.id = e3.id), e3.timestamp_seconds !== 0 && (n.timestamp_seconds = Math.round(e3.timestamp_seconds)), e3.sender_id !== "0" && (n.sender_id = e3.sender_id), e3.content !== "" && (n.content = e3.content), n;
      }, create(e3) {
        return S.fromPartial(e3 != null ? e3 : {});
      }, fromPartial(e3) {
        var i, r, a, t2;
        let n = Ke();
        return n.id = (i = e3.id) != null ? i : "0", n.timestamp_seconds = (r = e3.timestamp_seconds) != null ? r : 0, n.sender_id = (a = e3.sender_id) != null ? a : "0", n.content = (t2 = e3.content) != null ? t2 : "", n;
      } };
      D = { encode(e3, n = import_minimal.default.Writer.create()) {
        return e3.id !== "0" && n.uint32(8).int64(e3.id), e3.user_id !== "0" && n.uint32(16).int64(e3.user_id), e3.username !== "" && n.uint32(26).string(e3.username), e3.role_id !== "0" && n.uint32(32).int64(e3.role_id), e3.rolename !== "" && n.uint32(42).string(e3.rolename), e3.create_time_seconds !== 0 && n.uint32(48).uint32(e3.create_time_seconds), e3.s !== 0 && n.uint32(56).int32(e3.s), e3.e !== 0 && n.uint32(64).int32(e3.e), n;
      }, decode(e3, n) {
        let i = e3 instanceof import_minimal.default.Reader ? e3 : import_minimal.default.Reader.create(e3), r = n === void 0 ? i.len : i.pos + n, a = Ye();
        for (; i.pos < r; ) {
          let t2 = i.uint32();
          switch (t2 >>> 3) {
            case 1:
              if (t2 !== 8) break;
              a.id = m(i.int64());
              continue;
            case 2:
              if (t2 !== 16) break;
              a.user_id = m(i.int64());
              continue;
            case 3:
              if (t2 !== 26) break;
              a.username = i.string();
              continue;
            case 4:
              if (t2 !== 32) break;
              a.role_id = m(i.int64());
              continue;
            case 5:
              if (t2 !== 42) break;
              a.rolename = i.string();
              continue;
            case 6:
              if (t2 !== 48) break;
              a.create_time_seconds = i.uint32();
              continue;
            case 7:
              if (t2 !== 56) break;
              a.s = i.int32();
              continue;
            case 8:
              if (t2 !== 64) break;
              a.e = i.int32();
              continue;
          }
          if ((t2 & 7) === 4 || t2 === 0) break;
          i.skipType(t2 & 7);
        }
        return a;
      }, fromJSON(e3) {
        return { id: s(e3.id) ? globalThis.String(e3.id) : "0", user_id: s(e3.user_id) ? globalThis.String(e3.user_id) : "0", username: s(e3.username) ? globalThis.String(e3.username) : "", role_id: s(e3.role_id) ? globalThis.String(e3.role_id) : "0", rolename: s(e3.rolename) ? globalThis.String(e3.rolename) : "", create_time_seconds: s(e3.create_time_seconds) ? globalThis.Number(e3.create_time_seconds) : 0, s: s(e3.s) ? globalThis.Number(e3.s) : 0, e: s(e3.e) ? globalThis.Number(e3.e) : 0 };
      }, toJSON(e3) {
        let n = {};
        return e3.id !== "0" && (n.id = e3.id), e3.user_id !== "0" && (n.user_id = e3.user_id), e3.username !== "" && (n.username = e3.username), e3.role_id !== "0" && (n.role_id = e3.role_id), e3.rolename !== "" && (n.rolename = e3.rolename), e3.create_time_seconds !== 0 && (n.create_time_seconds = Math.round(e3.create_time_seconds)), e3.s !== 0 && (n.s = Math.round(e3.s)), e3.e !== 0 && (n.e = Math.round(e3.e)), n;
      }, create(e3) {
        return D.fromPartial(e3 != null ? e3 : {});
      }, fromPartial(e3) {
        var i, r, a, t2, o, l, c, d;
        let n = Ye();
        return n.id = (i = e3.id) != null ? i : "0", n.user_id = (r = e3.user_id) != null ? r : "0", n.username = (a = e3.username) != null ? a : "", n.role_id = (t2 = e3.role_id) != null ? t2 : "0", n.rolename = (o = e3.rolename) != null ? o : "", n.create_time_seconds = (l = e3.create_time_seconds) != null ? l : 0, n.s = (c = e3.s) != null ? c : 0, n.e = (d = e3.e) != null ? d : 0, n;
      } };
      v = { encode(e3, n = import_minimal.default.Writer.create()) {
        return e3.filename !== "" && n.uint32(10).string(e3.filename), e3.size !== 0 && n.uint32(16).int32(e3.size), e3.url !== "" && n.uint32(26).string(e3.url), e3.filetype !== "" && n.uint32(34).string(e3.filetype), e3.width !== 0 && n.uint32(40).int32(e3.width), e3.height !== 0 && n.uint32(48).int32(e3.height), e3.thumbnail !== "" && n.uint32(58).string(e3.thumbnail), e3.duration !== 0 && n.uint32(64).int32(e3.duration), n;
      }, decode(e3, n) {
        let i = e3 instanceof import_minimal.default.Reader ? e3 : import_minimal.default.Reader.create(e3), r = n === void 0 ? i.len : i.pos + n, a = ze();
        for (; i.pos < r; ) {
          let t2 = i.uint32();
          switch (t2 >>> 3) {
            case 1:
              if (t2 !== 10) break;
              a.filename = i.string();
              continue;
            case 2:
              if (t2 !== 16) break;
              a.size = i.int32();
              continue;
            case 3:
              if (t2 !== 26) break;
              a.url = i.string();
              continue;
            case 4:
              if (t2 !== 34) break;
              a.filetype = i.string();
              continue;
            case 5:
              if (t2 !== 40) break;
              a.width = i.int32();
              continue;
            case 6:
              if (t2 !== 48) break;
              a.height = i.int32();
              continue;
            case 7:
              if (t2 !== 58) break;
              a.thumbnail = i.string();
              continue;
            case 8:
              if (t2 !== 64) break;
              a.duration = i.int32();
              continue;
          }
          if ((t2 & 7) === 4 || t2 === 0) break;
          i.skipType(t2 & 7);
        }
        return a;
      }, fromJSON(e3) {
        return { filename: s(e3.filename) ? globalThis.String(e3.filename) : "", size: s(e3.size) ? globalThis.Number(e3.size) : 0, url: s(e3.url) ? globalThis.String(e3.url) : "", filetype: s(e3.filetype) ? globalThis.String(e3.filetype) : "", width: s(e3.width) ? globalThis.Number(e3.width) : 0, height: s(e3.height) ? globalThis.Number(e3.height) : 0, thumbnail: s(e3.thumbnail) ? globalThis.String(e3.thumbnail) : "", duration: s(e3.duration) ? globalThis.Number(e3.duration) : 0 };
      }, toJSON(e3) {
        let n = {};
        return e3.filename !== "" && (n.filename = e3.filename), e3.size !== 0 && (n.size = Math.round(e3.size)), e3.url !== "" && (n.url = e3.url), e3.filetype !== "" && (n.filetype = e3.filetype), e3.width !== 0 && (n.width = Math.round(e3.width)), e3.height !== 0 && (n.height = Math.round(e3.height)), e3.thumbnail !== "" && (n.thumbnail = e3.thumbnail), e3.duration !== 0 && (n.duration = Math.round(e3.duration)), n;
      }, create(e3) {
        return v.fromPartial(e3 != null ? e3 : {});
      }, fromPartial(e3) {
        var i, r, a, t2, o, l, c, d;
        let n = ze();
        return n.filename = (i = e3.filename) != null ? i : "", n.size = (r = e3.size) != null ? r : 0, n.url = (a = e3.url) != null ? a : "", n.filetype = (t2 = e3.filetype) != null ? t2 : "", n.width = (o = e3.width) != null ? o : 0, n.height = (l = e3.height) != null ? l : 0, n.thumbnail = (c = e3.thumbnail) != null ? c : "", n.duration = (d = e3.duration) != null ? d : 0, n;
      } };
      U = { encode(e3, n = import_minimal.default.Writer.create()) {
        return e3.message_id !== "0" && n.uint32(8).int64(e3.message_id), e3.message_ref_id !== "0" && n.uint32(16).int64(e3.message_ref_id), e3.content !== "" && n.uint32(26).string(e3.content), e3.has_attachment !== false && n.uint32(32).bool(e3.has_attachment), e3.ref_type !== 0 && n.uint32(40).int32(e3.ref_type), e3.message_sender_id !== "0" && n.uint32(48).int64(e3.message_sender_id), e3.message_sender_username !== "" && n.uint32(58).string(e3.message_sender_username), e3.mesages_sender_avatar !== "" && n.uint32(66).string(e3.mesages_sender_avatar), e3.message_sender_clan_nick !== "" && n.uint32(74).string(e3.message_sender_clan_nick), e3.message_sender_display_name !== "" && n.uint32(82).string(e3.message_sender_display_name), n;
      }, decode(e3, n) {
        let i = e3 instanceof import_minimal.default.Reader ? e3 : import_minimal.default.Reader.create(e3), r = n === void 0 ? i.len : i.pos + n, a = Xe();
        for (; i.pos < r; ) {
          let t2 = i.uint32();
          switch (t2 >>> 3) {
            case 1:
              if (t2 !== 8) break;
              a.message_id = m(i.int64());
              continue;
            case 2:
              if (t2 !== 16) break;
              a.message_ref_id = m(i.int64());
              continue;
            case 3:
              if (t2 !== 26) break;
              a.content = i.string();
              continue;
            case 4:
              if (t2 !== 32) break;
              a.has_attachment = i.bool();
              continue;
            case 5:
              if (t2 !== 40) break;
              a.ref_type = i.int32();
              continue;
            case 6:
              if (t2 !== 48) break;
              a.message_sender_id = m(i.int64());
              continue;
            case 7:
              if (t2 !== 58) break;
              a.message_sender_username = i.string();
              continue;
            case 8:
              if (t2 !== 66) break;
              a.mesages_sender_avatar = i.string();
              continue;
            case 9:
              if (t2 !== 74) break;
              a.message_sender_clan_nick = i.string();
              continue;
            case 10:
              if (t2 !== 82) break;
              a.message_sender_display_name = i.string();
              continue;
          }
          if ((t2 & 7) === 4 || t2 === 0) break;
          i.skipType(t2 & 7);
        }
        return a;
      }, fromJSON(e3) {
        return { message_id: s(e3.message_id) ? globalThis.String(e3.message_id) : "0", message_ref_id: s(e3.message_ref_id) ? globalThis.String(e3.message_ref_id) : "0", content: s(e3.content) ? globalThis.String(e3.content) : "", has_attachment: s(e3.has_attachment) ? globalThis.Boolean(e3.has_attachment) : false, ref_type: s(e3.ref_type) ? globalThis.Number(e3.ref_type) : 0, message_sender_id: s(e3.message_sender_id) ? globalThis.String(e3.message_sender_id) : "0", message_sender_username: s(e3.message_sender_username) ? globalThis.String(e3.message_sender_username) : "", mesages_sender_avatar: s(e3.mesages_sender_avatar) ? globalThis.String(e3.mesages_sender_avatar) : "", message_sender_clan_nick: s(e3.message_sender_clan_nick) ? globalThis.String(e3.message_sender_clan_nick) : "", message_sender_display_name: s(e3.message_sender_display_name) ? globalThis.String(e3.message_sender_display_name) : "" };
      }, toJSON(e3) {
        let n = {};
        return e3.message_id !== "0" && (n.message_id = e3.message_id), e3.message_ref_id !== "0" && (n.message_ref_id = e3.message_ref_id), e3.content !== "" && (n.content = e3.content), e3.has_attachment !== false && (n.has_attachment = e3.has_attachment), e3.ref_type !== 0 && (n.ref_type = Math.round(e3.ref_type)), e3.message_sender_id !== "0" && (n.message_sender_id = e3.message_sender_id), e3.message_sender_username !== "" && (n.message_sender_username = e3.message_sender_username), e3.mesages_sender_avatar !== "" && (n.mesages_sender_avatar = e3.mesages_sender_avatar), e3.message_sender_clan_nick !== "" && (n.message_sender_clan_nick = e3.message_sender_clan_nick), e3.message_sender_display_name !== "" && (n.message_sender_display_name = e3.message_sender_display_name), n;
      }, create(e3) {
        return U.fromPartial(e3 != null ? e3 : {});
      }, fromPartial(e3) {
        var i, r, a, t2, o, l, c, d, u, p;
        let n = Xe();
        return n.message_id = (i = e3.message_id) != null ? i : "0", n.message_ref_id = (r = e3.message_ref_id) != null ? r : "0", n.content = (a = e3.content) != null ? a : "", n.has_attachment = (t2 = e3.has_attachment) != null ? t2 : false, n.ref_type = (o = e3.ref_type) != null ? o : 0, n.message_sender_id = (l = e3.message_sender_id) != null ? l : "0", n.message_sender_username = (c = e3.message_sender_username) != null ? c : "", n.mesages_sender_avatar = (d = e3.mesages_sender_avatar) != null ? d : "", n.message_sender_clan_nick = (u = e3.message_sender_clan_nick) != null ? u : "", n.message_sender_display_name = (p = e3.message_sender_display_name) != null ? p : "", n;
      } };
      Ne = { encode(e3, n = import_minimal.default.Writer.create()) {
        for (let i of e3.attachments) v.encode(i, n.uint32(10).fork()).ldelim();
        return n;
      }, decode(e3, n) {
        let i = e3 instanceof import_minimal.default.Reader ? e3 : import_minimal.default.Reader.create(e3), r = n === void 0 ? i.len : i.pos + n, a = Ze();
        for (; i.pos < r; ) {
          let t2 = i.uint32();
          switch (t2 >>> 3) {
            case 1:
              if (t2 !== 10) break;
              a.attachments.push(v.decode(i, i.uint32()));
              continue;
          }
          if ((t2 & 7) === 4 || t2 === 0) break;
          i.skipType(t2 & 7);
        }
        return a;
      }, fromJSON(e3) {
        return { attachments: globalThis.Array.isArray(e3 == null ? void 0 : e3.attachments) ? e3.attachments.map((n) => v.fromJSON(n)) : [] };
      }, toJSON(e3) {
        var i;
        let n = {};
        return (i = e3.attachments) != null && i.length && (n.attachments = e3.attachments.map((r) => v.toJSON(r))), n;
      }, create(e3) {
        return Ne.fromPartial(e3 != null ? e3 : {});
      }, fromPartial(e3) {
        var i;
        let n = Ze();
        return n.attachments = ((i = e3.attachments) == null ? void 0 : i.map((r) => v.fromPartial(r))) || [], n;
      } };
      Cn = (e3) => !e3 || e3 === null || e3 === void 0 || e3 === "" || e3 === "[]";
      oe = class {
        constructor(n, i, r) {
          this.serverKey = n;
          this.timeoutMs = i;
          this.basePath = r;
        }
        setBasePath(n) {
          this.basePath = n;
        }
        authenticateIdToken(n, i, r, a = {}) {
          if (r == null) throw new Error("'body' is a required parameter but is null or undefined.");
          let t2 = "/v2/account/authenticate/idtoken", o = /* @__PURE__ */ new Map(), l = "";
          l = JSON.stringify(r || {});
          let c = this.buildFullUrl(this.basePath, t2, o), d = pe("POST", a, l);
          return n && (d.headers.Authorization = "Basic " + encode(n + ":" + i)), Promise.race([fetch(c, d).then((u) => {
            if (u.status == 204) return u;
            if (u.status >= 200 && u.status < 300) return u.json();
            throw u;
          }), new Promise((u, p) => setTimeout(p, this.timeoutMs, "Request timed out."))]);
        }
        sessionRefresh(n, i, r, a = {}) {
          if (r == null) throw new Error("'body' is a required parameter but is null or undefined.");
          let t2 = "/mezon.api.Mezon/SessionRefresh", o = /* @__PURE__ */ new Map(), c = ue.encode(ue.fromPartial(r)).finish(), d = this.buildFullUrl(this.basePath, t2, o), u = pe("POST", a, "");
          return u.body = c, n && (u.headers.Authorization = "Basic " + encode(n + ":" + i)), Promise.race([fetch(d, u).then((p) => g(this, null, function* () {
            if (p.status == 204) return {};
            if (p.status >= 200 && p.status < 300) {
              let y = yield p.arrayBuffer();
              return Pe.decode(new Uint8Array(y));
            } else throw p;
          })), new Promise((p, y) => setTimeout(() => y(new Error("Request timed out.")), this.timeoutMs))]);
        }
        createChannelDesc(n, i, r = {}) {
          if (i == null) throw new Error("'body' is a required parameter but is null or undefined.");
          let a = "/mezon.api.Mezon/CreateChannelDesc", t2 = /* @__PURE__ */ new Map(), l = fe.encode(fe.fromPartial(i)).finish(), c = this.buildFullUrl(this.basePath, a, t2), d = pe("POST", r, "");
          return d.body = l, n && (d.headers.Authorization = "Bearer " + n), Promise.race([fetch(c, d).then((u) => g(this, null, function* () {
            if (u.status == 204) return {};
            if (u.status >= 200 && u.status < 300) {
              let p = yield u.arrayBuffer();
              return Me.decode(new Uint8Array(p));
            } else throw u;
          })), new Promise((u, p) => setTimeout(() => p(new Error("Request timed out.")), this.timeoutMs))]);
        }
        buildFullUrl(n, i, r) {
          let a = n + i + "?";
          for (let [t2, o] of r) o instanceof Array ? a += o.reduce((l, c) => l + encodeURIComponent(t2) + "=" + encodeURIComponent(c) + "&", "") : o != null && (a += encodeURIComponent(t2) + "=" + encodeURIComponent(o) + "&");
          return a;
        }
      };
      me = { encode(e3, n = import_minimal3.default.Writer.create()) {
        return e3.value !== false && n.uint32(8).bool(e3.value), n;
      }, decode(e3, n) {
        let i = e3 instanceof import_minimal3.default.Reader ? e3 : import_minimal3.default.Reader.create(e3), r = n === void 0 ? i.len : i.pos + n, a = nn();
        for (; i.pos < r; ) {
          let t2 = i.uint32();
          switch (t2 >>> 3) {
            case 1:
              if (t2 !== 8) break;
              a.value = i.bool();
              continue;
          }
          if ((t2 & 7) === 4 || t2 === 0) break;
          i.skipType(t2 & 7);
        }
        return a;
      }, fromJSON(e3) {
        return { value: an(e3.value) ? globalThis.Boolean(e3.value) : false };
      }, toJSON(e3) {
        let n = {};
        return e3.value !== false && (n.value = e3.value), n;
      }, create(e3) {
        return me.fromPartial(e3 != null ? e3 : {});
      }, fromPartial(e3) {
        var i;
        let n = nn();
        return n.value = (i = e3.value) != null ? i : false, n;
      } };
      ge = { encode(e3, n = import_minimal3.default.Writer.create()) {
        return e3.value !== "" && n.uint32(10).string(e3.value), n;
      }, decode(e3, n) {
        let i = e3 instanceof import_minimal3.default.Reader ? e3 : import_minimal3.default.Reader.create(e3), r = n === void 0 ? i.len : i.pos + n, a = tn();
        for (; i.pos < r; ) {
          let t2 = i.uint32();
          switch (t2 >>> 3) {
            case 1:
              if (t2 !== 10) break;
              a.value = i.string();
              continue;
          }
          if ((t2 & 7) === 4 || t2 === 0) break;
          i.skipType(t2 & 7);
        }
        return a;
      }, fromJSON(e3) {
        return { value: an(e3.value) ? globalThis.String(e3.value) : "" };
      }, toJSON(e3) {
        let n = {};
        return e3.value !== "" && (n.value = e3.value), n;
      }, create(e3) {
        return ge.fromPartial(e3 != null ? e3 : {});
      }, fromPartial(e3) {
        var i;
        let n = tn();
        return n.value = (i = e3.value) != null ? i : "", n;
      } };
      import_minimal3.default.util.Long !== long_default && (import_minimal3.default.util.Long = long_default, import_minimal3.default.configure());
      le = { encode(e3, n = import_minimal2.default.Writer.create()) {
        return e3.cid !== "" && n.uint32(10).string(e3.cid), e3.channel !== void 0 && B.encode(e3.channel, n.uint32(18).fork()).ldelim(), e3.channel_join !== void 0 && w.encode(e3.channel_join, n.uint32(34).fork()).ldelim(), e3.channel_leave !== void 0 && q.encode(e3.channel_leave, n.uint32(42).fork()).ldelim(), e3.channel_message !== void 0 && O.encode(e3.channel_message, n.uint32(50).fork()).ldelim(), e3.channel_message_ack !== void 0 && V.encode(e3.channel_message_ack, n.uint32(58).fork()).ldelim(), e3.channel_message_send !== void 0 && F.encode(e3.channel_message_send, n.uint32(66).fork()).ldelim(), e3.error !== void 0 && G.encode(e3.error, n.uint32(98).fork()).ldelim(), e3.ping !== void 0 && K.encode(e3.ping, n.uint32(178).fork()).ldelim(), e3.pong !== void 0 && Y.encode(e3.pong, n.uint32(186).fork()).ldelim(), n;
      }, decode(e3, n) {
        let i = e3 instanceof import_minimal2.default.Reader ? e3 : import_minimal2.default.Reader.create(e3), r = n === void 0 ? i.len : i.pos + n, a = sn();
        for (; i.pos < r; ) {
          let t2 = i.uint32();
          switch (t2 >>> 3) {
            case 1:
              if (t2 !== 10) break;
              a.cid = i.string();
              continue;
            case 2:
              if (t2 !== 18) break;
              a.channel = B.decode(i, i.uint32());
              continue;
            case 4:
              if (t2 !== 34) break;
              a.channel_join = w.decode(i, i.uint32());
              continue;
            case 5:
              if (t2 !== 42) break;
              a.channel_leave = q.decode(i, i.uint32());
              continue;
            case 6:
              if (t2 !== 50) break;
              a.channel_message = O.decode(i, i.uint32());
              continue;
            case 7:
              if (t2 !== 58) break;
              a.channel_message_ack = V.decode(i, i.uint32());
              continue;
            case 8:
              if (t2 !== 66) break;
              a.channel_message_send = F.decode(i, i.uint32());
              continue;
            case 12:
              if (t2 !== 98) break;
              a.error = G.decode(i, i.uint32());
              continue;
            case 22:
              if (t2 !== 178) break;
              a.ping = K.decode(i, i.uint32());
              continue;
            case 23:
              if (t2 !== 186) break;
              a.pong = Y.decode(i, i.uint32());
              continue;
          }
          if ((t2 & 7) === 4 || t2 === 0) break;
          i.skipType(t2 & 7);
        }
        return a;
      }, fromJSON(e3) {
        return { cid: _(e3.cid) ? globalThis.String(e3.cid) : "", channel: _(e3.channel) ? B.fromJSON(e3.channel) : void 0, channel_join: _(e3.channel_join) ? w.fromJSON(e3.channel_join) : void 0, channel_leave: _(e3.channel_leave) ? q.fromJSON(e3.channel_leave) : void 0, channel_message: _(e3.channel_message) ? O.fromJSON(e3.channel_message) : void 0, channel_message_ack: _(e3.channel_message_ack) ? V.fromJSON(e3.channel_message_ack) : void 0, channel_message_send: _(e3.channel_message_send) ? F.fromJSON(e3.channel_message_send) : void 0, error: _(e3.error) ? G.fromJSON(e3.error) : void 0, ping: _(e3.ping) ? K.fromJSON(e3.ping) : void 0, pong: _(e3.pong) ? Y.fromJSON(e3.pong) : void 0 };
      }, toJSON(e3) {
        let n = {};
        return e3.cid !== "" && (n.cid = e3.cid), e3.channel !== void 0 && (n.channel = B.toJSON(e3.channel)), e3.channel_join !== void 0 && (n.channel_join = w.toJSON(e3.channel_join)), e3.channel_leave !== void 0 && (n.channel_leave = q.toJSON(e3.channel_leave)), e3.channel_message !== void 0 && (n.channel_message = O.toJSON(e3.channel_message)), e3.channel_message_ack !== void 0 && (n.channel_message_ack = V.toJSON(e3.channel_message_ack)), e3.channel_message_send !== void 0 && (n.channel_message_send = F.toJSON(e3.channel_message_send)), e3.error !== void 0 && (n.error = G.toJSON(e3.error)), e3.ping !== void 0 && (n.ping = K.toJSON(e3.ping)), e3.pong !== void 0 && (n.pong = Y.toJSON(e3.pong)), n;
      }, create(e3) {
        return le.fromPartial(e3 != null ? e3 : {});
      }, fromPartial(e3) {
        var i;
        let n = sn();
        return n.cid = (i = e3.cid) != null ? i : "", n.channel = e3.channel !== void 0 && e3.channel !== null ? B.fromPartial(e3.channel) : void 0, n.channel_join = e3.channel_join !== void 0 && e3.channel_join !== null ? w.fromPartial(e3.channel_join) : void 0, n.channel_leave = e3.channel_leave !== void 0 && e3.channel_leave !== null ? q.fromPartial(e3.channel_leave) : void 0, n.channel_message = e3.channel_message !== void 0 && e3.channel_message !== null ? O.fromPartial(e3.channel_message) : void 0, n.channel_message_ack = e3.channel_message_ack !== void 0 && e3.channel_message_ack !== null ? V.fromPartial(e3.channel_message_ack) : void 0, n.channel_message_send = e3.channel_message_send !== void 0 && e3.channel_message_send !== null ? F.fromPartial(e3.channel_message_send) : void 0, n.error = e3.error !== void 0 && e3.error !== null ? G.fromPartial(e3.error) : void 0, n.ping = e3.ping !== void 0 && e3.ping !== null ? K.fromPartial(e3.ping) : void 0, n.pong = e3.pong !== void 0 && e3.pong !== null ? Y.fromPartial(e3.pong) : void 0, n;
      } };
      B = { encode(e3, n = import_minimal2.default.Writer.create()) {
        e3.id !== "0" && n.uint32(8).int64(e3.id);
        for (let i of e3.presences) b.encode(i, n.uint32(18).fork()).ldelim();
        return e3.self !== void 0 && b.encode(e3.self, n.uint32(26).fork()).ldelim(), e3.chanel_label !== "" && n.uint32(34).string(e3.chanel_label), e3.clan_logo !== "" && n.uint32(42).string(e3.clan_logo), e3.category_name !== "" && n.uint32(50).string(e3.category_name), n;
      }, decode(e3, n) {
        let i = e3 instanceof import_minimal2.default.Reader ? e3 : import_minimal2.default.Reader.create(e3), r = n === void 0 ? i.len : i.pos + n, a = on();
        for (; i.pos < r; ) {
          let t2 = i.uint32();
          switch (t2 >>> 3) {
            case 1:
              if (t2 !== 8) break;
              a.id = T(i.int64());
              continue;
            case 2:
              if (t2 !== 18) break;
              a.presences.push(b.decode(i, i.uint32()));
              continue;
            case 3:
              if (t2 !== 26) break;
              a.self = b.decode(i, i.uint32());
              continue;
            case 4:
              if (t2 !== 34) break;
              a.chanel_label = i.string();
              continue;
            case 5:
              if (t2 !== 42) break;
              a.clan_logo = i.string();
              continue;
            case 6:
              if (t2 !== 50) break;
              a.category_name = i.string();
              continue;
          }
          if ((t2 & 7) === 4 || t2 === 0) break;
          i.skipType(t2 & 7);
        }
        return a;
      }, fromJSON(e3) {
        return { id: _(e3.id) ? globalThis.String(e3.id) : "0", presences: globalThis.Array.isArray(e3 == null ? void 0 : e3.presences) ? e3.presences.map((n) => b.fromJSON(n)) : [], self: _(e3.self) ? b.fromJSON(e3.self) : void 0, chanel_label: _(e3.chanel_label) ? globalThis.String(e3.chanel_label) : "", clan_logo: _(e3.clan_logo) ? globalThis.String(e3.clan_logo) : "", category_name: _(e3.category_name) ? globalThis.String(e3.category_name) : "" };
      }, toJSON(e3) {
        var i;
        let n = {};
        return e3.id !== "0" && (n.id = e3.id), (i = e3.presences) != null && i.length && (n.presences = e3.presences.map((r) => b.toJSON(r))), e3.self !== void 0 && (n.self = b.toJSON(e3.self)), e3.chanel_label !== "" && (n.chanel_label = e3.chanel_label), e3.clan_logo !== "" && (n.clan_logo = e3.clan_logo), e3.category_name !== "" && (n.category_name = e3.category_name), n;
      }, create(e3) {
        return B.fromPartial(e3 != null ? e3 : {});
      }, fromPartial(e3) {
        var i, r, a, t2, o;
        let n = on();
        return n.id = (i = e3.id) != null ? i : "0", n.presences = ((r = e3.presences) == null ? void 0 : r.map((l) => b.fromPartial(l))) || [], n.self = e3.self !== void 0 && e3.self !== null ? b.fromPartial(e3.self) : void 0, n.chanel_label = (a = e3.chanel_label) != null ? a : "", n.clan_logo = (t2 = e3.clan_logo) != null ? t2 : "", n.category_name = (o = e3.category_name) != null ? o : "", n;
      } };
      w = { encode(e3, n = import_minimal2.default.Writer.create()) {
        return e3.clan_id !== "0" && n.uint32(8).int64(e3.clan_id), e3.channel_id !== "0" && n.uint32(16).int64(e3.channel_id), e3.channel_type !== 0 && n.uint32(24).int32(e3.channel_type), e3.is_public !== false && n.uint32(32).bool(e3.is_public), n;
      }, decode(e3, n) {
        let i = e3 instanceof import_minimal2.default.Reader ? e3 : import_minimal2.default.Reader.create(e3), r = n === void 0 ? i.len : i.pos + n, a = ln();
        for (; i.pos < r; ) {
          let t2 = i.uint32();
          switch (t2 >>> 3) {
            case 1:
              if (t2 !== 8) break;
              a.clan_id = T(i.int64());
              continue;
            case 2:
              if (t2 !== 16) break;
              a.channel_id = T(i.int64());
              continue;
            case 3:
              if (t2 !== 24) break;
              a.channel_type = i.int32();
              continue;
            case 4:
              if (t2 !== 32) break;
              a.is_public = i.bool();
              continue;
          }
          if ((t2 & 7) === 4 || t2 === 0) break;
          i.skipType(t2 & 7);
        }
        return a;
      }, fromJSON(e3) {
        return { clan_id: _(e3.clan_id) ? globalThis.String(e3.clan_id) : "0", channel_id: _(e3.channel_id) ? globalThis.String(e3.channel_id) : "0", channel_type: _(e3.channel_type) ? globalThis.Number(e3.channel_type) : 0, is_public: _(e3.is_public) ? globalThis.Boolean(e3.is_public) : false };
      }, toJSON(e3) {
        let n = {};
        return e3.clan_id !== "0" && (n.clan_id = e3.clan_id), e3.channel_id !== "0" && (n.channel_id = e3.channel_id), e3.channel_type !== 0 && (n.channel_type = Math.round(e3.channel_type)), e3.is_public !== false && (n.is_public = e3.is_public), n;
      }, create(e3) {
        return w.fromPartial(e3 != null ? e3 : {});
      }, fromPartial(e3) {
        var i, r, a, t2;
        let n = ln();
        return n.clan_id = (i = e3.clan_id) != null ? i : "0", n.channel_id = (r = e3.channel_id) != null ? r : "0", n.channel_type = (a = e3.channel_type) != null ? a : 0, n.is_public = (t2 = e3.is_public) != null ? t2 : false, n;
      } };
      q = { encode(e3, n = import_minimal2.default.Writer.create()) {
        return e3.clan_id !== "0" && n.uint32(8).int64(e3.clan_id), e3.channel_id !== "0" && n.uint32(16).int64(e3.channel_id), e3.channel_type !== 0 && n.uint32(24).int32(e3.channel_type), e3.is_public !== false && n.uint32(32).bool(e3.is_public), n;
      }, decode(e3, n) {
        let i = e3 instanceof import_minimal2.default.Reader ? e3 : import_minimal2.default.Reader.create(e3), r = n === void 0 ? i.len : i.pos + n, a = cn();
        for (; i.pos < r; ) {
          let t2 = i.uint32();
          switch (t2 >>> 3) {
            case 1:
              if (t2 !== 8) break;
              a.clan_id = T(i.int64());
              continue;
            case 2:
              if (t2 !== 16) break;
              a.channel_id = T(i.int64());
              continue;
            case 3:
              if (t2 !== 24) break;
              a.channel_type = i.int32();
              continue;
            case 4:
              if (t2 !== 32) break;
              a.is_public = i.bool();
              continue;
          }
          if ((t2 & 7) === 4 || t2 === 0) break;
          i.skipType(t2 & 7);
        }
        return a;
      }, fromJSON(e3) {
        return { clan_id: _(e3.clan_id) ? globalThis.String(e3.clan_id) : "0", channel_id: _(e3.channel_id) ? globalThis.String(e3.channel_id) : "0", channel_type: _(e3.channel_type) ? globalThis.Number(e3.channel_type) : 0, is_public: _(e3.is_public) ? globalThis.Boolean(e3.is_public) : false };
      }, toJSON(e3) {
        let n = {};
        return e3.clan_id !== "0" && (n.clan_id = e3.clan_id), e3.channel_id !== "0" && (n.channel_id = e3.channel_id), e3.channel_type !== 0 && (n.channel_type = Math.round(e3.channel_type)), e3.is_public !== false && (n.is_public = e3.is_public), n;
      }, create(e3) {
        return q.fromPartial(e3 != null ? e3 : {});
      }, fromPartial(e3) {
        var i, r, a, t2;
        let n = cn();
        return n.clan_id = (i = e3.clan_id) != null ? i : "0", n.channel_id = (r = e3.channel_id) != null ? r : "0", n.channel_type = (a = e3.channel_type) != null ? a : 0, n.is_public = (t2 = e3.is_public) != null ? t2 : false, n;
      } };
      V = { encode(e3, n = import_minimal2.default.Writer.create()) {
        return e3.channel_id !== "0" && n.uint32(8).int64(e3.channel_id), e3.message_id !== "0" && n.uint32(16).int64(e3.message_id), e3.code !== 0 && n.uint32(24).int32(e3.code), e3.username !== "" && n.uint32(34).string(e3.username), e3.create_time_seconds !== 0 && n.uint32(40).uint32(e3.create_time_seconds), e3.update_time_seconds !== 0 && n.uint32(48).uint32(e3.update_time_seconds), e3.persistent !== void 0 && me.encode({ value: e3.persistent }, n.uint32(58).fork()).ldelim(), e3.clan_logo !== "" && n.uint32(66).string(e3.clan_logo), e3.category_name !== "" && n.uint32(74).string(e3.category_name), n;
      }, decode(e3, n) {
        let i = e3 instanceof import_minimal2.default.Reader ? e3 : import_minimal2.default.Reader.create(e3), r = n === void 0 ? i.len : i.pos + n, a = dn();
        for (; i.pos < r; ) {
          let t2 = i.uint32();
          switch (t2 >>> 3) {
            case 1:
              if (t2 !== 8) break;
              a.channel_id = T(i.int64());
              continue;
            case 2:
              if (t2 !== 16) break;
              a.message_id = T(i.int64());
              continue;
            case 3:
              if (t2 !== 24) break;
              a.code = i.int32();
              continue;
            case 4:
              if (t2 !== 34) break;
              a.username = i.string();
              continue;
            case 5:
              if (t2 !== 40) break;
              a.create_time_seconds = i.uint32();
              continue;
            case 6:
              if (t2 !== 48) break;
              a.update_time_seconds = i.uint32();
              continue;
            case 7:
              if (t2 !== 58) break;
              a.persistent = me.decode(i, i.uint32()).value;
              continue;
            case 8:
              if (t2 !== 66) break;
              a.clan_logo = i.string();
              continue;
            case 9:
              if (t2 !== 74) break;
              a.category_name = i.string();
              continue;
          }
          if ((t2 & 7) === 4 || t2 === 0) break;
          i.skipType(t2 & 7);
        }
        return a;
      }, fromJSON(e3) {
        return { channel_id: _(e3.channel_id) ? globalThis.String(e3.channel_id) : "0", message_id: _(e3.message_id) ? globalThis.String(e3.message_id) : "0", code: _(e3.code) ? globalThis.Number(e3.code) : 0, username: _(e3.username) ? globalThis.String(e3.username) : "", create_time_seconds: _(e3.create_time_seconds) ? globalThis.Number(e3.create_time_seconds) : 0, update_time_seconds: _(e3.update_time_seconds) ? globalThis.Number(e3.update_time_seconds) : 0, persistent: _(e3.persistent) ? !!e3.persistent : void 0, clan_logo: _(e3.clan_logo) ? globalThis.String(e3.clan_logo) : "", category_name: _(e3.category_name) ? globalThis.String(e3.category_name) : "" };
      }, toJSON(e3) {
        let n = {};
        return e3.channel_id !== "0" && (n.channel_id = e3.channel_id), e3.message_id !== "0" && (n.message_id = e3.message_id), e3.code !== 0 && (n.code = Math.round(e3.code)), e3.username !== "" && (n.username = e3.username), e3.create_time_seconds !== 0 && (n.create_time_seconds = Math.round(e3.create_time_seconds)), e3.update_time_seconds !== 0 && (n.update_time_seconds = Math.round(e3.update_time_seconds)), e3.persistent !== void 0 && (n.persistent = e3.persistent), e3.clan_logo !== "" && (n.clan_logo = e3.clan_logo), e3.category_name !== "" && (n.category_name = e3.category_name), n;
      }, create(e3) {
        return V.fromPartial(e3 != null ? e3 : {});
      }, fromPartial(e3) {
        var i, r, a, t2, o, l, c, d, u;
        let n = dn();
        return n.channel_id = (i = e3.channel_id) != null ? i : "0", n.message_id = (r = e3.message_id) != null ? r : "0", n.code = (a = e3.code) != null ? a : 0, n.username = (t2 = e3.username) != null ? t2 : "", n.create_time_seconds = (o = e3.create_time_seconds) != null ? o : 0, n.update_time_seconds = (l = e3.update_time_seconds) != null ? l : 0, n.persistent = (c = e3.persistent) != null ? c : void 0, n.clan_logo = (d = e3.clan_logo) != null ? d : "", n.category_name = (u = e3.category_name) != null ? u : "", n;
      } };
      F = { encode(e3, n = import_minimal2.default.Writer.create()) {
        e3.clan_id !== "0" && n.uint32(8).int64(e3.clan_id), e3.channel_id !== "0" && n.uint32(16).int64(e3.channel_id), e3.content !== "" && n.uint32(26).string(e3.content);
        for (let i of e3.mentions) D.encode(i, n.uint32(34).fork()).ldelim();
        for (let i of e3.attachments) v.encode(i, n.uint32(42).fork()).ldelim();
        for (let i of e3.references) U.encode(i, n.uint32(50).fork()).ldelim();
        return e3.mode !== 0 && n.uint32(56).int32(e3.mode), e3.anonymous_message !== false && n.uint32(64).bool(e3.anonymous_message), e3.mention_everyone !== false && n.uint32(72).bool(e3.mention_everyone), e3.avatar !== "" && n.uint32(82).string(e3.avatar), e3.is_public !== false && n.uint32(88).bool(e3.is_public), e3.code !== 0 && n.uint32(96).int32(e3.code), e3.topic_id !== "0" && n.uint32(104).int64(e3.topic_id), e3.id !== "0" && n.uint32(112).int64(e3.id), n;
      }, decode(e3, n) {
        let i = e3 instanceof import_minimal2.default.Reader ? e3 : import_minimal2.default.Reader.create(e3), r = n === void 0 ? i.len : i.pos + n, a = _n();
        for (; i.pos < r; ) {
          let t2 = i.uint32();
          switch (t2 >>> 3) {
            case 1:
              if (t2 !== 8) break;
              a.clan_id = T(i.int64());
              continue;
            case 2:
              if (t2 !== 16) break;
              a.channel_id = T(i.int64());
              continue;
            case 3:
              if (t2 !== 26) break;
              a.content = i.string();
              continue;
            case 4:
              if (t2 !== 34) break;
              a.mentions.push(D.decode(i, i.uint32()));
              continue;
            case 5:
              if (t2 !== 42) break;
              a.attachments.push(v.decode(i, i.uint32()));
              continue;
            case 6:
              if (t2 !== 50) break;
              a.references.push(U.decode(i, i.uint32()));
              continue;
            case 7:
              if (t2 !== 56) break;
              a.mode = i.int32();
              continue;
            case 8:
              if (t2 !== 64) break;
              a.anonymous_message = i.bool();
              continue;
            case 9:
              if (t2 !== 72) break;
              a.mention_everyone = i.bool();
              continue;
            case 10:
              if (t2 !== 82) break;
              a.avatar = i.string();
              continue;
            case 11:
              if (t2 !== 88) break;
              a.is_public = i.bool();
              continue;
            case 12:
              if (t2 !== 96) break;
              a.code = i.int32();
              continue;
            case 13:
              if (t2 !== 104) break;
              a.topic_id = T(i.int64());
              continue;
            case 14:
              if (t2 !== 112) break;
              a.id = T(i.int64());
              continue;
          }
          if ((t2 & 7) === 4 || t2 === 0) break;
          i.skipType(t2 & 7);
        }
        return a;
      }, fromJSON(e3) {
        return { clan_id: _(e3.clan_id) ? globalThis.String(e3.clan_id) : "0", channel_id: _(e3.channel_id) ? globalThis.String(e3.channel_id) : "0", content: _(e3.content) ? globalThis.String(e3.content) : "", mentions: globalThis.Array.isArray(e3 == null ? void 0 : e3.mentions) ? e3.mentions.map((n) => D.fromJSON(n)) : [], attachments: globalThis.Array.isArray(e3 == null ? void 0 : e3.attachments) ? e3.attachments.map((n) => v.fromJSON(n)) : [], references: globalThis.Array.isArray(e3 == null ? void 0 : e3.references) ? e3.references.map((n) => U.fromJSON(n)) : [], mode: _(e3.mode) ? globalThis.Number(e3.mode) : 0, anonymous_message: _(e3.anonymous_message) ? globalThis.Boolean(e3.anonymous_message) : false, mention_everyone: _(e3.mention_everyone) ? globalThis.Boolean(e3.mention_everyone) : false, avatar: _(e3.avatar) ? globalThis.String(e3.avatar) : "", is_public: _(e3.is_public) ? globalThis.Boolean(e3.is_public) : false, code: _(e3.code) ? globalThis.Number(e3.code) : 0, topic_id: _(e3.topic_id) ? globalThis.String(e3.topic_id) : "0", id: _(e3.id) ? globalThis.String(e3.id) : "0" };
      }, toJSON(e3) {
        var i, r, a;
        let n = {};
        return e3.clan_id !== "0" && (n.clan_id = e3.clan_id), e3.channel_id !== "0" && (n.channel_id = e3.channel_id), e3.content !== "" && (n.content = e3.content), (i = e3.mentions) != null && i.length && (n.mentions = e3.mentions.map((t2) => D.toJSON(t2))), (r = e3.attachments) != null && r.length && (n.attachments = e3.attachments.map((t2) => v.toJSON(t2))), (a = e3.references) != null && a.length && (n.references = e3.references.map((t2) => U.toJSON(t2))), e3.mode !== 0 && (n.mode = Math.round(e3.mode)), e3.anonymous_message !== false && (n.anonymous_message = e3.anonymous_message), e3.mention_everyone !== false && (n.mention_everyone = e3.mention_everyone), e3.avatar !== "" && (n.avatar = e3.avatar), e3.is_public !== false && (n.is_public = e3.is_public), e3.code !== 0 && (n.code = Math.round(e3.code)), e3.topic_id !== "0" && (n.topic_id = e3.topic_id), e3.id !== "0" && (n.id = e3.id), n;
      }, create(e3) {
        return F.fromPartial(e3 != null ? e3 : {});
      }, fromPartial(e3) {
        var i, r, a, t2, o, l, c, d, u, p, y, N, x, A;
        let n = _n();
        return n.clan_id = (i = e3.clan_id) != null ? i : "0", n.channel_id = (r = e3.channel_id) != null ? r : "0", n.content = (a = e3.content) != null ? a : "", n.mentions = ((t2 = e3.mentions) == null ? void 0 : t2.map((C) => D.fromPartial(C))) || [], n.attachments = ((o = e3.attachments) == null ? void 0 : o.map((C) => v.fromPartial(C))) || [], n.references = ((l = e3.references) == null ? void 0 : l.map((C) => U.fromPartial(C))) || [], n.mode = (c = e3.mode) != null ? c : 0, n.anonymous_message = (d = e3.anonymous_message) != null ? d : false, n.mention_everyone = (u = e3.mention_everyone) != null ? u : false, n.avatar = (p = e3.avatar) != null ? p : "", n.is_public = (y = e3.is_public) != null ? y : false, n.code = (N = e3.code) != null ? N : 0, n.topic_id = (x = e3.topic_id) != null ? x : "0", n.id = (A = e3.id) != null ? A : "0", n;
      } };
      G = { encode(e3, n = import_minimal2.default.Writer.create()) {
        return e3.code !== 0 && n.uint32(8).int32(e3.code), e3.message !== "" && n.uint32(18).string(e3.message), Object.entries(e3.context).forEach(([i, r]) => {
          xe.encode({ key: i, value: r }, n.uint32(26).fork()).ldelim();
        }), n;
      }, decode(e3, n) {
        let i = e3 instanceof import_minimal2.default.Reader ? e3 : import_minimal2.default.Reader.create(e3), r = n === void 0 ? i.len : i.pos + n, a = un();
        for (; i.pos < r; ) {
          let t2 = i.uint32();
          switch (t2 >>> 3) {
            case 1:
              if (t2 !== 8) break;
              a.code = i.int32();
              continue;
            case 2:
              if (t2 !== 18) break;
              a.message = i.string();
              continue;
            case 3:
              if (t2 !== 26) break;
              let o = xe.decode(i, i.uint32());
              o.value !== void 0 && (a.context[o.key] = o.value);
              continue;
          }
          if ((t2 & 7) === 4 || t2 === 0) break;
          i.skipType(t2 & 7);
        }
        return a;
      }, fromJSON(e3) {
        return { code: _(e3.code) ? globalThis.Number(e3.code) : 0, message: _(e3.message) ? globalThis.String(e3.message) : "", context: bn(e3.context) ? Object.entries(e3.context).reduce((n, [i, r]) => (n[i] = String(r), n), {}) : {} };
      }, toJSON(e3) {
        let n = {};
        if (e3.code !== 0 && (n.code = Math.round(e3.code)), e3.message !== "" && (n.message = e3.message), e3.context) {
          let i = Object.entries(e3.context);
          i.length > 0 && (n.context = {}, i.forEach(([r, a]) => {
            n.context[r] = a;
          }));
        }
        return n;
      }, create(e3) {
        return G.fromPartial(e3 != null ? e3 : {});
      }, fromPartial(e3) {
        var i, r, a;
        let n = un();
        return n.code = (i = e3.code) != null ? i : 0, n.message = (r = e3.message) != null ? r : "", n.context = Object.entries((a = e3.context) != null ? a : {}).reduce((t2, [o, l]) => (l !== void 0 && (t2[o] = globalThis.String(l)), t2), {}), n;
      } };
      xe = { encode(e3, n = import_minimal2.default.Writer.create()) {
        return e3.key !== "" && n.uint32(10).string(e3.key), e3.value !== "" && n.uint32(18).string(e3.value), n;
      }, decode(e3, n) {
        let i = e3 instanceof import_minimal2.default.Reader ? e3 : import_minimal2.default.Reader.create(e3), r = n === void 0 ? i.len : i.pos + n, a = fn();
        for (; i.pos < r; ) {
          let t2 = i.uint32();
          switch (t2 >>> 3) {
            case 1:
              if (t2 !== 10) break;
              a.key = i.string();
              continue;
            case 2:
              if (t2 !== 18) break;
              a.value = i.string();
              continue;
          }
          if ((t2 & 7) === 4 || t2 === 0) break;
          i.skipType(t2 & 7);
        }
        return a;
      }, fromJSON(e3) {
        return { key: _(e3.key) ? globalThis.String(e3.key) : "", value: _(e3.value) ? globalThis.String(e3.value) : "" };
      }, toJSON(e3) {
        let n = {};
        return e3.key !== "" && (n.key = e3.key), e3.value !== "" && (n.value = e3.value), n;
      }, create(e3) {
        return xe.fromPartial(e3 != null ? e3 : {});
      }, fromPartial(e3) {
        var i, r;
        let n = fn();
        return n.key = (i = e3.key) != null ? i : "", n.value = (r = e3.value) != null ? r : "", n;
      } };
      K = { encode(e3, n = import_minimal2.default.Writer.create()) {
        return n;
      }, decode(e3, n) {
        let i = e3 instanceof import_minimal2.default.Reader ? e3 : import_minimal2.default.Reader.create(e3), r = n === void 0 ? i.len : i.pos + n, a = hn();
        for (; i.pos < r; ) {
          let t2 = i.uint32();
          switch (t2 >>> 3) {
          }
          if ((t2 & 7) === 4 || t2 === 0) break;
          i.skipType(t2 & 7);
        }
        return a;
      }, fromJSON(e3) {
        return {};
      }, toJSON(e3) {
        return {};
      }, create(e3) {
        return K.fromPartial(e3 != null ? e3 : {});
      }, fromPartial(e3) {
        return hn();
      } };
      Y = { encode(e3, n = import_minimal2.default.Writer.create()) {
        return n;
      }, decode(e3, n) {
        let i = e3 instanceof import_minimal2.default.Reader ? e3 : import_minimal2.default.Reader.create(e3), r = n === void 0 ? i.len : i.pos + n, a = pn();
        for (; i.pos < r; ) {
          let t2 = i.uint32();
          switch (t2 >>> 3) {
          }
          if ((t2 & 7) === 4 || t2 === 0) break;
          i.skipType(t2 & 7);
        }
        return a;
      }, fromJSON(e3) {
        return {};
      }, toJSON(e3) {
        return {};
      }, create(e3) {
        return Y.fromPartial(e3 != null ? e3 : {});
      }, fromPartial(e3) {
        return pn();
      } };
      b = { encode(e3, n = import_minimal2.default.Writer.create()) {
        return e3.user_id !== "0" && n.uint32(8).int64(e3.user_id), e3.session_id !== "" && n.uint32(18).string(e3.session_id), e3.username !== "" && n.uint32(26).string(e3.username), e3.status !== void 0 && ge.encode({ value: e3.status }, n.uint32(34).fork()).ldelim(), e3.is_mobile !== false && n.uint32(40).bool(e3.is_mobile), e3.user_status !== "" && n.uint32(50).string(e3.user_status), n;
      }, decode(e3, n) {
        let i = e3 instanceof import_minimal2.default.Reader ? e3 : import_minimal2.default.Reader.create(e3), r = n === void 0 ? i.len : i.pos + n, a = mn();
        for (; i.pos < r; ) {
          let t2 = i.uint32();
          switch (t2 >>> 3) {
            case 1:
              if (t2 !== 8) break;
              a.user_id = T(i.int64());
              continue;
            case 2:
              if (t2 !== 18) break;
              a.session_id = i.string();
              continue;
            case 3:
              if (t2 !== 26) break;
              a.username = i.string();
              continue;
            case 4:
              if (t2 !== 34) break;
              a.status = ge.decode(i, i.uint32()).value;
              continue;
            case 5:
              if (t2 !== 40) break;
              a.is_mobile = i.bool();
              continue;
            case 6:
              if (t2 !== 50) break;
              a.user_status = i.string();
              continue;
          }
          if ((t2 & 7) === 4 || t2 === 0) break;
          i.skipType(t2 & 7);
        }
        return a;
      }, fromJSON(e3) {
        return { user_id: _(e3.user_id) ? globalThis.String(e3.user_id) : "0", session_id: _(e3.session_id) ? globalThis.String(e3.session_id) : "", username: _(e3.username) ? globalThis.String(e3.username) : "", status: _(e3.status) ? String(e3.status) : void 0, is_mobile: _(e3.is_mobile) ? globalThis.Boolean(e3.is_mobile) : false, user_status: _(e3.user_status) ? globalThis.String(e3.user_status) : "" };
      }, toJSON(e3) {
        let n = {};
        return e3.user_id !== "0" && (n.user_id = e3.user_id), e3.session_id !== "" && (n.session_id = e3.session_id), e3.username !== "" && (n.username = e3.username), e3.status !== void 0 && (n.status = e3.status), e3.is_mobile !== false && (n.is_mobile = e3.is_mobile), e3.user_status !== "" && (n.user_status = e3.user_status), n;
      }, create(e3) {
        return b.fromPartial(e3 != null ? e3 : {});
      }, fromPartial(e3) {
        var i, r, a, t2, o, l;
        let n = mn();
        return n.user_id = (i = e3.user_id) != null ? i : "0", n.session_id = (r = e3.session_id) != null ? r : "", n.username = (a = e3.username) != null ? a : "", n.status = (t2 = e3.status) != null ? t2 : void 0, n.is_mobile = (o = e3.is_mobile) != null ? o : false, n.user_status = (l = e3.user_status) != null ? l : "", n;
      } };
      import_minimal2.default.util.Long !== long_default && (import_minimal2.default.util.Long = long_default, import_minimal2.default.configure());
      R = class {
        constructor() {
        }
        get onClose() {
          return this._socket.onclose;
        }
        set onClose(n) {
          this._socket.onclose = n;
        }
        get onError() {
          return this._socket.onerror;
        }
        set onError(n) {
          this._socket.onerror = n;
        }
        get onMessage() {
          return this._socket.onmessage;
        }
        set onMessage(n) {
          n ? this._socket.onmessage = (i) => {
            let r = i.data, a = new Uint8Array(r), t2 = le.decode(a);
            t2.channel_message && t2.channel_message.code == null && (t2.channel_message.code = 0), n(t2);
          } : n = null;
        }
        get onOpen() {
          return this._socket.onopen;
        }
        set onOpen(n) {
          this._socket.onopen = n;
        }
        isOpen() {
          var n;
          return ((n = this._socket) == null ? void 0 : n.readyState) == WebSocket.OPEN;
        }
        close() {
          var n;
          (n = this._socket) == null || n.close(), this._socket = void 0;
        }
        connect(n, i, r, a, t2, o, l) {
          l && l.addEventListener("abort", () => {
            this.close();
          });
          let c = `${n}${i}:${r}/ws?lang=en&status=${encodeURIComponent(a.toString())}&token=${encodeURIComponent(t2)}&format=protobuf&platform=${encodeURIComponent(o)}`;
          this._socket = new WebSocket(c), this._socket.binaryType = "arraybuffer";
        }
        send(n) {
          let r = le.encode(le.fromPartial(n)).finish();
          this._socket.send(r);
        }
      };
      gn = false;
      k = { DISCONNECTED: "disconnected", CONNECTING: "connecting", CONNECTED: "connected" };
      M = class M2 {
        constructor(n, i, r = false, a = false, t2 = new R(), o = M2.DefaultSendTimeoutMs) {
          this.host = n;
          this.port = i;
          this.useSSL = r;
          this.verbose = a;
          this.adapter = t2;
          this.sendTimeoutMs = o;
          this.cIds = {}, this.nextCid = 1, this._heartbeatTimeoutMs = M2.DefaultHeartbeatTimeoutMs, this._connectionState = k.DISCONNECTED;
        }
        generatecid() {
          let n = this.nextCid.toString();
          return ++this.nextCid, n;
        }
        isOpen() {
          return this._connectionState === k.CONNECTED;
        }
        connect(n, i = false, r = "", a = M2.DefaultConnectTimeoutMs, t2) {
          if (this._connectionState === k.CONNECTED) return Promise.resolve(n);
          if (this._connectionState === k.CONNECTING && this._connectPromise) return this._connectPromise;
          this.clearConnectTimeout(), this._connectionState = k.CONNECTING;
          let o = this.useSSL ? "wss://" : "ws://";
          this.adapter.connect(o, this.host, this.port, i, n.token, r, t2), this.adapter.onClose = (c) => {
            this._connectionState = k.DISCONNECTED, this.stopHeartbeatLoop(), this.clearConnectTimeout(), this.ondisconnect(c);
          }, this.adapter.onMessage = (c) => g(this, null, function* () {
            if (this.verbose && window && window.console && console.log("Response: %o", JSON.stringify(c)), c.cid) {
              let d = this.cIds[c.cid];
              if (!d) {
                this.verbose && window && window.console && console.error("No promise executor for message: %o", c);
                return;
              }
              delete this.cIds[c.cid], c.error ? d.reject(c.error) : d.resolve(c);
            } else if (c.channel_message) {
              let d = Pn(c);
              this.onchannelmessage(d);
            } else this.verbose && window && window.console && console.log("Unrecognized message received: %o", c);
          });
          let l = new Promise((c, d) => {
            this.adapter.onOpen = (u) => {
              this.verbose && window && window.console && console.log(u);
              let p = gn;
              gn = true, this.clearConnectTimeout(), this._connectionState = k.CONNECTED, this.startHeartbeatLoop(), this._connectPromise = void 0, c(n), p && this.onreconnect(u);
            }, this.adapter.onError = (u) => {
              this._connectionState = k.DISCONNECTED, this.stopHeartbeatLoop(), this.clearConnectTimeout(), this.onerror(u), this._connectPromise = void 0, this.adapter.close(), d(u);
            }, this._connectTimeoutTimer = setTimeout(() => {
              this._connectionState = k.DISCONNECTED, this.stopHeartbeatLoop(), this.adapter.close(), this._connectPromise = void 0, d("The socket timed out when trying to connect."), this._connectTimeoutTimer = void 0;
            }, a);
          });
          return this._connectPromise = l, this._connectPromise;
        }
        disconnect(n = true) {
          this._connectionState = k.DISCONNECTED, this.stopHeartbeatLoop(), this.adapter.isOpen() && this.adapter.close(), n && this.ondisconnect({});
        }
        setHeartbeatTimeoutMs(n) {
          this._heartbeatTimeoutMs = n;
        }
        getHeartbeatTimeoutMs() {
          return this._heartbeatTimeoutMs;
        }
        onreconnect(n) {
          this.verbose && window && window.console && console.log(n);
        }
        ondisconnect(n) {
          this.verbose && window && window.console && console.log(n);
        }
        onerror(n) {
          this._connectionState = k.DISCONNECTED, this.stopHeartbeatLoop(), this.verbose && window && window.console && console.log(n);
        }
        onheartbeattimeout() {
          this.verbose && window && window.console && console.log("Heartbeat timeout.");
        }
        onchannelmessage(n) {
          this.verbose && window && window.console && console.log(n);
        }
        send(n, i = M2.DefaultSendTimeoutMs) {
          let r = n;
          return new Promise((a, t2) => {
            var o, l;
            if (!this.adapter.isOpen()) t2("Socket connection has not been established yet.");
            else {
              r.channel_message_send ? r.channel_message_send.content = JSON.stringify(r.channel_message_send.content) : r.channel_message_update ? r.channel_message_update.content = JSON.stringify(r.channel_message_update.content) : r.ephemeral_message_send ? r.ephemeral_message_send.message.content = JSON.stringify((o = r.ephemeral_message_send.message) == null ? void 0 : o.content) : r.quick_menu_event && (r.quick_menu_event.message.content = JSON.stringify((l = r.quick_menu_event.message) == null ? void 0 : l.content));
              let c = this.generatecid();
              this.cIds[c] = { resolve: a, reject: t2 }, i !== 1 / 0 && i > 0 && setTimeout(() => {
                t2("The socket timed out while waiting for a response.");
              }, i), r.cid = c, this.adapter.send(r);
            }
          });
        }
        joinChat(n, i, r, a) {
          return g(this, null, function* () {
            return (yield this.send({ channel_join: { clan_id: n, channel_id: i, channel_type: r, is_public: a } })).channel;
          });
        }
        leaveChat(n, i, r, a) {
          return g(this, null, function* () {
            return this.send({ channel_leave: { clan_id: n, channel_id: i, channel_type: r, is_public: a } });
          });
        }
        writeChatMessage(n, i, r, a, t2, o, l, c, d, u, p) {
          return g(this, null, function* () {
            return (yield this.send({ channel_message_send: { clan_id: n, channel_id: i, mode: r, is_public: a, content: t2, reactions: [], mentions: [], attachments: o, references: [], anonymous_message: l, mention_everyone: c, avatar: d, code: u, topic_id: p } }, 1 / 0)).channel_message_ack;
          });
        }
        pingPong() {
          return g(this, null, function* () {
            if (!this.isOpen()) {
              this._connectionState = k.DISCONNECTED, this.stopHeartbeatLoop();
              return;
            }
            try {
              yield this.send({ ping: {} }, this._heartbeatTimeoutMs);
            } catch (n) {
              this._connectionState = k.DISCONNECTED, this.stopHeartbeatLoop(), this.adapter.isOpen() && (window && window.console && console.error("Server unreachable from heartbeat."), this.onheartbeattimeout(), this.adapter.close());
              return;
            }
            this.startHeartbeatLoop();
          });
        }
        startHeartbeatLoop() {
          this.stopHeartbeatLoop(), this._heartbeatTimer = setTimeout(() => this.pingPong(), this._heartbeatTimeoutMs);
        }
        stopHeartbeatLoop() {
          this._heartbeatTimer !== void 0 && (clearTimeout(this._heartbeatTimer), this._heartbeatTimer = void 0);
        }
        clearConnectTimeout() {
          this._connectTimeoutTimer !== void 0 && (clearTimeout(this._connectTimeoutTimer), this._connectTimeoutTimer = void 0);
        }
      };
      M.DefaultHeartbeatTimeoutMs = 1e4, M.DefaultSendTimeoutMs = 1e4, M.DefaultConnectTimeoutMs = 3e4;
      ce = M;
      de = class extends Error {
        constructor(i, r) {
          super(i != null ? i : "Authentication failed.");
          this.statusCode = r;
          this.name = "AuthenticationError";
        }
      };
      ye = class extends Error {
        constructor(n) {
          super(n != null ? n : "Session error."), this.name = "SessionError";
        }
      };
      Ie = class e2 {
        constructor(n, i, r) {
          this.refreshTokenPromise = null;
          this._session = n, this._client = i, this._userId = r;
        }
        get userId() {
          return this._userId;
        }
        get session() {
          return this._session;
        }
        get client() {
          return this._client;
        }
        static initClient(n) {
          let { token: i, refresh_token: r, api_url: a, user_id: t2, serverkey: o } = n;
          if (!i || !r || !a || !t2) throw new ye("Missing required fields: token, refresh_token, api_url, and user_id are all required");
          let l = ae.restore(i, r, a, true), c = new oe(o || H, 7e3, Ae(a));
          return new e2(l, c, t2);
        }
        static authenticate(n) {
          return g(this, null, function* () {
            let { id_token: i, user_id: r, username: a, serverkey: t2 = H, gateway_url: o = ke } = n, l = new oe(t2 || H, 7e3, Ae(o)), c = { id_token: i, user_id: r, username: a }, d = yield l.authenticateIdToken(t2, "", c);
            if (!d) throw new de("Authentication failed: No response from server.");
            if (!d.token || !d.refresh_token || !d.api_url || !d.user_id) throw new de("Invalid authentication response: missing required fields");
            let u = ae.restore(d.token, d.refresh_token, d.api_url, true);
            return l.setBasePath(Ae(d.api_url)), new e2(u, l, d.user_id);
          });
        }
        createDM(n) {
          return g(this, null, function* () {
            let i = { type: 3, channel_private: 1, user_ids: [n] };
            return this._client.createChannelDesc(this._session.token, i);
          });
        }
        createGroupDM(n) {
          return g(this, null, function* () {
            if (n.length === 0) throw new Error("At least one user ID is required for a group DM");
            let i = { type: 2, channel_private: 1, user_ids: n };
            return this._client.createChannelDesc(this._session.token, i);
          });
        }
        refreshSession() {
          return g(this, null, function* () {
            return this._session ? (this._session.created && this._session.expires_at - this._session.created_at < 70 && console.warn("Session lifetime too short, please set '--session.token_expiry_sec' option. See the documentation for more info: https://mezon.vn/docs/mezon/getting-started/configuration/#session"), this._session.created && this._session.refresh_expires_at - this._session.created_at < 3700 && console.warn("Session refresh lifetime too short, please set '--session.refresh_token_expiry_sec' option. See the documentation for more info: https://mezon.vn/docs/mezon/getting-started/configuration/#session"), this.refreshTokenPromise ? this.refreshTokenPromise : (this.refreshTokenPromise = new Promise((n, i) => g(this, null, function* () {
              try {
                let r = yield this.client.sessionRefresh(this._client.serverKey || H, "", { token: this._session.refresh_token, vars: this._session.vars, is_remember: this._session.is_remember });
                this._session.update(r.token, r.refresh_token, r.is_remember || false), this.onRefreshSession(r), n(this._session);
              } catch (r) {
                console.error("Session refresh failed:", r), i(r);
              } finally {
                this.refreshTokenPromise = null;
              }
            })), this.refreshTokenPromise)) : (console.error("Cannot refresh a null session."), this._session);
          });
        }
        createSocket(n = false, i = new R(), r = ce.DefaultSendTimeoutMs) {
          let a = new URL(this._client.basePath), { host: t2, port: o, useSSL: l } = { host: a.hostname, port: a.port || (a.protocol === "https:" ? "443" : "80"), useSSL: a.protocol === "https:" };
          return new ce(t2, o, l, n, i, r);
        }
        onRefreshSession(n) {
          console.log(`Token refresh occurred. Token: ${n.token}`);
        }
        isSessionExpired() {
          return this._session.isexpired(Date.now() / 1e3);
        }
        isRefreshSessionExpired() {
          return this._session.isrefreshexpired(Date.now() / 1e3);
        }
        getToken() {
          return this._session.token;
        }
        getRefreshToken() {
          return this._session.refresh_token;
        }
        getSession() {
          return this.session;
        }
        exportSession() {
          return { token: this._session.token, refresh_token: this._session.refresh_token, api_url: this._session.api_url || "", user_id: this._userId };
        }
      };
      L = class extends Error {
        constructor(n) {
          super(n), this.name = "SocketError";
        }
      };
      Re = class {
        constructor(n, i) {
          this._client = n;
          this._session = i;
          this._socket = null;
          this._isConnected = false;
          this._messageHandlers = [];
        }
        get isConnected() {
          return this._isConnected;
        }
        get socket() {
          if (!this._socket) throw new L("Socket is not connected. Call connect() first.");
          return this._socket;
        }
        connect() {
          return g(this, arguments, function* (n = {}) {
            if (this._isConnected) throw new L("Socket is already connected. Call disconnect() first.");
            let { onError: i, onDisconnect: r, verbose: a = false } = n;
            this._errorHandler = i, this._disconnectHandler = r, this._socket = this._client.createSocket(a, new R()), this._socket.onerror = (t2) => {
              var o;
              (o = this._errorHandler) == null || o.call(this, t2);
            }, this._socket.ondisconnect = () => {
              var t2;
              this._isConnected = false, (t2 = this._disconnectHandler) == null || t2.call(this);
            }, this._socket.onchannelmessage = (t2) => {
              var o;
              if (!t2) {
                (o = this._errorHandler) == null || o.call(this, new L("Received null or undefined channel message"));
                return;
              }
              this._messageHandlers.forEach((l) => {
                try {
                  l(t2);
                } catch (c) {
                  console.error("Error in message handler:", c);
                }
              });
            }, yield this._socket.connect(this._session, true, "0"), this._isConnected = true;
          });
        }
        disconnect() {
          this._socket && (this._socket.disconnect(true), this._socket = null, this._isConnected = false);
        }
        setChannelMessageHandler(n) {
          this.onChannelMessage(n);
        }
        onChannelMessage(n) {
          return this._messageHandlers.push(n), () => {
            let i = this._messageHandlers.indexOf(n);
            i !== -1 && this._messageHandlers.splice(i, 1);
          };
        }
        joinDMChannel(n) {
          return g(this, null, function* () {
            yield yn(this.socket), yield this.socket.joinChat(I, n, 3, false);
          });
        }
        joinGroupChannel(n) {
          return g(this, null, function* () {
            yield yn(this.socket), yield this.socket.joinChat(I, n, 2, false);
          });
        }
        leaveDMChannel(n) {
          return g(this, null, function* () {
            yield this.socket.leaveChat(I, n, 3, false);
          });
        }
        leaveGroupChannel(n) {
          return g(this, null, function* () {
            yield this.socket.leaveChat(I, n, 2, false);
          });
        }
        sendDM(n) {
          return g(this, null, function* () {
            let { channelId: i, content: r, attachments: a, hideLink: t2 = false } = n;
            yield this.socket.writeChatMessage(I, i, 4, false, r, a, false, t2, "", 0);
          });
        }
        sendGroup(n) {
          return g(this, null, function* () {
            let { channelId: i, content: r, attachments: a, hideLink: t2 = false } = n;
            yield this.socket.writeChatMessage(I, i, 3, false, r, a, false, t2, "", 0);
          });
        }
        setErrorHandler(n) {
          this._errorHandler = n, this._socket && (this._socket.onerror = n);
        }
      };
    }
  });

  // src/services/StorageService.ts
  var StorageService_exports = {};
  __export(StorageService_exports, {
    StorageService: () => StorageService
  });
  var SESSION_KEY, StorageService;
  var init_StorageService = __esm({
    "src/services/StorageService.ts"() {
      "use strict";
      SESSION_KEY = "mezon_light_chat_session";
      StorageService = class {
        constructor() {
          this.storage = localStorage;
        }
        save(session) {
          try {
            this.storage.setItem(SESSION_KEY, JSON.stringify(session));
            console.log("\u2705 Session saved to localStorage", session);
          } catch (error) {
            console.error("[StorageService] Failed to save session:", error);
          }
        }
        restore() {
          try {
            const data = this.storage.getItem(SESSION_KEY);
            if (!data) return null;
            const session = JSON.parse(data);
            console.log("\u2705 Session restored from localStorage", session);
            return session;
          } catch (error) {
            console.error("[StorageService] Failed to restore session:", error);
            this.clear();
            return null;
          }
        }
        clear() {
          try {
            this.storage.removeItem(SESSION_KEY);
            console.log("Session cleared from localStorage");
          } catch (error) {
            console.error("[StorageService] Failed to clear session:", error);
          }
        }
        hasSession() {
          return this.restore() !== null;
        }
      };
    }
  });

  // src/index.ts
  var index_exports = {};
  __export(index_exports, {
    MezonChatElement: () => MezonChatElement,
    MezonLightChat: () => MezonLightChat,
    default: () => index_default
  });

  // src/i18n.ts
  function getLang() {
    return window.location.pathname.startsWith("/de") ? "de" : "en";
  }
  var TEXT_MAP = {
    en: {
      openChat: "Open chat",
      closeChat: "Close chat",
      chatSupport: "Customer Support",
      typeMessage: "Type a message...",
      send: "Send",
      defaultWelcomeMessage: "Welcome {0}! How can I help you today?",
      connectedStartChatting: "Connected! You can start chatting now.",
      failedConnect: "Failed to connect. Please try again.",
      configurePeerId: "Please configure a peer ID to start chatting. Call chat.startDM(peerId) first.",
      failedSendMessage: "Failed to send message. Please try again.",
      welcome: "Welcome!",
      signInToStart: "Sign in to start chatting",
      loginWithMezon: "Login with Mezon"
    },
    de: {
      openChat: "Chat \xF6ffnen",
      closeChat: "Chat schlie\xDFen",
      chatSupport: "Kundenservice",
      typeMessage: "Nachricht eingeben...",
      send: "Senden",
      defaultWelcomeMessage: "Willkommen {0}! Wie kann ich Ihnen heute helfen?",
      connectedStartChatting: "Verbunden! Sie k\xF6nnen jetzt chatten.",
      failedConnect: "Verbindung fehlgeschlagen. Bitte versuchen Sie es erneut.",
      configurePeerId: "Bitte konfigurieren Sie eine Peer-ID zum Chatten. Rufen Sie zuerst chat.startDM(peerId) auf.",
      failedSendMessage: "Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut.",
      welcome: "Willkommen!",
      signInToStart: "Melden Sie sich an, um zu chatten",
      loginWithMezon: "Mit Mezon anmelden"
    }
  };
  function t(key) {
    const lang = getLang();
    return TEXT_MAP[lang][key] ?? TEXT_MAP.en[key] ?? key;
  }

  // src/icons/chat-icon.svg
  var chat_icon_default = '<?xml version="1.0" encoding="UTF-8"?>\n<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="225" height="225">\n<path d="M0,0 L17,0 L32,3 L47,9 L58,16 L66,23 L73,33 L77,43 L78,47 L78,63 L74,74 L69,82 L60,92 L49,99 L35,105 L22,108 L7,109 L-8,107 L-13,106 L-20,106 L-47,118 L-51,119 L-50,112 L-48,104 L-48,90 L-51,82 L-57,73 L-60,65 L-61,50 L-59,40 L-53,28 L-42,16 L-31,9 L-19,4 L-7,1 Z " fill="#FCFEFC" transform="translate(61,89)"/>\n<path d="M0,0 L9,0 L27,2 L43,6 L59,13 L73,21 L85,32 L93,41 L101,55 L105,67 L106,84 L104,97 L99,109 L94,118 L88,128 L86,135 L85,146 L87,160 L92,175 L91,178 L61,165 L42,157 L32,158 L17,161 L14,161 L16,156 L22,147 L38,143 L48,143 L73,156 L72,145 L71,139 L71,126 L76,116 L84,103 L88,93 L90,84 L90,71 L87,60 L82,50 L74,40 L66,33 L51,24 L35,18 L18,14 L9,13 L-8,13 L-25,17 L-40,23 L-54,31 L-67,42 L-75,52 L-80,62 L-83,74 L-89,79 L-99,85 L-101,85 L-101,72 L-97,57 L-90,44 L-80,32 L-72,25 L-59,16 L-47,10 L-29,4 L-12,1 Z " fill="#FCFEFC" transform="translate(119,16)"/>\n</svg>\n';

  // src/icons/close-icon.svg
  var close_icon_default = '<?xml version="1.0" encoding="UTF-8"?>\n<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="512" height="512">\n<path d="M0,0 L9,0 L17,4 L165,152 L172,146 L315,3 L322,0 L332,0 L342,5 L347,13 L348,16 L348,26 L344,34 L196,182 L202,189 L345,332 L348,339 L348,349 L343,359 L335,364 L332,365 L322,365 L314,361 L166,213 L159,219 L16,362 L9,365 L-1,365 L-9,361 L-15,354 L-17,349 L-17,339 L-13,331 L135,183 L129,176 L-14,33 L-17,26 L-17,17 L-14,9 L-6,2 Z " fill="#FFFFFF" transform="translate(91,74)"/>\n</svg>\n';

  // src/components/ChatLauncher.ts
  var ChatLauncher = class {
    constructor(onClick, iconChat) {
      this.isOpen = false;
      this.iconChat = chat_icon_default;
      if (iconChat) this.iconChat = iconChat;
      this.button = this.createButton();
      this.button.addEventListener("click", () => {
        this.toggle();
        onClick();
      });
    }
    createButton() {
      const button = document.createElement("button");
      button.className = "mlc-launcher";
      button.setAttribute("aria-label", t("openChat"));
      this.button = button;
      this.setIcon(this.iconChat);
      return button;
    }
    setIcon(icon) {
      this.button.innerHTML = "";
      if (/<svg[\s>]/i.test(icon)) {
        const wrapper = document.createElement("span");
        wrapper.innerHTML = icon;
        const svg = wrapper.firstElementChild;
        svg.classList.add(
          "mlc-launcher-icon",
          this.isOpen ? "is-close" : "is-chat"
        );
        if (!svg.getAttribute("viewBox") && svg.getAttribute("width") && svg.getAttribute("height")) {
          const w2 = svg.getAttribute("width");
          const h2 = svg.getAttribute("height");
          svg.setAttribute("viewBox", `0 0 ${w2} ${h2}`);
        }
        svg.removeAttribute("width");
        svg.removeAttribute("height");
        this.button.appendChild(svg);
        return;
      }
      const img = document.createElement("img");
      img.src = icon;
      img.alt = "";
      img.className = `mlc-launcher-icon ${this.isOpen ? "is-close" : "is-chat"}`;
      this.button.appendChild(img);
    }
    toggle() {
      this.isOpen = !this.isOpen;
      this.setIcon(
        this.isOpen ? close_icon_default : this.iconChat
      );
      this.button.classList.toggle("is-open", this.isOpen);
    }
    getButton() {
      return this.button;
    }
    destroy() {
      this.button.remove();
    }
  };

  // src/icons/logo.svg
  var logo_default = '<?xml version="1.0" encoding="UTF-8"?>\n<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="240" height="241">\n<path d="M0,0 L15,0 L31,5 L42,12 L51,22 L59,37 L63,51 L66,70 L71,86 L77,97 L86,107 L94,113 L105,118 L121,122 L140,126 L156,132 L166,138 L175,145 L182,155 L186,164 L187,170 L187,193 L183,206 L177,217 L168,227 L157,234 L148,238 L144,239 L114,239 L99,234 L88,226 L81,218 L74,204 L71,191 L69,165 L65,151 L56,138 L47,130 L31,122 L14,118 L-2,115 L-18,109 L-27,104 L-37,96 L-44,88 L-51,74 L-53,66 L-53,49 L-49,36 L-43,25 L-34,15 L-25,8 L-14,3 Z " fill="#F0616E" transform="translate(53,2)"/>\n<path d="M0,0 L14,1 L26,5 L36,11 L46,21 L53,35 L55,42 L55,62 L51,74 L45,84 L40,90 L27,99 L15,103 L9,104 L-2,104 L-15,101 L-26,95 L-36,86 L-42,77 L-46,68 L-48,59 L-48,45 L-45,33 L-39,22 L-30,12 L-19,5 L-7,1 Z " fill="#F0616E" transform="translate(185,1)"/>\n<path d="M0,0 L16,0 L27,3 L37,8 L47,17 L54,26 L59,39 L60,45 L60,58 L57,70 L52,80 L44,90 L34,97 L22,102 L-5,102 L-16,98 L-27,90 L-35,81 L-41,69 L-43,62 L-43,42 L-39,29 L-32,18 L-25,11 L-11,3 Z " fill="#F0616E" transform="translate(43,139)"/>\n</svg>\n';

  // src/services/ChatService.ts
  init_index_esm();
  var ChatService = class {
    constructor(client) {
      this.socket = null;
      this.currentChannelId = null;
      this.messageHandlers = /* @__PURE__ */ new Set();
      this.errorHandlers = /* @__PURE__ */ new Set();
      this.client = client;
    }
    async connect() {
      if (this.socket) {
        console.warn("[ChatService] Already connected");
        return;
      }
      try {
        this.socket = new Re(this.client, this.client.getSession());
        await this.socket.connect({
          onError: (err) => {
            console.error("[ChatService] Socket error:", err);
            this.notifyError(err instanceof Error ? err : new Error(String(err)));
          },
          onDisconnect: () => {
            console.log("[ChatService] Socket disconnected");
          }
        });
        this.socket.setChannelMessageHandler((msg) => {
          this.handleIncomingMessage(msg);
        });
        console.log("[ChatService] Connected successfully");
      } catch (error) {
        console.error("[ChatService] Connection failed:", error);
        this.notifyError(error instanceof Error ? error : new Error(String(error)));
        throw error;
      }
    }
    disconnect() {
      if (this.socket) {
        this.socket.disconnect();
        this.socket = null;
      }
      this.currentChannelId = null;
      console.log("[ChatService] Disconnected");
    }
    isConnected() {
      return this.socket !== null && this.socket.isConnected;
    }
    async startDM(peerId) {
      const cleanPeerId = peerId.trim();
      if (!cleanPeerId) {
        throw new Error("Peer ID cannot be empty");
      }
      try {
        console.log(`[ChatService] Creating DM with peer: "${cleanPeerId}"`);
        const channel = await this.client.createDM(cleanPeerId);
        const channelId = channel.channel_id ? String(channel.channel_id) : "";
        if (!channelId) {
          throw new Error("Failed to create DM: No channel ID returned");
        }
        if (this.socket) {
          await this.socket.joinDMChannel(channelId);
          this.currentChannelId = channelId;
          console.log("[ChatService] Joined DM channel:", channelId);
        }
        return channelId;
      } catch (error) {
        console.error("[ChatService] Failed to start DM:", error);
        this.notifyError(error instanceof Error ? error : new Error(String(error)));
        throw error;
      }
    }
    async sendMessage(content, attachments) {
      if (!this.socket) {
        throw new Error("Socket not connected");
      }
      if (!this.currentChannelId) {
        throw new Error("No active channel");
      }
      try {
        const origin = typeof window !== "undefined" ? window.location.origin : "";
        const messageContent = origin ? `Message send from: [${origin}]
${content}` : content;
        await this.socket.sendDM({
          channelId: this.currentChannelId,
          content: messageContent,
          attachments
        });
        console.log("[ChatService] Message sent");
      } catch (error) {
        console.error("[ChatService] Failed to send message:", error);
        this.notifyError(error instanceof Error ? error : new Error(String(error)));
        throw error;
      }
    }
    getCurrentChannelId() {
      return this.currentChannelId;
    }
    onMessage(callback) {
      this.messageHandlers.add(callback);
      return () => {
        this.messageHandlers.delete(callback);
      };
    }
    onError(callback) {
      this.errorHandlers.add(callback);
      return () => {
        this.errorHandlers.delete(callback);
      };
    }
    // Private helpers
    handleIncomingMessage(raw) {
      if (raw.sender_id === this.client.userId) {
        return;
      }
      const message = {
        id: raw.message_id || String(Date.now()),
        content: this.extractContent(raw.content),
        sender: "peer",
        timestamp: (raw.create_time_seconds || 0) * 1e3,
        sender_id: raw.sender_id
      };
      this.messageHandlers.forEach((handler) => {
        try {
          handler(message);
        } catch (err) {
          console.error("[ChatService] Handler error:", err);
        }
      });
    }
    extractContent(content) {
      if (!content) return "";
      if (typeof content === "string") return content;
      if (typeof content === "object" && "t" in content) {
        return String(content.t);
      }
      return JSON.stringify(content);
    }
    notifyError(error) {
      this.errorHandlers.forEach((handler) => {
        try {
          handler(error);
        } catch (err) {
          console.error("[ChatService] Error handler failed:", err);
        }
      });
    }
  };

  // src/services/LogService.ts
  var LogService = class {
    // Default to true for dev, build process should set this false or replace calls
    static setDebugMode(debug) {
      this.isDebug = debug;
    }
    static log(message, ...args) {
      if (this.consoleAvailable()) {
        console.log(message, ...args);
      }
    }
    static warn(message, ...args) {
      if (this.consoleAvailable()) {
        console.warn(message, ...args);
      }
    }
    static error(message, ...args) {
      if (this.consoleAvailable()) {
        console.error(message, ...args);
      }
    }
    static info(message, ...args) {
      if (this.consoleAvailable()) {
        console.info(message, ...args);
      }
    }
    static consoleAvailable() {
      return this.isDebug && typeof console !== "undefined";
    }
  };
  LogService.isDebug = true;

  // src/components/LoginView.ts
  var LoginView = class {
    constructor(onLoginClick) {
      this.onLoginClick = onLoginClick;
      this.container = this.createContainer();
    }
    createContainer() {
      const container = document.createElement("div");
      container.className = "mlc-login-view";
      container.innerHTML = `
      <h3 class="mlc-login-title">${t("welcome")}</h3>
      <p style="color: var(--mlc-text-light); margin-bottom: 24px;">
        ${t("signInToStart")}
      </p>
      <button class="mlc-login-btn">
        ${t("loginWithMezon")}
      </button>
    `;
      const loginBtn = container.querySelector(".mlc-login-btn");
      loginBtn?.addEventListener("click", this.onLoginClick);
      return container;
    }
    getContainer() {
      return this.container;
    }
    destroy() {
      this.container.remove();
    }
  };

  // src/components/ChatWidget.ts
  var ChatWidget = class {
    constructor(config, onLoginRequest, savedSession, onClose, iconHeader) {
      this.mezonClient = null;
      this.messages = [];
      this.loginView = null;
      this.isAuthenticated = false;
      this.onLoginRequest = null;
      this.onClose = null;
      this.iconHeader = logo_default;
      this.config = config;
      if (iconHeader) {
        this.iconHeader = iconHeader;
      }
      this.onLoginRequest = onLoginRequest;
      this.onClose = onClose ?? null;
      this.container = this.createContainer();
      this.messagesContainer = this.container.querySelector(".mlc-messages");
      this.inputElement = this.container.querySelector(".mlc-input");
      this.inputArea = this.container.querySelector(".mlc-input-area");
      this.setupEventListeners();
      if (savedSession) {
        this.restoreSession(savedSession);
      } else {
        this.showLoginView();
      }
    }
    async restoreSession(session) {
      try {
        const { LightClient: LightClient2 } = await Promise.resolve().then(() => (init_index_esm(), index_esm_exports));
        const defaultServerKey2 = "HTTP3m3zonPr0dkey:";
        console.log("\u{1F504} Restoring session with initClient...");
        const client = LightClient2.initClient({
          token: session.token,
          refresh_token: session.refresh_token,
          api_url: session.api_url,
          user_id: session.user_id,
          serverkey: defaultServerKey2
        });
        const isExpired = await client.isSessionExpired();
        if (isExpired) {
          console.log("\u26A0\uFE0F Session expired, attempting refresh...");
          const refreshExpired = await client.isRefreshSessionExpired();
          if (refreshExpired) {
            throw new Error("Refresh token also expired");
          }
          await client.refreshSession();
          if (this.config.saveSession) {
            const { StorageService: StorageService2 } = await Promise.resolve().then(() => (init_StorageService(), StorageService_exports));
            const storage = new StorageService2();
            storage.save({
              ...client.session,
              user_id: session.user_id,
              username: session.username,
              name: session.name
            });
          }
        }
        this.handleLoginSuccess(client, {
          user_id: session.user_id,
          username: session.username,
          name: session.name
        });
      } catch (error) {
        console.error("Failed to restore session:", error);
        const { StorageService: StorageService2 } = await Promise.resolve().then(() => (init_StorageService(), StorageService_exports));
        new StorageService2().clear();
        this.showLoginView();
      }
    }
    createContainer() {
      const container = document.createElement("div");
      container.className = "mlc-container";
      container.innerHTML = `
    <div class="mlc-header">
      <div class="mlc-header-title-wrap">
        <div class="mlc-header-icon"></div>
        <h3 class="mlc-header-title">${t("chatSupport")}</h3>
      </div>
      <button class="mlc-close-btn" aria-label="Close chat">\xD7</button>
    </div>
    <div class="mlc-messages"></div>
    <div class="mlc-input-area" style="display: none;">
      <input type="text" class="mlc-input" placeholder="${t("typeMessage")}" />
      <button class="mlc-send-btn">${t("send")}</button>
    </div>
  `;
      const iconWrapper = container.querySelector(".mlc-header-icon");
      const icon = this.iconHeader?.trim() || "";
      if (icon.startsWith("<svg") || icon.startsWith("<?xml")) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(icon, "image/svg+xml");
        const svgElement = doc.querySelector("svg");
        if (svgElement) {
          if (!svgElement.getAttribute("viewBox")) {
            const w2 = svgElement.getAttribute("width") || "240";
            const h2 = svgElement.getAttribute("height") || "241";
            svgElement.setAttribute("viewBox", `0 0 ${w2} ${h2}`);
          }
          svgElement.removeAttribute("width");
          svgElement.removeAttribute("height");
          svgElement.style.display = "block";
          svgElement.style.width = "100%";
          svgElement.style.height = "100%";
          iconWrapper.appendChild(svgElement);
        }
      } else if (icon) {
        const img = document.createElement("img");
        img.src = icon;
        img.alt = "Support Image";
        img.className = "mlc-header-icon-img";
        iconWrapper.appendChild(img);
      }
      return container;
    }
    setupEventListeners() {
      const closeBtn = this.container.querySelector(".mlc-close-btn");
      const sendBtn = this.container.querySelector(".mlc-send-btn");
      closeBtn?.addEventListener("click", () => {
        this.close();
        if (this.onClose) {
          this.onClose();
        }
      });
      sendBtn?.addEventListener("click", () => this.sendMessage());
      this.inputElement.addEventListener("keypress", (e3) => {
        if (e3.key === "Enter") {
          this.sendMessage();
        }
      });
    }
    showLoginView() {
      this.loginView = new LoginView(() => {
        if (this.onLoginRequest) {
          this.onLoginRequest();
        }
      });
      this.messagesContainer.innerHTML = "";
      this.messagesContainer.appendChild(this.loginView.getContainer());
    }
    async handleLoginSuccess(client, user) {
      this.mezonClient = client;
      this.isAuthenticated = true;
      if (this.config.saveSession) {
        const { StorageService: StorageService2 } = await Promise.resolve().then(() => (init_StorageService(), StorageService_exports));
        const storage = new StorageService2();
        storage.save({
          ...client.session,
          user_id: user.user_id,
          username: user.username,
          name: user.name
        });
      }
      if (this.loginView) {
        this.loginView.destroy();
        this.loginView = null;
      }
      this.messagesContainer.innerHTML = "";
      const welcomeMsg = this.config.welcomeMessage || t("defaultWelcomeMessage").replace("{0}", user.username || user.name || "");
      this.addMessage({
        id: Date.now().toString(),
        content: welcomeMsg,
        sender: "ai",
        timestamp: Date.now()
      });
      this.inputArea.style.display = "flex";
      await this.initializeChatService(client);
      if (this.config.peerId) {
        await this.autoStartDM(this.config.peerId);
      }
    }
    async autoStartDM(peerId) {
      try {
        const chatService = this.chatService;
        if (!chatService) {
          console.warn("Chat service not initialized yet");
          return;
        }
        console.log("\u{1F680} Auto-starting DM with peer:", peerId);
        await chatService.startDM(peerId);
        this.addMessage({
          id: Date.now().toString(),
          content: t("connectedStartChatting"),
          sender: "ai",
          timestamp: Date.now()
        });
        if (this.config.autoOpen) {
          this.open();
        }
      } catch (error) {
        console.error("Failed to auto-start DM:", error);
        this.addMessage({
          id: Date.now().toString(),
          content: t("failedConnect"),
          sender: "ai",
          timestamp: Date.now()
        });
      }
    }
    async initializeChatService(client) {
      try {
        const chatService = new ChatService(client);
        await chatService.connect();
        chatService.onMessage((msg) => {
          if (msg.sender_id !== client.userId) {
            this.addMessage({
              id: msg.id,
              content: msg.content,
              sender: "ai",
              timestamp: msg.timestamp
            });
          }
        });
        chatService.onError((error) => {
          console.error("Chat service error:", error);
          if (this.config.onError) {
            this.config.onError(error);
          }
        });
        this.chatService = chatService;
        LogService.log("\u2705 Chat service initialized");
      } catch (error) {
        LogService.error("Failed to initialize chat service:", error);
        if (this.config.onError) {
          this.config.onError(error);
        }
      }
    }
    open() {
      this.container.classList.add("open");
    }
    close() {
      this.container.classList.remove("open");
    }
    toggle() {
      this.container.classList.toggle("open");
    }
    async sendMessage() {
      if (!this.isAuthenticated) {
        console.warn("User not authenticated");
        return;
      }
      const text = this.inputElement.value.trim();
      if (!text) return;
      this.addMessage({
        id: Date.now().toString(),
        content: text,
        sender: "user",
        timestamp: Date.now()
      });
      this.inputElement.value = "";
      if (this.config.onMessage) {
        this.config.onMessage({ content: text, sender: "user" });
      }
      const chatService = this.chatService;
      if (chatService) {
        try {
          if (!chatService.getCurrentChannelId()) {
            this.addMessage({
              id: (Date.now() + 1).toString(),
              content: t("configurePeerId"),
              sender: "ai",
              timestamp: Date.now()
            });
            return;
          }
          await chatService.sendMessage(text);
        } catch (error) {
          console.error("Failed to send message:", error);
          this.addMessage({
            id: (Date.now() + 1).toString(),
            content: t("failedSendMessage"),
            sender: "ai",
            timestamp: Date.now()
          });
        }
      }
    }
    addMessage(message) {
      this.messages.push(message);
      const messageEl = document.createElement("div");
      messageEl.className = `mlc-message ${message.sender}`;
      messageEl.innerHTML = `
      <div class="mlc-message-bubble">${this.escapeHtml(message.content)}</div>
    `;
      this.messagesContainer.appendChild(messageEl);
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
    setMezonClient(client) {
      this.mezonClient = client;
    }
    escapeHtml(text) {
      const div = document.createElement("div");
      div.textContent = text;
      return div.innerHTML;
    }
    getContainer() {
      return this.container;
    }
    destroy() {
      this.container.remove();
    }
  };

  // src/components/OAuthHandler.ts
  init_index_esm();
  var defaultServerKey = "HTTP3m3zonPr0dkey:";
  var OAuthHandler = class {
    constructor(config) {
      this.popup = null;
      this.config = config;
      this.setupMessageListener();
    }
    setupMessageListener() {
      window.addEventListener("message", (event) => {
        if (event.data && event.data.type === "MEZON_LOGIN_SUCCESS") {
          this.handleLoginSuccess(event.data.data);
        }
      });
    }
    async login() {
      return new Promise((resolve, reject) => {
        const oauthPath = this.config.apiOauthPath ?? "api/auth/url";
        const full = this.config.apiBaseUrl.replace(/\/+$/, "") + "/" + oauthPath.replace(/^\/+/, "");
        const url = new URL(full).toString();
        fetch(url).then((res) => res.json()).then((data) => {
          const width = 500;
          const height = 600;
          const left = window.screen.width / 2 - width / 2;
          const top = window.screen.height / 2 - height / 2;
          this.popup = window.open(
            data.url,
            "MezonLogin",
            `width=${width},height=${height},top=${top},left=${left}`
          );
          window.__mezonLoginResolve = resolve;
          window.__mezonLoginReject = reject;
        }).catch((err) => {
          console.error("Failed to get auth URL:", err);
          if (this.config.onError) {
            this.config.onError(err);
          }
          reject(err);
        });
      });
    }
    async handleLoginSuccess(rawData) {
      try {
        const data = MezonChatElement.oauthCallBack ? MezonChatElement.oauthCallBack(rawData) : rawData;
        if (!data?.tokens || !data?.user) {
          throw new Error("Invalid OAuth response data");
        }
        const { tokens, user } = data;
        const client = await Ie.authenticate({
          id_token: tokens.id_token || tokens.access_token,
          user_id: user.user_id,
          username: user.username || user.name || "",
          serverkey: defaultServerKey
        });
        if (this.config.onLogin) {
          this.config.onLogin(user);
        }
        const resolve = window.__mezonLoginResolve;
        if (resolve) {
          resolve({ client, user });
          delete window.__mezonLoginResolve;
          delete window.__mezonLoginReject;
        }
      } catch (error) {
        console.error("Failed to initialize Mezon client:", error);
        if (this.config.onError) {
          this.config.onError(error);
        }
        const reject = window.__mezonLoginReject;
        if (reject) {
          reject(error);
          delete window.__mezonLoginResolve;
          delete window.__mezonLoginReject;
        }
      }
    }
    logout() {
      if (this.config.onLogout) {
        this.config.onLogout();
      }
    }
  };

  // src/MezonChatElement.ts
  init_StorageService();

  // src/themes/theme-registry.ts
  var ThemeRegistryImpl = class {
    constructor() {
      this.themes = /* @__PURE__ */ new Map();
    }
    register(theme) {
      this.themes.set(theme.name, theme);
    }
    get(name) {
      return this.themes.get(name);
    }
    has(name) {
      return this.themes.has(name);
    }
    getAll() {
      return [...this.themes.values()];
    }
  };
  var ThemeRegistry = new ThemeRegistryImpl();

  // src/utils/color.ts
  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return null;
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    };
  }
  function rgbToHex(r, g2, b2) {
    const toHex = (n) => {
      const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };
    return `#${toHex(r)}${toHex(g2)}${toHex(b2)}`;
  }
  function rgbToHsl(r, g2, b2) {
    r /= 255;
    g2 /= 255;
    b2 /= 255;
    const max = Math.max(r, g2, b2);
    const min = Math.min(r, g2, b2);
    let h2 = 0;
    let s2 = 0;
    const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s2 = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h2 = ((g2 - b2) / d + (g2 < b2 ? 6 : 0)) / 6;
          break;
        case g2:
          h2 = ((b2 - r) / d + 2) / 6;
          break;
        case b2:
          h2 = ((r - g2) / d + 4) / 6;
          break;
      }
    }
    return { h: h2 * 360, s: s2 * 100, l: l * 100 };
  }
  function hslToRgb(h2, s2, l) {
    h2 /= 360;
    s2 /= 100;
    l /= 100;
    let r, g2, b2;
    if (s2 === 0) {
      r = g2 = b2 = l;
    } else {
      const hue2rgb = (p2, q3, t2) => {
        if (t2 < 0) t2 += 1;
        if (t2 > 1) t2 -= 1;
        if (t2 < 1 / 6) return p2 + (q3 - p2) * 6 * t2;
        if (t2 < 1 / 2) return q3;
        if (t2 < 2 / 3) return p2 + (q3 - p2) * (2 / 3 - t2) * 6;
        return p2;
      };
      const q2 = l < 0.5 ? l * (1 + s2) : l + s2 - l * s2;
      const p = 2 * l - q2;
      r = hue2rgb(p, q2, h2 + 1 / 3);
      g2 = hue2rgb(p, q2, h2);
      b2 = hue2rgb(p, q2, h2 - 1 / 3);
    }
    return {
      r: Math.round(r * 255),
      g: Math.round(g2 * 255),
      b: Math.round(b2 * 255)
    };
  }
  function isLight(hex) {
    const rgb = hexToRgb(hex);
    if (!rgb) return true;
    const { r, g: g2, b: b2 } = rgb;
    const luminance = (0.299 * r + 0.587 * g2 + 0.114 * b2) / 255;
    return luminance > 0.5;
  }
  function darken(hex, amount) {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    hsl.l = Math.max(0, hsl.l - hsl.l * amount);
    const newRgb = hslToRgb(hsl.h, hsl.s, hsl.l);
    return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
  }

  // src/utils/Hex.ts
  function IsHexColor(input) {
    return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(input);
  }
  function NormalizeHex(hex) {
    if (/^#[0-9a-fA-F]{3}$/.test(hex)) {
      return "#" + hex.slice(1).split("").map((c) => c + c).join("");
    }
    return hex;
  }

  // src/MezonChatElement.ts
  var MezonChatElement = class _MezonChatElement extends HTMLElement {
    constructor() {
      super();
      this.chatInstance = null;
      this.config = {};
    }
    async connectedCallback() {
      this.parseAttributes();
      if (this.config.saveSession) {
        const savedSession = new StorageService().restore();
        if (savedSession) {
          this.initializeChat(savedSession);
          return;
        }
      }
      if (this.hasRequiredConfig()) {
        this.initializeChat();
      }
    }
    disconnectedCallback() {
      if (this.chatInstance) {
        this.chatInstance.destroy();
      }
    }
    parseAttributes() {
      if (this.hasAttribute("api-base-url")) {
        this.config.apiBaseUrl = this.getAttribute("api-base-url");
      }
      if (this.hasAttribute("api-oauth-path")) {
        this.config.apiOauthPath = this.getAttribute("api-oauth-path");
      }
      if (this.hasAttribute("api-exchange-path")) {
        this.config.apiExchangePath = this.getAttribute("oauth-exchange-path");
      }
      if (this.hasAttribute("peer-id")) {
        this.config.peerId = this.getAttribute("peer-id");
      }
      if (this.hasAttribute("save-session")) {
        this.config.saveSession = this.getAttribute("save-session") === "true";
      }
      if (this.hasAttribute("auto-open")) {
        this.config.autoOpen = this.getAttribute("auto-open") === "true";
      }
      if (this.hasAttribute("welcome-message")) {
        this.config.welcomeMessage = this.getAttribute("welcome-message");
      }
      if (this.hasAttribute("position")) {
        this.config.position = this.getAttribute("position");
      }
      if (this.hasAttribute("theme")) {
        const themeInput = this.getAttribute("theme")?.trim();
        if (!themeInput) return;
        if (IsHexColor(themeInput)) {
          const primary = NormalizeHex(themeInput);
          const hoverColor = isLight(primary) ? darken(primary, 0.25) : darken(primary, 0.12);
          const theme = {
            name: "custom",
            tokens: {
              primaryColor: primary,
              hoverColor
            }
          };
          this.config.theme = theme;
          return;
        }
        const registeredTheme = ThemeRegistry.get(themeInput);
        if (!registeredTheme) {
          console.warn(`Theme "${themeInput}" not found`);
          return;
        }
        this.config.theme = registeredTheme;
      }
      if (this.hasAttribute("custom-class")) {
        this.config.customClass = this.getAttribute("custom-class");
      }
      if (this.hasAttribute("icon-chat")) {
        this.config.iconChat = this.getAttribute("icon-chat");
      }
      if (this.hasAttribute("icon-header")) {
        this.config.iconHeader = this.getAttribute("icon-header");
      }
    }
    hasRequiredConfig() {
      return !!this.config.apiBaseUrl;
    }
    initializeChat(savedSession) {
      if (this.chatInstance) {
        return;
      }
      this.chatInstance = new MezonLightChat(this.config);
      this.chatInstance.init(savedSession);
    }
    // Public API methods
    open() {
      this.chatInstance?.open();
    }
    close() {
      this.chatInstance?.close();
    }
    async startDM(peerId) {
      if (this.chatInstance) {
        await this.chatInstance.startDM(peerId);
      }
    }
    logout() {
      this.chatInstance?.logout();
    }
    sendMessage(content) {
      this.chatInstance?.sendMessage(content);
    }
    // Property setters for programmatic configuration
    set apiBaseUrl(value) {
      this.config.apiBaseUrl = value;
      this.setAttribute("api-base-url", value);
    }
    set apiOauthPath(value) {
      this.config.apiOauthPath = value;
      this.setAttribute("api-oauth-path", value);
    }
    set apiExchangePath(value) {
      this.config.apiExchangePath = value;
      this.setAttribute("api-exchange-path", value);
    }
    set peerId(value) {
      this.config.peerId = value;
      this.setAttribute("peer-id", value);
    }
    set saveSession(value) {
      this.config.saveSession = value;
      this.setAttribute("save-session", String(value));
    }
    set autoOpen(value) {
      this.config.autoOpen = value;
      this.setAttribute("auto-open", String(value));
    }
    set welcomeMessage(value) {
      this.config.welcomeMessage = value;
      this.setAttribute("welcome-message", value);
    }
    set theme(value) {
      this.config.theme = value;
      this.setAttribute("theme", JSON.stringify(value));
    }
    // Getters
    get apiBaseUrl() {
      return this.config.apiBaseUrl;
    }
    get apiOauthPath() {
      return this.config.apiOauthPath;
    }
    get apiExchangePath() {
      return this.config.apiExchangePath;
    }
    get peerId() {
      return this.config.peerId;
    }
    get saveSession() {
      return this.config.saveSession;
    }
    get autoOpen() {
      return this.config.autoOpen;
    }
    get welcomeMessage() {
      return this.config.welcomeMessage;
    }
    get theme() {
      return this.config.theme;
    }
    // Attribute change observer
    static get observedAttributes() {
      return [
        "api-base-url",
        "api-oauth-path",
        "api-exchange-path",
        "peer-id",
        "save-session",
        "auto-open",
        "welcome-message",
        "position",
        "theme",
        "custom-class",
        "icon-header",
        "icon-chat"
      ];
    }
    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue === newValue) return;
      this.parseAttributes();
      if (this.chatInstance && this.hasRequiredConfig()) {
        this.chatInstance.destroy();
        this.chatInstance = null;
        this.initializeChat();
      }
    }
    static handleOAuthCallback() {
      LogService.log("\u{1F50D} [Mezon Chat] handleOAuthCallback called");
      if (typeof window === "undefined") {
        LogService.log("\u274C [Mezon Chat] Window is undefined");
        return;
      }
      LogService.log("\u{1F4CD} [Mezon Chat] Current URL:", window.location.href);
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      const state = urlParams.get("state");
      LogService.log("\u{1F9E9} [Mezon Chat] Params detected:", {
        code: code ? "YES (***)" : "NO",
        state,
        opener: !!window.opener,
        openerClosed: window.opener ? window.opener.closed : "N/A"
      });
      if (code && window.opener) {
        LogService.log("\u2705 [Mezon Chat] OAuth Callback detected with Valid Opener!");
        let exchangeUrl = "";
        let baseUrl = window.location.origin;
        let exchangePath = "api/auth/exchange";
        const element = document.querySelector("mezon-chat");
        LogService.log("\u{1F50E} [Mezon Chat] Looking for <mezon-chat> element:", element);
        if (element) {
          LogService.log("\u2699\uFE0F [Mezon Chat] Element config:", {
            "apiBaseUrl": element.apiBaseUrl,
            "apiExchangePath": element.apiExchangePath
          });
          if (element.apiBaseUrl) {
            baseUrl = element.apiBaseUrl;
          }
          if (element.apiExchangePath) {
            exchangePath = element.apiExchangePath;
          }
        } else {
          LogService.warn("\u26A0\uFE0F [Mezon Chat] <mezon-chat> element NOT found. Using default origin and path.");
        }
        exchangeUrl = baseUrl.replace(/\/+$/, "") + "/" + exchangePath.replace(/^\/+/, "");
        LogService.log("\u{1F504} [Mezon Chat] Final Exchange URL:", exchangeUrl);
        LogService.log("\u{1F680} [Mezon Chat] sending fetch request...");
        fetch(exchangeUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code, state })
        }).then((res) => {
          LogService.log("\u{1F4E5} [Mezon Chat] Exchange response status:", res.status, res.statusText);
          if (!res.ok) {
            return res.text().then((text) => {
              throw new Error(`Server responded with ${res.status}: ${text}`);
            });
          }
          return res.json();
        }).then((rawResponse) => {
          LogService.log("\u{1F4E6} [Mezon Chat] Exchange data successfully parsed:", rawResponse);
          if (_MezonChatElement.exchangeCallBack) {
            LogService.log("\u26A1 [Mezon Chat] Executing custom exchangeCallBack...");
          }
          const data = _MezonChatElement.exchangeCallBack ? _MezonChatElement.exchangeCallBack(rawResponse) : rawResponse;
          if (!data) {
            LogService.error("\u274C [Mezon Chat] Data is null/undefined after processing");
            throw new Error("Invalid exchange response");
          }
          const missingFields = [];
          if (!data.tokens) missingFields.push("tokens");
          if (data.tokens && !data.tokens.access_token) missingFields.push("tokens.access_token");
          if (!data.user) missingFields.push("user");
          if (data.user && !data.user.username) missingFields.push("user.username");
          if (missingFields.length > 0) {
            LogService.warn(`\u26A0\uFE0F [Mezon Chat] Missing fields in exchange response (or exchangeCallBack): ${missingFields.join(", ")}`);
            LogService.warn('   Expected format: { tokens: { access_token: "..." }, user: { ... } }');
          }
          LogService.log("\u{1F4E4} [Mezon Chat] Posting Message to Opener...");
          try {
            window.opener.postMessage({
              type: "MEZON_LOGIN_SUCCESS",
              data
            }, "*");
            LogService.log("\u2705 [Mezon Chat] Message posted successfully");
          } catch (e3) {
            LogService.error("\u274C [Mezon Chat] Failed to post message:", e3);
          }
          LogService.log("\u{1F6AA} [Mezon Chat] Closing popup window...");
          window.close();
        }).catch((err) => {
          LogService.error("\u274C [Mezon Chat] Exchange Critical Error:", err);
          document.body.innerHTML = `
            <div style="padding: 20px; font-family: sans-serif; color: #721c24; background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 5px;">
                <h3>OAuth Error</h3>
                <p>${err.message}</p>
                <p>Check console for more details.</p>
            </div>
          `;
        });
      } else if (code) {
        LogService.warn("\u26A0\uFE0F [Mezon Chat] Code present but window.opener is missing/closed.");
      } else {
        LogService.log("\u2139\uFE0F [Mezon Chat] No OAuth code found in URL. Skipping callback logic.");
      }
    }
  };
  if (typeof window !== "undefined" && !customElements.get("mezon-chat")) {
    LogService.log("\u{1F6E0}\uFE0F [Mezon Chat] Registering custom element <mezon-chat>");
    customElements.define("mezon-chat", MezonChatElement);
    if (document.readyState === "loading") {
      LogService.log("\u23F3 [Mezon Chat] Document loading. Waiting for DOMContentLoaded...");
      document.addEventListener("DOMContentLoaded", () => {
        LogService.log("\u{1F514} [Mezon Chat] DOMContentLoaded fired. Running handleOAuthCallback.");
        MezonChatElement.handleOAuthCallback();
      });
    } else {
      LogService.log("\u26A1 [Mezon Chat] Document already ready. Running handleOAuthCallback immediately.");
      MezonChatElement.handleOAuthCallback();
    }
  }

  // src/styles/widget.css
  var widget_default = '/* Mezon Light Chat Widget Styles - Astra Theme Inspired */\n\n:root {\n  /* Astra-inspired color palette */\n  --mlc-primary: #464fb9;\n  --mlc-primary-hover: #5a66c6;\n  --mlc-background: #ffffff;\n  --mlc-text: #3a3a3a;\n  --mlc-text-light: #767676;\n  --mlc-border: #eeeeee;\n  --mlc-shadow: rgba(0, 0, 0, 0.1);\n\n  /* Typography - Astra defaults */\n  --mlc-font-family: "SVN-Avo", sans-serif;\n  --mlc-font-size: 15px;\n  --mlc-line-height: 1.6;\n\n  /* Spacing */\n  --mlc-spacing-xs: 4px;\n  --mlc-spacing-sm: 8px;\n  --mlc-spacing-md: 16px;\n  --mlc-spacing-lg: 24px;\n\n  /* Border radius */\n  --mlc-radius: 4px;\n  --mlc-radius-lg: 8px;\n\n  /* Transitions */\n  --mlc-transition: all 0.3s ease;\n}\n\n/* Widget Container */\n.mezon-light-chat {\n  position: fixed;\n  z-index: 999999;\n  font-family: var(--mlc-font-family);\n  font-size: var(--mlc-font-size);\n  line-height: var(--mlc-line-height);\n}\n\n.mezon-light-chat.position-bottom-right {\n  bottom: 80px;\n  right: 20px;\n}\n\n.mezon-light-chat.position-bottom-left {\n  bottom: 20px;\n  left: 20px;\n}\n\n.mezon-light-chat.position-top-right {\n  top: 20px;\n  right: 20px;\n}\n\n.mezon-light-chat.position-top-left {\n  top: 20px;\n  left: 20px;\n}\n\n/* Launcher Button */\n.mlc-launcher {\n  width: 60px;\n  height: 60px;\n  border-radius: 50%;\n  background: var(--mlc-primary);\n  color: white;\n  border: none;\n  cursor: pointer;\n  /* box-shadow: 0 4px 12px var(--mlc-shadow); */\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: var(--mlc-transition);\n  font-size: 24px;\n  padding: 1px;\n}\n\n.mlc-launcher:hover,\n.mlc-launcher:focus {\n  background: var(--mlc-primary-hover);\n  transform: scale(1.05);\n  box-shadow: 0 6px 16px var(--mlc-shadow);\n}\n\n.mlc-launcher:active {\n  transform: scale(0.95);\n}\n\n.mlc-launcher-icon.is-chat {\n  width: 15px;\n  height: 15px;\n  display: block;\n  transform: scale(2);\n  max-width: none;\n  max-height: none;\n}\n\n.mlc-launcher-icon.is-close {\n  width: 30px;\n  height: 30px;\n  display: block;\n  max-width: none;\n  max-height: none;\n}\n\n/* Chat Container */\n.mlc-container {\n  position: absolute;\n  bottom: 70px;\n  right: 0;\n  width: 380px;\n  max-width: calc(100vw - 40px);\n  height: clamp(420px, 70vh, 600px);\n  background: var(--mlc-background);\n  border-radius: var(--mlc-radius-lg);\n  box-shadow: 0 8px 24px var(--mlc-shadow);\n  display: none;\n  flex-direction: column;\n  overflow: hidden;\n  transition: var(--mlc-transition);\n}\n\n.mlc-container.open {\n  display: flex;\n  animation: slideUp 0.3s ease;\n}\n\n@keyframes slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n/* Header */\n.mlc-header {\n  padding: var(--mlc-spacing-md);\n  background: var(--mlc-primary);\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\n.mlc-header-title-wrap {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.mlc-header-icon {\n  width: 20px;\n  height: 20px;\n  object-fit: contain;\n}\n\n.mlc-header-title {\n  font-size: 16px;\n  font-weight: 600;\n  margin: 0;\n  color: white;\n}\n\n.mlc-close-btn {\n  background: transparent;\n  border: none;\n  color: white;\n  font-size: 24px;\n  cursor: pointer;\n  padding: 0;\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: var(--mlc-radius);\n  transition: var(--mlc-transition);\n}\n\n.mlc-close-btn:hover,\n.mlc-close-btn:focus {\n  background: rgba(255, 255, 255, 0.1);\n}\n\n/* Messages Area */\n.mlc-messages {\n  flex: 1;\n  overflow-y: auto;\n  padding: var(--mlc-spacing-md);\n  display: flex;\n  flex-direction: column;\n  gap: var(--mlc-spacing-md);\n}\n\n.mlc-message {\n  display: flex;\n  gap: var(--mlc-spacing-sm);\n  max-width: 80%;\n  animation: fadeIn 0.3s ease;\n}\n\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(10px);\n  }\n\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.mlc-message.user {\n  align-self: flex-end;\n  flex-direction: row-reverse;\n}\n\n.mlc-message-bubble {\n  padding: var(--mlc-spacing-sm) var(--mlc-spacing-md);\n  border-radius: var(--mlc-radius-lg);\n  word-wrap: break-word;\n}\n\n.mlc-message.user .mlc-message-bubble {\n  background: var(--mlc-primary);\n  color: white;\n  border-bottom-right-radius: var(--mlc-radius);\n}\n\n.mlc-message.ai .mlc-message-bubble {\n  background: var(--mlc-border);\n  color: var(--mlc-text);\n  border-bottom-left-radius: var(--mlc-radius);\n}\n\n/* Input Area */\n.mlc-input-area {\n  padding: var(--mlc-spacing-md);\n  border-top: 1px solid var(--mlc-border);\n  display: flex;\n  gap: var(--mlc-spacing-sm);\n}\n\n.mlc-input {\n  flex: 1;\n  padding: var(--mlc-spacing-sm) var(--mlc-spacing-md);\n  border: 1px solid var(--mlc-border);\n  border-radius: var(--mlc-radius-lg);\n  font-family: inherit;\n  font-size: inherit;\n  outline: none;\n  transition: var(--mlc-transition);\n}\n\n.mlc-input:focus {\n  border-color: var(--mlc-primary);\n  box-shadow: 0 0 0 3px rgba(2, 116, 190, 0.1);\n}\n\n.mlc-send-btn {\n  padding: var(--mlc-spacing-sm) var(--mlc-spacing-md);\n  background: var(--mlc-primary);\n  color: white;\n  border: none;\n  border-radius: var(--mlc-radius-lg);\n  cursor: pointer;\n  font-weight: 600;\n  transition: var(--mlc-transition);\n}\n\n.mlc-send-btn:hover,\n.mlc-send-btn:focus {\n  background: var(--mlc-primary-hover);\n}\n\n.mlc-send-btn:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n\n/* Login View */\n.mlc-login-view {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: var(--mlc-spacing-lg);\n  text-align: center;\n}\n\n.mlc-login-title {\n  font-size: 20px;\n  font-weight: 600;\n  margin-bottom: var(--mlc-spacing-md);\n  color: var(--mlc-text);\n}\n\n.mlc-login-btn {\n  padding: var(--mlc-spacing-md) var(--mlc-spacing-lg);\n  background: var(--mlc-primary);\n  color: white;\n  border: none;\n  border-radius: var(--mlc-radius);\n  font-size: 16px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: var(--mlc-transition);\n}\n\n.mlc-login-btn:hover,\n.mlc-login-btn:focus {\n  background: var(--mlc-primary-hover);\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px var(--mlc-shadow);\n}\n\n/* Loading Spinner */\n.mlc-loading {\n  display: inline-block;\n  width: 20px;\n  height: 20px;\n  border: 3px solid rgba(255, 255, 255, 0.3);\n  border-radius: 50%;\n  border-top-color: white;\n  animation: spin 0.8s linear infinite;\n}\n\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n/* Responsive */\n@media (max-width: 768px) {\n  .mlc-container {\n    width: calc(100vw - 40px);\n    height: calc(100vh - 250px);\n  }\n}\n\n/* Wrapper */\n.mlc-header-icon {\n  width: 24px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n}\n\n/* IMG */\n.mlc-header-icon-img {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  display: block;\n  object-position: center;\n}\n\n/* SVG inline */\n.mlc-header-icon svg {\n  width: 100%;\n  height: 100%;\n  display: block; \n}\n\n.mlc-launcher-icon {\n  width: 24px;\n  height: 24px;\n}\n\n.mlc-launcher-icon,\n.mlc-launcher-icon path {\n  fill: #fff !important;\n}';

  // src/themes/theme.ts
  var WarmAmberTheme = {
    name: "warm-amber",
    tokens: {
      primaryColor: "#E08926",
      hoverColor: "#C9771F",
      backgroundColor: "#ffffff",
      textColor: "#1f2937",
      borderRadius: "10px",
      fontFamily: "Inter, system-ui, sans-serif"
    }
  };
  var PulseRedTheme = {
    name: "pulse-red",
    tokens: {
      primaryColor: "#ed1b23",
      hoverColor: "#c4161c",
      backgroundColor: "#FFFFFF",
      textColor: "#111827",
      borderRadius: "6px",
      fontFamily: "Inter, system-ui, sans-serif"
    }
  };
  var AstraTheme = {
    name: "astra",
    tokens: {
      primaryColor: "#464fb9",
      hoverColor: "#3B439E",
      backgroundColor: "#ffffff",
      textColor: "#3a3a3a",
      borderRadius: "4px",
      fontFamily: "SVN-Avo, Arial, sans-serif"
    }
  };
  var VioletCoreTheme = {
    name: "violet-core",
    tokens: {
      primaryColor: "#6C5DB8",
      hoverColor: "#5B4EA6",
      backgroundColor: "#FFFFFF",
      textColor: "#1F2937",
      borderRadius: "8px",
      fontFamily: "Inter, system-ui, sans-serif"
    }
  };
  var ClearSkyTheme = {
    name: "clear-sky",
    tokens: {
      primaryColor: "#25AAE1",
      hoverColor: "#1E8FC0",
      backgroundColor: "#FFFFFF",
      textColor: "#1F2937",
      borderRadius: "8px",
      fontFamily: "Inter, system-ui, sans-serif"
    }
  };
  var DeepTealTheme = {
    name: "deep-teal",
    tokens: {
      primaryColor: "#004037",
      hoverColor: "#00352E",
      backgroundColor: "#FFFFFF",
      textColor: "#1F2937",
      borderRadius: "8px",
      fontFamily: "Inter, system-ui, sans-serif"
    }
  };

  // src/themes/index.ts
  ThemeRegistry.register(WarmAmberTheme);
  ThemeRegistry.register(PulseRedTheme);
  ThemeRegistry.register(AstraTheme);
  ThemeRegistry.register(VioletCoreTheme);
  ThemeRegistry.register(ClearSkyTheme);
  ThemeRegistry.register(DeepTealTheme);

  // src/index.ts
  var MezonLightChat = class {
    constructor(config) {
      this.widget = null;
      this.launcher = null;
      this.container = null;
      this.oauthHandler = null;
      this.config = {
        position: "bottom-right",
        ...config
      };
    }
    init(savedSession) {
      this.injectStyles();
      if (this.config.theme) {
        this.applyTheme(this.config.theme);
      }
      this.oauthHandler = new OAuthHandler(this.config);
      this.container = document.createElement("div");
      this.container.className = `mezon-light-chat position-${this.config.position}`;
      if (this.config.customClass) {
        this.container.classList.add(this.config.customClass);
      }
      this.widget = new ChatWidget(this.config, () => this.handleLoginRequest(), savedSession, () => this.launcher?.toggle(), this.config.iconHeader);
      this.launcher = new ChatLauncher(() => {
        this.widget?.toggle();
      }, this.config.iconChat);
      this.container.appendChild(this.widget.getContainer());
      this.container.appendChild(this.launcher.getButton());
      document.body.appendChild(this.container);
      if (this.config.onReady) {
        this.config.onReady();
      }
    }
    async handleLoginRequest() {
      if (!this.oauthHandler) return;
      try {
        const result = await this.oauthHandler.login();
        if (result) {
          const { client, user } = result;
          this.widget?.handleLoginSuccess(client, user);
        }
      } catch (error) {
        console.error("Login failed:", error);
        if (this.config.onError) {
          this.config.onError(error);
        }
      }
    }
    injectStyles() {
      const styleId = "mezon-light-chat-styles";
      if (document.getElementById(styleId)) return;
      const styleEl = document.createElement("style");
      styleEl.id = styleId;
      styleEl.textContent = widget_default;
      document.head.appendChild(styleEl);
    }
    applyTheme(theme) {
      const root = document.documentElement;
      if (theme.tokens.primaryColor) {
        root.style.setProperty("--mlc-primary", theme.tokens.primaryColor);
      }
      if (theme.tokens.backgroundColor) {
        root.style.setProperty("--mlc-background", theme.tokens.backgroundColor);
      }
      if (theme.tokens.textColor) {
        root.style.setProperty("--mlc-text", theme.tokens.textColor);
      }
      if (theme.tokens.borderRadius) {
        root.style.setProperty("--mlc-radius", theme.tokens.borderRadius);
      }
      if (theme.tokens.fontFamily) {
        root.style.setProperty("--mlc-font-family", theme.tokens.fontFamily);
      }
      if (theme.tokens.hoverColor) {
        root.style.setProperty("--mlc-primary-hover", theme.tokens.hoverColor);
      }
    }
    open() {
      this.widget?.open();
      this.launcher?.toggle();
    }
    close() {
      this.widget?.close();
      this.launcher?.toggle();
    }
    logout() {
      this.oauthHandler?.logout();
      if (this.widget && this.container) {
        this.widget.destroy();
        this.widget = new ChatWidget(this.config, () => this.handleLoginRequest(), void 0, () => this.launcher?.toggle(), this.config.iconHeader);
        this.container.insertBefore(this.widget.getContainer(), this.launcher?.getButton() || null);
      }
    }
    destroy() {
      this.widget?.destroy();
      this.launcher?.destroy();
      this.container?.remove();
      const styleEl = document.getElementById("mezon-light-chat-styles");
      styleEl?.remove();
    }
    async startDM(peerId) {
      const chatService = this.getChatService();
      if (!chatService) {
        throw new Error("Chat service not initialized. Please login first.");
      }
      try {
        await chatService.startDM(peerId);
        console.log("DM started with peer:", peerId);
      } catch (error) {
        console.error("Failed to start DM:", error);
        if (this.config.onError) {
          this.config.onError(error);
        }
        throw error;
      }
    }
    getChatService() {
      return this.widget ? this.widget.chatService : null;
    }
    sendMessage(content) {
      this.widget?.addMessage({
        id: Date.now().toString(),
        content,
        sender: "user",
        timestamp: Date.now()
      });
    }
  };
  var index_default = MezonLightChat;
  if (typeof window !== "undefined") {
    window.MezonLightChat = MezonLightChat;
  }
  return __toCommonJS(index_exports);
})();
/*! Bundled license information:

long/index.js:
  (**
   * @license
   * Copyright 2009 The Closure Library Authors
   * Copyright 2020 Daniel Wirtz / The long.js Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
//# sourceMappingURL=mezon-chat.js.map
