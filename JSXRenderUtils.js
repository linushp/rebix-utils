

var hasOwn = {}.hasOwnProperty;

export function classNames() {
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



export function showStyle(isShow, style) {
    style = style || {};
    return {
        display: isShow ? 'block' : 'none',
        ...style
    };
}


export function hideStyle(isHide, style) {
    style = style || {};
    if(isHide){
        style['display'] = "none";
    }
    return style;
}


