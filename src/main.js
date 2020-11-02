import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'jquery';
import 'popper.js';
import 'bootstrap'; 
import './assets/app.css';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
