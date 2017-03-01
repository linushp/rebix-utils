var _services_container = {
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
    _services_container[module] = _services_container[module] || {};
    return _services_container[module];
}


/**
 *
 * @param p1 [可省略] module
 * @param p2 services
 */
function setServices(p1, p2) {
    var module, services;
    if (!p2) {
        module = 'common';
        services = p1;
    } else {
        module = p1;
        services = p2;
    }

    var oldServices = getServices(module);
    for (var serviceName in services) {
        if (services.hasOwnProperty(serviceName)) {
            var serviceObj = services[serviceName];
            oldServices[serviceName] = serviceObj;
        }
    }
}


function getAllServices() {
    return _services_container;
}

module.exports = {

    setService: setService,
    getService: getService,

    getServices: getServices,
    setServices: setServices,

    getAllServices: getAllServices

};