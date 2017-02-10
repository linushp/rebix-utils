
var exportsObject = {};

var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

var property = function(key) {
    return function(obj) {
        return obj == null ? void 0 : obj[key];
    };
};

var getLength          = property('length');
var toString           = Object.prototype.toString;
var nativeIsArray      = Array.isArray;
var nativeKeys         = Object.keys;

exportsObject.isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
};

// Delegates to ECMA5's native Array.isArray
exportsObject.isArray = nativeIsArray || function(obj) {
        return toString.call(obj) === '[object Array]';
    };

// Is a given variable an object?
exportsObject.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
};

exportsObject.each = exportsObject.forEach = function(obj, iteratee) {
    var i, length;
    if (exportsObject.isArrayLike(obj)) {
        for (i = 0, length = obj.length; i < length; i++) {
            iteratee(obj[i], i, obj);
        }
    } else {
        var keys = nativeKeys(obj);
        for (i = 0, length = keys.length; i < length; i++) {
            iteratee(obj[keys[i]], keys[i], obj);
        }
    }
    return obj;
};

// Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
exportsObject.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
    exportsObject['is' + name] = function(obj) {
        return toString.call(obj) === '[object ' + name + ']';
    };
});

module.exports = exportsObject;