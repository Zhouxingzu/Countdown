### 使用方法
#### 一、首先将countDown.js引入（本插件需要引入jquery）


#### 二、在JS中进行配置：

html元素：
```
<div class="count-down-time">
    <span class="day"></span>天
    <span class="hour"></span>时
    <span class="minute"></span>分
    <span class="second"></span>秒
</div>
```

```
//创建实例
var timedown = new Countdown({
    $days: '.day',
    $hours: '.hou',
    $minutes: '.minute',
    $seconds: '.second',
    //倒计截止时间
    countTime: {
        year: 2017,
        month: 7,
        day: 9,
        hour: 23,
        minute: 54,
        second: 0
    }
});

```
*默认截止时间为：2017-1-1 00:00:00
