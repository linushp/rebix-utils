/* global Buffer */
// 各种二进制处理函数 (ArrayBuffer, Blob, Uint8Array)

function bufferToArrayBuffer(buffer) {
    return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
}

function arrayBufferToArray(arrayBuffer) {
    return [].slice.call(new Uint8Array(arrayBuffer));
}

function arrayToArrayBuffer(array) {
    return new Uint8Array(array).buffer;
}

function stringToArrayBuffer(str) {
    return bufferToArrayBuffer(new Buffer(str));
}

function stringToArray(str) {
    return arrayBufferToArray(stringToArrayBuffer(str));
}

function blobToDataURL(blob) {
    return new Promise(function (resolve) {
        var a = new FileReader();
        a.onload = function (e) {
            resolve(e.target.result);
        };
        a.readAsDataURL(blob);
    });
}

function arrayToBinaryString(arr) {
    return arr.map(function (code) {
        String.fromCharCode(code)
    }).join('');
}

function arrayBufferToBinaryString(arrayBuffer) {
    return arrayToBinaryString(arrayBufferToArray(arrayBuffer));
}

function _base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}


var dataUrlToBlobUrl = function (dataurl) {
    var blob = dataUrlToBlobObject(dataurl);
    return URL.createObjectURL(blob);
};

var dataUrlToBlobObject = function (dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    var blob = new Blob([u8arr], {type: mime});
    return blob;
};


var blobUrlToBlobObject = function (blobUrl) {
    return new Promise(function (resolve) {
        var xhr = new XMLHttpRequest;
        xhr.responseType = 'blob';
        xhr.onload = function () {
            var recoveredBlob = xhr.response;
            resolve(recoveredBlob);
            //var reader = new FileReader;
            //reader.onload = function() {
            //    var blobAsDataUrl = reader.result;
            //    window.location = blobAsDataUrl;
            //};
            //reader.readAsDataURL(recoveredBlob);
        };
        xhr.open('GET', blobUrl);
        xhr.send();
    });
};

module.exports = {
    arrayBufferToArray: arrayBufferToArray,

    arrayToArrayBuffer: arrayToArrayBuffer,

    arrayBufferToString: function (arrayBuffer) {
        return new Buffer(arrayBuffer).toString();
    },

    arrayBufferToBinaryString: arrayBufferToBinaryString,

    arrayToString: function (array) {
        return new Buffer(array).toString();
    },

    stringToArray: stringToArray,

    stringToArrayBuffer: stringToArrayBuffer,

    arrayBufferToBase64: function (arrayBuffer) {
        return btoa(arrayBufferToBinaryString(arrayBuffer));
    },

    dataUrlToArrayBuffer: function (dataUrl) {
        const base64 = dataUrl.replace(/data:\w+\/\w+;base64,/, '');
        return _base64ToArrayBuffer(base64);
        //return stringToArrayBuffer(atob(base64));
    },

    blobToDataURL: blobToDataURL,
    dataUrlToBlobUrl: dataUrlToBlobUrl,
    dataUrlToBlobObject: dataUrlToBlobObject,
    blobUrlToBlobObject: blobUrlToBlobObject
};
