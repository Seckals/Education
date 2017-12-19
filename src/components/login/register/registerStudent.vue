<template lang="html">
    <!-- 学生信息输入 -->
    <div class="getStudentClass">
        <div class="input line">
            <i class="iconfont icon-sfz"></i>
            <input type="text" placeholder="请输入学号" v-model='number'>
        </div>
        <div class="input line">
            <i class="iconfont icon-mima"></i>
            <input type="text" placeholder="请输入密码" v-model='password'>
        </div>
        <div class="btn next" @click='submitStudent' v-loading.fullscreen.lock="fullscreenLoading">提交</div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            number:'',
            password: '',
            fullscreenLoading:false
        }
    },
    methods:{
        submitStudent(){
            var reg = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,16}$/
            if(this.number == ''){
                this.$message.error("学号不能为空")
            }else if(this.password == ''){
                this.$message.error("密码不能为空")
            }else if(reg.test(this.password)){
                this.$message.error("密码格式不正确")
            }else{
                var info = this.$router.query
                console.log(info)
                info['userName'] = info.phone
                info['passWord'] = this.password
                info['studNo'] = this.number
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
