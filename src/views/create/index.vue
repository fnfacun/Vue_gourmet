<template>
    <div class="create">
        <h2>欢迎发布新菜谱，先介绍一下你的大作！</h2>
        <section class="create-introduce">
        <h5>标题</h5>
        <el-input 
            class="create-input" 
            placeholder="请输入内容"
            v-model="backData.title"
        ></el-input>
        <h5>属性</h5>
        <div>
            <el-select 
                v-for="item in propertyies"
                :placeholder="item.parent_name"
                :key="item.parent_type"
                v-model="backData.property[item.title]"
            >
                <el-option
                    v-for="options in item.list"
                    :key="options.type"
                    :label="options.name"
                    :value="options.type"
                >
                </el-option>
            </el-select>
        </div>
        <h5>菜谱分类</h5>
        <div>
            <el-select 
                placeholder="请选择菜谱分类"
                v-model="backData.classify"
            >
                <el-option-group
                    v-for="group in classifies"
                    :key="group.parent_type"
                    :label="group.parent_name"
                >
                    <el-option
                        v-for="options in group.list"
                        :key="options.type"
                        :label="options.name"
                        :value="options.type"
                    ></el-option>
                </el-option-group>
            </el-select>
        </div>
        <h5>成品图 (328*440)</h5>
            <div class="upload-img-box clearfix">
                <div class="upload-img">
                    <UploadImg
                        action="/api/upload?type=product"
                        :image-url="backData.product_pic_url"
                        @res-url="(data) => {backData.product_pic_url = data.resImgUrl}"
                    ></UploadImg>
                </div>
                <el-input
                    class="introduce-text"
                    type="textarea"
                    :rows="10"
                    placeholder="请输入内容"
                    v-model="backData.product_story"
                >
                </el-input>
            </div>
        </section>

        <h2>记录所有原材料</h2>
        <section class="create-introduce">
            <h5>主料</h5>
            <Stuff
                v-model="backData.raw_material.main_material"
            ></Stuff>
            <h5>辅料</h5>
            <Stuff
                v-model="backData.raw_material.accessories_material"
            ></Stuff>
        </section>

        <h2>开始写步骤了！能否简单易学就看你怎么写了，加油！</h2>
        <section class="create-introduce">
            <Upload
                v-for="(item,index) in backData.steps"
                :key="item.customeId"
                :n="index + 1"
                v-model="backData.steps[index]"
                @remove="removeStep"
            ></Upload>
            <el-button 
                class="eaeaea add-step-button" 
                type="primary" 
                size="medium" 
                icon="el-icon-plus"
                @click="addStep"
            >增加一步</el-button>
            <h5>烹饪小技巧</h5>
            <el-input
                class="introduce-text"
                type="textarea"
                :rows="8"
                placeholder="分享下你做这道菜的过程中的心得和小技巧吧！"
                v-model="backData.skill"
            >
            </el-input>
        </section>
        <el-button 
            class="send" 
            type="primary"
            size="medium"
            @click="send"
            :icon="icon"
        >搞定，提交审核</el-button>
    </div>
</template>

<script>
import Stuff from './stuff';
import Upload from './step-upload';
import UploadImg from '@/components/upload-img';
import { 
    getProperty,  // 属性
    getClassify,  // 菜谱分类
    publish       // 发送数据
} from '@/service/index';
// id
let n = 1;
// 原材料
let raw_material_struct = {
    name: '',
    specs: ''
};
// 步骤
let steps_struct = {
    img_url: '',
    describe: '',
}
export default {
    name: 'create',
    components: {
        Stuff,
        Upload,
        UploadImg
    },
    data(){
        return {     
            /* 页面展示的数据 */
            propertyies: '',    // 属性
            classifies: '',     // 菜谱分类
            icon: '',
            /* 向后端发送的数据 */
            backData: { 
                title: "",  // 标题
                property: {}, // 属性
                classify: "",  // 菜谱分类
                product_pic_url: 'https://s1.c.meishij.net/n/images/upload_big_img.png?_=1561906961', // 成品图 url
                product_story: '', // 成品图故事
                raw_material: { // 料
                    main_material: Array(3).fill(1).map(()=>({...raw_material_struct})), // 主料
                    accessories_material: Array(3).fill(1).map(()=>({...{...raw_material_struct}})), // 辅料
                },
                steps: Array(3).fill(1).map(()=>({...steps_struct, customeId: this.uuId()})), // 步骤
                skill: ""   // 烹饪小技巧
            }
        }
    },
    mounted(){
        /* 属性 */
        getProperty().then(({data})=>{
            this.propertyies = data;
            this.backData.property = data.reduce((o, item)=>{
                o[item.title] = ''
                return o
            },{})
        });
        getClassify().then(({data})=>{
            this.classifies = data;
        })
    },
    methods: {
        uuId(){
            n++;
            return Date.now() + n;
        },
        addStep(){
            this.backData.steps.push({
                ...steps_struct,
                customeId: this.uuId()
            })
        },
        removeStep(index){
            this.backData.steps.splice(index-1, 1)
        },
        newsMessage(str){
            this.$message({
                message: `${str}`,
                type: 'warning'
            });
        },
        send(){
            if(!this.backData.title.trim()){
                this.newsMessage("标题不能为空");
            } else if(!this.backData.property.craft.trim()){
                this.newsMessage("请选择你的工艺");
            } else if(!this.backData.property.flavor.trim()){
                this.newsMessage("请选择你的口味");
            } else if(!this.backData.property.hard.trim()){
                this.newsMessage("请选择你的难度");
            } else if(!this.backData.property.people.trim()){
                this.newsMessage("请选择你的人数");
            } else if(!this.backData.classify.trim()){
                this.newsMessage("请选择你的菜谱类型");
            } else if(!this.backData.product_story.trim()){
                this.newsMessage("请输入成品图的内容，介绍一下你努力的成功吧~");
            } else if(!this.backData.skill.trim()){
                this.newsMessage("分享一下你的烹饪小技巧叭~");
            } else {
                this.icon = 'el-icon-loading';
                let param = this.backData;
                param.steps = param.steps.map(item=>{
                    return {
                        img_url: item.img_url,
                        describe: item.describe
                    }
                })
                publish(param).then(res=>{
                    if(res.code === 0){
                        this.$message({
                            message: res.mes,
                            type: 'success'
                        });
                        this.$router.push({
                            name: 'space'
                        })
                    }
                });
            } 
        }
    }
}
</script>

<style lang="stylus">
.create-introduce 
    background-color #fff
    padding 20px

    .add-step-button
        margin-left 100px

.create
    width 100%
    h2
        text-align center
        margin 20px 0
    .send
        height: 70px;
        width: 220px;
        background #ff3232
        color #fff
        border none
        margin 20px auto
        display block
    h5
        margin 20px 0
    textarea
        resize none
        overflow auto

.create-input input
    width 446px
    line-height 22px

.upload-img-box 
    .upload-img
        float left
    .introduce-text
        float left
    .el-textarea
        width 60%
        margin-left 10px

</style>


