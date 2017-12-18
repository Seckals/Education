<template>
    <div class="list">
        <header>
            <div class="classes">
                <span class="searchTitle cursor" @click="showList('classes')" :class='{titleActive:isClassRotate}'>
                    全部<i class="el-icon-arrow-down rotate" :class="{rotate180:isClassRotate,rotate0:!isClassRotate}"></i>
                </span>
                <ul v-show='isClassRotate' class="classesList">
                    <li>12313</li>
                    <li>12313</li>
                    <li>12313</li>
                    <li>12313</li>
                </ul>
            </div>
            <div class="status">
                <span class="searchTitle cursor" @click="showList('status')" :class='{titleActive:isStatusRotate}'>
                    全部<i class="el-icon-arrow-down rotate" :class="{rotate180:isStatusRotate}"></i>
                </span>
                <ul v-show='isStatusRotate'>

                </ul>
            </div>

        </header>
        <section>

        </section>
        <footer>

        </footer>
    </div>
</template>

<script>
export default {
    data(){
        return {
            isClassRotate:false,
            isStatusRotate:false
        }
    },
    methods:{
        showList(val){
            if(val == 'classes'){
                this.isClassRotate = !this.isClassRotate
                this.isStatusRotate = false
            }else if(val == 'status'){
                this.isStatusRotate = !this.isStatusRotate
                this.isClassRotate = false
            }
        }
    }
}
</script>

<style lang="css">
.list{
    width: 914px;
}
.list>header{
    width: 100%;
    height: 115px;
    position: relative;
    background: url('./img/middle_box_top.png') no-repeat;
}
.list>section{
    width: 100%;
    min-height: 630px;
    background: url('./img/middle_body.png') repeat-y;
}
.list>footer{
    width: 100%;
    height: 40px;
    background: url('./img/middle_bottom.png') no-repeat;
}
.list>header>.classes,.list>header>.status{
    width: 149px;
    height: 38px;
    line-height: 38px;
    font-size:15px;
    text-align: center;
    position: absolute;
    bottom:0;
    color:#fff;
}
.list>header>.classes{
    right: 196px;
}
.list>header>.status{
    right: 47px;
}
.list>header .searchTitle{
    display: block;
    width: 100%;
    height: 100%;
}
/* .list>header ul{
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    box-sizing: border-box;
    background-color: #fff;
    border: 1px solid #e4e7ed;
} */
.list>header ul{
    /* padding:10px 0; */
    transition: height .3s;
}
.list>header ul>li{
    width: 100%;
    height: 43px;
    color: #737473;
    text-align: center;
    line-height: 43px;
    background: #fff;
    border: 1px solid #cedad3 !important;
}
.rotate{
    margin-left: 10px;
    transition: transform .3s;
}
.rotate0{
    transform: rotate(0deg);
}
.rotate180{
    transform: rotate(180deg);
}
.titleActive{
    color: rgb(40, 179, 180);
    background: #fff;
}
</style>
