<template lang="html">
    <div class="addNav">
        <nav>
            <router-link to="choose" class="navItem" tag="div">
                <div class="navIcon cIcon"></div>
                <span>选择题</span>
            </router-link>
            <router-link to="fill" class="navItem" tag="div">
                <div class="navIcon fIcon"></div>
                <span>填空题</span>
            </router-link>
        </nav>
        <div class="addInfo">
            <router-view />
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
.addNav{
    width: 100%;
}
.addNav>nav{
    width: 100%;
    height: 117px;
    background: rgba(0,0,0,0.05);
}
.addNav>nav>.navItem{
    width: 150px;
    height: 100%;
    display: inline-block;
    vertical-align: top;
    cursor: pointer;
    box-sizing: border-box;
    padding-top: 17px;
}
.addNav>nav>.navItem>.navIcon{
    width: 50px;
    height: 51px;
    margin:0 auto;
    background: url('../img/add.png') no-repeat;
}
.addNav>nav>.navItem>.cIcon{
    background-position: -50px -51px;
}
.addNav>nav>.navItem>.fIcon{
    background-position: 0 -51px;
}
.addNav>nav>.navItem>span{
    display: block;
    width: 100%;
    font-size: 15px;
    text-align: center;
    line-height: 35px;
    color: #3a3b3b;
    font-weight: 500;
}
.addNav>nav>.router-link-active{
    background: #def1e5 !important;
    border-top: 4px solid #28b3b4;
}
.addNav>nav>.router-link-active>span{
    color:#28b3b4 !important;
}
.addNav>nav>.router-link-active>.navIcon{
    background-position-y:0 !important;
}
.addNav>.addInfo{
    padding-top: 20px;
}
</style>
