<template>
    <div class="recipe">
        <!-- 菜谱分类 start -->
        <el-tabs v-model="activeName" type="border-card" @tab-click="tabClickHandle">
            <el-tab-pane 
                v-for="item in classifies"
                :label="item.parent_name" 
                :key="item.parent_type"
                :name="item.parent_type"
            >
                <div class="recipe-link">
                    <router-link
                        :to="{query:{...$route.query, classify: option.type, page: 1}}" 
                        :class="{active: classifyType === option.type}" 
                        v-for="option in item.list" 
                        :key="option.type"
                    >{{option.name}}</router-link>
                </div>
            </el-tab-pane>
        </el-tabs>
        <!-- 菜谱分类 end -->
        <h2>家常好味道，给你家一般的温暖</h2>
        <el-container>
            <el-aside width="220px" class="recipe-aside">
                <div class="filter-box">
                    <h4>筛选</h4>
                    <el-collapse v-model="propertiesActivName">
                        <el-collapse-item 
                            v-for="item in properties"
                            :key="item.parent_type"
                            :title="item.parent_name"
                            :name="item.parent_type"
                        >
                        <div class="filter-tags">
                            <el-tag 
                                type="info" 
                                v-for="option in item.list" 
                                :key="option.type"
                                :class="{'tag-selected': propertiesTypes[item.title] === option.type}"
                                @click="selectedTag(option)"
                            >{{option.name}}</el-tag>
                        </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </el-aside>
            <el-main class="filter-menus-box">
                <div class="menu-empty" v-show="!list.length && !loading">暂时没有过滤出菜谱信息，请选择其他的筛选条件</div>
                <MenuCard style="min-height: 75%;" :info="list"></MenuCard>
                <div style="text-align: right;" v-show="!loading">
                    <el-pagination
                        :hide-on-single-page= "pages.totalPages === 1 || !list.length"
                        @size-change="changePage"
                        @current-change="changePage"
                        :current-page.sync="pages.currentPage"
                        style="display: inline-block;"
                        :page-size="pages.pageSize"
                        layout="total, prev, pager, next"
                        :total="pages.total"
                    ></el-pagination>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import MenuCard from '@/components/menu-card'
import { 
    getClassify,
    getProperty,
    getMenus
} from '@/service/index';

export default {
    components: {
        MenuCard
    },
    data(){
       return {
            activeName: '1',
            classifyType: '', // 记录菜谱分类的类型
            classifies: [],  // 菜谱分类
            properties: [], // 属性分类
            propertiesActivName: [],  // 记录多个属性分类
            propertiesTypes:{},  // 记录属性的分类，有多个  {a:'1-2',b:'2-1'}
            list: [],
            pages:{
                pageSize: 0,
                total: 0,
                currentPage: 0,
                totalPages: 0
            },
            loading: false
        }
    },
    watch: {
        $route: {
            handler(){
                let { classify } = this.$route.query;
                if(classify){
                    this.activeName = classify[0];
                    this.classifyType = classify;
                    this.getMenus()
                }
            },
            immediate: true
        }
    },
    mounted(){
        // 获取所有属性分类
        getClassify().then(res=>{
            this.classifies = res.data;
            let { classify } = this.$route.query;
            if(!classify){
                this.activeName = this.classifies[0].parent_type;
                this.classifyType = this.classifies[0].list[0].type;
                this.$router.push({
                    query: {
                        classify: this.classifyType,
                        page: 1
                    }
                })
            }
        })
        // 获取所有菜谱分类
        getProperty().then(res=>{
            this.properties = res.data;
            let { query } = this.$route;
            this.propertiesTypes = this.properties.reduce((o, item) => {
                o[item.title] = query[item.title] ? query[item.title] : '';
                if(o[item.title]){
                    this.propertiesActivName.push(o[item.title][0]);
                }
                return o;
            },{});
        })
    },
    methods: {
        // 页数
        changePage(){
            this.$router.push({
                query: {
                    ...this.$route.query,
                    page: this.pages.currentPage
                }
            })
        },
        // 菜谱分类
        getMenus(){
            const query = {...this.$route.query};
            const params = {
                page: query.page || 1,
                classify: query.classify
            }
            delete query.page;
            delete query.classify;
            if(Object.keys(query).length){
                params.property = {
                    ...query
                }
            }
            let loading = null;
            this.$nextTick(() => {
                loading = this.$loading({
                    target: '.filter-menus-box',
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
            })
            this.list = [];  // 每次请求之前都清空
            this.loading = true;
            getMenus(params).then((res) => {
                this.list = res.data.list;
                this.pages.pageSize = res.data.page_size;
                this.pages.total = res.data.total;
                this.pages.currentPage = res.data.current_page;
                if(loading) loading.close();
                this.loading = false;
                this.pages.totalPages = Math.ceil(this.pages.total/this.pages.pageSize);
            })
        },
        // 点击属性分类
        selectedTag(option){
            let query = {
                ...this.$route.query
            };
            if(this.propertiesTypes[option.title] === option.type){
                this.propertiesTypes[option.title] = ''
                delete query[option.title]
            } else {
                this.propertiesTypes[option.title] = option.type;
                query[option.title] = option.type;
            }
            this.$router.push({
                query
            })
        },
        // 切换 tab
        tabClickHandle(){
            let activeName = this.activeName;
            let item = this.classifies.find(item=>item.parent_type === activeName);
            if(item){
                this.classifyType = item.list[0].type;
                this.$router.push({
                    query: {
                        ...this.$route.query,
                        classify: item.list[0].type,
                        page: 1
                    }
                })
            }
        }
    }
}
</script>

<style lang="stylus">
  .recipe-link
    font-size 0;
    margin-top 5px
    a
      display inline-block
      font-size 12px
      padding 0px 8px
      height 28px
      line-height 28px
    .active 
      background #ff3232
      color #fff
  .recipe
    h2 
      text-align center
      line-height 150px
    .el-main
      padding 0
    .filter-box 
      background #fff
      padding 10px
      width 100%
      float left
      box-sizing border-box
  .filter-tags 
    display flex
    flex-wrap wrap
    justify-content space-around
    .tag-selected
      background-color  #ff3232
      color #fff
  .menu-empty
    width 100% 
    text-align center
    font-size 20px
</style>

