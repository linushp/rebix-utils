var loadedLibMap = {};

var NativePromise = Promise;

// 加载指定url的js库, 不会重复加载
function loadScriptLib(libSrc) {
    if (loadedLibMap[libSrc] != null) {
        return loadedLibMap[libSrc] ? NativePromise.resolve() : NativePromise.reject("Failed to load source: " + libSrc);
    } else {
        let scriptNode = document.querySelector("[src=" + libSrc + "]");
        if (!scriptNode) {
            scriptNode = document.createElement('script');
            scriptNode.src = libSrc;
            document.head.appendChild(scriptNode);
        } else {
            return NativePromise.resolve();
        }

        return new NativePromise(function (resolve, reject) {

            var onload = function () {
                scriptNode.removeEventListener('load', onload);
                loadedLibMap[libSrc] = true;
                resolve();
            };

            var onerror = function () {
                scriptNode.removeEventListener('error', onerror);
                loadedLibMap[libSrc] = false;
                reject("Failed to load source: " + libSrc);
            };

            scriptNode.addEventListener('load', onload);
            scriptNode.addEventListener('error', onerror);
        });
    }
}


module.exports = {
    loadScriptLib: loadScriptLib
};