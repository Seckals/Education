<template>
    <div class="list"  v-loading.fullscreen.lock="fullscreenLoading">
        <header>
            <div class="classes" @blur="isblur" tabindex="1">
                <span class="searchTitle cursor" @click="showList('classes')" :class='{titleActive:isClassRotate}'>
                    {{className}}<i class="el-icon-arrow-down rotate" :class="{rotate180:isClassRotate,rotate0:!isClassRotate}"></i>
                </span>
                <ul v-show='isClassRotate'>
                    <li v-for="item in classList" @click="changeStatus('classes',item.id,item.gradeChar+item.classChar)">{{item.gradeChar}}{{item.classChar}}</li>
                </ul>
            </div>
            <div class="status" @blur="isblur" tabindex="1">
                <span class="searchTitle cursor" @click="showList('status')" :class='{titleActive:isStatusRotate}'>
                    {{statusStr}}<i class="el-icon-arrow-down rotate" :class="{rotate180:isStatusRotate}"></i>
                </span>
                <ul v-show='isStatusRotate'>
                    <li @click="changeStatus('status',0,'全部')">全部</li>
                    <li @click="changeStatus('status',2,'待检查')">待检查</li>
                    <li @click="changeStatus('status',1,'已检查')">已检查</li>
                </ul>
            </div>
        </header>
        <section>
            <ul class="listBox">
                <li class="listItem" v-for="(item,index) in homeworkList">
                    <div class="time">
                        <span class="className">{{item.education_Grade_And_Class.gradeChar}}{{item.education_Grade_And_Class.classChar}}</span>
                        <span class="day">{{item.createTime | dealTime}}</span>
                        <span class="week">{{item.week}}</span>
                        <span class="date">{{item.createTime | getHours}}</span>
                    </div>
                    <div class="listItemContant">
                        <div class="unit">
                            <span class="w250">
                                单元: {{item.homework_Job_Father.element}}
                            </span>
                            <span class="itemStatus"><i class="iconfont icon-dian-copy-copy"></i>{{item.check | changeStatus}}</span>
                            <span class="finishPeople">
                                <span>{{item.finishPeople}}</span>/{{item.education_Grade_And_Class.peopleNumber}}人
                            </span>
                        </div>
                        <div class="itemInfo clearfix">
                            <span class="w370">内容: {{item.homework_Job_Father.jobName}}</span>
                            <span class="c28b3b4 f14">已完成</span>
                            <button class="fr" @click="showInfo(item)">查看</button>
                        </div>
                        <div class="dataTime">
                            <span>日期: {{item.startTime}} -- {{item.endTime}}</span>
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
            isStatusRotate:false,
            fullscreenLoading:false,
            status:0,
            classId:'Null',
            statusStr:'全部',
            className:'全部',
            homeworkList:[],
            classList:[]
        }
    },
    mounted(){
        this.getClassList()
        this.getHomeworkList()
    },
    filters:{
        dealTime:function(val) {
            var YMD = val.split(" ")[0]
            var time = val.split(" ")[1]
            var date = new Date(YMD)
            var date1 = new Date()
            var year = date.getFullYear()
            var year1 = date1.getFullYear()
            var month = date.getMonth() + 1
            var month1 = date1.getMonth() + 1
            var day =date1.getDate() - date.getDate()
            if(year != year1 || month != month1 || day>2){
                return YMD
            }else {
                if(day = 2){
                    return '前天'
                }else if(day = 1){
                    return '昨天'
                }else if(day = 0){
                    return '今天'
                }
            }
        },
        getHours:function(val){
            return val.split(" ")[1]
        },
        getMDHM:function(val){
            return
        },
        changeStatus:function(val){
            var word = ['','已检查','待检查']
            return word[val]
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
        },
        changeStatus(type,val,str){
            if(type == 'status'){
                this.status = val
                this.statusStr = str
            }else if(type == 'classes'){
                this.className = str
                this.classId = val
            }
            this.isblur()
            this.getHomeworkList()
        },
        isblur(){
            this.isClassRotate = false
            this.isStatusRotate = false
        },
        showInfo(item){
            this.$router.push({path:'info',query:item})
        },
        getClassList(){
            this.fullscreenLoading = true
            var teacherId = this.Util.getCookie('u_id')
            var subjectId = this.Util.getCookie('s_id')
            this.axios.get('/homework/CSM/'+teacherId+"/"+subjectId).then(response => {
                var resp = response.data
                this.fullscreenLoading = false
                if(resp.list){
                    this.classList = resp.list
                    this.classList.unshift({classChar:"部",gradeChar:"全",id:"Null"})
                }
            }).catch(error => {
                this.fullscreenLoading = false
                this.$message.error(error)
            })
        },
        getHomeworkList(){
            this.fullscreenLoading = true
            var teacherId = this.Util.getCookie('u_id')
            this.axios.get('/homework/findPublishDetail/1/'+teacherId+"/"+this.status+"/"+this.classId).then(response => {
                var resp = response.data
                this.fullscreenLoading = false
                if(resp.list){
                    this.homeworkList = resp.list
                }
            }).catch(error => {
                this.fullscreenLoading = false
                this.$message.error(error)
            })
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
.list>header>.status li,.list>header>.classes li{
    cursor: pointer;
}
.list>header>.status li:hover,.list>header>.classes li:hover{
    background: #e8efeb;
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
