var AjaxUtils = require('./AjaxUtils');
var ArrayUtils = require('./ArrayUtils');
var CookieUtils = require('./CookieUtils');
var EventBus = require('./EventBus');
var formatDate = require('./formatDate');
var formatDatePretty = require('./formatDatePretty');
var formatNumber = require('./formatNumber');
var formatTimeLeft = require('./formatTimeLeft');
var getDeepValue = require('./getDeepValue');
var getRandomNum = require('./getRandomNum');
var getMediaWidthHeight = require('./getMediaWidthHeight');
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
var PromiseUtils = require("./PromiseUtils");
var MessageUtils = require("./MessageUtils");


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
mixin(PromiseUtils);
mixin(MessageUtils);


mixin({
    EventBus: EventBus,
    CookieUtils: CookieUtils,
    formatDate: formatDate,
    formatDatePretty: formatDatePretty,
    formatNumber: formatNumber,
    formatTimeLeft:formatTimeLeft,
    getDeepValue: getDeepValue,
    getRandomNum: getRandomNum,
    getMediaWidthHeight: getMediaWidthHeight,
    loadPromiseShim: loadPromiseShim,
    onDomReady: onDomReady,
    shallowEqual: shallowEqual,
    TaskQueueRunner: TaskQueueRunner,
    mixin: mixin
});


module.exports = exportObject;
