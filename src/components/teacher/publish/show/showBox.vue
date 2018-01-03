<template lang="html">
    <div class="addNav">
        <nav>
            <router-link to="choose" class="navItem" tag='div'>
                <div class="navIcon cIcon"></div>
                <span>选择题</span>
            </router-link>
            <router-link to="fill" class="navItem" tag='div'>
                <div class="navIcon fIcon"></div>
                <span>填空题</span>
            </router-link>
        </nav>
        <div class="addInfo">
            <router-view />
        </div>
    </div>
</template>
