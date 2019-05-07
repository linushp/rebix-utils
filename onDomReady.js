var DOMReadyUtil = {

    // Is the DOM ready to be used? Set to true once it occurs.
    isReady: false,

    readyCallbacks: [],

    executeReady: function (fn) {

        if (typeof fn !== "function") {
            return;
        }

        // Prevent errors from freezing future callback execution (gh-1823)
        // Not backwards-compatible as this does not execute sync
        window.setTimeout(function () {
            fn.call(document, DOMReadyUtil);
        });
    },

    onDomReady: function (fn) {

        if (fn) {
            DOMReadyUtil.readyCallbacks.push(fn);
        }

        if (DOMReadyUtil.isReady) {
            while (DOMReadyUtil.readyCallbacks.length) {
                fn = DOMReadyUtil.readyCallbacks.shift();
                DOMReadyUtil.executeReady(fn);
            }
        }

        return this;
    },

    fireDomReady: function () {
        DOMReadyUtil.isReady = true;
        DOMReadyUtil.onDomReady();
    }
};


/**
 * The ready event handler and self cleanup method
 */
function completed() {
    document.removeEventListener("DOMContentLoaded", completed);
    window.removeEventListener("load", completed);
    DOMReadyUtil.fireDomReady();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
if (document.readyState !== "loading") {

    // Handle it asynchronously to allow scripts the opportunity to delay ready
    window.setTimeout(DOMReadyUtil.fireDomReady);

} else {

    // Use the handy event callback
    document.addEventListener("DOMContentLoaded", completed);

    // A fallback to window.onload, that will always work
    window.addEventListener("load", completed);
}


module.exports = DOMReadyUtil.onDomReady;
