<template>
    <el-menu :default-active="'1'" class="el-menu-demo" mode="horizontal" :unique-opened='true'>
        <el-menu-item index="1">
            <router-link class="nav-link" :to="{name: 'home'}">首页</router-link>
        </el-menu-item>
        <el-menu-item index="2">
            <router-link class="nav-link"  :to="{name: 'recipe'}">菜谱大全</router-link>
        </el-menu-item>
    </el-menu>
</template>

<script>
export default {
    
}
</script>

<style lang="stylus">
.nav-link {
    display inline-block
}
</style>


