var camelCase = require('./camelCase');
var deCamelCase = require('./deCamelCase');
var slash = require('./slash');
var upFirstChar = require('./upFirstChar');

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

//AjaxUtils['$$EM$$'] = true;
module.exports = {
    trim: trim,
    trimLeft: trimLeft,
    trimRight: trimRight,
    startWith: startWith,

    camelCase: camelCase,
    deCamelCase: deCamelCase,
    slash: slash,
    upFirstChar: upFirstChar
};