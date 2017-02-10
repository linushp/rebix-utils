
var loadStaticUtils = require('./loadStaticUtils');
var loadStaticJS = loadStaticUtils['loadStaticJS'];

function loadShimES6Promise(callback){
    if(!window.Promise){
        //view-source:https://ant.design/
        loadStaticJS('https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js',callback);
    }
}

module.exports = loadShimES6Promise;