var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod2) => function __require() {
  return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
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

// ../../node_modules/long/src/long.js
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

// ../../node_modules/@protobufjs/aspromise/index.js
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

// ../../node_modules/@protobufjs/base64/index.js
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
    base64.encode = function encode(buffer, start, end) {
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
    base64.decode = function decode(string, buffer, offset) {
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

// ../../node_modules/@protobufjs/eventemitter/index.js
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

// ../../node_modules/@protobufjs/float/index.js
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

// ../../node_modules/@protobufjs/inquire/index.js
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

// ../../node_modules/@protobufjs/utf8/index.js
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

// ../../node_modules/@protobufjs/pool/index.js
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

// ../../node_modules/protobufjs/src/util/longbits.js
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

// ../../node_modules/protobufjs/src/util/minimal.js
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

// ../../node_modules/protobufjs/src/writer.js
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

// ../../node_modules/protobufjs/src/writer_buffer.js
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

// ../../node_modules/protobufjs/src/reader.js
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
    Reader.prototype.uint32 = function read_uint32_setup() {
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

// ../../node_modules/protobufjs/src/reader_buffer.js
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

// ../../node_modules/protobufjs/src/rpc/service.js
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

// ../../node_modules/protobufjs/src/rpc.js
var require_rpc = __commonJS({
  "../../node_modules/protobufjs/src/rpc.js"(exports2) {
    "use strict";
    var rpc = exports2;
    rpc.Service = require_service();
  }
});

// ../../node_modules/protobufjs/src/roots.js
var require_roots = __commonJS({
  "../../node_modules/protobufjs/src/roots.js"(exports2, module2) {
    "use strict";
    module2.exports = {};
  }
});

// ../../node_modules/protobufjs/src/index-minimal.js
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

// ../../node_modules/protobufjs/minimal.js
var require_minimal2 = __commonJS({
  "../../node_modules/protobufjs/minimal.js"(exports2, module2) {
    "use strict";
    module2.exports = require_index_minimal();
  }
});

// rtapi/realtime.ts
var import_long4 = __toESM(require_long());
var import_minimal4 = __toESM(require_minimal2());

// api/api.ts
var import_long3 = __toESM(require_long());
var import_minimal3 = __toESM(require_minimal2());

// google/protobuf/timestamp.ts
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

// google/protobuf/wrappers.ts
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

// api/api.ts
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
    channel_label: "",
    user_id_one: "",
    user_id_two: "",
    reactions: "",
    mentions: "",
    attachments: "",
    references: "",
    referenced_message: ""
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
    if (message.channel_label !== "") {
      writer.uint32(90).string(message.channel_label);
    }
    if (message.user_id_one !== "") {
      writer.uint32(98).string(message.user_id_one);
    }
    if (message.user_id_two !== "") {
      writer.uint32(106).string(message.user_id_two);
    }
    if (message.reactions !== "") {
      writer.uint32(114).string(message.reactions);
    }
    if (message.mentions !== "") {
      writer.uint32(122).string(message.mentions);
    }
    if (message.attachments !== "") {
      writer.uint32(130).string(message.attachments);
    }
    if (message.references !== "") {
      writer.uint32(138).string(message.references);
    }
    if (message.referenced_message !== "") {
      writer.uint32(146).string(message.referenced_message);
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
          message.channel_label = reader.string();
          break;
        case 12:
          message.user_id_one = reader.string();
          break;
        case 13:
          message.user_id_two = reader.string();
          break;
        case 14:
          message.reactions = reader.string();
          break;
        case 15:
          message.mentions = reader.string();
          break;
        case 16:
          message.attachments = reader.string();
          break;
        case 17:
          message.references = reader.string();
          break;
        case 18:
          message.referenced_message = reader.string();
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
      channel_label: isSet3(object.channel_label) ? String(object.channel_label) : "",
      user_id_one: isSet3(object.user_id_one) ? String(object.user_id_one) : "",
      user_id_two: isSet3(object.user_id_two) ? String(object.user_id_two) : "",
      reactions: isSet3(object.reactions) ? String(object.reactions) : "",
      mentions: isSet3(object.mentions) ? String(object.mentions) : "",
      attachments: isSet3(object.attachments) ? String(object.attachments) : "",
      references: isSet3(object.references) ? String(object.references) : "",
      referenced_message: isSet3(object.referenced_message) ? String(object.referenced_message) : ""
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
    message.channel_label !== void 0 && (obj.channel_label = message.channel_label);
    message.user_id_one !== void 0 && (obj.user_id_one = message.user_id_one);
    message.user_id_two !== void 0 && (obj.user_id_two = message.user_id_two);
    message.reactions !== void 0 && (obj.reactions = message.reactions);
    message.mentions !== void 0 && (obj.mentions = message.mentions);
    message.attachments !== void 0 && (obj.attachments = message.attachments);
    message.references !== void 0 && (obj.references = message.references);
    message.referenced_message !== void 0 && (obj.referenced_message = message.referenced_message);
    return obj;
  },
  create(base) {
    return ChannelMessage.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
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
    message.channel_label = (_k = object.channel_label) != null ? _k : "";
    message.user_id_one = (_l = object.user_id_one) != null ? _l : "";
    message.user_id_two = (_m = object.user_id_two) != null ? _m : "";
    message.reactions = (_n = object.reactions) != null ? _n : "";
    message.mentions = (_o = object.mentions) != null ? _o : "";
    message.attachments = (_p = object.attachments) != null ? _p : "";
    message.references = (_q = object.references) != null ? _q : "";
    message.referenced_message = (_r = object.referenced_message) != null ? _r : "";
    return message;
  }
};
function createBaseNotification() {
  return {
    id: "",
    subject: "",
    content: "",
    code: 0,
    sender_id: "",
    create_time: void 0,
    persistent: false,
    clan_id: "",
    channel_id: "",
    channel_type: "",
    avatar_url: ""
  };
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
    if (message.clan_id !== "") {
      writer.uint32(66).string(message.clan_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(74).string(message.channel_id);
    }
    if (message.channel_type !== "") {
      writer.uint32(82).string(message.channel_type);
    }
    if (message.avatar_url !== "") {
      writer.uint32(90).string(message.avatar_url);
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
        case 8:
          message.clan_id = reader.string();
          break;
        case 9:
          message.channel_id = reader.string();
          break;
        case 10:
          message.channel_type = reader.string();
          break;
        case 11:
          message.avatar_url = reader.string();
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
      persistent: isSet3(object.persistent) ? Boolean(object.persistent) : false,
      clan_id: isSet3(object.clan_id) ? String(object.clan_id) : "",
      channel_id: isSet3(object.channel_id) ? String(object.channel_id) : "",
      channel_type: isSet3(object.channel_type) ? String(object.channel_type) : "",
      avatar_url: isSet3(object.avatar_url) ? String(object.avatar_url) : ""
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
    message.clan_id !== void 0 && (obj.clan_id = message.clan_id);
    message.channel_id !== void 0 && (obj.channel_id = message.channel_id);
    message.channel_type !== void 0 && (obj.channel_type = message.channel_type);
    message.avatar_url !== void 0 && (obj.avatar_url = message.avatar_url);
    return obj;
  },
  create(base) {
    return Notification.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
    const message = createBaseNotification();
    message.id = (_a = object.id) != null ? _a : "";
    message.subject = (_b = object.subject) != null ? _b : "";
    message.content = (_c = object.content) != null ? _c : "";
    message.code = (_d = object.code) != null ? _d : 0;
    message.sender_id = (_e = object.sender_id) != null ? _e : "";
    message.create_time = (_f = object.create_time) != null ? _f : void 0;
    message.persistent = (_g = object.persistent) != null ? _g : false;
    message.clan_id = (_h = object.clan_id) != null ? _h : "";
    message.channel_id = (_i = object.channel_id) != null ? _i : "";
    message.channel_type = (_j = object.channel_type) != null ? _j : "";
    message.avatar_url = (_k = object.avatar_url) != null ? _k : "";
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

// rtapi/realtime.ts
function createBaseEnvelope() {
  return {
    cid: "",
    channel: void 0,
    clan_join: void 0,
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
    message_typing_event: void 0,
    last_seen_message_event: void 0,
    message_reaction_event: void 0,
    voice_joined_event: void 0,
    voice_leaved_event: void 0,
    voice_started_event: void 0,
    voice_ended_event: void 0,
    channel_created_event: void 0,
    channel_deleted_event: void 0,
    channel_updated_event: void 0,
    last_pin_message_event: void 0
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
    if (message.clan_join !== void 0) {
      ClanJoin.encode(message.clan_join, writer.uint32(26).fork()).ldelim();
    }
    if (message.channel_join !== void 0) {
      ChannelJoin.encode(message.channel_join, writer.uint32(34).fork()).ldelim();
    }
    if (message.channel_leave !== void 0) {
      ChannelLeave.encode(message.channel_leave, writer.uint32(42).fork()).ldelim();
    }
    if (message.channel_message !== void 0) {
      ChannelMessage.encode(message.channel_message, writer.uint32(50).fork()).ldelim();
    }
    if (message.channel_message_ack !== void 0) {
      ChannelMessageAck.encode(message.channel_message_ack, writer.uint32(58).fork()).ldelim();
    }
    if (message.channel_message_send !== void 0) {
      ChannelMessageSend.encode(message.channel_message_send, writer.uint32(66).fork()).ldelim();
    }
    if (message.channel_message_update !== void 0) {
      ChannelMessageUpdate.encode(message.channel_message_update, writer.uint32(74).fork()).ldelim();
    }
    if (message.channel_message_remove !== void 0) {
      ChannelMessageRemove.encode(message.channel_message_remove, writer.uint32(82).fork()).ldelim();
    }
    if (message.channel_presence_event !== void 0) {
      ChannelPresenceEvent.encode(message.channel_presence_event, writer.uint32(90).fork()).ldelim();
    }
    if (message.error !== void 0) {
      Error2.encode(message.error, writer.uint32(98).fork()).ldelim();
    }
    if (message.notifications !== void 0) {
      Notifications.encode(message.notifications, writer.uint32(106).fork()).ldelim();
    }
    if (message.rpc !== void 0) {
      Rpc.encode(message.rpc, writer.uint32(114).fork()).ldelim();
    }
    if (message.status !== void 0) {
      Status.encode(message.status, writer.uint32(122).fork()).ldelim();
    }
    if (message.status_follow !== void 0) {
      StatusFollow.encode(message.status_follow, writer.uint32(130).fork()).ldelim();
    }
    if (message.status_presence_event !== void 0) {
      StatusPresenceEvent.encode(message.status_presence_event, writer.uint32(138).fork()).ldelim();
    }
    if (message.status_unfollow !== void 0) {
      StatusUnfollow.encode(message.status_unfollow, writer.uint32(146).fork()).ldelim();
    }
    if (message.status_update !== void 0) {
      StatusUpdate.encode(message.status_update, writer.uint32(154).fork()).ldelim();
    }
    if (message.stream_data !== void 0) {
      StreamData.encode(message.stream_data, writer.uint32(162).fork()).ldelim();
    }
    if (message.stream_presence_event !== void 0) {
      StreamPresenceEvent.encode(message.stream_presence_event, writer.uint32(170).fork()).ldelim();
    }
    if (message.ping !== void 0) {
      Ping.encode(message.ping, writer.uint32(178).fork()).ldelim();
    }
    if (message.pong !== void 0) {
      Pong.encode(message.pong, writer.uint32(186).fork()).ldelim();
    }
    if (message.message_typing_event !== void 0) {
      MessageTypingEvent.encode(message.message_typing_event, writer.uint32(194).fork()).ldelim();
    }
    if (message.last_seen_message_event !== void 0) {
      LastSeenMessageEvent.encode(message.last_seen_message_event, writer.uint32(202).fork()).ldelim();
    }
    if (message.message_reaction_event !== void 0) {
      MessageReactionEvent.encode(message.message_reaction_event, writer.uint32(210).fork()).ldelim();
    }
    if (message.voice_joined_event !== void 0) {
      VoiceJoinedEvent.encode(message.voice_joined_event, writer.uint32(218).fork()).ldelim();
    }
    if (message.voice_leaved_event !== void 0) {
      VoiceLeavedEvent.encode(message.voice_leaved_event, writer.uint32(226).fork()).ldelim();
    }
    if (message.voice_started_event !== void 0) {
      VoiceStartedEvent.encode(message.voice_started_event, writer.uint32(234).fork()).ldelim();
    }
    if (message.voice_ended_event !== void 0) {
      VoiceEndedEvent.encode(message.voice_ended_event, writer.uint32(242).fork()).ldelim();
    }
    if (message.channel_created_event !== void 0) {
      ChannelCreatedEvent.encode(message.channel_created_event, writer.uint32(250).fork()).ldelim();
    }
    if (message.channel_deleted_event !== void 0) {
      ChannelDeletedEvent.encode(message.channel_deleted_event, writer.uint32(258).fork()).ldelim();
    }
    if (message.channel_updated_event !== void 0) {
      ChannelUpdatedEvent.encode(message.channel_updated_event, writer.uint32(266).fork()).ldelim();
    }
    if (message.last_pin_message_event !== void 0) {
      LastPinMessageEvent.encode(message.last_pin_message_event, writer.uint32(274).fork()).ldelim();
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
          message.clan_join = ClanJoin.decode(reader, reader.uint32());
          break;
        case 4:
          message.channel_join = ChannelJoin.decode(reader, reader.uint32());
          break;
        case 5:
          message.channel_leave = ChannelLeave.decode(reader, reader.uint32());
          break;
        case 6:
          message.channel_message = ChannelMessage.decode(reader, reader.uint32());
          break;
        case 7:
          message.channel_message_ack = ChannelMessageAck.decode(reader, reader.uint32());
          break;
        case 8:
          message.channel_message_send = ChannelMessageSend.decode(reader, reader.uint32());
          break;
        case 9:
          message.channel_message_update = ChannelMessageUpdate.decode(reader, reader.uint32());
          break;
        case 10:
          message.channel_message_remove = ChannelMessageRemove.decode(reader, reader.uint32());
          break;
        case 11:
          message.channel_presence_event = ChannelPresenceEvent.decode(reader, reader.uint32());
          break;
        case 12:
          message.error = Error2.decode(reader, reader.uint32());
          break;
        case 13:
          message.notifications = Notifications.decode(reader, reader.uint32());
          break;
        case 14:
          message.rpc = Rpc.decode(reader, reader.uint32());
          break;
        case 15:
          message.status = Status.decode(reader, reader.uint32());
          break;
        case 16:
          message.status_follow = StatusFollow.decode(reader, reader.uint32());
          break;
        case 17:
          message.status_presence_event = StatusPresenceEvent.decode(reader, reader.uint32());
          break;
        case 18:
          message.status_unfollow = StatusUnfollow.decode(reader, reader.uint32());
          break;
        case 19:
          message.status_update = StatusUpdate.decode(reader, reader.uint32());
          break;
        case 20:
          message.stream_data = StreamData.decode(reader, reader.uint32());
          break;
        case 21:
          message.stream_presence_event = StreamPresenceEvent.decode(reader, reader.uint32());
          break;
        case 22:
          message.ping = Ping.decode(reader, reader.uint32());
          break;
        case 23:
          message.pong = Pong.decode(reader, reader.uint32());
          break;
        case 24:
          message.message_typing_event = MessageTypingEvent.decode(reader, reader.uint32());
          break;
        case 25:
          message.last_seen_message_event = LastSeenMessageEvent.decode(reader, reader.uint32());
          break;
        case 26:
          message.message_reaction_event = MessageReactionEvent.decode(reader, reader.uint32());
          break;
        case 27:
          message.voice_joined_event = VoiceJoinedEvent.decode(reader, reader.uint32());
          break;
        case 28:
          message.voice_leaved_event = VoiceLeavedEvent.decode(reader, reader.uint32());
          break;
        case 29:
          message.voice_started_event = VoiceStartedEvent.decode(reader, reader.uint32());
          break;
        case 30:
          message.voice_ended_event = VoiceEndedEvent.decode(reader, reader.uint32());
          break;
        case 31:
          message.channel_created_event = ChannelCreatedEvent.decode(reader, reader.uint32());
          break;
        case 32:
          message.channel_deleted_event = ChannelDeletedEvent.decode(reader, reader.uint32());
          break;
        case 33:
          message.channel_updated_event = ChannelUpdatedEvent.decode(reader, reader.uint32());
          break;
        case 34:
          message.last_pin_message_event = LastPinMessageEvent.decode(reader, reader.uint32());
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
      clan_join: isSet4(object.clan_join) ? ClanJoin.fromJSON(object.clan_join) : void 0,
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
      message_typing_event: isSet4(object.message_typing_event) ? MessageTypingEvent.fromJSON(object.message_typing_event) : void 0,
      last_seen_message_event: isSet4(object.last_seen_message_event) ? LastSeenMessageEvent.fromJSON(object.last_seen_message_event) : void 0,
      message_reaction_event: isSet4(object.message_reaction_event) ? MessageReactionEvent.fromJSON(object.message_reaction_event) : void 0,
      voice_joined_event: isSet4(object.voice_joined_event) ? VoiceJoinedEvent.fromJSON(object.voice_joined_event) : void 0,
      voice_leaved_event: isSet4(object.voice_leaved_event) ? VoiceLeavedEvent.fromJSON(object.voice_leaved_event) : void 0,
      voice_started_event: isSet4(object.voice_started_event) ? VoiceStartedEvent.fromJSON(object.voice_started_event) : void 0,
      voice_ended_event: isSet4(object.voice_ended_event) ? VoiceEndedEvent.fromJSON(object.voice_ended_event) : void 0,
      channel_created_event: isSet4(object.channel_created_event) ? ChannelCreatedEvent.fromJSON(object.channel_created_event) : void 0,
      channel_deleted_event: isSet4(object.channel_deleted_event) ? ChannelDeletedEvent.fromJSON(object.channel_deleted_event) : void 0,
      channel_updated_event: isSet4(object.channel_updated_event) ? ChannelUpdatedEvent.fromJSON(object.channel_updated_event) : void 0,
      last_pin_message_event: isSet4(object.last_pin_message_event) ? LastPinMessageEvent.fromJSON(object.last_pin_message_event) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.cid !== void 0 && (obj.cid = message.cid);
    message.channel !== void 0 && (obj.channel = message.channel ? Channel.toJSON(message.channel) : void 0);
    message.clan_join !== void 0 && (obj.clan_join = message.clan_join ? ClanJoin.toJSON(message.clan_join) : void 0);
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
    message.message_typing_event !== void 0 && (obj.message_typing_event = message.message_typing_event ? MessageTypingEvent.toJSON(message.message_typing_event) : void 0);
    message.last_seen_message_event !== void 0 && (obj.last_seen_message_event = message.last_seen_message_event ? LastSeenMessageEvent.toJSON(message.last_seen_message_event) : void 0);
    message.message_reaction_event !== void 0 && (obj.message_reaction_event = message.message_reaction_event ? MessageReactionEvent.toJSON(message.message_reaction_event) : void 0);
    message.voice_joined_event !== void 0 && (obj.voice_joined_event = message.voice_joined_event ? VoiceJoinedEvent.toJSON(message.voice_joined_event) : void 0);
    message.voice_leaved_event !== void 0 && (obj.voice_leaved_event = message.voice_leaved_event ? VoiceLeavedEvent.toJSON(message.voice_leaved_event) : void 0);
    message.voice_started_event !== void 0 && (obj.voice_started_event = message.voice_started_event ? VoiceStartedEvent.toJSON(message.voice_started_event) : void 0);
    message.voice_ended_event !== void 0 && (obj.voice_ended_event = message.voice_ended_event ? VoiceEndedEvent.toJSON(message.voice_ended_event) : void 0);
    message.channel_created_event !== void 0 && (obj.channel_created_event = message.channel_created_event ? ChannelCreatedEvent.toJSON(message.channel_created_event) : void 0);
    message.channel_deleted_event !== void 0 && (obj.channel_deleted_event = message.channel_deleted_event ? ChannelDeletedEvent.toJSON(message.channel_deleted_event) : void 0);
    message.channel_updated_event !== void 0 && (obj.channel_updated_event = message.channel_updated_event ? ChannelUpdatedEvent.toJSON(message.channel_updated_event) : void 0);
    message.last_pin_message_event !== void 0 && (obj.last_pin_message_event = message.last_pin_message_event ? LastPinMessageEvent.toJSON(message.last_pin_message_event) : void 0);
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
    message.clan_join = object.clan_join !== void 0 && object.clan_join !== null ? ClanJoin.fromPartial(object.clan_join) : void 0;
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
    message.message_typing_event = object.message_typing_event !== void 0 && object.message_typing_event !== null ? MessageTypingEvent.fromPartial(object.message_typing_event) : void 0;
    message.last_seen_message_event = object.last_seen_message_event !== void 0 && object.last_seen_message_event !== null ? LastSeenMessageEvent.fromPartial(object.last_seen_message_event) : void 0;
    message.message_reaction_event = object.message_reaction_event !== void 0 && object.message_reaction_event !== null ? MessageReactionEvent.fromPartial(object.message_reaction_event) : void 0;
    message.voice_joined_event = object.voice_joined_event !== void 0 && object.voice_joined_event !== null ? VoiceJoinedEvent.fromPartial(object.voice_joined_event) : void 0;
    message.voice_leaved_event = object.voice_leaved_event !== void 0 && object.voice_leaved_event !== null ? VoiceLeavedEvent.fromPartial(object.voice_leaved_event) : void 0;
    message.voice_started_event = object.voice_started_event !== void 0 && object.voice_started_event !== null ? VoiceStartedEvent.fromPartial(object.voice_started_event) : void 0;
    message.voice_ended_event = object.voice_ended_event !== void 0 && object.voice_ended_event !== null ? VoiceEndedEvent.fromPartial(object.voice_ended_event) : void 0;
    message.channel_created_event = object.channel_created_event !== void 0 && object.channel_created_event !== null ? ChannelCreatedEvent.fromPartial(object.channel_created_event) : void 0;
    message.channel_deleted_event = object.channel_deleted_event !== void 0 && object.channel_deleted_event !== null ? ChannelDeletedEvent.fromPartial(object.channel_deleted_event) : void 0;
    message.channel_updated_event = object.channel_updated_event !== void 0 && object.channel_updated_event !== null ? ChannelUpdatedEvent.fromPartial(object.channel_updated_event) : void 0;
    message.last_pin_message_event = object.last_pin_message_event !== void 0 && object.last_pin_message_event !== null ? LastPinMessageEvent.fromPartial(object.last_pin_message_event) : void 0;
    return message;
  }
};
function createBaseChannel() {
  return { id: "", presences: [], self: void 0, chanel_label: "", user_id_one: "", user_id_two: "" };
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
    if (message.chanel_label !== "") {
      writer.uint32(34).string(message.chanel_label);
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
          message.chanel_label = reader.string();
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
      chanel_label: isSet4(object.chanel_label) ? String(object.chanel_label) : "",
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
    message.chanel_label !== void 0 && (obj.chanel_label = message.chanel_label);
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
    message.chanel_label = (_c = object.chanel_label) != null ? _c : "";
    message.user_id_one = (_d = object.user_id_one) != null ? _d : "";
    message.user_id_two = (_e = object.user_id_two) != null ? _e : "";
    return message;
  }
};
function createBaseClanJoin() {
  return { clan_id: "" };
}
var ClanJoin = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.clan_id !== "") {
      writer.uint32(10).string(message.clan_id);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseClanJoin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clan_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return { clan_id: isSet4(object.clan_id) ? String(object.clan_id) : "" };
  },
  toJSON(message) {
    const obj = {};
    message.clan_id !== void 0 && (obj.clan_id = message.clan_id);
    return obj;
  },
  create(base) {
    return ClanJoin.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a;
    const message = createBaseClanJoin();
    message.clan_id = (_a = object.clan_id) != null ? _a : "";
    return message;
  }
};
function createBaseChannelJoin() {
  return { clan_id: "", channel_id: "", type: 0, persistence: void 0, hidden: void 0, mode: 0 };
}
var ChannelJoin = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.clan_id !== "") {
      writer.uint32(10).string(message.clan_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
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
    if (message.mode !== 0) {
      writer.uint32(48).int32(message.mode);
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
          message.clan_id = reader.string();
          break;
        case 2:
          message.channel_id = reader.string();
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
        case 6:
          message.mode = reader.int32();
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
      type: isSet4(object.type) ? Number(object.type) : 0,
      persistence: isSet4(object.persistence) ? Boolean(object.persistence) : void 0,
      hidden: isSet4(object.hidden) ? Boolean(object.hidden) : void 0,
      mode: isSet4(object.mode) ? Number(object.mode) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.clan_id !== void 0 && (obj.clan_id = message.clan_id);
    message.channel_id !== void 0 && (obj.channel_id = message.channel_id);
    message.type !== void 0 && (obj.type = Math.round(message.type));
    message.persistence !== void 0 && (obj.persistence = message.persistence);
    message.hidden !== void 0 && (obj.hidden = message.hidden);
    message.mode !== void 0 && (obj.mode = Math.round(message.mode));
    return obj;
  },
  create(base) {
    return ChannelJoin.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b, _c, _d, _e, _f;
    const message = createBaseChannelJoin();
    message.clan_id = (_a = object.clan_id) != null ? _a : "";
    message.channel_id = (_b = object.channel_id) != null ? _b : "";
    message.type = (_c = object.type) != null ? _c : 0;
    message.persistence = (_d = object.persistence) != null ? _d : void 0;
    message.hidden = (_e = object.hidden) != null ? _e : void 0;
    message.mode = (_f = object.mode) != null ? _f : 0;
    return message;
  }
};
function createBaseChannelLeave() {
  return { channel_id: "", mode: 0 };
}
var ChannelLeave = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    if (message.mode !== 0) {
      writer.uint32(16).int32(message.mode);
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
        case 2:
          message.mode = reader.int32();
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
      mode: isSet4(object.mode) ? Number(object.mode) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.channel_id !== void 0 && (obj.channel_id = message.channel_id);
    message.mode !== void 0 && (obj.mode = Math.round(message.mode));
    return obj;
  },
  create(base) {
    return ChannelLeave.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b;
    const message = createBaseChannelLeave();
    message.channel_id = (_a = object.channel_id) != null ? _a : "";
    message.mode = (_b = object.mode) != null ? _b : 0;
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
    if (message.user_id_one !== "") {
      writer.uint32(66).string(message.user_id_one);
    }
    if (message.user_id_two !== "") {
      writer.uint32(74).string(message.user_id_two);
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
          message.user_id_one = reader.string();
          break;
        case 9:
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
    message.user_id_one !== void 0 && (obj.user_id_one = message.user_id_one);
    message.user_id_two !== void 0 && (obj.user_id_two = message.user_id_two);
    return obj;
  },
  create(base) {
    return ChannelMessageAck.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    const message = createBaseChannelMessageAck();
    message.channel_id = (_a = object.channel_id) != null ? _a : "";
    message.message_id = (_b = object.message_id) != null ? _b : "";
    message.code = (_c = object.code) != null ? _c : void 0;
    message.username = (_d = object.username) != null ? _d : "";
    message.create_time = (_e = object.create_time) != null ? _e : void 0;
    message.update_time = (_f = object.update_time) != null ? _f : void 0;
    message.persistent = (_g = object.persistent) != null ? _g : void 0;
    message.user_id_one = (_h = object.user_id_one) != null ? _h : "";
    message.user_id_two = (_i = object.user_id_two) != null ? _i : "";
    return message;
  }
};
function createBaseMessageMention() {
  return { user_id: "", username: "" };
}
var MessageMention = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.user_id !== "") {
      writer.uint32(10).string(message.user_id);
    }
    if (message.username !== "") {
      writer.uint32(18).string(message.username);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseMessageMention();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user_id = reader.string();
          break;
        case 2:
          message.username = reader.string();
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
      username: isSet4(object.username) ? String(object.username) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.user_id !== void 0 && (obj.user_id = message.user_id);
    message.username !== void 0 && (obj.username = message.username);
    return obj;
  },
  create(base) {
    return MessageMention.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b;
    const message = createBaseMessageMention();
    message.user_id = (_a = object.user_id) != null ? _a : "";
    message.username = (_b = object.username) != null ? _b : "";
    return message;
  }
};
function createBaseMessageAttachment() {
  return { filename: "", size: 0, url: "", filetype: "", width: 0, height: 0 };
}
var MessageAttachment = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.filename !== "") {
      writer.uint32(10).string(message.filename);
    }
    if (message.size !== 0) {
      writer.uint32(16).int64(message.size);
    }
    if (message.url !== "") {
      writer.uint32(26).string(message.url);
    }
    if (message.filetype !== "") {
      writer.uint32(34).string(message.filetype);
    }
    if (message.width !== 0) {
      writer.uint32(40).int32(message.width);
    }
    if (message.height !== 0) {
      writer.uint32(48).int32(message.height);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseMessageAttachment();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.filename = reader.string();
          break;
        case 2:
          message.size = longToNumber2(reader.int64());
          break;
        case 3:
          message.url = reader.string();
          break;
        case 4:
          message.filetype = reader.string();
          break;
        case 5:
          message.width = reader.int32();
          break;
        case 6:
          message.height = reader.int32();
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
      filename: isSet4(object.filename) ? String(object.filename) : "",
      size: isSet4(object.size) ? Number(object.size) : 0,
      url: isSet4(object.url) ? String(object.url) : "",
      filetype: isSet4(object.filetype) ? String(object.filetype) : "",
      width: isSet4(object.width) ? Number(object.width) : 0,
      height: isSet4(object.height) ? Number(object.height) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.filename !== void 0 && (obj.filename = message.filename);
    message.size !== void 0 && (obj.size = Math.round(message.size));
    message.url !== void 0 && (obj.url = message.url);
    message.filetype !== void 0 && (obj.filetype = message.filetype);
    message.width !== void 0 && (obj.width = Math.round(message.width));
    message.height !== void 0 && (obj.height = Math.round(message.height));
    return obj;
  },
  create(base) {
    return MessageAttachment.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b, _c, _d, _e, _f;
    const message = createBaseMessageAttachment();
    message.filename = (_a = object.filename) != null ? _a : "";
    message.size = (_b = object.size) != null ? _b : 0;
    message.url = (_c = object.url) != null ? _c : "";
    message.filetype = (_d = object.filetype) != null ? _d : "";
    message.width = (_e = object.width) != null ? _e : 0;
    message.height = (_f = object.height) != null ? _f : 0;
    return message;
  }
};
function createBaseMessageRef() {
  return { message_id: "", message_ref_id: "", message_sender_id: "", content: "", has_attachment: false, ref_type: 0 };
}
var MessageRef = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.message_id !== "") {
      writer.uint32(10).string(message.message_id);
    }
    if (message.message_ref_id !== "") {
      writer.uint32(18).string(message.message_ref_id);
    }
    if (message.message_sender_id !== "") {
      writer.uint32(26).string(message.message_sender_id);
    }
    if (message.content !== "") {
      writer.uint32(34).string(message.content);
    }
    if (message.has_attachment === true) {
      writer.uint32(40).bool(message.has_attachment);
    }
    if (message.ref_type !== 0) {
      writer.uint32(48).int32(message.ref_type);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseMessageRef();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.message_id = reader.string();
          break;
        case 2:
          message.message_ref_id = reader.string();
          break;
        case 3:
          message.message_sender_id = reader.string();
          break;
        case 4:
          message.content = reader.string();
          break;
        case 5:
          message.has_attachment = reader.bool();
          break;
        case 6:
          message.ref_type = reader.int32();
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
      message_id: isSet4(object.message_id) ? String(object.message_id) : "",
      message_ref_id: isSet4(object.message_ref_id) ? String(object.message_ref_id) : "",
      message_sender_id: isSet4(object.message_sender_id) ? String(object.message_sender_id) : "",
      content: isSet4(object.content) ? String(object.content) : "",
      has_attachment: isSet4(object.has_attachment) ? Boolean(object.has_attachment) : false,
      ref_type: isSet4(object.ref_type) ? Number(object.ref_type) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.message_id !== void 0 && (obj.message_id = message.message_id);
    message.message_ref_id !== void 0 && (obj.message_ref_id = message.message_ref_id);
    message.message_sender_id !== void 0 && (obj.message_sender_id = message.message_sender_id);
    message.content !== void 0 && (obj.content = message.content);
    message.has_attachment !== void 0 && (obj.has_attachment = message.has_attachment);
    message.ref_type !== void 0 && (obj.ref_type = Math.round(message.ref_type));
    return obj;
  },
  create(base) {
    return MessageRef.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b, _c, _d, _e, _f;
    const message = createBaseMessageRef();
    message.message_id = (_a = object.message_id) != null ? _a : "";
    message.message_ref_id = (_b = object.message_ref_id) != null ? _b : "";
    message.message_sender_id = (_c = object.message_sender_id) != null ? _c : "";
    message.content = (_d = object.content) != null ? _d : "";
    message.has_attachment = (_e = object.has_attachment) != null ? _e : false;
    message.ref_type = (_f = object.ref_type) != null ? _f : 0;
    return message;
  }
};
function createBaseChannelMessageSend() {
  return {
    clan_id: "",
    channel_id: "",
    content: "",
    mentions: [],
    attachments: [],
    references: [],
    mode: 0,
    anonymous_message: false,
    mention_everyone: false
  };
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
    for (const v of message.mentions) {
      MessageMention.encode(v, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.attachments) {
      MessageAttachment.encode(v, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.references) {
      MessageRef.encode(v, writer.uint32(50).fork()).ldelim();
    }
    if (message.mode !== 0) {
      writer.uint32(56).int32(message.mode);
    }
    if (message.anonymous_message === true) {
      writer.uint32(64).bool(message.anonymous_message);
    }
    if (message.mention_everyone === true) {
      writer.uint32(72).bool(message.mention_everyone);
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
        case 4:
          message.mentions.push(MessageMention.decode(reader, reader.uint32()));
          break;
        case 5:
          message.attachments.push(MessageAttachment.decode(reader, reader.uint32()));
          break;
        case 6:
          message.references.push(MessageRef.decode(reader, reader.uint32()));
          break;
        case 7:
          message.mode = reader.int32();
          break;
        case 8:
          message.anonymous_message = reader.bool();
          break;
        case 9:
          message.mention_everyone = reader.bool();
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
      content: isSet4(object.content) ? String(object.content) : "",
      mentions: Array.isArray(object == null ? void 0 : object.mentions) ? object.mentions.map((e) => MessageMention.fromJSON(e)) : [],
      attachments: Array.isArray(object == null ? void 0 : object.attachments) ? object.attachments.map((e) => MessageAttachment.fromJSON(e)) : [],
      references: Array.isArray(object == null ? void 0 : object.references) ? object.references.map((e) => MessageRef.fromJSON(e)) : [],
      mode: isSet4(object.mode) ? Number(object.mode) : 0,
      anonymous_message: isSet4(object.anonymous_message) ? Boolean(object.anonymous_message) : false,
      mention_everyone: isSet4(object.mention_everyone) ? Boolean(object.mention_everyone) : false
    };
  },
  toJSON(message) {
    const obj = {};
    message.clan_id !== void 0 && (obj.clan_id = message.clan_id);
    message.channel_id !== void 0 && (obj.channel_id = message.channel_id);
    message.content !== void 0 && (obj.content = message.content);
    if (message.mentions) {
      obj.mentions = message.mentions.map((e) => e ? MessageMention.toJSON(e) : void 0);
    } else {
      obj.mentions = [];
    }
    if (message.attachments) {
      obj.attachments = message.attachments.map((e) => e ? MessageAttachment.toJSON(e) : void 0);
    } else {
      obj.attachments = [];
    }
    if (message.references) {
      obj.references = message.references.map((e) => e ? MessageRef.toJSON(e) : void 0);
    } else {
      obj.references = [];
    }
    message.mode !== void 0 && (obj.mode = Math.round(message.mode));
    message.anonymous_message !== void 0 && (obj.anonymous_message = message.anonymous_message);
    message.mention_everyone !== void 0 && (obj.mention_everyone = message.mention_everyone);
    return obj;
  },
  create(base) {
    return ChannelMessageSend.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    const message = createBaseChannelMessageSend();
    message.clan_id = (_a = object.clan_id) != null ? _a : "";
    message.channel_id = (_b = object.channel_id) != null ? _b : "";
    message.content = (_c = object.content) != null ? _c : "";
    message.mentions = ((_d = object.mentions) == null ? void 0 : _d.map((e) => MessageMention.fromPartial(e))) || [];
    message.attachments = ((_e = object.attachments) == null ? void 0 : _e.map((e) => MessageAttachment.fromPartial(e))) || [];
    message.references = ((_f = object.references) == null ? void 0 : _f.map((e) => MessageRef.fromPartial(e))) || [];
    message.mode = (_g = object.mode) != null ? _g : 0;
    message.anonymous_message = (_h = object.anonymous_message) != null ? _h : false;
    message.mention_everyone = (_i = object.mention_everyone) != null ? _i : false;
    return message;
  }
};
function createBaseChannelMessageUpdate() {
  return { channel_id: "", message_id: "", content: "", mode: 0 };
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
    if (message.mode !== 0) {
      writer.uint32(32).int32(message.mode);
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
        case 4:
          message.mode = reader.int32();
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
      content: isSet4(object.content) ? String(object.content) : "",
      mode: isSet4(object.mode) ? Number(object.mode) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.channel_id !== void 0 && (obj.channel_id = message.channel_id);
    message.message_id !== void 0 && (obj.message_id = message.message_id);
    message.content !== void 0 && (obj.content = message.content);
    message.mode !== void 0 && (obj.mode = Math.round(message.mode));
    return obj;
  },
  create(base) {
    return ChannelMessageUpdate.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b, _c, _d;
    const message = createBaseChannelMessageUpdate();
    message.channel_id = (_a = object.channel_id) != null ? _a : "";
    message.message_id = (_b = object.message_id) != null ? _b : "";
    message.content = (_c = object.content) != null ? _c : "";
    message.mode = (_d = object.mode) != null ? _d : 0;
    return message;
  }
};
function createBaseChannelMessageRemove() {
  return { channel_id: "", message_id: "", mode: 0 };
}
var ChannelMessageRemove = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    if (message.message_id !== "") {
      writer.uint32(18).string(message.message_id);
    }
    if (message.mode !== 0) {
      writer.uint32(24).int32(message.mode);
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
        case 3:
          message.mode = reader.int32();
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
      mode: isSet4(object.mode) ? Number(object.mode) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.channel_id !== void 0 && (obj.channel_id = message.channel_id);
    message.message_id !== void 0 && (obj.message_id = message.message_id);
    message.mode !== void 0 && (obj.mode = Math.round(message.mode));
    return obj;
  },
  create(base) {
    return ChannelMessageRemove.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b, _c;
    const message = createBaseChannelMessageRemove();
    message.channel_id = (_a = object.channel_id) != null ? _a : "";
    message.message_id = (_b = object.message_id) != null ? _b : "";
    message.mode = (_c = object.mode) != null ? _c : 0;
    return message;
  }
};
function createBaseChannelPresenceEvent() {
  return { channel_id: "", joins: [], leaves: [], user_id_one: "", user_id_two: "", mode: 0 };
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
    if (message.user_id_one !== "") {
      writer.uint32(34).string(message.user_id_one);
    }
    if (message.user_id_two !== "") {
      writer.uint32(42).string(message.user_id_two);
    }
    if (message.mode !== 0) {
      writer.uint32(48).int32(message.mode);
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
          message.user_id_one = reader.string();
          break;
        case 5:
          message.user_id_two = reader.string();
          break;
        case 6:
          message.mode = reader.int32();
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
      user_id_one: isSet4(object.user_id_one) ? String(object.user_id_one) : "",
      user_id_two: isSet4(object.user_id_two) ? String(object.user_id_two) : "",
      mode: isSet4(object.mode) ? Number(object.mode) : 0
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
    message.user_id_one !== void 0 && (obj.user_id_one = message.user_id_one);
    message.user_id_two !== void 0 && (obj.user_id_two = message.user_id_two);
    message.mode !== void 0 && (obj.mode = Math.round(message.mode));
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
    message.user_id_one = (_d = object.user_id_one) != null ? _d : "";
    message.user_id_two = (_e = object.user_id_two) != null ? _e : "";
    message.mode = (_f = object.mode) != null ? _f : 0;
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
function createBaseLastPinMessageEvent() {
  return { channel_id: "", message_id: "", mode: 0, timestamp: "" };
}
var LastPinMessageEvent = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    if (message.message_id !== "") {
      writer.uint32(18).string(message.message_id);
    }
    if (message.mode !== 0) {
      writer.uint32(24).int32(message.mode);
    }
    if (message.timestamp !== "") {
      writer.uint32(34).string(message.timestamp);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseLastPinMessageEvent();
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
          message.mode = reader.int32();
          break;
        case 4:
          message.timestamp = reader.string();
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
      mode: isSet4(object.mode) ? Number(object.mode) : 0,
      timestamp: isSet4(object.timestamp) ? String(object.timestamp) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.channel_id !== void 0 && (obj.channel_id = message.channel_id);
    message.message_id !== void 0 && (obj.message_id = message.message_id);
    message.mode !== void 0 && (obj.mode = Math.round(message.mode));
    message.timestamp !== void 0 && (obj.timestamp = message.timestamp);
    return obj;
  },
  create(base) {
    return LastPinMessageEvent.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b, _c, _d;
    const message = createBaseLastPinMessageEvent();
    message.channel_id = (_a = object.channel_id) != null ? _a : "";
    message.message_id = (_b = object.message_id) != null ? _b : "";
    message.mode = (_c = object.mode) != null ? _c : 0;
    message.timestamp = (_d = object.timestamp) != null ? _d : "";
    return message;
  }
};
function createBaseLastSeenMessageEvent() {
  return { channel_id: "", message_id: "", mode: 0, timestamp: "" };
}
var LastSeenMessageEvent = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    if (message.message_id !== "") {
      writer.uint32(18).string(message.message_id);
    }
    if (message.mode !== 0) {
      writer.uint32(24).int32(message.mode);
    }
    if (message.timestamp !== "") {
      writer.uint32(34).string(message.timestamp);
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
        case 3:
          message.mode = reader.int32();
          break;
        case 4:
          message.timestamp = reader.string();
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
      mode: isSet4(object.mode) ? Number(object.mode) : 0,
      timestamp: isSet4(object.timestamp) ? String(object.timestamp) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.channel_id !== void 0 && (obj.channel_id = message.channel_id);
    message.message_id !== void 0 && (obj.message_id = message.message_id);
    message.mode !== void 0 && (obj.mode = Math.round(message.mode));
    message.timestamp !== void 0 && (obj.timestamp = message.timestamp);
    return obj;
  },
  create(base) {
    return LastSeenMessageEvent.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b, _c, _d;
    const message = createBaseLastSeenMessageEvent();
    message.channel_id = (_a = object.channel_id) != null ? _a : "";
    message.message_id = (_b = object.message_id) != null ? _b : "";
    message.mode = (_c = object.mode) != null ? _c : 0;
    message.timestamp = (_d = object.timestamp) != null ? _d : "";
    return message;
  }
};
function createBaseMessageTypingEvent() {
  return { channel_id: "", sender_id: "", mode: 0 };
}
var MessageTypingEvent = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    if (message.sender_id !== "") {
      writer.uint32(18).string(message.sender_id);
    }
    if (message.mode !== 0) {
      writer.uint32(24).int32(message.mode);
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
        case 3:
          message.mode = reader.int32();
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
      sender_id: isSet4(object.sender_id) ? String(object.sender_id) : "",
      mode: isSet4(object.mode) ? Number(object.mode) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.channel_id !== void 0 && (obj.channel_id = message.channel_id);
    message.sender_id !== void 0 && (obj.sender_id = message.sender_id);
    message.mode !== void 0 && (obj.mode = Math.round(message.mode));
    return obj;
  },
  create(base) {
    return MessageTypingEvent.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b, _c;
    const message = createBaseMessageTypingEvent();
    message.channel_id = (_a = object.channel_id) != null ? _a : "";
    message.sender_id = (_b = object.sender_id) != null ? _b : "";
    message.mode = (_c = object.mode) != null ? _c : 0;
    return message;
  }
};
function createBaseMessageReactionEvent() {
  return {
    id: "",
    channel_id: "",
    message_id: "",
    sender_id: "",
    sender_name: "",
    sender_avatar: "",
    emoji: "",
    action: false,
    message_sender_id: "",
    count: 0,
    mode: 0
  };
}
var MessageReactionEvent = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    if (message.message_id !== "") {
      writer.uint32(26).string(message.message_id);
    }
    if (message.sender_id !== "") {
      writer.uint32(34).string(message.sender_id);
    }
    if (message.sender_name !== "") {
      writer.uint32(42).string(message.sender_name);
    }
    if (message.sender_avatar !== "") {
      writer.uint32(50).string(message.sender_avatar);
    }
    if (message.emoji !== "") {
      writer.uint32(58).string(message.emoji);
    }
    if (message.action === true) {
      writer.uint32(64).bool(message.action);
    }
    if (message.message_sender_id !== "") {
      writer.uint32(74).string(message.message_sender_id);
    }
    if (message.count !== 0) {
      writer.uint32(80).int32(message.count);
    }
    if (message.mode !== 0) {
      writer.uint32(88).int32(message.mode);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseMessageReactionEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.channel_id = reader.string();
          break;
        case 3:
          message.message_id = reader.string();
          break;
        case 4:
          message.sender_id = reader.string();
          break;
        case 5:
          message.sender_name = reader.string();
          break;
        case 6:
          message.sender_avatar = reader.string();
          break;
        case 7:
          message.emoji = reader.string();
          break;
        case 8:
          message.action = reader.bool();
          break;
        case 9:
          message.message_sender_id = reader.string();
          break;
        case 10:
          message.count = reader.int32();
          break;
        case 11:
          message.mode = reader.int32();
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
      channel_id: isSet4(object.channel_id) ? String(object.channel_id) : "",
      message_id: isSet4(object.message_id) ? String(object.message_id) : "",
      sender_id: isSet4(object.sender_id) ? String(object.sender_id) : "",
      sender_name: isSet4(object.sender_name) ? String(object.sender_name) : "",
      sender_avatar: isSet4(object.sender_avatar) ? String(object.sender_avatar) : "",
      emoji: isSet4(object.emoji) ? String(object.emoji) : "",
      action: isSet4(object.action) ? Boolean(object.action) : false,
      message_sender_id: isSet4(object.message_sender_id) ? String(object.message_sender_id) : "",
      count: isSet4(object.count) ? Number(object.count) : 0,
      mode: isSet4(object.mode) ? Number(object.mode) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.id !== void 0 && (obj.id = message.id);
    message.channel_id !== void 0 && (obj.channel_id = message.channel_id);
    message.message_id !== void 0 && (obj.message_id = message.message_id);
    message.sender_id !== void 0 && (obj.sender_id = message.sender_id);
    message.sender_name !== void 0 && (obj.sender_name = message.sender_name);
    message.sender_avatar !== void 0 && (obj.sender_avatar = message.sender_avatar);
    message.emoji !== void 0 && (obj.emoji = message.emoji);
    message.action !== void 0 && (obj.action = message.action);
    message.message_sender_id !== void 0 && (obj.message_sender_id = message.message_sender_id);
    message.count !== void 0 && (obj.count = Math.round(message.count));
    message.mode !== void 0 && (obj.mode = Math.round(message.mode));
    return obj;
  },
  create(base) {
    return MessageReactionEvent.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
    const message = createBaseMessageReactionEvent();
    message.id = (_a = object.id) != null ? _a : "";
    message.channel_id = (_b = object.channel_id) != null ? _b : "";
    message.message_id = (_c = object.message_id) != null ? _c : "";
    message.sender_id = (_d = object.sender_id) != null ? _d : "";
    message.sender_name = (_e = object.sender_name) != null ? _e : "";
    message.sender_avatar = (_f = object.sender_avatar) != null ? _f : "";
    message.emoji = (_g = object.emoji) != null ? _g : "";
    message.action = (_h = object.action) != null ? _h : false;
    message.message_sender_id = (_i = object.message_sender_id) != null ? _i : "";
    message.count = (_j = object.count) != null ? _j : 0;
    message.mode = (_k = object.mode) != null ? _k : 0;
    return message;
  }
};
function createBaseVoiceLeavedEvent() {
  return { id: "", clan_id: "", voice_channel_id: "", voice_user_id: "" };
}
var VoiceLeavedEvent = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.clan_id !== "") {
      writer.uint32(18).string(message.clan_id);
    }
    if (message.voice_channel_id !== "") {
      writer.uint32(26).string(message.voice_channel_id);
    }
    if (message.voice_user_id !== "") {
      writer.uint32(34).string(message.voice_user_id);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseVoiceLeavedEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.clan_id = reader.string();
          break;
        case 3:
          message.voice_channel_id = reader.string();
          break;
        case 4:
          message.voice_user_id = reader.string();
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
      clan_id: isSet4(object.clan_id) ? String(object.clan_id) : "",
      voice_channel_id: isSet4(object.voice_channel_id) ? String(object.voice_channel_id) : "",
      voice_user_id: isSet4(object.voice_user_id) ? String(object.voice_user_id) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.id !== void 0 && (obj.id = message.id);
    message.clan_id !== void 0 && (obj.clan_id = message.clan_id);
    message.voice_channel_id !== void 0 && (obj.voice_channel_id = message.voice_channel_id);
    message.voice_user_id !== void 0 && (obj.voice_user_id = message.voice_user_id);
    return obj;
  },
  create(base) {
    return VoiceLeavedEvent.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b, _c, _d;
    const message = createBaseVoiceLeavedEvent();
    message.id = (_a = object.id) != null ? _a : "";
    message.clan_id = (_b = object.clan_id) != null ? _b : "";
    message.voice_channel_id = (_c = object.voice_channel_id) != null ? _c : "";
    message.voice_user_id = (_d = object.voice_user_id) != null ? _d : "";
    return message;
  }
};
function createBaseVoiceJoinedEvent() {
  return {
    clan_id: "",
    clan_name: "",
    id: "",
    participant: "",
    user_id: "",
    voice_channel_label: "",
    voice_channel_id: "",
    last_screenshot: ""
  };
}
var VoiceJoinedEvent = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.clan_id !== "") {
      writer.uint32(10).string(message.clan_id);
    }
    if (message.clan_name !== "") {
      writer.uint32(18).string(message.clan_name);
    }
    if (message.id !== "") {
      writer.uint32(26).string(message.id);
    }
    if (message.participant !== "") {
      writer.uint32(34).string(message.participant);
    }
    if (message.user_id !== "") {
      writer.uint32(42).string(message.user_id);
    }
    if (message.voice_channel_label !== "") {
      writer.uint32(50).string(message.voice_channel_label);
    }
    if (message.voice_channel_id !== "") {
      writer.uint32(58).string(message.voice_channel_id);
    }
    if (message.last_screenshot !== "") {
      writer.uint32(66).string(message.last_screenshot);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseVoiceJoinedEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clan_id = reader.string();
          break;
        case 2:
          message.clan_name = reader.string();
          break;
        case 3:
          message.id = reader.string();
          break;
        case 4:
          message.participant = reader.string();
          break;
        case 5:
          message.user_id = reader.string();
          break;
        case 6:
          message.voice_channel_label = reader.string();
          break;
        case 7:
          message.voice_channel_id = reader.string();
          break;
        case 8:
          message.last_screenshot = reader.string();
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
      clan_name: isSet4(object.clan_name) ? String(object.clan_name) : "",
      id: isSet4(object.id) ? String(object.id) : "",
      participant: isSet4(object.participant) ? String(object.participant) : "",
      user_id: isSet4(object.user_id) ? String(object.user_id) : "",
      voice_channel_label: isSet4(object.voice_channel_label) ? String(object.voice_channel_label) : "",
      voice_channel_id: isSet4(object.voice_channel_id) ? String(object.voice_channel_id) : "",
      last_screenshot: isSet4(object.last_screenshot) ? String(object.last_screenshot) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.clan_id !== void 0 && (obj.clan_id = message.clan_id);
    message.clan_name !== void 0 && (obj.clan_name = message.clan_name);
    message.id !== void 0 && (obj.id = message.id);
    message.participant !== void 0 && (obj.participant = message.participant);
    message.user_id !== void 0 && (obj.user_id = message.user_id);
    message.voice_channel_label !== void 0 && (obj.voice_channel_label = message.voice_channel_label);
    message.voice_channel_id !== void 0 && (obj.voice_channel_id = message.voice_channel_id);
    message.last_screenshot !== void 0 && (obj.last_screenshot = message.last_screenshot);
    return obj;
  },
  create(base) {
    return VoiceJoinedEvent.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const message = createBaseVoiceJoinedEvent();
    message.clan_id = (_a = object.clan_id) != null ? _a : "";
    message.clan_name = (_b = object.clan_name) != null ? _b : "";
    message.id = (_c = object.id) != null ? _c : "";
    message.participant = (_d = object.participant) != null ? _d : "";
    message.user_id = (_e = object.user_id) != null ? _e : "";
    message.voice_channel_label = (_f = object.voice_channel_label) != null ? _f : "";
    message.voice_channel_id = (_g = object.voice_channel_id) != null ? _g : "";
    message.last_screenshot = (_h = object.last_screenshot) != null ? _h : "";
    return message;
  }
};
function createBaseVoiceStartedEvent() {
  return { id: "", clan_id: "", voice_channel_id: "" };
}
var VoiceStartedEvent = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.clan_id !== "") {
      writer.uint32(18).string(message.clan_id);
    }
    if (message.voice_channel_id !== "") {
      writer.uint32(26).string(message.voice_channel_id);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseVoiceStartedEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.clan_id = reader.string();
          break;
        case 3:
          message.voice_channel_id = reader.string();
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
      clan_id: isSet4(object.clan_id) ? String(object.clan_id) : "",
      voice_channel_id: isSet4(object.voice_channel_id) ? String(object.voice_channel_id) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.id !== void 0 && (obj.id = message.id);
    message.clan_id !== void 0 && (obj.clan_id = message.clan_id);
    message.voice_channel_id !== void 0 && (obj.voice_channel_id = message.voice_channel_id);
    return obj;
  },
  create(base) {
    return VoiceStartedEvent.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b, _c;
    const message = createBaseVoiceStartedEvent();
    message.id = (_a = object.id) != null ? _a : "";
    message.clan_id = (_b = object.clan_id) != null ? _b : "";
    message.voice_channel_id = (_c = object.voice_channel_id) != null ? _c : "";
    return message;
  }
};
function createBaseVoiceEndedEvent() {
  return { id: "", clan_id: "", voice_channel_id: "" };
}
var VoiceEndedEvent = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.clan_id !== "") {
      writer.uint32(18).string(message.clan_id);
    }
    if (message.voice_channel_id !== "") {
      writer.uint32(26).string(message.voice_channel_id);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseVoiceEndedEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.clan_id = reader.string();
          break;
        case 3:
          message.voice_channel_id = reader.string();
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
      clan_id: isSet4(object.clan_id) ? String(object.clan_id) : "",
      voice_channel_id: isSet4(object.voice_channel_id) ? String(object.voice_channel_id) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.id !== void 0 && (obj.id = message.id);
    message.clan_id !== void 0 && (obj.clan_id = message.clan_id);
    message.voice_channel_id !== void 0 && (obj.voice_channel_id = message.voice_channel_id);
    return obj;
  },
  create(base) {
    return VoiceEndedEvent.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b, _c;
    const message = createBaseVoiceEndedEvent();
    message.id = (_a = object.id) != null ? _a : "";
    message.clan_id = (_b = object.clan_id) != null ? _b : "";
    message.voice_channel_id = (_c = object.voice_channel_id) != null ? _c : "";
    return message;
  }
};
function createBaseChannelCreatedEvent() {
  return {
    clan_id: "",
    category_id: "",
    creator_id: "",
    parrent_id: "",
    channel_id: "",
    channel_label: "",
    channel_private: 0,
    channel_type: void 0,
    status: 0
  };
}
var ChannelCreatedEvent = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.clan_id !== "") {
      writer.uint32(10).string(message.clan_id);
    }
    if (message.category_id !== "") {
      writer.uint32(18).string(message.category_id);
    }
    if (message.creator_id !== "") {
      writer.uint32(26).string(message.creator_id);
    }
    if (message.parrent_id !== "") {
      writer.uint32(34).string(message.parrent_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(42).string(message.channel_id);
    }
    if (message.channel_label !== "") {
      writer.uint32(50).string(message.channel_label);
    }
    if (message.channel_private !== 0) {
      writer.uint32(56).int32(message.channel_private);
    }
    if (message.channel_type !== void 0) {
      Int32Value.encode({ value: message.channel_type }, writer.uint32(66).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(72).int32(message.status);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseChannelCreatedEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clan_id = reader.string();
          break;
        case 2:
          message.category_id = reader.string();
          break;
        case 3:
          message.creator_id = reader.string();
          break;
        case 4:
          message.parrent_id = reader.string();
          break;
        case 5:
          message.channel_id = reader.string();
          break;
        case 6:
          message.channel_label = reader.string();
          break;
        case 7:
          message.channel_private = reader.int32();
          break;
        case 8:
          message.channel_type = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 9:
          message.status = reader.int32();
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
      category_id: isSet4(object.category_id) ? String(object.category_id) : "",
      creator_id: isSet4(object.creator_id) ? String(object.creator_id) : "",
      parrent_id: isSet4(object.parrent_id) ? String(object.parrent_id) : "",
      channel_id: isSet4(object.channel_id) ? String(object.channel_id) : "",
      channel_label: isSet4(object.channel_label) ? String(object.channel_label) : "",
      channel_private: isSet4(object.channel_private) ? Number(object.channel_private) : 0,
      channel_type: isSet4(object.channel_type) ? Number(object.channel_type) : void 0,
      status: isSet4(object.status) ? Number(object.status) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.clan_id !== void 0 && (obj.clan_id = message.clan_id);
    message.category_id !== void 0 && (obj.category_id = message.category_id);
    message.creator_id !== void 0 && (obj.creator_id = message.creator_id);
    message.parrent_id !== void 0 && (obj.parrent_id = message.parrent_id);
    message.channel_id !== void 0 && (obj.channel_id = message.channel_id);
    message.channel_label !== void 0 && (obj.channel_label = message.channel_label);
    message.channel_private !== void 0 && (obj.channel_private = Math.round(message.channel_private));
    message.channel_type !== void 0 && (obj.channel_type = message.channel_type);
    message.status !== void 0 && (obj.status = Math.round(message.status));
    return obj;
  },
  create(base) {
    return ChannelCreatedEvent.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    const message = createBaseChannelCreatedEvent();
    message.clan_id = (_a = object.clan_id) != null ? _a : "";
    message.category_id = (_b = object.category_id) != null ? _b : "";
    message.creator_id = (_c = object.creator_id) != null ? _c : "";
    message.parrent_id = (_d = object.parrent_id) != null ? _d : "";
    message.channel_id = (_e = object.channel_id) != null ? _e : "";
    message.channel_label = (_f = object.channel_label) != null ? _f : "";
    message.channel_private = (_g = object.channel_private) != null ? _g : 0;
    message.channel_type = (_h = object.channel_type) != null ? _h : void 0;
    message.status = (_i = object.status) != null ? _i : 0;
    return message;
  }
};
function createBaseChannelDeletedEvent() {
  return { clan_id: "", category_id: "", parrent_id: "", channel_id: "", deletor: "" };
}
var ChannelDeletedEvent = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.clan_id !== "") {
      writer.uint32(10).string(message.clan_id);
    }
    if (message.category_id !== "") {
      writer.uint32(18).string(message.category_id);
    }
    if (message.parrent_id !== "") {
      writer.uint32(26).string(message.parrent_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(34).string(message.channel_id);
    }
    if (message.deletor !== "") {
      writer.uint32(42).string(message.deletor);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseChannelDeletedEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clan_id = reader.string();
          break;
        case 2:
          message.category_id = reader.string();
          break;
        case 3:
          message.parrent_id = reader.string();
          break;
        case 4:
          message.channel_id = reader.string();
          break;
        case 5:
          message.deletor = reader.string();
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
      category_id: isSet4(object.category_id) ? String(object.category_id) : "",
      parrent_id: isSet4(object.parrent_id) ? String(object.parrent_id) : "",
      channel_id: isSet4(object.channel_id) ? String(object.channel_id) : "",
      deletor: isSet4(object.deletor) ? String(object.deletor) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.clan_id !== void 0 && (obj.clan_id = message.clan_id);
    message.category_id !== void 0 && (obj.category_id = message.category_id);
    message.parrent_id !== void 0 && (obj.parrent_id = message.parrent_id);
    message.channel_id !== void 0 && (obj.channel_id = message.channel_id);
    message.deletor !== void 0 && (obj.deletor = message.deletor);
    return obj;
  },
  create(base) {
    return ChannelDeletedEvent.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b, _c, _d, _e;
    const message = createBaseChannelDeletedEvent();
    message.clan_id = (_a = object.clan_id) != null ? _a : "";
    message.category_id = (_b = object.category_id) != null ? _b : "";
    message.parrent_id = (_c = object.parrent_id) != null ? _c : "";
    message.channel_id = (_d = object.channel_id) != null ? _d : "";
    message.deletor = (_e = object.deletor) != null ? _e : "";
    return message;
  }
};
function createBaseChannelUpdatedEvent() {
  return {
    clan_id: "",
    category_id: "",
    creator_id: "",
    parrent_id: "",
    channel_id: "",
    channel_label: "",
    channel_type: void 0,
    status: 0
  };
}
var ChannelUpdatedEvent = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.clan_id !== "") {
      writer.uint32(10).string(message.clan_id);
    }
    if (message.category_id !== "") {
      writer.uint32(18).string(message.category_id);
    }
    if (message.creator_id !== "") {
      writer.uint32(26).string(message.creator_id);
    }
    if (message.parrent_id !== "") {
      writer.uint32(34).string(message.parrent_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(42).string(message.channel_id);
    }
    if (message.channel_label !== "") {
      writer.uint32(50).string(message.channel_label);
    }
    if (message.channel_type !== void 0) {
      Int32Value.encode({ value: message.channel_type }, writer.uint32(58).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(64).int32(message.status);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseChannelUpdatedEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clan_id = reader.string();
          break;
        case 2:
          message.category_id = reader.string();
          break;
        case 3:
          message.creator_id = reader.string();
          break;
        case 4:
          message.parrent_id = reader.string();
          break;
        case 5:
          message.channel_id = reader.string();
          break;
        case 6:
          message.channel_label = reader.string();
          break;
        case 7:
          message.channel_type = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 8:
          message.status = reader.int32();
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
      category_id: isSet4(object.category_id) ? String(object.category_id) : "",
      creator_id: isSet4(object.creator_id) ? String(object.creator_id) : "",
      parrent_id: isSet4(object.parrent_id) ? String(object.parrent_id) : "",
      channel_id: isSet4(object.channel_id) ? String(object.channel_id) : "",
      channel_label: isSet4(object.channel_label) ? String(object.channel_label) : "",
      channel_type: isSet4(object.channel_type) ? Number(object.channel_type) : void 0,
      status: isSet4(object.status) ? Number(object.status) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.clan_id !== void 0 && (obj.clan_id = message.clan_id);
    message.category_id !== void 0 && (obj.category_id = message.category_id);
    message.creator_id !== void 0 && (obj.creator_id = message.creator_id);
    message.parrent_id !== void 0 && (obj.parrent_id = message.parrent_id);
    message.channel_id !== void 0 && (obj.channel_id = message.channel_id);
    message.channel_label !== void 0 && (obj.channel_label = message.channel_label);
    message.channel_type !== void 0 && (obj.channel_type = message.channel_type);
    message.status !== void 0 && (obj.status = Math.round(message.status));
    return obj;
  },
  create(base) {
    return ChannelUpdatedEvent.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const message = createBaseChannelUpdatedEvent();
    message.clan_id = (_a = object.clan_id) != null ? _a : "";
    message.category_id = (_b = object.category_id) != null ? _b : "";
    message.creator_id = (_c = object.creator_id) != null ? _c : "";
    message.parrent_id = (_d = object.parrent_id) != null ? _d : "";
    message.channel_id = (_e = object.channel_id) != null ? _e : "";
    message.channel_label = (_f = object.channel_label) != null ? _f : "";
    message.channel_type = (_g = object.channel_type) != null ? _g : void 0;
    message.status = (_h = object.status) != null ? _h : 0;
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
  return { mode: 0, channel_id: "", clan_id: "", label: "" };
}
var Stream = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.mode !== 0) {
      writer.uint32(8).int32(message.mode);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    if (message.clan_id !== "") {
      writer.uint32(26).string(message.clan_id);
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
          message.channel_id = reader.string();
          break;
        case 3:
          message.clan_id = reader.string();
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
      channel_id: isSet4(object.channel_id) ? String(object.channel_id) : "",
      clan_id: isSet4(object.clan_id) ? String(object.clan_id) : "",
      label: isSet4(object.label) ? String(object.label) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    message.mode !== void 0 && (obj.mode = Math.round(message.mode));
    message.channel_id !== void 0 && (obj.channel_id = message.channel_id);
    message.clan_id !== void 0 && (obj.clan_id = message.clan_id);
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
    message.channel_id = (_b = object.channel_id) != null ? _b : "";
    message.clan_id = (_c = object.clan_id) != null ? _c : "";
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

// web_socket_adapter_pb.ts
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
export {
  WebSocketAdapterPb
};
