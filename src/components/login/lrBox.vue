<template lang="html">
    <div id="lrBox">
        <login v-if="isShow" @register='register'></login>
        <register v-if="!isShow"></register>
    </div>
</template>

<script>
import login from './login'
import register from './register'
export default {
    data(){
        return {
            isShow:true
        }
    },
    components:{
        login,
        register
    },
    methods:{
        register(msg){
            this.isShow = msg
        }
    }
}
</script>

<style lang="css">
#lrBox{
    width: 100%;
    height: 100%;
    position: absolute;
    background: url('./img/registerBg.jpg') no-repeat;
    background-size: cover;
}
</style>
