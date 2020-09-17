//倒计时组件
function Countdown(obj) {
    let that = this;
    that.$days = obj.$days;         //天数
    that.$hours = obj.$hours;       //小时
    that.$minutes = obj.$minutes;   //分钟
    that.$seconds = obj.$seconds;   //秒
    that.countTime = $.extend({}, { //截止时间
        year: 2017,
        month: 1,
        day: 1,
        hour: 0,
        minute: 0,
        second: 0
    }, obj.countTime);
    that.isLeftTime = obj.isLeftTime || false;  //是否为截止时间差值(此时应该传入差值的时间戳)
    that.timestamp = Number(obj.timestamp) || 0;  //差值的时间戳
    that.init();
}

Countdown.prototype = {
    constructor: Countdown,
    interval: null,
    initTime: 0,
    //初始化
    init: function() {
        let that = this;
        that.leftTimer(that.countTime);
        that.interval = setInterval(function() {
            that.leftTimer(that.countTime);
        }, 1000); 
    },

    //距离活动开始倒计时
    leftTimer: function(obj) { 
        let that = this;
        let year = obj.year;
        let month = obj.month;
        let day = obj.day;
        let hour = obj.hour;
        let minute = obj.minute;
        let second = obj.second;
        let leftTime = (new Date(year, month - 1, day, hour, minute, second)) - (new Date()); //计算剩余的毫秒数
        //如果传入的是时间差值
        if(that.isLeftTime) {
            that.initTime = that.initTime + 1000;
            leftTime = that.timestamp - that.initTime;
        }
        //时间到
        if(leftTime <= 0) {
            $(that.$days).text('00');
            $(that.$hours).text('00');
            $(that.$minutes).text('00');
            $(that.$seconds).text('00'); 
            return clearInterval(that.interval);
        } 
        let days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数 
        let hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时 
        let minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟 
        let seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数 
        days = this.checkTime(days); 
        hours = this.checkTime(hours); 
        minutes = this.checkTime(minutes); 
        seconds = this.checkTime(seconds); 

        //改变倒计时的时间
        $(that.$days).text(days);
        $(that.$hours).text(hours);
        $(that.$minutes).text(minutes);
        $(that.$seconds).text(seconds); 
    },

    //将0-9的数字前面加上0，例1变为01 
    checkTime: function(i) { 
        if(i < 10) { 
            i = '0' + i; 
        } 
        return i; 
    }
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Countdown;
}
else {
    if (typeof define === 'function' && define.amd) {
        define([], function() {
            return Countdown;
        });
    }
    else {
        window.Countdown = Countdown;
    }
}

//创建实例
// let timedown = new Countdown({
//     $days: '#day',
//     $hours: '#hou',
//     $minutes: '#minute',
//     $seconds: '#second',
//     //倒计截止时间
//     countTime: {
//         year: 2017,
//         month: 7,
//         day: 9,
//         hour: 23,
//         minute: 54,
//         second: 0
//     }
// });