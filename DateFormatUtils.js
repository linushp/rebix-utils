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
 * 获取一天中的开始时间
 * @param date
 * @returns {*}
 */
function getTimeDateBegin(date) {
    if (!date) {
        return null;
    }
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return date.getTime();
}


module.exports = {
    formatDate: formatDate,
    getTimeDateBegin: getTimeDateBegin
};