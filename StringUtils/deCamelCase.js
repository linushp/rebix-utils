/**
 * 将驼峰式写法字符串转换成“-”连接的
 *
 * @memberOf string
 *
 * @return {String} 返回转换后的字符串
 */
function fromCamelCase(string, join) {
    return string.replace(/[A-Z]/g, function (match) {
        return (join + match.charAt(0).toLowerCase());
    });
}


module.exports = fromCamelCase;