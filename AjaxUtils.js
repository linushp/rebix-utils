
var PromiseUtils = require("./PromiseUtils");



function sendXmlHttpRequest(method, url, data, contentType, responseType) {

    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);

        //1.responseType
        if (responseType) {
            xhr.responseType = responseType;
        } else {
            xhr.responseType = 'text';
        }

        //2.contentType
        var CONST_CONTENT_TYPE = 'Content-Type';
        if (contentType === 'form') {
            xhr.setRequestHeader(CONST_CONTENT_TYPE, "application/x-www-form-urlencoded");
        }
        if (contentType === 'json') {
            xhr.setRequestHeader(CONST_CONTENT_TYPE, "application/json;charset=UTF-8");
        }


        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    var responseText = xhr.responseText;
                    resolve(responseText);
                }else {
                    reject(xhr.status,xhr);
                }
            }
        };


        //3.data
        if (data) {
            xhr.send(data);
        } else {
            xhr.send();
        }

    });
}



function jsonParseResponseText(responseText) {
    return JSON.parse(responseText);
}


function sendGetRequest(url, cacheSecond) {
    if (!cacheSecond) {
        return sendXmlHttpRequest("GET", url);
    }

    return PromiseUtils.getCacheOrCreatePromise("get:" + url, cacheSecond, function () {
        return sendXmlHttpRequest("GET", url);
    });
}



function sendGetJSONRequest(url, cacheSecond) {
    return sendGetRequest(url, cacheSecond).then(jsonParseResponseText);
}


function sendPostRequest(url, data, contentType) {
    return sendXmlHttpRequest("POST", url, data, contentType);
}

function sendPostJSONRequest(url, data) {
    var dataStr = JSON.stringify(data);
    return sendPostRequest(url, dataStr, 'json').then(jsonParseResponseText);
}


function sendPostFormRequest(url, data){
    return sendPostRequest(url, data, 'form');
}


function sendPostFormRequest2(url, data){
    return sendPostRequest(url, data, 'form').then(jsonParseResponseText);
}


function toQueryStringPush(isEncode, arrs, key, value) {
    if (value !== undefined && value!=="" && value !==null) {
        if (isEncode) {
            arrs.push(key + "=" + encodeURIComponent(value));
        } else {
            arrs.push(key + "=" + value);
        }
    }
}



function toQueryString(obj, isEncode) {
    var arrs = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            var value = obj[key];
            if (Object.prototype.toString.call(value) === '[object Array]') {
                for (var i = 0; i < value.length; i++) {
                    var obj1 = value[i];
                    toQueryStringPush(isEncode, arrs, key, obj1);
                }
            } else {
                toQueryStringPush(isEncode, arrs, key, value);
            }
        }
    }
    return arrs.join("&");
}


module.exports = {
    sendXmlHttpRequest: sendXmlHttpRequest,
    sendGetRequest: sendGetRequest,
    sendGetJSONRequest: sendGetJSONRequest,
    sendPostRequest: sendPostRequest,
    sendPostFormRequest:sendPostFormRequest,
    sendPostFormRequest2:sendPostFormRequest2,
    sendPostJSONRequest: sendPostJSONRequest,
    toQueryString: toQueryString
};