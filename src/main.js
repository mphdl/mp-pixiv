import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import antDesignVue from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import '@/assets/css/basic.less'

Vue.config.productionTip = false

Vue.use(antDesignVue)

new Vue({
  router,
  store, // 注册store
  render: h => h(App)
}).$mount('#app')
