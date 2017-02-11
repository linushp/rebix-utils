var getElementsByTagName = document.getElementsByTagName;
var createElement = document.createElement;

var loadStaticCache = {};

function loadStaticJS(url, callback) {

    if (loadStaticCache[url]) {
        callback(false);
        return;
    }

    var script = createElement("script");
    script.src = url;
    script.type = 'text/javascript';
    script.language = 'javascript';
    script.onload = script.onreadstatechange = function () {
        callback(true);
        loadStaticCache[url] = true;
    };
    getElementsByTagName("body")[0].appendChild(script);
}


function loadStaticCSS(url, callback) {

    if (loadStaticCache[url]) {
        callback(false);
        return;
    }

    var link = createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = url;
    link.onload = link.onreadstatechange = function () {
        callback(true);
        loadStaticCache[url] = true;
    };
    getElementsByTagName("head")[0].appendChild(link);
}


//保证脚本只会加载一次
var PROMISE_CACHE = {};
function createLoadStaticPromise(loadStatic) {
    return function (url) {

        var promise = PROMISE_CACHE[url];
        if (promise) {
            return promise;
        }

        //需要浏览器支持Promise
        promise = new Promise(function (resolve) {
            loadStatic(url, function (result) {
                resolve(result);
            });
        });

        PROMISE_CACHE[url] = promise;
        return promise;

    }
}


var loadStaticJSPromise = createLoadStaticPromise(loadStaticJS);
var loadStaticCssPromise = createLoadStaticPromise(loadStaticCSS);

module.exports = {
    loadStaticJS: loadStaticJS,
    loadStaticCSS: loadStaticCSS,
    loadStaticJSPromise: loadStaticJSPromise,
    loadStaticCssPromise: loadStaticCssPromise
};