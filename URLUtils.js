var miniUnderscore = require('./miniUnderscore');
var warning = require('./warning');

/**
 * 解析URL
 * @param str
 * @returns {fragment,host,pass,path,port,query,scheme,user}
 */
function parseURL(str) {
    var parseURL = {};
    parseURL.SPEC = ['scheme', 'user', 'pass', 'host', 'port', 'path', 'query', 'fragment'];
    parseURL.RE = /^([^:]+):\/\/(?:([^:@]+):?([^@]*)@)?(?:([^/?#:]+):?(\d*))([^?#]*)(?:\?([^#]+))?(?:#(.+))?$/;
    var ret;
    if (null !== (ret = parseURL.RE.exec(str))) {
        var specObj = {};
        for (var i = 0, j = parseURL.SPEC.length; i < j; i++) {
            var curSpec = parseURL.SPEC[i];
            specObj[curSpec] = ret[i + 1];
        }
        ret = specObj;
        specObj = null;
    }
    return ret;
}


/**
 * 将 uri 的查询字符串参数映射成对象
 *
 * @method mapQuery
 * @memberOf string
 *
 * @param {String} uri 要映射的 uri
 * @return {Object} 按照 uri 映射成的对象
 *
 * @example
 *  var url = "http://tms.qihang.com/?hello=4765078&style=blue";
 *  // queryObj 则得到一个{hello:"4765078", style:"blue"}的对象。
 *  var queryObj = mapQuery(url);
 * };
 */
function mapQuery(uri) {
    //window.location.search
    uri = uri && uri.split('#')[0] || window.location.search; //remove hash
    var i,
        key,
        value,
        index = uri.indexOf("?"),
        pieces = uri.substring(index + 1).split("&"),
        params = {};
    if (index === -1) {//如果连?号都没有,直接返回,不再进行处理.
        return params;
    }
    for (i = 0; i < pieces.length; i++) {
        try {
            index = pieces[i].indexOf("=");
            key = pieces[i].substring(0, index);
            value = pieces[i].substring(index + 1);
            if (!(params[key] = (value))) {
                throw new Error("uri has wrong query string when run mapQuery.");
            }
        }
        catch (e) {
            warning("错误：[" + e.name + "] " + e.message + ", " + e.fileName + ", 行号:" + e.lineNumber + "; stack:" + typeof e.stack, 2);
        }
    }
    return params;
}


/**
 * 获取查询字符串
 * @param paramName
 * @param uri 可选参数
 * @returns {*}
 */
function getQueryParam(paramName, uri) {
    var queryMap = mapQuery(uri);
    return queryMap[paramName];
}


function toQueryString(obj) {
    var mm = miniUnderscore.map(obj, function (v, k) {
        return '' + k + '=' + encodeURIComponent(v);//`${k}=${v}`;
    });
    return mm.join('&');
}

 function toQueryString2(queries) {
        var arr = [];
        for (var k in queries) {
            if (queries.hasOwnProperty(k)) {
                var v = queries[k];
                arr.push(k + "=" + v);
            }
        }
        return arr.join('&');
    }

 function toQueryString3(queries) {
        var arr = [];
        for (var k in queries) {
            if (queries.hasOwnProperty(k)) {
                var v = queries[k];
                arr.push(k + "=" + encodeURIComponent(v));
            }
        }
        return arr.join('&');
    }

module.exports = {
    parseURL: parseURL,
    getQueryParam: getQueryParam,
    mapQuery: mapQuery,
    toQueryString: toQueryString
};
