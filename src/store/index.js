//引入Vue核心库
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)
import actions from "@/store/actions";
import mutations from "@/store/mutations";
import state from "@/store/state";


//创建并暴露store
export default new Vuex.Store({
    state,
    actions,
    mutations
})