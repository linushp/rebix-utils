var AjaxUtils = require('./AjaxUtils');
var ArrayUtils = require('./ArrayUtils');
var CookieUtils = require('./CookieUtils');
var EventBus = require('./EventBus');
var formatDate = require('./formatDate');
var formatDatePretty = require('./formatDatePretty');
var formatNumber = require('./formatNumber');
var getDeepValue = require('./getDeepValue');
var getRandomNum = require('./getRandomNum');
var getMediaWidthHeight = require('./getMediaWidthHeight');
var isPromise = require('./isPromise');
var JSXRenderUtils = require('./JSXRenderUtils');
var loadPromiseShim = require('./loadPromiseShim');
var loadStaticUtils = require('./loadStaticUtils');
var miniUnderscore = require('./miniUnderscore');
var onDomReady = require('./onDomReady');
var shallowEqual = require('./shallowEqual');
var URLUtils = require('./URLUtils');
var StringUtils = require('./StringUtils/StringUtils');
var TaskQueueRunner = require('./TaskQueueRunner');
var TimeUtils = require('./TimeUtils');
var ServiceUtils = require('./ServiceUtils');
var ModuleUtils = require('./ModuleUtils');


var exportObject = {};
function mixin(exportObj) {
    miniUnderscore.assignObject(exportObject, exportObj);
}

mixin(AjaxUtils);
mixin(ArrayUtils);
mixin(URLUtils);
mixin(JSXRenderUtils);
mixin(StringUtils);
mixin(loadStaticUtils);
mixin(miniUnderscore);
mixin(TimeUtils);
mixin(ServiceUtils);
mixin(ModuleUtils);

mixin({
    EventBus: EventBus,
    CookieUtils: CookieUtils,
    formatDate: formatDate,
    formatDatePretty: formatDatePretty,
    formatNumber: formatNumber,
    getDeepValue: getDeepValue,
    getRandomNum: getRandomNum,
    getMediaWidthHeight: getMediaWidthHeight,
    isPromise: isPromise,
    loadPromiseShim: loadPromiseShim,
    onDomReady: onDomReady,
    shallowEqual: shallowEqual,
    TaskQueueRunner: TaskQueueRunner,
    mixin: mixin
});


module.exports = exportObject;
