var miniUnderscore = {};

var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

var property = function (key) {
    return function (obj) {
        return obj == null ? void 0 : obj[key];
    };
};

var getLength = property('length');
var prototypeToString = Object.prototype.toString;
var nativeIsArray = Array.isArray;
var nativeKeys = Object.keys;

var isArrayLike = miniUnderscore.isArrayLike = function (collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
};

// Delegates to ECMA5's native Array.isArray
var isArray = miniUnderscore.isArray = nativeIsArray || function (obj) {
        return prototypeToString.call(obj) === '[object Array]';
    };

// Is a given variable an object?
miniUnderscore.isObject = function (obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
};

var forEach = miniUnderscore.each = miniUnderscore.forEach = function (obj, iteratee) {
    if(!obj){
        return obj;
    }

    //如果参数本身就支持forEach直接用. immutableList和高级浏览器原生array支持.
    if(miniUnderscore.isFunction(obj.forEach)){
        obj.forEach(iteratee);
    }else {

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

miniUnderscore.map = function (arrOrObj, iteratee ,isIgnoreEmpty) {
    var result = [];
    forEach(arrOrObj, function (value, key) {
        var m = iteratee(value, key);
        if(isIgnoreEmpty){//默认false
            if(!miniUnderscore.isEmpty(m)){
                result.push(m);
            }
        }else {
            result.push(m);
        }
    });
    return result;
};

// Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError ,'isArrayBuffer'
miniUnderscore.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error' ,'ArrayBuffer'], function (name) {
    miniUnderscore['is' + name] = function (obj) {
        return prototypeToString.call(obj) === '[object ' + name + ']';
    };
});

// An internal function for creating assigner functions.
var createAssigner = function (keysFunc, undefinedOnly) {
    return function (obj) {
        var length = arguments.length;
        if (length < 2 || obj == null) return obj;
        for (var index = 1; index < length; index++) {
            var source = arguments[index],
                keys = keysFunc(source),
                l = keys.length;
            for (var i = 0; i < l; i++) {
                var key = keys[i];
                if (!undefinedOnly || obj[key] === void 0){
                    obj[key] = source[key];
                }
            }
        }
        return obj;
    };
};

miniUnderscore.defaults = createAssigner(nativeKeys, true);
miniUnderscore.assignObject = miniUnderscore.extend = miniUnderscore.assign = createAssigner(nativeKeys, false);


miniUnderscore.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (isArray(obj) || miniUnderscore.isString(obj) || miniUnderscore.isArguments(obj))) return obj.length === 0;
    return nativeKeys(obj).length === 0;
};


miniUnderscore.isObjectLike = function(value) {
    return !!value && typeof value == 'object';
};


var _uniqueId = 0;
miniUnderscore.uniqueId = function (prefix) {
    prefix = prefix || "";
    return '' + prefix + (_uniqueId++);
};


miniUnderscore.keys = nativeKeys;
miniUnderscore.noop = function(){};

miniUnderscore.uniq = function (objectArray, keyGetter) {
    keyGetter = keyGetter || function(obj){ return obj; };
    var hash = {};
    var result = [];
    for (var i = 0; i < objectArray.length; i++) {
        var obj = objectArray[i];
        var key = keyGetter(obj);
        if (!hash["$" + key]) {
            result.push(obj);
            hash["$" + key] = true;
        }
    }
    return result;
};

miniUnderscore.uniqBy = function(objectArray,keyName){
    return miniUnderscore.uniq(objectArray,function(obj){
        return obj[keyName];
    })
};

miniUnderscore.pick = function(){
    //TODO
};

miniUnderscore.omit = function(){
    //TODO
};

miniUnderscore.values = function(obj){
    return miniUnderscore.map(obj,function(v){
        return v;
    });
};



module.exports = miniUnderscore;