var immutableLib = require('./immutableLib');
var pushOrUpdateList = require('./pushOrUpdateList');
var isImmutable = require('./isImmutable');


module.exports = {
    setImmutableLib: immutableLib.setImmutableLib,
    getImmutableLib: immutableLib.getImmutableLib,
    pushOrUpdateList: pushOrUpdateList,
    isImmutable: isImmutable
};