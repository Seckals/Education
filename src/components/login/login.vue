<template lang="html">
    <div id="login">
        <div class="content">
             <img src="./img/loginIcon.png">
             <div class="panel">
                <div class="item">
                    <i class="iconfont icon-shouji"></i>
                    <input type="text" placeholder="请输入手机号码" v-model="username">
                </div>
                <div class="item">
                    <i class="iconfont icon-mima"></i>
                    <input type="password" placeholder="请输入密码" v-model="password">
                </div>
                <div class="btn login" @click="submit">登陆</div>
                <div class="footer">
                    <a @click='register'>免费注册</a>
                    <span>|</span>
                    <a>忘记密码</a>
                </div>
            </div>
            <div class="code">
                <img src="./img/code.jpg" alt="扫一扫关注公众号">
                <p>扫一扫关注公众号</p>
            </div>
        </div>
        <div class="copyICP">
            <a href="http://www.miitbeian.gov.cn/ ">© 2017 eduvenus.com  沪ICP备17010294号</a>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
        username:'',
        password:''
    }
  },
  methods: {
      register(){
          this.$emit('register',false)
      },
      submit(){
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
      }
  }
}
</script>

<style lang="css" scoped>
#login>.content{
    width: 410px;
    height: 470px;
    margin: 97px auto 0;
    position: relative;
    text-align: center;
}
#login>.content>.panel{
    width: 396px;
    height: 212px;
    border-radius: 8px;
    box-shadow: 1px 1px 1px #b2b7b8;
    background: #fff;
    margin: 13px auto 0;
    padding-top: 30px;
}
#login>.content>.panel>.item{
    border-radius: 6px;
    height: 34px;
    width: 352px;
    line-height: 34px;
    border: 1px solid #b1b6b2;
    margin: 0 auto 22px;
    font-size:0;
}
#login>.content>.panel>.item>i{
    font-size:23px;
    margin:0 10px;
}
#login>.content>.panel>.item>input{
    height: 100%;
    vertical-align: top;
    width: 300px;
    font-size:15px;
}
#login>.content>.panel>.login{
    width: 356px;
    height: 38px;
    line-height: 38px;
    margin:0 auto;
}
#login>.content>.panel>.footer{
    text-align: center;
    margin-top: 20px;
}
#login>.content>.panel>.footer>a{
    color: #4ea7a8 !important;
    cursor: pointer;
}
#login>.content>.panel>.footer>a:hover{
    text-decoration: underline;
}
#login>.content>.code {
    text-align: center;
    font-size: 14px;
    padding-top: 10px;
    position: absolute;
    top: 270px;
    right: -112px;
    line-height: 20px;
}
#login>.content>.code>img{
    width: 100px;
    height: 100px;
}
#login>.copyICP{
    color: #93999F;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    font-size: 15px;
    line-height: 30px;
}
</style>
