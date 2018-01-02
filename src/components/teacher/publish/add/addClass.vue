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
.addClass>.addClassContent .el-input__inner{
    background: #e8f0ec !important;
}
.addClass>.addClassContent .el-date-editor .el-range-input{
    background: #e8f0ec !important;
}
</style>
