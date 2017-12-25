<template lang="html">
    <div class="chooseAddBox">
        <ul class="chooseItem">
            <li class="chooseItemTitle">
                <span>1.</span><input type="text" name="" value="">
            </li>
            <li class="close"><i class="iconfont icon-guanbi1"></i></li>
            <li>
                <span><i class="iconfont icon-guanbi1"></i>A.</span>
                <input type="text" name="" value="">
                <div class="checkBox">
                    <i class="iconfont icon-duihao"></i>
                    正确
                </div>
            </li>
            <li>
                <span><i class="iconfont icon-guanbi1"></i>A.</span>
                <input type="text" name="" value="">
                <div class="checkBox">
                    <i class="iconfont icon-duihao"></i>
                    正确
                </div>
            </li>
            <li>
                <span><i class="iconfont icon-guanbi1"></i>A.</span>
                <input type="text" name="" value="">
                <div class="checkBox">
                    <i class="iconfont icon-duihao"></i>
                    正确
                </div>
            </li>
            <li>
                <span><i class="iconfont icon-guanbi1"></i>A.</span>
                <input type="text" name="" value="">
                <div class="checkBox">
                    <i class="iconfont icon-duihao"></i>
                    正确
                </div>
            </li>
        </ul>
        <div class="itemAdd">
            <i class="iconfont icon-add "></i>
        </div>
        <div class="btns questionAdd">
            <button ><i class="iconfont icon-add"></i>添加题目 </button>
        </div>
    </div>
</template>

<script>
export default {
    props:['isSubmitInfo'],
    watch:{
        isSubmitInfo(){
            if(this.isSubmitInfo){
                this.$emit("getBackInfo",{type:'choose',info:this.getChooseInfo()})
            }
        }
    },
    methods:{
        getChooseInfo(){

        }
    }
}
</script>

<style lang="css">
.chooseAddBox{
    border: 2px dotted #28b3b4;
    border-radius: 10px;
    overflow: hidden;
}
.chooseAddBox>.chooseItem{
    padding-top: 25px;
    position: relative;
}
.chooseAddBox>.chooseItem>.close{
    position: absolute;
    right: 0;
    top:0;
    width: 27px;
    height: 25px;
    box-sizing: border-box;
    padding: 7px 7px 0 0;
    margin-bottom: 0;
}
.chooseAddBox>.chooseItem>.close>i:hover{
    color:#28b3b4;
}
.chooseAddBox>.chooseItem i{
    font-size: 20px;
    cursor: pointer;
    color: #a6cdba;
}
.chooseAddBox>.chooseItem>li{
    width: 100%;
    height: 39px;
    margin-bottom: 17px;
    font-size: 0;
}
.chooseAddBox>.chooseItem>li>.checkBox{
    display: inline-block;
    height: 100%;
    line-height: 39px;
    font-size: 16px;
    font-weight: bold;
}
.chooseAddBox>.chooseItem>li>.checkBox>i{
    display: inline-block;
    width: 25px;
    height: 25px;
    border-radius: 8px;
    border:1px solid #d8e3e4;
    vertical-align: top;
    margin-left: 10px;
    /* background: #eaf2f3; */
    background: #fff;
    vertical-align: middle;
    line-height: 25px;
    text-align: center;
}
.chooseAddBox>.chooseItem>li>.checkBox>i:before{
    color: #bb2525;
}
.chooseAddBox>.chooseItem>li>span{
    display: inline-block;
    vertical-align: top;
    text-align: right;
    font-size: 17px;
    width: 50px;
    line-height: 39px;
    box-sizing: border-box;
    height: 39px;
}
.chooseAddBox>.chooseItem>li>span>i{
    margin-right: 7px;
}
.chooseAddBox>.chooseItem>li>span>i:hover{
    color:#28b3b4;
}
.chooseAddBox>.chooseItem>li>input{
    display: inline-block;
    vertical-align: top;
    margin-left: 5px;
    width: 512px;
    height: 39px;
    line-height: 39px;
    text-indent: 7px;
    font-size: 17px;
    border:1px solid rgb(199,212,214);
    box-sizing: border-box;
}
.chooseAddBox>.itemAdd{
    box-sizing: border-box;
    border-bottom: 2px solid #33b7b7;
    padding: 5px 0 15px 21px;
    color: #a6cdba;
    cursor: pointer;
}
.chooseAddBox>.itemAdd>i{
    font-size: 17px;
    font-weight: bold;
}
.chooseAddBox>.itemAdd>i:hover{
    color:#28b3b4;
}
.chooseAddBox>.questionAdd{
    width: 100%;
    padding: 8px 0;
    text-align: right;
}
.chooseAddBox>.questionAdd>button{
    color:#fff;
    margin-right: 14px;
    width: 99px;
    height: 33px;
    border-radius: 8px;
    background: #ed6a47;
    font-size: 16px;
    cursor: pointer;
    box-shadow: 1px 1px 1px 1px #b9bfba;
}
.chooseAddBox>.questionAdd>button:hover{
    background: #e16442
}
.chooseAddBox>.questionAdd>button>i{
    font-size: 10px;
    margin:0 3px;
}
</style>
