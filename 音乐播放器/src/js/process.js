//进度条控件

(function($,root){
    let allDuration = 1;
    let frameId;
    let lastPercent = 0;
    let startTime;

    //秒转换为分钟
    function conventSecond(time){
        time = Math.round(time);
        let minute = Math.floor(time/60);
        let second = time - minute * 60;
        if(minute < 10) {
            minute = '0' + minute;
        }
        if(second < 10) {
            second = '0' + second;
        }
        return minute + ':' + second;
    }

    //显示时间
    function renderAllTime(duration) {
        allDuration = duration;
        let allTime = conventSecond(duration);
        $('.all-time').html(allTime);
    }

    function updata(percent) {
        let curTime = percent * allDuration;
        curTime = conventSecond(curTime);
        $('.cur-time').html(curTime);
        
        let percentage = (percent - 1) * 100 + '%';
        $('.pro-top').css({
            'transform': 'translateX('+percentage+')'
        });
    }
    //时间和进度条改变，动画实现requestAnimationFrame
    function start(time){
        cancelAnimationFrame(frameId);
        if(time == null) {
            lastPercent = 0;
        } 
        startTime = new Date().getTime();
        function frame() {
            let curTime = new Date().getTime();
            let percent = (curTime - startTime)/(allDuration * 1000) + lastPercent;
            frameId = requestAnimationFrame(frame);
            updata(percent);
        }
        frame();
    }

    function move(time) {
        lastPercent = time;
        start(0);
    }
    
    function stop(){
        //记录暂停时的播放时间
        let stopTime = new Date().getTime();
        lastPercent = lastPercent + (stopTime - startTime)/(allDuration * 1000);
        cancelAnimationFrame(frameId);
    }

    root.process = {
        renderAllTime:renderAllTime,
        start:start,
        stop:stop,
        updata:updata,
        move:move,
    }
})(window.Zepto, window.player || (window.player = {}))