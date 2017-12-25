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
                this.$emit("getBackInfo",{type:'fill',info:this.getFillInfo()})
            }
        }
    },
    methods:{
        getFillInfo(){

        }
    }
}
</script>

<style lang="css">
</style>
