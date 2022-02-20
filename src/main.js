import Vue from 'vue'
import App from './App.vue'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import { initializeApp } from 'firebase/app';

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './static/bootstrap-slate.min.css'
// import './static/bootstrap-superhero.min.css'
// import './static/bootstrap-solar.min.css'

const firebaseConfig = {
  apiKey: "AIzaSyCkoTZdcRlkf-PA6NfqhW1wV92s_snLOfE",
  authDomain: "stock-calc-d40fc.firebaseapp.com",
  projectId: "stock-calc-d40fc",
  storageBucket: "stock-calc-d40fc.appspot.com",
  messagingSenderId: "832316187409",
  appId: "1:832316187409:web:c2ed582c36d2b10bb622b0"
};

new Vue({
  render: h => h(App),
  created () {
    initializeApp(firebaseConfig)
  }
}).$mount('#app')
