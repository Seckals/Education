<template lang="html">
    <!-- 学生班级输入 -->
    <div class="getStudentClass">
        <div class="input line">
            <i class="iconfont icon-shouji"></i>
            <input type="text" placeholder="请输入班主任手机号" v-model='teacherPhone'>
            <i class="iconfont icon-youjiantou go" @click='getClassList'></i>
        </div>
        <div class="classInfo" v-show="listIsShow">
            <div class="title">请选择班级</div>
            <ul class="list">
                <li v-for='(item,index) in classList' :class="{cGreen:index==isChoose}" @click='clickThis(index,item)'>{{item}}</li>
            </ul>
            <div class="btn next" @click='next'>下一步</div>
        </div>
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
            classId:''
        }
    },
    methods:{
        getClassList(){
            this.fullscreenLoading = true
            this.axios.post('/account/Login',{'username':this.username,'password':this.password}).then(response => {
                var res = response.data
                if (res == 1) {
                    // 跳入老师主页
                    this.$message.success("登录老师页面成功")
  			  }else if(res == 2){
                    // 跳入学生主页
                    this.$messag.success("登录学生页面成功")
  			  }else if(res == 40000){
                    this.$message.warning("对不起，用户名或密码错误")
  			  }
            }).catch(error => {
                this.$message.error(error)
            })
        },
        clickThis(val,info){
            this.isChoose = val
            this.classId = info
        },
        next(){
            if(classId == ''){
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
</style>
