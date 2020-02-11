<template>
    <div class="step clearfix">
        <div class="step-number">{{n}}</div>
        <div class="upload-box">
            <UploadImg
                action="/api/upload?type=step"
                :img-max-width="184"
                :image-url="$options.imageUrl"
                @res-url="changeUrl"
            ></UploadImg>
        </div>
        <el-input
            class="introduce-text"
            type="textarea"
            :rows="8"
            placeholder="请输入内容"
            v-model="value.describe"
        >
        </el-input>
        <i class="delete-icon el-icon-close" @click="remove"></i>
    </div>
</template>

<script>
import UploadImg from '@/components/upload-img';

export default {
    props: {
        n: {
            type: Number,
            default: 1
        },
        length: {
            type: Number,
            default: 1
        },
        value:{
            type: Object,
            default:() => ({})
        }
    },
    components: {
        UploadImg
    },
    imageUrl: 'https://s1.c.meishij.net/n/images/upload_step_img.png',
    methods: {
        changeUrl(data){
            this.$emit("input",{
                ...this.value,
                img_url: data.resImgUrl
            })
        },
        remove(){
            this.$emit("remove", this.n)
        }
    }
}
</script>

<style lang="stylus">
.step
    margin-bottom 20px
    margin-right 20px
    > div
        float left
    .step-number
        height 180px
        width 80px
        font-size 60px
        color #aaa
        font-family Arial, Helvetica, sans-serif
        font-weight bold
        vertical-align top
        line-height 180px
        margin-left 20px
    .introduce-text
        width 60%
        margin-left 40px
    .upload-box
        img 
            vertical-align top
    textarea
        resize none
        overflow auto
</style>

