import Vue from 'vue'
import App from './App.vue'
import router from './router'

import antDesignVue from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import '@/assets/css/basic.less'

Vue.config.productionTip = false

Vue.use(antDesignVue)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
