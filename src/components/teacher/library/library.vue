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
                    <div class="importNavItem" :class="{'router-link-active':type=='c'}" @click="changeType('c')">选择题</div>
                    <div class="importNavItem" :class="{'router-link-active':type=='f'}" @click="changeType('f')">填空题</div>
                </div>
                <div class="importContent">
                    <choose v-model='chooselist' v-show="type=='c'"></choose>
                    <fill v-model='filllist' v-show="type=='f'"></fill>
                </div>
            </div>
            <div class="submit">
                <button @click='submit'>提交</button>
            </div>
        </section>
        <footer></footer>
    </div>
</template>

<script>
import choose from './show/choose'
import fill from './show/fill'

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
            type:'c',
            chooselist:[],
            filllist:[]
        }
    },
    components:{choose,fill},
    mounted(){
        this.getClassList()
    },
    methods:{
        submit(){
            var cstr = this.Util.getLocalStorage('c')
            var fstr = this.Util.getLocalStorage('f')
            var c,f
            typeof(cstr) != 'undefined'?c = JSON.parse(this.Base64.decode(cstr)):c=[]
            typeof(fstr) != 'undefined'?f = JSON.parse(this.Base64.decode(fstr)):f=[]
            this.Util.setLocalStorage('c',this.Base64.encode(JSON.stringify(c.concat(this.filterList(this.chooselist)))))
            this.Util.setLocalStorage('f',this.Base64.encode(JSON.stringify(f.concat(this.filterList(this.filllist)))))
            this.$router.push('/teacher/box/publish/add')
        },
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
            this.getQuestionList(1)
        },
        hadChoose(item,val){
            this.grade = item
            this.ce = val
            this.isGradeShow = false
            this.getQuestionList(1)
        },
        changeType(str){
            this.type = str
        },
        getClassList(){
            this.fullscreenLoading = true
            var teacherId = this.Util.getCookie('u_id')
            this.axios.get('/homework/CSM/'+teacherId+"/1").then(response => {
                var resp = response.data
                if(resp.list.length > 0){
                    this.list = resp.list
                    this.grade = resp.list[0]
                    var info = this.Util.getLocalStorage('g')
                    if(typeof(info) != 'undefined'){
                        var g = JSON.parse(this.Base64.decode(info))
                        this.grade = g.g
                        this.ce = g.c
                        this.hadUnit = g.u
                        this.info = {
                            type:this.type,
                            subject:'语文',
                            grade:g.g.classGrade,
                            element:g.u,
                            using:g.c,
                            page:1
                        }
                    }
                    this.getQuestionList(1)
                }else{
                    this.fullscreenLoading = false
                }
            }).catch(error => {
                this.fullscreenLoading = false
                this.$message.error(error)
            })
        },
        getQuestionList(page){
            this.fullscreenLoading = true
            var info = {
                subject:'语文',
                grade:this.grade.classGrade,
                element:this.hadUnit,
                using:this.ce,
                page:page
            }
            this.axios.post('/question/findAllMinute',this.qs.stringify(info)).then(response => {
                var resp = response.data
                this.fullscreenLoading = false
                if(resp.minute){
                    this.dealData(resp.minute)
                }
            }).catch(error => {
                this.fullscreenLoading = false
                this.$message.error(error)
            })
        },
        dealData(list){
            for(var i = 0; i < list.length; i++){
                if(list[i].type == 2){
                    list[i]['isChoose'] = false
                    this.filllist.push(list[i])
                }else if(list[i].type == 1){
                    list[i]['isChoose'] = false
                    this.chooselist.push(list[i])
                }
            }
        },
        filterList(list){
            var newlist = []
            for(var i = 0; i < list.length; i++){
                if(list[i].isChoose){
                    var info = {
                        title:list[i].jobContent,
                        answer:[],
                        id:list[i].id
                    }
                    info['answer'] = this.dealAnswer(list[i].question_Pool_Answer,list[i].correct,list[i].type)
                    newlist.push(info)
                }
            }
            return newlist
        },
        dealAnswer(list,str,type){
            var newlist = []
            for(var i in list){
                if(i != 'id' && i != 'jobNumber' && i != 'pid'){
                    var reg = new RegExp(i.toUpperCase(),'gi');
                    var info = {
                        info:list[i],
                        name:i.toUpperCase()
                    }
                    if(type == 2){
                        info['isTrue'] = true
                    }else if(reg.test(str)){
                        info['isTrue'] = true
                    }else{
                        info['isTrue'] = false
                    }
                    newlist.push(info)
                }
            }
            return newlist
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
    padding-bottom: 53px;
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
    height: 40px;
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
