<template lang="html">
    <div class="homeworkInfo" v-loading.fullscreen.lock="fullscreenLoading">
        <ul class="choose" v-if="chooselist.length > 0">
            <li class="title">选择题</li>
            <li class="finishLv">
                <span>{{chooseAverage}}%</span>
                平均准确率
            </li>
            <li class="theader">
                <div class="hnumber">题号</div>
                <div class="hlv">准确率</div>
                <div class="hdeal">操作</div>
            </li>
            <li v-for="(item,index) in chooselist">
                <div class="hnumber">第{{index+1}}题</div>
                <div class="hlv"><el-progress :text-inside="true" :stroke-width="18" :percentage="item.accuracyRate | toNumBer"></el-progress></div>
                <div class="hdeal">
                    <span @click="showInfo(item.id)">查看</span>
                </div>
            </li>
        </ul>
        <ul class="fill" v-if="filllist.length > 0">
            <li class="title">填空题</li>
            <li class="finishLv">
                <span>{{fillAverage}}%</span>
                平均准确率
            </li>
            <li class="theader">
                <div class="hnumber">题号</div>
                <div class="hlv">准确率</div>
                <div class="hdeal">操作</div>
            </li>
            <li v-for="(item,index) in filllist">
                <div class="hnumber">第{{index+1}}题</div>
                <div class="hlv"><el-progress :text-inside="true" :stroke-width="18" :percentage="item.accuracyRate | toNumBer"></el-progress></div>
                <div class="hdeal">
                    <span @click="showInfo(item.id)">查看</span>
                </div>
            </li>
        </ul>
        <info v-show="isInfoShow" :info='itemInfo' @close="close"></info>
    </div>
</template>

<script>
import info from './questionInfo'
export default {
    data(){
        return {
            chooselist:[],
            filllist:[],
            isInfoShow:false,
            fullscreenLoading:false,
            chooseAverage:0,
            fillAverage:0,
            chooseNumber:0,
            fillNumber:0,
            itemInfo:''
        }
    },
    components:{info},
    mounted(){
        this.getList()
    },
    filters:{
        toNumBer(val){
            return isNaN(parseFloat(val))?0:parseFloat(val)
        }
    },
    methods:{
        close(msg){
            this.isInfoShow = msg
        },
        showInfo(id){
            this.fullscreenLoading = true
            this.axios.get('/homework/ectypeone/'+id).then(response => {
                var resp = response.data
                this.fullscreenLoading = false

                if(resp.list){
                    resp.list['amount'] = this.$route.query.amount
                    this.itemInfo = resp.list
                    this.itemInfo.homework_Job_Answer = this.resetAnswer(resp.list.correct,resp.list.homework_Job_Answer)
                    this.isInfoShow = true
                }
            }).catch(error => {
                this.fullscreenLoading = false
                this.$message.error(error)
            })
        },
        resetAnswer(str,list){
            if(list != ''){
                var newList = {}
                if(str != ''){
                    for(var i in list){
                        if(i != 'id'){
                            var itemInfo = {}
                            itemInfo['info'] = list[i]
                            if((","+str+",").indexOf(','+i.toUpperCase()+',')!=-1){
                                itemInfo['isTrue'] = true
                            }else{
                                itemInfo['isTrue'] = false
                            }
                            newList[i] = itemInfo
                        }else{
                            newList[i] = list[i]
                        }
                    }
                    return newList
                }else{
                    for(var i in list){
                        if(i != 'id'){
                            var itemInfo = {}
                            itemInfo['info'] = list[i]
                            itemInfo['isTrue'] = false
                            newList[i] = itemInfo
                        }else{
                            newList[i] = list[i]
                        }
                    }
                    return newList
                }
            }else{
                return {}
            }
        },
        getList(){
            this.fullscreenLoading = true
            this.axios.get('/homework/ectypeall/'+this.$route.query.id).then(response => {
                var resp = response.data
                this.fullscreenLoading = false
                if(resp.list){
                    this.dealList(resp.list)
                }
            }).catch(error => {
                this.fullscreenLoading = false
                this.$message.error(error)
            })
        },
        dealList(list){
            var chooseRoteCommon = 0
            var fillRoteCommon = 0
            for(var i = 0; i < list.length; i++){
                var rate = isNaN(parseFloat(list[i].accuracyRate))?0:parseFloat(list[i].accuracyRate)
                if(list[i].type == 1){
                    this.chooseNumber ++
                    chooseRoteCommon += rate
                    this.chooselist.push(list[i])
                }else if(list[i].type == 2){
                    this.fillNumber ++
                    fillRoteCommon += rate
                    this.filllist.push(list[i])
                }
            }
            this.chooseAverage = ((chooseRoteCommon*100 / this.chooseNumber) == 0)?0:(chooseRoteCommon / this.chooseNumber*100).toFixed(2)
            this.fillAverage = ((fillRoteCommon*100 / this.fillNumber) == 0)?0:(fillRoteCommon / this.fillNumber*100).toFixed(2)
        }
    }
}
</script>

<style lang="css">
.homeworkInfo{
    width: 100%;
    padding-top:20px;
}
.homeworkInfo>.choose{
    margin-bottom: 30px;
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
    background: rgba(0,0,0,0.05);
}
.homeworkInfo .finishLv{
    font-size:15px;
    color:#54abaa;
    text-indent: 10px;
    height: 47px;
    line-height: 47px;
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
.el-progress-bar__outer{
    border-radius: 0 !important;
    background-color: rgba(0, 0, 0, 0.05) !important;
}
.el-progress-bar__inner{
    border-radius: 0 !important;
    background-color: #28b3b4 !important;
}
.el-progress-bar__innerText{
    color:#000 !important;
}
</style>
