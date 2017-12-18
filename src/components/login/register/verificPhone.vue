<template lang="html">
    <!-- 验证手机号 -->
    <div class="getPhone">
        <div class="input line">
            <i class="iconfont icon-shouji"></i>
            <input type="text" placeholder="请输入手机号码" v-model='telphone'>
        </div>
        <div class="codeBox">
            <div class="code line">
                <i class="iconfont icon-anquandunpai"></i>
                <input type="text" placeholder="请输入验证码" v-model='code'>
            </div>
            <div class="btn getCode" @click='getCode' v-show='isCodeShow'>获取验证码</div>
            <div class="countDown" v-show='!isCodeShow'>{{count}}秒后重发</div>
        </div>
        <div class="btn next" @click='next'>下一步</div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            telphone:'',
            code:'',
            isCodeShow:true,
            count:50,
            timer:null
        }
    },
    methods:{
        getCode(){
            if(this.telphone ==''){
                this.$message.error("请输入手机号")
            }else{
                this.isCodeShow = false
                var _this = this
                this.timer = setInterval(function(){
                    if(_this.count < 1) {
                        clearInterval(_this.timer)
                        _this.isCodeShow = true
                    }else{
                        _this.count--
                    }
                },1000)
            }
        },
        next(){
            if(this.telphone ==''){
                this.$message.error("请输入手机号")
            }else{
                if(this.$route.query.type == 'teacher'){
                    this.$router.push({path:'registerTeacher',query:{telphone:this.telphone}})
                }else if(this.$route.query.type == 'student'){
                    this.$router.push({path:'registerClass',query:{telphone:this.telphone}})
                }
            }
        }
    }
}
</script>

<style>
/* 输入框 */
.input{
    margin-top: 27px;
}
.input,.getPhone>.codeBox>.code{
    line-height: 36px;
    color:#acbbbe;
    font-size: 0;
}
.input>input,.getPhone>.codeBox>.code>input{
    height: 100%;
    background: transparent !important;
    font-size:15px;
    vertical-align: top;
    width: 260px;
}
.getPhone>.codeBox>.code>input{
    width: 200px !important;
}
.input>i,.getPhone>.codeBox>.code>i{
    font-size: 23px;
    margin:0 11px 0 12px;
}
.getPhone>.codeBox{
    margin-top: 22px;
    font-size:0;
    text-align: left;
}
.getPhone>.codeBox>div{
    display: inline-block;
    vertical-align: top;
}
.getPhone>.codeBox .getCode{
    font-size: 15px;
    width: 93px;
    height: 33px;
    line-height: 33px;
    margin:1px 0 0 18px;
}
.countDown{
    font-size: 15px;
    width: 93px;
    height: 33px;
    line-height: 33px;
    margin: 1px 0 0 18px;
    cursor: pointer;
    background: #ffffff;
    text-align: center;
    border-radius: 6px;
    font-size: 15px;
    box-shadow: 1px 1px 1px #a7c1c1;
}
.line{
    border: 1px solid #acbbbe;
    border-radius: 6px;
    height: 34px;
    text-align: left;
}
.next{
    width: 356px;
    height: 38px;
    line-height: 38px;
    margin-top: 30px;
}
</style>
