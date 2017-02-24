var immutableLib = require('./immutableLib');

/**
 * 合并两个List , 如果已经里面的元素已经存在则合并元素,如果里面的元素不存在则直接追加元素
 * @param immutableOldList 一定是一个Immutable对象
 * @param addList  Immutable或者普通的js数组,都可以.
 * @param keyName 字符串,用来比较对象值
 * @param mergeFunction
 * @param createFunction
 * @returns {*}
 */
function pushOrUpdateList(immutableOldList, addList, keyName, mergeFunction, createFunction) {
    var immutable = immutableLib.getImmutableLib();

    var pushList = immutable.fromJS([]);
    var newList = immutableOldList;

    //1. merge
    forEach(addList || [], function (addObject) {
        var value = addObject[keyName];
        var oldObjectIndex = immutableOldList.findIndex(function (oldObj) {
            var oldValue = oldObj[keyName];
            return oldValue === value;
        });
        if (oldObjectIndex >= 0) {
            var oldObject = immutableOldList.get(oldObjectIndex);
            newList = newList.set(oldObjectIndex, mergeFunction(oldObject, addObject));
        } else {
            pushList = pushList.push(createFunction(addObject));
        }
    });

    //2.push
    newList = newList.concat(pushList);


    return newList;
}


module.exports = pushOrUpdateList;
