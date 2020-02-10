<template>
    <div class="waterfall" ref="waterfall">
        <slot></slot>
        <div class="waterfall-loading" v-show="isLoading">
            <i class="el-icon-loading"></i>
        </div>
    </div>
</template>

<script>
import { throttle } from 'throttle-debounce'
export default {
    data(){
        return {
            isLoading: false
        }
    },
    mounted(){
        this.scrollHandler = throttle(300, this.scroll.bind(this));
        window.addEventListener("scroll", this.scrollHandler)
    },
    destroyed(){
        window.removeEventListener("scroll", this.scrollHandler)
    },
    methods: {
        scroll(){
            if(this.isLoading)return;
            if(this.$refs.waterfall.getBoundingClientRect().bottom < document.documentElement.clientHeight){
                this.isLoading = true
                this.$emit('view')
            }
        }
    }
}
</script>

<style lang="stylus">
.waterfall-loading
    width 100%
    height 20px
    text-align center
</style>