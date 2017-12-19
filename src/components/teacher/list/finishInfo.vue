<template lang="html">
    <div class="homeworkInfo">
        <ul class="choose">
            <li class="title">选择题</li>
            <li class="finishLv">
                <span>1%</span>
                平均准确率
            </li>
            <li class="theader">
                <div class="hnumber">题号</div>
                <div class="hlv">准确率</div>
                <div class="hdeal">操作</div>
            </li>
            <li>
                <div class="hnumber">第一题</div>
                <div class="hlv"><el-progress :text-inside="true" :stroke-width="18" :percentage="0"></el-progress></div>
                <div class="hdeal">
                    <span>查看</span>
                </div>
            </li>
        </ul>
        <ul class="fill">

        </ul>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
.homeworkInfo{
    width: 100%;
    padding-top:20px;
}
.homeworkInfo>ul>li{
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #d1dfd7;
    line-height: 40px;
    font-size:0;
    box-sizing: border-box;
}
.homeworkInfo>ul:last-child{
    border-bottom: none;
}
.homeworkInfo .title{
    font-size:18px;
    color:#54abaa;
    text-indent: 10px;
}
.homeworkInfo .finishLv{
    font-size:15px;
    color:#54abaa;
}
.homeworkInfo .finishLv>span{
    font-size: 19px;
    margin-right: 12px;
}
.homeworkInfo>ul>li>div{
    display: inline-block;
    vertical-align: top;
    font-size:16px;
    height: 100%;
    line-height: 40px;
    box-sizing: border-box;
}
.homeworkInfo>ul>li>.hnumber{
    width: 130px;
}
.homeworkInfo>ul>li>.hlv{
    width: 500px;
    text-align: center;
}
.homeworkInfo>ul>li>.hlv>div{
    margin-top: 10px;
}
.homeworkInfo>ul>li>.hdeal{
    width: 214px;
    text-align: center;
}
.homeworkInfo>ul>li>.hdeal>span{
    cursor: pointer;
    color: #28e3e4;
    font-size: 16px;
}
.homeworkInfo>ul>.theader>div{
    font-weight: bold;
}
.homeworkInfo>ul>.theader>.hnumber{
    text-indent: 10px;
}
</style>
