<template lang="html">
    <ul class="libraryChoose">
        <li v-for="(item,index) in value">
            <div class="item">
                <div class="itemBox">
                    <div class="title">{{index+1}}:{{item.jobContent}}</div>
                    <div class="item" v-for="(ite,index) in item.question_Pool_Answer" v-if="index != 'id' && index != 'jobNumber' && index != 'pid' ">{{index}}:{{ite}}</div>
                </div>
                <div class="btns">
                    <button v-if='!item.isChoose' @click='isChoose(item,true)'><i class="iconfont icon-add" ></i>选入</button>
                    <button v-if='item.isChoose' class="remove" @click='isChoose(item,false)'>移除</button>
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
