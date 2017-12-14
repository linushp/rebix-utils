function showMessage(msg) {
    var $soso_message = document.getElementById("rebix_utils_alert_message");
    if (!$soso_message) {
        var node = document.createElement("div");
        node.setAttribute('id', "rebix_utils_alert_message");
        node.setAttribute('style', "" +
            "position: fixed;" +
            "width: 200px;" +
            "height: 40px;" +
            "top:40%;" +
            "left:50%;" +
            "margin:-40px 0 0 -100px;" +
            "color:#FFF;" +
            "background:#AAA;" +
            "z-index:1000;" +
            "border-radius:7px;" +
            "text-align:center;" +
            "line-height:40px;");
        document.body.appendChild(node);
        $soso_message = node;
    }

    $soso_message.innerHTML = (msg);
    $soso_message.style.display = 'block';
    setTimeout(function () {
        $soso_message.style.display = 'none';
    }, 5000);
}


module.exports = {
    showMessage:showMessage
};