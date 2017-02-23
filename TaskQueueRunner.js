var warning = require('./warning');

var _QUEUE = '_queue';
var _RUNNER = '_runner';
var _IS_RUNNING = '_isRunning';
var _TIME_INTERVAL = '_timeInterval';
var _TIME_SPACE = '_timeSpace';
var _AUTO_CLEAR = '_autoClear';

/**
 * 这是一个Class
 * @param runner
 * @param timeSpace
 * @constructor
 */
function TaskQueueRunner(runner, timeSpace ,autoClear) {
    var that = this;
    that[_QUEUE] = [];
    that[_RUNNER] = runner;
    that[_IS_RUNNING] = false;
    that[_TIME_INTERVAL] = 0;
    that[_TIME_SPACE] = timeSpace;
    that[_AUTO_CLEAR] = autoClear;

}

var TaskQueueRunnerPrototype = TaskQueueRunner.prototype;

TaskQueueRunnerPrototype.pushTask = function (task) {
    var that = this;
    that[_QUEUE].push(task);
};


TaskQueueRunnerPrototype.getAllTask = function () {
    return this[_QUEUE];
};

TaskQueueRunnerPrototype.clearTask = function () {
    this[_QUEUE] = [];
};

TaskQueueRunnerPrototype.start = function () {
    var that = this;
    if (!that[_IS_RUNNING]) {
        that[_IS_RUNNING] = true;
        that[_TIME_INTERVAL] = setInterval(function () {
            var runner = that[_RUNNER];
            try {

                var autoClear = that[_AUTO_CLEAR];
                if(autoClear){

                    //仅当有任务时,才会调用runner.并且runner完成后,清理掉queue
                    if (that[_QUEUE].length > 0) {
                        runner(that, that[_QUEUE]);
                        that[_QUEUE] = [];
                    }

                }else {
                    runner(that);
                }
            }catch (e){
                warning(e);
            }
        }, that[_TIME_SPACE]);
    }
};


TaskQueueRunnerPrototype.stop = function () {
    var that = this;
    if (that[_IS_RUNNING]) {
        that[_IS_RUNNING] = false;
        var timeInterval = that[_TIME_INTERVAL];
        if (timeInterval) {
            clearInterval(timeInterval);
        }
    }
};


module.exports = TaskQueueRunner;