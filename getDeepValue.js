var miniUnderscore = require('./miniUnderscore');
var warning = require('./warning');

var _undefined = undefined;
var isFunction = miniUnderscore.isFunction;


function getValueByKey(obj, key) {
    if (!obj) {
        return _undefined;
    }
    var value = _undefined;
    if (isFunction(obj.get)) {
        value = obj.get(key);
    }
    if (value === _undefined) {
        value = obj[key];
    }

    return value;
}


/**
 * a = {
 *   b:{
 *      c:{
 *          d:1
 *      }
 *   }
 * }
 *
 * str : b.c.d
 * @param obj
 * @param str
 * @demo :
 *  var d = getObjectValue(a,'b.c.d');
 */
function getValueInPath(obj, str) {
    if (!obj) {
        return _undefined;
    }
    try {
        var propArr = str.split(".");
        var tmpObj = obj;
        var i = 0;
        while (i < propArr.length) {
            if (!tmpObj) {
                return tmpObj;
            }
            var prop = propArr[i];
            tmpObj = getValueByKey(tmpObj, prop);
            i++;
        }
        return tmpObj;
    } catch (e) {
        warning('[ERROR]', e);
    }

    return _undefined;
}


module.exports = getValueInPath;