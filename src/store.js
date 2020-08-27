import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 初始化状态
        filteredTags: ["R-18", "R-18G"]
    },
    mutations: {
        // 处理状态
        setFilteredTags(state, tagsArr) {
            state.filteredTags = tagsArr
        }
    },
    actions: {
        // 提交改变后的状态
    },
    // 使用vuex-persistedstate保证vuex数据持久化
    plugins: [
        createPersistedState({
            storage: window.localStorage
        })
    ]
})