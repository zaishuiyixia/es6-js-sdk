(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["pass"] = factory();
	else
		root["pass"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 67);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(32)('wks');
var uid = __webpack_require__(21);
var Symbol = __webpack_require__(2).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(0);
var ctx = __webpack_require__(15);
var hide = __webpack_require__(7);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(5);
var IE8_DOM_DEFINE = __webpack_require__(43);
var toPrimitive = __webpack_require__(27);
var dP = Object.defineProperty;

exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(11)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(4);
var createDesc = __webpack_require__(16);
module.exports = __webpack_require__(6) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(45);
var defined = __webpack_require__(28);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(44);
var enumBugKeys = __webpack_require__(33);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(68), __esModule: true };

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(20);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(97)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(51)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(28);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(92);
var global = __webpack_require__(2);
var hide = __webpack_require__(7);
var Iterators = __webpack_require__(13);
var TO_STRING_TAG = __webpack_require__(1)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(4).f;
var has = __webpack_require__(9);
var TAG = __webpack_require__(1)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);
var document = __webpack_require__(2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(8);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(30);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(32)('keys');
var uid = __webpack_require__(21);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 33 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 34 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(5);
var dPs = __webpack_require__(87);
var enumBugKeys = __webpack_require__(33);
var IE_PROTO = __webpack_require__(31)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(26)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(49).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(17);
var TAG = __webpack_require__(1)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(36);
var ITERATOR = __webpack_require__(1)('iterator');
var Iterators = __webpack_require__(13);
module.exports = __webpack_require__(0).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(109), __esModule: true };

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(124), __esModule: true };

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(20);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(1);


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(0);
var LIBRARY = __webpack_require__(24);
var wksExt = __webpack_require__(41);
var defineProperty = __webpack_require__(4).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(6) && !__webpack_require__(11)(function () {
  return Object.defineProperty(__webpack_require__(26)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(9);
var toIObject = __webpack_require__(10);
var arrayIndexOf = __webpack_require__(71)(false);
var IE_PROTO = __webpack_require__(31)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(17);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = vendors;

/***/ }),
/* 47 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(85), __esModule: true };

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(2).document;
module.exports = document && document.documentElement;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__(90);

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__(99);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(24);
var $export = __webpack_require__(3);
var redefine = __webpack_require__(52);
var hide = __webpack_require__(7);
var has = __webpack_require__(9);
var Iterators = __webpack_require__(13);
var $iterCreate = __webpack_require__(95);
var setToStringTag = __webpack_require__(25);
var getPrototypeOf = __webpack_require__(96);
var ITERATOR = __webpack_require__(1)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(54);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(102), __esModule: true };

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(5);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(13);
var ITERATOR = __webpack_require__(1)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(1)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(118);
exports.encode = exports.stringify = __webpack_require__(119);


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(121);


/***/ }),
/* 60 */
/***/ (function(module, exports) {



/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(5);
var aFunction = __webpack_require__(20);
var SPECIES = __webpack_require__(1)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(15);
var invoke = __webpack_require__(128);
var html = __webpack_require__(49);
var cel = __webpack_require__(26);
var global = __webpack_require__(2);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(17)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 63 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(5);
var isObject = __webpack_require__(8);
var newPromiseCapability = __webpack_require__(40);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(44);
var hiddenKeys = __webpack_require__(33).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(152), __esModule: true };

/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forget", function() { return forget; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_polyfill__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__render__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__event__ = __webpack_require__(157);





var forget = function forget() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var defaultOpts = {};

    var options = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()(defaultOpts, opts);

    Object(__WEBPACK_IMPORTED_MODULE_2__render__["a" /* default */])(options);
    Object(__WEBPACK_IMPORTED_MODULE_3__event__["a" /* default */])(options);
};



// new FormCheck({});

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(69);
module.exports = __webpack_require__(0).Object.assign;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(3);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(70) });


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(12);
var gOPS = __webpack_require__(34);
var pIE = __webpack_require__(18);
var toObject = __webpack_require__(22);
var IObject = __webpack_require__(45);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(11)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(10);
var toLength = __webpack_require__(29);
var toAbsoluteIndex = __webpack_require__(72);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(30);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_es5_shim__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_es5_shim___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_es5_shim__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_polyfill__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_polyfill___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_polyfill__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_es6_promise_auto__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_es6_promise_auto___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_es6_promise_auto__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_fetch_detector__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_fetch_detector___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_fetch_detector__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_fetch_ie8__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_fetch_ie8___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_fetch_ie8__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mock__ = __webpack_require__(81);






// if (__DEV__) {
//require('./mock');
// }

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(46))(126);

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(46))(127);

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// This file can be required in Browserify and Node.js for automatic polyfill
// To use it:  require('es6-promise/auto');

module.exports = __webpack_require__(77).polyfill();


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.4+314e4831
 */

(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ES6Promise = factory());
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}



var _isArray = void 0;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = void 0;
var customSchedulerFn = void 0;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var vertx = Function('return this')().require('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = void 0;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;


  if (_state) {
    var callback = arguments[_state - 1];
    asap(function () {
      return invokeCallback(_state, child, callback, parent._result);
    });
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(2);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var TRY_CATCH_ERROR = { error: null };

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    TRY_CATCH_ERROR.error = error;
    return TRY_CATCH_ERROR;
  }
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === TRY_CATCH_ERROR) {
      reject(promise, TRY_CATCH_ERROR.error);
      TRY_CATCH_ERROR.error = null;
    } else if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;


  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = void 0,
      callback = void 0,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = void 0,
      error = void 0,
      succeeded = void 0,
      failed = void 0;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value.error = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
    resolve(promise, value);
  } else if (failed) {
    reject(promise, error);
  } else if (settled === FULFILLED) {
    fulfill(promise, value);
  } else if (settled === REJECTED) {
    reject(promise, value);
  }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

var Enumerator = function () {
  function Enumerator(Constructor, input) {
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(noop);

    if (!this.promise[PROMISE_ID]) {
      makePromise(this.promise);
    }

    if (isArray(input)) {
      this.length = input.length;
      this._remaining = input.length;

      this._result = new Array(this.length);

      if (this.length === 0) {
        fulfill(this.promise, this._result);
      } else {
        this.length = this.length || 0;
        this._enumerate(input);
        if (this._remaining === 0) {
          fulfill(this.promise, this._result);
        }
      }
    } else {
      reject(this.promise, validationError());
    }
  }

  Enumerator.prototype._enumerate = function _enumerate(input) {
    for (var i = 0; this._state === PENDING && i < input.length; i++) {
      this._eachEntry(input[i], i);
    }
  };

  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
    var c = this._instanceConstructor;
    var resolve$$1 = c.resolve;


    if (resolve$$1 === resolve$1) {
      var _then = getThen(entry);

      if (_then === then && entry._state !== PENDING) {
        this._settledAt(entry._state, i, entry._result);
      } else if (typeof _then !== 'function') {
        this._remaining--;
        this._result[i] = entry;
      } else if (c === Promise$1) {
        var promise = new c(noop);
        handleMaybeThenable(promise, entry, _then);
        this._willSettleAt(promise, i);
      } else {
        this._willSettleAt(new c(function (resolve$$1) {
          return resolve$$1(entry);
        }), i);
      }
    } else {
      this._willSettleAt(resolve$$1(entry), i);
    }
  };

  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
    var promise = this.promise;


    if (promise._state === PENDING) {
      this._remaining--;

      if (state === REJECTED) {
        reject(promise, value);
      } else {
        this._result[i] = value;
      }
    }

    if (this._remaining === 0) {
      fulfill(promise, this._result);
    }
  };

  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
    var enumerator = this;

    subscribe(promise, undefined, function (value) {
      return enumerator._settledAt(FULFILLED, i, value);
    }, function (reason) {
      return enumerator._settledAt(REJECTED, i, reason);
    });
  };

  return Enumerator;
}();

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {Function} resolver
  Useful for tooling.
  @constructor
*/

var Promise$1 = function () {
  function Promise(resolver) {
    this[PROMISE_ID] = nextId();
    this._result = this._state = undefined;
    this._subscribers = [];

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

  /**
  The primary way of interacting with a promise is through its `then` method,
  which registers callbacks to receive either a promise's eventual value or the
  reason why the promise cannot be fulfilled.
   ```js
  findUser().then(function(user){
    // user is available
  }, function(reason){
    // user is unavailable, and you are given the reason why
  });
  ```
   Chaining
  --------
   The return value of `then` is itself a promise.  This second, 'downstream'
  promise is resolved with the return value of the first promise's fulfillment
  or rejection handler, or rejected if the handler throws an exception.
   ```js
  findUser().then(function (user) {
    return user.name;
  }, function (reason) {
    return 'default name';
  }).then(function (userName) {
    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
    // will be `'default name'`
  });
   findUser().then(function (user) {
    throw new Error('Found user, but still unhappy');
  }, function (reason) {
    throw new Error('`findUser` rejected and we're unhappy');
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
  });
  ```
  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
   ```js
  findUser().then(function (user) {
    throw new PedagogicalException('Upstream error');
  }).then(function (value) {
    // never reached
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // The `PedgagocialException` is propagated all the way down to here
  });
  ```
   Assimilation
  ------------
   Sometimes the value you want to propagate to a downstream promise can only be
  retrieved asynchronously. This can be achieved by returning a promise in the
  fulfillment or rejection handler. The downstream promise will then be pending
  until the returned promise is settled. This is called *assimilation*.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // The user's comments are now available
  });
  ```
   If the assimliated promise rejects, then the downstream promise will also reject.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // If `findCommentsByAuthor` fulfills, we'll have the value here
  }, function (reason) {
    // If `findCommentsByAuthor` rejects, we'll have the reason here
  });
  ```
   Simple Example
  --------------
   Synchronous Example
   ```javascript
  let result;
   try {
    result = findResult();
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
  findResult(function(result, err){
    if (err) {
      // failure
    } else {
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findResult().then(function(result){
    // success
  }, function(reason){
    // failure
  });
  ```
   Advanced Example
  --------------
   Synchronous Example
   ```javascript
  let author, books;
   try {
    author = findAuthor();
    books  = findBooksByAuthor(author);
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
   function foundBooks(books) {
   }
   function failure(reason) {
   }
   findAuthor(function(author, err){
    if (err) {
      failure(err);
      // failure
    } else {
      try {
        findBoooksByAuthor(author, function(books, err) {
          if (err) {
            failure(err);
          } else {
            try {
              foundBooks(books);
            } catch(reason) {
              failure(reason);
            }
          }
        });
      } catch(error) {
        failure(err);
      }
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findAuthor().
    then(findBooksByAuthor).
    then(function(books){
      // found books
  }).catch(function(reason){
    // something went wrong
  });
  ```
   @method then
  @param {Function} onFulfilled
  @param {Function} onRejected
  Useful for tooling.
  @return {Promise}
  */

  /**
  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
  as the catch block of a try/catch statement.
  ```js
  function findAuthor(){
  throw new Error('couldn't find that author');
  }
  // synchronous
  try {
  findAuthor();
  } catch(reason) {
  // something went wrong
  }
  // async with promises
  findAuthor().catch(function(reason){
  // something went wrong
  });
  ```
  @method catch
  @param {Function} onRejection
  Useful for tooling.
  @return {Promise}
  */


  Promise.prototype.catch = function _catch(onRejection) {
    return this.then(null, onRejection);
  };

  /**
    `finally` will be invoked regardless of the promise's fate just as native
    try/catch/finally behaves
  
    Synchronous example:
  
    ```js
    findAuthor() {
      if (Math.random() > 0.5) {
        throw new Error();
      }
      return new Author();
    }
  
    try {
      return findAuthor(); // succeed or fail
    } catch(error) {
      return findOtherAuther();
    } finally {
      // always runs
      // doesn't affect the return value
    }
    ```
  
    Asynchronous example:
  
    ```js
    findAuthor().catch(function(reason){
      return findOtherAuther();
    }).finally(function(){
      // author was either found, or not
    });
    ```
  
    @method finally
    @param {Function} callback
    @return {Promise}
  */


  Promise.prototype.finally = function _finally(callback) {
    var promise = this;
    var constructor = promise.constructor;

    return promise.then(function (value) {
      return constructor.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      return constructor.resolve(callback()).then(function () {
        throw reason;
      });
    });
  };

  return Promise;
}();

Promise$1.prototype.then = then;
Promise$1.all = all;
Promise$1.race = race;
Promise$1.resolve = resolve$1;
Promise$1.reject = reject$1;
Promise$1._setScheduler = setScheduler;
Promise$1._setAsap = setAsap;
Promise$1._asap = asap;

/*global self*/
function polyfill() {
  var local = void 0;

  if (typeof global !== 'undefined') {
    local = global;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }

  var P = local.Promise;

  if (P) {
    var promiseToString = null;
    try {
      promiseToString = Object.prototype.toString.call(P.resolve());
    } catch (e) {
      // silently ignored
    }

    if (promiseToString === '[object Promise]' && !P.cast) {
      return;
    }
  }

  local.Promise = Promise$1;
}

// Strange compat..
Promise$1.polyfill = polyfill;
Promise$1.Promise = Promise$1;

return Promise$1;

})));



//# sourceMappingURL=es6-promise.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(78), __webpack_require__(47)))

/***/ }),
/* 78 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 79 */
/***/ (function(module, exports) {

if (navigator && navigator.userAgent) {
  // 检测浏览器版本，并设置 window.__disableNativeFetch 来决定是否开启 fetch
  var userAgent = navigator.userAgent || "";
  var appVersion = navigator.appVersion || "";
  var vendor = navigator.vendor || "";

  var ua = (userAgent + ' ' + appVersion + ' ' + vendor).toLowerCase();

  var match = /(chrome)[ \/]([\w.]+)/.exec(ua)
        || /(webkit)[ \/]([\w.]+)/.exec(ua)
        || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua)
        || /(msie) ([\w.]+)/.exec(ua)
        || /(trident)(?:.*? rv:([\w.]+)|)/.exec(ua)
        || ua.indexOf("compatible") < 0
        && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];

  var engine = match[0];
  var mainVersion = match[2].split('.')[0];

  // chrome 内核版本大于 46， firefox 版本大于39 才开启 fetch
  if (engine.indexOf('chrome') === 0 && mainVersion >= 46) {
    window.__disableNativeFetch = false;
  } else if (engine.indexOf('mozilla') === 0 && mainVersion >= 39) {
    window.__disableNativeFetch = false;
  } else {
    window.__disableNativeFetch = true;
  }
}


/***/ }),
/* 80 */
/***/ (function(module, exports) {

(function(self) {
  'use strict';

  // if __disableNativeFetch is set to true, the it will always polyfill fetch
  // with Ajax.
  if (!self.__disableNativeFetch && self.fetch) {
    return
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)

    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var list = this.map[name]
    if (!list) {
      list = []
      this.map[name] = list
    }
    list.push(value)
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    var values = this.map[normalizeName(name)]
    return values ? values[0] : null
  }

  Headers.prototype.getAll = function(name) {
    return this.map[normalizeName(name)] || []
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = [normalizeValue(value)]
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    Object.getOwnPropertyNames(this.map).forEach(function(name) {
      this.map[name].forEach(function(value) {
        callback.call(thisArg, value, name, this)
      }, this)
    }, this)
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    reader.readAsArrayBuffer(blob)
    return fileReaderReady(reader)
  }

  function readBlobAsText(blob, options) {
    var reader = new FileReader()
    var contentType = options.headers.map['content-type'] ? options.headers.map['content-type'].toString() : ''
    var regex = /charset\=[0-9a-zA-Z\-\_]*;?/
    var _charset = blob.type.match(regex) || contentType.match(regex)
    var args = [blob]

    if(_charset) {
      args.push(_charset[0].replace(/^charset\=/, '').replace(/;$/, ''))
    }

    reader.readAsText.apply(reader, args)
    return fileReaderReady(reader)
  }

  var support = {
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob();
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  function Body() {
    this.bodyUsed = false


    this._initBody = function(body, options) {
      this._bodyInit = body
      if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
        this._options = options
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (!body) {
        this._bodyText = ''
      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
        // Only support ArrayBuffers for POST method.
        // Receiving ArrayBuffers happens via Blobs, instead.
      } else {
        throw new Error('unsupported BodyInit type')
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        return this.blob().then(readBlobAsArrayBuffer)
      }

      this.text = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return readBlobAsText(this._bodyBlob, this._options)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as text')
        } else {
          return Promise.resolve(this._bodyText)
        }
      }
    } else {
      this.text = function() {
        var rejected = consumed(this)
        return rejected ? rejected : Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body
    if (Request.prototype.isPrototypeOf(input)) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = input
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body, options)
  }

  Request.prototype.clone = function() {
    return new Request(this)
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function headers(xhr) {
    var head = new Headers()
    var pairs = xhr.getAllResponseHeaders().trim().split('\n')
    pairs.forEach(function(header) {
      var split = header.trim().split(':')
      var key = split.shift().trim()
      var value = split.join(':').trim()
      head.append(key, value)
    })
    return head
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this._initBody(bodyInit, options)
    this.type = 'default'
    this.status = options.status
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = options.statusText
    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
    this.url = options.url || ''
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers;
  self.Request = Request;
  self.Response = Response;

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request
      if (Request.prototype.isPrototypeOf(input) && !init) {
        request = input
      } else {
        request = new Request(input, init)
      }

      var xhr = new XMLHttpRequest()

      function responseURL() {
        if ('responseURL' in xhr) {
          return xhr.responseURL
        }

        // Avoid security warnings on getResponseHeader when not allowed by CORS
        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
          return xhr.getResponseHeader('X-Request-URL')
        }

        return;
      }

      var __onLoadHandled = false;

      function onload() {
        if (xhr.readyState !== 4) {
          return
        }
        var status = (xhr.status === 1223) ? 204 : xhr.status
        if (status < 100 || status > 599) {
          if (__onLoadHandled) { return; } else { __onLoadHandled = true; }
          reject(new TypeError('Network request failed'))
          return
        }
        var options = {
          status: status,
          statusText: xhr.statusText,
          headers: headers(xhr),
          url: responseURL()
        }
        var body = 'response' in xhr ? xhr.response : xhr.responseText;

        if (__onLoadHandled) { return; } else { __onLoadHandled = true; }
        resolve(new Response(body, options))
      }
      xhr.onreadystatechange = onload;
      xhr.onload = onload;
      xhr.onerror = function() {
        if (__onLoadHandled) { return; } else { __onLoadHandled = true; }
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      // `withCredentials` should be setted after calling `.open` in IE10
      // http://stackoverflow.com/a/19667959/1219343
      try {
        if (request.credentials === 'include') {
          if ('withCredentials' in xhr) {
            xhr.withCredentials = true;
          } else {
            console && console.warn && console.warn('withCredentials is not supported, you can ignore this warning');
          }
        }
      } catch (e) {
        console && console.warn && console.warn('set withCredentials error:' + e);
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true

  // Support CommonJS
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = self.fetch;
  }
})(typeof self !== 'undefined' ? self : this);


/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data_region_data_js__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fetch_mock__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fetch_mock___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_fetch_mock__);



// 配置需要mock的路由
__WEBPACK_IMPORTED_MODULE_1_fetch_mock___default.a.mock('/login', function (url, opts) {
    var params = opts.params;
    if (params.account === '18512345678') {
        if (params.password === '123456') {
            return { code: 200, message: 'success' };
        } else {
            return { code: 401, message: '密码错误' };
        }
    } else {
        return { code: 400, message: '用户名错误' };
    }
});

// 获取验证token
__WEBPACK_IMPORTED_MODULE_1_fetch_mock___default.a.mock('/getMobileVerifyToken', function (url, opts) {
    return { code: 200, message: 'success', mobileVerifyToken: 'abc123456' };
});
__WEBPACK_IMPORTED_MODULE_1_fetch_mock___default.a.mock('/register/getVerifyCode', function (url, opts) {
    var params = opts.params;
    return { code: 200, message: 'success', mobile: params.mobile };
});

__WEBPACK_IMPORTED_MODULE_1_fetch_mock___default.a.mock('/register/mobile', function (url, opts) {
    var params = opts.params;
    if (params.verifyCode === '123456') {
        return { code: 200, message: 'success' };
    } else {
        return { code: 400, message: 'invalid verifyCode' };
    }
});
__WEBPACK_IMPORTED_MODULE_1_fetch_mock___default.a.mock('/register/info', { code: 200, message: 'success' });
__WEBPACK_IMPORTED_MODULE_1_fetch_mock___default.a.mock('/save-delivery', { code: 200, message: 'success' });
__WEBPACK_IMPORTED_MODULE_1_fetch_mock___default.a.mock('/del-delivery', { code: 200, message: 'success' });

// 获取省市区数据
__WEBPACK_IMPORTED_MODULE_1_fetch_mock___default.a.mock('/region-data', function (url, opts) {
    return { code: 200, message: 'success', data: __WEBPACK_IMPORTED_MODULE_0__data_region_data_js__["a" /* default */] };
});

__WEBPACK_IMPORTED_MODULE_1_fetch_mock___default.a.mock('/delivery-address', {
    code: 200,
    message: 'success',
    data: [{
        name: '张三',
        regionSting: '北京市东城区',
        regionCode: '1,1,1',
        detailAddress: '和平北街334号',
        postalcode: '100000',
        mobile: 18512567389,
        telephone: '',
        addrId: 345
    }, {
        name: '张三',
        regionSting: '北京市西城区',
        regionCode: '1,1,2',
        detailAddress: '和平西街234号',
        postalcode: '100000',
        mobile: 18512567389,
        telephone: '',
        addrId: 346
    }, {
        name: '李四',
        regionSting: '上海市静安区',
        regionCode: '9,73,723',
        detailAddress: '和平北街334号',
        postalcode: '100000',
        mobile: 18517384387,
        telephone: '',
        addrId: 347
    }]
});

__WEBPACK_IMPORTED_MODULE_1_fetch_mock___default.a.mock('/profile', {
    code: 200,
    message: 'success',
    data: {
        nickname: 'xiaoming',
        regionSting: '上海市静安区',
        regionCode: '9,73,723',
        mobile: '18567286637',
        email: 'xiaomong@163.com',
        birthday: '2017-09-06',
        realname: '李明',
        sex: 1
    }
});

__WEBPACK_IMPORTED_MODULE_1_fetch_mock___default.a.mock('/security-info', {
    code: 200,
    message: 'success',
    data: {
        nickname: 'xiaoming',
        mobile: '18567286637',
        email: 'xiaomong@163.com',
        password: 1,
        identity: 1,
        secretQuestion: 0
    }
});

__WEBPACK_IMPORTED_MODULE_1_fetch_mock___default.a.mock('/forget', function (url, opts) {
    var params = opts.params;
    if (params.verifyCode === '123456') {
        return { code: 200, message: 'success' };
    } else {
        return { code: 400, message: 'invalid verifyCode' };
    }
});

__WEBPACK_IMPORTED_MODULE_1_fetch_mock___default.a.mock('/send-forget-verifycode', {
    code: 200,
    message: 'success'
});

// // 其他路由使用原生fetch，这段代码必须放最后
__WEBPACK_IMPORTED_MODULE_1_fetch_mock___default.a.mock('*', function (url, options) {
    __WEBPACK_IMPORTED_MODULE_1_fetch_mock___default.a.restore();
    return fetch(url, options);
});

/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ([{
    id: 1,
    name: '北京',
    city: [{
        id: 1,
        name: '北京市',
        district: [{
            id: 1,
            name: '东城区'
        }, {
            id: 2,
            name: '西城区'
        }, {
            id: 3,
            name: '崇文区'
        }, {
            id: 4,
            name: '宣武区'
        }, {
            id: 5,
            name: '朝阳区'
        }, {
            id: 6,
            name: '丰台区'
        }, {
            id: 7,
            name: '石景山区'
        }, {
            id: 8,
            name: '海淀区'
        }, {
            id: 9,
            name: '门头沟区'
        }, {
            id: 10,
            name: '房山区'
        }, {
            id: 11,
            name: '通州区'
        }, {
            id: 12,
            name: '顺义区'
        }, {
            id: 13,
            name: '昌平区'
        }, {
            id: 14,
            name: '大兴区'
        }, {
            id: 15,
            name: '怀柔区'
        }, {
            id: 16,
            name: '平谷区'
        }, {
            id: 17,
            name: '密云县'
        }, {
            id: 18,
            name: '延庆县'
        }]
    }]
}, {
    id: 2,
    name: '天津',
    city: [{
        id: 2,
        name: '天津市',
        district: [{
            id: 19,
            name: '和平区'
        }, {
            id: 20,
            name: '河东区'
        }, {
            id: 21,
            name: '河西区'
        }, {
            id: 22,
            name: '南开区'
        }, {
            id: 23,
            name: '河北区'
        }, {
            id: 24,
            name: '红桥区'
        }, {
            id: 25,
            name: '塘沽区'
        }, {
            id: 26,
            name: '汉沽区'
        }, {
            id: 27,
            name: '大港区'
        }, {
            id: 28,
            name: '东丽区'
        }, {
            id: 29,
            name: '西青区'
        }, {
            id: 30,
            name: '津南区'
        }, {
            id: 31,
            name: '北辰区'
        }, {
            id: 32,
            name: '武清区'
        }, {
            id: 33,
            name: '宝坻区'
        }, {
            id: 34,
            name: '宁河县'
        }, {
            id: 35,
            name: '静海县'
        }, {
            id: 36,
            name: '蓟县'
        }]
    }]
}, {
    id: 3,
    name: '河北',
    city: [{
        id: 3,
        name: '石家庄市',
        district: [{
            id: 37,
            name: '长安区'
        }, {
            id: 38,
            name: '桥东区'
        }, {
            id: 39,
            name: '桥西区'
        }, {
            id: 40,
            name: '新华区'
        }, {
            id: 41,
            name: '井陉矿区'
        }, {
            id: 42,
            name: '裕华区'
        }, {
            id: 43,
            name: '井陉县'
        }, {
            id: 44,
            name: '正定县'
        }, {
            id: 45,
            name: '栾城县'
        }, {
            id: 46,
            name: '行唐县'
        }, {
            id: 47,
            name: '灵寿县'
        }, {
            id: 48,
            name: '高邑县'
        }, {
            id: 49,
            name: '深泽县'
        }, {
            id: 50,
            name: '赞皇县'
        }, {
            id: 51,
            name: '无极县'
        }, {
            id: 52,
            name: '平山县'
        }, {
            id: 53,
            name: '元氏县'
        }, {
            id: 54,
            name: '赵县'
        }, {
            id: 55,
            name: '辛集市'
        }, {
            id: 56,
            name: '藁城市'
        }, {
            id: 57,
            name: '晋州市'
        }, {
            id: 58,
            name: '新乐市'
        }, {
            id: 59,
            name: '鹿泉市'
        }]
    }, {
        id: 4,
        name: '唐山市',
        district: [{
            id: 60,
            name: '路南区'
        }, {
            id: 61,
            name: '路北区'
        }, {
            id: 62,
            name: '古冶区'
        }, {
            id: 63,
            name: '开平区'
        }, {
            id: 64,
            name: '丰南区'
        }, {
            id: 65,
            name: '丰润区'
        }, {
            id: 66,
            name: '滦县'
        }, {
            id: 67,
            name: '滦南县'
        }, {
            id: 68,
            name: '乐亭县'
        }, {
            id: 69,
            name: '迁西县'
        }, {
            id: 70,
            name: '玉田县'
        }, {
            id: 71,
            name: '唐海县'
        }, {
            id: 72,
            name: '遵化市'
        }, {
            id: 73,
            name: '迁安市'
        }]
    }, {
        id: 5,
        name: '秦皇岛市',
        district: [{
            id: 74,
            name: '海港区'
        }, {
            id: 75,
            name: '山海关区'
        }, {
            id: 76,
            name: '北戴河区'
        }, {
            id: 77,
            name: '青龙满族自治县'
        }, {
            id: 78,
            name: '昌黎县'
        }, {
            id: 79,
            name: '抚宁县'
        }, {
            id: 80,
            name: '卢龙县'
        }]
    }, {
        id: 6,
        name: '邯郸市',
        district: [{
            id: 81,
            name: '邯山区'
        }, {
            id: 82,
            name: '丛台区'
        }, {
            id: 83,
            name: '复兴区'
        }, {
            id: 84,
            name: '峰峰矿区'
        }, {
            id: 85,
            name: '邯郸县'
        }, {
            id: 86,
            name: '临漳县'
        }, {
            id: 87,
            name: '成安县'
        }, {
            id: 88,
            name: '大名县'
        }, {
            id: 89,
            name: '涉县'
        }, {
            id: 90,
            name: '磁县'
        }, {
            id: 91,
            name: '肥乡县'
        }, {
            id: 92,
            name: '永年县'
        }, {
            id: 93,
            name: '邱县'
        }, {
            id: 94,
            name: '鸡泽县'
        }, {
            id: 95,
            name: '广平县'
        }, {
            id: 96,
            name: '馆陶县'
        }, {
            id: 97,
            name: '魏县'
        }, {
            id: 98,
            name: '曲周县'
        }, {
            id: 99,
            name: '武安市'
        }]
    }, {
        id: 7,
        name: '邢台市',
        district: [{
            id: 100,
            name: '桥东区'
        }, {
            id: 101,
            name: '桥西区'
        }, {
            id: 102,
            name: '邢台县'
        }, {
            id: 103,
            name: '临城县'
        }, {
            id: 104,
            name: '内丘县'
        }, {
            id: 105,
            name: '柏乡县'
        }, {
            id: 106,
            name: '隆尧县'
        }, {
            id: 107,
            name: '任县'
        }, {
            id: 108,
            name: '南和县'
        }, {
            id: 109,
            name: '宁晋县'
        }, {
            id: 110,
            name: '巨鹿县'
        }, {
            id: 111,
            name: '新河县'
        }, {
            id: 112,
            name: '广宗县'
        }, {
            id: 113,
            name: '平乡县'
        }, {
            id: 114,
            name: '威县'
        }, {
            id: 115,
            name: '清河县'
        }, {
            id: 116,
            name: '临西县'
        }, {
            id: 117,
            name: '南宫市'
        }, {
            id: 118,
            name: '沙河市'
        }]
    }, {
        id: 8,
        name: '保定市',
        district: [{
            id: 119,
            name: '新市区'
        }, {
            id: 120,
            name: '北市区'
        }, {
            id: 121,
            name: '南市区'
        }, {
            id: 122,
            name: '满城县'
        }, {
            id: 123,
            name: '清苑县'
        }, {
            id: 124,
            name: '涞水县'
        }, {
            id: 125,
            name: '阜平县'
        }, {
            id: 126,
            name: '徐水县'
        }, {
            id: 127,
            name: '定兴县'
        }, {
            id: 128,
            name: '唐县'
        }, {
            id: 129,
            name: '高阳县'
        }, {
            id: 130,
            name: '容城县'
        }, {
            id: 131,
            name: '涞源县'
        }, {
            id: 132,
            name: '望都县'
        }, {
            id: 133,
            name: '安新县'
        }, {
            id: 134,
            name: '易县'
        }, {
            id: 135,
            name: '曲阳县'
        }, {
            id: 136,
            name: '蠡县'
        }, {
            id: 137,
            name: '顺平县'
        }, {
            id: 138,
            name: '博野县'
        }, {
            id: 139,
            name: '雄县'
        }, {
            id: 140,
            name: '涿州市'
        }, {
            id: 141,
            name: '定州市'
        }, {
            id: 142,
            name: '安国市'
        }, {
            id: 143,
            name: '高碑店市'
        }]
    }, {
        id: 9,
        name: '张家口市',
        district: [{
            id: 144,
            name: '桥东区'
        }, {
            id: 145,
            name: '桥西区'
        }, {
            id: 146,
            name: '宣化区'
        }, {
            id: 147,
            name: '下花园区'
        }, {
            id: 148,
            name: '宣化县'
        }, {
            id: 149,
            name: '张北县'
        }, {
            id: 150,
            name: '康保县'
        }, {
            id: 151,
            name: '沽源县'
        }, {
            id: 152,
            name: '尚义县'
        }, {
            id: 153,
            name: '蔚县'
        }, {
            id: 154,
            name: '阳原县'
        }, {
            id: 155,
            name: '怀安县'
        }, {
            id: 156,
            name: '万全县'
        }, {
            id: 157,
            name: '怀来县'
        }, {
            id: 158,
            name: '涿鹿县'
        }, {
            id: 159,
            name: '赤城县'
        }, {
            id: 160,
            name: '崇礼县'
        }]
    }, {
        id: 10,
        name: '承德市',
        district: [{
            id: 161,
            name: '双桥区'
        }, {
            id: 162,
            name: '双滦区'
        }, {
            id: 163,
            name: '鹰手营子矿区'
        }, {
            id: 164,
            name: '承德县'
        }, {
            id: 165,
            name: '兴隆县'
        }, {
            id: 166,
            name: '平泉县'
        }, {
            id: 167,
            name: '滦平县'
        }, {
            id: 168,
            name: '隆化县'
        }, {
            id: 169,
            name: '丰宁满族自治县'
        }, {
            id: 170,
            name: '宽城满族自治县'
        }, {
            id: 171,
            name: '围场满族蒙古族自治县'
        }]
    }, {
        id: 11,
        name: '沧州市',
        district: [{
            id: 172,
            name: '新华区'
        }, {
            id: 173,
            name: '运河区'
        }, {
            id: 174,
            name: '沧县'
        }, {
            id: 175,
            name: '青县'
        }, {
            id: 176,
            name: '东光县'
        }, {
            id: 177,
            name: '海兴县'
        }, {
            id: 178,
            name: '盐山县'
        }, {
            id: 179,
            name: '肃宁县'
        }, {
            id: 180,
            name: '南皮县'
        }, {
            id: 181,
            name: '吴桥县'
        }, {
            id: 182,
            name: '献县'
        }, {
            id: 183,
            name: '孟村回族自治县'
        }, {
            id: 184,
            name: '泊头市'
        }, {
            id: 185,
            name: '任丘市'
        }, {
            id: 186,
            name: '黄骅市'
        }, {
            id: 187,
            name: '河间市'
        }]
    }, {
        id: 12,
        name: '廊坊市',
        district: [{
            id: 188,
            name: '安次区'
        }, {
            id: 189,
            name: '广阳区'
        }, {
            id: 190,
            name: '固安县'
        }, {
            id: 191,
            name: '永清县'
        }, {
            id: 192,
            name: '香河县'
        }, {
            id: 193,
            name: '大城县'
        }, {
            id: 194,
            name: '文安县'
        }, {
            id: 195,
            name: '大厂回族自治县'
        }, {
            id: 196,
            name: '霸州市'
        }, {
            id: 197,
            name: '三河市'
        }]
    }, {
        id: 13,
        name: '衡水市',
        district: [{
            id: 198,
            name: '桃城区'
        }, {
            id: 199,
            name: '枣强县'
        }, {
            id: 200,
            name: '武邑县'
        }, {
            id: 201,
            name: '武强县'
        }, {
            id: 202,
            name: '饶阳县'
        }, {
            id: 203,
            name: '安平县'
        }, {
            id: 204,
            name: '故城县'
        }, {
            id: 205,
            name: '景县'
        }, {
            id: 206,
            name: '阜城县'
        }, {
            id: 207,
            name: '冀州市'
        }, {
            id: 208,
            name: '深州市'
        }]
    }]
}, {
    id: 4,
    name: '山西',
    city: [{
        id: 14,
        name: '太原市',
        district: [{
            id: 209,
            name: '小店区'
        }, {
            id: 210,
            name: '迎泽区'
        }, {
            id: 211,
            name: '杏花岭区'
        }, {
            id: 212,
            name: '尖草坪区'
        }, {
            id: 213,
            name: '万柏林区'
        }, {
            id: 214,
            name: '晋源区'
        }, {
            id: 215,
            name: '清徐县'
        }, {
            id: 216,
            name: '阳曲县'
        }, {
            id: 217,
            name: '娄烦县'
        }, {
            id: 218,
            name: '古交市'
        }]
    }, {
        id: 15,
        name: '大同市',
        district: [{
            id: 219,
            name: '城区'
        }, {
            id: 220,
            name: '矿区'
        }, {
            id: 221,
            name: '南郊区'
        }, {
            id: 222,
            name: '新荣区'
        }, {
            id: 223,
            name: '阳高县'
        }, {
            id: 224,
            name: '天镇县'
        }, {
            id: 225,
            name: '广灵县'
        }, {
            id: 226,
            name: '灵丘县'
        }, {
            id: 227,
            name: '浑源县'
        }, {
            id: 228,
            name: '左云县'
        }, {
            id: 229,
            name: '大同县'
        }]
    }, {
        id: 16,
        name: '阳泉市',
        district: [{
            id: 230,
            name: '城区'
        }, {
            id: 231,
            name: '矿区'
        }, {
            id: 232,
            name: '郊区'
        }, {
            id: 233,
            name: '平定县'
        }, {
            id: 234,
            name: '盂县'
        }]
    }, {
        id: 17,
        name: '长治市',
        district: [{
            id: 235,
            name: '城区'
        }, {
            id: 236,
            name: '郊区'
        }, {
            id: 237,
            name: '长治县'
        }, {
            id: 238,
            name: '襄垣县'
        }, {
            id: 239,
            name: '屯留县'
        }, {
            id: 240,
            name: '平顺县'
        }, {
            id: 241,
            name: '黎城县'
        }, {
            id: 242,
            name: '壶关县'
        }, {
            id: 243,
            name: '长子县'
        }, {
            id: 244,
            name: '武乡县'
        }, {
            id: 245,
            name: '沁县'
        }, {
            id: 246,
            name: '沁源县'
        }, {
            id: 247,
            name: '潞城市'
        }]
    }, {
        id: 18,
        name: '晋城市',
        district: [{
            id: 248,
            name: '城区'
        }, {
            id: 249,
            name: '沁水县'
        }, {
            id: 250,
            name: '阳城县'
        }, {
            id: 251,
            name: '陵川县'
        }, {
            id: 252,
            name: '泽州县'
        }, {
            id: 253,
            name: '高平市'
        }]
    }, {
        id: 19,
        name: '朔州市',
        district: [{
            id: 254,
            name: '朔城区'
        }, {
            id: 255,
            name: '平鲁区'
        }, {
            id: 256,
            name: '山阴县'
        }, {
            id: 257,
            name: '应县'
        }, {
            id: 258,
            name: '右玉县'
        }, {
            id: 259,
            name: '怀仁县'
        }]
    }, {
        id: 20,
        name: '晋中市',
        district: [{
            id: 260,
            name: '榆次区'
        }, {
            id: 261,
            name: '榆社县'
        }, {
            id: 262,
            name: '左权县'
        }, {
            id: 263,
            name: '和顺县'
        }, {
            id: 264,
            name: '昔阳县'
        }, {
            id: 265,
            name: '寿阳县'
        }, {
            id: 266,
            name: '太谷县'
        }, {
            id: 267,
            name: '祁县'
        }, {
            id: 268,
            name: '平遥县'
        }, {
            id: 269,
            name: '灵石县'
        }, {
            id: 270,
            name: '介休市'
        }]
    }, {
        id: 21,
        name: '运城市',
        district: [{
            id: 271,
            name: '盐湖区'
        }, {
            id: 272,
            name: '临猗县'
        }, {
            id: 273,
            name: '万荣县'
        }, {
            id: 274,
            name: '闻喜县'
        }, {
            id: 275,
            name: '稷山县'
        }, {
            id: 276,
            name: '新绛县'
        }, {
            id: 277,
            name: '绛县'
        }, {
            id: 278,
            name: '垣曲县'
        }, {
            id: 279,
            name: '夏县'
        }, {
            id: 280,
            name: '平陆县'
        }, {
            id: 281,
            name: '芮城县'
        }, {
            id: 282,
            name: '永济市'
        }, {
            id: 283,
            name: '河津市'
        }]
    }, {
        id: 22,
        name: '忻州市',
        district: [{
            id: 284,
            name: '忻府区'
        }, {
            id: 285,
            name: '定襄县'
        }, {
            id: 286,
            name: '五台县'
        }, {
            id: 287,
            name: '代县'
        }, {
            id: 288,
            name: '繁峙县'
        }, {
            id: 289,
            name: '宁武县'
        }, {
            id: 290,
            name: '静乐县'
        }, {
            id: 291,
            name: '神池县'
        }, {
            id: 292,
            name: '五寨县'
        }, {
            id: 293,
            name: '岢岚县'
        }, {
            id: 294,
            name: '河曲县'
        }, {
            id: 295,
            name: '保德县'
        }, {
            id: 296,
            name: '偏关县'
        }, {
            id: 297,
            name: '原平市'
        }]
    }, {
        id: 23,
        name: '临汾市',
        district: [{
            id: 298,
            name: '尧都区'
        }, {
            id: 299,
            name: '曲沃县'
        }, {
            id: 300,
            name: '翼城县'
        }, {
            id: 301,
            name: '襄汾县'
        }, {
            id: 302,
            name: '洪洞县'
        }, {
            id: 303,
            name: '古县'
        }, {
            id: 304,
            name: '安泽县'
        }, {
            id: 305,
            name: '浮山县'
        }, {
            id: 306,
            name: '吉县'
        }, {
            id: 307,
            name: '乡宁县'
        }, {
            id: 308,
            name: '大宁县'
        }, {
            id: 309,
            name: '隰县'
        }, {
            id: 310,
            name: '永和县'
        }, {
            id: 311,
            name: '蒲县'
        }, {
            id: 312,
            name: '汾西县'
        }, {
            id: 313,
            name: '侯马市'
        }, {
            id: 314,
            name: '霍州市'
        }]
    }, {
        id: 24,
        name: '吕梁市',
        district: [{
            id: 315,
            name: '离石区'
        }, {
            id: 316,
            name: '文水县'
        }, {
            id: 317,
            name: '交城县'
        }, {
            id: 318,
            name: '兴县'
        }, {
            id: 319,
            name: '临县'
        }, {
            id: 320,
            name: '柳林县'
        }, {
            id: 321,
            name: '石楼县'
        }, {
            id: 322,
            name: '岚县'
        }, {
            id: 323,
            name: '方山县'
        }, {
            id: 324,
            name: '中阳县'
        }, {
            id: 325,
            name: '交口县'
        }, {
            id: 326,
            name: '孝义市'
        }, {
            id: 327,
            name: '汾阳市'
        }]
    }]
}, {
    id: 5,
    name: '内蒙古',
    city: [{
        id: 25,
        name: '呼和浩特市',
        district: [{
            id: 328,
            name: '新城区'
        }, {
            id: 329,
            name: '回民区'
        }, {
            id: 330,
            name: '玉泉区'
        }, {
            id: 331,
            name: '赛罕区'
        }, {
            id: 332,
            name: '土默特左旗'
        }, {
            id: 333,
            name: '托克托县'
        }, {
            id: 334,
            name: '和林格尔县'
        }, {
            id: 335,
            name: '清水河县'
        }, {
            id: 336,
            name: '武川县'
        }]
    }, {
        id: 26,
        name: '包头市',
        district: [{
            id: 337,
            name: '东河区'
        }, {
            id: 338,
            name: '昆都仑区'
        }, {
            id: 339,
            name: '青山区'
        }, {
            id: 340,
            name: '石拐区'
        }, {
            id: 341,
            name: '白云矿区'
        }, {
            id: 342,
            name: '九原区'
        }, {
            id: 343,
            name: '土默特右旗'
        }, {
            id: 344,
            name: '固阳县'
        }, {
            id: 345,
            name: '达尔罕茂明安联合旗'
        }]
    }, {
        id: 27,
        name: '乌海市',
        district: [{
            id: 346,
            name: '海勃湾区'
        }, {
            id: 347,
            name: '海南区'
        }, {
            id: 348,
            name: '乌达区'
        }]
    }, {
        id: 28,
        name: '赤峰市',
        district: [{
            id: 349,
            name: '红山区'
        }, {
            id: 350,
            name: '元宝山区'
        }, {
            id: 351,
            name: '松山区'
        }, {
            id: 352,
            name: '阿鲁科尔沁旗'
        }, {
            id: 353,
            name: '巴林左旗'
        }, {
            id: 354,
            name: '巴林右旗'
        }, {
            id: 355,
            name: '林西县'
        }, {
            id: 356,
            name: '克什克腾旗'
        }, {
            id: 357,
            name: '翁牛特旗'
        }, {
            id: 358,
            name: '喀喇沁旗'
        }, {
            id: 359,
            name: '宁城县'
        }, {
            id: 360,
            name: '敖汉旗'
        }]
    }, {
        id: 29,
        name: '通辽市',
        district: [{
            id: 361,
            name: '科尔沁区'
        }, {
            id: 362,
            name: '科尔沁左翼中旗'
        }, {
            id: 363,
            name: '科尔沁左翼后旗'
        }, {
            id: 364,
            name: '开鲁县'
        }, {
            id: 365,
            name: '库伦旗'
        }, {
            id: 366,
            name: '奈曼旗'
        }, {
            id: 367,
            name: '扎鲁特旗'
        }, {
            id: 368,
            name: '霍林郭勒市'
        }]
    }, {
        id: 30,
        name: '鄂尔多斯市',
        district: [{
            id: 369,
            name: '东胜区'
        }, {
            id: 370,
            name: '达拉特旗'
        }, {
            id: 371,
            name: '准格尔旗'
        }, {
            id: 372,
            name: '鄂托克前旗'
        }, {
            id: 373,
            name: '鄂托克旗'
        }, {
            id: 374,
            name: '杭锦旗'
        }, {
            id: 375,
            name: '乌审旗'
        }, {
            id: 376,
            name: '伊金霍洛旗'
        }]
    }, {
        id: 31,
        name: '呼伦贝尔市',
        district: [{
            id: 377,
            name: '海拉尔区'
        }, {
            id: 378,
            name: '阿荣旗'
        }, {
            id: 379,
            name: '莫力达瓦达斡尔族自治旗'
        }, {
            id: 380,
            name: '鄂伦春自治旗'
        }, {
            id: 381,
            name: '鄂温克族自治旗'
        }, {
            id: 382,
            name: '陈巴尔虎旗'
        }, {
            id: 383,
            name: '新巴尔虎左旗'
        }, {
            id: 384,
            name: '新巴尔虎右旗'
        }, {
            id: 385,
            name: '满洲里市'
        }, {
            id: 386,
            name: '牙克石市'
        }, {
            id: 387,
            name: '扎兰屯市'
        }, {
            id: 388,
            name: '额尔古纳市'
        }, {
            id: 389,
            name: '根河市'
        }]
    }, {
        id: 32,
        name: '巴彦淖尔市',
        district: [{
            id: 390,
            name: '临河区'
        }, {
            id: 391,
            name: '五原县'
        }, {
            id: 392,
            name: '磴口县'
        }, {
            id: 393,
            name: '乌拉特前旗'
        }, {
            id: 394,
            name: '乌拉特中旗'
        }, {
            id: 395,
            name: '乌拉特后旗'
        }, {
            id: 396,
            name: '杭锦后旗'
        }]
    }, {
        id: 33,
        name: '乌兰察布市',
        district: [{
            id: 397,
            name: '集宁区'
        }, {
            id: 398,
            name: '卓资县'
        }, {
            id: 399,
            name: '化德县'
        }, {
            id: 400,
            name: '商都县'
        }, {
            id: 401,
            name: '兴和县'
        }, {
            id: 402,
            name: '凉城县'
        }, {
            id: 403,
            name: '察哈尔右翼前旗'
        }, {
            id: 404,
            name: '察哈尔右翼中旗'
        }, {
            id: 405,
            name: '察哈尔右翼后旗'
        }, {
            id: 406,
            name: '四子王旗'
        }, {
            id: 407,
            name: '丰镇市'
        }]
    }, {
        id: 34,
        name: '兴安盟',
        district: [{
            id: 408,
            name: '乌兰浩特市'
        }, {
            id: 409,
            name: '阿尔山市'
        }, {
            id: 410,
            name: '科尔沁右翼前旗'
        }, {
            id: 411,
            name: '科尔沁右翼中旗'
        }, {
            id: 412,
            name: '扎赉特旗'
        }, {
            id: 413,
            name: '突泉县'
        }]
    }, {
        id: 35,
        name: '锡林郭勒盟',
        district: [{
            id: 414,
            name: '二连浩特市'
        }, {
            id: 415,
            name: '锡林浩特市'
        }, {
            id: 416,
            name: '阿巴嘎旗'
        }, {
            id: 417,
            name: '苏尼特左旗'
        }, {
            id: 418,
            name: '苏尼特右旗'
        }, {
            id: 419,
            name: '东乌珠穆沁旗'
        }, {
            id: 420,
            name: '西乌珠穆沁旗'
        }, {
            id: 421,
            name: '太仆寺旗'
        }, {
            id: 422,
            name: '镶黄旗'
        }, {
            id: 423,
            name: '正镶白旗'
        }, {
            id: 424,
            name: '正蓝旗'
        }, {
            id: 425,
            name: '多伦县'
        }]
    }, {
        id: 36,
        name: '阿拉善盟',
        district: [{
            id: 426,
            name: '阿拉善左旗'
        }, {
            id: 427,
            name: '阿拉善右旗'
        }, {
            id: 428,
            name: '额济纳旗'
        }]
    }]
}, {
    id: 6,
    name: '辽宁',
    city: [{
        id: 37,
        name: '沈阳市',
        district: [{
            id: 429,
            name: '和平区'
        }, {
            id: 430,
            name: '沈河区'
        }, {
            id: 431,
            name: '大东区'
        }, {
            id: 432,
            name: '皇姑区'
        }, {
            id: 433,
            name: '铁西区'
        }, {
            id: 434,
            name: '苏家屯区'
        }, {
            id: 435,
            name: '东陵区'
        }, {
            id: 436,
            name: '新城子区'
        }, {
            id: 437,
            name: '于洪区'
        }, {
            id: 438,
            name: '辽中县'
        }, {
            id: 439,
            name: '康平县'
        }, {
            id: 440,
            name: '法库县'
        }, {
            id: 441,
            name: '新民市'
        }]
    }, {
        id: 38,
        name: '大连市',
        district: [{
            id: 442,
            name: '中山区'
        }, {
            id: 443,
            name: '西岗区'
        }, {
            id: 444,
            name: '沙河口区'
        }, {
            id: 445,
            name: '甘井子区'
        }, {
            id: 446,
            name: '旅顺口区'
        }, {
            id: 447,
            name: '金州区'
        }, {
            id: 448,
            name: '长海县'
        }, {
            id: 449,
            name: '瓦房店市'
        }, {
            id: 450,
            name: '普兰店市'
        }, {
            id: 451,
            name: '庄河市'
        }]
    }, {
        id: 39,
        name: '鞍山市',
        district: [{
            id: 452,
            name: '铁东区'
        }, {
            id: 453,
            name: '铁西区'
        }, {
            id: 454,
            name: '立山区'
        }, {
            id: 455,
            name: '千山区'
        }, {
            id: 456,
            name: '台安县'
        }, {
            id: 457,
            name: '岫岩满族自治县'
        }, {
            id: 458,
            name: '海城市'
        }]
    }, {
        id: 40,
        name: '抚顺市',
        district: [{
            id: 459,
            name: '新抚区'
        }, {
            id: 460,
            name: '东洲区'
        }, {
            id: 461,
            name: '望花区'
        }, {
            id: 462,
            name: '顺城区'
        }, {
            id: 463,
            name: '抚顺县'
        }, {
            id: 464,
            name: '新宾满族自治县'
        }, {
            id: 465,
            name: '清原满族自治县'
        }]
    }, {
        id: 41,
        name: '本溪市',
        district: [{
            id: 466,
            name: '平山区'
        }, {
            id: 467,
            name: '溪湖区'
        }, {
            id: 468,
            name: '明山区'
        }, {
            id: 469,
            name: '南芬区'
        }, {
            id: 470,
            name: '本溪满族自治县'
        }, {
            id: 471,
            name: '桓仁满族自治县'
        }]
    }, {
        id: 42,
        name: '丹东市',
        district: [{
            id: 472,
            name: '元宝区'
        }, {
            id: 473,
            name: '振兴区'
        }, {
            id: 474,
            name: '振安区'
        }, {
            id: 475,
            name: '宽甸满族自治县'
        }, {
            id: 476,
            name: '东港市'
        }, {
            id: 477,
            name: '凤城市'
        }]
    }, {
        id: 43,
        name: '锦州市',
        district: [{
            id: 478,
            name: '古塔区'
        }, {
            id: 479,
            name: '凌河区'
        }, {
            id: 480,
            name: '太和区'
        }, {
            id: 481,
            name: '黑山县'
        }, {
            id: 482,
            name: '义县'
        }, {
            id: 483,
            name: '凌海市'
        }, {
            id: 484,
            name: '北宁市'
        }]
    }, {
        id: 44,
        name: '营口市',
        district: [{
            id: 485,
            name: '站前区'
        }, {
            id: 486,
            name: '西市区'
        }, {
            id: 487,
            name: '鲅鱼圈区'
        }, {
            id: 488,
            name: '老边区'
        }, {
            id: 489,
            name: '盖州市'
        }, {
            id: 490,
            name: '大石桥市'
        }]
    }, {
        id: 45,
        name: '阜新市',
        district: [{
            id: 491,
            name: '海州区'
        }, {
            id: 492,
            name: '新邱区'
        }, {
            id: 493,
            name: '太平区'
        }, {
            id: 494,
            name: '清河门区'
        }, {
            id: 495,
            name: '细河区'
        }, {
            id: 496,
            name: '阜新蒙古族自治县'
        }, {
            id: 497,
            name: '彰武县'
        }]
    }, {
        id: 46,
        name: '辽阳市',
        district: [{
            id: 498,
            name: '白塔区'
        }, {
            id: 499,
            name: '文圣区'
        }, {
            id: 500,
            name: '宏伟区'
        }, {
            id: 501,
            name: '弓长岭区'
        }, {
            id: 502,
            name: '太子河区'
        }, {
            id: 503,
            name: '辽阳县'
        }, {
            id: 504,
            name: '灯塔市'
        }]
    }, {
        id: 47,
        name: '盘锦市',
        district: [{
            id: 505,
            name: '双台子区'
        }, {
            id: 506,
            name: '兴隆台区'
        }, {
            id: 507,
            name: '大洼县'
        }, {
            id: 508,
            name: '盘山县'
        }]
    }, {
        id: 48,
        name: '铁岭市',
        district: [{
            id: 509,
            name: '银州区'
        }, {
            id: 510,
            name: '清河区'
        }, {
            id: 511,
            name: '铁岭县'
        }, {
            id: 512,
            name: '西丰县'
        }, {
            id: 513,
            name: '昌图县'
        }, {
            id: 514,
            name: '调兵山市'
        }, {
            id: 515,
            name: '开原市'
        }]
    }, {
        id: 49,
        name: '朝阳市',
        district: [{
            id: 516,
            name: '双塔区'
        }, {
            id: 517,
            name: '龙城区'
        }, {
            id: 518,
            name: '朝阳县'
        }, {
            id: 519,
            name: '建平县'
        }, {
            id: 520,
            name: '喀喇沁左翼蒙古族自治县'
        }, {
            id: 521,
            name: '北票市'
        }, {
            id: 522,
            name: '凌源市'
        }]
    }, {
        id: 50,
        name: '葫芦岛市',
        district: [{
            id: 523,
            name: '连山区'
        }, {
            id: 524,
            name: '龙港区'
        }, {
            id: 525,
            name: '南票区'
        }, {
            id: 526,
            name: '绥中县'
        }, {
            id: 527,
            name: '建昌县'
        }, {
            id: 528,
            name: '兴城市'
        }]
    }]
}, {
    id: 7,
    name: '吉林',
    city: [{
        id: 51,
        name: '长春市',
        district: [{
            id: 529,
            name: '南关区'
        }, {
            id: 530,
            name: '宽城区'
        }, {
            id: 531,
            name: '朝阳区'
        }, {
            id: 532,
            name: '二道区'
        }, {
            id: 533,
            name: '绿园区'
        }, {
            id: 534,
            name: '双阳区'
        }, {
            id: 535,
            name: '农安县'
        }, {
            id: 536,
            name: '九台市'
        }, {
            id: 537,
            name: '榆树市'
        }, {
            id: 538,
            name: '德惠市'
        }]
    }, {
        id: 52,
        name: '吉林市',
        district: [{
            id: 539,
            name: '昌邑区'
        }, {
            id: 540,
            name: '龙潭区'
        }, {
            id: 541,
            name: '船营区'
        }, {
            id: 542,
            name: '丰满区'
        }, {
            id: 543,
            name: '永吉县'
        }, {
            id: 544,
            name: '蛟河市'
        }, {
            id: 545,
            name: '桦甸市'
        }, {
            id: 546,
            name: '舒兰市'
        }, {
            id: 547,
            name: '磐石市'
        }]
    }, {
        id: 53,
        name: '四平市',
        district: [{
            id: 548,
            name: '铁西区'
        }, {
            id: 549,
            name: '铁东区'
        }, {
            id: 550,
            name: '梨树县'
        }, {
            id: 551,
            name: '伊通满族自治县'
        }, {
            id: 552,
            name: '公主岭市'
        }, {
            id: 553,
            name: '双辽市'
        }]
    }, {
        id: 54,
        name: '辽源市',
        district: [{
            id: 554,
            name: '龙山区'
        }, {
            id: 555,
            name: '西安区'
        }, {
            id: 556,
            name: '东丰县'
        }, {
            id: 557,
            name: '东辽县'
        }]
    }, {
        id: 55,
        name: '通化市',
        district: [{
            id: 558,
            name: '东昌区'
        }, {
            id: 559,
            name: '二道江区'
        }, {
            id: 560,
            name: '通化县'
        }, {
            id: 561,
            name: '辉南县'
        }, {
            id: 562,
            name: '柳河县'
        }, {
            id: 563,
            name: '梅河口市'
        }, {
            id: 564,
            name: '集安市'
        }]
    }, {
        id: 56,
        name: '白山市',
        district: [{
            id: 565,
            name: '八道江区'
        }, {
            id: 566,
            name: '抚松县'
        }, {
            id: 567,
            name: '靖宇县'
        }, {
            id: 568,
            name: '长白朝鲜族自治县'
        }, {
            id: 569,
            name: '江源县'
        }, {
            id: 570,
            name: '临江市'
        }]
    }, {
        id: 57,
        name: '松原市',
        district: [{
            id: 571,
            name: '宁江区'
        }, {
            id: 572,
            name: '前郭尔罗斯蒙古族自治县'
        }, {
            id: 573,
            name: '长岭县'
        }, {
            id: 574,
            name: '乾安县'
        }, {
            id: 575,
            name: '扶余县'
        }]
    }, {
        id: 58,
        name: '白城市',
        district: [{
            id: 576,
            name: '洮北区'
        }, {
            id: 577,
            name: '镇赉县'
        }, {
            id: 578,
            name: '通榆县'
        }, {
            id: 579,
            name: '洮南市'
        }, {
            id: 580,
            name: '大安市'
        }]
    }, {
        id: 59,
        name: '延边',
        district: [{
            id: 581,
            name: '延吉市'
        }, {
            id: 582,
            name: '图们市'
        }, {
            id: 583,
            name: '敦化市'
        }, {
            id: 584,
            name: '珲春市'
        }, {
            id: 585,
            name: '龙井市'
        }, {
            id: 586,
            name: '和龙市'
        }, {
            id: 587,
            name: '汪清县'
        }, {
            id: 588,
            name: '安图县'
        }]
    }]
}, {
    id: 8,
    name: '黑龙江',
    city: [{
        id: 60,
        name: '哈尔滨市',
        district: [{
            id: 589,
            name: '道里区'
        }, {
            id: 590,
            name: '南岗区'
        }, {
            id: 591,
            name: '道外区'
        }, {
            id: 592,
            name: '香坊区'
        }, {
            id: 593,
            name: '动力区'
        }, {
            id: 594,
            name: '平房区'
        }, {
            id: 595,
            name: '松北区'
        }, {
            id: 596,
            name: '呼兰区'
        }, {
            id: 597,
            name: '依兰县'
        }, {
            id: 598,
            name: '方正县'
        }, {
            id: 599,
            name: '宾县'
        }, {
            id: 600,
            name: '巴彦县'
        }, {
            id: 601,
            name: '木兰县'
        }, {
            id: 602,
            name: '通河县'
        }, {
            id: 603,
            name: '延寿县'
        }, {
            id: 604,
            name: '阿城市'
        }, {
            id: 605,
            name: '双城市'
        }, {
            id: 606,
            name: '尚志市'
        }, {
            id: 607,
            name: '五常市'
        }]
    }, {
        id: 61,
        name: '齐齐哈尔市',
        district: [{
            id: 608,
            name: '龙沙区'
        }, {
            id: 609,
            name: '建华区'
        }, {
            id: 610,
            name: '铁锋区'
        }, {
            id: 611,
            name: '昂昂溪区'
        }, {
            id: 612,
            name: '富拉尔基区'
        }, {
            id: 613,
            name: '碾子山区'
        }, {
            id: 614,
            name: '梅里斯达斡尔族区'
        }, {
            id: 615,
            name: '龙江县'
        }, {
            id: 616,
            name: '依安县'
        }, {
            id: 617,
            name: '泰来县'
        }, {
            id: 618,
            name: '甘南县'
        }, {
            id: 619,
            name: '富裕县'
        }, {
            id: 620,
            name: '克山县'
        }, {
            id: 621,
            name: '克东县'
        }, {
            id: 622,
            name: '拜泉县'
        }, {
            id: 623,
            name: '讷河市'
        }]
    }, {
        id: 62,
        name: '鸡西市',
        district: [{
            id: 624,
            name: '鸡冠区'
        }, {
            id: 625,
            name: '恒山区'
        }, {
            id: 626,
            name: '滴道区'
        }, {
            id: 627,
            name: '梨树区'
        }, {
            id: 628,
            name: '城子河区'
        }, {
            id: 629,
            name: '麻山区'
        }, {
            id: 630,
            name: '鸡东县'
        }, {
            id: 631,
            name: '虎林市'
        }, {
            id: 632,
            name: '密山市'
        }]
    }, {
        id: 63,
        name: '鹤岗市',
        district: [{
            id: 633,
            name: '向阳区'
        }, {
            id: 634,
            name: '工农区'
        }, {
            id: 635,
            name: '南山区'
        }, {
            id: 636,
            name: '兴安区'
        }, {
            id: 637,
            name: '东山区'
        }, {
            id: 638,
            name: '兴山区'
        }, {
            id: 639,
            name: '萝北县'
        }, {
            id: 640,
            name: '绥滨县'
        }]
    }, {
        id: 64,
        name: '双鸭山市',
        district: [{
            id: 641,
            name: '尖山区'
        }, {
            id: 642,
            name: '岭东区'
        }, {
            id: 643,
            name: '四方台区'
        }, {
            id: 644,
            name: '宝山区'
        }, {
            id: 645,
            name: '集贤县'
        }, {
            id: 646,
            name: '友谊县'
        }, {
            id: 647,
            name: '宝清县'
        }, {
            id: 648,
            name: '饶河县'
        }]
    }, {
        id: 65,
        name: '大庆市',
        district: [{
            id: 649,
            name: '萨尔图区'
        }, {
            id: 650,
            name: '龙凤区'
        }, {
            id: 651,
            name: '让胡路区'
        }, {
            id: 652,
            name: '红岗区'
        }, {
            id: 653,
            name: '大同区'
        }, {
            id: 654,
            name: '肇州县'
        }, {
            id: 655,
            name: '肇源县'
        }, {
            id: 656,
            name: '林甸县'
        }, {
            id: 657,
            name: '杜尔伯特蒙古族自治县'
        }]
    }, {
        id: 66,
        name: '伊春市',
        district: [{
            id: 658,
            name: '伊春区'
        }, {
            id: 659,
            name: '南岔区'
        }, {
            id: 660,
            name: '友好区'
        }, {
            id: 661,
            name: '西林区'
        }, {
            id: 662,
            name: '翠峦区'
        }, {
            id: 663,
            name: '新青区'
        }, {
            id: 664,
            name: '美溪区'
        }, {
            id: 665,
            name: '金山屯区'
        }, {
            id: 666,
            name: '五营区'
        }, {
            id: 667,
            name: '乌马河区'
        }, {
            id: 668,
            name: '汤旺河区'
        }, {
            id: 669,
            name: '带岭区'
        }, {
            id: 670,
            name: '乌伊岭区'
        }, {
            id: 671,
            name: '红星区'
        }, {
            id: 672,
            name: '上甘岭区'
        }, {
            id: 673,
            name: '嘉荫县'
        }, {
            id: 674,
            name: '铁力市'
        }]
    }, {
        id: 67,
        name: '佳木斯市',
        district: [{
            id: 675,
            name: '永红区'
        }, {
            id: 676,
            name: '向阳区'
        }, {
            id: 677,
            name: '前进区'
        }, {
            id: 678,
            name: '东风区'
        }, {
            id: 679,
            name: '郊区'
        }, {
            id: 680,
            name: '桦南县'
        }, {
            id: 681,
            name: '桦川县'
        }, {
            id: 682,
            name: '汤原县'
        }, {
            id: 683,
            name: '抚远县'
        }, {
            id: 684,
            name: '同江市'
        }, {
            id: 685,
            name: '富锦市'
        }]
    }, {
        id: 68,
        name: '七台河市',
        district: [{
            id: 686,
            name: '新兴区'
        }, {
            id: 687,
            name: '桃山区'
        }, {
            id: 688,
            name: '茄子河区'
        }, {
            id: 689,
            name: '勃利县'
        }]
    }, {
        id: 69,
        name: '牡丹江市',
        district: [{
            id: 690,
            name: '东安区'
        }, {
            id: 691,
            name: '阳明区'
        }, {
            id: 692,
            name: '爱民区'
        }, {
            id: 693,
            name: '西安区'
        }, {
            id: 694,
            name: '东宁县'
        }, {
            id: 695,
            name: '林口县'
        }, {
            id: 696,
            name: '绥芬河市'
        }, {
            id: 697,
            name: '海林市'
        }, {
            id: 698,
            name: '宁安市'
        }, {
            id: 699,
            name: '穆棱市'
        }]
    }, {
        id: 70,
        name: '黑河市',
        district: [{
            id: 700,
            name: '爱辉区'
        }, {
            id: 701,
            name: '嫩江县'
        }, {
            id: 702,
            name: '逊克县'
        }, {
            id: 703,
            name: '孙吴县'
        }, {
            id: 704,
            name: '北安市'
        }, {
            id: 705,
            name: '五大连池市'
        }]
    }, {
        id: 71,
        name: '绥化市',
        district: [{
            id: 706,
            name: '北林区'
        }, {
            id: 707,
            name: '望奎县'
        }, {
            id: 708,
            name: '兰西县'
        }, {
            id: 709,
            name: '青冈县'
        }, {
            id: 710,
            name: '庆安县'
        }, {
            id: 711,
            name: '明水县'
        }, {
            id: 712,
            name: '绥棱县'
        }, {
            id: 713,
            name: '安达市'
        }, {
            id: 714,
            name: '肇东市'
        }, {
            id: 715,
            name: '海伦市'
        }]
    }, {
        id: 72,
        name: '大兴安岭地区',
        district: [{
            id: 716,
            name: '呼玛县'
        }, {
            id: 717,
            name: '塔河县'
        }, {
            id: 718,
            name: '漠河县'
        }]
    }]
}, {
    id: 9,
    name: '上海',
    city: [{
        id: 73,
        name: '上海市',
        district: [{
            id: 719,
            name: '黄浦区'
        }, {
            id: 720,
            name: '卢湾区'
        }, {
            id: 721,
            name: '徐汇区'
        }, {
            id: 722,
            name: '长宁区'
        }, {
            id: 723,
            name: '静安区'
        }, {
            id: 724,
            name: '普陀区'
        }, {
            id: 725,
            name: '闸北区'
        }, {
            id: 726,
            name: '虹口区'
        }, {
            id: 727,
            name: '杨浦区'
        }, {
            id: 728,
            name: '闵行区'
        }, {
            id: 729,
            name: '宝山区'
        }, {
            id: 730,
            name: '嘉定区'
        }, {
            id: 731,
            name: '浦东新区'
        }, {
            id: 732,
            name: '金山区'
        }, {
            id: 733,
            name: '松江区'
        }, {
            id: 734,
            name: '青浦区'
        }, {
            id: 735,
            name: '南汇区'
        }, {
            id: 736,
            name: '奉贤区'
        }, {
            id: 737,
            name: '崇明县'
        }]
    }]
}, {
    id: 10,
    name: '江苏',
    city: [{
        id: 74,
        name: '南京市',
        district: [{
            id: 738,
            name: '玄武区'
        }, {
            id: 739,
            name: '白下区'
        }, {
            id: 740,
            name: '秦淮区'
        }, {
            id: 741,
            name: '建邺区'
        }, {
            id: 742,
            name: '鼓楼区'
        }, {
            id: 743,
            name: '下关区'
        }, {
            id: 744,
            name: '浦口区'
        }, {
            id: 745,
            name: '栖霞区'
        }, {
            id: 746,
            name: '雨花台区'
        }, {
            id: 747,
            name: '江宁区'
        }, {
            id: 748,
            name: '六合区'
        }, {
            id: 749,
            name: '溧水县'
        }, {
            id: 750,
            name: '高淳县'
        }]
    }, {
        id: 75,
        name: '无锡市',
        district: [{
            id: 751,
            name: '崇安区'
        }, {
            id: 752,
            name: '南长区'
        }, {
            id: 753,
            name: '北塘区'
        }, {
            id: 754,
            name: '锡山区'
        }, {
            id: 755,
            name: '惠山区'
        }, {
            id: 756,
            name: '滨湖区'
        }, {
            id: 757,
            name: '江阴市'
        }, {
            id: 758,
            name: '宜兴市'
        }]
    }, {
        id: 76,
        name: '徐州市',
        district: [{
            id: 759,
            name: '鼓楼区'
        }, {
            id: 760,
            name: '云龙区'
        }, {
            id: 761,
            name: '九里区'
        }, {
            id: 762,
            name: '贾汪区'
        }, {
            id: 763,
            name: '泉山区'
        }, {
            id: 764,
            name: '丰县'
        }, {
            id: 765,
            name: '沛县'
        }, {
            id: 766,
            name: '铜山县'
        }, {
            id: 767,
            name: '睢宁县'
        }, {
            id: 768,
            name: '新沂市'
        }, {
            id: 769,
            name: '邳州市'
        }]
    }, {
        id: 77,
        name: '常州市',
        district: [{
            id: 770,
            name: '天宁区'
        }, {
            id: 771,
            name: '钟楼区'
        }, {
            id: 772,
            name: '戚墅堰区'
        }, {
            id: 773,
            name: '新北区'
        }, {
            id: 774,
            name: '武进区'
        }, {
            id: 775,
            name: '溧阳市'
        }, {
            id: 776,
            name: '金坛市'
        }]
    }, {
        id: 78,
        name: '苏州市',
        district: [{
            id: 777,
            name: '沧浪区'
        }, {
            id: 778,
            name: '平江区'
        }, {
            id: 779,
            name: '金阊区'
        }, {
            id: 780,
            name: '虎丘区'
        }, {
            id: 781,
            name: '吴中区'
        }, {
            id: 782,
            name: '相城区'
        }, {
            id: 783,
            name: '常熟市'
        }, {
            id: 784,
            name: '张家港市'
        }, {
            id: 785,
            name: '昆山市'
        }, {
            id: 786,
            name: '吴江市'
        }, {
            id: 787,
            name: '太仓市'
        }]
    }, {
        id: 79,
        name: '南通市',
        district: [{
            id: 788,
            name: '崇川区'
        }, {
            id: 789,
            name: '港闸区'
        }, {
            id: 790,
            name: '海安县'
        }, {
            id: 791,
            name: '如东县'
        }, {
            id: 792,
            name: '启东市'
        }, {
            id: 793,
            name: '如皋市'
        }, {
            id: 794,
            name: '通州市'
        }, {
            id: 795,
            name: '海门市'
        }]
    }, {
        id: 80,
        name: '连云港市',
        district: [{
            id: 796,
            name: '连云区'
        }, {
            id: 797,
            name: '新浦区'
        }, {
            id: 798,
            name: '海州区'
        }, {
            id: 799,
            name: '赣榆县'
        }, {
            id: 800,
            name: '东海县'
        }, {
            id: 801,
            name: '灌云县'
        }, {
            id: 802,
            name: '灌南县'
        }]
    }, {
        id: 81,
        name: '淮安市',
        district: [{
            id: 803,
            name: '清河区'
        }, {
            id: 804,
            name: '楚州区'
        }, {
            id: 805,
            name: '淮阴区'
        }, {
            id: 806,
            name: '清浦区'
        }, {
            id: 807,
            name: '涟水县'
        }, {
            id: 808,
            name: '洪泽县'
        }, {
            id: 809,
            name: '盱眙县'
        }, {
            id: 810,
            name: '金湖县'
        }]
    }, {
        id: 82,
        name: '盐城市',
        district: [{
            id: 811,
            name: '亭湖区'
        }, {
            id: 812,
            name: '盐都区'
        }, {
            id: 813,
            name: '响水县'
        }, {
            id: 814,
            name: '滨海县'
        }, {
            id: 815,
            name: '阜宁县'
        }, {
            id: 816,
            name: '射阳县'
        }, {
            id: 817,
            name: '建湖县'
        }, {
            id: 818,
            name: '东台市'
        }, {
            id: 819,
            name: '大丰市'
        }]
    }, {
        id: 83,
        name: '扬州市',
        district: [{
            id: 820,
            name: '广陵区'
        }, {
            id: 821,
            name: '邗江区'
        }, {
            id: 822,
            name: '维扬区'
        }, {
            id: 823,
            name: '宝应县'
        }, {
            id: 824,
            name: '仪征市'
        }, {
            id: 825,
            name: '高邮市'
        }, {
            id: 826,
            name: '江都市'
        }]
    }, {
        id: 84,
        name: '镇江市',
        district: [{
            id: 827,
            name: '京口区'
        }, {
            id: 828,
            name: '润州区'
        }, {
            id: 829,
            name: '丹徒区'
        }, {
            id: 830,
            name: '丹阳市'
        }, {
            id: 831,
            name: '扬中市'
        }, {
            id: 832,
            name: '句容市'
        }]
    }, {
        id: 85,
        name: '泰州市',
        district: [{
            id: 833,
            name: '海陵区'
        }, {
            id: 834,
            name: '高港区'
        }, {
            id: 835,
            name: '兴化市'
        }, {
            id: 836,
            name: '靖江市'
        }, {
            id: 837,
            name: '泰兴市'
        }, {
            id: 838,
            name: '姜堰市'
        }]
    }, {
        id: 86,
        name: '宿迁市',
        district: [{
            id: 839,
            name: '宿城区'
        }, {
            id: 840,
            name: '宿豫区'
        }, {
            id: 841,
            name: '沭阳县'
        }, {
            id: 842,
            name: '泗阳县'
        }, {
            id: 843,
            name: '泗洪县'
        }]
    }]
}, {
    id: 11,
    name: '浙江',
    city: [{
        id: 87,
        name: '杭州市',
        district: [{
            id: 844,
            name: '上城区'
        }, {
            id: 845,
            name: '下城区'
        }, {
            id: 846,
            name: '江干区'
        }, {
            id: 847,
            name: '拱墅区'
        }, {
            id: 848,
            name: '西湖区'
        }, {
            id: 849,
            name: '滨江区'
        }, {
            id: 850,
            name: '萧山区'
        }, {
            id: 851,
            name: '余杭区'
        }, {
            id: 852,
            name: '桐庐县'
        }, {
            id: 853,
            name: '淳安县'
        }, {
            id: 854,
            name: '建德市'
        }, {
            id: 855,
            name: '富阳市'
        }, {
            id: 856,
            name: '临安市'
        }]
    }, {
        id: 88,
        name: '宁波市',
        district: [{
            id: 857,
            name: '海曙区'
        }, {
            id: 858,
            name: '江东区'
        }, {
            id: 859,
            name: '江北区'
        }, {
            id: 860,
            name: '北仑区'
        }, {
            id: 861,
            name: '镇海区'
        }, {
            id: 862,
            name: '鄞州区'
        }, {
            id: 863,
            name: '象山县'
        }, {
            id: 864,
            name: '宁海县'
        }, {
            id: 865,
            name: '余姚市'
        }, {
            id: 866,
            name: '慈溪市'
        }, {
            id: 867,
            name: '奉化市'
        }]
    }, {
        id: 89,
        name: '温州市',
        district: [{
            id: 868,
            name: '鹿城区'
        }, {
            id: 869,
            name: '龙湾区'
        }, {
            id: 870,
            name: '瓯海区'
        }, {
            id: 871,
            name: '洞头县'
        }, {
            id: 872,
            name: '永嘉县'
        }, {
            id: 873,
            name: '平阳县'
        }, {
            id: 874,
            name: '苍南县'
        }, {
            id: 875,
            name: '文成县'
        }, {
            id: 876,
            name: '泰顺县'
        }, {
            id: 877,
            name: '瑞安市'
        }, {
            id: 878,
            name: '乐清市'
        }]
    }, {
        id: 90,
        name: '嘉兴市',
        district: [{
            id: 879,
            name: '秀城区'
        }, {
            id: 880,
            name: '秀洲区'
        }, {
            id: 881,
            name: '嘉善县'
        }, {
            id: 882,
            name: '海盐县'
        }, {
            id: 883,
            name: '海宁市'
        }, {
            id: 884,
            name: '平湖市'
        }, {
            id: 885,
            name: '桐乡市'
        }]
    }, {
        id: 91,
        name: '湖州市',
        district: [{
            id: 886,
            name: '吴兴区'
        }, {
            id: 887,
            name: '南浔区'
        }, {
            id: 888,
            name: '德清县'
        }, {
            id: 889,
            name: '长兴县'
        }, {
            id: 890,
            name: '安吉县'
        }]
    }, {
        id: 92,
        name: '绍兴市',
        district: [{
            id: 891,
            name: '越城区'
        }, {
            id: 892,
            name: '绍兴县'
        }, {
            id: 893,
            name: '新昌县'
        }, {
            id: 894,
            name: '诸暨市'
        }, {
            id: 895,
            name: '上虞市'
        }, {
            id: 896,
            name: '嵊州市'
        }]
    }, {
        id: 93,
        name: '金华市',
        district: [{
            id: 897,
            name: '婺城区'
        }, {
            id: 898,
            name: '金东区'
        }, {
            id: 899,
            name: '武义县'
        }, {
            id: 900,
            name: '浦江县'
        }, {
            id: 901,
            name: '磐安县'
        }, {
            id: 902,
            name: '兰溪市'
        }, {
            id: 903,
            name: '义乌市'
        }, {
            id: 904,
            name: '东阳市'
        }, {
            id: 905,
            name: '永康市'
        }]
    }, {
        id: 94,
        name: '衢州市',
        district: [{
            id: 906,
            name: '柯城区'
        }, {
            id: 907,
            name: '衢江区'
        }, {
            id: 908,
            name: '常山县'
        }, {
            id: 909,
            name: '开化县'
        }, {
            id: 910,
            name: '龙游县'
        }, {
            id: 911,
            name: '江山市'
        }]
    }, {
        id: 95,
        name: '舟山市',
        district: [{
            id: 912,
            name: '定海区'
        }, {
            id: 913,
            name: '普陀区'
        }, {
            id: 914,
            name: '岱山县'
        }, {
            id: 915,
            name: '嵊泗县'
        }]
    }, {
        id: 96,
        name: '台州市',
        district: [{
            id: 916,
            name: '椒江区'
        }, {
            id: 917,
            name: '黄岩区'
        }, {
            id: 918,
            name: '路桥区'
        }, {
            id: 919,
            name: '玉环县'
        }, {
            id: 920,
            name: '三门县'
        }, {
            id: 921,
            name: '天台县'
        }, {
            id: 922,
            name: '仙居县'
        }, {
            id: 923,
            name: '温岭市'
        }, {
            id: 924,
            name: '临海市'
        }]
    }, {
        id: 97,
        name: '丽水市',
        district: [{
            id: 925,
            name: '莲都区'
        }, {
            id: 926,
            name: '青田县'
        }, {
            id: 927,
            name: '缙云县'
        }, {
            id: 928,
            name: '遂昌县'
        }, {
            id: 929,
            name: '松阳县'
        }, {
            id: 930,
            name: '云和县'
        }, {
            id: 931,
            name: '庆元县'
        }, {
            id: 932,
            name: '景宁畲族自治县'
        }, {
            id: 933,
            name: '龙泉市'
        }]
    }]
}, {
    id: 12,
    name: '安徽',
    city: [{
        id: 98,
        name: '合肥市',
        district: [{
            id: 934,
            name: '瑶海区'
        }, {
            id: 935,
            name: '庐阳区'
        }, {
            id: 936,
            name: '蜀山区'
        }, {
            id: 937,
            name: '包河区'
        }, {
            id: 938,
            name: '长丰县'
        }, {
            id: 939,
            name: '肥东县'
        }, {
            id: 940,
            name: '肥西县'
        }]
    }, {
        id: 99,
        name: '芜湖市',
        district: [{
            id: 941,
            name: '镜湖区'
        }, {
            id: 942,
            name: '马塘区'
        }, {
            id: 943,
            name: '新芜区'
        }, {
            id: 944,
            name: '鸠江区'
        }, {
            id: 945,
            name: '芜湖县'
        }, {
            id: 946,
            name: '繁昌县'
        }, {
            id: 947,
            name: '南陵县'
        }]
    }, {
        id: 100,
        name: '蚌埠市',
        district: [{
            id: 948,
            name: '龙子湖区'
        }, {
            id: 949,
            name: '蚌山区'
        }, {
            id: 950,
            name: '禹会区'
        }, {
            id: 951,
            name: '淮上区'
        }, {
            id: 952,
            name: '怀远县'
        }, {
            id: 953,
            name: '五河县'
        }, {
            id: 954,
            name: '固镇县'
        }]
    }, {
        id: 101,
        name: '淮南市',
        district: [{
            id: 955,
            name: '大通区'
        }, {
            id: 956,
            name: '田家庵区'
        }, {
            id: 957,
            name: '谢家集区'
        }, {
            id: 958,
            name: '八公山区'
        }, {
            id: 959,
            name: '潘集区'
        }, {
            id: 960,
            name: '凤台县'
        }]
    }, {
        id: 102,
        name: '马鞍山市',
        district: [{
            id: 961,
            name: '金家庄区'
        }, {
            id: 962,
            name: '花山区'
        }, {
            id: 963,
            name: '雨山区'
        }, {
            id: 964,
            name: '当涂县'
        }]
    }, {
        id: 103,
        name: '淮北市',
        district: [{
            id: 965,
            name: '杜集区'
        }, {
            id: 966,
            name: '相山区'
        }, {
            id: 967,
            name: '烈山区'
        }, {
            id: 968,
            name: '濉溪县'
        }]
    }, {
        id: 104,
        name: '铜陵市',
        district: [{
            id: 969,
            name: '铜官山区'
        }, {
            id: 970,
            name: '狮子山区'
        }, {
            id: 971,
            name: '郊区'
        }, {
            id: 972,
            name: '铜陵县'
        }]
    }, {
        id: 105,
        name: '安庆市',
        district: [{
            id: 973,
            name: '迎江区'
        }, {
            id: 974,
            name: '大观区'
        }, {
            id: 975,
            name: '郊区'
        }, {
            id: 976,
            name: '怀宁县'
        }, {
            id: 977,
            name: '枞阳县'
        }, {
            id: 978,
            name: '潜山县'
        }, {
            id: 979,
            name: '太湖县'
        }, {
            id: 980,
            name: '宿松县'
        }, {
            id: 981,
            name: '望江县'
        }, {
            id: 982,
            name: '岳西县'
        }, {
            id: 983,
            name: '桐城市'
        }]
    }, {
        id: 106,
        name: '黄山市',
        district: [{
            id: 984,
            name: '屯溪区'
        }, {
            id: 985,
            name: '黄山区'
        }, {
            id: 986,
            name: '徽州区'
        }, {
            id: 987,
            name: '歙县'
        }, {
            id: 988,
            name: '休宁县'
        }, {
            id: 989,
            name: '黟县'
        }, {
            id: 990,
            name: '祁门县'
        }]
    }, {
        id: 107,
        name: '滁州市',
        district: [{
            id: 991,
            name: '琅琊区'
        }, {
            id: 992,
            name: '南谯区'
        }, {
            id: 993,
            name: '来安县'
        }, {
            id: 994,
            name: '全椒县'
        }, {
            id: 995,
            name: '定远县'
        }, {
            id: 996,
            name: '凤阳县'
        }, {
            id: 997,
            name: '天长市'
        }, {
            id: 998,
            name: '明光市'
        }]
    }, {
        id: 108,
        name: '阜阳市',
        district: [{
            id: 999,
            name: '颍州区'
        }, {
            id: 1000,
            name: '颍东区'
        }, {
            id: 1001,
            name: '颍泉区'
        }, {
            id: 1002,
            name: '临泉县'
        }, {
            id: 1003,
            name: '太和县'
        }, {
            id: 1004,
            name: '阜南县'
        }, {
            id: 1005,
            name: '颍上县'
        }, {
            id: 1006,
            name: '界首市'
        }]
    }, {
        id: 109,
        name: '宿州市',
        district: [{
            id: 1007,
            name: '埇桥区'
        }, {
            id: 1008,
            name: '砀山县'
        }, {
            id: 1009,
            name: '萧县'
        }, {
            id: 1010,
            name: '灵璧县'
        }, {
            id: 1011,
            name: '泗县'
        }]
    }, {
        id: 110,
        name: '巢湖市',
        district: [{
            id: 1012,
            name: '居巢区'
        }, {
            id: 1013,
            name: '庐江县'
        }, {
            id: 1014,
            name: '无为县'
        }, {
            id: 1015,
            name: '含山县'
        }, {
            id: 1016,
            name: '和县'
        }]
    }, {
        id: 111,
        name: '六安市',
        district: [{
            id: 1017,
            name: '金安区'
        }, {
            id: 1018,
            name: '裕安区'
        }, {
            id: 1019,
            name: '寿县'
        }, {
            id: 1020,
            name: '霍邱县'
        }, {
            id: 1021,
            name: '舒城县'
        }, {
            id: 1022,
            name: '金寨县'
        }, {
            id: 1023,
            name: '霍山县'
        }]
    }, {
        id: 112,
        name: '亳州市',
        district: [{
            id: 1024,
            name: '谯城区'
        }, {
            id: 1025,
            name: '涡阳县'
        }, {
            id: 1026,
            name: '蒙城县'
        }, {
            id: 1027,
            name: '利辛县'
        }]
    }, {
        id: 113,
        name: '池州市',
        district: [{
            id: 1028,
            name: '贵池区'
        }, {
            id: 1029,
            name: '东至县'
        }, {
            id: 1030,
            name: '石台县'
        }, {
            id: 1031,
            name: '青阳县'
        }]
    }, {
        id: 114,
        name: '宣城市',
        district: [{
            id: 1032,
            name: '宣州区'
        }, {
            id: 1033,
            name: '郎溪县'
        }, {
            id: 1034,
            name: '广德县'
        }, {
            id: 1035,
            name: '泾县'
        }, {
            id: 1036,
            name: '绩溪县'
        }, {
            id: 1037,
            name: '旌德县'
        }, {
            id: 1038,
            name: '宁国市'
        }]
    }]
}, {
    id: 13,
    name: '福建',
    city: [{
        id: 115,
        name: '福州市',
        district: [{
            id: 1039,
            name: '鼓楼区'
        }, {
            id: 1040,
            name: '台江区'
        }, {
            id: 1041,
            name: '仓山区'
        }, {
            id: 1042,
            name: '马尾区'
        }, {
            id: 1043,
            name: '晋安区'
        }, {
            id: 1044,
            name: '闽侯县'
        }, {
            id: 1045,
            name: '连江县'
        }, {
            id: 1046,
            name: '罗源县'
        }, {
            id: 1047,
            name: '闽清县'
        }, {
            id: 1048,
            name: '永泰县'
        }, {
            id: 1049,
            name: '平潭县'
        }, {
            id: 1050,
            name: '福清市'
        }, {
            id: 1051,
            name: '长乐市'
        }]
    }, {
        id: 116,
        name: '厦门市',
        district: [{
            id: 1052,
            name: '思明区'
        }, {
            id: 1053,
            name: '海沧区'
        }, {
            id: 1054,
            name: '湖里区'
        }, {
            id: 1055,
            name: '集美区'
        }, {
            id: 1056,
            name: '同安区'
        }, {
            id: 1057,
            name: '翔安区'
        }]
    }, {
        id: 117,
        name: '莆田市',
        district: [{
            id: 1058,
            name: '城厢区'
        }, {
            id: 1059,
            name: '涵江区'
        }, {
            id: 1060,
            name: '荔城区'
        }, {
            id: 1061,
            name: '秀屿区'
        }, {
            id: 1062,
            name: '仙游县'
        }]
    }, {
        id: 118,
        name: '三明市',
        district: [{
            id: 1063,
            name: '梅列区'
        }, {
            id: 1064,
            name: '三元区'
        }, {
            id: 1065,
            name: '明溪县'
        }, {
            id: 1066,
            name: '清流县'
        }, {
            id: 1067,
            name: '宁化县'
        }, {
            id: 1068,
            name: '大田县'
        }, {
            id: 1069,
            name: '尤溪县'
        }, {
            id: 1070,
            name: '沙县'
        }, {
            id: 1071,
            name: '将乐县'
        }, {
            id: 1072,
            name: '泰宁县'
        }, {
            id: 1073,
            name: '建宁县'
        }, {
            id: 1074,
            name: '永安市'
        }]
    }, {
        id: 119,
        name: '泉州市',
        district: [{
            id: 1075,
            name: '鲤城区'
        }, {
            id: 1076,
            name: '丰泽区'
        }, {
            id: 1077,
            name: '洛江区'
        }, {
            id: 1078,
            name: '泉港区'
        }, {
            id: 1079,
            name: '惠安县'
        }, {
            id: 1080,
            name: '安溪县'
        }, {
            id: 1081,
            name: '永春县'
        }, {
            id: 1082,
            name: '德化县'
        }, {
            id: 1083,
            name: '金门县'
        }, {
            id: 1084,
            name: '石狮市'
        }, {
            id: 1085,
            name: '晋江市'
        }, {
            id: 1086,
            name: '南安市'
        }]
    }, {
        id: 120,
        name: '漳州市',
        district: [{
            id: 1087,
            name: '芗城区'
        }, {
            id: 1088,
            name: '龙文区'
        }, {
            id: 1089,
            name: '云霄县'
        }, {
            id: 1090,
            name: '漳浦县'
        }, {
            id: 1091,
            name: '诏安县'
        }, {
            id: 1092,
            name: '长泰县'
        }, {
            id: 1093,
            name: '东山县'
        }, {
            id: 1094,
            name: '南靖县'
        }, {
            id: 1095,
            name: '平和县'
        }, {
            id: 1096,
            name: '华安县'
        }, {
            id: 1097,
            name: '龙海市'
        }]
    }, {
        id: 121,
        name: '南平市',
        district: [{
            id: 1098,
            name: '延平区'
        }, {
            id: 1099,
            name: '顺昌县'
        }, {
            id: 1100,
            name: '浦城县'
        }, {
            id: 1101,
            name: '光泽县'
        }, {
            id: 1102,
            name: '松溪县'
        }, {
            id: 1103,
            name: '政和县'
        }, {
            id: 1104,
            name: '邵武市'
        }, {
            id: 1105,
            name: '武夷山市'
        }, {
            id: 1106,
            name: '建瓯市'
        }, {
            id: 1107,
            name: '建阳市'
        }]
    }, {
        id: 122,
        name: '龙岩市',
        district: [{
            id: 1108,
            name: '新罗区'
        }, {
            id: 1109,
            name: '长汀县'
        }, {
            id: 1110,
            name: '永定县'
        }, {
            id: 1111,
            name: '上杭县'
        }, {
            id: 1112,
            name: '武平县'
        }, {
            id: 1113,
            name: '连城县'
        }, {
            id: 1114,
            name: '漳平市'
        }]
    }, {
        id: 123,
        name: '宁德市',
        district: [{
            id: 1115,
            name: '蕉城区'
        }, {
            id: 1116,
            name: '霞浦县'
        }, {
            id: 1117,
            name: '古田县'
        }, {
            id: 1118,
            name: '屏南县'
        }, {
            id: 1119,
            name: '寿宁县'
        }, {
            id: 1120,
            name: '周宁县'
        }, {
            id: 1121,
            name: '柘荣县'
        }, {
            id: 1122,
            name: '福安市'
        }, {
            id: 1123,
            name: '福鼎市'
        }]
    }]
}, {
    id: 14,
    name: '江西',
    city: [{
        id: 124,
        name: '南昌市',
        district: [{
            id: 1124,
            name: '东湖区'
        }, {
            id: 1125,
            name: '西湖区'
        }, {
            id: 1126,
            name: '青云谱区'
        }, {
            id: 1127,
            name: '湾里区'
        }, {
            id: 1128,
            name: '青山湖区'
        }, {
            id: 1129,
            name: '南昌县'
        }, {
            id: 1130,
            name: '新建县'
        }, {
            id: 1131,
            name: '安义县'
        }, {
            id: 1132,
            name: '进贤县'
        }]
    }, {
        id: 125,
        name: '景德镇市',
        district: [{
            id: 1133,
            name: '昌江区'
        }, {
            id: 1134,
            name: '珠山区'
        }, {
            id: 1135,
            name: '浮梁县'
        }, {
            id: 1136,
            name: '乐平市'
        }]
    }, {
        id: 126,
        name: '萍乡市',
        district: [{
            id: 1137,
            name: '安源区'
        }, {
            id: 1138,
            name: '湘东区'
        }, {
            id: 1139,
            name: '莲花县'
        }, {
            id: 1140,
            name: '上栗县'
        }, {
            id: 1141,
            name: '芦溪县'
        }]
    }, {
        id: 127,
        name: '九江市',
        district: [{
            id: 1142,
            name: '庐山区'
        }, {
            id: 1143,
            name: '浔阳区'
        }, {
            id: 1144,
            name: '九江县'
        }, {
            id: 1145,
            name: '武宁县'
        }, {
            id: 1146,
            name: '修水县'
        }, {
            id: 1147,
            name: '永修县'
        }, {
            id: 1148,
            name: '德安县'
        }, {
            id: 1149,
            name: '星子县'
        }, {
            id: 1150,
            name: '都昌县'
        }, {
            id: 1151,
            name: '湖口县'
        }, {
            id: 1152,
            name: '彭泽县'
        }, {
            id: 1153,
            name: '瑞昌市'
        }]
    }, {
        id: 128,
        name: '新余市',
        district: [{
            id: 1154,
            name: '渝水区'
        }, {
            id: 1155,
            name: '分宜县'
        }]
    }, {
        id: 129,
        name: '鹰潭市',
        district: [{
            id: 1156,
            name: '月湖区'
        }, {
            id: 1157,
            name: '余江县'
        }, {
            id: 1158,
            name: '贵溪市'
        }]
    }, {
        id: 130,
        name: '赣州市',
        district: [{
            id: 1159,
            name: '章贡区'
        }, {
            id: 1160,
            name: '赣县'
        }, {
            id: 1161,
            name: '信丰县'
        }, {
            id: 1162,
            name: '大余县'
        }, {
            id: 1163,
            name: '上犹县'
        }, {
            id: 1164,
            name: '崇义县'
        }, {
            id: 1165,
            name: '安远县'
        }, {
            id: 1166,
            name: '龙南县'
        }, {
            id: 1167,
            name: '定南县'
        }, {
            id: 1168,
            name: '全南县'
        }, {
            id: 1169,
            name: '宁都县'
        }, {
            id: 1170,
            name: '于都县'
        }, {
            id: 1171,
            name: '兴国县'
        }, {
            id: 1172,
            name: '会昌县'
        }, {
            id: 1173,
            name: '寻乌县'
        }, {
            id: 1174,
            name: '石城县'
        }, {
            id: 1175,
            name: '瑞金市'
        }, {
            id: 1176,
            name: '南康市'
        }]
    }, {
        id: 131,
        name: '吉安市',
        district: [{
            id: 1177,
            name: '吉州区'
        }, {
            id: 1178,
            name: '青原区'
        }, {
            id: 1179,
            name: '吉安县'
        }, {
            id: 1180,
            name: '吉水县'
        }, {
            id: 1181,
            name: '峡江县'
        }, {
            id: 1182,
            name: '新干县'
        }, {
            id: 1183,
            name: '永丰县'
        }, {
            id: 1184,
            name: '泰和县'
        }, {
            id: 1185,
            name: '遂川县'
        }, {
            id: 1186,
            name: '万安县'
        }, {
            id: 1187,
            name: '安福县'
        }, {
            id: 1188,
            name: '永新县'
        }, {
            id: 1189,
            name: '井冈山市'
        }]
    }, {
        id: 132,
        name: '宜春市',
        district: [{
            id: 1190,
            name: '袁州区'
        }, {
            id: 1191,
            name: '奉新县'
        }, {
            id: 1192,
            name: '万载县'
        }, {
            id: 1193,
            name: '上高县'
        }, {
            id: 1194,
            name: '宜丰县'
        }, {
            id: 1195,
            name: '靖安县'
        }, {
            id: 1196,
            name: '铜鼓县'
        }, {
            id: 1197,
            name: '丰城市'
        }, {
            id: 1198,
            name: '樟树市'
        }, {
            id: 1199,
            name: '高安市'
        }]
    }, {
        id: 133,
        name: '抚州市',
        district: [{
            id: 1200,
            name: '临川区'
        }, {
            id: 1201,
            name: '南城县'
        }, {
            id: 1202,
            name: '黎川县'
        }, {
            id: 1203,
            name: '南丰县'
        }, {
            id: 1204,
            name: '崇仁县'
        }, {
            id: 1205,
            name: '乐安县'
        }, {
            id: 1206,
            name: '宜黄县'
        }, {
            id: 1207,
            name: '金溪县'
        }, {
            id: 1208,
            name: '资溪县'
        }, {
            id: 1209,
            name: '东乡县'
        }, {
            id: 1210,
            name: '广昌县'
        }]
    }, {
        id: 134,
        name: '上饶市',
        district: [{
            id: 1211,
            name: '信州区'
        }, {
            id: 1212,
            name: '上饶县'
        }, {
            id: 1213,
            name: '广丰县'
        }, {
            id: 1214,
            name: '玉山县'
        }, {
            id: 1215,
            name: '铅山县'
        }, {
            id: 1216,
            name: '横峰县'
        }, {
            id: 1217,
            name: '弋阳县'
        }, {
            id: 1218,
            name: '余干县'
        }, {
            id: 1219,
            name: '鄱阳县'
        }, {
            id: 1220,
            name: '万年县'
        }, {
            id: 1221,
            name: '婺源县'
        }, {
            id: 1222,
            name: '德兴市'
        }]
    }]
}, {
    id: 15,
    name: '山东',
    city: [{
        id: 135,
        name: '济南市',
        district: [{
            id: 1223,
            name: '历下区'
        }, {
            id: 1224,
            name: '市中区'
        }, {
            id: 1225,
            name: '槐荫区'
        }, {
            id: 1226,
            name: '天桥区'
        }, {
            id: 1227,
            name: '历城区'
        }, {
            id: 1228,
            name: '长清区'
        }, {
            id: 1229,
            name: '平阴县'
        }, {
            id: 1230,
            name: '济阳县'
        }, {
            id: 1231,
            name: '商河县'
        }, {
            id: 1232,
            name: '章丘市'
        }]
    }, {
        id: 136,
        name: '青岛市',
        district: [{
            id: 1233,
            name: '市南区'
        }, {
            id: 1234,
            name: '市北区'
        }, {
            id: 1235,
            name: '四方区'
        }, {
            id: 1236,
            name: '黄岛区'
        }, {
            id: 1237,
            name: '崂山区'
        }, {
            id: 1238,
            name: '李沧区'
        }, {
            id: 1239,
            name: '城阳区'
        }, {
            id: 1240,
            name: '胶州市'
        }, {
            id: 1241,
            name: '即墨市'
        }, {
            id: 1242,
            name: '平度市'
        }, {
            id: 1243,
            name: '胶南市'
        }, {
            id: 1244,
            name: '莱西市'
        }]
    }, {
        id: 137,
        name: '淄博市',
        district: [{
            id: 1245,
            name: '淄川区'
        }, {
            id: 1246,
            name: '张店区'
        }, {
            id: 1247,
            name: '博山区'
        }, {
            id: 1248,
            name: '临淄区'
        }, {
            id: 1249,
            name: '周村区'
        }, {
            id: 1250,
            name: '桓台县'
        }, {
            id: 1251,
            name: '高青县'
        }, {
            id: 1252,
            name: '沂源县'
        }]
    }, {
        id: 138,
        name: '枣庄市',
        district: [{
            id: 1253,
            name: '市中区'
        }, {
            id: 1254,
            name: '薛城区'
        }, {
            id: 1255,
            name: '峄城区'
        }, {
            id: 1256,
            name: '台儿庄区'
        }, {
            id: 1257,
            name: '山亭区'
        }, {
            id: 1258,
            name: '滕州市'
        }]
    }, {
        id: 139,
        name: '东营市',
        district: [{
            id: 1259,
            name: '东营区'
        }, {
            id: 1260,
            name: '河口区'
        }, {
            id: 1261,
            name: '垦利县'
        }, {
            id: 1262,
            name: '利津县'
        }, {
            id: 1263,
            name: '广饶县'
        }]
    }, {
        id: 140,
        name: '烟台市',
        district: [{
            id: 1264,
            name: '芝罘区'
        }, {
            id: 1265,
            name: '福山区'
        }, {
            id: 1266,
            name: '牟平区'
        }, {
            id: 1267,
            name: '莱山区'
        }, {
            id: 1268,
            name: '长岛县'
        }, {
            id: 1269,
            name: '龙口市'
        }, {
            id: 1270,
            name: '莱阳市'
        }, {
            id: 1271,
            name: '莱州市'
        }, {
            id: 1272,
            name: '蓬莱市'
        }, {
            id: 1273,
            name: '招远市'
        }, {
            id: 1274,
            name: '栖霞市'
        }, {
            id: 1275,
            name: '海阳市'
        }]
    }, {
        id: 141,
        name: '潍坊市',
        district: [{
            id: 1276,
            name: '潍城区'
        }, {
            id: 1277,
            name: '寒亭区'
        }, {
            id: 1278,
            name: '坊子区'
        }, {
            id: 1279,
            name: '奎文区'
        }, {
            id: 1280,
            name: '临朐县'
        }, {
            id: 1281,
            name: '昌乐县'
        }, {
            id: 1282,
            name: '青州市'
        }, {
            id: 1283,
            name: '诸城市'
        }, {
            id: 1284,
            name: '寿光市'
        }, {
            id: 1285,
            name: '安丘市'
        }, {
            id: 1286,
            name: '高密市'
        }, {
            id: 1287,
            name: '昌邑市'
        }]
    }, {
        id: 142,
        name: '济宁市',
        district: [{
            id: 1288,
            name: '市中区'
        }, {
            id: 1289,
            name: '任城区'
        }, {
            id: 1290,
            name: '微山县'
        }, {
            id: 1291,
            name: '鱼台县'
        }, {
            id: 1292,
            name: '金乡县'
        }, {
            id: 1293,
            name: '嘉祥县'
        }, {
            id: 1294,
            name: '汶上县'
        }, {
            id: 1295,
            name: '泗水县'
        }, {
            id: 1296,
            name: '梁山县'
        }, {
            id: 1297,
            name: '曲阜市'
        }, {
            id: 1298,
            name: '兖州市'
        }, {
            id: 1299,
            name: '邹城市'
        }]
    }, {
        id: 143,
        name: '泰安市',
        district: [{
            id: 1300,
            name: '泰山区'
        }, {
            id: 1301,
            name: '岱岳区'
        }, {
            id: 1302,
            name: '宁阳县'
        }, {
            id: 1303,
            name: '东平县'
        }, {
            id: 1304,
            name: '新泰市'
        }, {
            id: 1305,
            name: '肥城市'
        }]
    }, {
        id: 144,
        name: '威海市',
        district: [{
            id: 1306,
            name: '环翠区'
        }, {
            id: 1307,
            name: '文登市'
        }, {
            id: 1308,
            name: '荣成市'
        }, {
            id: 1309,
            name: '乳山市'
        }]
    }, {
        id: 145,
        name: '日照市',
        district: [{
            id: 1310,
            name: '东港区'
        }, {
            id: 1311,
            name: '岚山区'
        }, {
            id: 1312,
            name: '五莲县'
        }, {
            id: 1313,
            name: '莒县'
        }]
    }, {
        id: 146,
        name: '莱芜市',
        district: [{
            id: 1314,
            name: '莱城区'
        }, {
            id: 1315,
            name: '钢城区'
        }]
    }, {
        id: 147,
        name: '临沂市',
        district: [{
            id: 1316,
            name: '兰山区'
        }, {
            id: 1317,
            name: '罗庄区'
        }, {
            id: 1318,
            name: '河东区'
        }, {
            id: 1319,
            name: '沂南县'
        }, {
            id: 1320,
            name: '郯城县'
        }, {
            id: 1321,
            name: '沂水县'
        }, {
            id: 1322,
            name: '苍山县'
        }, {
            id: 1323,
            name: '费县'
        }, {
            id: 1324,
            name: '平邑县'
        }, {
            id: 1325,
            name: '莒南县'
        }, {
            id: 1326,
            name: '蒙阴县'
        }, {
            id: 1327,
            name: '临沭县'
        }]
    }, {
        id: 148,
        name: '德州市',
        district: [{
            id: 1328,
            name: '德城区'
        }, {
            id: 1329,
            name: '陵县'
        }, {
            id: 1330,
            name: '宁津县'
        }, {
            id: 1331,
            name: '庆云县'
        }, {
            id: 1332,
            name: '临邑县'
        }, {
            id: 1333,
            name: '齐河县'
        }, {
            id: 1334,
            name: '平原县'
        }, {
            id: 1335,
            name: '夏津县'
        }, {
            id: 1336,
            name: '武城县'
        }, {
            id: 1337,
            name: '乐陵市'
        }, {
            id: 1338,
            name: '禹城市'
        }]
    }, {
        id: 149,
        name: '聊城市',
        district: [{
            id: 1339,
            name: '东昌府区'
        }, {
            id: 1340,
            name: '阳谷县'
        }, {
            id: 1341,
            name: '莘县'
        }, {
            id: 1342,
            name: '茌平县'
        }, {
            id: 1343,
            name: '东阿县'
        }, {
            id: 1344,
            name: '冠县'
        }, {
            id: 1345,
            name: '高唐县'
        }, {
            id: 1346,
            name: '临清市'
        }]
    }, {
        id: 150,
        name: '滨州市',
        district: [{
            id: 1347,
            name: '滨城区'
        }, {
            id: 1348,
            name: '惠民县'
        }, {
            id: 1349,
            name: '阳信县'
        }, {
            id: 1350,
            name: '无棣县'
        }, {
            id: 1351,
            name: '沾化县'
        }, {
            id: 1352,
            name: '博兴县'
        }, {
            id: 1353,
            name: '邹平县'
        }]
    }, {
        id: 151,
        name: '荷泽市',
        district: [{
            id: 1354,
            name: '牡丹区'
        }, {
            id: 1355,
            name: '曹县'
        }, {
            id: 1356,
            name: '单县'
        }, {
            id: 1357,
            name: '成武县'
        }, {
            id: 1358,
            name: '巨野县'
        }, {
            id: 1359,
            name: '郓城县'
        }, {
            id: 1360,
            name: '鄄城县'
        }, {
            id: 1361,
            name: '定陶县'
        }, {
            id: 1362,
            name: '东明县'
        }]
    }]
}, {
    id: 16,
    name: '河南',
    city: [{
        id: 152,
        name: '郑州市',
        district: [{
            id: 1363,
            name: '中原区'
        }, {
            id: 1364,
            name: '二七区'
        }, {
            id: 1365,
            name: '管城回族区'
        }, {
            id: 1366,
            name: '金水区'
        }, {
            id: 1367,
            name: '上街区'
        }, {
            id: 1368,
            name: '惠济区'
        }, {
            id: 1369,
            name: '中牟县'
        }, {
            id: 1370,
            name: '巩义市'
        }, {
            id: 1371,
            name: '荥阳市'
        }, {
            id: 1372,
            name: '新密市'
        }, {
            id: 1373,
            name: '新郑市'
        }, {
            id: 1374,
            name: '登封市'
        }]
    }, {
        id: 153,
        name: '开封市',
        district: [{
            id: 1375,
            name: '龙亭区'
        }, {
            id: 1376,
            name: '顺河回族区'
        }, {
            id: 1377,
            name: '鼓楼区'
        }, {
            id: 1378,
            name: '南关区'
        }, {
            id: 1379,
            name: '郊区'
        }, {
            id: 1380,
            name: '杞县'
        }, {
            id: 1381,
            name: '通许县'
        }, {
            id: 1382,
            name: '尉氏县'
        }, {
            id: 1383,
            name: '开封县'
        }, {
            id: 1384,
            name: '兰考县'
        }]
    }, {
        id: 154,
        name: '洛阳市',
        district: [{
            id: 1385,
            name: '老城区'
        }, {
            id: 1386,
            name: '西工区'
        }, {
            id: 1387,
            name: '廛河回族区'
        }, {
            id: 1388,
            name: '涧西区'
        }, {
            id: 1389,
            name: '吉利区'
        }, {
            id: 1390,
            name: '洛龙区'
        }, {
            id: 1391,
            name: '孟津县'
        }, {
            id: 1392,
            name: '新安县'
        }, {
            id: 1393,
            name: '栾川县'
        }, {
            id: 1394,
            name: '嵩县'
        }, {
            id: 1395,
            name: '汝阳县'
        }, {
            id: 1396,
            name: '宜阳县'
        }, {
            id: 1397,
            name: '洛宁县'
        }, {
            id: 1398,
            name: '伊川县'
        }, {
            id: 1399,
            name: '偃师市'
        }]
    }, {
        id: 155,
        name: '平顶山市',
        district: [{
            id: 1400,
            name: '新华区'
        }, {
            id: 1401,
            name: '卫东区'
        }, {
            id: 1402,
            name: '石龙区'
        }, {
            id: 1403,
            name: '湛河区'
        }, {
            id: 1404,
            name: '宝丰县'
        }, {
            id: 1405,
            name: '叶县'
        }, {
            id: 1406,
            name: '鲁山县'
        }, {
            id: 1407,
            name: '郏县'
        }, {
            id: 1408,
            name: '舞钢市'
        }, {
            id: 1409,
            name: '汝州市'
        }]
    }, {
        id: 156,
        name: '安阳市',
        district: [{
            id: 1410,
            name: '文峰区'
        }, {
            id: 1411,
            name: '北关区'
        }, {
            id: 1412,
            name: '殷都区'
        }, {
            id: 1413,
            name: '龙安区'
        }, {
            id: 1414,
            name: '安阳县'
        }, {
            id: 1415,
            name: '汤阴县'
        }, {
            id: 1416,
            name: '滑县'
        }, {
            id: 1417,
            name: '内黄县'
        }, {
            id: 1418,
            name: '林州市'
        }]
    }, {
        id: 157,
        name: '鹤壁市',
        district: [{
            id: 1419,
            name: '鹤山区'
        }, {
            id: 1420,
            name: '山城区'
        }, {
            id: 1421,
            name: '淇滨区'
        }, {
            id: 1422,
            name: '浚县'
        }, {
            id: 1423,
            name: '淇县'
        }]
    }, {
        id: 158,
        name: '新乡市',
        district: [{
            id: 1424,
            name: '红旗区'
        }, {
            id: 1425,
            name: '卫滨区'
        }, {
            id: 1426,
            name: '凤泉区'
        }, {
            id: 1427,
            name: '牧野区'
        }, {
            id: 1428,
            name: '新乡县'
        }, {
            id: 1429,
            name: '获嘉县'
        }, {
            id: 1430,
            name: '原阳县'
        }, {
            id: 1431,
            name: '延津县'
        }, {
            id: 1432,
            name: '封丘县'
        }, {
            id: 1433,
            name: '长垣县'
        }, {
            id: 1434,
            name: '卫辉市'
        }, {
            id: 1435,
            name: '辉县市'
        }]
    }, {
        id: 159,
        name: '焦作市',
        district: [{
            id: 1436,
            name: '解放区'
        }, {
            id: 1437,
            name: '中站区'
        }, {
            id: 1438,
            name: '马村区'
        }, {
            id: 1439,
            name: '山阳区'
        }, {
            id: 1440,
            name: '修武县'
        }, {
            id: 1441,
            name: '博爱县'
        }, {
            id: 1442,
            name: '武陟县'
        }, {
            id: 1443,
            name: '温县'
        }, {
            id: 1444,
            name: '济源市'
        }, {
            id: 1445,
            name: '沁阳市'
        }, {
            id: 1446,
            name: '孟州市'
        }]
    }, {
        id: 160,
        name: '濮阳市',
        district: [{
            id: 1447,
            name: '华龙区'
        }, {
            id: 1448,
            name: '清丰县'
        }, {
            id: 1449,
            name: '南乐县'
        }, {
            id: 1450,
            name: '范县'
        }, {
            id: 1451,
            name: '台前县'
        }, {
            id: 1452,
            name: '濮阳县'
        }]
    }, {
        id: 161,
        name: '许昌市',
        district: [{
            id: 1453,
            name: '魏都区'
        }, {
            id: 1454,
            name: '许昌县'
        }, {
            id: 1455,
            name: '鄢陵县'
        }, {
            id: 1456,
            name: '襄城县'
        }, {
            id: 1457,
            name: '禹州市'
        }, {
            id: 1458,
            name: '长葛市'
        }]
    }, {
        id: 162,
        name: '漯河市',
        district: [{
            id: 1459,
            name: '源汇区'
        }, {
            id: 1460,
            name: '郾城区'
        }, {
            id: 1461,
            name: '召陵区'
        }, {
            id: 1462,
            name: '舞阳县'
        }, {
            id: 1463,
            name: '临颍县'
        }]
    }, {
        id: 163,
        name: '三门峡市',
        district: [{
            id: 1464,
            name: '市辖区'
        }, {
            id: 1465,
            name: '湖滨区'
        }, {
            id: 1466,
            name: '渑池县'
        }, {
            id: 1467,
            name: '陕县'
        }, {
            id: 1468,
            name: '卢氏县'
        }, {
            id: 1469,
            name: '义马市'
        }, {
            id: 1470,
            name: '灵宝市'
        }]
    }, {
        id: 164,
        name: '南阳市',
        district: [{
            id: 1471,
            name: '宛城区'
        }, {
            id: 1472,
            name: '卧龙区'
        }, {
            id: 1473,
            name: '南召县'
        }, {
            id: 1474,
            name: '方城县'
        }, {
            id: 1475,
            name: '西峡县'
        }, {
            id: 1476,
            name: '镇平县'
        }, {
            id: 1477,
            name: '内乡县'
        }, {
            id: 1478,
            name: '淅川县'
        }, {
            id: 1479,
            name: '社旗县'
        }, {
            id: 1480,
            name: '唐河县'
        }, {
            id: 1481,
            name: '新野县'
        }, {
            id: 1482,
            name: '桐柏县'
        }, {
            id: 1483,
            name: '邓州市'
        }]
    }, {
        id: 165,
        name: '商丘市',
        district: [{
            id: 1484,
            name: '梁园区'
        }, {
            id: 1485,
            name: '睢阳区'
        }, {
            id: 1486,
            name: '民权县'
        }, {
            id: 1487,
            name: '睢县'
        }, {
            id: 1488,
            name: '宁陵县'
        }, {
            id: 1489,
            name: '柘城县'
        }, {
            id: 1490,
            name: '虞城县'
        }, {
            id: 1491,
            name: '夏邑县'
        }, {
            id: 1492,
            name: '永城市'
        }]
    }, {
        id: 166,
        name: '信阳市',
        district: [{
            id: 1493,
            name: '浉河区'
        }, {
            id: 1494,
            name: '平桥区'
        }, {
            id: 1495,
            name: '罗山县'
        }, {
            id: 1496,
            name: '光山县'
        }, {
            id: 1497,
            name: '新县'
        }, {
            id: 1498,
            name: '商城县'
        }, {
            id: 1499,
            name: '固始县'
        }, {
            id: 1500,
            name: '潢川县'
        }, {
            id: 1501,
            name: '淮滨县'
        }, {
            id: 1502,
            name: '息县'
        }]
    }, {
        id: 167,
        name: '周口市',
        district: [{
            id: 1503,
            name: '川汇区'
        }, {
            id: 1504,
            name: '扶沟县'
        }, {
            id: 1505,
            name: '西华县'
        }, {
            id: 1506,
            name: '商水县'
        }, {
            id: 1507,
            name: '沈丘县'
        }, {
            id: 1508,
            name: '郸城县'
        }, {
            id: 1509,
            name: '淮阳县'
        }, {
            id: 1510,
            name: '太康县'
        }, {
            id: 1511,
            name: '鹿邑县'
        }, {
            id: 1512,
            name: '项城市'
        }]
    }, {
        id: 168,
        name: '驻马店市',
        district: [{
            id: 1513,
            name: '驿城区'
        }, {
            id: 1514,
            name: '西平县'
        }, {
            id: 1515,
            name: '上蔡县'
        }, {
            id: 1516,
            name: '平舆县'
        }, {
            id: 1517,
            name: '正阳县'
        }, {
            id: 1518,
            name: '确山县'
        }, {
            id: 1519,
            name: '泌阳县'
        }, {
            id: 1520,
            name: '汝南县'
        }, {
            id: 1521,
            name: '遂平县'
        }, {
            id: 1522,
            name: '新蔡县'
        }]
    }]
}, {
    id: 17,
    name: '湖北',
    city: [{
        id: 169,
        name: '武汉市',
        district: [{
            id: 1523,
            name: '江岸区'
        }, {
            id: 1524,
            name: '江汉区'
        }, {
            id: 1525,
            name: '硚口区'
        }, {
            id: 1526,
            name: '汉阳区'
        }, {
            id: 1527,
            name: '武昌区'
        }, {
            id: 1528,
            name: '青山区'
        }, {
            id: 1529,
            name: '洪山区'
        }, {
            id: 1530,
            name: '东西湖区'
        }, {
            id: 1531,
            name: '汉南区'
        }, {
            id: 1532,
            name: '蔡甸区'
        }, {
            id: 1533,
            name: '江夏区'
        }, {
            id: 1534,
            name: '黄陂区'
        }, {
            id: 1535,
            name: '新洲区'
        }]
    }, {
        id: 170,
        name: '黄石市',
        district: [{
            id: 1536,
            name: '黄石港区'
        }, {
            id: 1537,
            name: '西塞山区'
        }, {
            id: 1538,
            name: '下陆区'
        }, {
            id: 1539,
            name: '铁山区'
        }, {
            id: 1540,
            name: '阳新县'
        }, {
            id: 1541,
            name: '大冶市'
        }]
    }, {
        id: 171,
        name: '十堰市',
        district: [{
            id: 1542,
            name: '茅箭区'
        }, {
            id: 1543,
            name: '张湾区'
        }, {
            id: 1544,
            name: '郧县'
        }, {
            id: 1545,
            name: '郧西县'
        }, {
            id: 1546,
            name: '竹山县'
        }, {
            id: 1547,
            name: '竹溪县'
        }, {
            id: 1548,
            name: '房县'
        }, {
            id: 1549,
            name: '丹江口市'
        }]
    }, {
        id: 172,
        name: '宜昌市',
        district: [{
            id: 1550,
            name: '西陵区'
        }, {
            id: 1551,
            name: '伍家岗区'
        }, {
            id: 1552,
            name: '点军区'
        }, {
            id: 1553,
            name: '猇亭区'
        }, {
            id: 1554,
            name: '夷陵区'
        }, {
            id: 1555,
            name: '远安县'
        }, {
            id: 1556,
            name: '兴山县'
        }, {
            id: 1557,
            name: '秭归县'
        }, {
            id: 1558,
            name: '长阳土家族自治县'
        }, {
            id: 1559,
            name: '五峰土家族自治县'
        }, {
            id: 1560,
            name: '宜都市'
        }, {
            id: 1561,
            name: '当阳市'
        }, {
            id: 1562,
            name: '枝江市'
        }]
    }, {
        id: 173,
        name: '襄樊市',
        district: [{
            id: 1563,
            name: '襄城区'
        }, {
            id: 1564,
            name: '樊城区'
        }, {
            id: 1565,
            name: '襄阳区'
        }, {
            id: 1566,
            name: '南漳县'
        }, {
            id: 1567,
            name: '谷城县'
        }, {
            id: 1568,
            name: '保康县'
        }, {
            id: 1569,
            name: '老河口市'
        }, {
            id: 1570,
            name: '枣阳市'
        }, {
            id: 1571,
            name: '宜城市'
        }]
    }, {
        id: 174,
        name: '鄂州市',
        district: [{
            id: 1572,
            name: '梁子湖区'
        }, {
            id: 1573,
            name: '华容区'
        }, {
            id: 1574,
            name: '鄂城区'
        }]
    }, {
        id: 175,
        name: '荆门市',
        district: [{
            id: 1575,
            name: '东宝区'
        }, {
            id: 1576,
            name: '掇刀区'
        }, {
            id: 1577,
            name: '京山县'
        }, {
            id: 1578,
            name: '沙洋县'
        }, {
            id: 1579,
            name: '钟祥市'
        }]
    }, {
        id: 176,
        name: '孝感市',
        district: [{
            id: 1580,
            name: '孝南区'
        }, {
            id: 1581,
            name: '孝昌县'
        }, {
            id: 1582,
            name: '大悟县'
        }, {
            id: 1583,
            name: '云梦县'
        }, {
            id: 1584,
            name: '应城市'
        }, {
            id: 1585,
            name: '安陆市'
        }, {
            id: 1586,
            name: '汉川市'
        }]
    }, {
        id: 177,
        name: '荆州市',
        district: [{
            id: 1587,
            name: '沙市区'
        }, {
            id: 1588,
            name: '荆州区'
        }, {
            id: 1589,
            name: '公安县'
        }, {
            id: 1590,
            name: '监利县'
        }, {
            id: 1591,
            name: '江陵县'
        }, {
            id: 1592,
            name: '石首市'
        }, {
            id: 1593,
            name: '洪湖市'
        }, {
            id: 1594,
            name: '松滋市'
        }]
    }, {
        id: 178,
        name: '黄冈市',
        district: [{
            id: 1595,
            name: '黄州区'
        }, {
            id: 1596,
            name: '团风县'
        }, {
            id: 1597,
            name: '红安县'
        }, {
            id: 1598,
            name: '罗田县'
        }, {
            id: 1599,
            name: '英山县'
        }, {
            id: 1600,
            name: '浠水县'
        }, {
            id: 1601,
            name: '蕲春县'
        }, {
            id: 1602,
            name: '黄梅县'
        }, {
            id: 1603,
            name: '麻城市'
        }, {
            id: 1604,
            name: '武穴市'
        }]
    }, {
        id: 179,
        name: '咸宁市',
        district: [{
            id: 1605,
            name: '咸安区'
        }, {
            id: 1606,
            name: '嘉鱼县'
        }, {
            id: 1607,
            name: '通城县'
        }, {
            id: 1608,
            name: '崇阳县'
        }, {
            id: 1609,
            name: '通山县'
        }, {
            id: 1610,
            name: '赤壁市'
        }]
    }, {
        id: 180,
        name: '随州市',
        district: [{
            id: 1611,
            name: '曾都区'
        }, {
            id: 1612,
            name: '广水市'
        }]
    }, {
        id: 181,
        name: '恩施',
        district: [{
            id: 1613,
            name: '恩施市'
        }, {
            id: 1614,
            name: '利川市'
        }, {
            id: 1615,
            name: '建始县'
        }, {
            id: 1616,
            name: '巴东县'
        }, {
            id: 1617,
            name: '宣恩县'
        }, {
            id: 1618,
            name: '咸丰县'
        }, {
            id: 1619,
            name: '来凤县'
        }, {
            id: 1620,
            name: '鹤峰县'
        }]
    }, {
        id: 182,
        name: '神农架',
        district: [{
            id: 1621,
            name: '仙桃市'
        }, {
            id: 1622,
            name: '潜江市'
        }, {
            id: 1623,
            name: '天门市'
        }, {
            id: 1624,
            name: '神农架林区'
        }]
    }]
}, {
    id: 18,
    name: '湖南',
    city: [{
        id: 183,
        name: '长沙市',
        district: [{
            id: 1625,
            name: '芙蓉区'
        }, {
            id: 1626,
            name: '天心区'
        }, {
            id: 1627,
            name: '岳麓区'
        }, {
            id: 1628,
            name: '开福区'
        }, {
            id: 1629,
            name: '雨花区'
        }, {
            id: 1630,
            name: '长沙县'
        }, {
            id: 1631,
            name: '望城县'
        }, {
            id: 1632,
            name: '宁乡县'
        }, {
            id: 1633,
            name: '浏阳市'
        }]
    }, {
        id: 184,
        name: '株洲市',
        district: [{
            id: 1634,
            name: '荷塘区'
        }, {
            id: 1635,
            name: '芦淞区'
        }, {
            id: 1636,
            name: '石峰区'
        }, {
            id: 1637,
            name: '天元区'
        }, {
            id: 1638,
            name: '株洲县'
        }, {
            id: 1639,
            name: '攸县'
        }, {
            id: 1640,
            name: '茶陵县'
        }, {
            id: 1641,
            name: '炎陵县'
        }, {
            id: 1642,
            name: '醴陵市'
        }]
    }, {
        id: 185,
        name: '湘潭市',
        district: [{
            id: 1643,
            name: '雨湖区'
        }, {
            id: 1644,
            name: '岳塘区'
        }, {
            id: 1645,
            name: '湘潭县'
        }, {
            id: 1646,
            name: '湘乡市'
        }, {
            id: 1647,
            name: '韶山市'
        }]
    }, {
        id: 186,
        name: '衡阳市',
        district: [{
            id: 1648,
            name: '珠晖区'
        }, {
            id: 1649,
            name: '雁峰区'
        }, {
            id: 1650,
            name: '石鼓区'
        }, {
            id: 1651,
            name: '蒸湘区'
        }, {
            id: 1652,
            name: '南岳区'
        }, {
            id: 1653,
            name: '衡阳县'
        }, {
            id: 1654,
            name: '衡南县'
        }, {
            id: 1655,
            name: '衡山县'
        }, {
            id: 1656,
            name: '衡东县'
        }, {
            id: 1657,
            name: '祁东县'
        }, {
            id: 1658,
            name: '耒阳市'
        }, {
            id: 1659,
            name: '常宁市'
        }]
    }, {
        id: 187,
        name: '邵阳市',
        district: [{
            id: 1660,
            name: '双清区'
        }, {
            id: 1661,
            name: '大祥区'
        }, {
            id: 1662,
            name: '北塔区'
        }, {
            id: 1663,
            name: '邵东县'
        }, {
            id: 1664,
            name: '新邵县'
        }, {
            id: 1665,
            name: '邵阳县'
        }, {
            id: 1666,
            name: '隆回县'
        }, {
            id: 1667,
            name: '洞口县'
        }, {
            id: 1668,
            name: '绥宁县'
        }, {
            id: 1669,
            name: '新宁县'
        }, {
            id: 1670,
            name: '城步苗族自治县'
        }, {
            id: 1671,
            name: '武冈市'
        }]
    }, {
        id: 188,
        name: '岳阳市',
        district: [{
            id: 1672,
            name: '岳阳楼区'
        }, {
            id: 1673,
            name: '云溪区'
        }, {
            id: 1674,
            name: '君山区'
        }, {
            id: 1675,
            name: '岳阳县'
        }, {
            id: 1676,
            name: '华容县'
        }, {
            id: 1677,
            name: '湘阴县'
        }, {
            id: 1678,
            name: '平江县'
        }, {
            id: 1679,
            name: '汨罗市'
        }, {
            id: 1680,
            name: '临湘市'
        }]
    }, {
        id: 189,
        name: '常德市',
        district: [{
            id: 1681,
            name: '武陵区'
        }, {
            id: 1682,
            name: '鼎城区'
        }, {
            id: 1683,
            name: '安乡县'
        }, {
            id: 1684,
            name: '汉寿县'
        }, {
            id: 1685,
            name: '澧县'
        }, {
            id: 1686,
            name: '临澧县'
        }, {
            id: 1687,
            name: '桃源县'
        }, {
            id: 1688,
            name: '石门县'
        }, {
            id: 1689,
            name: '津市市'
        }]
    }, {
        id: 190,
        name: '张家界市',
        district: [{
            id: 1690,
            name: '永定区'
        }, {
            id: 1691,
            name: '武陵源区'
        }, {
            id: 1692,
            name: '慈利县'
        }, {
            id: 1693,
            name: '桑植县'
        }]
    }, {
        id: 191,
        name: '益阳市',
        district: [{
            id: 1694,
            name: '资阳区'
        }, {
            id: 1695,
            name: '赫山区'
        }, {
            id: 1696,
            name: '南县'
        }, {
            id: 1697,
            name: '桃江县'
        }, {
            id: 1698,
            name: '安化县'
        }, {
            id: 1699,
            name: '沅江市'
        }]
    }, {
        id: 192,
        name: '郴州市',
        district: [{
            id: 1700,
            name: '北湖区'
        }, {
            id: 1701,
            name: '苏仙区'
        }, {
            id: 1702,
            name: '桂阳县'
        }, {
            id: 1703,
            name: '宜章县'
        }, {
            id: 1704,
            name: '永兴县'
        }, {
            id: 1705,
            name: '嘉禾县'
        }, {
            id: 1706,
            name: '临武县'
        }, {
            id: 1707,
            name: '汝城县'
        }, {
            id: 1708,
            name: '桂东县'
        }, {
            id: 1709,
            name: '安仁县'
        }, {
            id: 1710,
            name: '资兴市'
        }]
    }, {
        id: 193,
        name: '永州市',
        district: [{
            id: 1711,
            name: '芝山区'
        }, {
            id: 1712,
            name: '冷水滩区'
        }, {
            id: 1713,
            name: '祁阳县'
        }, {
            id: 1714,
            name: '东安县'
        }, {
            id: 1715,
            name: '双牌县'
        }, {
            id: 1716,
            name: '道县'
        }, {
            id: 1717,
            name: '江永县'
        }, {
            id: 1718,
            name: '宁远县'
        }, {
            id: 1719,
            name: '蓝山县'
        }, {
            id: 1720,
            name: '新田县'
        }, {
            id: 1721,
            name: '江华瑶族自治县'
        }]
    }, {
        id: 194,
        name: '怀化市',
        district: [{
            id: 1722,
            name: '鹤城区'
        }, {
            id: 1723,
            name: '中方县'
        }, {
            id: 1724,
            name: '沅陵县'
        }, {
            id: 1725,
            name: '辰溪县'
        }, {
            id: 1726,
            name: '溆浦县'
        }, {
            id: 1727,
            name: '会同县'
        }, {
            id: 1728,
            name: '麻阳苗族自治县'
        }, {
            id: 1729,
            name: '新晃侗族自治县'
        }, {
            id: 1730,
            name: '芷江侗族自治县'
        }, {
            id: 1731,
            name: '靖州苗族侗族自治县'
        }, {
            id: 1732,
            name: '通道侗族自治县'
        }, {
            id: 1733,
            name: '洪江市'
        }]
    }, {
        id: 195,
        name: '娄底市',
        district: [{
            id: 1734,
            name: '娄星区'
        }, {
            id: 1735,
            name: '双峰县'
        }, {
            id: 1736,
            name: '新化县'
        }, {
            id: 1737,
            name: '冷水江市'
        }, {
            id: 1738,
            name: '涟源市'
        }]
    }, {
        id: 196,
        name: '湘西',
        district: [{
            id: 1739,
            name: '吉首市'
        }, {
            id: 1740,
            name: '泸溪县'
        }, {
            id: 1741,
            name: '凤凰县'
        }, {
            id: 1742,
            name: '花垣县'
        }, {
            id: 1743,
            name: '保靖县'
        }, {
            id: 1744,
            name: '古丈县'
        }, {
            id: 1745,
            name: '永顺县'
        }, {
            id: 1746,
            name: '龙山县'
        }]
    }]
}, {
    id: 19,
    name: '广东',
    city: [{
        id: 197,
        name: '广州市',
        district: [{
            id: 1747,
            name: '东山区'
        }, {
            id: 1748,
            name: '荔湾区'
        }, {
            id: 1749,
            name: '越秀区'
        }, {
            id: 1750,
            name: '海珠区'
        }, {
            id: 1751,
            name: '天河区'
        }, {
            id: 1752,
            name: '芳村区'
        }, {
            id: 1753,
            name: '白云区'
        }, {
            id: 1754,
            name: '黄埔区'
        }, {
            id: 1755,
            name: '番禺区'
        }, {
            id: 1756,
            name: '花都区'
        }, {
            id: 1757,
            name: '增城市'
        }, {
            id: 1758,
            name: '从化市'
        }]
    }, {
        id: 198,
        name: '韶关市',
        district: [{
            id: 1759,
            name: '武江区'
        }, {
            id: 1760,
            name: '浈江区'
        }, {
            id: 1761,
            name: '曲江区'
        }, {
            id: 1762,
            name: '始兴县'
        }, {
            id: 1763,
            name: '仁化县'
        }, {
            id: 1764,
            name: '翁源县'
        }, {
            id: 1765,
            name: '乳源瑶族自治县'
        }, {
            id: 1766,
            name: '新丰县'
        }, {
            id: 1767,
            name: '乐昌市'
        }, {
            id: 1768,
            name: '南雄市'
        }]
    }, {
        id: 199,
        name: '深圳市',
        district: [{
            id: 1769,
            name: '罗湖区'
        }, {
            id: 1770,
            name: '福田区'
        }, {
            id: 1771,
            name: '南山区'
        }, {
            id: 1772,
            name: '宝安区'
        }, {
            id: 1773,
            name: '龙岗区'
        }, {
            id: 1774,
            name: '盐田区'
        }]
    }, {
        id: 200,
        name: '珠海市',
        district: [{
            id: 1775,
            name: '香洲区'
        }, {
            id: 1776,
            name: '斗门区'
        }, {
            id: 1777,
            name: '金湾区'
        }]
    }, {
        id: 201,
        name: '汕头市',
        district: [{
            id: 1778,
            name: '龙湖区'
        }, {
            id: 1779,
            name: '金平区'
        }, {
            id: 1780,
            name: '濠江区'
        }, {
            id: 1781,
            name: '潮阳区'
        }, {
            id: 1782,
            name: '潮南区'
        }, {
            id: 1783,
            name: '澄海区'
        }, {
            id: 1784,
            name: '南澳县'
        }]
    }, {
        id: 202,
        name: '佛山市',
        district: [{
            id: 1785,
            name: '禅城区'
        }, {
            id: 1786,
            name: '南海区'
        }, {
            id: 1787,
            name: '顺德区'
        }, {
            id: 1788,
            name: '三水区'
        }, {
            id: 1789,
            name: '高明区'
        }]
    }, {
        id: 203,
        name: '江门市',
        district: [{
            id: 1790,
            name: '蓬江区'
        }, {
            id: 1791,
            name: '江海区'
        }, {
            id: 1792,
            name: '新会区'
        }, {
            id: 1793,
            name: '台山市'
        }, {
            id: 1794,
            name: '开平市'
        }, {
            id: 1795,
            name: '鹤山市'
        }, {
            id: 1796,
            name: '恩平市'
        }]
    }, {
        id: 204,
        name: '湛江市',
        district: [{
            id: 1797,
            name: '赤坎区'
        }, {
            id: 1798,
            name: '霞山区'
        }, {
            id: 1799,
            name: '坡头区'
        }, {
            id: 1800,
            name: '麻章区'
        }, {
            id: 1801,
            name: '遂溪县'
        }, {
            id: 1802,
            name: '徐闻县'
        }, {
            id: 1803,
            name: '廉江市'
        }, {
            id: 1804,
            name: '雷州市'
        }, {
            id: 1805,
            name: '吴川市'
        }]
    }, {
        id: 205,
        name: '茂名市',
        district: [{
            id: 1806,
            name: '茂南区'
        }, {
            id: 1807,
            name: '茂港区'
        }, {
            id: 1808,
            name: '电白县'
        }, {
            id: 1809,
            name: '高州市'
        }, {
            id: 1810,
            name: '化州市'
        }, {
            id: 1811,
            name: '信宜市'
        }]
    }, {
        id: 206,
        name: '肇庆市',
        district: [{
            id: 1812,
            name: '端州区'
        }, {
            id: 1813,
            name: '鼎湖区'
        }, {
            id: 1814,
            name: '广宁县'
        }, {
            id: 1815,
            name: '怀集县'
        }, {
            id: 1816,
            name: '封开县'
        }, {
            id: 1817,
            name: '德庆县'
        }, {
            id: 1818,
            name: '高要市'
        }, {
            id: 1819,
            name: '四会市'
        }]
    }, {
        id: 207,
        name: '惠州市',
        district: [{
            id: 1820,
            name: '惠城区'
        }, {
            id: 1821,
            name: '惠阳区'
        }, {
            id: 1822,
            name: '博罗县'
        }, {
            id: 1823,
            name: '惠东县'
        }, {
            id: 1824,
            name: '龙门县'
        }]
    }, {
        id: 208,
        name: '梅州市',
        district: [{
            id: 1825,
            name: '梅江区'
        }, {
            id: 1826,
            name: '梅县'
        }, {
            id: 1827,
            name: '大埔县'
        }, {
            id: 1828,
            name: '丰顺县'
        }, {
            id: 1829,
            name: '五华县'
        }, {
            id: 1830,
            name: '平远县'
        }, {
            id: 1831,
            name: '蕉岭县'
        }, {
            id: 1832,
            name: '兴宁市'
        }]
    }, {
        id: 209,
        name: '汕尾市',
        district: [{
            id: 1833,
            name: '城区'
        }, {
            id: 1834,
            name: '海丰县'
        }, {
            id: 1835,
            name: '陆河县'
        }, {
            id: 1836,
            name: '陆丰市'
        }]
    }, {
        id: 210,
        name: '河源市',
        district: [{
            id: 1837,
            name: '源城区'
        }, {
            id: 1838,
            name: '紫金县'
        }, {
            id: 1839,
            name: '龙川县'
        }, {
            id: 1840,
            name: '连平县'
        }, {
            id: 1841,
            name: '和平县'
        }, {
            id: 1842,
            name: '东源县'
        }]
    }, {
        id: 211,
        name: '阳江市',
        district: [{
            id: 1843,
            name: '江城区'
        }, {
            id: 1844,
            name: '阳西县'
        }, {
            id: 1845,
            name: '阳东县'
        }, {
            id: 1846,
            name: '阳春市'
        }]
    }, {
        id: 212,
        name: '清远市',
        district: [{
            id: 1847,
            name: '清城区'
        }, {
            id: 1848,
            name: '佛冈县'
        }, {
            id: 1849,
            name: '阳山县'
        }, {
            id: 1850,
            name: '连山壮族瑶族自治县'
        }, {
            id: 1851,
            name: '连南瑶族自治县'
        }, {
            id: 1852,
            name: '清新县'
        }, {
            id: 1853,
            name: '英德市'
        }, {
            id: 1854,
            name: '连州市'
        }]
    }, {
        id: 213,
        name: '东莞市',
        district: []
    }, {
        id: 214,
        name: '中山市',
        district: []
    }, {
        id: 215,
        name: '潮州市',
        district: [{
            id: 1855,
            name: '湘桥区'
        }, {
            id: 1856,
            name: '潮安县'
        }, {
            id: 1857,
            name: '饶平县'
        }]
    }, {
        id: 216,
        name: '揭阳市',
        district: [{
            id: 1858,
            name: '榕城区'
        }, {
            id: 1859,
            name: '揭东县'
        }, {
            id: 1860,
            name: '揭西县'
        }, {
            id: 1861,
            name: '惠来县'
        }, {
            id: 1862,
            name: '普宁市'
        }]
    }, {
        id: 217,
        name: '云浮市',
        district: [{
            id: 1863,
            name: '云城区'
        }, {
            id: 1864,
            name: '新兴县'
        }, {
            id: 1865,
            name: '郁南县'
        }, {
            id: 1866,
            name: '云安县'
        }, {
            id: 1867,
            name: '罗定市'
        }]
    }]
}, {
    id: 20,
    name: '广西',
    city: [{
        id: 218,
        name: '南宁市',
        district: [{
            id: 1868,
            name: '兴宁区'
        }, {
            id: 1869,
            name: '青秀区'
        }, {
            id: 1870,
            name: '江南区'
        }, {
            id: 1871,
            name: '西乡塘区'
        }, {
            id: 1872,
            name: '良庆区'
        }, {
            id: 1873,
            name: '邕宁区'
        }, {
            id: 1874,
            name: '武鸣县'
        }, {
            id: 1875,
            name: '隆安县'
        }, {
            id: 1876,
            name: '马山县'
        }, {
            id: 1877,
            name: '上林县'
        }, {
            id: 1878,
            name: '宾阳县'
        }, {
            id: 1879,
            name: '横县'
        }]
    }, {
        id: 219,
        name: '柳州市',
        district: [{
            id: 1880,
            name: '城中区'
        }, {
            id: 1881,
            name: '鱼峰区'
        }, {
            id: 1882,
            name: '柳南区'
        }, {
            id: 1883,
            name: '柳北区'
        }, {
            id: 1884,
            name: '柳江县'
        }, {
            id: 1885,
            name: '柳城县'
        }, {
            id: 1886,
            name: '鹿寨县'
        }, {
            id: 1887,
            name: '融安县'
        }, {
            id: 1888,
            name: '融水苗族自治县'
        }, {
            id: 1889,
            name: '三江侗族自治县'
        }]
    }, {
        id: 220,
        name: '桂林市',
        district: [{
            id: 1890,
            name: '秀峰区'
        }, {
            id: 1891,
            name: '叠彩区'
        }, {
            id: 1892,
            name: '象山区'
        }, {
            id: 1893,
            name: '七星区'
        }, {
            id: 1894,
            name: '雁山区'
        }, {
            id: 1895,
            name: '阳朔县'
        }, {
            id: 1896,
            name: '临桂县'
        }, {
            id: 1897,
            name: '灵川县'
        }, {
            id: 1898,
            name: '全州县'
        }, {
            id: 1899,
            name: '兴安县'
        }, {
            id: 1900,
            name: '永福县'
        }, {
            id: 1901,
            name: '灌阳县'
        }, {
            id: 1902,
            name: '龙胜各族自治县'
        }, {
            id: 1903,
            name: '资源县'
        }, {
            id: 1904,
            name: '平乐县'
        }, {
            id: 1905,
            name: '荔蒲县'
        }, {
            id: 1906,
            name: '恭城瑶族自治县'
        }]
    }, {
        id: 221,
        name: '梧州市',
        district: [{
            id: 1907,
            name: '万秀区'
        }, {
            id: 1908,
            name: '蝶山区'
        }, {
            id: 1909,
            name: '长洲区'
        }, {
            id: 1910,
            name: '苍梧县'
        }, {
            id: 1911,
            name: '藤县'
        }, {
            id: 1912,
            name: '蒙山县'
        }, {
            id: 1913,
            name: '岑溪市'
        }]
    }, {
        id: 222,
        name: '北海市',
        district: [{
            id: 1914,
            name: '海城区'
        }, {
            id: 1915,
            name: '银海区'
        }, {
            id: 1916,
            name: '铁山港区'
        }, {
            id: 1917,
            name: '合浦县'
        }]
    }, {
        id: 223,
        name: '防城港市',
        district: [{
            id: 1918,
            name: '港口区'
        }, {
            id: 1919,
            name: '防城区'
        }, {
            id: 1920,
            name: '上思县'
        }, {
            id: 1921,
            name: '东兴市'
        }]
    }, {
        id: 224,
        name: '钦州市',
        district: [{
            id: 1922,
            name: '钦南区'
        }, {
            id: 1923,
            name: '钦北区'
        }, {
            id: 1924,
            name: '灵山县'
        }, {
            id: 1925,
            name: '浦北县'
        }]
    }, {
        id: 225,
        name: '贵港市',
        district: [{
            id: 1926,
            name: '港北区'
        }, {
            id: 1927,
            name: '港南区'
        }, {
            id: 1928,
            name: '覃塘区'
        }, {
            id: 1929,
            name: '平南县'
        }, {
            id: 1930,
            name: '桂平市'
        }]
    }, {
        id: 226,
        name: '玉林市',
        district: [{
            id: 1931,
            name: '玉州区'
        }, {
            id: 1932,
            name: '容县'
        }, {
            id: 1933,
            name: '陆川县'
        }, {
            id: 1934,
            name: '博白县'
        }, {
            id: 1935,
            name: '兴业县'
        }, {
            id: 1936,
            name: '北流市'
        }]
    }, {
        id: 227,
        name: '百色市',
        district: [{
            id: 1937,
            name: '右江区'
        }, {
            id: 1938,
            name: '田阳县'
        }, {
            id: 1939,
            name: '田东县'
        }, {
            id: 1940,
            name: '平果县'
        }, {
            id: 1941,
            name: '德保县'
        }, {
            id: 1942,
            name: '靖西县'
        }, {
            id: 1943,
            name: '那坡县'
        }, {
            id: 1944,
            name: '凌云县'
        }, {
            id: 1945,
            name: '乐业县'
        }, {
            id: 1946,
            name: '田林县'
        }, {
            id: 1947,
            name: '西林县'
        }, {
            id: 1948,
            name: '隆林各族自治县'
        }]
    }, {
        id: 228,
        name: '贺州市',
        district: [{
            id: 1949,
            name: '八步区'
        }, {
            id: 1950,
            name: '昭平县'
        }, {
            id: 1951,
            name: '钟山县'
        }, {
            id: 1952,
            name: '富川瑶族自治县'
        }]
    }, {
        id: 229,
        name: '河池市',
        district: [{
            id: 1953,
            name: '金城江区'
        }, {
            id: 1954,
            name: '南丹县'
        }, {
            id: 1955,
            name: '天峨县'
        }, {
            id: 1956,
            name: '凤山县'
        }, {
            id: 1957,
            name: '东兰县'
        }, {
            id: 1958,
            name: '罗城仫佬族自治县'
        }, {
            id: 1959,
            name: '环江毛南族自治县'
        }, {
            id: 1960,
            name: '巴马瑶族自治县'
        }, {
            id: 1961,
            name: '都安瑶族自治县'
        }, {
            id: 1962,
            name: '大化瑶族自治县'
        }, {
            id: 1963,
            name: '宜州市'
        }]
    }, {
        id: 230,
        name: '来宾市',
        district: [{
            id: 1964,
            name: '兴宾区'
        }, {
            id: 1965,
            name: '忻城县'
        }, {
            id: 1966,
            name: '象州县'
        }, {
            id: 1967,
            name: '武宣县'
        }, {
            id: 1968,
            name: '金秀瑶族自治县'
        }, {
            id: 1969,
            name: '合山市'
        }]
    }, {
        id: 231,
        name: '崇左市',
        district: [{
            id: 1970,
            name: '江洲区'
        }, {
            id: 1971,
            name: '扶绥县'
        }, {
            id: 1972,
            name: '宁明县'
        }, {
            id: 1973,
            name: '龙州县'
        }, {
            id: 1974,
            name: '大新县'
        }, {
            id: 1975,
            name: '天等县'
        }, {
            id: 1976,
            name: '凭祥市'
        }]
    }]
}, {
    id: 21,
    name: '海南',
    city: [{
        id: 232,
        name: '海口市',
        district: [{
            id: 1977,
            name: '秀英区'
        }, {
            id: 1978,
            name: '龙华区'
        }, {
            id: 1979,
            name: '琼山区'
        }, {
            id: 1980,
            name: '美兰区'
        }]
    }, {
        id: 233,
        name: '三亚市',
        district: [{
            id: 1981,
            name: '五指山市'
        }, {
            id: 1982,
            name: '琼海市'
        }, {
            id: 1983,
            name: '儋州市'
        }, {
            id: 1984,
            name: '文昌市'
        }, {
            id: 1985,
            name: '万宁市'
        }, {
            id: 1986,
            name: '东方市'
        }, {
            id: 1987,
            name: '定安县'
        }, {
            id: 1988,
            name: '屯昌县'
        }, {
            id: 1989,
            name: '澄迈县'
        }, {
            id: 1990,
            name: '临高县'
        }, {
            id: 1991,
            name: '白沙黎族自治县'
        }, {
            id: 1992,
            name: '昌江黎族自治县'
        }, {
            id: 1993,
            name: '乐东黎族自治县'
        }, {
            id: 1994,
            name: '陵水黎族自治县'
        }, {
            id: 1995,
            name: '保亭黎族苗族自治县'
        }, {
            id: 1996,
            name: '琼中黎族苗族自治县'
        }, {
            id: 1997,
            name: '西沙群岛'
        }, {
            id: 1998,
            name: '南沙群岛'
        }, {
            id: 1999,
            name: '中沙群岛的岛礁及其海域'
        }]
    }]
}, {
    id: 22,
    name: '重庆',
    city: [{
        id: 234,
        name: '重庆市',
        district: [{
            id: 2000,
            name: '万州区'
        }, {
            id: 2001,
            name: '涪陵区'
        }, {
            id: 2002,
            name: '渝中区'
        }, {
            id: 2003,
            name: '大渡口区'
        }, {
            id: 2004,
            name: '江北区'
        }, {
            id: 2005,
            name: '沙坪坝区'
        }, {
            id: 2006,
            name: '九龙坡区'
        }, {
            id: 2007,
            name: '南岸区'
        }, {
            id: 2008,
            name: '北碚区'
        }, {
            id: 2009,
            name: '万盛区'
        }, {
            id: 2010,
            name: '双桥区'
        }, {
            id: 2011,
            name: '渝北区'
        }, {
            id: 2012,
            name: '巴南区'
        }, {
            id: 2013,
            name: '黔江区'
        }, {
            id: 2014,
            name: '长寿区'
        }, {
            id: 2015,
            name: '綦江县'
        }, {
            id: 2016,
            name: '潼南县'
        }, {
            id: 2017,
            name: '铜梁县'
        }, {
            id: 2018,
            name: '大足县'
        }, {
            id: 2019,
            name: '荣昌县'
        }, {
            id: 2020,
            name: '璧山县'
        }, {
            id: 2021,
            name: '梁平县'
        }, {
            id: 2022,
            name: '城口县'
        }, {
            id: 2023,
            name: '丰都县'
        }, {
            id: 2024,
            name: '垫江县'
        }, {
            id: 2025,
            name: '武隆县'
        }, {
            id: 2026,
            name: '忠县'
        }, {
            id: 2027,
            name: '开县'
        }, {
            id: 2028,
            name: '云阳县'
        }, {
            id: 2029,
            name: '奉节县'
        }, {
            id: 2030,
            name: '巫山县'
        }, {
            id: 2031,
            name: '巫溪县'
        }, {
            id: 2032,
            name: '石柱土家族自治县'
        }, {
            id: 2033,
            name: '秀山土家族苗族自治县'
        }, {
            id: 2034,
            name: '酉阳土家族苗族自治县'
        }, {
            id: 2035,
            name: '彭水苗族土家族自治县'
        }, {
            id: 2036,
            name: '江津市'
        }, {
            id: 2037,
            name: '合川市'
        }, {
            id: 2038,
            name: '永川市'
        }, {
            id: 2039,
            name: '南川市'
        }]
    }]
}, {
    id: 23,
    name: '四川',
    city: [{
        id: 235,
        name: '成都市',
        district: [{
            id: 2040,
            name: '锦江区'
        }, {
            id: 2041,
            name: '青羊区'
        }, {
            id: 2042,
            name: '金牛区'
        }, {
            id: 2043,
            name: '武侯区'
        }, {
            id: 2044,
            name: '成华区'
        }, {
            id: 2045,
            name: '龙泉驿区'
        }, {
            id: 2046,
            name: '青白江区'
        }, {
            id: 2047,
            name: '新都区'
        }, {
            id: 2048,
            name: '温江区'
        }, {
            id: 2049,
            name: '金堂县'
        }, {
            id: 2050,
            name: '双流县'
        }, {
            id: 2051,
            name: '郫县'
        }, {
            id: 2052,
            name: '大邑县'
        }, {
            id: 2053,
            name: '蒲江县'
        }, {
            id: 2054,
            name: '新津县'
        }, {
            id: 2055,
            name: '都江堰市'
        }, {
            id: 2056,
            name: '彭州市'
        }, {
            id: 2057,
            name: '邛崃市'
        }, {
            id: 2058,
            name: '崇州市'
        }]
    }, {
        id: 236,
        name: '自贡市',
        district: [{
            id: 2059,
            name: '自流井区'
        }, {
            id: 2060,
            name: '贡井区'
        }, {
            id: 2061,
            name: '大安区'
        }, {
            id: 2062,
            name: '沿滩区'
        }, {
            id: 2063,
            name: '荣县'
        }, {
            id: 2064,
            name: '富顺县'
        }]
    }, {
        id: 237,
        name: '攀枝花市',
        district: [{
            id: 2065,
            name: '东区'
        }, {
            id: 2066,
            name: '西区'
        }, {
            id: 2067,
            name: '仁和区'
        }, {
            id: 2068,
            name: '米易县'
        }, {
            id: 2069,
            name: '盐边县'
        }]
    }, {
        id: 238,
        name: '泸州市',
        district: [{
            id: 2070,
            name: '江阳区'
        }, {
            id: 2071,
            name: '纳溪区'
        }, {
            id: 2072,
            name: '龙马潭区'
        }, {
            id: 2073,
            name: '泸县'
        }, {
            id: 2074,
            name: '合江县'
        }, {
            id: 2075,
            name: '叙永县'
        }, {
            id: 2076,
            name: '古蔺县'
        }]
    }, {
        id: 239,
        name: '德阳市',
        district: [{
            id: 2077,
            name: '旌阳区'
        }, {
            id: 2078,
            name: '中江县'
        }, {
            id: 2079,
            name: '罗江县'
        }, {
            id: 2080,
            name: '广汉市'
        }, {
            id: 2081,
            name: '什邡市'
        }, {
            id: 2082,
            name: '绵竹市'
        }]
    }, {
        id: 240,
        name: '绵阳市',
        district: [{
            id: 2083,
            name: '涪城区'
        }, {
            id: 2084,
            name: '游仙区'
        }, {
            id: 2085,
            name: '三台县'
        }, {
            id: 2086,
            name: '盐亭县'
        }, {
            id: 2087,
            name: '安县'
        }, {
            id: 2088,
            name: '梓潼县'
        }, {
            id: 2089,
            name: '北川羌族自治县'
        }, {
            id: 2090,
            name: '平武县'
        }, {
            id: 2091,
            name: '江油市'
        }]
    }, {
        id: 241,
        name: '广元市',
        district: [{
            id: 2092,
            name: '市中区'
        }, {
            id: 2093,
            name: '元坝区'
        }, {
            id: 2094,
            name: '朝天区'
        }, {
            id: 2095,
            name: '旺苍县'
        }, {
            id: 2096,
            name: '青川县'
        }, {
            id: 2097,
            name: '剑阁县'
        }, {
            id: 2098,
            name: '苍溪县'
        }]
    }, {
        id: 242,
        name: '遂宁市',
        district: [{
            id: 2099,
            name: '船山区'
        }, {
            id: 2100,
            name: '安居区'
        }, {
            id: 2101,
            name: '蓬溪县'
        }, {
            id: 2102,
            name: '射洪县'
        }, {
            id: 2103,
            name: '大英县'
        }]
    }, {
        id: 243,
        name: '内江市',
        district: [{
            id: 2104,
            name: '市中区'
        }, {
            id: 2105,
            name: '东兴区'
        }, {
            id: 2106,
            name: '威远县'
        }, {
            id: 2107,
            name: '资中县'
        }, {
            id: 2108,
            name: '隆昌县'
        }]
    }, {
        id: 244,
        name: '乐山市',
        district: [{
            id: 2109,
            name: '市中区'
        }, {
            id: 2110,
            name: '沙湾区'
        }, {
            id: 2111,
            name: '五通桥区'
        }, {
            id: 2112,
            name: '金口河区'
        }, {
            id: 2113,
            name: '犍为县'
        }, {
            id: 2114,
            name: '井研县'
        }, {
            id: 2115,
            name: '夹江县'
        }, {
            id: 2116,
            name: '沐川县'
        }, {
            id: 2117,
            name: '峨边彝族自治县'
        }, {
            id: 2118,
            name: '马边彝族自治县'
        }, {
            id: 2119,
            name: '峨眉山市'
        }]
    }, {
        id: 245,
        name: '南充市',
        district: [{
            id: 2120,
            name: '顺庆区'
        }, {
            id: 2121,
            name: '高坪区'
        }, {
            id: 2122,
            name: '嘉陵区'
        }, {
            id: 2123,
            name: '南部县'
        }, {
            id: 2124,
            name: '营山县'
        }, {
            id: 2125,
            name: '蓬安县'
        }, {
            id: 2126,
            name: '仪陇县'
        }, {
            id: 2127,
            name: '西充县'
        }, {
            id: 2128,
            name: '阆中市'
        }]
    }, {
        id: 246,
        name: '眉山市',
        district: [{
            id: 2129,
            name: '东坡区'
        }, {
            id: 2130,
            name: '仁寿县'
        }, {
            id: 2131,
            name: '彭山县'
        }, {
            id: 2132,
            name: '洪雅县'
        }, {
            id: 2133,
            name: '丹棱县'
        }, {
            id: 2134,
            name: '青神县'
        }]
    }, {
        id: 247,
        name: '宜宾市',
        district: [{
            id: 2135,
            name: '翠屏区'
        }, {
            id: 2136,
            name: '宜宾县'
        }, {
            id: 2137,
            name: '南溪县'
        }, {
            id: 2138,
            name: '江安县'
        }, {
            id: 2139,
            name: '长宁县'
        }, {
            id: 2140,
            name: '高县'
        }, {
            id: 2141,
            name: '珙县'
        }, {
            id: 2142,
            name: '筠连县'
        }, {
            id: 2143,
            name: '兴文县'
        }, {
            id: 2144,
            name: '屏山县'
        }]
    }, {
        id: 248,
        name: '广安市',
        district: [{
            id: 2145,
            name: '广安区'
        }, {
            id: 2146,
            name: '岳池县'
        }, {
            id: 2147,
            name: '武胜县'
        }, {
            id: 2148,
            name: '邻水县'
        }, {
            id: 2149,
            name: '华蓥市'
        }]
    }, {
        id: 249,
        name: '达州市',
        district: [{
            id: 2150,
            name: '通川区'
        }, {
            id: 2151,
            name: '达县'
        }, {
            id: 2152,
            name: '宣汉县'
        }, {
            id: 2153,
            name: '开江县'
        }, {
            id: 2154,
            name: '大竹县'
        }, {
            id: 2155,
            name: '渠县'
        }, {
            id: 2156,
            name: '万源市'
        }]
    }, {
        id: 250,
        name: '雅安市',
        district: [{
            id: 2157,
            name: '雨城区'
        }, {
            id: 2158,
            name: '名山县'
        }, {
            id: 2159,
            name: '荥经县'
        }, {
            id: 2160,
            name: '汉源县'
        }, {
            id: 2161,
            name: '石棉县'
        }, {
            id: 2162,
            name: '天全县'
        }, {
            id: 2163,
            name: '芦山县'
        }, {
            id: 2164,
            name: '宝兴县'
        }]
    }, {
        id: 251,
        name: '巴中市',
        district: [{
            id: 2165,
            name: '巴州区'
        }, {
            id: 2166,
            name: '通江县'
        }, {
            id: 2167,
            name: '南江县'
        }, {
            id: 2168,
            name: '平昌县'
        }]
    }, {
        id: 252,
        name: '资阳市',
        district: [{
            id: 2169,
            name: '雁江区'
        }, {
            id: 2170,
            name: '安岳县'
        }, {
            id: 2171,
            name: '乐至县'
        }, {
            id: 2172,
            name: '简阳市'
        }]
    }, {
        id: 253,
        name: '阿坝',
        district: [{
            id: 2173,
            name: '汶川县'
        }, {
            id: 2174,
            name: '理县'
        }, {
            id: 2175,
            name: '茂县'
        }, {
            id: 2176,
            name: '松潘县'
        }, {
            id: 2177,
            name: '九寨沟县'
        }, {
            id: 2178,
            name: '金川县'
        }, {
            id: 2179,
            name: '小金县'
        }, {
            id: 2180,
            name: '黑水县'
        }, {
            id: 2181,
            name: '马尔康县'
        }, {
            id: 2182,
            name: '壤塘县'
        }, {
            id: 2183,
            name: '阿坝县'
        }, {
            id: 2184,
            name: '若尔盖县'
        }, {
            id: 2185,
            name: '红原县'
        }]
    }, {
        id: 254,
        name: '甘孜',
        district: [{
            id: 2186,
            name: '康定县'
        }, {
            id: 2187,
            name: '泸定县'
        }, {
            id: 2188,
            name: '丹巴县'
        }, {
            id: 2189,
            name: '九龙县'
        }, {
            id: 2190,
            name: '雅江县'
        }, {
            id: 2191,
            name: '道孚县'
        }, {
            id: 2192,
            name: '炉霍县'
        }, {
            id: 2193,
            name: '甘孜县'
        }, {
            id: 2194,
            name: '新龙县'
        }, {
            id: 2195,
            name: '德格县'
        }, {
            id: 2196,
            name: '白玉县'
        }, {
            id: 2197,
            name: '石渠县'
        }, {
            id: 2198,
            name: '色达县'
        }, {
            id: 2199,
            name: '理塘县'
        }, {
            id: 2200,
            name: '巴塘县'
        }, {
            id: 2201,
            name: '乡城县'
        }, {
            id: 2202,
            name: '稻城县'
        }, {
            id: 2203,
            name: '得荣县'
        }]
    }, {
        id: 255,
        name: '凉山',
        district: [{
            id: 2204,
            name: '西昌市'
        }, {
            id: 2205,
            name: '木里藏族自治县'
        }, {
            id: 2206,
            name: '盐源县'
        }, {
            id: 2207,
            name: '德昌县'
        }, {
            id: 2208,
            name: '会理县'
        }, {
            id: 2209,
            name: '会东县'
        }, {
            id: 2210,
            name: '宁南县'
        }, {
            id: 2211,
            name: '普格县'
        }, {
            id: 2212,
            name: '布拖县'
        }, {
            id: 2213,
            name: '金阳县'
        }, {
            id: 2214,
            name: '昭觉县'
        }, {
            id: 2215,
            name: '喜德县'
        }, {
            id: 2216,
            name: '冕宁县'
        }, {
            id: 2217,
            name: '越西县'
        }, {
            id: 2218,
            name: '甘洛县'
        }, {
            id: 2219,
            name: '美姑县'
        }, {
            id: 2220,
            name: '雷波县'
        }]
    }]
}, {
    id: 24,
    name: '贵州',
    city: [{
        id: 256,
        name: '贵阳市',
        district: [{
            id: 2221,
            name: '南明区'
        }, {
            id: 2222,
            name: '云岩区'
        }, {
            id: 2223,
            name: '花溪区'
        }, {
            id: 2224,
            name: '乌当区'
        }, {
            id: 2225,
            name: '白云区'
        }, {
            id: 2226,
            name: '小河区'
        }, {
            id: 2227,
            name: '开阳县'
        }, {
            id: 2228,
            name: '息烽县'
        }, {
            id: 2229,
            name: '修文县'
        }, {
            id: 2230,
            name: '清镇市'
        }]
    }, {
        id: 257,
        name: '六盘水市',
        district: [{
            id: 2231,
            name: '钟山区'
        }, {
            id: 2232,
            name: '六枝特区'
        }, {
            id: 2233,
            name: '水城县'
        }, {
            id: 2234,
            name: '盘县'
        }]
    }, {
        id: 258,
        name: '遵义市',
        district: [{
            id: 2235,
            name: '红花岗区'
        }, {
            id: 2236,
            name: '汇川区'
        }, {
            id: 2237,
            name: '遵义县'
        }, {
            id: 2238,
            name: '桐梓县'
        }, {
            id: 2239,
            name: '绥阳县'
        }, {
            id: 2240,
            name: '正安县'
        }, {
            id: 2241,
            name: '道真仡佬族苗族自治县'
        }, {
            id: 2242,
            name: '务川仡佬族苗族自治县'
        }, {
            id: 2243,
            name: '凤冈县'
        }, {
            id: 2244,
            name: '湄潭县'
        }, {
            id: 2245,
            name: '余庆县'
        }, {
            id: 2246,
            name: '习水县'
        }, {
            id: 2247,
            name: '赤水市'
        }, {
            id: 2248,
            name: '仁怀市'
        }]
    }, {
        id: 259,
        name: '安顺市',
        district: [{
            id: 2249,
            name: '西秀区'
        }, {
            id: 2250,
            name: '平坝县'
        }, {
            id: 2251,
            name: '普定县'
        }, {
            id: 2252,
            name: '镇宁布依族苗族自治县'
        }, {
            id: 2253,
            name: '关岭布依族苗族自治县'
        }, {
            id: 2254,
            name: '紫云苗族布依族自治县'
        }]
    }, {
        id: 260,
        name: '铜仁地区',
        district: [{
            id: 2255,
            name: '铜仁市'
        }, {
            id: 2256,
            name: '江口县'
        }, {
            id: 2257,
            name: '玉屏侗族自治县'
        }, {
            id: 2258,
            name: '石阡县'
        }, {
            id: 2259,
            name: '思南县'
        }, {
            id: 2260,
            name: '印江土家族苗族自治县'
        }, {
            id: 2261,
            name: '德江县'
        }, {
            id: 2262,
            name: '沿河土家族自治县'
        }, {
            id: 2263,
            name: '松桃苗族自治县'
        }, {
            id: 2264,
            name: '万山特区'
        }]
    }, {
        id: 261,
        name: '黔西',
        district: [{
            id: 2265,
            name: '兴义市'
        }, {
            id: 2266,
            name: '兴仁县'
        }, {
            id: 2267,
            name: '普安县'
        }, {
            id: 2268,
            name: '晴隆县'
        }, {
            id: 2269,
            name: '贞丰县'
        }, {
            id: 2270,
            name: '望谟县'
        }, {
            id: 2271,
            name: '册亨县'
        }, {
            id: 2272,
            name: '安龙县'
        }]
    }, {
        id: 262,
        name: '毕节地区',
        district: [{
            id: 2273,
            name: '毕节市'
        }, {
            id: 2274,
            name: '大方县'
        }, {
            id: 2275,
            name: '黔西县'
        }, {
            id: 2276,
            name: '金沙县'
        }, {
            id: 2277,
            name: '织金县'
        }, {
            id: 2278,
            name: '纳雍县'
        }, {
            id: 2279,
            name: '威宁彝族回族苗族自治县'
        }, {
            id: 2280,
            name: '赫章县'
        }]
    }, {
        id: 263,
        name: '黔东',
        district: [{
            id: 2281,
            name: '凯里市'
        }, {
            id: 2282,
            name: '黄平县'
        }, {
            id: 2283,
            name: '施秉县'
        }, {
            id: 2284,
            name: '三穗县'
        }, {
            id: 2285,
            name: '镇远县'
        }, {
            id: 2286,
            name: '岑巩县'
        }, {
            id: 2287,
            name: '天柱县'
        }, {
            id: 2288,
            name: '锦屏县'
        }, {
            id: 2289,
            name: '剑河县'
        }, {
            id: 2290,
            name: '台江县'
        }, {
            id: 2291,
            name: '黎平县'
        }, {
            id: 2292,
            name: '榕江县'
        }, {
            id: 2293,
            name: '从江县'
        }, {
            id: 2294,
            name: '雷山县'
        }, {
            id: 2295,
            name: '麻江县'
        }, {
            id: 2296,
            name: '丹寨县'
        }]
    }, {
        id: 264,
        name: '黔南',
        district: [{
            id: 2297,
            name: '都匀市'
        }, {
            id: 2298,
            name: '福泉市'
        }, {
            id: 2299,
            name: '荔波县'
        }, {
            id: 2300,
            name: '贵定县'
        }, {
            id: 2301,
            name: '瓮安县'
        }, {
            id: 2302,
            name: '独山县'
        }, {
            id: 2303,
            name: '平塘县'
        }, {
            id: 2304,
            name: '罗甸县'
        }, {
            id: 2305,
            name: '长顺县'
        }, {
            id: 2306,
            name: '龙里县'
        }, {
            id: 2307,
            name: '惠水县'
        }, {
            id: 2308,
            name: '三都水族自治县'
        }]
    }]
}, {
    id: 25,
    name: '云南',
    city: [{
        id: 265,
        name: '昆明市',
        district: [{
            id: 2309,
            name: '五华区'
        }, {
            id: 2310,
            name: '盘龙区'
        }, {
            id: 2311,
            name: '官渡区'
        }, {
            id: 2312,
            name: '西山区'
        }, {
            id: 2313,
            name: '东川区'
        }, {
            id: 2314,
            name: '呈贡县'
        }, {
            id: 2315,
            name: '晋宁县'
        }, {
            id: 2316,
            name: '富民县'
        }, {
            id: 2317,
            name: '宜良县'
        }, {
            id: 2318,
            name: '石林彝族自治县'
        }, {
            id: 2319,
            name: '嵩明县'
        }, {
            id: 2320,
            name: '禄劝彝族苗族自治县'
        }, {
            id: 2321,
            name: '寻甸回族彝族自治县'
        }, {
            id: 2322,
            name: '安宁市'
        }]
    }, {
        id: 266,
        name: '曲靖市',
        district: [{
            id: 2323,
            name: '麒麟区'
        }, {
            id: 2324,
            name: '马龙县'
        }, {
            id: 2325,
            name: '陆良县'
        }, {
            id: 2326,
            name: '师宗县'
        }, {
            id: 2327,
            name: '罗平县'
        }, {
            id: 2328,
            name: '富源县'
        }, {
            id: 2329,
            name: '会泽县'
        }, {
            id: 2330,
            name: '沾益县'
        }, {
            id: 2331,
            name: '宣威市'
        }]
    }, {
        id: 267,
        name: '玉溪市',
        district: [{
            id: 2332,
            name: '红塔区'
        }, {
            id: 2333,
            name: '江川县'
        }, {
            id: 2334,
            name: '澄江县'
        }, {
            id: 2335,
            name: '通海县'
        }, {
            id: 2336,
            name: '华宁县'
        }, {
            id: 2337,
            name: '易门县'
        }, {
            id: 2338,
            name: '峨山彝族自治县'
        }, {
            id: 2339,
            name: '新平彝族傣族自治县'
        }, {
            id: 2340,
            name: '元江哈尼族彝族傣族自治县'
        }]
    }, {
        id: 268,
        name: '保山市',
        district: [{
            id: 2341,
            name: '隆阳区'
        }, {
            id: 2342,
            name: '施甸县'
        }, {
            id: 2343,
            name: '腾冲县'
        }, {
            id: 2344,
            name: '龙陵县'
        }, {
            id: 2345,
            name: '昌宁县'
        }]
    }, {
        id: 269,
        name: '昭通市',
        district: [{
            id: 2346,
            name: '昭阳区'
        }, {
            id: 2347,
            name: '鲁甸县'
        }, {
            id: 2348,
            name: '巧家县'
        }, {
            id: 2349,
            name: '盐津县'
        }, {
            id: 2350,
            name: '大关县'
        }, {
            id: 2351,
            name: '永善县'
        }, {
            id: 2352,
            name: '绥江县'
        }, {
            id: 2353,
            name: '镇雄县'
        }, {
            id: 2354,
            name: '彝良县'
        }, {
            id: 2355,
            name: '威信县'
        }, {
            id: 2356,
            name: '水富县'
        }]
    }, {
        id: 270,
        name: '丽江市',
        district: [{
            id: 2357,
            name: '古城区'
        }, {
            id: 2358,
            name: '玉龙纳西族自治县'
        }, {
            id: 2359,
            name: '永胜县'
        }, {
            id: 2360,
            name: '华坪县'
        }, {
            id: 2361,
            name: '宁蒗彝族自治县'
        }]
    }, {
        id: 271,
        name: '思茅市',
        district: [{
            id: 2362,
            name: '翠云区'
        }, {
            id: 2363,
            name: '普洱哈尼族彝族自治县'
        }, {
            id: 2364,
            name: '墨江哈尼族自治县'
        }, {
            id: 2365,
            name: '景东彝族自治县'
        }, {
            id: 2366,
            name: '景谷傣族彝族自治县'
        }, {
            id: 2367,
            name: '镇沅彝族哈尼族拉祜族自治县'
        }, {
            id: 2368,
            name: '江城哈尼族彝族自治县'
        }, {
            id: 2369,
            name: '孟连傣族拉祜族佤族自治县'
        }, {
            id: 2370,
            name: '澜沧拉祜族自治县'
        }, {
            id: 2371,
            name: '西盟佤族自治县'
        }]
    }, {
        id: 272,
        name: '临沧市',
        district: [{
            id: 2372,
            name: '临翔区'
        }, {
            id: 2373,
            name: '凤庆县'
        }, {
            id: 2374,
            name: '云县'
        }, {
            id: 2375,
            name: '永德县'
        }, {
            id: 2376,
            name: '镇康县'
        }, {
            id: 2377,
            name: '双江拉祜族佤族布朗族傣族自治县'
        }, {
            id: 2378,
            name: '耿马傣族佤族自治县'
        }, {
            id: 2379,
            name: '沧源佤族自治县'
        }]
    }, {
        id: 273,
        name: '楚雄',
        district: [{
            id: 2380,
            name: '楚雄市'
        }, {
            id: 2381,
            name: '双柏县'
        }, {
            id: 2382,
            name: '牟定县'
        }, {
            id: 2383,
            name: '南华县'
        }, {
            id: 2384,
            name: '姚安县'
        }, {
            id: 2385,
            name: '大姚县'
        }, {
            id: 2386,
            name: '永仁县'
        }, {
            id: 2387,
            name: '元谋县'
        }, {
            id: 2388,
            name: '武定县'
        }, {
            id: 2389,
            name: '禄丰县'
        }]
    }, {
        id: 274,
        name: '红河',
        district: [{
            id: 2390,
            name: '个旧市'
        }, {
            id: 2391,
            name: '开远市'
        }, {
            id: 2392,
            name: '蒙自县'
        }, {
            id: 2393,
            name: '屏边苗族自治县'
        }, {
            id: 2394,
            name: '建水县'
        }, {
            id: 2395,
            name: '石屏县'
        }, {
            id: 2396,
            name: '弥勒县'
        }, {
            id: 2397,
            name: '泸西县'
        }, {
            id: 2398,
            name: '元阳县'
        }, {
            id: 2399,
            name: '红河县'
        }, {
            id: 2400,
            name: '金平苗族瑶族傣族自治县'
        }, {
            id: 2401,
            name: '绿春县'
        }, {
            id: 2402,
            name: '河口瑶族自治县'
        }]
    }, {
        id: 275,
        name: '文山',
        district: [{
            id: 2403,
            name: '文山县'
        }, {
            id: 2404,
            name: '砚山县'
        }, {
            id: 2405,
            name: '西畴县'
        }, {
            id: 2406,
            name: '麻栗坡县'
        }, {
            id: 2407,
            name: '马关县'
        }, {
            id: 2408,
            name: '丘北县'
        }, {
            id: 2409,
            name: '广南县'
        }, {
            id: 2410,
            name: '富宁县'
        }]
    }, {
        id: 276,
        name: '西双版纳',
        district: [{
            id: 2411,
            name: '景洪市'
        }, {
            id: 2412,
            name: '勐海县'
        }, {
            id: 2413,
            name: '勐腊县'
        }]
    }, {
        id: 277,
        name: '大理',
        district: [{
            id: 2414,
            name: '大理市'
        }, {
            id: 2415,
            name: '漾濞彝族自治县'
        }, {
            id: 2416,
            name: '祥云县'
        }, {
            id: 2417,
            name: '宾川县'
        }, {
            id: 2418,
            name: '弥渡县'
        }, {
            id: 2419,
            name: '南涧彝族自治县'
        }, {
            id: 2420,
            name: '巍山彝族回族自治县'
        }, {
            id: 2421,
            name: '永平县'
        }, {
            id: 2422,
            name: '云龙县'
        }, {
            id: 2423,
            name: '洱源县'
        }, {
            id: 2424,
            name: '剑川县'
        }, {
            id: 2425,
            name: '鹤庆县'
        }]
    }, {
        id: 278,
        name: '德宏',
        district: [{
            id: 2426,
            name: '瑞丽市'
        }, {
            id: 2427,
            name: '潞西市'
        }, {
            id: 2428,
            name: '梁河县'
        }, {
            id: 2429,
            name: '盈江县'
        }, {
            id: 2430,
            name: '陇川县'
        }]
    }, {
        id: 279,
        name: '怒江',
        district: [{
            id: 2431,
            name: '泸水县'
        }, {
            id: 2432,
            name: '福贡县'
        }, {
            id: 2433,
            name: '贡山独龙族怒族自治县'
        }, {
            id: 2434,
            name: '兰坪白族普米族自治县'
        }]
    }, {
        id: 280,
        name: '迪庆',
        district: [{
            id: 2435,
            name: '香格里拉县'
        }, {
            id: 2436,
            name: '德钦县'
        }, {
            id: 2437,
            name: '维西傈僳族自治县'
        }]
    }]
}, {
    id: 26,
    name: '西藏',
    city: [{
        id: 281,
        name: '拉萨市',
        district: [{
            id: 2438,
            name: '城关区'
        }, {
            id: 2439,
            name: '林周县'
        }, {
            id: 2440,
            name: '当雄县'
        }, {
            id: 2441,
            name: '尼木县'
        }, {
            id: 2442,
            name: '曲水县'
        }, {
            id: 2443,
            name: '堆龙德庆县'
        }, {
            id: 2444,
            name: '达孜县'
        }, {
            id: 2445,
            name: '墨竹工卡县'
        }]
    }, {
        id: 282,
        name: '昌都地区',
        district: [{
            id: 2446,
            name: '昌都县'
        }, {
            id: 2447,
            name: '江达县'
        }, {
            id: 2448,
            name: '贡觉县'
        }, {
            id: 2449,
            name: '类乌齐县'
        }, {
            id: 2450,
            name: '丁青县'
        }, {
            id: 2451,
            name: '察雅县'
        }, {
            id: 2452,
            name: '八宿县'
        }, {
            id: 2453,
            name: '左贡县'
        }, {
            id: 2454,
            name: '芒康县'
        }, {
            id: 2455,
            name: '洛隆县'
        }, {
            id: 2456,
            name: '边坝县'
        }]
    }, {
        id: 283,
        name: '山南地区',
        district: [{
            id: 2457,
            name: '乃东县'
        }, {
            id: 2458,
            name: '扎囊县'
        }, {
            id: 2459,
            name: '贡嘎县'
        }, {
            id: 2460,
            name: '桑日县'
        }, {
            id: 2461,
            name: '琼结县'
        }, {
            id: 2462,
            name: '曲松县'
        }, {
            id: 2463,
            name: '措美县'
        }, {
            id: 2464,
            name: '洛扎县'
        }, {
            id: 2465,
            name: '加查县'
        }, {
            id: 2466,
            name: '隆子县'
        }, {
            id: 2467,
            name: '错那县'
        }, {
            id: 2468,
            name: '浪卡子县'
        }]
    }, {
        id: 284,
        name: '日喀则地区',
        district: [{
            id: 2469,
            name: '日喀则市'
        }, {
            id: 2470,
            name: '南木林县'
        }, {
            id: 2471,
            name: '江孜县'
        }, {
            id: 2472,
            name: '定日县'
        }, {
            id: 2473,
            name: '萨迦县'
        }, {
            id: 2474,
            name: '拉孜县'
        }, {
            id: 2475,
            name: '昂仁县'
        }, {
            id: 2476,
            name: '谢通门县'
        }, {
            id: 2477,
            name: '白朗县'
        }, {
            id: 2478,
            name: '仁布县'
        }, {
            id: 2479,
            name: '康马县'
        }, {
            id: 2480,
            name: '定结县'
        }, {
            id: 2481,
            name: '仲巴县'
        }, {
            id: 2482,
            name: '亚东县'
        }, {
            id: 2483,
            name: '吉隆县'
        }, {
            id: 2484,
            name: '聂拉木县'
        }, {
            id: 2485,
            name: '萨嘎县'
        }, {
            id: 2486,
            name: '岗巴县'
        }]
    }, {
        id: 285,
        name: '那曲地区',
        district: [{
            id: 2487,
            name: '那曲县'
        }, {
            id: 2488,
            name: '嘉黎县'
        }, {
            id: 2489,
            name: '比如县'
        }, {
            id: 2490,
            name: '聂荣县'
        }, {
            id: 2491,
            name: '安多县'
        }, {
            id: 2492,
            name: '申扎县'
        }, {
            id: 2493,
            name: '索县'
        }, {
            id: 2494,
            name: '班戈县'
        }, {
            id: 2495,
            name: '巴青县'
        }, {
            id: 2496,
            name: '尼玛县'
        }]
    }, {
        id: 286,
        name: '阿里地区',
        district: [{
            id: 2497,
            name: '普兰县'
        }, {
            id: 2498,
            name: '札达县'
        }, {
            id: 2499,
            name: '噶尔县'
        }, {
            id: 2500,
            name: '日土县'
        }, {
            id: 2501,
            name: '革吉县'
        }, {
            id: 2502,
            name: '改则县'
        }, {
            id: 2503,
            name: '措勤县'
        }]
    }, {
        id: 287,
        name: '林芝地区',
        district: [{
            id: 2504,
            name: '林芝县'
        }, {
            id: 2505,
            name: '工布江达县'
        }, {
            id: 2506,
            name: '米林县'
        }, {
            id: 2507,
            name: '墨脱县'
        }, {
            id: 2508,
            name: '波密县'
        }, {
            id: 2509,
            name: '察隅县'
        }, {
            id: 2510,
            name: '朗县'
        }]
    }]
}, {
    id: 27,
    name: '陕西',
    city: [{
        id: 288,
        name: '西安市',
        district: [{
            id: 2511,
            name: '新城区'
        }, {
            id: 2512,
            name: '碑林区'
        }, {
            id: 2513,
            name: '莲湖区'
        }, {
            id: 2514,
            name: '灞桥区'
        }, {
            id: 2515,
            name: '未央区'
        }, {
            id: 2516,
            name: '雁塔区'
        }, {
            id: 2517,
            name: '阎良区'
        }, {
            id: 2518,
            name: '临潼区'
        }, {
            id: 2519,
            name: '长安区'
        }, {
            id: 2520,
            name: '蓝田县'
        }, {
            id: 2521,
            name: '周至县'
        }, {
            id: 2522,
            name: '户县'
        }, {
            id: 2523,
            name: '高陵县'
        }]
    }, {
        id: 289,
        name: '铜川市',
        district: [{
            id: 2524,
            name: '王益区'
        }, {
            id: 2525,
            name: '印台区'
        }, {
            id: 2526,
            name: '耀州区'
        }, {
            id: 2527,
            name: '宜君县'
        }]
    }, {
        id: 290,
        name: '宝鸡市',
        district: [{
            id: 2528,
            name: '渭滨区'
        }, {
            id: 2529,
            name: '金台区'
        }, {
            id: 2530,
            name: '陈仓区'
        }, {
            id: 2531,
            name: '凤翔县'
        }, {
            id: 2532,
            name: '岐山县'
        }, {
            id: 2533,
            name: '扶风县'
        }, {
            id: 2534,
            name: '眉县'
        }, {
            id: 2535,
            name: '陇县'
        }, {
            id: 2536,
            name: '千阳县'
        }, {
            id: 2537,
            name: '麟游县'
        }, {
            id: 2538,
            name: '凤县'
        }, {
            id: 2539,
            name: '太白县'
        }]
    }, {
        id: 291,
        name: '咸阳市',
        district: [{
            id: 2540,
            name: '秦都区'
        }, {
            id: 2541,
            name: '杨凌区'
        }, {
            id: 2542,
            name: '渭城区'
        }, {
            id: 2543,
            name: '三原县'
        }, {
            id: 2544,
            name: '泾阳县'
        }, {
            id: 2545,
            name: '乾县'
        }, {
            id: 2546,
            name: '礼泉县'
        }, {
            id: 2547,
            name: '永寿县'
        }, {
            id: 2548,
            name: '彬县'
        }, {
            id: 2549,
            name: '长武县'
        }, {
            id: 2550,
            name: '旬邑县'
        }, {
            id: 2551,
            name: '淳化县'
        }, {
            id: 2552,
            name: '武功县'
        }, {
            id: 2553,
            name: '兴平市'
        }]
    }, {
        id: 292,
        name: '渭南市',
        district: [{
            id: 2554,
            name: '临渭区'
        }, {
            id: 2555,
            name: '华县'
        }, {
            id: 2556,
            name: '潼关县'
        }, {
            id: 2557,
            name: '大荔县'
        }, {
            id: 2558,
            name: '合阳县'
        }, {
            id: 2559,
            name: '澄城县'
        }, {
            id: 2560,
            name: '蒲城县'
        }, {
            id: 2561,
            name: '白水县'
        }, {
            id: 2562,
            name: '富平县'
        }, {
            id: 2563,
            name: '韩城市'
        }, {
            id: 2564,
            name: '华阴市'
        }]
    }, {
        id: 293,
        name: '延安市',
        district: [{
            id: 2565,
            name: '宝塔区'
        }, {
            id: 2566,
            name: '延长县'
        }, {
            id: 2567,
            name: '延川县'
        }, {
            id: 2568,
            name: '子长县'
        }, {
            id: 2569,
            name: '安塞县'
        }, {
            id: 2570,
            name: '志丹县'
        }, {
            id: 2571,
            name: '吴旗县'
        }, {
            id: 2572,
            name: '甘泉县'
        }, {
            id: 2573,
            name: '富县'
        }, {
            id: 2574,
            name: '洛川县'
        }, {
            id: 2575,
            name: '宜川县'
        }, {
            id: 2576,
            name: '黄龙县'
        }, {
            id: 2577,
            name: '黄陵县'
        }]
    }, {
        id: 294,
        name: '汉中市',
        district: [{
            id: 2578,
            name: '汉台区'
        }, {
            id: 2579,
            name: '南郑县'
        }, {
            id: 2580,
            name: '城固县'
        }, {
            id: 2581,
            name: '洋县'
        }, {
            id: 2582,
            name: '西乡县'
        }, {
            id: 2583,
            name: '勉县'
        }, {
            id: 2584,
            name: '宁强县'
        }, {
            id: 2585,
            name: '略阳县'
        }, {
            id: 2586,
            name: '镇巴县'
        }, {
            id: 2587,
            name: '留坝县'
        }, {
            id: 2588,
            name: '佛坪县'
        }]
    }, {
        id: 295,
        name: '榆林市',
        district: [{
            id: 2589,
            name: '榆阳区'
        }, {
            id: 2590,
            name: '神木县'
        }, {
            id: 2591,
            name: '府谷县'
        }, {
            id: 2592,
            name: '横山县'
        }, {
            id: 2593,
            name: '靖边县'
        }, {
            id: 2594,
            name: '定边县'
        }, {
            id: 2595,
            name: '绥德县'
        }, {
            id: 2596,
            name: '米脂县'
        }, {
            id: 2597,
            name: '佳县'
        }, {
            id: 2598,
            name: '吴堡县'
        }, {
            id: 2599,
            name: '清涧县'
        }, {
            id: 2600,
            name: '子洲县'
        }]
    }, {
        id: 296,
        name: '安康市',
        district: [{
            id: 2601,
            name: '汉滨区'
        }, {
            id: 2602,
            name: '汉阴县'
        }, {
            id: 2603,
            name: '石泉县'
        }, {
            id: 2604,
            name: '宁陕县'
        }, {
            id: 2605,
            name: '紫阳县'
        }, {
            id: 2606,
            name: '岚皋县'
        }, {
            id: 2607,
            name: '平利县'
        }, {
            id: 2608,
            name: '镇坪县'
        }, {
            id: 2609,
            name: '旬阳县'
        }, {
            id: 2610,
            name: '白河县'
        }]
    }, {
        id: 297,
        name: '商洛市',
        district: [{
            id: 2611,
            name: '商州区'
        }, {
            id: 2612,
            name: '洛南县'
        }, {
            id: 2613,
            name: '丹凤县'
        }, {
            id: 2614,
            name: '商南县'
        }, {
            id: 2615,
            name: '山阳县'
        }, {
            id: 2616,
            name: '镇安县'
        }, {
            id: 2617,
            name: '柞水县'
        }]
    }]
}, {
    id: 28,
    name: '甘肃',
    city: [{
        id: 298,
        name: '兰州市',
        district: [{
            id: 2618,
            name: '城关区'
        }, {
            id: 2619,
            name: '七里河区'
        }, {
            id: 2620,
            name: '西固区'
        }, {
            id: 2621,
            name: '安宁区'
        }, {
            id: 2622,
            name: '红古区'
        }, {
            id: 2623,
            name: '永登县'
        }, {
            id: 2624,
            name: '皋兰县'
        }, {
            id: 2625,
            name: '榆中县'
        }]
    }, {
        id: 299,
        name: '嘉峪关市',
        district: []
    }, {
        id: 300,
        name: '金昌市',
        district: [{
            id: 2626,
            name: '金川区'
        }, {
            id: 2627,
            name: '永昌县'
        }]
    }, {
        id: 301,
        name: '白银市',
        district: [{
            id: 2628,
            name: '白银区'
        }, {
            id: 2629,
            name: '平川区'
        }, {
            id: 2630,
            name: '靖远县'
        }, {
            id: 2631,
            name: '会宁县'
        }, {
            id: 2632,
            name: '景泰县'
        }]
    }, {
        id: 302,
        name: '天水市',
        district: [{
            id: 2633,
            name: '秦城区'
        }, {
            id: 2634,
            name: '北道区'
        }, {
            id: 2635,
            name: '清水县'
        }, {
            id: 2636,
            name: '秦安县'
        }, {
            id: 2637,
            name: '甘谷县'
        }, {
            id: 2638,
            name: '武山县'
        }, {
            id: 2639,
            name: '张家川回族自治县'
        }]
    }, {
        id: 303,
        name: '武威市',
        district: [{
            id: 2640,
            name: '凉州区'
        }, {
            id: 2641,
            name: '民勤县'
        }, {
            id: 2642,
            name: '古浪县'
        }, {
            id: 2643,
            name: '天祝藏族自治县'
        }]
    }, {
        id: 304,
        name: '张掖市',
        district: [{
            id: 2644,
            name: '甘州区'
        }, {
            id: 2645,
            name: '肃南裕固族自治县'
        }, {
            id: 2646,
            name: '民乐县'
        }, {
            id: 2647,
            name: '临泽县'
        }, {
            id: 2648,
            name: '高台县'
        }, {
            id: 2649,
            name: '山丹县'
        }]
    }, {
        id: 305,
        name: '平凉市',
        district: [{
            id: 2650,
            name: '崆峒区'
        }, {
            id: 2651,
            name: '泾川县'
        }, {
            id: 2652,
            name: '灵台县'
        }, {
            id: 2653,
            name: '崇信县'
        }, {
            id: 2654,
            name: '华亭县'
        }, {
            id: 2655,
            name: '庄浪县'
        }, {
            id: 2656,
            name: '静宁县'
        }]
    }, {
        id: 306,
        name: '酒泉市',
        district: [{
            id: 2657,
            name: '肃州区'
        }, {
            id: 2658,
            name: '金塔县'
        }, {
            id: 2659,
            name: '安西县'
        }, {
            id: 2660,
            name: '肃北蒙古族自治县'
        }, {
            id: 2661,
            name: '阿克塞哈萨克族自治县'
        }, {
            id: 2662,
            name: '玉门市'
        }, {
            id: 2663,
            name: '敦煌市'
        }]
    }, {
        id: 307,
        name: '庆阳市',
        district: [{
            id: 2664,
            name: '西峰区'
        }, {
            id: 2665,
            name: '庆城县'
        }, {
            id: 2666,
            name: '环县'
        }, {
            id: 2667,
            name: '华池县'
        }, {
            id: 2668,
            name: '合水县'
        }, {
            id: 2669,
            name: '正宁县'
        }, {
            id: 2670,
            name: '宁县'
        }, {
            id: 2671,
            name: '镇原县'
        }]
    }, {
        id: 308,
        name: '定西市',
        district: [{
            id: 2672,
            name: '安定区'
        }, {
            id: 2673,
            name: '通渭县'
        }, {
            id: 2674,
            name: '陇西县'
        }, {
            id: 2675,
            name: '渭源县'
        }, {
            id: 2676,
            name: '临洮县'
        }, {
            id: 2677,
            name: '漳县'
        }, {
            id: 2678,
            name: '岷县'
        }]
    }, {
        id: 309,
        name: '陇南市',
        district: [{
            id: 2679,
            name: '武都区'
        }, {
            id: 2680,
            name: '成县'
        }, {
            id: 2681,
            name: '文县'
        }, {
            id: 2682,
            name: '宕昌县'
        }, {
            id: 2683,
            name: '康县'
        }, {
            id: 2684,
            name: '西和县'
        }, {
            id: 2685,
            name: '礼县'
        }, {
            id: 2686,
            name: '徽县'
        }, {
            id: 2687,
            name: '两当县'
        }]
    }, {
        id: 310,
        name: '临夏',
        district: [{
            id: 2688,
            name: '临夏市'
        }, {
            id: 2689,
            name: '临夏县'
        }, {
            id: 2690,
            name: '康乐县'
        }, {
            id: 2691,
            name: '永靖县'
        }, {
            id: 2692,
            name: '广河县'
        }, {
            id: 2693,
            name: '和政县'
        }, {
            id: 2694,
            name: '东乡族自治县'
        }, {
            id: 2695,
            name: '积石山保安族东乡族撒拉族自治县'
        }]
    }, {
        id: 311,
        name: '甘南',
        district: [{
            id: 2696,
            name: '合作市'
        }, {
            id: 2697,
            name: '临潭县'
        }, {
            id: 2698,
            name: '卓尼县'
        }, {
            id: 2699,
            name: '舟曲县'
        }, {
            id: 2700,
            name: '迭部县'
        }, {
            id: 2701,
            name: '玛曲县'
        }, {
            id: 2702,
            name: '碌曲县'
        }, {
            id: 2703,
            name: '夏河县'
        }]
    }]
}, {
    id: 29,
    name: '青海',
    city: [{
        id: 312,
        name: '西宁市',
        district: [{
            id: 2704,
            name: '城东区'
        }, {
            id: 2705,
            name: '城中区'
        }, {
            id: 2706,
            name: '城西区'
        }, {
            id: 2707,
            name: '城北区'
        }, {
            id: 2708,
            name: '大通回族土族自治县'
        }, {
            id: 2709,
            name: '湟中县'
        }, {
            id: 2710,
            name: '湟源县'
        }]
    }, {
        id: 313,
        name: '海东地区',
        district: [{
            id: 2711,
            name: '平安县'
        }, {
            id: 2712,
            name: '民和回族土族自治县'
        }, {
            id: 2713,
            name: '乐都县'
        }, {
            id: 2714,
            name: '互助土族自治县'
        }, {
            id: 2715,
            name: '化隆回族自治县'
        }, {
            id: 2716,
            name: '循化撒拉族自治县'
        }]
    }, {
        id: 314,
        name: '海北',
        district: [{
            id: 2717,
            name: '门源回族自治县'
        }, {
            id: 2718,
            name: '祁连县'
        }, {
            id: 2719,
            name: '海晏县'
        }, {
            id: 2720,
            name: '刚察县'
        }]
    }, {
        id: 315,
        name: '黄南',
        district: [{
            id: 2721,
            name: '同仁县'
        }, {
            id: 2722,
            name: '尖扎县'
        }, {
            id: 2723,
            name: '泽库县'
        }, {
            id: 2724,
            name: '河南蒙古族自治县'
        }]
    }, {
        id: 316,
        name: '海南',
        district: [{
            id: 2725,
            name: '共和县'
        }, {
            id: 2726,
            name: '同德县'
        }, {
            id: 2727,
            name: '贵德县'
        }, {
            id: 2728,
            name: '兴海县'
        }, {
            id: 2729,
            name: '贵南县'
        }]
    }, {
        id: 317,
        name: '果洛',
        district: [{
            id: 2730,
            name: '玛沁县'
        }, {
            id: 2731,
            name: '班玛县'
        }, {
            id: 2732,
            name: '甘德县'
        }, {
            id: 2733,
            name: '达日县'
        }, {
            id: 2734,
            name: '久治县'
        }, {
            id: 2735,
            name: '玛多县'
        }]
    }, {
        id: 318,
        name: '玉树',
        district: [{
            id: 2736,
            name: '玉树县'
        }, {
            id: 2737,
            name: '杂多县'
        }, {
            id: 2738,
            name: '称多县'
        }, {
            id: 2739,
            name: '治多县'
        }, {
            id: 2740,
            name: '囊谦县'
        }, {
            id: 2741,
            name: '曲麻莱县'
        }]
    }, {
        id: 319,
        name: '海西',
        district: [{
            id: 2742,
            name: '格尔木市'
        }, {
            id: 2743,
            name: '德令哈市'
        }, {
            id: 2744,
            name: '乌兰县'
        }, {
            id: 2745,
            name: '都兰县'
        }, {
            id: 2746,
            name: '天峻县'
        }]
    }]
}, {
    id: 30,
    name: '宁夏',
    city: [{
        id: 320,
        name: '银川市',
        district: [{
            id: 2747,
            name: '兴庆区'
        }, {
            id: 2748,
            name: '西夏区'
        }, {
            id: 2749,
            name: '金凤区'
        }, {
            id: 2750,
            name: '永宁县'
        }, {
            id: 2751,
            name: '贺兰县'
        }, {
            id: 2752,
            name: '灵武市'
        }]
    }, {
        id: 321,
        name: '石嘴山市',
        district: [{
            id: 2753,
            name: '大武口区'
        }, {
            id: 2754,
            name: '惠农区'
        }, {
            id: 2755,
            name: '平罗县'
        }]
    }, {
        id: 322,
        name: '吴忠市',
        district: [{
            id: 2756,
            name: '利通区'
        }, {
            id: 2757,
            name: '盐池县'
        }, {
            id: 2758,
            name: '同心县'
        }, {
            id: 2759,
            name: '青铜峡市'
        }]
    }, {
        id: 323,
        name: '固原市',
        district: [{
            id: 2760,
            name: '原州区'
        }, {
            id: 2761,
            name: '西吉县'
        }, {
            id: 2762,
            name: '隆德县'
        }, {
            id: 2763,
            name: '泾源县'
        }, {
            id: 2764,
            name: '彭阳县'
        }]
    }, {
        id: 324,
        name: '中卫市',
        district: [{
            id: 2765,
            name: '沙坡头区'
        }, {
            id: 2766,
            name: '中宁县'
        }, {
            id: 2767,
            name: '海原县'
        }]
    }]
}, {
    id: 31,
    name: '新疆',
    city: [{
        id: 325,
        name: '乌鲁木齐市',
        district: [{
            id: 2768,
            name: '天山区'
        }, {
            id: 2769,
            name: '沙依巴克区'
        }, {
            id: 2770,
            name: '新市区'
        }, {
            id: 2771,
            name: '水磨沟区'
        }, {
            id: 2772,
            name: '头屯河区'
        }, {
            id: 2773,
            name: '达坂城区'
        }, {
            id: 2774,
            name: '东山区'
        }, {
            id: 2775,
            name: '乌鲁木齐县'
        }]
    }, {
        id: 326,
        name: '克拉玛依市',
        district: [{
            id: 2776,
            name: '独山子区'
        }, {
            id: 2777,
            name: '克拉玛依区'
        }, {
            id: 2778,
            name: '白碱滩区'
        }, {
            id: 2779,
            name: '乌尔禾区'
        }]
    }, {
        id: 327,
        name: '吐鲁番地区',
        district: [{
            id: 2780,
            name: '吐鲁番市'
        }, {
            id: 2781,
            name: '鄯善县'
        }, {
            id: 2782,
            name: '托克逊县'
        }]
    }, {
        id: 328,
        name: '哈密地区',
        district: [{
            id: 2783,
            name: '哈密市'
        }, {
            id: 2784,
            name: '巴里坤哈萨克自治县'
        }, {
            id: 2785,
            name: '伊吾县'
        }]
    }, {
        id: 329,
        name: '昌吉',
        district: [{
            id: 2786,
            name: '昌吉市'
        }, {
            id: 2787,
            name: '阜康市'
        }, {
            id: 2788,
            name: '米泉市'
        }, {
            id: 2789,
            name: '呼图壁县'
        }, {
            id: 2790,
            name: '玛纳斯县'
        }, {
            id: 2791,
            name: '奇台县'
        }, {
            id: 2792,
            name: '吉木萨尔县'
        }, {
            id: 2793,
            name: '木垒哈萨克自治县'
        }]
    }, {
        id: 330,
        name: '博尔塔拉',
        district: [{
            id: 2794,
            name: '博乐市'
        }, {
            id: 2795,
            name: '精河县'
        }, {
            id: 2796,
            name: '温泉县'
        }]
    }, {
        id: 331,
        name: '巴音郭楞',
        district: [{
            id: 2797,
            name: '库尔勒市'
        }, {
            id: 2798,
            name: '轮台县'
        }, {
            id: 2799,
            name: '尉犁县'
        }, {
            id: 2800,
            name: '若羌县'
        }, {
            id: 2801,
            name: '且末县'
        }, {
            id: 2802,
            name: '焉耆回族自治县'
        }, {
            id: 2803,
            name: '和静县'
        }, {
            id: 2804,
            name: '和硕县'
        }, {
            id: 2805,
            name: '博湖县'
        }]
    }, {
        id: 332,
        name: '阿克苏地区',
        district: [{
            id: 2806,
            name: '阿克苏市'
        }, {
            id: 2807,
            name: '温宿县'
        }, {
            id: 2808,
            name: '库车县'
        }, {
            id: 2809,
            name: '沙雅县'
        }, {
            id: 2810,
            name: '新和县'
        }, {
            id: 2811,
            name: '拜城县'
        }, {
            id: 2812,
            name: '乌什县'
        }, {
            id: 2813,
            name: '阿瓦提县'
        }, {
            id: 2814,
            name: '柯坪县'
        }]
    }, {
        id: 333,
        name: '克孜勒苏柯尔克孜',
        district: [{
            id: 2815,
            name: '阿图什市'
        }, {
            id: 2816,
            name: '阿克陶县'
        }, {
            id: 2817,
            name: '阿合奇县'
        }, {
            id: 2818,
            name: '乌恰县'
        }]
    }, {
        id: 334,
        name: '喀什地区',
        district: [{
            id: 2819,
            name: '喀什市'
        }, {
            id: 2820,
            name: '疏附县'
        }, {
            id: 2821,
            name: '疏勒县'
        }, {
            id: 2822,
            name: '英吉沙县'
        }, {
            id: 2823,
            name: '泽普县'
        }, {
            id: 2824,
            name: '莎车县'
        }, {
            id: 2825,
            name: '叶城县'
        }, {
            id: 2826,
            name: '麦盖提县'
        }, {
            id: 2827,
            name: '岳普湖县'
        }, {
            id: 2828,
            name: '伽师县'
        }, {
            id: 2829,
            name: '巴楚县'
        }, {
            id: 2830,
            name: '塔什库尔干塔吉克自治县'
        }]
    }, {
        id: 335,
        name: '和田地区',
        district: [{
            id: 2831,
            name: '和田市'
        }, {
            id: 2832,
            name: '和田县'
        }, {
            id: 2833,
            name: '墨玉县'
        }, {
            id: 2834,
            name: '皮山县'
        }, {
            id: 2835,
            name: '洛浦县'
        }, {
            id: 2836,
            name: '策勒县'
        }, {
            id: 2837,
            name: '于田县'
        }, {
            id: 2838,
            name: '民丰县'
        }]
    }, {
        id: 336,
        name: '伊犁哈萨克',
        district: [{
            id: 2839,
            name: '伊宁市'
        }, {
            id: 2840,
            name: '奎屯市'
        }, {
            id: 2841,
            name: '伊宁县'
        }, {
            id: 2842,
            name: '察布查尔锡伯自治县'
        }, {
            id: 2843,
            name: '霍城县'
        }, {
            id: 2844,
            name: '巩留县'
        }, {
            id: 2845,
            name: '新源县'
        }, {
            id: 2846,
            name: '昭苏县'
        }, {
            id: 2847,
            name: '特克斯县'
        }, {
            id: 2848,
            name: '尼勒克县'
        }]
    }, {
        id: 337,
        name: '塔城地区',
        district: [{
            id: 2849,
            name: '塔城市'
        }, {
            id: 2850,
            name: '乌苏市'
        }, {
            id: 2851,
            name: '额敏县'
        }, {
            id: 2852,
            name: '沙湾县'
        }, {
            id: 2853,
            name: '托里县'
        }, {
            id: 2854,
            name: '裕民县'
        }, {
            id: 2855,
            name: '和布克赛尔蒙古自治县'
        }]
    }, {
        id: 338,
        name: '阿勒泰地区',
        district: [{
            id: 2856,
            name: '阿勒泰市'
        }, {
            id: 2857,
            name: '布尔津县'
        }, {
            id: 2858,
            name: '富蕴县'
        }, {
            id: 2859,
            name: '福海县'
        }, {
            id: 2860,
            name: '哈巴河县'
        }, {
            id: 2861,
            name: '青河县'
        }, {
            id: 2862,
            name: '吉木乃县'
        }]
    }, {
        id: 339,
        name: '石河子市',
        district: []
    }, {
        id: 340,
        name: '阿拉尔市',
        district: []
    }, {
        id: 341,
        name: '图木舒克市',
        district: []
    }, {
        id: 342,
        name: '五家渠市',
        district: []
    }]
}, {
    id: 32,
    name: '香港',
    city: [{
        id: 343,
        name: '香港',
        district: []
    }]
}, {
    id: 33,
    name: '澳门',
    city: [{
        id: 344,
        name: '澳门',
        district: []
    }]
}, {
    id: 34,
    name: '台湾',
    city: [{
        id: 345,
        name: '台湾',
        district: []
    }]
}]);

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _assign = __webpack_require__(14);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FetchMock = __webpack_require__(84);
var statusTextMap = __webpack_require__(155);
var theGlobal = typeof window !== 'undefined' ? window : self;

FetchMock.global = theGlobal;
FetchMock.statusTextMap = statusTextMap;

FetchMock.config = (0, _assign2.default)(FetchMock.config, {
	Promise: theGlobal.Promise,
	Request: theGlobal.Request,
	Response: theGlobal.Response,
	Headers: theGlobal.Headers
});

module.exports = FetchMock.createInstance();

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _create = __webpack_require__(48);

var _create2 = _interopRequireDefault(_create);

var _assign = __webpack_require__(14);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setUpAndTearDown = __webpack_require__(88);
var fetchHandler = __webpack_require__(120);
var inspecting = __webpack_require__(154);

var FetchMock = (0, _assign2.default)({}, fetchHandler, setUpAndTearDown, inspecting);

FetchMock.config = {
	fallbackToNetwork: false,
	includeContentLength: true,
	sendAsJson: true,
	warnOnFallback: true,
	overwriteRoutes: undefined
};

FetchMock.createInstance = function () {
	var instance = (0, _create2.default)(FetchMock);
	instance.routes = (this.routes || []).slice();
	instance.fallbackResponse = this.fallbackResponse || undefined;
	instance.config = (0, _assign2.default)({}, this.config || FetchMock.config);
	instance._calls = {};
	instance._allCalls = [];
	instance._holdingPromises = [];
	instance.bindMethods();
	return instance;
};

FetchMock.bindMethods = function () {
	this.fetchHandler = FetchMock.fetchHandler.bind(this);
	this.restore = FetchMock.restore.bind(this);
	this.reset = FetchMock.reset.bind(this);
};

FetchMock.sandbox = function () {
	// this construct allows us to create a fetch-mock instance which is also
	// a callable function, while circumventing circularity when defining the
	// object that this function should be bound to
	var proxy = function proxy(url, options) {
		return sandbox.fetchHandler(url, options);
	};

	var sandbox = (0, _assign2.default)(proxy, // Ensures that the entire returned object is a callable function
	FetchMock, // prototype methods
	this.createInstance() // instance data
	);

	sandbox.bindMethods();
	sandbox.isSandbox = true;
	return sandbox;
};

module.exports = FetchMock;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(86);
var $Object = __webpack_require__(0).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(3);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(35) });


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(4);
var anObject = __webpack_require__(5);
var getKeys = __webpack_require__(12);

module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _assign = __webpack_require__(14);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var compileRoute = __webpack_require__(89);
var FetchMock = {};

FetchMock.mock = function (matcher, response) {
	var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	var route = void 0;

	// Handle the variety of parameters accepted by mock (see README)
	if (matcher && response) {
		route = (0, _assign2.default)({
			matcher: matcher,
			response: response
		}, options);
	} else if (matcher && matcher.matcher) {
		route = matcher;
	} else {
		throw new Error('Invalid parameters passed to fetch-mock');
	}

	this.addRoute(route);

	return this._mock();
};

var getMatcher = function getMatcher(route, propName) {
	return function (route2) {
		return route[propName] === route2[propName];
	};
};

FetchMock.addRoute = function (route) {
	route = this.compileRoute(route);

	var clashes = this.routes.filter(getMatcher(route, 'name'));
	var overwriteRoutes = 'overwriteRoutes' in route ? route.overwriteRoutes : this.config.overwriteRoutes;

	if (overwriteRoutes === false || !clashes.length) {
		return this.routes.push(route);
	}

	var methodsMatch = getMatcher(route, 'method');

	if (overwriteRoutes === true) {
		return this.routes.splice(this.routes.indexOf(clashes.find(methodsMatch)), 1, route);
	}

	if (clashes.some(function (existingRoute) {
		return !route.method || methodsMatch(existingRoute);
	})) {
		throw new Error('Adding route with same name as existing route. See `overwriteRoutes` option.');
	}

	this.routes.push(route);
};

FetchMock._mock = function () {
	if (!this.isSandbox) {
		// Do this here rather than in the constructor to ensure it's scoped to the test
		this.realFetch = this.realFetch || this.global.fetch;
		this.global.fetch = this.fetchHandler;
	}
	return this;
};

FetchMock.catch = function (response) {
	if (this.fallbackResponse) {
		console.warn('calling fetchMock.catch() twice - are you sure you want to overwrite the previous fallback response'); // eslint-disable-line
	}
	this.fallbackResponse = response || 'ok';
	return this._mock();
};

FetchMock.spy = function () {
	this._mock();
	return this.catch(this.getNativeFetch());
};

FetchMock.compileRoute = compileRoute;

FetchMock.once = function (matcher, response) {
	var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	return this.mock(matcher, response, (0, _assign2.default)({}, options, { repeat: 1 }));
};

['get', 'post', 'put', 'delete', 'head', 'patch'].forEach(function (method) {
	FetchMock[method] = function (matcher, response) {
		var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

		return this.mock(matcher, response, (0, _assign2.default)({}, options, { method: method.toUpperCase() }));
	};
	FetchMock[method + 'Once'] = function (matcher, response) {
		var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

		return this.once(matcher, response, (0, _assign2.default)({}, options, { method: method.toUpperCase() }));
	};
});

FetchMock.restore = function () {
	if (this.realFetch) {
		this.global.fetch = this.realFetch;
		this.realFetch = undefined;
	}
	this.fallbackResponse = undefined;
	this.routes = [];
	this.reset();
	return this;
};

FetchMock.reset = function () {
	this._calls = {};
	this._allCalls = [];
	this._holdingPromises = [];
	this.routes.forEach(function (route) {
		return route.reset && route.reset();
	});
	return this;
};

module.exports = FetchMock;

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _assign = __webpack_require__(14);

var _assign2 = _interopRequireDefault(_assign);

var _slicedToArray2 = __webpack_require__(50);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _toConsumableArray2 = __webpack_require__(53);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _entries = __webpack_require__(105);

var _entries2 = _interopRequireDefault(_entries);

var _keys = __webpack_require__(38);

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _glob = __webpack_require__(112);
var _express = __webpack_require__(113);
var URL = __webpack_require__(114);
var querystring = __webpack_require__(58);

function normalizeRequest(url, options, Request) {
	if (Request.prototype.isPrototypeOf(url)) {
		return {
			url: url.url,
			method: url.method,
			headers: function () {
				var headers = {};
				url.headers.forEach(function (name) {
					return headers[name] = url.headers.name;
				});
				return headers;
			}()
		};
	} else {
		return {
			url: url,
			method: options && options.method || 'GET',
			headers: options && options.headers
		};
	}
}

var stringMatchers = {
	begin: function begin(targetString) {
		return function (_ref) {
			var url = _ref.url;
			return url.indexOf(targetString) === 0;
		};
	},
	end: function end(targetString) {
		return function (_ref2) {
			var url = _ref2.url;
			return url.substr(-targetString.length) === targetString;
		};
	},
	glob: function glob(targetString) {
		var urlRX = _glob(targetString);
		return function (_ref3) {
			var url = _ref3.url;
			return urlRX.test(url);
		};
	},
	express: function express(targetString) {
		var urlRX = _express(targetString);
		return function (_ref4) {
			var url = _ref4.url;
			return urlRX.test(url);
		};
	}
};

var headersToLowerCase = function headersToLowerCase(headers) {
	return (0, _keys2.default)(headers).reduce(function (obj, k) {
		obj[k.toLowerCase()] = headers[k];
		return obj;
	}, {});
};

function areHeadersEqual(actualHeader, expectedHeader) {
	actualHeader = Array.isArray(actualHeader) ? actualHeader : [actualHeader];
	expectedHeader = Array.isArray(expectedHeader) ? expectedHeader : [expectedHeader];

	if (actualHeader.length !== expectedHeader.length) {
		return false;
	}

	return actualHeader.every(function (val, i) {
		return val === expectedHeader[i];
	});
}

function getHeaderMatcher(_ref5, Headers) {
	var expectedHeaders = _ref5.headers;

	if (!expectedHeaders) {
		return function () {
			return true;
		};
	}
	var expectation = headersToLowerCase(expectedHeaders);

	return function (_ref6) {
		var _ref6$headers = _ref6.headers,
		    headers = _ref6$headers === undefined ? {} : _ref6$headers;

		if (headers instanceof Headers) {
			// node-fetch 1 Headers
			if (typeof headers.raw === 'function') {
				headers = (0, _entries2.default)(headers.raw());
			}
			headers = [].concat((0, _toConsumableArray3.default)(headers)).reduce(function (map, _ref7) {
				var _ref8 = (0, _slicedToArray3.default)(_ref7, 2),
				    key = _ref8[0],
				    val = _ref8[1];

				map[key] = val;
				return map;
			}, {});
		}

		var lowerCaseHeaders = headersToLowerCase(headers);

		return (0, _keys2.default)(expectation).every(function (headerName) {
			return areHeadersEqual(lowerCaseHeaders[headerName], expectation[headerName]);
		});
	};
}

var getMethodMatcher = function getMethodMatcher(route) {
	return function (_ref9) {
		var method = _ref9.method;

		return !route.method || route.method === (method ? method.toLowerCase() : 'get');
	};
};

var getQueryStringMatcher = function getQueryStringMatcher(route) {
	if (!route.query) {
		return function () {
			return true;
		};
	}
	var keys = (0, _keys2.default)(route.query);
	return function (_ref10) {
		var url = _ref10.url;

		var query = querystring.parse(URL.parse(url).query);
		return keys.every(function (key) {
			return query[key] === route.query[key];
		});
	};
};

var getUrlMatcher = function getUrlMatcher(route) {

	// When the matcher is a function it shodul not be compared with the url
	// in the normal way
	if (typeof route.matcher === 'function') {
		return function () {
			return true;
		};
	}

	if (route.matcher instanceof RegExp) {
		var urlRX = route.matcher;
		return function (_ref11) {
			var url = _ref11.url;
			return urlRX.test(url);
		};
	}

	if (route.matcher === '*') {
		return function () {
			return true;
		};
	}

	if (route.matcher.indexOf('^') === 0) {
		throw new Error('Using \'^\' to denote the start of a url is deprecated. Use \'begin:\' instead');
	}

	for (var shorthand in stringMatchers) {
		if (route.matcher.indexOf(shorthand + ':') === 0) {
			var url = route.matcher.replace(new RegExp('^' + shorthand + ':'), '');
			return stringMatchers[shorthand](url);
		}
	}

	// if none of the special syntaxes apply, it's just a simple string match
	var expectedUrl = route.matcher;
	return function (_ref12) {
		var url = _ref12.url;

		if (route.query && expectedUrl.indexOf('?')) {
			return url.indexOf(expectedUrl) === 0;
		}
		return url === expectedUrl;
	};
};

var sanitizeRoute = function sanitizeRoute(route) {
	route = (0, _assign2.default)({}, route);

	if (typeof route.response === 'undefined') {
		throw new Error('Each route must define a response');
	}

	if (!route.matcher) {
		throw new Error('Each route must specify a string, regex or function to match calls to fetch');
	}

	if (!route.name) {
		route.name = route.matcher.toString();
		route.__unnamed = true;
	}

	if (route.method) {
		route.method = route.method.toLowerCase();
	}

	return route;
};

var getFunctionMatcher = function getFunctionMatcher(route) {
	if (typeof route.matcher === 'function') {
		var matcher = route.matcher;
		return function (req, _ref13) {
			var _ref14 = (0, _slicedToArray3.default)(_ref13, 2),
			    url = _ref14[0],
			    options = _ref14[1];

			return matcher(url, options);
		};
	} else {
		return function () {
			return true;
		};
	}
};

var generateMatcher = function generateMatcher(route, config) {
	var matchers = [getQueryStringMatcher(route), getMethodMatcher(route), getHeaderMatcher(route, config.Headers), getUrlMatcher(route), getFunctionMatcher(route)];

	return function (url, options) {
		var req = normalizeRequest(url, options, config.Request);
		return matchers.every(function (matcher) {
			return matcher(req, [url, options]);
		});
	};
};

var limitMatcher = function limitMatcher(route) {

	if (!route.repeat) {
		return;
	}

	var matcher = route.matcher;
	var timesLeft = route.repeat;
	route.matcher = function (url, options) {
		var match = timesLeft && matcher(url, options);
		if (match) {
			timesLeft--;
			return true;
		}
	};
	route.reset = function () {
		return timesLeft = route.repeat;
	};
};

module.exports = function (route) {
	route = sanitizeRoute(route);

	route.matcher = generateMatcher(route, this.config);

	limitMatcher(route);

	return route;
};

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(91), __esModule: true };

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(23);
__webpack_require__(19);
module.exports = __webpack_require__(98);


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(93);
var step = __webpack_require__(94);
var Iterators = __webpack_require__(13);
var toIObject = __webpack_require__(10);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(51)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 93 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 94 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(35);
var descriptor = __webpack_require__(16);
var setToStringTag = __webpack_require__(25);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(7)(IteratorPrototype, __webpack_require__(1)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(9);
var toObject = __webpack_require__(22);
var IE_PROTO = __webpack_require__(31)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(30);
var defined = __webpack_require__(28);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(36);
var ITERATOR = __webpack_require__(1)('iterator');
var Iterators = __webpack_require__(13);
module.exports = __webpack_require__(0).isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(100), __esModule: true };

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(23);
__webpack_require__(19);
module.exports = __webpack_require__(101);


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(5);
var get = __webpack_require__(37);
module.exports = __webpack_require__(0).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(19);
__webpack_require__(103);
module.exports = __webpack_require__(0).Array.from;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(15);
var $export = __webpack_require__(3);
var toObject = __webpack_require__(22);
var call = __webpack_require__(55);
var isArrayIter = __webpack_require__(56);
var toLength = __webpack_require__(29);
var createProperty = __webpack_require__(104);
var getIterFn = __webpack_require__(37);

$export($export.S + $export.F * !__webpack_require__(57)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(4);
var createDesc = __webpack_require__(16);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(106), __esModule: true };

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(107);
module.exports = __webpack_require__(0).Object.entries;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(3);
var $entries = __webpack_require__(108)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(12);
var toIObject = __webpack_require__(10);
var isEnum = __webpack_require__(18).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(110);
module.exports = __webpack_require__(0).Object.keys;


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(22);
var $keys = __webpack_require__(12);

__webpack_require__(111)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(3);
var core = __webpack_require__(0);
var fails = __webpack_require__(11);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 112 */
/***/ (function(module, exports) {

module.exports = function (glob, opts) {
  if (typeof glob !== 'string') {
    throw new TypeError('Expected a string');
  }

  var str = String(glob);

  // The regexp we are building, as a string.
  var reStr = "";

  // Whether we are matching so called "extended" globs (like bash) and should
  // support single character matching, matching ranges of characters, group
  // matching, etc.
  var extended = opts ? !!opts.extended : false;

  // When globstar is _false_ (default), '/foo/*' is translated a regexp like
  // '^\/foo\/.*$' which will match any string beginning with '/foo/'
  // When globstar is _true_, '/foo/*' is translated to regexp like
  // '^\/foo\/[^/]*$' which will match any string beginning with '/foo/' BUT
  // which does not have a '/' to the right of it.
  // E.g. with '/foo/*' these will match: '/foo/bar', '/foo/bar.txt' but
  // these will not '/foo/bar/baz', '/foo/bar/baz.txt'
  // Lastely, when globstar is _true_, '/foo/**' is equivelant to '/foo/*' when
  // globstar is _false_
  var globstar = opts ? !!opts.globstar : false;

  // If we are doing extended matching, this boolean is true when we are inside
  // a group (eg {*.html,*.js}), and false otherwise.
  var inGroup = false;

  // RegExp flags (eg "i" ) to pass in to RegExp constructor.
  var flags = opts && typeof( opts.flags ) === "string" ? opts.flags : "";

  var c;
  for (var i = 0, len = str.length; i < len; i++) {
    c = str[i];

    switch (c) {
    case "\\":
    case "/":
    case "$":
    case "^":
    case "+":
    case ".":
    case "(":
    case ")":
    case "=":
    case "!":
    case "|":
      reStr += "\\" + c;
      break;

    case "?":
      if (extended) {
        reStr += ".";
	    break;
      }

    case "[":
    case "]":
      if (extended) {
        reStr += c;
	    break;
      }

    case "{":
      if (extended) {
        inGroup = true;
	    reStr += "(";
	    break;
      }

    case "}":
      if (extended) {
        inGroup = false;
	    reStr += ")";
	    break;
      }

    case ",":
      if (inGroup) {
        reStr += "|";
	    break;
      }
      reStr += "\\" + c;
      break;

    case "*":
      // Move over all consecutive "*"'s.
      // Also store the previous and next characters
      var prevChar = str[i - 1];
      var starCount = 1;
      while(str[i + 1] === "*") {
        starCount++;
        i++;
      }
      var nextChar = str[i + 1];

      if (!globstar) {
        // globstar is disabled, so treat any number of "*" as one
        reStr += ".*";
      } else {
        // globstar is enabled, so determine if this is a globstar segment
        var isGlobstar = starCount > 1                      // multiple "*"'s
          && (prevChar === "/" || prevChar === undefined)   // from the start of the segment
          && (nextChar === "/" || nextChar === undefined)   // to the end of the segment

        if (isGlobstar) {
          // it's a globstar, so match zero or more path segments
          reStr += "(?:[^/]*(?:\/|$))*";
          i++; // move over the "/"
        } else {
          // it's not a globstar, so only match one path segment
          reStr += "[^/]*";
        }
      }
      break;

    default:
      reStr += c;
    }
  }

  // When regexp 'g' flag is specified don't
  // constrain the regular expression with ^ & $
  if (!flags || !~flags.indexOf('g')) {
    reStr = "^" + reStr + "$";
  }

  return new RegExp(reStr, flags);
};


/***/ }),
/* 113 */
/***/ (function(module, exports) {

/**
 * Expose `pathToRegexp`.
 */
module.exports = pathToRegexp
module.exports.parse = parse
module.exports.compile = compile
module.exports.tokensToFunction = tokensToFunction
module.exports.tokensToRegExp = tokensToRegExp

/**
 * Default configs.
 */
var DEFAULT_DELIMITER = '/'
var DEFAULT_DELIMITERS = './'

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?"]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined]
  '(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?'
].join('|'), 'g')

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = []
  var key = 0
  var index = 0
  var path = ''
  var defaultDelimiter = (options && options.delimiter) || DEFAULT_DELIMITER
  var delimiters = (options && options.delimiters) || DEFAULT_DELIMITERS
  var pathEscaped = false
  var res

  while ((res = PATH_REGEXP.exec(str)) !== null) {
    var m = res[0]
    var escaped = res[1]
    var offset = res.index
    path += str.slice(index, offset)
    index = offset + m.length

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1]
      pathEscaped = true
      continue
    }

    var prev = ''
    var next = str[index]
    var name = res[2]
    var capture = res[3]
    var group = res[4]
    var modifier = res[5]

    if (!pathEscaped && path.length) {
      var k = path.length - 1

      if (delimiters.indexOf(path[k]) > -1) {
        prev = path[k]
        path = path.slice(0, k)
      }
    }

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path)
      path = ''
      pathEscaped = false
    }

    var partial = prev !== '' && next !== undefined && next !== prev
    var repeat = modifier === '+' || modifier === '*'
    var optional = modifier === '?' || modifier === '*'
    var delimiter = prev || defaultDelimiter
    var pattern = capture || group

    tokens.push({
      name: name || key++,
      prefix: prev,
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      pattern: pattern ? escapeGroup(pattern) : '[^' + escapeString(delimiter) + ']+?'
    })
  }

  // Push any remaining characters.
  if (path || index < str.length) {
    tokens.push(path + str.substr(index))
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length)

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$')
    }
  }

  return function (data, options) {
    var path = ''
    var encode = (options && options.encode) || encodeURIComponent

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]

      if (typeof token === 'string') {
        path += token
        continue
      }

      var value = data ? data[token.name] : undefined
      var segment

      if (Array.isArray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but got array')
        }

        if (value.length === 0) {
          if (token.optional) continue

          throw new TypeError('Expected "' + token.name + '" to not be empty')
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j])

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '"')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment
        }

        continue
      }

      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        segment = encode(String(value))

        if (!matches[i].test(segment)) {
          throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but got "' + segment + '"')
        }

        path += token.prefix + segment
        continue
      }

      if (token.optional) {
        // Prepend partial segment prefixes.
        if (token.partial) path += token.prefix

        continue
      }

      throw new TypeError('Expected "' + token.name + '" to be ' + (token.repeat ? 'an array' : 'a string'))
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$/()])/g, '\\$1')
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options && options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {Array=}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  if (!keys) return path

  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g)

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        pattern: null
      })
    }
  }

  return path
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = []

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source)
  }

  return new RegExp('(?:' + parts.join('|') + ')', flags(options))
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}  tokens
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  options = options || {}

  var strict = options.strict
  var end = options.end !== false
  var delimiter = escapeString(options.delimiter || DEFAULT_DELIMITER)
  var delimiters = options.delimiters || DEFAULT_DELIMITERS
  var endsWith = [].concat(options.endsWith || []).map(escapeString).concat('$').join('|')
  var route = ''
  var isEndDelimited = false

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]

    if (typeof token === 'string') {
      route += escapeString(token)
      isEndDelimited = i === tokens.length - 1 && delimiters.indexOf(token[token.length - 1]) > -1
    } else {
      var prefix = escapeString(token.prefix)
      var capture = token.repeat
        ? '(?:' + token.pattern + ')(?:' + prefix + '(?:' + token.pattern + '))*'
        : token.pattern

      if (keys) keys.push(token)

      if (token.optional) {
        if (token.partial) {
          route += prefix + '(' + capture + ')?'
        } else {
          route += '(?:' + prefix + '(' + capture + '))?'
        }
      } else {
        route += prefix + '(' + capture + ')'
      }
    }
  }

  if (end) {
    if (!strict) route += '(?:' + delimiter + ')?'

    route += endsWith === '$' ? '$' : '(?=' + endsWith + ')'
  } else {
    if (!strict) route += '(?:' + delimiter + '(?=' + endsWith + '))?'
    if (!isEndDelimited) route += '(?=' + delimiter + '|' + endsWith + ')'
  }

  return new RegExp('^' + route, flags(options))
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {Array=}                keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (path instanceof RegExp) {
    return regexpToRegexp(path, keys)
  }

  if (Array.isArray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), keys, options)
  }

  return stringToRegexp(/** @type {string} */ (path), keys, options)
}


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var punycode = __webpack_require__(115);
var util = __webpack_require__(117);

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = __webpack_require__(58);

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = typeof module == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return punycode;
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (freeExports && freeModule) {
		if (module.exports == freeExports) {
			// in Node.js, io.js, or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else {
			// in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else {
		// in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(116)(module), __webpack_require__(47)))

/***/ }),
/* 116 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(59);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(123);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ResponseBuilder = __webpack_require__(134);

var FetchMock = {};

FetchMock.fetchHandler = function (url, opts) {
	var _this = this;

	var response = this.executeRouter(url, opts);

	// If the response says to throw an error, throw it
	// It only makes sense to do this before doing any async stuff below
	// as the async stuff swallows catastrophic errors in a promise
	// Type checking is to deal with sinon spies having a throws property :-0
	if (response.throws && typeof response !== 'function') {
		throw response.throws;
	}

	// this is used to power the .flush() method
	var done = void 0;
	this._holdingPromises.push(new this.config.Promise(function (res) {
		return done = res;
	}));

	// wrapped in this promise to make sure we respect custom Promise
	// constructors defined by the user
	return new this.config.Promise(function (res, rej) {
		_this.generateResponse(response, url, opts).then(res, rej).then(done, done);
	});
};

FetchMock.fetchHandler.isMock = true;

FetchMock.executeRouter = function (url, opts) {

	var response = this.router(url, opts);

	if (response) {
		return response;
	}

	if (this.config.warnOnFallback) {
		console.warn('Unmatched ' + (opts && opts.method || 'GET') + ' to ' + url); // eslint-disable-line
	}

	this.push(null, [url, opts]);

	if (this.fallbackResponse) {
		return this.fallbackResponse;
	}

	if (!this.config.fallbackToNetwork) {
		throw new Error('No fallback response defined for ' + (opts && opts.method || 'GET') + ' to ' + url);
	}

	return this.getNativeFetch();
};

FetchMock.generateResponse = function () {
	var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(response, url, opts) {
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						if (!(typeof response === 'function' || typeof response.then === 'function')) {
							_context.next = 10;
							break;
						}

						if (!(typeof response === 'function')) {
							_context.next = 5;
							break;
						}

						response = response(url, opts);
						_context.next = 8;
						break;

					case 5:
						_context.next = 7;
						return response.then(function (it) {
							return it;
						});

					case 7:
						response = _context.sent;

					case 8:
						_context.next = 0;
						break;

					case 10:
						if (!this.config.Response.prototype.isPrototypeOf(response)) {
							_context.next = 12;
							break;
						}

						return _context.abrupt('return', response);

					case 12:
						return _context.abrupt('return', new ResponseBuilder(url, response, this).exec());

					case 13:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, this);
	}));

	return function (_x, _x2, _x3) {
		return _ref.apply(this, arguments);
	};
}();

FetchMock.router = function (url, opts) {
	var route = this.routes.find(function (route) {
		return route.matcher(url, opts);
	});

	if (route) {
		this.push(route.name, [url, opts]);
		return route.response;
	}
};

FetchMock.getNativeFetch = function () {
	var func = this.realFetch || this.isSandbox && this.config.fetch;
	if (!func) {
		throw new Error('Falling back to network only available on gloabl fetch-mock, or by setting config.fetch on sandboxed fetch-mock');
	}
	return func;
};

FetchMock.push = function (name, args) {
	if (name) {
		this._calls[name] = this._calls[name] || [];
		this._calls[name].push(args);
		this._allCalls.push(args);
	} else {
		args.unmatched = true;
		this._allCalls.push(args);
	}
};

module.exports = FetchMock;

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(122);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 122 */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _promise = __webpack_require__(39);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new _promise2.default(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return _promise2.default.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(60);
__webpack_require__(19);
__webpack_require__(23);
__webpack_require__(125);
__webpack_require__(132);
__webpack_require__(133);
module.exports = __webpack_require__(0).Promise;


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(24);
var global = __webpack_require__(2);
var ctx = __webpack_require__(15);
var classof = __webpack_require__(36);
var $export = __webpack_require__(3);
var isObject = __webpack_require__(8);
var aFunction = __webpack_require__(20);
var anInstance = __webpack_require__(126);
var forOf = __webpack_require__(127);
var speciesConstructor = __webpack_require__(61);
var task = __webpack_require__(62).set;
var microtask = __webpack_require__(129)();
var newPromiseCapabilityModule = __webpack_require__(40);
var perform = __webpack_require__(63);
var promiseResolve = __webpack_require__(64);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(1)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(130)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(25)($Promise, PROMISE);
__webpack_require__(131)(PROMISE);
Wrapper = __webpack_require__(0)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(57)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 126 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(15);
var call = __webpack_require__(55);
var isArrayIter = __webpack_require__(56);
var anObject = __webpack_require__(5);
var toLength = __webpack_require__(29);
var getIterFn = __webpack_require__(37);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 128 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var macrotask = __webpack_require__(62).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(17)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(7);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var core = __webpack_require__(0);
var dP = __webpack_require__(4);
var DESCRIPTORS = __webpack_require__(6);
var SPECIES = __webpack_require__(1)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(3);
var core = __webpack_require__(0);
var global = __webpack_require__(2);
var speciesConstructor = __webpack_require__(61);
var promiseResolve = __webpack_require__(64);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(3);
var newPromiseCapability = __webpack_require__(40);
var perform = __webpack_require__(63);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _create = __webpack_require__(48);

var _create2 = _interopRequireDefault(_create);

var _stringify = __webpack_require__(135);

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = __webpack_require__(137);

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = __webpack_require__(38);

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = __webpack_require__(150);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(151);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var responseConfigProps = ['body', 'headers', 'throws', 'status', 'redirectUrl', 'includeContentLength', 'sendAsJson'];

module.exports = function () {
	function ResponseBuilder(url, responseConfig, fetchMock) {
		(0, _classCallCheck3.default)(this, ResponseBuilder);

		this.url = url;
		this.responseConfig = responseConfig;
		this.fetchMockConfig = fetchMock.config;
		this.statusTextMap = fetchMock.statusTextMap;
		this.Response = fetchMock.config.Response;
		this.Headers = fetchMock.config.Headers;
	}

	(0, _createClass3.default)(ResponseBuilder, [{
		key: 'exec',
		value: function exec() {
			this.normalizeResponseConfig();
			this.constructFetchOpts();
			this.constructResponseBody();
			return this.redirect(new this.Response(this.body, this.opts));
		}
	}, {
		key: 'sendAsObject',
		value: function sendAsObject() {
			var _this = this;

			if (responseConfigProps.some(function (prop) {
				return _this.responseConfig[prop];
			})) {
				if ((0, _keys2.default)(this.responseConfig).every(function (key) {
					return responseConfigProps.includes(key);
				})) {
					return false;
				} else {
					return true;
				}
			} else {
				return true;
			}
		}
	}, {
		key: 'normalizeResponseConfig',
		value: function normalizeResponseConfig() {
			// If the response config looks like a status, start to generate a simple response
			if (typeof this.responseConfig === 'number') {
				this.responseConfig = {
					status: this.responseConfig
				};
				// If the response config is not an object, or is an object that doesn't use
				// any reserved properties, assume it is meant to be the body of the response
			} else if (typeof this.responseConfig === 'string' || this.sendAsObject()) {
				this.responseConfig = {
					body: this.responseConfig
				};
			}
		}
	}, {
		key: 'validateStatus',
		value: function validateStatus(status) {
			if (!status) {
				return 200;
			}

			if (typeof status === 'number' && parseInt(status, 10) !== status && status >= 200 || status < 600) {
				return status;
			}

			throw new TypeError('Invalid status ' + status + ' passed on response object.\nTo respond with a JSON object that has status as a property assign the object to body\ne.g. {"body": {"status: "registered"}}');
		}
	}, {
		key: 'constructFetchOpts',
		value: function constructFetchOpts() {
			this.opts = this.responseConfig.opts || {};
			this.opts.url = this.responseConfig.redirectUrl || this.url;
			this.opts.status = this.validateStatus(this.responseConfig.status);
			this.opts.statusText = this.statusTextMap['' + this.opts.status];
			// Set up response headers. The empty object is to cope with
			// new Headers(undefined) throwing in Chrome
			// https://code.google.com/p/chromium/issues/detail?id=335871
			this.opts.headers = new this.Headers(this.responseConfig.headers || {});
		}
	}, {
		key: 'getOption',
		value: function getOption(name) {
			return this.responseConfig[name] === undefined ? this.fetchMockConfig[name] : this.responseConfig[name];
		}
	}, {
		key: 'constructResponseBody',
		value: function constructResponseBody() {
			// start to construct the body
			var body = this.responseConfig.body;

			// convert to json if we need to
			if (this.getOption('sendAsJson') && this.responseConfig.body != null && (typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)) === 'object') {
				//eslint-disable-line
				body = (0, _stringify2.default)(body);
				if (!this.opts.headers.has('Content-Type')) {
					this.opts.headers.set('Content-Type', 'application/json');
				}
			}

			// add a Content-Length header if we need to
			if (this.getOption('includeContentLength') && typeof body === 'string' && !this.opts.headers.has('Content-Length')) {
				this.opts.headers.set('Content-Length', body.length.toString());
			}

			// On the server we need to manually construct the readable stream for the
			// Response object (on the client this done automatically)
			if (this.stream) {
				var s = new this.stream.Readable();
				if (body != null) {
					//eslint-disable-line
					s.push(body, 'utf-8');
				}
				s.push(null);
				body = s;
			}
			this.body = body;
		}
	}, {
		key: 'redirect',
		value: function redirect(response) {
			// When mocking a followed redirect we must wrap the response in an object
			// which sets the redirected flag (not a writable property on the actual
			// response)
			if (this.responseConfig.redirectUrl) {
				response = (0, _create2.default)(response, {
					redirected: {
						value: true
					},
					url: {
						value: this.responseConfig.redirectUrl
					},
					// TODO extend to all other methods and properties as requested by users
					// Such a nasty hack
					text: {
						value: response.text.bind(response)
					},
					json: {
						value: response.json.bind(response)
					}
				});
			}

			return response;
		}
	}]);
	return ResponseBuilder;
}();

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(136), __esModule: true };

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(0);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(138);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(140);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(139), __esModule: true };

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(19);
__webpack_require__(23);
module.exports = __webpack_require__(41).f('iterator');


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(141), __esModule: true };

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(142);
__webpack_require__(60);
__webpack_require__(148);
__webpack_require__(149);
module.exports = __webpack_require__(0).Symbol;


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(2);
var has = __webpack_require__(9);
var DESCRIPTORS = __webpack_require__(6);
var $export = __webpack_require__(3);
var redefine = __webpack_require__(52);
var META = __webpack_require__(143).KEY;
var $fails = __webpack_require__(11);
var shared = __webpack_require__(32);
var setToStringTag = __webpack_require__(25);
var uid = __webpack_require__(21);
var wks = __webpack_require__(1);
var wksExt = __webpack_require__(41);
var wksDefine = __webpack_require__(42);
var enumKeys = __webpack_require__(144);
var isArray = __webpack_require__(145);
var anObject = __webpack_require__(5);
var isObject = __webpack_require__(8);
var toIObject = __webpack_require__(10);
var toPrimitive = __webpack_require__(27);
var createDesc = __webpack_require__(16);
var _create = __webpack_require__(35);
var gOPNExt = __webpack_require__(146);
var $GOPD = __webpack_require__(147);
var $DP = __webpack_require__(4);
var $keys = __webpack_require__(12);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(65).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(18).f = $propertyIsEnumerable;
  __webpack_require__(34).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(24)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(7)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(21)('meta');
var isObject = __webpack_require__(8);
var has = __webpack_require__(9);
var setDesc = __webpack_require__(4).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(11)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(12);
var gOPS = __webpack_require__(34);
var pIE = __webpack_require__(18);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(17);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(10);
var gOPN = __webpack_require__(65).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(18);
var createDesc = __webpack_require__(16);
var toIObject = __webpack_require__(10);
var toPrimitive = __webpack_require__(27);
var has = __webpack_require__(9);
var IE8_DOM_DEFINE = __webpack_require__(43);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(6) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(42)('asyncIterator');


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(42)('observable');


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(66);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(153);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(3);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperty: __webpack_require__(4).f });


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _promise = __webpack_require__(39);

var _promise2 = _interopRequireDefault(_promise);

var _toConsumableArray2 = __webpack_require__(53);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _slicedToArray2 = __webpack_require__(50);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FetchMock = {};

FetchMock.callsFilteredByName = function (name) {
	if (name === true) {
		return this._allCalls.filter(function (call) {
			return !call.unmatched;
		});
	}
	if (name === false) {
		return this._allCalls.filter(function (call) {
			return call.unmatched;
		});
	}

	if (typeof name === 'undefined') {
		return this._allCalls;
	}

	if (this._calls[name]) {
		return this._calls[name];
	}
	return this._allCalls.filter(function (_ref) {
		var _ref2 = (0, _slicedToArray3.default)(_ref, 1),
		    url = _ref2[0];

		return url === name || url.url === name;
	});
};

FetchMock.calls = function (name) {
	var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	if (typeof options === 'string') {
		options = { method: options };
	}

	var calls = this.callsFilteredByName(name);

	if (options.method) {
		var testMethod = options.method.toLowerCase();
		calls = calls.filter(function (_ref3) {
			var _ref4 = (0, _slicedToArray3.default)(_ref3, 2),
			    url = _ref4[0],
			    _ref4$ = _ref4[1],
			    opts = _ref4$ === undefined ? {} : _ref4$;

			var method = (url.method || opts.method || 'get').toLowerCase();
			return method === testMethod;
		});
	}
	return calls;
};

FetchMock.lastCall = function (name, options) {
	return [].concat((0, _toConsumableArray3.default)(this.calls(name, options))).pop();
};

FetchMock.normalizeLastCall = function (name, options) {
	var call = this.lastCall(name, options) || [];
	if (this.config.Request.prototype.isPrototypeOf(call[0])) {
		return [call[0].url, call[0]];
	}
	return call;
};

FetchMock.lastUrl = function (name, options) {
	return this.normalizeLastCall(name, options)[0];
};

FetchMock.lastOptions = function (name, options) {
	return this.normalizeLastCall(name, options)[1];
};

FetchMock.called = function (name, options) {
	return !!this.calls(name, options).length;
};

FetchMock.flush = function () {
	return _promise2.default.all(this._holdingPromises);
};

FetchMock.done = function (name) {
	var _this = this;

	var names = name && typeof name !== 'boolean' ? [name] : this.routes.map(function (r) {
		return r.name;
	});

	// Can't use array.every because
	// a) not widely supported
	// b) would exit after first failure, which would break the logging
	return names.map(function (name) {
		if (!_this.called(name)) {
			console.warn('Warning: ' + name + ' not called'); // eslint-disable-line
			return false;
		}
		// would use array.find... but again not so widely supported
		var expectedTimes = (_this.routes.filter(function (r) {
			return r.name === name;
		}) || [{}])[0].repeat;

		if (!expectedTimes) {
			return true;
		}

		var actualTimes = _this.calls(name).length;
		if (expectedTimes > actualTimes) {
			console.warn('Warning: ' + name + ' only called ' + actualTimes + ' times, but ' + expectedTimes + ' expected'); // eslint-disable-line
			return false;
		} else {
			return true;
		}
	}).filter(function (bool) {
		return !bool;
	}).length === 0;
};

module.exports = FetchMock;

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var statusTextMap = {
  '100': 'Continue',
  '101': 'Switching Protocols',
  '102': 'Processing',
  '200': 'OK',
  '201': 'Created',
  '202': 'Accepted',
  '203': 'Non-Authoritative Information',
  '204': 'No Content',
  '205': 'Reset Content',
  '206': 'Partial Content',
  '207': 'Multi-Status',
  '208': 'Already Reported',
  '226': 'IM Used',
  '300': 'Multiple Choices',
  '301': 'Moved Permanently',
  '302': 'Found',
  '303': 'See Other',
  '304': 'Not Modified',
  '305': 'Use Proxy',
  '307': 'Temporary Redirect',
  '308': 'Permanent Redirect',
  '400': 'Bad Request',
  '401': 'Unauthorized',
  '402': 'Payment Required',
  '403': 'Forbidden',
  '404': 'Not Found',
  '405': 'Method Not Allowed',
  '406': 'Not Acceptable',
  '407': 'Proxy Authentication Required',
  '408': 'Request Timeout',
  '409': 'Conflict',
  '410': 'Gone',
  '411': 'Length Required',
  '412': 'Precondition Failed',
  '413': 'Payload Too Large',
  '414': 'URI Too Long',
  '415': 'Unsupported Media Type',
  '416': 'Range Not Satisfiable',
  '417': 'Expectation Failed',
  '418': 'I\'m a teapot',
  '421': 'Misdirected Request',
  '422': 'Unprocessable Entity',
  '423': 'Locked',
  '424': 'Failed Dependency',
  '425': 'Unordered Collection',
  '426': 'Upgrade Required',
  '428': 'Precondition Required',
  '429': 'Too Many Requests',
  '431': 'Request Header Fields Too Large',
  '451': 'Unavailable For Legal Reasons',
  '500': 'Internal Server Error',
  '501': 'Not Implemented',
  '502': 'Bad Gateway',
  '503': 'Service Unavailable',
  '504': 'Gateway Timeout',
  '505': 'HTTP Version Not Supported',
  '506': 'Variant Also Negotiates',
  '507': 'Insufficient Storage',
  '508': 'Loop Detected',
  '509': 'Bandwidth Limit Exceeded',
  '510': 'Not Extended',
  '511': 'Network Authentication Required'
};

module.exports = statusTextMap;

/***/ }),
/* 156 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var tpl = function tpl() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return "\n        <div id=\"forget-wrapper\">\n            <div class=\"choose-find-mod\">\n                <div class=\"find-mod\" id=\"choose-mobile\">\u4F7F\u7528\u624B\u673A\u53F7\u627E\u56DE\u5BC6\u7801</div>\n                <div class=\"find-mod\" id=\"choose-email\">\u4F7F\u7528\u90AE\u7BB1\u627E\u56DE\u5BC6\u7801</div>\n                <div class=\"clear-fix\"></div>\n                <div class=\"forget-dialog\" id=\"forget-dialog\">\n\n                </div>\n            </div>\n        </div>";
};

/* harmony default export */ __webpack_exports__["a"] = (function (conf) {
    conf.container.innerHTML = tpl();
});

/***/ }),
/* 157 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_fetch__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_utils__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_form_check__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__findTpl_js__ = __webpack_require__(161);



var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/*
 * export {xx, yy} 可以这样import, export obj则不行，新的babel禁止
 */





/*
 * 解构运算, 解构重命名
 */
var $ = __WEBPACK_IMPORTED_MODULE_3__common_utils__["a" /* default */].domSelector,
    addClass = __WEBPACK_IMPORTED_MODULE_3__common_utils__["a" /* default */].addClass,
    removeClass = __WEBPACK_IMPORTED_MODULE_3__common_utils__["a" /* default */].removeClass;


/* harmony default export */ __webpack_exports__["a"] = ((function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee3(opts) {
        var $chooseMobile, $chooseEmail, $dialog, findInfo, forget;
        return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        $chooseMobile = $('#choose-mobile');
                        $chooseEmail = $('#choose-email');
                        $dialog = $('#forget-dialog');
                        _context3.next = 5;
                        return Object(__WEBPACK_IMPORTED_MODULE_2__common_fetch__["a" /* fetchJson */])('/security-info', {});

                    case 5:
                        findInfo = _context3.sent;

                        forget = function () {
                            var _ref2 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee2(type) {
                                var $verifyInput, $forgetBtn, $number, $close, typeAlias, typeTool, sendVerifyCode;
                                return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
                                    while (1) {
                                        switch (_context2.prev = _context2.next) {
                                            case 0:
                                                $verifyInput = $('#forget-verify-input');
                                                $forgetBtn = $('#forget-confirm-btn');
                                                $number = $('#forget-verify-number');
                                                $close = $('#forget-dialog-close');
                                                typeAlias = type === '邮箱' ? 'email' : 'mobile';
                                                typeTool = type === '邮箱' ? '邮件' : '短信';
                                                _context2.next = 8;
                                                return Object(__WEBPACK_IMPORTED_MODULE_2__common_fetch__["a" /* fetchJson */])('/send-forget-verifycode', { type: typeAlias });

                                            case 8:
                                                sendVerifyCode = _context2.sent;


                                                if (sendVerifyCode.code === 200) {
                                                    $verifyInput.oninput = function () {
                                                        var MSGLENGTH = 6;
                                                        var value = $verifyInput.value;
                                                        //过滤非数字输入
                                                        $verifyInput.value = value.replace(/\D/g, '');
                                                        //长度过滤
                                                        if ($verifyInput.value.length > MSGLENGTH - 1) {
                                                            $forgetBtn.removeAttribute('disabled');
                                                            removeClass($forgetBtn, 'disabled');
                                                            addClass($forgetBtn, 'btn-primary');
                                                            if (value.length > MSGLENGTH) {
                                                                $verifyInput.value = value.substring(0, MSGLENGTH);
                                                            }
                                                        } else {
                                                            removeClass($forgetBtn, 'btn-primary');
                                                            addClass($forgetBtn, 'disabled');
                                                            $forgetBtn.setAttribute('disabled', 'disabled');
                                                        }
                                                    };

                                                    $forgetBtn.onclick = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee() {
                                                        var data;
                                                        return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
                                                            while (1) {
                                                                switch (_context.prev = _context.next) {
                                                                    case 0:
                                                                        _context.next = 2;
                                                                        return Object(__WEBPACK_IMPORTED_MODULE_2__common_fetch__["b" /* fetchPost */])('/forget', {
                                                                            mobile: $number.innerText,
                                                                            verifyCode: $verifyInput.value
                                                                        });

                                                                    case 2:
                                                                        data = _context.sent;

                                                                        if (data.code === 200) {
                                                                            opts.success && opts.success();
                                                                            location.replace('common-success.html?text=重置链接已发送至您的' + type + '，请收到后按提示操作');
                                                                        } else {
                                                                            alert('验证码输入错误');
                                                                        }

                                                                    case 4:
                                                                    case 'end':
                                                                        return _context.stop();
                                                                }
                                                            }
                                                        }, _callee, _this);
                                                    }));

                                                    $close.onclick = function () {
                                                        $dialog.style.display = 'none';
                                                    };

                                                    $dialog.style.display = 'block';
                                                } else {
                                                    alert('验证' + typeTool + '发送失败');
                                                }

                                            case 10:
                                            case 'end':
                                                return _context2.stop();
                                        }
                                    }
                                }, _callee2, _this);
                            }));

                            return function forget(_x2) {
                                return _ref2.apply(this, arguments);
                            };
                        }();

                        $chooseMobile.onclick = function () {
                            $dialog.innerHTML = Object(__WEBPACK_IMPORTED_MODULE_5__findTpl_js__["a" /* default */])('手机', findInfo.data.mobile);
                            forget('手机');
                        };

                        $chooseEmail.onclick = function () {
                            $dialog.innerHTML = Object(__WEBPACK_IMPORTED_MODULE_5__findTpl_js__["a" /* default */])('邮箱', findInfo.data.email);
                            forget('邮箱');
                        };

                    case 9:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, _this);
    }));

    return function (_x) {
        return _ref.apply(this, arguments);
    };
})());

// action="common-success.html?text=重置链接已发送至您的${ type }，请收到后按提示操作"

/***/ }),
/* 158 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return fetchPost; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fetchJson; });
/*
 * Fetch 请求默认是不带 cookie 的，需要设置 fetch(url, {credentials: 'include'})
服务器返回 400，500 错误码时并不会 reject，只有网络错误这些导致请求不能完成时，fetch 才会被 reject。
 */

var fetchPost = function fetchPost(url, params) {
    return fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        credentials: 'include',
        params: params
    }).then(function (res) {
        if (!res.ok) {
            throw Error(res.statusText);
        }
        return res.json();
    });
};

var fetchJson = function fetchJson(url, params) {
    return fetch(url, {
        method: 'GET',
        headers: {},
        credentials: 'include',
        params: params
    }).then(function (res) {
        if (!res.ok) {
            throw Error(res.statusText);
        }
        return res.json();
    });
};

// export {fetchPost, fetchJson};



// import { obj2query } from './utils';

// const http = (type) => {
//     return (opts) => {
//         return new Promise( function(resolve, reject) {
//             let xhr = new XMLHttpRequest();
//             let originQuery = obj2query(opts.data);
//             let params = originQuery ? originQuery.replace(/^\?/, '') : '';
//             let method = type.toUpperCase();
//             xhr.open(method, opts.url, true);

//             /*
//              * 默认header设置
//              */
//             if (method === 'POST') {
//                 xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//             }
//             xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

//             /*
//              * 自定义header设置
//              */
//             if (isObj(opts.headers)) {
//                 for (let i in opts.headers) {
//                     xhr.setRequestHeader(i, opts.headers[i]);
//                 }
//             }
//             xhr.send(params);
//             xhr.onreadystatechange = function () {
//                 if (xhr.readyState === 4) {
//                     if (xhr.status === 200) {
//                         var result = JSON.parse(xhr.responseText);
//                         opts.success && opts.success(result);
//                         resolve(result);
//                     }
//                     else {
//                         opts.error && opts.error(xhr.status);
//                         reject(xhr.status);
//                     }
//                 }
//             };
//         }
//     }
// }


// })


// const get = http('get');
// const post = http('post');

// module default { get, post }
//
//
//
//// const fetchOrigin = (type) => {
//     let defaultHeaders = {};
//     let method = 'GET';
//     if (type === 'post') {
//         defaultHeaders = {
//             "Content-Type": "application/x-www-form-urlencoded"
//         };
//         method = 'POST'
//     }

//     return (url, params) => {
//         return fetch(url, {
//             method: method,
//             mode: "cors",  //cors跨域 no-cors: 返回值不可读，用于img，css等
//             headers: defaultHeaders,
//             credentials: 'include',
//             params: params
//         }).then((res) => {
//             if (!res.ok) {
//                 throw Error(res.statusText);
//             }
//             console.log(res.json());
//             return res.json();
//         });
//     }
// }

// const fetchJson = fetchOrigin('json');
// const fetchPost = fetchOrigin('post');

/***/ }),
/* 159 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);

var utils = {
    domSelector: function domSelector(selector) {
        return window.document.querySelector(selector);
    },

    getUrlParams: function getUrlParams(key) {
        var query = location.search.replace(/^\?/, '');
        var obj = {};
        query.split('&').map(function (item) {
            var tmp = item.split('=');
            obj[tmp[0]] = tmp[1];
        });
        if (!key) {
            return obj;
        } else {
            return obj[key];
        }
    },

    obj2query: function obj2query(obj) {
        if (!obj) {
            return;
        }
        var query = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(obj).filter(function (key) {
            return obj[key] !== '' && obj[key] !== null;
        }).map(function (key) {
            return key + '=' + obj[key];
        }).join('&');
        return query.length > 0 ? '?' + query : null;
    },

    hasClass: function hasClass(obj, cls) {
        return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    },

    addClass: function addClass(obj, cls) {
        obj.className.trim();
        if (!utils.hasClass(obj, cls)) obj.className += " " + cls;
    },

    removeClass: function removeClass(obj, cls) {
        if (utils.hasClass(obj, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            obj.className = obj.className.replace(reg, ' ');
        }
    },

    isArray: function isArray(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    },

    isObject: function isObject(arg) {
        return Object.prototype.toString.call(arg) === '[object Object]';
    },

    /*
     * 事件绑定or代理，
     * bindEvent(el, event fn)  //事件直接绑定
     * bindEvent(el, event, classSelector fn) //事件代理
     */
    bindEvent: function bindEvent() {
        var target = void 0;
        var selector = void 0;
        var fn = void 0;
        var findNode = function findNode(el, selector, endel) {
            if (el === endel) {
                return;
            }
            // console.log(el, tagName);
            if (document.querySelector(selector).className === el.className) {
                target = el;
            } else {
                findNode(el.parentNode, selector, endel);
            }
        };
        var el = arguments[0];
        var type = arguments[1];
        if (typeof arguments[2] === 'string') {
            selector = arguments[2];
            if (typeof arguments[3] === 'function') {
                fn = arguments[3];
            }
        } else if (typeof arguments[2] === 'function') {
            fn = arguments[2];
        }

        el.addEventListener(type, function (e) {
            if (!selector) {
                fn.call(el, e);
            } else if (selector) {
                findNode(e.target, selector, el);
                target && fn.call(target, { target: target });
            }
        });
    }
};

/* harmony default export */ __webpack_exports__["a"] = (utils);

/***/ }),
/* 160 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_array_from__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_array_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_array_from__);



var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * 正则
 * 修饰器@
 * Array.from
 */

var formatText = function formatText(key) {
    return '您填写的' + key + '格式不正确';
};

var rules = {
    email: function email(v) {
        if (!v.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
            return {
                type: 'email',
                message: formatText('邮箱')
            };
        }
    },

    mobile: function mobile(v) {
        if (!v.match(/^1(3|4|5|7|8)\d{9}$/)) {
            return {
                type: 'mobile',
                message: formatText('手机号')
            };
        }
    },

    IDcard: function IDcard(v) {
        return {
            type: 'IDcard',
            message: formatText('身份证号')
        };
    },

    present: function present(v) {
        if (!v.trim()) {
            return {
                type: 'present',
                message: '必填'
            };
        }
    }

    // const tip = (dom, errorArr) => {
    //     if (errorArr.length) {
    //         const span = document.createElement('span');
    //         span.innerText = errorArr[0].message;
    //         dom.parentNode.appendChild(span);
    //     }
    //     else {
    //         return true;
    //     }
    // }

    /*
     * ES6 Class讲解
     */

};
var FormCheck = function () {
    function FormCheck(opts) {
        _classCallCheck(this, FormCheck);

        this.opts = opts;
    }

    _createClass(FormCheck, [{
        key: 'check',
        value: function check(form) {
            var elements = this.opts.form.elements || document.getElementById(this.opts.form).elements;

            var checkResults = [];

            // [].filter.call(elements, (item) => {
            /*
             * Array.from 将array like转为真正的array
             */
            __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_array_from___default()(elements).filter(function (item) {
                return item.getAttribute('valid');
            }).map(function (item) {
                var valids = item.getAttribute('valid').split(', ');
                var value = item.value;
                var errorArr = [];
                valids.forEach(function (valid) {
                    if (rules[valid]) {
                        var result = rules[valid](value);
                        result && errorArr.push(result);
                    }
                });

                // if (this.opts.handle) {
                //     this.opts.handle(item, errorArr);
                // }
                // else {
                //     tip(item, errorArr);
                // }
                if (errorArr.length) {
                    checkResults.push({
                        dom: item,
                        errorArr: errorArr,
                        name: item.name,
                        message: errorArr[0].message,
                        type: errorArr[0].type
                    });
                }
            });

            return checkResults;
        }
    }]);

    return FormCheck;
}();

/* unused harmony default export */ var _unused_webpack_default_export = (FormCheck);

/***/ }),
/* 161 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function (type, number) {
    return "\n        <div class=\"forget-verify-dialog-header\">\n            <div class=\"forget-dialog-close\" id=\"forget-dialog-close\"></div>\n        </div>\n        <p class=\"forget-tip\">\n            <img src=\"../images/tip-fill.png\">\u6821\u9A8C\u7801\u5DF2\u53D1\u9001\u5230\u4F60\u7684" + type + "\uFF0C15\u5206\u949F\u5185\u8F93\u5165\u6709\u6548\uFF0C\u8BF7\u52FF\u6CC4\u6F0F\n        </p>\n        <form id=\"forget-form\" onsubmit=\"return false\">\n            <label>\n                <span>" + type + "\uFF1A </span>\n                <div id=\"forget-verify-number\">" + number + "</div>\n            </label>\n            <label>\n                <span>\u9A8C\u8BC1\u7801\uFF1A </span>\n                <input type=\"text\" name=\"verify\" id=\"forget-verify-input\">\n            </label>\n            <label>\n                <span>&nbsp;</span>\n                <div class=\"forget-tip\"><img src=\"../images/ok-fill.png\">\u6821\u9A8C\u7801\u5DF2\u53D1\u9001\u81F3\u4F60\u7684" + type + "\uFF0C\u8BF7\u67E5\u6536</div>\n            </label>\n            <input id=\"forget-confirm-btn\" class=\"disabled\" disabled type=\"submit\" value=\"\u786E\u8BA4\">\n        </form>";
});

/***/ })
/******/ ]);
});