<template lang="html">
    <div class="import clearfix" v-loading.fullscreen.lock="fullscreenLoading">
        <header></header>
        <section>
            <div class="importHeader">
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
            </div>
            <div class="importBody">
                <div class="importNav">
                    <router-link to="choose" tag="div" class="importNavItem" @click.navtive="changeType">选择题</router-link>
                    <router-link to="fill" tag="div" class="importNavItem" @click.navtive="changeType">填空题</router-link>
                    <div class="checkAll">
                        <span v-if="!isCheckAll" @click="checkAll">全选</span>
                        <span class="noCheckAll" v-if="isCheckAll" @click="checkAll">取消全选</span>
                    </div>
                </div>
                <div class="importContent">
                    <router-view :info='message' @getBackInfo = 'getBackInfo'/>
                </div>
            </div>
            <div class="submit">
                <button>提交</button>
            </div>
        </section>
        <footer></footer>
    </div>
</template>

<script>
export default {
    data(){
        return {
            fullscreenLoading:false,
            list:[],
            unit:["一单元","二单元","三单元","四单元","五单元","六单元","七单元","八单元"],
            isCeShow:-1,
            isGradeShow:false,
            isUnitShow:false,
            hadUnit:'一单元',
            grade:{},
            ce:'上',
            isCheckAll:false,
            message:{
                type:'choose',
                isCheckAll:false
            }
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
        isblur(){
            this.isGradeShow = false
            this.isUnitShow = false
        },
        showList(type){
            this[type] = !this[type]
        },
        showCe(val){
            this.isCeShow = val
        },
        chooseUnit(val){
            this.hadUnit = val
            this.isUnitShow = false
        },
        hadChoose(item,val){
            this.grade = item
            this.ce = val
            this.isGradeShow = false
        },
        changeType(){
            this.isCheckAll = false
        },
        checkAll(str){
            this.isCheckAll = !this.isCheckAll
            if(this.$route.name == 'choose'){
                this.message = {
                    type:'choose',
                    isCheckAll: this.isCheckAll
                }
            }else if(this.$route.name == 'fill'){
                this.message = {
                    type:'fill',
                    isCheckAll: this.isCheckAll
                }
            }
        },
        getBackInfo(){
            this.isCheckAll = false
        }
    }
}
</script>

<style lang="css">
.import{
    width: 914px;
}
.import>header{
    width: 100%;
    height: 112px;
    background: url('../list/img/middle_box_top.png') no-repeat;
    background-size: 100% 100%;
}
.import>section{
    width: 100%;
    min-height: 600px;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    background: url(../list/img/middle_body.png) repeat-y;
}
.import>section>.importHeader{
    width: 844px;
    margin: 0 auto;
    padding-top: 20px;
}
.import>section>.importHeader>.selectBox{
    margin-bottom: 10px;
    font-size:0;
    width: 100%;
}
.import>section>.importHeader>.selectBox>.changlist{
    display: inline-block;
    vertical-align: top;
    position: relative;
}
.gradeActive{
    background: #fff;
    border:1px solid #dae2dd;
}
.import>section>.importHeader>.selectBox>.changlist>ul{
    position: absolute;
    top:37px;
    left:0;
    width:107px;
    border-top:1px solid #dae2dd;
    background: #ffffff;
    box-sizing: border-box;
    z-index: 1000;
}
.import>section>.importHeader>.selectBox>.changlist>ul>li{
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
.importHeader>.selectBox>.changlist>ul>li>ul{
    position: absolute;
    top:0;
    left:106px;
    background: #ffffff;
    box-sizing: border-box;
}
.importHeader>.selectBox>.changlist>ul>li>ul>li{
    width: 107px;
    height: 37px;
    border: 1px solid #dae2dd;
    border-top: 0;
    font-size: 15px;
    line-height: 37px;
    text-align: center;
    box-sizing: border-box;
}
.importHeader>.selectBox>.changlist li:hover{
    background: #e8efeb !important;
    cursor: pointer;
}
.import>section>.importHeader>.selectBox>.changlist>i{
    width: 107px;
    height: 37px;
    color: #28b3b4;
    cursor: pointer;
    text-align: center;
    line-height: 37px;
    box-sizing: border-box;
}
.import>section>.importHeader>.selectBox>.selectInfo{
    width: 100px;
    margin:0 20px;
}
.import>section>.importHeader>.selectBox>span,.import>section>.importHeader>.selectBox>.changlist>i{
    display: inline-block;
    vertical-align: top;
    font-size: 16px;
    line-height: 37px;
}
.import>section>.importBody{
    width: 844px;
    margin: 0 auto;
}
.import>section>.importBody>.importNav{
    width: 100%;
    height: 51px;
    background: rgba(0,0,0,0.05);
    margin-top: 32px;
    line-height: 51px;
    color: #28b3b4;
    text-align: center;
}
.import>section>.importBody>.importNav>.importNavItem{
    width: 100px;
    height: 100%;
    float: left;
    font-size: 17px;
    font-weight: bold;
    cursor: pointer;
}
.import>section>.importBody>.importNav>.checkAll{
    width: 83px;
    float: right;
    margin-right: 90px;
    height: 100%;
    font-size: 16px;
    cursor: pointer;
}
.import>section>.importBody>.importNav>.checkAll>span{
    font-weight: bold;
}
.noCheckAll{
    color: #4a7373;
}
.import>section>.importBody>.importNav>.router-link-active{
    background: #e0f3e8;
    border-top: 4px solid #28b3b4;
}
.import>section>.submit{
    width: 100%;
    text-align: center;
    padding-top: 18px;
    position: absolute;
    bottom: 0;
}
.import>section>.submit>button{
    width: 83px;
    height: 35px;
    border-radius: 10px;
    color: #fff;
    cursor: pointer;
    -webkit-box-shadow: 1px 1px 2px #aabebe;
    box-shadow: 1px 1px 2px #aabebe;
    background: #28b3b4;
    font-size: 16px;
}
.import>section>.submit>button:hover{
    background: #24a6a7;
}
/**************************************************************footer********************************************/
.import>footer{
    width: 100%;
    height: 40px;
    background: url(../list/img/middle_bottom.png) no-repeat;
}
</style>
