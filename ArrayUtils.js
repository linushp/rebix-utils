export function toArray(aaa) {
    if (!aaa) {
        return [];
    }

    var argsArray = Array.prototype.slice.call(aaa);
    var args = [].concat(argsArray);
    return args;
}