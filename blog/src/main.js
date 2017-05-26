// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'
import VueFire from 'vuefire'
import firebase from 'firebase'

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(VueFire)

firebase.initializeApp({
  apiKey: 'AIzaSyC17mIsDkk38TZGnI9mBjzFIoCu904snn0',
  authDomain: 'vue2napratica.firebaseapp.com',
  databaseURL: 'https://vue2napratica.firebaseio.com',
  projectId: 'vue2napratica',
  storageBucket: 'vue2napratica.appspot.com',
  messagingSenderId: '779719236528'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

require('../node_modules/bulma/css/bulma.css')
require('./bradcomp.js')

