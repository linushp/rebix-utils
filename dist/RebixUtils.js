(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["RebixUtils"] = factory();
	else
		root["RebixUtils"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 28);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var miniUnderscore = {};
var NOT_EXIST_INDEX = -1;
var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

var property = function property(key) {
    return function (obj) {
        return obj == null ? void 0 : obj[key];
    };
};

var getLength = property('length');
var prototypeToString = Object.prototype.toString;
var nativeIsArray = Array.isArray;
var nativeKeys = Object.keys || function (obj) {
    var result = [];
    if (!obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                result.push(key);
            }
        }
    }
    return result;
};

var isArrayLike = miniUnderscore.isArrayLike = function (collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
};

var isTypeOf = function isTypeOf(typeName) {
    return function (obj) {
        return prototypeToString.call(obj) === '[object ' + typeName + ']';
    };
};

// Delegates to ECMA5's native Array.isArray
var isArray = miniUnderscore.isArray = nativeIsArray || isTypeOf('Array');

var isFunction = isTypeOf('Function');

// Is a given variable an object?
miniUnderscore.isObject = function (obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
};

var forEach = miniUnderscore.each = miniUnderscore.forEach = function (obj, iteratee) {
    if (!obj) {
        return obj;
    }

    //如果参数本身就支持forEach直接用. immutableList和高级浏览器原生array支持.
    if (isFunction(obj.forEach)) {
        obj.forEach(iteratee);
    } else {

        var i, length;
        if (isArrayLike(obj)) {
            for (i = 0, length = obj.length; i < length; i++) {
                iteratee(obj[i], i, obj);
            }
        } else {
            var keys = nativeKeys(obj);
            for (i = 0, length = keys.length; i < length; i++) {
                iteratee(obj[keys[i]], keys[i], obj);
            }
        }
    }

    return obj;
};

miniUnderscore.map = function (arrOrObj, iteratee, isIgnoreEmpty) {
    var result = [];
    forEach(arrOrObj, function (value, key) {
        var m = iteratee(value, key);
        if (isIgnoreEmpty) {
            //默认false
            if (!miniUnderscore.isEmpty(m)) {
                result.push(m);
            }
        } else {
            result.push(m);
        }
    });
    return result;
};

// Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError ,'isArrayBuffer' ,'isBlob'
forEach(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error', 'ArrayBuffer', 'Blob'], function (name) {
    miniUnderscore['is' + name] = isTypeOf(name);
});

// An internal function for creating assigner functions.
var createAssigner = function createAssigner(keysFunc, undefinedOnly) {
    return function (obj) {
        var length = arguments.length;
        if (length < 2 || obj == null) return obj;
        for (var index = 1; index < length; index++) {
            var source = arguments[index],
                keys = keysFunc(source),
                l = keys.length;
            for (var i = 0; i < l; i++) {
                var key = keys[i];
                if (!undefinedOnly || obj[key] === void 0) {
                    obj[key] = source[key];
                }
            }
        }
        return obj;
    };
};

miniUnderscore.defaults = createAssigner(nativeKeys, true);
miniUnderscore.assignObject = miniUnderscore.extend = miniUnderscore.assign = createAssigner(nativeKeys, false);

miniUnderscore.isEmpty = function (obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (isArray(obj) || miniUnderscore.isString(obj) || miniUnderscore.isArguments(obj))) return obj.length === 0;
    return nativeKeys(obj).length === 0;
};

miniUnderscore.isObjectLike = function (value) {
    return !!value && typeof value == 'object';
};

var _uniqueId = 0;
miniUnderscore.uniqueId = function (prefix) {
    prefix = prefix || "";
    return '' + prefix + _uniqueId++;
};

miniUnderscore.keys = nativeKeys;
miniUnderscore.noop = function () {};

miniUnderscore.uniq = function (objectArray, keyGetter) {
    keyGetter = keyGetter || function (obj) {
        return obj;
    };
    var hash = {};
    var result = [];
    for (var i = 0; i < objectArray.length; i++) {
        var obj = objectArray[i];
        var key = '' + keyGetter(obj);
        if (!hash[key]) {
            result.push(obj);
            hash[key] = true;
        }
    }
    return result;
};

miniUnderscore.uniqBy = function (objectArray, keyName) {
    return miniUnderscore.uniq(objectArray, function (obj) {
        return obj[keyName];
    });
};

miniUnderscore.pick = function (obj, keyArray) {
    var result = {};
    forEach(keyArray, function (key) {
        result[key] = obj[key];
    });
    return result;
};

var findIndex = miniUnderscore.findIndex = function (arrayOrList, predicate) {
    var indexResult = NOT_EXIST_INDEX;
    forEach(arrayOrList, function (obj, index) {
        if (indexResult === NOT_EXIST_INDEX) {
            var isMatch = predicate(obj, index);
            if (isMatch) {
                indexResult = index;
            }
        }
    });
    return indexResult;
};

var contains = miniUnderscore.contains = function (array0, obj) {
    return NOT_EXIST_INDEX !== findIndex(array0, function (obj0) {
        return obj0 === obj;
    });
};

var different = miniUnderscore.different = function (array1, array2) {
    var result = [];
    forEach(array1, function (obj1) {
        if (!contains(array2, obj1)) {
            result.push(obj1);
        }
    });
    return result;
};

miniUnderscore.omit = function (obj, keyArray) {
    var oldKeys = nativeKeys(obj);
    var keyArray1 = different(oldKeys, keyArray);
    return miniUnderscore.pick(obj, keyArray1);
};

miniUnderscore.values = function (obj) {
    return miniUnderscore.map(obj, function (v) {
        return v;
    });
};

module.exports = miniUnderscore;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function warning() {
    console.log(arguments);
}

module.exports = warning;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function isPromise(p) {
    return p && typeof p.then === 'function' && typeof p['catch'] === 'function';
}

var PROMISE_CACHE = {};
/**
 * 将promise缓存起来,可以防止在短时间内发起重复的请求
 * @param promiseId 用于标记一个Promise的Id
 * @param cacheSecond 缓存时间
 * @param createFunction
 * @returns {*}
 */
function getCacheOrCreatePromise(promiseId, cacheSecond, createFunction) {

    var date_now = new Date().getTime();

    var cachePromise = PROMISE_CACHE[promiseId];
    if (cachePromise && date_now - cachePromise['time'] < 1000 * cacheSecond) {
        return cachePromise['promise'];
    } else {
        var promise = createFunction();
        PROMISE_CACHE[promiseId] = {
            promise: promise,
            time: date_now
        };
        return promise;
    }
}

module.exports = {
    _PROMISE_CACHE: PROMISE_CACHE,
    isPromise: isPromise,
    getCacheOrCreatePromise: getCacheOrCreatePromise
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getElementsByTagName = document.getElementsByTagName;
var createElement = document.createElement;

var loadStaticCache = {};

function loadStaticJS(url, callback) {

    if (loadStaticCache[url]) {
        callback(false);
        return;
    }

    var script = createElement("script");
    script.src = url;
    script.type = 'text/javascript';
    script.language = 'javascript';
    script.onload = script.onreadstatechange = function () {
        callback(true);
        loadStaticCache[url] = true;
    };
    getElementsByTagName("body")[0].appendChild(script);
}

function loadStaticCSS(url, callback) {

    if (loadStaticCache[url]) {
        callback(false);
        return;
    }

    var link = createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = url;
    link.onload = link.onreadstatechange = function () {
        callback(true);
        loadStaticCache[url] = true;
    };
    getElementsByTagName("head")[0].appendChild(link);
}

//保证脚本只会加载一次
var PROMISE_CACHE = {};
function createLoadStaticPromise(loadStatic) {
    return function (url) {

        var promise = PROMISE_CACHE[url];
        if (promise) {
            return promise;
        }

        //需要浏览器支持Promise
        promise = new Promise(function (resolve) {
            loadStatic(url, function (result) {
                resolve(result);
            });
        });

        PROMISE_CACHE[url] = promise;
        return promise;
    };
}

var loadStaticJSPromise = createLoadStaticPromise(loadStaticJS);
var loadStaticCssPromise = createLoadStaticPromise(loadStaticCSS);

module.exports = {
    loadStaticJS: loadStaticJS,
    loadStaticCSS: loadStaticCSS,
    loadStaticJSPromise: loadStaticJSPromise,
    loadStaticCssPromise: loadStaticCssPromise
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PromiseUtils = __webpack_require__(2);

function sendXmlHttpRequest(method, url, data, contentType, responseType) {

    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);

        //1.responseType
        if (responseType) {
            xhr.responseType = responseType;
        } else {
            xhr.responseType = 'text';
        }

        //2.contentType
        var CONST_CONTENT_TYPE = 'Content-Type';
        if (contentType === 'form') {
            xhr.setRequestHeader(CONST_CONTENT_TYPE, "application/x-www-form-urlencoded");
        }
        if (contentType === 'json') {
            xhr.setRequestHeader(CONST_CONTENT_TYPE, "application/json;charset=UTF-8");
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                    var responseText = xhr.responseText;
                    resolve(responseText);
                } else {
                    reject(xhr.status);
                }
            }
        };

        //3.data
        if (data) {
            xhr.send(data);
        } else {
            xhr.send();
        }
    });
}

function jsonParseResponseText(responseText) {
    return JSON.parse(responseText);
}

function sendGetRequest(url, cacheSecond) {
    if (!cacheSecond) {
        return sendXmlHttpRequest("GET", url);
    }

    return PromiseUtils.getCacheOrCreatePromise("get:" + url, cacheSecond, function () {
        return sendXmlHttpRequest("GET", url);
    });
}

function sendGetJSONRequest(url, cacheSecond) {
    return sendGetRequest(url, cacheSecond).then(jsonParseResponseText);
}

function sendPostRequest(url, data, contentType) {
    return sendXmlHttpRequest("POST", url, data, contentType);
}

function sendPostJSONRequest(url, data) {
    var dataStr = JSON.stringify(data);
    return sendPostRequest(url, dataStr, 'json').then(jsonParseResponseText);
}

function sendPostFormRequest(url, data) {
    return sendPostRequest(url, data, 'form');
}

function sendPostFormRequest2(url, data) {
    return sendPostRequest(url, data, 'form').then(jsonParseResponseText);
}

function toQueryStringPush(isEncode, arrs, key, value) {
    if (value !== undefined && value !== "" && value !== null) {
        if (isEncode) {
            arrs.push(key + "=" + encodeURIComponent(value));
        } else {
            arrs.push(key + "=" + value);
        }
    }
}

function toQueryString(obj, isEncode) {
    var arrs = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            var value = obj[key];
            if (Object.prototype.toString.call(value) === '[object Array]') {
                for (var i = 0; i < value.length; i++) {
                    var obj1 = value[i];
                    toQueryStringPush(isEncode, arrs, key, obj1);
                }
            } else {
                toQueryStringPush(isEncode, arrs, key, value);
            }
        }
    }
    return arrs.join("&");
}

module.exports = {
    sendXmlHttpRequest: sendXmlHttpRequest,
    sendGetRequest: sendGetRequest,
    sendGetJSONRequest: sendGetJSONRequest,
    sendPostRequest: sendPostRequest,
    sendPostFormRequest: sendPostFormRequest,
    sendPostFormRequest2: sendPostFormRequest2,
    sendPostJSONRequest: sendPostJSONRequest,
    toQueryString: toQueryString
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function toArray(aaa) {
    if (!aaa) {
        return [];
    }

    var argsArray = Array.prototype.slice.call(aaa);
    var args = [].concat(argsArray);
    return args;
}

module.exports = {
    toArray: toArray
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var domainPrefix = window.location.host;

var CookieUtils = {

    /**
     * 设置一个cookie
     *
     * @param {String} name cookie名称
     * @param {String} value cookie值
     * @param {String} domain 所在域名
     * @param {String} path 所在路径
     * @param {Number} hour 存活时间，单位:小时
     * @return {Boolean} 是否成功
     */
    set: function set(name, value, domain, path, hour) {
        if (hour) {
            var today = new Date();
            var expire = new Date();
            expire.setTime(today.getTime() + 3600000 * hour);
        }
        window.document.cookie = name + "=" + value + "; " + (hour ? "expires=" + expire.toGMTString() + "; " : "") + (path ? "path=" + path + "; " : "path=/; ") + (domain ? "domain=" + domain + ";" : "domain=" + domainPrefix + ";");
        return true;
    },

    /**
     * 获取指定名称的cookie值
     *
     * @param {String} name cookie名称
     * @return {String} 获取到的cookie值
     */
    get: function get(name) {
        var r = new RegExp("(?:^|;+|\\s+)" + name + "=([^;]*)");
        // var r = new RegExp("(?:^|;+|\\s+)" + name + "=([^;]*?)(?:;|$)");
        var m = window.document.cookie.match(r);
        return !m ? "" : m[1];
        // document.cookie.match(new
        // RegExp("(?:^|;+|\\s+)speedMode=([^;]*?)(?:;|$)"))
    },

    /**
     * 删除指定cookie,复写为过期
     *
     * @param {String} name cookie名称
     * @param {String} domain 所在域
     * @param {String} path 所在路径
     */
    remove: function remove(name, domain, path) {
        window.document.cookie = name + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; " + (path ? "path=" + path + "; " : "path=/; ") + (domain ? "domain=" + domain + ";" : "domain=" + domainPrefix + ";");
    }
};

module.exports = CookieUtils;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PRIVATE_LISTENERS_NAME = "$$listeners$$";
var PRIVATE_LISTENER_WRAPPER = 'listenerWrapper';

function EventBusClass(name, listenerWrapper) {
    var that = this;
    that.name = name;
    that[PRIVATE_LISTENER_WRAPPER] = listenerWrapper;
    that[PRIVATE_LISTENERS_NAME] = [];
}

var EventBusClassPrototype = EventBusClass.prototype;

EventBusClassPrototype.on = function (eventName, listener) {
    this[PRIVATE_LISTENERS_NAME].push({
        eventName: eventName,
        listener: listener
    });
};

EventBusClassPrototype.off = function (eventName, listener) {
    var that = this;
    var listeners = that[PRIVATE_LISTENERS_NAME];
    var result = [];
    for (var i = 0; i < listeners.length; i++) {
        var m = listeners[i];
        if (m.eventName === eventName && m.listener === listener) {
            //skip
        } else {
                result.push(m);
            }
    }
    that[PRIVATE_LISTENERS_NAME] = result;
};

EventBusClassPrototype.emit = function (eventName, m1, m2, m3, m4, m5) {
    var that = this;
    var listeners = that[PRIVATE_LISTENERS_NAME];
    var listenerWrapper = that[PRIVATE_LISTENER_WRAPPER];

    for (var i = 0; i < listeners.length; i++) {
        var m = listeners[i];
        if (m.eventName === eventName && m.listener) {
            if (listenerWrapper) {
                listenerWrapper(m.listener, m1, m2, m3, m4, m5);
            } else {
                m.listener(m1, m2, m3, m4, m5);
            }
        }
    }
};

module.exports = EventBusClass;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var miniUnderscore = __webpack_require__(0);
var assignObject = miniUnderscore.assignObject;

var hasOwn = ({}).hasOwnProperty;

function classNames() {
    var classes = [];
    for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        if (!arg) continue;

        var argType = typeof arg;

        if (argType === 'string' || argType === 'number') {
            classes.push(arg);
        } else if (Array.isArray(arg)) {
            classes.push(classNames.apply(null, arg));
        } else if (argType === 'object') {
            for (var key in arg) {
                if (hasOwn.call(arg, key) && arg[key]) {
                    classes.push(key);
                }
            }
        }
    }
    return classes.join(' ');
}

function showStyle(isShow, style) {
    style = style || {};
    return assignObject({ display: isShow ? 'block' : 'none' }, style);
}

function hideStyle(isHide, style) {
    style = style || {};
    if (isHide) {
        style['display'] = "none";
    }
    return style;
}

module.exports = {
    classNames: classNames,
    showStyle: showStyle,
    hideStyle: hideStyle
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defineModuleMap = {};
var defineModuleFactoryMap = {};
var defineModuleBuildingMap = {};

function defineModule(name, factory) {
    defineModuleFactoryMap[name] = factory;
}

function requireModule(name) {
    var m = defineModuleMap[name];
    if (m) {
        return m;
    }

    var factory = defineModuleFactoryMap[name];
    if (!factory) {
        throw new Error("[ERROR] module is not exist : " + name);
    }

    if (defineModuleBuildingMap[name]) {
        throw new Error("[ERROR] module is circular reference : " + name);
    }

    defineModuleBuildingMap[name] = true;
    m = factory() || "return void";
    defineModuleBuildingMap[name] = false;

    defineModuleMap[name] = m;
    return m;
}

module.exports = {
    defineModule: defineModule,
    requireModule: requireModule
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _services_container = {
    'common': {}
};

/**
 * demo :
 * 1. setService("app1")("UserUtils",{})
 * 2. setService()("UserUtils",{})
 *
 * @param module
 * @returns {Function}
 */
function setService(module) {
    return function (key, value) {
        getServices(module)[key] = value;
    };
}

/**
 * demo:
 * 1.getService("app1")("UserUtils");
 * 1.getService()("UserUtils");
 *
 * @param module
 * @returns {Function}
 */
function getService(module) {
    return function (key) {
        return getServices(module)[key];
    };
}

/**
 * demo:
 * 1.getServices("app1");
 * 2.getServices();
 * @param module
 * @returns {*}
 */
function getServices(module) {
    module = module || "common";
    _services_container[module] = _services_container[module] || {};
    return _services_container[module];
}

/**
 *
 * @param p1 [可省略] module
 * @param p2 services
 */
function setServices(p1, p2) {
    var module, services;
    if (!p2) {
        module = 'common';
        services = p1;
    } else {
        module = p1;
        services = p2;
    }

    var oldServices = getServices(module);
    for (var serviceName in services) {
        if (services.hasOwnProperty(serviceName)) {
            var serviceObj = services[serviceName];
            oldServices[serviceName] = serviceObj;
        }
    }
}

function getAllServices() {
    return _services_container;
}

module.exports = {

    setService: setService,
    getService: getService,

    getServices: getServices,
    setServices: setServices,

    getAllServices: getAllServices

};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var camelCase = __webpack_require__(24);
var deCamelCase = __webpack_require__(25);
var slash = __webpack_require__(26);
var upFirstChar = __webpack_require__(27);

function trim(str) {
    return str.replace(/^\s*|\s*$/g, '');
}

function trimLeft(str) {
    return str.replace(/^\s*/, '');
}

function trimRight(str) {
    return str.replace(/\s*$/, '');
}

function startWith(str, prefix) {
    str = "" + str;
    return str.indexOf(prefix) === 0;
}

//AjaxUtils['$$EM$$'] = true;
module.exports = {
    trim: trim,
    trimLeft: trimLeft,
    trimRight: trimRight,
    startWith: startWith,

    camelCase: camelCase,
    deCamelCase: deCamelCase,
    slash: slash,
    upFirstChar: upFirstChar
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var warning = __webpack_require__(1);

var _QUEUE = '_queue';
var _RUNNER = '_runner';
var _IS_RUNNING = '_isRunning';
var _TIME_INTERVAL = '_timeInterval';
var _TIME_SPACE = '_timeSpace';
var _AUTO_CLEAR = '_autoClear';

/**
 * 这是一个Class
 * @param runner
 * @param timeSpace
 * @constructor
 */
function TaskQueueRunner(runner, timeSpace, autoClear) {
    var that = this;
    that[_QUEUE] = [];
    that[_RUNNER] = runner;
    that[_IS_RUNNING] = false;
    that[_TIME_INTERVAL] = 0;
    that[_TIME_SPACE] = timeSpace;
    that[_AUTO_CLEAR] = autoClear;
}

var TaskQueueRunnerPrototype = TaskQueueRunner.prototype;

TaskQueueRunnerPrototype.pushTask = function (task) {
    var that = this;
    that[_QUEUE].push(task);
};

TaskQueueRunnerPrototype.getAllTask = function () {
    return this[_QUEUE];
};

TaskQueueRunnerPrototype.clearTask = function () {
    this[_QUEUE] = [];
};

TaskQueueRunnerPrototype.start = function () {
    var that = this;
    if (!that[_IS_RUNNING]) {
        that[_IS_RUNNING] = true;
        that[_TIME_INTERVAL] = setInterval(function () {
            var runner = that[_RUNNER];
            try {

                var autoClear = that[_AUTO_CLEAR];
                if (autoClear) {

                    //仅当有任务时,才会调用runner.并且runner完成后,清理掉queue
                    if (that[_QUEUE].length > 0) {
                        runner(that, that[_QUEUE]);
                        that[_QUEUE] = [];
                    }
                } else {
                    runner(that);
                }
            } catch (e) {
                warning(e);
            }
        }, that[_TIME_SPACE]);
    }
};

TaskQueueRunnerPrototype.stop = function () {
    var that = this;
    if (that[_IS_RUNNING]) {
        that[_IS_RUNNING] = false;
        var timeInterval = that[_TIME_INTERVAL];
        if (timeInterval) {
            clearInterval(timeInterval);
        }
    }
};

module.exports = TaskQueueRunner;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var CONST_NULL = null;

var _lastServerTimestamp = '_lastServerTimestamp';
var _lastClientTimestamp = '_lastClientTimestamp';

function ServerTimeClass() {
    var that = this;
    that[_lastServerTimestamp] = CONST_NULL;
    that[_lastClientTimestamp] = CONST_NULL;
}

var ServerTimeClassPrototype = ServerTimeClass.prototype;

/**
 * 更新服务端时间
 * @param serverTimestamp 服务器时间
 * @param clientTimestamp 此刻的客户端时间
 */
ServerTimeClassPrototype.updateServerTime = function (serverTimestamp, clientTimestamp) {
    var that = this;
    that[_lastServerTimestamp] = serverTimestamp;
    that[_lastClientTimestamp] = clientTimestamp || new Date().getTime();
};

ServerTimeClassPrototype.getServerTimeNow = function () {
    var clientNow = new Date().getTime();
    var that = this;
    if (!that[_lastServerTimestamp]) {
        return clientNow;
    }
    return clientNow + that[_lastServerTimestamp] - that[_lastClientTimestamp];
};

//YYYY-MM-dd hh:mm:ss
var timeMap = {
    ms: 1,
    s: 1000,
    m: 1000 * 60,
    h: 1000 * 60 * 60,
    d: 1000 * 60 * 60 * 24,
    M: 2628000000, //1000 * 60 * 60 * 24 * (365 / 12)
    Y: 1000 * 60 * 60 * 24 * 365
};

function getTimeAfter(timestamp, count, unit) {
    var ds = timeMap[unit];
    return timestamp + count * ds;
}

function getDateAfter(date, count, unit) {
    return new Date(getTimeAfter(date.getTime(), count, unit));
}

module.exports = {
    ServerTimeClass: ServerTimeClass,
    ServerTimeUtils: new ServerTimeClass(),
    getTimeAfter: getTimeAfter,
    getDateAfter: getDateAfter
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var miniUnderscore = __webpack_require__(0);
var warning = __webpack_require__(1);

/**
 * 解析URL
 * @param str
 * @returns {fragment,host,pass,path,port,query,scheme,user}
 */
function parseURL(str) {
    var parseURL = {};
    parseURL.SPEC = ['scheme', 'user', 'pass', 'host', 'port', 'path', 'query', 'fragment'];
    parseURL.RE = /^([^:]+):\/\/(?:([^:@]+):?([^@]*)@)?(?:([^/?#:]+):?(\d*))([^?#]*)(?:\?([^#]+))?(?:#(.+))?$/;
    var ret;
    if (null !== (ret = parseURL.RE.exec(str))) {
        var specObj = {};
        for (var i = 0, j = parseURL.SPEC.length; i < j; i++) {
            var curSpec = parseURL.SPEC[i];
            specObj[curSpec] = ret[i + 1];
        }
        ret = specObj;
        specObj = null;
    }
    return ret;
}

/**
 * 将 uri 的查询字符串参数映射成对象
 *
 * @method mapQuery
 * @memberOf string
 *
 * @param {String} uri 要映射的 uri
 * @return {Object} 按照 uri 映射成的对象
 *
 * @example
 *  var url = "http://tms.qihang.com/?hello=4765078&style=blue";
 *  // queryObj 则得到一个{hello:"4765078", style:"blue"}的对象。
 *  var queryObj = mapQuery(url);
 * };
 */
function mapQuery(uri) {
    //window.location.search
    uri = uri && uri.split('#')[0] || window.location.search; //remove hash
    var i,
        key,
        value,
        index = uri.indexOf("?"),
        pieces = uri.substring(index + 1).split("&"),
        params = {};
    if (index === -1) {
        //如果连?号都没有,直接返回,不再进行处理.
        return params;
    }
    for (i = 0; i < pieces.length; i++) {
        try {
            index = pieces[i].indexOf("=");
            key = pieces[i].substring(0, index);
            value = pieces[i].substring(index + 1);
            if (!(params[key] = value)) {
                throw new Error("uri has wrong query string when run mapQuery.");
            }
        } catch (e) {
            warning("错误：[" + e.name + "] " + e.message + ", " + e.fileName + ", 行号:" + e.lineNumber + "; stack:" + typeof e.stack, 2);
        }
    }
    return params;
}

/**
 * 获取查询字符串
 * @param paramName
 * @param uri 可选参数
 * @returns {*}
 */
function getQueryParam(paramName, uri) {
    var queryMap = mapQuery(uri);
    return queryMap[paramName];
}

function toQueryString(obj) {
    var mm = miniUnderscore.map(obj, function (v, k) {
        return '' + k + '=' + encodeURIComponent(v); //`${k}=${v}`;
    });
    return mm.join('&');
}

module.exports = {
    parseURL: parseURL,
    getQueryParam: getQueryParam,
    mapQuery: mapQuery,
    toQueryString: toQueryString
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * 让日期和时间按照指定的格式显示的方法
 * @param date
 * @param formatString  format 格式字符串
 * @returns {*}  返回生成的日期时间字符串
 *
 * @example
 *     var d = new Date();
 *     // 以 YYYY-MM-dd hh:mm:ss 格式输出 d 的时间字符串
 *     J.format.date(d, "YYYY-MM-DD hh:mm:ss");
 */


var formatDate = function formatDate(date, formatString) {
    /*
     * eg:formatString="YYYY-MM-DD hh:mm:ss";
     */
    var o = {
        "M+": date.getMonth() + 1, //month
        "D+": date.getDate(), //day
        "h+": date.getHours(), //hour
        "m+": date.getMinutes(), //minute
        "s+": date.getSeconds(), //second
        "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
        "S": date.getMilliseconds() //millisecond
    };

    if (/(Y+)/.test(formatString)) {
        formatString = formatString.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(formatString)) {
            formatString = formatString.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return formatString;
};

module.exports = formatDate;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var miniUnderscore = __webpack_require__(0);

/**
 *
 * @param timeStr 2016-01-02 或 2016/01/02 或 Date对象
 * @param nowTime0
 * @returns {*}
 */
function formatDatePretty(timeStr, nowTime0) {

    try {

        var floor = Math.floor;
        var minute = 60000;
        var hour = 3600000;
        var day = 86400000;
        var month = 2678400000;
        var year = 32140800000;

        var d1 = timeStr;
        if (miniUnderscore.isString(timeStr)) {
            timeStr = timeStr.replace(/-/gm, '/');
            d1 = new Date(timeStr);
        } else if (miniUnderscore.isNumber(timeStr)) {
            d1 = new Date(timeStr);
        }

        var d2 = nowTime0 ? new Date(nowTime0) : new Date();
        var t1 = d1.getTime();
        var t2 = d2.getTime();
        var diff = t2 - t1;
        //console.log(timeStr,d1,d2,t1,t2,diff);

        var r = 0;
        if (diff > year) {
            r = diff / year;
            return floor(r) + "年前";
        }
        if (diff > month) {
            r = diff / month;
            return floor(r) + "个月前";
        }
        if (diff > day) {
            r = diff / day;
            return floor(r) + "天前";
        }
        if (diff > hour) {
            r = diff / hour;
            return floor(r) + "个小时前";
        }
        if (diff > minute) {
            r = diff / minute;
            return floor(r) + "分钟前";
        }
        return "刚刚";
    } catch (e) {
        return timeStr;
    }
}

module.exports = formatDatePretty;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @memberOf format
 * @method number
 * 格式化数字显示方式
 * @param num 要格式化的数字
 * @param pattern 格式
 * @example
 * J.format.number(12345.999,'#,##0.00');
 *  //out: 12,34,5.99
 * J.format.number(12345.999,'0');
 *  //out: 12345
 * J.format.number(1234.888,'#.0');
 *  //out: 1234.8
 * J.format.number(1234.888,'000000.000000');
 *  //out: 001234.888000
 */


var formatNumber = function formatNumber(num, pattern) {
    var strarr = num ? num.toString().split('.') : ['0'];
    var fmtarr = pattern ? pattern.split('.') : [''];
    var retstr = '';

    // 整数部分
    var str = strarr[0];
    var fmt = fmtarr[0];
    var i = str.length - 1;
    var comma = false;
    for (var f = fmt.length - 1; f >= 0; f--) {
        switch (fmt.substr(f, 1)) {
            case '':
                if (i >= 0) retstr = str.substr(i--, 1) + retstr;
                break;
            case '0':
                if (i >= 0) retstr = str.substr(i--, 1) + retstr;else retstr = '0' + retstr;
                break;
            case ',':
                comma = true;
                retstr = ',' + retstr;
                break;
        }
    }
    if (i >= 0) {
        if (comma) {
            var l = str.length;
            for (; i >= 0; i--) {
                retstr = str.substr(i, 1) + retstr;
                if (i > 0 && (l - i) % 3 == 0) retstr = ',' + retstr;
            }
        } else retstr = str.substr(0, i + 1) + retstr;
    }

    retstr = retstr + '.';
    // 处理小数部分
    str = strarr.length > 1 ? strarr[1] : '';
    fmt = fmtarr.length > 1 ? fmtarr[1] : '';
    i = 0;
    for (var f = 0; f < fmt.length; f++) {
        switch (fmt.substr(f, 1)) {
            case '':
                if (i < str.length) retstr += str.substr(i++, 1);
                break;
            case '0':
                if (i < str.length) retstr += str.substr(i++, 1);else retstr += '0';
                break;
        }
    }
    return retstr.replace(/^,+/, '').replace(/\.$/, '');
};

module.exports = formatNumber;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var miniUnderscore = __webpack_require__(0);
var warning = __webpack_require__(1);

var _undefined = undefined;
var isFunction = miniUnderscore.isFunction;

function getValueByKey(obj, key) {
    if (!obj) {
        return _undefined;
    }
    var value = _undefined;
    if (isFunction(obj.get)) {
        value = obj.get(key);
    }
    if (value === _undefined) {
        value = obj[key];
    }

    return value;
}

/**
 * a = {
 *   b:{
 *      c:{
 *          d:1
 *      }
 *   }
 * }
 *
 * str : b.c.d
 * @param obj
 * @param str
 * @demo :
 *  var d = getObjectValue(a,'b.c.d');
 */
function getValueInPath(obj, str) {
    if (!obj) {
        return _undefined;
    }
    try {
        var propArr = str.split(".");
        var tmpObj = obj;
        var i = 0;
        while (i < propArr.length) {
            if (!tmpObj) {
                return tmpObj;
            }
            var prop = propArr[i];
            tmpObj = getValueByKey(tmpObj, prop);
            i++;
        }
        return tmpObj;
    } catch (e) {
        warning('[ERROR]', e);
    }

    return _undefined;
}

module.exports = getValueInPath;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * 计算图片的宽度和高度,限定最大宽度和最大高度.
 * @param maxWidth
 * @param maxHeight
 * @param sWidth
 * @param sHeight
 * @returns {*}
 */


module.exports = function getMediaSize(_x, _x2, _x3, _x4, _x5) {
    var _again = true;

    _function: while (_again) {
        var maxWidth = _x,
            maxHeight = _x2,
            sWidth = _x3,
            sHeight = _x4,
            loopCount = _x5;
        _again = false;

        if (!loopCount) {
            loopCount = 0;
        }

        if (loopCount > 2) {
            //防止死循环
            console.log("[ERROR]getMediaSize");
            return { width: sWidth, height: sHeight };
        }

        var width = 100;
        var height = 100;
        var scale = 0;

        if (sHeight <= maxHeight && sWidth <= maxWidth) {
            return { width: sWidth, height: sHeight };
        }

        if (sHeight <= maxHeight && sWidth > maxWidth) {
            width = maxWidth;
            scale = sWidth / maxWidth; //> 1
            height = sHeight / scale;
        }

        if (sHeight > maxHeight && sWidth <= maxWidth) {
            height = maxHeight;
            scale = sHeight / maxHeight; //>1
            width = sWidth / scale;
        }

        if (sHeight > maxHeight && sWidth > maxWidth) {
            height = maxHeight;
            scale = sHeight / maxHeight; //>1
            sWidth = sWidth / scale;
            width = sWidth;
        }

        if (width > maxWidth || height > maxHeight) {
            _x = maxWidth;
            _x2 = maxHeight;
            _x3 = width;
            _x4 = height;
            _x5 = loopCount + 1;
            _again = true;
            width = height = scale = undefined;
            continue _function;
        }

        width = Math.round(width);
        height = Math.round(height);

        return { width: width, height: height };
    }
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var loadStaticUtils = __webpack_require__(3);
var loadStaticJS = loadStaticUtils.loadStaticJS;

function loadShimES6Promise(callback) {
    if (!window.Promise) {
        //view-source:https://ant.design/
        loadStaticJS('https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js', callback);
    } else {
        setTimeout(function () {
            callback();
        }, 1);
    }
}

module.exports = loadShimES6Promise;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function onDomReady(callback) {

    var document = window.document;

    var callbackCalled = false;

    function DOMContentLoaded() {
        //保证只会被调用一次
        if (!callbackCalled) {
            setTimeout(function () {
                callback();
            }, 2);
            callbackCalled = true;
        }
    }

    if (document.readyState === "complete") {
        DOMContentLoaded();
        return;
    }

    // Mozilla, Opera and webkit nightlies currently support this event
    if (document.addEventListener) {
        // Use the handy event callback
        document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);

        // A fallback to window.onload, that will always work
        window.addEventListener("load", DOMContentLoaded, false);

        // If IE event model is used
    } else if (document.attachEvent) {
            // ensure firing before onload,
            // maybe late but safe also for iframes
            document.attachEvent("onreadystatechange", DOMContentLoaded);

            // A fallback to window.onload, that will always work
            window.attachEvent("onload", DOMContentLoaded);
        } else {
            DOMContentLoaded();
        }
}

module.exports = onDomReady;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function shallowEqual(objA, objB) {
    if (objA === objB) {
        return true;
    }

    if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
        return false;
    }

    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
        return false;
    }

    // Test for A's keys different from B.
    var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
    for (var i = 0; i < keysA.length; i++) {
        if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
            return false;
        }
    }

    return true;
}

module.exports = shallowEqual;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
//clone from https://github.com/sindresorhus/camelcase



module.exports = function () {
    var str = [].map.call(arguments, function (str) {
        return str.trim();
    }).filter(function (str) {
        return str.length;
    }).join('-');

    if (!str.length) {
        return '';
    }

    if (str.length === 1 || !/[_.\- ]+/.test(str)) {
        if (str[0] === str[0].toLowerCase() && str.slice(1) !== str.slice(1).toLowerCase()) {
            return str;
        }

        return str.toLowerCase();
    }

    return str.replace(/^[_.\- ]+/, '').toLowerCase().replace(/[_.\- ]+(\w|$)/g, function (m, p1) {
        return p1.toUpperCase();
    });
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * 将驼峰式写法字符串转换成“-”连接的
 *
 * @memberOf string
 *
 * @return {String} 返回转换后的字符串
 */


function fromCamelCase(string, join) {
    return string.replace(/[A-Z]/g, function (match) {
        return join + match.charAt(0).toLowerCase();
    });
}

module.exports = fromCamelCase;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (str) {
    var isExtendedLengthPath = /^\\\\\?\\/.test(str);
    var hasNonAscii = /[^\x00-\x80]+/.test(str);

    if (isExtendedLengthPath || hasNonAscii) {
        return str;
    }

    return str.replace(/\\/g, '/');
};

//
//
// # slash [![Build Status](https://travis-ci.org/sindresorhus/slash.svg?branch=master)](https://travis-ci.org/sindresorhus/slash)
//
// > Convert Windows backslash paths to slash paths: `foo\\bar` ➔ `foo/bar`
//
//     [Forward-slash paths can be used in Windows](http://superuser.com/a/176395/6877) as long as they're not extended-length paths and don't contain any non-ascii characters.
//
// This was created since the `path` methods in Node outputs `\\` paths on Windows.
//
//
// ## Install
//
//     ```sh
// $ npm install --save slash
// ```
//
//
// ## Usage
//
//     ```js
// var path = require('path');
// var slash = require('slash');
//
// var str = path.join('foo', 'bar');
// // Unix    => foo/bar
// // Windows => foo\\bar
//
// slash(str);
// // Unix    => foo/bar
// // Windows => foo/bar
// ```
//
//
// ## API
//
// ### slash(path)
//
// Type: `string`
//
// Accepts a Windows backslash path and returns a slash path.
//
//
// ## License
//
// MIT © [Sindre Sorhus](http://sindresorhus.com)

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
//首字母大写


function upFirstChar(str) {
    return str.replace(/(^|\s+)\w/g, function (s) {
        return s.toUpperCase();
    });
}

module.exports = upFirstChar;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var AjaxUtils = __webpack_require__(4);
var ArrayUtils = __webpack_require__(5);
var CookieUtils = __webpack_require__(6);
var EventBus = __webpack_require__(7);
var formatDate = __webpack_require__(15);
var formatDatePretty = __webpack_require__(16);
var formatNumber = __webpack_require__(17);
var getDeepValue = __webpack_require__(18);
var getRandomNum = __webpack_require__(20);
var getMediaWidthHeight = __webpack_require__(19);
var JSXRenderUtils = __webpack_require__(8);
var loadPromiseShim = __webpack_require__(21);
var loadStaticUtils = __webpack_require__(3);
var miniUnderscore = __webpack_require__(0);
var onDomReady = __webpack_require__(22);
var shallowEqual = __webpack_require__(23);
var URLUtils = __webpack_require__(14);
var StringUtils = __webpack_require__(11);
var TaskQueueRunner = __webpack_require__(12);
var TimeUtils = __webpack_require__(13);
var ServiceUtils = __webpack_require__(10);
var ModuleUtils = __webpack_require__(9);
var PromiseUtils = __webpack_require__(2);

var exportObject = {};
function mixin(exportObj) {
    miniUnderscore.assignObject(exportObject, exportObj);
}

mixin(AjaxUtils);
mixin(ArrayUtils);
mixin(URLUtils);
mixin(JSXRenderUtils);
mixin(StringUtils);
mixin(loadStaticUtils);
mixin(miniUnderscore);
mixin(TimeUtils);
mixin(ServiceUtils);
mixin(ModuleUtils);
mixin(PromiseUtils);

mixin({
    EventBus: EventBus,
    CookieUtils: CookieUtils,
    formatDate: formatDate,
    formatDatePretty: formatDatePretty,
    formatNumber: formatNumber,
    getDeepValue: getDeepValue,
    getRandomNum: getRandomNum,
    getMediaWidthHeight: getMediaWidthHeight,
    loadPromiseShim: loadPromiseShim,
    onDomReady: onDomReady,
    shallowEqual: shallowEqual,
    TaskQueueRunner: TaskQueueRunner,
    mixin: mixin
});

module.exports = exportObject;

/***/ })
/******/ ]);
});