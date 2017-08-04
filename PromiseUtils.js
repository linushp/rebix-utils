



const PROMISE_CACHE = {};


/**
 * 将promise缓存起来,可以防止在短时间内发起重复的请求
 * @param promiseId 用于标记一个Promise的Id
 * @param cacheSecond 缓存时间
 * @param createFunction
 * @returns {*}
 */
exports.getCacheOrCreatePromise =  function getCacheOrCreatePromise(promiseId,cacheSecond,createFunction){

    var cachePromise = PROMISE_CACHE[promiseId];
    if (cachePromise && (Date.now() - cachePromise['time'] < 1000 * cacheSecond)) {
        return cachePromise['promise'];
    } else {
        var promise = createFunction();

        PROMISE_CACHE[promiseId] = {
            promise: promise,
            time: Date.now()
        };

        return promise;
    }
};

