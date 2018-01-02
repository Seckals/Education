<template lang="html">
    <div class="showBox">
        <button type="button" name="button" @click='ab'>123</button>
        <ul v-for="(item,index) in chooseInfo">
            <li>{{index+1}}.<span>{{item.title}}</span></li>
            <li v-for='(ite,index) in item.answer'>{{index | toUpper}}.<span>{{ite.info}}</span></li>
        </ul>
    </div>
</template>

<script>
export default {
    props:['chooseInfo'],
    filters:{
        toUpper(val){
            var word = ['A','B','C','D','E','F','G']
            return word[val]
        }
    },
    methods:{
        ab(){
            console.log(this.chooseInfo)
        }
    }
}
</script>

<style lang="css">
.showBox{
    width: 100%;
}
.showBox>ul>li{
    width: 100%;
    height: 32px;
    line-height: 32px;
}
.showBox>ul>li>span{
    margin-left: 7px;
}
</style>
