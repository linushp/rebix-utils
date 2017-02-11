var domainPrefix = window.location.host;

var CookieUtils = {

    /**
     * 设置一个cookie
     *
     * @param {String} name cookie名称
     * @param {String} value cookie值
     * @param {String} domain 所在域名
     * @param {String} path 所在路径
     * @param {Number} hour 存活时间，单位:小时
     * @return {Boolean} 是否成功
     */
    set: function (name, value, domain, path, hour) {
        if (hour) {
            var today = new Date();
            var expire = new Date();
            expire.setTime(today.getTime() + 3600000 * hour);
        }
        window.document.cookie = name + "=" + value + "; " + (hour ? ("expires=" + expire.toGMTString() + "; ") : "") + (path ? ("path=" + path + "; ") : "path=/; ") + (domain ? ("domain=" + domain + ";") : ("domain=" + domainPrefix + ";"));
        return true;
    },

    /**
     * 获取指定名称的cookie值
     *
     * @param {String} name cookie名称
     * @return {String} 获取到的cookie值
     */
    get: function (name) {
        var r = new RegExp("(?:^|;+|\\s+)" + name + "=([^;]*)");
        // var r = new RegExp("(?:^|;+|\\s+)" + name + "=([^;]*?)(?:;|$)");
        var m = window.document.cookie.match(r);
        return (!m ? "" : m[1]);
        // document.cookie.match(new
        // RegExp("(?:^|;+|\\s+)speedMode=([^;]*?)(?:;|$)"))
    },

    /**
     * 删除指定cookie,复写为过期
     *
     * @param {String} name cookie名称
     * @param {String} domain 所在域
     * @param {String} path 所在路径
     */
    remove: function (name, domain, path) {
        window.document.cookie = name + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; " + (path ? ("path=" + path + "; ") : "path=/; ") + (domain ? ("domain=" + domain + ";") : ("domain=" + domainPrefix + ";"));
    }
};


module.exports = CookieUtils;