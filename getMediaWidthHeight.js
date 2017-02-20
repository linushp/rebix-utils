/**
 * 计算图片的宽度和高度,限定最大宽度和最大高度.
 * @param maxWidth
 * @param maxHeight
 * @param sWidth
 * @param sHeight
 * @returns {*}
 */
module.exports  = function getMediaSize(maxWidth,maxHeight,sWidth,sHeight){
    var width = 100;
    var height = 100;
    var scale = 0;

    if (sHeight <= maxHeight && sWidth <= maxWidth) {
        return {width: sWidth, height: sHeight}
    }

    if (sHeight <= maxHeight && sWidth > maxWidth) {
        width = maxWidth;
        scale = sWidth / maxWidth; //> 1
        height = sHeight / scale;
    }

    if (sHeight > maxHeight && sWidth <= maxWidth) {
        height = maxHeight;
        scale = sHeight / maxHeight;//>1
        width = sWidth / scale;
    }

    if (sHeight > maxHeight && sWidth > maxWidth) {
        height = maxHeight;
        scale = sHeight / maxHeight;//>1
        sWidth = sWidth / scale;
        width = sWidth;

        if (sHeight <= maxHeight && sWidth > maxWidth) {
            width = maxWidth;
            scale = sWidth / maxWidth; //> 1
            height = sHeight / scale;
        }
    }

    width = Math.round(width);
    height = Math.round(height);
    return {width:width, height:height}
};