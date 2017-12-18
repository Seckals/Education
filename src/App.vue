<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.cGreen{
    color: #4ebbbc !important;
}
.cursor{
    cursor: pointer;
}
.btn{
    text-align: center;
    color: #fff;
    cursor: pointer;
    border-radius: 6px;
    background: #28b3b4;
    box-shadow: 1px 1px 1px #a7c1c1;
    transition: background-color 0.5s linear;
    -moz-transition: width 0.5s linear; /* Firefox 4 */
    -webkit-transition: width 0.5s linear; /* Safari 和 Chrome */
    -o-transition: width 0.5s linear; /* Opera */
}
.btn:hover{
    background-color:#1ea7a8;
}
::-webkit-input-placeholder {
	color:#8a918c !important;
	font-size:15px;
}
:-moz-placeholder {
	color:#8a918c !important;
	font-size:15px;
}
::-moz-placeholder {
	color:#8a918c !important;
	font-size:15px;
}
:-ms-input-placeholder {
	color:#8a918c !important;
	font-size:15px;
}
.el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover {
    color: #28b3b4 !important;
}
</style>
