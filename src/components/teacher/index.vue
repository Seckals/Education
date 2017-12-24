<template lang="html">
    <div id="teacher">
        <header>
            <div class="headerInfo">
                <div class="fl flLogo">
                    <img src="./img/qiStar.png">
                    <img src="./img/plan1.png">
                </div>
                <div class="fr fAccount">
                    <div class="accountInfo">
                            <i class="iconfont icon-zhanghao"></i>
                            <span class='account'>{{username}}</span>
                            <el-dropdown @command="getOut">
                                <span class="el-dropdown-link cursor">
                                    <i class="el-icon-caret-bottom el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item class="down"><i class="iconfont icon-tuichu outIcon"></i><span>退出</span></el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                    </div>
                    <img src="./img/plan.png">
                </div>
            </div>
        </header>
        <div class="indexContent clearfix">
            <ul class="fl nav">
                <li>
                    <div class="navLogo">
                        <img src="./img/logo_pic.png" alt="">
                    </div>
                    <span class="navAccount">{{username}}</span>
                    <el-dropdown @command="getOut">
                        <span class="el-dropdown-link cursor">
                            <i class="el-icon-caret-bottom el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item class="down"><i class="iconfont icon-tuichu outIcon"></i><span>退出</span></el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </li>
                <li class="m49">
                    <img src="./img/line_left.png" alt="">
                </li>
                <li>
                    <router-link to="/teacher/list" class="homework"><span></span></router-link>
                </li>
                <li><img src="./img/line_left.png" alt=""></li>
                <li>
                    <router-link to="/teacher/publish" class="publish"><span></span></router-link>
                </li>
                <li><img src="./img/line_left.png" alt=""></li>
                <li>
                    <router-link to="/teacher/import" class="library"><span></span></router-link>
                </li>
                <li><img src="./img/line_left.png" alt=""></li>
            </ul>
            <div class="fr">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            username:''
        }
    },
    mounted(){
        this.username = this.Util.getCookie('u')
    },
    methods:{
        getOut(){
            this.axios.get('/account/Exit').then(response => {
                this.$router.push('/lrBox')
            })
        }
    }
}
</script>

<style lang="css">
#teacher{
    position: absolute;
    width: 100%;
    height: 100%;
    background: url('./img/bg.png') no-repeat;
    background-size: cover;
}
#teacher>header{
    width: 100%;
    height: 60px;
    background: #fff;
    margin-top: 52px;
    box-shadow: 1px 1px 1px #eeeeee;
}
#teacher>header>.headerInfo{
    width: 1024px;
    height: 100%;
    margin:0 auto;
}
#teacher>header>.headerInfo>.flLogo,#teacher>header>.headerInfo>.fAccount{
    font-size: 0;
    height: 100%;
    line-height: 60px;
}
#teacher>header>.headerInfo>.flLogo>img,#teacher>header>.headerInfo>.fAccount>img{
    vertical-align: middle;
}
#teacher>header>.headerInfo>.flLogo>img{
    margin-right: 45px;
}
/* #teacher>header>.headerInfo>.flLogo>img{
    margin-top: -18px;
} */
.fl{
    float: left;
}
.fr{
    float: right;
}
#teacher>header>.headerInfo>.fAccount>.accountInfo{
    font-size:0;
    color: #b2b3b3;
    display: inline-block;
    margin-right: 38px;
    position: relative;
    font-weight: bold;
    box-sizing: border-box;
    height: 100%;
    vertical-align: top;
}
#teacher>header>.headerInfo>.fAccount>.accountInfo .icon-zhanghao{
    font-size:20px;
}
#teacher>header>.headerInfo>.fAccount>.accountInfo .icon-f11-copy{
    font-size:20px;
    position: absolute;
    top: 2px;
}
#teacher>header>.headerInfo>.fAccount>.accountInfo span{
    font-size:15px;
}
#teacher>header>.headerInfo>.fAccount>.accountInfo>.account{
    margin-left:8px;
}
#teacher>header>.headerInfo>.fAccount>.accountInfo .down{
    position: absolute;
    top:67px;
    right: 0;
    width: 110px;
    height: 49px;
    border: 1px solid #ced9d3;
    text-align: center;
    font-size: 0;
    cursor: pointer;
    color: #000;
    background: #fff;
}
#teacher>header>.headerInfo>.fAccount>.accountInfo .down>span{
    font-size:16px;
    display: inline-block;
    vertical-align: top;
    height: 100%;
    line-height: 49px;
}
#teacher>header>.headerInfo>.fAccount>.accountInfo>.el-dropdown {
    height: 40px;
}
.el-dropdown-menu{
    padding: 0 !important;
}
/* content */
#teacher>.indexContent{
    width: 1024px;
    margin: 0 auto;
}
#teacher>.indexContent>.nav{
    width: 80px;
}
#teacher>.indexContent>.nav>li{
    width: 100%;
    font-size:0;
    text-align: center;
    padding: 12px 0;
}
#teacher>.indexContent>.nav>li>.navLogo{
    width: 100%;
    text-align: center;
    margin-top: 52px;
    margin-bottom: 5px;
}
#teacher>.indexContent>.nav>li>.navAccount{
    font-size:12px;
    font-weight: bold;
    display: inline-block;
    width: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
}
#teacher>.indexContent>.nav>li>.el-dropdown{
    vertical-align: top;
}
#teacher>.indexContent>.nav>li>a>span{
    display: block;
    width:70px;
    margin:0 auto;
    background: url('./img/icon.png') no-repeat;
}
#teacher>.indexContent>.nav>li>.router-link-active>span{
    background-position-x: -76px !important;
}
#teacher>.indexContent>.nav>li>.homework>span{
    height: 61px;
}
#teacher>.indexContent>.nav>li>.publish>span{
    height: 68px;
    background-position:0 -61px;
}
#teacher>.indexContent>.nav>li>.library>span{
    height: 64px;
    width:72px;
    background-position: 0 -127px;
}
.m49{
    margin-top: 49px;
}
</style>
