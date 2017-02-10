


/**
 // ("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 // ("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 **/
function formatDate(date, fmt) {
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


/**
 * 让日期和时间按照指定的格式显示的方法
 * @param date
 * @param formatString  format 格式字符串
 * @returns {*}  返回生成的日期时间字符串
 *
 * @example
 *     var d = new Date();
 *     // 以 YYYY-MM-dd hh:mm:ss 格式输出 d 的时间字符串
 *     J.format.date(d, "YYYY-MM-DD hh:mm:ss");
 */
var formatDate = function (date, formatString) {
    /*
     * eg:formatString="YYYY-MM-DD hh:mm:ss";
     */
    var o = {
        "M+": date.getMonth() + 1,    //month
        "D+": date.getDate(),    //day
        "h+": date.getHours(),    //hour
        "m+": date.getMinutes(),    //minute
        "s+": date.getSeconds(),    //second
        "q+": Math.floor((date.getMonth() + 3) / 3),    //quarter
        "S": date.getMilliseconds()    //millisecond
    };

    if (/(Y+)/.test(formatString)) {
        formatString = formatString.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(formatString)) {
            formatString = formatString.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return formatString;
};


module.exports = formatDate;