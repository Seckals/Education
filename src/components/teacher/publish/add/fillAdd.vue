<template lang="html">
    <div class="chooseAddBox">
        <div class="">
            <ul class="chooseItem" v-for="(item,index) in list">
                <li class="chooseItemTitle">
                    <span>{{index+1}}.</span><input class="w580" type="text" v-model='item.title'>
                </li>
                <li class="close"><i class="iconfont icon-guanbi1" @click='del(index)'></i></li>
                <li v-for='(ite,index) in item.answer'>
                    <span><i class="iconfont icon-guanbi1" @click='delItem(item.answer,index)'></i>{{index | toUpper}}.</span>
                    <input type="text" v-model='ite.info' class="w580">
                </li>
                <li class="itemAdd">
                    <i class="iconfont icon-add" @click="addItem(item.answer)"></i>
                </li>
            </ul>
        </div>
        <div class="btns questionAdd">
            <button @click="add"><i class="iconfont icon-add"></i>添加题目 </button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            list:[{title:'',answer:[{name:'',info:'',isTure:false}]}]
        }
    },
    props:['isSubmitFillInfo'],
    watch:{
        isSubmitFillInfo(){
            if(this.isSubmitFillInfo){
                this.$emit("getBackInfo",{'fill':this.list})
            }
        }
    },
    filters:{
        toUpper(val){
            var word = ['A','B','C','D','E','F','G']
            return word[val]
        }
    },
    methods:{
        del(i){
            if(this.list.length > 1){
                this.list.splice(i,1)
            }else{
                this.$message.error('已超出删除限制')
            }
        },
        delItem(list,i){
            if(list.length > 1){
                list.splice(i,1)
            }else{
                this.$message.error('已超出删除限制')
            }
        },
        addItem(){
            if(item.length < 7){
                var i = {name:'',info:'',isTure:false}
                item.push(i)
            }else {
                this.$message.error('最多添加7个选项')
            }
        },
        add(){
            this.list.push({title:'',answer:[]})
        }
    }
}
</script>
<style>
    .w580{
        width: 580px !important;
    }
</style>
