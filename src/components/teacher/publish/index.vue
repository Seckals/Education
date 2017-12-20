<template lang="html">
    <div class="publish clearfix">
        <div class="content fl">
            <header></header>
            <section>
                <div class="publishHeader">

                </div>
                <div class="cutLine"></div>
                <div class="publishBody">

                </div>
            </section>
            <footer></footer>
        </div>
        <div class="aside fr">
            <div class="title">单选题</div>
            <div class="toLibrary"><i class="iconfont icon-fangdajing"></i>题库找题</div>
            <div class="toImport"><i class="iconfont icon-xiazai"></i>文档载入</div>
            <div class="btnBox"><button class="preview">预览</button><button class="submit">提交</button></div>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
.publish{
    width: 920px;
}
.publish>.content{
    width: 772px;
}
.publish>.content>header{
    width: 100%;
    height: 112px;
    background: url('../img/ass_top.png') no-repeat;
    background-size: 100% 100%;
}
/*************************************************************section*******************************************/
.publish>.content>section{
    width: 100%;
    min-height: 600px;
    box-sizing: border-box;
    background: url(../img/ass_bg12.png) repeat-y;
}
.publish>.content>section>.publishHeader{
    width: 702px;
    margin: 0 auto;
    padding-top: 20px;
}
.publish>.content>section>.cutLine{
    width: 750px;
    height: 16px;
    background: #eaf2f3;
    margin:0 auto;
    border-top: 1px solid #c1d6c9;
    border-bottom: 1px solid #c1d6c9;
}
.publish>.content>section>.publishBody{
    width: 702px;
    margin: 0 auto;
    padding-top: 23px;
}
/**************************************************************footer********************************************/
.publish>.content>footer{
    width: 100%;
    height: 40px;
    background: url(../img/ass_bg_bottom11.png) no-repeat;
}
/**************************************************************aside*********************************************/
.publish>.aside{
    width: 136px;
    height: 332px;
    margin-top: 108px;
    border: 1px solid #b2ccbc;
    background: #eaf2f3;
    box-sizing: border-box;
}
.publish>.aside>div{
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    border-bottom: 1px solid #c7d4cc;
}
.publish>.aside>div:last-child{
    border-bottom: 0 !important;
}
.publish>.aside>.title{
    font-size: 16px;
    height: 41px;
    line-height: 41px;
    cursor: pointer;
}
.publish>.aside>.toLibrary,.publish>.aside>.toImport{
    height: 76px;
    color:#039ca0;
    font-size:15px;
    font-weight: bold;
    cursor: pointer;
}
.publish>.aside>.toLibrary>i,.publish>.aside>.toImport>i{
    display: block;
    font-size: 33px;
    margin: 10px 0;
}
.publish>.aside>.btnBox{
    height: 117px;
    font-size: 0;
}
.publish>.aside>.btnBox>button{
    width: 92px;
    height: 34px;
    border-radius: 10px;
    color: #fff;
    font-size: 15px;
    cursor: pointer;
    box-shadow: 1px 1px 2px #aabebe;
}
.publish>.aside>.btnBox>.preview{
    background: #62cc8f;
    margin: 13px auto 8px;
}
.publish>.aside>.btnBox>.preview:hover{
    background: #5cc287;
}
.publish>.aside>.btnBox>.submit{
    background: #28b3b4;
}
.publish>.aside>.btnBox>.submit:hover{
    background: #24a6a7
}
</style>
