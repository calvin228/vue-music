import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import './assets/css/tailwind.css';
import './assets/css/index.css';

Vue.config.productionTip = false

Vue.use(Vuelidate)

new Vue({
  render: h => h(App),
}).$mount('#app')
