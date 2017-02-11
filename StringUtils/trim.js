function trim(str) {
    return str.replace(/^\s*|\s*$/g, '');
}

function trimLeft(str) {
    return str.replace(/^\s*/, '');
}

function trimRight(str) {
    return str.replace(/\s*$/, '');
}


function startWith(str, prefix) {
    str = "" + str;
    return str.indexOf(prefix) === 0;
}


module.exports = {
    trim: trim,
    trimLeft: trimLeft,
    trimRight: trimRight,
    startWith: startWith
};