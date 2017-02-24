var exportObject = require('./index');
var ImmutableUtils = require('./addon_ImmutableUtils/ImmutableUtils');

var mixin = exportObject['mixin'];

mixin(ImmutableUtils);

module.exports = exportObject;