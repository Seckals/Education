<template lang="html">
    <div class="showBox">
        <ul v-for="(item,index) in list">
            <li>{{index+1}}.<span>{{item.title}}</span></li>
            <li v-for='(ite,index) in item.answer' :class="{c23a2a5:ite.isTrue}">{{index | toUpper}}.<span>{{ite.info}}</span></li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return {
            list:[]
        }
    },
    mounted(){
        var info = this.Util.getLocalStorage('c')
        if(typeof(info) != 'undefined'){
            this.list = JSON.parse(this.Base64.decode(info))
        }
    },
    filters:{
        toUpper(val){
            var word = ['A','B','C','D','E','F','G']
            return word[val]
        }
    }
}
</script>

<style lang="css">
.showBox{
    width: 100%;
}
.showBox>ul{
    padding: 10px 0;
    border-bottom: 1px solid #28b3b4;
}
.showBox>ul>li{
    width: 100%;
    height: 32px;
    line-height: 32px;
}
.showBox>ul>li>span{
    margin-left: 7px;
}
.c23a2a5{
    color: #23a2a5;
}
.c23a2a5>span{
    color: #23a2a5;
}
</style>
