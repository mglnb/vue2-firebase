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
npm i -S vuex vue-resource bulma firebase vuefire
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

## Instalando o font-awesome

Pode se pelo npn e na mesma forma que o bulma foi feito. Vamos diferenciar para ver outra forma, através do CDN. No arquivo index.html, adicione o viewport e o cdn do fontawesome:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">
    <title>blog</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
  </head>
  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```

## Implementando o Vuex

Crie o diretório `src/store` e os arquivos:

```js
// src/store/actions.js

export const simpleAction = ({ commit }, text) => {
  commit('SimpleMutation', { text })
}

```

```js
// src/store/getters.js

export const getSimpleText = state => {
  return state.simpleText
}
```

```js
// src/store/index.js

import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from './getters'
import * as actions from './actions'
import { state, mutations } from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

```

```js
// src/store/mutations.js

/* STATE */
export const state = {
  simpleText: 'Hello From Vuex'
}

export const mutations = {

  SimpleMutation (state, { text }) {
    state.simpleText = text
  }

}

```

Seguindo o fluxo vuex:

![](https://raw.githubusercontent.com/vuejs/vuex/dev/docs/en/images/vuex.png)

Temos:

```html
<template>
  <div>
    {{$store.getters.getSimpleText}}
    <button @click="changeSimpleText">Change</button>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
      changeSimpleText: function () {
        this.$store.dispatch('simpleAction', 'Text Changed')
      }
    }
  }

</script>
```

## Vue resource

```js
// src/main.js
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'

Vue.config.productionTip = false

Vue.use(VueResource)

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
```

## Arquivo de configuração

Criar o arquivo `src/config.js`

```js
// src/config.js
export default {
  url: 'http://localhost:8080'
}
```

Usar onde quiser:

```js
import config from '../config';
```

## Firebase (Database)

Acessar https://console.firebase.google.com e criar uma conta caso seja necessário.

Crie o projeto

![](images/firebase-create-project.png)

Clique para adicionar o firebase no projeto web

![](images/add-firebase-to-project.png)

Observe o JSON de configuração. Copie-o!

Permita que qualquer um possa acessar o Database:

![](images/firebase-rules.png)

```json
{
  "rules": {
    ".read": "auth == null",
    ".write": "auth == null"
  }
}
```

Também pode ser:

```json
{
  "rules": {
    ".read": "true",
    ".write": "true"
  }
}
```


E a configuração do firebase+VueFire:

```js
// src/main.js
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
```

Para usar o firebase:

```html
<template>
  <div>
    <input type="text" v-model="post.title"></input>
    <button @click="addPost">Add</button>
    <pre>{{posts}}</pre>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'hello',
    data () {
      return {
        post: {
          title: ''
        }
      }
    },
    firebase: {
      posts: firebase.database().ref('posts')
    },
    methods: {
      addPost: function () {
        this.$firebaseRefs.posts.push(this.post).then(
          (r) => {
            this.post = { title: '' }
          }
        )
      }
    }
  }

</script>

```

## Autenticação pelo Github

O Firebase promove vários tipos de autenticação. Vamos usar a do Github. Após obter a autenticação recebemos um token que deve ser guardado no vuex.

Primeiro é preciso ter uma conta no Github para criar um [aplicativo GitHub](https://github.com/settings/developers):

![](images/firebase-oauth.png)

Após criar o aplicativo oAuth do Github você tem acesso ao *ClientID* e *Client Secret* que deve ser copiado e colado no projeto Firebase. No Firebase, acesse *Authentication* e *Métodos de Login*, encontre o item GitHub e clique nele. Forneça os dados de acordo com a imagem a seguir:

![](images/firebase-oauth-2.png)

Apenas como teste, vamos voltar no componente Hello.vue para testar o login:

```html
<script>
  import firebase from 'firebase'

  export default {
    name: 'hello',
    data () {
      return {
        post: {
          title: ''
        }
      }
    },
    firebase: {
      posts: firebase.database().ref('posts')
    },
    methods: {
      addPost: function () {
        /*
        this.$firebaseRefs.posts.push(this.post).then(
          (r) => {
            this.post = { title: '' }
          }
        )
         */
        var provider = new firebase.auth.GithubAuthProvider()
        firebase.auth().signInWithPopup(provider).then(function (result) {
          // This gives you a GitHub Access Token. You can use it to access the GitHub API.
          var token = result.credential.accessToken
          console.log(token)
          // The signed-in user info.
          var user = result.user
          console.log(user)
          // ...
        }).catch(function (error) {
          console.warn(error)
        })
      }
    }
  }

</script>
```

Usamos o método addPost apenas para testar, veja que definimos um provider e o método `signInWithPopup` para abrir um popoup como este:

![](images/firebase-oauth-2.png)

Após o usuário logar no github dele, o callback é executado e devemos guardar o `token` no vuex para uso durante a aplicação.

## Obtendo o usuario logado

Use `firebase.auth().currentUser` para saber se o usuáro está logado. Isso retorna um objeto

Para obter informações do usuário:

```js
var user = firebase.auth().currentUser;
var name, email, photoUrl, uid;

if (user != null) {
  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
  uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
                   // you have one. Use User.getToken() instead.
}
```

Mais infos [aqui](https://firebase.google.com/docs/auth/web/manage-users)

## Logout

```js
firebase.auth().signOut().then(function() {
  // Sign-out successful.
}, function(error) {
  // An error happened.
});
```

## Alterando a app para responder ao usuário logado

[Configure a variável user para o vuex](https://github.com/danielschmitz/vue2-firebase/commit/9aef5da82eb985463132b9f7e167f21fdaae1bee)

No App.vue, no evento created, podemos verificar se o usuário está logado e em caso positivo, usar a action para preencher o state.

```html
<!-- src/App.vue -->
<script>
  import firebase from 'firebase'

  export default {
    name: 'app',
    mounted: function () {
      let t = this
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          t.$store.dispatch('setUser', user)
        } else {
          console.warn('Not logged')
        }
      })
    }
  }

</script>
```

Como o método `onAuthStateChanged` da API do firebase nao retorna um promise criamos a variável t para manter o escopo do Vue no callback.

Para configurar o menu, crie uma propriedade computada `user`

```html
<script>
  import firebase from 'firebase'

  export default {
    name: 'app',
    computed: {
      user () {
        return this.$store.getters.user
      }
    },
    mounted: function () {
      let t = this
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          t.$store.dispatch('setUser', user)
        } else {
          console.warn('Not logged')
        }
      })
    }
  }

</script>
```

E a use no html do menu

```html

<template v-if="user">
    <a class="nav-item is-tab">
  Posts
</a>
    <a class="nav-item is-tab">
  Comments
</a>
  </template>
  <template v-else>
    <a class="nav-item is-tab">
  <router-link to="/login">Login</router-link>
</a>
  </template>
```

Ou os itens Posts e Comments serão vistsos, ou o link Login

## Tela de login

Crie o componente Login.vue

```html
<template>
  <div>
    <h2> Login </h2>
    <div class="has-text-centered">
      <a class="button is-large" @click="loginGitHub">
    <span class="icon is-medium">
      <i class="fa fa-github"></i>
    </span>
    <span>GitHub</span>
  </a>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'Login',
    methods: {
      loginGitHub: function () {
        var provider = new firebase.auth.GithubAuthProvider()
        var t = this
        firebase.auth().signInWithPopup(provider).then(function (result) {
          var user = result.user
          t.$store.dispatch('setUser', user)
          t.$router.push('/')
        }).catch(function (error) {
          console.warn(error)
        })
      }
    }
  }

</script>
```
## Logout

Adicione o botão de logout na App.vue

```html
<a class="nav-item is-tab" @click="logout">
 Logout
</a>
```

e o método:

```js
    methods: {
      logout: function () {
        let t = this
        firebase.auth().signOut().then(function () {
          t.$store.dispatch('setUser', null)
        }, function (error) {
          console.warn(error)
        })
      }
    }
```

## Regras de escrita no BD

Através da regra abaixo configuramos que o qualquer pessoa pode ler os posts, e somente pessoas logadas podem gravar dados.

```json
{
  "rules": {
    "posts": {
     ".read": true,
      "$uid": {
        ".write": "newData.exists() || $uid === auth.uid"
      }
    }
  }
}
```

## Adicionando um Post

Após configurar o App.vue para o menu ir para /addPost, crie o arquivo `components/AddPost.vue` com o seguinte código

```html
<template>
  <div>
    <h2> Adicionar um Post </h2>
    <div class="field">
      <label class="label">Título</label>
      <p class="control">
        <input class="input" type="text" placeholder="Título" v-model="post.title">
      </p>
    </div>
    <div class="field">
      <label class="label">Mensagem</label>
      <p class="control">
        <textarea class="textarea" placeholder="" v-model="post.message"></textarea>
      </p>
    </div>
    <div class="field is-grouped" v-if="user">
      <p class="control">
        <button class="button is-primary" @click="addPost">Enviar</button>
      </p>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'AddPost',
    data () {
      return {
        post: {
          title: '',
          message: ''
        }
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      }
    },
    firebase: {
      posts: firebase.database().ref('posts')
    },
    methods: {
      addPost: function () {
        this.post.uid = firebase.auth().currentUser.uid

        if (this.post.title === '' || this.post.message === '') {
          return false
        }

        this.$firebaseRefs.posts.push(this.post).then(
          (r) => {
            this.post = { title: '', message: '', uid: '' }
            this.$router.push('/')
          },
          (e) => {
            console.warn(e)
          }
        )
      }
    }
  }

</script>
```


