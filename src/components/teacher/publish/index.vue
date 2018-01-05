<template lang="html">
    <div id="publish">
        <div class="publish" v-loading.fullscreen.lock="fullscreenLoading">
            <div class="content">
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
                        <router-view/>
                    </div>
                </section>
                <footer></footer>
            </div>
            <div class="aside">
                <div class="title">单选题</div>
                <div class="toLibrary" @click="toLibrary"><i class="iconfont icon-fangdajing"></i>题库找题</div>
                <div class="toImport"><i class="iconfont icon-xiazai"></i>文档载入</div>
                <div class="btnBox"><button class="preview" @click='preview'>{{text}}</button><button class="submit" @click="submit">提交</button></div>
            </div>
        </div>
        <addClass :info='submitInfo' v-show="isAddClassShow" @close="close"></addClass>
    </div>
</template>

<script>
import addClass from './add/addClass'
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
            isInputShow:true,
            isShow:false,        // 预览
            text:'预览',
            isAddClassShow:false,
            submitInfo:[]
        }
    },
    components:{addClass},
    mounted(){
        this.fullscreenLoading = true
        var teacherId = this.Util.getCookie('u_id')
        var t = this.Util.getLocalStorage('t')
        if(typeof(t) != 'undefined'){
            this.title = this.Base64.decode(t)
        }
        this.axios.get('/homework/CSM/'+teacherId+"/1").then(response => {
            var resp = response.data
            this.fullscreenLoading = false
            if(resp.list.length > 0){
                this.list = resp.list
                this.grade = resp.list[0]
                var info = {
                    g:this.grade,
                    c:this.ce,
                    u:this.hadUnit
                }
                this.Util.setLocalStorage('g',this.Base64.encode(JSON.stringify(info)))
            }
        }).catch(error => {
            this.fullscreenLoading = false
            this.$message.error(error)
        })
        this.getToken()
    },
    methods:{
        close(msg){
            this.isAddClassShow = false
        },
        submit(){
            this.submitInfo = this.unique(this.list)
            if(this.verify()){
                this.isAddClassShow = true
            }else{
                this.$message.error("请填写完整并选择正确答案")
            }
        },
        preview(){
            if(this.isShow){
                this.text = '预览'
                this.isShow = false
                this.$router.push("/teacher/box/publish/add/choose")
            }else{
                this.text = '返回修改'
                this.isShow = true
                this.$router.push("/teacher/box/publish/show/choose")
            }
        },
        toLibrary(){
            var info = {
                g:this.grade,
                c:this.ce,
                u:this.hadUnit
            }
            this.Util.setLocalStorage('g',this.Base64.encode(JSON.stringify(info)))
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
            var info = {
                g:this.grade,
                c:this.ce,
                u:this.hadUnit
            }
            this.Util.setLocalStorage('g',this.Base64.encode(JSON.stringify(info)))
        },
        chooseUnit(val){
            this.hadUnit = val
            this.isUnitShow = false
            var info = {
                g:this.grade,
                c:this.ce,
                u:this.hadUnit
            }
            this.Util.setLocalStorage('g',this.Base64.encode(JSON.stringify(info)))
        },
        inputChangeShow(val){
            if(val == 'editor'){
                this.isInputShow = false
                this.Util.setLocalStorage('t',this.Base64.encode(this.title))
            }else if(val == 'input'){
                this.isInputShow = true
            }
        },
        unique(array){
            var n = {}
            var arr = []
            for(var i = 0; i < array.length; i++){
                if(n.hasOwnProperty(array[i]['classGrade'])){
                    n[array[i]['classGrade']]['class'].push({name:array[i]['classChar'],id:array[i]['id'],isChoose:false,time:'',num:array[i]['className']})
                }else{
                    n[array[i]['classGrade']] = {
                        name:array[i]['gradeChar'],
                        id:array[i]['classGrade'],
                        class:[{name:array[i]['classChar'],id:array[i]['id'],isChoose:false,time:'',num:array[i]['className']}]
                    }
                }
            }
            for(var j in n){
                arr.push(n[j])
            }
            return arr;
        },
        verify(){
            var c = this.Util.getLocalStorage('c')
            var f = this.Util.getLocalStorage('f')
            var clist,flist
            typeof(c) != 'undefined' ? clist = JSON.parse(this.Base64.decode(c)) : clist = []
            typeof(f) != 'undefined' ? flist = JSON.parse(this.Base64.decode(f)) : flist = []
            if(this.title == ''){
                this.$message.error("请填写名称")
                return false
            }else if(clist.length == 0 && flist.length == 0){
                this.$message.error("请输入题目")
                return false
            }else if(this.verifyItem(clist) && this.verifyItem(flist)) {
                return true
            }else{
                return false
            }
        },
        verifyItem(list){
            for(var i = 0; i < list.length; i++){
                if(list[i].title == ''){
                    return false
                }else if(list[i].answer.length == 0){
                    return false
                }else{
                    var n = 0;
                    for(var j = 0; j < list[i].answer.length; j++){
                        if(list[i].answer[j].info == ''){
                            return false
                        }else if(list[i].answer[j].isTrue){
                            n++
                        }
                    }
                    if(n == 0){
                        return false
                    }
                }
            }
            return true
        },
        getToken(){
            this.axios.get('/getToken').then(response => {
                var resp = response.data
                this.Util.setLocalStorage('token',this.Base64.encode(resp))
            }).catch(error => {
                this.$message.error(error)
            })
        }
    }
}
</script>

<style lang="css">
.publish{
    width: 920px;
    display: flex;
    justify-content: space-between;
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
