var miniUnderscore = require('../miniUnderscore');

function isImmutable(obj) {
    var isFunction = miniUnderscore['isFunction'];
    return obj && isFunction(obj.set) && isFunction(obj.get);
}

module.exports = isImmutable;