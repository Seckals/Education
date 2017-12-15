<template lang="html">
    <!-- 教师信息输入 -->
    <div class="getTeacherInfo">
        <div class="input line">
            <i class="iconfont icon-sfz"></i>
            <input type="text" placeholder="请输入工号" v-model='jobNumber'>
        </div>
        <div class="input line">
            <i class="iconfont icon-mima"></i>
            <input type="text" placeholder="请输入密码" v-model='password'>
        </div>
        <div class="btn next" @click='submitTeacher'>提交</div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            jobNumber:'',
            password:''
        }
    },
    methods:{
        submitTeacher(){
            if(this.jobNumber == ''){
                this.$message.error("请输入工号")
            }else if(this.password == ''){
                this.$message.error("请输入密码")
            }else{
                var info = {
                    phone:this.$route.query.telphone,
                    userName:this.$route.query.telphone,
                    passWord: this.passWord,
                    gh: this.jobNumber
                }
                this.submit(info)
            }
        },
        submit(info){
            this.fullscreenLoading = true
            this.axios.post('/account/Login',info).then(response => {
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
        }
    }
}
</script>

<style lang="css">
</style>
