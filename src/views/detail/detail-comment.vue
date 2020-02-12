<template>
    <div class="comment-box">
        <h2>{{info.title}}的讨论</h2>
        <div class="comment-text">
            <a href="javascript:;" class="useravatar" v-if="isLogin">
                <img :src="userInfo.avatar" />
            </a>
            <div v-if="!isLogin">请先登录后，再评论<router-link :to="{name: 'login'}" style="color: red">登录</router-link></div>
            <div class="comment-right" v-if="isLogin">
                <el-input
                    type="textarea"
                    :rows="5"
                    :cols="50"
                    placeholder="请输入内容"
                    v-if="isLogin"
                    v-model="commentText"
                >
                </el-input>
                <div class="comment-button" v-if="isLogin">
                    <el-button 
                        class="send-comment" 
                        type="primary" 
                        size="medium"
                        @click="send"
                    >提交</el-button>
                </div>
            </div>
        </div>
        <div class="comment-list-box">
            <ul class="comment-list">
                <li v-for="item in comments" :key="item.commentId">
                    <a target="_blank" class="avatar"></a>
                    <router-link :to="{name: 'space', query: {userId: item.userInfo.userId}}" class="avatar">
                        <img :src="item.userInfo.avatar" />
                        <h5>{{item.userInfo.name}}</h5>
                    </router-link>
                    <div class="comment-detail">
                        <p class="p1">{{item.commentText}}</p>
                        <div class="info clearfix">
                            <span style="float: left;">{{item.createdAt}}</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
/* getComments 提交评论信息
   postComment 获取评论信息 */
import { getComments, postComment } from '@/service/index';

export default {
    name: 'Comment',
    props: {
        info: {
            type: Object,
            default: () => {}
        }
    },
    data(){
        return {
            comments: [],
            commentText: ""
        }
    },
    computed: {
        isLogin(){
            return this.$store.getters.isLogin;
        },
        userInfo(){
            return this.$store.state.userInfo;
        }
    },
    async mounted(){
        let { menuId } = this.$route.query
        let res = await getComments({menuId})
        this.comments = res.data.comments;
    },
    methods: {
        async send(){
            let res = await postComment({
                menuId: this.info.menuId,
                commentText: this.commentText
            });
            if(res.ec === 200){
                this.$message({
                    message: res.mes,
                    type: 'success'
                });
                this.comments.unshift(res.data.comments);
                this.commentText = ""
            }
        }
    }
}
</script>

<style lang="stylus">
.comment-box
    background-color #ffffff
    margin-top 20px
    padding 0 20px
    h2
        font-size 24px
        color #333
        height 66px
        line-height 66px
        border-bottom 1px solid #eee

.comment-text
    margin-top 20px
    .useravatar
        margin-right 20px
        img 
            vertical-align top
            width 36px
            height 36px

.comment-right 
    display inline-block
    width 80%
    textarea
        resize none
        overflow auto

.comment-button
    text-align right 
    margin-top 10px

.send-comment
    background #ff3232
    border none

.comment-list-box
    border-top 1px solid #eee
    margin-top 20px
    padding-top 30px

    ul li 
        border-bottom 1px solid #eee
        margin-bottom 20px
        .avatar
            height 82px
            width 50px
            overflow hidden
            display inline-block
            h5
                white-space nowrap
            img 
                height 50px
                width 50px
    
.comment-detail
    display inline-block
    vertical-align top
    margin-left 20px
    width 80%
    p 
        margin 0
        font-size 14px

.info
    margin-top 10px
    color #999

.thumbs
    cursor pointer
    font-size 18px

.thumbs-actve
    color red

</style>