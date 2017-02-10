function trim(str) {
    return str.replace(/^\s*|\s*$/g, '');
}

function trimLeft(str) {
    return str.replace(/^\s*/, '');
}

function trimRight(str) {
    return str.replace(/\s*$/, '');
}


module.exports = {
    trim: trim,
    trimLeft: trimLeft,
    trimRight: trimRight
};