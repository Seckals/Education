<template lang="html">
    <div class="chooseAddBox">
        <div class="">
            <ul class="chooseItem" v-for="(item,index) in list">
                <li class="chooseItemTitle">
                    <span>{{index+1}}.</span><input type="text" v-model='item.title'>
                </li>
                <li class="close"><i class="iconfont icon-guanbi1" @click='del(index)'></i></li>
                <li v-for='(ite,index) in item.answer'>
                    <span><i class="iconfont icon-guanbi1" @click='delItem(item.answer,index)'></i>{{index | toUpper}}.</span>
                    <input type="text" v-model='ite.info'>
                    <div class="checkBox">
                        <i class="iconfont" :class="{'icon-duihao':ite.isTure}" @click='setTure(ite)'></i>
                        正确
                    </div>
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
            list:[{title:'',answer:[{name:'',info:'',isTure:false},{name:'',info:'',isTure:false},{name:'',info:'',isTure:false},{name:'',info:'',isTure:false}]}]
        }
    },
    props:['isSubmitChooseInfo'],
    watch:{
        isSubmitChooseInfo(){
            if(this.isSubmitChooseInfo){
                this.$emit("getBackInfo",{'choose':this.list})
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
        setTure(item){
            item.isTure = !item.isTure
        },
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
        addItem(item){
            if(item.length < 7){
                var i = {name:'',info:'',isTure:false}
                item.push(i)
            }else {
                this.$message.error('最多添加7个选项')
            }
        },
        add(){
            this.list.push({title:'',answer:[{name:'',info:'',isTure:false},{name:'',info:'',isTure:false},{name:'',info:'',isTure:false},{name:'',info:'',isTure:false}]})
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
.chooseAddBox>div>.chooseItem{
    padding-top: 25px;
    position: relative;
    border-bottom: 1px solid #28b3b4;
}
.chooseAddBox>div>.chooseItem:last-child{
    border-bottom-width: 2px !important;
}
.chooseAddBox>div>.chooseItem>.close{
    position: absolute;
    right: 0;
    top:0;
    width: 27px;
    height: 25px;
    box-sizing: border-box;
    padding: 7px 7px 0 0;
    margin-bottom: 0;
}
.chooseAddBox>div>.chooseItem>.close>i:hover{
    color:#28b3b4;
}
.chooseAddBox>div>.chooseItem i{
    font-size: 20px;
    cursor: pointer;
    color: #a6cdba;
}
.chooseAddBox>div>.chooseItem>li{
    width: 100%;
    height: 39px;
    margin-bottom: 17px;
    font-size: 0;
    user-select:none;
}
.chooseAddBox>div>.chooseItem>li>.checkBox{
    display: inline-block;
    height: 100%;
    line-height: 39px;
    font-size: 16px;
    font-weight: bold;
}
.chooseAddBox>div>.chooseItem>li>.checkBox>i{
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
.chooseAddBox>div>.chooseItem>li>.checkBox>i:before{
    color: #bb2525;
}
.chooseAddBox>div>.chooseItem>li>span{
    display: inline-block;
    vertical-align: top;
    text-align: right;
    font-size: 17px;
    width: 50px;
    line-height: 39px;
    box-sizing: border-box;
    height: 39px;
}
.chooseAddBox>div>.chooseItem>li>span>i{
    margin-right: 7px;
}
.chooseAddBox>div>.chooseItem>li>span>i:hover{
    color:#28b3b4;
}
.chooseAddBox>div>.chooseItem>li>input{
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
.chooseAddBox>div>.chooseItem>.itemAdd{
    box-sizing: border-box;
    padding: 0 0 15px 21px;
    color: #a6cdba;
    cursor: pointer;
    margin-bottom: 0 !important;
}
.chooseAddBox>div>.chooseItem>.itemAdd>i{
    font-size: 17px;
    font-weight: bold;
}
.chooseAddBox>div>.chooseItem>.itemAdd>i:hover{
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
