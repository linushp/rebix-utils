

/**
 * 解析URL
 * @param str
 * @returns {fragment,host,pass,path,port,query,scheme,user}
 */
function parseURL(str){
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

module.exports = parseURL;