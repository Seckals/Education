<template lang="html">
    <div id="register">
        <img src="./img/register_logo.png">
        <div class="part">
    		<div class="partItem" @click="choosePart('teacher')">
    			<div class="portrait" :class="{tChoose:isChoose,tNChoose:!isChoose}"></div>
    			<p>我是老师</p>
    		</div>
    		<div class="partItem" @click="choosePart('student')">
    			<div class="portrait" :class="{sChoose:!isChoose,sNChoose:isChoose}"></div>
    			<p>我是学生</p>
    		</div>
    	</div>
        <!-- 验证手机号 -->
        <div class="getPhone" v-if="type==1">
            <div class="tel line">
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
        <!-- 教师信息输入 -->
        <div class="getTeacherInfo" v-if="type==2">
            <div class="tel line">
        		<i class="iconfont icon-sfz"></i>
        		<input type="text" placeholder="请输入工号" v-model='jobNumber'>
        	</div>
            <div class="tel line">
        		<i class="iconfont icon-mima"></i>
        		<input type="text" placeholder="请输入密码" v-model='password'>
        	</div>
            <div class="btn next" @click='submitTeacher'>提交</div>
        </div>
        <!-- 学生班级输入 -->
        <div class="getStudentClass" v-if="type==3">
            <div class="tel line">
        		<i class="iconfont icon-shouji"></i>
        		<input type="text" placeholder="请输入班主任手机号" v-model='teacherPhone'>
                <i class="iconfont icon-youjiantou go" @click='getClassList'></i>
        	</div>
            <div class="classInfo" v-show="listIsShow">
                <div class="title">请选择班级</div>
                <ul class="list">
                    <li v-for='item in classList' :class="{cGreen:item.isChoose}" @click='clickThis(item)'>{{item}}</li>
                </ul>
                <div class="btn next" @click='stNext'>下一步</div>
            </div>
        </div>
        <!-- 学生信息输入 -->
        <div class="getStudentClass" v-if="type==4">
            <div class="tel line">
        		<i class="iconfont icon-sfz"></i>
        		<input type="text" placeholder="请输入学号" v-model='stNumber'>
        	</div>
            <div class="tel line">
        		<i class="iconfont icon-mima"></i>
        		<input type="text" placeholder="请输入密码" v-model='stPassword'>
        	</div>
            <div class="btn next" @click='submitStudent'>提交</div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            isChoose:true,  // 角色图片改变的参数
            part:'teacher', // 选中角色
            telphone:'',    // 注册手机号
            code:'',        // 输入的验证码
            isCodeShow:true,    // 倒计时是否显示
            count:50,       // 倒计时秒数
            timer:null,     // 计时器
            creatCode:'',   // 生成的验证码
            jobNumber:'',   // 工号
            password:'',    // 设置的密码
            teacherPhone:'', // 班主任手机号
            type:3,          // 区分各个部分
            classList:['三年级二班'],    //班主任对应的班级
            isClick:false,  // 选中状态参数
            classInfo:{},    // 选中班级信息
            stNumber:'',    // 学生学号
            stPassword:'',   // 学生密码
            listIsShow:false // 班级列表是否显示
        }
    },
    methods:{
        choosePart(val){
            this.isChoose = !this.isChoose
            if(val === 'teacher'){
                this.part = 'teacher'
            }else if(val === 'student'){
                this.part = 'student'
            }
        },
        getCode(){
            this.code = this.creatCode = 123
            this.isCodeShow = false
            this.countDown()
        },
        countDown(){
            var _this = this
            this.timer = setInterval(function(){
                if(_this.count<=0){
                    _this.timer = null
                }else{
                    _this.count--
                }
            },1000)
        },
        next(){
            if(this.code == this.creatCode){
                if(this.part == 'teacher'){
                    this.type = 2
                }else{
                    this.type = 3
                }
            }else{
                this.$message.warning("验证码输入错误,请重新输入")
            }
        },
        submitTeacher(){

        },
        submitStudent(){

        },
        clickThis(){
            this.isClick = true
        },
        stNext(){
            this.type = 4
        },
        getClassList(){

        }
    }
}
</script>

<style lang="css">
#register{
    width: 360px;
    min-height: 470px;
    margin:120px auto 0;
    text-align: center;
}
/* 选择角色 */
#register>.part{
    margin-top: 50px;
    width: 100%;
    height: 100px;
    font-size: 0;
    text-align: left;
    border-bottom: 1px solid #a6a9a7;
}
#register>.part>.partItem{
    display: inline-block;
    vertical-align: top;
    width: 66px;
    height: 85px;
    font-size: 16px;
    cursor: pointer;
    margin-left: 76px;
    text-align: center;
}
#register>.part>.partItem>.portrait{
    width: 45px;
    height: 55px;
    margin: 0 auto 14px;
    background: url(./img/regesterIcon.png) no-repeat;
}
#register>.part>.partItem>.tChoose{
    background-position: -45px 0;
}
#register>.part>.partItem>.tNChoose{
    background-position: 0 0;
}
#register>.part>.partItem>.sChoose{
    background-position: -46px -55px;
}
#register>.part>.partItem>.sNChoose{
    background-position: 0 -55px;
}
/* 输入框 */
#register .tel{
    margin-top: 27px;
}
#register .tel,#register .code{
    line-height: 36px;
    color:#acbbbe;
    font-size: 0;
}
#register .tel>input,#register .code>input{
    height: 100%;
    background: transparent;
    font-size:15px;
    vertical-align: top;
    width: 260px;
}
#register .tel>.go{
    cursor: pointer;
}
#register .tel>.go:hover{
    color:#4ebbbc;
}
#register .tel>i,#register .code>i{
    font-size: 23px;
    margin:0 11px 0 12px;
}
#register .codeBox{
    margin-top: 22px;
    font-size:0;
    text-align: left;
}
#register .codeBox>div{
    display: inline-block;
    vertical-align: top;
}
#register .codeBox .getCode{
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
/* 下一步 */
#register .next{
    width: 356px;
    height: 38px;
    line-height: 38px;
    margin-top: 30px;
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
