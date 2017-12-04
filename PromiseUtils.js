function isPromise(p) {
    return p && (typeof p.then === 'function') && (typeof p.catch === 'function');
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
    if (cachePromise && (date_now - cachePromise['time'] < 1000 * cacheSecond)) {
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