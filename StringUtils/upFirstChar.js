//首字母大写
function upFirstChar(str) {
    return str.replace(/(^|\s+)\w/g, function (s) {
        return s.toUpperCase();
    });
}


module.exports = upFirstChar;