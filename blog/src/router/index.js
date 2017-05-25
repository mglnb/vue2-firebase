import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function load (component) {
  return () => System.import(`../components/${component}.vue`)
}

export default new Router({
  routes: [
    { path: '/', name: 'Hello', component: load('Hello') },
    { path: '*', component: load('Error404') }
  ]
})
