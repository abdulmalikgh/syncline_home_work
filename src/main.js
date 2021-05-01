import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@fortawesome/fontawesome-free/css/all.css'    
import '@fortawesome/fontawesome-free/js/all.js' 
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.use(ElementUI)
Vue.config.productionTip = false

import axios from 'axios'

Vue.prototype.$http = axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
