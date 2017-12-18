<template lang="html">
    <!-- 学生班级输入 -->
    <div class="getStudentClass">
        <div class="input line">
            <i class="iconfont icon-shouji"></i>
            <input type="text" placeholder="请输入班主任手机号" v-model='teacherPhone'>
            <i class="iconfont icon-youjiantou go" @click='getClassList'></i>
        </div>
        <div class="classBox" v-if="isClassShow">
            <div class="classInfo" v-show="listIsShow">
                <div class="title">请选择班级</div>
                <ul class="list">
                    <li v-for='(item,index) in classList' :class="{cGreen:index==isChoose}" @click='clickThis(index,item)'>{{item}}</li>
                </ul>
            </div>
            <div class="noClass" v-show="!listIsShow">
                没有该老师的班级信息
            </div>
        </div>

        <div class="btn next" @click='next'>下一步</div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            teacherPhone:'',
            listIsShow:true,
            classList:[],
            isChoose:'',
            classId:'',
            isClassShow:false
        }
    },
    methods:{
        getClassList(){
            if(this.teacherPhone !== ''){
                this.subPost(this.teacherPhone)
            }else{
                this.$message.error("请输入教师手机号")
            }
        },
        subPost(val){
            this.fullscreenLoading = true
            this.axios.get('/api/getClassInfo/'+val).then(response => {
                this.fullscreenLoading = false
                var res = response.data
                this.isClassShow = true
                if (res.list.length > 0) {
                    this.classList = res.list
      			}else{
                    this.listIsShow = false
      			}
            }).catch(error => {
                this.fullscreenLoading = false
                this.$message.error(error)
            })
        },
        clickThis(val,info){
            this.isChoose = val
            this.classId = info
        },
        next(){
            if(this.teacherPhone == ''){
                this.$message.error("请输入教师手机号")
            }else if(this.classId == ''){
                this.$message.error("请选择班级")
            }else{
                var info = {
                    phone: this.$route.query.telphone,
                    classId:this.classId
                }
                this.$route.push({path:'registerStudent',query:info})
            }
        }
    }
}
</script>

<style lang="css">
/* 输入框 */

.input>.go{
    cursor: pointer;
}
.input>.go:hover{
    color:#4ebbbc;
}

.getStudentClass>.classInfo{
    padding-top: 24px;
}
.getStudentClass>.classInfo>.title{
    width: 100%;
    line-height: 44px;
    border-bottom: 1px solid #aec0c3;
    font-size: 14.6px;
    color: #5d615e;
    text-align: left;
}
.list{
    font-size: 0;
    width: 100%;
    text-align: left;
}
.list>li{
    display: inline-block;
    vertical-align: top;
    padding: 10px;
    margin-top: 20px;
    margin-right: 17px;
    font-size: 15px;
    border-radius: 5px;
    border: 2px dashed;
    color: #909594;
    cursor: pointer;
}
.noClass{
    padding-top: 24px;
    width: 100%;
    line-height: 44px;
    font-size: 14.6px;
    color:#5d615e;
    text-align: left;
}
</style>
