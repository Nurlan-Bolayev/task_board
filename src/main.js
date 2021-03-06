import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import {buildRequiresAuthGuard} from "@/router/middlewares/requires-auth";
import {buildGuestOnlyGuard} from "@/router/middlewares/guest-only";
Vue.config.productionTip = false

router.beforeEach(buildRequiresAuthGuard(store))
router.beforeEach(buildGuestOnlyGuard(store))
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
