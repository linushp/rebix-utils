var exportObject = require('./index');
var ImmutableUtils = require('./addon_immutable/ImmutableUtils');
var CompareBeforeUtils = require('./addon_functions/CompareBeforeUtils');

var mixin = exportObject['mixin'];
mixin(ImmutableUtils);
mixin(CompareBeforeUtils);

module.exports = exportObject;