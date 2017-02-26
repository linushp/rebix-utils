const _services = {
    'common': {}
};


/**
 * demo :
 * 1. setService("app1")("UserUtils",{})
 * 2. setService()("UserUtils",{})
 *
 * @param module
 * @returns {Function}
 */
function setService(module) {
    return function (key, value) {
        getServices(module)[key] = value;
    };
}


/**
 * demo:
 * 1.getService("app1")("UserUtils");
 * 1.getService()("UserUtils");
 *
 * @param module
 * @returns {Function}
 */
function getService(module) {
    return function (key) {
        return getServices(module)[key];
    };
}

/**
 * demo:
 * 1.getServices("app1");
 * 2.getServices();
 * @param module
 * @returns {*}
 */
function getServices(module) {
    module = module || "common";
    _services[module] = _services[module] || {};
    return _services[module];
}


function getAllServices() {
    return _services;
}

module.exports = {
    setService: setService,
    getService: getService,
    getServices: getServices,
    getAllServices: getAllServices
};