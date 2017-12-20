<template lang="html">
  <div class="questionInfo">
      <div class="qustionContent">
          <header>选择题<i class="iconfont icon-guanbi1" @click="close"></i></header>
          <section>
              <div class="tipNav">
                  <span>{{info.accuracyPeople}}/{{info.amount}}</span>正确
              </div>
              <div class="qustionBody">
                  <div class="qustionTitle">
                      {{info.jobNumber}}: {{info.jobContent}}
                  </div>
                  <ul>
                      <li :class="{c51bcbc:item['isTrue']}" v-for="(item,index) in info.homework_Job_Answer" v-if="index != 'id'">{{index | changeUp}}: {{item['info']}}</li>
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

        }
    },
    props:['info'],
    filters:{
        changeUp(val){
            return val.toUpperCase()
        }
    },
    methods:{
        close(){
            this.$emit("close",false)
        }
    }
}
</script>

<style lang="css">
.questionInfo{
    position: fixed;
    width: 100%;
    height: 100%;
    top:0;
    left:0;
    background: rgba(0, 0, 0, 0.6);
}
.questionInfo>.qustionContent{
    width: 753px;
    min-height: 396px;
    background: #eaf2ee;
    border-radius: 10px;
    position: absolute;
    left:50%;
    top:50%;
    margin:-198px 0 0 -376px;
    overflow: hidden;
}
.questionInfo>.qustionContent>header{
    width: 100%;
    height: 45px;
    line-height: 45px;
    text-indent: 27px;
    font-size: 19px;
    position: relative;
    border-bottom: 1px solid #d1dfd7;
}
.questionInfo>.qustionContent>header>i{
    position: absolute;
    display: inline-block;
    width: 46px;
    height: 100%;
    right: 0;
    top:0;
    border-left: 1px solid #d1dfd7;
    text-align: center;
    text-indent: 0;
    font-size: 17px;
    cursor: pointer;
    color: #969a98;
}
.questionInfo>.qustionContent>header>i:hover{
    color: #898c8a;
}
.questionInfo>.qustionContent>section{
    width: 100%;
    box-sizing: border-box;
    padding: 20px 27px;
}
.questionInfo>.qustionContent>section>.tipNav{
    height: 41px;
    line-height: 41px;
    background: #e3eee7;
    font-size: 15px;
    color: #606160;
    font-weight: bold;
}
.questionInfo>.qustionContent>section>.tipNav>span{
    margin:0 24px;
    font-size: 20px;
    color: #51c281;
}
.questionInfo>.qustionContent>section>.qustionBody{
    padding-top: 18px;
    font-size: 17px;
}
.questionInfo>.qustionContent>section>.qustionBody>ul>li{
    margin-top: 24px;
}
.c51bcbc{
    color: #51bcbc;
}
</style>
