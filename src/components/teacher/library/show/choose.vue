<template lang="html">
    <ul class="libraryChoose">
        <li v-for="(item,index) in value">
            <div class="item">
                <div class="itemBox">
                    <div class="title">{{index+1}}:{{item.jobContent}}</div>
                    <div class="item" v-for="(ite,index) in item.question_Pool_Answer" v-if="index != 'id' && index != 'jobNumber' && index != 'pid' ">{{index}}:{{ite}}</div>
                </div>
                <div class="btns">
                    <button v-if='!item.isChoose' @click='isChoose(item,true)'><i class="iconfont icon-add"></i>选入</button>
                    <button v-if='item.isChoose' @click='isChoose(item,false)' class="remove">移除</button>
                </div>
            </div>
            <div class="line"></div>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        value: {
　　　　　       default: [],
　　　　},
    },
    methods:{
        isChoose(item,val){
            item.isChoose = val
            this.$emit('input', this.value)
        }
    }
}
</script>

<style lang="css">
.libraryChoose{
    padding-top: 15px;
    width: 100%;
    min-height: 380px;
    position: relative;
}
.libraryChoose>li{
    width: 100%;
    box-sizing: border-box;
    padding-left: 10px;
}
.libraryChoose>li>.item{
    display: flex;
    justify-content: space-between;
}
.libraryChoose>li>.item>.itemBox{
    padding: 10px 0;
    font-size:17px;
    line-height: 34px;
}
.libraryChoose>li>.item>.btns{
    vertical-align: middle;
    margin-right: 90px;
    padding-top: 10px;
}
.libraryChoose>.submit{
    text-align: center;
    padding-top: 18px;
    position: absolute;
    bottom: 0;
}
.libraryChoose>li>.item>.btns>button{
    width: 83px;
    height: 35px;
    border-radius: 10px;
    color: #fff;
    cursor: pointer;
    -webkit-box-shadow: 1px 1px 2px #aabebe;
    box-shadow: 1px 1px 2px #aabebe;
    background: #28b3b4;
    font-size: 16px;
    font-weight: bold;
}
.libraryChoose>li>.item>.btns>button:hover{
    background: #24a6a7;
}
.libraryChoose>li>.item>.btns>button>i{
    font-size:14px;
    margin-right: 5px;
    font-weight: bold;
}
.libraryChoose>li>.line{
    height: 9px;
    border-top:1px solid #c4d8cc;
    border-bottom:1px solid #c4d8cc;
    background: #d7e9df;
    padding-left:0;
}
.remove{
    background: #c0dadb !important;
    color: #4f7372 !important;
}
.remove:hover{
    background: #b8d0d1 !important;
}
</style>
