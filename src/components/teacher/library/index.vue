<template lang="html">
    <div class="publish clearfix" v-loading.fullscreen.lock="fullscreenLoading">
        <div class="content fl">
            <header></header>
            <section>
                <div class="publishHeader">
                    <div class="selectBox">
                        <span class="selectLabel">年级</span>
                        <span class="selectInfo">{{grade.gradeChar}}({{ce}})</span>
                        <div class="changlist" @blur="isblur" tabindex="1">
                            <i class="iconfont icon-f11-copy" :class="{gradeActive:isGradeShow}" @click="showList('isGradeShow')">更换年级</i>
                            <ul v-show="isGradeShow">
                                <li v-for="(item,index) in list" @click="showCe(index)">
                                    {{item.gradeChar}}
                                    <ul v-show="isCeShow == index">
                                        <li @click="hadChoose(item,'上')">上册</li>
                                        <li @click="hadChoose(item,'下')">下册</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="selectBox">
                        <span class="selectLabel">单元</span>
                        <span class="selectInfo">{{hadUnit}}</span>
                        <div class="changlist" @blur="isblur" tabindex="1">
                            <i class="iconfont icon-f11-copy" :class="{gradeActive:isUnitShow}" @click="showList('isUnitShow')">更换单元</i>
                            <ul v-show="isUnitShow">
                                <li v-for="(item,index) in unit" @click="chooseUnit(item)">
                                    {{item}}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="selectBox">
                        <span class="selectLabel">名称</span>
                        <div class="publishTitle">
                            <input type="text" v-if="isInputShow" v-model="title" @blur="inputChangeShow('editor')">
                            <span v-if="!isInputShow">{{title}} <i class="iconfont icon-xiugai" @click="inputChangeShow('input')">修改</i></span>
                        </div>
                    </div>
                </div>
                <div class="cutLine"></div>
                <div class="publishBody">
                    <router-view />
                </div>
            </section>
            <footer></footer>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            fullscreenLoading:false,
            list:[],
            unit:["一单元","二单元","三单元","四单元","五单元","六单元","七单元","八单元"],
            isGradeShow:false,
            isUnitShow:false,
            isCeShow:-1,
            grade:{},
            ce:'上',
            hadUnit:'一单元',
            title:'',
            isInputShow:true
        }
    },
    mounted(){
        this.fullscreenLoading = true
        var teacherId = this.Util.getCookie('u_id')
        this.axios.get('/homework/CSM/'+teacherId+"/1").then(response => {
            var resp = response.data
            this.fullscreenLoading = false
            if(resp.list.length > 0){
                this.list = resp.list
                this.grade = resp.list[0]
            }
        }).catch(error => {
            this.fullscreenLoading = false
            this.$message.error(error)
        })
    },
    methods:{
        toLibrary(){
            this.$router.push('/teacher/box/library')
        },
        showList(type){
            this[type] = !this[type]
        },
        isblur(){
            this.isGradeShow = false
            this.isUnitShow = false
        },
        showCe(val){
            this.isCeShow = val
        },
        hadChoose(item,val){
            this.grade = item
            this.ce = val
            this.isGradeShow = false
        },
        chooseUnit(val){
            this.hadUnit = val
            this.isUnitShow = false
        },
        inputChangeShow(val){
            if(val == 'editor'){
                this.isInputShow = false
            }else if(val == 'input'){
                this.isInputShow = true
            }
        }
    }
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
.publish>.content>section>.publishHeader>.selectBox{
    margin-bottom: 10px;
    font-size:0;
    width: 100%;
}
.publish>.content>section>.publishHeader>.selectBox>.changlist{
    display: inline-block;
    vertical-align: top;
    position: relative;
}
.gradeActive{
    background: #fff;
    border:1px solid #dae2dd;
}
.publish>.content>section>.publishHeader>.selectBox>.changlist>ul{
    position: absolute;
    top:37px;
    left:0;
    width:107px;
    border-top:1px solid #dae2dd;
    background: #ffffff;
    box-sizing: border-box;
    z-index: 1000;
}
.publish>.content>section>.publishHeader>.selectBox>.changlist>ul>li{
    width: 100%;
    height: 37px;
    border: 1px solid #dae2dd;
    border-top: 0;
    font-size: 15px;
    line-height: 37px;
    text-align: center;
    position: relative;
    box-sizing: border-box;
}
.publishHeader>.selectBox>.changlist>ul>li>ul{
    position: absolute;
    top:0;
    left:106px;
    background: #ffffff;
    box-sizing: border-box;
}
.publishHeader>.selectBox>.changlist>ul>li>ul>li{
    width: 107px;
    height: 37px;
    border: 1px solid #dae2dd;
    border-top: 0;
    font-size: 15px;
    line-height: 37px;
    text-align: center;
    box-sizing: border-box;
}
.publishHeader>.selectBox>.changlist li:hover{
    background: #e8efeb !important;
    cursor: pointer;
}
.publish>.content>section>.publishHeader>.selectBox>.changlist>i{
    width: 107px;
    height: 37px;
    color: #28b3b4;
    cursor: pointer;
    text-align: center;
    line-height: 37px;
    box-sizing: border-box;
}
.publishHeader>.selectBox>.publishTitle{
    display: inline-block;
    vertical-align: top;
    font-size: 16px;
    box-sizing: border-box;
    padding-top: 3px;
    margin-left: 20px;
    line-height: 31px;
}
.publishHeader>.selectBox>.publishTitle>span>i{
    color: #28b3b4;
    margin-left: 10px;
    cursor: pointer;
}
.publishHeader>.selectBox>.publishTitle>span>i:after{
    margin-left: 10px;
    font-size: 17px;
}
.publishHeader>.selectBox>.publishTitle>input{
    width: 357px;
    height: 31px;
    text-indent: 7px;
    box-shadow: 1px 1px 1px #a7a8a9 inset;
}
.publish>.content>section>.publishHeader>.selectBox>.selectInfo{
    width: 100px;
    margin:0 20px;
}
.publish>.content>section>.publishHeader>.selectBox>span,.publish>.content>section>.publishHeader>.selectBox>.changlist>i{
    display: inline-block;
    vertical-align: top;
    font-size: 16px;
    line-height: 37px;
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
</style>
