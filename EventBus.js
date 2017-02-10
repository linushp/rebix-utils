var PRIVATE_LISTENERS_NAME = "$$listeners$$";
var PRIVATE_LISTENER_WRAPPER = 'listenerWrapper';


function EventBusClass(name, listenerWrapper) {
    var that = this;
    that.name = name;
    that[PRIVATE_LISTENER_WRAPPER] = listenerWrapper;
    that[PRIVATE_LISTENERS_NAME] = [];
}

var EventBusClassPrototype = EventBusClass.prototype;

EventBusClassPrototype.on = function (eventName, listener) {
    this[PRIVATE_LISTENERS_NAME].push({
        eventName: eventName,
        listener: listener
    });
};


EventBusClassPrototype.off = function (eventName, listener) {
    var that = this;
    var listeners = that[PRIVATE_LISTENERS_NAME];
    var result = [];
    for (var i = 0; i < listeners.length; i++) {
        var m = listeners[i];
        if (m.eventName === eventName && m.listener === listener) {
            //skip
        } else {
            result.push(m);
        }
    }
    that[PRIVATE_LISTENERS_NAME] = result;
};


EventBusClassPrototype.emit = function (eventName, m1, m2, m3, m4, m5) {
    var that = this;
    var listeners = that[PRIVATE_LISTENERS_NAME];
    var listenerWrapper = that[PRIVATE_LISTENER_WRAPPER];

    for (var i = 0; i < listeners.length; i++) {
        var m = listeners[i];
        if (m.eventName === eventName && m.listener) {
            if (listenerWrapper) {
                listenerWrapper(m.listener, m1, m2, m3, m4, m5);
            } else {
                m.listener(m1, m2, m3, m4, m5);
            }
        }
    }
};


module.exports = EventBusClass;