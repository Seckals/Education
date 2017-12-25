<template lang="html">
  <ul class="libraryChoose">
      <li class="clearfix">
          <div class="fl">
              <div class="title">1:bfgs</div>
              <div class="item">A:bgfs</div>
              <div class="item">A:bgfs</div>
              <div class="item">A:bgfs</div>
              <div class="item">A:bgfs</div>
          </div>
          <div class="fr">
              <button><i class="iconfont icon-add"></i>移除</button>
          </div>
      </li>
      <li class="line"></li>
  </ul>
</template>

<script>
export default {
    props:['info'],
    watch:{
        info(){
            if(this.info.type == 'choose'){
                if(this.info.isCheckAll){
                    console.log(this.info.isCheckAll)
                }else{
                    console.log(this.info.isCheckAll)
                }
            }
        }
    },
    mounted(){

    },
    methods:{
    }
}
</script>

<style lang="css">
.libraryChoose{
    padding-top: 15px;
    padding-top: 34px;
    width: 100%;
    min-height: 380px;
    position: relative;
}
.libraryChoose>li{
    width: 100%;
    box-sizing: border-box;
    padding-left: 10px;
}
.libraryChoose>li>.fl{
    padding: 10px 0;
    font-size:17px;
    line-height: 34px;
}
.libraryChoose>li>.fr{
    vertical-align: middle;
    margin-right: 71px;
    padding-top: 10px;
}
.libraryChoose>.submit{
    text-align: center;
    padding-top: 18px;
    position: absolute;
    bottom: 0;
}
.libraryChoose>li>.fr>button{
    width: 83px;
    height: 35px;
    border-radius: 10px;
    color: #fff;
    cursor: pointer;
    -webkit-box-shadow: 1px 1px 2px #aabebe;
    box-shadow: 1px 1px 2px #aabebe;
    background: #28b3b4;
    font-size: 16px;
}
.libraryChoose>li>.fr>button:hover{
    background: #24a6a7;
}
.libraryChoose>li>.fr>button>i{
    font-size:12px;
    margin-right: 5px;
}
.libraryChoose>.line{
    height: 9px;
    border-top:1px solid #c4d8cc;
    border-bottom:1px solid #c4d8cc;
    background: #d7e9df;
    padding-left:0;
}
</style>
