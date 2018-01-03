<template lang="html">
    <ul class="libraryChoose" v-loading.fullscreen.lock="fullscreenLoading">
        <li v-for="(item,index) in list">
            <div class="item">
                <div class="itemBox">
                    <div class="title">{{index+1}}:{{item.jobContent}}</div>
                    <div class="item" v-for="(ite,index) in item.question_Pool_Answer" v-if="index != 'id' && index != 'jobNumber' && index != 'pid' ">{{index}}:{{ite}}</div>
                </div>
                <div class="btns">
                    <button v-if='!item.isChoose' @click='isChoose(item,true)'><i class="iconfont icon-add" ></i>选入</button>
                    <button v-if='item.isChoose' class="remove" @click='isChoose(item,false)'>移除</button>
                </div>
            </div>
            <div class="line"></div>
        </li>
    </ul>
</template>

<script>
export default {
    data(){
        return {
            fullscreenLoading:false,
            list:[],
            isChooseList:[]
        }
    },
    props:['sendInfo'],
    watch:{
        sendInfo(){
            if(this.sendInfo.type == 'f'){
                this.getlist()
            }
        }
    },
    mounted(){
        this.getlist()
    },
    methods:{
        getlist(){
            this.fullscreenLoading = true
            this.axios.post('/question/findAllMinute',this.qs.stringify(this.sendInfo)).then(response => {
                var resp = response.data
                this.fullscreenLoading = false
                if(resp.minute){
                    this.list = this.dealData(resp.minute)
                }
            }).catch(error => {
                this.fullscreenLoading = false
                this.$message.error(error)
            })
        },
        dealData(list){
            var newlist = []
            for(var i = 0; i < list.length; i++){
                if(list[i].type == 2){
                    list[i]['isChoose'] = false
                    newlist.push(list[i])
                }
            }
            return newlist
        },
        isChoose(item,val){
            item.isChoose = val
        }
    }
}
</script>
