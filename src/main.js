import Vue from 'vue'
import App from './App.vue'
import router from './router'


// 引入element ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);


Vue.config.productionTip = false




import VueLazyLoad from "vue-lazyload"
Vue.use(VueLazyLoad,{
  loading:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602505964652&di=0551e9fa441c43e09783972fc6bc4ff3&imgtype=0&src=http%3A%2F%2Fimg.ui.cn%2Fdata%2Ffile%2F5%2F1%2F4%2F1809415.gif"
})

Vue.prototype.eventBus = new Vue()

import store from '@/store/vuex'

// 同步一下localStorage数据
let _token = localStorage.getItem("_token")
if(_token){
  store.commit("updateToken",_token)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
