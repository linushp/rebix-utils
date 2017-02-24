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

module.exports = function differentBefore(groupName, keyName, obj) {
    var storage = getStorage(groupName);
    var key = obj[keyName];
    var beforeObject = storage['' + key];
    if (!beforeObject || !shallowEqual(beforeObject, obj)) {
        storage['' + key] = obj;
        return true;//有不同
    }
    return false;
};