<template lang="html">
    <div id="register">
        <img src="./img/register_logo.png">
        <div class="part">
            <router-link :to="{ path: 'verify', query: {type:'teacher'} }" tag='div' class="partItem">
                <div class="portrait tNChoose"></div>
    			<p>我是老师</p>
            </router-link>
            <router-link :to="{ path: 'verify', query: {type:'student'} }" tag='div' class="partItem">
                <div class="portrait sNChoose"></div>
    			<p>我是学生</p>
            </router-link>
    	</div>
        <router-view/>
    </div>
</template>
<style>
#register{
    width: 360px;
    min-height: 470px;
    margin:120px auto 0;
    text-align: center;
}
/* 选择角色 */
#register>.part{
    margin-top: 50px;
    width: 100%;
    height: 100px;
    font-size: 0;
    text-align: left;
    border-bottom: 1px solid #a6a9a7;
}
#register>.part>.partItem{
    display: inline-block;
    vertical-align: top;
    width: 66px;
    height: 85px;
    font-size: 16px;
    cursor: pointer;
    margin-left: 76px;
    text-align: center;
}
#register>.part>.partItem>.portrait{
    width: 45px;
    height: 55px;
    margin: 0 auto 14px;
    background: url(./img/teacherIcon.png) no-repeat;
}
#register>.part>.partItem>.tNChoose{
    background-position: 0 0;
}
#register>.part>.partItem>.sNChoose{
    background-position: 0 -55px;
}
#register>.part>.router-link-active>.portrait{
    background-position-x: -45px !important;
}
</style>
