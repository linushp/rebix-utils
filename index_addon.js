var exportObject = require('./index');
var ImmutableUtils = require('./addon_ImmutableUtils/ImmutableUtils');
var differentBefore = require('./addon_functions/differentBefore');

var mixin = exportObject['mixin'];
mixin(ImmutableUtils);
mixin({
    differentBefore:differentBefore
});

module.exports = exportObject;