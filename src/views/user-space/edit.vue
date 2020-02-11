<template>
    <div class="edit">
        <!-- 头像 -->
        <div class="edit-item">
            <span class="label">修改头像</span>
            <UploadImg
                action="/api/upload?type=user"
                :imageUrl="avatar"
                imgMaxWidth="210"
                @res-url="(data)=>{avatar=data.resImgUrl}"
            ></UploadImg>
        </div>
        <!-- 修改名称 -->
        <div class="edit-item">
            <span class="label">修改名称</span>
            <div>
                <el-input v-model="name" class="create-input" placeholder="请输入内容"></el-input>
            </div>
        </div>
        <!-- 个人简介 -->
        <div class="edit-item">
            <span class="label">个人简介</span>
            <div>
                <el-input v-model="sign" type="textarea" class="create-input" placeholder="请输入内容"></el-input>
            </div>
        </div>
        <!-- 保存 -->
        <div>
            <el-button 
                class="send" 
                type="primary"
                size="medium"
                @click="save"
            >保存</el-button>
        </div>
    </div>
</template>


<script>
import UploadImg from '@/components/upload-img'
import { userEdit } from '@/service/index'

export default {
    components: {
        UploadImg
    },
    data(){
        let { userInfo } = this.$store.state;
        return {
            name: userInfo.name,
            avatar: userInfo.avatar,
            sign: userInfo.sign
        }
    },
    methods: {
        save(){
            userEdit({
                name: this.name,
                avatar: this.avatar,
                sign: this.sign
            }).then(res=>{
                if(!this.name.trim()){
                    this.$message({
                        message: '名称不能为空',
                        type: 'warning'
                    });
                } else if(!this.sign.trim()){
                    this.$message({
                        message: '简介内容不能为空',
                        type: 'warning'
                    });
                } else {
                    if(res.code === 0){
                        this.$router.push({
                            name: 'space'
                        });
                        this.$message({
                            message: res.mes,
                            type: 'success'
                        });
                    }
                }
            })
        }
    }
}
</script>

<style lang="stylus">
.edit
    background-color #fff
    padding 10px 0 20px 20px
    .edit-item 
        display flex
        margin-bottom 20px
        .label
            margin-right 10px
</style>