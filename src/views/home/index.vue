<template>
    <div class="home">
        <!-- 轮播 -->
        <el-carousel :interval="5000" type="card" height="300px">
            <el-carousel-item v-for="item in banners" :key="item._id">
                <router-link :to="{name: 'detail'}">
                    <img :src="item.product_pic_url" width="100%" />
                </router-link>
            </el-carousel-item>
        </el-carousel>
        <!-- 详情 -->
        <div>
            <h2>内容精选</h2>
            <Waterfall ref="waterfall" @view="loadingMenuHandle">
                <MenuCard :margin-left="13" :info="menuList"></MenuCard>
            </Waterfall>
        </div>
    </div>
</template>

<script>
import MenuCard from '@/components/menu-card';
import Waterfall from '@/components/waterfall';
import { getBanner, getMenus } from '@/service/index'

export default {
    name: 'home',
    components: {
        MenuCard,
        Waterfall
    },
    data(){
        return {
            banners: [],
            menuList: [],
            page: 1
        }
    },
    mounted(){
        getBanner().then(res=>{
            if(res.code === 0){
                this.banners = res.data.list;
            }
        });
        getMenus({
            page: this.page
        }).then(res=>{
            if(res.code === 0){
                this.menuList = res.data.list;
                this.pages = Math.ceil(res.data.total / res.data.page_size);
            }
        });
    },
    methods: {
        loadingMenuHandle(){
            this.page++;
            if(this.page > this.pages){
                this.$refs.waterfall.isLoading = false;
            } else {
                this.$refs.waterfall.isLoading = true;
            }
            getMenus({
                page: this.page
            }).then(res=>{
                if(res.code === 0) {
                    this.menuList.push(...res.data.list);
                    this.$refs.waterfall.isLoading = false;
                }
            });
        }
    }
}
</script>

<style lang="stylus">

</style>