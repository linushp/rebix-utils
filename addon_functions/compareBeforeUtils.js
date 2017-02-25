var shallowEqual = require('../shallowEqual');

var CONST_STORAGE = {};

function getStorage(groupName) {
    var s = CONST_STORAGE[groupName];
    if (!s) {
        s = {};
        CONST_STORAGE[groupName] = s;
    }
    return s;
}


function isCompareBefore(groupName, keyName, obj, compareFunc) {
    var storage = getStorage(groupName);
    var key = '' + obj[keyName];
    var beforeObject = storage[key];
    if (compareFunc(beforeObject, obj)) {
        storage[key] = obj;
        return true;//有不同
    }
    return false;
}

function isDifferentBefore(groupName, keyName, obj) {
    return isCompareBefore(groupName, keyName, obj, function (beforeObject, obj) {
        return !beforeObject || !shallowEqual(beforeObject, obj);
    });
}

module.exports = {
    isCompareBefore: isCompareBefore,
    isDifferentBefore: isDifferentBefore
};