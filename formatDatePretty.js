var miniUnderscore = require('./miniUnderscore');

/**
 *
 * @param timeStr 2016-01-02 或 2016/01/02 或 Date对象
 * @param nowTime0
 * @returns {*}
 */
function formatDatePretty(timeStr, nowTime0) {

    try {

        var floor = Math.floor;
        var minute = 60000;
        var hour = 3600000;
        var day = 86400000;
        var month = 2678400000;
        var year = 32140800000;


        var d1 = timeStr;
        if (miniUnderscore.isString(timeStr)) {
            timeStr = timeStr.replace(/-/gm, '/');
            d1 = new Date(timeStr);
        } else if (miniUnderscore.isNumber(timeStr)) {
            d1 = new Date(timeStr);
        }

        var d2 = nowTime0 ? new Date(nowTime0) : new Date();
        var t1 = d1.getTime();
        var t2 = d2.getTime();
        var diff = t2 - t1;
        //console.log(timeStr,d1,d2,t1,t2,diff);

        var r = 0;
        if (diff > year) {
            r = diff / year;
            return floor(r) + "年前";
        }
        if (diff > month) {
            r = diff / month;
            return floor(r) + "个月前";
        }
        if (diff > day) {
            r = diff / day;
            return floor(r) + "天前";
        }
        if (diff > hour) {
            r = diff / hour;
            return floor(r) + "个小时前";
        }
        if (diff > minute) {
            r = diff / minute;
            return floor(r) + "分钟前";
        }
        return "刚刚";

    } catch (e) {
        return timeStr;
    }

}


module.exports = formatDatePretty;