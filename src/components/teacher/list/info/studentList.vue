<template lang="html">
    <div class="studentList" v-loading.fullscreen.lock="fullscreenLoading">
        <ul v-if="list.length > 0">
            <li class='theader'>
                <span class="name">姓名</span>
                <span class="number">学号</span>
                <span class="rotelv">正确率</span>
                <span class="finishtime">完成时间(min)</span>
                <span class="didtime">完成用时(min)</span>
            </li>
            <li v-for="item in list">
                <span class="name">{{item.userName}}</span>
                <span class="number">{{item.studNo}}</span>
                <span class="rotelv">
                    <span v-if="item.accuracyRate">{{item.accuracyRate}}</span>
                    <span v-if="!item.accuracyRate">无</span>
                </span>
                <span class="finishtime">
                    <span v-if="item.timeRange">{{item.timeRange}}</span>
                    <span v-if="!item.timeRange">无</span>
                </span>
                <span class="didtime">
                    <span v-if="item.finishTime">{{item.finishTime}}</span>
                    <span v-if="!item.finishTime">无</span>
                </span>
            </li>
        </ul>
        <div class="btns">
            <button class="check" @click="check" :class="{hadCheck:isCheck}">审查</button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            list:[],
            fullscreenLoading:false,
            isCheck:false
        }
    },
    mounted(){
        this.getList(this.$route.query.id)
        if(this.$route.query.check == 1){
            this.isCheck = true
        }
    },
    methods:{
        check(){
            this.fullscreenLoading = true
            if(!this.isCheck){
                this.axios.get('/homework/check/'+this.$route.query.id).then(response => {
                    var resp = response.data
                    this.fullscreenLoading = false
                    if(resp == 'success'){
                        this.$message.success("审核成功")
                        this.isCheck = true
                    }
                }).catch(error => {
                    this.fullscreenLoading = false
                    this.$message.error(error)
                })
            }
        },
        getList(id){
            this.fullscreenLoading = true
            this.axios.get('/homework/findOneClassYORNO/'+id).then(response => {
                var resp = response.data
                this.fullscreenLoading = false
                this.list = resp.n.concat(resp.y)
                this.$emit("getMsg",resp.sum_People)
            }).catch(error => {
                this.fullscreenLoading = false
                this.$message.error(error)
            })
        }
    }
}
</script>

<style lang="css">
.studentList{
    padding-top: 20px;
    padding-bottom: 34px;
    min-height: 390px;
    position: relative;
}
.studentList,.studentList>ul,.studentList>ul>li{
    width: 100%;
}
.studentList>ul>li{
    font-size: 0;
    height: 42px;
    line-height: 42px;
    text-align: left;
}
.studentList>ul>li:nth-child(2n){
    background: #d7e9df;
}
.studentList>ul>.theader{
    border-top: 1px solid #bdc5c1;
    border-bottom: 1px solid #bdc5c1;
}
.studentList>ul>.theader>span{
    font-weight: bold;
}
.studentList>ul>li>span{
    display: inline-block;
    vertical-align: top;
    font-size: 16px;
    box-sizing: border-box;
    text-align: center;
}
.studentList>ul>li>.name{
    width: 130px;
}
.studentList>ul>li>.number{
    width: 150px;
}
.studentList>ul>li>.rotelv{
    width: 130px;
}
.studentList>ul>li>.finishtime{
    width: 220px;
}
.studentList>ul>li>.didtime{
    width: 190px;
}
.btns{
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 0;
}
.btns>.check {
    width: 89px;
    height: 34px;
    background: #ed6a47;
    border-radius: 7px;
    box-shadow: 1px 1px 1px #acbbaf;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
}
.btns>.check:hover{
    background: #ed6a30;
}
.hadCheck{
    background: rgb(189, 195, 191) !important;
}
</style>
