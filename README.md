# Vue.js 2 + Firebase
Nova app do livro "Vue.js na prática"

## Instalação Inicial

Adicionar o `vue-cli`

```console
npm i -g vue-cli
```

Criar o projeto

```console
 vue init webpack blog
```

![](images/vue-init-webpack-blog.png)

```console
cd blog
npm install
npm run dev
```

Adicionar bibliotecas Vue

```console
npm i -S vuex vue-resource bulma
```

Adicionar o arquivo css do Bulma no projeto

```javascript
// src/main.js
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

require('../node_modules/bulma/css/bulma.css')
```

Otimizar o router, para que o import seja carregado sozinho

```js
// src/router/index.js
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function load (component) {
  return () => System.import(`../components/${component}.vue`)
}

export default new Router({
  routes: [
    {path: '/', name: 'Hello', component: load('Hello')},
    { path: '*', component: load('Error404') }
  ]
})
```
Criar o componente `Error404`

```html
<!-- src/components/Error404.vue -->
<template>
  <div>
    <h1>Not Found</h1>
  </div>
</template>

<script>
export default {

}
</script>
```

Alterar `App.vue` para o seguinte desing:

```html
<!-- src/App.vue -->
<template>
  <div id="app">
    <nav class="nav has-shadow" id="top">
      <div class="container">
        <div class="nav-left">
          <a class="nav-item" href="../index.html">
            <h2>Vue.js na prática</h2>
          </a>
        </div>
        <span class="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
        </span>
        <div class="nav-right nav-menu">
          <a class="nav-item is-tab is-active">
          Home
        </a>
          <a class="nav-item is-tab">
          Posts
        </a>
          <a class="nav-item is-tab">
          Comments
        </a>
        </div>
      </div>
    </nav>
    <section class="section">
      <div class="container content">
        <router-view></router-view>
      </div>
    </section>

  </div>
</template>

<script>
  export default {
    name: 'app'
  }

</script>

<style>

</style>
```

Criar o arquivo `src/bradcomp.js`

```js
// src/bradcomp.js
// The following code is based off a toggle menu by @Bradcomp
// source: https://gist.github.com/Bradcomp/a9ef2ef322a8e8017443b626208999c1
(function () {
  var burger = document.querySelector('.nav-toggle')
  var menu = document.querySelector('.nav-menu')
  burger.addEventListener('click', function () {
    burger.classList.toggle('is-active')
    menu.classList.toggle('is-active')
  })
})()
```

Incluir o `bradcomp.js` no `main.js`:

```js
// src/main.js
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

require('../node_modules/bulma/css/bulma.css')
require('./bradcomp.js')
```

