<template>
    <div class="list">
        <header>
            <div class="classes">
                <span class="searchTitle cursor" @click="showList('classes')" :class='{titleActive:isClassRotate}'>
                    全部<i class="el-icon-arrow-down rotate" :class="{rotate180:isClassRotate,rotate0:!isClassRotate}"></i>
                </span>
                <ul v-show='isClassRotate'>
                    <li>12313</li>
                </ul>
            </div>
            <div class="status">
                <span class="searchTitle cursor" @click="showList('status')" :class='{titleActive:isStatusRotate}'>
                    全部<i class="el-icon-arrow-down rotate" :class="{rotate180:isStatusRotate}"></i>
                </span>
                <ul v-show='isStatusRotate'>
                    <li>12313</li>
                </ul>
            </div>

        </header>
        <section>
            <ul class="listBox">
                <li class="listItem">
                    <div class="time">
                        <span class="className">三年级三班</span>
                        <span class="day">昨天</span>
                        <span class="week">星期日</span>
                        <span class="date">19:50</span>
                    </div>
                    <div class="listItemContant">
                        <div class="unit">
                            <span class="w250">
                                单元: 一单元
                            </span>
                            <span class="itemStatus"><i class="iconfont icon-dian-copy-copy"></i>待检查</span>
                            <span class="finishPeople">
                                <span>0</span>/1人
                            </span>
                        </div>
                        <div class="itemInfo clearfix">
                            <span class="w370">内容: 古诗词</span>
                            <span class="c28b3b4 f14">已完成</span>
                            <button class="fr">查看</button>
                        </div>
                        <div class="dataTime">
                            <span>日期: 12月17日<span>17:55</span>-12月19日<span>23:59</span></span>
                        </div>
                    </div>
                    <img src="./img/fenge.png" alt="">
                </li>
            </ul>

        </section>
        <footer>

        </footer>
    </div>
</template>

<script>
export default {
    data(){
        return {
            isClassRotate:false,
            isStatusRotate:false
        }
    },
    methods:{
        showList(val){
            if(val == 'classes'){
                this.isClassRotate = !this.isClassRotate
                this.isStatusRotate = false
            }else if(val == 'status'){
                this.isStatusRotate = !this.isStatusRotate
                this.isClassRotate = false
            }
        }
    }
}
</script>

<style lang="css">
.list{
    width: 914px;
}
.list>header{
    width: 100%;
    height: 115px;
    position: relative;
    background: url('./img/middle_box_top.png') no-repeat;
}
.list>footer{
    width: 100%;
    height: 40px;
    background: url('./img/middle_bottom.png') no-repeat;
}
.list>header>.classes,.list>header>.status{
    width: 149px;
    height: 38px;
    line-height: 38px;
    font-size:15px;
    text-align: center;
    position: absolute;
    bottom:0;
    color:#fff;
}
.list>header>.classes{
    right: 196px;
}
.list>header>.status{
    right: 47px;
}
.list>header .searchTitle{
    display: block;
    width: 100%;
    height: 100%;
}
.list>header ul>li{
    width: 100%;
    height: 43px;
    color: #737473;
    text-align: center;
    line-height: 43px;
    background: #fff;
    border: 1px solid #cedad3 !important;
}
.rotate{
    margin-left: 10px;
    transition: transform .3s;
}
.rotate0{
    transform: rotate(0deg);
}
.rotate180{
    transform: rotate(180deg);
}
.titleActive{
    color: rgb(40, 179, 180);
    background: #fff;
}
/*section*/
.list>section{
    width: 100%;
    min-height: 630px;
    background: url('./img/middle_body.png') repeat-y;
}
.list>section>.listBox{
    width: 890px;
    height: 100px;
    margin:0 auto;
}
.list>section>.listBox>li{
    box-sizing: border-box;
}
.list>section>.listBox>li>.time{
    width: 100%;
    height: 42px;
    line-height: 42px;
    padding-left: 32px;
    font-size:0;
    border-bottom: 1px solid #bfdacc;
    box-sizing: border-box;
}
.list>section>.listBox>li>.time>span{
    display: inline-block;
    vertical-align: top;
    font-size: 18px;
}
.list>section>.listBox>li>.time>.className{
    color: #333;
    min-width: 145px;
}
.list>section>.listBox>li>.time>.day{
    color: #8a8d8c;
    min-width: 117px;
    text-align: center;
}
.list>section>.listBox>li>.time>.week{
    margin-right: 6px;
    color: #8a8d8c;
}
.list>section>.listBox>li>.time>.date{
    font-size: 14px;
    color: #8a8d8c;
}
.list>section>.listBox>li>.listItemContant{
    width: 100%;
    padding-left: 32px;
    padding-top: 11px;
    color: #8a8d8c;
    box-sizing: border-box;
}
.list>section>.listBox>li>.listItemContant>div{
    font-size:0;
    line-height: 23px;
}
.listBox>li>.listItemContant>div>span{
    display: inline-block;
    font-size: 16px;
}
.w250{
    min-width: 250px;
}
.listBox>li>.listItemContant>div>.itemStatus{
    min-width: 120px;
    font-size: 17px;
    color: #ed6a47;
}
.listBox>li>.listItemContant>div>.finishPeople{
    font-size: 18px;
    color: #28b3b4;
}
.listBox>li>.listItemContant>div>.finishPeople>span{
    font-size: 20px;
}
.w370{
    min-width: 370px;
}
.itemInfo>button{
    width: 60px;
    height: 30px;
    border-radius: 10px;
    background: #28b3b4;
    color:#fff;
    font-size: 16px;
    cursor: pointer;
    margin-right: 45px;
}
.itemInfo>button:hover{
        background: #28b3b9;
}
.c28b3b4{
    color: #28b3b4;
}
.f14{
    font-size: 14px !important;
}
</style>
