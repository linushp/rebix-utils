const PRIVATE_LISTENERS_NAME = "$$listeners$$";

function getListeners(eventBusInstance) {
    return eventBusInstance[PRIVATE_LISTENERS_NAME];
}

function setListeners(eventBusInstance, listeners) {
    return eventBusInstance[PRIVATE_LISTENERS_NAME] = listeners;
}


export default class EventBus {

    constructor(name,listenerWrapper) {
        this.name = name;
        this.listenerWrapper = listenerWrapper;
        setListeners(this, []);
    }

    on(eventName, listener) {
        getListeners(this).push({
            eventName: eventName,
            listener: listener
        });
    }

    off(eventName, listener) {
        var listeners = getListeners(this);
        var result = [];
        for (var i = 0; i < listeners.length; i++) {
            var m = listeners[i];
            if (m.eventName === eventName && m.listener === listener) {
                //skip
            } else {
                result.push(m);
            }
        }

        setListeners(this, result);
    }

    emit(eventName, m1, m2, m3, m4, m5) {
        var that = this;
        var listeners = getListeners(that);
        var listenerWrapper = that.listenerWrapper;

        for (var i = 0; i < listeners.length; i++) {
            var m = listeners[i];
            if (m.eventName === eventName && m.listener) {

                if(listenerWrapper){
                    listenerWrapper(m.listener,m1, m2, m3, m4, m5);
                }else {
                    m.listener(m1, m2, m3, m4, m5);
                }

            }
        }
    }

}