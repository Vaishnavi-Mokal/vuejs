import Vue from 'vue'
import Vuelidate from 'vuelidate';
import App from './App.vue'
import router from './router'
import store from "./store";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);
Vue.use(Vuelidate)
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
