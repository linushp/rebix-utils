var miniUnderscore = require('./miniUnderscore');
var StringTrims = require('./StringUtils/trim');

var trim = StringTrims.trim;
var forEach = miniUnderscore.each;
var isArray = miniUnderscore.isArray;

module.exports = function (headers) {
    if (!headers)
        return {};

    var result = {};

    forEach(
        trim(headers).split('\n')
        , function (row) {
            var index = row.indexOf(':')
                , key = trim(row.slice(0, index)).toLowerCase()
                , value = trim(row.slice(index + 1));

            if (typeof(result[key]) === 'undefined') {
                result[key] = value
            } else if (isArray(result[key])) {
                result[key].push(value)
            } else {
                result[key] = [result[key], value]
            }
        }
    );

    return result
};