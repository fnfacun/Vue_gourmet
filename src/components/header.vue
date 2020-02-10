<template>
    <el-header style="height: auto;">
        <div class="header">
            <div class="header_c">
                <el-row type="flex" justify="start" align="middle">
                    <el-col :span="6">
                        <a href="" class="logo"></a>
                    </el-col>
                    <el-col :span="10" :offset="2"></el-col>
                    <el-col :span="6" :offset="3" class="avatar-box">
                        <router-link :to="{name: 'space'}">
                            <el-avatar style="vertical-align: middle;" shape="square" size="medium" src=""></el-avatar>
                        </router-link>
                        <router-link :to="{name: 'space'}" class="user-name">用户名</router-link>
                        <router-link :to="{name: 'create'}" class="collection">发布菜谱</router-link>
                        <a href="javascript:;" class="collection">退出</a>
                    </el-col>
                    <el-col :span="6" :offset="3" class="avatar-box">
                        <router-link :to="{name: 'login'}" class="user-name">登录</router-link>
                        <router-link :to="{name: 'login'}" class="collection">注册</router-link>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="nav-box">
            <div class="nav_c">
                <Menus></Menus>
            </div>
        </div>
    </el-header>
</template>

<script>
import Menus from '@/components/menus'

export default {
    components: {
        Menus
    },
}
</script>

<style lang="stylus">
.header 
    height 129px
    background-color #c90000
    .logo 
        display: block;
        height: 129px;
        width: 184px;
        background url(https://s1.c.meishij.net/n/images/logo2.png) -15px 9px no-repeat;

.header_c, .nav_c
    width 990px
    margin 0 auto 

.nav-box 
    height 60px
    background-color #fff;
    box-shadow 10px 0px 10px rgba(0,0,0,0.3)

.user-name
    margin-left 5px
    color #fff

.collection 
    margin-left 5px  
    color #fff
</style>


