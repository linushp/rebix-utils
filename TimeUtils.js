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
ServerTimeClassPrototype.updateServerTime = function (serverTimestamp,clientTimestamp) {
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
    M: 2628000000,//1000 * 60 * 60 * 24 * (365 / 12)
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