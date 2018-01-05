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
                <div class="btn login" @click="submit" v-loading.fullscreen.lock="fullscreenLoading">登陆</div>
                <div class="footer">
                    <router-link :to="{ path: 'register', query: {type:'teacher'} }">免费注册</router-link>
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
        password:'',
        fullscreenLoading:false
    }
  },
  mounted(){
      document.body.addEventListener('keyup', this.login, false)
  },
  methods: {
      login(e){
          if(e.keyCode == 13){
              this.submit()
          }
      },
      submit(){
          if(this.username == '' || this.password == ''){
              this.$message.error("请输入用户名或密码")
          }else{
              this.send()
          }
      },
      send(){
          this.fullscreenLoading = true
          this.axios.post('/account/Login',this.qs.stringify({'username':this.username,'password':this.password})).then(response => {
              var res = response.data
              if(res == 40000){
                  this.fullscreenLoading = false
                  this.$message.warning("对不起，用户名或密码错误")
			  }else{
                  this.axios.get('/account/detail').then(response => {
                      var resp = response.data
                      this.fullscreenLoading = false
                      if(resp.account){
                          this.Util.setCookie('u',this.username)
                          this.Util.setCookie('u_id',resp.account.id)
                          this.Util.setCookie('s_id',resp.account.subjectId)
                          if (res == 1) {
                              this.$router.push('/teacher')
            			  }else if(res == 2){
                              this.$router.push('/student')
            			  }
                      }else{
                          this.$message.error("获取用户信息失败")
                      }
                  }).catch(error => {
                      this.fullscreenLoading = false
                      this.$message.error(error)
                  })
              }
          }).catch(error => {
              this.fullscreenLoading = false
              this.$message.error(error)
          })
      }
  },
  beforeDestroy() {
    document.body.removeEventListener('keyup', this.login)
  }
}
</script>

<style>
#login{
    width: 100%;
    height: 100%;
    padding-top: 97px;
    box-sizing: border-box;
}
#login>.content{
    width: 410px;
    height: 470px;
    margin: 0 auto;
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
