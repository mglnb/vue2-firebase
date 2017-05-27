import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function load (component) {
  return () => System.import(`../components/${component}.vue`)
}

export default new Router({
  routes: [
    { path: '/', name: 'Home', component: load('Home') },
    { path: '/login', name: 'Login', component: load('Login') },
    { path: '/addPost', name: 'AddPost', component: load('AddPost') },
    { path: '*', component: load('Error404') }
  ]
})
