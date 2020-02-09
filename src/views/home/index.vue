<template>
    <h2>home</h2>
</template>

<script>
import { getBanner, getMenus } from '@/service/index'

export default {
    name: 'home',
    mounted(){
        getBanner().then(res=>{
            console.log(res)
        });
        getMenus().then(res=>{
            console.log(res)
        })
    }
}
</script>

<style lang="stylus">

</style>