<template lang="html">
    <div class="chooseAddBox">
        <ul class="chooseItem">
            <li class="chooseItemTitle">
                <span>1.</span><input type="text" name="" value="">
            </li>
            <li class="close"><i class="iconfont icon-guanbi1"></i></li>
            <el-checkbox-group v-model="checkList">
                <li>
                    <span><i class="iconfont icon-guanbi1"></i>A.</span>
                    <input type="text" name="" value="">
                    <el-checkbox label="正确"></el-checkbox>
                </li>
                <li>
                    <span><i class="iconfont icon-guanbi1"></i>B.</span>
                    <input type="text" name="" value="">
                    <el-checkbox label="正确"></el-checkbox>
                </li>
                <li>
                    <span><i class="iconfont icon-guanbi1"></i>C.</span>
                    <input type="text" name="" value="">
                    <el-checkbox label="正确"></el-checkbox>
                </li>
                <li>
                    <span><i class="iconfont icon-guanbi1"></i>D.</span>
                    <input type="text" name="" value="">
                    <el-checkbox label="正确"></el-checkbox>
                </li>
              </el-checkbox-group>
        </ul>
        <i class="iconfont icon-add"></i>
    </div>
</template>

<script>
export default {
    data(){
        return {
            checkList:''
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
.chooseAddBox>.chooseItem i{
    font-size: 20px;
    cursor: pointer;
    color: #a6cdba;
}
.chooseAddBox>.chooseItem>li,.chooseAddBox>.chooseItem>div>li{
    width: 100%;
    height: 39px;
    margin-bottom: 17px;
    font-size: 0;
}
.chooseAddBox>.chooseItem>li>span,.chooseAddBox>.chooseItem>div>li>span{
    display: inline-block;
    vertical-align: top;
    text-align: right;
    font-size: 17px;
    width: 50px;
    line-height: 39px;
    box-sizing: border-box;
    height: 39px;
}
.chooseAddBox>.chooseItem>div>li>span>i{
    margin-right: 7px;
}
.chooseAddBox>.chooseItem>li>input,.chooseAddBox>.chooseItem>div>li>input{
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
.el-checkbox__inner{
    width: 30px !important;
    height: 30px !important;
    border-radius: 10px;
}
.el-checkbox{
    line-height: 39px;
    padding-left: 10px;
}
.el-checkbox__label{
    font-size: 16px;
    line-height: 39px;
    color: #494848;
}
</style>
