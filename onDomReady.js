function onDomReady(callback) {

    var document = window.document;

    var callbackCalled = false;

    function DOMContentLoaded() {
        //保证只会被调用一次
        if (!callbackCalled) {
            window.setTimeout(function () {
                callback();
            }, 2);
            callbackCalled = true;
        }
    }

    if (document.readyState === "complete") {
        DOMContentLoaded();
        return;
    }

    // Mozilla, Opera and webkit nightlies currently support this event
    if (document.addEventListener) {
        // Use the handy event callback
        document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);

        // A fallback to window.onload, that will always work
        window.addEventListener("load", DOMContentLoaded, false);

        // If IE event model is used
    } else if (document.attachEvent) {
        // ensure firing before onload,
        // maybe late but safe also for iframes
        document.attachEvent("onreadystatechange", DOMContentLoaded);

        // A fallback to window.onload, that will always work
        window.attachEvent("onload", DOMContentLoaded);
    } else {
        DOMContentLoaded();
    }
}

module.exports = onDomReady;
