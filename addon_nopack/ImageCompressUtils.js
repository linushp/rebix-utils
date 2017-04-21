var binaryUtils = require('./binaryUtils');
var getMediaWidthHeight = require('../getMediaWidthHeight');

const canvas = document.createElement('canvas');
const canvasContext = canvas.getContext('2d');

function createImageThumbDataUrl(img, width, height, opcity, nameExt) {
    canvas.width = width;
    canvas.height = height;
    canvasContext.clearRect(0, 0, width, height);
    canvasContext.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height);
    var imageData = canvas.toDataURL('image/' + nameExt, opcity);
    return imageData;
}


function imageDataUrlToBlob(imageDataUrl, nameExt) {
    var b64 = imageDataUrl.replace('data:image/' + nameExt + ';base64,', '');
    var binary = atob(b64);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/' + nameExt});
}


function getZipImageDataUrl(img, nameExt) {
    var naturalWidth = img.naturalWidth || img.width;
    var naturalHeight = img.naturalHeight || img.height;
    var viewSize = getMediaWidthHeight(294 * 3, 294 * 3, naturalWidth, naturalHeight);
    var imageDataUrl = createImageThumbDataUrl(img, viewSize.width, viewSize.height, 0.6, nameExt);
    return {
        imageDataUrl: imageDataUrl,
        width: viewSize.width,
        height: viewSize.height
    }
}



/**
 * 将图片进行压缩 ,获取压缩后图片的若干信息.
 * @param imageFile
 * @param nameExt jpeg 或者 png
 * @returns {Promise.<T>}
 */
exports.getCompressImageFileInfo = function (imageFile, nameExt) {

    return binaryUtils.blobToDataURL(imageFile)

        .then(function (dataUrl) {

            return new Promise(function (resolve) {

                var img = new Image();
                img.src = dataUrl;
                if (img.complete) {

                    var imageDataUrlResult = getZipImageDataUrl(img, nameExt);
                    resolve({
                        thumbDataUrl: createImageThumbDataUrl(img, 15, 15, 1, nameExt),
                        dataUrl: imageDataUrlResult.imageDataUrl,//createImageThumbDataUrl(img,img.width,img.height),
                        width: imageDataUrlResult.width,
                        height: imageDataUrlResult.height
                    });

                } else {
                    img.onload = function () {
                        var imageDataUrlResult = getZipImageDataUrl(img, nameExt);
                        resolve({
                            thumbDataUrl: createImageThumbDataUrl(img, 15, 15, 1, nameExt),
                            dataUrl: imageDataUrlResult.imageDataUrl,//createImageThumbDataUrl(img,img.width,img.height),
                            width: imageDataUrlResult.width,
                            height: imageDataUrlResult.height
                        });
                    };
                }
            });

        }).then(function ({width,height,thumbDataUrl,dataUrl}) {

            var fileDataUrl = dataUrl;
            var blobUrl = binaryUtils.dataUrlToBlobUrl(fileDataUrl);

            var uploadFileBlob = imageDataUrlToBlob(fileDataUrl, nameExt);
            var fileSize = uploadFileBlob.size;

            return {
                blobUrl: blobUrl,  //图片压缩后的 BlobURL : 形如: blob:http://www.xxx.xx/s32d2n23kf2332s8ddj8293
                blobObject: uploadFileBlob,  //图片压缩后的 Blob 对象, 业务可以拿到此字段上传到服务器
                fileDataUrl: fileDataUrl, //图片压缩后的 Base64 DataURL
                thumbDataUrl: thumbDataUrl,//图片高斯模糊图的 Base64 DataURL
                imgWidth: width, // blobObject字段对象的,宽度
                imgHeight: height, // blobObject字段对象的,高度
                fileSize: fileSize, // blobObject字段对象的,文件大小
                ext: nameExt //文件扩展名
            }
        });
};