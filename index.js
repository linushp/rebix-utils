var AjaxUtils = require('./AjaxUtils');
var ArrayUtils = require('./ArrayUtils');
var CookieUtils = require('./CookieUtils');
var EventBus = require('./EventBus');
var formatDate = require('./formatDate');
var formatDatePretty = require('./formatDatePretty');
var formatNumber = require('./formatNumber');
var getDeepValue = require('./getDeepValue');
var getRandomNum = require('./getRandomNum');
var isPromise = require('./isPromise');
var JSXRenderUtils = require('./JSXRenderUtils');
var loadPromiseShim = require('./loadPromiseShim');
var loadStaticUtils = require('./loadStaticUtils');
var miniUnderscore = require('./miniUnderscore');
var onDomReady = require('./onDomReady');
var shallowEqual = require('./shallowEqual');
var URLUtils = require('./URLUtils');
var StringUtils = require('./StringUtils/StringUtils');
var TimeUtils = require('./TimeUtils');


var exportObject = {};
function mergeExport(exportObj) {
    miniUnderscore.assignObject(exportObject, exportObj);
}

mergeExport(AjaxUtils);
mergeExport(ArrayUtils);
mergeExport(URLUtils);
mergeExport(JSXRenderUtils);
mergeExport(StringUtils);
mergeExport(loadStaticUtils);
mergeExport(miniUnderscore);
mergeExport(TimeUtils);

mergeExport({
    EventBus: EventBus,
    CookieUtils: CookieUtils,
    formatDate: formatDate,
    formatDatePretty: formatDatePretty,
    formatNumber: formatNumber,
    getDeepValue: getDeepValue,
    getRandomNum: getRandomNum,
    isPromise: isPromise,
    loadPromiseShim: loadPromiseShim,
    onDomReady: onDomReady,
    shallowEqual: shallowEqual
});


module.exports = exportObject;
