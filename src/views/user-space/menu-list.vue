<template>
    <div class="menu-list">
        <div class="info-empty" v-if="!info.length">
            <div v-if="activeName === 'works'">
                <p>私房菜不要偷偷享用哦~~制作成菜谱与大家分享吧！</p>
                <a href="#" @click="worksHanlder">发布菜单</a>
            </div>
        </div>
        <div class="info-empty" v-if="!info.length">
            <div v-if="activeName === 'collection'">
                <p>还没有收藏任何的菜谱，去搜自己喜欢的菜谱，收藏起来吧。</p>
                <a href="#" @click="collectionHanlder">菜谱大全</a>
            </div>
        </div>
        <MenuCard :margin-left="13" :info="info"></MenuCard>
    </div>
</template>

<script>
import MenuCard from '@/components/menu-card'

export default {
    props: {
        info: {
            type: Array,
            default: () => []
        },
        activeName: {
            type: String,
            default: 'fans'
        }
    },
    components: {
        MenuCard
    },
    methods: {
        collectionHanlder(){
            this.$router.push({
                name: 'home'
            })
        },
        worksHanlder(){
            this.$router.push({
                name: 'create'
            })
        }
    }
}
</script>

<style lang="stylus">

</style>