

function formatTimeLeft(times){
    if(times<= 0){
        return " 0 天 0 小时 0 分钟 ";
    }
    var day_times = 1000*60*60*24;
    var hours_times = 1000*60*60;
    var minutes_times = 1000*60;
    var days = parseInt(times/day_times);
    var hours = parseInt( (times - days *  day_times)/hours_times);
    var minutes = parseInt( (times - days *  day_times - hours * hours_times)/minutes_times);
    return days +" 天 " + hours + " 小时 " + minutes + " 分钟";
}



module.exports = formatTimeLeft;