<template lang="html">
    <div id="teacher">
        <header>
            <div class="headerInfo">
                <div class="fl">
                    <img src="./img/qiStar.png">
                    <img src="./img/plan1.png">
                </div>
                <div class="fr">
                    <div class="accountInfo">
                        <i class="iconfont icon-mima"></i>
                        <span>18700462194</span>
                        <i class="iconfont icon-mima cursor" @click='showOut'></i>
                        <i class="iconfont icon-mima down" v-show='isOutShow' @click="getOut">退出</i>
                    </div>
                    <img src="./img/plan.png">
                </div>
            </div>
        </header>
    </div>
</template>

<script>
export default {
    data(){
        return {
            isOutShow:false
        }
    },
    methods:{
        showOut(){
            this.isOutShow = !this.isOutShow
        },
        getOut(){

        }
    }
}
</script>

<style lang="css">
#teacher{
    position: absolute;
    width: 100%;
    height: 100%;
    background: url('./img/bg.png') no-repeat;
    background-size: cover;
}
#teacher>header{
    width: 100%;
    height: 67px;
    background: #fff;
    margin-top: 52px;
    box-shadow: 1px 1px 1px #eeeeee;
}
#teacher>header>.headerInfo{
    width: 1024px;
    height: 100%;
    margin:0 auto;
}
#teacher>header>.headerInfo>.fl,#teacher>header>.headerInfo>.fr{
    font-size: 0;
    height: 100%;
    line-height: 67px;
}
#teacher>header>.headerInfo>.fl>img,#teacher>header>.headerInfo>.fr>img{
    vertical-align: middle;
}
#teacher>header>.headerInfo>.fl>img{
    margin-right: 45px;
}
#teacher>header>.headerInfo>.fr>img{
    margin-top: -18px;
}
#teacher>header>.headerInfo>.fl{
    float: left;
}
#teacher>header>.headerInfo>.fr{
    float: right;
}
#teacher>header>.headerInfo>.fr>.accountInfo{
    font-size:17.3px;
    color: #b2b3b3;
    display: inline-block;
    margin-right: 18px;
    position: relative;
    font-weight: bold;
}
#teacher>header>.headerInfo>.fr>.accountInfo>.down{
    position: absolute;
    top:67px;
    right: 0;
    width: 110px;
    height: 49px;
    border: 1px solid #ced9d3;
    text-align: center;
    vertical-align: middle;
    line-height: 49px;
    font-size: 16px;
    cursor: pointer;
    color: #000;
    background: #fff;
}
#teacher>header>.headerInfo>.fr>.accountInfo>.down:before{
    margin-right: 13px;
}
</style>
