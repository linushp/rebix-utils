var exportObject = require('./index');
var ImmutableUtils = require('./addon_immutable/ImmutableUtils');
var CompareBeforeUtils = require('./addon_functions/CompareBeforeUtils');
var compileTemplate = require('./addon_functions/compileTemplate');

var mixin = exportObject['mixin'];
mixin(ImmutableUtils);
mixin(CompareBeforeUtils);


exportObject['compileTemplate']= compileTemplate;

module.exports = exportObject;