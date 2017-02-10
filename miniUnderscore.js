
var miniUnderscore = {};

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

miniUnderscore.isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
};

// Delegates to ECMA5's native Array.isArray
miniUnderscore.isArray = nativeIsArray || function(obj) {
        return toString.call(obj) === '[object Array]';
    };

// Is a given variable an object?
miniUnderscore.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
};

miniUnderscore.each = miniUnderscore.forEach = function(obj, iteratee) {
    var i, length;
    if (miniUnderscore.isArrayLike(obj)) {
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
miniUnderscore.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
    miniUnderscore['is' + name] = function(obj) {
        return toString.call(obj) === '[object ' + name + ']';
    };
});

// An internal function for creating assigner functions.
var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
        var length = arguments.length;
        if (length < 2 || obj == null) return obj;
        for (var index = 1; index < length; index++) {
            var source = arguments[index],
                keys = keysFunc(source),
                l = keys.length;
            for (var i = 0; i < l; i++) {
                var key = keys[i];
                if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
            }
        }
        return obj;
    };
};

miniUnderscore.assignObject = miniUnderscore.extend = createAssigner(nativeKeys,false);

module.exports = miniUnderscore;