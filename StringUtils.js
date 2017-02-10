function trim(str) {
    return str.replace(/^\s*|\s*$/g, '');
}

function trimLeft(str) {
    return str.replace(/^\s*/, '');
}

function trimRight(str) {
    return str.replace(/\s*$/, '');
}

//首字母大写
function upFirstChar(str) {
    return str.replace(/(^|\s+)\w/g, function (s) {
        return s.toUpperCase();
    });
}

function startWith(str, prefix) {
    str = "" + str;
    return str.indexOf(prefix) === 0;
}

module.exports = {
    trim: trim,
    trimLeft: trimLeft,
    trimRight: trimRight,
    upFirstChar: upFirstChar
};