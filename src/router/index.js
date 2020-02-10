import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home/index'
import Store from '@/store/index'
import { userInfo } from '@/service/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
Vue.use(Router);

const Recipe = () => import('@/views/recipe/index');
const Create = () => import('@/views/create/index');
const Edit = () => import('@/views/user-space/edit');
const Space = () => import('@/views/user-space/index');
const MenuList = () => import('@/views/user-space/menu-list');
const Fans = () => import('@/views/user-space/fans');
const Detail = () => import('@/views/detail/index');
const Login = () => import('@/views/user-login/index');

const viewsRoute = [
    {
        path: '/recipe',
        name: 'recipe',
        title: '菜谱大全',
        component: Recipe
    },
    {
        path: '/create',
        name: 'create',
        title: '发布菜谱',
        component: Create,
        meta: {
            login: true
        }
    },
    {
        path: '/edit',
        name: 'edit',
        title: '编辑个人资料',
        component: Edit,
        meta: {
            login: true
        }
    },
    {
        path: '/space',
        title: '个人空间',
        name: 'space',
        component: Space,
        meta: {
            login: true
        },
        redirect: {
            name: 'works'
        },
        children: [
            {
                path: 'works',
                name: 'works',
                title: '作品',
                component: MenuList,
                meta: {
                    login: true
                },
            },
            {
                path: 'fans',
                name: 'fans',
                title: '我的粉丝',
                component: Fans,
                meta: {
                    login: true
                },
            },
            {
                path: 'following',
                name: 'following',
                title: '我的关注',
                component: Fans,
                meta: {
                    login: true
                },
            },
            {
                path: 'collection',
                name: 'collection',
                title: '收藏',
                component: MenuList,
                meta: {
                    login: true
                },
            }
        ]
    },
    {
        path: '/detail',
        name: 'detail',
        title: '菜谱细节',
        component: Detail
    }
]



const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            title: '首页',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            title: '登录页',
            component: Login,
            meta: {
                login: true
            },
        },
        ...viewsRoute,
        {
            path: '*',
            name: 'noFound',
            title: '未找到',
            redirect: {
                name: 'home'
            }
        }
    ]
});

router.beforeEach(async(to, from, next)=>{
    NProgress.start();
    let token = localStorage.getItem("token");
    let isLogin = !!token;
    // 进入之前验证 token 合不合法
    let res = await userInfo();
    Store.commit('changeInfo', res.data);
    if(to.matched.some(item=>item.meta.login)){ // 需要登录
        // 用户登录了
        if(isLogin){
            if(res.error === 400){
                next({
                    name: 'login'
                })
                localStorage.removeItem("token");
                return;
            }
            if(to.name === 'login'){
                next({
                    name: 'home'
                });
                return;
            } else {
                next();
            }
        // 用户没登录
        } else {
            // 如果是 login 直接进入
            if(to.name === 'login'){
                next();
            } else {
            // 不是 login 跳转到 login
                next({
                    name: 'login'
                });
            }
        }
    } else { // 不需要登录
        next();
    }
})

router.afterEach(()=>{
    NProgress.done()
})

export default router;