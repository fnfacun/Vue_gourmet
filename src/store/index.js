import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    // 仓库
    state: {
        userInfo: {}
    },
    // 派生数据
    getters: {
        isLogin(state){
            return !!Object.keys(state.userInfo).length;
        }
    },
    // 数据派发
    mutations: {
        changeInfo(state, data){
            state.userInfo = data;
        }
    },
    // 异步处理
    actions: {}
});

export default store;