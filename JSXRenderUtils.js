var mini_ = require('./mini_');
var assignObject = mini_.assignObject;

var hasOwn = {}.hasOwnProperty;

function classNames() {
    var classes = [];
    for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        if (!arg) continue;

        var argType = typeof arg;

        if (argType === 'string' || argType === 'number') {
            classes.push(arg);
        } else if (Array.isArray(arg)) {
            classes.push(classNames.apply(null, arg));
        } else if (argType === 'object') {
            for (var key in arg) {
                if (hasOwn.call(arg, key) && arg[key]) {
                    classes.push(key);
                }
            }
        }
    }
    return classes.join(' ');
}


function showStyle(isShow, style) {
    style = style || {};
    return assignObject({display: isShow ? 'block' : 'none'}, style);
}


function hideStyle(isHide, style) {
    style = style || {};
    if (isHide) {
        style['display'] = "none";
    }
    return style;
}


module.exports = {
    formatDate: formatDate,
    getTimeDateBegin: getTimeDateBegin
};
