<template lang="html">
    <div class="addClass">
        <div class="addClassContent">
            <header>
                <i class="iconfont icon-guanbi1" @click='close'></i>
            </header>
            <section class="noClass" v-if="info.length == 0">
                目前你没有可以分配的班级,请联系管理员给你分配班级
            </section>
            <section v-if="info.length > 0">
                <div class="label">选择完成时间</div>
                <div class="timeBox"><input type="text" v-model="range">分钟</div>
                <div class="label">选择布置班级</div>
                <div class="classBox">
                    <ul class="gradeBox">
                        <li :class="{active:active==index}" v-for="(item,index) in info" @click="toggle('grade',item,index)">{{item.name}}</li>
                    </ul>
                    <ul class="clasBox">
                        <li :class="{active:item.isChoose}" v-for="item in classList" @click="toggle('class',item)"><i class="iconfont" :class="{'icon-duihao':item.isChoose}"></i>{{item.name}}</li>
                    </ul>
                </div>
                <div class="label" >选择起始时间</div>
                <div class="setFinishTime">
                    <ul v-for="item in info">
                        <li v-for="ite in item.class" v-if='ite.isChoose'>
                            <div class="label">{{item.name}}{{ite.name}}</div>
                            <div class="time">
                                <el-date-picker
                                    v-model='ite.time'
                                    type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    value-format='yyyy-MM-dd HH:mm:ss'
                                    end-placeholder="结束日期">
                                </el-date-picker>
                            </div>
                        </li>
                    </ul>
                </div>
                <footer class="btns">
                    <button class="submit" @click="submit">提交</button>
                    <button class="cancel" @click='close'>取消</button>
                </footer>
            </section>

        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            range:'',
            active:0,
            word:['A','B','C','D','E','F','G'],
            classList:[]
        }
    },
    props:['info'],
    watch:{
        info(){
            if(this.info.length>0){
                this.classList=this.info[0].class
            }
        }
    },
    methods:{
        submit(){
            this.dealSubmitData()
        },
        toggle(str,info,i){
            if(str == 'grade'){
                this.active = i
                this.classList = info.class
            }else if(str == 'class'){
                if(info.isChoose){
                    info.isChoose = false
                }else{
                    info.isChoose = true
                }
            }
        },
        close(){
            this.$emit('close',false)
        },
        dealSubmitData(){
            var cstr = this.Util.getLocalStorage('c')
            var fstr = this.Util.getLocalStorage('f')
            var gstr = this.Util.getLocalStorage('g')
            var tstr = this.Util.getLocalStorage('t')
            var c,f,g,t,chooseInfo,fillInfo,hacj
            typeof(cstr) != 'undefined'?c = JSON.parse(this.Base64.decode(cstr)):c=[]
            typeof(fstr) != 'undefined'?f = JSON.parse(this.Base64.decode(fstr)):f=[]
            typeof(gstr) != 'undefined'?g = JSON.parse(this.Base64.decode(gstr)):g={}
            typeof(tstr) != 'undefined'?t = JSON.parse(this.Base64.decode(tstr)):t=''
            chooseInfo = this.dealChooseList(c,g.c,g.u)
            fillInfo = this.dealFillList(f,g.c,g.u)
            hacj = this.dealPublishClass()
            if(this.range == ''){
                this.$message.error("请输入完成时间")
            }else if(hacj.code){
                var info ={
                    "subject":'语文',
        			"grade":g.g.classGrade,
        			"gradeChar":g.g.gradeChar,
        			"using":g.c,
        			"element":g.u,
        			"jobName":t,
        			"timeRange":this.range,
        			"token":this.Util.getLocalStorage('token'),
                    "minute":JSON.stringify(chooseInfo["minute"].concat(fillInfo["minute"])),
                    "answer":JSON.stringify(chooseInfo["answer"].concat(fillInfo["answer"])),
                    "id":JSON.stringify(chooseInfo["id"].concat(fillInfo["id"])),
                    "type":JSON.stringify(chooseInfo["type"].concat(fillInfo["type"])),
                    "homework_And_Class_Json":JSON.stringify(hacj.list)
                }
                this.fullscreenLoading = true
                this.axios.post('/homework/teachersaveoptionjob',this.qs.stringify(info)).then(response => {
                    var res = response.data
                    this.fullscreenLoading = false
                    if(res == 40002){
                        this.$message.warning("请勿重复提交")
						this.$router.push('/teacher/show')
					}else if(res == 40001){
                        this.$message.warning("登录超时")
						this.$router.push('/lrBox/login')
					}else if(res == 40000){
                        this.$message.warning("添加失败")
						this.$router.push('/teacher/show')
				    }else if(res == "success"){
                        localStorage.clear()
						this.$message.success("添加成功")
						this.$router.push('/teacher/show')
					}
                }).catch(error => {
                    this.fullscreenLoading = false
                    this.$message.error(error)
                })
            }else{
                this.$message.error("请选择发布班级及添加开始和截止时间")
            }
        },
        dealPublishClass(){
            var classList = []
            for(var i = 0; i < this.info.length; i++){
                for(var j = 0; j < this.info[i].class.length; j++){
                    if(this.info[i].class[j].isChoose){
                        var info={
                            "classId":this.info[i].class[j].id,
                            "teacherId":this.Util.getCookie('u_id'),
                            "gradeChar":this.info[i]['name'],
                            "classGrade":this.info[i]['id'],
                            "classChar":this.info[i].class[j].name,
                            "className":this.info[i].class[j].num
                        }
                        if(this.info[i].class[j].time != ''){
                            info["startTime"] = this.info[i].class[j].time[0]
                            info["endTime"] = this.info[i].class[j].time[1]
                        }else{
                            return {code:false};
                        }
                        classList.push(info)
                    }
                }
            }
            if(classList.length == 0){
                return {code:false}
            }else{
                return {code:true,list:classList}
            }
        },
        dealChooseList(list,ce,unit){
            var choose = {minute:[],answer:[],id:[],type:[]}
            for(var i = 0; i < list.length; i++){
                var titleInfo = {},answerInfo = {},correct = []
                titleInfo['jobNumber'] = i + 1
                titleInfo['jobContent'] = list[i].title
                titleInfo['type'] = 1
                titleInfo['using'] = ce
                titleInfo['element'] = unit
                for(var j = 0; j < list[i].answer.length; j++){
                    answerInfo[this.word[j]] = list[i].answer[j].info
                    if(list[i].answer[j].isTrue){
                        correct.push(this.word[j])
                    }
                }
                titleInfo['correct'] = correct.join(",")
                choose['minute'].push(titleInfo)
                choose['answer'].push(answerInfo)
                choose['id'].push(list[i].id)
                choose['type'].push(1)
            }
            return choose
        },
        dealFillList(list,ce,unit){
            var fill = {minute:[],answer:[],id:[],type:[]}
            for(var i = 0; i < list.length; i++){
                var titleInfo = {},answerInfo = {}
                titleInfo['jobNumber'] = i + 1
                titleInfo['jobContent'] = list[i].title
                titleInfo['type'] = 2
                titleInfo['using'] = ce
                titleInfo['element'] = unit
                for(var j = 0; j < list[i].answer.length; j++){
                    answerInfo[this.word[j]] = list[i].answer[j].info
                }
                fill['minute'].push(titleInfo)
                fill['answer'].push(answerInfo)
                fill['id'].push(list[i].id)
                fill['type'].push(2)
            }
            return fill
        }
    }
}
</script>

<style lang="css">
.addClass{
    width: 100%;
    position: fixed;
    top:0;
    left:0;
    bottom:0;
    right:0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
}
.addClass>.addClassContent{
    display: inline-block;
    width: 753px;
    min-height: 434px;
    border-radius: 10px;
    background: #e8f0ec;
    overflow: hidden;
    padding-bottom: 31px;
}
.addClass>.addClassContent>header{
    width: 100%;
    height: 45px;
    border-bottom: 1px solid #ccdbd2;
}
.addClass>.addClassContent>header>i{
    font-size: 20px;
    color: #b1b4b3;
    float: right;
    display: inline-block;
    vertical-align: top;
    line-height: 45px;
    text-align: center;
    width: 44px;
    cursor: pointer;
    border-left: 1px solid #ccdbd2;
}
.addClass>.addClassContent>header>i:hover{
    color: #8d918f;
}
.addClass>.addClassContent>section{
    width: 683px;
    min-height: 358px;
    margin:0 46px 0 25px;
}
.addClass>.addClassContent>section>div{
    margin-top: 15px;
}
.addClass>.addClassContent>section>.label{
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-indent: 25px;
    font-size: 17px;
    font-weight: bold;
    background: #e0ece4;
    color: #57bf80;
}
.addClass>.addClassContent>section>.timeBox{
    height: 30px;
    padding-left: 25px;
    font-size: 17px;
}
.addClass>.addClassContent>section>.timeBox>input{
    width: 65px;
    height: 30px;
    line-height: 30px;
    margin-right: 10px;
    box-shadow: 2px 2px 2px #cbcccb inset;
    text-align: center;
}
.addClass>.addClassContent>section>.classBox{
    padding-left: 25px;
    display: flex;
}
.addClass>.addClassContent>.noClass{
    text-align: center;
    line-height: 358px;
}
.addClass>.addClassContent>section>.classBox>.gradeBox>li{
    width: 173px;
    text-indent: 18px;
    border-left: 4px solid transparent;
}
.addClass>.addClassContent>section>.classBox>.gradeBox>.active{
    color: #52afb1;
    border-left: 4px solid #52afb1;
}
.addClass>.addClassContent>section>.classBox>.gradeBox>li,.addClass>.addClassContent>section>.classBox>.clasBox>li{
    height: 45px;
    box-sizing: border-box;
    line-height: 45px;
    font-size: 19px;
    margin-bottom: 20px;
    cursor: pointer;
}
.addClass>.addClassContent>section>.classBox>.clasBox>li{
    width: 132px;
    text-align: center;
    border-radius: 10px;
    cursor: pointer;
    border:2px dashed #818482;
}
.addClass>.addClassContent>section>.classBox>.clasBox>.active{
    color: #52afb1;
    border-color:#52afb1;
}
.addClass>.addClassContent>section>.classBox>.clasBox>li>i{
    width: 17px;
    height: 17px;
    background: #fff;
    box-shadow: 1px 1px 1px 1px #cfd0d0 inset;
    margin-right: 12px;
    display: inline-block;
    position: relative;
}
.addClass>.addClassContent>section>.classBox>.clasBox>li>i:before{
    position: absolute;
    top:-13px;
    left:1px;
}
.addClass>.addClassContent>section>.setFinishTime{
    width: 100%;
}
.addClass>.addClassContent>section>.setFinishTime>ul>li{
    width: 100%;
    height: 60px;
    border: 1px dashed #b6bfba;
    padding:0 25px;
    font-size: 17px;
    margin-bottom: 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
}
.addClass>.addClassContent>section>.setFinishTime>ul>li>div{
    height: 100%;
}
.addClass>.addClassContent>section>.setFinishTime>ul>li>.label{
    line-height: 60px;
}
.addClass>.addClassContent>section>.setFinishTime>ul>li>.time{
    box-sizing: border-box;
    padding-top: 10px;
}
.addClass>.addClassContent>section>footer{
    width: 100%;
    height: 40px;
    text-align: center;
    font-size: 0;
}
.addClass>.addClassContent>section>footer>button{
    width: 85px;
    height: 34px;
    border-radius: 10px;
    color: #fff;
    font-size: 15px;
    cursor: pointer;
    -webkit-box-shadow: 1px 1px 2px #aabebe;
    box-shadow: 1px 1px 2px #aabebe;
    vertical-align: middle;
}
.addClass>.addClassContent>section>footer>.submit{
    background: #32acab;
    margin-right: 10px;
}
.addClass>.addClassContent>section>footer>.submit:hover{
    background: #24a6a7;
}
.addClass>.addClassContent>section>footer>.cancel{
    background: #8e9491;
}
.addClass>.addClassContent>section>footer>.cancel:hover{
    background: #828784;
}
.addClass>.addClassContent .el-input__inner{
    background: #e8f0ec !important;
}
.addClass>.addClassContent .el-date-editor .el-range-input{
    background: #e8f0ec !important;
}
</style>
