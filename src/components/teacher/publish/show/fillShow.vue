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
        var info = this.Util.getLocalStorage('f')
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
