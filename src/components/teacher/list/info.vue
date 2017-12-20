<template lang="html">
    <div class="info">
        <header>
            <span>三年级三班</span>
            <span>2017-12-17</span>
        </header>
        <section>
            <div class="content">
                <div class="title">
                    <div class="rate">
                        <span class="rNumber">0/1</span>
                        <span class="label">已完成</span>
                    </div>
                    <div class="lv">
                        <span class="rNumber">0%</span>
                        <span class="label">平均准确率</span>
                    </div>
                </div>
                <div class="nav">
                    <router-link :to="{path:'studentlist', query: {id:this.$route.query.id,check:this.$route.query.check} }" tag="div" class="navItem" :class="{isActive:isTog}" @click.native="changeIcon('rate')">
                        <i class="iconfont icon-group"></i>
                        <span>学生完成情况</span>
                    </router-link>
                    <router-link :to="{path:'finish', query: {id:this.$route.query.id,amount:studentAmount,check:this.$route.query.check} }" tag="div" class="navItem" :class="{isActive:!isTog}"@click.native="changeIcon('lv')">
                        <i class="iconfont icon-chakanxiangqing"></i>
                        <span>作业详情</span>
                    </router-link>
                </div>
                <router-view @getMsg="getMsg" />
            </div>
        </section>
        <footer></footer>
    </div>
</template>

<script>
export default {
    data(){
        return {
            isTog:true,
            studentAmount:0
        }
    },
    methods:{
        changeIcon(val){
            if(val == 'rate'){
                this.isTog = true
            }else if(val == 'lv'){
                this.isTog = false
            }
        },
        getMsg(msg){
            this.studentAmount = msg
        }
    }
}
</script>

<style lang="css">
.info{
    width: 914px;
}
.info>header{
    width: 100%;
    height: 115px;
    box-sizing: border-box;
    padding-top: 78px;
    padding-left: 35px;
    line-height: 30px;
    background: url('./img/middle_box_top.png') no-repeat;
}
.info>section{
    width: 100%;
    min-height: 630px;
    background: url('./img/middle_body.png') repeat-y;
}
.info>footer{
    width: 100%;
    height: 40px;
    background: url('./img/middle_bottom.png') no-repeat;
}
.info>header>span{
    font-size: 19px;
    color:#fff;
    margin-right: 19px;
}
.info>section>.content{
    width: 844px;
    height: 100%;
    margin:0 auto;
}
.info>section>.content>.title{
    width: 100%;
    padding-top: 20px;
    font-size:0;
}
.info>section>.content>.title>div{
    width: 97px;
    height: 77px;
    background:#d8ede1;
    display: inline-block;
    vertical-align: top;
    margin-right: 19px;
    box-shadow: 2px 2px 2px 2px #9db3a7 inset;
}
.info>section>.content>.title>div>span{
    display: block;
    text-align: center;
    width: 100%;
}
.info>section>.content>.title>div>.rNumber{
    height: 34px;
    line-height: 34px;
    font-size: 24px;
    color: #51c281;
    font-weight: bold;
    margin-top:10px;

}
.info>section>.content>.title>div>.label{
    height: 30px;
    font-size: 15px;
    color:#7d7e7e;
}
.info>section>.content>.nav{
    width: 100%;
    height: 117px;
    background: rgba(0,0,0,0.05);
    margin-top: 25px;
}
.info>section>.content>.nav>.navItem{
    width: 150px;
    height: 100%;
    display: inline-block;
    vertical-align: top;
    cursor: pointer;
}
.info>section>.content>.nav>.navItem>i{
    display: block;
    width: 50px;
    height: 52px;
    border-radius: 5px;
    /* background: #28b3b4; */
    background: #eaf2ee;
    margin:17px auto 0;
    font-size: 30px;
    text-align: center;
    line-height: 52px;
    color:#979a98;
}
.info>section>.content>.nav>.navItem>span{
    display: block;
    width: 100%;
    font-size: 15px;
    text-align: center;
    line-height: 35px;
    color: #3a3b3b;
    font-weight: 500;
}
.isActive{
    background: #def1e5 !important;
    border-top:4px solid #28b3b4;
}
.isActive>i{
    background: #28b3b4 !important;
    color:#fff !important;
}
.isActive>span{
    color: #28b3b4 !important;
}
</style>
